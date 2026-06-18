---
"@khanacademy/perseus-core": patch
"@khanacademy/perseus": patch
---

PhET widget: remove `URL.canParse` so simulations load on Safari/iOS < 17, and on web browsers without Fullscreen API support (e.g. Safari on iPhone) replace the non-functional fullscreen button with a link that opens the simulation on PhET's site in a new tab
