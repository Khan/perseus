---
"@khanacademy/perseus": major
"@khanacademy/perseus-editor": patch
---

Move InfoTip and TextListEditor from Perseus into PerseusEditor. These weren't used in `@khanacademy/perseus` (only in `@khanacademy/perseus-editor`) or outside of the Perseus repo. They were being exported needlessly. It's still a major change since it's an API break.
