(function () {
  'use strict';

  // ---------- Back-to-top floating button ----------
  var SVG_NS = 'http://www.w3.org/2000/svg';

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.setAttribute('hidden', '');

  var svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 20 20');
  svg.setAttribute('aria-hidden', 'true');
  var path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', 'M10 4 v 12 M4 10 l 6 -6 6 6');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '2.2');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(path);
  btn.appendChild(svg);

  var label = document.createElement('span');
  label.className = 'to-top__label';
  label.textContent = 'Top';
  btn.appendChild(label);

  function attach() {
    document.body.appendChild(btn);

    var threshold = 320;
    var visible = false;
    function update() {
      var y = window.scrollY || window.pageYOffset || 0;
      var shouldShow = y > threshold;
      if (shouldShow !== visible) {
        visible = shouldShow;
        if (visible) {
          btn.removeAttribute('hidden');
          requestAnimationFrame(function () { btn.classList.add('is-visible'); });
        } else {
          btn.classList.remove('is-visible');
          window.setTimeout(function () {
            if (!visible) btn.setAttribute('hidden', '');
          }, 220);
        }
      }
    }

    var prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    btn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
      var skip = document.querySelector('.skip-link') || document.body;
      if (skip && skip.focus) {
        skip.setAttribute('tabindex', '-1');
        skip.focus({ preventScroll: true });
      }
    });

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();
