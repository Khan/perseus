---
"@khanacademy/perseus": patch
---

Refactor the InteractiveGraph component to avoid mounting the legacy interactive graph when Mafs is enabled. This ensures that state from the legacy graph doesn't interfere with the Mafs graph
