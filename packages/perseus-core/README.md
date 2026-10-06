# @khanacademy/perseus-core

Perseus Core provides a set of utility functions and types that are used by the
rest of the Perseus ecosystem (`@khanacademy/perseus`,
`@khanacademy/math-input`, etc).

## Internal entry points

Entry points under `@khanacademy/perseus-core/internal/` (such as
`@khanacademy/perseus-core/internal/widgets/<name>`) exist so that other
`@khanacademy/perseus*` packages can import a single widget's logic without
pulling in every widget. They are not part of the public API: they can change
or disappear in any release, without a major version bump. Use the main entry
point or `@khanacademy/perseus-core/init` instead.
