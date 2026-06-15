/* ============================================================
   CuriTech — interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---- sticky nav shadow ---- */
  var nav = document.querySelector('.nav');
  function onScroll() {
    if (window.scrollY > 8) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile drawer ---- */
  var toggle = document.querySelector('.nav__toggle');
  var drawer = document.querySelector('.drawer');
  function closeDrawer() {
    toggle.classList.remove('is-open');
    drawer.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = toggle.classList.toggle('is-open');
      drawer.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }

  /* ---- scroll spy ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var byId = {};
  links.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    byId[id] = a;
  });
  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  var current = null;
  function setActive(id) {
    if (id === current) return;
    current = id;
    links.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href').slice(1) === id);
    });
    var active = byId[id];
    if (active && active.parentElement) {
      var p = active.parentElement;
      var target = active.offsetLeft - p.clientWidth / 2 + active.clientWidth / 2;
      p.scrollTo({ left: target, behavior: 'smooth' });
    }
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(function (s) { observer.observe(s); });

  /* ---- accordions ---- */
  document.querySelectorAll('.acc__head').forEach(function (head) {
    head.addEventListener('click', function () {
      var item = head.closest('.acc__item');
      var open = item.classList.toggle('is-open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---- process tabs ---- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('.proc-tab');
    var panelHost = document.querySelector(group.getAttribute('data-tabs'));
    var panels = panelHost ? panelHost.querySelectorAll('.proc-panel') : [];
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-target');
        tabs.forEach(function (t) { t.classList.toggle('is-active', t === tab); });
        panels.forEach(function (p) { p.classList.toggle('is-active', p.id === target); });
      });
    });
  });

})();
