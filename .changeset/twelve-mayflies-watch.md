---
"@khanacademy/perseus-core": patch
"@khanacademy/perseus-score": patch
---

When scoring input-number widgets using the numeric-input logic, we now disallow decimal and integer input under the following conditions: `answerType` is `number` or not set, `inexact` is not `true`, and the correct answer `value` has more than 10 decimal places. This ensures that learners are not approximating a rational answer with a decimal. It preserves the existing scoring behavior of input-number.
