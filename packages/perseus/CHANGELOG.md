# @khanacademy/perseus

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
