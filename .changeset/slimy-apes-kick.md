---
"@khanacademy/perseus-editor": patch
---

Fix a bug in the exercise editor where the "KaTeX Errors" pane would display
for any chemistry expression, reporting that commands like `\ce` don't exist in
KaTeX even though they do.
