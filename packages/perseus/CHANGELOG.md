# @khanacademy/perseus

## 13.1.0

### Minor Changes

-   [#795](https://github.com/Khan/perseus/pull/795) [`2adb82b2`](https://github.com/Khan/perseus/commit/2adb82b22ac17a31aef403b7562191cac06cc13b) Thanks [@ioanacrant](https://github.com/ioanacrant)! - Add "do not track" query parameter to vimeo links in the video widget to ensure tracking/analytics cookies don't get set.

### Patch Changes

-   Updated dependencies [[`1d58b887`](https://github.com/Khan/perseus/commit/1d58b887179b129b5027e20484fde5169170f052)]:
    -   @khanacademy/math-input@15.0.1

## 13.0.0

### Major Changes

-   [#786](https://github.com/Khan/perseus/pull/786) [`af4ebf37`](https://github.com/Khan/perseus/commit/af4ebf37dfed15ffd93a8cf2a20d0be464120dd7) Thanks [@handeyeco](https://github.com/handeyeco)! - Added a new required dep in Perseus and MathInput (required by WB)

### Minor Changes

-   [#670](https://github.com/Khan/perseus/pull/670) [`88616529`](https://github.com/Khan/perseus/commit/88616529c70f6c03529c26c2a4f04e5bb9f92b38) Thanks [@handeyeco](https://github.com/handeyeco)! - Update types for Plotter widget

*   [#796](https://github.com/Khan/perseus/pull/796) [`c26fbdde`](https://github.com/Khan/perseus/commit/c26fbdde0d0bce0e7e88046eaddf88307f722eb9) Thanks [@nedredmond](https://github.com/nedredmond)! - Add option to show key on periodic table

### Patch Changes

-   [#799](https://github.com/Khan/perseus/pull/799) [`847b0568`](https://github.com/Khan/perseus/commit/847b0568bd5bb23ef08ddd8cbbe24f7158eeaaca) Thanks [@nedredmond](https://github.com/nedredmond)! - Add string for translation for label image changes

-   Updated dependencies [[`3eb0e158`](https://github.com/Khan/perseus/commit/3eb0e15860224cc595d5b7e78d2a5d60e808561c), [`af4ebf37`](https://github.com/Khan/perseus/commit/af4ebf37dfed15ffd93a8cf2a20d0be464120dd7)]:
    -   @khanacademy/math-input@15.0.0

## 12.4.0

### Minor Changes

-   [#784](https://github.com/Khan/perseus/pull/784) [`cfff6ad1`](https://github.com/Khan/perseus/commit/cfff6ad16a3923418a3c75816af7c99689b94da4) Thanks [@nedredmond](https://github.com/nedredmond)! - Graded Group Set indicator dots now have a 24x24 clickable area as well as hover/focus states. Stretching issue on mobile resolved as well.

*   [#783](https://github.com/Khan/perseus/pull/783) [`79403e06`](https://github.com/Khan/perseus/commit/79403e06eedb597d7818d6c858bbba6f51ff3fe1) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Adds 'widgetId' to the 'perseus:widget-rendering-error' analytics event.

### Patch Changes

-   Updated dependencies [[`79403e06`](https://github.com/Khan/perseus/commit/79403e06eedb597d7818d6c858bbba6f51ff3fe1), [`ed00ee59`](https://github.com/Khan/perseus/commit/ed00ee59dcdeb20a66709c6b7d3474da55d58e4d)]:
    -   @khanacademy/perseus-core@1.3.0
    -   @khanacademy/math-input@14.2.2
    -   @khanacademy/kas@0.3.5
    -   @khanacademy/kmath@0.1.6
    -   @khanacademy/perseus-linter@0.3.8
    -   @khanacademy/pure-markdown@0.2.10
    -   @khanacademy/simple-markdown@0.10.4

## 12.3.0

### Minor Changes

-   [#780](https://github.com/Khan/perseus/pull/780) [`376eb0e4`](https://github.com/Khan/perseus/commit/376eb0e4aaaa4c7a90fd6107a84bb74d382b077c) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Adds an `onError` callback prop to the ErrorBoundary component. Uses this new callback in the WidgetContainer component to report all widget rendering failures through the analytics API.

### Patch Changes

-   [#759](https://github.com/Khan/perseus/pull/759) [`c431c4b8`](https://github.com/Khan/perseus/commit/c431c4b8147ae0630df2d2b19b0f5a5b5f04d4bf) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove references to unused font families

*   [#775](https://github.com/Khan/perseus/pull/775) [`cb529549`](https://github.com/Khan/perseus/commit/cb5295497fe74e3f4cc00eef0f99da9f83f58e4d) Thanks [@nedredmond](https://github.com/nedredmond)! - Added flag to `simpleValidate` call from Renderer to ensure we call analytics on MathInputEvaluated only when the answer is submitted

-   [#781](https://github.com/Khan/perseus/pull/781) [`9b9dfd4f`](https://github.com/Khan/perseus/commit/9b9dfd4f6779d129040d9afcf3205f1863a64c25) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fix for broken dilation tool in the Transformer Widget

-   Updated dependencies [[`c431c4b8`](https://github.com/Khan/perseus/commit/c431c4b8147ae0630df2d2b19b0f5a5b5f04d4bf), [`fb84640d`](https://github.com/Khan/perseus/commit/fb84640de911a8e8817829985fe9956e83a7f7d1), [`376eb0e4`](https://github.com/Khan/perseus/commit/376eb0e4aaaa4c7a90fd6107a84bb74d382b077c), [`33cc24c3`](https://github.com/Khan/perseus/commit/33cc24c33f62cd87de7594ba575d311fd465e2e0)]:
    -   @khanacademy/math-input@14.2.1
    -   @khanacademy/perseus-core@1.2.0
    -   @khanacademy/kas@0.3.4
    -   @khanacademy/kmath@0.1.5
    -   @khanacademy/perseus-linter@0.3.7
    -   @khanacademy/pure-markdown@0.2.9
    -   @khanacademy/simple-markdown@0.10.3

## 12.2.0

### Minor Changes

-   [#773](https://github.com/Khan/perseus/pull/773) [`809823e4`](https://github.com/Khan/perseus/commit/809823e490f65cbcbaa05b548de985035810ba8d) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Fix text overlap in interactive graph widget

*   [#755](https://github.com/Khan/perseus/pull/755) [`6d9e31a4`](https://github.com/Khan/perseus/commit/6d9e31a4ea4a1ed29bef2d9812d21e5b2fd41af6) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Adding logic to ArticleRenderer so that it can return our currently focused element.

## 12.1.0

### Minor Changes

-   6dbc58c6: Fix image centering for widget

### Patch Changes

-   c4ae088f: Upgrades MathQuill to fix Android keyboard error
-   Updated dependencies [c4ae088f]
-   Updated dependencies [aea0387f]
    -   @khanacademy/math-input@14.2.0

## 12.0.1

### Patch Changes

-   Updated dependencies [22a9c408]
    -   @khanacademy/perseus-core@1.1.2
    -   @khanacademy/kas@0.3.3
    -   @khanacademy/kmath@0.1.4
    -   @khanacademy/math-input@14.1.1
    -   @khanacademy/perseus-linter@0.3.6
    -   @khanacademy/pure-markdown@0.2.8
    -   @khanacademy/simple-markdown@0.10.2

## 12.0.0

### Major Changes

-   5bcf118c: # Update MathInput

    -   `buttonSets` is now deprecated in favor of `keypadButtonSets`, but currently maps to the new prop for backwards compatability.
    -   `buttonsVisible` is now a bit misleading: "focused" is the default state with a toggle-able keypad and "always" shows the keypad by default.

### Minor Changes

-   5bcf118c: Desktop Expression Widget now uses v2 keypad

### Patch Changes

-   Updated dependencies [5bcf118c]
    -   @khanacademy/math-input@14.1.0

## 11.6.1

### Patch Changes

-   1721c05c: Fix broken Expression Mobile test
-   55d4cd00: Print package name and version when loaded in the page
-   Updated dependencies [4f8afadd]
-   Updated dependencies [7d8905b6]
-   Updated dependencies [55d4cd00]
    -   @khanacademy/math-input@14.0.1
    -   @khanacademy/kas@0.3.2
    -   @khanacademy/kmath@0.1.3
    -   @khanacademy/perseus-core@1.1.1
    -   @khanacademy/perseus-linter@0.3.5
    -   @khanacademy/pure-markdown@0.2.7
    -   @khanacademy/simple-markdown@0.10.1

## 11.6.0

### Minor Changes

-   0761377a: Ensured we're still validating against pi when strict is set to false and pi is in the answerforms.

### Patch Changes

-   14138bb0: Move StatefulKeypadContextProvider into math-input
-   14138bb0: Hoist keypad active state into keypad context
-   332d5d6d: Fix list item rendering in exercises and HintRenderer (LC-1022 & LC-1225)
-   Updated dependencies [14138bb0]
-   Updated dependencies [14138bb0]
    -   @khanacademy/math-input@14.0.0

## 11.5.1

### Patch Changes

-   7e2ae0ef: Bugfix for fraction button in v2 fraction keypad
-   1dc460c7: Add tests for mobile MathInput
-   Updated dependencies [7e2ae0ef]
-   Updated dependencies [1dc460c7]
-   Updated dependencies [3b19a1bf]
    -   @khanacademy/math-input@13.1.0

## 11.5.0

### Minor Changes

-   609aeb0a: Ensured that the multiplication symbol in our keypad matches the selected symbol from content.

### Patch Changes

-   Updated dependencies [91f88d0b]
-   Updated dependencies [609aeb0a]
-   Updated dependencies [4aac71b3]
    -   @khanacademy/math-input@13.0.0

## 11.4.0

### Minor Changes

-   6751a680: Make article image widget behave more like other image widgets

### Patch Changes

-   Updated dependencies [388b6506]
-   Updated dependencies [4f4fe4f9]
-   Updated dependencies [388b6506]
    -   @khanacademy/perseus-linter@0.3.4
    -   @khanacademy/perseus-core@1.1.0
    -   @khanacademy/pure-markdown@0.2.6
    -   @khanacademy/math-input@12.1.1

## 11.3.0

### Minor Changes

-   26fc0b41: Updated ErrorBoundary logging to include the componentStack as well as the widget type as metadata.

### Patch Changes

-   Updated dependencies [a5a60852]
    -   @khanacademy/math-input@12.1.0

## 11.2.1

### Patch Changes

-   a383823d: Bump @khanacademy/wonder-stuff-core to v1.5.1 (which adds needed support for `isTruthy` helper function)
-   Updated dependencies [a383823d]
    -   @khanacademy/math-input@12.0.1
    -   @khanacademy/perseus-linter@0.3.3
    -   @khanacademy/pure-markdown@0.2.5

## 11.2.0

### Minor Changes

-   9ff8a575: Fix image widget caption styling
-   1b618343: Add new Perseus analytics event: 'perseus:expression-focused'. This event is fired any time the expression widget input box receives focus.

### Patch Changes

-   Updated dependencies [fa5f463b]
-   Updated dependencies [fa1bb6b4]
-   Updated dependencies [6d8ede65]
-   Updated dependencies [3afc0da2]
    -   @khanacademy/math-input@12.0.0

## 11.1.0

### Minor Changes

-   8dc86906: Ensure that radio widget choices can scroll horizontally, but not vertically.
    Previously, unnecessary vertical scrollbars appeared on some choices containing
    MathJax elements.

## 11.0.0

### Major Changes

-   2af4f9fa: Switch from using ProvideKeypad in ArticleRenderer to passing the keypad element down instead

### Patch Changes

-   Updated dependencies [2af4f9fa]
    -   @khanacademy/math-input@11.0.0
    -   @khanacademy/perseus-core@1.0.0

## 10.1.0

### Minor Changes

-   3078825a: Remove animation when math is first drawn on a page
-   100fb7e5: Update design of image widget's caption

### Patch Changes

-   Updated dependencies [3f7be05a]
-   Updated dependencies [810c7bd9]
-   Updated dependencies [b161d004]
-   Updated dependencies [a99a9ca4]
    -   @khanacademy/math-input@10.1.1

## 10.0.1

### Patch Changes

-   5f33560b: Revert type changes made in #694
-   0f95281c: Restore static methods on `Expression` widget component
-   Updated dependencies [781551f9]
    -   @khanacademy/math-input@10.1.0

## 10.0.0

### Major Changes

-   9eb50ae1: Removed `LinterContextProps` type. Moved to `@khanacademy/perseus-linter` in a previous release, but wasn't deleted from this package.

### Patch Changes

-   aea86eec: Convert all usages of JSX.LibraryManagedAttributes to WB Core's PropsFor type
-   Updated dependencies [7b11736e]
    -   @khanacademy/math-input@10.0.1

## 9.0.0

### Major Changes

-   dd800c22: Rename analytics prop from onEvent to onAnalyticsEvent
-   2b99fbda: Remove 'analytics' key from PerseusDependencies

### Minor Changes

-   ec50a510: Switch `virtualKeypadVersion` on `perseus:expression-evaluated` event to be non-optional
-   673f61b3: Introduce `dependencies` on ArticleRenderer, ItemRenderer, MultiRenderer, and ServerItemRenderer.

### Patch Changes

-   2c69b0dc: Fix APIOptions `trackInteraction` type for better Flow type generation
-   Updated dependencies [dd800c22]
-   Updated dependencies [5352d512]
-   Updated dependencies [673f61b3]
    -   @khanacademy/math-input@10.0.0
    -   @khanacademy/perseus-core@0.2.0

## 8.0.0

### Major Changes

-   0993a46b: Don't generate Flow types

### Patch Changes

-   afb14cff: Add eslint rule to make type imports consistent
-   ce5e6297: Upgrade wonder-blocks deps to package versions without Flow types
-   410d490d: Improve Typescript types for the ArticleRenderer and ProvideKeypad mixin
-   Updated dependencies [302ca7f7]
-   Updated dependencies [0993a46b]
-   Updated dependencies [87aadc43]
-   Updated dependencies [afb14cff]
-   Updated dependencies [19054322]
-   Updated dependencies [ce5e6297]
-   Updated dependencies [0993a46b]
-   Updated dependencies [196d2a39]
-   Updated dependencies [b93f9f74]
    -   @khanacademy/math-input@9.0.0
    -   @khanacademy/simple-markdown@0.10.0
    -   @khanacademy/kmath@0.1.2
    -   @khanacademy/perseus-linter@0.3.2
    -   @khanacademy/pure-markdown@0.2.4

## 7.2.1

### Patch Changes

-   89f54569: Types and tests for Plotter and Plotter-Editor
-   ea9dac75: Bugfix: allow legacy keypad to be positioned absolutely in column
-   89f54569: Bugfix to hide drag instructions in static plotter
-   Updated dependencies [ea9dac75]
-   Updated dependencies [30a99b82]
-   Updated dependencies [3fa556a3]
    -   @khanacademy/math-input@8.1.2

## 7.2.0

### Minor Changes

-   e08f85ee: Add testing and improve error logging in the image editor

## 7.1.1

### Patch Changes

-   fc70e558: Fix the font size of inline MathJax 3 math in paragraphs, making it the same as KaTeX math.

## 7.1.0

### Minor Changes

-   2fb66a97: Remove functionality of `useNewStyles` prop on `ArticleRenderer`

## 7.0.2

### Patch Changes

-   Updated dependencies [57f75510]
    -   @khanacademy/perseus-core@0.1.1
    -   @khanacademy/math-input@8.1.1

## 7.0.1

### Patch Changes

-   5611204a: Adds back the export of the unwrapped keypad for Khanmigo
-   Updated dependencies [b4c06409]
-   Updated dependencies [5611204a]
-   Updated dependencies [b4430dce]
    -   @khanacademy/perseus-core@0.1.0
    -   @khanacademy/math-input@8.1.0

## 7.0.0

### Major Changes

-   f9ee9d24: Move KeypadContext from Perseus to MathInput

### Minor Changes

-   b18986d3: Adds useV2Keypad API option for switching between new and legacy keypads

### Patch Changes

-   b18986d3: Replace Legacy/Mobile keypads with a component that switches between them
-   Updated dependencies [f9ee9d24]
-   Updated dependencies [b18986d3]
    -   @khanacademy/math-input@8.0.0

## 6.7.0

### Minor Changes

-   a0c71567: Make KaTeX CSS styles also apply to MathJax 3

## 6.6.0

### Minor Changes

-   d0f28dbd: Add story for ExpressionEditor
-   077b125e: Extend argument object type for APIOptions.trackInteraction callback to support the arbitrary data each widget may add

### Patch Changes

-   Updated dependencies [04e68d1c]
-   Updated dependencies [d0f28dbd]
-   Updated dependencies [acafa72d]
-   Updated dependencies [54590cc7]
    -   @khanacademy/math-input@7.0.0

## 6.5.1

### Patch Changes

-   6ec8d96e: Clarify parameter type for APIOptions.trackInteraction
-   a022ff6c: Switch from `classname` to `id` for passage wrappers.

## 6.5.0

### Minor Changes

-   cc4bfe06: Switches out wrapped code blocks for horizontally-scrolling code blocks to account for python indentation syntax.
-   9916bce4: Changed radio widget instruction font.

### Patch Changes

-   Updated dependencies [037a2db6]
    -   @khanacademy/math-input@6.0.3

## 6.4.4

### Patch Changes

-   Updated dependencies [71c631ea]
    -   @khanacademy/math-input@6.0.2
    -   @khanacademy/perseus-core@0.0.2

## 6.4.3

### Patch Changes

-   12b65f5e: Fix an issue where Graphie labels were sometimes incorrectly positioned when
    MathJax 3 was injected as the TeX renderer.
-   Updated dependencies [8d1745c1]
    -   @khanacademy/math-input@6.0.1

## 6.4.2

### Patch Changes

-   Updated dependencies [36e3a212]
-   Updated dependencies [fa735526]
    -   @khanacademy/math-input@6.0.0

## 6.4.1

### Patch Changes

-   Updated dependencies [0cd9f3c4]
    -   @khanacademy/math-input@5.0.1

## 6.4.0

### Minor Changes

-   1f3fdc6c: Introduce analytics API

### Patch Changes

-   Updated dependencies [1f3fdc6c]
-   Updated dependencies [d609230e]
-   Updated dependencies [0b37940d]
-   Updated dependencies [bfe68075]
-   Updated dependencies [1bad1cbe]
-   Updated dependencies [1f3fdc6c]
-   Updated dependencies [5f71cd01]
    -   @khanacademy/perseus-core@0.0.1
    -   @khanacademy/math-input@5.0.0

## 6.3.2

### Patch Changes

-   Updated dependencies [bec7c91c]
    -   @khanacademy/math-input@4.3.1

## 6.3.1

### Patch Changes

-   Updated dependencies [cf29ed88]
    -   @khanacademy/math-input@4.3.0

## 6.3.0

### Minor Changes

-   d497118e: MathInput exports tools for generating MathFields, replacing the need for direct MathQuill access

### Patch Changes

-   Updated dependencies [e7d21b67]
-   Updated dependencies [d497118e]
-   Updated dependencies [eceb4510]
    -   @khanacademy/math-input@4.2.0

## 6.2.2

### Patch Changes

-   5fba7c60: Remove pi as a default answerForm for numeric-input
-   Updated dependencies [31ed8380]
-   Updated dependencies [937d2308]
    -   @khanacademy/math-input@4.1.1

## 6.2.1

### Patch Changes

-   Updated dependencies [a7f56710]
-   Updated dependencies [a7f56710]
    -   @khanacademy/math-input@4.1.0

## 6.2.0

### Minor Changes

-   e900688e: Centralize Key2MathQuill translator. TeXButtons send keypresses, not strings/functions anymore.

### Patch Changes

-   83d93e8f: Remove the use of Record<string, never> which is unsafe
-   3a3c317d: Refactor MathWrapper to use shared key2MathQuill translator
-   Updated dependencies [0d352105]
-   Updated dependencies [c4b8d862]
-   Updated dependencies [47055ffc]
-   Updated dependencies [e900688e]
-   Updated dependencies [3a3c317d]
    -   @khanacademy/math-input@4.0.0

## 6.1.0

### Minor Changes

-   e86cc72f: Keypad API: Button sets on keypad switched to optional booleans. Added all designed button sets as props, but not all are yet implemented.

### Patch Changes

-   ec37eb3d: Export v2 keypad, rename v1 keypad to ProvidedKeypad
-   Updated dependencies [46417c53]
-   Updated dependencies [97438065]
-   Updated dependencies [85d9132a]
-   Updated dependencies [42297993]
-   Updated dependencies [1ffbe3ef]
-   Updated dependencies [e86cc72f]
-   Updated dependencies [ec37eb3d]
-   Updated dependencies [c0a15907]
-   Updated dependencies [d9759ea6]
    -   @khanacademy/math-input@3.0.0

## 6.0.0

### Major Changes

-   4a368030: Remove getKaTeX from the PerseusDependencies type

    perseus-editor now detects KaTeX rendering errors by calling KaTeX directly,
    rather than using getKaTeX from PerseusDependencies.

    The logKaTeXError method, which was unused by Perseus, has been removed from
    the PerseusDependencies type as well.

    Clients should update their code by removing the getKaTeX and logKaTeXError
    properties from their PerseusDependencies object. If they want to log an error
    when TeX fails to render, they should do so in their TeX component.

-   9c4a6c96: Remove obsolete properties from the PerseusDependencies type

    We are in the process of migrating the webapp and mobile repos to use
    MathJax 3 as their math renderer instead of KaTeX. This change removes some of
    Perseus's dependencies on KaTeX.

    Clients should update their code by removing the `getRenderA11yString`,
    `loadMathjax`, `KatexProvider`, and `shouldUseFutureKaTeX` properties from
    their PerseusDependencies object.

### Patch Changes

-   5cc23179: Upgraded <Lint> component to use TypeScript types for props
-   e0a087d0: Upgraded <InlineIcon> component to use TypeScript types for props
-   b062ad47: Upgraded <MathOutput> component to use TypeScript types for props
-   8a47076d: Upgraded <Tooltip> component to use TypeScript types for props
-   09ab3260: Upgraded HUD component to use TypeScript types for props
-   5432857d: Upgraded <Sortable> component (not widget) to use TypeScript types for props
-   40c2736d: Upgraded Graphie component to use TypeScript types for props
-   b585fe29: Switch most @khanacademy/math-input psuedo-enums to enums
-   91617cfa: Upgraded FixedToResponsive component to use TypeScript types for props
-   e284e7c1: Upgraded Graph component to use TypeScript types for props
-   Updated dependencies [b585fe29]
-   Updated dependencies [0c1cf562]
    -   @khanacademy/math-input@2.0.0

## 5.0.0

### Major Changes

-   472e20e1: Remove all references to multipleNumberInput (ie. Ask for (one|all) correct solution)

### Patch Changes

-   22c5d564: Remove the use of React.FC<> and use types named Props/State in more components
-   Updated dependencies [4c03a43d]
-   Updated dependencies [22c5d564]
    -   @khanacademy/math-input@1.0.0
    -   @khanacademy/simple-markdown@0.9.3
    -   @khanacademy/pure-markdown@0.2.3

## 4.0.2

### Patch Changes

-   90c1833e: Fix lint
-   Updated dependencies [8e8d85cd]
-   Updated dependencies [77391aa8]
    -   @khanacademy/math-input@0.7.2
    -   @khanacademy/simple-markdown@0.9.2
    -   @khanacademy/pure-markdown@0.2.2

## 4.0.1

### Patch Changes

-   1f062e98: Bump all package versions since the build settings have been updated
-   df820619: Update TS to 5.0 and @babel/preset-env settings to match other repos
-   406edf6b: Extract strings to dist/string.js instead of dist/strings.
-   Updated dependencies [1f062e98]
-   Updated dependencies [406edf6b]
    -   @khanacademy/kas@0.3.1
    -   @khanacademy/kmath@0.1.1
    -   @khanacademy/math-input@0.7.1
    -   @khanacademy/perseus-linter@0.3.1
    -   @khanacademy/pure-markdown@0.2.1
    -   @khanacademy/simple-markdown@0.9.1

## 4.0.0

### Major Changes

-   53fd3768: Migrate source code to TypeScript

### Patch Changes

-   Updated dependencies [53fd3768]
    -   @khanacademy/kas@0.3.0
    -   @khanacademy/kmath@0.1.0
    -   @khanacademy/math-input@0.7.0
    -   @khanacademy/perseus-linter@0.3.0
    -   @khanacademy/pure-markdown@0.2.0
    -   @khanacademy/simple-markdown@0.9.0

## 3.0.0

### Major Changes

-   8ca2a1a6: API change: remove staticRender from ApiOptions

## 2.1.0

### Minor Changes

-   2c843b38: Update to use wonder-blocks deps after migrating wonder-blocks to TS

### Patch Changes

-   Updated dependencies [2c843b38]
    -   @khanacademy/math-input@0.6.8

## 2.0.1

### Patch Changes

-   6272dfbe: Bugfix for definition prompt size in articles

## 2.0.0

### Major Changes

-   b850ebee: Remove `satStyling` from `APIOptions`
-   b850ebee: Remove `styling` from `APIOptions`

### Patch Changes

-   55841525: Fix graphie font-size to a specific size
-   a325f740: Switch Definition's prompt from Button to Clickable to resolve text not matching

## 1.4.1

### Patch Changes

-   a1b4ab3c: Update wonder-blocks and wonder-stuff deps to fix an issue with wonder-stuff's generated flow types
-   Updated dependencies [a1b4ab3c]
    -   @khanacademy/math-input@0.6.7
    -   @khanacademy/perseus-linter@0.2.5
    -   @khanacademy/pure-markdown@0.1.5

## 1.4.0

### Minor Changes

-   324a197c: Quick font fixup
-   f5693311: Indicators on exercises are now accessible via the keyboard! Additionally, they use explicit list markup! 🟢⚪⚪

### Patch Changes

-   6a7f36be: Update wonder-stuff and wonder-blocks dependencies
-   7b94ca05: Update categorizer to have no empty "th" cells per a11y audit
-   Updated dependencies [6a7f36be]
    -   @khanacademy/math-input@0.6.6
    -   @khanacademy/perseus-linter@0.2.4
    -   @khanacademy/pure-markdown@0.1.4

## 1.3.7

### Patch Changes

-   c238d540: Wrap all ReactDOM.render() calls in `<RenderStateRoot>` to ensure it propagates properly
-   Updated dependencies [c238d540]
    -   @khanacademy/math-input@0.6.5

## 1.3.6

### Patch Changes

-   859d3c28: Fixes styling of input-number when answer is incorrect in review mode

## 1.3.5

### Patch Changes

-   c4feda94: allow users to select text in radio choice
-   6f79dc58: Fix regression in input-number widget to respect `size` and `rightAlign` options again.

## 1.3.4

### Patch Changes

-   5a565227: bugfix for Radio editor selection and deletion

## 1.3.3

### Patch Changes

-   47d2afc0: Force radio text to be dark for contrast

## 1.3.2

### Patch Changes

-   1454c80a: Change to shape/space Radio Choice's "cross out" button

## 1.3.1

### Patch Changes

-   9b3bf30f: CSS bug fixes for SAT Radio widget
-   Updated dependencies [113953e8]
    -   @khanacademy/math-input@0.6.4

## 1.3.0

### Minor Changes

-   e783be76: Fix passage fonts because content depends on it being an exact size

### Patch Changes

-   ec92d308: Fix bug with Passage where line numbers stopped abruptly
-   dd55b5e4: Update gutter line numbers in passage

## 1.2.0

### Minor Changes

-   cede09bd: Fix passage widget bug bug where highlight is immediately lost when tooltip appears

### Patch Changes

-   5ba90816: CSS fix to remove gradient background on math
-   96ddd9b7: Update package.json with yarn start command
-   a90a52c6: Update body fonts

## 1.1.2

### Patch Changes

-   b8b0ff7e: Update graded-group widget title to use a darker gray to meet a11y requirements
-   1dad999d: bugfix: add indention back to Passage widget
-   cc5103be: Small fix to communicate the "current" state of graded-group-sets to screen readers.

## 1.1.1

### Patch Changes

-   5b86aba4: bugfix: add size and rightAlign back to numeric-input widget
-   5b86aba4: bugfix for Matrix styles not getting passed through
-   6b48ca35: A tiny change that adds some aria labels to our message container so that the content will be read to screen readers upon update.

## 1.1.0

### Minor Changes

-   178987d6: Creates a native accessibility experience for Radio widget

### Patch Changes

-   f046585a: add shared PerseusNumericInputAnswerForm and MathFormat types to perseus-types
-   e342e6b2: Update CSS to match wonderblocks, round I

## 1.0.0

### Major Changes

-   f9e0cda6: Change API shape: remove radioStyleVersion, add primaryProductColor to styling

### Minor Changes

-   61a7084e: make multi-select options look more like checkboxes

### Patch Changes

-   2a3ac714: adds better flow coverage to base-radio.jsx
-   28170809: refactors base-radio to be a functional component
-   ea104d1c: Delete original choice icon now that it's been refactored and moved
-   8c6c60f5: Converts OptionStatus component to a functional component
-   80e2cafc: refactor focus-ring to functional component
-   f567f660: Update the eslint config to look at both the package.json for the package and the one from the root
-   e8a60745: increase story/test coverage of base-radio
-   61a7084e: code cleanup for the choice-icon radio sub-component
-   16eccaea: convert Radio's Choice component into a functional component
-   eeaa9010: Add more Flow typing to passage and passage-markdown widgets
-   d4d2b3a6: removes unused crossOutButton component
-   46859806: Increases flow coverage for Radio's Widget component to 100%
-   f5682ad6: fixes a bug in the multiselect radio widget to allow selected choices to be unselected
-   Updated dependencies [f567f660]
-   Updated dependencies [eeaa9010]
    -   @khanacademy/kas@0.2.7
    -   @khanacademy/kmath@0.0.8
    -   @khanacademy/math-input@0.6.3
    -   @khanacademy/perseus-linter@0.2.3
    -   @khanacademy/pure-markdown@0.1.3
    -   @khanacademy/simple-markdown@0.8.6

## 0.4.3

### Patch Changes

-   bf180fe1: Fix our use of import/no-extraneous-dependencies
-   Updated dependencies [bf180fe1]
    -   @khanacademy/kas@0.2.6
    -   @khanacademy/kmath@0.0.7
    -   @khanacademy/math-input@0.6.2
    -   @khanacademy/perseus-linter@0.2.2
    -   @khanacademy/pure-markdown@0.1.2
    -   @khanacademy/simple-markdown@0.8.5

## 0.4.2

### Patch Changes

-   b317b553: Update tooltip design
-   1a91b6c2: Adds missing wonder-blocks deps, makes wonder-blocks peerDeps
-   Updated dependencies [1a91b6c2]
    -   @khanacademy/math-input@0.6.1

## 0.4.1

### Patch Changes

-   Updated dependencies [8fcd2a28]
    -   @khanacademy/math-input@0.6.0

## 0.4.0

### Minor Changes

-   fe5fedeb: Fix bug: 2 definitions displayed at once
-   c13a5c93: Wonderblock numeric-input
-   7f92fd27: Remove JIPT.domInsertChecks from `PerseusDependencies` as its no longer used/needed by Perseus
-   8a49423f: Update radio widget with KA styling
-   988726bd: Change default "preloader" for `SvgImage` to use a WonderBlocks spinner. This avoids the need to deal with a bundled spinner GIF entirely.

### Patch Changes

-   8a53d9e0: removes unused function from numeric-input.jsx named getClasses
-   23662202: Remove `isPhone` and `isTablet` from `PerseusDependencies`
-   98d283ff: Fix storybook
-   Updated dependencies [98d283ff]
    -   @khanacademy/kas@0.2.5
    -   @khanacademy/kmath@0.0.6
    -   @khanacademy/math-input@0.5.6
    -   @khanacademy/perseus-linter@0.2.1
    -   @khanacademy/pure-markdown@0.1.1
    -   @khanacademy/simple-markdown@0.8.4

## 0.3.4

### Patch Changes

-   397c3660: Fix: remove gap between popover and popover anchor in definition widget
-   Updated dependencies [6f8f1ac9]
    -   @khanacademy/math-input@0.5.5

## 0.3.3

### Patch Changes

-   Updated dependencies [f29b4975]
    -   @khanacademy/math-input@0.5.4

## 0.3.2

### Patch Changes

-   Updated dependencies [96288b87]
    -   @khanacademy/math-input@0.5.3

## 0.3.1

### Patch Changes

-   bfbcf273: Export new type: VideoKind (a parameter for the `useVideo` hook)

## 0.3.0

### Minor Changes

-   2578bd16: Rename NotGorgon to TranslationLinter
-   2578bd16: Rename Gorgon to PerseusLinter

### Patch Changes

-   4fb18745: Consume math-input .less directly instead of post-compilation
-   Updated dependencies [2578bd16]
-   Updated dependencies [2578bd16]
    -   @khanacademy/perseus-linter@0.2.0

## 0.2.8

### Patch Changes

-   a4f10ace: Move Gorgon, PerseusError, PureMarkdown into their own packages
-   Updated dependencies [a4f10ace]
    -   @khanacademy/perseus-linter@0.1.0
    -   @khanacademy/pure-markdown@0.1.0

## 0.2.7

### Patch Changes

-   3921a385: Fix bug where JIPT integration parsing rules returned incorrect type
-   Updated dependencies [3921a385]
    -   @khanacademy/simple-markdown@0.8.3

## 0.2.6

### Patch Changes

-   5d67bb03: Add missing deps to peer/dev deps in package.json files

## 0.2.5

### Patch Changes

-   Updated dependencies [a15b0e86]
    -   @khanacademy/kas@0.2.4
    -   @khanacademy/math-input@0.5.2
    -   @khanacademy/simple-markdown@0.8.2

## 0.2.4

### Patch Changes

-   5d86a625: Remove all unused fields from `Dependencies.InitialRequestUrl`

## 0.2.3

### Patch Changes

-   73095170: Add `VideoData` to set of exported Perseus types.

## 0.2.2

### Patch Changes

-   591420a6: Add @flow comment to math-input's index.js and missing props to ProvidedKeypad
-   Updated dependencies [591420a6]
    -   @khanacademy/math-input@0.5.1

## 0.2.1

### Patch Changes

-   e56ab24b: Exclude all deps from bundle except for vendored deps
-   Updated dependencies [ca76baa3]
    -   @khanacademy/simple-markdown@0.8.1

## 0.2.0

### Minor Changes

-   116df39b: Extract math-input strings from source and save them to packages/math-input/dist

### Patch Changes

-   Updated dependencies [ea57be17]
-   Updated dependencies [116df39b]
-   Updated dependencies [570c5800]
    -   @khanacademy/math-input@0.5.0
    -   @khanacademy/kas@0.2.3

## 0.1.0

### Minor Changes

-   21ee944a: Code from webapp has been copied over and all checks are passing.
