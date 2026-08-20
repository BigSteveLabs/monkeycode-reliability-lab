window.BSL_METHODS = {
  dataType: "SAMPLE",
  disclaimer: "Method definitions below describe the intended reliability testing protocol. No real test runs have been completed yet.",
  approaches: [
    {
      id: "M-01",
      name: "Scripted functional pass",
      summary: "Each feature is exercised against a fixed checklist with recorded expected vs actual outcomes.",
      steps: [
        "Define an expected result for the feature under test",
        "Run the feature in the target platform",
        "Record the actual result and any deviation",
        "Classify outcome as PASS, FAIL, or BLOCKED"
      ],
      status: "PLANNED",
      owner: "BigSteve Labs"
    },
    {
      id: "M-02",
      name: "Real-world task rehearsal",
      summary: "Everyday tasks are replayed against the live product to observe behavior beyond happy-path coverage.",
      steps: [
        "Capture a realistic task prompt and expected artifact",
        "Run the task on the platform under test",
        "Compare output quality, latency, and resource use",
        "Log quota deltas and any recoveries"
      ],
      status: "PLANNED",
      owner: "BigSteve Labs"
    },
    {
      id: "M-03",
      name: "Adversarial and edge-case probes",
      summary: "Cancellation, retry, credential failure, and empty-state scenarios are probed deliberately.",
      steps: [
        "List hostile inputs and interrupted flows for the feature",
        "Trigger each scenario in isolation",
        "Record whether the product fails safe and recovers",
        "Promote reproducible issues to the bug tracker"
      ],
      status: "PLANNED",
      owner: "BigSteve Labs"
    },
    {
      id: "M-04",
      name: "Cross-platform parity review",
      summary: "The same feature is run on Web, Desktop, and Mobile to surface parity gaps.",
      steps: [
        "Identify a feature available on multiple platforms",
        "Run the identical scenario on each platform",
        "Diff results, timing, and available capabilities",
        "File parity gaps as findings"
      ],
      status: "PLANNED",
      owner: "BigSteve Labs"
    },
    {
      id: "M-05",
      name: "Quota and billing observation",
      summary: "Quota before/after deltas are captured on every run to build a billing-behavior picture.",
      steps: [
        "Record quota before starting a test",
        "Record quota after completion",
        "Attribute any unexpected delta to a specific action",
        "Flag unexplained consumption as a finding"
      ],
      status: "PLANNED",
      owner: "BigSteve Labs"
    }
  ],
  lifecycle: {
    title: "Finding lifecycle",
    stages: [
      "Observe",
      "Reproduce",
      "Triangulate",
      "Document",
      "Link to GitHub",
      "Report to MonkeyCode"
    ]
  }
};
