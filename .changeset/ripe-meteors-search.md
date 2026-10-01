---
"@khanacademy/perseus": major
---

Stop publishing the `@khanacademy/perseus/testing` entry point. It holds internal test tooling that was never meant to ship. Because it was the only code that imported `@khanacademy/mathjax-renderer`'s stylesheets, `@khanacademy/perseus/styles.css` no longer includes them. Consumers that need those styles should import them from `@khanacademy/mathjax-renderer` directly.
