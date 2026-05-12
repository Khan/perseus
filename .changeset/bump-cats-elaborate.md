---
"@khanacademy/perseus-score": major
"@khanacademy/perseus-core": minor
---

Expose per-widget scoring results from `scorePerseusItem`. The function now returns a `PerseusItemScore` which includes the aggregate score (via `total` and `earned` fields, as with `PerseusScore`) but also `widgetScores` (a map from widget ID to that widget's individual `PerseusScore`).
