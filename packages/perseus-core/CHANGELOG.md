# @khanacademy/perseus-core

## 1.5.3

### Patch Changes

-   [#1791](https://github.com/Khan/perseus/pull/1791) [`b119147fc`](https://github.com/Khan/perseus/commit/b119147fc042bf71193d61f9cea99b5f3d73b484) Thanks [@handeyeco](https://github.com/handeyeco)! - Check types for import/no-extraneous-dependencies eslint check

## 1.5.2

### Patch Changes

-   [#1723](https://github.com/Khan/perseus/pull/1723) [`d4f4e2be1`](https://github.com/Khan/perseus/commit/d4f4e2be1408c4531a146bcd496344a629d90bd1) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Updating event data sent within interactive graph

## 1.5.1

### Patch Changes

-   [#1719](https://github.com/Khan/perseus/pull/1719) [`eb733b3ec`](https://github.com/Khan/perseus/commit/eb733b3ec2e3354a0c4647e9993b6f08a1b77e4a) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Updating interactive graph to log telementry when the widget is rendered.

## 1.5.0

### Minor Changes

-   [#1411](https://github.com/Khan/perseus/pull/1411) [`b0df85a80`](https://github.com/Khan/perseus/commit/b0df85a803444a5de1f74672c5f0f5ccc3aa5617) Thanks [@handeyeco](https://github.com/handeyeco)! - Consolidate PerseusError code and move it into perseus-core (deletes the perseus-error package)

## 1.4.2

### Patch Changes

-   [#971](https://github.com/Khan/perseus/pull/971) [`90ff7a48`](https://github.com/Khan/perseus/commit/90ff7a483b01552a556c7852427e98153cc20417) Thanks [@benchristel](https://github.com/benchristel)! - Remove source files from the distributed NPM package

## 1.4.1

### Patch Changes

-   [#860](https://github.com/Khan/perseus/pull/860) [`1f4e17ba`](https://github.com/Khan/perseus/commit/1f4e17ba77e1491523813655af18a70285a25989) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Add hover states in label-image widget

*   [#848](https://github.com/Khan/perseus/pull/848) [`8857950b`](https://github.com/Khan/perseus/commit/8857950bdeeb6e13bc3766b1c6545289b21cbe2a) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Add analytics for label image

## 1.4.0

### Minor Changes

-   [#794](https://github.com/Khan/perseus/pull/794) [`a91c84fe`](https://github.com/Khan/perseus/commit/a91c84fe53827ff4333220777a9918882b7fe9f0) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Removing the useV2Keypad apiOption as the V1 keypad is no longer in use.

### Patch Changes

-   [#814](https://github.com/Khan/perseus/pull/814) [`105d2060`](https://github.com/Khan/perseus/commit/105d20603d935d35cff237b17f0bfb57ca751e4c) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Minor build change to how we provide Typescript type definitions (should be no change to build output).

## 1.3.0

### Minor Changes

-   [#783](https://github.com/Khan/perseus/pull/783) [`79403e06`](https://github.com/Khan/perseus/commit/79403e06eedb597d7818d6c858bbba6f51ff3fe1) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Adds 'widgetId' to the 'perseus:widget-rendering-error' analytics event.

## 1.2.0

### Minor Changes

-   [#780](https://github.com/Khan/perseus/pull/780) [`376eb0e4`](https://github.com/Khan/perseus/commit/376eb0e4aaaa4c7a90fd6107a84bb74d382b077c) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Added 'perseus:widget-rendering-error' analytics event.

## 1.1.2

### Patch Changes

-   22a9c408: Fix bug caused by package version diagnostics

## 1.1.1

### Patch Changes

-   55d4cd00: Print package name and version when loaded in the page

## 1.1.0

### Minor Changes

-   4f4fe4f9: Added new analytics event "perseus:expression-focused"

## 1.0.0

### Major Changes

-   2af4f9fa: Switch from using ProvideKeypad in ArticleRenderer to passing the keypad element down instead

## 0.2.0

### Minor Changes

-   dd800c22: Rename analytics prop from onEvent to onAnalyticsEvent

## 0.1.1

### Patch Changes

-   57f75510: Commented RendererInterface

## 0.1.0

### Minor Changes

-   b4c06409: Add perseus-core to changeset

## 0.0.2

### Patch Changes

-   71c631ea: Add keypad opened and closed analytics events

## 0.0.1

### Patch Changes

-   1f3fdc6c: Introducing `perseus-core` for types and functionality shared across the Perseus ecosystem
