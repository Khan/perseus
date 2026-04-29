---
"@khanacademy/simple-markdown": major
---

Remove HTML output support from `@khanacademy/simple-markdown`. The package now only produces React output.

Removed APIs: `markdownToHtml`, `htmlFor`, `defaultHtmlOutput`, `htmlTag`, and the HTML-related types (`HtmlOutput`, `HtmlNodeOutput`, `HtmlOutputRule`, `HtmlRules`). The `html` field on default rules and on rules passed to `parserFor`/`outputFor` is no longer used; only `react` is supported. Consumers that need an HTML string should call `react`-output and serialize the resulting React tree.
