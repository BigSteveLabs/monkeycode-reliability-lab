window.BSL_BUGS = {
  dataType: "SAMPLE",
  disclaimer: "The entries below are SAMPLE PLACEHOLDERS that demonstrate the bug-report format. No real reproducible bugs have been confirmed. Nothing here should be read as a real finding.",
  entries: [
    {
      id: "BUG-SAMPLE-001",
      dataType: "SAMPLE",
      title: "Illustrative: cancel button can report stale state",
      platform: "Web",
      feature: "Task Lifecycle",
      firstSeen: "2026-08-20",
      stepsToReproduce: [
        "Start a long-running task",
        "Press cancel",
        "Observe status banner"
      ],
      expected: "Task shows cancelled immediately",
      actual: "Status may lag before updating (illustrative only)",
      severity: "Low",
      status: "UNCONFIRMED",
      githubIssue: null,
      notes: "Sample entry to demonstrate format. Not a real finding."
    },
    {
      id: "BUG-SAMPLE-002",
      dataType: "SAMPLE",
      title: "Illustrative: quota counter double-counts on retry",
      platform: "Web",
      feature: "Quotas",
      firstSeen: "2026-08-20",
      stepsToReproduce: [
        "Trigger a task that auto-retries",
        "Compare quota delta against task count"
      ],
      expected: "Quota is consumed once per logical task",
      actual: "Counter may consume per retry attempt (illustrative only)",
      severity: "Medium",
      status: "UNCONFIRMED",
      githubIssue: null,
      notes: "Sample entry to demonstrate format. Not a real finding."
    }
  ]
};
