---
"@khanacademy/perseus-core": minor
---

Publish two new entry points: `@khanacademy/perseus-core/init` for the
all-widgets aggregate, and `@khanacademy/perseus-core/internal/widgets/<name>`
for a single widget's logic. Importing one widget's logic no longer drags in
all other widgets! The `internal` entry points are only for other
`@khanacademy/perseus*` packages and are not covered by semver.
