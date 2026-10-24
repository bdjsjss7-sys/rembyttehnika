(function () {
  var CATS = {
    wash:'Стиральные машины', dish:'Посудомойки', tv:'Телевизоры',
    coffee:'Кофемашины', boiler:'Водонагреватели', oven:'Духовки',
    cooktop:'Варочные панели', vacuum:'Пылесосы', hood:'Вытяжки',
    gas:'Газовые плиты', small:'Мелкая техника', micro:'Микроволновки'
  };
  var ICONS = {
    wash:'<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="14" r="1.5"/><line x1="15" y1="7" x2="17" y2="7"/>',
    dish:'<rect x="4" y="3" width="16" height="18" rx="2"/><line x1="4" y1="9" x2="20" y2="9"/><circle cx="8" cy="6" r="0.5" fill="currentColor"/><path d="M8 14c1.5 0 2.5 1 2.5 2s-1 2-2.5 2"/>',
    tv:'<rect x="3" y="5" width="18" height="12" rx="2"/><polyline points="8 21 12 17 16 21"/>',
    coffee:'<path d="M6 4h12v4a6 6 0 0 1-12 0V4z"/><path d="M4 20h16"/><path d="M12 14v4"/>',
    boiler:'<rect x="6" y="4" width="12" height="16" rx="3"/><path d="M12 8v4M12 8l-2 2M12 8l2 2"/>',
    oven:'<rect x="4" y="4" width="16" height="16" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="9" y1="15" x2="15" y2="15"/>',
    cooktop:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/>',
    vacuum:'<circle cx="10" cy="14" r="5"/><path d="M15 14h5v-4l-3-2"/><path d="M10 9V6"/>',
    hood:'<path d="M4 14h16v6H4z"/><path d="M7 14V6h10v8"/><circle cx="12" cy="17" r="1"/>',
    gas:'<circle cx="8" cy="12" r="3"/><circle cx="16" cy="12" r="3"/><path d="M8 9c0-1.5 0-3 0-4M16 9c0-1.5 0-3 0-4"/>',
    small:'<path d="M9 3h6v6a3 3 0 0 1-6 0V3z"/><path d="M12 12v4"/><rect x="8" y="16" width="8" height="5" rx="1"/>',
    micro:'<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="15" cy="12" r="3"/><line x1="7" y1="12" x2="7.01" y2="12"/>'
  };
  function cardHTML(p) {
    var icon = ICONS[p.cat] || ICONS.wash;
    var catName = CATS[p.cat] || '';
    return '<a class="blog-card" href="blog-'+p.slug+'.html">' +
      '<div class="blog-card__cover"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">'+icon+'</svg></div>' +
      '<div class="blog-card__body">' +
        '<div class="blog-card__meta"><span class="blog-card__cat">'+catName+'</span><span class="blog-card__sep">·</span><span>'+p.time+' мин</span></div>' +
        '<div class="blog-card__title">'+p.title+'</div>' +
        '<p class="blog-card__text">'+p.excerpt+'</p>' +
        '<span class="blog-card__link">Читать статью<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span>' +
      '</div></a>';
  }

  window.BLOG_VIEW = { categories: CATS, cardHTML: cardHTML };
})();
