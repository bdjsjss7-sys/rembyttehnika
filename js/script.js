/* ============================================================
   РемБытТехника — Скрипты v5
   ============================================================ */

(function () {
  'use strict';

  /* ДАННЫЕ КАЛЬКУЛЯТОРА */
  var CALC_DATA = {
    wash: {
      label: 'Стиральная',
      issues: [
        { label: 'Не сливает воду', price: 45 },
        { label: 'Не набирает воду', price: 45 },
        { label: 'Не отжимает', price: 55 },
        { label: 'Шумит при отжиме', price: 90 },
        { label: 'Течёт вода', price: 45 },
        { label: 'Не греет воду', price: 50 },
        { label: 'Ошибка дисплея', price: 55 },
        { label: 'Не включается', price: 45 }
      ]
    },
    dish: {
      label: 'Посудомойка',
      issues: [
        { label: 'Не сливает (E15, F11)', price: 45 },
        { label: 'Не набирает (F24)', price: 45 },
        { label: 'Плохо моет', price: 40 },
        { label: 'Не сушит', price: 45 },
        { label: 'Течёт вода', price: 45 },
        { label: 'Дверца не открывается', price: 40 },
        { label: 'Ошибка дисплея', price: 55 },
        { label: 'Посторонний шум', price: 50 }
      ]
    },
    tv: {
      label: 'Телевизор',
      issues: [
        { label: 'Не включается', price: 55 },
        { label: 'Нет изображения', price: 60 },
        { label: 'Нет звука', price: 50 },
        { label: 'Полосы на экране', price: 70 },
        { label: 'Подсветка не работает', price: 90 },
        { label: 'Сам выключается', price: 60 },
        { label: 'HDMI не работает', price: 50 },
        { label: 'Пульт не реагирует', price: 40 }
      ]
    },
    coffee: {
      label: 'Кофемашина',
      issues: [
        { label: 'Не наливает кофе', price: 55 },
        { label: 'Течёт снизу', price: 65 },
        { label: 'Не греет воду', price: 60 },
        { label: 'Капучинатор', price: 55 },
        { label: 'Не мелет кофе', price: 60 },
        { label: 'Ошибка дисплея', price: 65 },
        { label: 'Шумит / гудит', price: 55 },
        { label: 'Просит промывку', price: 50 }
      ]
    },
    vacuum: {
      label: 'Пылесос',
      issues: [
        { label: 'Не включается', price: 30 },
        { label: 'Плохо сосёт', price: 30 },
        { label: 'Шумит / вибрирует', price: 30 },
        { label: 'Аккумулятор садится', price: 50 },
        { label: 'Не крутится щётка', price: 35 },
        { label: 'Не заряжается', price: 40 },
        { label: 'Робот не находит базу', price: 45 },
        { label: 'Робот не выезжает', price: 45 }
      ]
    },
    boiler: {
      label: 'Водонагреватель',
      issues: [
        { label: 'Не греет воду', price: 45 },
        { label: 'Слабо греет', price: 50 },
        { label: 'Течёт вода', price: 50 },
        { label: 'Выбивает автомат', price: 55 },
        { label: 'Не включается', price: 40 },
        { label: 'Шумит при нагреве', price: 45 },
        { label: 'Ошибка дисплея', price: 55 }
      ]
    },
    oven: {
      label: 'Духовка',
      issues: [
        { label: 'Не греет', price: 45 },
        { label: 'Нет конвекции', price: 50 },
        { label: 'Пиролиз не работает', price: 65 },
        { label: 'Гриль не работает', price: 50 },
        { label: 'Дверца не закрывается', price: 40 },
        { label: 'Таймер не работает', price: 45 },
        { label: 'Свет не горит', price: 30 },
        { label: 'Ошибка дисплея', price: 55 }
      ]
    },
    cooktop: {
      label: 'Варочная',
      issues: [
        { label: 'Не включается', price: 55 },
        { label: 'Не греет зона', price: 55 },
        { label: 'Сенсоры не реагируют', price: 60 },
        { label: 'Ошибка дисплея', price: 60 },
        { label: 'Выбивает автомат', price: 65 },
        { label: 'Трещина на стекле', price: 90 },
        { label: 'Таймер не работает', price: 55 }
      ]
    },
    micro: {
      label: 'Микроволновка',
      issues: [
        { label: 'Не греет', price: 45 },
        { label: 'Искрит внутри', price: 35 },
        { label: 'Поддон не крутится', price: 35 },
        { label: 'Не включается', price: 40 },
        { label: 'Гриль не работает', price: 45 },
        { label: 'Шумит', price: 40 },
        { label: 'Свет не горит', price: 30 }
      ]
    },
    hood: {
      label: 'Вытяжка',
      issues: [
        { label: 'Мотор не работает', price: 50 },
        { label: 'Подсветка не работает', price: 30 },
        { label: 'Слабо всасывает', price: 40 },
        { label: 'Шумит / вибрирует', price: 45 },
        { label: 'Кнопки не реагируют', price: 50 },
        { label: 'Течёт / капает', price: 40 }
      ]
    },
    gas: {
      label: 'Газовая плита',
      issues: [
        { label: 'Не зажигается', price: 35 },
        { label: 'Гаснет пламя', price: 40 },
        { label: 'Слабый огонь', price: 35 },
        { label: 'Розжиг не работает', price: 40 },
        { label: 'Забиты форсунки', price: 35 },
        { label: 'Течёт газ', price: 55 }
      ]
    },
    small: {
      label: 'Фен',
      issues: [
        { label: 'Не включается', price: 30 },
        { label: 'Не греет', price: 30 },
        { label: 'Слабо дует пар', price: 30 },
        { label: 'Течёт вода', price: 30 },
        { label: 'Шумит', price: 30 },
        { label: 'Регулятор не работает', price: 30 }
      ]
    }
  };

  /* HEADER SCROLL */
  function initHeaderScroll() {
    var header = document.getElementById('header');
    var topbar = document.getElementById('topbar');
    if (!header) return;
    var ticking = false;
    function update() {
      if (document.body.classList.contains('menu-open')) { ticking = false; return; }
      if (window.scrollY > 24) {
        header.classList.add('is-scrolled');
        if (topbar) topbar.classList.add('is-hidden');
      } else {
        header.classList.remove('is-scrolled');
        if (topbar) topbar.classList.remove('is-hidden');
      }
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* BURGER */
  function initBurger() {
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    if (!burger || !nav) return;
    var mobile = window.matchMedia('(max-width: 1024px)');
    var header = document.getElementById('header');
    var lockedStyles = null;
    var scrollY = 0;
    var background = [];
    var opened = false;
    burger.setAttribute('aria-controls', 'nav');

    function setOpen(open, restoreFocus) {
      open = open && mobile.matches;
      if (opened === open) {
        nav.inert = mobile.matches && !open;
        burger.setAttribute('aria-expanded', String(open));
        return;
      }
      opened = open;
      burger.classList.toggle('is-open', open);
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      nav.inert = mobile.matches && !open;
      if (open) {
        scrollY = window.scrollY;
        lockedStyles = {};
        ['position', 'top', 'width', 'overflow'].forEach(function (key) {
          lockedStyles[key] = document.body.style[key];
        });
        document.body.classList.add('menu-open');
        document.body.style.position = 'fixed';
        document.body.style.top = -scrollY + 'px';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        background = [];
        Array.prototype.forEach.call(document.body.children, function (el) {
          if (el !== header && !/^(SCRIPT|STYLE|LINK)$/.test(el.tagName)) {
            background.push({ el: el, inert: el.inert });
            el.inert = true;
          }
        });
      } else {
        background.forEach(function (item) { item.el.inert = item.inert; });
        background = [];
        document.body.classList.remove('menu-open');
        if (lockedStyles) {
          Object.keys(lockedStyles).forEach(function (key) { document.body.style[key] = lockedStyles[key]; });
          lockedStyles = null;
          var behavior = document.documentElement.style.scrollBehavior;
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo(0, scrollY);
          document.documentElement.style.scrollBehavior = behavior;
        }
        if (restoreFocus) burger.focus({ preventScroll: true });
      }
    }
    burger.addEventListener('click', function () { setOpen(!opened, true); });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false, true);
    });
    document.addEventListener('keydown', function (e) {
      if (!opened) return;
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false, true); }
      if (e.key === 'Tab') {
        var controls = [burger].concat(Array.prototype.slice.call(nav.querySelectorAll('a[href]')));
        var index = controls.indexOf(document.activeElement);
        e.preventDefault();
        var next = index < 0 ? 0 : (index + (e.shiftKey ? -1 : 1) + controls.length) % controls.length;
        controls[next].focus();
      }
    });
    function onBreakpoint() { setOpen(false, false); nav.inert = mobile.matches; }
    if (mobile.addEventListener) mobile.addEventListener('change', onBreakpoint);
    else mobile.addListener(onBreakpoint);
    window.addEventListener('pagehide', function () { setOpen(false, false); });
    onBreakpoint();
  }

  /* SMOOTH SCROLL */
  function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        if (!id || id === '#' || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    }
  }

  /* REVEAL */
  function initReveal() {
    var els = document.querySelectorAll('.head, .service-row, .stat-block, .tl-step, .not-doing, .testimonial, .form-wrap');
    if (!els.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('is-visible');
      return;
    }
    for (var j = 0; j < els.length; j++) els[j].classList.add('reveal');
    var observer = new IntersectionObserver(function (entries) {
      for (var k = 0; k < entries.length; k++) {
        if (entries[k].isIntersecting) {
          entries[k].target.classList.add('is-visible');
          observer.unobserve(entries[k].target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    for (var l = 0; l < els.length; l++) observer.observe(els[l]);
  }

  /* КАЛЬКУЛЯТОР */
  function initHeroCalc() {
    var typesWrap = document.getElementById('calcTypes');
    var issuesWrap = document.getElementById('calcIssues');
    var valueEl = document.getElementById('calcValue');
    if (!typesWrap || !issuesWrap || !valueEl) return;

    var state = { type: 'wash', issue: 0 };

    function renderTypes() {
      var html = '';
      for (var key in CALC_DATA) {
        if (!CALC_DATA.hasOwnProperty(key)) continue;
        var cls = key === state.type ? 'hero-calc__chip is-active' : 'hero-calc__chip';
        html += '<button type="button" class="' + cls + '" data-value="' + key + '">' + CALC_DATA[key].label + '</button>';
      }
      typesWrap.innerHTML = html;
    }

    function renderIssues() {
      var issues = CALC_DATA[state.type].issues;
      var html = '';
      for (var i = 0; i < issues.length; i++) {
        var cls = i === state.issue ? 'hero-calc__chip is-active' : 'hero-calc__chip';
        html += '<button type="button" class="' + cls + '" data-index="' + i + '">' + issues[i].label + '</button>';
      }
      issuesWrap.innerHTML = html;
    }

    function updatePrice() {
      var issue = CALC_DATA[state.type].issues[state.issue];
      if (!issue) return;
      valueEl.style.opacity = '0';
      setTimeout(function () {
        valueEl.textContent = 'от ' + issue.price + ' BYN';
        valueEl.style.opacity = '1';
      }, 120);
    }

    typesWrap.addEventListener('click', function (e) {
      var chip = e.target.closest('.hero-calc__chip');
      if (!chip) return;
      var val = chip.dataset.value;
      if (!val || val === state.type) return;
      state.type = val;
      state.issue = 0;
      renderTypes();
      renderIssues();
      updatePrice();
    });

    issuesWrap.addEventListener('click', function (e) {
      var chip = e.target.closest('.hero-calc__chip');
      if (!chip) return;
      var idx = parseInt(chip.dataset.index, 10);
      if (isNaN(idx) || idx === state.issue) return;
      state.issue = idx;
      renderIssues();
      updatePrice();
    });

    renderTypes();
    renderIssues();
    updatePrice();
  }

  /* ОТЗЫВЫ */
  function initTestimonial() {
    var block = document.getElementById('testimonial');
    if (!block) return;
    var data = [
      { text: 'Стиральная машина Bosch перестала сливать воду. Позвонил — сказали привезти в мастерскую. Нашли засор помпы, заменили за день, взяли 65 рублей. Работает как новая.', name: 'Андрей', device: 'Стиральная машина Bosch' },
      { text: 'Телевизор Samsung перестал включаться. В сервисе по гарантии сказали, что ремонт нецелесообразен. Здесь нашли проблему в блоке питания, заменили за 2 дня. Работает уже год.', name: 'Марина', device: 'Телевизор Samsung' },
      { text: 'Посудомойка Indesit выдавала ошибку E15. Ребята быстро разобрались, заменили уплотнитель. Обошлось в 50 рублей, а не в новый агрегат. Спасибо.', name: 'Дмитрий', device: 'Посудомойка Indesit' },
      { text: 'Кофемашина DeLonghi перестала подавать воду. Думал, всё — покупать новую. Починили за день, заменили помпу. Работает отлично.', name: 'Елена', device: 'Кофемашина DeLonghi' },
      { text: 'Водонагреватель потёк. Привёз в мастерскую, заменили ТЭН и анод, почистили от накипи. 70 рублей и всё работает. Рекомендую.', name: 'Сергей', device: 'Водонагреватель' }
    ];
    var current = 0;
    var quoteEl = document.getElementById('testimonialQuote');
    var nameEl = document.getElementById('testimonialName');
    var avatarEl = document.getElementById('testimonialAvatar');
    var deviceEl = document.getElementById('testimonialDevice');
    var dotsWrap = document.getElementById('testimonialDots');
    var prevBtn = document.getElementById('testimonialPrev');
    var nextBtn = document.getElementById('testimonialNext');
    if (!quoteEl || !nameEl || !avatarEl || !deviceEl || !dotsWrap) return;

    function render() {
      var item = data[current];
      quoteEl.style.opacity = '0';
      setTimeout(function () {
        quoteEl.textContent = item.text;
        nameEl.textContent = item.name;
        deviceEl.textContent = item.device;
        avatarEl.textContent = item.name.charAt(0);
        quoteEl.style.transition = 'opacity 0.35s';
        quoteEl.style.opacity = '1';
      }, 200);
      var dots = dotsWrap.querySelectorAll('.testimonial__dot');
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('is-active', i === current);
      }
    }

    for (var i = 0; i < data.length; i++) {
      (function (idx) {
        var dot = document.createElement('button');
        dot.className = 'testimonial__dot' + (idx === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Отзыв ' + (idx + 1));
        dot.addEventListener('click', function () { current = idx; render(); });
        dotsWrap.appendChild(dot);
      })(i);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { current = (current - 1 + data.length) % data.length; render(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { current = (current + 1) % data.length; render(); });

    render();
  }

  /* ФОРМЫ */
  function initForms() {
    var forms = document.querySelectorAll('form[data-formspree]');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function (e) {
        e.preventDefault();
        var form = this;
        var btn = form.querySelector('button[type="submit"]');
        var original = btn ? btn.innerHTML : '';
        if (!/^https:\/\/formspree\.io\/f\/[a-z0-9]+$/i.test(form.getAttribute('action') || '')) {
          showMessage(form, 'error', 'Для обращения позвоните: +375 29 108-79-79');
          return;
        }
        var data = new FormData(form);
        if (btn) { btn.disabled = true; btn.style.opacity = '0.7'; btn.innerHTML = 'Отправляем...'; }
        fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } })
          .then(function (r) {
            if (r.ok) {
              showMessage(form, 'success', 'Спасибо! Мы перезвоним в течение 30 минут.');
              form.reset();
            } else {
              showMessage(form, 'error', 'Что-то пошло не так. Позвоните: +375 29 108-79-79');
            }
          })
          .catch(function () {
            showMessage(form, 'error', 'Ошибка соединения. Позвоните: +375 29 108-79-79');
          })
          .finally(function () {
            if (btn) { btn.disabled = false; btn.style.opacity = ''; btn.innerHTML = original; }
          });
      });
    }
  }

  function showMessage(form, type, text) {
    var existing = form.querySelector('.form__message');
    if (existing) existing.remove();
    var msg = document.createElement('div');
    msg.className = 'form__message';
    msg.textContent = text;
    msg.style.padding = '12px 14px';
    msg.style.borderRadius = '8px';
    msg.style.fontSize = '14px';
    msg.style.fontWeight = '500';
    msg.style.marginTop = '8px';
    if (type === 'success') {
      msg.style.background = 'rgba(16,185,129,0.12)';
      msg.style.color = '#047857';
      msg.style.border = '1px solid rgba(16,185,129,0.28)';
    } else {
      msg.style.background = 'rgba(239,68,68,0.10)';
      msg.style.color = '#B91C1C';
      msg.style.border = '1px solid rgba(239,68,68,0.28)';
    }
    form.appendChild(msg);
    setTimeout(function () { msg.remove(); }, 8000);
  }

  /* МАСКА ТЕЛЕФОНА */
  function initPhoneMask() {
    var inputs = document.querySelectorAll('input[data-phone]');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', function (e) {
        var v = e.target.value.replace(/\D/g, '');
        if (v.indexOf('80') === 0) v = '375' + v.slice(2);
        v = v.slice(0, 12);
        var f = '';
        if (v.length > 0) f = '+';
        if (v.length > 0) f += v.slice(0, 3);
        if (v.length > 3) f += ' ' + v.slice(3, 5);
        if (v.length > 5) f += ' ' + v.slice(5, 8);
        if (v.length > 8) f += '-' + v.slice(8, 10);
        if (v.length > 10) f += '-' + v.slice(10, 12);
        e.target.value = f;
      });
    }
  }

  /* CURRENT PAGE */
  function initCurrentPage() {
    var nav = document.getElementById('nav');
    if (!nav) return;
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (!href) continue;
      links[i].classList.remove('is-current');
      links[i].removeAttribute('aria-current');
      if (href === path || (path.indexOf('blog-') === 0 && href === 'blog.html')) {
        links[i].classList.add('is-current');
        links[i].setAttribute('aria-current', 'page');
      }
    }
  }

  function init() {
    initHeaderScroll();
    initBurger();
    initSmoothScroll();
    initReveal();
    initHeroCalc();
    initTestimonial();
    initForms();
    initPhoneMask();
    initCurrentPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
