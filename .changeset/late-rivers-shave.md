---
"@khanacademy/perseus-core": minor
"@khanacademy/perseus-score": minor
---

Use the `numeric-input` scoring code to score `input-number` widgets. This changes behavior in only one case: when the input-number widget's answer is between 0 and 1 and the answerType is `"number"`, user inputs formatted as percentages are accepted as correct. Previously, percentage inputs were never accepted when answerType was `"number"`.
