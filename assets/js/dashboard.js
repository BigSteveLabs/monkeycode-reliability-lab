(function () {
  var records = (window.BSL_DATA && window.BSL_DATA.records) || [];
  var BSL = window.BSL;

  var includeSamples = false;

  function uniqueSorted(arr) {
    return Array.from(new Set(arr)).filter(Boolean).sort(function (a, b) {
      return a.localeCompare(b);
    });
  }

  function populateSelect(sel, allLabel, options) {
    sel.innerHTML = '<option value="all">' + BSL.escapeHtml(allLabel) + "</option>";
    options.forEach(function (opt) {
      var el = document.createElement("option");
      el.value = opt;
      el.textContent = opt;
      sel.appendChild(el);
    });
  }

  var fPlatform = BSL.qs("#f-platform");
  var fFeature = BSL.qs("#f-feature");
  var fStatus = BSL.qs("#f-status");
  var fSearch = BSL.qs("#f-search");
  var fSamples = BSL.qs("#f-samples");
  var fReset = BSL.qs("#f-reset");
  var recordList = BSL.qs("#record-list");
  var resultCount = BSL.qs("#result-count");
  var sampleNote = BSL.qs("#sample-note");

  function pool() {
    return records.filter(function (r) {
      return includeSamples || r.dataType !== "SAMPLE";
    });
  }

  function refreshSelects() {
    var curP = fPlatform.value;
    var curF = fFeature.value;
    var platforms = uniqueSorted(pool().map(function (r) { return r.platform; }));
    var features = uniqueSorted(pool().map(function (r) { return r.feature; }));
    populateSelect(fPlatform, "All platforms", platforms);
    populateSelect(fFeature, "All features", features);
    if (platforms.indexOf(curP) === -1) fPlatform.value = "all";
    if (features.indexOf(curF) === -1) fFeature.value = "all";
  }

  refreshSelects();

  function currentFilters() {
    return {
      platform: fPlatform.value,
      feature: fFeature.value,
      status: fStatus.value,
      search: (fSearch.value || "").toLowerCase().trim()
    };
  }

  function matches(rec, f) {
    if (f.platform !== "all" && rec.platform !== f.platform) return false;
    if (f.feature !== "all" && rec.feature !== f.feature) return false;
    if (f.status !== "all" && rec.status !== f.status) return false;
    if (f.search) {
      var hay = [
        rec.id, rec.platform, rec.feature, rec.status, rec.clientVersion,
        rec.expectedResult, rec.actualResult, rec.notes, rec.accountMethod
      ].join(" ").toLowerCase();
      if (hay.indexOf(f.search) === -1) return false;
    }
    return true;
  }

  function sortRecords(list) {
    return list.sort(function (a, b) {
      var av = a.dataType === "REAL" ? 0 : 1;
      var bv = b.dataType === "REAL" ? 0 : 1;
      if (av !== bv) return av - bv;
      return a.id.localeCompare(b.id);
    });
  }

  function renderStats(filtered, visiblePool) {
    var pass = 0, fail = 0, blocked = 0;
    filtered.forEach(function (r) {
      if (r.status === "PASS") pass++;
      else if (r.status === "FAIL") fail++;
      else if (r.status === "BLOCKED") blocked++;
    });
    BSL.qs("#stat-total").textContent = filtered.length;
    BSL.qs("#stat-pass").textContent = pass;
    BSL.qs("#stat-fail").textContent = fail;
    BSL.qs("#stat-blocked").textContent = blocked;
    BSL.qs("#stat-features").textContent = uniqueSorted(visiblePool.map(function (r) { return r.feature; })).length;
  }

  function evidenceHtml(rec) {
    if (!rec.evidence || rec.evidence.length === 0) return '<div class="field"><div class="k">Evidence</div><span class="v muted">None captured</span></div>';
    var items = rec.evidence.map(function (e) {
      if (typeof e === "string") return '<span class="chip">' + BSL.escapeHtml(e) + "</span>";
      var label = e.label || e.url;
      return '<a class="chip" href="' + BSL.escapeHtml(e.url || "#") + '" target="_blank" rel="noopener">' + BSL.escapeHtml(label) + "</a>";
    }).join(" ");
    return '<div class="field"><div class="k">Evidence</div>' + items + "</div>";
  }

  function issueHtml(rec) {
    var gh = rec.githubIssue;
    if (gh) {
      var label = typeof gh === "string" ? gh : (gh.number ? "#" + gh.number : gh.url);
      var url = typeof gh === "string" ? gh : (gh.url || ("https://github.com/" + (gh.repo || "") + "/issues/" + (gh.number || "")));
      return '<div class="field"><div class="k">Related GitHub issue</div><a class="v" href="' + BSL.escapeHtml(url) + '" target="_blank" rel="noopener">' + BSL.escapeHtml(label) + "</a></div>";
    }
    return '<div class="field"><div class="k">Related GitHub issue</div><span class="v muted">Not linked</span></div>';
  }

  function recordCard(rec) {
    var badges = BSL.statusBadge(rec.status);
    var isReal = rec.dataType === "REAL";
    if (isReal) badges = BSL.realBadge() + " " + badges;
    else if (rec.dataType === "SAMPLE") badges += " " + BSL.sampleBadge();
    var quota = rec.quotaBefore === null || rec.quotaBefore === undefined
      ? '<span class="v muted">Not recorded</span>'
      : '<span class="v mono">' + BSL.escapeHtml(rec.quotaBefore) + " &rarr; " + BSL.escapeHtml(rec.quotaAfter) + "</span>";
    if (rec.quotaTokensUsed) {
      quota += '<div style="margin-top:4px;"><span class="v muted">Tokens used: ' + BSL.escapeHtml(rec.quotaTokensUsed) + "</span></div>";
    }

    return (
      '<article class="record' + (isReal ? " record-real" : "") + '">' +
        '<div class="record-head">' +
          '<div class="record-title">' +
            '<span class="id">' + BSL.escapeHtml(rec.id) + "</span>" +
            "<h3>" + BSL.escapeHtml(rec.feature) + "</h3>" +
          "</div>" +
          "<div>" + badges + "</div>" +
        "</div>" +
        '<div class="record-meta">' +
          '<span class="chip">' + BSL.escapeHtml(rec.platform) + "</span>" +
          '<span class="chip">v' + BSL.escapeHtml(rec.clientVersion) + "</span>" +
          '<span class="chip">' + BSL.escapeHtml(rec.testDate) + "</span>" +
          '<span class="chip">' + BSL.escapeHtml(rec.accountMethod) + "</span>" +
        "</div>" +
        '<div class="record-fields">' +
          BSL.fieldHtml("Expected result", rec.expectedResult) +
          BSL.fieldHtml("Actual result", rec.actualResult) +
          '<div class="field"><div class="k">Quota before / after</div>' + quota + "</div>" +
          issueHtml(rec) +
          evidenceHtml(rec) +
        "</div>" +
        '<div class="record-notes">' + BSL.escapeHtml(rec.notes) + "</div>" +
      "</article>"
    );
  }

  function render() {
    var f = currentFilters();
    var visiblePool = pool();
    var filtered = sortRecords(visiblePool.filter(function (r) { return matches(r, f); }));
    renderStats(filtered, visiblePool);
    resultCount.textContent = filtered.length + " record" + (filtered.length === 1 ? "" : "s");
    sampleNote.textContent = includeSamples
      ? "Sample/demo records included."
      : 'Showing VERIFIED real results only. Enable "Show Sample Data" to include demo records.';
    if (filtered.length === 0) {
      var hint = includeSamples
        ? "<p>Try widening the platform, feature, or result filters, or clear the search box.</p>"
        : '<p>No VERIFIED real results match the current filters. Enable "Show Sample Data" to include demo records.</p>';
      recordList.innerHTML =
        '<div class="empty"><h3>No records match</h3>' + hint +
        '<button class="btn btn-ghost" id="empty-reset" type="button">Reset filters</button></div>';
      var er = BSL.qs("#empty-reset");
      if (er) er.addEventListener("click", resetFilters);
      return;
    }
    recordList.innerHTML = filtered.map(recordCard).join("");
  }

  function resetFilters() {
    fPlatform.value = "all";
    fFeature.value = "all";
    fStatus.value = "all";
    fSearch.value = "";
    render();
  }

  [fPlatform, fFeature, fStatus].forEach(function (el) { el.addEventListener("change", render); });
  fSearch.addEventListener("input", render);
  fReset.addEventListener("click", resetFilters);
  fSamples.addEventListener("change", function () {
    includeSamples = fSamples.checked;
    refreshSelects();
    render();
  });

  render();
})();
