---
"@khanacademy/perseus-core": patch
---

Bugfix: Allow null values when parsing the domain of a locked function on an Interactive Graph widget, converting them to +/-Infinity. Note that Infinity is serialized to JSON as `null`, so this preserves the existing persisted data format.
