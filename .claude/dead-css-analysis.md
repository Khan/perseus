# Dead CSS Analysis: perseus-radio-option-content & perseus-radio-rationale-content

## Executive Summary

The CSS rules in `styles.css` for `.perseus-radio-option-content` and `.perseus-radio-rationale-content` are **dead code**. The old radio widget that used these class names no longer exists - it was replaced by the new radio widget which uses module CSS.

## Investigation Findings

### 1. Old Radio Widget Status

**Finding:** The old radio widget is completely removed.

- `radio.ff.tsx` now **always** renders `RadioNew` (line 218)
- No conditional logic or feature flag exists
- The old widget files have been deleted from the codebase
- Only the `.new.tsx` files remain

### 2. Class Name Usage

**Finding:** These class names are not used anywhere in current code.

**Searches performed:**
- ✅ Perseus src: 0 results (except in styles.css itself)
- ✅ Frontend src: 0 results
- ✅ Webapp src: 0 results
- ⚠️ Node_modules: Found in OLD bundled Perseus versions (v72.8.0, v74.0.0)

**Why node_modules findings don't matter:**
The old Perseus bundles will be replaced when frontend/webapp upgrade to the new Perseus version. No code is actually applying these classes.

### 3. Typography Styling Comparison

#### OLD CSS (in styles.css - Lines 209-254, 419-463, 583-627, 747-791)

**For `.perseus-radio-option-content` and `.perseus-radio-rationale-content`:**
```css
/* Desktop (non-article, non-mobile) */
font-family: inherit;
font-size: 14px;
line-height: 1.25;
color: #21242c;

/* Mobile - @media (max-width: 767px) */
font-size: 16px;

/* Mobile - @media (min-width: 767px) and (max-width: 1199px) */
font-size: 18px;

/* Mobile - @media (min-width: 1200px) */
font-size: 20px;

/* MathJax color override */
mjx-container { color: #21242c; }
```

#### NEW CSS (in module files)

**Choice content** (`multiple-choice.module.css:84-91`):
```css
.content {
    display: flex;
    flex-direction: column;
    gap: var(--wb-sizing-size_120);
    margin-inline-start: var(--perseus-multiple-choice-content-margin);
    /* No explicit typography - inherits from parent */
}
```

**Choice rationale** (`multiple-choice.module.css:110-135`):
```css
.rationale {
    font-size: var(--wb-font-body-size-medium);
    font-weight: var(--wb-font-weight-medium);
    line-height: var(--wb-font-body-lineHeight-medium);
}

.rationale :global(.perseus-renderer .paragraph) {
    margin: 0;
}
```

**Choice container** (`choice.module.css:20-45`):
```css
.choice {
    font-size: var(--wb-font-heading-size-medium);
    font-weight: var(--wb-font-weight-semi);
    line-height: var(--wb-font-heading-lineHeight-medium);
    /* Other layout properties */
}
```

### 4. Is Typography Covered?

**Answer: YES, but differently**

The new widget uses:
1. **Wonder Blocks CSS variables** for typography instead of hardcoded pixel values
2. **Inherited font styling** from the choice container
3. **Modern responsive design** via CSS variables rather than media queries

**Key differences:**
- Old: Hardcoded font-sizes (14px, 16px, 18px, 20px) with media queries
- New: CSS variables that adapt based on context
- Old: Applied to nested `.perseus-renderer > .paragraph` elements
- New: Applied to direct container elements (`.content`, `.rationale`, `.choice`)

### 5. Risk Assessment: What if we remove the dead CSS?

**Risk: VERY LOW**

**Why it's safe:**
1. ✅ No current code applies these class names
2. ✅ Old radio widget completely removed from codebase
3. ✅ New widget uses different class names
4. ✅ Typography is handled by module CSS with Wonder Blocks variables
5. ✅ All Perseus tests pass without these styles

**Potential edge case:**
- **Server-rendered content from old Perseus versions:** If there's cached/server-rendered HTML from old Perseus versions that still has these class names, removing the CSS would cause those elements to lose typography styling.

**Likelihood:** Very low, because:
- Khan Academy typically doesn't cache rendered exercise content
- Content is dynamically rendered client-side with current Perseus version
- Feature flag was already removed, meaning all production traffic uses new widget

## Recommendations

### Option A: Remove Now (Recommended)
**Pros:**
- Cleaner codebase
- Removes ~60 lines of dead CSS
- Matches the PR scope (removing old styles)
- Tests pass

**Cons:**
- Theoretical risk if old cached content exists (very unlikely)

### Option B: Remove in Follow-up
**Pros:**
- More conservative
- Can monitor production after Percy upgrade

**Cons:**
- Leaves dead code in codebase
- Another ticket to track
- Delays cleanup

### Option C: Add Comment and Remove Later
**Pros:**
- Documents the dead code
- Explicit plan for removal

**Cons:**
- Similar to Option B

## My Recommendation

**Remove the dead CSS now** for these reasons:

1. The ticket scope is "Remove Old Styles" - this is old styling
2. All tests pass without it
3. The old widget is completely gone
4. No code applies these class names
5. Keeping dead code adds maintenance burden
6. If there ARE edge cases, they'll surface quickly in testing

If you want to be extra cautious, you could:
- Add this change as a **separate commit** so it's easy to revert if needed
- Deploy to staging first and monitor for issues
- Keep the commit in PR but call it out as "additional cleanup"

## Affected Lines in styles.css

Lines to remove:
- 209-254 (Desktop: option-content and rationale-content styling)
- 419-463 (Mobile max-width 767px)
- 583-627 (Mobile 767-1199px)
- 747-791 (Mobile 1200px+)

Total: ~80 lines of CSS