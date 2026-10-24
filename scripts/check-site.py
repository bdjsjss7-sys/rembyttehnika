"""Check static SEO, structured data, sitemap, links and unique HTML IDs.
Run: python3 scripts/check-site.py
"""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
BASE = 'https://bdjsjss7-sys.github.io/rembyttehnika/'

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.tags = []
        self.schema = []
        self.capture = False
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        self.capture = tag == 'script' and attrs.get('type') == 'application/ld+json'

    def handle_endtag(self, tag):
        if tag == 'script':
            self.capture = False

    def handle_data(self, text):
        if self.capture:
            self.schema.append(json.loads(text))

pages = {p.name: Page(p.read_text()) for p in ROOT.glob('*.html')}
for name, page in pages.items():
    ids = Counter(a['id'] for t, a in page.tags if 'id' in a)
    assert all(n == 1 for n in ids.values()), (name, 'duplicate ID')
    if name not in ('404.html', 'test.html'):
        assert sum(t == 'h1' for t, a in page.tags) == 1, (name, 'H1')
        canonical = [a['href'] for t, a in page.tags if t == 'link' and a.get('rel') == 'canonical']
        assert canonical == [BASE if name == 'index.html' else BASE + name], (name, canonical)
        assert page.schema, (name, 'structured data')
        assert any(t == 'meta' and a.get('name') == 'description' and a.get('content') for t, a in page.tags), name
    else:
        assert any(t == 'meta' and a.get('name') == 'robots' and 'noindex' in a.get('content', '') for t, a in page.tags), name
    for tag, attrs in page.tags:
        url = attrs.get('href', attrs.get('src', ''))
        parsed = urlsplit(url)
        if not url or parsed.scheme or parsed.netloc:
            continue
        destination = unquote(parsed.path) or name
        assert (ROOT / destination).exists(), (name, 'missing file', url)
        if parsed.fragment and destination in pages:
            assert any(a.get('id') == unquote(parsed.fragment) for t, a in pages[destination].tags), (name, 'missing anchor', url)
        assert tag != 'form' or attrs.get('action') not in ('', '#', None), (name, 'unconfigured form')
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls = [node.text for node in ET.parse(ROOT / 'sitemap.xml').findall('s:url/s:loc', ns)]
expected = {BASE if name == 'index.html' else BASE + name for name in pages if name not in ('404.html', 'test.html')}
assert set(urls) == expected and len(urls) == len(expected), 'Sitemap mismatch'
assert BASE + 'sitemap.xml' in (ROOT / 'robots.txt').read_text()
assert len([name for name in pages if name.startswith('blog-')]) == 52
print(f'PASS: {len(pages)} HTML files, {len(urls)} sitemap URLs, links, anchors, IDs and JSON-LD.')
