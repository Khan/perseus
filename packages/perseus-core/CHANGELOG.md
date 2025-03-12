# @khanacademy/perseus-core

## 5.1.0

### Minor Changes

-   [#2293](https://github.com/Khan/perseus/pull/2293) [`91e30c02c`](https://github.com/Khan/perseus/commit/91e30c02c15ddc7c811b658bdb052172739a690a) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Deprecate usage of PerseusErrorOccurred event logging in favor of PerseusErrorOccurredTI events.

## 5.0.0

### Major Changes

-   [#2233](https://github.com/Khan/perseus/pull/2233) [`a0aee41b6`](https://github.com/Khan/perseus/commit/a0aee41b69d4288ef165416cea293100d037ce5f) Thanks [@handeyeco](https://github.com/handeyeco)! - RadioWidget v2 in support of answerless Radio

*   [#2226](https://github.com/Khan/perseus/pull/2226) [`909148cdc`](https://github.com/Khan/perseus/commit/909148cdccabb3f0a2156587ea1e870bae910f8d) Thanks [@handeyeco](https://github.com/handeyeco)! - Answerless Expression: Expression can render and is interactive with answerless data

## 4.0.0

### Major Changes

-   [#2261](https://github.com/Khan/perseus/pull/2261) [`5de2e740b`](https://github.com/Khan/perseus/commit/5de2e740b35d69fc0059af5dbb74bd894986e124) Thanks [@handeyeco](https://github.com/handeyeco)! - Make NumericInput interactive without answer data

### Minor Changes

-   [#2202](https://github.com/Khan/perseus/pull/2202) [`c7f6f63c8`](https://github.com/Khan/perseus/commit/c7f6f63c845566d99dae6df604426e5fb14a7e85) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Tooling:

    -   Switching to `pnpm`.

*   [#2209](https://github.com/Khan/perseus/pull/2209) [`c0149a1b9`](https://github.com/Khan/perseus/commit/c0149a1b9f9d917f0f9b98dd6d61414e9bb7d895) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Refactoring Numeric Input helper functions to remove underscore, improve documentation, and add tests.

### Patch Changes

-   [#2269](https://github.com/Khan/perseus/pull/2269) [`90034a875`](https://github.com/Khan/perseus/commit/90034a8754ab735ec84d959916b62a69d39efc2a) Thanks [@benchristel](https://github.com/benchristel)! - Bugfix: Allow null values when parsing the domain of a locked function on an Interactive Graph widget, converting them to +/-Infinity. Note that Infinity is serialized to JSON as `null`, so this preserves the existing persisted data format.

*   [#2255](https://github.com/Khan/perseus/pull/2255) [`b71154170`](https://github.com/Khan/perseus/commit/b711541701ec10ccb506d0f9cbafac4a1c7c4cc1) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bug fix for Marathi language support in getDecimalSeparator

-   [#2259](https://github.com/Khan/perseus/pull/2259) [`a90cf7901`](https://github.com/Khan/perseus/commit/a90cf790159fefbee41437f20ac9a403a06f148f) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Minor change to how each package embeds it's package version in itself (slightly larger bundle size)

*   [#2254](https://github.com/Khan/perseus/pull/2254) [`56b4ee61b`](https://github.com/Khan/perseus/commit/56b4ee61b064603fdbeb4577851fe142d881e245) Thanks [@benchristel](https://github.com/benchristel)! - Internal: test that Interactive Graph widgets can render with answerless data

-   [#2267](https://github.com/Khan/perseus/pull/2267) [`381842745`](https://github.com/Khan/perseus/commit/3818427456a2ffca56481adbdafa01fee40e83c0) Thanks [@benchristel](https://github.com/benchristel)! - Bugfix: Convert null to undefined in the `replace` field of hints.

    This fixes a parser error observed in production. `replace` is null in some assessment
    items.

*   [#2231](https://github.com/Khan/perseus/pull/2231) [`08409c6c9`](https://github.com/Khan/perseus/commit/08409c6c9eea1d19212d332acb056c5ef4971419) Thanks [@handeyeco](https://github.com/handeyeco)! - Add tests for answerless Dropdown support

## 3.7.0

### Minor Changes

-   [#2246](https://github.com/Khan/perseus/pull/2246) [`e63f83d0d`](https://github.com/Khan/perseus/commit/e63f83d0d89fd5b8e7aee3ab7248bcb19ec9be8a) Thanks [@benchristel](https://github.com/benchristel)! - Update `parseAndMigratePerseusItem` and `parseAndMigratePerseusArticle` to accept legacy data formats observed in production

*   [#2242](https://github.com/Khan/perseus/pull/2242) [`e187c6b67`](https://github.com/Khan/perseus/commit/e187c6b67cb4d83e42907527acfe6562346e92d8) Thanks [@benchristel](https://github.com/benchristel)! - Deprecate the `metadata` field in renderer, hint, and Group widget data schemas.

-   [#2215](https://github.com/Khan/perseus/pull/2215) [`62ed407b8`](https://github.com/Khan/perseus/commit/62ed407b8647472f955467b8ce64261182bb8b59) Thanks [@Myranae](https://github.com/Myranae)! - Update Sorter's public widget option function to use Math.random and shuffle

*   [#2156](https://github.com/Khan/perseus/pull/2156) [`cbd5a6528`](https://github.com/Khan/perseus/commit/cbd5a652818554aa368bcddb0381d4716bc7a8ba) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Matcher widget

## 3.6.0

### Minor Changes

-   [#2235](https://github.com/Khan/perseus/pull/2235) [`ab2041897`](https://github.com/Khan/perseus/commit/ab2041897dff393e2e86d4d4a6e5ad278eff17bd) Thanks [@benchristel](https://github.com/benchristel)! - Remove unused code, and export the `ParseFailureDetail` type from `@khanacademy/perseus-core`

*   [#2234](https://github.com/Khan/perseus/pull/2234) [`1ade12c18`](https://github.com/Khan/perseus/commit/1ade12c184ba9ef657a7c7d53b81da70fe85de31) Thanks [@handeyeco](https://github.com/handeyeco)! - Move splitters into perseus-core, add splitPerseusItem

### Patch Changes

-   [#2223](https://github.com/Khan/perseus/pull/2223) [`f8a4becb0`](https://github.com/Khan/perseus/commit/f8a4becb03c543b034cc47d91d3335078bce76c0) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [Bugfix] Interactive Graph crashes in editor when setting domain for locked function

*   [#2205](https://github.com/Khan/perseus/pull/2205) [`ae29e2b2f`](https://github.com/Khan/perseus/commit/ae29e2b2fd3b4ec9533b3a1845d2ca94d05d4ed7) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Updating perseus analytics and events for better metrics.

-   [#2227](https://github.com/Khan/perseus/pull/2227) [`ce320b496`](https://github.com/Khan/perseus/commit/ce320b496bdc9580c194f878674773b845bb27b3) Thanks [@benchristel](https://github.com/benchristel)! - Bugfix: Accept 'scientific' as a buttonSets value when parsing Expression widgets

## 3.5.0

### Minor Changes

-   [#2194](https://github.com/Khan/perseus/pull/2194) [`fd606f43d`](https://github.com/Khan/perseus/commit/fd606f43d7687a15d6dc2cabd0e85fc71b5ed878) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for an interactive graph widget

*   [#2189](https://github.com/Khan/perseus/pull/2189) [`3ba74d173`](https://github.com/Khan/perseus/commit/3ba74d1731ceff13c9794a3aeaf79f1735b5fb86) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for a Table widget

-   [#2207](https://github.com/Khan/perseus/pull/2207) [`097176a26`](https://github.com/Khan/perseus/commit/097176a26db7b0c80b3be5e6fe469539f65de0ea) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for a Matrix widget

*   [#2216](https://github.com/Khan/perseus/pull/2216) [`b3c562ac2`](https://github.com/Khan/perseus/commit/b3c562ac2cc6d02c433bf0587379c09a49080795) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Plotter widget

-   [#2198](https://github.com/Khan/perseus/pull/2198) [`649e6b16a`](https://github.com/Khan/perseus/commit/649e6b16ab67fad694cde5473bcfb3abb719a57d) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for a Grapher widget

*   [#2217](https://github.com/Khan/perseus/pull/2217) [`07779783a`](https://github.com/Khan/perseus/commit/07779783ae0e3a19c0c72e95a8eaa0b58a9cc968) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Move coord reverse logic for Angle graphs into scoring logic

-   [#2183](https://github.com/Khan/perseus/pull/2183) [`cac39013b`](https://github.com/Khan/perseus/commit/cac39013bd59a5ef73f151e1170dec83b463f076) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Radio widget

*   [#2188](https://github.com/Khan/perseus/pull/2188) [`163dd67d2`](https://github.com/Khan/perseus/commit/163dd67d2a8e119bc18191816668352e43292da2) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to retrieve public widget options for the IFrame widget

## 3.4.0

### Minor Changes

-   [#2154](https://github.com/Khan/perseus/pull/2154) [`a21fd908d`](https://github.com/Khan/perseus/commit/a21fd908d705c5b9de56f29af54d726824f5668e) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Sorter widget

*   [#2157](https://github.com/Khan/perseus/pull/2157) [`af8f5d3ca`](https://github.com/Khan/perseus/commit/af8f5d3cac1f642bb5f0c96a2f536990c277224f) Thanks [@handeyeco](https://github.com/handeyeco)! - Move default widget options for Grapher to Perseus Core

-   [#2171](https://github.com/Khan/perseus/pull/2171) [`a470c799e`](https://github.com/Khan/perseus/commit/a470c799eb53c87e08fb2f829b27e114ca80f63f) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for the LabelImage widget

*   [#2174](https://github.com/Khan/perseus/pull/2174) [`97e07c8ba`](https://github.com/Khan/perseus/commit/97e07c8baee12a37e471e8292dedbcf0588e2f50) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Numeric Input widget

-   [#2178](https://github.com/Khan/perseus/pull/2178) [`dbd496769`](https://github.com/Khan/perseus/commit/dbd496769e210fc4aca33778a567a99ff1654e7e) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public widget options for a CS widget.

*   [#2166](https://github.com/Khan/perseus/pull/2166) [`3c4c6bc92`](https://github.com/Khan/perseus/commit/3c4c6bc9207f6f2d65312df1c2bd5bf5246182a2) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Dropdown widget

-   [#2165](https://github.com/Khan/perseus/pull/2165) [`c8e383b46`](https://github.com/Khan/perseus/commit/c8e383b469426182a1392ca6ad2cde21b61e2f40) Thanks [@handeyeco](https://github.com/handeyeco)! - Move scorePerseusItem logic to PerseusScore

*   [#2179](https://github.com/Khan/perseus/pull/2179) [`564447af2`](https://github.com/Khan/perseus/commit/564447af2c030143c303c7ec88b055bab324fff1) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for the NumberLine widget

## 3.3.0

### Minor Changes

-   [#2158](https://github.com/Khan/perseus/pull/2158) [`8f8955718`](https://github.com/Khan/perseus/commit/8f89557185f7bed910251520863ed1c8ed3a4410) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Re-export widget id support function: addWidget

*   [#2142](https://github.com/Khan/perseus/pull/2142) [`d7bcb14c3`](https://github.com/Khan/perseus/commit/d7bcb14c398059be0be20bea118f9fee1dfc93f6) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Radio upgrade logic to Perseus Core

-   [#2148](https://github.com/Khan/perseus/pull/2148) [`685774f2e`](https://github.com/Khan/perseus/commit/685774f2eae44e4cd5e0d6341a209012cf7e9bcb) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Matcher upgrade logic to Perseus Core

*   [#2145](https://github.com/Khan/perseus/pull/2145) [`8a489600e`](https://github.com/Khan/perseus/commit/8a489600e3b0b474da36cc492671879d1372ea46) Thanks [@handeyeco](https://github.com/handeyeco)! - Move simple widget upgrade logic to Perseus Core (pt 2)

-   [#2143](https://github.com/Khan/perseus/pull/2143) [`459c25074`](https://github.com/Khan/perseus/commit/459c2507472f104f521b5410feaa64402d473a43) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Passage widgets upgrade logic to Perseus Core

*   [#2155](https://github.com/Khan/perseus/pull/2155) [`0df0b1940`](https://github.com/Khan/perseus/commit/0df0b194012627a98708cfcafd1ad5eb76ad91e2) Thanks [@benchristel](https://github.com/benchristel)! - Move `parsePerseusItem`, `parseAndMigratePerseusItem`,
    `parseAndMigratePerseusArticle`, `isSuccess`, and `isFailure` to the
    `perseus-core` package, and deprecate the equivalent exports from the `perseus`
    package.

-   [#2144](https://github.com/Khan/perseus/pull/2144) [`dc8118aa1`](https://github.com/Khan/perseus/commit/dc8118aa1e28e77d78a57bc13e50d1954e3f8f69) Thanks [@handeyeco](https://github.com/handeyeco)! - Move simple widget upgrade logic to Perseus Core (pt 1)

*   [#2150](https://github.com/Khan/perseus/pull/2150) [`82fa90299`](https://github.com/Khan/perseus/commit/82fa902999d9d79a050fe9acf0031ba886b387fa) Thanks [@handeyeco](https://github.com/handeyeco)! - Move InteractiveGraph widget upgrade to Perseus Core

-   [#2134](https://github.com/Khan/perseus/pull/2134) [`117e78d03`](https://github.com/Khan/perseus/commit/117e78d03f29304274c1d7cc206743439f94d6ef) Thanks [@handeyeco](https://github.com/handeyeco)! - Move widget ID utils to perseus-core

*   [#2135](https://github.com/Khan/perseus/pull/2135) [`7a984eba6`](https://github.com/Khan/perseus/commit/7a984eba6f1cec3df314ec245d2176f5db190548) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Expression WidgetOptions logic to core

-   [#2141](https://github.com/Khan/perseus/pull/2141) [`1355d6cfc`](https://github.com/Khan/perseus/commit/1355d6cfcbd4cb44de3f05084744dbdefd19def8) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Measurer upgrade logic to Perseus Core

*   [#2149](https://github.com/Khan/perseus/pull/2149) [`75f43a8f4`](https://github.com/Khan/perseus/commit/75f43a8f41739df4831e589e0a2724e1c7169312) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Table upgrade logic to Perseus Core

-   [#2147](https://github.com/Khan/perseus/pull/2147) [`ebf3695b6`](https://github.com/Khan/perseus/commit/ebf3695b69c7526279ef1c999f13b4e24be885be) Thanks [@handeyeco](https://github.com/handeyeco)! - Move upgrade logic for NumberLine to Perseus Core

### Patch Changes

-   [#2122](https://github.com/Khan/perseus/pull/2122) [`1a75ca628`](https://github.com/Khan/perseus/commit/1a75ca628405dbd9cbe8ee21d7a9039a78327c47) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Type and test fixes for new MockWidget (isolating to be seen only in tests)

*   [#2137](https://github.com/Khan/perseus/pull/2137) [`b4b3a3dbb`](https://github.com/Khan/perseus/commit/b4b3a3dbb5097b1225e9e5acdda254f2f1e66122) Thanks [@Myranae](https://github.com/Myranae)! - Move util files out of widget folder in perseus package to utils folder in perseus-core

-   [#2152](https://github.com/Khan/perseus/pull/2152) [`f8c9d3574`](https://github.com/Khan/perseus/commit/f8c9d35743d2e8ccf12875ef91498543e2015576) Thanks [@Myranae](https://github.com/Myranae)! - Move the categorizer, orderer, and expression public widget options functions from perseus package to their widget folders in perseus-core

*   [#2139](https://github.com/Khan/perseus/pull/2139) [`32cc4a45b`](https://github.com/Khan/perseus/commit/32cc4a45bd2df34a0620729ca659a8aec6bcd62a) Thanks [@Myranae](https://github.com/Myranae)! - Move util files out of widget folder in perseus package to utils folder in perseus-core

## 3.2.0

### Minor Changes

-   [#2101](https://github.com/Khan/perseus/pull/2101) [`9cabe689a`](https://github.com/Khan/perseus/commit/9cabe689a7aa143f95adf4556bf5c10d654a66ae) Thanks [@handeyeco](https://github.com/handeyeco)! - Move scorers and validators to `perseus-score`

## 3.1.0

### Minor Changes

-   [#2082](https://github.com/Khan/perseus/pull/2082) [`bbf7f3b1b`](https://github.com/Khan/perseus/commit/bbf7f3b1be657c588270a3b47983c0aecbf84418) Thanks [@benchristel](https://github.com/benchristel)! - Enable parsePerseusItem to parse all published content, upgrading old formats to the current one.

*   [#2053](https://github.com/Khan/perseus/pull/2053) [`5173c2e43`](https://github.com/Khan/perseus/commit/5173c2e43bf939159f420dcd448b90691d52353b) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Adding new interactive graph marking type, axes.

-   [#2086](https://github.com/Khan/perseus/pull/2086) [`bc3d955b5`](https://github.com/Khan/perseus/commit/bc3d955b57e847a379328fcc7cf276f42e0874dd) Thanks [@handeyeco](https://github.com/handeyeco)! - Init perseus-score, move AnswerTypes from perseus to perseus-score, move perseus-types in perseus to data-schema in perseus-core

*   [#2088](https://github.com/Khan/perseus/pull/2088) [`d2797bb2d`](https://github.com/Khan/perseus/commit/d2797bb2dc51bd80cb03f2c1eeb39286e4dfa45c) Thanks [@handeyeco](https://github.com/handeyeco)! - Move objective\_ helpers into perseus-core

### Patch Changes

-   [#2072](https://github.com/Khan/perseus/pull/2072) [`6cf647729`](https://github.com/Khan/perseus/commit/6cf6477291053d85faac48028b8f038fd0c28930) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - The creation of a new Mock Widget for tests.

## 3.0.5

### Patch Changes

-   [#2040](https://github.com/Khan/perseus/pull/2040) [`1496a7a93`](https://github.com/Khan/perseus/commit/1496a7a93ef691c8e34da309c10cb77d35627bf3) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Bump versions to fix release

## 3.0.4

### Patch Changes

-   [#2037](https://github.com/Khan/perseus/pull/2037) [`b80e7882b`](https://github.com/Khan/perseus/commit/b80e7882bf58f8e71cbf9482585577032c317428) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Nothing has changed, but our action requires a changeset per package and I don't know how to do an infrastructure update like this and pass that check

## 3.0.3

### Patch Changes

-   [#2028](https://github.com/Khan/perseus/pull/2028) [`762b295ec`](https://github.com/Khan/perseus/commit/762b295eccd7d0dbc344edd271d3300b506adb93) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Forcing release

## 3.0.2

### Patch Changes

-   [#2027](https://github.com/Khan/perseus/pull/2027) [`368e222a6`](https://github.com/Khan/perseus/commit/368e222a6577dff38143d1584d6773129e8abbd7) Thanks [@handeyeco](https://github.com/handeyeco)! - Bump all packages to reset releases

## 3.0.1

### Patch Changes

-   [#1810](https://github.com/Khan/perseus/pull/1810) [`e21ead80e`](https://github.com/Khan/perseus/commit/e21ead80e7cf467a2003fc145bfa1f65973eb270) Thanks [@daniellewhyte](https://github.com/daniellewhyte)! - Update Dropdown widget to support displaying TeX

## 3.0.0

### Major Changes

-   [#2007](https://github.com/Khan/perseus/pull/2007) [`ea1bf0c2c`](https://github.com/Khan/perseus/commit/ea1bf0c2cfc7ae552d039549950d1973b56f5ca9) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Update to latest webapp dependencies and prepare for deprecation of custom WB ID generators

## 2.0.0

### Major Changes

-   [#1973](https://github.com/Khan/perseus/pull/1973) [`f9906728c`](https://github.com/Khan/perseus/commit/f9906728c1a8f09c91c11d824718b8a06d6a7609) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove `scoreInput` from ServerItemRenderer

### Patch Changes

-   [#1971](https://github.com/Khan/perseus/pull/1971) [`341d316aa`](https://github.com/Khan/perseus/commit/341d316aa8727ebb9e7fde28fc4e2d8779aa3e82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Move to using optional chaining in a few places to resolve new lint rule violations.

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
