---
"@khanacademy/perseus": patch
---

Anchor the numeric input's examples tooltip to the input itself instead of a Fragment, so the upcoming Wonder Blocks Tooltip (which no longer uses `findDOMNode`) can find it. `TextInput` now accepts `TooltipAnchorProps` and passes the Tooltip's reference attribute to its `<input>`.
