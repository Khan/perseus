---
"@khanacademy/perseus": minor
---

Export the `Tracking`, `TrackingGradedGroupExtraArguments`,
`TrackingSequenceExtraArguments`, `FindWidgetsFunction`, and `SizeClass` types.
Public types such as `APIOptions` and `WidgetExports` already reference them, so
consumers whose inferred types expand those could not emit declarations.
