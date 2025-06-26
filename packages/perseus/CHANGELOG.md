# @khanacademy/perseus

## 65.3.5

### Patch Changes

-   [#2639](https://github.com/Khan/perseus/pull/2639) [`7b37ac7ea`](https://github.com/Khan/perseus/commit/7b37ac7ea5df5ea4a4b70a6e325df3f44cb0308b) Thanks [@benchristel](https://github.com/benchristel)! - Update Wonder Blocks peer dependencies

*   [#2640](https://github.com/Khan/perseus/pull/2640) [`fd30e9518`](https://github.com/Khan/perseus/commit/fd30e9518cc88004955fcc3bb8d77b41c18342b8) Thanks [@benchristel](https://github.com/benchristel)! - Remove deprecated fields from Radio widget (`onePerLine`, `displayCount`, `noneOfTheAbove`, and `widgets`) and rename `clue` to `rationale` in Radio widget options. Clients may need to update their test data with the new field names. As always, data in the old format can be safely migrated to the latest by calling `parseAndMigratePerseusItem` or `parseAndMigratePerseusArticle`.

*   Updated dependencies [[`7b37ac7ea`](https://github.com/Khan/perseus/commit/7b37ac7ea5df5ea4a4b70a6e325df3f44cb0308b), [`fd30e9518`](https://github.com/Khan/perseus/commit/fd30e9518cc88004955fcc3bb8d77b41c18342b8)]:
    -   @khanacademy/math-input@26.0.10
    -   @khanacademy/perseus-core@16.0.0
    -   @khanacademy/keypad-context@3.0.21
    -   @khanacademy/kmath@2.0.21
    -   @khanacademy/perseus-linter@4.0.8
    -   @khanacademy/perseus-score@7.1.8

## 65.3.4

### Patch Changes

-   [#2627](https://github.com/Khan/perseus/pull/2627) [`4788af376`](https://github.com/Khan/perseus/commit/4788af3762553fe67f99c54fe703994db8693a63) Thanks [@jandrade](https://github.com/jandrade)! - Updates styles to use `semanticColor.core` WB tokens instead of the now deprecated sc.text and sc.border tokens

## 65.3.3

### Patch Changes

-   [#2616](https://github.com/Khan/perseus/pull/2616) [`04da9f04b`](https://github.com/Khan/perseus/commit/04da9f04bb8ce5e8ffa34e753a28d378dc5e64c7) Thanks [@aag](https://github.com/aag)! - Include "(Assessments only)" in the display name of the Free Response widget

-   Updated dependencies []:
    -   @khanacademy/kas@2.0.9
    -   @khanacademy/keypad-context@3.0.20
    -   @khanacademy/kmath@2.0.20
    -   @khanacademy/math-input@26.0.9
    -   @khanacademy/perseus-core@15.0.1
    -   @khanacademy/perseus-linter@4.0.7
    -   @khanacademy/perseus-score@7.1.7
    -   @khanacademy/perseus-utils@2.0.5
    -   @khanacademy/pure-markdown@2.0.9
    -   @khanacademy/simple-markdown@2.0.9

## 65.3.2

### Patch Changes

-   [#2563](https://github.com/Khan/perseus/pull/2563) [`0e535feb7`](https://github.com/Khan/perseus/commit/0e535feb76f753db3f7cda1c753d79ca067ca372) Thanks [@benchristel](https://github.com/benchristel)! - Remove `registerCoreWidgets` function from `@khanacademy/perseus-core`. This function is not needed anymore and clients can safely delete their calls to it.

*   [#2602](https://github.com/Khan/perseus/pull/2602) [`04503796f`](https://github.com/Khan/perseus/commit/04503796f209504e65e26bbcc955ee0be958e7e4) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove dead code in Group widget

*   Updated dependencies [[`0e535feb7`](https://github.com/Khan/perseus/commit/0e535feb76f753db3f7cda1c753d79ca067ca372), [`8be4625c9`](https://github.com/Khan/perseus/commit/8be4625c950e73482aec055e2aed8b102283c950)]:
    -   @khanacademy/perseus-core@15.0.0
    -   @khanacademy/keypad-context@3.0.19
    -   @khanacademy/kmath@2.0.19
    -   @khanacademy/math-input@26.0.8
    -   @khanacademy/perseus-linter@4.0.6
    -   @khanacademy/perseus-score@7.1.6

## 65.3.1

### Patch Changes

-   [#2624](https://github.com/Khan/perseus/pull/2624) [`7de17a3b1`](https://github.com/Khan/perseus/commit/7de17a3b18698700b4ff2c809e5d39c8625795d6) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Sync dev dependencies with frontend

-   Updated dependencies [[`7de17a3b1`](https://github.com/Khan/perseus/commit/7de17a3b18698700b4ff2c809e5d39c8625795d6)]:
    -   @khanacademy/kas@2.0.8
    -   @khanacademy/keypad-context@3.0.18
    -   @khanacademy/kmath@2.0.18
    -   @khanacademy/math-input@26.0.7
    -   @khanacademy/perseus-core@14.1.1
    -   @khanacademy/perseus-linter@4.0.5
    -   @khanacademy/perseus-score@7.1.5
    -   @khanacademy/perseus-utils@2.0.5
    -   @khanacademy/pure-markdown@2.0.8
    -   @khanacademy/simple-markdown@2.0.8

## 65.3.0

### Minor Changes

-   [#2621](https://github.com/Khan/perseus/pull/2621) [`401ab009b`](https://github.com/Khan/perseus/commit/401ab009b1650b5752b4bad77d874eec16ebcec3) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Reverts changes introduced by LEMS-3061: deprecate options in radio, update clue to be rationale

### Patch Changes

-   [#2609](https://github.com/Khan/perseus/pull/2609) [`43bc193aa`](https://github.com/Khan/perseus/commit/43bc193aaccae07a6ebfd9b981f0c6f3e13fe4df) Thanks [@nishasy](https://github.com/nishasy)! - [Radio] | (DX) | Create a question builder for the Radio widget

*   [#2611](https://github.com/Khan/perseus/pull/2611) [`0432b74d7`](https://github.com/Khan/perseus/commit/0432b74d70a30821d8faa0a274b8e773b23925a1) Thanks [@nishasy](https://github.com/nishasy)! - [Radio] | (DX) | Use the new question builder in testdata file

*   Updated dependencies [[`401ab009b`](https://github.com/Khan/perseus/commit/401ab009b1650b5752b4bad77d874eec16ebcec3), [`48fc42775`](https://github.com/Khan/perseus/commit/48fc427750810566f05586550fdc5596e1c79762)]:
    -   @khanacademy/perseus-core@14.1.0
    -   @khanacademy/keypad-context@3.0.17
    -   @khanacademy/kmath@2.0.17
    -   @khanacademy/math-input@26.0.6
    -   @khanacademy/perseus-linter@4.0.4
    -   @khanacademy/perseus-score@7.1.4

## 65.2.0

### Minor Changes

-   [#2540](https://github.com/Khan/perseus/pull/2540) [`8875779b2`](https://github.com/Khan/perseus/commit/8875779b20b7177e8c7603bd589e42fe02e60643) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Removal of the showRationalesForCurrentlySelectedChoices option from Perseus

## 65.1.3

### Patch Changes

-   [#2601](https://github.com/Khan/perseus/pull/2601) [`bb34a5f28`](https://github.com/Khan/perseus/commit/bb34a5f287970f694e30b0d5bb6d0a4db2234e8b) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Add test for protecting against edgecase regressions regarding undefined correct value in Radio Widget.

## 65.1.2

### Patch Changes

-   [#2431](https://github.com/Khan/perseus/pull/2431) [`218eb4cb1`](https://github.com/Khan/perseus/commit/218eb4cb1b0dc29094919b6d0867fc48fab99d83) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Add CSS Modules for styling, and a converter for Aphrodite code

*   [#2603](https://github.com/Khan/perseus/pull/2603) [`c2a31923c`](https://github.com/Khan/perseus/commit/c2a31923c8e535f28d17d87216e88cf25ac8792e) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Remove findDomNode from Radio Widget as it is deprecated.

*   Updated dependencies []:
    -   @khanacademy/kas@2.0.7
    -   @khanacademy/keypad-context@3.0.16
    -   @khanacademy/kmath@2.0.16
    -   @khanacademy/math-input@26.0.5
    -   @khanacademy/perseus-core@14.0.3
    -   @khanacademy/perseus-linter@4.0.3
    -   @khanacademy/perseus-score@7.1.3
    -   @khanacademy/perseus-utils@2.0.4
    -   @khanacademy/pure-markdown@2.0.7
    -   @khanacademy/simple-markdown@2.0.7

## 65.1.1

### Patch Changes

-   [#2435](https://github.com/Khan/perseus/pull/2435) [`a512f3a07`](https://github.com/Khan/perseus/commit/a512f3a0716e1aeaf835c67dcacc5bcb131339a7) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Removes deprecated options using perseus parser

-   Updated dependencies [[`a512f3a07`](https://github.com/Khan/perseus/commit/a512f3a0716e1aeaf835c67dcacc5bcb131339a7)]:
    -   @khanacademy/perseus-core@14.0.2
    -   @khanacademy/keypad-context@3.0.15
    -   @khanacademy/kmath@2.0.15
    -   @khanacademy/math-input@26.0.4
    -   @khanacademy/perseus-linter@4.0.2
    -   @khanacademy/perseus-score@7.1.2

## 65.1.0

### Minor Changes

-   [#2557](https://github.com/Khan/perseus/pull/2557) [`b2647ed0a`](https://github.com/Khan/perseus/commit/b2647ed0a74da2a81af1a682aa1444b885b7a8fc) Thanks [@marekweb](https://github.com/marekweb)! - Add rationales to the getPromptJSON output of Radio widget and Label Image widget

### Patch Changes

-   [#2489](https://github.com/Khan/perseus/pull/2489) [`d8c99f629`](https://github.com/Khan/perseus/commit/d8c99f629c9439cdf56e96f6a53f6bb28f278e07) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Convert LESS files to pre-built CSS files to simplify our styling framework

*   [#2554](https://github.com/Khan/perseus/pull/2554) [`b83bdf3ef`](https://github.com/Khan/perseus/commit/b83bdf3ef47e235b67dc16254fb66843efde6ea2) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Update new radio types to interface

-   [#2579](https://github.com/Khan/perseus/pull/2579) [`2fcb3b03a`](https://github.com/Khan/perseus/commit/2fcb3b03ab63c39d86787150fb3029c38f4ca039) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix a bug where the ServerItemRenderer and LoadingContext did not fire the `onRendered` prop callback when the PerseusItem being rendered did not have any assets.

*   [#2576](https://github.com/Khan/perseus/pull/2576) [`4862aa4ad`](https://github.com/Khan/perseus/commit/4862aa4ad756f58ea6a98d3b994207ab184905e6) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Temporary remove RTL display in New Radio Widget to unblock Perseus from displaying the stories in RTL

-   [#2570](https://github.com/Khan/perseus/pull/2570) [`69d7ff811`](https://github.com/Khan/perseus/commit/69d7ff811503164a50257a6fba2bf83cacd04efb) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Update comments to refer to khan/frontend instead of webapp. Khan Academy's frontend code has moved.

-   Updated dependencies [[`d8c99f629`](https://github.com/Khan/perseus/commit/d8c99f629c9439cdf56e96f6a53f6bb28f278e07), [`69d7ff811`](https://github.com/Khan/perseus/commit/69d7ff811503164a50257a6fba2bf83cacd04efb)]:
    -   @khanacademy/math-input@26.0.3
    -   @khanacademy/perseus-core@14.0.1
    -   @khanacademy/kas@2.0.6
    -   @khanacademy/keypad-context@3.0.14
    -   @khanacademy/kmath@2.0.14
    -   @khanacademy/perseus-linter@4.0.1
    -   @khanacademy/perseus-score@7.1.1
    -   @khanacademy/perseus-utils@2.0.4
    -   @khanacademy/pure-markdown@2.0.6
    -   @khanacademy/simple-markdown@2.0.6

## 65.0.0

### Major Changes

-   [#2485](https://github.com/Khan/perseus/pull/2485) [`cea05d9e6`](https://github.com/Khan/perseus/commit/cea05d9e6c629db6c14ed43dba085e215d006a1e) Thanks [@tatianasnook](https://github.com/tatianasnook)! - Migrate accessibility logic from perseus to perseus-core

### Minor Changes

-   [#2553](https://github.com/Khan/perseus/pull/2553) [`f5d08b79a`](https://github.com/Khan/perseus/commit/f5d08b79aca6d56ba7bdc3d47429c449645f75f9) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Adding partically accessible widget function to interactive graph and label image.

*   [#2518](https://github.com/Khan/perseus/pull/2518) [`0eba51c67`](https://github.com/Khan/perseus/commit/0eba51c67e1e67a11e425cb772194a44857eae0f) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Updates to Radio Scoring to ensure non-specific multiselect questions are marked correctly.

### Patch Changes

-   [#2517](https://github.com/Khan/perseus/pull/2517) [`6da29d18b`](https://github.com/Khan/perseus/commit/6da29d18b8c1041b0db6e70d008706640349e819) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Removed unnecessary logic.

-   Updated dependencies [[`f5d08b79a`](https://github.com/Khan/perseus/commit/f5d08b79aca6d56ba7bdc3d47429c449645f75f9), [`cea05d9e6`](https://github.com/Khan/perseus/commit/cea05d9e6c629db6c14ed43dba085e215d006a1e), [`e60f6ac50`](https://github.com/Khan/perseus/commit/e60f6ac50a28d0664bfc211c9c655651719e3309), [`75f1d1f53`](https://github.com/Khan/perseus/commit/75f1d1f53fe173f9275a213376c2497b5762ce0a), [`0eba51c67`](https://github.com/Khan/perseus/commit/0eba51c67e1e67a11e425cb772194a44857eae0f), [`59a2e87a8`](https://github.com/Khan/perseus/commit/59a2e87a83ef08a151552c7922bddfcbf1c73cf2), [`ab2861d83`](https://github.com/Khan/perseus/commit/ab2861d8335e7ef1800dd5c6754616192b53073b), [`cec57bbc6`](https://github.com/Khan/perseus/commit/cec57bbc6cf32cdce5a6b764b7399f69f87b4a89)]:
    -   @khanacademy/perseus-core@14.0.0
    -   @khanacademy/perseus-linter@4.0.0
    -   @khanacademy/perseus-score@7.1.0
    -   @khanacademy/keypad-context@3.0.13
    -   @khanacademy/kmath@2.0.13
    -   @khanacademy/math-input@26.0.2

## 64.0.0

### Major Changes

-   [#2419](https://github.com/Khan/perseus/pull/2419) [`843d66257`](https://github.com/Khan/perseus/commit/843d66257ceb32b7c3d3eea4dea47dfda58e7945) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove the `propUpgrades` API from widgets as they're considered obsolete with the new parser

### Patch Changes

-   [#2551](https://github.com/Khan/perseus/pull/2551) [`414abda7a`](https://github.com/Khan/perseus/commit/414abda7a80fc482e93ab064ff34ef540cd9eae7) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - 🛠️ Upgrade all packages to use Storybook v9 for development

*   [#2479](https://github.com/Khan/perseus/pull/2479) [`074775b1f`](https://github.com/Khan/perseus/commit/074775b1ff0dc830a3d66030a14b776b0f631003) Thanks [@handeyeco](https://github.com/handeyeco)! - LEMS-2948: tweak how we determine when to wipe widget state clean (answerless/answerful)

*   Updated dependencies [[`404bde44d`](https://github.com/Khan/perseus/commit/404bde44dc6f8b6d5cbc8593c10b47f5f65d7eeb), [`d4720c470`](https://github.com/Khan/perseus/commit/d4720c4706888c922e3111c11f121a730d592aaf), [`414abda7a`](https://github.com/Khan/perseus/commit/414abda7a80fc482e93ab064ff34ef540cd9eae7), [`35e4d13d9`](https://github.com/Khan/perseus/commit/35e4d13d9f6e49996e149950024a87f1601c2e43), [`6bc9cc667`](https://github.com/Khan/perseus/commit/6bc9cc667c5bf2e48bfc5d036f11ba2285730839), [`843d66257`](https://github.com/Khan/perseus/commit/843d66257ceb32b7c3d3eea4dea47dfda58e7945), [`074775b1f`](https://github.com/Khan/perseus/commit/074775b1ff0dc830a3d66030a14b776b0f631003)]:
    -   @khanacademy/perseus-core@13.0.0
    -   @khanacademy/math-input@26.0.1
    -   @khanacademy/perseus-score@7.0.2
    -   @khanacademy/keypad-context@3.0.12
    -   @khanacademy/kmath@2.0.12
    -   @khanacademy/perseus-linter@3.0.12

## 63.1.0

### Minor Changes

-   [#2531](https://github.com/Khan/perseus/pull/2531) [`7ce293138`](https://github.com/Khan/perseus/commit/7ce29313858dd85570a9888eb32f504fc6a8b03a) Thanks [@aag](https://github.com/aag)! - Fix getSaveWarnings in Free Response widget and unhide it

*   [#2495](https://github.com/Khan/perseus/pull/2495) [`86ac76f79`](https://github.com/Khan/perseus/commit/86ac76f79c2fd4ee8b822393f89a064af92c0339) Thanks [@Myranae](https://github.com/Myranae)! - Update label image widget to handle answerless data and do some cleanup

### Patch Changes

-   [#2510](https://github.com/Khan/perseus/pull/2510) [`41fcaa918`](https://github.com/Khan/perseus/commit/41fcaa91845753a87aa0c9c686e6fa5bc2d149b0) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Add tab navigation to new radio widget

*   [#2527](https://github.com/Khan/perseus/pull/2527) [`555d89762`](https://github.com/Khan/perseus/commit/555d897621df124f423bf95bc4c2b8511e4bda6d) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Support RTL in new radio widget

-   [#2443](https://github.com/Khan/perseus/pull/2443) [`64c89cb15`](https://github.com/Khan/perseus/commit/64c89cb155045bf48248f96891e006a6f48610e5) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Remove deprecated cross out functionality for Radio Choices

*   [#2519](https://github.com/Khan/perseus/pull/2519) [`cf71982e0`](https://github.com/Khan/perseus/commit/cf71982e0fe9f831456d760fc4e98b1e93748c4f) Thanks [@dependabot](https://github.com/apps/dependabot)! - Updating wonderblock dependencies.

-   [#2515](https://github.com/Khan/perseus/pull/2515) [`9c651172d`](https://github.com/Khan/perseus/commit/9c651172dffd7ca9f621e777069f361be05ce049) Thanks [@aag](https://github.com/aag)! - Add validation for inputs that are too long to the Free Response widget

*   [#2509](https://github.com/Khan/perseus/pull/2509) [`0d46a8599`](https://github.com/Khan/perseus/commit/0d46a85999557ca17daad67cb1663fe88a33a3ae) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensure that Interactive Graph's labelLocation property can be parsed properly

*   Updated dependencies [[`03669d385`](https://github.com/Khan/perseus/commit/03669d385548e1d7ffde28c2210f637cf2b2d16f), [`52ec0bfcb`](https://github.com/Khan/perseus/commit/52ec0bfcbb71242c7a0a0ab34c7da0e9db77ed21), [`d1b6d9a3c`](https://github.com/Khan/perseus/commit/d1b6d9a3cab145267256e3d4acc373361957ffe0), [`86ac76f79`](https://github.com/Khan/perseus/commit/86ac76f79c2fd4ee8b822393f89a064af92c0339), [`ff2f1664d`](https://github.com/Khan/perseus/commit/ff2f1664db934d862570fd9b840f799a2f23bbf7), [`6b747d140`](https://github.com/Khan/perseus/commit/6b747d1402cd62d9c59b2fc6f2371ec0a453a63d), [`efb99e901`](https://github.com/Khan/perseus/commit/efb99e9016418875a3b3713c8077a9465a5b41c6), [`3ec658e38`](https://github.com/Khan/perseus/commit/3ec658e387d2f2193f8151a9d4cb285e85f13202), [`3e162e616`](https://github.com/Khan/perseus/commit/3e162e6168960ff1a1c63ec0e982422a113cbe31), [`0913e9397`](https://github.com/Khan/perseus/commit/0913e93973394270a474388f4c1e7c795027b015), [`dc864aca8`](https://github.com/Khan/perseus/commit/dc864aca8ebf3bb442b1519f67d1a095d9f89243), [`8ece223ef`](https://github.com/Khan/perseus/commit/8ece223ef58ce23ccd244b6fb717193019e2c5d0), [`cf71982e0`](https://github.com/Khan/perseus/commit/cf71982e0fe9f831456d760fc4e98b1e93748c4f), [`9c651172d`](https://github.com/Khan/perseus/commit/9c651172dffd7ca9f621e777069f361be05ce049), [`239be3f6c`](https://github.com/Khan/perseus/commit/239be3f6ccbbb89f52acf313bb4afbe359c1cee5), [`0d46a8599`](https://github.com/Khan/perseus/commit/0d46a85999557ca17daad67cb1663fe88a33a3ae), [`1c49ad243`](https://github.com/Khan/perseus/commit/1c49ad243756b4519c57603c9d098cbfe18baa15)]:
    -   @khanacademy/perseus-core@12.1.0
    -   @khanacademy/math-input@26.0.0
    -   @khanacademy/kas@2.0.5
    -   @khanacademy/keypad-context@3.0.11
    -   @khanacademy/kmath@2.0.11
    -   @khanacademy/perseus-linter@3.0.11
    -   @khanacademy/perseus-score@7.0.1
    -   @khanacademy/perseus-utils@2.0.4
    -   @khanacademy/pure-markdown@2.0.5
    -   @khanacademy/simple-markdown@2.0.5

## 63.0.1

### Patch Changes

-   [#2494](https://github.com/Khan/perseus/pull/2494) [`670b695e4`](https://github.com/Khan/perseus/commit/670b695e4dac6b7d795e8e3502032caa50d36b29) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Add story for radio widget single select with images and scroll

*   [#2455](https://github.com/Khan/perseus/pull/2455) [`998d12113`](https://github.com/Khan/perseus/commit/998d121139c4017e557c0bd33a63fa9154119d6f) Thanks [@marcysutton](https://github.com/marcysutton)! - Update to latest WB typography and tokens packages, using REM font sizing

-   [#2491](https://github.com/Khan/perseus/pull/2491) [`69c12a0fa`](https://github.com/Khan/perseus/commit/69c12a0fa0c5a9454f88f6b61ebb48dc0a217bc7) Thanks [@jandrade](https://github.com/jandrade)! - Updates WB Button instances to match new API (color -> actionType)

-   Updated dependencies [[`998d12113`](https://github.com/Khan/perseus/commit/998d121139c4017e557c0bd33a63fa9154119d6f)]:
    -   @khanacademy/math-input@25.1.6

## 63.0.0

### Major Changes

-   [#2501](https://github.com/Khan/perseus/pull/2501) [`8f3a7c5b4`](https://github.com/Khan/perseus/commit/8f3a7c5b4a2c57f5b0e55f2804980e77418e37e8) Thanks [@aag](https://github.com/aag)! - Release the new Free Response Widget

### Minor Changes

-   [#2332](https://github.com/Khan/perseus/pull/2332) [`2f6d2d042`](https://github.com/Khan/perseus/commit/2f6d2d0424940fd54e6ba4970f6f70bee38935f8) Thanks [@rgpass](https://github.com/rgpass)! - Add optional character limit support

*   [#2297](https://github.com/Khan/perseus/pull/2297) [`fc4e00e75`](https://github.com/Khan/perseus/commit/fc4e00e75e7633f396245dd08126023f255676ed) Thanks [@rgpass](https://github.com/rgpass)! - Add ability to customize the placeholder text in a Free Response widget

-   [#2273](https://github.com/Khan/perseus/pull/2273) [`15025d441`](https://github.com/Khan/perseus/commit/15025d4412617a83c4cdf553be7e6aff9f3101ab) Thanks [@aag](https://github.com/aag)! - Add a basic version of the new FreeResponse widget

### Patch Changes

-   [#2498](https://github.com/Khan/perseus/pull/2498) [`25b24e04c`](https://github.com/Khan/perseus/commit/25b24e04c992b3993315a7af6b330b3aef2e8698) Thanks [@aag](https://github.com/aag)! - Add scoring and validation functions for the Free Response Widget

*   [#2492](https://github.com/Khan/perseus/pull/2492) [`dd6916b31`](https://github.com/Khan/perseus/commit/dd6916b3133d325602b8ce31a01f3de3a5eeca14) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Standardization of New Radio Widget functional component declarations and utility functions.

-   [#2286](https://github.com/Khan/perseus/pull/2286) [`6b3bc5c51`](https://github.com/Khan/perseus/commit/6b3bc5c51f6024442469753a68f36d2b8b8885bd) Thanks [@aag](https://github.com/aag)! - Add scoring criteria to the Free Response Widget

*   [#2453](https://github.com/Khan/perseus/pull/2453) [`89d7c5a2f`](https://github.com/Khan/perseus/commit/89d7c5a2ff3bfc30a9fbaf5b470330952dac0702) Thanks [@aag](https://github.com/aag)! - Add LaTeX rendering to Free Response Widget questions

-   [#2481](https://github.com/Khan/perseus/pull/2481) [`4d6debc84`](https://github.com/Khan/perseus/commit/4d6debc84d539578b883ef8b89658d2aa33f6445) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Add Horizontal Scrollbar for New Radio Widget to allow users to visually scroll a long radio option content

*   [#2486](https://github.com/Khan/perseus/pull/2486) [`68de23d36`](https://github.com/Khan/perseus/commit/68de23d361b369a9b437f2908f06013e46c07fd7) Thanks [@aag](https://github.com/aag)! - Update visual styling and a11y features

-   [#2493](https://github.com/Khan/perseus/pull/2493) [`3cb963b9f`](https://github.com/Khan/perseus/commit/3cb963b9f786f97ace092318fd14fd677ceb9f2f) Thanks [@aag](https://github.com/aag)! - Refactor rendering of FreeResponseEditor

-   Updated dependencies [[`25b24e04c`](https://github.com/Khan/perseus/commit/25b24e04c992b3993315a7af6b330b3aef2e8698), [`2f6d2d042`](https://github.com/Khan/perseus/commit/2f6d2d0424940fd54e6ba4970f6f70bee38935f8), [`fc4e00e75`](https://github.com/Khan/perseus/commit/fc4e00e75e7633f396245dd08126023f255676ed), [`15025d441`](https://github.com/Khan/perseus/commit/15025d4412617a83c4cdf553be7e6aff9f3101ab), [`8f3a7c5b4`](https://github.com/Khan/perseus/commit/8f3a7c5b4a2c57f5b0e55f2804980e77418e37e8), [`6b3bc5c51`](https://github.com/Khan/perseus/commit/6b3bc5c51f6024442469753a68f36d2b8b8885bd), [`89d7c5a2f`](https://github.com/Khan/perseus/commit/89d7c5a2ff3bfc30a9fbaf5b470330952dac0702), [`68de23d36`](https://github.com/Khan/perseus/commit/68de23d361b369a9b437f2908f06013e46c07fd7), [`3cb963b9f`](https://github.com/Khan/perseus/commit/3cb963b9f786f97ace092318fd14fd677ceb9f2f)]:
    -   @khanacademy/perseus-core@12.0.0
    -   @khanacademy/perseus-score@7.0.0
    -   @khanacademy/keypad-context@3.0.10
    -   @khanacademy/kmath@2.0.10
    -   @khanacademy/math-input@25.1.5
    -   @khanacademy/perseus-linter@3.0.10

## 62.0.0

### Major Changes

-   [#2483](https://github.com/Khan/perseus/pull/2483) [`6e3991082`](https://github.com/Khan/perseus/commit/6e3991082cf41d6dcf397adcc288a966091a9569) Thanks [@handeyeco](https://github.com/handeyeco)! - Prevent use of widget registries before any widget is registered

### Minor Changes

-   [#2440](https://github.com/Khan/perseus/pull/2440) [`3c0c4e72f`](https://github.com/Khan/perseus/commit/3c0c4e72f75462b0c9133f6e1af4cf70f9cac1ca) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - New feature for PhET Widget to provide an option for full screen on mobile devices.

### Patch Changes

-   [#2473](https://github.com/Khan/perseus/pull/2473) [`536de9b97`](https://github.com/Khan/perseus/commit/536de9b973a72841c1e7db9398510781bf2deea4) Thanks [@benchristel](https://github.com/benchristel)! - Add types and stories to ensure Matcher widgets work with answerless data.

*   [#2484](https://github.com/Khan/perseus/pull/2484) [`b5f1af8fc`](https://github.com/Khan/perseus/commit/b5f1af8fc66ae0be2b2aa89ffe4f47c87b050309) Thanks [@benchristel](https://github.com/benchristel)! - Remove answer information from the public widget options of Sorter by sorting the cards in `getSorterPublicWidgetOptions`.

-   [#2469](https://github.com/Khan/perseus/pull/2469) [`4fae24098`](https://github.com/Khan/perseus/commit/4fae24098a0aa73f1ad6b3f0545381c199c9df25) Thanks [@dependabot](https://github.com/apps/dependabot)! - Bumping wonder-blocks versions

*   [#2478](https://github.com/Khan/perseus/pull/2478) [`a7ee94c42`](https://github.com/Khan/perseus/commit/a7ee94c42201b2bd39a0e885b9654e19a0af3cee) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensure new radio project files are properly linked to the new files.

-   [#2472](https://github.com/Khan/perseus/pull/2472) [`3389e0611`](https://github.com/Khan/perseus/commit/3389e06111b2c801fba6c34ed4e5bdc747ef1ed1) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Remove eslint-plugin-functional linter

*   [#2420](https://github.com/Khan/perseus/pull/2420) [`12d72deb4`](https://github.com/Khan/perseus/commit/12d72deb4d1f8c1ce4768fd19b9a15c2b2911706) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Update new radio component to functional, while also removing focus method

-   [#2468](https://github.com/Khan/perseus/pull/2468) [`077d2d60e`](https://github.com/Khan/perseus/commit/077d2d60e96ef77e7cae87cf0244b5c5f073e534) Thanks [@benchristel](https://github.com/benchristel)! - Make `getMatcherPublicWidgetOptions` deterministic, and ensure the correct answer is not shown to the learner in the initial widget state

*   [#2465](https://github.com/Khan/perseus/pull/2465) [`e03eddf49`](https://github.com/Khan/perseus/commit/e03eddf4976752f31701319e1193efbcb0f74a37) Thanks [@handeyeco](https://github.com/handeyeco)! - Grapher: add type assertions, clean some dead code

*   Updated dependencies [[`536de9b97`](https://github.com/Khan/perseus/commit/536de9b973a72841c1e7db9398510781bf2deea4), [`b5f1af8fc`](https://github.com/Khan/perseus/commit/b5f1af8fc66ae0be2b2aa89ffe4f47c87b050309), [`4fae24098`](https://github.com/Khan/perseus/commit/4fae24098a0aa73f1ad6b3f0545381c199c9df25), [`6e3991082`](https://github.com/Khan/perseus/commit/6e3991082cf41d6dcf397adcc288a966091a9569), [`3389e0611`](https://github.com/Khan/perseus/commit/3389e06111b2c801fba6c34ed4e5bdc747ef1ed1), [`7611266b8`](https://github.com/Khan/perseus/commit/7611266b853b68fee3e13a4ea28c2dcfb97b3d1e), [`077d2d60e`](https://github.com/Khan/perseus/commit/077d2d60e96ef77e7cae87cf0244b5c5f073e534)]:
    -   @khanacademy/perseus-core@11.0.0
    -   @khanacademy/perseus-score@6.0.0
    -   @khanacademy/kas@2.0.4
    -   @khanacademy/kmath@2.0.9
    -   @khanacademy/math-input@25.1.4
    -   @khanacademy/perseus-linter@3.0.9
    -   @khanacademy/perseus-utils@2.0.3
    -   @khanacademy/keypad-context@3.0.9
    -   @khanacademy/pure-markdown@2.0.4
    -   @khanacademy/simple-markdown@2.0.4

## 61.2.1

### Patch Changes

-   [#2458](https://github.com/Khan/perseus/pull/2458) [`a87ba4e37`](https://github.com/Khan/perseus/commit/a87ba4e3762bd8b5d670a6320f3d8190f2e0da29) Thanks [@handeyeco](https://github.com/handeyeco)! - Add tests and stories for Answerless Grapher with minor refactoring

-   Updated dependencies [[`a87ba4e37`](https://github.com/Khan/perseus/commit/a87ba4e3762bd8b5d670a6320f3d8190f2e0da29)]:
    -   @khanacademy/perseus-core@10.1.0
    -   @khanacademy/keypad-context@3.0.8
    -   @khanacademy/kmath@2.0.8
    -   @khanacademy/math-input@25.1.3
    -   @khanacademy/perseus-linter@3.0.8
    -   @khanacademy/perseus-score@5.0.5

## 61.2.0

### Minor Changes

-   [#2454](https://github.com/Khan/perseus/pull/2454) [`8f49aac1f`](https://github.com/Khan/perseus/commit/8f49aac1f58d577f037bc03cb24d59894524e66b) Thanks [@Myranae](https://github.com/Myranae)! - Clean up the iFrame widget types and library usage, plus add tests to prepare for answerless rendering

### Patch Changes

-   Updated dependencies [[`4c8030081`](https://github.com/Khan/perseus/commit/4c803008155f7c20c88949c9caf4f9c9a2fd399e)]:
    -   @khanacademy/math-input@25.1.2

## 61.1.0

### Minor Changes

-   [#2423](https://github.com/Khan/perseus/pull/2423) [`22e7de307`](https://github.com/Khan/perseus/commit/22e7de307d3662181890abed0723e463b15fcd5a) Thanks [@Myranae](https://github.com/Myranae)! - Update Plotter widget to render with answerless data. Adds test and stories for answerless rendering.

*   [#2449](https://github.com/Khan/perseus/pull/2449) [`2243316be`](https://github.com/Khan/perseus/commit/2243316be4f54777935cb25cf5d34f44b7537700) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add option to ButtonGroup component to allow selected button to be styled

-   [#2441](https://github.com/Khan/perseus/pull/2441) [`f1662239e`](https://github.com/Khan/perseus/commit/f1662239e40b0db4fd75823746a7fc37662f7494) Thanks [@Myranae](https://github.com/Myranae)! - Update Orderer widget to render with answerless data. Adds tests and stories for answerless rendering.

*   [#2387](https://github.com/Khan/perseus/pull/2387) [`aa7b1b621`](https://github.com/Khan/perseus/commit/aa7b1b621efd75b54419b21bc998caa2e241097f) Thanks [@Myranae](https://github.com/Myranae)! - Update Matrix widget to render with answerless data. Adds tests and stories for answerless rendering.

### Patch Changes

-   [#2426](https://github.com/Khan/perseus/pull/2426) [`a2701f002`](https://github.com/Khan/perseus/commit/a2701f00214499cc7ab7730407f70e957d1adf7b) Thanks [@handeyeco](https://github.com/handeyeco)! - Add tests/stories to prove InputNumber is interactive with answerless data

*   [#2447](https://github.com/Khan/perseus/pull/2447) [`39ca81d0f`](https://github.com/Khan/perseus/commit/39ca81d0f4b5a58b70db5ef14fb17d720abd28d7) Thanks [@handeyeco](https://github.com/handeyeco)! - Clean up a ServerItemRenderer test to make it more focused

-   [#2436](https://github.com/Khan/perseus/pull/2436) [`79a84d31b`](https://github.com/Khan/perseus/commit/79a84d31b54289ea69454db7f857896330c1c5d8) Thanks [@benchristel](https://github.com/benchristel)! - Change the type of `PerseusNumberLineWidgetOptions.correctRel` to `"eq" | "lt" | "gt" | "le" | "ge"`, to better reflect our data and the semantics of this field.

*   [#2425](https://github.com/Khan/perseus/pull/2425) [`4282de2b2`](https://github.com/Khan/perseus/commit/4282de2b214e15a7043ee3786c1df11b346c2e97) Thanks [@benchristel](https://github.com/benchristel)! - Add `isInequality` to the `PerseusNumberLineWidgetOptions` type. The NumberLine component was using this field, but it wasn't represented in the types.

-   [#2452](https://github.com/Khan/perseus/pull/2452) [`4b25852db`](https://github.com/Khan/perseus/commit/4b25852db90f0b1884595c8b443a87f66a9fe64f) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix types used for forwardref in `expression` widget

*   [#2414](https://github.com/Khan/perseus/pull/2414) [`e7807485e`](https://github.com/Khan/perseus/commit/e7807485e0d33621efa4468933e6c77ce9a53def) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix dependencies so that the package correctly depends on all of the packages it uses

-   [#2417](https://github.com/Khan/perseus/pull/2417) [`4184314fe`](https://github.com/Khan/perseus/commit/4184314fe3e1e48ea81429ff78184530d90d31ee) Thanks [@handeyeco](https://github.com/handeyeco)! - Enable Group to be rendered/answered with answerless item data

*   [#2380](https://github.com/Khan/perseus/pull/2380) [`1f88cc191`](https://github.com/Khan/perseus/commit/1f88cc1912d9b33b899512ee9052bec10227a4c1) Thanks [@benchristel](https://github.com/benchristel)! - Removes `undefined` from the types of
    `PerseusInteractiveGraphWidgetOptions.lockedFigures` and
    the `labels` property of locked figures. Removes the `coords`
    property from interactive graph widget options types, for graphs that do not
    use it (all but the `point` graph type).

    This is a breaking change because assigning `undefined` to `lockedFigures` or
    `labels`, or setting `coord` in an object literal, will now give a type error.
    Callers should use an empty array instead of `undefined` for `lockedFigures` and
    `labels`. Avoid setting `coord` for graph types other than `point`.

-   [#2416](https://github.com/Khan/perseus/pull/2416) [`a90ebca08`](https://github.com/Khan/perseus/commit/a90ebca08b44174a6d94b9cc3835e9114b584183) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Update Radio Widget docs to include rationales in the test data

*   [#2434](https://github.com/Khan/perseus/pull/2434) [`28c395f8e`](https://github.com/Khan/perseus/commit/28c395f8e0a7f9c11b85fd42ce854fcb931a3b89) Thanks [@benchristel](https://github.com/benchristel)! - Internal: add tests verifying that NumberLine widgets work with answerless data

-   [#2438](https://github.com/Khan/perseus/pull/2438) [`3f32593c9`](https://github.com/Khan/perseus/commit/3f32593c9dd46140b4d8891d50e34f97e751783f) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Add a linter to prevent accidental mutation of object and array values

-   Updated dependencies [[`a2701f002`](https://github.com/Khan/perseus/commit/a2701f00214499cc7ab7730407f70e957d1adf7b), [`558cc1cc6`](https://github.com/Khan/perseus/commit/558cc1cc6ad468ba6538648c57d47df5704e6858), [`79a84d31b`](https://github.com/Khan/perseus/commit/79a84d31b54289ea69454db7f857896330c1c5d8), [`ca4df1cf8`](https://github.com/Khan/perseus/commit/ca4df1cf8c6c28cfb1d45dc94ec7eee61dfef777), [`4282de2b2`](https://github.com/Khan/perseus/commit/4282de2b214e15a7043ee3786c1df11b346c2e97), [`e7807485e`](https://github.com/Khan/perseus/commit/e7807485e0d33621efa4468933e6c77ce9a53def), [`4184314fe`](https://github.com/Khan/perseus/commit/4184314fe3e1e48ea81429ff78184530d90d31ee), [`1f88cc191`](https://github.com/Khan/perseus/commit/1f88cc1912d9b33b899512ee9052bec10227a4c1), [`22e7de307`](https://github.com/Khan/perseus/commit/22e7de307d3662181890abed0723e463b15fcd5a), [`c27162249`](https://github.com/Khan/perseus/commit/c271622490d64f359b8ff8e2fcafc35229c60832), [`28c395f8e`](https://github.com/Khan/perseus/commit/28c395f8e0a7f9c11b85fd42ce854fcb931a3b89), [`bfa5ce68a`](https://github.com/Khan/perseus/commit/bfa5ce68a2c7854261f3f49822fdc159fca07993), [`b7d3b9eaf`](https://github.com/Khan/perseus/commit/b7d3b9eafd9cfddc46931c4591de36c9097ec6be), [`f1662239e`](https://github.com/Khan/perseus/commit/f1662239e40b0db4fd75823746a7fc37662f7494), [`aa7b1b621`](https://github.com/Khan/perseus/commit/aa7b1b621efd75b54419b21bc998caa2e241097f), [`1b773e2a0`](https://github.com/Khan/perseus/commit/1b773e2a0bff73072515649027066d498d33a931), [`3f32593c9`](https://github.com/Khan/perseus/commit/3f32593c9dd46140b4d8891d50e34f97e751783f)]:
    -   @khanacademy/perseus-core@10.0.0
    -   @khanacademy/kas@2.0.3
    -   @khanacademy/keypad-context@3.0.7
    -   @khanacademy/kmath@2.0.7
    -   @khanacademy/math-input@25.1.1
    -   @khanacademy/perseus-linter@3.0.7
    -   @khanacademy/perseus-score@5.0.4
    -   @khanacademy/perseus-utils@2.0.2
    -   @khanacademy/pure-markdown@2.0.3
    -   @khanacademy/simple-markdown@2.0.3

## 61.0.3

### Patch Changes

-   [#2410](https://github.com/Khan/perseus/pull/2410) [`3078f4c59`](https://github.com/Khan/perseus/commit/3078f4c59aa0c3b407cbcf3db8c43c69734d01f9) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Bugfix - Redundant reset.css styling was causing font display issues

## 61.0.2

### Patch Changes

-   [#2407](https://github.com/Khan/perseus/pull/2407) [`016357a5b`](https://github.com/Khan/perseus/commit/016357a5bef1e2b8896a2cb17dd7eedbd6e51f77) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Prepare strings for translation - Add context to interactive graph strings

## 61.0.1

### Patch Changes

-   [#2404](https://github.com/Khan/perseus/pull/2404) [`457c9b818`](https://github.com/Khan/perseus/commit/457c9b8188f60c901e2c64a43e68871a61857697) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Add codeowners for radio widget

-   Updated dependencies [[`45635f7ef`](https://github.com/Khan/perseus/commit/45635f7ef91cf8f7a98149b05198c7e628c8ef2d), [`a7f293aab`](https://github.com/Khan/perseus/commit/a7f293aab18fcba056d61f740dd5cdfa8e796c08)]:
    -   @khanacademy/perseus-core@9.0.0
    -   @khanacademy/math-input@25.1.0
    -   @khanacademy/keypad-context@3.0.6
    -   @khanacademy/kmath@2.0.6
    -   @khanacademy/perseus-linter@3.0.6
    -   @khanacademy/perseus-score@5.0.3

## 61.0.0

### Major Changes

-   [#2389](https://github.com/Khan/perseus/pull/2389) [`c922913b6`](https://github.com/Khan/perseus/commit/c922913b6289d34bf0fecb7bef96c0a6be45d8e7) Thanks [@handeyeco](https://github.com/handeyeco)! - make splitPerseusItem take/return PerseusItems instead of PerseusRenderers (also moves generateTestPerseusItem helper)

### Patch Changes

-   [#2382](https://github.com/Khan/perseus/pull/2382) [`d6f3c50bd`](https://github.com/Khan/perseus/commit/d6f3c50bd21bf46f6e28f5949dfb1b16037cc688) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove useless Rubric type uses

*   [#2400](https://github.com/Khan/perseus/pull/2400) [`e47a2229b`](https://github.com/Khan/perseus/commit/e47a2229b5bdd103145a165cd76b261375adac31) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: fix broken Storybook import

-   [#2383](https://github.com/Khan/perseus/pull/2383) [`f938449f9`](https://github.com/Khan/perseus/commit/f938449f94fd7f4b1ed54cf187bdd7dd8d18cff5) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Removing dependency on hubble.js

*   [#2399](https://github.com/Khan/perseus/pull/2399) [`87558715e`](https://github.com/Khan/perseus/commit/87558715e33f9e45436bd48fb1b3401aa7fb26b6) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - [Radio] Implement the "new-radio-widget" feature flag to isolate the forthcoming Radio Widget project work

-   [#2396](https://github.com/Khan/perseus/pull/2396) [`154ee9999`](https://github.com/Khan/perseus/commit/154ee999955cb1033072c7ae558810d4cc09e9c5) Thanks [@handeyeco](https://github.com/handeyeco)! - Update the Table widget to allow for rendering answerless data

*   [#2401](https://github.com/Khan/perseus/pull/2401) [`9c9861eda`](https://github.com/Khan/perseus/commit/9c9861edaf6cf954796537d7662cf68d583962d6) Thanks [@nishasy](https://github.com/nishasy)! - [SR][pi ticks] Add a coefficient before pi-based values that start with negative pi

*   Updated dependencies [[`8d63aedb1`](https://github.com/Khan/perseus/commit/8d63aedb1f40dd3afa5213ab4498e9a26592bacf), [`c922913b6`](https://github.com/Khan/perseus/commit/c922913b6289d34bf0fecb7bef96c0a6be45d8e7), [`44eea76df`](https://github.com/Khan/perseus/commit/44eea76df58f89d3e0fa9f101ca1bc4ea93b6188)]:
    -   @khanacademy/perseus-core@8.0.0
    -   @khanacademy/perseus-score@5.0.2
    -   @khanacademy/kas@2.0.2
    -   @khanacademy/keypad-context@3.0.5
    -   @khanacademy/kmath@2.0.5
    -   @khanacademy/math-input@25.0.5
    -   @khanacademy/perseus-linter@3.0.5
    -   @khanacademy/perseus-utils@2.0.1
    -   @khanacademy/pure-markdown@2.0.2
    -   @khanacademy/simple-markdown@2.0.2

## 60.0.2

### Patch Changes

-   [#2392](https://github.com/Khan/perseus/pull/2392) [`ea8398c3e`](https://github.com/Khan/perseus/commit/ea8398c3ea726318b2076643c2a9ee31d43f1e0f) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Update APIOptions flags type to make it more explicit to Perseus

## 60.0.1

### Patch Changes

-   [#2386](https://github.com/Khan/perseus/pull/2386) [`1ee46bdef`](https://github.com/Khan/perseus/commit/1ee46bdef3347198d2d2b2ce548708816aa7705f) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Add flags in APIOption, this will be used for feature flags that can be passed from consuming application.

-   Updated dependencies [[`1ee46bdef`](https://github.com/Khan/perseus/commit/1ee46bdef3347198d2d2b2ce548708816aa7705f)]:
    -   @khanacademy/perseus-core@7.1.1
    -   @khanacademy/keypad-context@3.0.4
    -   @khanacademy/kmath@2.0.4
    -   @khanacademy/math-input@25.0.4
    -   @khanacademy/perseus-linter@3.0.4
    -   @khanacademy/perseus-score@5.0.1

## 60.0.0

### Major Changes

-   [#2373](https://github.com/Khan/perseus/pull/2373) [`86ea32b0c`](https://github.com/Khan/perseus/commit/86ea32b0c4ad32a921f1c81661cc218cfd41d77a) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - No longer export 'mediaQueries' object (it is internal-only)

### Minor Changes

-   [#2366](https://github.com/Khan/perseus/pull/2366) [`5ac42d16c`](https://github.com/Khan/perseus/commit/5ac42d16c86fe062630cdec518a3dbdc109e0f17) Thanks [@Myranae](https://github.com/Myranae)! - Update Categorizer widget to render with answerless data. Adds tests and stories for answerless rendering.

### Patch Changes

-   Updated dependencies [[`99c215ae4`](https://github.com/Khan/perseus/commit/99c215ae46e2995b6727a4e8f2083bfbb1ef59b3), [`4ac22bdad`](https://github.com/Khan/perseus/commit/4ac22bdadcdad844ed9964485ef727de53c6dfa7), [`ab80b4b12`](https://github.com/Khan/perseus/commit/ab80b4b12ad5107ac75f9b6f6c6ab125b2d65735), [`5ac42d16c`](https://github.com/Khan/perseus/commit/5ac42d16c86fe062630cdec518a3dbdc109e0f17), [`ccce206f2`](https://github.com/Khan/perseus/commit/ccce206f212451579be047f801d2ccb6a198c207)]:
    -   @khanacademy/perseus-core@7.1.0
    -   @khanacademy/perseus-score@5.0.0
    -   @khanacademy/math-input@25.0.3
    -   @khanacademy/keypad-context@3.0.3
    -   @khanacademy/kmath@2.0.3
    -   @khanacademy/perseus-linter@3.0.3

## 59.1.1

### Patch Changes

-   Updated dependencies [[`91ac603f9`](https://github.com/Khan/perseus/commit/91ac603f98289b11458f51eeb77af515daab5dbb), [`3cdf61b09`](https://github.com/Khan/perseus/commit/3cdf61b091393f6728dfdb8a460c6dd2f4909daa)]:
    -   @khanacademy/perseus-score@4.1.0
    -   @khanacademy/perseus-core@7.0.2
    -   @khanacademy/keypad-context@3.0.2
    -   @khanacademy/kmath@2.0.2
    -   @khanacademy/math-input@25.0.2
    -   @khanacademy/perseus-linter@3.0.2

## 59.1.0

### Minor Changes

-   [#2329](https://github.com/Khan/perseus/pull/2329) [`e03cfbbdd`](https://github.com/Khan/perseus/commit/e03cfbbddf33922959c0a984d13b5e304fa66375) Thanks [@Myranae](https://github.com/Myranae)! - Update and add stories where Dropdown, Interactive Graph, Numeric Input, Expression, and Radio widgets render using answerless data

### Patch Changes

-   [#2299](https://github.com/Khan/perseus/pull/2299) [`865844cf8`](https://github.com/Khan/perseus/commit/865844cf86f20babe8f4425c366811992d7ab0c6) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensure Interactive Graph Axis Labels are clamped by graph dimensions

*   [#2337](https://github.com/Khan/perseus/pull/2337) [`fd3a520c9`](https://github.com/Khan/perseus/commit/fd3a520c93410ae9b2af801714a289f1722e8e8e) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Fix MathInput bottom padding to make it consistent with our styling

-   [#2344](https://github.com/Khan/perseus/pull/2344) [`140fe6563`](https://github.com/Khan/perseus/commit/140fe6563dd885c92a424b9bae81acb6a8a39582) Thanks [@marcysutton](https://github.com/marcysutton)! - Remove unnecessary bolted-on role=combobox from Dropdown widget that is already part of WB Dropdown

*   [#2357](https://github.com/Khan/perseus/pull/2357) [`01746d3f3`](https://github.com/Khan/perseus/commit/01746d3f3e29a48af69c3f01505c61cd10706be0) Thanks [@jandrade](https://github.com/jandrade)! - Update IconButton instances to match new WB changes (IconButton styles, actionType)

-   [#2334](https://github.com/Khan/perseus/pull/2334) [`6c5a0121d`](https://github.com/Khan/perseus/commit/6c5a0121dae2f0452baccc30401888379b5def95) Thanks [@handeyeco](https://github.com/handeyeco)! - Add Eslint rule "@typescript-eslint/no-restricted-imports" to help prevent circular dependencies

-   Updated dependencies [[`fd3a520c9`](https://github.com/Khan/perseus/commit/fd3a520c93410ae9b2af801714a289f1722e8e8e), [`6c5a0121d`](https://github.com/Khan/perseus/commit/6c5a0121dae2f0452baccc30401888379b5def95)]:
    -   @khanacademy/math-input@25.0.1
    -   @khanacademy/kas@2.0.1
    -   @khanacademy/keypad-context@3.0.1
    -   @khanacademy/kmath@2.0.1
    -   @khanacademy/perseus-core@7.0.1
    -   @khanacademy/perseus-linter@3.0.1
    -   @khanacademy/perseus-score@4.0.2
    -   @khanacademy/perseus-utils@2.0.1
    -   @khanacademy/pure-markdown@2.0.1
    -   @khanacademy/simple-markdown@2.0.1

## 59.0.1

### Patch Changes

-   [#2341](https://github.com/Khan/perseus/pull/2341) [`05d3c998d`](https://github.com/Khan/perseus/commit/05d3c998d3f01b1f33ea6213bda8dd02cf5c25a6) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: each vs forEach in answer-types causing issues with fractions in the editor

-   Updated dependencies [[`05d3c998d`](https://github.com/Khan/perseus/commit/05d3c998d3f01b1f33ea6213bda8dd02cf5c25a6)]:
    -   @khanacademy/perseus-score@4.0.1

## 59.0.0

### Major Changes

-   [#2339](https://github.com/Khan/perseus/pull/2339) [`ef5fea555`](https://github.com/Khan/perseus/commit/ef5fea5551230f49af5b31705e84b23493f76883) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Revert move to ESM-only packages (package again ships with CJS and ESM builds)

### Patch Changes

-   Updated dependencies [[`ef5fea555`](https://github.com/Khan/perseus/commit/ef5fea5551230f49af5b31705e84b23493f76883)]:
    -   @khanacademy/kas@2.0.0
    -   @khanacademy/keypad-context@3.0.0
    -   @khanacademy/kmath@2.0.0
    -   @khanacademy/math-input@25.0.0
    -   @khanacademy/perseus-core@7.0.0
    -   @khanacademy/perseus-linter@3.0.0
    -   @khanacademy/perseus-score@4.0.0
    -   @khanacademy/perseus-utils@2.0.0
    -   @khanacademy/pure-markdown@2.0.0
    -   @khanacademy/simple-markdown@2.0.0

## 58.0.0

### Major Changes

-   [#2331](https://github.com/Khan/perseus/pull/2331) [`c2e33e522`](https://github.com/Khan/perseus/commit/c2e33e52291d6379799754e27c5d33b02ff4b1fa) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove CJS output from package (package is now ESM only)

### Patch Changes

-   [#2306](https://github.com/Khan/perseus/pull/2306) [`87b129dbf`](https://github.com/Khan/perseus/commit/87b129dbf47c807b2be1fab7a18fa2e4a7984529) Thanks [@tatianasnook](https://github.com/tatianasnook)! - Added the @typescript-eslint/strict-boolean-expressions rule to enforce explicit boolean expressions for numbers. Disabled strict-boolean-expressions errors using inline eslint-disable comments where the rule was triggered.

*   [#2323](https://github.com/Khan/perseus/pull/2323) [`745b6337c`](https://github.com/Khan/perseus/commit/745b6337cad2aa6bbc16efaf2b66e6aef227e6db) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Hide axis labels from screen readers

-   [#2336](https://github.com/Khan/perseus/pull/2336) [`3bfa609b9`](https://github.com/Khan/perseus/commit/3bfa609b9131c477b16fdd00f32f52b638357e7b) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fix Grapher Widget so that static graphs without asymptotes load correctly.

-   Updated dependencies [[`c2e33e522`](https://github.com/Khan/perseus/commit/c2e33e52291d6379799754e27c5d33b02ff4b1fa)]:
    -   @khanacademy/kas@1.0.0
    -   @khanacademy/keypad-context@2.0.0
    -   @khanacademy/kmath@1.0.0
    -   @khanacademy/math-input@24.0.0
    -   @khanacademy/perseus-core@6.0.0
    -   @khanacademy/perseus-linter@2.0.0
    -   @khanacademy/perseus-score@3.0.0
    -   @khanacademy/perseus-utils@1.0.0
    -   @khanacademy/pure-markdown@1.0.0
    -   @khanacademy/simple-markdown@1.0.0

## 57.2.2

### Patch Changes

-   [#2296](https://github.com/Khan/perseus/pull/2296) [`7b76274f0`](https://github.com/Khan/perseus/commit/7b76274f0bd362d0f2df3e45f47ecc3545ecfdd0) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Fix expression widget styling issues. Close button focus outline is now visible, backspace button styling is now consistent with other buttons, and adjusted the popover padding.

*   [#2301](https://github.com/Khan/perseus/pull/2301) [`11a3b8b24`](https://github.com/Khan/perseus/commit/11a3b8b24aa05fa9774bbb8ef1c73a249f368a9e) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Fix number line input outline to meet accessible contrast standards

-   [#2328](https://github.com/Khan/perseus/pull/2328) [`5b6e9df5b`](https://github.com/Khan/perseus/commit/5b6e9df5b6bcacf7646475ff7884415b815f68c5) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix import of internal items to use relative paths instead of the package name

*   [#2326](https://github.com/Khan/perseus/pull/2326) [`2e26c0872`](https://github.com/Khan/perseus/commit/2e26c087224d620c3a8babcbfe4832e75b5e0269) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Remove instructions for static graphs, mark interactive elements as disabled

-   [#2324](https://github.com/Khan/perseus/pull/2324) [`7a60db8e8`](https://github.com/Khan/perseus/commit/7a60db8e8d61119930dda0a80118c4b99b183a60) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Adding roles to the Image Widget to help improve A11Y.

*   [#2322](https://github.com/Khan/perseus/pull/2322) [`4bd882b43`](https://github.com/Khan/perseus/commit/4bd882b43b15d9d3d5ca850f5148eba57c7dca59) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change how version injection code is shared/bundled

*   Updated dependencies [[`7b76274f0`](https://github.com/Khan/perseus/commit/7b76274f0bd362d0f2df3e45f47ecc3545ecfdd0), [`5b6e9df5b`](https://github.com/Khan/perseus/commit/5b6e9df5b6bcacf7646475ff7884415b815f68c5), [`ca06cb806`](https://github.com/Khan/perseus/commit/ca06cb80686b8b414766d9b1d91a48fa4b71994c), [`4bd882b43`](https://github.com/Khan/perseus/commit/4bd882b43b15d9d3d5ca850f5148eba57c7dca59)]:
    -   @khanacademy/math-input@23.0.6
    -   @khanacademy/kmath@0.4.7
    -   @khanacademy/perseus-core@5.4.2
    -   @khanacademy/perseus-score@2.3.7
    -   @khanacademy/kas@0.5.1
    -   @khanacademy/keypad-context@1.1.7
    -   @khanacademy/perseus-linter@1.3.7
    -   @khanacademy/perseus-utils@0.0.2
    -   @khanacademy/pure-markdown@0.4.1
    -   @khanacademy/simple-markdown@0.14.1

## 57.2.1

### Patch Changes

-   [#2289](https://github.com/Khan/perseus/pull/2289) [`87420d7d3`](https://github.com/Khan/perseus/commit/87420d7d3aa1285a29c9f0c94fcead9ec4ae657d) Thanks [@handeyeco](https://github.com/handeyeco)! - Update ServerItemRendererWithDebugUI to optionally use answerless data for rendering

*   [#2313](https://github.com/Khan/perseus/pull/2313) [`3b0b1c700`](https://github.com/Khan/perseus/commit/3b0b1c70006d2574004141bffbafbbfcd528e76f) Thanks [@nishasy](https://github.com/nishasy)! - [LX] Stop locked functions from memory leaking

*   Updated dependencies [[`1b5f51415`](https://github.com/Khan/perseus/commit/1b5f514159c25fd0eb760cb6d20cab62a813cca4), [`c170c1d3c`](https://github.com/Khan/perseus/commit/c170c1d3c59e67e382d132aa7058260f876121fc), [`4c0b317c3`](https://github.com/Khan/perseus/commit/4c0b317c357ac06277a58e5d6ae83dc4dfa04189), [`335940746`](https://github.com/Khan/perseus/commit/3359407467fe5d36b4c5600da29c4ce623a2ef28)]:
    -   @khanacademy/perseus-core@5.4.1
    -   @khanacademy/perseus-score@2.3.6
    -   @khanacademy/keypad-context@1.1.6
    -   @khanacademy/kmath@0.4.6
    -   @khanacademy/math-input@23.0.5
    -   @khanacademy/perseus-linter@1.3.6

## 57.2.0

### Minor Changes

-   [#2316](https://github.com/Khan/perseus/pull/2316) [`3c8ff9936`](https://github.com/Khan/perseus/commit/3c8ff993615a7224a18250f4a7e96a55ab5c724d) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Add new labelLocation value for Interactive Graphs

### Patch Changes

-   Updated dependencies [[`3c8ff9936`](https://github.com/Khan/perseus/commit/3c8ff993615a7224a18250f4a7e96a55ab5c724d)]:
    -   @khanacademy/perseus-core@5.4.0
    -   @khanacademy/keypad-context@1.1.5
    -   @khanacademy/kmath@0.4.5
    -   @khanacademy/math-input@23.0.4
    -   @khanacademy/perseus-linter@1.3.5
    -   @khanacademy/perseus-score@2.3.5

## 57.1.0

### Minor Changes

-   [#2314](https://github.com/Khan/perseus/pull/2314) [`48bc498f8`](https://github.com/Khan/perseus/commit/48bc498f88f98e817ea426924cbc0b016e5802b9) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Revert labelLocation

### Patch Changes

-   Updated dependencies [[`48bc498f8`](https://github.com/Khan/perseus/commit/48bc498f88f98e817ea426924cbc0b016e5802b9)]:
    -   @khanacademy/perseus-core@5.3.0
    -   @khanacademy/keypad-context@1.1.4
    -   @khanacademy/kmath@0.4.4
    -   @khanacademy/math-input@23.0.3
    -   @khanacademy/perseus-linter@1.3.4
    -   @khanacademy/perseus-score@2.3.4

## 57.0.1

### Patch Changes

-   [#2309](https://github.com/Khan/perseus/pull/2309) [`7be7a42d6`](https://github.com/Khan/perseus/commit/7be7a42d6c86c5aa45e0419162c2a6f2c0426fc8) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Update graph elements so their aria-describedby is read in non-Chrome browsers

*   [#2257](https://github.com/Khan/perseus/pull/2257) [`1e67022c9`](https://github.com/Khan/perseus/commit/1e67022c9782c78b5beb59bb750014b52741d337) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Allow using control + shift + arrow keys for NVDA

## 57.0.0

### Major Changes

-   [#2303](https://github.com/Khan/perseus/pull/2303) [`5e7a6084c`](https://github.com/Khan/perseus/commit/5e7a6084ca141db5c908da2c4b2ffd959e7c5683) Thanks [@benchristel](https://github.com/benchristel)! - Drop support for using KaTeX as a math renderer. You may encounter styling issues or TeX syntax errors if you try to implement `PerseusDependencies.TeX` using KaTeX.

### Minor Changes

-   [#2284](https://github.com/Khan/perseus/pull/2284) [`0d5ab0b2e`](https://github.com/Khan/perseus/commit/0d5ab0b2e5d079b8ac805077a2abad6bc5b2132d) Thanks [@nishasy](https://github.com/nishasy)! - Add new labelLocation value for Interactive Graphs

*   [#875](https://github.com/Khan/perseus/pull/875) [`9737eb497`](https://github.com/Khan/perseus/commit/9737eb497861dd2283eb24e39eb9771a07391aa5) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove deprecated khan-exercise.css

-   [#2305](https://github.com/Khan/perseus/pull/2305) [`af6d89007`](https://github.com/Khan/perseus/commit/af6d890076adb186c6ba237a2d766b99e3eb75ff) Thanks [@Myranae](https://github.com/Myranae)! - Add a story for Dropdown that uses answerless data

### Patch Changes

-   [#2307](https://github.com/Khan/perseus/pull/2307) [`dd7b13a78`](https://github.com/Khan/perseus/commit/dd7b13a7881738e2a85d253f25b04243caf2b9a4) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Revert SSS temporarily for Radio to ensure Multiselect + Random answer correctness is accurate

-   Updated dependencies [[`0d5ab0b2e`](https://github.com/Khan/perseus/commit/0d5ab0b2e5d079b8ac805077a2abad6bc5b2132d), [`fea65eaf1`](https://github.com/Khan/perseus/commit/fea65eaf12918e7e1b1e893bea80549e69313ce2)]:
    -   @khanacademy/perseus-core@5.2.0
    -   @khanacademy/keypad-context@1.1.3
    -   @khanacademy/kmath@0.4.3
    -   @khanacademy/math-input@23.0.2
    -   @khanacademy/perseus-linter@1.3.3
    -   @khanacademy/perseus-score@2.3.3

## 56.2.0

### Minor Changes

-   [#2293](https://github.com/Khan/perseus/pull/2293) [`91e30c02c`](https://github.com/Khan/perseus/commit/91e30c02c15ddc7c811b658bdb052172739a690a) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Deprecate usage of PerseusErrorOccurred event logging in favor of PerseusErrorOccurredTI events.

### Patch Changes

-   [#2294](https://github.com/Khan/perseus/pull/2294) [`254fa3605`](https://github.com/Khan/perseus/commit/254fa360518ffd78cd26a0fb47fec2d53d9db948) Thanks [@nishasy](https://github.com/nishasy)! - [Polygon] Show right angle markers when showAngles is on

-   Updated dependencies [[`91e30c02c`](https://github.com/Khan/perseus/commit/91e30c02c15ddc7c811b658bdb052172739a690a), [`59b932619`](https://github.com/Khan/perseus/commit/59b93261916bb3583ee84396693d84fe796aa5d4)]:
    -   @khanacademy/perseus-core@5.1.0
    -   @khanacademy/math-input@23.0.1
    -   @khanacademy/keypad-context@1.1.2
    -   @khanacademy/kmath@0.4.2
    -   @khanacademy/perseus-linter@1.3.2
    -   @khanacademy/perseus-score@2.3.2

## 56.1.0

### Minor Changes

-   [#2288](https://github.com/Khan/perseus/pull/2288) [`7ef0dae77`](https://github.com/Khan/perseus/commit/7ef0dae779e5c8aaed6b21e86cba5baee8c0be86) Thanks [@nishasy](https://github.com/nishasy)! - Mark Interactive Graph Widget as accessible. (Content authors are no longer blocked from checking/unchecking the "Requires screen or mouse?" checkbox.)

### Patch Changes

-   [#2291](https://github.com/Khan/perseus/pull/2291) [`e87914dcd`](https://github.com/Khan/perseus/commit/e87914dcd2fc83b30053adbe064945d46ddb11e4) Thanks [@handeyeco](https://github.com/handeyeco)! - Update snapshots as a result of bumping Wonder Blocks

*   [#2283](https://github.com/Khan/perseus/pull/2283) [`0438f6331`](https://github.com/Khan/perseus/commit/0438f6331c06e026f815d4087f76fe77acafa312) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bugfix to ensure that the Interactive Graph Editor updates the Polygon start coords if the number of sides change.

-   [#2287](https://github.com/Khan/perseus/pull/2287) [`9b4c1942e`](https://github.com/Khan/perseus/commit/9b4c1942eeaadf6d3a201f516574c4597dfcbb3c) Thanks [@nishasy](https://github.com/nishasy)! - [LX] Make static graphs' interactive elements visually disabled

*   [#2282](https://github.com/Khan/perseus/pull/2282) [`5226f43a9`](https://github.com/Khan/perseus/commit/5226f43a9785e2c7acb52b76e15f58384d313a34) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensure that dragging a point also moves the focus for Interactive Graph

-   [#2281](https://github.com/Khan/perseus/pull/2281) [`015aace83`](https://github.com/Khan/perseus/commit/015aace83f6b125b8d02fa7f01dde47f071c44e9) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Improving the angle snapping behavior for keyboard users in polygon examples.

*   [#2277](https://github.com/Khan/perseus/pull/2277) [`88e4e905d`](https://github.com/Khan/perseus/commit/88e4e905d2a94134fd2390a55360281a29229fb5) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Hide individual visual components of interactive graph elements

## 56.0.0

### Major Changes

-   [#2233](https://github.com/Khan/perseus/pull/2233) [`a0aee41b6`](https://github.com/Khan/perseus/commit/a0aee41b69d4288ef165416cea293100d037ce5f) Thanks [@handeyeco](https://github.com/handeyeco)! - RadioWidget v2 in support of answerless Radio

### Patch Changes

-   [#2279](https://github.com/Khan/perseus/pull/2279) [`e02cc4109`](https://github.com/Khan/perseus/commit/e02cc4109a98d8d04054d7f4aae7931089facdda) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Tweak strings for Segment and Angle graphs

*   [#2270](https://github.com/Khan/perseus/pull/2270) [`941343ee3`](https://github.com/Khan/perseus/commit/941343ee3e3e88c2c4babb3040bfb2a73c64bf66) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixing side snapping within polygons to be keyboard accessible.

-   [#2226](https://github.com/Khan/perseus/pull/2226) [`909148cdc`](https://github.com/Khan/perseus/commit/909148cdccabb3f0a2156587ea1e870bae910f8d) Thanks [@handeyeco](https://github.com/handeyeco)! - Answerless Expression: Expression can render and is interactive with answerless data

-   Updated dependencies [[`a0aee41b6`](https://github.com/Khan/perseus/commit/a0aee41b69d4288ef165416cea293100d037ce5f), [`909148cdc`](https://github.com/Khan/perseus/commit/909148cdccabb3f0a2156587ea1e870bae910f8d)]:
    -   @khanacademy/perseus-core@5.0.0
    -   @khanacademy/math-input@23.0.0
    -   @khanacademy/keypad-context@1.1.1
    -   @khanacademy/kmath@0.4.1
    -   @khanacademy/perseus-linter@1.3.1
    -   @khanacademy/perseus-score@2.3.1

## 55.0.1

### Patch Changes

-   [#2275](https://github.com/Khan/perseus/pull/2275) [`ad8681004`](https://github.com/Khan/perseus/commit/ad8681004338004a8204983a4192f2c141e691d8) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensure we can still identify numeric inputs

## 55.0.0

### Major Changes

-   [#2261](https://github.com/Khan/perseus/pull/2261) [`5de2e740b`](https://github.com/Khan/perseus/commit/5de2e740b35d69fc0059af5dbb74bd894986e124) Thanks [@handeyeco](https://github.com/handeyeco)! - Make NumericInput interactive without answer data

### Minor Changes

-   [#2202](https://github.com/Khan/perseus/pull/2202) [`c7f6f63c8`](https://github.com/Khan/perseus/commit/c7f6f63c845566d99dae6df604426e5fb14a7e85) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Tooling:

    -   Switching to `pnpm`.

*   [#2209](https://github.com/Khan/perseus/pull/2209) [`bd8a3b9d5`](https://github.com/Khan/perseus/commit/bd8a3b9d59ddbe71417d4c6b821503ab79c20830) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Update Input with Examples to use Wonderblocks Tooltip

-   [#2209](https://github.com/Khan/perseus/pull/2209) [`d1d5a8247`](https://github.com/Khan/perseus/commit/d1d5a824766c6924249b00549128e8c57a960e77) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Modernization and Migration of InputWithExamples to NumericInput folder

*   [#2209](https://github.com/Khan/perseus/pull/2209) [`c0149a1b9`](https://github.com/Khan/perseus/commit/c0149a1b9f9d917f0f9b98dd6d61414e9bb7d895) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Refactoring Numeric Input helper functions to remove underscore, improve documentation, and add tests.

-   [#2264](https://github.com/Khan/perseus/pull/2264) [`4eb9fe04a`](https://github.com/Khan/perseus/commit/4eb9fe04ab490799225569c9c64b84a1da92a5df) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensure that keyboard users can move points across invalid locations for all graphs.

*   [#2209](https://github.com/Khan/perseus/pull/2209) [`d1b655095`](https://github.com/Khan/perseus/commit/d1b65509552a64d95766dc6252215842e758d7f8) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Refactoring Numeric Input to move UI-logic to functional component.

### Patch Changes

-   [#2263](https://github.com/Khan/perseus/pull/2263) [`4dde99856`](https://github.com/Khan/perseus/commit/4dde998569bceb6931619777fb6f8ba6e7d17cea) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Update protractor to new SVG

*   [#2209](https://github.com/Khan/perseus/pull/2209) [`4a75e6d42`](https://github.com/Khan/perseus/commit/4a75e6d42eeb4a819c6b52b5c9d5ad6f04e04c2a) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixing changes that did not migrate automatically while rebasing feature branch.

-   [#2209](https://github.com/Khan/perseus/pull/2209) [`e797a6a25`](https://github.com/Khan/perseus/commit/e797a6a2509326920ba28b14f128a54fcdd065b9) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Update aria label for whe ncontent creators do not provide one

*   [#2252](https://github.com/Khan/perseus/pull/2252) [`e7ad604af`](https://github.com/Khan/perseus/commit/e7ad604afce45feab7d268582ec6db41d6ab5e06) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Update Linear System strings

-   [#2209](https://github.com/Khan/perseus/pull/2209) [`913551712`](https://github.com/Khan/perseus/commit/913551712b2ee90ace89ac2df8ed6b60c135fe28) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensure Numeric Input Tooltips display under the input.

*   [#2251](https://github.com/Khan/perseus/pull/2251) [`e5d17bbf2`](https://github.com/Khan/perseus/commit/e5d17bbf2bb14441dcfd5f412d0826e3a78078f2) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Update Linear strings

-   [#2259](https://github.com/Khan/perseus/pull/2259) [`a90cf7901`](https://github.com/Khan/perseus/commit/a90cf790159fefbee41437f20ac9a403a06f148f) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Minor change to how each package embeds it's package version in itself (slightly larger bundle size)

*   [#2268](https://github.com/Khan/perseus/pull/2268) [`9d01457fc`](https://github.com/Khan/perseus/commit/9d01457fcb882ce3df555e3c7f733f94b02d0b6c) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Minor dev improvements for Numeric Input after Refactor changes.

-   [#2254](https://github.com/Khan/perseus/pull/2254) [`56b4ee61b`](https://github.com/Khan/perseus/commit/56b4ee61b064603fdbeb4577851fe142d881e245) Thanks [@benchristel](https://github.com/benchristel)! - Internal: test that Interactive Graph widgets can render with answerless data

*   [#2253](https://github.com/Khan/perseus/pull/2253) [`24e2b4e45`](https://github.com/Khan/perseus/commit/24e2b4e45af4a7ef7657f99be5d1b07516d2ee0f) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Update sinusoid strings

-   [#2209](https://github.com/Khan/perseus/pull/2209) [`926d42c99`](https://github.com/Khan/perseus/commit/926d42c990903583b36c4e9c5a72a2c80c85ac16) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bug fix to ensure that Numeric Examples only show for correct answers.

*   [#2231](https://github.com/Khan/perseus/pull/2231) [`08409c6c9`](https://github.com/Khan/perseus/commit/08409c6c9eea1d19212d332acb056c5ef4971419) Thanks [@handeyeco](https://github.com/handeyeco)! - Add tests for answerless Dropdown support

-   [#2209](https://github.com/Khan/perseus/pull/2209) [`b9f5f97a8`](https://github.com/Khan/perseus/commit/b9f5f97a8a1bf9c0509c84e829dce7a8c7a9d2da) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Cleanup of Numeric Input stories

*   [#2250](https://github.com/Khan/perseus/pull/2250) [`f6795c2e4`](https://github.com/Khan/perseus/commit/f6795c2e4b7fd639bb2df3fb9f123adb65659fb8) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Update Circle strings

-   [#2241](https://github.com/Khan/perseus/pull/2241) [`a0c897d74`](https://github.com/Khan/perseus/commit/a0c897d7406318e5492466a244b8d436b62d354d) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Update tests and fix snapshots from feature branch rebase

-   Updated dependencies [[`90034a875`](https://github.com/Khan/perseus/commit/90034a8754ab735ec84d959916b62a69d39efc2a), [`dcf9017d9`](https://github.com/Khan/perseus/commit/dcf9017d9917e0f877677b010a905e477081b15f), [`e7ad604af`](https://github.com/Khan/perseus/commit/e7ad604afce45feab7d268582ec6db41d6ab5e06), [`c7f6f63c8`](https://github.com/Khan/perseus/commit/c7f6f63c845566d99dae6df604426e5fb14a7e85), [`b71154170`](https://github.com/Khan/perseus/commit/b711541701ec10ccb506d0f9cbafac4a1c7c4cc1), [`a90cf7901`](https://github.com/Khan/perseus/commit/a90cf790159fefbee41437f20ac9a403a06f148f), [`e797a6a25`](https://github.com/Khan/perseus/commit/e797a6a2509326920ba28b14f128a54fcdd065b9), [`9d01457fc`](https://github.com/Khan/perseus/commit/9d01457fcb882ce3df555e3c7f733f94b02d0b6c), [`56b4ee61b`](https://github.com/Khan/perseus/commit/56b4ee61b064603fdbeb4577851fe142d881e245), [`da01542f2`](https://github.com/Khan/perseus/commit/da01542f2f9676f6d99fa930244ab6b21830a2f2), [`5de2e740b`](https://github.com/Khan/perseus/commit/5de2e740b35d69fc0059af5dbb74bd894986e124), [`458d3ed60`](https://github.com/Khan/perseus/commit/458d3ed600be91dd75a30a80bfac1fbd87c60bcd), [`ee91b7063`](https://github.com/Khan/perseus/commit/ee91b7063982530274e3cc736b3e78ad9fae43cf), [`20a08315b`](https://github.com/Khan/perseus/commit/20a08315b288244357b8a2526f87c2c5014f2fa6), [`d1d5a8247`](https://github.com/Khan/perseus/commit/d1d5a824766c6924249b00549128e8c57a960e77), [`381842745`](https://github.com/Khan/perseus/commit/3818427456a2ffca56481adbdafa01fee40e83c0), [`c0149a1b9`](https://github.com/Khan/perseus/commit/c0149a1b9f9d917f0f9b98dd6d61414e9bb7d895), [`08409c6c9`](https://github.com/Khan/perseus/commit/08409c6c9eea1d19212d332acb056c5ef4971419), [`d1b655095`](https://github.com/Khan/perseus/commit/d1b65509552a64d95766dc6252215842e758d7f8)]:
    -   @khanacademy/perseus-core@4.0.0
    -   @khanacademy/perseus-score@2.3.0
    -   @khanacademy/kmath@0.4.0
    -   @khanacademy/kas@0.5.0
    -   @khanacademy/keypad-context@1.1.0
    -   @khanacademy/math-input@22.3.0
    -   @khanacademy/perseus-linter@1.3.0
    -   @khanacademy/pure-markdown@0.4.0
    -   @khanacademy/simple-markdown@0.14.0

## 54.1.0

### Minor Changes

-   [#2242](https://github.com/Khan/perseus/pull/2242) [`e187c6b67`](https://github.com/Khan/perseus/commit/e187c6b67cb4d83e42907527acfe6562346e92d8) Thanks [@benchristel](https://github.com/benchristel)! - Deprecate the `metadata` field in renderer, hint, and Group widget data schemas.

*   [#2156](https://github.com/Khan/perseus/pull/2156) [`cbd5a6528`](https://github.com/Khan/perseus/commit/cbd5a652818554aa368bcddb0381d4716bc7a8ba) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Matcher widget

### Patch Changes

-   [#2215](https://github.com/Khan/perseus/pull/2215) [`62ed407b8`](https://github.com/Khan/perseus/commit/62ed407b8647472f955467b8ce64261182bb8b59) Thanks [@Myranae](https://github.com/Myranae)! - Update Sorter's public widget option function to use Math.random and shuffle

-   Updated dependencies [[`bae77a63c`](https://github.com/Khan/perseus/commit/bae77a63c80c18cdf1f0d6abc631b0dae3b579ba), [`e63f83d0d`](https://github.com/Khan/perseus/commit/e63f83d0d89fd5b8e7aee3ab7248bcb19ec9be8a), [`e187c6b67`](https://github.com/Khan/perseus/commit/e187c6b67cb4d83e42907527acfe6562346e92d8), [`62ed407b8`](https://github.com/Khan/perseus/commit/62ed407b8647472f955467b8ce64261182bb8b59), [`cbd5a6528`](https://github.com/Khan/perseus/commit/cbd5a652818554aa368bcddb0381d4716bc7a8ba)]:
    -   @khanacademy/perseus-linter@1.2.18
    -   @khanacademy/perseus-core@3.7.0
    -   @khanacademy/kas@0.4.16
    -   @khanacademy/keypad-context@1.0.19
    -   @khanacademy/kmath@0.3.5
    -   @khanacademy/math-input@22.2.6
    -   @khanacademy/perseus-score@2.2.2
    -   @khanacademy/pure-markdown@0.3.27
    -   @khanacademy/simple-markdown@0.13.20

## 54.0.0

### Major Changes

-   [#2234](https://github.com/Khan/perseus/pull/2234) [`1ade12c18`](https://github.com/Khan/perseus/commit/1ade12c184ba9ef657a7c7d53b81da70fe85de31) Thanks [@handeyeco](https://github.com/handeyeco)! - Move splitters into perseus-core, add splitPerseusItem

### Minor Changes

-   [#2228](https://github.com/Khan/perseus/pull/2228) [`edd34241e`](https://github.com/Khan/perseus/commit/edd34241ea54bab011a7b66789c115850e2ae7a4) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Remove legacy graph

*   [#2238](https://github.com/Khan/perseus/pull/2238) [`8e4cb7f53`](https://github.com/Khan/perseus/commit/8e4cb7f53efafed365ca5fa321dad14cb5ce2d30) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bugfixes to ensure that focus is handled correctly on unlimited point/polygon graphs.

### Patch Changes

-   [#2223](https://github.com/Khan/perseus/pull/2223) [`f8a4becb0`](https://github.com/Khan/perseus/commit/f8a4becb03c543b034cc47d91d3335078bce76c0) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [Bugfix] Interactive Graph crashes in editor when setting domain for locked function

*   [#2201](https://github.com/Khan/perseus/pull/2201) [`91cede41f`](https://github.com/Khan/perseus/commit/91cede41fa6ef2744709e82d651d9bf3ba4c928a) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Refactor - Update graphs to pass in i18n context

-   [#2230](https://github.com/Khan/perseus/pull/2230) [`5fd3aa351`](https://github.com/Khan/perseus/commit/5fd3aa35123d1bcbc64dd8b63c914396a1ad9f06) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Add screen reader support for pi-based numbers

*   [#2224](https://github.com/Khan/perseus/pull/2224) [`639eb089d`](https://github.com/Khan/perseus/commit/639eb089d120b01bd9cb87b5d1e0ba2b34772846) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Add minimal instructions for how to interact with graph

-   [#2205](https://github.com/Khan/perseus/pull/2205) [`ae29e2b2f`](https://github.com/Khan/perseus/commit/ae29e2b2fd3b4ec9533b3a1845d2ca94d05d4ed7) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Updating perseus analytics and events for better metrics.

*   [#2232](https://github.com/Khan/perseus/pull/2232) [`dc9989893`](https://github.com/Khan/perseus/commit/dc9989893a58b9ca758554606ada51441e0190fa) Thanks [@beaesguerra](https://github.com/beaesguerra)! - Tooling: Enabled jsx-a11y lint rules and disabled existing errors that were found

-   [#2229](https://github.com/Khan/perseus/pull/2229) [`91cd0c937`](https://github.com/Khan/perseus/commit/91cd0c9370447b9f8ffb4ae32c957649a3709ba9) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Sinusoid - add screen reader support

*   [#2236](https://github.com/Khan/perseus/pull/2236) [`df75123e5`](https://github.com/Khan/perseus/commit/df75123e59f0423b807a101d054a7a297e316d1c) Thanks [@nishasy](https://github.com/nishasy)! - [LX] Add hairlines when Circle center has focus

-   [#2243](https://github.com/Khan/perseus/pull/2243) [`43005350f`](https://github.com/Khan/perseus/commit/43005350f5dfb4f4a00badb442e2cfb8dca18014) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Angle - Update strings to reflect changes to SRUX specs

*   [#2245](https://github.com/Khan/perseus/pull/2245) [`037aaa2f4`](https://github.com/Khan/perseus/commit/037aaa2f486802926abbe4e754fef5e329c9526b) Thanks [@catandthemachines](https://github.com/catandthemachines)! - fixing bug in getWidgetSubTypeByWidgetId function.

-   [#2213](https://github.com/Khan/perseus/pull/2213) [`db9bc4fb6`](https://github.com/Khan/perseus/commit/db9bc4fb6b3929b6f727fc5b549a20d997b2a00a) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Angle - Add the "interactive elements" overall graph description

*   [#2212](https://github.com/Khan/perseus/pull/2212) [`3ec6ec179`](https://github.com/Khan/perseus/commit/3ec6ec1799b9dec7f8e8a5ae025abcfc3a068822) Thanks [@nishasy](https://github.com/nishasy)! - [LX] Add hairlines when point has focus

-   [#2235](https://github.com/Khan/perseus/pull/2235) [`ab2041897`](https://github.com/Khan/perseus/commit/ab2041897dff393e2e86d4d4a6e5ad278eff17bd) Thanks [@benchristel](https://github.com/benchristel)! - Remove unused code, and export the `ParseFailureDetail` type from `@khanacademy/perseus-core`

*   [#2221](https://github.com/Khan/perseus/pull/2221) [`71329fe35`](https://github.com/Khan/perseus/commit/71329fe353212e92411fdbbea7efd62f70068151) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Add aria-labels for x- and y-axis labels

-   [#2244](https://github.com/Khan/perseus/pull/2244) [`c565e26d4`](https://github.com/Khan/perseus/commit/c565e26d4cb56ec7114beb5a563f82a2993751b6) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Replace string-based function call with switch statement

-   Updated dependencies [[`f8a4becb0`](https://github.com/Khan/perseus/commit/f8a4becb03c543b034cc47d91d3335078bce76c0), [`ae29e2b2f`](https://github.com/Khan/perseus/commit/ae29e2b2fd3b4ec9533b3a1845d2ca94d05d4ed7), [`dc9989893`](https://github.com/Khan/perseus/commit/dc9989893a58b9ca758554606ada51441e0190fa), [`ab2041897`](https://github.com/Khan/perseus/commit/ab2041897dff393e2e86d4d4a6e5ad278eff17bd), [`1ade12c18`](https://github.com/Khan/perseus/commit/1ade12c184ba9ef657a7c7d53b81da70fe85de31), [`ce320b496`](https://github.com/Khan/perseus/commit/ce320b496bdc9580c194f878674773b845bb27b3)]:
    -   @khanacademy/perseus-core@3.6.0
    -   @khanacademy/math-input@22.2.5
    -   @khanacademy/perseus-linter@1.2.17
    -   @khanacademy/perseus-score@2.2.1
    -   @khanacademy/kas@0.4.15
    -   @khanacademy/keypad-context@1.0.18
    -   @khanacademy/kmath@0.3.4
    -   @khanacademy/pure-markdown@0.3.26
    -   @khanacademy/simple-markdown@0.13.19

## 53.1.0

### Minor Changes

-   [#2194](https://github.com/Khan/perseus/pull/2194) [`fd606f43d`](https://github.com/Khan/perseus/commit/fd606f43d7687a15d6dc2cabd0e85fc71b5ed878) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for an interactive graph widget

*   [#2189](https://github.com/Khan/perseus/pull/2189) [`3ba74d173`](https://github.com/Khan/perseus/commit/3ba74d1731ceff13c9794a3aeaf79f1735b5fb86) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for a Table widget

-   [#2200](https://github.com/Khan/perseus/pull/2200) [`47cebd20f`](https://github.com/Khan/perseus/commit/47cebd20fdcf1f47c50f30901f0a1e1654ae4790) Thanks [@nishasy](https://github.com/nishasy)! - [Mafs] Remove mafs flag from Interactive Graph code

*   [#2207](https://github.com/Khan/perseus/pull/2207) [`097176a26`](https://github.com/Khan/perseus/commit/097176a26db7b0c80b3be5e6fe469539f65de0ea) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for a Matrix widget

-   [#2216](https://github.com/Khan/perseus/pull/2216) [`b3c562ac2`](https://github.com/Khan/perseus/commit/b3c562ac2cc6d02c433bf0587379c09a49080795) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Plotter widget

*   [#2198](https://github.com/Khan/perseus/pull/2198) [`649e6b16a`](https://github.com/Khan/perseus/commit/649e6b16ab67fad694cde5473bcfb3abb719a57d) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for a Grapher widget

-   [#2217](https://github.com/Khan/perseus/pull/2217) [`07779783a`](https://github.com/Khan/perseus/commit/07779783ae0e3a19c0c72e95a8eaa0b58a9cc968) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Move coord reverse logic for Angle graphs into scoring logic

*   [#2183](https://github.com/Khan/perseus/pull/2183) [`cac39013b`](https://github.com/Khan/perseus/commit/cac39013bd59a5ef73f151e1170dec83b463f076) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Radio widget

-   [#2188](https://github.com/Khan/perseus/pull/2188) [`163dd67d2`](https://github.com/Khan/perseus/commit/163dd67d2a8e119bc18191816668352e43292da2) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to retrieve public widget options for the IFrame widget

### Patch Changes

-   [#2107](https://github.com/Khan/perseus/pull/2107) [`b44c8cb0a`](https://github.com/Khan/perseus/commit/b44c8cb0a54756b949b208d6fe4470aa23da4e8d) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [Storybook] Configure Aphrodite to Not Append !important to Styles
    [Radio] Bugfix - Incorrect choice showing as blue instead of red

*   [#2191](https://github.com/Khan/perseus/pull/2191) [`55317d65e`](https://github.com/Khan/perseus/commit/55317d65e4cd859784aa9bacb7b5a550a54045f1) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Polygon (unlimited) - Add screen reader experience

-   [#2220](https://github.com/Khan/perseus/pull/2220) [`6b8185885`](https://github.com/Khan/perseus/commit/6b8185885dc1836ee736fb52b10394ebf55edaee) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Stop graph from exposing random empty image to screen readers

*   [#2185](https://github.com/Khan/perseus/pull/2185) [`f83a1fb03`](https://github.com/Khan/perseus/commit/f83a1fb03185645d636b102cf15e0366b9cf84b1) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [Bugfix] Zoomable content within a collapsed parent not showing when expanded (Mobile only)

-   [#2222](https://github.com/Khan/perseus/pull/2222) [`55be8a775`](https://github.com/Khan/perseus/commit/55be8a7751b92ea5192bc657ecb459a447373659) Thanks [@dependabot](https://github.com/apps/dependabot)! - Updating wonderblocks package versions.

*   [#2173](https://github.com/Khan/perseus/pull/2173) [`10ee67a9c`](https://github.com/Khan/perseus/commit/10ee67a9ce1584b994f50aad007e686ad54d294e) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Polygon - Add screen reader experience

-   [#2196](https://github.com/Khan/perseus/pull/2196) [`b07f2936f`](https://github.com/Khan/perseus/commit/b07f2936fccb94cde5cd34ce258973581611416a) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Segment - fix 2 strings with typos

-   Updated dependencies [[`fd606f43d`](https://github.com/Khan/perseus/commit/fd606f43d7687a15d6dc2cabd0e85fc71b5ed878), [`3ba74d173`](https://github.com/Khan/perseus/commit/3ba74d1731ceff13c9794a3aeaf79f1735b5fb86), [`7ec6c2fbc`](https://github.com/Khan/perseus/commit/7ec6c2fbc21d3d7d4ef98a58e021da4684561447), [`097176a26`](https://github.com/Khan/perseus/commit/097176a26db7b0c80b3be5e6fe469539f65de0ea), [`b3c562ac2`](https://github.com/Khan/perseus/commit/b3c562ac2cc6d02c433bf0587379c09a49080795), [`55be8a775`](https://github.com/Khan/perseus/commit/55be8a7751b92ea5192bc657ecb459a447373659), [`649e6b16a`](https://github.com/Khan/perseus/commit/649e6b16ab67fad694cde5473bcfb3abb719a57d), [`07779783a`](https://github.com/Khan/perseus/commit/07779783ae0e3a19c0c72e95a8eaa0b58a9cc968), [`cac39013b`](https://github.com/Khan/perseus/commit/cac39013bd59a5ef73f151e1170dec83b463f076), [`163dd67d2`](https://github.com/Khan/perseus/commit/163dd67d2a8e119bc18191816668352e43292da2)]:
    -   @khanacademy/perseus-core@3.5.0
    -   @khanacademy/kmath@0.3.3
    -   @khanacademy/math-input@22.2.4
    -   @khanacademy/perseus-score@2.2.0
    -   @khanacademy/kas@0.4.14
    -   @khanacademy/keypad-context@1.0.17
    -   @khanacademy/perseus-linter@1.2.16
    -   @khanacademy/pure-markdown@0.3.25
    -   @khanacademy/simple-markdown@0.13.18

## 53.0.0

### Major Changes

-   [#2165](https://github.com/Khan/perseus/pull/2165) [`c8e383b46`](https://github.com/Khan/perseus/commit/c8e383b469426182a1392ca6ad2cde21b61e2f40) Thanks [@handeyeco](https://github.com/handeyeco)! - Move scorePerseusItem logic to PerseusScore

### Minor Changes

-   [#2154](https://github.com/Khan/perseus/pull/2154) [`a21fd908d`](https://github.com/Khan/perseus/commit/a21fd908d705c5b9de56f29af54d726824f5668e) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Sorter widget

*   [#2171](https://github.com/Khan/perseus/pull/2171) [`a470c799e`](https://github.com/Khan/perseus/commit/a470c799eb53c87e08fb2f829b27e114ca80f63f) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for the LabelImage widget

-   [#2174](https://github.com/Khan/perseus/pull/2174) [`97e07c8ba`](https://github.com/Khan/perseus/commit/97e07c8baee12a37e471e8292dedbcf0588e2f50) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Numeric Input widget

*   [#2167](https://github.com/Khan/perseus/pull/2167) [`c72166c30`](https://github.com/Khan/perseus/commit/c72166c3046aa7c0fcd4e3348d604248e8565c2e) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Allow axis tick labels to be multiples of pi

-   [#2178](https://github.com/Khan/perseus/pull/2178) [`dbd496769`](https://github.com/Khan/perseus/commit/dbd496769e210fc4aca33778a567a99ff1654e7e) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public widget options for a CS widget.

*   [#2170](https://github.com/Khan/perseus/pull/2170) [`7f88f17fc`](https://github.com/Khan/perseus/commit/7f88f17fcd19914e6652e7abe86afc769930a0a4) Thanks [@nedredmond](https://github.com/nedredmond)! - Removes explicit z-indexes from many widgets to fix long-standing bugs in consuming code.

-   [#2166](https://github.com/Khan/perseus/pull/2166) [`3c4c6bc92`](https://github.com/Khan/perseus/commit/3c4c6bc9207f6f2d65312df1c2bd5bf5246182a2) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Dropdown widget

*   [#2179](https://github.com/Khan/perseus/pull/2179) [`564447af2`](https://github.com/Khan/perseus/commit/564447af2c030143c303c7ec88b055bab324fff1) Thanks [@benchristel](https://github.com/benchristel)! - Create a function to get the public options for the NumberLine widget

### Patch Changes

-   [#2180](https://github.com/Khan/perseus/pull/2180) [`43d8bc68e`](https://github.com/Khan/perseus/commit/43d8bc68e1b816f8eaf56d15c8d4623d4cd163b6) Thanks [@benchristel](https://github.com/benchristel)! - Restores the following deprecated exports to `@khanacademy/perseus`:
    `parsePerseusItem`, `parseAndMigratePerseusItem`,
    `parseAndMigratePerseusArticle`, `isSuccess`, `isFailure`, `Result`, `Success`,
    `Failure`.
-   Updated dependencies [[`a21fd908d`](https://github.com/Khan/perseus/commit/a21fd908d705c5b9de56f29af54d726824f5668e), [`781834332`](https://github.com/Khan/perseus/commit/781834332921f839028aa5cb3c5c867121859e02), [`af8f5d3ca`](https://github.com/Khan/perseus/commit/af8f5d3cac1f642bb5f0c96a2f536990c277224f), [`a470c799e`](https://github.com/Khan/perseus/commit/a470c799eb53c87e08fb2f829b27e114ca80f63f), [`97e07c8ba`](https://github.com/Khan/perseus/commit/97e07c8baee12a37e471e8292dedbcf0588e2f50), [`dbd496769`](https://github.com/Khan/perseus/commit/dbd496769e210fc4aca33778a567a99ff1654e7e), [`3c4c6bc92`](https://github.com/Khan/perseus/commit/3c4c6bc9207f6f2d65312df1c2bd5bf5246182a2), [`c8e383b46`](https://github.com/Khan/perseus/commit/c8e383b469426182a1392ca6ad2cde21b61e2f40), [`564447af2`](https://github.com/Khan/perseus/commit/564447af2c030143c303c7ec88b055bab324fff1)]:
    -   @khanacademy/perseus-core@3.4.0
    -   @khanacademy/kmath@0.3.2
    -   @khanacademy/perseus-score@2.1.0
    -   @khanacademy/kas@0.4.13
    -   @khanacademy/keypad-context@1.0.16
    -   @khanacademy/math-input@22.2.3
    -   @khanacademy/perseus-linter@1.2.15
    -   @khanacademy/pure-markdown@0.3.24
    -   @khanacademy/simple-markdown@0.13.17

## 52.0.1

### Patch Changes

-   [#2160](https://github.com/Khan/perseus/pull/2160) [`26de8f41f`](https://github.com/Khan/perseus/commit/26de8f41f544d2f72ab05e2829ffe53309a74fa2) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: use translated strings in mapErrorToString

## 52.0.0

### Major Changes

-   [#1965](https://github.com/Khan/perseus/pull/1965) [`0f2bec314`](https://github.com/Khan/perseus/commit/0f2bec314518636e822e8ca0fc080209f4be8bfe) Thanks [@Myranae](https://github.com/Myranae)! - Refactor the LabelImage widget to separate out answers from userInput into scoringData

*   [#2134](https://github.com/Khan/perseus/pull/2134) [`117e78d03`](https://github.com/Khan/perseus/commit/117e78d03f29304274c1d7cc206743439f94d6ef) Thanks [@handeyeco](https://github.com/handeyeco)! - Move widget ID utils to perseus-core

-   [#2153](https://github.com/Khan/perseus/pull/2153) [`29a1c656e`](https://github.com/Khan/perseus/commit/29a1c656ee7f74b6eba8ce95fa9c239b2f328813) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Rename all instances of the term "ScoringData" back to "Rubric"

*   [#2135](https://github.com/Khan/perseus/pull/2135) [`7a984eba6`](https://github.com/Khan/perseus/commit/7a984eba6f1cec3df314ec245d2176f5db190548) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Expression WidgetOptions logic to core

### Minor Changes

-   [#2002](https://github.com/Khan/perseus/pull/2002) [`a1e22a4e3`](https://github.com/Khan/perseus/commit/a1e22a4e3cc752fb8b768d4441b9cf79e777b37f) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add and improve types for scoring and validation

*   [#2155](https://github.com/Khan/perseus/pull/2155) [`0df0b1940`](https://github.com/Khan/perseus/commit/0df0b194012627a98708cfcafd1ad5eb76ad91e2) Thanks [@benchristel](https://github.com/benchristel)! - Move `parsePerseusItem`, `parseAndMigratePerseusItem`,
    `parseAndMigratePerseusArticle`, `isSuccess`, and `isFailure` to the
    `perseus-core` package, and deprecate the equivalent exports from the `perseus`
    package.

-   [#2032](https://github.com/Khan/perseus/pull/2032) [`22d108fdc`](https://github.com/Khan/perseus/commit/22d108fdc1bd6cc6b150abae137e3716c5c59b92) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - adds aria labels to line segment

*   [#2038](https://github.com/Khan/perseus/pull/2038) [`e6f7cc91e`](https://github.com/Khan/perseus/commit/e6f7cc91ec9601bb7df7e8e6846349c114d09cd0) Thanks [@Myranae](https://github.com/Myranae)! - Fix some naming discrepancies related to validation and simplify Matcher ScoringData type

-   [#2083](https://github.com/Khan/perseus/pull/2083) [`4c10af109`](https://github.com/Khan/perseus/commit/4c10af109245ac10846ef1d0c6fad2a095c11d0b) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Use empty widgets check in scoring function

*   [#2000](https://github.com/Khan/perseus/pull/2000) [`0db68d222`](https://github.com/Khan/perseus/commit/0db68d2227118cf4de51c3ccad59b525be657cf3) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change empty widgets check in Renderer to depend only on data available (and not on scoring data)

-   [#2137](https://github.com/Khan/perseus/pull/2137) [`b4b3a3dbb`](https://github.com/Khan/perseus/commit/b4b3a3dbb5097b1225e9e5acdda254f2f1e66122) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the orderer widget

*   [#2006](https://github.com/Khan/perseus/pull/2006) [`879d2a501`](https://github.com/Khan/perseus/commit/879d2a501e25304bd715eb73a2d615a7d06d2cd9) Thanks [@Myranae](https://github.com/Myranae)! - Rename usages of rubric to scoringData

-   [#2139](https://github.com/Khan/perseus/pull/2139) [`32cc4a45b`](https://github.com/Khan/perseus/commit/32cc4a45bd2df34a0620729ca659a8aec6bcd62a) Thanks [@Myranae](https://github.com/Myranae)! - Implement a widget export function to filter out rubric data from widget options for the Expression widget

*   [#2016](https://github.com/Khan/perseus/pull/2016) [`55ad836c6`](https://github.com/Khan/perseus/commit/55ad836c6a65526762a0a9b189305941f2bc422f) Thanks [@Myranae](https://github.com/Myranae)! - Introduces a validation function for the label-image widget (extracted from label-image scoring function).

### Patch Changes

-   [#2142](https://github.com/Khan/perseus/pull/2142) [`d7bcb14c3`](https://github.com/Khan/perseus/commit/d7bcb14c398059be0be20bea118f9fee1dfc93f6) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Radio upgrade logic to Perseus Core

*   [#2122](https://github.com/Khan/perseus/pull/2122) [`1a75ca628`](https://github.com/Khan/perseus/commit/1a75ca628405dbd9cbe8ee21d7a9039a78327c47) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Type and test fixes for new MockWidget (isolating to be seen only in tests)

-   [#2143](https://github.com/Khan/perseus/pull/2143) [`459c25074`](https://github.com/Khan/perseus/commit/459c2507472f104f521b5410feaa64402d473a43) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Passage widgets upgrade logic to Perseus Core

*   [#1997](https://github.com/Khan/perseus/pull/1997) [`0464a760f`](https://github.com/Khan/perseus/commit/0464a760f3b6b49e30accde9b41a320dd2ea7bed) Thanks [@Myranae](https://github.com/Myranae)! - Remove unused CS Program rubric type

-   [#2110](https://github.com/Khan/perseus/pull/2110) [`e2f2cee9f`](https://github.com/Khan/perseus/commit/e2f2cee9fe39313885e7c6aaed963612f807caca) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Linear - Add the interactive elements linear description to the whole graph container

*   [#2136](https://github.com/Khan/perseus/pull/2136) [`ffaa3904a`](https://github.com/Khan/perseus/commit/ffaa3904aa885f29694bf1fd6348578c6ab3e19e) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Quadratic - add screen reader support for Quadratic interactive graph

-   [#1996](https://github.com/Khan/perseus/pull/1996) [`b6623bb56`](https://github.com/Khan/perseus/commit/b6623bb569c8776ad5bf4e770789e4b079e230e0) Thanks [@Myranae](https://github.com/Myranae)! - Remove unused iframe rubric type

*   [#2124](https://github.com/Khan/perseus/pull/2124) [`bdbdafe5d`](https://github.com/Khan/perseus/commit/bdbdafe5d66a76149624410a746909e4dc3a1ddc) Thanks [@dependabot](https://github.com/apps/dependabot)! - Updating wonder-blocks dependences.

-   [#2152](https://github.com/Khan/perseus/pull/2152) [`f8c9d3574`](https://github.com/Khan/perseus/commit/f8c9d35743d2e8ccf12875ef91498543e2015576) Thanks [@Myranae](https://github.com/Myranae)! - Move the categorizer, orderer, and expression public widget options functions from perseus package to their widget folders in perseus-core

*   [#1995](https://github.com/Khan/perseus/pull/1995) [`99cd254de`](https://github.com/Khan/perseus/commit/99cd254de354bbebf6b6ea84e0c33241d2a18763) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - TESTS: swap input-number out of renderer tests as it is deprecated

-   [#2141](https://github.com/Khan/perseus/pull/2141) [`1355d6cfc`](https://github.com/Khan/perseus/commit/1355d6cfcbd4cb44de3f05084744dbdefd19def8) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Measurer upgrade logic to Perseus Core

-   Updated dependencies [[`8f8955718`](https://github.com/Khan/perseus/commit/8f89557185f7bed910251520863ed1c8ed3a4410), [`d7bcb14c3`](https://github.com/Khan/perseus/commit/d7bcb14c398059be0be20bea118f9fee1dfc93f6), [`685774f2e`](https://github.com/Khan/perseus/commit/685774f2eae44e4cd5e0d6341a209012cf7e9bcb), [`8a489600e`](https://github.com/Khan/perseus/commit/8a489600e3b0b474da36cc492671879d1372ea46), [`1a75ca628`](https://github.com/Khan/perseus/commit/1a75ca628405dbd9cbe8ee21d7a9039a78327c47), [`459c25074`](https://github.com/Khan/perseus/commit/459c2507472f104f521b5410feaa64402d473a43), [`0df0b1940`](https://github.com/Khan/perseus/commit/0df0b194012627a98708cfcafd1ad5eb76ad91e2), [`dc8118aa1`](https://github.com/Khan/perseus/commit/dc8118aa1e28e77d78a57bc13e50d1954e3f8f69), [`82fa90299`](https://github.com/Khan/perseus/commit/82fa902999d9d79a050fe9acf0031ba886b387fa), [`b4b3a3dbb`](https://github.com/Khan/perseus/commit/b4b3a3dbb5097b1225e9e5acdda254f2f1e66122), [`117e78d03`](https://github.com/Khan/perseus/commit/117e78d03f29304274c1d7cc206743439f94d6ef), [`29a1c656e`](https://github.com/Khan/perseus/commit/29a1c656ee7f74b6eba8ce95fa9c239b2f328813), [`7a984eba6`](https://github.com/Khan/perseus/commit/7a984eba6f1cec3df314ec245d2176f5db190548), [`f8c9d3574`](https://github.com/Khan/perseus/commit/f8c9d35743d2e8ccf12875ef91498543e2015576), [`1355d6cfc`](https://github.com/Khan/perseus/commit/1355d6cfcbd4cb44de3f05084744dbdefd19def8), [`75f43a8f4`](https://github.com/Khan/perseus/commit/75f43a8f41739df4831e589e0a2724e1c7169312), [`32cc4a45b`](https://github.com/Khan/perseus/commit/32cc4a45bd2df34a0620729ca659a8aec6bcd62a), [`ebf3695b6`](https://github.com/Khan/perseus/commit/ebf3695b69c7526279ef1c999f13b4e24be885be)]:
    -   @khanacademy/perseus-core@3.3.0
    -   @khanacademy/perseus-score@2.0.0
    -   @khanacademy/kas@0.4.12
    -   @khanacademy/keypad-context@1.0.15
    -   @khanacademy/kmath@0.3.1
    -   @khanacademy/math-input@22.2.2
    -   @khanacademy/perseus-linter@1.2.14
    -   @khanacademy/pure-markdown@0.3.23
    -   @khanacademy/simple-markdown@0.13.16

## 51.0.1

### Patch Changes

-   [#2131](https://github.com/Khan/perseus/pull/2131) [`cb15921b8`](https://github.com/Khan/perseus/commit/cb15921b8bdfd850c40610b4df5c9919a668a2a1) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix localized string templates for two the ray interactive graph type

## 51.0.0

### Major Changes

-   [#2101](https://github.com/Khan/perseus/pull/2101) [`9cabe689a`](https://github.com/Khan/perseus/commit/9cabe689a7aa143f95adf4556bf5c10d654a66ae) Thanks [@handeyeco](https://github.com/handeyeco)! - Move scorers and validators to `perseus-score`

### Minor Changes

-   [#2127](https://github.com/Khan/perseus/pull/2127) [`6f2813cfc`](https://github.com/Khan/perseus/commit/6f2813cfcb6bce063d8f0f8f66219ce0123aac66) Thanks [@benchristel](https://github.com/benchristel)! - Avoid adding undefined values to objects parsed from Perseus JSON when properties are missing.

### Patch Changes

-   [#2130](https://github.com/Khan/perseus/pull/2130) [`165305e11`](https://github.com/Khan/perseus/commit/165305e11c5ba196e1a2a9c4fd814d387d34dc55) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change interactive-graph visual regression stories to Storybook's CSF v3

*   [#2077](https://github.com/Khan/perseus/pull/2077) [`faccc2d59`](https://github.com/Khan/perseus/commit/faccc2d5959a4a7051720f7a3dfe4a4875b6ace9) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Enable the exhaustive test tool for parsePerseusItem to test articles.

-   [#2030](https://github.com/Khan/perseus/pull/2030) [`d96821e08`](https://github.com/Khan/perseus/commit/d96821e08b3f80eb0a277882f4a8a40330b27adc) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Linear System - add screen reader support for Linear System interactive graph

*   [#2036](https://github.com/Khan/perseus/pull/2036) [`0f8d11c0b`](https://github.com/Khan/perseus/commit/0f8d11c0b8c00a10eb49f2d84b664803c5c83f3f) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Ray graph - Add screen reader support for Ray interactive graph

-   [#2109](https://github.com/Khan/perseus/pull/2109) [`41ffd4a71`](https://github.com/Khan/perseus/commit/41ffd4a71673399657d7024c206af4fa4e0be267) Thanks [@dependabot](https://github.com/apps/dependabot)! - Updating our wonder-blocks packages with the latest versions.

-   Updated dependencies [[`9cabe689a`](https://github.com/Khan/perseus/commit/9cabe689a7aa143f95adf4556bf5c10d654a66ae), [`41ffd4a71`](https://github.com/Khan/perseus/commit/41ffd4a71673399657d7024c206af4fa4e0be267)]:
    -   @khanacademy/kmath@0.3.0
    -   @khanacademy/perseus-core@3.2.0
    -   @khanacademy/perseus-score@1.1.0
    -   @khanacademy/math-input@22.2.1
    -   @khanacademy/kas@0.4.11
    -   @khanacademy/keypad-context@1.0.14
    -   @khanacademy/perseus-linter@1.2.13
    -   @khanacademy/pure-markdown@0.3.22
    -   @khanacademy/simple-markdown@0.13.15

## 50.1.0

### Minor Changes

-   [#2092](https://github.com/Khan/perseus/pull/2092) [`600bf6acb`](https://github.com/Khan/perseus/commit/600bf6acbbf76817e3bf7893f8f85188a538bd6a) Thanks [@Myranae](https://github.com/Myranae)! - Introduce a widget export function to filter out scoring data from widget options. Implement this function for the categorizer widget.

*   [#2103](https://github.com/Khan/perseus/pull/2103) [`01caf5f31`](https://github.com/Khan/perseus/commit/01caf5f3111d84cf37dffc45012f21860d1648b1) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - revert wb versions

### Patch Changes

-   [#2097](https://github.com/Khan/perseus/pull/2097) [`7ed21f49e`](https://github.com/Khan/perseus/commit/7ed21f49ee0cccbb40f200903a7fdfb9c2c0389b) Thanks [@nishasy](https://github.com/nishasy)! - [SR][locked figures] Give all locked figures "img" role

*   [#2104](https://github.com/Khan/perseus/pull/2104) [`ce67b0f0a`](https://github.com/Khan/perseus/commit/ce67b0f0a823c09c1c942220d93eca20aa8a963f) Thanks [@handeyeco](https://github.com/handeyeco)! - Handle error codes better in Graded Group

*   Updated dependencies [[`01caf5f31`](https://github.com/Khan/perseus/commit/01caf5f3111d84cf37dffc45012f21860d1648b1)]:
    -   @khanacademy/math-input@22.2.0

## 50.0.0

### Major Changes

-   [#2093](https://github.com/Khan/perseus/pull/2093) [`766d33577`](https://github.com/Khan/perseus/commit/766d33577a5ea83ef8f8c291534eb34833c54197) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove exports from Perseus that were moved to Perseus-Core

*   [#2086](https://github.com/Khan/perseus/pull/2086) [`bc3d955b5`](https://github.com/Khan/perseus/commit/bc3d955b57e847a379328fcc7cf276f42e0874dd) Thanks [@handeyeco](https://github.com/handeyeco)! - Init perseus-score, move AnswerTypes from perseus to perseus-score, move perseus-types in perseus to data-schema in perseus-core

### Minor Changes

-   [#2082](https://github.com/Khan/perseus/pull/2082) [`bbf7f3b1b`](https://github.com/Khan/perseus/commit/bbf7f3b1be657c588270a3b47983c0aecbf84418) Thanks [@benchristel](https://github.com/benchristel)! - Enable parsePerseusItem to parse all published content, upgrading old formats to the current one.

*   [#2085](https://github.com/Khan/perseus/pull/2085) [`72fb7ecd3`](https://github.com/Khan/perseus/commit/72fb7ecd35fa302b88a051af4f1380f513e53b21) Thanks [@benchristel](https://github.com/benchristel)! - Deprecates `parsePerseusItem()` in favor of typesafe `parseAndMigratePerseusItem()` and `parseAndMigratePerseusArticle()` functions.

-   [#2053](https://github.com/Khan/perseus/pull/2053) [`5173c2e43`](https://github.com/Khan/perseus/commit/5173c2e43bf939159f420dcd448b90691d52353b) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Adding new interactive graph marking type, axes.

### Patch Changes

-   [#2062](https://github.com/Khan/perseus/pull/2062) [`785908077`](https://github.com/Khan/perseus/commit/78590807708e3d8745ac99440dbeb96b7d3d42bd) Thanks [@nishasy](https://github.com/nishasy)! - [SR][sr tree] Add screen reader tree to interactive graph editor

*   [#2060](https://github.com/Khan/perseus/pull/2060) [`43e99d28d`](https://github.com/Khan/perseus/commit/43e99d28d90ead605fb2319c9b6b9982cdbc6edd) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Circle - Add interactive Circle element to full graph description

-   [#2072](https://github.com/Khan/perseus/pull/2072) [`6cf647729`](https://github.com/Khan/perseus/commit/6cf6477291053d85faac48028b8f038fd0c28930) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - The creation of a new Mock Widget for tests.

*   [#2088](https://github.com/Khan/perseus/pull/2088) [`d2797bb2d`](https://github.com/Khan/perseus/commit/d2797bb2dc51bd80cb03f2c1eeb39286e4dfa45c) Thanks [@handeyeco](https://github.com/handeyeco)! - Move objective\_ helpers into perseus-core

*   Updated dependencies [[`bbf7f3b1b`](https://github.com/Khan/perseus/commit/bbf7f3b1be657c588270a3b47983c0aecbf84418), [`6cf647729`](https://github.com/Khan/perseus/commit/6cf6477291053d85faac48028b8f038fd0c28930), [`5173c2e43`](https://github.com/Khan/perseus/commit/5173c2e43bf939159f420dcd448b90691d52353b), [`bc3d955b5`](https://github.com/Khan/perseus/commit/bc3d955b57e847a379328fcc7cf276f42e0874dd), [`d2797bb2d`](https://github.com/Khan/perseus/commit/d2797bb2dc51bd80cb03f2c1eeb39286e4dfa45c)]:
    -   @khanacademy/perseus-core@3.1.0
    -   @khanacademy/pure-markdown@0.3.21
    -   @khanacademy/perseus-score@1.0.0
    -   @khanacademy/kmath@0.2.0
    -   @khanacademy/kas@0.4.10
    -   @khanacademy/keypad-context@1.0.13
    -   @khanacademy/math-input@22.1.2
    -   @khanacademy/perseus-linter@1.2.12
    -   @khanacademy/simple-markdown@0.13.14

## 49.2.2

### Patch Changes

-   [#2057](https://github.com/Khan/perseus/pull/2057) [`2dc22def4`](https://github.com/Khan/perseus/commit/2dc22def44b7616ad739d2c5a575b83bd6362949) Thanks [@dependabot](https://github.com/apps/dependabot)! - update wonderblocks dependencies

*   [#2076](https://github.com/Khan/perseus/pull/2076) [`92a741701`](https://github.com/Khan/perseus/commit/92a741701e00f79bcd5f35640d686fac7e858cd5) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - removes context and message properties from IG perseus strings

*   Updated dependencies [[`2dc22def4`](https://github.com/Khan/perseus/commit/2dc22def44b7616ad739d2c5a575b83bd6362949)]:
    -   @khanacademy/math-input@22.1.1

## 49.2.1

### Patch Changes

-   [#2064](https://github.com/Khan/perseus/pull/2064) [`55b4615d3`](https://github.com/Khan/perseus/commit/55b4615d3297884d90e6ef4640f7202066334b0d) Thanks [@nishasy](https://github.com/nishasy)! - Remove the locked-figures-aria flag

*   [#2063](https://github.com/Khan/perseus/pull/2063) [`85a5b5e44`](https://github.com/Khan/perseus/commit/85a5b5e4408b19a598107468d7cb0bd10e33b6be) Thanks [@nishasy](https://github.com/nishasy)! - Remove the interactive-graph-locked-features-labels flag

-   [#2078](https://github.com/Khan/perseus/pull/2078) [`781cc7df6`](https://github.com/Khan/perseus/commit/781cc7df65a80e03d3cb809ccf585cb6cf25556e) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Temporarily fixing pi-based strings for Numeric Input

*   [#2065](https://github.com/Khan/perseus/pull/2065) [`eefcf5c5c`](https://github.com/Khan/perseus/commit/eefcf5c5c434455295e17bf4cb411d029f24fe49) Thanks [@nishasy](https://github.com/nishasy)! - Remove the locked-[figureName]-labels flags

-   [#2068](https://github.com/Khan/perseus/pull/2068) [`265a93104`](https://github.com/Khan/perseus/commit/265a9310486e5c1524af9b502619db9de2f7c01d) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Redesign discriminated union type parser to have a simpler and more intuitive interface.

*   [#2073](https://github.com/Khan/perseus/pull/2073) [`4bf4960d4`](https://github.com/Khan/perseus/commit/4bf4960d4d88abf9fe07803f1364678a29a20f6e) Thanks [@benchristel](https://github.com/benchristel)! - Internal: improve Perseus JSON parsers so they can handle all English-language exercises

-   [#2080](https://github.com/Khan/perseus/pull/2080) [`c9a28b34c`](https://github.com/Khan/perseus/commit/c9a28b34c66fdf25d2b0ef8fa1111a5fb97854da) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [Dropdown] Bugfix - Text in dropdown not in correct vertical position

*   [#2073](https://github.com/Khan/perseus/pull/2073) [`4bf4960d4`](https://github.com/Khan/perseus/commit/4bf4960d4d88abf9fe07803f1364678a29a20f6e) Thanks [@benchristel](https://github.com/benchristel)! - Internal: improve the error messages produced by the versionedWidgetOptions parser

## 49.2.0

### Minor Changes

-   [#1990](https://github.com/Khan/perseus/pull/1990) [`37c642f24`](https://github.com/Khan/perseus/commit/37c642f24e645db954895510ba40bede94e09889) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Allow keyboards to navigate and interact with images

*   [#1738](https://github.com/Khan/perseus/pull/1738) [`dbbc82f2d`](https://github.com/Khan/perseus/commit/dbbc82f2dd33545b12c6073174b05ebcf8d551ba) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - add scientific notation button / toggle to basic keypad

### Patch Changes

-   [#2061](https://github.com/Khan/perseus/pull/2061) [`d8b2f7eaf`](https://github.com/Khan/perseus/commit/d8b2f7eaff83062516ad1e273c17fd6579716265) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - update terminology for angle sides

*   [#2071](https://github.com/Khan/perseus/pull/2071) [`bac10129b`](https://github.com/Khan/perseus/commit/bac10129b523d61904a88ef3c7dbfcad2bd18750) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - This patch fixes our Perseus strings to ensure that they are double escaped for Lingui.

-   [#1952](https://github.com/Khan/perseus/pull/1952) [`617377147`](https://github.com/Khan/perseus/commit/61737714796dfb8434fc139471d1add3c18853b3) Thanks [@benchristel](https://github.com/benchristel)! - Internal: add and pass more regression tests for PerseusItem parser

*   [#2059](https://github.com/Khan/perseus/pull/2059) [`53ba9f5d1`](https://github.com/Khan/perseus/commit/53ba9f5d136f817257188ccf2696a8b91896ba72) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [Dropdown] Bugfix - Text in dropdown was shifted up after adding TeX support via Renderer

*   Updated dependencies [[`dbbc82f2d`](https://github.com/Khan/perseus/commit/dbbc82f2dd33545b12c6073174b05ebcf8d551ba)]:
    -   @khanacademy/math-input@22.1.0

## 49.1.7

### Patch Changes

-   [#2054](https://github.com/Khan/perseus/pull/2054) [`f23b383e7`](https://github.com/Khan/perseus/commit/f23b383e797a522ddee064c79e582467dfc08f94) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [Dropdown] Bugfix - Render options and placeholder inline

## 49.1.6

### Patch Changes

-   Updated dependencies [[`9c17ab518`](https://github.com/Khan/perseus/commit/9c17ab5188052bb0f42de615e48af1a7439f2770)]:
    -   @khanacademy/kmath@0.1.24

## 49.1.5

### Patch Changes

-   Updated dependencies [[`4345801bf`](https://github.com/Khan/perseus/commit/4345801bfc09942e0d6dc0459d1e4d53c4f57561)]:
    -   @khanacademy/keypad-context@1.0.12
    -   @khanacademy/math-input@22.0.7

## 49.1.4

### Patch Changes

-   [#2045](https://github.com/Khan/perseus/pull/2045) [`57f9056f8`](https://github.com/Khan/perseus/commit/57f9056f82775e80a15d9097a8d85df4bc37343a) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Version bump to verify release protections

## 49.1.3

### Patch Changes

-   [#2040](https://github.com/Khan/perseus/pull/2040) [`1496a7a93`](https://github.com/Khan/perseus/commit/1496a7a93ef691c8e34da309c10cb77d35627bf3) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Bump versions to fix release

-   Updated dependencies [[`1496a7a93`](https://github.com/Khan/perseus/commit/1496a7a93ef691c8e34da309c10cb77d35627bf3)]:
    -   @khanacademy/kas@0.4.9
    -   @khanacademy/keypad-context@1.0.11
    -   @khanacademy/kmath@0.1.23
    -   @khanacademy/math-input@22.0.6
    -   @khanacademy/perseus-core@3.0.5
    -   @khanacademy/perseus-linter@1.2.11
    -   @khanacademy/pure-markdown@0.3.20
    -   @khanacademy/simple-markdown@0.13.13

## 49.1.2

### Patch Changes

-   [#2034](https://github.com/Khan/perseus/pull/2034) [`8e9b2395d`](https://github.com/Khan/perseus/commit/8e9b2395d733b9831b3eefc064e9077341c145f5) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Removing final usage of createReactClass.

*   [#2025](https://github.com/Khan/perseus/pull/2025) [`b52310d1b`](https://github.com/Khan/perseus/commit/b52310d1bacd5c4e9844bb9094edc02307106af3) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Linear graph - add grab handle description and aria lives

-   [#2037](https://github.com/Khan/perseus/pull/2037) [`b80e7882b`](https://github.com/Khan/perseus/commit/b80e7882bf58f8e71cbf9482585577032c317428) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Nothing has changed, but our action requires a changeset per package and I don't know how to do an infrastructure update like this and pass that check

*   [#2033](https://github.com/Khan/perseus/pull/2033) [`881c0aac3`](https://github.com/Khan/perseus/commit/881c0aac33b5425efffc4d191f6c0c031f3a9127) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph][axis labels] Make default x & y axis labels TeX on load

*   Updated dependencies [[`b80e7882b`](https://github.com/Khan/perseus/commit/b80e7882bf58f8e71cbf9482585577032c317428)]:
    -   @khanacademy/kas@0.4.8
    -   @khanacademy/keypad-context@1.0.10
    -   @khanacademy/kmath@0.1.22
    -   @khanacademy/math-input@22.0.5
    -   @khanacademy/perseus-core@3.0.4
    -   @khanacademy/perseus-linter@1.2.10
    -   @khanacademy/pure-markdown@0.3.19
    -   @khanacademy/simple-markdown@0.13.12

## 49.1.1

### Patch Changes

-   [#2028](https://github.com/Khan/perseus/pull/2028) [`762b295ec`](https://github.com/Khan/perseus/commit/762b295eccd7d0dbc344edd271d3300b506adb93) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Forcing release

-   Updated dependencies [[`762b295ec`](https://github.com/Khan/perseus/commit/762b295eccd7d0dbc344edd271d3300b506adb93)]:
    -   @khanacademy/kas@0.4.7
    -   @khanacademy/keypad-context@1.0.9
    -   @khanacademy/kmath@0.1.21
    -   @khanacademy/math-input@22.0.4
    -   @khanacademy/perseus-core@3.0.3
    -   @khanacademy/perseus-linter@1.2.9
    -   @khanacademy/pure-markdown@0.3.18
    -   @khanacademy/simple-markdown@0.13.11

## 49.1.0

### Minor Changes

-   [#2020](https://github.com/Khan/perseus/pull/2020) [`78c5a77ce`](https://github.com/Khan/perseus/commit/78c5a77ce17c5392e5c8ebb1fff8e2ed8a69a0c1) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - add aria label and description to angle graph

### Patch Changes

-   [#1994](https://github.com/Khan/perseus/pull/1994) [`37dc680b4`](https://github.com/Khan/perseus/commit/37dc680b4415c9c75bcda39e0440ded55d24d4a1) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Add aria label to angle graph

*   [#2027](https://github.com/Khan/perseus/pull/2027) [`368e222a6`](https://github.com/Khan/perseus/commit/368e222a6577dff38143d1584d6773129e8abbd7) Thanks [@handeyeco](https://github.com/handeyeco)! - Bump all packages to reset releases

*   Updated dependencies [[`368e222a6`](https://github.com/Khan/perseus/commit/368e222a6577dff38143d1584d6773129e8abbd7)]:
    -   @khanacademy/kas@0.4.6
    -   @khanacademy/keypad-context@1.0.8
    -   @khanacademy/kmath@0.1.20
    -   @khanacademy/math-input@22.0.3
    -   @khanacademy/perseus-core@3.0.2
    -   @khanacademy/perseus-linter@1.2.8
    -   @khanacademy/pure-markdown@0.3.17
    -   @khanacademy/simple-markdown@0.13.10

## 49.0.3

### Patch Changes

-   [#1810](https://github.com/Khan/perseus/pull/1810) [`e21ead80e`](https://github.com/Khan/perseus/commit/e21ead80e7cf467a2003fc145bfa1f65973eb270) Thanks [@daniellewhyte](https://github.com/daniellewhyte)! - Update Dropdown widget to support displaying TeX

*   [#2023](https://github.com/Khan/perseus/pull/2023) [`51386d6e0`](https://github.com/Khan/perseus/commit/51386d6e0b454942cb550036072669fc01e769c2) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Linear graph - add full graph aria label and description

*   Updated dependencies [[`e21ead80e`](https://github.com/Khan/perseus/commit/e21ead80e7cf467a2003fc145bfa1f65973eb270)]:
    -   @khanacademy/math-input@22.0.2
    -   @khanacademy/perseus-core@3.0.1
    -   @khanacademy/kas@0.4.5
    -   @khanacademy/keypad-context@1.0.7
    -   @khanacademy/kmath@0.1.19
    -   @khanacademy/perseus-linter@1.2.7
    -   @khanacademy/pure-markdown@0.3.16
    -   @khanacademy/simple-markdown@0.13.9

## 49.0.2

### Patch Changes

-   [#2017](https://github.com/Khan/perseus/pull/2017) [`4508e7bea`](https://github.com/Khan/perseus/commit/4508e7bea859957eea296a3fc25180c66098dbb4) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Minor improvements to Circle graph SR strings

*   [#2022](https://github.com/Khan/perseus/pull/2022) [`266d240ed`](https://github.com/Khan/perseus/commit/266d240ed01f9b32242d150414e18fcfa8bd5230) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Update to Wonder Blocks without custom ID generation API

-   [#2018](https://github.com/Khan/perseus/pull/2018) [`1fe437079`](https://github.com/Khan/perseus/commit/1fe43707954ba7e35a42747dc1392fb2972fc7b1) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixing scoring for unlimited point to ensure there 1 or more points for it to be considered scorable.

-   Updated dependencies [[`266d240ed`](https://github.com/Khan/perseus/commit/266d240ed01f9b32242d150414e18fcfa8bd5230)]:
    -   @khanacademy/math-input@22.0.1

## 49.0.1

### Patch Changes

-   [#2014](https://github.com/Khan/perseus/pull/2014) [`763d2d0f1`](https://github.com/Khan/perseus/commit/763d2d0f14e3aade030b1ef0aa28c3895c17b685) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Migrate off deprecated ID generation APIs

*   [#2009](https://github.com/Khan/perseus/pull/2009) [`b09d19b7b`](https://github.com/Khan/perseus/commit/b09d19b7b1723f79e4fad63ef2efcef3cc702792) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixing bug in creating concave shapes in unlimited polygons.

-   [#1978](https://github.com/Khan/perseus/pull/1978) [`81632c326`](https://github.com/Khan/perseus/commit/81632c3262737c1219663fbdd54000ba1fdcf4eb) Thanks [@nishasy](https://github.com/nishasy)! - [Polygon] Remove duplicate points when determining if a polygon can be closed

*   [#1999](https://github.com/Khan/perseus/pull/1999) [`278527b08`](https://github.com/Khan/perseus/commit/278527b08701cd8424728c6b5915408cc16a07a0) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixing open polygon scoring issues within exercises and editors.

## 49.0.0

### Major Changes

-   [#2007](https://github.com/Khan/perseus/pull/2007) [`ea1bf0c2c`](https://github.com/Khan/perseus/commit/ea1bf0c2cfc7ae552d039549950d1973b56f5ca9) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Update to latest webapp dependencies and prepare for deprecation of custom WB ID generators

### Patch Changes

-   Updated dependencies [[`ea1bf0c2c`](https://github.com/Khan/perseus/commit/ea1bf0c2cfc7ae552d039549950d1973b56f5ca9)]:
    -   @khanacademy/math-input@22.0.0
    -   @khanacademy/perseus-core@3.0.0
    -   @khanacademy/kas@0.4.4
    -   @khanacademy/keypad-context@1.0.6
    -   @khanacademy/kmath@0.1.18
    -   @khanacademy/perseus-linter@1.2.6
    -   @khanacademy/pure-markdown@0.3.15
    -   @khanacademy/simple-markdown@0.13.8

## 48.2.0

### Minor Changes

-   [#2001](https://github.com/Khan/perseus/pull/2001) [`ac07da03c`](https://github.com/Khan/perseus/commit/ac07da03cb332f9dd9ebf82820e409b9fb0844be) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Undoing changes to svg-image

*   [#2004](https://github.com/Khan/perseus/pull/2004) [`2135e0dc3`](https://github.com/Khan/perseus/commit/2135e0dc3eddde1b3c842223e10e1ee94823c7e7) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fix for svg-image loading issues.

### Patch Changes

-   [#1928](https://github.com/Khan/perseus/pull/1928) [`09d906cd2`](https://github.com/Khan/perseus/commit/09d906cd289a886bdc92b8a5df65ccbc8ad3f29e) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Add screenreader support for circle graph

*   [#1993](https://github.com/Khan/perseus/pull/1993) [`99e55b623`](https://github.com/Khan/perseus/commit/99e55b623deef244f99b554d8aa7ef0fb45a4bbb) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Internal: introduce `ValidationResult` for use in validation functions

## 48.1.0

### Minor Changes

-   [#1988](https://github.com/Khan/perseus/pull/1988) [`cc9d3a4bc`](https://github.com/Khan/perseus/commit/cc9d3a4bc8866bbdaa09e2bf3fdb321fb9a125c1) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Hiding graphie labels from screen readers.

*   [#1983](https://github.com/Khan/perseus/pull/1983) [`2748a1ff8`](https://github.com/Khan/perseus/commit/2748a1ff82b5e04b12f6b740b29b5e01a0561882) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Updating how svg-image loads data

## 48.0.0

### Major Changes

-   [#1973](https://github.com/Khan/perseus/pull/1973) [`f9906728c`](https://github.com/Khan/perseus/commit/f9906728c1a8f09c91c11d824718b8a06d6a7609) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove `scoreInput` from ServerItemRenderer

*   [#1973](https://github.com/Khan/perseus/pull/1973) [`f9906728c`](https://github.com/Khan/perseus/commit/f9906728c1a8f09c91c11d824718b8a06d6a7609) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove `guessAndScore` from Renderer

### Patch Changes

-   [#1971](https://github.com/Khan/perseus/pull/1971) [`341d316aa`](https://github.com/Khan/perseus/commit/341d316aa8727ebb9e7fde28fc4e2d8779aa3e82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Move to using optional chaining in a few places to resolve new lint rule violations.

*   [#1984](https://github.com/Khan/perseus/pull/1984) [`990a3170c`](https://github.com/Khan/perseus/commit/990a3170c2111ddc2c6e6f8f6420a4908cc71c82) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixed crashing behavior that occurs in when selecting "unlimited" in polygon option of interactive graph editor.

*   Updated dependencies [[`f9906728c`](https://github.com/Khan/perseus/commit/f9906728c1a8f09c91c11d824718b8a06d6a7609), [`341d316aa`](https://github.com/Khan/perseus/commit/341d316aa8727ebb9e7fde28fc4e2d8779aa3e82)]:
    -   @khanacademy/perseus-core@2.0.0
    -   @khanacademy/kas@0.4.3
    -   @khanacademy/keypad-context@1.0.5
    -   @khanacademy/kmath@0.1.17
    -   @khanacademy/math-input@21.1.7
    -   @khanacademy/perseus-linter@1.2.5
    -   @khanacademy/pure-markdown@0.3.14
    -   @khanacademy/simple-markdown@0.13.7

## 47.0.1

### Patch Changes

-   [#1975](https://github.com/Khan/perseus/pull/1975) [`335615bab`](https://github.com/Khan/perseus/commit/335615bab18685aa6331c7628c1225bdecc54aab) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Make all types in `perseus-types.ts` originate from it (no longer import Mafs types)

*   [#1953](https://github.com/Khan/perseus/pull/1953) [`acd8bd566`](https://github.com/Khan/perseus/commit/acd8bd56664c6a0849bf3d532be8978115a97dfd) Thanks [@daniellewhyte](https://github.com/daniellewhyte)! - [Dropdown] Change logic for aria-label

## 47.0.0

### Major Changes

-   [#1955](https://github.com/Khan/perseus/pull/1955) [`e7b4db0bf`](https://github.com/Khan/perseus/commit/e7b4db0bf193241a36508804dd6e58c729f0a3db) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove support for MultiRenderer

## 46.0.1

### Patch Changes

-   [#1966](https://github.com/Khan/perseus/pull/1966) [`e22a931d9`](https://github.com/Khan/perseus/commit/e22a931d987291258b66f2c80db3536970a4555d) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [Numeric Input] - BUGFIX - Adjust color contrast of tooltip text

## 46.0.0

### Major Changes

-   [#1962](https://github.com/Khan/perseus/pull/1962) [`435280ac4`](https://github.com/Khan/perseus/commit/435280ac4cf33ee98ddb1166631f87f81cafa0fc) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Move scoring utility functions out of `Util` object into their own file and only export externally used function (`keScoreFromPerseusScore`)

*   [#1961](https://github.com/Khan/perseus/pull/1961) [`d93e3ecde`](https://github.com/Khan/perseus/commit/d93e3ecdeb6bd714a35dcd9f886299fa80ba71ec) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove deprecated/unused `examples()` function from `Renderer`

## 45.1.0

### Minor Changes

-   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Introduces a validation function for the number line widget (extracted from the scoring function).

*   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Changes the PerseusWidgetsMap to be extensible so that widgets can be registered outside of Perseus and still have full type safety.

-   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - [Numeric Input] - Update the UI to match Expression widget

### Patch Changes

-   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - TypeScript fixes

*   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Refactor internally used object mapping utilities to use ES6 exports

-   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Type fixes

*   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Ensure that zoomed-in images retain alt text

-   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - [Numeric Input] - Show format options as a list

*   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Minor refactoring of ServerItemRenderer's componentDidUpdate to reduce duplication

-   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Refactor scoring for `group` widget to follow the same pattern as all other widgets

*   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - [Numeric Input] - Associate format options tooltip content with input field for assistive technologies

-   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add global styles to reflect prod styling

*   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Internal: convert backgroundImage dimensions to numbers during parsing.

-   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Improve comments on some Perseus types

*   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Internal: add and pass regression tests for PerseusItem parser's handling of legacy data

## 45.0.0

### Major Changes

-   [#1910](https://github.com/Khan/perseus/pull/1910) [`0a44d468d`](https://github.com/Khan/perseus/commit/0a44d468dd127bf15dc32e720b9b0301af41a572) Thanks [@handeyeco](https://github.com/handeyeco)! - Change ServerItemRenderer scoring APIs to externalize scoring

## 44.0.0

### Major Changes

-   [#1930](https://github.com/Khan/perseus/pull/1930) [`834bd8bfb`](https://github.com/Khan/perseus/commit/834bd8bfbc063d0a1935ae9a697e5505c5ee606d) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove PerseusExampleWidgetOptions, PerseusSimpleMarkdownTesterWidgetOptions, and PerseusExampleWidgetOptions types - widgets no longer exist

### Minor Changes

-   [#1845](https://github.com/Khan/perseus/pull/1845) [`066daab0e`](https://github.com/Khan/perseus/commit/066daab0ea8463e8b2a5381e90ed8392ea20a5bf) Thanks [@daniellewhyte](https://github.com/daniellewhyte)! - Add labels to Dropdown widget

### Patch Changes

-   [#1904](https://github.com/Khan/perseus/pull/1904) [`83b1beab8`](https://github.com/Khan/perseus/commit/83b1beab86dd9e7ee1e1760c4fad4be9f2ff5a71) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Upgrade Storybook to v8.x

*   [#1925](https://github.com/Khan/perseus/pull/1925) [`89244ccc0`](https://github.com/Khan/perseus/commit/89244ccc0d7384d7f76678204cd49dd7e8301185) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove some uses of findDOMNode

*   Updated dependencies [[`83b1beab8`](https://github.com/Khan/perseus/commit/83b1beab86dd9e7ee1e1760c4fad4be9f2ff5a71)]:
    -   @khanacademy/math-input@21.1.6

## 43.1.0

### Minor Changes

-   [#1898](https://github.com/Khan/perseus/pull/1898) [`3a9b5921b`](https://github.com/Khan/perseus/commit/3a9b5921bff7ae038f59ecb6817babd2b21df0bb) Thanks [@Myranae](https://github.com/Myranae)! - Introduces a validation function for the dropdown widget (extracted from dropdown scoring function).

*   [#1862](https://github.com/Khan/perseus/pull/1862) [`451de899f`](https://github.com/Khan/perseus/commit/451de899fd3d40bf415cb2318048e90fb1e6670f) Thanks [@Myranae](https://github.com/Myranae)! - Split out validation function for the `categorizer` widget. This can be used to check if the user selected an answer for every row, confirming the question is ready to be scored.

-   [#1882](https://github.com/Khan/perseus/pull/1882) [`40d2ebb75`](https://github.com/Khan/perseus/commit/40d2ebb75fdadfb361330236e0fb9e54a32d0fc2) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Introduces a validation function for the numeric-input widget (extracted from numeric-input scoring function).

*   [#1899](https://github.com/Khan/perseus/pull/1899) [`2437ce61b`](https://github.com/Khan/perseus/commit/2437ce61bae1aef2db28e89956aa73463ada16cc) Thanks [@Myranae](https://github.com/Myranae)! - Introduces a validation function for the plotter widget (extracted from the scoring function).

-   [#1869](https://github.com/Khan/perseus/pull/1869) [`f43edd42c`](https://github.com/Khan/perseus/commit/f43edd42ccfacd1500d2f73ccb0d3f8dce777173) Thanks [@Myranae](https://github.com/Myranae)! - Split out validation function for the `orderer` widget. This can be used to check if the user has ordered at least one option, confirming the question is ready to be scored.

*   [#1902](https://github.com/Khan/perseus/pull/1902) [`0cec7628c`](https://github.com/Khan/perseus/commit/0cec7628c4a061f14b126fd1e3dab6df45fc0178) Thanks [@Myranae](https://github.com/Myranae)! - Introduces a validation function for the radio widget (extracted from the scoring function), though not all validation logic can be extracted.

-   [#1876](https://github.com/Khan/perseus/pull/1876) [`0bd4270ad`](https://github.com/Khan/perseus/commit/0bd4270ade576bec1ac0c86b251f972a2c354056) Thanks [@Myranae](https://github.com/Myranae)! - Split out validation function for the `sorter` widget. This can be used to check if the user has made any changes to the sorting order, confirming whether or not the question can be scored.

### Patch Changes

-   [#1907](https://github.com/Khan/perseus/pull/1907) [`3dbca965a`](https://github.com/Khan/perseus/commit/3dbca965a2bbaa2d980c1cc4c439469157e0bd33) Thanks [@benchristel](https://github.com/benchristel)! - Internal: add and pass regression tests for `PerseusItem` parser.

*   [#1915](https://github.com/Khan/perseus/pull/1915) [`ee09e9fc0`](https://github.com/Khan/perseus/commit/ee09e9fc0ad5eb65340d0f1cbe240741ebfcd3c3) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove use of findDOMNode in number-input component

-   [#1920](https://github.com/Khan/perseus/pull/1920) [`88ba71bef`](https://github.com/Khan/perseus/commit/88ba71bef0cdd75fa0c8b467dcea2cccc637d034) Thanks [@handeyeco](https://github.com/handeyeco)! - Fix some file-wide error suppressions

*   [#1919](https://github.com/Khan/perseus/pull/1919) [`64ea2ee86`](https://github.com/Khan/perseus/commit/64ea2ee86264a20f1d0e34968831945fea8ed36b) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove usage of findDOMNode in text-input component

-   [#1906](https://github.com/Khan/perseus/pull/1906) [`799ffe4a5`](https://github.com/Khan/perseus/commit/799ffe4a50e3e3bc435d0ef96388c1e8fae2167d) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - update moveable point component and use control point method to have optional params

*   [#1895](https://github.com/Khan/perseus/pull/1895) [`841551a65`](https://github.com/Khan/perseus/commit/841551a65732a276266690ddaaa51a3810398d03) Thanks [@benchristel](https://github.com/benchristel)! - Internal: remove unused fields from `answerArea` when parsing `PerseusItem`s.

-   [#1921](https://github.com/Khan/perseus/pull/1921) [`8ec06f444`](https://github.com/Khan/perseus/commit/8ec06f444d8f4559eda5c3dbf189e5183b1c5b42) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Inline widget version into Expression widget parser.

*   [#1914](https://github.com/Khan/perseus/pull/1914) [`3e98b7cd3`](https://github.com/Khan/perseus/commit/3e98b7cd300052eeacbe9fcdbd312091c678107b) Thanks [@handeyeco](https://github.com/handeyeco)! - Add tests for propUpgrades functions (and remove underscore usage)

-   [#1908](https://github.com/Khan/perseus/pull/1908) [`7f2866cf4`](https://github.com/Khan/perseus/commit/7f2866cf401aa4fc7a3b2b15d8cdc247a953e9f8) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Migrate expression widget options to the latest version in parseAndTypecheckPerseusItem (not yet used in production).

-   Updated dependencies [[`88ba71bef`](https://github.com/Khan/perseus/commit/88ba71bef0cdd75fa0c8b467dcea2cccc637d034)]:
    -   @khanacademy/kas@0.4.2
    -   @khanacademy/simple-markdown@0.13.6
    -   @khanacademy/pure-markdown@0.3.13

## 43.0.1

### Patch Changes

-   [#1896](https://github.com/Khan/perseus/pull/1896) [`56fd44806`](https://github.com/Khan/perseus/commit/56fd448063b2e13c5e9cb9e1874c12494c6f0e34) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixing intersecting polygon sides issues for unlimited sided polygon.

*   [#1894](https://github.com/Khan/perseus/pull/1894) [`01edfb8be`](https://github.com/Khan/perseus/commit/01edfb8be849f869c26ada923e275648780d36f3) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Add comment about making translation tickets

-   [#1875](https://github.com/Khan/perseus/pull/1875) [`28cae9d2a`](https://github.com/Khan/perseus/commit/28cae9d2afe65e1345906de8106d349c93ddb97c) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Labels] Count lone unescaped \$ as regular dollar signs in TeX

## 43.0.0

### Major Changes

-   [#1905](https://github.com/Khan/perseus/pull/1905) [`9c225f936`](https://github.com/Khan/perseus/commit/9c225f9365cbb2e92bba3bd67b1abde724809367) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - We're reverting work done for the Server Side Scoring and Input Number Conversion projects.

### Minor Changes

-   [#1883](https://github.com/Khan/perseus/pull/1883) [`adad642ab`](https://github.com/Khan/perseus/commit/adad642ab0ae95de6600e7018f0aff836acc5911) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Introduces a validation function for the matrix widget (extracted from matrix scoring function).

*   [#1878](https://github.com/Khan/perseus/pull/1878) [`a27f23bb4`](https://github.com/Khan/perseus/commit/a27f23bb48e585aa2229975b1779161b921cbd9d) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add expression validator function

### Patch Changes

-   [#1890](https://github.com/Khan/perseus/pull/1890) [`0afb1a4f7`](https://github.com/Khan/perseus/commit/0afb1a4f70e35de7e2b04ee1af835a0ebe84bbe5) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Labels + Aria] Create math only parser to help parse TeX how we want

*   [#1889](https://github.com/Khan/perseus/pull/1889) [`55a532175`](https://github.com/Khan/perseus/commit/55a532175192bfee3dc550c7eb7ce74d4a6542a9) Thanks [@benchristel](https://github.com/benchristel)! - Internal: enable strict typechecking of function parameters

-   [#1852](https://github.com/Khan/perseus/pull/1852) [`4b8836b84`](https://github.com/Khan/perseus/commit/4b8836b846c4f6adc6f4bb9c204deedb019c9f51) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Adding open and closing behavior to unlimited polygon graph type.

-   Updated dependencies [[`55a532175`](https://github.com/Khan/perseus/commit/55a532175192bfee3dc550c7eb7ce74d4a6542a9)]:
    -   @khanacademy/kas@0.4.1
    -   @khanacademy/math-input@21.1.5
    -   @khanacademy/simple-markdown@0.13.5
    -   @khanacademy/pure-markdown@0.3.12

## 42.0.3

### Patch Changes

-   [#1887](https://github.com/Khan/perseus/pull/1887) [`4c2db8d38`](https://github.com/Khan/perseus/commit/4c2db8d384f5542cfc7f6aafd8294049a7afe1c3) Thanks [@benchristel](https://github.com/benchristel)! - Internal: add snapshot tests for `parseAndTypecheckPerseusItem`.

*   [#1872](https://github.com/Khan/perseus/pull/1872) [`7ca5bbf0e`](https://github.com/Khan/perseus/commit/7ca5bbf0e0f5c24a0bda5de9142703a913ce3fa8) Thanks [@benchristel](https://github.com/benchristel)! - Internal: make the exhaustive test tool for PerseusItem parsing find the shortest input file that repros each failure

-   [#1871](https://github.com/Khan/perseus/pull/1871) [`500315145`](https://github.com/Khan/perseus/commit/5003151457ce737056950192225cb0ac522571a6) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Add regression tests for PerseusItem parser

*   [#1877](https://github.com/Khan/perseus/pull/1877) [`44933f88e`](https://github.com/Khan/perseus/commit/44933f88e90c4b8f15dc2d1d39a4297d69e21c39) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Add README.md for packages/perseus/src/util/parse-perseus-json

-   [#1888](https://github.com/Khan/perseus/pull/1888) [`d0e7a0383`](https://github.com/Khan/perseus/commit/d0e7a0383002414d874297ccc88bf5c9863b4ea5) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Hypothesis

## 42.0.2

### Patch Changes

-   [#1884](https://github.com/Khan/perseus/pull/1884) [`b4cf444e9`](https://github.com/Khan/perseus/commit/b4cf444e962b5e4c152cad6507ddb63515fc305e) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensuring UserInput and Rubric widget keys match for edge cases

## 42.0.1

### Patch Changes

-   [#1879](https://github.com/Khan/perseus/pull/1879) [`04d6e60de`](https://github.com/Khan/perseus/commit/04d6e60de2b9176f546a7058038a10689e52f9ac) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixing conflicts that arose from scoring and widget conversion efforts

## 42.0.0

### Major Changes

-   [#1753](https://github.com/Khan/perseus/pull/1753) [`c1ba55fc0`](https://github.com/Khan/perseus/commit/c1ba55fc0247e16d9a78558721969382ee6992f8) Thanks [@handeyeco](https://github.com/handeyeco)! - Change ServerItemRenderer scoring APIs to externalize scoring

### Patch Changes

-   [#1864](https://github.com/Khan/perseus/pull/1864) [`7b18e94d7`](https://github.com/Khan/perseus/commit/7b18e94d7d2102669b3afde7988c63fd3de8b568) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Add script for exhaustive testing of PerseusItem parser

*   [#1865](https://github.com/Khan/perseus/pull/1865) [`ec5f8773e`](https://github.com/Khan/perseus/commit/ec5f8773e97c8357b14e525c03fcb5842c0db6aa) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Require \$ to display TeX in axis labels

-   [#1866](https://github.com/Khan/perseus/pull/1866) [`94eba15ca`](https://github.com/Khan/perseus/commit/94eba15cacf904daabce378d080291613490c4a1) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixing a regression and a bug in the Input Conversion Logic

*   [#1860](https://github.com/Khan/perseus/pull/1860) [`9c2289b3f`](https://github.com/Khan/perseus/commit/9c2289b3fb0e415c4cef979ab146dc583ef91b7d) Thanks [@handeyeco](https://github.com/handeyeco)! - Rename AI util files

-   [#1858](https://github.com/Khan/perseus/pull/1858) [`5e930cebe`](https://github.com/Khan/perseus/commit/5e930cebec1e7cac9d9a49214b2cbe036da482b0) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Util function to generate spoken math + use it within Locked Point aria labels

*   [#1867](https://github.com/Khan/perseus/pull/1867) [`c303009f5`](https://github.com/Khan/perseus/commit/c303009f54b90bf006cce01acf82b886d19472f5) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Represent point order in interactive elements' aria labels

-   [#1873](https://github.com/Khan/perseus/pull/1873) [`def463014`](https://github.com/Khan/perseus/commit/def46301492122490183a72f6b17050b0a329e00) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [BUGFIX] - Adjust parameter name in srPointAtCoordinates to account for variable name conflict

*   [#1854](https://github.com/Khan/perseus/pull/1854) [`ef0ad9883`](https://github.com/Khan/perseus/commit/ef0ad9883d57115edc0e8c9d73b4abda061aba57) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Add math descriptions to locked line aria labels

## 41.5.0

### Minor Changes

-   [#1731](https://github.com/Khan/perseus/pull/1731) [`27126aa00`](https://github.com/Khan/perseus/commit/27126aa00b92ce1facd97abd38989e6981836e3f) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Conversion of Input Number to Numeric Input

### Patch Changes

-   [#1846](https://github.com/Khan/perseus/pull/1846) [`8eb1ff5d1`](https://github.com/Khan/perseus/commit/8eb1ff5d10cc9572682c7283d52d7d96e14e9fd6) Thanks [@benchristel](https://github.com/benchristel)! - Internal: add widget parsers for ADR 773.

*   [#1839](https://github.com/Khan/perseus/pull/1839) [`150888870`](https://github.com/Khan/perseus/commit/150888870b4934e555cd355c58e6f71f9da21463) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Util function to generate spoken math + use it within Locked Point aria labels

## 41.4.0

### Minor Changes

-   [#1849](https://github.com/Khan/perseus/pull/1849) [`f7160d66f`](https://github.com/Khan/perseus/commit/f7160d66f6e0185dd11d8b802ad88f94cf4b92dd) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Introduce validation function for `table` widget - useful for checking if the learner has filled in the table sufficiently to score it (fully client-side)

### Patch Changes

-   [#1856](https://github.com/Khan/perseus/pull/1856) [`281f5647e`](https://github.com/Khan/perseus/commit/281f5647ea2cc6a944651466f0841140a7bc7d7b) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Fix bug that's causing the editor to crash when the label input is empty (and on load)

-   Updated dependencies [[`46dc13f10`](https://github.com/Khan/perseus/commit/46dc13f10b97c22537e70e106540aa754c75b7b0)]:
    -   @khanacademy/kas@0.4.0

## 41.3.0

### Minor Changes

-   [#1848](https://github.com/Khan/perseus/pull/1848) [`55371ded7`](https://github.com/Khan/perseus/commit/55371ded7a7ff882979022d341026a21637f22ee) Thanks [@Myranae](https://github.com/Myranae)! - Rename all validator functions and related code to reference scoring instead

*   [#1754](https://github.com/Khan/perseus/pull/1754) [`77f1bf98f`](https://github.com/Khan/perseus/commit/77f1bf98fc9027464f2a83967d2a30dba27ee88c) Thanks [@MikeKlemarewski](https://github.com/MikeKlemarewski)! - Adds the getPromptJSON utility method to the renderer and every widget. It can be used to get a JSON representation of the exercise to pass to an LLM.

### Patch Changes

-   [#1844](https://github.com/Khan/perseus/pull/1844) [`092c81f6c`](https://github.com/Khan/perseus/commit/092c81f6ce0ae597e7dabf597d76642abebdf401) Thanks [@Myranae](https://github.com/Myranae)! - Update Radio's userInput and rubric objects and types

*   [#1837](https://github.com/Khan/perseus/pull/1837) [`80f0480e6`](https://github.com/Khan/perseus/commit/80f0480e6dc5fd45e2a870c323b67decc1e8d254) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Type widget exports using 'satisfies' keyword instead of 'as'

-   [#1785](https://github.com/Khan/perseus/pull/1785) [`32b27322c`](https://github.com/Khan/perseus/commit/32b27322c78fc818900d3c48dc738cb50d086505) Thanks [@benchristel](https://github.com/benchristel)! - Internal: add a parsing layer to typecheck PerseusItem data at runtime (ADR #773). The parsing code is not used yet.

*   [#1838](https://github.com/Khan/perseus/pull/1838) [`08fa66103`](https://github.com/Khan/perseus/commit/08fa6610346debf178edb944d7570cdb7d98af6a) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Introduce a PerseusArticle type

-   [#1825](https://github.com/Khan/perseus/pull/1825) [`3dd1fa5ce`](https://github.com/Khan/perseus/commit/3dd1fa5cea46e7c90db8d0e1efdf0e8c449853a7) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Adding stronger typing to expression editor issues.

*   [#1847](https://github.com/Khan/perseus/pull/1847) [`dcb4b27b3`](https://github.com/Khan/perseus/commit/dcb4b27b3dbd3f8757cd015a390e8badd30dcd4f) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Labels] Allow the usage of `{$}` to denote actual dollar signs within locked label TeX

-   [#1850](https://github.com/Khan/perseus/pull/1850) [`61dbd4a2c`](https://github.com/Khan/perseus/commit/61dbd4a2cb985887de391ea9fd9839770d0deef8) Thanks [@MikeKlemarewski](https://github.com/MikeKlemarewski)! - Export WidgetPromptJSON type so it is accessible

*   [#1842](https://github.com/Khan/perseus/pull/1842) [`cf2ea471e`](https://github.com/Khan/perseus/commit/cf2ea471e7d38cf8f0cd45ac0962eef6fa270b8a) Thanks [@MikeKlemarewski](https://github.com/MikeKlemarewski)! - Fix function signature of getUserInputFromProps for radio widget

## 41.2.0

### Minor Changes

-   [#1834](https://github.com/Khan/perseus/pull/1834) [`429b9cc15`](https://github.com/Khan/perseus/commit/429b9cc15e5d69ad10b42db0016ba21992343267) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figures] Use \$ symbols to denote TeX within locked labels and locked figure labels

### Patch Changes

-   [#1833](https://github.com/Khan/perseus/pull/1833) [`122b3cc1b`](https://github.com/Khan/perseus/commit/122b3cc1b9b233e1014ec2176319af8bbb0c54ce) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Removal of unused MathJax2 initialization

## 41.1.1

### Patch Changes

-   [#1818](https://github.com/Khan/perseus/pull/1818) [`8aaf29670`](https://github.com/Khan/perseus/commit/8aaf2967088e55e6907ef4b01411d6e9579b4677) Thanks [@Myranae](https://github.com/Myranae)! - Refine Interactive Graph's Rubric type

*   [#1829](https://github.com/Khan/perseus/pull/1829) [`f6b66b001`](https://github.com/Khan/perseus/commit/f6b66b00186875fd1d61e5d217b472a9a4e2cdf9) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Refactor parsePerseusItem and add tests

## 41.1.0

### Minor Changes

-   [#1821](https://github.com/Khan/perseus/pull/1821) [`b14d19160`](https://github.com/Khan/perseus/commit/b14d19160f6461c90290500519fe9d54bbc70c11) Thanks [@handeyeco](https://github.com/handeyeco)! - Export PerseusDependenciesV2 from Perseus

## 41.0.0

### Major Changes

-   [#1793](https://github.com/Khan/perseus/pull/1793) [`486e4cdc1`](https://github.com/Khan/perseus/commit/486e4cdc1196e78101cd9067f37888881fd58f2b) Thanks [@handeyeco](https://github.com/handeyeco)! - Move useVideo from v1 dependency to v2 dependency

### Minor Changes

-   [#1817](https://github.com/Khan/perseus/pull/1817) [`22d1c0229`](https://github.com/Khan/perseus/commit/22d1c0229e52fc2dc6bc9f38a3ca400c6e4a3884) Thanks [@benchristel](https://github.com/benchristel)! - Add screenreader description for the interactive elements of point graphs

*   [#1812](https://github.com/Khan/perseus/pull/1812) [`33891dc0b`](https://github.com/Khan/perseus/commit/33891dc0b5e477b0b6db2f0d3733d81215d13ebe) Thanks [@benchristel](https://github.com/benchristel)! - Add a screenreader-accessible label to movable points on interactive graphs

### Patch Changes

-   [#1815](https://github.com/Khan/perseus/pull/1815) [`2c402198c`](https://github.com/Khan/perseus/commit/2c402198c00b1eb342a799820a58d49ec5d9d9f4) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Refactor interactive graph components to support whole-graph screenreader descriptions

*   [#1802](https://github.com/Khan/perseus/pull/1802) [`d6381f773`](https://github.com/Khan/perseus/commit/d6381f7737ff44f1ec3d91c4ab25ce51f47b35b9) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Improve prop types for various components

-   [#1814](https://github.com/Khan/perseus/pull/1814) [`035191c9e`](https://github.com/Khan/perseus/commit/035191c9ec0c70db062cdfb44cdee69682edcbcf) Thanks [@nedredmond](https://github.com/nedredmond)! - Wraps a text node in a `span` to reduce bugs caused by Google Translate

-   Updated dependencies [[`d6381f773`](https://github.com/Khan/perseus/commit/d6381f7737ff44f1ec3d91c4ab25ce51f47b35b9)]:
    -   @khanacademy/math-input@21.1.4

## 40.0.0

### Major Changes

-   [#1803](https://github.com/Khan/perseus/pull/1803) [`eecfa54dd`](https://github.com/Khan/perseus/commit/eecfa54dd7810a98999e68054c9483959d7c0bd9) Thanks [@handeyeco](https://github.com/handeyeco)! - Refine exports of icon paths from Perseus

*   [#1806](https://github.com/Khan/perseus/pull/1806) [`666a1e1f4`](https://github.com/Khan/perseus/commit/666a1e1f452e7c2c041c4f339c25cb30efbd946f) Thanks [@handeyeco](https://github.com/handeyeco)! - Scope exports from grapher's util

-   [#1804](https://github.com/Khan/perseus/pull/1804) [`6907fd4fc`](https://github.com/Khan/perseus/commit/6907fd4fca22ab16466e8ee718058943c04c79f8) Thanks [@handeyeco](https://github.com/handeyeco)! - Move contants file from perseus to perseus-editor

*   [#1801](https://github.com/Khan/perseus/pull/1801) [`ed088a629`](https://github.com/Khan/perseus/commit/ed088a629c77619740a8c902ad769ed8d3622367) Thanks [@handeyeco](https://github.com/handeyeco)! - Cleanup global-styles and global-constants exports from Perseus

-   [#1805](https://github.com/Khan/perseus/pull/1805) [`faf62afd0`](https://github.com/Khan/perseus/commit/faf62afd094a758e376c5a8ac2acce140dedffdd) Thanks [@handeyeco](https://github.com/handeyeco)! - Scope sizing-utils exports to the essentials

### Minor Changes

-   [#1764](https://github.com/Khan/perseus/pull/1764) [`c2e678e5c`](https://github.com/Khan/perseus/commit/c2e678e5c109a8e0161907fea54aacb572e16bb3) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Adding new interactive graph type "unlimited-points" for mafs.

### Patch Changes

-   [#1791](https://github.com/Khan/perseus/pull/1791) [`b119147fc`](https://github.com/Khan/perseus/commit/b119147fc042bf71193d61f9cea99b5f3d73b484) Thanks [@handeyeco](https://github.com/handeyeco)! - Check types for import/no-extraneous-dependencies eslint check

*   [#1795](https://github.com/Khan/perseus/pull/1795) [`f1aaf4f2b`](https://github.com/Khan/perseus/commit/f1aaf4f2b0ff2eedbd2f41aa67a7ee86363fbc2d) Thanks [@benchristel](https://github.com/benchristel)! - Refactor MovablePoint to useControlPoint

*   Updated dependencies [[`14d0764e4`](https://github.com/Khan/perseus/commit/14d0764e4498dae81921a91e5202291461b52374), [`b119147fc`](https://github.com/Khan/perseus/commit/b119147fc042bf71193d61f9cea99b5f3d73b484)]:
    -   @khanacademy/perseus-linter@1.2.4
    -   @khanacademy/kas@0.3.16
    -   @khanacademy/keypad-context@1.0.4
    -   @khanacademy/kmath@0.1.16
    -   @khanacademy/math-input@21.1.3
    -   @khanacademy/perseus-core@1.5.3
    -   @khanacademy/pure-markdown@0.3.11
    -   @khanacademy/simple-markdown@0.13.4

## 39.0.1

### Patch Changes

-   [#1766](https://github.com/Khan/perseus/pull/1766) [`39e1292a9`](https://github.com/Khan/perseus/commit/39e1292a9d93453037b77c157ee5421ed23b88ad) Thanks [@Myranae](https://github.com/Myranae)! - Refine iFrame's Rubric type

*   [#1799](https://github.com/Khan/perseus/pull/1799) [`f3139edfe`](https://github.com/Khan/perseus/commit/f3139edfeb5f8b6faf0e537961165e3d3499c30b) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change functional components to use default parameters instead of deprecated 'defaultProps'

-   [#1765](https://github.com/Khan/perseus/pull/1765) [`5cf8d975b`](https://github.com/Khan/perseus/commit/5cf8d975b249e103e4f439b2682741c25a0b4084) Thanks [@Myranae](https://github.com/Myranae)! - Refine Sorter's Rubric type

*   [#1758](https://github.com/Khan/perseus/pull/1758) [`d6edf18ef`](https://github.com/Khan/perseus/commit/d6edf18ef07c6b82ae585e77d75e9132d554baf5) Thanks [@Myranae](https://github.com/Myranae)! - Refine Radio's Rubric and UserInput types

-   [#1743](https://github.com/Khan/perseus/pull/1743) [`5ea5d5927`](https://github.com/Khan/perseus/commit/5ea5d592755bd5b2889547718fc39523e5595ea1) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - BUGFIX - [Numeric Input] - Check for wrong answers when scoring

*   [#1760](https://github.com/Khan/perseus/pull/1760) [`9426509cd`](https://github.com/Khan/perseus/commit/9426509cdcdc9c51dfd957e0e51f6bac0e11ffe5) Thanks [@Myranae](https://github.com/Myranae)! - Refine Matrix's Rubric and UserInput types

-   [#1761](https://github.com/Khan/perseus/pull/1761) [`dbe17d1ee`](https://github.com/Khan/perseus/commit/dbe17d1ee9c22d11ec916e898cb5ca4a01409896) Thanks [@Myranae](https://github.com/Myranae)! - Refine NumericInput's Rubric type

-   Updated dependencies [[`f3139edfe`](https://github.com/Khan/perseus/commit/f3139edfeb5f8b6faf0e537961165e3d3499c30b)]:
    -   @khanacademy/math-input@21.1.2

## 39.0.0

### Major Changes

-   [#1740](https://github.com/Khan/perseus/pull/1740) [`c6ee2662a`](https://github.com/Khan/perseus/commit/c6ee2662a18e6703c3a7816d5fb89a70e0f9f50b) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove external-facing but unused API (getGrammarTypeForPath)

### Minor Changes

-   [#1741](https://github.com/Khan/perseus/pull/1741) [`3e48b2c26`](https://github.com/Khan/perseus/commit/3e48b2c26fbd1f649ce3878468e06043b88b0949) Thanks [@handeyeco](https://github.com/handeyeco)! - Scope reviewModeRubric to just the component that uses it (Radio)

*   [#1745](https://github.com/Khan/perseus/pull/1745) [`5cbbeebdf`](https://github.com/Khan/perseus/commit/5cbbeebdf368a06c318940f477af08fd73a84e66) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - adds appearance description to aria label

### Patch Changes

-   [#1782](https://github.com/Khan/perseus/pull/1782) [`ea7ede69f`](https://github.com/Khan/perseus/commit/ea7ede69fc8b5265162cfbfedf863766fa1e0aee) Thanks [@handeyeco](https://github.com/handeyeco)! - Cleanup widget option types

*   [#1781](https://github.com/Khan/perseus/pull/1781) [`f220366d0`](https://github.com/Khan/perseus/commit/f220366d0b3550a84b0d744119331d3307348c34) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove unused types

-   [#1744](https://github.com/Khan/perseus/pull/1744) [`236ef4458`](https://github.com/Khan/perseus/commit/236ef4458aaffc9b6265e72dc64cb1ee3a21a71c) Thanks [@handeyeco](https://github.com/handeyeco)! - Cleanup: remove scorePreview and refine some types

*   [#1777](https://github.com/Khan/perseus/pull/1777) [`cf57871df`](https://github.com/Khan/perseus/commit/cf57871df1d0eb63be2b83b8c5dda5f4f1f709ad) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove unused styles constants

-   [#1776](https://github.com/Khan/perseus/pull/1776) [`d05a4a228`](https://github.com/Khan/perseus/commit/d05a4a22895c2c939e5c90a9b412ddfaaa0ba2f0) Thanks [@handeyeco](https://github.com/handeyeco)! - Don't export things that aren't used externally

*   [#1778](https://github.com/Khan/perseus/pull/1778) [`8eacf0bda`](https://github.com/Khan/perseus/commit/8eacf0bda557c459be996b8c66a0fd93ad797b39) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove unused dead code

-   [#1774](https://github.com/Khan/perseus/pull/1774) [`cb3b8f3ea`](https://github.com/Khan/perseus/commit/cb3b8f3ea58e147d402238994227284e8a21ba51) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove duplicate export on MovablePoint

*   [#1790](https://github.com/Khan/perseus/pull/1790) [`c27ee11bc`](https://github.com/Khan/perseus/commit/c27ee11bc69ff9dcf89814f9f66b4e1b3508f129) Thanks [@handeyeco](https://github.com/handeyeco)! - Revert process check PR (#1784)

-   [#1789](https://github.com/Khan/perseus/pull/1789) [`0587dc04b`](https://github.com/Khan/perseus/commit/0587dc04b770524cce8c603fcd90e7c25844be46) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove isMobile from Dependencies since it's now on APIOptions

*   [#1780](https://github.com/Khan/perseus/pull/1780) [`6729af8c8`](https://github.com/Khan/perseus/commit/6729af8c8af8617f7f7159976efb2989dc925909) Thanks [@handeyeco](https://github.com/handeyeco)! - Don't export types that aren't used externally

-   [#1759](https://github.com/Khan/perseus/pull/1759) [`69f3facad`](https://github.com/Khan/perseus/commit/69f3facadd0dd38ef98c4ba6e04461d2bbe92578) Thanks [@handeyeco](https://github.com/handeyeco)! - Clear seemingly useless widget rubrics

-   Updated dependencies [[`e8160105c`](https://github.com/Khan/perseus/commit/e8160105c967143b593954d967504dcbeab59468), [`f220366d0`](https://github.com/Khan/perseus/commit/f220366d0b3550a84b0d744119331d3307348c34), [`d05a4a228`](https://github.com/Khan/perseus/commit/d05a4a22895c2c939e5c90a9b412ddfaaa0ba2f0), [`8eacf0bda`](https://github.com/Khan/perseus/commit/8eacf0bda557c459be996b8c66a0fd93ad797b39), [`c27ee11bc`](https://github.com/Khan/perseus/commit/c27ee11bc69ff9dcf89814f9f66b4e1b3508f129), [`6729af8c8`](https://github.com/Khan/perseus/commit/6729af8c8af8617f7f7159976efb2989dc925909), [`c91cba9e0`](https://github.com/Khan/perseus/commit/c91cba9e01bc391accac2014ed3c87b42ba174fd)]:
    -   @khanacademy/math-input@21.1.1
    -   @khanacademy/perseus-linter@1.2.3

## 38.0.1

### Patch Changes

-   [#1751](https://github.com/Khan/perseus/pull/1751) [`c95d08056`](https://github.com/Khan/perseus/commit/c95d0805624f553718ec2c1a18108cc86e712f93) Thanks [@Myranae](https://github.com/Myranae)! - Refine InputNumber's rubric type

*   [#1756](https://github.com/Khan/perseus/pull/1756) [`3a208ba12`](https://github.com/Khan/perseus/commit/3a208ba127da6145dd26ef80c7fd3b2809a1b768) Thanks [@Myranae](https://github.com/Myranae)! - Refine LabelImage's Rubric type

-   [#1762](https://github.com/Khan/perseus/pull/1762) [`a0f438fd7`](https://github.com/Khan/perseus/commit/a0f438fd7ef564e2df348c2f42809f46c7216194) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - BUGFIX - [Number Line] - Some exercises with fractions wouldn't render

-   Updated dependencies [[`81ee69b0a`](https://github.com/Khan/perseus/commit/81ee69b0aa5fd5746a63567dce633ae0358d7ff9), [`93bd39b6b`](https://github.com/Khan/perseus/commit/93bd39b6b3d7751ef269bd2ac8b7380c52886921)]:
    -   @khanacademy/kas@0.3.15

## 38.0.0

### Major Changes

-   [#1717](https://github.com/Khan/perseus/pull/1717) [`8a40e99e6`](https://github.com/Khan/perseus/commit/8a40e99e6cd6dd2424d84ec4d03744984aa68275) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove duplicate WidgetDict type and bespoke typings of `widgets` in favour of `PerseusWidgetsMap` type.

### Patch Changes

-   [#1752](https://github.com/Khan/perseus/pull/1752) [`c4d96ccaf`](https://github.com/Khan/perseus/commit/c4d96ccaf941638d6a24b29d8d91111581cca1be) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - BUGFIX - [Number Line] - Tick labels not showing in some exercises

*   [#1730](https://github.com/Khan/perseus/pull/1730) [`2cc20b32e`](https://github.com/Khan/perseus/commit/2cc20b32efc0e03f3e87f465d02bcfc29b3882f9) Thanks [@Myranae](https://github.com/Myranae)! - Refine Grapher types and clean up relevant code

## 37.0.1

### Patch Changes

-   [#1742](https://github.com/Khan/perseus/pull/1742) [`f383d4399`](https://github.com/Khan/perseus/commit/f383d4399d16ee31ad8e24867b0d171c160a1f1b) Thanks [@handeyeco](https://github.com/handeyeco)! - Move getOneCorrectAnswerFromRubric from React components to WidgetExports

*   [#1732](https://github.com/Khan/perseus/pull/1732) [`c57e114f2`](https://github.com/Khan/perseus/commit/c57e114f25cfa7d95508d4244c28e00b10e9d130) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Adding Unlimited Polygon feature flag.

-   [#1736](https://github.com/Khan/perseus/pull/1736) [`5e30fcde8`](https://github.com/Khan/perseus/commit/5e30fcde8a0692b259955a95a9a22d9b7c7e75f9) Thanks [@handeyeco](https://github.com/handeyeco)! - Make validator files be ts instead of tsx

## 37.0.0

### Major Changes

-   [#1715](https://github.com/Khan/perseus/pull/1715) [`5ecfd4455`](https://github.com/Khan/perseus/commit/5ecfd44552e8021389aede22ee189f0262327497) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove validation logic from widgets' React component

### Minor Changes

-   [#1618](https://github.com/Khan/perseus/pull/1618) [`147f9a17d`](https://github.com/Khan/perseus/commit/147f9a17dc953a7bf24e6cc60a46589471a1e82c) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - add scientific notation button / toggle to basic keypad

*   [#1733](https://github.com/Khan/perseus/pull/1733) [`74ba298fa`](https://github.com/Khan/perseus/commit/74ba298faaeb8adb1b403c837e8daaafc2eb5c94) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - reverts scientific option addition to keypad

### Patch Changes

-   [#1728](https://github.com/Khan/perseus/pull/1728) [`22ee7bc0d`](https://github.com/Khan/perseus/commit/22ee7bc0def5a15cb5390f0c932b84fe93cbe6f5) Thanks [@Myranae](https://github.com/Myranae)! - Refine Dropdown's Rubric type and update associated test

*   [#1734](https://github.com/Khan/perseus/pull/1734) [`92c4e6215`](https://github.com/Khan/perseus/commit/92c4e62153cc83eab1116fccf2d353496c0f220a) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Fix to account for recent cheat attempts

-   [#1695](https://github.com/Khan/perseus/pull/1695) [`387273b07`](https://github.com/Khan/perseus/commit/387273b07f80f364cabd0de65a1831fc48a8fac5) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - BUGFIX: Left-most digit in Number Line widget is misaligned

-   Updated dependencies [[`147f9a17d`](https://github.com/Khan/perseus/commit/147f9a17dc953a7bf24e6cc60a46589471a1e82c), [`74ba298fa`](https://github.com/Khan/perseus/commit/74ba298faaeb8adb1b403c837e8daaafc2eb5c94)]:
    -   @khanacademy/math-input@21.1.0

## 36.1.2

### Patch Changes

-   [#1666](https://github.com/Khan/perseus/pull/1666) [`c2b1d8d05`](https://github.com/Khan/perseus/commit/c2b1d8d05a71f1c58cefe02498074987fe6fdcd2) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixed bug related to Angle Equation and refactored Angle Equation logic.

*   [#1726](https://github.com/Khan/perseus/pull/1726) [`65497a600`](https://github.com/Khan/perseus/commit/65497a6007fed7be0775c49538e0f09830109fa1) Thanks [@Myranae](https://github.com/Myranae)! - Refine CS-Program's Rubric type

-   [#1725](https://github.com/Khan/perseus/pull/1725) [`08ad41b92`](https://github.com/Khan/perseus/commit/08ad41b9260db8b34e7a79e562f3fcd464104864) Thanks [@Myranae](https://github.com/Myranae)! - Refine Categorizer's Rubric and UserInput types

*   [#1723](https://github.com/Khan/perseus/pull/1723) [`d4f4e2be1`](https://github.com/Khan/perseus/commit/d4f4e2be1408c4531a146bcd496344a629d90bd1) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Updating event data sent within interactive graph

*   Updated dependencies [[`d4f4e2be1`](https://github.com/Khan/perseus/commit/d4f4e2be1408c4531a146bcd496344a629d90bd1)]:
    -   @khanacademy/perseus-core@1.5.2
    -   @khanacademy/kas@0.3.14
    -   @khanacademy/keypad-context@1.0.3
    -   @khanacademy/kmath@0.1.15
    -   @khanacademy/math-input@21.0.4
    -   @khanacademy/perseus-linter@1.2.2
    -   @khanacademy/pure-markdown@0.3.10
    -   @khanacademy/simple-markdown@0.13.3

## 36.1.1

### Patch Changes

-   [#1692](https://github.com/Khan/perseus/pull/1692) [`cde39a896`](https://github.com/Khan/perseus/commit/cde39a8963f3e2d34d2de85c6b128ec005ea3f21) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bug fix for Axis Tick Labels in Interactive Graph to handle floating point issues when working with decimals.

*   [#1716](https://github.com/Khan/perseus/pull/1716) [`b22b053f6`](https://github.com/Khan/perseus/commit/b22b053f60c5ee8bc3f9150ae7f37c4e792e4caa) Thanks [@Myranae](https://github.com/Myranae)! - Refactor parsePerseusItem to make it more resilient

## 36.1.0

### Minor Changes

-   [#1675](https://github.com/Khan/perseus/pull/1675) [`2ff9ae90e`](https://github.com/Khan/perseus/commit/2ff9ae90ed65bbe6c4ec8c023298f130d27591cc) Thanks [@MrNickBreen](https://github.com/MrNickBreen)! - Adds getImagesWithoutAltData

*   [#1701](https://github.com/Khan/perseus/pull/1701) [`da44c4a3b`](https://github.com/Khan/perseus/commit/da44c4a3b7cd3413df6aee477f0391c583547936) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - In unlimited point graphs focus point after added

### Patch Changes

-   [#1719](https://github.com/Khan/perseus/pull/1719) [`eb733b3ec`](https://github.com/Khan/perseus/commit/eb733b3ec2e3354a0c4647e9993b6f08a1b77e4a) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Updating interactive graph to log telementry when the widget is rendered.

-   Updated dependencies [[`eb733b3ec`](https://github.com/Khan/perseus/commit/eb733b3ec2e3354a0c4647e9993b6f08a1b77e4a)]:
    -   @khanacademy/perseus-core@1.5.1
    -   @khanacademy/kas@0.3.13
    -   @khanacademy/keypad-context@1.0.2
    -   @khanacademy/kmath@0.1.14
    -   @khanacademy/math-input@21.0.3
    -   @khanacademy/perseus-linter@1.2.1
    -   @khanacademy/pure-markdown@0.3.9
    -   @khanacademy/simple-markdown@0.13.2

## 36.0.0

### Major Changes

-   [#1696](https://github.com/Khan/perseus/pull/1696) [`3e1697229`](https://github.com/Khan/perseus/commit/3e16972293b757e8631f4c5d8c3fb121babf5324) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove deprecated `Util.widgetShouldHighlight` function

### Minor Changes

-   [#1696](https://github.com/Khan/perseus/pull/1696) [`3e1697229`](https://github.com/Khan/perseus/commit/3e16972293b757e8631f4c5d8c3fb121babf5324) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Migrate `Widget` type to be an TypeScript `interface` so each widget can declare it implements it explicitly.

### Patch Changes

-   [#1697](https://github.com/Khan/perseus/pull/1697) [`b9d84ccba`](https://github.com/Khan/perseus/commit/b9d84ccba8df83df4d2a042f730707e5fa6e562b) Thanks [@Myranae](https://github.com/Myranae)! - Refactor cs-program to use a getUserInputFunction

*   [#1713](https://github.com/Khan/perseus/pull/1713) [`bcd32425c`](https://github.com/Khan/perseus/commit/bcd32425cbf4c74646ee66f998294c2f9cd3253d) Thanks [@handeyeco](https://github.com/handeyeco)! - Some minor cleanup related to validators

-   [#1708](https://github.com/Khan/perseus/pull/1708) [`8e95e00c4`](https://github.com/Khan/perseus/commit/8e95e00c4decf76f443d286cae29cc4ebf6284b5) Thanks [@Myranae](https://github.com/Myranae)! - Move validation logic out of the orderer widget and add tests

## 35.1.1

### Patch Changes

-   [#1694](https://github.com/Khan/perseus/pull/1694) [`d0aa0cc0c`](https://github.com/Khan/perseus/commit/d0aa0cc0cff9fab6f3798cd7c03300f863d02e20) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bug fix for Axis Tick Labels in Interactive Graph to hide the first negative tick step on the yAxis if it is within the graph

## 35.1.0

### Minor Changes

-   [#1687](https://github.com/Khan/perseus/pull/1687) [`c0cbb484a`](https://github.com/Khan/perseus/commit/c0cbb484af491b6451a23db3a29b31b3285ccdec) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Locked function aria labels (graph + editor)

*   [#1690](https://github.com/Khan/perseus/pull/1690) [`a65da60c2`](https://github.com/Khan/perseus/commit/a65da60c2b16f18c123b3a3befa880bd2d0a1854) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add/edit/delete locked polygon labels

-   [#1683](https://github.com/Khan/perseus/pull/1683) [`2d7cadaf0`](https://github.com/Khan/perseus/commit/2d7cadaf0a7699a4f3d9203c9eb9d38ee0c42e6c) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Implement locked line aria label behavior on graph

*   [#1691](https://github.com/Khan/perseus/pull/1691) [`fc16bc77f`](https://github.com/Khan/perseus/commit/fc16bc77feabfbaf594cd26836d2c56dadbbca90) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Locked polygon aria labels (graph + editor)

-   [#1677](https://github.com/Khan/perseus/pull/1677) [`3c73f4aa4`](https://github.com/Khan/perseus/commit/3c73f4aa40b4912affa7ec3a71ce21a9cbf11af5) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Implement locked point aria label behavior on graph

*   [#1684](https://github.com/Khan/perseus/pull/1684) [`17ebfc0de`](https://github.com/Khan/perseus/commit/17ebfc0de9a89df44c65dfbc49fb74c6c7895ec2) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Locked line aria label editor UI

-   [#1685](https://github.com/Khan/perseus/pull/1685) [`b3de0d80e`](https://github.com/Khan/perseus/commit/b3de0d80ea4a8710000c56d8458eb31cbf11c3fc) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Implement locked vector aria labels (graph + editor)

*   [#1689](https://github.com/Khan/perseus/pull/1689) [`eda436f00`](https://github.com/Khan/perseus/commit/eda436f005544172e4eb443e903978e2c13d6afb) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] View locked polygon labels

-   [#1682](https://github.com/Khan/perseus/pull/1682) [`039e0a360`](https://github.com/Khan/perseus/commit/039e0a360e56044ce2b4a1decfd82e6c01841ea9) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Locked point aria label editor UI

*   [#1686](https://github.com/Khan/perseus/pull/1686) [`8230d96ee`](https://github.com/Khan/perseus/commit/8230d96ee03b421d8bb6dc823943faccf7908058) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Implement locked ellipse aria labels (graph + editor)

### Patch Changes

-   [#1702](https://github.com/Khan/perseus/pull/1702) [`30725ec88`](https://github.com/Khan/perseus/commit/30725ec8812c3431cbe721e29e578aefe60e867d) Thanks [@handeyeco](https://github.com/handeyeco)! - Split out validation logic for NumberLine

*   [#1671](https://github.com/Khan/perseus/pull/1671) [`f326139ee`](https://github.com/Khan/perseus/commit/f326139ee6bf9680075eac6353b1e84c44fa3f77) Thanks [@handeyeco](https://github.com/handeyeco)! - Move and test Grapher's validator

-   [#1704](https://github.com/Khan/perseus/pull/1704) [`82e0ebd71`](https://github.com/Khan/perseus/commit/82e0ebd7101a98ee67487507e66f6ef6270aa0f7) Thanks [@handeyeco](https://github.com/handeyeco)! - Split out validation logic from table

*   [#1664](https://github.com/Khan/perseus/pull/1664) [`c41e4b2f3`](https://github.com/Khan/perseus/commit/c41e4b2f35cd2036778c79e035d402dee7f12893) Thanks [@benchristel](https://github.com/benchristel)! - Omit unused data from interactive graph onChange callback

-   [#1678](https://github.com/Khan/perseus/pull/1678) [`49efaaff5`](https://github.com/Khan/perseus/commit/49efaaff5235bea1b6499df6a9d05fca7d022cd2) Thanks [@handeyeco](https://github.com/handeyeco)! - Port some tests to new custom matcher

*   [#1676](https://github.com/Khan/perseus/pull/1676) [`f5af24371`](https://github.com/Khan/perseus/commit/f5af2437133d68dcbaa42830850341c46d7affee) Thanks [@benchristel](https://github.com/benchristel)! - Internal: remove dead code from InteractiveGraph.validate()

-   [#1698](https://github.com/Khan/perseus/pull/1698) [`339a6db38`](https://github.com/Khan/perseus/commit/339a6db386b44f0481ea48dc9ea19b6debb4ae7c) Thanks [@handeyeco](https://github.com/handeyeco)! - Refine Expression's Rubric type

*   [#1700](https://github.com/Khan/perseus/pull/1700) [`493715e3d`](https://github.com/Khan/perseus/commit/493715e3d9a8892ae6f7e052b830e4d88367cd19) Thanks [@handeyeco](https://github.com/handeyeco)! - Split out InteractiveGraph validator

-   [#1705](https://github.com/Khan/perseus/pull/1705) [`e432666fd`](https://github.com/Khan/perseus/commit/e432666fd1635d7c519bc9b5d402db081a54f1d3) Thanks [@Myranae](https://github.com/Myranae)! - Move validation logic out of the iframe widget and add tests

*   [#1693](https://github.com/Khan/perseus/pull/1693) [`466d010c6`](https://github.com/Khan/perseus/commit/466d010c6dcf57e92c5e857d4c1c3829da238b61) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add color select to locked figure labels settings

-   [#1707](https://github.com/Khan/perseus/pull/1707) [`d3767f720`](https://github.com/Khan/perseus/commit/d3767f7209ea8263997cd8f08d7522a31d4db709) Thanks [@handeyeco](https://github.com/handeyeco)! - Split out matcherValidator from Matcher

*   [#1670](https://github.com/Khan/perseus/pull/1670) [`463755970`](https://github.com/Khan/perseus/commit/463755970951a97db23baa5f73084549fe56c936) Thanks [@handeyeco](https://github.com/handeyeco)! - Split validation logic out of Matrix

-   [#1688](https://github.com/Khan/perseus/pull/1688) [`10ce86925`](https://github.com/Khan/perseus/commit/10ce869258bc8506aba848c06ada8e5ae5fca4ff) Thanks [@Myranae](https://github.com/Myranae)! - Move validation logic out of the cs-program widget and add tests

*   [#1703](https://github.com/Khan/perseus/pull/1703) [`e818b0f15`](https://github.com/Khan/perseus/commit/e818b0f15b4862b23048cd157c2ea96ce8330c25) Thanks [@handeyeco](https://github.com/handeyeco)! - Split out Plotter validator

## 35.0.0

### Major Changes

-   [#1668](https://github.com/Khan/perseus/pull/1668) [`063159313`](https://github.com/Khan/perseus/commit/063159313c8b146589912ce42c14f06aa23d3e51) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove scoreWidgets from ServerItemRenderer

*   [#1639](https://github.com/Khan/perseus/pull/1639) [`ae51ccdb8`](https://github.com/Khan/perseus/commit/ae51ccdb820894f6fc5c1b23556823efdd4edba6) Thanks [@handeyeco](https://github.com/handeyeco)! - Refactor virtally all widget types and consolidate user input

-   [#1661](https://github.com/Khan/perseus/pull/1661) [`391641acb`](https://github.com/Khan/perseus/commit/391641acb153d2d6c0f8c29f5026a392ac1b3a62) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove unused onInputError from APIOptions

### Minor Changes

-   [#1655](https://github.com/Khan/perseus/pull/1655) [`790e189a7`](https://github.com/Khan/perseus/commit/790e189a7fdcd215d78d1999879ab2fc7417e123) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add/edit/delete locked ellipse labels

*   [#1653](https://github.com/Khan/perseus/pull/1653) [`ca4be05ab`](https://github.com/Khan/perseus/commit/ca4be05ab7367007330784796ad2561e3f5bb1c8) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] View locked ellipse labels

-   [#1652](https://github.com/Khan/perseus/pull/1652) [`1ed045583`](https://github.com/Khan/perseus/commit/1ed045583fec01be5baf5d4e86a8b582cbf782c2) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add/edit/delete locked vector labels

*   [#1659](https://github.com/Khan/perseus/pull/1659) [`3dcb1fdf2`](https://github.com/Khan/perseus/commit/3dcb1fdf247eda0f0b78966daf04a9e4278d4373) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add/edit/delete locked function labels

-   [#1658](https://github.com/Khan/perseus/pull/1658) [`20b3a2485`](https://github.com/Khan/perseus/commit/20b3a2485e2ba8deea798acc2732d9570c0dac45) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] View locked function labels

*   [#1650](https://github.com/Khan/perseus/pull/1650) [`03cddb6c3`](https://github.com/Khan/perseus/commit/03cddb6c39570e87ff2437273eb1287ff1417eec) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] View locked vector labels

-   [#1679](https://github.com/Khan/perseus/pull/1679) [`56f33ae01`](https://github.com/Khan/perseus/commit/56f33ae010390abd2050028db98c9a72fc604e1a) Thanks [@handeyeco](https://github.com/handeyeco)! - Don't serialize widgetIsOpen

### Patch Changes

-   [#1669](https://github.com/Khan/perseus/pull/1669) [`13d79edb9`](https://github.com/Khan/perseus/commit/13d79edb94fd7009b18a176b5c93b43fb03fee72) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Updating protractor's default position within a graph.

*   [#1662](https://github.com/Khan/perseus/pull/1662) [`3a10f6b1f`](https://github.com/Khan/perseus/commit/3a10f6b1fe85d915fbf947434d7ebdc0b35607f5) Thanks [@handeyeco](https://github.com/handeyeco)! - Split out validation logic in Radio

-   [#1656](https://github.com/Khan/perseus/pull/1656) [`b9d1af181`](https://github.com/Khan/perseus/commit/b9d1af181efeb093407d59ba0a8efe8912524757) Thanks [@Myranae](https://github.com/Myranae)! - Move validation logic out of the sorter widget and add tests

*   [#1665](https://github.com/Khan/perseus/pull/1665) [`9f9d42c4e`](https://github.com/Khan/perseus/commit/9f9d42c4e2d041408cf508f5bfaeafe03dc2acbc) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - Translations and polish for unlimited point

-   [#1667](https://github.com/Khan/perseus/pull/1667) [`9efad87d0`](https://github.com/Khan/perseus/commit/9efad87d00c58f16c5a5a95c6c7148bde62fe71a) Thanks [@handeyeco](https://github.com/handeyeco)! - Split validation logic from LabelImage

*   [#1663](https://github.com/Khan/perseus/pull/1663) [`1642ad9c0`](https://github.com/Khan/perseus/commit/1642ad9c0cadaf2e4db316e5e4cb38a5c9a9f5fe) Thanks [@benchristel](https://github.com/benchristel)! - Internal: revert buggy change to interactive graphs (never shipped)

-   [#1673](https://github.com/Khan/perseus/pull/1673) [`6f4702e41`](https://github.com/Khan/perseus/commit/6f4702e418ffdfaae01aa3f3a126b304b3250e34) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figures Labels] Make labels optional to increase type safety

## 34.1.0

### Minor Changes

-   [#1642](https://github.com/Khan/perseus/pull/1642) [`75e19c557`](https://github.com/Khan/perseus/commit/75e19c557a0439b6645d09c3a0586d7f09d06539) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] View locked line labels

*   [#1647](https://github.com/Khan/perseus/pull/1647) [`49bf45573`](https://github.com/Khan/perseus/commit/49bf4557313c7d69d5a287095991cf11cbc81752) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add labels to locked lines' defining points in the graph and editor

-   [#1644](https://github.com/Khan/perseus/pull/1644) [`136b6e54c`](https://github.com/Khan/perseus/commit/136b6e54cf6ab1a8514533bad03ac7f752532084) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add/edit/delete locked line labels

### Patch Changes

-   [#1646](https://github.com/Khan/perseus/pull/1646) [`7822ea63c`](https://github.com/Khan/perseus/commit/7822ea63c9f91adebe2b6ea0841db1ae62c9d088) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - Keyboard support for unlimited point graphs

*   [#1651](https://github.com/Khan/perseus/pull/1651) [`1080a628b`](https://github.com/Khan/perseus/commit/1080a628bd77139be91987763153273318dd8792) Thanks [@handeyeco](https://github.com/handeyeco)! - Consolidate Measurer and DeprecatedStandin to use noopValidator

-   [#1640](https://github.com/Khan/perseus/pull/1640) [`d766b33dd`](https://github.com/Khan/perseus/commit/d766b33dd70d63e2441fa1655ca30230432a6418) Thanks [@Myranae](https://github.com/Myranae)! - Move validation logic out of the Input Number widget

*   [#1657](https://github.com/Khan/perseus/pull/1657) [`25d45af95`](https://github.com/Khan/perseus/commit/25d45af95aaacf302a7ea0cceae9d4c0cf1cab0b) Thanks [@benchristel](https://github.com/benchristel)! - Internal: delete an outdated comment

-   [#1649](https://github.com/Khan/perseus/pull/1649) [`b5594e81d`](https://github.com/Khan/perseus/commit/b5594e81d81bbc9dcd100bfc35dbca98c2241c51) Thanks [@handeyeco](https://github.com/handeyeco)! - Custom Jest matchers for PerseusScore

*   [#1641](https://github.com/Khan/perseus/pull/1641) [`f5ceabb7d`](https://github.com/Khan/perseus/commit/f5ceabb7dbdfc984d08eed0ea55cf4202ca276e2) Thanks [@Myranae](https://github.com/Myranae)! - Move validation logic out of the Categorizer widget

-   [#1636](https://github.com/Khan/perseus/pull/1636) [`64bcde0a1`](https://github.com/Khan/perseus/commit/64bcde0a1f98b4232e5347a06f4c8cad7265d006) Thanks [@handeyeco](https://github.com/handeyeco)! - Small tweak to validation logic for non-interactive widgets

## 34.0.0

### Major Changes

-   [#1629](https://github.com/Khan/perseus/pull/1629) [`98eaad0d1`](https://github.com/Khan/perseus/commit/98eaad0d13fd778309fd69f8515c5d90e10d4880) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove WidgetJsonifyDeprecated

### Minor Changes

-   [#1630](https://github.com/Khan/perseus/pull/1630) [`fd474e58e`](https://github.com/Khan/perseus/commit/fd474e58edc39956b885fe1db323789c0db7e435) Thanks [@handeyeco](https://github.com/handeyeco)! - Convert some PropTypes to TS

*   [#1638](https://github.com/Khan/perseus/pull/1638) [`973de7a65`](https://github.com/Khan/perseus/commit/973de7a653a5dd176a65cde35cfb3c0fb4efea69) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add/Edit/Delete locked point labels in the editor

-   [#1637](https://github.com/Khan/perseus/pull/1637) [`56166be34`](https://github.com/Khan/perseus/commit/56166be340c7c408767884be975ea157052e93df) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Locked points: Add the labels field to LockedPointType and the feature flag for locked point labels

### Patch Changes

-   [#1625](https://github.com/Khan/perseus/pull/1625) [`732a052f8`](https://github.com/Khan/perseus/commit/732a052f8966163768b9ee04fd6bbf504abf1902) Thanks [@handeyeco](https://github.com/handeyeco)! - move expression validator out of the component

*   [#1635](https://github.com/Khan/perseus/pull/1635) [`ada946eac`](https://github.com/Khan/perseus/commit/ada946eac97610ffe3b5e52789bd64aaf5e08014) Thanks [@handeyeco](https://github.com/handeyeco)! - Split NumericInputValidator from NumericInput

-   [#1626](https://github.com/Khan/perseus/pull/1626) [`1b71657a0`](https://github.com/Khan/perseus/commit/1b71657a0b4494cdcac40ae7e232f645067894a8) Thanks [@handeyeco](https://github.com/handeyeco)! - Consolidate noop validation logic

*   [#1628](https://github.com/Khan/perseus/pull/1628) [`45bb43b92`](https://github.com/Khan/perseus/commit/45bb43b923a2498747fdf4a42388d3cda8354078) Thanks [@handeyeco](https://github.com/handeyeco)! - Move validation logic out of the Dropdown widget

-   [#1631](https://github.com/Khan/perseus/pull/1631) [`e910f9b80`](https://github.com/Khan/perseus/commit/e910f9b80558481dfbe4a2420935a98b32190d13) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Removing deprecated/discouraged widgets from the Perseus Editor experience.

## 33.3.0

### Minor Changes

-   [#1615](https://github.com/Khan/perseus/pull/1615) [`51b6e1431`](https://github.com/Khan/perseus/commit/51b6e14319ec34ee0bf661f047f138f7b63034c1) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - Aligns unlimited point user experience for mouse+touch users

*   [#1605](https://github.com/Khan/perseus/pull/1605) [`ddc3f5d05`](https://github.com/Khan/perseus/commit/ddc3f5d057da2d2c96ba92c5f5784c245ce6f573) Thanks [@benchristel](https://github.com/benchristel)! - Add 'None' graph type, for graphs that should only display locked figures.

### Patch Changes

-   [#1632](https://github.com/Khan/perseus/pull/1632) [`cea62ad11`](https://github.com/Khan/perseus/commit/cea62ad11fa39234da56d1a0d7d876212a1be56a) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Minor regression fix for bounding of interactive elements in the Interactive Graph widget.

*   [#1622](https://github.com/Khan/perseus/pull/1622) [`12b8e01bf`](https://github.com/Khan/perseus/commit/12b8e01bf89abbc88d6bfc9bf243d5a0e95b5ed3) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix types for `classnames` package usages

## 33.2.1

### Patch Changes

-   [#1619](https://github.com/Khan/perseus/pull/1619) [`ab7b0fde5`](https://github.com/Khan/perseus/commit/ab7b0fde555cd201a23be2efdaa5ae4e2528e1f8) Thanks [@aemandine](https://github.com/aemandine)! - Remove fullscreen button on broken URL

*   [#1617](https://github.com/Khan/perseus/pull/1617) [`67aa2aa50`](https://github.com/Khan/perseus/commit/67aa2aa5011c0d367f49f66beb12bd5b5a6e4e57) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Refactor the mafs graph so the locked labels layer is between the interactive layer and background layer ("Mafs sandwich")

-   [#1620](https://github.com/Khan/perseus/pull/1620) [`dbac5d491`](https://github.com/Khan/perseus/commit/dbac5d491386fc0daf813d583de02af55b02920f) Thanks [@aemandine](https://github.com/aemandine)! - Add code coverage

## 33.2.0

### Minor Changes

-   [#1598](https://github.com/Khan/perseus/pull/1598) [`d266ba110`](https://github.com/Khan/perseus/commit/d266ba110b5acc644f4bafec7940753bb1b95600) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - Add a delete button to unlimited point graphs

### Patch Changes

-   [#1612](https://github.com/Khan/perseus/pull/1612) [`f28d610a1`](https://github.com/Khan/perseus/commit/f28d610a18495ef6b9b0d6a52924cbfd12aa2fe3) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Delete redundant `throw` statement.

*   [#1282](https://github.com/Khan/perseus/pull/1282) [`67c58b4ad`](https://github.com/Khan/perseus/commit/67c58b4ada8b2543de5c4defb09fa1eed4cbc538) Thanks [@Myranae](https://github.com/Myranae)! - Update KhanColors object to use WB color tokens to fix low contrast issues

-   [#1616](https://github.com/Khan/perseus/pull/1616) [`e533822aa`](https://github.com/Khan/perseus/commit/e533822aa7e54517b19ded83720c0fa706805041) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - BUGFIX - Some Graphie labels were misaligned due to recent code adjustment (LEMS-2022)

## 33.1.0

### Minor Changes

-   [#1452](https://github.com/Khan/perseus/pull/1452) [`3980a36fa`](https://github.com/Khan/perseus/commit/3980a36fa2eb66c61d648d82e73d323ab8b8f5b0) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Implementation of SVG-based Axis Tick Labels for Interactive Graph

### Patch Changes

-   [#1609](https://github.com/Khan/perseus/pull/1609) [`981047211`](https://github.com/Khan/perseus/commit/9810472110434f22d8f446e9e6bf4bd69cdc3136) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Remove the start-coords-ui flags

*   [#1610](https://github.com/Khan/perseus/pull/1610) [`e9b317ca0`](https://github.com/Khan/perseus/commit/e9b317ca0398bb39de7b3605247d2abec09d791a) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Remove the start coords UI if the graph is static

-   [#1608](https://github.com/Khan/perseus/pull/1608) [`737fe30b4`](https://github.com/Khan/perseus/commit/737fe30b492c598c70b7bb1cebad00adf9a25c93) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Remove the interactive-graph-locked-feature-m2b flag

## 33.0.0

### Major Changes

-   [#1591](https://github.com/Khan/perseus/pull/1591) [`05d048026`](https://github.com/Khan/perseus/commit/05d04802603fde4ca5be1fcf88ade7c09fb49c96) Thanks [@handeyeco](https://github.com/handeyeco)! - Move interaction-editor sub-components into perseus-editor

### Minor Changes

-   [#1568](https://github.com/Khan/perseus/pull/1568) [`eddcb9417`](https://github.com/Khan/perseus/commit/eddcb941742355bd4f339fd727ac97bb340ee474) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph + Editor] Add a full graph aria-label and aria-description/describedby to interactive graphs, as well as the UI for content authors to add this in the interactive graph editor

### Patch Changes

-   [#1540](https://github.com/Khan/perseus/pull/1540) [`08068dc71`](https://github.com/Khan/perseus/commit/08068dc7131d00ea0c74b90e9798cda47902a5f5) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Resolve improperly scaled text/labels in Graphie images when viewed in mobile (constrained viewports)

*   [#1592](https://github.com/Khan/perseus/pull/1592) [`d88b0ffdf`](https://github.com/Khan/perseus/commit/d88b0ffdf1eb61f2efb0f589efe81dbbf5088947) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Move tests, test data, and Storybook stories for the Interactive Graph widget to the directory specific to that widget.

-   [#1594](https://github.com/Khan/perseus/pull/1594) [`435f3f6d8`](https://github.com/Khan/perseus/commit/435f3f6d8c70de980afc5beb3ac981d9a3f6a4a3) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Remove Storybook stories that generate random widgets

*   [#1599](https://github.com/Khan/perseus/pull/1599) [`71715afd2`](https://github.com/Khan/perseus/commit/71715afd2418f16d23d04cb57252a1940597cfa0) Thanks [@benchristel](https://github.com/benchristel)! - Internal: improve type safety of interactive graph editor

-   [#1590](https://github.com/Khan/perseus/pull/1590) [`6c4e9e154`](https://github.com/Khan/perseus/commit/6c4e9e154aea90f0ab484e9efc39a351f4790d9d) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Move InteractiveGraphEditor to its own directory

## 32.0.1

### Patch Changes

-   [#1595](https://github.com/Khan/perseus/pull/1595) [`b54f886f6`](https://github.com/Khan/perseus/commit/b54f886f64fced1fe0c211369f5d89a7c459dd97) Thanks [@aemandine](https://github.com/aemandine)! - Make iframe sizing responsive

*   [#1588](https://github.com/Khan/perseus/pull/1588) [`9dad8a089`](https://github.com/Khan/perseus/commit/9dad8a0891bbd3e4a9943fade3c00c073a281541) Thanks [@benchristel](https://github.com/benchristel)! - Remove unused handling of deprecated Interactive Graph prop

## 32.0.0

### Major Changes

-   [#1577](https://github.com/Khan/perseus/pull/1577) [`c875acd01`](https://github.com/Khan/perseus/commit/c875acd01fe8cfa84a2b10177a6fcedfb612cb3f) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove example widgets and their editors

### Minor Changes

-   [#1570](https://github.com/Khan/perseus/pull/1570) [`c4432ffad`](https://github.com/Khan/perseus/commit/c4432ffad978a224b7d981e1577c7897342a01ee) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - Remove unlimited points via keyboard

*   [#1582](https://github.com/Khan/perseus/pull/1582) [`377b7ce68`](https://github.com/Khan/perseus/commit/377b7ce68801cef99cd3a09474b28a8b60f90f0a) Thanks [@aemandine](https://github.com/aemandine)! - Add save warnings to PhET widget editor and un-hide widget from content editor widget dropdown

### Patch Changes

-   [#1578](https://github.com/Khan/perseus/pull/1578) [`78bb8573e`](https://github.com/Khan/perseus/commit/78bb8573e9b00992554c2b1339678cc78363773b) Thanks [@aemandine](https://github.com/aemandine)! - Remove simpleValidate from PhET widget

*   [#1585](https://github.com/Khan/perseus/pull/1585) [`a6ec402c0`](https://github.com/Khan/perseus/commit/a6ec402c0e41dae1dbd980106265929ebe761bce) Thanks [@handeyeco](https://github.com/handeyeco)! - Reorganize files in the widgets folder

-   [#1589](https://github.com/Khan/perseus/pull/1589) [`d56952564`](https://github.com/Khan/perseus/commit/d569525643d1dcf9c2cca78bc3b5ce18b7f584d1) Thanks [@aemandine](https://github.com/aemandine)! - Make PhET widget smaller

*   [#1587](https://github.com/Khan/perseus/pull/1587) [`8015cdefb`](https://github.com/Khan/perseus/commit/8015cdefbafa094e9e1969ddb6ec39033c990687) Thanks [@aemandine](https://github.com/aemandine)! - Tidying up PhET widget

-   [#1583](https://github.com/Khan/perseus/pull/1583) [`615567bd2`](https://github.com/Khan/perseus/commit/615567bd2eeec45d16d845a1cb8bd5c33c04d701) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove sort-comp exceptions and reorder components

## 31.1.0

### Minor Changes

-   [#1572](https://github.com/Khan/perseus/pull/1572) [`efced74db`](https://github.com/Khan/perseus/commit/efced74db8f560d3df53c67c54ee7b74c45405cf) Thanks [@benchristel](https://github.com/benchristel)! - In the interactive graph widget, focus movable points on mouse interaction

### Patch Changes

-   [#1552](https://github.com/Khan/perseus/pull/1552) [`873f10790`](https://github.com/Khan/perseus/commit/873f1079076f80ed28705e1da1cf0c0dcfb79aac) Thanks [@nishasy](https://github.com/nishasy)! - Update dependency on wonder-blocks-form

*   [#1569](https://github.com/Khan/perseus/pull/1569) [`40d0b67a8`](https://github.com/Khan/perseus/commit/40d0b67a87bbb2ef5e3afcb7421ff8b64406adcb) Thanks [@handeyeco](https://github.com/handeyeco)! - bump peer dependencies to match webapp

-   [#1548](https://github.com/Khan/perseus/pull/1548) [`21a908e8f`](https://github.com/Khan/perseus/commit/21a908e8f9eec99ec1fabe1c311f0417828f5575) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixing resizing behavior of Expression Widget in 400% zoom.

*   [#1576](https://github.com/Khan/perseus/pull/1576) [`598f7450f`](https://github.com/Khan/perseus/commit/598f7450faf4a639ff41a26e2946234c37e3320d) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Small re-organization of PhET widget code - no functional changes

-   [#1567](https://github.com/Khan/perseus/pull/1567) [`070430166`](https://github.com/Khan/perseus/commit/070430166e3ad987300aa5db1a8c6f385d27d734) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - Add a reducer action for removing unlimited points

*   [#1573](https://github.com/Khan/perseus/pull/1573) [`50c1b19e5`](https://github.com/Khan/perseus/commit/50c1b19e529e5c096abdd2512c7e17e9f717a3cb) Thanks [@benchristel](https://github.com/benchristel)! - Internal: fix incorrect comment

*   Updated dependencies [[`40d0b67a8`](https://github.com/Khan/perseus/commit/40d0b67a87bbb2ef5e3afcb7421ff8b64406adcb), [`21a908e8f`](https://github.com/Khan/perseus/commit/21a908e8f9eec99ec1fabe1c311f0417828f5575)]:
    -   @khanacademy/keypad-context@1.0.1
    -   @khanacademy/math-input@21.0.2
    -   @khanacademy/simple-markdown@0.13.1
    -   @khanacademy/pure-markdown@0.3.8

## 31.0.1

### Patch Changes

-   [#1549](https://github.com/Khan/perseus/pull/1549) [`cae713da5`](https://github.com/Khan/perseus/commit/cae713da54be20aba8150f98b8f99ade9c2a8bb7) Thanks [@aemandine](https://github.com/aemandine)! - Refactor PhET Sim widget name to PhET Simulation

## 31.0.0

### Major Changes

-   [#1546](https://github.com/Khan/perseus/pull/1546) [`6cbe4947e`](https://github.com/Khan/perseus/commit/6cbe4947e441d0723bb333409752f8d66473af73) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Release PhET widget

    This PR releases a new PhET simulation widget to Perseus that requires an
    update in order to allow the support of new, upcoming content. Older versions
    of Perseus will be unable to render content that contains this widget.

    PhET simulations come from https://phet.colorado.edu/.

### Minor Changes

-   [#1529](https://github.com/Khan/perseus/pull/1529) [`0bf2711c0`](https://github.com/Khan/perseus/commit/0bf2711c02f8a383235a5d524b29bc184ced3aa1) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - Adds unlimited point graph

*   [#1542](https://github.com/Khan/perseus/pull/1542) [`a7fc2a3e3`](https://github.com/Khan/perseus/commit/a7fc2a3e3230ad695d3ab5fb8ff1dd9b40711250) Thanks [@aemandine](https://github.com/aemandine)! - Design update for PhET widget

-   [#1512](https://github.com/Khan/perseus/pull/1512) [`4f24be79d`](https://github.com/Khan/perseus/commit/4f24be79d599a5fc53a14130d1cad86adb48cd2e) Thanks [@aemandine](https://github.com/aemandine)! - Add PhET widget

*   [#1532](https://github.com/Khan/perseus/pull/1532) [`6e102f9c4`](https://github.com/Khan/perseus/commit/6e102f9c4d15b4b1a94a97b98684a1a997590121) Thanks [@aemandine](https://github.com/aemandine)! - Add a content editor for the PhET widget

-   [#1533](https://github.com/Khan/perseus/pull/1533) [`cc1995daf`](https://github.com/Khan/perseus/commit/cc1995dafaac637b035c71270e4d4e6f57a15e19) Thanks [@nishasy](https://github.com/nishasy)! - [Locked labels] View locked labels in an Interactive Graph

### Patch Changes

-   [#1539](https://github.com/Khan/perseus/pull/1539) [`7805626e1`](https://github.com/Khan/perseus/commit/7805626e10bde2d256d9523709fdba3267cea381) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Labels] Implement adding/editing/deleting a standalone locked label

*   [#1541](https://github.com/Khan/perseus/pull/1541) [`36471197c`](https://github.com/Khan/perseus/commit/36471197cc25d78b8f9515ba0da04875480c788d) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - Adds a finite point question to dev gallery

## 30.0.1

### Patch Changes

-   [#1538](https://github.com/Khan/perseus/pull/1538) [`96f0337ce`](https://github.com/Khan/perseus/commit/96f0337ce459dea6a0860b45704e188876d38720) Thanks [@handeyeco](https://github.com/handeyeco)! - Use Portuguese sen and tg when updating Mathquill from the keypad

*   [#1530](https://github.com/Khan/perseus/pull/1530) [`811f914cb`](https://github.com/Khan/perseus/commit/811f914cbded3a9a3af1c08cc6aa79cadb1dbb23) Thanks [@handeyeco](https://github.com/handeyeco)! - Add SharedRendererProps type

*   Updated dependencies [[`f5a2cf521`](https://github.com/Khan/perseus/commit/f5a2cf521291180dbbd448adc97700f7c52c8b50), [`e19c58eb9`](https://github.com/Khan/perseus/commit/e19c58eb9f0ef84c32dfdb40a4382cfa4c82392d), [`96f0337ce`](https://github.com/Khan/perseus/commit/96f0337ce459dea6a0860b45704e188876d38720), [`f5a2cf521`](https://github.com/Khan/perseus/commit/f5a2cf521291180dbbd448adc97700f7c52c8b50)]:
    -   @khanacademy/perseus-linter@1.2.0
    -   @khanacademy/kas@0.3.12
    -   @khanacademy/math-input@21.0.1

## 30.0.0

### Major Changes

-   [#1536](https://github.com/Khan/perseus/pull/1536) [`78a5558f9`](https://github.com/Khan/perseus/commit/78a5558f93c966a076a35b74c5c01d697408ce84) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Revert introduction of ContentPreview component (broke editor linting tooltip)"

## 29.0.0

### Major Changes

-   [#1525](https://github.com/Khan/perseus/pull/1525) [`426a3ae1d`](https://github.com/Khan/perseus/commit/426a3ae1d5a7f0aef20ccea6b99ada6929e1abc4) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change PerseusItem to no longer include multi items

### Patch Changes

-   [#275](https://github.com/Khan/perseus/pull/275) [`3e6a65378`](https://github.com/Khan/perseus/commit/3e6a6537842ce2659ff2a12523a75b41a90681e6) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Perseus no longer depends on window.KhanUtil nor window.Exercises

*   [#1521](https://github.com/Khan/perseus/pull/1521) [`a9292af78`](https://github.com/Khan/perseus/commit/a9292af78f569b703fcae07de01852f264861158) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Migrate Lint component to use WonderBlocks ToolTip

-   [#1522](https://github.com/Khan/perseus/pull/1522) [`da65a54a2`](https://github.com/Khan/perseus/commit/da65a54a2cadc381c19255e9c2a402ed74733449) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Update internal imports to use relative paths instead of package name

*   [#1523](https://github.com/Khan/perseus/pull/1523) [`250971357`](https://github.com/Khan/perseus/commit/25097135792ecb1b5679d6fc8b41dc0c5bb1da9b) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Stop the Mafs graphs from being user selectable

## 28.2.0

### Minor Changes

-   [#1503](https://github.com/Khan/perseus/pull/1503) [`f08320034`](https://github.com/Khan/perseus/commit/f083200340545f41275f0696dbfc967f45028b0c) Thanks [@benchristel](https://github.com/benchristel)! - Add static mode to interactive graph

*   [#1511](https://github.com/Khan/perseus/pull/1511) [`7eb7ab165`](https://github.com/Khan/perseus/commit/7eb7ab165e20af37ee10ad38c2bbef8538c79f08) Thanks [@benchristel](https://github.com/benchristel)! - Warn content creators when a static widget appears in a question stem

### Patch Changes

-   [#877](https://github.com/Khan/perseus/pull/877) [`720e3bfd2`](https://github.com/Khan/perseus/commit/720e3bfd2d7f46fdbb25db2f561d0f519ae4c9b3) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove unused Less variables

*   [#1502](https://github.com/Khan/perseus/pull/1502) [`84d9c62d2`](https://github.com/Khan/perseus/commit/84d9c62d2ae7b55680f2ef90c5915e7f7406020d) Thanks [@handeyeco](https://github.com/handeyeco)! - Break out keypad-context from math-input to reduce bundle size

*   Updated dependencies [[`7eb7ab165`](https://github.com/Khan/perseus/commit/7eb7ab165e20af37ee10ad38c2bbef8538c79f08), [`84d9c62d2`](https://github.com/Khan/perseus/commit/84d9c62d2ae7b55680f2ef90c5915e7f7406020d)]:
    -   @khanacademy/perseus-linter@1.1.0
    -   @khanacademy/keypad-context@1.0.0
    -   @khanacademy/math-input@21.0.0

## 28.1.0

### Minor Changes

-   [#1480](https://github.com/Khan/perseus/pull/1480) [`182c8f660`](https://github.com/Khan/perseus/commit/182c8f6600bbefa817c4553e3827498b8d425bbe) Thanks [@handeyeco](https://github.com/handeyeco)! - Refactor ExpressionEditor to use Wonder-Blocks

### Patch Changes

-   [#1490](https://github.com/Khan/perseus/pull/1490) [`c2464eef8`](https://github.com/Khan/perseus/commit/c2464eef807b0b1c2696e553300026462262544d) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Explicitly export bundled css in package.json

*   [#1501](https://github.com/Khan/perseus/pull/1501) [`3f18a2211`](https://github.com/Khan/perseus/commit/3f18a22118ad9b952009a78c30bb1c8242e81d9c) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - updates math input to fix color contrast issues

-   [#1505](https://github.com/Khan/perseus/pull/1505) [`3f9cc14fe`](https://github.com/Khan/perseus/commit/3f9cc14fe469a6792b56edf2510f0adebd65fd73) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph: test utils] Do not set the coords field by default in the builder

-   Updated dependencies [[`5b6b97641`](https://github.com/Khan/perseus/commit/5b6b976416f885c08bda2ead5948fcdbe94dc380), [`c2464eef8`](https://github.com/Khan/perseus/commit/c2464eef807b0b1c2696e553300026462262544d), [`3f18a2211`](https://github.com/Khan/perseus/commit/3f18a22118ad9b952009a78c30bb1c8242e81d9c)]:
    -   @khanacademy/math-input@20.1.2

## 28.0.0

### Major Changes

-   [#1479](https://github.com/Khan/perseus/pull/1479) [`ef96cdd54`](https://github.com/Khan/perseus/commit/ef96cdd541999a203cbde089c76cc132b937adce) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove PropCheckBox component from Perseus; use WB instead

### Minor Changes

-   [#1455](https://github.com/Khan/perseus/pull/1455) [`8b0268215`](https://github.com/Khan/perseus/commit/8b02682152223982f80e7bee38e9567027b8ed4e) Thanks [@Myranae](https://github.com/Myranae)! - Update Polygon graphs to have weighted lines only on keyboard focus

*   [#1492](https://github.com/Khan/perseus/pull/1492) [`2ebbc1978`](https://github.com/Khan/perseus/commit/2ebbc1978da4d021e7044ac49829063e356af846) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Build the foundation for adding start coords UI for angle graphs

-   [#1428](https://github.com/Khan/perseus/pull/1428) [`eb9f3f9c0`](https://github.com/Khan/perseus/commit/eb9f3f9c064e6b6260bd667222f7370aae263715) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Drop katex dependency - no longer used

*   [#1472](https://github.com/Khan/perseus/pull/1472) [`4c2ace57a`](https://github.com/Khan/perseus/commit/4c2ace57a922a527579293c065f8ed8120193344) Thanks [@benchristel](https://github.com/benchristel)! - Add keyboard controls to Mafs angle graphs

-   [#1487](https://github.com/Khan/perseus/pull/1487) [`53031f8df`](https://github.com/Khan/perseus/commit/53031f8df120a7ea15b6d82e5a94988d9281a9b3) Thanks [@Myranae](https://github.com/Myranae)! - Make graphs non-interactive via keyboard when their question has been answered correctly

*   [#1486](https://github.com/Khan/perseus/pull/1486) [`0b625f560`](https://github.com/Khan/perseus/commit/0b625f56098c4db142891ab4ffed2b2300924711) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Add start coords UI for point graphs

-   [#1488](https://github.com/Khan/perseus/pull/1488) [`0bec013e8`](https://github.com/Khan/perseus/commit/0bec013e89c70dd431f86b4872dd3378ed29e110) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Add start coords UI for polygon graphs (snap to grid only)

### Patch Changes

-   [#1474](https://github.com/Khan/perseus/pull/1474) [`a8aaac339`](https://github.com/Khan/perseus/commit/a8aaac33921f31c65e8cb02c0eb66d15fc4f019e) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Minor type fixes in the `ImageLoader` and `SvgImage` components

*   [#1493](https://github.com/Khan/perseus/pull/1493) [`de13fd337`](https://github.com/Khan/perseus/commit/de13fd3378cb078119f2b5311d347d4ee3b1d687) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Add/Edit/Delete Locked Function in Interactive Graph Editor

-   [#1476](https://github.com/Khan/perseus/pull/1476) [`18f38fca4`](https://github.com/Khan/perseus/commit/18f38fca404678ff6162df09355acb072a1e6120) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Miscellaneous type improvements

*   [#1489](https://github.com/Khan/perseus/pull/1489) [`de2883b3f`](https://github.com/Khan/perseus/commit/de2883b3fdc7a6e294c39b33cd2989aed75cd969) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Correct `hints` type on ItemRenderer

-   [#1478](https://github.com/Khan/perseus/pull/1478) [`7fd586ef4`](https://github.com/Khan/perseus/commit/7fd586ef4a36c753bb57f1f0eb0c0f98afe8fa0d) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Add "white" as a fill option for locked ellipses and polygons

*   [#1482](https://github.com/Khan/perseus/pull/1482) [`f920a4cc7`](https://github.com/Khan/perseus/commit/f920a4cc7f0e8e8072ee55598e8e13698d6dc2cf) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor: Storybook] Add a story for Point graph type start coords

-   [#1484](https://github.com/Khan/perseus/pull/1484) [`808956098`](https://github.com/Khan/perseus/commit/808956098d9502cff4d9759ee07d6dcaa61a83ab) Thanks [@handeyeco](https://github.com/handeyeco)! - Minor cleanup around InfoTip

*   [#1475](https://github.com/Khan/perseus/pull/1475) [`6a218bcc1`](https://github.com/Khan/perseus/commit/6a218bcc1a7757dd93c1b90dfc03bd1c3715c8c8) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - add non-visual text as a description for expression widget

*   Updated dependencies [[`6c6ff52f4`](https://github.com/Khan/perseus/commit/6c6ff52f4725ff78f50bd6ca71f201a6c9ab786b), [`342a72211`](https://github.com/Khan/perseus/commit/342a722119f549f20e71ff1e44d2bba6c44c9ba3), [`5e66539e6`](https://github.com/Khan/perseus/commit/5e66539e6a3edfd784041c5ba2b17135eafebe1b)]:
    -   @khanacademy/math-input@20.1.1

## 27.2.0

### Minor Changes

-   [#1468](https://github.com/Khan/perseus/pull/1468) [`af68a9e08`](https://github.com/Khan/perseus/commit/af68a9e082f7b042aeb516ddba38274fcc66c4fc) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Add start coords UI for sinusoid graphs

*   [#1469](https://github.com/Khan/perseus/pull/1469) [`6e1ec850c`](https://github.com/Khan/perseus/commit/6e1ec850c7efb186444dcd9023e2a2c37cd731d2) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Add start coords UI for quadratic graphs

### Patch Changes

-   [#1470](https://github.com/Khan/perseus/pull/1470) [`942b0a9a5`](https://github.com/Khan/perseus/commit/942b0a9a5c42b92137a024b3c76ba8e99df55440) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Locked Figures] Remove m2 flag from the code

*   [#1465](https://github.com/Khan/perseus/pull/1465) [`94ad04fee`](https://github.com/Khan/perseus/commit/94ad04fee00ae4601ed5d23a19bfeb9f68964c74) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Add separate flags for graph types

-   [#1432](https://github.com/Khan/perseus/pull/1432) [`ed6737025`](https://github.com/Khan/perseus/commit/ed67370251d2ebff672423b8e4da839c9dfb78c7) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bug fix to ensure that new angle graphs are scored correctly.

## 27.1.0

### Minor Changes

-   [#1453](https://github.com/Khan/perseus/pull/1453) [`79a09d62f`](https://github.com/Khan/perseus/commit/79a09d62f532fd3373fea4838c0d72812de14046) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Implement the UI for adding start coords for circle graphs

*   [#1404](https://github.com/Khan/perseus/pull/1404) [`284e068b8`](https://github.com/Khan/perseus/commit/284e068b8e3bfb1f9ab49d84d209c5f9ef2d93c1) Thanks [@handeyeco](https://github.com/handeyeco)! - Add label options for Expression

### Patch Changes

-   Updated dependencies [[`284e068b8`](https://github.com/Khan/perseus/commit/284e068b8e3bfb1f9ab49d84d209c5f9ef2d93c1)]:
    -   @khanacademy/math-input@20.1.0

## 27.0.2

### Patch Changes

-   [#1461](https://github.com/Khan/perseus/pull/1461) [`2e8022adb`](https://github.com/Khan/perseus/commit/2e8022adb11a000fb77528b1268ad5725dec817b) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Reverting portal disabled functionality to ensure no clipping behavior.

-   Updated dependencies [[`2e8022adb`](https://github.com/Khan/perseus/commit/2e8022adb11a000fb77528b1268ad5725dec817b)]:
    -   @khanacademy/math-input@20.0.3

## 27.0.1

### Patch Changes

-   [#1459](https://github.com/Khan/perseus/pull/1459) [`be40d776a`](https://github.com/Khan/perseus/commit/be40d776a5ee6bbf4c5af4df57889a32e9b8b3bf) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Guard against executing matchMedia during initial render

-   Updated dependencies [[`ca31afb35`](https://github.com/Khan/perseus/commit/ca31afb359cc00035a4af965f19d20d7919a14a5)]:
    -   @khanacademy/kas@0.3.11

## 27.0.0

### Major Changes

-   [#1456](https://github.com/Khan/perseus/pull/1456) [`b868801fa`](https://github.com/Khan/perseus/commit/b868801fab4ea28930f21be12d671e63f79b50ab) Thanks [@benchristel](https://github.com/benchristel)! - Remove unused "Show ruler" option from the interactive graph editor. The
    new Mafs version of the interactive graph does not implement the ruler,
    and we have no plans to implement it, since it can't be made accessible
    and isn't used in Khan Academy's existing content.

*   [#1450](https://github.com/Khan/perseus/pull/1450) [`2216ad012`](https://github.com/Khan/perseus/commit/2216ad012668a5627c1ff3934bf600cc0788e335) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove Unit aka UnitInput widget

### Minor Changes

-   [#1451](https://github.com/Khan/perseus/pull/1451) [`9bc4812fc`](https://github.com/Khan/perseus/commit/9bc4812fcfb3a08a083124e56f9378e8aefbc8ef) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Upgrade Mafs Dependency to v0.19.0 for Domain Restricted Functions

*   [#1441](https://github.com/Khan/perseus/pull/1441) [`9bc264ce1`](https://github.com/Khan/perseus/commit/9bc264ce10dc8a6c0a26b26e7568f4cd3c2bd4fe) Thanks [@Myranae](https://github.com/Myranae)! - Turn off interactivity when Interactive Graph in hint mode

-   [#1437](https://github.com/Khan/perseus/pull/1437) [`7a448e77c`](https://github.com/Khan/perseus/commit/7a448e77c18d9c8437c24e6567f1e4fa03efc6b9) Thanks [@Myranae](https://github.com/Myranae)! - Update Polygon to be filled on hover

*   [#1422](https://github.com/Khan/perseus/pull/1422) [`c386515ad`](https://github.com/Khan/perseus/commit/c386515ad52eef657f41ba7039614bc96e96e024) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Segment and Linear System graph start coords UI

### Patch Changes

-   [#1448](https://github.com/Khan/perseus/pull/1448) [`84675574c`](https://github.com/Khan/perseus/commit/84675574c95341d422eda61867e745627b76d349) Thanks [@nishasy](https://github.com/nishasy)! - Cleaned up the `startCoords` code in the stateful mafs graph useEffect

*   [#1444](https://github.com/Khan/perseus/pull/1444) [`130ab9446`](https://github.com/Khan/perseus/commit/130ab94465da943c1582851122a409d72c6a96e1) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - Throttles point-moving performance in polygon

-   [#1445](https://github.com/Khan/perseus/pull/1445) [`bb1ac584b`](https://github.com/Khan/perseus/commit/bb1ac584b35e6c85284472d796bc4a4345349628) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - useDraggable - fix to ignore keyup events (we don't want to treat keyup events as an intent to move - we have keydown for that)

-   Updated dependencies [[`7e71f8e8a`](https://github.com/Khan/perseus/commit/7e71f8e8a114d80ad7d26f478c31149d9009a9e5)]:
    -   @khanacademy/math-input@20.0.2

## 26.1.0

### Minor Changes

-   [#1431](https://github.com/Khan/perseus/pull/1431) [`83bebcfaf`](https://github.com/Khan/perseus/commit/83bebcfafb7691475dda6a34aa4c92156d56a6e4) Thanks [@benchristel](https://github.com/benchristel)! - Add a `hintMode` prop to `Renderer` and widgets.

### Patch Changes

-   [#1424](https://github.com/Khan/perseus/pull/1424) [`fedac0be5`](https://github.com/Khan/perseus/commit/fedac0be518bb51345c82599b3d6729b52703961) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Updating wonderblock-popover version and disable portal functionality in Expression Popover functionality.

-   Updated dependencies [[`fedac0be5`](https://github.com/Khan/perseus/commit/fedac0be518bb51345c82599b3d6729b52703961)]:
    -   @khanacademy/math-input@20.0.1

## 26.0.0

### Major Changes

-   [#1064](https://github.com/Khan/perseus/pull/1064) [`c6a5cbe13`](https://github.com/Khan/perseus/commit/c6a5cbe13c5b586f7511e2c9cc3392d180b002df) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - React 18

### Minor Changes

-   [#1426](https://github.com/Khan/perseus/pull/1426) [`4b6fc712e`](https://github.com/Khan/perseus/commit/4b6fc712ea259eba4482480796a8b46602cb0ec1) Thanks [@benchristel](https://github.com/benchristel)! - Tweak the animation of the protractor rotation handle. It's now slightly slower and the magnification is less extreme.

### Patch Changes

-   [#1421](https://github.com/Khan/perseus/pull/1421) [`9a3bce37f`](https://github.com/Khan/perseus/commit/9a3bce37fe0d4718638b2571fab7081217b9f6cc) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Enhance types in tests using @testing-library/user-event

*   [#1064](https://github.com/Khan/perseus/pull/1064) [`c6a5cbe13`](https://github.com/Khan/perseus/commit/c6a5cbe13c5b586f7511e2c9cc3392d180b002df) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix: prevent `react` and `react-dom` from being bundled

*   Updated dependencies [[`9a3bce37f`](https://github.com/Khan/perseus/commit/9a3bce37fe0d4718638b2571fab7081217b9f6cc), [`c6a5cbe13`](https://github.com/Khan/perseus/commit/c6a5cbe13c5b586f7511e2c9cc3392d180b002df), [`c6a5cbe13`](https://github.com/Khan/perseus/commit/c6a5cbe13c5b586f7511e2c9cc3392d180b002df), [`c6a5cbe13`](https://github.com/Khan/perseus/commit/c6a5cbe13c5b586f7511e2c9cc3392d180b002df)]:
    -   @khanacademy/math-input@20.0.0
    -   @khanacademy/simple-markdown@0.13.0
    -   @khanacademy/pure-markdown@0.3.7

## 25.1.1

### Patch Changes

-   [#1408](https://github.com/Khan/perseus/pull/1408) [`c41662717`](https://github.com/Khan/perseus/commit/c41662717e5ee795bce17d4fe283ceeb6ff6620f) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Move code for interactive graph grids and axes to a `backgrounds` folder

*   [#1409](https://github.com/Khan/perseus/pull/1409) [`3ff40dd23`](https://github.com/Khan/perseus/commit/3ff40dd23396771be7dbdd1d549a2dc730a5cac4) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph: Test Utils] Update the interactive graph question builder with all options + update testdata to use builder

-   [#1410](https://github.com/Khan/perseus/pull/1410) [`a8eb6908b`](https://github.com/Khan/perseus/commit/a8eb6908b07c37771dc2b011f76e8ae4855c3479) Thanks [@benchristel](https://github.com/benchristel)! - Internal: refactor interactive graph reducer actions to make it clearer which actions go with which graph type

*   [#1420](https://github.com/Khan/perseus/pull/1420) [`a9dbbc4b1`](https://github.com/Khan/perseus/commit/a9dbbc4b1d6ada81f22b5466df86436e8d773921) Thanks [@benchristel](https://github.com/benchristel)! - Internal: refactor interactive graph reducer actions for clarity

## 25.1.0

### Minor Changes

-   [#1382](https://github.com/Khan/perseus/pull/1382) [`f392dcfba`](https://github.com/Khan/perseus/commit/f392dcfba515ac27ccaa465c2ca89bef63330837) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Implement UI to edit start coordinates for linear and ray graphs

## 25.0.0

### Major Changes

-   [#1411](https://github.com/Khan/perseus/pull/1411) [`b0df85a80`](https://github.com/Khan/perseus/commit/b0df85a803444a5de1f74672c5f0f5ccc3aa5617) Thanks [@handeyeco](https://github.com/handeyeco)! - Consolidate PerseusError code and move it into perseus-core (deletes the perseus-error package)

### Patch Changes

-   [#1405](https://github.com/Khan/perseus/pull/1405) [`a430de4c1`](https://github.com/Khan/perseus/commit/a430de4c1727afc9a71ff5a6f976579e8b17b754) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Fix console errors and warnings printed in tests

*   [#1398](https://github.com/Khan/perseus/pull/1398) [`fa19dbc97`](https://github.com/Khan/perseus/commit/fa19dbc9791e95143f6c7c784bc78332ab5cd5b0) Thanks [@benchristel](https://github.com/benchristel)! - Internal: move the getLines function to polygon.tsx

-   [#1399](https://github.com/Khan/perseus/pull/1399) [`147ab0442`](https://github.com/Khan/perseus/commit/147ab0442cc31a86553edc8535e228b5893a0acc) Thanks [@benchristel](https://github.com/benchristel)! - Internal: refactor and test `segmentsIntersect` function

*   [#1394](https://github.com/Khan/perseus/pull/1394) [`8ae3d18f1`](https://github.com/Khan/perseus/commit/8ae3d18f102c0bfc13c41c77c1ca4083e00f1dc7) Thanks [@benchristel](https://github.com/benchristel)! - Internal: move angle functions to math/angle.ts

-   [#1391](https://github.com/Khan/perseus/pull/1391) [`f5711a331`](https://github.com/Khan/perseus/commit/f5711a331f6fce02d8c5f753e752fd8665b90344) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Resolve TODO comments

*   [#1397](https://github.com/Khan/perseus/pull/1397) [`3108f933e`](https://github.com/Khan/perseus/commit/3108f933eb527b37dc4d02f3cab189c047548a11) Thanks [@benchristel](https://github.com/benchristel)! - Internal: split `MafsGraph` and `StatefulMafsGraph` into separate files.

-   [#1393](https://github.com/Khan/perseus/pull/1393) [`e6424d5e7`](https://github.com/Khan/perseus/commit/e6424d5e72c37a9c4c3b595855071a2d0af43d35) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Move and rename test files

-   Updated dependencies [[`be7f14153`](https://github.com/Khan/perseus/commit/be7f141536b6ed69bba8a4378a1ddae51fd5307e), [`b0df85a80`](https://github.com/Khan/perseus/commit/b0df85a803444a5de1f74672c5f0f5ccc3aa5617), [`24a72177e`](https://github.com/Khan/perseus/commit/24a72177edfc3471192f0f040918d998c2c6897d)]:
    -   @khanacademy/kas@0.3.10
    -   @khanacademy/kmath@0.1.13
    -   @khanacademy/math-input@19.2.1
    -   @khanacademy/perseus-linter@1.0.0
    -   @khanacademy/pure-markdown@0.3.6
    -   @khanacademy/simple-markdown@0.12.1
    -   @khanacademy/perseus-core@1.5.0

## 24.3.0

### Minor Changes

-   [#1383](https://github.com/Khan/perseus/pull/1383) [`4b56e10de`](https://github.com/Khan/perseus/commit/4b56e10dedc9b1ddc82bf7e7406ffdaecdef7462) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - View Locked Functions in the Interactive Graph

*   [#1392](https://github.com/Khan/perseus/pull/1392) [`b710d07db`](https://github.com/Khan/perseus/commit/b710d07db18579b36a5bfd448c2d0aa9144d5ac4) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Creation of new angle graph for Mafs interactive graph widget

### Patch Changes

-   [#1390](https://github.com/Khan/perseus/pull/1390) [`7e6ccf38d`](https://github.com/Khan/perseus/commit/7e6ccf38da2f385cbd7a1db4cf81f858997ffba8) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Move graphing-agnostic, mathy functions in the interactive graph code to a math/ folder.

-   Updated dependencies [[`5de483386`](https://github.com/Khan/perseus/commit/5de483386693884ccdef22b9740582e6098a5baa)]:
    -   @khanacademy/math-input@19.2.0

## 24.2.0

### Minor Changes

-   [#1386](https://github.com/Khan/perseus/pull/1386) [`5fdbeb980`](https://github.com/Khan/perseus/commit/5fdbeb980880f9239696633934c2bd95b4931db6) Thanks [@benchristel](https://github.com/benchristel)! - Add `mafs.point` flag to ApiOptions type

### Patch Changes

-   [#1388](https://github.com/Khan/perseus/pull/1388) [`94067d752`](https://github.com/Khan/perseus/commit/94067d7522a2ffcb04d213e1ebdb4a96cc0414bc) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph: Circle] Add a key prop to the circle drag handle

## 24.1.0

### Minor Changes

-   [#1376](https://github.com/Khan/perseus/pull/1376) [`3ee100add`](https://github.com/Khan/perseus/commit/3ee100add8e25da442edccfbde458f270c282112) Thanks [@benchristel](https://github.com/benchristel)! - Implement the protractor for Mafs interactive graphs

*   [#1381](https://github.com/Khan/perseus/pull/1381) [`26dceb8d7`](https://github.com/Khan/perseus/commit/26dceb8d7ada9b6f3c47893d8dfaccdbeb3df980) Thanks [@benchristel](https://github.com/benchristel)! - Make the `mafs.point` flag control whether point graphs with fixed numbers of points should use Mafs. Previously, turning on the `mafs.point` flag would enable Mafs for point graphs with unlimited points as well.

### Patch Changes

-   [#1358](https://github.com/Khan/perseus/pull/1358) [`93eeda1e2`](https://github.com/Khan/perseus/commit/93eeda1e2e45345a622f9866bcfd31a27d717e3f) Thanks [@benchristel](https://github.com/benchristel)! - Add TODO comment

*   [#1379](https://github.com/Khan/perseus/pull/1379) [`685fa9048`](https://github.com/Khan/perseus/commit/685fa904815926cfd75105476df63ce76d4f00ae) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Moving around/renaming components so they make more sense for the upcoming hint mode work

-   [#1370](https://github.com/Khan/perseus/pull/1370) [`48e879ace`](https://github.com/Khan/perseus/commit/48e879acee304cac48d67bb0030ac2fc8dc00a50) Thanks [@benchristel](https://github.com/benchristel)! - Internal: copy Mafs' implementation of useMovable into our own useDraggable hook.

## 24.0.0

### Major Changes

-   [#1371](https://github.com/Khan/perseus/pull/1371) [`ba5f33460`](https://github.com/Khan/perseus/commit/ba5f33460d6d5131f95955abae135c9ee138c858) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - update attributes for expression widget button

### Patch Changes

-   [#1364](https://github.com/Khan/perseus/pull/1364) [`35651e097`](https://github.com/Khan/perseus/commit/35651e09710f47d978be03270ba4011ff2dbe591) Thanks [@Myranae](https://github.com/Myranae)! - Fix a bug in the exercise editor where the preview did not update after a change to the number of sides in polygon graphs

*   [#1373](https://github.com/Khan/perseus/pull/1373) [`961510673`](https://github.com/Khan/perseus/commit/96151067381fbfbb9ec325ac6b921ba2830cc344) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Update the interactive graph builder with all currently migrated graph types

## 23.6.0

### Minor Changes

-   [#1360](https://github.com/Khan/perseus/pull/1360) [`753d6eafe`](https://github.com/Khan/perseus/commit/753d6eafe9f18dd1ae00b4a092e765972a514370) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Add the ability to reorder locked figure settings

*   [#1362](https://github.com/Khan/perseus/pull/1362) [`4bb2b8742`](https://github.com/Khan/perseus/commit/4bb2b8742c7396d212734aee34b5d64320ae1b18) Thanks [@Myranae](https://github.com/Myranae)! - Polygon interactive graphs use the legacy graph when numSides is set to unlimited

-   [#1357](https://github.com/Khan/perseus/pull/1357) [`a60809858`](https://github.com/Khan/perseus/commit/a60809858f88ec6403c442e434aac98ecc6b6056) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] UI for adding/editing/deleting a locked polygon

### Patch Changes

-   [#1363](https://github.com/Khan/perseus/pull/1363) [`e5a2dd874`](https://github.com/Khan/perseus/commit/e5a2dd8747f3d2691161874923dbac9b4366d654) Thanks [@handeyeco](https://github.com/handeyeco)! - Cleanup dead code related to input-with-examples

*   [#1368](https://github.com/Khan/perseus/pull/1368) [`86f94e126`](https://github.com/Khan/perseus/commit/86f94e126cedfc9d6c61735054c0d2bb619bc633) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Organize locked figures within Interactive Graph into their own folders for better organization

-   [#1367](https://github.com/Khan/perseus/pull/1367) [`e5a54d805`](https://github.com/Khan/perseus/commit/e5a54d805e8ec09b4641fbee8bc120e173a14ba6) Thanks [@benchristel](https://github.com/benchristel)! - Internal: wrap the Mafs `useMovable` hook, creating a seam where we can add new functionality.

*   [#1356](https://github.com/Khan/perseus/pull/1356) [`c6c5064da`](https://github.com/Khan/perseus/commit/c6c5064da1f9e6a18c4cc49be073a198bcfb3be8) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - A fix for performance issues related to Sinusoid and Quadratic graphs

-   [#1366](https://github.com/Khan/perseus/pull/1366) [`1351ca38b`](https://github.com/Khan/perseus/commit/1351ca38b46901d1571d1c06a8234546560acc39) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Add the M2b flag in preparation for locked graphs, labels, and polygon markings.

## 23.5.0

### Minor Changes

-   [#1348](https://github.com/Khan/perseus/pull/1348) [`73ba4f7c9`](https://github.com/Khan/perseus/commit/73ba4f7c9d502e0598617cc4c1710df5c10b086b) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Update the locked ellipse settings so they only take degrees as input.

*   [#1353](https://github.com/Khan/perseus/pull/1353) [`e528c5b2b`](https://github.com/Khan/perseus/commit/e528c5b2b763e6a2ad8fbef31cd98f1f991a354d) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] View a locked polygon

-   [#1351](https://github.com/Khan/perseus/pull/1351) [`9a6517ca2`](https://github.com/Khan/perseus/commit/9a6517ca22857921acdbf206c7c21d989cccdf86) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Add blue and gold to locked figures colorset

### Patch Changes

-   [#1350](https://github.com/Khan/perseus/pull/1350) [`1e877c6d4`](https://github.com/Khan/perseus/commit/1e877c6d44a0de351bfbfa5716391b6522bebbeb) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Add locked vector to storybook story for all locked figures

*   [#1345](https://github.com/Khan/perseus/pull/1345) [`92990f15f`](https://github.com/Khan/perseus/commit/92990f15f4eb020cd079b0eaa607cc8e086acec9) Thanks [@benchristel](https://github.com/benchristel)! - Fix a bug in the exercise editor where the preview did not update after a change to the graph type or number of line segments.

## 23.4.0

### Minor Changes

-   [#1330](https://github.com/Khan/perseus/pull/1330) [`1df3824ab`](https://github.com/Khan/perseus/commit/1df3824ab72b121bdebe4d67ca667e5349f0e843) Thanks [@Myranae](https://github.com/Myranae)! - Implement the "angles" snapTo type for Polygon interactive graphs

*   [#1338](https://github.com/Khan/perseus/pull/1338) [`7a530de8d`](https://github.com/Khan/perseus/commit/7a530de8df3d7edf709b4c4e42843b295f8e73bc) Thanks [@Myranae](https://github.com/Myranae)! - Implement the "sides" snapTo type for Polygon interactive graphs

### Patch Changes

-   [#1341](https://github.com/Khan/perseus/pull/1341) [`50c8233ee`](https://github.com/Khan/perseus/commit/50c8233eec4faf3c001a6ce73b3053fa28135961) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Increase default circle radius from 1 to 2.

*   [#1349](https://github.com/Khan/perseus/pull/1349) [`56b2b9f58`](https://github.com/Khan/perseus/commit/56b2b9f58ee44fd2fd297cb53b9ad1495972bf55) Thanks [@nishasy](https://github.com/nishasy)! - Update to Wonder Blocks Form 4.7.1

-   [#1331](https://github.com/Khan/perseus/pull/1331) [`509542a3b`](https://github.com/Khan/perseus/commit/509542a3bb155f3828bd9596858b0a7c46a98319) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Cleaning up internal usage of isValidLocation function.

*   [#1340](https://github.com/Khan/perseus/pull/1340) [`bfb294453`](https://github.com/Khan/perseus/commit/bfb2944530a47fb4ae8d13a5ee218feebec023d9) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Updating for all Linear Systems to have the same color line.

-   [#1337](https://github.com/Khan/perseus/pull/1337) [`4910b2ec3`](https://github.com/Khan/perseus/commit/4910b2ec3385c7d96bab5172a697722ce31f9339) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixing blue dot issue in firefox for interactive graph

*   [#1325](https://github.com/Khan/perseus/pull/1325) [`970f94119`](https://github.com/Khan/perseus/commit/970f941197bea8f9eabfe31020160dc3cbfb204d) Thanks [@benchristel](https://github.com/benchristel)! - Refactor the interactive graph state initialization code

## 23.3.0

### Minor Changes

-   [#1333](https://github.com/Khan/perseus/pull/1333) [`7ccb70c12`](https://github.com/Khan/perseus/commit/7ccb70c126a3ab54e5a4dc1264793ccb2577c913) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Remove m1 flag from the code, and put locked vector and locked ellipse UI behind the m2 flag.

## 23.2.0

### Minor Changes

-   [#1318](https://github.com/Khan/perseus/pull/1318) [`e5afe4b27`](https://github.com/Khan/perseus/commit/e5afe4b27be0d83c22b7129dfc566ae0998eac38) Thanks [@benchristel](https://github.com/benchristel)! - Change the cursor to a left-right arrow when the user hovers over the resize point of a circle on a Mafs interactive graph

*   [#1320](https://github.com/Khan/perseus/pull/1320) [`676f6f400`](https://github.com/Khan/perseus/commit/676f6f4001b13001083827cc75a36d28a4b5fb3a) Thanks [@benchristel](https://github.com/benchristel)! - Prevent the sides of polygons on Mafs interactive graphs from crossing

-   [#1321](https://github.com/Khan/perseus/pull/1321) [`6d9b9cbb3`](https://github.com/Khan/perseus/commit/6d9b9cbb3e59ac4185dc5fe78265c117a61d3851) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Add ability to view a locked vector in Interactive Graph

*   [#1326](https://github.com/Khan/perseus/pull/1326) [`322e7eaf7`](https://github.com/Khan/perseus/commit/322e7eaf769574e8fb046a81696b7e580d2ad0af) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Implement "Add locked ellipse" UI

-   [#1332](https://github.com/Khan/perseus/pull/1332) [`f94d98468`](https://github.com/Khan/perseus/commit/f94d98468d2ee94cf6a83f43a39ed563249beee3) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Switch from locked circles to locked ellipses

### Patch Changes

-   [#1329](https://github.com/Khan/perseus/pull/1329) [`aaa3026ef`](https://github.com/Khan/perseus/commit/aaa3026ef3ba58d0adb059c1e9043af30c3e1b8b) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensuring that Ray and Linear graphs have consistent types to solve bug crashing content editor.

*   [#1324](https://github.com/Khan/perseus/pull/1324) [`f153e2924`](https://github.com/Khan/perseus/commit/f153e2924b057e1b6238bc41b83da5c7d1bb3d74) Thanks [@benchristel](https://github.com/benchristel)! - Fix a bug where, after a page refresh, the interactive graph widget editor displayed the default interactive elements instead of the correct answer to the graph.

## 23.1.0

### Minor Changes

-   [#1315](https://github.com/Khan/perseus/pull/1315) [`73e5828a5`](https://github.com/Khan/perseus/commit/73e5828a5ee219435187402f4942dab32fefc2c4) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Creation of the new Mafs-based Sinusoid Graph

*   [#1309](https://github.com/Khan/perseus/pull/1309) [`c8422cd99`](https://github.com/Khan/perseus/commit/c8422cd99bf3c09b66b602c77240262d1ca68533) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Render locked circles on interactive graphs

### Patch Changes

-   [#1316](https://github.com/Khan/perseus/pull/1316) [`57e72b8d5`](https://github.com/Khan/perseus/commit/57e72b8d5bdb146de52b0bb9f3a206ce7d2fa8a5) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixing accessibility bug in image widget.

## 23.0.0

### Major Changes

-   [#1301](https://github.com/Khan/perseus/pull/1301) [`1ca5a12aa`](https://github.com/Khan/perseus/commit/1ca5a12aaea6ec2cd06f778981303e2da7b5889f) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove unused/deprecated APIOptions: useDraftEditor and inModal

### Minor Changes

-   [#1283](https://github.com/Khan/perseus/pull/1283) [`3b85777c7`](https://github.com/Khan/perseus/commit/3b85777c7b2b970121a9c5242d34a2f9cdd2319b) Thanks [@daniellewhyte](https://github.com/daniellewhyte)! - Make horizontal divider invisible to screen reader

*   [#1305](https://github.com/Khan/perseus/pull/1305) [`ec600a11e`](https://github.com/Khan/perseus/commit/ec600a11e22420005fbf35157a46e890e6b0d488) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Creation of the new Mafs-based Quadratic Graph for the Interactive Graph Widget

-   [#1310](https://github.com/Khan/perseus/pull/1310) [`e6fc912bf`](https://github.com/Khan/perseus/commit/e6fc912bf907477efeb4c5989fb17b5b1e2a99e8) Thanks [@benchristel](https://github.com/benchristel)! - Upgrade to Mafs 0.18.7, which lets us draw graph axes with thicker lines.

### Patch Changes

-   [#1312](https://github.com/Khan/perseus/pull/1312) [`925f4ee03`](https://github.com/Khan/perseus/commit/925f4ee037e7130b73b471c211050adfd7d44d00) Thanks [@benchristel](https://github.com/benchristel)! - Fix Safari-specific bug where axis tick numbers did not appear

*   [#1301](https://github.com/Khan/perseus/pull/1301) [`1ca5a12aa`](https://github.com/Khan/perseus/commit/1ca5a12aaea6ec2cd06f778981303e2da7b5889f) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove duplicate `Empty` type

*   Updated dependencies [[`3b85777c7`](https://github.com/Khan/perseus/commit/3b85777c7b2b970121a9c5242d34a2f9cdd2319b)]:
    -   @khanacademy/simple-markdown@0.12.0
    -   @khanacademy/pure-markdown@0.3.5

## 22.7.0

### Minor Changes

-   [#1303](https://github.com/Khan/perseus/pull/1303) [`49baacd04`](https://github.com/Khan/perseus/commit/49baacd04b981eaa46d1b42af8952ff899152f1d) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensure there's enough contrast on the grid lines by switching to offBlack50

### Patch Changes

-   [#1300](https://github.com/Khan/perseus/pull/1300) [`9426dee46`](https://github.com/Khan/perseus/commit/9426dee4608b43f8b6b9ea189b0bc81105b73fa7) Thanks [@benchristel](https://github.com/benchristel)! - Revert Mafs to 0.18.5 to fix a tooling incompatibility with webapp. The latest Mafs needs node 20.11 or higher, while we use 20.5 in some places.

*   [#1299](https://github.com/Khan/perseus/pull/1299) [`364e67884`](https://github.com/Khan/perseus/commit/364e678845a0a02e271f7666e204b12a46f81fa7) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensure axis tick labels render below interactive elements.

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
