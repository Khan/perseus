---
"@khanacademy/perseus-score": major
"@khanacademy/perseus-core": minor
---

Expose per-widget scoring results from `scorePerseusItem`. The function now returns a `PerseusItemScore` object with `score` (the aggregate `PerseusScore` it previously returned directly) and `widgetScores` (a map from widget ID to that widget's individual `PerseusScore`). Callers reading the aggregate must update from `result.type` / `result.earned` / etc. to `result.score.type` / `result.score.earned`.
