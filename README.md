# monkeycode-reliability-lab

BigSteve Labs — MonkeyCode Reliability Lab. Independent, real-world testing and reliability
research for the MonkeyCode ecosystem, published as a public-facing test dashboard.

**Status: prototype. All data is SAMPLE DATA. No real testing has been performed yet.**

## What this is

A dependency-free static site documenting MonkeyCode reliability testing across:

- Web, MonkeyWork Desktop, and Mobile
- Authentication, task lifecycle, browser control, Skills, MCP, custom models,
  quotas, Git integration, and private/self-hosted deployment

Each test record supports: platform, client version, test date, account/authentication
method, feature, expected result, actual result, status (PASS / FAIL / BLOCKED),
quota before/after, evidence/screenshots, related GitHub issue, and notes.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Landing page |
| `dashboard.html` | Test-results dashboard with filters by platform, feature, and result |
| `method.html` | Testing-method / protocol section |
| `bugs.html` | Reproducible-bugs section |
| `findings.html` | Positive-findings section |
| `limitations.html` | Known-limitations section |
| `research.html` | Placeholders for future articles |
| `evidence.html` | Placeholders for GitHub issues, screenshots, and logs |

## Run it

No build step and no dependencies. Serve the folder over HTTP:

```bash
./start.sh
```

or manually:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Data

All data lives in `data/` and is deliberately split from markup so records can be
added without touching pages:

- `data/test-results.js` — test records
- `data/methods.js` — testing approaches and lifecycle
- `data/bugs.js` — reproducible bugs
- `data/findings.js` — positive findings
- `data/limitations.js` — known limitations

To add a real test record, append an object to `records` in `data/test-results.js`
using the schema below and set `dataType` to something other than `"SAMPLE"`.

```
{
  id: "T-0014",
  dataType: "REAL",
  platform: "Web",
  clientVersion: "1.0.0",
  testDate: "2026-08-20",
  accountMethod: "OAuth / Google sign-in",
  feature: "Task Lifecycle",
  expectedResult: "...",
  actualResult: "...",
  status: "PASS",              // PASS | FAIL | BLOCKED
  quotaBefore: 10,
  quotaAfter: 9,
  evidence: [{ label: "screenshot-01.png", url: "assets/evidence/..." }],
  githubIssue: "https://github.com/.../issues/1",
  notes: "..."
}
```

## Data integrity rules

- No invented findings. Real findings only appear once observed and reproduced.
- Anything not yet backed by a real run is labeled `SAMPLE`.
- Every claim needs a traceable evidence link and, where applicable, a GitHub issue.

## Gallery readiness

Designed to later qualify for Portfolio -> Showcase or Tools -> Dev Tools. Not
published externally and not submitted to the Gallery. Self-contained static site:
no runtime dependencies, no external assets required.

## Roadmap

1. Provision test accounts, devices, MCP server, and a self-hosted instance
2. Run the first real scripted pass
3. Replace sample records with real, evidence-linked records
4. File confirmed issues upstream and link them from the dashboard
