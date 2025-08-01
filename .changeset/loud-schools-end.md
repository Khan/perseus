---
"@khanacademy/perseus-score": patch
---

Fix a bug where `scorePerseusItem` would throw an exception if some scorable widgets in the question did not have a corresponding entry in the `UserInputMap`. Such inputs are now scored as "invalid," meaning the learner did not fully answer the question.
