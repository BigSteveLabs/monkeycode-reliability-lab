(function () {
  var data = (window.BSL_BUGS && window.BSL_BUGS) || { entries: [] };
  var BSL = window.BSL;
  var list = BSL.qs("#bug-list");

  if (!list) return;

  if (!data.entries.length) {
    list.innerHTML =
      '<div class="empty"><h3>No reproducible bugs yet</h3>' +
      "<p>This section stays empty until a bug is observed and reproduced at least twice on demand. Sample entries, if any, are clearly marked.</p></div>";
    return;
  }

  list.innerHTML = data.entries.map(function (b) {
    var badges = BSL.statusBadge(b.status);
    if (b.dataType === "SAMPLE") badges += " " + BSL.sampleBadge();
    var steps = (b.stepsToReproduce || []).map(function (s) { return "<li>" + BSL.escapeHtml(s) + "</li>"; }).join("");
    var issue = b.githubIssue
      ? '<a href="' + BSL.escapeHtml(b.githubIssue) + '" target="_blank" rel="noopener">' + BSL.escapeHtml(b.githubIssue) + "</a>"
      : '<span class="muted">Not linked</span>';

    return (
      '<article class="record">' +
        '<div class="record-head">' +
          '<div class="record-title"><span class="id">' + BSL.escapeHtml(b.id) + "</span><h3>" + BSL.escapeHtml(b.title) + "</h3></div>" +
          "<div>" + badges + "</div>" +
        "</div>" +
        '<div class="record-meta">' +
          '<span class="chip">' + BSL.escapeHtml(b.platform) + "</span>" +
          '<span class="chip">' + BSL.escapeHtml(b.feature) + "</span>" +
          '<span class="chip">First seen ' + BSL.escapeHtml(b.firstSeen) + "</span>" +
          '<span class="chip">Severity: ' + BSL.escapeHtml(b.severity) + "</span>" +
        "</div>" +
        '<div class="record-fields">' +
          '<div class="field"><div class="k">Steps to reproduce</div><ol class="v">' + steps + "</ol></div>" +
          BSL.fieldHtml("Expected", b.expected) +
          BSL.fieldHtml("Actual", b.actual) +
          '<div class="field"><div class="k">GitHub issue</div>' + issue + "</div>" +
        "</div>" +
        '<div class="record-notes">' + BSL.escapeHtml(b.notes) + "</div>" +
      "</article>"
    );
  }).join("");
})();
