---
"@khanacademy/pure-markdown": minor
---

Parse `$$…$$` as (display) math. Double-dollar is the standard delimiter for display math — it originates in plain TeX and is the de-facto convention across the Markdown/MathJax ecosystem (MathJax, KaTeX auto-render, remark-math, Jupyter, Pandoc, GitHub). Previously a leading `$$` parsed as an empty `$…$` math span, causing the enclosed TeX to leak out as literal source (e.g. `$$\frac12$$` rendered an empty span followed by the text `\frac12`). It is now treated as a single math span: a block-positioned `$$…$$` becomes block math and an inline `$$…$$` becomes inline math. Single-dollar behavior and adjacent inline spans (`$a$$b$`) are unchanged.
