---
"@khanacademy/perseus-core": patch
---

Narrowed the types of the number-line widget's `range`, `labelRange`, and `divisionRange` properties. Previously, they were arrays, and now they are tuples. The parser now rejects data with the wrong number of elements.
