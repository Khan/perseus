# @khanacademy/math-input

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
