# @khanacademy/perseus

Perseus is the set of components that we use at Khan Academy to power our Exercises and Articles.

The [perseus monorepo](https://www.github.com/Khan/perseus) is home to several packages, and this is the main one! Import this to render perseus items.

Before rendering content, applications should call `initPerseus` from
`@khanacademy/perseus/init` once to register the production widgets and their
core logic. The function is idempotent.
