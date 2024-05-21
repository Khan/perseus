# @khanacademy/perseus

## 22.6.0

### Minor Changes

-   [#1293](https://github.com/Khan/perseus/pull/1293) [`e14a003be`](https://github.com/Khan/perseus/commit/e14a003beebf73185630416c0b3667ed75b230c2) Thanks [@benchristel](https://github.com/benchristel)! - Fill Mafs interactive circles with blue on hover

*   [#1241](https://github.com/Khan/perseus/pull/1241) [`a0dfc66cc`](https://github.com/Khan/perseus/commit/a0dfc66ccb1d92d4f15e9f1be983217e051e2aaa) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - New Axis Tick Labels and Ticks that can render outside of graph bounds

### Patch Changes

-   [#1289](https://github.com/Khan/perseus/pull/1289) [`42c0c607f`](https://github.com/Khan/perseus/commit/42c0c607f8b4b1713edb578cfb1d8168d1edebd1) Thanks [@benchristel](https://github.com/benchristel)! - Internal: replace some brittle SVG snapshot tests with less brittle visual snapshot tests

*   [#1271](https://github.com/Khan/perseus/pull/1271) [`55039a430`](https://github.com/Khan/perseus/commit/55039a430ef298f3d8a28e27798481130b28ca24) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Bugfix: Arrowhead Rotation Was Incorrect on Some Graphs

-   [#1295](https://github.com/Khan/perseus/pull/1295) [`f6be03dd8`](https://github.com/Khan/perseus/commit/f6be03dd85f0e394df16fb5e632684aea7486216) Thanks [@benchristel](https://github.com/benchristel)! - Fix a bug where the arrow at the end of a line or ray would sometimes point to the origin and not the edge of the graph

*   [#1294](https://github.com/Khan/perseus/pull/1294) [`fba227fe8`](https://github.com/Khan/perseus/commit/fba227fe8e2852d171197f7a02fed2b6b2f0d541) Thanks [@benchristel](https://github.com/benchristel)! - Fix a bug where axis tick labels on Mafs interactive graphs could be selected and interfere with drag interactions

-   [#1255](https://github.com/Khan/perseus/pull/1255) [`dc0adedeb`](https://github.com/Khan/perseus/commit/dc0adedebbae0c4a1940d67f64e19b0104ac85f4) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Ensure that axis lines and arrowheads have a 2px thickness in Interactive Graphs

*   [#1264](https://github.com/Khan/perseus/pull/1264) [`d70fab6a7`](https://github.com/Khan/perseus/commit/d70fab6a797b04f9365ec1442e96fdddbb100a46) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Show Radio Widget Images on New Line

-   [#1285](https://github.com/Khan/perseus/pull/1285) [`5b52a1569`](https://github.com/Khan/perseus/commit/5b52a156996d7e1debff3490db9fa798d5b95bd3) Thanks [@benchristel](https://github.com/benchristel)! - Internal: refactor the code for initializing linear graph states

## 22.5.1

### Patch Changes

-   [#1267](https://github.com/Khan/perseus/pull/1267) [`3977d361a`](https://github.com/Khan/perseus/commit/3977d361a91db647b79d499cc3f5b695af356f74) Thanks [@benchristel](https://github.com/benchristel)! - Internal: remove the `markings` property from the interactive graph state

*   [#1266](https://github.com/Khan/perseus/pull/1266) [`478398ff7`](https://github.com/Khan/perseus/commit/478398ff79cdd558256d628edce16cf14efe6f72) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Refactor the MafsGraph components to deduplicate data across props and state

## 22.5.0

### Minor Changes

-   [#1259](https://github.com/Khan/perseus/pull/1259) [`c07644f63`](https://github.com/Khan/perseus/commit/c07644f63957ada78ba60c9b3ecd7b42e289f67b) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Update all Perseus peer dependencies to match webapp exactly (commit: 2bd290251a8)
    -   @khanacademy/wonder-blocks-banner v3.0.42
    -   @khanacademy/wonder-blocks-button v6.3.1
    -   @khanacademy/wonder-blocks-clickable v4.2.1
    -   @khanacademy/wonder-blocks-core v6.4.0
    -   @khanacademy/wonder-blocks-data v13.0.7
    -   @khanacademy/wonder-blocks-dropdown v5.3.0
    -   @khanacademy/wonder-blocks-form v4.5.1
    -   @khanacademy/wonder-blocks-icon v4.1.0
    -   @khanacademy/wonder-blocks-layout v2.0.32
    -   @khanacademy/wonder-blocks-link v6.1.1
    -   @khanacademy/wonder-blocks-pill v2.2.1
    -   @khanacademy/wonder-blocks-popover v3.2.2
    -   @khanacademy/wonder-blocks-progress-spinner v2.1.1
    -   @khanacademy/wonder-blocks-switch v1.1.16
    -   @khanacademy/wonder-blocks-tokens v1.3.0
    -   @khanacademy/wonder-blocks-tooltip v2.3.1
    -   @khanacademy/wonder-blocks-typography v2.1.11
    -   @khanacademy/wonder-stuff-core v1.5.2
    -   @popperjs/core v^2.10.2
    -   classnames v1.1.4
    -   create-react-class v15.6.3
    -   katex v0.11.1
    -   prop-types v15.6.1
    -   react-popper v^2.2.5

*   [#1261](https://github.com/Khan/perseus/pull/1261) [`f92c52412`](https://github.com/Khan/perseus/commit/f92c524129294c1940c95d5134477c1d0e6193b1) Thanks [@Myranae](https://github.com/Myranae)! - Fix bug where arrow keys did not move all line segments

### Patch Changes

-   [#1256](https://github.com/Khan/perseus/pull/1256) [`9e2f404bb`](https://github.com/Khan/perseus/commit/9e2f404bb52ab599c61a5c322bed492e4568b8ae) Thanks [@benchristel](https://github.com/benchristel)! - Update the styling of interactive circle graphs rendered with Mafs

*   [#1263](https://github.com/Khan/perseus/pull/1263) [`1f03243ba`](https://github.com/Khan/perseus/commit/1f03243ba7ed5a9fe82b1b272bfce4ae4be68212) Thanks [@benchristel](https://github.com/benchristel)! - Fix a bug in Mafs linear graphs where the arrows on the ends of the lines would sometimes disappear or flip around

-   [#1260](https://github.com/Khan/perseus/pull/1260) [`896a159a6`](https://github.com/Khan/perseus/commit/896a159a6f602f2453a9e69af0ca73e7081dfc02) Thanks [@nishasy](https://github.com/nishasy)! - Rename "start point" and "end point" to "point 1" and "point 2" respectively in Interactive Graph locked line settings

*   [#1250](https://github.com/Khan/perseus/pull/1250) [`3806759ea`](https://github.com/Khan/perseus/commit/3806759ea4f140724a820d619604d8ef221059f2) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Refactor MovableLine component

*   Updated dependencies [[`c07644f63`](https://github.com/Khan/perseus/commit/c07644f63957ada78ba60c9b3ecd7b42e289f67b), [`c07644f63`](https://github.com/Khan/perseus/commit/c07644f63957ada78ba60c9b3ecd7b42e289f67b)]:
    -   @khanacademy/perseus-linter@0.4.0
    -   @khanacademy/math-input@19.1.0
    -   @khanacademy/pure-markdown@0.3.4

## 22.4.2

### Patch Changes

-   [#1251](https://github.com/Khan/perseus/pull/1251) [`917a6dafb`](https://github.com/Khan/perseus/commit/917a6dafb54cbff371d0d390384d001d11c15a9b) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove useUniqueIdWithMock for label/id in Choice

## 22.4.1

### Patch Changes

-   [#1240](https://github.com/Khan/perseus/pull/1240) [`4a59b85ab`](https://github.com/Khan/perseus/commit/4a59b85ab8d4d49e66bbd771c88e1f3d40c23a85) Thanks [@benchristel](https://github.com/benchristel)! - Change the tab order for movable line segments in interactive graphs. Previously, the order was `(whole segment, first point, second point)`. Now it's `(first point, whole segment, second point)`, which aligns better with the visual layout of the graph.

*   [#1240](https://github.com/Khan/perseus/pull/1240) [`4a59b85ab`](https://github.com/Khan/perseus/commit/4a59b85ab8d4d49e66bbd771c88e1f3d40c23a85) Thanks [@benchristel](https://github.com/benchristel)! - Adjust spacing in locked point and locked line settings

-   [#1235](https://github.com/Khan/perseus/pull/1235) [`87169b22b`](https://github.com/Khan/perseus/commit/87169b22b45c37d7cece4e3fc19acc8665f04c39) Thanks [@jeresig](https://github.com/jeresig)! - Update mathjax-renderer usage, locale is now required for createMathField.

-   Updated dependencies [[`87169b22b`](https://github.com/Khan/perseus/commit/87169b22b45c37d7cece4e3fc19acc8665f04c39)]:
    -   @khanacademy/math-input@19.0.0

## 22.4.0

### Minor Changes

-   [#1229](https://github.com/Khan/perseus/pull/1229) [`3c1e398d5`](https://github.com/Khan/perseus/commit/3c1e398d5f6fd3fad256eedfec821264ba857f9a) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Show Arrowheads on Locked Lines in Interactive Graphs

*   [#1237](https://github.com/Khan/perseus/pull/1237) [`54689a18f`](https://github.com/Khan/perseus/commit/54689a18f73bc29b6601c9309d5385bd47c101b9) Thanks [@handeyeco](https://github.com/handeyeco)! - Rough out new Circle Graph behind a feature flag

### Patch Changes

-   [#1222](https://github.com/Khan/perseus/pull/1222) [`44cf7348c`](https://github.com/Khan/perseus/commit/44cf7348c5f80726da8b93a71e0ce0121b90a4ba) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix @phosphor-icon paths in `explanation` widget

*   [#1243](https://github.com/Khan/perseus/pull/1243) [`ee89a1b01`](https://github.com/Khan/perseus/commit/ee89a1b0169808c9c7fb14c14d2e78975e390ce9) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix dash style for locked lines when kind is 'ray'

## 22.3.0

### Minor Changes

-   [#1210](https://github.com/Khan/perseus/pull/1210) [`2d3c3b49a`](https://github.com/Khan/perseus/commit/2d3c3b49a652020e5bf662b7b19682fa94212755) Thanks [@nishasy](https://github.com/nishasy)! - Limit color set for locked figures in Interactive Graph

### Patch Changes

-   [#1231](https://github.com/Khan/perseus/pull/1231) [`4fae0155d`](https://github.com/Khan/perseus/commit/4fae0155d358ca3c6bfaaac328631fec77d3fbe3) Thanks [@nishasy](https://github.com/nishasy)! - Adjust spacing in locked point and locked line settings

*   [#1232](https://github.com/Khan/perseus/pull/1232) [`cf1dc61b0`](https://github.com/Khan/perseus/commit/cf1dc61b041bbb15bac4120490bfd0f1909f5507) Thanks [@nishasy](https://github.com/nishasy)! - Refactor: separate LockedFigureSettingsAccordion component to reduce redundancy

-   [#1239](https://github.com/Khan/perseus/pull/1239) [`f757db589`](https://github.com/Khan/perseus/commit/f757db589c6500e0e1487e886fc3e92646492f1c) Thanks [@benchristel](https://github.com/benchristel)! - Fix sizing of interactive graph axis labels on mobile

-   Updated dependencies [[`71e74ff64`](https://github.com/Khan/perseus/commit/71e74ff647264f0067d279cfa51e7c9dd8b45043), [`db041577d`](https://github.com/Khan/perseus/commit/db041577dda780e2a871ad9e63c295a1d3fbe185)]:
    -   @khanacademy/math-input@18.1.0

## 22.2.0

### Minor Changes

-   [#1208](https://github.com/Khan/perseus/pull/1208) [`87c0e75d6`](https://github.com/Khan/perseus/commit/87c0e75d6b64723f33d0a2319c34ec5b4a81dfc3) Thanks [@nishasy](https://github.com/nishasy)! - Implement locked rays for Interactive Graph

### Patch Changes

-   [#1223](https://github.com/Khan/perseus/pull/1223) [`162f0c855`](https://github.com/Khan/perseus/commit/162f0c855f1e5b8777bf429fcbd18be73e1b9a11) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Upgrade Mafs to v0.18.5 - includes fix to make dashed lines use a consistent dash style

-   Updated dependencies []:
    -   @khanacademy/pure-markdown@0.3.3

## 22.1.0

### Minor Changes

-   [#1193](https://github.com/Khan/perseus/pull/1193) [`e419bb89c`](https://github.com/Khan/perseus/commit/e419bb89c1001472447f4ec3e5ca7f2fc60e1da9) Thanks [@Myranae](https://github.com/Myranae)! - Add axis labels to Mafs graphs

### Patch Changes

-   [#1187](https://github.com/Khan/perseus/pull/1187) [`f0b51093b`](https://github.com/Khan/perseus/commit/f0b51093b809e2ad3408437bb8eb47ec2bd809e3) Thanks [@benchristel](https://github.com/benchristel)! - Fix a visual bug where the arrowheads of graphed lines were sometimes clipped off at the edge of the graph.

*   [#1212](https://github.com/Khan/perseus/pull/1212) [`b4143615b`](https://github.com/Khan/perseus/commit/b4143615b294da439339836d679052c8e1d479a5) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: interactive graph editor kept resetting state

-   [#1103](https://github.com/Khan/perseus/pull/1103) [`361d5e7ad`](https://github.com/Khan/perseus/commit/361d5e7adcea4c4156ad536bccb2b2b9fa6eb872) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change images so that they are centred everywhere except hints (where they are left-aligned)

*   [#1218](https://github.com/Khan/perseus/pull/1218) [`04f57fdd0`](https://github.com/Khan/perseus/commit/04f57fdd00b9f8327ccb97f612cc2aae33ada1da) Thanks [@nishasy](https://github.com/nishasy)! - Use Wonder Blocks Tooltip for InfoTip

*   Updated dependencies [[`b4143615b`](https://github.com/Khan/perseus/commit/b4143615b294da439339836d679052c8e1d479a5)]:
    -   @khanacademy/math-input@18.0.1

## 22.0.2

### Patch Changes

-   [#1211](https://github.com/Khan/perseus/pull/1211) [`463b80d67`](https://github.com/Khan/perseus/commit/463b80d679d84e6d70c42dd7a019024b9a8e7aec) Thanks [@jeresig](https://github.com/jeresig)! - Add additional blur checks.

## 22.0.1

### Patch Changes

-   [#1209](https://github.com/Khan/perseus/pull/1209) [`08b401d34`](https://github.com/Khan/perseus/commit/08b401d34cd06ad5bdee7298a35d1adb1497f611) Thanks [@jeresig](https://github.com/jeresig)! - Fixes an error when accessing the blur method.

*   [#1204](https://github.com/Khan/perseus/pull/1204) [`87d12ad4a`](https://github.com/Khan/perseus/commit/87d12ad4afedafe70063715163d8f448b4d31b85) Thanks [@benchristel](https://github.com/benchristel)! - Fix bug where arrowheads on Mafs graph axes weren't visible

## 22.0.0

### Major Changes

-   [#1168](https://github.com/Khan/perseus/pull/1168) [`a9c2308f9`](https://github.com/Khan/perseus/commit/a9c2308f907178794cfe761240ae9d1bec839296) Thanks [@jeresig](https://github.com/jeresig)! - Remove wonder-blocks-i18n usage from perseus and perseus-editor packages.

*   [#1153](https://github.com/Khan/perseus/pull/1153) [`22709bd9b`](https://github.com/Khan/perseus/commit/22709bd9be3e7fa7965939c7dc6a548a6189d2af) Thanks [@jeresig](https://github.com/jeresig)! - Remove wonder-blocks-i18n from math-input, support multiple exports in rollup.

### Minor Changes

-   [#1186](https://github.com/Khan/perseus/pull/1186) [`d7fbe3e99`](https://github.com/Khan/perseus/commit/d7fbe3e99eaa8686144442b47c7b46cc9ace6c12) Thanks [@nishasy](https://github.com/nishasy)! - Add UI within InteractiveGraphEditor to add/edit locked lines

*   [#1192](https://github.com/Khan/perseus/pull/1192) [`e86ed507e`](https://github.com/Khan/perseus/commit/e86ed507e67beffb02f59c064f072b8e6fb9f484) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Display tooltip for movable point when option is indicated (Interactive Graph)

-   [#1195](https://github.com/Khan/perseus/pull/1195) [`9b5a9a40a`](https://github.com/Khan/perseus/commit/9b5a9a40a0d3453ccb4e7f2883815869c3d32f37) Thanks [@nishasy](https://github.com/nishasy)! - Use MathJax colors for Interactive Graph locked figures

*   [#1195](https://github.com/Khan/perseus/pull/1195) [`9b5a9a40a`](https://github.com/Khan/perseus/commit/9b5a9a40a0d3453ccb4e7f2883815869c3d32f37) Thanks [@nishasy](https://github.com/nishasy)! - View locked lines on Interactive Graph

### Patch Changes

-   [#1196](https://github.com/Khan/perseus/pull/1196) [`52b57c95d`](https://github.com/Khan/perseus/commit/52b57c95d3e0f8c1445e2a7e862d3a52041b26c2) Thanks [@nishasy](https://github.com/nishasy)! - Rename ColorCircle to ColorSwatch

*   [#1198](https://github.com/Khan/perseus/pull/1198) [`890587ef1`](https://github.com/Khan/perseus/commit/890587ef174007ac019a363874b2088f4b4ca9e9) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Add Storybook stories for visual regression testing of Mafs interactive graphs

*   Updated dependencies [[`a9c2308f9`](https://github.com/Khan/perseus/commit/a9c2308f907178794cfe761240ae9d1bec839296), [`22709bd9b`](https://github.com/Khan/perseus/commit/22709bd9be3e7fa7965939c7dc6a548a6189d2af)]:
    -   @khanacademy/math-input@18.0.0
    -   @khanacademy/pure-markdown@0.3.2

## 21.6.0

### Minor Changes

-   [#1182](https://github.com/Khan/perseus/pull/1182) [`066719c82`](https://github.com/Khan/perseus/commit/066719c82cbb934287082961de93abb427c7600e) Thanks [@nishasy](https://github.com/nishasy)! - View locked lines on Interactive Graph

*   [#1179](https://github.com/Khan/perseus/pull/1179) [`437bce7be`](https://github.com/Khan/perseus/commit/437bce7be32cbb03e0926719df0e03c193ba6df5) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change testId to render the default Testing Library HTML attribute: data-testid (was data-test-id)

### Patch Changes

-   [#1178](https://github.com/Khan/perseus/pull/1178) [`ba0f36561`](https://github.com/Khan/perseus/commit/ba0f36561bf556b7bd0f85eb98be25c834643022) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Rename internal type `MafsFlags` to `MafsGraphTypeFlags`

*   [#1202](https://github.com/Khan/perseus/pull/1202) [`a1e3fdfee`](https://github.com/Khan/perseus/commit/a1e3fdfee5768209a9d96749e78c5fd0e05f7dfb) Thanks [@nishasy](https://github.com/nishasy)! - Update snapshots

-   [#1177](https://github.com/Khan/perseus/pull/1177) [`f419d18fb`](https://github.com/Khan/perseus/commit/f419d18fbc76ff87720d9d49562c0b43ed1c2b33) Thanks [@nishasy](https://github.com/nishasy)! - LockedPointSettings update: Allow toggleable points, refactor so that it's easy to add lines later

-   Updated dependencies [[`437bce7be`](https://github.com/Khan/perseus/commit/437bce7be32cbb03e0926719df0e03c193ba6df5)]:
    -   @khanacademy/math-input@17.5.0

## 21.5.0

### Minor Changes

-   [#1188](https://github.com/Khan/perseus/pull/1188) [`661964d40`](https://github.com/Khan/perseus/commit/661964d40ba86e6b477ab87224692361f7aaaa27) Thanks [@nedredmond](https://github.com/nedredmond)! - Expose `showSolutions` on ServerItemRenderer

## 21.4.0

### Minor Changes

-   [#1184](https://github.com/Khan/perseus/pull/1184) [`a3d724b86`](https://github.com/Khan/perseus/commit/a3d724b8657edd78266335e236f8eba5f5f1b9dd) Thanks [@nedredmond](https://github.com/nedredmond)! - Adds `showSolutions`, which adds the ability to show all rationales for the radio widget and will deprecate `showshowRationalesForCurrentlySelectedChoices`

*   [#1176](https://github.com/Khan/perseus/pull/1176) [`3da51638b`](https://github.com/Khan/perseus/commit/3da51638b513e10c42da421667c3d877c5dcc161) Thanks [@benchristel](https://github.com/benchristel)! - Style the arrowheads used on lines in Mafs graphs

-   [#1183](https://github.com/Khan/perseus/pull/1183) [`0f80f4089`](https://github.com/Khan/perseus/commit/0f80f4089a6000301fc63ceef24646bd05a26db6) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Added new logic for conditionally rendering initial negative axis tick labels.

### Patch Changes

-   [#1185](https://github.com/Khan/perseus/pull/1185) [`dd97c422a`](https://github.com/Khan/perseus/commit/dd97c422a7d40a3786075d8c6988509fc2c43012) Thanks [@benchristel](https://github.com/benchristel)! - Internal: restructure the interactive graph React context to clarify its purpose

*   [#1175](https://github.com/Khan/perseus/pull/1175) [`e3063ddc7`](https://github.com/Khan/perseus/commit/e3063ddc76ad22469ca5a8557bee78216869f5d3) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensure that axis ticks are conditionally rendered based on the markings setting.

-   [#1169](https://github.com/Khan/perseus/pull/1169) [`ccead133f`](https://github.com/Khan/perseus/commit/ccead133fa30e1d93e02fd9a7c9e544c750e55ab) Thanks [@handeyeco](https://github.com/handeyeco)! - Add hairLines to MovablePoint for mobile UX

## 21.3.1

### Patch Changes

-   [#1171](https://github.com/Khan/perseus/pull/1171) [`53fa89b50`](https://github.com/Khan/perseus/commit/53fa89b50240309dcf56919b77715e135682e0ee) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Adjust movable point style while dragging

*   [#1170](https://github.com/Khan/perseus/pull/1170) [`9c5363795`](https://github.com/Khan/perseus/commit/9c53637953ff0267306bdc98175be9770bf2f098) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Remove Deprecated Widgets (`lights-puzzle` and `reaction-diagram`)

-   [#1173](https://github.com/Khan/perseus/pull/1173) [`ce547c5ec`](https://github.com/Khan/perseus/commit/ce547c5ec1ef0d17e0adebe24532c93007e82c4d) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change APIOptions.flags to be strongly typed

## 21.3.0

### Minor Changes

-   [#1157](https://github.com/Khan/perseus/pull/1157) [`163e650d4`](https://github.com/Khan/perseus/commit/163e650d47732f80395934761bc44714cd89d937) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Inclusion of new MathJax-rendered tick labels for interactive graph.

*   [#1162](https://github.com/Khan/perseus/pull/1162) [`754934486`](https://github.com/Khan/perseus/commit/754934486b89e3d308e75cd46acde823266ac588) Thanks [@benchristel](https://github.com/benchristel)! - Update the style of focused lines in Mafs interactive graphs

### Patch Changes

-   [#1163](https://github.com/Khan/perseus/pull/1163) [`98ae896e1`](https://github.com/Khan/perseus/commit/98ae896e1b4bb394f4776699e19b0eab020e14eb) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: don't snap line midpoint in Mafs graph

*   [#1166](https://github.com/Khan/perseus/pull/1166) [`2ba54f4ba`](https://github.com/Khan/perseus/commit/2ba54f4ba2a3e0a447e0975f0a238a62250933ae) Thanks [@handeyeco](https://github.com/handeyeco)! - Split MafsGraph into MafsGraph and StatefulMafsGraph

-   [#1164](https://github.com/Khan/perseus/pull/1164) [`004a62e8e`](https://github.com/Khan/perseus/commit/004a62e8e71e41c7d2d9d86ff9606fdbe5893728) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Restore Padding Around Mafs Graph

*   [#1167](https://github.com/Khan/perseus/pull/1167) [`44f83a700`](https://github.com/Khan/perseus/commit/44f83a700779a0a8dd6b74ba79a99dfcecb47072) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix for Mafs SVG positioning bug

## 21.2.2

### Patch Changes

-   [#1160](https://github.com/Khan/perseus/pull/1160) [`000ce4bff`](https://github.com/Khan/perseus/commit/000ce4bff9bc91d7e3adff289a32bea972c4e827) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Style adjustments for Explanation widget button

## 21.2.1

### Patch Changes

-   [#1146](https://github.com/Khan/perseus/pull/1146) [`369316014`](https://github.com/Khan/perseus/commit/369316014208e7bc941de77d65e77586cf9b4d9b) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix focus ring on movable points in interactive-graph widget

## 21.2.0

### Minor Changes

-   [#1142](https://github.com/Khan/perseus/pull/1142) [`f4f85583c`](https://github.com/Khan/perseus/commit/f4f85583c794cd6513914537baf0536e96855ff7) Thanks [@handeyeco](https://github.com/handeyeco)! - Make grid and tick steps act independently in Mafs charts

*   [#1141](https://github.com/Khan/perseus/pull/1141) [`d3faae5a2`](https://github.com/Khan/perseus/commit/d3faae5a25f1a21b72907ba4cd769105c1c2d43b) Thanks [@handeyeco](https://github.com/handeyeco)! - update Mafs store when certain props change

-   [#1143](https://github.com/Khan/perseus/pull/1143) [`df96d28c5`](https://github.com/Khan/perseus/commit/df96d28c5cb6f1503ab907582260edc2448fa8cf) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - Grid ticks for MAFS

### Patch Changes

-   [#1152](https://github.com/Khan/perseus/pull/1152) [`ab3c47f96`](https://github.com/Khan/perseus/commit/ab3c47f96de9ee42280def09f05429585b7c38b6) Thanks [@benchristel](https://github.com/benchristel)! - Fix hitbox size of movable points on Mafs interactive graphs, to match the legacy graphs

*   [#1155](https://github.com/Khan/perseus/pull/1155) [`3d29e9f8d`](https://github.com/Khan/perseus/commit/3d29e9f8d21bdc49c1c7c97ab3887dd818bcf6d0) Thanks [@benchristel](https://github.com/benchristel)! - Fixed a bug where the wrong point moved if you dragged the endpoint of an interactive line segment after grading the question

-   [#1154](https://github.com/Khan/perseus/pull/1154) [`e2165df84`](https://github.com/Khan/perseus/commit/e2165df84110a94c3ff5251a71da2b82905c36b2) Thanks [@handeyeco](https://github.com/handeyeco)! - Use snap in constrain callback for movable elements

*   [#1148](https://github.com/Khan/perseus/pull/1148) [`9195c4f28`](https://github.com/Khan/perseus/commit/9195c4f284842688f60985e901a8534a9e4ac0c9) Thanks [@nedredmond](https://github.com/nedredmond)! - Fix return type for callback function `onWidgetStartProps`

## 21.1.0

### Minor Changes

-   [#1137](https://github.com/Khan/perseus/pull/1137) [`6341541f4`](https://github.com/Khan/perseus/commit/6341541f44a217e69e5f2599704bb635bf33fb2e) Thanks [@handeyeco](https://github.com/handeyeco)! - Add arrows to axes in Mafs grids

*   [#1139](https://github.com/Khan/perseus/pull/1139) [`e36173d6a`](https://github.com/Khan/perseus/commit/e36173d6a125813f66ec4457d0cccdcba57d87dc) Thanks [@handeyeco](https://github.com/handeyeco)! - Provide graph state to onChange callback in Mafs

-   [#1127](https://github.com/Khan/perseus/pull/1127) [`8089ad435`](https://github.com/Khan/perseus/commit/8089ad43564044c59cad28428f4a744baaba7250) Thanks [@benchristel](https://github.com/benchristel)! - Port the Point interactive graph type to Mafs

### Patch Changes

-   [#1128](https://github.com/Khan/perseus/pull/1128) [`f7aa9a26d`](https://github.com/Khan/perseus/commit/f7aa9a26d5355e7e7e7e5229ca4bb8b71c3e967a) Thanks [@nedredmond](https://github.com/nedredmond)! - Injects SerializedState into prompt composition for radio widgets

*   [#1138](https://github.com/Khan/perseus/pull/1138) [`7ecc1dc64`](https://github.com/Khan/perseus/commit/7ecc1dc64f5c7c249c96c1dff17c884f1ecc442f) Thanks [@benchristel](https://github.com/benchristel)! - Refactor the InteractiveGraphState type to accommodate circle graphs

-   [#1131](https://github.com/Khan/perseus/pull/1131) [`7851bcb85`](https://github.com/Khan/perseus/commit/7851bcb85f5f09c2f93e5c8c435e59adef6afb40) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Adjust Explanation Widget to Handle Lots of Text in its Button

*   [#1132](https://github.com/Khan/perseus/pull/1132) [`3eb870e7a`](https://github.com/Khan/perseus/commit/3eb870e7a1fbcdd0cbec82568491fb9124037057) Thanks [@benchristel](https://github.com/benchristel)! - Internal: revise types used for interactive graph state

## 21.0.0

### Major Changes

-   [#1117](https://github.com/Khan/perseus/pull/1117) [`4a2117e86`](https://github.com/Khan/perseus/commit/4a2117e865b709cd0788c7ddfc0abd011b3d4bac) Thanks [@handeyeco](https://github.com/handeyeco)! - Stop deriving widget type from widget ID

### Patch Changes

-   [#1125](https://github.com/Khan/perseus/pull/1125) [`64fd65129`](https://github.com/Khan/perseus/commit/64fd65129cac78750b848f32e205cb46860ee24b) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Refactor getGradableGraph

*   [#1118](https://github.com/Khan/perseus/pull/1118) [`c56633482`](https://github.com/Khan/perseus/commit/c566334824faf9f6f90362bba0276e2ef7d59829) Thanks [@nedredmond](https://github.com/nedredmond)! - Add side length labels to polygon mafs graph

-   [#1122](https://github.com/Khan/perseus/pull/1122) [`ad392c7b1`](https://github.com/Khan/perseus/commit/ad392c7b12ac7a214b03f86b8e68503499aaa381) Thanks [@nedredmond](https://github.com/nedredmond)! - Fix angle-flipping bug on polygon mafs graph

## 20.8.1

### Patch Changes

-   [#1119](https://github.com/Khan/perseus/pull/1119) [`fc01f490f`](https://github.com/Khan/perseus/commit/fc01f490f6aabcfedca10e5833834488234e0efa) Thanks [@nedredmond](https://github.com/nedredmond)! - Show right angle square whether angles are shown or not in mafs polygon graphs

*   [#1112](https://github.com/Khan/perseus/pull/1112) [`0f1f3fdac`](https://github.com/Khan/perseus/commit/0f1f3fdaccd2ad52b660bac5fe691e8a64de728b) Thanks [@benchristel](https://github.com/benchristel)! - Internal: consolidate definition of Mafs-supported interactive graph types

-   [#1120](https://github.com/Khan/perseus/pull/1120) [`1ef9c7b67`](https://github.com/Khan/perseus/commit/1ef9c7b679e911880b77b22001a734be76c7f9a5) Thanks [@benchristel](https://github.com/benchristel)! - Internal: reduce console log noise in tests

*   [#1116](https://github.com/Khan/perseus/pull/1116) [`74c6efc6a`](https://github.com/Khan/perseus/commit/74c6efc6a185c62ab204e21a991012fde6eab12c) Thanks [@nedredmond](https://github.com/nedredmond)! - Fix grid rendering bug for new Mafs graphs

-   [#1105](https://github.com/Khan/perseus/pull/1105) [`76dc2394d`](https://github.com/Khan/perseus/commit/76dc2394dfd1dcdf389923997d104fa2e42e1b38) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Migrate to @khanacademy/wonder-blocks-tokens

*   [#1116](https://github.com/Khan/perseus/pull/1116) [`74c6efc6a`](https://github.com/Khan/perseus/commit/74c6efc6a185c62ab204e21a991012fde6eab12c) Thanks [@nedredmond](https://github.com/nedredmond)! - Add optional angle labels to polygon graph

-   [#1114](https://github.com/Khan/perseus/pull/1114) [`73bc6da07`](https://github.com/Khan/perseus/commit/73bc6da0789a59905590e15bcf8d0ec45f8853b5) Thanks [@benchristel](https://github.com/benchristel)! - Fix a rendering bug in Mafs interactive graphs that have unequal x and y ranges

*   [#1115](https://github.com/Khan/perseus/pull/1115) [`900e1cea8`](https://github.com/Khan/perseus/commit/900e1cea86610c8dab5a481f100ef1a89cb1cf7b) Thanks [@Myranae](https://github.com/Myranae)! - Refactor addWidget to use a string instead of WidgetType and number

-   [#1110](https://github.com/Khan/perseus/pull/1110) [`d2c6e3129`](https://github.com/Khan/perseus/commit/d2c6e3129e1a6488d24bddbc4f4638c9eba9047d) Thanks [@nedredmond](https://github.com/nedredmond)! - Bug fix: mafs grid should render when there is a legacy background and markings other than "none"

*   [#1111](https://github.com/Khan/perseus/pull/1111) [`9139a9246`](https://github.com/Khan/perseus/commit/9139a92468def2b0804ed30d0356b30c08854daf) Thanks [@benchristel](https://github.com/benchristel)! - Fix a bug in Mafs graphs where default segments were sometimes incorrectly positioned

*   Updated dependencies [[`76dc2394d`](https://github.com/Khan/perseus/commit/76dc2394dfd1dcdf389923997d104fa2e42e1b38), [`b53cf2a3a`](https://github.com/Khan/perseus/commit/b53cf2a3a3d2e59d95c9428561417a7789522cb6)]:
    -   @khanacademy/math-input@17.4.1

## 20.8.0

### Minor Changes

-   [#1092](https://github.com/Khan/perseus/pull/1092) [`e70d1701`](https://github.com/Khan/perseus/commit/e70d17010eb3943f114ea382025016e5ed68cde5) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bug fixes to ensure that users can properly focus a math input on mobile devices

### Patch Changes

-   [#1101](https://github.com/Khan/perseus/pull/1101) [`5ce75a23`](https://github.com/Khan/perseus/commit/5ce75a2357a7ab972028fd1fbf6d7378c65f48ec) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Exporting new extract perseus data functions

-   Updated dependencies [[`e70d1701`](https://github.com/Khan/perseus/commit/e70d17010eb3943f114ea382025016e5ed68cde5)]:
    -   @khanacademy/math-input@17.4.0

## 20.7.0

### Minor Changes

-   [#1086](https://github.com/Khan/perseus/pull/1086) [`08e4a422`](https://github.com/Khan/perseus/commit/08e4a4229f57bf5c1c029591fcf5dfa9ef9b4ee2) Thanks [@Myranae](https://github.com/Myranae)! - Add helper functions to remove snowman regexes from webapp

### Patch Changes

-   [#1094](https://github.com/Khan/perseus/pull/1094) [`ed9a9432`](https://github.com/Khan/perseus/commit/ed9a9432935183e3c7b9ec8f55e758e5820f156a) Thanks [@nedredmond](https://github.com/nedredmond)! - Polygon mafs graph behind feature flag

*   [#1096](https://github.com/Khan/perseus/pull/1096) [`c614a001`](https://github.com/Khan/perseus/commit/c614a001003b4a4be395ea86c7d785f967262c64) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Tooling: Upgrade ESLint to latest and apply fixes

*   Updated dependencies [[`c614a001`](https://github.com/Khan/perseus/commit/c614a001003b4a4be395ea86c7d785f967262c64)]:
    -   @khanacademy/kas@0.3.9

## 20.6.0

### Minor Changes

-   [#1090](https://github.com/Khan/perseus/pull/1090) [`20a23a39`](https://github.com/Khan/perseus/commit/20a23a3976a70378e86c8871e47d5497ddc9d51e) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Added new API methods to support our Coach Report Response view.

*   [#1058](https://github.com/Khan/perseus/pull/1058) [`a431883d`](https://github.com/Khan/perseus/commit/a431883d7d157160f07daa27c3d3d08eb07563f5) Thanks [@handeyeco](https://github.com/handeyeco)! - Move widget enum helpers from Webapp to Perseus

### Patch Changes

-   [#1095](https://github.com/Khan/perseus/pull/1095) [`11e04962`](https://github.com/Khan/perseus/commit/11e04962fee178c997ca50d96eaebc446d43e66c) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Tooling: Upgrade projects to use TypeScript v5.4.2

*   [#1093](https://github.com/Khan/perseus/pull/1093) [`0cd66f88`](https://github.com/Khan/perseus/commit/0cd66f882e549d2bc3c9e6911a50656e07c549f2) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change APIOptions and APIOptionsWithDefaults comments to JSDoc comments for better tooling support

-   [#1088](https://github.com/Khan/perseus/pull/1088) [`47eade13`](https://github.com/Khan/perseus/commit/47eade137687d829b0ac46ac11218afe1c9308f4) Thanks [@benchristel](https://github.com/benchristel)! - Refactor the InteractiveGraph component to avoid mounting the legacy interactive graph when Mafs is enabled. This ensures that state from the legacy graph doesn't interfere with the Mafs graph

-   Updated dependencies [[`11e04962`](https://github.com/Khan/perseus/commit/11e04962fee178c997ca50d96eaebc446d43e66c)]:
    -   @khanacademy/simple-markdown@0.11.4
    -   @khanacademy/pure-markdown@0.3.1

## 20.5.0

### Minor Changes

-   [#1077](https://github.com/Khan/perseus/pull/1077) [`ab00539f`](https://github.com/Khan/perseus/commit/ab00539f8d9514dff92ba1abe179100038fd79d4) Thanks [@nishasy](https://github.com/nishasy)! - Add UI for adjusting the color of a locked point

## 20.4.1

### Patch Changes

-   [#1084](https://github.com/Khan/perseus/pull/1084) [`d1294120`](https://github.com/Khan/perseus/commit/d1294120fd62d8753aa5c85b3d789a2449739481) Thanks [@nedredmond](https://github.com/nedredmond)! - Migrate `ray` interactive graph type to mafs behind feature flag

## 20.4.0

### Minor Changes

-   [#1080](https://github.com/Khan/perseus/pull/1080) [`512265cc`](https://github.com/Khan/perseus/commit/512265cc5ae75e2ea658255291ef75539b1c1702) Thanks [@nedredmond](https://github.com/nedredmond)! - Migrate Linear and Linear System interactive graphs behind feature flag

### Patch Changes

-   [#1081](https://github.com/Khan/perseus/pull/1081) [`e03e2b03`](https://github.com/Khan/perseus/commit/e03e2b03c9b799f2f900c1f74f1a7b74bd5efe1f) Thanks [@benchristel](https://github.com/benchristel)! - Fix a bug in the Explanation widget that was causing SSR to error out.

## 20.3.1

### Patch Changes

-   [#1078](https://github.com/Khan/perseus/pull/1078) [`e1706bba`](https://github.com/Khan/perseus/commit/e1706bba2e5f38493301ff401d784e8777f4e48f) Thanks [@Myranae](https://github.com/Myranae)! - Move mathjax-renderer dependency from perseus package to root

## 20.3.0

### Minor Changes

-   [#1060](https://github.com/Khan/perseus/pull/1060) [`857ea95b`](https://github.com/Khan/perseus/commit/857ea95bba32b230bca6d43467995cbdc1b9dca9) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Accessibility and Usability Enhancements for Explanation Widget

## 20.2.0

### Minor Changes

-   [#1067](https://github.com/Khan/perseus/pull/1067) [`6196375a`](https://github.com/Khan/perseus/commit/6196375add76025fb1f30473912dd38cc001cca4) Thanks [@nishasy](https://github.com/nishasy)! - Can pass a point into `lockedFigures` into MafsGraph and a point will be displayed.

*   [#1074](https://github.com/Khan/perseus/pull/1074) [`a263e940`](https://github.com/Khan/perseus/commit/a263e940de35cc51a5be81ca507a4e9b6827b422) Thanks [@nishasy](https://github.com/nishasy)! - Add "add a locked figure" UI to interactive graph editor + adding points (mafs graphs only)

### Patch Changes

-   [#1068](https://github.com/Khan/perseus/pull/1068) [`881da724`](https://github.com/Khan/perseus/commit/881da724d36561b2a200af0258ab81523d4d236a) Thanks [@benchristel](https://github.com/benchristel)! - Adjust styling of the movable points and line segments on the Mafs segment graph

*   [#1071](https://github.com/Khan/perseus/pull/1071) [`eb637b35`](https://github.com/Khan/perseus/commit/eb637b3528b6ecaf1df83e53d429b6bdc89613d4) Thanks [@benchristel](https://github.com/benchristel)! - Add a "check answer" button to interactive graphs displayed in the dev flipbook UI

-   [#1073](https://github.com/Khan/perseus/pull/1073) [`ea0db7d9`](https://github.com/Khan/perseus/commit/ea0db7d9b2013637a27f1ea9fc36b46b0a7488a2) Thanks [@benchristel](https://github.com/benchristel)! - Fix color of Mafs line segments

## 20.1.0

### Minor Changes

-   [#1063](https://github.com/Khan/perseus/pull/1063) [`631af3a4`](https://github.com/Khan/perseus/commit/631af3a459e7ee54e552d011438bd7daa6dc9197) Thanks [@benchristel](https://github.com/benchristel)! - You can now move the movable line segments on Mafs graphs by dragging anywhere on the line.

### Patch Changes

-   [#1049](https://github.com/Khan/perseus/pull/1049) [`f5d5852c`](https://github.com/Khan/perseus/commit/f5d5852c4e6c4c7e701433f56ec82cd9fdf77684) Thanks [@nishasy](https://github.com/nishasy)! - Use Wonder Blocks + minor refactoring in interactive graph editor

## 20.0.2

### Patch Changes

-   [#1042](https://github.com/Khan/perseus/pull/1042) [`9ae993c8`](https://github.com/Khan/perseus/commit/9ae993c8beecb0419b2b461916ee704f8b12fb28) Thanks [@nishasy](https://github.com/nishasy)! - Update props in InteractiveGraphSettings and InteractiveGraphEditor to more accurately reflect how they are used. Minor refactoring.

*   [#1062](https://github.com/Khan/perseus/pull/1062) [`48cf0c07`](https://github.com/Khan/perseus/commit/48cf0c07895f66b3d868ce265befc17f316bb785) Thanks [@nedredmond](https://github.com/nedredmond)! - Added debounce to math input update

## 20.0.1

### Patch Changes

-   [#978](https://github.com/Khan/perseus/pull/978) [`881be46f`](https://github.com/Khan/perseus/commit/881be46fc75117d57bab30d1568b417cca5d6976) Thanks [@nishasy](https://github.com/nishasy)! - Update WB Clickable. Stop keypad button clicks from removing focus from the input.

-   Updated dependencies [[`881be46f`](https://github.com/Khan/perseus/commit/881be46fc75117d57bab30d1568b417cca5d6976)]:
    -   @khanacademy/math-input@17.3.0

## 20.0.0

### Major Changes

-   [#1046](https://github.com/Khan/perseus/pull/1046) [`18a2862a`](https://github.com/Khan/perseus/commit/18a2862ab5eb56bc69b527fcad0edf86ad91ba12) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Deprecation of Lights-Puzzle, Simulator, Reaction Diagram, and Sequence Widgets.

## 19.9.0

### Minor Changes

-   [#1055](https://github.com/Khan/perseus/pull/1055) [`bacbb3a2`](https://github.com/Khan/perseus/commit/bacbb3a2ccc06b54531a5a9537be709c165a8a61) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixing the frequency that we're calling interactionCallback

## 19.8.0

### Minor Changes

-   [#1028](https://github.com/Khan/perseus/pull/1028) [`06abf394`](https://github.com/Khan/perseus/commit/06abf3946f044a7ebfdaddaa369f43f781cb091b) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Typescript improvements for Perseus Widget Options and Widget types

*   [#1047](https://github.com/Khan/perseus/pull/1047) [`ec31bc74`](https://github.com/Khan/perseus/commit/ec31bc74efe089f312895f4133d20440e19aebe9) Thanks [@benchristel](https://github.com/benchristel)! - Make whole segments draggable in Mafs segment graphs

## 19.7.3

### Patch Changes

-   Updated dependencies [[`54a301e9`](https://github.com/Khan/perseus/commit/54a301e9fa264310927c0909899706a786357c4b)]:
    -   @khanacademy/math-input@17.2.3

## 19.7.2

### Patch Changes

-   [#1051](https://github.com/Khan/perseus/pull/1051) [`4ef7b067`](https://github.com/Khan/perseus/commit/4ef7b06705bdab89298b8b36b5773cfdf8ce0bec) Thanks [@nedredmond](https://github.com/nedredmond)! - Remove font import from Mafs wrapper

-   Updated dependencies [[`16ca445c`](https://github.com/Khan/perseus/commit/16ca445cf138b82092518498159de2826b169ee8)]:
    -   @khanacademy/math-input@17.2.2

## 19.7.1

### Patch Changes

-   [#1043](https://github.com/Khan/perseus/pull/1043) [`1b1d0404`](https://github.com/Khan/perseus/commit/1b1d040461dc6c6b9d238a81be4d2d3e96c452d8) Thanks [@nedredmond](https://github.com/nedredmond)! - Bugfixes re: sizing props

## 19.7.0

### Minor Changes

-   [#1023](https://github.com/Khan/perseus/pull/1023) [`3901f863`](https://github.com/Khan/perseus/commit/3901f863f674fec614ec6422af45aa7ad96f0d6d) Thanks [@nedredmond](https://github.com/nedredmond)! - Adds new interactive graph experience behind feature flag

### Patch Changes

-   [#1033](https://github.com/Khan/perseus/pull/1033) [`a78cfc0f`](https://github.com/Khan/perseus/commit/a78cfc0f138fced4b1a465f8774be2c12b2fe789) Thanks [@nishasy](https://github.com/nishasy)! - Update InteractiveGraphSettings to React class. Update `markings` to be "graph" | "grid" | "none" instead of string.

## 19.6.3

### Patch Changes

-   [#1036](https://github.com/Khan/perseus/pull/1036) [`664b037f`](https://github.com/Khan/perseus/commit/664b037fd76e4406f21add1449fc56e90d742148) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add documentation for Widgets type in Renderer

## 19.6.2

### Patch Changes

-   [#1029](https://github.com/Khan/perseus/pull/1029) [`17d05e8e`](https://github.com/Khan/perseus/commit/17d05e8ec4edb417cff8007efd333b166ffdd139) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Migrate to @testing-library/user-event v14.

-   Updated dependencies [[`17d05e8e`](https://github.com/Khan/perseus/commit/17d05e8ec4edb417cff8007efd333b166ffdd139), [`7e4a65f0`](https://github.com/Khan/perseus/commit/7e4a65f0ea795ea004437099de4df8ca3cdbb171)]:
    -   @khanacademy/math-input@17.2.1

## 19.6.1

### Patch Changes

-   [#1014](https://github.com/Khan/perseus/pull/1014) [`b1552885`](https://github.com/Khan/perseus/commit/b155288568a3f13b3983515391cdbf4dd5092a51) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Fix Spacebar Usage on Explanation Widget

## 19.6.0

### Minor Changes

-   [#1005](https://github.com/Khan/perseus/pull/1005) [`0562929c`](https://github.com/Khan/perseus/commit/0562929c03645028b68da497382489747f0fc2c6) Thanks [@mpolyak](https://github.com/mpolyak)! - In JIPT context rendering split sections into paragraphs in ArticleRenderer

*   [#996](https://github.com/Khan/perseus/pull/996) [`4e2b5100`](https://github.com/Khan/perseus/commit/4e2b51002e41c8f36051775a7ceff4fd1a564526) Thanks [@mpolyak](https://github.com/mpolyak)! - Revert disabling markdown parser list rule in JIPT context

### Patch Changes

-   Updated dependencies [[`0562929c`](https://github.com/Khan/perseus/commit/0562929c03645028b68da497382489747f0fc2c6), [`4e2b5100`](https://github.com/Khan/perseus/commit/4e2b51002e41c8f36051775a7ceff4fd1a564526)]:
    -   @khanacademy/pure-markdown@0.3.0

## 19.5.1

### Patch Changes

-   [#1020](https://github.com/Khan/perseus/pull/1020) [`30405816`](https://github.com/Khan/perseus/commit/3040581645a67f518920fdf6d94b4f78f2233f0c) Thanks [@nishasy](https://github.com/nishasy)! - Undo update to GraphSettings making it a class function

## 19.5.0

### Minor Changes

-   [#1000](https://github.com/Khan/perseus/pull/1000) [`7038c046`](https://github.com/Khan/perseus/commit/7038c046d3e869e4ad43e3805248f06d61a94af0) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bug fixes to ensure that users can properly interact with the numberline widget

### Patch Changes

-   Updated dependencies [[`7038c046`](https://github.com/Khan/perseus/commit/7038c046d3e869e4ad43e3805248f06d61a94af0)]:
    -   @khanacademy/math-input@17.2.0

## 19.4.0

### Minor Changes

-   [#980](https://github.com/Khan/perseus/pull/980) [`7d4d098d`](https://github.com/Khan/perseus/commit/7d4d098dbdbc3f41e89d7e118c8cd83fbcaeb928) Thanks [@Myranae](https://github.com/Myranae)! - Create a helper function for generating correctly typed Perseus test items

### Patch Changes

-   [#1009](https://github.com/Khan/perseus/pull/1009) [`7c030e61`](https://github.com/Khan/perseus/commit/7c030e61613b67ba92d2fc4f0015c85e0af6b878) Thanks [@nishasy](https://github.com/nishasy)! - Update GraphSettings to React class. Update `markings` type to be "graph" | "grid" | "none" instead of string.

## 19.3.1

### Patch Changes

-   [#997](https://github.com/Khan/perseus/pull/997) [`6ef53d21`](https://github.com/Khan/perseus/commit/6ef53d213fae13977effbd28c784aa6cd91c6e7f) Thanks [@nishasy](https://github.com/nishasy)! - Add a type for LockedPoint

## 19.3.0

### Minor Changes

-   [#992](https://github.com/Khan/perseus/pull/992) [`955ae480`](https://github.com/Khan/perseus/commit/955ae480a822d875784fb2de65240fe1acd283a5) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Update of interactionCallback to return current user input data

*   [#1006](https://github.com/Khan/perseus/pull/1006) [`17c38bf7`](https://github.com/Khan/perseus/commit/17c38bf743da3675d8ce13d4dc3c0b8efaa93d89) Thanks [@benchristel](https://github.com/benchristel)! - Allow learners to type trig operators in any language in the Expression widget

### Patch Changes

-   Updated dependencies [[`17c38bf7`](https://github.com/Khan/perseus/commit/17c38bf743da3675d8ce13d4dc3c0b8efaa93d89)]:
    -   @khanacademy/math-input@17.1.0

## 19.2.1

### Patch Changes

-   [#1001](https://github.com/Khan/perseus/pull/1001) [`f30c6639`](https://github.com/Khan/perseus/commit/f30c663941a21189f3520b7e38beda0e38320ed3) Thanks [@nishasy](https://github.com/nishasy)! - Expression widget is marked as `accessible` internally. This will stop disabling the "requires screen or mouse" checkbox in the exercise editor for exercises that use expression widget.

## 19.2.0

### Minor Changes

-   [#989](https://github.com/Khan/perseus/pull/989) [`97b5bbfb`](https://github.com/Khan/perseus/commit/97b5bbfbea591d3b6d814ed4717135138fb30dec) Thanks [@aag](https://github.com/aag)! - Add a new python-program widget and its editor

### Patch Changes

-   [#995](https://github.com/Khan/perseus/pull/995) [`a4ead994`](https://github.com/Khan/perseus/commit/a4ead9940cddc09434b823039ff51b85ecd9e639) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Refactor wrapped Raphael SVGs to be ES6 classes

*   [#995](https://github.com/Khan/perseus/pull/995) [`a4ead994`](https://github.com/Khan/perseus/commit/a4ead9940cddc09434b823039ff51b85ecd9e639) Thanks [@benchristel](https://github.com/benchristel)! - Update formatting for Prettier 2.8.8

*   Updated dependencies [[`a4ead994`](https://github.com/Khan/perseus/commit/a4ead9940cddc09434b823039ff51b85ecd9e639)]:
    -   @khanacademy/math-input@17.0.8
    -   @khanacademy/perseus-linter@0.3.12
    -   @khanacademy/pure-markdown@0.2.15

## 19.1.9

### Patch Changes

-   [#986](https://github.com/Khan/perseus/pull/986) [`585a3fe9`](https://github.com/Khan/perseus/commit/585a3fe9aaa26ee550d36768c36e626f626a3417) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Wrap some radio widget strings that a learner would see in `i18n._()` calls so they can be localized.

*   [#987](https://github.com/Khan/perseus/pull/987) [`e4ca3c53`](https://github.com/Khan/perseus/commit/e4ca3c5384e9a16e79e4fb2704c0a6dd3c4ebf54) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Move Graphie's addMouseLayer function directly onto class (avoid metaprogramming)

-   [#979](https://github.com/Khan/perseus/pull/979) [`9f2eafe4`](https://github.com/Khan/perseus/commit/9f2eafe4c4649fd1ee1a83611b53908eb9cf3468) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Improve types for Graphie's getMousePx and getMouseCoord functions

*   [#975](https://github.com/Khan/perseus/pull/975) [`36a5ebe1`](https://github.com/Khan/perseus/commit/36a5ebe1ef373058090841fc734778c06e318397) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add tests to cover Graphie's addMouseLayer() function - includes some related type improvements.

## 19.1.8

### Patch Changes

-   [#982](https://github.com/Khan/perseus/pull/982) [`279c3730`](https://github.com/Khan/perseus/commit/279c3730fba6a9854b1434ba7499f5c5cfd2151a) Thanks [@nedredmond](https://github.com/nedredmond)! - Inject localized MathSpeak into MathQuill

-   Updated dependencies [[`279c3730`](https://github.com/Khan/perseus/commit/279c3730fba6a9854b1434ba7499f5c5cfd2151a)]:
    -   @khanacademy/math-input@17.0.7

## 19.1.7

### Patch Changes

-   [#974](https://github.com/Khan/perseus/pull/974) [`ca0af2eb`](https://github.com/Khan/perseus/commit/ca0af2eb613ece0be8c59798d0e886577c9590c7) Thanks [@nishasy](https://github.com/nishasy)! - Stop keypad from closing when math input field is clicked

*   [#969](https://github.com/Khan/perseus/pull/969) [`3f718367`](https://github.com/Khan/perseus/commit/3f718367f82ecb8819b91220831e34becdbab8c9) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Refactor MovablePoint to be an ES6 class

*   Updated dependencies [[`cdf7c0aa`](https://github.com/Khan/perseus/commit/cdf7c0aa0f095b8afba429f2da5328cc11cdb7a3)]:
    -   @khanacademy/math-input@17.0.6

## 19.1.6

### Patch Changes

-   [#971](https://github.com/Khan/perseus/pull/971) [`90ff7a48`](https://github.com/Khan/perseus/commit/90ff7a483b01552a556c7852427e98153cc20417) Thanks [@benchristel](https://github.com/benchristel)! - Remove source files from the distributed NPM package

-   Updated dependencies [[`90ff7a48`](https://github.com/Khan/perseus/commit/90ff7a483b01552a556c7852427e98153cc20417)]:
    -   @khanacademy/kas@0.3.8
    -   @khanacademy/kmath@0.1.12
    -   @khanacademy/math-input@17.0.5
    -   @khanacademy/perseus-core@1.4.2
    -   @khanacademy/perseus-linter@0.3.11
    -   @khanacademy/pure-markdown@0.2.14
    -   @khanacademy/simple-markdown@0.11.3

## 19.1.5

### Patch Changes

-   [#964](https://github.com/Khan/perseus/pull/964) [`d8fbc251`](https://github.com/Khan/perseus/commit/d8fbc25170bd671ad984893553f79f44e3a0d048) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Refactor Movable to be an ES6 class

-   Updated dependencies [[`d8fbc251`](https://github.com/Khan/perseus/commit/d8fbc25170bd671ad984893553f79f44e3a0d048), [`ba44dd40`](https://github.com/Khan/perseus/commit/ba44dd405272b066615099c8bd30033715305939)]:
    -   @khanacademy/kmath@0.1.11
    -   @khanacademy/math-input@17.0.4

## 19.1.4

### Patch Changes

-   [#958](https://github.com/Khan/perseus/pull/958) [`729b419a`](https://github.com/Khan/perseus/commit/729b419a5c31eaa6ac4da996a0683a2fdffc5997) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Add tests for normalizeOptions function (used by Movable)

*   [#960](https://github.com/Khan/perseus/pull/960) [`ce0227c1`](https://github.com/Khan/perseus/commit/ce0227c1d7b432b6a9484c32542ddf23d27b1e95) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add tests for Movable pseudo-class

*   Updated dependencies [[`a4a4dc44`](https://github.com/Khan/perseus/commit/a4a4dc447037eaea83423dc21a15076435c4b638)]:
    -   @khanacademy/math-input@17.0.3

## 19.1.3

### Patch Changes

-   [#957](https://github.com/Khan/perseus/pull/957) [`19114138`](https://github.com/Khan/perseus/commit/1911413844b59ef87d5b2329f6120e4568be9ae3) Thanks [@nedredmond](https://github.com/nedredmond)! - Updated tests

*   [#952](https://github.com/Khan/perseus/pull/952) [`6bebefcb`](https://github.com/Khan/perseus/commit/6bebefcb4ce54c3ed0d57707c34d4399f763368f) Thanks [@nedredmond](https://github.com/nedredmond)! - Screenreader reads Label Image Widget answer pills

-   [#961](https://github.com/Khan/perseus/pull/961) [`03e1461f`](https://github.com/Khan/perseus/commit/03e1461fe16d5dd31fd1f6d11669126dce96f088) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Ensure the deprecated-standin widget replaces the transformer widget which is now removed

-   Updated dependencies [[`19114138`](https://github.com/Khan/perseus/commit/1911413844b59ef87d5b2329f6120e4568be9ae3)]:
    -   @khanacademy/math-input@17.0.2

## 19.1.2

### Patch Changes

-   [#954](https://github.com/Khan/perseus/pull/954) [`43820ff9`](https://github.com/Khan/perseus/commit/43820ff9ce391682b951279a4c6fb9e3db966eb9) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Fix @ts-expect-errors related to Graphie

*   [#956](https://github.com/Khan/perseus/pull/956) [`14e107f5`](https://github.com/Khan/perseus/commit/14e107f57c10fb3a442e55506810eb309caced24) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix bug when replacing transformer widget with deprecated-standin

*   Updated dependencies [[`43820ff9`](https://github.com/Khan/perseus/commit/43820ff9ce391682b951279a4c6fb9e3db966eb9)]:
    -   @khanacademy/kmath@0.1.10

## 19.1.1

### Patch Changes

-   Updated dependencies [[`8c8af142`](https://github.com/Khan/perseus/commit/8c8af1425a5cd257ca894b20bdb481f7148ffa7d)]:
    -   @khanacademy/math-input@17.0.1

## 19.1.0

### Minor Changes

-   [#895](https://github.com/Khan/perseus/pull/895) [`15b4bc02`](https://github.com/Khan/perseus/commit/15b4bc02d65fd1900e01ce7dd35863c1be579d73) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Export utility Range and Size types from package

*   [#942](https://github.com/Khan/perseus/pull/942) [`319e330e`](https://github.com/Khan/perseus/commit/319e330ed77d2145266a9b231693ac65320032a2) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Creation of a new callback that can return the WidgetsStartProps

-   [#937](https://github.com/Khan/perseus/pull/937) [`ef898f77`](https://github.com/Khan/perseus/commit/ef898f77f45f3494f5012d2db52a3461aad93c69) Thanks [@nishasy](https://github.com/nishasy)! - bumped mathquill version + minor type updates

### Patch Changes

-   [#935](https://github.com/Khan/perseus/pull/935) [`0b737502`](https://github.com/Khan/perseus/commit/0b7375023826ef5ee46eb5ae00136b2356e10be4) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Refactor graphie.ts

*   [#945](https://github.com/Khan/perseus/pull/945) [`3bfd44e3`](https://github.com/Khan/perseus/commit/3bfd44e37643cdd13392fbaabb9fb4370378d2b3) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Refactor graphie.ts

-   [#949](https://github.com/Khan/perseus/pull/949) [`59ce1e09`](https://github.com/Khan/perseus/commit/59ce1e0990cecd1123d7b9a671b032fcd03ce1b1) Thanks [@benchristel](https://github.com/benchristel)! - Internal: use built-in JS functions instead of underscore

*   [#946](https://github.com/Khan/perseus/pull/946) [`f16e4184`](https://github.com/Khan/perseus/commit/f16e4184a24dcdaafc0cb4ebde5651f5bb135df9) Thanks [@benchristel](https://github.com/benchristel)! - Internal: improve type coverage in graphie.ts and interactive.ts

-   [#951](https://github.com/Khan/perseus/pull/951) [`247f8b1b`](https://github.com/Khan/perseus/commit/247f8b1be0647c39a5cabd9ce72a216d750a707b) Thanks [@handeyeco](https://github.com/handeyeco)! - Rename helper that's not in-use yet.

*   [#943](https://github.com/Khan/perseus/pull/943) [`62e04cfa`](https://github.com/Khan/perseus/commit/62e04cfa3139c6417442cbb96f8012d098a7c279) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Add tests for Graphie drawing tools

-   [#944](https://github.com/Khan/perseus/pull/944) [`583becef`](https://github.com/Khan/perseus/commit/583becefbf690e96df709bcb7f8150cf686deadf) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Remove unused code from Graphie drawing tools

-   Updated dependencies [[`ef898f77`](https://github.com/Khan/perseus/commit/ef898f77f45f3494f5012d2db52a3461aad93c69), [`59ce1e09`](https://github.com/Khan/perseus/commit/59ce1e0990cecd1123d7b9a671b032fcd03ce1b1)]:
    -   @khanacademy/math-input@17.0.0
    -   @khanacademy/kmath@0.1.9

## 19.0.0

### Major Changes

-   [#915](https://github.com/Khan/perseus/pull/915) [`98bf2106`](https://github.com/Khan/perseus/commit/98bf2106e0ae56f37f3c0c2d0a5563802e4db62d) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Remove Transformer widget and replace with a standin widget

## 18.0.1

### Patch Changes

-   [#940](https://github.com/Khan/perseus/pull/940) [`e970dfcc`](https://github.com/Khan/perseus/commit/e970dfcc51e7b535e94669e6ffe0cbdd6d9b7b89) Thanks [@nishasy](https://github.com/nishasy)! - Fixed the answer pill's height in Label Image widget to account for multi-line answers

-   Updated dependencies [[`e970dfcc`](https://github.com/Khan/perseus/commit/e970dfcc51e7b535e94669e6ffe0cbdd6d9b7b89)]:
    -   @khanacademy/math-input@16.5.1

## 18.0.0

### Major Changes

-   [#933](https://github.com/Khan/perseus/pull/933) [`851c2cb8`](https://github.com/Khan/perseus/commit/851c2cb8cd6f6c0d6a62343f9232cc618476b85e) Thanks [@handeyeco](https://github.com/handeyeco)! - Update external and internal facing Perseus types

### Minor Changes

-   [#925](https://github.com/Khan/perseus/pull/925) [`f7ac2929`](https://github.com/Khan/perseus/commit/f7ac2929ac18e6fd18b1e6c460350d5119762b42) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Design changes to the standin widget

*   [#938](https://github.com/Khan/perseus/pull/938) [`738aa661`](https://github.com/Khan/perseus/commit/738aa6613fdf752b8a4348c43690666fb5f0531f) Thanks [@handeyeco](https://github.com/handeyeco)! - export parsePerseusJSON helper

-   [#936](https://github.com/Khan/perseus/pull/936) [`d95e7044`](https://github.com/Khan/perseus/commit/d95e70444e2d038460a3b3fbe4e3c5aa4f4bd41d) Thanks [@Myranae](https://github.com/Myranae)! - Add helper functions for extracting perseus data

### Patch Changes

-   [#929](https://github.com/Khan/perseus/pull/929) [`87bfcc6f`](https://github.com/Khan/perseus/commit/87bfcc6f4a59a95027d76018625802726aa0d309) Thanks [@benchristel](https://github.com/benchristel)! - Internal: delete dead code from graphie.ts

*   [#934](https://github.com/Khan/perseus/pull/934) [`6c3b6afe`](https://github.com/Khan/perseus/commit/6c3b6afea87f95bc3dc1da78cc0ddd29418d14dc) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Refactor graphie.ts

-   [#927](https://github.com/Khan/perseus/pull/927) [`1e179194`](https://github.com/Khan/perseus/commit/1e179194e9674b267be11c280f80faa5cc671d91) Thanks [@benchristel](https://github.com/benchristel)! - Remove unused code related to KaTeX and MathJax 2. It's no longer needed
    because all callers have upgraded to MathJax 3.

*   [#926](https://github.com/Khan/perseus/pull/926) [`4c2c2abc`](https://github.com/Khan/perseus/commit/4c2c2abc9c8dbe57a0036ff7873926ef5ecdd6e6) Thanks [@nedredmond](https://github.com/nedredmond)! - Upgrade MathJax

-   [#930](https://github.com/Khan/perseus/pull/930) [`544ca540`](https://github.com/Khan/perseus/commit/544ca540469b2d0b34a8d00de256872d32648fda) Thanks [@nedredmond](https://github.com/nedredmond)! - Remove centering style from image widget

*   [#931](https://github.com/Khan/perseus/pull/931) [`76ebdc76`](https://github.com/Khan/perseus/commit/76ebdc7620a2f1ffe28524f95a99a13393162951) Thanks [@benchristel](https://github.com/benchristel)! - Refactor graphie.ts and remove unused cartToPolar function

-   [#932](https://github.com/Khan/perseus/pull/932) [`237593b8`](https://github.com/Khan/perseus/commit/237593b8d5bd36148cb5adabf51a796acf8f81a4) Thanks [@benchristel](https://github.com/benchristel)! - Refactor graphie.ts to use modern JS/TS syntax. No external-facing changes intended.

## 17.8.0

### Minor Changes

-   [#917](https://github.com/Khan/perseus/pull/917) [`a5479339`](https://github.com/Khan/perseus/commit/a547933946b8be33b388fa4654d87289734848f0) Thanks [@Myranae](https://github.com/Myranae)! - Update Perseus' Storybook to use MathJax instead of KaTeX

## 17.7.0

### Minor Changes

-   [#921](https://github.com/Khan/perseus/pull/921) [`81b9a562`](https://github.com/Khan/perseus/commit/81b9a562d0fb8ff2cd82e708781432bff8437116) Thanks [@benchristel](https://github.com/benchristel)! - Make the Expression widget treat `sen` as equivalent to `sin`. The spelling
    `sen` is used in Portuguese.

### Patch Changes

-   Updated dependencies [[`81b9a562`](https://github.com/Khan/perseus/commit/81b9a562d0fb8ff2cd82e708781432bff8437116)]:
    -   @khanacademy/math-input@16.5.0

## 17.6.2

### Patch Changes

-   [#918](https://github.com/Khan/perseus/pull/918) [`21222f55`](https://github.com/Khan/perseus/commit/21222f55b1efd46acbc0fe1dcc8aa0399b8555ee) Thanks [@nedredmond](https://github.com/nedredmond)! - Fix bug that caused svg to be 300px wide

## 17.6.1

### Patch Changes

-   [#881](https://github.com/Khan/perseus/pull/881) [`f02eb991`](https://github.com/Khan/perseus/commit/f02eb991cec37dcff02056c0d6b54fc6dfd96948) Thanks [@nedredmond](https://github.com/nedredmond)! - Swap out Label Image custom dropdown for WonderBlocks

*   [#870](https://github.com/Khan/perseus/pull/870) [`9354fb55`](https://github.com/Khan/perseus/commit/9354fb55357f2441a2ca6198c52cca33edeba3c0) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Replace transformer widget with a deprecated-standin widget

*   Updated dependencies [[`f02eb991`](https://github.com/Khan/perseus/commit/f02eb991cec37dcff02056c0d6b54fc6dfd96948)]:
    -   @khanacademy/math-input@16.4.1

## 17.6.0

### Minor Changes

-   [#907](https://github.com/Khan/perseus/pull/907) [`83884550`](https://github.com/Khan/perseus/commit/83884550df8b394e9afa6e95947c987614e2d242) Thanks [@nishasy](https://github.com/nishasy)! - Display names have been updated to better match type names

## 17.5.0

### Minor Changes

-   [#909](https://github.com/Khan/perseus/pull/909) [`6c841f55`](https://github.com/Khan/perseus/commit/6c841f55027c87bfc8339816dac582f175a84193) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Reworked onFocusChange logic to solve a bug on initial render.

### Patch Changes

-   [#908](https://github.com/Khan/perseus/pull/908) [`29563723`](https://github.com/Khan/perseus/commit/29563723cf229a9169d0c78a0174a8dbc8029861) Thanks [@benchristel](https://github.com/benchristel)! - Lighten the background color for odd-numbered rows of Markdown tables on
    desktop-sized screens. Previously, the color was `#ededed`; it is now
    `#f7f8fa` (Wonder Blocks offWhite).

    This change ensures that color-coded math expressions will have accessible
    contrast with the background.

## 17.4.0

### Minor Changes

-   [#902](https://github.com/Khan/perseus/pull/902) [`c9db8185`](https://github.com/Khan/perseus/commit/c9db818510e2e0fd142c23298890dcad89a7549a) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Updated OnFocusChange method to return the keypadHeight rather than the DOMNode

### Patch Changes

-   [#887](https://github.com/Khan/perseus/pull/887) [`d09fdb98`](https://github.com/Khan/perseus/commit/d09fdb98963f23dbeb2009518513db671e0f09bb) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Export `PerseusItem` type which represents an exercise question

## 17.3.3

### Patch Changes

-   [#876](https://github.com/Khan/perseus/pull/876) [`fdc00c90`](https://github.com/Khan/perseus/commit/fdc00c90a19d3e241b3a5cdc2b1df5d761b24af3) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Adjust CSS to ensure all `code` and `pre` blocks rendered by Perseus have a monospace font and common styling

## 17.3.2

### Patch Changes

-   [#850](https://github.com/Khan/perseus/pull/850) [`f4cd2a76`](https://github.com/Khan/perseus/commit/f4cd2a7639556312af75b9ba9c6a97c41c94beac) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Widget rendering errors are now reported as distinct errors to the Perseus logging infrastructure.

## 17.3.1

### Patch Changes

-   [#873](https://github.com/Khan/perseus/pull/873) [`b7777865`](https://github.com/Khan/perseus/commit/b777786517afc289e92201e3fea876c30c493290) Thanks [@nedredmond](https://github.com/nedredmond)! - Prevent paragraph class from being added to answer pills component

-   Updated dependencies [[`610ebba2`](https://github.com/Khan/perseus/commit/610ebba29ab8b2ee4ddf4879f8c8b87993f29b20)]:
    -   @khanacademy/math-input@16.4.0

## 17.3.0

### Minor Changes

-   [#867](https://github.com/Khan/perseus/pull/867) [`378294da`](https://github.com/Khan/perseus/commit/378294da3d207839a861333175920b562773ee97) Thanks [@nedredmond](https://github.com/nedredmond)! - Update and export PerseusAnswerArea type

### Patch Changes

-   [#869](https://github.com/Khan/perseus/pull/869) [`57eeec68`](https://github.com/Khan/perseus/commit/57eeec681072591c64b633527833f3ab9f6e3f1a) Thanks [@nedredmond](https://github.com/nedredmond)! - Remove new unused field from PerseusAnswerArea API

## 17.2.0

### Minor Changes

-   [#863](https://github.com/Khan/perseus/pull/863) [`f910bd72`](https://github.com/Khan/perseus/commit/f910bd72fc5cbf88a1a00d57f8aefa8eea2c755d) Thanks [@handeyeco](https://github.com/handeyeco)! - Localize the multiplication symbol in MathInput

### Patch Changes

-   [#865](https://github.com/Khan/perseus/pull/865) [`347d6d15`](https://github.com/Khan/perseus/commit/347d6d15ee7989819852067e5916a86725e95def) Thanks [@nedredmond](https://github.com/nedredmond)! - Make label for hide answers switch in Label Image Widget into label tag

-   Updated dependencies [[`f910bd72`](https://github.com/Khan/perseus/commit/f910bd72fc5cbf88a1a00d57f8aefa8eea2c755d)]:
    -   @khanacademy/math-input@16.3.0

## 17.1.1

### Patch Changes

-   Updated dependencies [[`cbcc0e68`](https://github.com/Khan/perseus/commit/cbcc0e689b6d4640361c14ae112c476fb061d5f4), [`e7bec961`](https://github.com/Khan/perseus/commit/e7bec961bc5136bcaeb4ebb4b6744b0809f372ec)]:
    -   @khanacademy/math-input@16.2.0

## 17.1.0

### Minor Changes

-   [#804](https://github.com/Khan/perseus/pull/804) [`2c295e2c`](https://github.com/Khan/perseus/commit/2c295e2c26ff2bf15e1e8e82bcc34e04e4b9bab0) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Add pill that contains answer after selection in Label Image Widget

*   [#804](https://github.com/Khan/perseus/pull/804) [`6f530d58`](https://github.com/Khan/perseus/commit/6f530d58b4368fb3c38d62d4dcf1f63cecf67d90) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Use WB Pill + `react-popper` to get hovering answer pill in Label Image Widget

-   [#804](https://github.com/Khan/perseus/pull/804) [`cccf1897`](https://github.com/Khan/perseus/commit/cccf1897da294e4b1fec804f2639c1c56bd68201) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Adds "hide answers" toggle to hide answer pills on label image widget

### Patch Changes

-   [#804](https://github.com/Khan/perseus/pull/804) [`ce343147`](https://github.com/Khan/perseus/commit/ce343147f558c2f2a1dcbabae20bdba22c0de86d) Thanks [@nixterrimus](https://github.com/nixterrimus)! - For wide image, label image popovers only go above or below marker

*   [#804](https://github.com/Khan/perseus/pull/804) [`1c8f2753`](https://github.com/Khan/perseus/commit/1c8f275391b02bef8e14d1daccef8fadea9066cd) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Implement hover on label image pills

-   [#856](https://github.com/Khan/perseus/pull/856) [`6c323dc3`](https://github.com/Khan/perseus/commit/6c323dc37e7cc972fe5a1ab7cbf90a23bf4dd3a0) Thanks [@nedredmond](https://github.com/nedredmond)! - Upgrade WB

*   [#858](https://github.com/Khan/perseus/pull/858) [`7433c91b`](https://github.com/Khan/perseus/commit/7433c91bb05ad0441475f40bcd05a3076e7e19f1) Thanks [@nedredmond](https://github.com/nedredmond)! - Remove custom event listeners from label image widget and use WB's built-in functionality to achieve the same thing. Fixes a bug where answer choices were not dismissing as expected.

-   [#804](https://github.com/Khan/perseus/pull/804) [`dd41dd0e`](https://github.com/Khan/perseus/commit/dd41dd0e8bc76a414bb5906bba4648f57547f188) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Reverts Perseus global mobile styles for answer pill in label image widget

*   [#804](https://github.com/Khan/perseus/pull/804) [`53612027`](https://github.com/Khan/perseus/commit/536120272b8cae3b01cdbe09a59488cc4704329d) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Label image dot styles

-   [#861](https://github.com/Khan/perseus/pull/861) [`bb9cd667`](https://github.com/Khan/perseus/commit/bb9cd667dbb4a38724ae174063021fdf18040f9b) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Bug fix: dont hide chevron in label image on focus

*   [#862](https://github.com/Khan/perseus/pull/862) [`4553af79`](https://github.com/Khan/perseus/commit/4553af79a26fc0e635d7dc03be74f39cb00a05f6) Thanks [@nedredmond](https://github.com/nedredmond)! - Darken green to match accessible pill color

-   [#804](https://github.com/Khan/perseus/pull/804) [`07537aae`](https://github.com/Khan/perseus/commit/07537aae870866f4418055b5956e9387f85f72c4) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Add periodicTableWithKey to `perseus-types`

*   [#804](https://github.com/Khan/perseus/pull/804) [`bb81559e`](https://github.com/Khan/perseus/commit/bb81559e02359092ba4d48107010c476b5ae09d5) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Give label image widget switch an accessible label.

-   [#804](https://github.com/Khan/perseus/pull/804) [`fd09014c`](https://github.com/Khan/perseus/commit/fd09014c26e33d2c83a1e6ae3672027ac9583d41) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Minor CSS change to label image

*   [#860](https://github.com/Khan/perseus/pull/860) [`1f4e17ba`](https://github.com/Khan/perseus/commit/1f4e17ba77e1491523813655af18a70285a25989) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Add hover states in label-image widget

-   [#804](https://github.com/Khan/perseus/pull/804) [`f6be48a9`](https://github.com/Khan/perseus/commit/f6be48a96795858e009bea18cc1092d150f98b71) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Change marker styles in label image widget

*   [#804](https://github.com/Khan/perseus/pull/804) [`34f7696b`](https://github.com/Khan/perseus/commit/34f7696b537d28c4b2054a3995f567a9a6834f73) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Allows a manually set direction to be used for label image, if and only if there's space

-   [#848](https://github.com/Khan/perseus/pull/848) [`8857950b`](https://github.com/Khan/perseus/commit/8857950bdeeb6e13bc3766b1c6545289b21cbe2a) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Add analytics for label image

*   [#804](https://github.com/Khan/perseus/pull/804) [`ded7af48`](https://github.com/Khan/perseus/commit/ded7af488d57e6309f7244ca4b897ac680754d74) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Update dot styling in label image widget

-   [#804](https://github.com/Khan/perseus/pull/804) [`1906ec5a`](https://github.com/Khan/perseus/commit/1906ec5afb7fd7332a6cabc6afc79ee1f779f8ec) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Match marker color after checking answers

*   [#851](https://github.com/Khan/perseus/pull/851) [`5e4c21bd`](https://github.com/Khan/perseus/commit/5e4c21bda5717fb793386a810be3144d7b9a9011) Thanks [@nedredmond](https://github.com/nedredmond)! - Fix label image answer pill padding when correct answer registered

-   [#804](https://github.com/Khan/perseus/pull/804) [`30ce593a`](https://github.com/Khan/perseus/commit/30ce593a2f1d552338ce0818cf754c13c22af281) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Reduce motion on dot animation when option is enabled

-   Updated dependencies [[`6c323dc3`](https://github.com/Khan/perseus/commit/6c323dc37e7cc972fe5a1ab7cbf90a23bf4dd3a0), [`2c295e2c`](https://github.com/Khan/perseus/commit/2c295e2c26ff2bf15e1e8e82bcc34e04e4b9bab0), [`1f4e17ba`](https://github.com/Khan/perseus/commit/1f4e17ba77e1491523813655af18a70285a25989), [`8857950b`](https://github.com/Khan/perseus/commit/8857950bdeeb6e13bc3766b1c6545289b21cbe2a)]:
    -   @khanacademy/math-input@16.1.2
    -   @khanacademy/perseus-core@1.4.1
    -   @khanacademy/kas@0.3.7
    -   @khanacademy/kmath@0.1.8
    -   @khanacademy/perseus-linter@0.3.10
    -   @khanacademy/pure-markdown@0.2.13
    -   @khanacademy/simple-markdown@0.11.2

## 17.0.0

### Major Changes

-   [#852](https://github.com/Khan/perseus/pull/852) [`204788f8`](https://github.com/Khan/perseus/commit/204788f8f583bda5ff94d74fd70ec542fedd3d6e) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove ItemRenderer again

*   [#838](https://github.com/Khan/perseus/pull/838) [`233fc9fc`](https://github.com/Khan/perseus/commit/233fc9fcd4c65d2ff0c8f1ebd1cb1b17b76cbe0c) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove TexButtons and update ExpressionEditor

### Patch Changes

-   [#854](https://github.com/Khan/perseus/pull/854) [`2e2f2cc1`](https://github.com/Khan/perseus/commit/2e2f2cc1afe99613eb688ab1e4e1fccad0c8df57) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove unused CSS images for next/prev steps

-   Updated dependencies [[`41d3cd93`](https://github.com/Khan/perseus/commit/41d3cd93f78d4649c8a57b6fa4964c0c9f2c45b0), [`27f691aa`](https://github.com/Khan/perseus/commit/27f691aa11f061b54db487b5b35222431776260f), [`3803452b`](https://github.com/Khan/perseus/commit/3803452b0593649faf4043bf6e1d7681a14078e4), [`ef32b88f`](https://github.com/Khan/perseus/commit/ef32b88f5027154784fb496506d7c96ee3765eac), [`820febc5`](https://github.com/Khan/perseus/commit/820febc5814a5a10d7c1743be8aa9d220f2d9bd8), [`67a09051`](https://github.com/Khan/perseus/commit/67a09051c61df98b697349ad75760193e4228bfe)]:
    -   @khanacademy/math-input@16.1.1

## 16.0.0

### Major Changes

-   [#847](https://github.com/Khan/perseus/pull/847) [`45350a24`](https://github.com/Khan/perseus/commit/45350a2458cd3f816bc87af40997e426feb4b13b) Thanks [@handeyeco](https://github.com/handeyeco)! - Add back ItemRenderer temporarily

## 15.0.0

### Major Changes

-   [#833](https://github.com/Khan/perseus/pull/833) [`3cf5ac4c`](https://github.com/Khan/perseus/commit/3cf5ac4c3f9d51dbcddc6f75bfbf0f8778b20f78) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove export of ItemRenderer

### Minor Changes

-   [#794](https://github.com/Khan/perseus/pull/794) [`a91c84fe`](https://github.com/Khan/perseus/commit/a91c84fe53827ff4333220777a9918882b7fe9f0) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Removing the useV2Keypad apiOption as the V1 keypad is no longer in use.

### Patch Changes

-   [#839](https://github.com/Khan/perseus/pull/839) [`3e176246`](https://github.com/Khan/perseus/commit/3e176246025ba237682569481dd9960f7a0dabf4) Thanks [@nedredmond](https://github.com/nedredmond)! - Wrap string in internationalization function

*   [#814](https://github.com/Khan/perseus/pull/814) [`105d2060`](https://github.com/Khan/perseus/commit/105d20603d935d35cff237b17f0bfb57ca751e4c) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Minor build change to how we provide Typescript type definitions (should be no change to build output).

*   Updated dependencies [[`a91c84fe`](https://github.com/Khan/perseus/commit/a91c84fe53827ff4333220777a9918882b7fe9f0), [`105d2060`](https://github.com/Khan/perseus/commit/105d20603d935d35cff237b17f0bfb57ca751e4c)]:
    -   @khanacademy/math-input@16.1.0
    -   @khanacademy/perseus-core@1.4.0
    -   @khanacademy/kas@0.3.6
    -   @khanacademy/kmath@0.1.7
    -   @khanacademy/perseus-linter@0.3.9
    -   @khanacademy/pure-markdown@0.2.12
    -   @khanacademy/simple-markdown@0.11.1

## 14.0.0

### Major Changes

-   [#825](https://github.com/Khan/perseus/pull/825) [`7cb40e4c`](https://github.com/Khan/perseus/commit/7cb40e4c919be50e5ced41e4937178bbf849ec74) Thanks [@benchristel](https://github.com/benchristel)! - We've removed the deprecated `useV2Keypad` prop from the MobileKeypad component.

    The V2 keypad is now the default, and the old keypad has been removed.

    Additionally, the mobile keypad no longer accepts the `keypadActive` or
    `setKeypadActive` props. It now gets those values itself from the `KeypadContext`.

### Minor Changes

-   [#816](https://github.com/Khan/perseus/pull/816) [`cdcd162e`](https://github.com/Khan/perseus/commit/cdcd162ea0902d3ff1d77b1b66ad15f2d55a86cd) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Wrap all SvgImage instances in AssetContext (ensures that host applications can correctly wait for all images to load in a renderer before proceeding).

*   [#788](https://github.com/Khan/perseus/pull/788) [`8f1f0208`](https://github.com/Khan/perseus/commit/8f1f0208fcc08e137053bfd05d330b6f8bf3522d) Thanks [@jeanettehead](https://github.com/jeanettehead)! - create randomized storybook stories for some widgets

### Patch Changes

-   Updated dependencies [[`7cb40e4c`](https://github.com/Khan/perseus/commit/7cb40e4c919be50e5ced41e4937178bbf849ec74)]:
    -   @khanacademy/math-input@16.0.0

## 13.2.0

### Minor Changes

-   [#797](https://github.com/Khan/perseus/pull/797) [`021f9462`](https://github.com/Khan/perseus/commit/021f946255f423de8df13f6872b0664f79408484) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Change the rational color in radio widget

*   [#811](https://github.com/Khan/perseus/pull/811) [`bca527ab`](https://github.com/Khan/perseus/commit/bca527abc4d8b29942efec12509f9cf8be401e75) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Bump all Wonder Blocks dependencies to latest

### Patch Changes

-   [#808](https://github.com/Khan/perseus/pull/808) [`8358da80`](https://github.com/Khan/perseus/commit/8358da8010dcb8976d8cfb542afa7e303ce4971a) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Removing unnecessary conflicting CSS for #problemarea.

*   [#813](https://github.com/Khan/perseus/pull/813) [`691d29b4`](https://github.com/Khan/perseus/commit/691d29b4224a523a3dd8d53a7aab28c80118e7ac) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Removing unused CSS from #problemarea.

-   [#812](https://github.com/Khan/perseus/pull/812) [`6d31e044`](https://github.com/Khan/perseus/commit/6d31e044d6f5b304e63602795e9bbd7ba443dac5) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix 'focus' parameter on Renderer's setInputValue function to be optional.

-   Updated dependencies [[`57e0e18b`](https://github.com/Khan/perseus/commit/57e0e18bd3729cde2e35cfa4ec40b67a5700049c), [`57e0e18b`](https://github.com/Khan/perseus/commit/57e0e18bd3729cde2e35cfa4ec40b67a5700049c), [`bca527ab`](https://github.com/Khan/perseus/commit/bca527abc4d8b29942efec12509f9cf8be401e75)]:
    -   @khanacademy/simple-markdown@0.11.0
    -   @khanacademy/math-input@15.1.0
    -   @khanacademy/pure-markdown@0.2.11

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
