(function () {
  var data = (window.BSL_LIMITS && window.BSL_LIMITS) || { entries: [] };
  var BSL = window.BSL;
  var list = BSL.qs("#limit-list");

  if (!list) return;

  list.innerHTML = data.entries.map(function (l) {
    return (
      '<article class="record">' +
        '<div class="record-head">' +
          '<div class="record-title"><span class="id">' + BSL.escapeHtml(l.id) + "</span><h3>" + BSL.escapeHtml(l.title) + "</h3></div>" +
          '<span class="badge badge-muted">LIMITATION</span>' +
        "</div>" +
        '<div class="record-fields">' +
          BSL.fieldHtml("Description", l.description) +
          BSL.fieldHtml("Impact", l.impact) +
          BSL.fieldHtml("Mitigation", l.mitigation) +
        "</div>" +
      "</article>"
    );
  }).join("");
})();
