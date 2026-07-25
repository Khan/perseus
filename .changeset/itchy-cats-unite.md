---
"@khanacademy/perseus": patch
---

FIX: `onRendered` is no longer called before asynchronously-rendered content has
finished rendering. `Zoomable` — which wraps block math and tables on mobile,
and needs several passes to measure and scale its content — now reports its
status through the `AssetContext`. `ServerItemRenderer` also tracks asset
statuses synchronously, so registrations made while it's still rendering are
no longer missed; previously this caused `onRendered` to fire immediately for
any content with async assets, including plain math and images.
