(function () {
  var data = (window.BSL_FINDINGS && window.BSL_FINDINGS) || { entries: [] };
  var BSL = window.BSL;
  var list = BSL.qs("#finding-list");

  if (!list) return;

  if (!data.entries.length) {
    list.innerHTML =
      '<div class="empty"><h3>No positive findings yet</h3>' +
      "<p>This section fills up as real test runs surface behavior that beats expectations. Sample entries, if any, are clearly marked.</p></div>";
    return;
  }

  list.innerHTML = data.entries.map(function (f) {
    var badges = f.dataType === "SAMPLE" ? BSL.sampleBadge() : BSL.statusBadge("PASS");
    var issue = f.githubIssue
      ? '<a href="' + BSL.escapeHtml(f.githubIssue) + '" target="_blank" rel="noopener">' + BSL.escapeHtml(f.githubIssue) + "</a>"
      : '<span class="muted">Not linked</span>';

    return (
      '<article class="record">' +
        '<div class="record-head">' +
          '<div class="record-title"><span class="id">' + BSL.escapeHtml(f.id) + "</span><h3>" + BSL.escapeHtml(f.title) + "</h3></div>" +
          "<div>" + badges + "</div>" +
        "</div>" +
        '<div class="record-meta">' +
          '<span class="chip">' + BSL.escapeHtml(f.platform) + "</span>" +
          '<span class="chip">' + BSL.escapeHtml(f.feature) + "</span>" +
          '<span class="chip">' + BSL.escapeHtml(f.date) + "</span>" +
        "</div>" +
        '<div class="record-fields">' +
          '<div class="field"><div class="k">Summary</div><span class="v">' + BSL.escapeHtml(f.summary) + "</span></div>" +
          '<div class="field"><div class="k">Evidence</div><span class="v muted">' + ((f.evidence && f.evidence.length) ? f.evidence.join(", ") : "None captured") + "</span></div>" +
          '<div class="field"><div class="k">GitHub issue</div>' + issue + "</div>" +
        "</div>" +
        '<div class="record-notes">' + BSL.escapeHtml(f.notes) + "</div>" +
      "</article>"
    );
  }).join("");
})();
