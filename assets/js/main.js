(function () {
  var SAMPLE_BANNER = "All records on this page are SAMPLE DATA except where explicitly marked VERIFIED. One real, verified result exists: the prototype build that produced this site. Everything else exists to demonstrate the dashboard design and schema.";

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function statusBadge(status) {
    var map = {
      "PASS": ["badge-pass", "PASS"],
      "FAIL": ["badge-fail", "FAIL"],
      "BLOCKED": ["badge-blocked", "BLOCKED"],
      "UNCONFIRMED": ["badge-unconfirmed", "UNCONFIRMED"],
      "PLANNED": ["badge-planned", "PLANNED"]
    };
    var m = map[status] || ["badge-muted", status || "N/A"];
    return '<span class="badge ' + m[0] + '">' + escapeHtml(m[1]) + "</span>";
  }

  function sampleBadge() {
    return '<span class="badge badge-sample">SAMPLE</span>';
  }

  function realBadge() {
    return '<span class="badge badge-real">VERIFIED</span>';
  }

  function boltIcon() {
    return '<svg class="bolt" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4.5 13.5h5L9.5 22 19 9.5h-5L13 2Z"/></svg>';
  }

  function chips(arr) {
    return (arr || []).map(function (x) { return '<span class="chip">' + escapeHtml(x) + "</span>"; }).join(" ");
  }

  function formatValue(v) {
    if (v === null || v === undefined || v === "") return '<span class="v muted">Not recorded</span>';
    if (typeof v === "number") return '<span class="v mono">' + v + "</span>";
    return '<span class="v">' + escapeHtml(v) + "</span>";
  }

  function initShell() {
    var toggle = qs(".nav-toggle");
    var nav = qs(".nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () { nav.classList.toggle("open"); });
      document.addEventListener("click", function (e) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove("open");
      });
    }
    var banner = qs("[data-sample-banner]");
    if (banner && !banner.dataset.injected) {
      banner.dataset.injected = "1";
      banner.innerHTML =
        '<div class="banner"><span><strong>SAMPLE DATA.</strong> ' + SAMPLE_BANNER + "</span></div>";
    }
  }

  function fieldHtml(k, v) {
    var vHtml = formatValue(v);
    return '<div class="field"><div class="k">' + escapeHtml(k) + "</div>" + vHtml + "</div>";
  }

  window.BSL = {
    qs: qs,
    qsa: qsa,
    escapeHtml: escapeHtml,
    statusBadge: statusBadge,
    sampleBadge: sampleBadge,
    realBadge: realBadge,
    boltIcon: boltIcon,
    chips: chips,
    fieldHtml: fieldHtml,
    initShell: initShell
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initShell);
  } else {
    initShell();
  }
})();
