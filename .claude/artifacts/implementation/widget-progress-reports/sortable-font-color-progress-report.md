# Sortable Component — Font and Color Conversion Progress Report

**Component:** Sortable (`packages/perseus/src/components/sortable.tsx`)
**Workflow:** Font and Color Conversion
**Related Widgets:** Sorter, Matcher (both previously migrated)
**Date Started:** 2026-05-05

---

## Step 1 — Audit

**Note:** Sortable is a component, not a widget. Audit grep paths were adapted from `packages/perseus/src/widgets/[widget-name]/` to `packages/perseus/src/components/` for all commands.

### Commands Run

```bash
# Find primitive color token usage
grep -n "color\." packages/perseus/src/components/sortable.tsx
# Result: (no output)

# Find hardcoded hex values
grep -n "#[0-9a-fA-F]\{3,6\}" packages/perseus/src/components/sortable.tsx
# Result: lines 920, 921, 935, 936, 958

# Find hardcoded rgb(a) values
grep -n "rgba\?([^)]\+)" packages/perseus/src/components/sortable.tsx
# Result: (no output)

# Check 4 font attributes
grep -nE "fontSize|fontWeight|lineHeight|fontFamily" packages/perseus/src/components/sortable.tsx
# Result: (no output)

# Also checked __tests__/sortable.test.tsx and __docs__/sortable.stories.tsx — no colors or fonts found in either
```

### Colors to be Tokenized:

**`packages/perseus/src/components/sortable.tsx`** — hardcoded hex values:
- Line 920: `background: "#fff"` — `card` style (card default background)
- Line 921: `border: "1px solid #ddd"` — `card` style (card default border)
- Line 935: `background: "#ddd"` — `placeholder` style (placeholder background)
- Line 936: `border: "1px solid #ccc"` — `placeholder` style (placeholder border)
- Line 958: `background: "#ffedcd"` — `dragging` style (card being dragged)

### Fonts to be Tokenized:

None found. No `fontSize`, `fontWeight`, `lineHeight`, or `fontFamily` in any sortable files.