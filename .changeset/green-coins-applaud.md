---
"@khanacademy/perseus": patch
---

Fix a bug where the ServerItemRenderer and LoadingContext did not fire the `onRendered` prop callback when the PerseusItem being rendered did not have any assets.
