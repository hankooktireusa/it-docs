// assets/js/details-toggle.js
(function () {
  // 1) Ensure cursor shows clickable summary
  try {
    var s = document.createElement('style');
    s.innerHTML = 'summary{cursor:pointer}';
    document.head.appendChild(s);
  } catch (e) {}

  var supportsDetails = 'open' in document.createElement('details');

  // 2) Collapse all details by default (remove stray "open" attributes)
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('details[open]').forEach(function (d) {
      d.removeAttribute('open');
    });

    if (supportsDetails) return; // Native support → done

    // 3) Polyfill for browsers without details/summary
    document.querySelectorAll('details').forEach(function (d) {
      var summary = d.querySelector('summary');
      var content = Array.prototype.slice.call(d.childNodes).filter(function (n) {
        return n !== summary;
      });

      // Hide content initially
      content.forEach(function (n) {
        if (n.nodeType === 1) n.style.display = 'none';
      });

      if (!summary) return;
      summary.addEventListener('click', function (e) {
        e.preventDefault();
        var open = d.getAttribute('data-open') === 'true';
        // Toggle
        open = !open;
        d.setAttribute('data-open', String(open));
        content.forEach(function (n) {
          if (n.nodeType === 1) n.style.display = open ? '' : 'none';
        });
      });
    });
  });
})();
