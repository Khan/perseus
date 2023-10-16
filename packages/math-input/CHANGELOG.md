# @khanacademy/math-input

## 14.1.1

### Patch Changes

-   Updated dependencies [22a9c408]
    -   @khanacademy/perseus-core@1.1.2

## 14.1.0

### Minor Changes

-   5bcf118c: Desktop Expression Widget now uses v2 keypad

## 14.0.1

### Patch Changes

-   4f8afadd: Fix provided-keypad so that it doesn't re-render unnecessarily.
-   7d8905b6: Removes "grid" role from keypad to un-muddle screen reader experience.
-   55d4cd00: Print package name and version when loaded in the page
-   Updated dependencies [55d4cd00]
    -   @khanacademy/perseus-core@1.1.1

## 14.0.0

### Major Changes

-   14138bb0: Move StatefulKeypadContextProvider into math-input
-   14138bb0: Hoist keypad active state into keypad context

## 13.1.0

### Minor Changes

-   3b19a1bf: Ensured that we're properly calling componentWillUnmount

### Patch Changes

-   7e2ae0ef: Bugfix for fraction button in v2 fraction keypad
-   1dc460c7: Add tests for mobile MathInput

## 13.0.0

### Major Changes

-   609aeb0a: Ensured that the multiplication symbol in our keypad matches the selected symbol from content.

### Patch Changes

-   91f88d0b: Bugfix: v1 and v2 keypad using different FRAC configs
-   4aac71b3: Hide v2 mobile MathInput keypad when it's never been activated

## 12.1.1

### Patch Changes

-   Updated dependencies [4f4fe4f9]
    -   @khanacademy/perseus-core@1.1.0

## 12.1.0

### Minor Changes

-   a5a60852: revert focus changes to math input

## 12.0.1

### Patch Changes

-   a383823d: Bump @khanacademy/wonder-stuff-core to v1.5.1 (which adds needed support for `isTruthy` helper function)

## 12.0.0

### Major Changes

-   fa5f463b: Added onAnalyticsEvent prop to the LegacyKeypad (aka ProvidedKeypad). You must now pass in this prop, which is a function, to handle analytics events originating from the legacy keypad.
-   6d8ede65: Added `onAnalyticsEvent` prop to MobileKeypad to pipe out Perseus analytics

### Minor Changes

-   fa1bb6b4: Implemented some focus management fixes and improved the full-math-input story.

### Patch Changes

-   3afc0da2: Check for ResizeObserver before using it

## 11.0.0

### Major Changes

-   2af4f9fa: Switch from using ProvideKeypad in ArticleRenderer to passing the keypad element down instead

### Patch Changes

-   Updated dependencies [2af4f9fa]
    -   @khanacademy/perseus-core@1.0.0

## 10.1.1

### Patch Changes

-   3f7be05a: Updated Keypad V2 TabbarItemType to KeypadPageType as a more accurate description.
-   810c7bd9: Resize letter SVGs
-   b161d004: Ensured that the keypad is hidden from screen readers when it is closed.
-   a99a9ca4: Fix direction types for MathQuill interface

## 10.1.0

### Minor Changes

-   781551f9: Add an expanded view in the v2 MobileKeypad for larger screens

## 10.0.1

### Patch Changes

-   7b11736e: Fix cursor animation for MathInput

## 10.0.0

### Major Changes

-   dd800c22: Rename analytics prop from onEvent to onAnalyticsEvent

### Minor Changes

-   5352d512: Handle keypad resize better when it's positioned absolutely
-   673f61b3: Introduce `dependencies` on Keypad.

### Patch Changes

-   Updated dependencies [dd800c22]
    -   @khanacademy/perseus-core@0.2.0

## 9.0.0

### Major Changes

-   0993a46b: Don't generate Flow types

### Minor Changes

-   87aadc43: Surface event from `onClickKey` callback
-   b93f9f74: Added new Mobile Fraction Keypad View to the V2 Keypad

### Patch Changes

-   302ca7f7: Fix type for parameters of `moveOutOf` event.
-   afb14cff: Add eslint rule to make type imports consistent
-   19054322: Tweak to capital letter icon buttons
-   ce5e6297: Upgrade wonder-blocks deps to package versions without Flow types
-   196d2a39: Add icons for all letters

## 8.1.2

### Patch Changes

-   ea9dac75: Bugfix: allow legacy keypad to be positioned absolutely in column
-   30a99b82: Allow v2 keypad to receive style prop like v1 keypad
-   3fa556a3: Fixes bug where mouse hover causes grid to expand

## 8.1.1

### Patch Changes

-   Updated dependencies [57f75510]
    -   @khanacademy/perseus-core@0.1.1

## 8.1.0

### Minor Changes

-   5611204a: Adds back the export of the unwrapped keypad for Khanmigo
-   b4430dce: Make sendEvent in the Keypad an optional param

### Patch Changes

-   Updated dependencies [b4c06409]
    -   @khanacademy/perseus-core@0.1.0

## 8.0.0

### Major Changes

-   f9ee9d24: Move KeypadContext from Perseus to MathInput
-   b18986d3: Replace Legacy/Mobile keypads with a component that switches between them

## 7.0.0

### Major Changes

-   04e68d1c: Change keypadElement from LegacyKeypad to KeypadAPI

### Minor Changes

-   acafa72d: Add MobileKeypad to v2 keypad in MathInput

### Patch Changes

-   d0f28dbd: Add story for ExpressionEditor
-   54590cc7: Add index.ts files to some dirs in MathInput for organization

## 6.0.3

### Patch Changes

-   037a2db6: Update MathQuill version

## 6.0.2

### Patch Changes

-   71c631ea: Add keypad opened and closed analytics events
-   Updated dependencies [71c631ea]
    -   @khanacademy/perseus-core@0.0.2

## 6.0.1

### Patch Changes

-   8d1745c1: Removed double focus outline from keypad buttons

## 6.0.0

### Major Changes

-   36e3a212: Make v2 keypad dismiss button optional, hidden by default

### Patch Changes

-   fa735526: Fix issue with uses of CursorContext not being converted by flowgen

## 5.0.1

### Patch Changes

-   0cd9f3c4: Export getCursorContext helper from MathInput

## 5.0.0

### Major Changes

-   bfe68075: Update contextForCursor to further abstract MathQuill cursor

### Minor Changes

-   0b37940d: Add optional dismiss button to tabbar
-   1bad1cbe: Improved A11Y of Keypad
-   1f3fdc6c: Introduce analytics API
-   5f71cd01: Rearrange buttons in MathInput v2 keypad

### Patch Changes

-   d609230e: Improve TypeScript types and documentation for Mathquill
-   Updated dependencies [1f3fdc6c]
    -   @khanacademy/perseus-core@0.0.1

## 4.3.1

### Patch Changes

-   bec7c91c: Update icons in MathInput's v2 keypad

## 4.3.0

### Minor Changes

-   cf29ed88: Update layout of MathInput's keypad

## 4.2.0

### Minor Changes

-   d497118e: MathInput exports tools for generating MathFields, replacing the need for direct MathQuill access

### Patch Changes

-   e7d21b67: Add keypress logic from MathInput to key translator
-   eceb4510: Updated aria-labels to be more descriptive and tests that used aria-labels.

## 4.1.1

### Patch Changes

-   31ed8380: Add math-input v2 keypad tests
-   937d2308: Added basic Cypress testing for the v2 math-input keypad

## 4.1.0

### Minor Changes

-   a7f56710: add support for extraKeys to the v2 MathInput Keypad
-   a7f56710: Make tabbar accept styles, create v2 keypad popover example

## 4.0.0

### Major Changes

-   c4b8d862: Type safety changes that touch our external exports. These are breaking changes to any consumers of the Key data and types.

### Minor Changes

-   0d352105: Added remaining missing keys for current pages
-   e900688e: Centralize Key2MathQuill translator. TeXButtons send keypresses, not strings/functions anymore.

### Patch Changes

-   47055ffc: Switch several icons to Phosphor equivalents:

    -   All numbers 0-9
    -   Minus
    -   Plus
    -   Times
    -   Backspace
    -   Decimal (though this one is supposed to be a , per the code elsewhere)
    -   Period (same as decimal right now)
    -   Divide
    -   Equal
    -   Percent
    -   Centered Dot (same icon as Period/Decimal, without y-axis transform)
    -   Pi
    -   X with mathematical chi
    -   x with small mathematical chi
    -   Square root with "radical"
    -   Dismiss with caret
    -   Operators tab icon with "radical"

-   3a3c317d: Refactor MathWrapper to use shared key2MathQuill translator

## 3.0.0

### Major Changes

-   ec37eb3d: Export v2 keypad, rename v1 keypad to ProvidedKeypad

### Minor Changes

-   46417c53: add division key boolean
-   97438065: Add prop to Keypad to switch between · and × for multiplication
-   85d9132a: Added Basic Relations buttons
-   42297993: Add advanced relations buttons
-   e86cc72f: Keypad API: Button sets on keypad switched to optional booleans. Added all designed button sets as props, but not all are yet implemented.
-   c0a15907: adds logarithm buttons

### Patch Changes

-   1ffbe3ef:
-   d9759ea6: Fix dom errors from SVG markup and adjust stories to remove warnings

## 2.0.0

### Major Changes

-   b585fe29: Switch most @khanacademy/math-input psuedo-enums to enums

### Patch Changes

-   0c1cf562: Removal of an unused keypad style

## 1.0.0

### Major Changes

-   4c03a43d: Convert math-input to TS, changing the API in the process

### Patch Changes

-   22c5d564: Remove the use of React.FC<> and use types named Props/State in more components

## 0.7.2

### Patch Changes

-   8e8d85cd: Fix imported React types in a couple of files

## 0.7.1

### Patch Changes

-   1f062e98: Bump all package versions since the build settings have been updated
-   406edf6b: Extract strings to dist/string.js instead of dist/strings.

## 0.7.0

### Minor Changes

-   53fd3768: Migrate source code to TypeScript

## 0.6.8

### Patch Changes

-   2c843b38: Update to use wonder-blocks deps after migrating wonder-blocks to TS

## 0.6.7

### Patch Changes

-   a1b4ab3c: Update wonder-blocks and wonder-stuff deps to fix an issue with wonder-stuff's generated flow types

## 0.6.6

### Patch Changes

-   6a7f36be: Update wonder-stuff and wonder-blocks dependencies

## 0.6.5

### Patch Changes

-   c238d540: Wrap all ReactDOM.render() calls in `<RenderStateRoot>` to ensure it propagates properly

## 0.6.4

### Patch Changes

-   113953e8: Exports new types to support custom keypads: `CursorContext`, `KeypadType`, `KeyType`, and `Key`

## 0.6.3

### Patch Changes

-   f567f660: Update the eslint config to look at both the package.json for the package and the one from the root

## 0.6.2

### Patch Changes

-   bf180fe1: Fix our use of import/no-extraneous-dependencies

## 0.6.1

### Patch Changes

-   1a91b6c2: Adds missing wonder-blocks deps, makes wonder-blocks peerDeps

## 0.6.0

### Minor Changes

-   8fcd2a28: Inline the import of mathquill.css in math-input's main.less

## 0.5.6

### Patch Changes

-   98d283ff: Fix storybook

## 0.5.5

### Patch Changes

-   6f8f1ac9: Use wonder-blocks-i18n to determine the decimal separator

## 0.5.4

### Patch Changes

-   f29b4975: Export the KeyConfigs type

## 0.5.3

### Patch Changes

-   96288b87: Export CursorContexts

## 0.5.2

### Patch Changes

-   a15b0e86: Add 'perseus-build-settings' as a dev dep to packages that were missing it

## 0.5.1

### Patch Changes

-   591420a6: Add @flow comment to math-input's index.js and missing props to ProvidedKeypad

## 0.5.0

### Minor Changes

-   ea57be17: Move math-input into khan/perseus repo (name changes to @khanacademy/math-input)
-   116df39b: Extract math-input strings from source and save them to packages/math-input/dist
