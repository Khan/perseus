# perseus-build-settings

## 0.5.0

### Minor Changes

-   [#2202](https://github.com/Khan/perseus/pull/2202) [`c7f6f63c8`](https://github.com/Khan/perseus/commit/c7f6f63c845566d99dae6df604426e5fb14a7e85) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Tooling:

    -   Switching to `pnpm`.

## 0.4.3

### Patch Changes

-   [#2040](https://github.com/Khan/perseus/pull/2040) [`1496a7a93`](https://github.com/Khan/perseus/commit/1496a7a93ef691c8e34da309c10cb77d35627bf3) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Bump versions to fix release

## 0.4.2

### Patch Changes

-   [#2027](https://github.com/Khan/perseus/pull/2027) [`368e222a6`](https://github.com/Khan/perseus/commit/368e222a6577dff38143d1584d6773129e8abbd7) Thanks [@handeyeco](https://github.com/handeyeco)! - Bump all packages to reset releases

## 0.4.1

### Patch Changes

-   [#1226](https://github.com/Khan/perseus/pull/1226) [`3d7e3b685`](https://github.com/Khan/perseus/commit/3d7e3b6854cf9f3a945e86988c6bbcb2b6c9e2cb) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Mark @phosphor-icons/core as external so they aren't bundled into Perseus

## 0.4.0

### Minor Changes

-   [#1168](https://github.com/Khan/perseus/pull/1168) [`a9c2308f9`](https://github.com/Khan/perseus/commit/a9c2308f907178794cfe761240ae9d1bec839296) Thanks [@jeresig](https://github.com/jeresig)! - Remove wonder-blocks-i18n usage from perseus and perseus-editor packages.

*   [#1153](https://github.com/Khan/perseus/pull/1153) [`22709bd9b`](https://github.com/Khan/perseus/commit/22709bd9be3e7fa7965939c7dc6a548a6189d2af) Thanks [@jeresig](https://github.com/jeresig)! - Remove wonder-blocks-i18n from math-input, support multiple exports in rollup.

## 0.3.0

### Minor Changes

-   [#802](https://github.com/Khan/perseus/pull/802) [`57e0e18b`](https://github.com/Khan/perseus/commit/57e0e18bd3729cde2e35cfa4ec40b67a5700049c) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Adjust builds so that less handles math the way it did in older versions.

## 0.2.1

### Patch Changes

-   55d4cd00: Add build step to replace **lib_version** with each package's published package version

## 0.2.0

### Minor Changes

-   0993a46b: Don't generate Flow types

### Patch Changes

-   ce5e6297: Upgrade wonder-blocks deps to package versions without Flow types

## 0.1.0

### Minor Changes

-   df820619: Update TS to 5.0 and @babel/preset-env settings to match other repos

### Patch Changes

-   1f062e98: Bump all package versions since the build settings have been updated
-   96aa4f6e: Downgrade TS to 4.9.5 until issues with react-docgen-typescript-plugin are resolved

## 0.0.5

### Patch Changes

-   9cbbbf2b: Added eslint rules for react hooks
-   848fece0: Fix issue in replaceStr() in test-setup.js, add option to not mock console.error/warn
-   b0e9db06: Update jest config to exclude stories and test files from collecting coverage

## 0.0.4

### Patch Changes

-   bf180fe1: Fix our use of import/no-extraneous-dependencies

## 0.0.3

### Patch Changes

-   98d283ff: Fix storybook

## 0.0.2

### Patch Changes

-   c1e0de55: Disable terser plugin
