window.BSL_LIMITS = {
  dataType: "SAMPLE",
  disclaimer: "These limitations describe the current scope of the lab itself, not defects in MonkeyCode.",
  entries: [
    {
      id: "LIM-001",
      title: "No real test credentials in use",
      description: "All authentication paths are exercised with sample or placeholder credentials. Real-account behavior remains untested.",
      impact: "Auth findings are not yet meaningful",
      mitigation: "Provision dedicated test accounts before real runs"
    },
    {
      id: "LIM-002",
      title: "Desktop and mobile devices not provisioned",
      description: "MonkeyWork Desktop and Mobile coverage is blocked pending test devices and builds.",
      impact: "Cross-platform parity cannot be assessed",
      mitigation: "Acquire test hardware and signed builds"
    },
    {
      id: "LIM-003",
      title: "No MCP or self-hosted endpoints available",
      description: "MCP server connections and private/self-hosted deployments require infrastructure not yet provisioned.",
      impact: "Integration coverage is incomplete",
      mitigation: "Stand up local MCP server and a self-hosted instance"
    },
    {
      id: "LIM-004",
      title: "All data is currently SAMPLE DATA",
      description: "No test run has been performed; every record is a labeled placeholder.",
      impact: "Dashboard reflects design intent, not measured reliability",
      mitigation: "Execute the first real scripted pass"
    },
    {
      id: "LIM-005",
      title: "Quota values are illustrative",
      description: "Quota before/after fields use placeholder numbers and must not be interpreted as real consumption.",
      impact: "No billing conclusions can be drawn",
      mitigation: "Capture real quota snapshots during live runs"
    }
  ]
};
