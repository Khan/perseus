---
"@khanacademy/perseus": patch
---

Revert Mafs to 0.18.5 to fix a tooling incompatibility with webapp. The latest Mafs needs node 20.11 or higher, while we use 20.5 in some places.
