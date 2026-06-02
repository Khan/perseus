---
"@khanacademy/perseus-core": major
"@khanacademy/perseus": minor
"@khanacademy/perseus-editor": minor
"@khanacademy/perseus-linter": minor
---

Change shape of `LockedPolygonType.points` from `[]Coord` to `LockedPolygonPointType`. This is to support adding fields to the Locked Polygon points in the future. Callers should migrate to using the new shape.
