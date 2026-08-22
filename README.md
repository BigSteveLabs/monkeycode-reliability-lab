# BigSteve Labs — MonkeyCode Reliability Lab

Independent, real-world testing and reliability research for the MonkeyCode ecosystem,
published as a public-facing test dashboard.

**Status: prototype redesign (v0.2.0). All data is SAMPLE DATA except the single
record marked VERIFIED (T-0014), which documents the lab's first real verified result.**

## What this is

A dependency-free static site documenting MonkeyCode reliability testing across:

- Web, MonkeyWork Desktop, and Mobile
- Authentication, task lifecycle, browser control, Skills, MCP, custom models,
  quotas, Git integration, and private/self-hosted deployment

Each test record supports: platform, client version, test date, account/authentication
method, feature, expected result, actual result, status (PASS / FAIL / BLOCKED),
quota before/after, evidence/screenshots, related GitHub issue, and notes.

## 1. How to run locally

No build step and no dependencies. Serve the folder over HTTP:

```bash
./start.sh
```

or manually:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## 2. Where test data is updated

All test records live in `data/test-results.js` under the `records` array. To add a
record, append an object (see the schema example below) and set `dataType` to
`"SAMPLE"` or `"REAL"` depending on whether it is a verified real result. The
dashboard (`assets/js/dashboard.js`) renders records automatically, including the
platform/feature/result filters and stats. Dashboard "verified result" highlight
copy is in `dashboard.html`.

The dashboard shows VERIFIED real records by default and hides SAMPLE records behind
a "Show Sample Data" control. Sample records stay in the data files and are only
displayed when that control is enabled. VERIFIED records always sort first.

```
{
  id: "T-0015",
  dataType: "REAL",              // or "SAMPLE"
  platform: "MonkeyCode Web",
  clientVersion: "1.0.0",
  testDate: "2026-08-22",
  accountMethod: "OAuth / Google sign-in",
  feature: "Task Lifecycle",
  expectedResult: "...",
  actualResult: "...",
  status: "PASS",                // PASS | FAIL | BLOCKED
  quotaBefore: "10.0M",
  quotaAfter: "5.6M",
  quotaTokensUsed: "4.3M",       // optional
  evidence: [{ label: "screenshot-01.png", url: "assets/evidence/..." }],
  githubIssue: "https://github.com/.../issues/1",
  notes: "..."
}
```

## 3. Where bugs, findings, and evidence are updated

| Content | File |
| --- | --- |
| Reproducible bugs | `data/bugs.js` (`entries` array) |
| Positive findings | `data/findings.js` (`entries` array) |
| Known limitations | `data/limitations.js` (`entries` array) |
| Testing methods / lifecycle | `data/methods.js` |
| Evidence archive copy | `evidence.html` (verified artifact + placeholder groups) |
| Research article cards | `research.html` |

Pages render these files automatically via `assets/js/bugs.js`, `findings.js`,
`limitations.js`, and `method.js`. Static page copy (headers, banners, profile blocks)
is edited directly in each `.html` file.

## 4. How to deploy / update the site

The site is fully static: HTML + CSS + JS + images. No database, no framework,
no server requirements.

- Edit files locally, verify with `python3 -m http.server 8080`, then commit and push
  to the `main` branch of this repository.
- Deploy by copying the repository contents (HTML pages, `assets/`, `data/`) into
  the target web folder on the hosting server.
- All asset, CSS, and JS paths are relative, so the site works identically at the
  domain root or in a subfolder such as `/monkeycode-reliability-lab/`.

## 5. Where branding images live

All branding artwork is in `assets/images/`:

| File | Used as |
| --- | --- |
| `pic1.png` | Small MonkeyCode Reliability Lab banner (dashboard, limitations, evidence headers) |
| `pic 2.png` | Main MonkeyCode Reliability Lab poster / hero image (home hero, findings) |
| `pic 3.png` | Wide monkey / feature image (dashboard verified block, bugs, research cards) |
| `pic4.png` | BigSteve portrait (method page, research author) |
| `pic 5.png` | BigSteve Labs main logo (header/footer on every page) |
| `pic 6.jpg` | BigSteve Labs wide banner / header strip (home) |
| `pic 7.jpg` | Round BigSteve Labs profile image (home about, evidence source) |

Note: filenames contain spaces (e.g. `pic 2.png`); when referenced in HTML they are
URL-encoded as `pic%202.png`.

## 6. Recommended BigSteveLabs.com destination folder

Deploy to:

```
bigstevelabs.com/monkeycode-reliability-lab/
```

Upload the repository contents into the web root of that folder. The relative asset
paths require no configuration change.

## Data integrity rules

- No invented findings. Real findings only appear once observed and reproduced.
- Anything not backed by a real run is labeled `SAMPLE`.
- Every claim needs a traceable evidence link and, where applicable, a GitHub issue.

## Verified real result (T-0014)

- Platform: MonkeyCode Web
- Feature: autonomous build / task lifecycle / Git integration / quota usage
- Status: PASS
- Daily quota displayed: 10.0M | Tokens used displayed: 4.3M | Remaining observed: 5.6M
- Prototype built successfully; one practical verification pass completed
- 22 files pushed to GitHub at commit `b34874b95930ad801ffe116d23cddd2f213e8d57`
- Gallery publication: not performed
- Blocker: none

## Roadmap

1. Provision test accounts, devices, MCP server, and a self-hosted instance
2. Run additional real scripted passes
3. Replace sample records with real, evidence-linked records
4. File confirmed issues upstream and link them from the dashboard
