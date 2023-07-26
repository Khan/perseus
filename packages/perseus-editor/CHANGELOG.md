# @khanacademy/perseus-editor

## 2.3.11

### Patch Changes

-   d0f28dbd: Add story for ExpressionEditor
-   Updated dependencies [d0f28dbd]
-   Updated dependencies [077b125e]
    -   @khanacademy/perseus@6.6.0

## 2.3.10

### Patch Changes

-   Updated dependencies [6ec8d96e]
-   Updated dependencies [a022ff6c]
    -   @khanacademy/perseus@6.5.1

## 2.3.9

### Patch Changes

-   Updated dependencies [cc4bfe06]
-   Updated dependencies [9916bce4]
    -   @khanacademy/perseus@6.5.0

## 2.3.8

### Patch Changes

-   f7af06d9: Fix a bug in the exercise editor where the "KaTeX Errors" pane would display
    for any chemistry expression, reporting that commands like `\ce` don't exist in
    KaTeX even though they do.
    -   @khanacademy/perseus@6.4.4

## 2.3.7

### Patch Changes

-   Updated dependencies [12b65f5e]
    -   @khanacademy/perseus@6.4.3

## 2.3.6

### Patch Changes

-   @khanacademy/perseus@6.4.2

## 2.3.5

### Patch Changes

-   @khanacademy/perseus@6.4.1

## 2.3.4

### Patch Changes

-   Updated dependencies [1f3fdc6c]
    -   @khanacademy/perseus@6.4.0

## 2.3.3

### Patch Changes

-   @khanacademy/perseus@6.3.2

## 2.3.2

### Patch Changes

-   @khanacademy/perseus@6.3.1

## 2.3.1

### Patch Changes

-   Updated dependencies [d497118e]
    -   @khanacademy/perseus@6.3.0

## 2.3.0

### Minor Changes

-   5d88d8c5: Restore point count selector in `interactive-graph` widget editor
-   2e5683d3: Re-enable editing of 'polygon' graph type in interactive-graph-editor
-   5675178b: Re-enable editing of 'line segment' graph type in interactive-graph-editor
-   d2cf7b67: Re-introduce graph type selector for interactive graph editor

### Patch Changes

-   d28cbf34: Enhance formatting of the 'Correct answer' field on interactive-graph widget editor (to be more legible)
-   Updated dependencies [5fba7c60]
    -   @khanacademy/perseus@6.2.2

## 2.2.2

### Patch Changes

-   @khanacademy/perseus@6.2.1

## 2.2.1

### Patch Changes

-   Updated dependencies [83d93e8f]
-   Updated dependencies [e900688e]
-   Updated dependencies [3a3c317d]
    -   @khanacademy/perseus@6.2.0

## 2.2.0

### Minor Changes

-   e86cc72f: Keypad API: Button sets on keypad switched to optional booleans. Added all designed button sets as props, but not all are yet implemented.

### Patch Changes

-   Updated dependencies [e86cc72f]
-   Updated dependencies [ec37eb3d]
    -   @khanacademy/perseus@6.1.0

## 2.1.0

### Minor Changes

-   4a368030: Remove getKaTeX from the PerseusDependencies type

    perseus-editor now detects KaTeX rendering errors by calling KaTeX directly,
    rather than using getKaTeX from PerseusDependencies.

    The logKaTeXError method, which was unused by Perseus, has been removed from
    the PerseusDependencies type as well.

    Clients should update their code by removing the getKaTeX and logKaTeXError
    properties from their PerseusDependencies object. If they want to log an error
    when TeX fails to render, they should do so in their TeX component.

### Patch Changes

-   9c4a6c96: Remove obsolete properties from the PerseusDependencies type

    We are in the process of migrating the webapp and mobile repos to use
    MathJax 3 as their math renderer instead of KaTeX. This change removes some of
    Perseus's dependencies on KaTeX.

    Clients should update their code by removing the `getRenderA11yString`,
    `loadMathjax`, `KatexProvider`, and `shouldUseFutureKaTeX` properties from
    their PerseusDependencies object.

-   Updated dependencies [4a368030]
-   Updated dependencies [5cc23179]
-   Updated dependencies [e0a087d0]
-   Updated dependencies [b062ad47]
-   Updated dependencies [8a47076d]
-   Updated dependencies [09ab3260]
-   Updated dependencies [5432857d]
-   Updated dependencies [40c2736d]
-   Updated dependencies [b585fe29]
-   Updated dependencies [91617cfa]
-   Updated dependencies [e284e7c1]
-   Updated dependencies [9c4a6c96]
    -   @khanacademy/perseus@6.0.0

## 2.0.3

### Patch Changes

-   472e20e1: Remove all references to multipleNumberInput (ie. Ask for (one|all) correct solution)
-   22c5d564: Remove the use of React.FC<> and use types named Props/State in more components
-   Updated dependencies [472e20e1]
-   Updated dependencies [22c5d564]
    -   @khanacademy/perseus@5.0.0

## 2.0.2

### Patch Changes

-   Updated dependencies [90c1833e]
    -   @khanacademy/perseus@4.0.2

## 2.0.1

### Patch Changes

-   1f062e98: Bump all package versions since the build settings have been updated
-   406edf6b: Extract strings to dist/string.js instead of dist/strings.
-   Updated dependencies [1f062e98]
-   Updated dependencies [df820619]
-   Updated dependencies [406edf6b]
    -   @khanacademy/kas@0.3.1
    -   @khanacademy/kmath@0.1.1
    -   @khanacademy/perseus@4.0.1

## 2.0.0

### Major Changes

-   53fd3768: Migrate source code to TypeScript

### Patch Changes

-   Updated dependencies [53fd3768]
-   Updated dependencies [53fd3768]
    -   @khanacademy/perseus@4.0.0
    -   @khanacademy/kas@0.3.0
    -   @khanacademy/kmath@0.1.0

## 1.1.1

### Patch Changes

-   Updated dependencies [8ca2a1a6]
    -   @khanacademy/perseus@3.0.0

## 1.1.0

### Minor Changes

-   2c843b38: Update to use wonder-blocks deps after migrating wonder-blocks to TS

### Patch Changes

-   Updated dependencies [2c843b38]
    -   @khanacademy/perseus@2.1.0

## 1.0.16

### Patch Changes

-   Updated dependencies [6272dfbe]
    -   @khanacademy/perseus@2.0.1

## 1.0.15

### Patch Changes

-   Updated dependencies [55841525]
-   Updated dependencies [b850ebee]
-   Updated dependencies [b850ebee]
-   Updated dependencies [a325f740]
    -   @khanacademy/perseus@2.0.0

## 1.0.14

### Patch Changes

-   a1b4ab3c: Update wonder-blocks and wonder-stuff deps to fix an issue with wonder-stuff's generated flow types
-   Updated dependencies [a1b4ab3c]
    -   @khanacademy/perseus@1.4.1

## 1.0.13

### Patch Changes

-   6a7f36be: Update wonder-stuff and wonder-blocks dependencies
-   Updated dependencies [324a197c]
-   Updated dependencies [f5693311]
-   Updated dependencies [6a7f36be]
-   Updated dependencies [7b94ca05]
    -   @khanacademy/perseus@1.4.0

## 1.0.12

### Patch Changes

-   Updated dependencies [c238d540]
    -   @khanacademy/perseus@1.3.7

## 1.0.11

### Patch Changes

-   Updated dependencies [859d3c28]
    -   @khanacademy/perseus@1.3.6

## 1.0.10

### Patch Changes

-   Updated dependencies [c4feda94]
-   Updated dependencies [6f79dc58]
    -   @khanacademy/perseus@1.3.5

## 1.0.9

### Patch Changes

-   5a565227: bugfix for Radio editor selection and deletion
-   Updated dependencies [5a565227]
    -   @khanacademy/perseus@1.3.4

## 1.0.8

### Patch Changes

-   Updated dependencies [47d2afc0]
    -   @khanacademy/perseus@1.3.3

## 1.0.7

### Patch Changes

-   Updated dependencies [1454c80a]
    -   @khanacademy/perseus@1.3.2

## 1.0.6

### Patch Changes

-   Updated dependencies [9b3bf30f]
    -   @khanacademy/perseus@1.3.1

## 1.0.5

### Patch Changes

-   Updated dependencies [ec92d308]
-   Updated dependencies [e783be76]
-   Updated dependencies [dd55b5e4]
    -   @khanacademy/perseus@1.3.0

## 1.0.4

### Patch Changes

-   Updated dependencies [5ba90816]
-   Updated dependencies [96ddd9b7]
-   Updated dependencies [cede09bd]
-   Updated dependencies [a90a52c6]
    -   @khanacademy/perseus@1.2.0

## 1.0.3

### Patch Changes

-   Updated dependencies [b8b0ff7e]
-   Updated dependencies [1dad999d]
-   Updated dependencies [cc5103be]
    -   @khanacademy/perseus@1.1.2

## 1.0.2

### Patch Changes

-   Updated dependencies [5b86aba4]
-   Updated dependencies [5b86aba4]
-   Updated dependencies [6b48ca35]
    -   @khanacademy/perseus@1.1.1

## 1.0.1

### Patch Changes

-   Updated dependencies [f046585a]
-   Updated dependencies [e342e6b2]
-   Updated dependencies [178987d6]
    -   @khanacademy/perseus@1.1.0

## 1.0.0

### Major Changes

-   f9e0cda6: Change API shape: remove radioStyleVersion, add primaryProductColor to styling

### Patch Changes

-   28170809: refactors base-radio to be a functional component
-   f567f660: Update the eslint config to look at both the package.json for the package and the one from the root
-   Updated dependencies [2a3ac714]
-   Updated dependencies [28170809]
-   Updated dependencies [ea104d1c]
-   Updated dependencies [8c6c60f5]
-   Updated dependencies [80e2cafc]
-   Updated dependencies [f567f660]
-   Updated dependencies [e8a60745]
-   Updated dependencies [61a7084e]
-   Updated dependencies [16eccaea]
-   Updated dependencies [eeaa9010]
-   Updated dependencies [d4d2b3a6]
-   Updated dependencies [46859806]
-   Updated dependencies [f9e0cda6]
-   Updated dependencies [f5682ad6]
-   Updated dependencies [61a7084e]
    -   @khanacademy/perseus@1.0.0
    -   @khanacademy/kas@0.2.7
    -   @khanacademy/kmath@0.0.8

## 0.4.3

### Patch Changes

-   bf180fe1: Fix our use of import/no-extraneous-dependencies
-   Updated dependencies [bf180fe1]
    -   @khanacademy/kas@0.2.6
    -   @khanacademy/kmath@0.0.7
    -   @khanacademy/perseus@0.4.3

## 0.4.2

### Patch Changes

-   Updated dependencies [b317b553]
-   Updated dependencies [1a91b6c2]
    -   @khanacademy/perseus@0.4.2

## 0.4.1

### Patch Changes

-   @khanacademy/perseus@0.4.1

## 0.4.0

### Minor Changes

-   8a49423f: Update radio widget with KA styling

### Patch Changes

-   98d283ff: Fix storybook
-   Updated dependencies [fe5fedeb]
-   Updated dependencies [c13a5c93]
-   Updated dependencies [8a53d9e0]
-   Updated dependencies [23662202]
-   Updated dependencies [7f92fd27]
-   Updated dependencies [8a49423f]
-   Updated dependencies [988726bd]
-   Updated dependencies [98d283ff]
    -   @khanacademy/perseus@0.4.0
    -   @khanacademy/kmath@0.0.6

## 0.3.9

### Patch Changes

-   Updated dependencies [397c3660]
    -   @khanacademy/perseus@0.3.4

## 0.3.8

### Patch Changes

-   @khanacademy/perseus@0.3.3

## 0.3.7

### Patch Changes

-   @khanacademy/perseus@0.3.2

## 0.3.6

### Patch Changes

-   Updated dependencies [bfbcf273]
    -   @khanacademy/perseus@0.3.1

## 0.3.5

### Patch Changes

-   Updated dependencies [2578bd16]
-   Updated dependencies [2578bd16]
-   Updated dependencies [4fb18745]
    -   @khanacademy/perseus@0.3.0

## 0.3.4

### Patch Changes

-   Updated dependencies [a4f10ace]
    -   @khanacademy/perseus@0.2.8

## 0.3.3

### Patch Changes

-   Updated dependencies [3921a385]
    -   @khanacademy/perseus@0.2.7

## 0.3.2

### Patch Changes

-   5d67bb03: Add missing deps to peer/dev deps in package.json files
-   Updated dependencies [5d67bb03]
    -   @khanacademy/perseus@0.2.6

## 0.3.1

### Patch Changes

-   @khanacademy/perseus@0.2.5

## 0.3.0

### Minor Changes

-   8315e911: Don't re-export Perseus from @khanacademy/perseus-editor

### Patch Changes

-   Updated dependencies [5d86a625]
    -   @khanacademy/perseus@0.2.4

## 0.2.0

### Minor Changes

-   309cd98d: Content editor components must now specify a previewURL instead of frameSource

### Patch Changes

-   Updated dependencies [73095170]
    -   @khanacademy/perseus@0.2.3

## 0.1.3

### Patch Changes

-   591420a6: Add @flow comment to math-input's index.js and missing props to ProvidedKeypad
-   Updated dependencies [591420a6]
    -   @khanacademy/perseus@0.2.2

## 0.1.2

### Patch Changes

-   Updated dependencies [e56ab24b]
    -   @khanacademy/perseus@0.2.1

## 0.1.1

### Patch Changes

-   Updated dependencies [116df39b]
    -   @khanacademy/perseus@0.2.0

## 0.1.0

### Minor Changes

-   21ee944a: Code from webapp has been copied over and all checks are passing.

### Patch Changes

-   Updated dependencies [21ee944a]
    -   @khanacademy/perseus@0.1.0
