---
"@khanacademy/perseus": patch
"@khanacademy/perseus-editor": patch
---

Internal: ButtonGroup is now generic over the type of its button values, so `onChange` receives a typed value instead of `any`
