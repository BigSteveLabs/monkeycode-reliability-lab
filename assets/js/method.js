(function () {
  var data = (window.BSL_METHODS && window.BSL_METHODS) || { approaches: [], lifecycle: {} };
  var BSL = window.BSL;

  var list = BSL.qs("#method-list");
  if (list && data.approaches.length) {
    list.innerHTML = data.approaches.map(function (m) {
      var status = m.status === "PLANNED"
        ? '<span class="badge badge-planned">PLANNED</span>'
        : BSL.statusBadge(m.status);
      var steps = (m.steps || []).map(function (s) { return "<li>" + BSL.escapeHtml(s) + "</li>"; }).join("");
      return (
        '<article class="method">' +
          '<div class="num">' + BSL.escapeHtml(m.id) + "</div>" +
          '<div>' +
            "<h3>" + BSL.escapeHtml(m.name) + " " + status + "</h3>" +
            '<p class="summary">' + BSL.escapeHtml(m.summary) + "</p>" +
            "<ol>" + steps + "</ol>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  var life = BSL.qs("#lifecycle");
  if (life && data.lifecycle && data.lifecycle.stages) {
    life.innerHTML = data.lifecycle.stages.map(function (s, i) {
      return "<li><b>" + (i + 1) + ". " + BSL.escapeHtml(s) + "</b></li>";
    }).join("");
  }
})();
