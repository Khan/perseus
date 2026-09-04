---
"@khanacademy/perseus": major
---

Remove `init` export from `@khanacademy/perseus`; it pulled every widget into 
every barrel importer. Call `initPerseus()` from `@khanacademy/perseus/init` 
if you need to register all widgets instead.
