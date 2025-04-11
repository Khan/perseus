---
"@khanacademy/perseus-core": minor
"@khanacademy/perseus-dev-ui": patch
"@khanacademy/perseus-score": major
---

Add typesafe parsers for the user input types of Dropdown, Interactive Graph,
Numeric Input, Expression, and Radio. The `Perseus<Widget>UserInput` types have
been removed from `@khanacademy/perseus-score` and are now exported from
`@khanacademy/perseus-core`. Clients should update their code to import these
types from `@khanacademy/perseus-core` instead.
