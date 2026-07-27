---
"@khanacademy/perseus": patch
---

Internal: `AssetContext` no longer carries an `assetStatuses` dictionary. Nothing
read it, and publishing it encouraged providers to keep asset statuses in React
state, where they aren't visible in time to be useful. The context is now
report-only, and the bookkeeping a provider has to do is documented on it.
