(function () {
  var CATS = window.BLOG_VIEW.categories;
  var cardHTML = window.BLOG_VIEW.cardHTML;
  var POSTS = window.BLOG_POSTS || [];
  var catsWrap = document.getElementById('blogCats');
  var gridWrap = document.getElementById('blogGrid');
  var moreWrap = document.getElementById('blogMoreWrap');
  var moreBtn  = document.getElementById('blogMore');
  if (!catsWrap || !gridWrap) return;

  var INITIAL = 9, STEP = 9, currentCat = 'all', shown = INITIAL;

  function renderCats() {
    var counts = { all: POSTS.length };
    for (var k in CATS) counts[k] = 0;
    POSTS.forEach(function(p){ counts[p.cat]++; });
    var h = '<button type="button" class="blog-cat'+(currentCat==='all'?' is-active':'')+'" data-cat="all">Все статьи<span class="blog-cat__count">'+counts.all+'</span></button>';
    for (var key in CATS) {
      h += '<button type="button" class="blog-cat'+(currentCat===key?' is-active':'')+'" data-cat="'+key+'">'+CATS[key]+'<span class="blog-cat__count">'+counts[key]+'</span></button>';
    }
    catsWrap.innerHTML = h;
  }

  function renderPosts() {
    var list = currentCat === 'all' ? POSTS : POSTS.filter(function(p){ return p.cat === currentCat; });
    moreWrap.hidden = list.length <= shown;
    var slice = list.slice(0, shown);
    gridWrap.innerHTML = slice.map(cardHTML).join('');
    if (list.length > shown) {
      moreWrap.style.display = 'flex';
      moreBtn.textContent = 'Показать ещё (' + (list.length - shown) + ')';
    } else {
      moreWrap.style.display = 'none';
    }
  }

  catsWrap.addEventListener('click', function (e) {
    var cat = e.target.closest('.blog-cat');
    if (!cat) return;
    var val = cat.dataset.cat;
    if (!val || val === currentCat) return;
    currentCat = val; shown = INITIAL;
    renderCats(); renderPosts();
  });

  if (moreBtn) moreBtn.addEventListener('click', function () { shown += STEP; renderPosts(); });

  renderCats();
  renderPosts();

  // Keep bookmarks to the former hash-based articles working.
  function followLegacyArticle() {
    var slug = location.hash.replace('#article-', '');
    if (location.hash.indexOf('#article-') === 0 && POSTS.some(function (p) { return p.slug === slug; })) {
      location.replace('blog-' + slug + '.html');
    }
  }
  window.addEventListener('hashchange', followLegacyArticle);
  followLegacyArticle();
})();
