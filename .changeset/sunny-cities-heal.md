---
"@khanacademy/perseus-editor": minor
---

Rework editor preview accessibility to run inside the preview iframe. "Show Me" now drives highlight state through `A11yContext`, and `IssuesPanel` merges axe-core issues from that context rather than the parent-side checker (which is removed). The device-adjusted preview `apiOptions` are memoized so an incoming scan report can't trigger a content resend, which previously looped the scan.
