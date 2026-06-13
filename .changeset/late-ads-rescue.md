---
"@khanacademy/perseus": major
"@khanacademy/perseus-core": major
"@khanacademy/perseus-editor": major
---

The InputNumber widget code has been removed; widgets with type "input-number" will now render as NumericInput widgets. This involves a breaking change to the InputNumber widget types in data-schema. Callers should, as always, use the parser to migrate Perseus JSON to the latest schema version before using it, and avoid depending directly on the schema types.
