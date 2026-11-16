// Barre de progression, apparition des blocs au scroll, point actif de la navigation.
(function () {
  var progress = document.querySelector('.progress');
  function onScroll() {
    var h = document.documentElement;
    var p = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
    progress.style.width = (p * 100).toFixed(2) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.rv').forEach(function (el) {
    if (reduce) el.classList.add('in');
    else io.observe(el);
  });

  var links = Array.prototype.slice.call(document.querySelectorAll('.dots a'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var so = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove('on'); });
      var a = map[e.target.id];
      if (a) a.classList.add('on');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach(function (s) { so.observe(s); });
})();
