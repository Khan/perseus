# @khanacademy/perseus

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
