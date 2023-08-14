# @khanacademy/math-input

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
