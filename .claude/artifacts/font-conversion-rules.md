
## Font Token Conversion Rules

**Import:** `import {font} from "@khanacademy/wonder-blocks-tokens";` (Aphrodite/JS)
**CSS Modules:** Use `var(--wb-font-*)` CSS variables directly.

### Decision guide

1. Running body/prose text → `font.body.*`
2. Label, heading, or button text → `font.heading.*`
3. Icon sizing, non-text use → `font.size.*` (primitive)
4. Value doesn't map / math font → leave hardcoded

### Common pixel → token mappings

| Hardcoded px | Font size token | Line height token |
|---|---|---|
| 12px | `font.body.size.xsmall` / `font.heading.size.small` | `font.body.lineHeight.xsmall` |
| 14px | `font.body.size.small` | `font.body.lineHeight.small` |
| 16px | `font.body.size.medium` | `font.body.lineHeight.xsmall` |
| 20px | `font.heading.size.medium` | `font.body.lineHeight.medium` |
| 24px | `font.heading.size.large` | `font.heading.lineHeight.medium` |
| **18px** | **NO TOKEN** — discuss with design | — |

### Font weight tokens

| Hardcoded value | Token | Note |
|---|---|---|
| 400 (regular) | `font.weight.regular` | |
| 500 (medium) | `font.weight.medium` | Same as 400 in default theme, becomes 500 in Thunderblocks |
| 600 (semi-bold) | `font.weight.semi` | Same as 400 in default theme, becomes 600 in Thunderblocks |
| 700 (bold) | `font.weight.bold` | |

### Do NOT tokenize

- `Symbola, "Times New Roman", serif` — math/symbol rendering font
- Dynamic `fontSize` computed from graph axis config
- `font-size: inherit` / `font-weight: inherit` / `line-height: inherit`

**Full font table:** `.claude/plans/font-token-mapping-reference.md`
