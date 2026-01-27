# PR Summary: Remove Old Radio Widget Styles (LEMS-3301)

This PR completes the radio widget style migration by removing the legacy `radio.css` file and consolidating all styling into co-located `*.module.css` files within the widget directory.

The new radio widget implementation (completed in previous work) uses module CSS files that are imported directly by the widget components. This PR removes the now-unused legacy styles and class name exports, ensuring that all radio widget styling is co-located with the widget files as intended.

## Changes Made

- **Deleted** `packages/perseus/src/styles/widgets/radio.css` (75 lines of legacy styles)
- **Removed** the `@import "widgets/radio.css"` statement from `perseus-renderer.css`
- **Removed** unused class name exports from `perseus-api.tsx`:
  - `ClassNames.RADIO` (OPTION, SELECTED, OPTION_CONTENT)
  - `ClassNames.CORRECT`
  - `ClassNames.INCORRECT`
  - `ClassNames.UNANSWERED`

All necessary styles have been migrated to the module CSS files in `packages/perseus/src/widgets/radio/`:
- `choice.module.css`
- `choice-indicator.module.css`
- `multiple-choice.module.css`

## Testing

- ✅ All radio widget tests pass
- ✅ Full test suite passes
- ✅ TypeScript compilation successful
- ✅ Verified removed class names are unused throughout the codebase

## Acceptance Criteria Met

- ✅ All styling from `radio.css` is either migrated to `*.module.css` files or removed as dead code
- ✅ The `radio.css` file is deleted
- ✅ Styles for the widget are only in `*.module.css` files in the widget directory
- ✅ Class name references removed from `perseus-api.tsx`