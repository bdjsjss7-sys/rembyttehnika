/* Rebuild static blog pages and SEO metadata. No dependencies: node scripts/build-site.cjs */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const base = 'https://rembyttehnika.pro/';
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const write = (file, content) => fs.writeFileSync(path.join(root, file), content);
const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain = text => text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const context = { window: {} };
vm.createContext(context);
for (const file of ['blog-data-1.js', 'blog-data-2.js', 'blog-data-3.js', 'blog-view.js']) {
  vm.runInContext(read('js/' + file), context, {filename:file});
}
const posts = context.window.BLOG_POSTS;
const view = context.window.BLOG_VIEW;
if (new Set(posts.map(p => p.slug)).size !== posts.length || posts.some(p => !/^[a-z0-9-]+$/.test(p.slug))) throw new Error('Invalid or duplicate article slug');
const business = {
  '@type': 'LocalBusiness', '@id': base + '#business', name: 'РемБытТехника', url: base,
  telephone: '+375291087979',
  address: {'@type':'PostalAddress', streetAddress:'ул. Большая Троицкая, 48', addressLocality:'Гродно', addressCountry:'BY'},
  openingHoursSpecification: {'@type':'OpeningHoursSpecification', dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens:'11:00', closes:'18:00'}
};
const serviceFiles = new Set(['washing-machines.html','dishwashers.html','tvs.html','coffee-machines.html','vacuum-cleaners.html','water-heaters.html','ovens.html','cooktops.html','hoods.html','gas-stoves.html','small-appliances.html','microwaves.html']);
function decorate(content, file, post) {
  content = content.replace(/\n?<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\n?/g, '\n');
  if (file === '404.html' || file === 'test.html') {
    if (!/name="robots"/.test(content)) content = content.replace(/<\/head>/, '<meta name="robots" content="noindex, follow">\n</head>');
    // test.html is intentionally a minimal legacy document without a head.
    if (file === 'test.html' && !/name="robots"/.test(content)) content = '<!DOCTYPE html>\n<html lang="ru"><head><meta charset="UTF-8"><meta name="robots" content="noindex, follow"><title>Тестовая страница</title></head><body><h1>Тестовая страница</h1></body></html>\n';
    return content;
  }
  const title = content.match(/<title>([\s\S]*?)<\/title>/)[1];
  const description = content.match(/<meta name="description" content="([^"]*)">/)[1];
  const url = file === 'index.html' ? base : base + file;
  const h1 = plain(content.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]);
  const graph = [];
  if (file === 'index.html') {
    graph.push(business, {'@type':'WebSite','@id':base+'#website',url:base,name:'РемБытТехника',inLanguage:'ru',publisher:{'@id':base+'#business'}});
  } else {
    const items = [{'@type':'ListItem', position:1, name:'Главная', item:base}];
    if (post) items.push({'@type':'ListItem',position:2,name:'Блог',item:base+'blog.html'});
    items.push({'@type':'ListItem',position:items.length+1,name:post ? post.title : h1,item:url});
    graph.push({'@type':'BreadcrumbList',itemListElement:items});
  }
  if (serviceFiles.has(file)) graph.push({'@type':'Service',name:h1,url,areaServed:{'@type':'City',name:'Гродно'},provider:business});
  if (post) graph.push({'@type':'Article',headline:post.title,description:post.excerpt,inLanguage:'ru',mainEntityOfPage:url,publisher:business});
  const seo = `<!-- SEO:START -->
<link rel="canonical" href="${url}">
<meta property="og:type" content="${post ? 'article' : 'website'}">
<meta property="og:locale" content="ru_BY">
<meta property="og:site_name" content="РемБытТехника">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}</script>
<!-- SEO:END -->`;
  if (!/rel="icon"/.test(content)) content = content.replace('</head>', '<link rel="icon" type="image/svg+xml" href="favicon.svg">\n</head>');
  return content.replace('</head>', seo + '\n</head>');
}
let blog = read('blog.html');
const prefix = blog.slice(0, blog.indexOf('<section class="page-hero">'));
const footer = blog.slice(blog.indexOf('<footer class="footer">'), blog.indexOf('<script src="js/script.js'));
const styles = blog.match(/<style>([\s\S]*?)<\/style>/)[1].replace(/\.article-body h3/g, '.article-body h2');
// Article content uses h2 under its h1; original text is retained.
for (const post of posts) {
  const file = 'blog-' + post.slug + '.html';
  let head = prefix.replace(/<title>[\s\S]*?<\/title>/, '<title>' + escape(post.title) + ' | РемБытТехника</title>')
    .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="' + escape(post.excerpt) + '">')
    .replace(/<style>[\s\S]*?<\/style>/, '<style>' + styles + '\n.article-page { padding-top: 140px; }\n@media (max-width: 1024px) { .article-page { padding-top: 96px; } }\n</style>');
  const content = `${head}<main class="section article-page"><div class="container">
<article class="article-view is-open">
<nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span class="breadcrumbs__sep">/</span><a href="blog.html">Блог</a></nav>
<a href="blog.html" class="article-view__back">← Ко всем статьям</a>
<div class="article-view__meta"><span class="article-view__cat">${escape(view.categories[post.cat])}</span><span>·</span><span>${post.time} мин чтения</span></div>
<h1 class="article-view__title">${escape(post.title)}</h1>
<p class="article-view__lead">${escape(post.excerpt)}</p>
<div class="article-body">${post.body.replace(/<(\/?)h3>/g,'<$1h2>')}</div>
<div class="article-cta"><h2 class="article-cta__title">Нужна помощь мастера?</h2><p class="article-cta__text">Позвоните и опишите проблему. Принимаем технику в мастерской ежедневно с 11:00 до 18:00.</p><a href="tel:+375291087979" class="article-cta__phone">+375 29 108-79-79</a></div>
</article></div></main>
${footer}<script src="js/script.js?v=20261025"></script>\n</body>\n</html>\n`;
  write(file, decorate(content, file, post));
}
// Every article is discoverable through a normal href even with JavaScript off.
blog = blog.replace(/<div class="blog-grid" id="blogGrid">[\s\S]*?(?=\n      <div class="blog-more-wrap")/, '<div class="blog-grid" id="blogGrid">\n' + posts.map(view.cardHTML).join('\n') + '\n      </div>');
blog = blog.replace('class="blog-more-wrap" id="blogMoreWrap"', 'class="blog-more-wrap" id="blogMoreWrap" hidden');
blog = blog.replace('</style>', '  .blog-more-wrap[hidden] { display: none; }\n</style>');
// Keep rebuilding idempotent.
blog = blog.replace(/(  \.blog-more-wrap\[hidden\] \{ display: none; \}\n)+/g,'  .blog-more-wrap[hidden] { display: none; }\n');
write('blog.html', blog);
for (const file of fs.readdirSync(root).filter(f => f.endsWith('.html') && !f.startsWith('blog-'))) write(file, decorate(read(file), file));
const files = fs.readdirSync(root).filter(f => f.endsWith('.html') && !['404.html','test.html'].includes(f));
files.sort((a,b) => a === 'index.html' ? -1 : b === 'index.html' ? 1 : a.localeCompare(b));
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + files.map(f => '  <url><loc>' + (f === 'index.html' ? base : base + f) + '</loc></url>').join('\n') + '\n</urlset>\n');
write('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + base + 'sitemap.xml\n');
console.log(`Built ${posts.length} article pages; sitemap contains ${files.length} URLs.`);
