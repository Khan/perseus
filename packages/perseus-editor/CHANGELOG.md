# @khanacademy/perseus-editor

## 28.7.0

### Minor Changes

-   [#3047](https://github.com/Khan/perseus/pull/3047) [`b84bc99def`](https://github.com/Khan/perseus/commit/b84bc99def7a46a7c8c9a9927e2d7e040746ce37) Thanks [@nishasy](https://github.com/nishasy)! - Add Issues Panel to Article Editor

*   [#2992](https://github.com/Khan/perseus/pull/2992) [`fc6273b10d`](https://github.com/Khan/perseus/commit/fc6273b10de94819d41880eba9848a0ff50e618a) Thanks [@nishasy](https://github.com/nishasy)! - Add radio and expression save wanrnings to the perseus linter. Add a callback for issues changed to item-editor.tsx.

-   [#3037](https://github.com/Khan/perseus/pull/3037) [`39c890acc5`](https://github.com/Khan/perseus/commit/39c890acc5d5dfd1d3961c2d25228eb93a86b616) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (UX) | Allow zooming on Graphie images

### Patch Changes

-   [#3044](https://github.com/Khan/perseus/pull/3044) [`78e15ef4e6`](https://github.com/Khan/perseus/commit/78e15ef4e64b97338a8f05b128b1c09c8bbc31f9) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (UX) | Image zoom fixes - remove scrolling for portrait images, command click on main image instead of zoomed image

*   [#3049](https://github.com/Khan/perseus/pull/3049) [`18261c3294`](https://github.com/Khan/perseus/commit/18261c3294bb5f0175e6d44e0c0bb61e75212192) Thanks [@nishasy](https://github.com/nishasy)! - Add Free Response widget save warnings to perseus linter

*   Updated dependencies [[`ceb7a70bfa`](https://github.com/Khan/perseus/commit/ceb7a70bfad68e736fb670af8039bac17ae9df61), [`78e15ef4e6`](https://github.com/Khan/perseus/commit/78e15ef4e64b97338a8f05b128b1c09c8bbc31f9), [`fc6273b10d`](https://github.com/Khan/perseus/commit/fc6273b10de94819d41880eba9848a0ff50e618a), [`39c890acc5`](https://github.com/Khan/perseus/commit/39c890acc5d5dfd1d3961c2d25228eb93a86b616), [`8d3beb2743`](https://github.com/Khan/perseus/commit/8d3beb2743e4c0c2ee264f3cf782098a5b71ce76), [`98245b0f3a`](https://github.com/Khan/perseus/commit/98245b0f3ae5fc398cce18f988ae48491ee16e59), [`18261c3294`](https://github.com/Khan/perseus/commit/18261c3294bb5f0175e6d44e0c0bb61e75212192)]:
    -   @khanacademy/math-input@26.2.20
    -   @khanacademy/perseus@72.2.0
    -   @khanacademy/perseus-linter@4.5.0

## 28.6.5

### Patch Changes

-   [#3042](https://github.com/Khan/perseus/pull/3042) [`c9cfba3096`](https://github.com/Khan/perseus/commit/c9cfba3096bd723751d8078b643b53140788ec10) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Handle autogen aria label for open locked points

*   [#3046](https://github.com/Khan/perseus/pull/3046) [`b8e0ea16ff`](https://github.com/Khan/perseus/commit/b8e0ea16ff389466a2efc7e87749a9d6ddf716cc) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Sync dependencies with Frontend

-   [#3040](https://github.com/Khan/perseus/pull/3040) [`9b50f4c44c`](https://github.com/Khan/perseus/commit/9b50f4c44c6e3a3a02fc2a0f6c41d5ee0b9dff1b) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (CX) | Put Image props in the editor in DOM order

-   Updated dependencies [[`9201e1887b`](https://github.com/Khan/perseus/commit/9201e1887bdacdcc8982a114bd903be8d1d9d015), [`b8e0ea16ff`](https://github.com/Khan/perseus/commit/b8e0ea16ff389466a2efc7e87749a9d6ddf716cc), [`099aeff249`](https://github.com/Khan/perseus/commit/099aeff249a3af7b060b9c36f5a2d36488d7ee84)]:
    -   @khanacademy/perseus-core@20.2.0
    -   @khanacademy/perseus@72.1.1
    -   @khanacademy/math-input@26.2.19
    -   @khanacademy/keypad-context@3.2.17
    -   @khanacademy/kmath@2.2.17
    -   @khanacademy/perseus-linter@4.4.7
    -   @khanacademy/perseus-score@8.0.6

## 28.6.4

### Patch Changes

-   [#3034](https://github.com/Khan/perseus/pull/3034) [`ce19ec912c`](https://github.com/Khan/perseus/commit/ce19ec912c1452211f43d792436003154f19a23f) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixing Interactive Graph Options due to Regression

## 28.6.3

### Patch Changes

-   [#3030](https://github.com/Khan/perseus/pull/3030) [`9a3d65a370`](https://github.com/Khan/perseus/commit/9a3d65a3709f6db4de8f2c4ec3972ebe770a6480) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Re-publish to enable trusted publishing

*   [#3020](https://github.com/Khan/perseus/pull/3020) [`ac6267009e`](https://github.com/Khan/perseus/commit/ac6267009e1308f317f306f95a39f6b56a397fc8) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Update to version of Perseus without `Util.split()` and just use the native string.split()

-   [#3020](https://github.com/Khan/perseus/pull/3020) [`ac6267009e`](https://github.com/Khan/perseus/commit/ac6267009e1308f317f306f95a39f6b56a397fc8) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove `Util.split` - was needed to patch a bug in IE8.

-   Updated dependencies [[`9a3d65a370`](https://github.com/Khan/perseus/commit/9a3d65a3709f6db4de8f2c4ec3972ebe770a6480), [`6fa388c9e7`](https://github.com/Khan/perseus/commit/6fa388c9e72a39822e1c8374857f95e7961498f1), [`13543516c2`](https://github.com/Khan/perseus/commit/13543516c2666486d65077ab055a9ac8d456e01e), [`ac6267009e`](https://github.com/Khan/perseus/commit/ac6267009e1308f317f306f95a39f6b56a397fc8), [`8859e97f01`](https://github.com/Khan/perseus/commit/8859e97f0140a18e8924d13f6b18a6d38206dbf2), [`86dfe96298`](https://github.com/Khan/perseus/commit/86dfe96298dcdb64a1ba9096241354395f30ce02)]:
    -   @khanacademy/kas@2.1.4
    -   @khanacademy/keypad-context@3.2.16
    -   @khanacademy/kmath@2.2.16
    -   @khanacademy/math-input@26.2.18
    -   @khanacademy/perseus@72.1.0
    -   @khanacademy/perseus-core@20.1.4
    -   @khanacademy/perseus-linter@4.4.6
    -   @khanacademy/perseus-score@8.0.5
    -   @khanacademy/perseus-utils@2.1.2

## 28.6.2

### Patch Changes

-   [#2978](https://github.com/Khan/perseus/pull/2978) [`2c7d4139e9`](https://github.com/Khan/perseus/commit/2c7d4139e9f8768530897ce1dccd7b3803155ad7) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Update comment about GroupMetadataEditor (which is now gone)

-   Updated dependencies [[`2c7d4139e9`](https://github.com/Khan/perseus/commit/2c7d4139e9f8768530897ce1dccd7b3803155ad7), [`8539c08bcf`](https://github.com/Khan/perseus/commit/8539c08bcf1b48d22745f7ab9a9d5188a1265523), [`8539c08bcf`](https://github.com/Khan/perseus/commit/8539c08bcf1b48d22745f7ab9a9d5188a1265523)]:
    -   @khanacademy/perseus@72.0.0

## 28.6.1

### Patch Changes

-   [#3015](https://github.com/Khan/perseus/pull/3015) [`1ed3e9c757`](https://github.com/Khan/perseus/commit/1ed3e9c757c4bea177f07de211bccc72a4c3d23b) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Moving the key up to resolve a missed bug for react

## 28.6.0

### Minor Changes

-   [#2958](https://github.com/Khan/perseus/pull/2958) [`f89e3f6f72`](https://github.com/Khan/perseus/commit/f89e3f6f72d781e39134ed012991f16a562036a3) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Creation of a new editingDisabled mode for our Perseus Editors

### Patch Changes

-   [#3014](https://github.com/Khan/perseus/pull/3014) [`88077ed7f6`](https://github.com/Khan/perseus/commit/88077ed7f6ea208980ad2c88f97edd567e6e204a) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Reduce the height of the all widgets test data for chromatic and storybook.

-   Updated dependencies [[`f89e3f6f72`](https://github.com/Khan/perseus/commit/f89e3f6f72d781e39134ed012991f16a562036a3)]:
    -   @khanacademy/perseus@71.6.0

## 28.5.6

### Patch Changes

-   [#3011](https://github.com/Khan/perseus/pull/3011) [`79959b9d3e`](https://github.com/Khan/perseus/commit/79959b9d3e37f2a46690a4d4847ff9bbe17353e9) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Sync dependencies with Frontend

*   [#3007](https://github.com/Khan/perseus/pull/3007) [`9a0bdcd7d2`](https://github.com/Khan/perseus/commit/9a0bdcd7d224aaaa127cd574225ed1e6e18c73f7) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (CX) | Add a button to reset image to original dimensions

-   [#3008](https://github.com/Khan/perseus/pull/3008) [`7180091927`](https://github.com/Khan/perseus/commit/7180091927b3115e33ac9b31164ae4a2545b636c) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (UX) | Fix image stretching vertically in markdown tables in Safari

-   Updated dependencies [[`d0309d0b1f`](https://github.com/Khan/perseus/commit/d0309d0b1f59e88b4a59fe23fd6d737c900f1c7d), [`79959b9d3e`](https://github.com/Khan/perseus/commit/79959b9d3e37f2a46690a4d4847ff9bbe17353e9), [`79959b9d3e`](https://github.com/Khan/perseus/commit/79959b9d3e37f2a46690a4d4847ff9bbe17353e9), [`7180091927`](https://github.com/Khan/perseus/commit/7180091927b3115e33ac9b31164ae4a2545b636c)]:
    -   @khanacademy/perseus@71.5.0
    -   @khanacademy/math-input@26.2.17

## 28.5.5

### Patch Changes

-   Updated dependencies [[`f77253dfe4`](https://github.com/Khan/perseus/commit/f77253dfe47f5845ac0a1b3373d0ad17c8e0141b)]:
    -   @khanacademy/perseus@71.4.2

## 28.5.4

### Patch Changes

-   [#2990](https://github.com/Khan/perseus/pull/2990) [`b843ed6113`](https://github.com/Khan/perseus/commit/b843ed6113bb4feed5c5bc7ff49434eb3b546465) Thanks [@handeyeco](https://github.com/handeyeco)! - Run knip to clean up unused code and exports

*   [#2996](https://github.com/Khan/perseus/pull/2996) [`26f4f1f02b`](https://github.com/Khan/perseus/commit/26f4f1f02b1dd9dec840b3b5503e2a87f4e34555) Thanks [@Myranae](https://github.com/Myranae)! - Sync deps

*   Updated dependencies [[`525b33683e`](https://github.com/Khan/perseus/commit/525b33683ecd4dd2ce9182ff153e978dce41dfa3), [`b843ed6113`](https://github.com/Khan/perseus/commit/b843ed6113bb4feed5c5bc7ff49434eb3b546465), [`26f4f1f02b`](https://github.com/Khan/perseus/commit/26f4f1f02b1dd9dec840b3b5503e2a87f4e34555)]:
    -   @khanacademy/perseus@71.4.1
    -   @khanacademy/keypad-context@3.2.15
    -   @khanacademy/math-input@26.2.16
    -   @khanacademy/perseus-core@20.1.3
    -   @khanacademy/perseus-linter@4.4.5
    -   @khanacademy/perseus-score@8.0.4
    -   @khanacademy/kmath@2.2.15

## 28.5.3

### Patch Changes

-   [#2981](https://github.com/Khan/perseus/pull/2981) [`1ddcb6b800`](https://github.com/Khan/perseus/commit/1ddcb6b800ebc19fce4665598f20817200330123) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Minor type fixes

-   Updated dependencies [[`43001b76c1`](https://github.com/Khan/perseus/commit/43001b76c165affe34ccc098bc54f29dd8d3a2e1), [`1ddcb6b800`](https://github.com/Khan/perseus/commit/1ddcb6b800ebc19fce4665598f20817200330123), [`39c9590f1f`](https://github.com/Khan/perseus/commit/39c9590f1f20269c97decacbd259e513e1b44287), [`8796333c12`](https://github.com/Khan/perseus/commit/8796333c1282577c761d799f44d066c4837b04ba), [`63a52f3ee1`](https://github.com/Khan/perseus/commit/63a52f3ee1e26ab0ec7b88fbcfd61e40d5b159dc), [`96341cf42f`](https://github.com/Khan/perseus/commit/96341cf42fa253055edbf22cf28b5133e024140c), [`7ab2de8dad`](https://github.com/Khan/perseus/commit/7ab2de8dadd2d9d9042952ba1f6fe9c0654e0824)]:
    -   @khanacademy/perseus@71.4.0
    -   @khanacademy/perseus-core@20.1.2
    -   @khanacademy/keypad-context@3.2.14
    -   @khanacademy/kmath@2.2.14
    -   @khanacademy/math-input@26.2.15
    -   @khanacademy/perseus-linter@4.4.4
    -   @khanacademy/perseus-score@8.0.3

## 28.5.2

### Patch Changes

-   [#2982](https://github.com/Khan/perseus/pull/2982) [`24d025b7c7`](https://github.com/Khan/perseus/commit/24d025b7c7c472ba68469a761cced16315f7a374) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Include provenance information when publishing to npmjs

-   Updated dependencies [[`24d025b7c7`](https://github.com/Khan/perseus/commit/24d025b7c7c472ba68469a761cced16315f7a374), [`f5fa5d5203`](https://github.com/Khan/perseus/commit/f5fa5d520333e747ae65a0d3b5bc6bda79b3e7f1)]:
    -   @khanacademy/kas@2.1.3
    -   @khanacademy/keypad-context@3.2.13
    -   @khanacademy/kmath@2.2.13
    -   @khanacademy/math-input@26.2.14
    -   @khanacademy/perseus@71.3.2
    -   @khanacademy/perseus-core@20.1.1
    -   @khanacademy/perseus-linter@4.4.3
    -   @khanacademy/perseus-score@8.0.2
    -   @khanacademy/perseus-utils@2.1.1
    -   @khanacademy/pure-markdown@2.2.1

## 28.5.1

### Patch Changes

-   Updated dependencies [[`251f569213`](https://github.com/Khan/perseus/commit/251f56921327ea75a62ac8ba2647eba912d29e10)]:
    -   @khanacademy/perseus@71.3.1

## 28.5.0

### Minor Changes

-   [#2951](https://github.com/Khan/perseus/pull/2951) [`4632a864e8`](https://github.com/Khan/perseus/commit/4632a864e8f313bd5b7dd1c916eb8ffc3acf5bbc) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (CX) | Add a button to allow auto-conversion of markdown images to image widgets

### Patch Changes

-   [#2967](https://github.com/Khan/perseus/pull/2967) [`3d5bb1b0b5`](https://github.com/Khan/perseus/commit/3d5bb1b0b5c5cbd2b78974ddf826d93752f5bd66) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Add decorative in accessible function in ImageWidget registry

-   Updated dependencies [[`3d5bb1b0b5`](https://github.com/Khan/perseus/commit/3d5bb1b0b5c5cbd2b78974ddf826d93752f5bd66), [`3c32921888`](https://github.com/Khan/perseus/commit/3c3292188854a1ad4338c418a52ab27f3d4f2198), [`47ba785e06`](https://github.com/Khan/perseus/commit/47ba785e06a85b7592c55da19ffa3656bea710b7)]:
    -   @khanacademy/perseus-core@20.1.0
    -   @khanacademy/perseus@71.3.0
    -   @khanacademy/keypad-context@3.2.12
    -   @khanacademy/kmath@2.2.12
    -   @khanacademy/math-input@26.2.13
    -   @khanacademy/perseus-linter@4.4.2
    -   @khanacademy/perseus-score@8.0.1

## 28.4.2

### Patch Changes

-   [#2959](https://github.com/Khan/perseus/pull/2959) [`31892b605d`](https://github.com/Khan/perseus/commit/31892b605d54038c6d8898276cae5801ebf853dc) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Add article preview panel for the article editor this will be used in our docs.

-   Updated dependencies [[`b3a751707c`](https://github.com/Khan/perseus/commit/b3a751707c44437875efc16a21b505a7ec7879c6), [`b328f7fa6a`](https://github.com/Khan/perseus/commit/b328f7fa6a5c11be53554b60a93d4e03e7e79d6a), [`2db4326665`](https://github.com/Khan/perseus/commit/2db43266656b058503818a6550ce9c520d1086fb)]:
    -   @khanacademy/perseus-core@20.0.0
    -   @khanacademy/perseus-score@8.0.0
    -   @khanacademy/perseus@71.2.3
    -   @khanacademy/keypad-context@3.2.11
    -   @khanacademy/kmath@2.2.11
    -   @khanacademy/math-input@26.2.12
    -   @khanacademy/perseus-linter@4.4.1

## 28.4.1

### Patch Changes

-   Updated dependencies [[`2274854c9b`](https://github.com/Khan/perseus/commit/2274854c9b033e502695bc28173b43e75c628301), [`572916984f`](https://github.com/Khan/perseus/commit/572916984fcac1248393a8e5023273043a018e4f)]:
    -   @khanacademy/perseus@71.2.2

## 28.4.0

### Minor Changes

-   [#2949](https://github.com/Khan/perseus/pull/2949) [`9b2effcc25`](https://github.com/Khan/perseus/commit/9b2effcc253eca60bb907007704a2f2ea847dc0c) Thanks [@Myranae](https://github.com/Myranae)! - Add popover direction selector back to label image editor to still allow content authors to add popover direction
    preference; also fix a bug where their selection did not persist in the editor.

### Patch Changes

-   Updated dependencies [[`ce47e5afa4`](https://github.com/Khan/perseus/commit/ce47e5afa4f1d253e6de9d29f85b273b2a582bcd)]:
    -   @khanacademy/perseus@71.2.1

## 28.3.1

### Patch Changes

-   [#2936](https://github.com/Khan/perseus/pull/2936) [`d81b0ec4ff`](https://github.com/Khan/perseus/commit/d81b0ec4ffb3b2b74a37ca2ef1f2286e7009de93) Thanks [@MikeKlemarewski](https://github.com/MikeKlemarewski)! - Adding tests for ItemDiff component

-   Updated dependencies [[`7e830864aa`](https://github.com/Khan/perseus/commit/7e830864aab51afd1192cd92fdebd9adc664f74b), [`ea232094e7`](https://github.com/Khan/perseus/commit/ea232094e764e77d61067509cc137c5ed53f8f0e)]:
    -   @khanacademy/perseus@71.2.0

## 28.3.0

### Minor Changes

-   [#2939](https://github.com/Khan/perseus/pull/2939) [`18c925f3e0`](https://github.com/Khan/perseus/commit/18c925f3e057dcb0c3f970af5e78a62591c4ce55) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (CX) | Add a warning in editor if markdown images are detected

### Patch Changes

-   Updated dependencies [[`658b772c88`](https://github.com/Khan/perseus/commit/658b772c88f519b15006962bf5f27b91711e57c6), [`18c925f3e0`](https://github.com/Khan/perseus/commit/18c925f3e057dcb0c3f970af5e78a62591c4ce55), [`97271406f2`](https://github.com/Khan/perseus/commit/97271406f2e929ff00306cbfdeb6ca950512a7af)]:
    -   @khanacademy/perseus-core@19.5.0
    -   @khanacademy/perseus-linter@4.4.0
    -   @khanacademy/perseus@71.1.1
    -   @khanacademy/keypad-context@3.2.10
    -   @khanacademy/kmath@2.2.10
    -   @khanacademy/math-input@26.2.11
    -   @khanacademy/perseus-score@7.7.10

## 28.2.0

### Minor Changes

-   [#2930](https://github.com/Khan/perseus/pull/2930) [`c56aaf2a70`](https://github.com/Khan/perseus/commit/c56aaf2a7052f0c0ea35dadfc6e544deb22cd7d4) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Add decorative toggle for Image widget editor and hide it behind a feature flag

### Patch Changes

-   Updated dependencies [[`94b7669578`](https://github.com/Khan/perseus/commit/94b76695781bf8c29bd40c7094aa209ab197ad33), [`e8bcb1b1ef`](https://github.com/Khan/perseus/commit/e8bcb1b1efc96317fd8b55dc0ff563d704e44e0b), [`cf3a7b54de`](https://github.com/Khan/perseus/commit/cf3a7b54decc21fa28e05fbcbd7c847168a48b53), [`51b6617d74`](https://github.com/Khan/perseus/commit/51b6617d7411fb0c099facc6fa8bde875dbba25f)]:
    -   @khanacademy/perseus@71.1.0
    -   @khanacademy/math-input@26.2.10

## 28.1.0

### Minor Changes

-   [#2926](https://github.com/Khan/perseus/pull/2926) [`9ec9b038ce`](https://github.com/Khan/perseus/commit/9ec9b038ce2d389516f557dc5048a8189d566746) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (CX) | Make image dimensions editable in Image widget editor

### Patch Changes

-   Updated dependencies [[`75a9cf1143`](https://github.com/Khan/perseus/commit/75a9cf1143606b2afd2f1e5dacbbea793069e89e), [`e62fd04eb1`](https://github.com/Khan/perseus/commit/e62fd04eb14ddb7fd7ab258ae77b8c995f5f1735), [`413fc41cf6`](https://github.com/Khan/perseus/commit/413fc41cf658b21458e794e264d01f3e794295be), [`3277e34456`](https://github.com/Khan/perseus/commit/3277e3445654903e41e145ce7d50b6016261511c)]:
    -   @khanacademy/perseus@71.0.0
    -   @khanacademy/perseus-linter@4.3.10

## 28.0.0

### Major Changes

-   [#2925](https://github.com/Khan/perseus/pull/2925) [`0b7bfdb4c0`](https://github.com/Khan/perseus/commit/0b7bfdb4c0f9dd865b16ed11dd1670a5ede0882f) Thanks [@MikeKlemarewski](https://github.com/MikeKlemarewski)! - Require dependencies to be passed into ArticleEditor and EditorPage

### Patch Changes

-   [#2920](https://github.com/Khan/perseus/pull/2920) [`e11c3f8071`](https://github.com/Khan/perseus/commit/e11c3f8071d2b0946351ff700c846c6c48fbebfa) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (CX) | Add a warning message about alt text length, and encourage the use of long description if alt text is too long

-   Updated dependencies [[`42c456d99e`](https://github.com/Khan/perseus/commit/42c456d99e0002589c088c721f09cbb26ea57b2c), [`5d2a6b07ef`](https://github.com/Khan/perseus/commit/5d2a6b07ef29fdbd6b3458b8abe4dbad480ce2b5)]:
    -   @khanacademy/perseus@70.1.0
    -   @khanacademy/perseus-core@19.4.0
    -   @khanacademy/keypad-context@3.2.9
    -   @khanacademy/kmath@2.2.9
    -   @khanacademy/math-input@26.2.9
    -   @khanacademy/perseus-linter@4.3.9
    -   @khanacademy/perseus-score@7.7.9

## 27.6.1

### Patch Changes

-   [#2915](https://github.com/Khan/perseus/pull/2915) [`a17d64593b`](https://github.com/Khan/perseus/commit/a17d64593bb92fb83c11ad8615d393cddcb0e8e3) Thanks [@nishasy](https://github.com/nishasy)! - [Image][radio] Fix editor image preview for Graphie images

*   [#2913](https://github.com/Khan/perseus/pull/2913) [`37eeac9784`](https://github.com/Khan/perseus/commit/37eeac97844467b249910e1f9b0c87c3404f3053) Thanks [@beaesguerra](https://github.com/beaesguerra)! - Update WB Banner usage to remove use of the deprecated `layout` prop

-   [#2873](https://github.com/Khan/perseus/pull/2873) [`427cec2376`](https://github.com/Khan/perseus/commit/427cec23769249686ae9744804dc30b4264bffb9) Thanks [@MikeKlemarewski](https://github.com/MikeKlemarewski)! - Updated tests as a result of the new generateUrl dependency function

*   [#2917](https://github.com/Khan/perseus/pull/2917) [`c2bcd7b0db`](https://github.com/Khan/perseus/commit/c2bcd7b0db198b0217c8e9dc9cb68e865a2630a4) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (DX) | Use WB LabeledField within image editor

*   Updated dependencies [[`427cec2376`](https://github.com/Khan/perseus/commit/427cec23769249686ae9744804dc30b4264bffb9), [`37eeac9784`](https://github.com/Khan/perseus/commit/37eeac97844467b249910e1f9b0c87c3404f3053)]:
    -   @khanacademy/perseus@70.0.0

## 27.6.0

### Minor Changes

-   [#2908](https://github.com/Khan/perseus/pull/2908) [`d60a719785`](https://github.com/Khan/perseus/commit/d60a7197855d8c05c45ba272d89b7057cf9e3503) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (CX) (a11y) | Add long description field to Image widget editor

*   [#2910](https://github.com/Khan/perseus/pull/2910) [`55769ff4da`](https://github.com/Khan/perseus/commit/55769ff4da8020e8a9a8bdbbd11d09dc03fc97f8) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixing several issues related to User Input in our Explanation and Number Line Widgets

### Patch Changes

-   Updated dependencies [[`d60a719785`](https://github.com/Khan/perseus/commit/d60a7197855d8c05c45ba272d89b7057cf9e3503), [`1ec4595857`](https://github.com/Khan/perseus/commit/1ec4595857d2ca28ab9f011c6e2fcdb29a3d7140), [`4e9b6f012d`](https://github.com/Khan/perseus/commit/4e9b6f012d18bb00a6077c077f49063b11f24cd3), [`79a6fc682b`](https://github.com/Khan/perseus/commit/79a6fc682b5a6674383b3e609f34c5efa8ffe4ec), [`55769ff4da`](https://github.com/Khan/perseus/commit/55769ff4da8020e8a9a8bdbbd11d09dc03fc97f8), [`4733bbb3a8`](https://github.com/Khan/perseus/commit/4733bbb3a8ed2f7e20ef879a271198f7b2f6deb0)]:
    -   @khanacademy/perseus@69.3.0
    -   @khanacademy/kas@2.1.2
    -   @khanacademy/math-input@26.2.8
    -   @khanacademy/perseus-core@19.3.0
    -   @khanacademy/perseus-score@7.7.8
    -   @khanacademy/keypad-context@3.2.8
    -   @khanacademy/kmath@2.2.8
    -   @khanacademy/perseus-linter@4.3.8

## 27.5.8

### Patch Changes

-   [#2896](https://github.com/Khan/perseus/pull/2896) [`952312b7e9`](https://github.com/Khan/perseus/commit/952312b7e96948f59a675a095f94b2ea32d4d717) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Cleanup unused underscore imports

-   Updated dependencies [[`952312b7e9`](https://github.com/Khan/perseus/commit/952312b7e96948f59a675a095f94b2ea32d4d717), [`d0eff84625`](https://github.com/Khan/perseus/commit/d0eff846251ca73a881950d88c9ff08ed54ba726), [`9a9d4f9369`](https://github.com/Khan/perseus/commit/9a9d4f9369ef93158a3f3c7d106d337b67745e24)]:
    -   @khanacademy/perseus@69.2.0
    -   @khanacademy/perseus-core@19.2.0
    -   @khanacademy/keypad-context@3.2.7
    -   @khanacademy/kmath@2.2.7
    -   @khanacademy/math-input@26.2.7
    -   @khanacademy/perseus-linter@4.3.7
    -   @khanacademy/perseus-score@7.7.7

## 27.5.7

### Patch Changes

-   Updated dependencies [[`bd30f2828c`](https://github.com/Khan/perseus/commit/bd30f2828c8ae0ef4d401fc516ec49fe2b8270c5), [`1e3888f76c`](https://github.com/Khan/perseus/commit/1e3888f76c731e9dae46b8b15c322493eb96d9ad), [`8775764175`](https://github.com/Khan/perseus/commit/877576417507a011d3e6a975f0101b3afafc78a6), [`46b71965bb`](https://github.com/Khan/perseus/commit/46b71965bb0c098b874b12ac6ccdb859f5979624), [`abd72b25fa`](https://github.com/Khan/perseus/commit/abd72b25fae24a2233c9da8de1541fbe86280419)]:
    -   @khanacademy/perseus@69.1.0
    -   @khanacademy/perseus-core@19.1.0
    -   @khanacademy/kas@2.1.1
    -   @khanacademy/keypad-context@3.2.6
    -   @khanacademy/kmath@2.2.6
    -   @khanacademy/math-input@26.2.6
    -   @khanacademy/perseus-linter@4.3.6
    -   @khanacademy/perseus-score@7.7.6

## 27.5.6

### Patch Changes

-   [#2868](https://github.com/Khan/perseus/pull/2868) [`bc638ee101`](https://github.com/Khan/perseus/commit/bc638ee1012769b673c921608bc0c80bf47f2b5d) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Updates radio editor to normalize choice ids for existing content

-   Updated dependencies [[`510d8353a8`](https://github.com/Khan/perseus/commit/510d8353a8a9ac516db726eda984a51b9f50db9a), [`ec311052a5`](https://github.com/Khan/perseus/commit/ec311052a5d5a1070c4b97ab3997e2a6742da898), [`681b844932`](https://github.com/Khan/perseus/commit/681b844932f65776970c7ebdcad187309072c05e), [`b9d7626ebf`](https://github.com/Khan/perseus/commit/b9d7626ebf9b919cfe849e71c0a133a80ffdc779), [`e1ab9b541d`](https://github.com/Khan/perseus/commit/e1ab9b541d2558e1c7e95650a06d50035aadc1b7), [`09fe1009ec`](https://github.com/Khan/perseus/commit/09fe1009ec8dfb9c9df59ef47e68d2e008d78675), [`a31ee79a46`](https://github.com/Khan/perseus/commit/a31ee79a46a82ee487d88c145b65f7de60af1059)]:
    -   @khanacademy/perseus@69.0.1
    -   @khanacademy/perseus-core@19.0.3
    -   @khanacademy/keypad-context@3.2.5
    -   @khanacademy/kmath@2.2.5
    -   @khanacademy/math-input@26.2.5
    -   @khanacademy/perseus-linter@4.3.5
    -   @khanacademy/perseus-score@7.7.5

## 27.5.5

### Patch Changes

-   Updated dependencies [[`416d53ddc4`](https://github.com/Khan/perseus/commit/416d53ddc4bdcf771188b73347d271b66404a8f7)]:
    -   @khanacademy/perseus@69.0.0

## 27.5.4

### Patch Changes

-   Updated dependencies [[`876be8cde6`](https://github.com/Khan/perseus/commit/876be8cde6aa2936612b2e9a60bf20626440b16c), [`2cede5b4f8`](https://github.com/Khan/perseus/commit/2cede5b4f883f1be0a160e46476fbdea826b6166), [`73311983b6`](https://github.com/Khan/perseus/commit/73311983b6b6d343c73c5778992e53a49f4d6e43)]:
    -   @khanacademy/perseus-core@19.0.2
    -   @khanacademy/perseus@68.0.2
    -   @khanacademy/keypad-context@3.2.4
    -   @khanacademy/kmath@2.2.4
    -   @khanacademy/math-input@26.2.4
    -   @khanacademy/perseus-linter@4.3.4
    -   @khanacademy/perseus-score@7.7.4

## 27.5.3

### Patch Changes

-   [#2848](https://github.com/Khan/perseus/pull/2848) [`1de909808d`](https://github.com/Khan/perseus/commit/1de909808dfcd08717c6246a6225081fae50e3a1) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (UX) | Update Image widget to match new designs

-   Updated dependencies [[`57fcddf928`](https://github.com/Khan/perseus/commit/57fcddf928d5d3fe9d00c3833eb58d3eb6b2c556), [`1de909808d`](https://github.com/Khan/perseus/commit/1de909808dfcd08717c6246a6225081fae50e3a1), [`f096f77bd6`](https://github.com/Khan/perseus/commit/f096f77bd63be867df16e3065025b5f35ebb6a6b), [`655f8994b8`](https://github.com/Khan/perseus/commit/655f8994b869a9eb34c4f9436cfc32bd59916d37)]:
    -   @khanacademy/perseus@68.0.1
    -   @khanacademy/perseus-core@19.0.1
    -   @khanacademy/keypad-context@3.2.3
    -   @khanacademy/kmath@2.2.3
    -   @khanacademy/math-input@26.2.3
    -   @khanacademy/perseus-linter@4.3.3
    -   @khanacademy/perseus-score@7.7.3

## 27.5.2

### Patch Changes

-   Updated dependencies [[`b4aef654c1`](https://github.com/Khan/perseus/commit/b4aef654c1844f2d322a37229a209edeff545035), [`ccb28990d2`](https://github.com/Khan/perseus/commit/ccb28990d267339cacbe2055c0ac60b01d1f8678), [`59cbb43106`](https://github.com/Khan/perseus/commit/59cbb431069caf66f63672f223da34cf063e7932)]:
    -   @khanacademy/perseus@68.0.0
    -   @khanacademy/perseus-core@19.0.0
    -   @khanacademy/keypad-context@3.2.2
    -   @khanacademy/kmath@2.2.2
    -   @khanacademy/math-input@26.2.2
    -   @khanacademy/perseus-linter@4.3.2
    -   @khanacademy/perseus-score@7.7.2

## 27.5.1

### Patch Changes

-   Updated dependencies [[`c601e1c410`](https://github.com/Khan/perseus/commit/c601e1c4109cb6d719c75795c4cbb9601bd11a2b)]:
    -   @khanacademy/perseus@67.2.0

## 27.5.0

### Minor Changes

-   [#2847](https://github.com/Khan/perseus/pull/2847) [`38c3140201`](https://github.com/Khan/perseus/commit/38c3140201abf8243dd3faaec2a4976b11898ac3) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (CX) | Add the Title field back in the Image editor

### Patch Changes

-   [#2845](https://github.com/Khan/perseus/pull/2845) [`9a3f88df9a`](https://github.com/Khan/perseus/commit/9a3f88df9affeaca3c26d50208867c913ccae725) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (DX) | Fix regression stories by adding width and height to images

*   [#2852](https://github.com/Khan/perseus/pull/2852) [`3dcc37d389`](https://github.com/Khan/perseus/commit/3dcc37d3890f598a97210f0343443897ce83ed2a) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (DX) | Revert to old way of saving empty string data for the sake of data consistency

-   [#2844](https://github.com/Khan/perseus/pull/2844) [`5c7da8d1a2`](https://github.com/Khan/perseus/commit/5c7da8d1a2270bf73d60fcfc9823414db167af45) Thanks [@beaesguerra](https://github.com/beaesguerra)! - Update WB semantic color surface and foreground/border inverse JS token usage

-   Updated dependencies [[`9a3f88df9a`](https://github.com/Khan/perseus/commit/9a3f88df9affeaca3c26d50208867c913ccae725)]:
    -   @khanacademy/perseus@67.1.2

## 27.4.1

### Patch Changes

-   [#2849](https://github.com/Khan/perseus/pull/2849) [`47ec59ae27`](https://github.com/Khan/perseus/commit/47ec59ae2783d770fecaa6d5b403b365dc37094e) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Updating packages to sync with wonderblocks

*   [#2842](https://github.com/Khan/perseus/pull/2842) [`8943735ea4`](https://github.com/Khan/perseus/commit/8943735ea40002ef06f3c56cf90b8eee5125eeaf) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (CX) | Modernize the Image widget editor UI

*   Updated dependencies [[`47ec59ae27`](https://github.com/Khan/perseus/commit/47ec59ae2783d770fecaa6d5b403b365dc37094e), [`671c5e4a56`](https://github.com/Khan/perseus/commit/671c5e4a5615580348fff6776fe1e9d2e3a475a6), [`245de4eba5`](https://github.com/Khan/perseus/commit/245de4eba5b1d8e055cf0d8793c3ad18d55aea8f)]:
    -   @khanacademy/math-input@26.2.1
    -   @khanacademy/perseus@67.1.1
    -   @khanacademy/perseus-core@18.9.1
    -   @khanacademy/keypad-context@3.2.1
    -   @khanacademy/kmath@2.2.1
    -   @khanacademy/perseus-linter@4.3.1
    -   @khanacademy/perseus-score@7.7.1

## 27.4.0

### Minor Changes

-   [#2799](https://github.com/Khan/perseus/pull/2799) [`8b18b38b31`](https://github.com/Khan/perseus/commit/8b18b38b31866582cb101d29ea3dbfd2dbe756bf) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Changes the output of radio score from boolean array to string array that represent the user's selected choice ids

### Patch Changes

-   [#2824](https://github.com/Khan/perseus/pull/2824) [`27304a4c22`](https://github.com/Khan/perseus/commit/27304a4c229967853d05b09bf8ff0849544fa8e3) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (DX) | Modernize the Image widget code

*   [#2825](https://github.com/Khan/perseus/pull/2825) [`ae8f7b2d0d`](https://github.com/Khan/perseus/commit/ae8f7b2d0d98d0bc11654fc086ace74c96384eff) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (DX) | Modernize the Image widget edtior code

-   [#2835](https://github.com/Khan/perseus/pull/2835) [`6901229b75`](https://github.com/Khan/perseus/commit/6901229b758c411356b77b3b044a1d178038460c) Thanks [@beaesguerra](https://github.com/beaesguerra)! - Update WB semantic color surface and foreground/border inverse token usage

-   Updated dependencies [[`9db2c5a4a1`](https://github.com/Khan/perseus/commit/9db2c5a4a1d2b83d18c9605cf87b7ebabb832ad0), [`32553c5330`](https://github.com/Khan/perseus/commit/32553c5330fd353b08680415fdbd9842d5cca13a), [`4b5a15745e`](https://github.com/Khan/perseus/commit/4b5a15745e22a0a45a8d86d2a87b4eb138a2c47c), [`8b18b38b31`](https://github.com/Khan/perseus/commit/8b18b38b31866582cb101d29ea3dbfd2dbe756bf), [`3fb39e4a2f`](https://github.com/Khan/perseus/commit/3fb39e4a2fda3890c99d3551f403cfe31884547c), [`81951db1ba`](https://github.com/Khan/perseus/commit/81951db1ba9c474c108c5ff253b7d0168fd3f23a), [`27304a4c22`](https://github.com/Khan/perseus/commit/27304a4c229967853d05b09bf8ff0849544fa8e3), [`ae8f7b2d0d`](https://github.com/Khan/perseus/commit/ae8f7b2d0d98d0bc11654fc086ace74c96384eff), [`e8eb1b3843`](https://github.com/Khan/perseus/commit/e8eb1b384327afe6ed0f221e025175c54b53bdd5), [`1eba32de16`](https://github.com/Khan/perseus/commit/1eba32de16478ded4bbe751e32727e562e5f820e), [`6901229b75`](https://github.com/Khan/perseus/commit/6901229b758c411356b77b3b044a1d178038460c)]:
    -   @khanacademy/perseus@67.1.0
    -   @khanacademy/keypad-context@3.2.0
    -   @khanacademy/kmath@2.2.0
    -   @khanacademy/math-input@26.2.0
    -   @khanacademy/perseus-core@18.9.0
    -   @khanacademy/perseus-linter@4.3.0
    -   @khanacademy/perseus-score@7.7.0

## 27.3.1

### Patch Changes

-   [#2823](https://github.com/Khan/perseus/pull/2823) [`a95e65d7e0`](https://github.com/Khan/perseus/commit/a95e65d7e06a3aa7b970f4b1586843df3f0c7f55) Thanks [@nishasy](https://github.com/nishasy)! - [Image] | (DX) | Update the Storybook experience for Image Widget

-   Updated dependencies [[`aab0bf4b8b`](https://github.com/Khan/perseus/commit/aab0bf4b8bcb10347f24854403ee27581212df5c), [`1970e9b660`](https://github.com/Khan/perseus/commit/1970e9b6606e4367718fafb86e98d86c2024c884), [`9a5605b82c`](https://github.com/Khan/perseus/commit/9a5605b82ca6038f326bf70c6d0959bb2227b754), [`38f92737fb`](https://github.com/Khan/perseus/commit/38f92737fbc63447a07e1308a65d97cfbc14fad3), [`8f3b0dce93`](https://github.com/Khan/perseus/commit/8f3b0dce93efd620be5d7c580fa1a3920ae689eb), [`527f20f156`](https://github.com/Khan/perseus/commit/527f20f1565aa8cd1a69db92ed4698043f96e9df), [`a95e65d7e0`](https://github.com/Khan/perseus/commit/a95e65d7e06a3aa7b970f4b1586843df3f0c7f55), [`e0471ecdfa`](https://github.com/Khan/perseus/commit/e0471ecdfabaecc2e154362eb99382f4974efc8b), [`1379e394f5`](https://github.com/Khan/perseus/commit/1379e394f5ea47dd12d7950854cf5f073359a256)]:
    -   @khanacademy/perseus@67.0.0
    -   @khanacademy/perseus-core@18.8.0
    -   @khanacademy/keypad-context@3.1.5
    -   @khanacademy/kmath@2.1.5
    -   @khanacademy/math-input@26.1.6
    -   @khanacademy/perseus-linter@4.2.5
    -   @khanacademy/perseus-score@7.6.2

## 27.3.0

### Minor Changes

-   [#2786](https://github.com/Khan/perseus/pull/2786) [`52b2b3ae54`](https://github.com/Khan/perseus/commit/52b2b3ae54953ff6969e8962858d46d025661be8) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Add `showAxisArrows` field to Interactive Graph editor

### Patch Changes

-   [#2806](https://github.com/Khan/perseus/pull/2806) [`d9e489d705`](https://github.com/Khan/perseus/commit/d9e489d705e28c10a6de97f7b94e0890444f41c4) Thanks [@nishasy](https://github.com/nishasy)! - [Radio] Use choice IDs for the choice keys in the editor

-   Updated dependencies [[`99aafcf6db`](https://github.com/Khan/perseus/commit/99aafcf6db38d78bc56abe7ffae16d851ab41c54), [`afd017396a`](https://github.com/Khan/perseus/commit/afd017396a96ce39e88b23533d7feb04a8d0bc78), [`3f7a9e5185`](https://github.com/Khan/perseus/commit/3f7a9e5185a5a8fc93a32215379d7a434ecf0523), [`58e2534199`](https://github.com/Khan/perseus/commit/58e2534199d0c6243362f3ea557cfa362ab9906a), [`201519eb80`](https://github.com/Khan/perseus/commit/201519eb808b4c1b812f776d9cbbcd6402de0d88), [`52b2b3ae54`](https://github.com/Khan/perseus/commit/52b2b3ae54953ff6969e8962858d46d025661be8), [`62029ee700`](https://github.com/Khan/perseus/commit/62029ee700db45a646a0addf0e90ff4df73aef3a)]:
    -   @khanacademy/perseus@66.5.0
    -   @khanacademy/perseus-core@18.7.0
    -   @khanacademy/keypad-context@3.1.4
    -   @khanacademy/kmath@2.1.4
    -   @khanacademy/math-input@26.1.5
    -   @khanacademy/perseus-linter@4.2.4
    -   @khanacademy/perseus-score@7.6.1

## 27.2.0

### Minor Changes

-   [#2777](https://github.com/Khan/perseus/pull/2777) [`78f7c512a4`](https://github.com/Khan/perseus/commit/78f7c512a4cd35e2416952fccb480e1821fcef8a) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Add `showAxisArrows` field to Interactive Graph widget

### Patch Changes

-   Updated dependencies [[`17eb0d1b07`](https://github.com/Khan/perseus/commit/17eb0d1b075d9edf368d4a7da085f1176362d4fc), [`78f7c512a4`](https://github.com/Khan/perseus/commit/78f7c512a4cd35e2416952fccb480e1821fcef8a), [`3b9c412e2f`](https://github.com/Khan/perseus/commit/3b9c412e2f29be13a4276b9737b7a42f4371e570), [`28d3082eda`](https://github.com/Khan/perseus/commit/28d3082eda0eefc3791fd9e87e3a23adc5c9d140), [`daf70ab1e1`](https://github.com/Khan/perseus/commit/daf70ab1e14715ebe96319d3ba2872aa6d7b1318), [`665613fa2c`](https://github.com/Khan/perseus/commit/665613fa2c58dbf880ccfc2f846fe83620db31d9), [`a9ff068196`](https://github.com/Khan/perseus/commit/a9ff0681963836fbc70c606eb880e3464e60c03e), [`0830c46d33`](https://github.com/Khan/perseus/commit/0830c46d33f5db4b07cff456c4e57b4b2d1eb60d), [`8da2dfaf2d`](https://github.com/Khan/perseus/commit/8da2dfaf2dbba78d275f9f425e79fe90358355d0), [`3767a24628`](https://github.com/Khan/perseus/commit/3767a24628f278042c43a5bad8c085d87c8fc494)]:
    -   @khanacademy/perseus@66.4.0
    -   @khanacademy/perseus-core@18.6.0
    -   @khanacademy/perseus-score@7.6.0
    -   @khanacademy/keypad-context@3.1.3
    -   @khanacademy/kmath@2.1.3
    -   @khanacademy/math-input@26.1.4
    -   @khanacademy/perseus-linter@4.2.3

## 27.1.0

### Minor Changes

-   [#2647](https://github.com/Khan/perseus/pull/2647) [`32ba4b3dc6`](https://github.com/Khan/perseus/commit/32ba4b3dc6bcff2f029c8534b3c72d5eef2623d9) Thanks [@nishasy](https://github.com/nishasy)! - [Radio] | (CX) | Implment UI for adding images in Radio editor

*   [#2762](https://github.com/Khan/perseus/pull/2762) [`1bc1464852`](https://github.com/Khan/perseus/commit/1bc14648527864d17640e0818ef6ec38a13f90ab) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - adds choice id as a required field to Radio Widget

### Patch Changes

-   [#2771](https://github.com/Khan/perseus/pull/2771) [`72aeef2fe5`](https://github.com/Khan/perseus/commit/72aeef2fe55864e055902cf3fdf36cdee59ac0e9) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] | (CX) | Use dynamically resizing textarea for Description field

*   [#2774](https://github.com/Khan/perseus/pull/2774) [`3c58a9b963`](https://github.com/Khan/perseus/commit/3c58a9b963679701c5814d3e8f5a3bec1279ed77) Thanks [@nishasy](https://github.com/nishasy)! - Fix file imports

-   [#2768](https://github.com/Khan/perseus/pull/2768) [`f48e917fe5`](https://github.com/Khan/perseus/commit/f48e917fe5ee7267aae8a0563a2379131da785ce) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] | (DX) | Shorten interactive-graph-editor.tsx to avoid 1000+ line lint error

*   [#2763](https://github.com/Khan/perseus/pull/2763) [`3c16fc2a18`](https://github.com/Khan/perseus/commit/3c16fc2a1853edb193fa456cc43eafef528705dc) Thanks [@handeyeco](https://github.com/handeyeco)! - Export UserInputManager from Perseus and use it in PerseusEditor for Storybook preview.

*   Updated dependencies [[`178c7181e8`](https://github.com/Khan/perseus/commit/178c7181e807497b5767614853c52b716d715355), [`dde65d357c`](https://github.com/Khan/perseus/commit/dde65d357c5553d3e384079f9b9459302aab8216), [`3a53e7357d`](https://github.com/Khan/perseus/commit/3a53e7357d090b3c70cef2a5cb4f9312af3ca45b), [`e269c7a060`](https://github.com/Khan/perseus/commit/e269c7a060648a07b1ed58247d66b23b30f16c6e), [`294ac6cf5d`](https://github.com/Khan/perseus/commit/294ac6cf5d30331f3b54b34476d645101d0254d9), [`c1f5dabafe`](https://github.com/Khan/perseus/commit/c1f5dabafecaac3bb26c349728d9a022fd3836ea), [`a27cf15161`](https://github.com/Khan/perseus/commit/a27cf15161ced0a0ad37c01fd724e0e793d18aaf), [`3c16fc2a18`](https://github.com/Khan/perseus/commit/3c16fc2a1853edb193fa456cc43eafef528705dc), [`1bc1464852`](https://github.com/Khan/perseus/commit/1bc14648527864d17640e0818ef6ec38a13f90ab), [`97a586aa3a`](https://github.com/Khan/perseus/commit/97a586aa3ad131da4fcba4fbd9036f0e9bf663b0), [`48b26d97d2`](https://github.com/Khan/perseus/commit/48b26d97d2ca023fa5bea29049dbe7a8eefa96d5), [`962f89a95f`](https://github.com/Khan/perseus/commit/962f89a95f238b48586da2b566c7b0ad6f40e3de), [`4ab552d631`](https://github.com/Khan/perseus/commit/4ab552d631147015e78e05b88baae3540815f246), [`78419c1f8a`](https://github.com/Khan/perseus/commit/78419c1f8a4e62c3423ca4c348213cf1e84d1c00)]:
    -   @khanacademy/perseus@66.3.0
    -   @khanacademy/perseus-core@18.5.0
    -   @khanacademy/perseus-score@7.5.0
    -   @khanacademy/keypad-context@3.1.2
    -   @khanacademy/kmath@2.1.2
    -   @khanacademy/math-input@26.1.3
    -   @khanacademy/perseus-linter@4.2.2

## 27.0.2

### Patch Changes

-   Updated dependencies [[`c8f892ebe`](https://github.com/Khan/perseus/commit/c8f892ebee9b5d27ee4b593b7fd615e510fe04d6), [`3879432b8`](https://github.com/Khan/perseus/commit/3879432b83f5a1416178f248b5b9e2e27009594c), [`165475698`](https://github.com/Khan/perseus/commit/165475698a280bc826504e4673a402879a002194), [`ff9ba87fd`](https://github.com/Khan/perseus/commit/ff9ba87fd241f1de83385e1d8f2a55637eaaefb0), [`2c8873a49`](https://github.com/Khan/perseus/commit/2c8873a4904f99a0b948d8381178c157e1254802), [`7e0b8002b`](https://github.com/Khan/perseus/commit/7e0b8002b59447252685dcd6438b77b4c3516eff), [`07354e6e9`](https://github.com/Khan/perseus/commit/07354e6e9ba93b352efee2a2263bb5938821ebba)]:
    -   @khanacademy/perseus@66.2.2
    -   @khanacademy/math-input@26.1.2

## 27.0.1

### Patch Changes

-   [#2741](https://github.com/Khan/perseus/pull/2741) [`856d59821`](https://github.com/Khan/perseus/commit/856d598214eccd505da0b62f423b295c18753662) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Additional Perseus documentation improvement

-   Updated dependencies [[`856d59821`](https://github.com/Khan/perseus/commit/856d598214eccd505da0b62f423b295c18753662), [`38cda3ba3`](https://github.com/Khan/perseus/commit/38cda3ba366985579335ac28001c4c5cff8071ce), [`fbbd1c915`](https://github.com/Khan/perseus/commit/fbbd1c9157a65c5b5438e8bfa64276d682fc8ad0)]:
    -   @khanacademy/perseus@66.2.1
    -   @khanacademy/perseus-score@7.4.0

## 27.0.0

### Major Changes

-   [#2706](https://github.com/Khan/perseus/pull/2706) [`7ae45139b`](https://github.com/Khan/perseus/commit/7ae45139b0fbe75e128f5a0e8e71078dc8a4e733) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove frameSource prop from EditorPage component

### Patch Changes

-   Updated dependencies [[`17f57db9c`](https://github.com/Khan/perseus/commit/17f57db9c9cbf3fdaf735c87853d2156de253bd2), [`bfe4e50e9`](https://github.com/Khan/perseus/commit/bfe4e50e968e1b34dec685ec81c05d252cd07e49), [`17f57db9c`](https://github.com/Khan/perseus/commit/17f57db9c9cbf3fdaf735c87853d2156de253bd2)]:
    -   @khanacademy/perseus@66.2.0
    -   @khanacademy/perseus-score@7.3.0
    -   @khanacademy/perseus-core@18.4.0
    -   @khanacademy/keypad-context@3.1.1
    -   @khanacademy/kmath@2.1.1
    -   @khanacademy/math-input@26.1.1
    -   @khanacademy/perseus-linter@4.2.1

## 26.2.0

### Minor Changes

-   [#2737](https://github.com/Khan/perseus/pull/2737) [`77e095f86`](https://github.com/Khan/perseus/commit/77e095f8660618b9476a50094872821c7a9184e8) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Updating all packages to newest version of wonderblocks

### Patch Changes

-   Updated dependencies [[`77e095f86`](https://github.com/Khan/perseus/commit/77e095f8660618b9476a50094872821c7a9184e8)]:
    -   @khanacademy/kas@2.1.0
    -   @khanacademy/keypad-context@3.1.0
    -   @khanacademy/kmath@2.1.0
    -   @khanacademy/math-input@26.1.0
    -   @khanacademy/perseus@66.1.0
    -   @khanacademy/perseus-core@18.3.0
    -   @khanacademy/perseus-linter@4.2.0
    -   @khanacademy/perseus-score@7.2.0
    -   @khanacademy/perseus-utils@2.1.0
    -   @khanacademy/pure-markdown@2.2.0

## 26.1.2

### Patch Changes

-   [#2734](https://github.com/Khan/perseus/pull/2734) [`1209297b0`](https://github.com/Khan/perseus/commit/1209297b08f6863ff8199a34b2a06462484999cb) Thanks [@nishasy](https://github.com/nishasy)! - [Radio] | (CX) | Add dynamically resizing text areas to Radio editor UI

## 26.1.1

### Patch Changes

-   [#2729](https://github.com/Khan/perseus/pull/2729) [`266bce537`](https://github.com/Khan/perseus/commit/266bce537c6685ef237064332d3bc5b2119b7da0) Thanks [@nishasy](https://github.com/nishasy)! - [Radio] | (CX) | Implement choice reordering in the editor

*   [#2699](https://github.com/Khan/perseus/pull/2699) [`cfc072417`](https://github.com/Khan/perseus/commit/cfc072417d1b66c1c87b0a0200c37c376434920f) Thanks [@ivyolamit](https://github.com/ivyolamit)! - Improve Perseus documentation

*   Updated dependencies [[`8720ca1e2`](https://github.com/Khan/perseus/commit/8720ca1e2a780ecdf658971ec993a8adb7066c55), [`a7c14bf18`](https://github.com/Khan/perseus/commit/a7c14bf183f3e47ec887c695c7fc9ee83d21da46), [`cfc072417`](https://github.com/Khan/perseus/commit/cfc072417d1b66c1c87b0a0200c37c376434920f)]:
    -   @khanacademy/perseus@66.0.2

## 26.1.0

### Minor Changes

-   [#2626](https://github.com/Khan/perseus/pull/2626) [`468834009`](https://github.com/Khan/perseus/commit/468834009d0ff1cc7736c32ffab960d25c928b70) Thanks [@nishasy](https://github.com/nishasy)! - [Radio] | (CX) | Redesign Radio editor UI

### Patch Changes

-   [#2731](https://github.com/Khan/perseus/pull/2731) [`16f0eefe0`](https://github.com/Khan/perseus/commit/16f0eefe0d07429528491a671984b47ef7f32715) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: undefined widget property in hint

*   [#2727](https://github.com/Khan/perseus/pull/2727) [`2048d66b4`](https://github.com/Khan/perseus/commit/2048d66b47ca448a37f0308b56d07948744254c7) Thanks [@nishasy](https://github.com/nishasy)! - [Radio] | (CX) | Stop showing NOTA button if NOTA choice exists in the editor

*   Updated dependencies [[`825fccfbd`](https://github.com/Khan/perseus/commit/825fccfbd2a301d4d810b7d000d1c61895359959), [`16f0eefe0`](https://github.com/Khan/perseus/commit/16f0eefe0d07429528491a671984b47ef7f32715), [`0cae7aed9`](https://github.com/Khan/perseus/commit/0cae7aed9ea7dfc3e101f99ae7670aa4b244e436), [`8b8bf69d0`](https://github.com/Khan/perseus/commit/8b8bf69d094838fd88a541f5a590347f38151d86)]:
    -   @khanacademy/perseus@66.0.1
    -   @khanacademy/perseus-core@18.2.2
    -   @khanacademy/perseus-score@7.1.16
    -   @khanacademy/keypad-context@3.0.29
    -   @khanacademy/kmath@2.0.29
    -   @khanacademy/math-input@26.0.18
    -   @khanacademy/perseus-linter@4.1.2

## 26.0.1

### Patch Changes

-   Updated dependencies [[`a5e736009`](https://github.com/Khan/perseus/commit/a5e73600938894eca58cb7a236c391ba82f2ed7f), [`4e12526af`](https://github.com/Khan/perseus/commit/4e12526af77890835f11235385e96e582a985e05), [`9d6c85c58`](https://github.com/Khan/perseus/commit/9d6c85c58d33f8b5dff06a7b177e0e4e05153894), [`def76890e`](https://github.com/Khan/perseus/commit/def76890e07460cdc00ac089fa3e5d267b2437d2), [`08df03da9`](https://github.com/Khan/perseus/commit/08df03da9b0a870635b24aeafb6082d0df4dcd45)]:
    -   @khanacademy/perseus@66.0.0
    -   @khanacademy/perseus-core@18.2.1
    -   @khanacademy/math-input@26.0.17
    -   @khanacademy/perseus-score@7.1.15
    -   @khanacademy/keypad-context@3.0.28
    -   @khanacademy/kmath@2.0.28
    -   @khanacademy/perseus-linter@4.1.1

## 26.0.0

### Major Changes

-   [#2712](https://github.com/Khan/perseus/pull/2712) [`4faf1cb53`](https://github.com/Khan/perseus/commit/4faf1cb53c49b54ada16ddb88f7e3c91dcc54238) Thanks [@jeanettehead](https://github.com/jeanettehead)! - Revert fix for jumping cursor that broke image uploading

### Patch Changes

-   Updated dependencies [[`d0ae6d162`](https://github.com/Khan/perseus/commit/d0ae6d16226ce6d39e3e47a1bf4fa91a8b3020d1), [`d0d03f8f2`](https://github.com/Khan/perseus/commit/d0d03f8f2ff73384c6f71215e2f6baf20c4fc522), [`e539e6d30`](https://github.com/Khan/perseus/commit/e539e6d305d4ef7c7439cf9fbf27603e1f0ff1b1), [`0431a161f`](https://github.com/Khan/perseus/commit/0431a161f2652fffd785e71cd8dac395119c5ff0), [`0431a161f`](https://github.com/Khan/perseus/commit/0431a161f2652fffd785e71cd8dac395119c5ff0), [`0431a161f`](https://github.com/Khan/perseus/commit/0431a161f2652fffd785e71cd8dac395119c5ff0), [`2be43a8fb`](https://github.com/Khan/perseus/commit/2be43a8fb92cd360af4ddd3b180b339dfe226323), [`6801516e8`](https://github.com/Khan/perseus/commit/6801516e8e6a77b7c65cd759950325d9cdab4438), [`ee7e8463d`](https://github.com/Khan/perseus/commit/ee7e8463db10ad141a4282b7f7ea98a8246f6550)]:
    -   @khanacademy/perseus@65.8.0
    -   @khanacademy/perseus-linter@4.1.0
    -   @khanacademy/pure-markdown@2.1.0
    -   @khanacademy/perseus-core@18.2.0
    -   @khanacademy/keypad-context@3.0.27
    -   @khanacademy/kmath@2.0.27
    -   @khanacademy/math-input@26.0.16
    -   @khanacademy/perseus-score@7.1.14

## 25.4.0

### Minor Changes

-   [#2679](https://github.com/Khan/perseus/pull/2679) [`801ca690b`](https://github.com/Khan/perseus/commit/801ca690b4b2ef8f491f830108ae258c5a29145c) Thanks [@jeanettehead](https://github.com/jeanettehead)! - Fix an issue where the cursor would jump in the editor when typing quickly

### Patch Changes

-   [#2685](https://github.com/Khan/perseus/pull/2685) [`26f51a9d9`](https://github.com/Khan/perseus/commit/26f51a9d97ba781625daee42cbd7de47502c6adf) Thanks [@daniellewhyte](https://github.com/daniellewhyte)! - Fix templates in the ItemEditor

-   Updated dependencies [[`f3b0fc304`](https://github.com/Khan/perseus/commit/f3b0fc30410b076adf4f81c02986347e21fc8b37), [`efd57ac72`](https://github.com/Khan/perseus/commit/efd57ac723cb6a6a700422098366d052d6fd887a), [`1d7c057cd`](https://github.com/Khan/perseus/commit/1d7c057cda4f8a56830f49dcd3cbd9ae3ab6094b), [`fbc14c3f1`](https://github.com/Khan/perseus/commit/fbc14c3f1b8fa24dd294d3220780f31a2b094660), [`46bc47e2d`](https://github.com/Khan/perseus/commit/46bc47e2d842c0802393248355dfc1796e10545e)]:
    -   @khanacademy/perseus@65.7.0
    -   @khanacademy/perseus-core@18.1.0
    -   @khanacademy/keypad-context@3.0.26
    -   @khanacademy/kmath@2.0.26
    -   @khanacademy/math-input@26.0.15
    -   @khanacademy/perseus-linter@4.0.13
    -   @khanacademy/perseus-score@7.1.13

## 25.3.0

### Minor Changes

-   [#2670](https://github.com/Khan/perseus/pull/2670) [`a4d94900c`](https://github.com/Khan/perseus/commit/a4d94900c360aedfdf3899b866d94aaa8be852b8) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph][locked figures] Add weight option to locked function and locked function settings

### Patch Changes

-   [#2650](https://github.com/Khan/perseus/pull/2650) [`e67eca0d3`](https://github.com/Khan/perseus/commit/e67eca0d36687bcc5ffa3cd2f67caf169321f184) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph][locked figures] Add `weight` option to locked line and locked line settings

*   [#2668](https://github.com/Khan/perseus/pull/2668) [`891363ccb`](https://github.com/Khan/perseus/commit/891363ccbde8a645587f6ff3213b33c34ed40764) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph][locked figures] Add `weight` option to locked vector and locked vector settings

-   [#2669](https://github.com/Khan/perseus/pull/2669) [`8952a578a`](https://github.com/Khan/perseus/commit/8952a578a4826c35238afb30e64f78584a4f267b) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph][locked figures] Add weight option to locked ellipse and locked ellipse settings

-   Updated dependencies [[`a4d94900c`](https://github.com/Khan/perseus/commit/a4d94900c360aedfdf3899b866d94aaa8be852b8), [`e67eca0d3`](https://github.com/Khan/perseus/commit/e67eca0d36687bcc5ffa3cd2f67caf169321f184), [`891363ccb`](https://github.com/Khan/perseus/commit/891363ccbde8a645587f6ff3213b33c34ed40764), [`8952a578a`](https://github.com/Khan/perseus/commit/8952a578a4826c35238afb30e64f78584a4f267b)]:
    -   @khanacademy/perseus@65.6.0
    -   @khanacademy/perseus-core@18.0.0
    -   @khanacademy/keypad-context@3.0.25
    -   @khanacademy/kmath@2.0.25
    -   @khanacademy/math-input@26.0.14
    -   @khanacademy/perseus-linter@4.0.12
    -   @khanacademy/perseus-score@7.1.12

## 25.2.0

### Minor Changes

-   [#2666](https://github.com/Khan/perseus/pull/2666) [`d738f44d5`](https://github.com/Khan/perseus/commit/d738f44d5108831e53045652c04584bad07c19c0) Thanks [@benchristel](https://github.com/benchristel)! - Remove `"chi2Table"`, `"tTable"`, and `"zTable"` from the `ItemExtras` type exported from `@khanacademy/perseus-core`. These properties weren't used. This is a breaking change because consumers might see type errors if they set chi2Table, tTable, or zTable properties on the `answerArea` object of a `PerseusItem`. The fix is to avoid setting those properties.

### Patch Changes

-   [#2672](https://github.com/Khan/perseus/pull/2672) [`c44219a98`](https://github.com/Khan/perseus/commit/c44219a98fdbb8128c614419439c83b6cf33f79e) Thanks [@benchristel](https://github.com/benchristel)! - Update peer dependency versions

*   [#2630](https://github.com/Khan/perseus/pull/2630) [`da170e42a`](https://github.com/Khan/perseus/commit/da170e42a512c5e071b7af2bb707b6c75778bfdc) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixed bugs related to numCorrect not updating properly for the Radio widget, and cleaning up deriveNumCorrect.

*   Updated dependencies [[`3aa2b8e85`](https://github.com/Khan/perseus/commit/3aa2b8e850113be50d7da99b5ded55979b2de006), [`c44219a98`](https://github.com/Khan/perseus/commit/c44219a98fdbb8128c614419439c83b6cf33f79e), [`d738f44d5`](https://github.com/Khan/perseus/commit/d738f44d5108831e53045652c04584bad07c19c0), [`2a38ef534`](https://github.com/Khan/perseus/commit/2a38ef534a352b13a3bba1b92b353cf9e0d45be6), [`a20333281`](https://github.com/Khan/perseus/commit/a2033328147c6787d33612bd0dc48c83a783b4a5), [`da170e42a`](https://github.com/Khan/perseus/commit/da170e42a512c5e071b7af2bb707b6c75778bfdc)]:
    -   @khanacademy/perseus@65.5.0
    -   @khanacademy/perseus-core@17.0.0
    -   @khanacademy/kmath@2.0.24
    -   @khanacademy/math-input@26.0.13
    -   @khanacademy/perseus-linter@4.0.11
    -   @khanacademy/pure-markdown@2.0.10
    -   @khanacademy/perseus-score@7.1.11
    -   @khanacademy/keypad-context@3.0.24

## 25.1.2

### Patch Changes

-   [#2596](https://github.com/Khan/perseus/pull/2596) [`f15a4cc56`](https://github.com/Khan/perseus/commit/f15a4cc56465ada5d8eb5e5f042064421afaa356) Thanks [@handeyeco](https://github.com/handeyeco)! - Grapher: use userInput/handleUserInput

*   [#2572](https://github.com/Khan/perseus/pull/2572) [`ff2cd2916`](https://github.com/Khan/perseus/commit/ff2cd2916ba069f3347458d0d680eb787a244183) Thanks [@handeyeco](https://github.com/handeyeco)! - Categorizer: use userInput/handleUserInput

-   [#2588](https://github.com/Khan/perseus/pull/2588) [`380720116`](https://github.com/Khan/perseus/commit/3807201167c9cac1491a272da816232522bbabe5) Thanks [@handeyeco](https://github.com/handeyeco)! - Plotter: use userInput/handleUserInput

*   [#2569](https://github.com/Khan/perseus/pull/2569) [`1eadde57b`](https://github.com/Khan/perseus/commit/1eadde57b6a4ecdf5bb79ed2ec606c9cdc66104f) Thanks [@handeyeco](https://github.com/handeyeco)! - Expression: use userInput/handleUserInput

-   [#2644](https://github.com/Khan/perseus/pull/2644) [`f51181adc`](https://github.com/Khan/perseus/commit/f51181adcd9bbe2160c6ccd7d00ed40b53ed9a95) Thanks [@handeyeco](https://github.com/handeyeco)! - Cleanup some ChangeHandler and Changeable use

*   [#2652](https://github.com/Khan/perseus/pull/2652) [`508f4e5b1`](https://github.com/Khan/perseus/commit/508f4e5b11cdf8aef4619a943f95a78132b4c6b5) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: static switch not working in editor

-   [#2581](https://github.com/Khan/perseus/pull/2581) [`52960e3b0`](https://github.com/Khan/perseus/commit/52960e3b0fd891abcd3e228d925693b380e58549) Thanks [@handeyeco](https://github.com/handeyeco)! - Matrix: use userInput/handleUserInput

*   [#2587](https://github.com/Khan/perseus/pull/2587) [`88a4f683d`](https://github.com/Khan/perseus/commit/88a4f683db4f74bcad5c06070ef85be3f3b30982) Thanks [@handeyeco](https://github.com/handeyeco)! - Table: use userInput/handleUserInput

-   [#2598](https://github.com/Khan/perseus/pull/2598) [`c58f12c72`](https://github.com/Khan/perseus/commit/c58f12c721544f8d3a21643997612996195eb77f) Thanks [@handeyeco](https://github.com/handeyeco)! - InteractiveGraph: use userInput/handleUserInput

-   Updated dependencies [[`f15a4cc56`](https://github.com/Khan/perseus/commit/f15a4cc56465ada5d8eb5e5f042064421afaa356), [`de05305b2`](https://github.com/Khan/perseus/commit/de05305b286be71f8c8bcdbeecc511b01b42e765), [`ff2cd2916`](https://github.com/Khan/perseus/commit/ff2cd2916ba069f3347458d0d680eb787a244183), [`f84722b44`](https://github.com/Khan/perseus/commit/f84722b44e45b7e3894b62332525051f930adae9), [`4573c0476`](https://github.com/Khan/perseus/commit/4573c0476ad58e255a1a8ac4c3c140cc2af07884), [`380720116`](https://github.com/Khan/perseus/commit/3807201167c9cac1491a272da816232522bbabe5), [`e7353c696`](https://github.com/Khan/perseus/commit/e7353c69673d3e22699fa497ef1e946e03cc74b3), [`e2ed14e58`](https://github.com/Khan/perseus/commit/e2ed14e587b85afd72b9f25635060f5f3cf3abc5), [`bcf4fd541`](https://github.com/Khan/perseus/commit/bcf4fd5411c7aa8950c775c2a0275575b8731abc), [`1eadde57b`](https://github.com/Khan/perseus/commit/1eadde57b6a4ecdf5bb79ed2ec606c9cdc66104f), [`8b63ac0ed`](https://github.com/Khan/perseus/commit/8b63ac0ed9464982257b5d4d71925bbdd3f8ce3a), [`e175b8bc7`](https://github.com/Khan/perseus/commit/e175b8bc7931ba283cd5aea989fca62d8c6a3a85), [`516aea734`](https://github.com/Khan/perseus/commit/516aea734e751c11f844f8f4b191cde41e838eb4), [`f51181adc`](https://github.com/Khan/perseus/commit/f51181adcd9bbe2160c6ccd7d00ed40b53ed9a95), [`21f79b664`](https://github.com/Khan/perseus/commit/21f79b664a411c60c62043db25b6493619ba3dbd), [`3a3f5233b`](https://github.com/Khan/perseus/commit/3a3f5233bf00da47dce9944936eb94b1841a56ed), [`4af4b1f23`](https://github.com/Khan/perseus/commit/4af4b1f23bf406fa609805f1209860ca8ed3058e), [`091c25ee6`](https://github.com/Khan/perseus/commit/091c25ee6ce4cd593e13917412d783b9e079d733), [`02af17299`](https://github.com/Khan/perseus/commit/02af172998b303584010fff8094b2bf5dd0ec7c9), [`508f4e5b1`](https://github.com/Khan/perseus/commit/508f4e5b11cdf8aef4619a943f95a78132b4c6b5), [`41fb2b215`](https://github.com/Khan/perseus/commit/41fb2b215c5b9ffc1ac4e16a439db3e3b410e8ba), [`3fcbddb71`](https://github.com/Khan/perseus/commit/3fcbddb71c4a59a03ea53739c133fa559161b98b), [`52960e3b0`](https://github.com/Khan/perseus/commit/52960e3b0fd891abcd3e228d925693b380e58549), [`88a4f683d`](https://github.com/Khan/perseus/commit/88a4f683db4f74bcad5c06070ef85be3f3b30982), [`e3a636a73`](https://github.com/Khan/perseus/commit/e3a636a73f84bd7f762967875624c2276cc2317e), [`c58f12c72`](https://github.com/Khan/perseus/commit/c58f12c721544f8d3a21643997612996195eb77f)]:
    -   @khanacademy/perseus@65.4.0
    -   @khanacademy/perseus-core@16.1.1
    -   @khanacademy/perseus-score@7.1.10
    -   @khanacademy/keypad-context@3.0.23
    -   @khanacademy/kmath@2.0.23
    -   @khanacademy/math-input@26.0.12
    -   @khanacademy/perseus-linter@4.0.10

## 25.1.1

### Patch Changes

-   [#2649](https://github.com/Khan/perseus/pull/2649) [`01cb73bef`](https://github.com/Khan/perseus/commit/01cb73bef9934e36163fa28f315b64b23bd48637) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph][locked figures] Add `weight` option to locked polygon and locked polygon settings

-   Updated dependencies [[`d1299f6f7`](https://github.com/Khan/perseus/commit/d1299f6f7e5e427c442d39e6cadfa78b5326d4b1), [`01cb73bef`](https://github.com/Khan/perseus/commit/01cb73bef9934e36163fa28f315b64b23bd48637), [`d02d6f9fe`](https://github.com/Khan/perseus/commit/d02d6f9fe8be4228d0143f9487a69183317c61e7)]:
    -   @khanacademy/perseus-core@16.1.0
    -   @khanacademy/perseus@65.3.7
    -   @khanacademy/keypad-context@3.0.22
    -   @khanacademy/kmath@2.0.22
    -   @khanacademy/math-input@26.0.11
    -   @khanacademy/perseus-linter@4.0.9
    -   @khanacademy/perseus-score@7.1.9

## 25.1.0

### Minor Changes

-   [#2580](https://github.com/Khan/perseus/pull/2580) [`98cc8e59d`](https://github.com/Khan/perseus/commit/98cc8e59d2c075be8c22e23a6c7c5a09f3378cae) Thanks [@daniellewhyte](https://github.com/daniellewhyte)! - Add `additionalTemplates` prop to EditorPage

### Patch Changes

-   [#2660](https://github.com/Khan/perseus/pull/2660) [`ed51d32db`](https://github.com/Khan/perseus/commit/ed51d32db694ce7c766a0af15934778c3026c7dd) Thanks [@benchristel](https://github.com/benchristel)! - Accept any wonder-blocks-link version compatible with 9.1.9 as a peer dep of perseus-editor

-   Updated dependencies [[`ed51d32db`](https://github.com/Khan/perseus/commit/ed51d32db694ce7c766a0af15934778c3026c7dd)]:
    -   @khanacademy/perseus@65.3.6

## 25.0.5

### Patch Changes

-   [#2639](https://github.com/Khan/perseus/pull/2639) [`7b37ac7ea`](https://github.com/Khan/perseus/commit/7b37ac7ea5df5ea4a4b70a6e325df3f44cb0308b) Thanks [@benchristel](https://github.com/benchristel)! - Update Wonder Blocks peer dependencies

*   [#2640](https://github.com/Khan/perseus/pull/2640) [`fd30e9518`](https://github.com/Khan/perseus/commit/fd30e9518cc88004955fcc3bb8d77b41c18342b8) Thanks [@benchristel](https://github.com/benchristel)! - Remove deprecated fields from Radio widget (`onePerLine`, `displayCount`, `noneOfTheAbove`, and `widgets`) and rename `clue` to `rationale` in Radio widget options. Clients may need to update their test data with the new field names. As always, data in the old format can be safely migrated to the latest by calling `parseAndMigratePerseusItem` or `parseAndMigratePerseusArticle`.

*   Updated dependencies [[`7b37ac7ea`](https://github.com/Khan/perseus/commit/7b37ac7ea5df5ea4a4b70a6e325df3f44cb0308b), [`fd30e9518`](https://github.com/Khan/perseus/commit/fd30e9518cc88004955fcc3bb8d77b41c18342b8)]:
    -   @khanacademy/perseus@65.3.5
    -   @khanacademy/math-input@26.0.10
    -   @khanacademy/perseus-core@16.0.0
    -   @khanacademy/keypad-context@3.0.21
    -   @khanacademy/kmath@2.0.21
    -   @khanacademy/perseus-linter@4.0.8
    -   @khanacademy/perseus-score@7.1.8

## 25.0.4

### Patch Changes

-   [#2627](https://github.com/Khan/perseus/pull/2627) [`4788af376`](https://github.com/Khan/perseus/commit/4788af3762553fe67f99c54fe703994db8693a63) Thanks [@jandrade](https://github.com/jandrade)! - Updates styles to use `semanticColor.core` WB tokens instead of the now deprecated sc.text and sc.border tokens

-   Updated dependencies [[`4788af376`](https://github.com/Khan/perseus/commit/4788af3762553fe67f99c54fe703994db8693a63)]:
    -   @khanacademy/perseus@65.3.4

## 25.0.3

### Patch Changes

-   [#2631](https://github.com/Khan/perseus/pull/2631) [`b0ee68fef`](https://github.com/Khan/perseus/commit/b0ee68fef17b5759df5df5aa706d2e963087ff3b) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Temporarily revert a button to a link while we investigate a better solution.

-   Updated dependencies [[`04da9f04b`](https://github.com/Khan/perseus/commit/04da9f04bb8ce5e8ffa34e753a28d378dc5e64c7)]:
    -   @khanacademy/perseus@65.3.3
    -   @khanacademy/kas@2.0.9
    -   @khanacademy/keypad-context@3.0.20
    -   @khanacademy/kmath@2.0.20
    -   @khanacademy/math-input@26.0.9
    -   @khanacademy/perseus-core@15.0.1
    -   @khanacademy/perseus-linter@4.0.7
    -   @khanacademy/perseus-score@7.1.7
    -   @khanacademy/perseus-utils@2.0.5
    -   @khanacademy/pure-markdown@2.0.9

## 25.0.2

### Patch Changes

-   Updated dependencies [[`0e535feb7`](https://github.com/Khan/perseus/commit/0e535feb76f753db3f7cda1c753d79ca067ca372), [`8be4625c9`](https://github.com/Khan/perseus/commit/8be4625c950e73482aec055e2aed8b102283c950), [`04503796f`](https://github.com/Khan/perseus/commit/04503796f209504e65e26bbcc955ee0be958e7e4)]:
    -   @khanacademy/perseus-core@15.0.0
    -   @khanacademy/perseus@65.3.2
    -   @khanacademy/keypad-context@3.0.19
    -   @khanacademy/kmath@2.0.19
    -   @khanacademy/math-input@26.0.8
    -   @khanacademy/perseus-linter@4.0.6
    -   @khanacademy/perseus-score@7.1.6

## 25.0.1

### Patch Changes

-   [#2619](https://github.com/Khan/perseus/pull/2619) [`7ab0d7501`](https://github.com/Khan/perseus/commit/7ab0d7501e88d05a3f1654f9dc6c9fac62ae7c5d) Thanks [@nishasy](https://github.com/nishasy)! - [Radio] | (CX) | Convert editor buttons to use Wonder Blocks equivalents

*   [#2618](https://github.com/Khan/perseus/pull/2618) [`4b1e184ab`](https://github.com/Khan/perseus/commit/4b1e184abc27114786a4ea6b808d57cc67673f62) Thanks [@nishasy](https://github.com/nishasy)! - [Radio] | (CX) | Resize question box height when a word is too long in the editor

-   [#2624](https://github.com/Khan/perseus/pull/2624) [`7de17a3b1`](https://github.com/Khan/perseus/commit/7de17a3b18698700b4ff2c809e5d39c8625795d6) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Sync dev dependencies with frontend

-   Updated dependencies [[`7de17a3b1`](https://github.com/Khan/perseus/commit/7de17a3b18698700b4ff2c809e5d39c8625795d6)]:
    -   @khanacademy/kas@2.0.8
    -   @khanacademy/keypad-context@3.0.18
    -   @khanacademy/kmath@2.0.18
    -   @khanacademy/math-input@26.0.7
    -   @khanacademy/perseus@65.3.1
    -   @khanacademy/perseus-core@14.1.1
    -   @khanacademy/perseus-linter@4.0.5
    -   @khanacademy/perseus-score@7.1.5
    -   @khanacademy/perseus-utils@2.0.5
    -   @khanacademy/pure-markdown@2.0.8

## 25.0.0

### Major Changes

-   [#2583](https://github.com/Khan/perseus/pull/2583) [`b13149eac`](https://github.com/Khan/perseus/commit/b13149eac54fb78512cc14bbf8605436779829d7) Thanks [@tatianasnook](https://github.com/tatianasnook)! - Unify chevrons in Perseus Editor using WB components

### Minor Changes

-   [#2621](https://github.com/Khan/perseus/pull/2621) [`401ab009b`](https://github.com/Khan/perseus/commit/401ab009b1650b5752b4bad77d874eec16ebcec3) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Reverts changes introduced by LEMS-3061: deprecate options in radio, update clue to be rationale

### Patch Changes

-   [#2614](https://github.com/Khan/perseus/pull/2614) [`821d24104`](https://github.com/Khan/perseus/commit/821d24104715035895bf93e99f638fb2599d79e0) Thanks [@nishasy](https://github.com/nishasy)! - [Radio] | (CX) | Update the style guide link in the Radio widget editor

*   [#2605](https://github.com/Khan/perseus/pull/2605) [`bc7bf8a85`](https://github.com/Khan/perseus/commit/bc7bf8a855faf17a1ab71adf1830eb69f20261b8) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive graph editor] Stop steps from auto-updating when range is changed

*   Updated dependencies [[`43bc193aa`](https://github.com/Khan/perseus/commit/43bc193aaccae07a6ebfd9b981f0c6f3e13fe4df), [`401ab009b`](https://github.com/Khan/perseus/commit/401ab009b1650b5752b4bad77d874eec16ebcec3), [`0432b74d7`](https://github.com/Khan/perseus/commit/0432b74d70a30821d8faa0a274b8e773b23925a1), [`48fc42775`](https://github.com/Khan/perseus/commit/48fc427750810566f05586550fdc5596e1c79762)]:
    -   @khanacademy/perseus@65.3.0
    -   @khanacademy/perseus-core@14.1.0
    -   @khanacademy/keypad-context@3.0.17
    -   @khanacademy/kmath@2.0.17
    -   @khanacademy/math-input@26.0.6
    -   @khanacademy/perseus-linter@4.0.4
    -   @khanacademy/perseus-score@7.1.4

## 24.0.5

### Patch Changes

-   Updated dependencies [[`8875779b2`](https://github.com/Khan/perseus/commit/8875779b20b7177e8c7603bd589e42fe02e60643)]:
    -   @khanacademy/perseus@65.2.0

## 24.0.4

### Patch Changes

-   Updated dependencies [[`bb34a5f28`](https://github.com/Khan/perseus/commit/bb34a5f287970f694e30b0d5bb6d0a4db2234e8b)]:
    -   @khanacademy/perseus@65.1.3

## 24.0.3

### Patch Changes

-   [#2597](https://github.com/Khan/perseus/pull/2597) [`0c2beadca`](https://github.com/Khan/perseus/commit/0c2beadca8d23373eb83b71d2bf15e5787e5926e) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Update autogen labels to correctly reflect locked line vs segment vs ray

-   Updated dependencies [[`218eb4cb1`](https://github.com/Khan/perseus/commit/218eb4cb1b0dc29094919b6d0867fc48fab99d83), [`c2a31923c`](https://github.com/Khan/perseus/commit/c2a31923c8e535f28d17d87216e88cf25ac8792e)]:
    -   @khanacademy/perseus@65.1.2
    -   @khanacademy/kas@2.0.7
    -   @khanacademy/keypad-context@3.0.16
    -   @khanacademy/kmath@2.0.16
    -   @khanacademy/math-input@26.0.5
    -   @khanacademy/perseus-core@14.0.3
    -   @khanacademy/perseus-linter@4.0.3
    -   @khanacademy/perseus-score@7.1.3
    -   @khanacademy/perseus-utils@2.0.4
    -   @khanacademy/pure-markdown@2.0.7

## 24.0.2

### Patch Changes

-   [#2435](https://github.com/Khan/perseus/pull/2435) [`a512f3a07`](https://github.com/Khan/perseus/commit/a512f3a0716e1aeaf835c67dcacc5bcb131339a7) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - Removes deprecated options using perseus parser

-   Updated dependencies [[`a512f3a07`](https://github.com/Khan/perseus/commit/a512f3a0716e1aeaf835c67dcacc5bcb131339a7)]:
    -   @khanacademy/perseus@65.1.1
    -   @khanacademy/perseus-core@14.0.2
    -   @khanacademy/keypad-context@3.0.15
    -   @khanacademy/kmath@2.0.15
    -   @khanacademy/math-input@26.0.4
    -   @khanacademy/perseus-linter@4.0.2
    -   @khanacademy/perseus-score@7.1.2

## 24.0.1

### Patch Changes

-   [#2489](https://github.com/Khan/perseus/pull/2489) [`d8c99f629`](https://github.com/Khan/perseus/commit/d8c99f629c9439cdf56e96f6a53f6bb28f278e07) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Convert LESS files to pre-built CSS files to simplify our styling framework

*   [#2570](https://github.com/Khan/perseus/pull/2570) [`69d7ff811`](https://github.com/Khan/perseus/commit/69d7ff811503164a50257a6fba2bf83cacd04efb) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Update comments to refer to khan/frontend instead of webapp. Khan Academy's frontend code has moved.

*   Updated dependencies [[`d8c99f629`](https://github.com/Khan/perseus/commit/d8c99f629c9439cdf56e96f6a53f6bb28f278e07), [`b83bdf3ef`](https://github.com/Khan/perseus/commit/b83bdf3ef47e235b67dc16254fb66843efde6ea2), [`2fcb3b03a`](https://github.com/Khan/perseus/commit/2fcb3b03ab63c39d86787150fb3029c38f4ca039), [`4862aa4ad`](https://github.com/Khan/perseus/commit/4862aa4ad756f58ea6a98d3b994207ab184905e6), [`b2647ed0a`](https://github.com/Khan/perseus/commit/b2647ed0a74da2a81af1a682aa1444b885b7a8fc), [`69d7ff811`](https://github.com/Khan/perseus/commit/69d7ff811503164a50257a6fba2bf83cacd04efb)]:
    -   @khanacademy/math-input@26.0.3
    -   @khanacademy/perseus@65.1.0
    -   @khanacademy/perseus-core@14.0.1
    -   @khanacademy/kas@2.0.6
    -   @khanacademy/keypad-context@3.0.14
    -   @khanacademy/kmath@2.0.14
    -   @khanacademy/perseus-linter@4.0.1
    -   @khanacademy/perseus-score@7.1.1
    -   @khanacademy/perseus-utils@2.0.4
    -   @khanacademy/pure-markdown@2.0.6

## 24.0.0

### Major Changes

-   [#2474](https://github.com/Khan/perseus/pull/2474) [`59a2e87a8`](https://github.com/Khan/perseus/commit/59a2e87a83ef08a151552c7922bddfcbf1c73cf2) Thanks [@tatianasnook](https://github.com/tatianasnook)! - Moved checkAccessibilityAndWarn logic into a custom linter rule

*   [#2377](https://github.com/Khan/perseus/pull/2377) [`8a15c154b`](https://github.com/Khan/perseus/commit/8a15c154b8cd596167f399de0882572d9a8bc54b) Thanks [@tatianasnook](https://github.com/tatianasnook)! - This change introduces the Issues Panel container (LEMS-2925), which displays a list of accessibility warnings in the editor. Each warning includes a title, description, impact, and message. The panel also uses icons to indicate whether there are issues or if all checks have passed, improving visibility and clarity for content creators.

-   [#2526](https://github.com/Khan/perseus/pull/2526) [`ab2861d83`](https://github.com/Khan/perseus/commit/ab2861d8335e7ef1800dd5c6754616192b53073b) Thanks [@tatianasnook](https://github.com/tatianasnook)! - Pass data between EditorPage and ItemEditor via new props

### Minor Changes

-   [#2553](https://github.com/Khan/perseus/pull/2553) [`f5d08b79a`](https://github.com/Khan/perseus/commit/f5d08b79aca6d56ba7bdc3d47429c449645f75f9) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Adding partically accessible widget function to interactive graph and label image.

### Patch Changes

-   Updated dependencies [[`f5d08b79a`](https://github.com/Khan/perseus/commit/f5d08b79aca6d56ba7bdc3d47429c449645f75f9), [`cea05d9e6`](https://github.com/Khan/perseus/commit/cea05d9e6c629db6c14ed43dba085e215d006a1e), [`e60f6ac50`](https://github.com/Khan/perseus/commit/e60f6ac50a28d0664bfc211c9c655651719e3309), [`75f1d1f53`](https://github.com/Khan/perseus/commit/75f1d1f53fe173f9275a213376c2497b5762ce0a), [`0eba51c67`](https://github.com/Khan/perseus/commit/0eba51c67e1e67a11e425cb772194a44857eae0f), [`59a2e87a8`](https://github.com/Khan/perseus/commit/59a2e87a83ef08a151552c7922bddfcbf1c73cf2), [`ab2861d83`](https://github.com/Khan/perseus/commit/ab2861d8335e7ef1800dd5c6754616192b53073b), [`6da29d18b`](https://github.com/Khan/perseus/commit/6da29d18b8c1041b0db6e70d008706640349e819), [`cec57bbc6`](https://github.com/Khan/perseus/commit/cec57bbc6cf32cdce5a6b764b7399f69f87b4a89)]:
    -   @khanacademy/perseus@65.0.0
    -   @khanacademy/perseus-core@14.0.0
    -   @khanacademy/perseus-linter@4.0.0
    -   @khanacademy/perseus-score@7.1.0
    -   @khanacademy/keypad-context@3.0.13
    -   @khanacademy/kmath@2.0.13
    -   @khanacademy/math-input@26.0.2

## 23.0.1

### Patch Changes

-   [#2551](https://github.com/Khan/perseus/pull/2551) [`414abda7a`](https://github.com/Khan/perseus/commit/414abda7a80fc482e93ab064ff34ef540cd9eae7) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - 🛠️ Upgrade all packages to use Storybook v9 for development

*   [#2419](https://github.com/Khan/perseus/pull/2419) [`843d66257`](https://github.com/Khan/perseus/commit/843d66257ceb32b7c3d3eea4dea47dfda58e7945) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove the `propUpgrades` API from widgets as they're considered obsolete with the new parser

*   Updated dependencies [[`404bde44d`](https://github.com/Khan/perseus/commit/404bde44dc6f8b6d5cbc8593c10b47f5f65d7eeb), [`d4720c470`](https://github.com/Khan/perseus/commit/d4720c4706888c922e3111c11f121a730d592aaf), [`414abda7a`](https://github.com/Khan/perseus/commit/414abda7a80fc482e93ab064ff34ef540cd9eae7), [`35e4d13d9`](https://github.com/Khan/perseus/commit/35e4d13d9f6e49996e149950024a87f1601c2e43), [`6bc9cc667`](https://github.com/Khan/perseus/commit/6bc9cc667c5bf2e48bfc5d036f11ba2285730839), [`843d66257`](https://github.com/Khan/perseus/commit/843d66257ceb32b7c3d3eea4dea47dfda58e7945), [`074775b1f`](https://github.com/Khan/perseus/commit/074775b1ff0dc830a3d66030a14b776b0f631003)]:
    -   @khanacademy/perseus-core@13.0.0
    -   @khanacademy/math-input@26.0.1
    -   @khanacademy/perseus@64.0.0
    -   @khanacademy/perseus-score@7.0.2
    -   @khanacademy/keypad-context@3.0.12
    -   @khanacademy/kmath@2.0.12
    -   @khanacademy/perseus-linter@3.0.12

## 23.0.0

### Major Changes

-   [#2522](https://github.com/Khan/perseus/pull/2522) [`ff2f1664d`](https://github.com/Khan/perseus/commit/ff2f1664db934d862570fd9b840f799a2f23bbf7) Thanks [@benchristel](https://github.com/benchristel)! - Breaking change: version `^3.0.0` of `@khanacademy/mathjax-renderer` is now
    required as a peer dep, instead of `^2.1.1`. Clients should update
    `@khanacademy/mathjax-renderer` at their convenience; nothing will immediately
    break if you stay on 2.x.x for now.

### Minor Changes

-   [#2531](https://github.com/Khan/perseus/pull/2531) [`7ce293138`](https://github.com/Khan/perseus/commit/7ce29313858dd85570a9888eb32f504fc6a8b03a) Thanks [@aag](https://github.com/aag)! - Fix getSaveWarnings in Free Response widget and unhide it

### Patch Changes

-   [#2519](https://github.com/Khan/perseus/pull/2519) [`cf71982e0`](https://github.com/Khan/perseus/commit/cf71982e0fe9f831456d760fc4e98b1e93748c4f) Thanks [@dependabot](https://github.com/apps/dependabot)! - Updating wonderblock dependencies.

*   [#2512](https://github.com/Khan/perseus/pull/2512) [`a2778ace8`](https://github.com/Khan/perseus/commit/a2778ace85e417b1e7e1c6627ea028cee70273f0) Thanks [@Myranae](https://github.com/Myranae)! - Remove preferred pop-over direction dropdown from Label Image editor

*   Updated dependencies [[`03669d385`](https://github.com/Khan/perseus/commit/03669d385548e1d7ffde28c2210f637cf2b2d16f), [`52ec0bfcb`](https://github.com/Khan/perseus/commit/52ec0bfcbb71242c7a0a0ab34c7da0e9db77ed21), [`d1b6d9a3c`](https://github.com/Khan/perseus/commit/d1b6d9a3cab145267256e3d4acc373361957ffe0), [`7ce293138`](https://github.com/Khan/perseus/commit/7ce29313858dd85570a9888eb32f504fc6a8b03a), [`41fcaa918`](https://github.com/Khan/perseus/commit/41fcaa91845753a87aa0c9c686e6fa5bc2d149b0), [`555d89762`](https://github.com/Khan/perseus/commit/555d897621df124f423bf95bc4c2b8511e4bda6d), [`86ac76f79`](https://github.com/Khan/perseus/commit/86ac76f79c2fd4ee8b822393f89a064af92c0339), [`ff2f1664d`](https://github.com/Khan/perseus/commit/ff2f1664db934d862570fd9b840f799a2f23bbf7), [`6b747d140`](https://github.com/Khan/perseus/commit/6b747d1402cd62d9c59b2fc6f2371ec0a453a63d), [`efb99e901`](https://github.com/Khan/perseus/commit/efb99e9016418875a3b3713c8077a9465a5b41c6), [`3ec658e38`](https://github.com/Khan/perseus/commit/3ec658e387d2f2193f8151a9d4cb285e85f13202), [`3e162e616`](https://github.com/Khan/perseus/commit/3e162e6168960ff1a1c63ec0e982422a113cbe31), [`0913e9397`](https://github.com/Khan/perseus/commit/0913e93973394270a474388f4c1e7c795027b015), [`dc864aca8`](https://github.com/Khan/perseus/commit/dc864aca8ebf3bb442b1519f67d1a095d9f89243), [`8ece223ef`](https://github.com/Khan/perseus/commit/8ece223ef58ce23ccd244b6fb717193019e2c5d0), [`64c89cb15`](https://github.com/Khan/perseus/commit/64c89cb155045bf48248f96891e006a6f48610e5), [`cf71982e0`](https://github.com/Khan/perseus/commit/cf71982e0fe9f831456d760fc4e98b1e93748c4f), [`9c651172d`](https://github.com/Khan/perseus/commit/9c651172dffd7ca9f621e777069f361be05ce049), [`239be3f6c`](https://github.com/Khan/perseus/commit/239be3f6ccbbb89f52acf313bb4afbe359c1cee5), [`0d46a8599`](https://github.com/Khan/perseus/commit/0d46a85999557ca17daad67cb1663fe88a33a3ae), [`1c49ad243`](https://github.com/Khan/perseus/commit/1c49ad243756b4519c57603c9d098cbfe18baa15)]:
    -   @khanacademy/perseus-core@12.1.0
    -   @khanacademy/perseus@63.1.0
    -   @khanacademy/math-input@26.0.0
    -   @khanacademy/kas@2.0.5
    -   @khanacademy/keypad-context@3.0.11
    -   @khanacademy/kmath@2.0.11
    -   @khanacademy/perseus-linter@3.0.11
    -   @khanacademy/perseus-score@7.0.1
    -   @khanacademy/perseus-utils@2.0.4
    -   @khanacademy/pure-markdown@2.0.5

## 22.0.1

### Patch Changes

-   [#2455](https://github.com/Khan/perseus/pull/2455) [`998d12113`](https://github.com/Khan/perseus/commit/998d121139c4017e557c0bd33a63fa9154119d6f) Thanks [@marcysutton](https://github.com/marcysutton)! - Update to latest WB typography and tokens packages, using REM font sizing

*   [#2491](https://github.com/Khan/perseus/pull/2491) [`69c12a0fa`](https://github.com/Khan/perseus/commit/69c12a0fa0c5a9454f88f6b61ebb48dc0a217bc7) Thanks [@jandrade](https://github.com/jandrade)! - Updates WB Button instances to match new API (color -> actionType)

*   Updated dependencies [[`670b695e4`](https://github.com/Khan/perseus/commit/670b695e4dac6b7d795e8e3502032caa50d36b29), [`998d12113`](https://github.com/Khan/perseus/commit/998d121139c4017e557c0bd33a63fa9154119d6f), [`69c12a0fa`](https://github.com/Khan/perseus/commit/69c12a0fa0c5a9454f88f6b61ebb48dc0a217bc7)]:
    -   @khanacademy/perseus@63.0.1
    -   @khanacademy/math-input@25.1.6

## 22.0.0

### Major Changes

-   [#2501](https://github.com/Khan/perseus/pull/2501) [`8f3a7c5b4`](https://github.com/Khan/perseus/commit/8f3a7c5b4a2c57f5b0e55f2804980e77418e37e8) Thanks [@aag](https://github.com/aag)! - Release the new Free Response Widget

### Minor Changes

-   [#2332](https://github.com/Khan/perseus/pull/2332) [`2f6d2d042`](https://github.com/Khan/perseus/commit/2f6d2d0424940fd54e6ba4970f6f70bee38935f8) Thanks [@rgpass](https://github.com/rgpass)! - Add optional character limit support

*   [#2297](https://github.com/Khan/perseus/pull/2297) [`fc4e00e75`](https://github.com/Khan/perseus/commit/fc4e00e75e7633f396245dd08126023f255676ed) Thanks [@rgpass](https://github.com/rgpass)! - Add ability to customize the placeholder text in a Free Response widget

-   [#2273](https://github.com/Khan/perseus/pull/2273) [`15025d441`](https://github.com/Khan/perseus/commit/15025d4412617a83c4cdf553be7e6aff9f3101ab) Thanks [@aag](https://github.com/aag)! - Add a basic version of the new FreeResponse widget

### Patch Changes

-   [#2498](https://github.com/Khan/perseus/pull/2498) [`25b24e04c`](https://github.com/Khan/perseus/commit/25b24e04c992b3993315a7af6b330b3aef2e8698) Thanks [@aag](https://github.com/aag)! - Add scoring and validation functions for the Free Response Widget

*   [#2286](https://github.com/Khan/perseus/pull/2286) [`6b3bc5c51`](https://github.com/Khan/perseus/commit/6b3bc5c51f6024442469753a68f36d2b8b8885bd) Thanks [@aag](https://github.com/aag)! - Add scoring criteria to the Free Response Widget

-   [#2453](https://github.com/Khan/perseus/pull/2453) [`89d7c5a2f`](https://github.com/Khan/perseus/commit/89d7c5a2ff3bfc30a9fbaf5b470330952dac0702) Thanks [@aag](https://github.com/aag)! - Add LaTeX rendering to Free Response Widget questions

*   [#2486](https://github.com/Khan/perseus/pull/2486) [`68de23d36`](https://github.com/Khan/perseus/commit/68de23d361b369a9b437f2908f06013e46c07fd7) Thanks [@aag](https://github.com/aag)! - Update visual styling and a11y features

-   [#2493](https://github.com/Khan/perseus/pull/2493) [`3cb963b9f`](https://github.com/Khan/perseus/commit/3cb963b9f786f97ace092318fd14fd677ceb9f2f) Thanks [@aag](https://github.com/aag)! - Refactor rendering of FreeResponseEditor

-   Updated dependencies [[`25b24e04c`](https://github.com/Khan/perseus/commit/25b24e04c992b3993315a7af6b330b3aef2e8698), [`dd6916b31`](https://github.com/Khan/perseus/commit/dd6916b3133d325602b8ce31a01f3de3a5eeca14), [`2f6d2d042`](https://github.com/Khan/perseus/commit/2f6d2d0424940fd54e6ba4970f6f70bee38935f8), [`fc4e00e75`](https://github.com/Khan/perseus/commit/fc4e00e75e7633f396245dd08126023f255676ed), [`15025d441`](https://github.com/Khan/perseus/commit/15025d4412617a83c4cdf553be7e6aff9f3101ab), [`8f3a7c5b4`](https://github.com/Khan/perseus/commit/8f3a7c5b4a2c57f5b0e55f2804980e77418e37e8), [`6b3bc5c51`](https://github.com/Khan/perseus/commit/6b3bc5c51f6024442469753a68f36d2b8b8885bd), [`89d7c5a2f`](https://github.com/Khan/perseus/commit/89d7c5a2ff3bfc30a9fbaf5b470330952dac0702), [`4d6debc84`](https://github.com/Khan/perseus/commit/4d6debc84d539578b883ef8b89658d2aa33f6445), [`68de23d36`](https://github.com/Khan/perseus/commit/68de23d361b369a9b437f2908f06013e46c07fd7), [`3cb963b9f`](https://github.com/Khan/perseus/commit/3cb963b9f786f97ace092318fd14fd677ceb9f2f)]:
    -   @khanacademy/perseus@63.0.0
    -   @khanacademy/perseus-core@12.0.0
    -   @khanacademy/perseus-score@7.0.0
    -   @khanacademy/keypad-context@3.0.10
    -   @khanacademy/kmath@2.0.10
    -   @khanacademy/math-input@25.1.5
    -   @khanacademy/perseus-linter@3.0.10

## 21.0.0

### Major Changes

-   [#2463](https://github.com/Khan/perseus/pull/2463) [`d64277bc8`](https://github.com/Khan/perseus/commit/d64277bc85b0b533ef85eec2e07d24a6c407f089) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove deprecated EditorPage props: workAreaSelector, solutionAreaSelector, and hintsAreaSelector

### Patch Changes

-   [#2469](https://github.com/Khan/perseus/pull/2469) [`4fae24098`](https://github.com/Khan/perseus/commit/4fae24098a0aa73f1ad6b3f0545381c199c9df25) Thanks [@dependabot](https://github.com/apps/dependabot)! - Bumping wonder-blocks versions

*   [#2472](https://github.com/Khan/perseus/pull/2472) [`3389e0611`](https://github.com/Khan/perseus/commit/3389e06111b2c801fba6c34ed4e5bdc747ef1ed1) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Remove eslint-plugin-functional linter

*   Updated dependencies [[`536de9b97`](https://github.com/Khan/perseus/commit/536de9b973a72841c1e7db9398510781bf2deea4), [`b5f1af8fc`](https://github.com/Khan/perseus/commit/b5f1af8fc66ae0be2b2aa89ffe4f47c87b050309), [`3c0c4e72f`](https://github.com/Khan/perseus/commit/3c0c4e72f75462b0c9133f6e1af4cf70f9cac1ca), [`4fae24098`](https://github.com/Khan/perseus/commit/4fae24098a0aa73f1ad6b3f0545381c199c9df25), [`6e3991082`](https://github.com/Khan/perseus/commit/6e3991082cf41d6dcf397adcc288a966091a9569), [`a7ee94c42`](https://github.com/Khan/perseus/commit/a7ee94c42201b2bd39a0e885b9654e19a0af3cee), [`3389e0611`](https://github.com/Khan/perseus/commit/3389e06111b2c801fba6c34ed4e5bdc747ef1ed1), [`7611266b8`](https://github.com/Khan/perseus/commit/7611266b853b68fee3e13a4ea28c2dcfb97b3d1e), [`12d72deb4`](https://github.com/Khan/perseus/commit/12d72deb4d1f8c1ce4768fd19b9a15c2b2911706), [`077d2d60e`](https://github.com/Khan/perseus/commit/077d2d60e96ef77e7cae87cf0244b5c5f073e534), [`e03eddf49`](https://github.com/Khan/perseus/commit/e03eddf4976752f31701319e1193efbcb0f74a37)]:
    -   @khanacademy/perseus-core@11.0.0
    -   @khanacademy/perseus@62.0.0
    -   @khanacademy/perseus-score@6.0.0
    -   @khanacademy/kas@2.0.4
    -   @khanacademy/kmath@2.0.9
    -   @khanacademy/math-input@25.1.4
    -   @khanacademy/perseus-linter@3.0.9
    -   @khanacademy/perseus-utils@2.0.3
    -   @khanacademy/keypad-context@3.0.9
    -   @khanacademy/pure-markdown@2.0.4

## 20.2.2

### Patch Changes

-   [#2444](https://github.com/Khan/perseus/pull/2444) [`8a7eb469b`](https://github.com/Khan/perseus/commit/8a7eb469b8e6f1d52fa5e06d9b5d57917e633a6b) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixing OrdererEditor so that it properly returns fully updated options onOptionsChange.

-   Updated dependencies [[`a87ba4e37`](https://github.com/Khan/perseus/commit/a87ba4e3762bd8b5d670a6320f3d8190f2e0da29)]:
    -   @khanacademy/perseus-core@10.1.0
    -   @khanacademy/perseus@61.2.1
    -   @khanacademy/keypad-context@3.0.8
    -   @khanacademy/kmath@2.0.8
    -   @khanacademy/math-input@25.1.3
    -   @khanacademy/perseus-linter@3.0.8
    -   @khanacademy/perseus-score@5.0.5

## 20.2.1

### Patch Changes

-   Updated dependencies [[`4c8030081`](https://github.com/Khan/perseus/commit/4c803008155f7c20c88949c9caf4f9c9a2fd399e), [`8f49aac1f`](https://github.com/Khan/perseus/commit/8f49aac1f58d577f037bc03cb24d59894524e66b)]:
    -   @khanacademy/math-input@25.1.2
    -   @khanacademy/perseus@61.2.0

## 20.2.0

### Minor Changes

-   [#2449](https://github.com/Khan/perseus/pull/2449) [`2243316be`](https://github.com/Khan/perseus/commit/2243316be4f54777935cb25cf5d34f44b7537700) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - UI updates to Expression editor

### Patch Changes

-   [#2402](https://github.com/Khan/perseus/pull/2402) [`558cc1cc6`](https://github.com/Khan/perseus/commit/558cc1cc6ad468ba6538648c57d47df5704e6858) Thanks [@benchristel](https://github.com/benchristel)! - Add typetests to ensure that the data format accepted by
    `parseAndMigratePerseusItem` stays in sync with the types in `data-schema.ts`,
    exported from `@khanacademy/perseus-core`. Breaking change:
    `PerseusGraphTypeAngle.coords` can no longer be `null`; use `undefined` instead.

*   [#2421](https://github.com/Khan/perseus/pull/2421) [`bedcfc6f2`](https://github.com/Khan/perseus/commit/bedcfc6f2993201bb943bd688e95efd368e8d7cb) Thanks [@mahtabsabet](https://github.com/mahtabsabet)! - Allow widgets within hints to be collapsed/expanded through editor controls

-   [#2414](https://github.com/Khan/perseus/pull/2414) [`e7807485e`](https://github.com/Khan/perseus/commit/e7807485e0d33621efa4468933e6c77ce9a53def) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix dependencies so that the package correctly depends on all of the packages it uses

*   [#2430](https://github.com/Khan/perseus/pull/2430) [`312166b0b`](https://github.com/Khan/perseus/commit/312166b0b487fb276983f6ce717b1a21f021e2e8) Thanks [@jandrade](https://github.com/jandrade)! - Updates the `ExpressionEditor` widget to use a WB `Button` instance that resembles the previously supported `light` variant (now deprecated).

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

-   [#2438](https://github.com/Khan/perseus/pull/2438) [`3f32593c9`](https://github.com/Khan/perseus/commit/3f32593c9dd46140b4d8891d50e34f97e751783f) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Add a linter to prevent accidental mutation of object and array values

-   Updated dependencies [[`a2701f002`](https://github.com/Khan/perseus/commit/a2701f00214499cc7ab7730407f70e957d1adf7b), [`39ca81d0f`](https://github.com/Khan/perseus/commit/39ca81d0f4b5a58b70db5ef14fb17d720abd28d7), [`558cc1cc6`](https://github.com/Khan/perseus/commit/558cc1cc6ad468ba6538648c57d47df5704e6858), [`79a84d31b`](https://github.com/Khan/perseus/commit/79a84d31b54289ea69454db7f857896330c1c5d8), [`ca4df1cf8`](https://github.com/Khan/perseus/commit/ca4df1cf8c6c28cfb1d45dc94ec7eee61dfef777), [`4282de2b2`](https://github.com/Khan/perseus/commit/4282de2b214e15a7043ee3786c1df11b346c2e97), [`4b25852db`](https://github.com/Khan/perseus/commit/4b25852db90f0b1884595c8b443a87f66a9fe64f), [`e7807485e`](https://github.com/Khan/perseus/commit/e7807485e0d33621efa4468933e6c77ce9a53def), [`4184314fe`](https://github.com/Khan/perseus/commit/4184314fe3e1e48ea81429ff78184530d90d31ee), [`1f88cc191`](https://github.com/Khan/perseus/commit/1f88cc1912d9b33b899512ee9052bec10227a4c1), [`22e7de307`](https://github.com/Khan/perseus/commit/22e7de307d3662181890abed0723e463b15fcd5a), [`a90ebca08`](https://github.com/Khan/perseus/commit/a90ebca08b44174a6d94b9cc3835e9114b584183), [`c27162249`](https://github.com/Khan/perseus/commit/c271622490d64f359b8ff8e2fcafc35229c60832), [`28c395f8e`](https://github.com/Khan/perseus/commit/28c395f8e0a7f9c11b85fd42ce854fcb931a3b89), [`2243316be`](https://github.com/Khan/perseus/commit/2243316be4f54777935cb25cf5d34f44b7537700), [`bfa5ce68a`](https://github.com/Khan/perseus/commit/bfa5ce68a2c7854261f3f49822fdc159fca07993), [`b7d3b9eaf`](https://github.com/Khan/perseus/commit/b7d3b9eafd9cfddc46931c4591de36c9097ec6be), [`f1662239e`](https://github.com/Khan/perseus/commit/f1662239e40b0db4fd75823746a7fc37662f7494), [`aa7b1b621`](https://github.com/Khan/perseus/commit/aa7b1b621efd75b54419b21bc998caa2e241097f), [`1b773e2a0`](https://github.com/Khan/perseus/commit/1b773e2a0bff73072515649027066d498d33a931), [`3f32593c9`](https://github.com/Khan/perseus/commit/3f32593c9dd46140b4d8891d50e34f97e751783f)]:
    -   @khanacademy/perseus@61.1.0
    -   @khanacademy/perseus-core@10.0.0
    -   @khanacademy/kas@2.0.3
    -   @khanacademy/keypad-context@3.0.7
    -   @khanacademy/kmath@2.0.7
    -   @khanacademy/math-input@25.1.1
    -   @khanacademy/perseus-linter@3.0.7
    -   @khanacademy/perseus-score@5.0.4
    -   @khanacademy/perseus-utils@2.0.2
    -   @khanacademy/pure-markdown@2.0.3

## 20.1.6

### Patch Changes

-   Updated dependencies [[`3078f4c59`](https://github.com/Khan/perseus/commit/3078f4c59aa0c3b407cbcf3db8c43c69734d01f9)]:
    -   @khanacademy/perseus@61.0.3

## 20.1.5

### Patch Changes

-   Updated dependencies [[`016357a5b`](https://github.com/Khan/perseus/commit/016357a5bef1e2b8896a2cb17dd7eedbd6e51f77)]:
    -   @khanacademy/perseus@61.0.2

## 20.1.4

### Patch Changes

-   Updated dependencies [[`45635f7ef`](https://github.com/Khan/perseus/commit/45635f7ef91cf8f7a98149b05198c7e628c8ef2d), [`457c9b818`](https://github.com/Khan/perseus/commit/457c9b8188f60c901e2c64a43e68871a61857697), [`a7f293aab`](https://github.com/Khan/perseus/commit/a7f293aab18fcba056d61f740dd5cdfa8e796c08)]:
    -   @khanacademy/perseus-core@9.0.0
    -   @khanacademy/perseus@61.0.1
    -   @khanacademy/math-input@25.1.0
    -   @khanacademy/keypad-context@3.0.6
    -   @khanacademy/kmath@2.0.6
    -   @khanacademy/perseus-linter@3.0.6
    -   @khanacademy/perseus-score@5.0.3

## 20.1.3

### Patch Changes

-   [#2383](https://github.com/Khan/perseus/pull/2383) [`f938449f9`](https://github.com/Khan/perseus/commit/f938449f94fd7f4b1ed54cf187bdd7dd8d18cff5) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Removing dependency on hubble.js

*   [#2389](https://github.com/Khan/perseus/pull/2389) [`c922913b6`](https://github.com/Khan/perseus/commit/c922913b6289d34bf0fecb7bef96c0a6be45d8e7) Thanks [@handeyeco](https://github.com/handeyeco)! - make splitPerseusItem take/return PerseusItems instead of PerseusRenderers (also moves generateTestPerseusItem helper)

*   Updated dependencies [[`d6f3c50bd`](https://github.com/Khan/perseus/commit/d6f3c50bd21bf46f6e28f5949dfb1b16037cc688), [`e47a2229b`](https://github.com/Khan/perseus/commit/e47a2229b5bdd103145a165cd76b261375adac31), [`f938449f9`](https://github.com/Khan/perseus/commit/f938449f94fd7f4b1ed54cf187bdd7dd8d18cff5), [`87558715e`](https://github.com/Khan/perseus/commit/87558715e33f9e45436bd48fb1b3401aa7fb26b6), [`154ee9999`](https://github.com/Khan/perseus/commit/154ee999955cb1033072c7ae558810d4cc09e9c5), [`8d63aedb1`](https://github.com/Khan/perseus/commit/8d63aedb1f40dd3afa5213ab4498e9a26592bacf), [`9c9861eda`](https://github.com/Khan/perseus/commit/9c9861edaf6cf954796537d7662cf68d583962d6), [`c922913b6`](https://github.com/Khan/perseus/commit/c922913b6289d34bf0fecb7bef96c0a6be45d8e7), [`44eea76df`](https://github.com/Khan/perseus/commit/44eea76df58f89d3e0fa9f101ca1bc4ea93b6188)]:
    -   @khanacademy/perseus@61.0.0
    -   @khanacademy/perseus-core@8.0.0
    -   @khanacademy/perseus-score@5.0.2
    -   @khanacademy/kas@2.0.2
    -   @khanacademy/keypad-context@3.0.5
    -   @khanacademy/kmath@2.0.5
    -   @khanacademy/math-input@25.0.5
    -   @khanacademy/perseus-linter@3.0.5
    -   @khanacademy/perseus-utils@2.0.1
    -   @khanacademy/pure-markdown@2.0.2

## 20.1.2

### Patch Changes

-   Updated dependencies [[`ea8398c3e`](https://github.com/Khan/perseus/commit/ea8398c3ea726318b2076643c2a9ee31d43f1e0f)]:
    -   @khanacademy/perseus@60.0.2

## 20.1.1

### Patch Changes

-   Updated dependencies [[`1ee46bdef`](https://github.com/Khan/perseus/commit/1ee46bdef3347198d2d2b2ce548708816aa7705f)]:
    -   @khanacademy/perseus@60.0.1
    -   @khanacademy/perseus-core@7.1.1
    -   @khanacademy/keypad-context@3.0.4
    -   @khanacademy/kmath@2.0.4
    -   @khanacademy/math-input@25.0.4
    -   @khanacademy/perseus-linter@3.0.4
    -   @khanacademy/perseus-score@5.0.1

## 20.1.0

### Minor Changes

-   [#2356](https://github.com/Khan/perseus/pull/2356) [`1a80b2bc7`](https://github.com/Khan/perseus/commit/1a80b2bc7a9d8c695312f8cca1d359ab666d21e7) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Removing the sort functionality on expression answer forms, fixing delete functionality, and updating change handlers to cleaner format.

### Patch Changes

-   Updated dependencies [[`99c215ae4`](https://github.com/Khan/perseus/commit/99c215ae46e2995b6727a4e8f2083bfbb1ef59b3), [`4ac22bdad`](https://github.com/Khan/perseus/commit/4ac22bdadcdad844ed9964485ef727de53c6dfa7), [`86ea32b0c`](https://github.com/Khan/perseus/commit/86ea32b0c4ad32a921f1c81661cc218cfd41d77a), [`ab80b4b12`](https://github.com/Khan/perseus/commit/ab80b4b12ad5107ac75f9b6f6c6ab125b2d65735), [`5ac42d16c`](https://github.com/Khan/perseus/commit/5ac42d16c86fe062630cdec518a3dbdc109e0f17), [`ccce206f2`](https://github.com/Khan/perseus/commit/ccce206f212451579be047f801d2ccb6a198c207)]:
    -   @khanacademy/perseus-core@7.1.0
    -   @khanacademy/perseus-score@5.0.0
    -   @khanacademy/perseus@60.0.0
    -   @khanacademy/math-input@25.0.3
    -   @khanacademy/keypad-context@3.0.3
    -   @khanacademy/kmath@2.0.3
    -   @khanacademy/perseus-linter@3.0.3

## 20.0.3

### Patch Changes

-   Updated dependencies [[`91ac603f9`](https://github.com/Khan/perseus/commit/91ac603f98289b11458f51eeb77af515daab5dbb), [`3cdf61b09`](https://github.com/Khan/perseus/commit/3cdf61b091393f6728dfdb8a460c6dd2f4909daa)]:
    -   @khanacademy/perseus-score@4.1.0
    -   @khanacademy/perseus-core@7.0.2
    -   @khanacademy/perseus@59.1.1
    -   @khanacademy/keypad-context@3.0.2
    -   @khanacademy/kmath@2.0.2
    -   @khanacademy/math-input@25.0.2
    -   @khanacademy/perseus-linter@3.0.2

## 20.0.2

### Patch Changes

-   [#2357](https://github.com/Khan/perseus/pull/2357) [`01746d3f3`](https://github.com/Khan/perseus/commit/01746d3f3e29a48af69c3f01505c61cd10706be0) Thanks [@jandrade](https://github.com/jandrade)! - Update IconButton instances to match new WB changes (IconButton styles, actionType)

*   [#2334](https://github.com/Khan/perseus/pull/2334) [`6c5a0121d`](https://github.com/Khan/perseus/commit/6c5a0121dae2f0452baccc30401888379b5def95) Thanks [@handeyeco](https://github.com/handeyeco)! - Add Eslint rule "@typescript-eslint/no-restricted-imports" to help prevent circular dependencies

*   Updated dependencies [[`865844cf8`](https://github.com/Khan/perseus/commit/865844cf86f20babe8f4425c366811992d7ab0c6), [`fd3a520c9`](https://github.com/Khan/perseus/commit/fd3a520c93410ae9b2af801714a289f1722e8e8e), [`140fe6563`](https://github.com/Khan/perseus/commit/140fe6563dd885c92a424b9bae81acb6a8a39582), [`01746d3f3`](https://github.com/Khan/perseus/commit/01746d3f3e29a48af69c3f01505c61cd10706be0), [`e03cfbbdd`](https://github.com/Khan/perseus/commit/e03cfbbddf33922959c0a984d13b5e304fa66375), [`6c5a0121d`](https://github.com/Khan/perseus/commit/6c5a0121dae2f0452baccc30401888379b5def95)]:
    -   @khanacademy/perseus@59.1.0
    -   @khanacademy/math-input@25.0.1
    -   @khanacademy/kas@2.0.1
    -   @khanacademy/keypad-context@3.0.1
    -   @khanacademy/kmath@2.0.1
    -   @khanacademy/perseus-core@7.0.1
    -   @khanacademy/perseus-linter@3.0.1
    -   @khanacademy/perseus-score@4.0.2
    -   @khanacademy/perseus-utils@2.0.1
    -   @khanacademy/pure-markdown@2.0.1

## 20.0.1

### Patch Changes

-   [#2341](https://github.com/Khan/perseus/pull/2341) [`05d3c998d`](https://github.com/Khan/perseus/commit/05d3c998d3f01b1f33ea6213bda8dd02cf5c25a6) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: each vs forEach in answer-types causing issues with fractions in the editor

-   Updated dependencies [[`05d3c998d`](https://github.com/Khan/perseus/commit/05d3c998d3f01b1f33ea6213bda8dd02cf5c25a6)]:
    -   @khanacademy/perseus@59.0.1
    -   @khanacademy/perseus-score@4.0.1

## 20.0.0

### Major Changes

-   [#2339](https://github.com/Khan/perseus/pull/2339) [`ef5fea555`](https://github.com/Khan/perseus/commit/ef5fea5551230f49af5b31705e84b23493f76883) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Revert move to ESM-only packages (package again ships with CJS and ESM builds)

### Patch Changes

-   Updated dependencies [[`ef5fea555`](https://github.com/Khan/perseus/commit/ef5fea5551230f49af5b31705e84b23493f76883)]:
    -   @khanacademy/kas@2.0.0
    -   @khanacademy/keypad-context@3.0.0
    -   @khanacademy/kmath@2.0.0
    -   @khanacademy/math-input@25.0.0
    -   @khanacademy/perseus@59.0.0
    -   @khanacademy/perseus-core@7.0.0
    -   @khanacademy/perseus-linter@3.0.0
    -   @khanacademy/perseus-score@4.0.0
    -   @khanacademy/perseus-utils@2.0.0
    -   @khanacademy/pure-markdown@2.0.0

## 19.0.0

### Major Changes

-   [#2331](https://github.com/Khan/perseus/pull/2331) [`c2e33e522`](https://github.com/Khan/perseus/commit/c2e33e52291d6379799754e27c5d33b02ff4b1fa) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove CJS output from package (package is now ESM only)

### Patch Changes

-   Updated dependencies [[`87b129dbf`](https://github.com/Khan/perseus/commit/87b129dbf47c807b2be1fab7a18fa2e4a7984529), [`745b6337c`](https://github.com/Khan/perseus/commit/745b6337cad2aa6bbc16efaf2b66e6aef227e6db), [`c2e33e522`](https://github.com/Khan/perseus/commit/c2e33e52291d6379799754e27c5d33b02ff4b1fa), [`3bfa609b9`](https://github.com/Khan/perseus/commit/3bfa609b9131c477b16fdd00f32f52b638357e7b)]:
    -   @khanacademy/perseus@58.0.0
    -   @khanacademy/kas@1.0.0
    -   @khanacademy/keypad-context@2.0.0
    -   @khanacademy/kmath@1.0.0
    -   @khanacademy/math-input@24.0.0
    -   @khanacademy/perseus-core@6.0.0
    -   @khanacademy/perseus-linter@2.0.0
    -   @khanacademy/perseus-score@3.0.0
    -   @khanacademy/perseus-utils@1.0.0
    -   @khanacademy/pure-markdown@1.0.0

## 18.2.3

### Patch Changes

-   [#2310](https://github.com/Khan/perseus/pull/2310) [`23189ca3d`](https://github.com/Khan/perseus/commit/23189ca3dfaab3b26fbe49855930ae8cfd8b4475) Thanks [@tatianasnook](https://github.com/tatianasnook)! - Modified the 'Aligned equations' template content to change the current format as requested in the ticket. Added // eslint-disable-next-line prettier/prettier to preserve the formatting.

## 18.2.2

### Patch Changes

-   [#2322](https://github.com/Khan/perseus/pull/2322) [`4bd882b43`](https://github.com/Khan/perseus/commit/4bd882b43b15d9d3d5ca850f5148eba57c7dca59) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change how version injection code is shared/bundled

-   Updated dependencies [[`7b76274f0`](https://github.com/Khan/perseus/commit/7b76274f0bd362d0f2df3e45f47ecc3545ecfdd0), [`11a3b8b24`](https://github.com/Khan/perseus/commit/11a3b8b24aa05fa9774bbb8ef1c73a249f368a9e), [`5b6e9df5b`](https://github.com/Khan/perseus/commit/5b6e9df5b6bcacf7646475ff7884415b815f68c5), [`2e26c0872`](https://github.com/Khan/perseus/commit/2e26c087224d620c3a8babcbfe4832e75b5e0269), [`7a60db8e8`](https://github.com/Khan/perseus/commit/7a60db8e8d61119930dda0a80118c4b99b183a60), [`ca06cb806`](https://github.com/Khan/perseus/commit/ca06cb80686b8b414766d9b1d91a48fa4b71994c), [`4bd882b43`](https://github.com/Khan/perseus/commit/4bd882b43b15d9d3d5ca850f5148eba57c7dca59)]:
    -   @khanacademy/math-input@23.0.6
    -   @khanacademy/perseus@57.2.2
    -   @khanacademy/kmath@0.4.7
    -   @khanacademy/perseus-core@5.4.2
    -   @khanacademy/perseus-score@2.3.7
    -   @khanacademy/kas@0.5.1
    -   @khanacademy/keypad-context@1.1.7
    -   @khanacademy/perseus-linter@1.3.7
    -   @khanacademy/perseus-utils@0.0.2
    -   @khanacademy/pure-markdown@0.4.1

## 18.2.1

### Patch Changes

-   Updated dependencies [[`1b5f51415`](https://github.com/Khan/perseus/commit/1b5f514159c25fd0eb760cb6d20cab62a813cca4), [`c170c1d3c`](https://github.com/Khan/perseus/commit/c170c1d3c59e67e382d132aa7058260f876121fc), [`87420d7d3`](https://github.com/Khan/perseus/commit/87420d7d3aa1285a29c9f0c94fcead9ec4ae657d), [`4c0b317c3`](https://github.com/Khan/perseus/commit/4c0b317c357ac06277a58e5d6ae83dc4dfa04189), [`335940746`](https://github.com/Khan/perseus/commit/3359407467fe5d36b4c5600da29c4ce623a2ef28), [`3b0b1c700`](https://github.com/Khan/perseus/commit/3b0b1c70006d2574004141bffbafbbfcd528e76f)]:
    -   @khanacademy/perseus-core@5.4.1
    -   @khanacademy/perseus-score@2.3.6
    -   @khanacademy/perseus@57.2.1
    -   @khanacademy/keypad-context@1.1.6
    -   @khanacademy/kmath@0.4.6
    -   @khanacademy/math-input@23.0.5
    -   @khanacademy/perseus-linter@1.3.6

## 18.2.0

### Minor Changes

-   [#2316](https://github.com/Khan/perseus/pull/2316) [`3c8ff9936`](https://github.com/Khan/perseus/commit/3c8ff993615a7224a18250f4a7e96a55ab5c724d) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Add new labelLocation value for Interactive Graphs

### Patch Changes

-   [#2317](https://github.com/Khan/perseus/pull/2317) [`8043df235`](https://github.com/Khan/perseus/commit/8043df235640fbbb863a2c468183f9783a8cc109) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bugfix to ensure numCorrect is calculated correctly while in Radio Editor

-   Updated dependencies [[`3c8ff9936`](https://github.com/Khan/perseus/commit/3c8ff993615a7224a18250f4a7e96a55ab5c724d)]:
    -   @khanacademy/perseus@57.2.0
    -   @khanacademy/perseus-core@5.4.0
    -   @khanacademy/keypad-context@1.1.5
    -   @khanacademy/kmath@0.4.5
    -   @khanacademy/math-input@23.0.4
    -   @khanacademy/perseus-linter@1.3.5
    -   @khanacademy/perseus-score@2.3.5

## 18.1.0

### Minor Changes

-   [#2314](https://github.com/Khan/perseus/pull/2314) [`48bc498f8`](https://github.com/Khan/perseus/commit/48bc498f88f98e817ea426924cbc0b016e5802b9) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Revert labelLocation

### Patch Changes

-   Updated dependencies [[`48bc498f8`](https://github.com/Khan/perseus/commit/48bc498f88f98e817ea426924cbc0b016e5802b9)]:
    -   @khanacademy/perseus@57.1.0
    -   @khanacademy/perseus-core@5.3.0
    -   @khanacademy/keypad-context@1.1.4
    -   @khanacademy/kmath@0.4.4
    -   @khanacademy/math-input@23.0.3
    -   @khanacademy/perseus-linter@1.3.4
    -   @khanacademy/perseus-score@2.3.4

## 18.0.1

### Patch Changes

-   Updated dependencies [[`7be7a42d6`](https://github.com/Khan/perseus/commit/7be7a42d6c86c5aa45e0419162c2a6f2c0426fc8), [`1e67022c9`](https://github.com/Khan/perseus/commit/1e67022c9782c78b5beb59bb750014b52741d337)]:
    -   @khanacademy/perseus@57.0.1

## 18.0.0

### Major Changes

-   [#2303](https://github.com/Khan/perseus/pull/2303) [`5e7a6084c`](https://github.com/Khan/perseus/commit/5e7a6084ca141db5c908da2c4b2ffd959e7c5683) Thanks [@benchristel](https://github.com/benchristel)! - Drop support for using KaTeX as a math renderer. You may encounter styling issues or TeX syntax errors if you try to implement `PerseusDependencies.TeX` using KaTeX.

### Minor Changes

-   [#2284](https://github.com/Khan/perseus/pull/2284) [`0d5ab0b2e`](https://github.com/Khan/perseus/commit/0d5ab0b2e5d079b8ac805077a2abad6bc5b2132d) Thanks [@nishasy](https://github.com/nishasy)! - Add new labelLocation value for Interactive Graphs

### Patch Changes

-   Updated dependencies [[`0d5ab0b2e`](https://github.com/Khan/perseus/commit/0d5ab0b2e5d079b8ac805077a2abad6bc5b2132d), [`fea65eaf1`](https://github.com/Khan/perseus/commit/fea65eaf12918e7e1b1e893bea80549e69313ce2), [`9737eb497`](https://github.com/Khan/perseus/commit/9737eb497861dd2283eb24e39eb9771a07391aa5), [`dd7b13a78`](https://github.com/Khan/perseus/commit/dd7b13a7881738e2a85d253f25b04243caf2b9a4), [`af6d89007`](https://github.com/Khan/perseus/commit/af6d890076adb186c6ba237a2d766b99e3eb75ff), [`5e7a6084c`](https://github.com/Khan/perseus/commit/5e7a6084ca141db5c908da2c4b2ffd959e7c5683)]:
    -   @khanacademy/perseus@57.0.0
    -   @khanacademy/perseus-core@5.2.0
    -   @khanacademy/keypad-context@1.1.3
    -   @khanacademy/kmath@0.4.3
    -   @khanacademy/math-input@23.0.2
    -   @khanacademy/perseus-linter@1.3.3
    -   @khanacademy/perseus-score@2.3.3

## 17.9.2

### Patch Changes

-   Updated dependencies [[`91e30c02c`](https://github.com/Khan/perseus/commit/91e30c02c15ddc7c811b658bdb052172739a690a), [`254fa3605`](https://github.com/Khan/perseus/commit/254fa360518ffd78cd26a0fb47fec2d53d9db948), [`59b932619`](https://github.com/Khan/perseus/commit/59b93261916bb3583ee84396693d84fe796aa5d4)]:
    -   @khanacademy/perseus@56.2.0
    -   @khanacademy/perseus-core@5.1.0
    -   @khanacademy/math-input@23.0.1
    -   @khanacademy/keypad-context@1.1.2
    -   @khanacademy/kmath@0.4.2
    -   @khanacademy/perseus-linter@1.3.2
    -   @khanacademy/perseus-score@2.3.2

## 17.9.1

### Patch Changes

-   Updated dependencies [[`7ef0dae77`](https://github.com/Khan/perseus/commit/7ef0dae779e5c8aaed6b21e86cba5baee8c0be86), [`e87914dcd`](https://github.com/Khan/perseus/commit/e87914dcd2fc83b30053adbe064945d46ddb11e4), [`0438f6331`](https://github.com/Khan/perseus/commit/0438f6331c06e026f815d4087f76fe77acafa312), [`9b4c1942e`](https://github.com/Khan/perseus/commit/9b4c1942eeaadf6d3a201f516574c4597dfcbb3c), [`5226f43a9`](https://github.com/Khan/perseus/commit/5226f43a9785e2c7acb52b76e15f58384d313a34), [`015aace83`](https://github.com/Khan/perseus/commit/015aace83f6b125b8d02fa7f01dde47f071c44e9), [`88e4e905d`](https://github.com/Khan/perseus/commit/88e4e905d2a94134fd2390a55360281a29229fb5)]:
    -   @khanacademy/perseus@56.1.0

## 17.9.0

### Minor Changes

-   [#2226](https://github.com/Khan/perseus/pull/2226) [`909148cdc`](https://github.com/Khan/perseus/commit/909148cdccabb3f0a2156587ea1e870bae910f8d) Thanks [@handeyeco](https://github.com/handeyeco)! - Answerless Expression: Expression can render and is interactive with answerless data

### Patch Changes

-   [#2233](https://github.com/Khan/perseus/pull/2233) [`a0aee41b6`](https://github.com/Khan/perseus/commit/a0aee41b69d4288ef165416cea293100d037ce5f) Thanks [@handeyeco](https://github.com/handeyeco)! - RadioWidget v2 in support of answerless Radio

-   Updated dependencies [[`e02cc4109`](https://github.com/Khan/perseus/commit/e02cc4109a98d8d04054d7f4aae7931089facdda), [`941343ee3`](https://github.com/Khan/perseus/commit/941343ee3e3e88c2c4babb3040bfb2a73c64bf66), [`a0aee41b6`](https://github.com/Khan/perseus/commit/a0aee41b69d4288ef165416cea293100d037ce5f), [`909148cdc`](https://github.com/Khan/perseus/commit/909148cdccabb3f0a2156587ea1e870bae910f8d)]:
    -   @khanacademy/perseus@56.0.0
    -   @khanacademy/perseus-core@5.0.0
    -   @khanacademy/math-input@23.0.0
    -   @khanacademy/keypad-context@1.1.1
    -   @khanacademy/kmath@0.4.1
    -   @khanacademy/perseus-linter@1.3.1
    -   @khanacademy/perseus-score@2.3.1

## 17.8.1

### Patch Changes

-   Updated dependencies [[`ad8681004`](https://github.com/Khan/perseus/commit/ad8681004338004a8204983a4192f2c141e691d8)]:
    -   @khanacademy/perseus@55.0.1

## 17.8.0

### Minor Changes

-   [#2202](https://github.com/Khan/perseus/pull/2202) [`c7f6f63c8`](https://github.com/Khan/perseus/commit/c7f6f63c845566d99dae6df604426e5fb14a7e85) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Tooling:

    -   Switching to `pnpm`.

*   [#2265](https://github.com/Khan/perseus/pull/2265) [`e53c2ac71`](https://github.com/Khan/perseus/commit/e53c2ac710d20f34802df06962a172a8474b19f4) Thanks [@Myranae](https://github.com/Myranae)! - Export the ContentPreview component from perseus-editor

### Patch Changes

-   [#2259](https://github.com/Khan/perseus/pull/2259) [`a90cf7901`](https://github.com/Khan/perseus/commit/a90cf790159fefbee41437f20ac9a403a06f148f) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Minor change to how each package embeds it's package version in itself (slightly larger bundle size)

*   [#2209](https://github.com/Khan/perseus/pull/2209) [`612d3b53f`](https://github.com/Khan/perseus/commit/612d3b53fffc20c17ba504fb9dd8a6eb4a040716) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Minor string update for Numeric editor

-   [#2256](https://github.com/Khan/perseus/pull/2256) [`68bd12587`](https://github.com/Khan/perseus/commit/68bd12587e226317914953104e540e6c898cc2a4) Thanks [@nishasy](https://github.com/nishasy)! - [SR Tree] Add infotip with explanation about SR Tree

-   Updated dependencies [[`90034a875`](https://github.com/Khan/perseus/commit/90034a8754ab735ec84d959916b62a69d39efc2a), [`4dde99856`](https://github.com/Khan/perseus/commit/4dde998569bceb6931619777fb6f8ba6e7d17cea), [`4a75e6d42`](https://github.com/Khan/perseus/commit/4a75e6d42eeb4a819c6b52b5c9d5ad6f04e04c2a), [`dcf9017d9`](https://github.com/Khan/perseus/commit/dcf9017d9917e0f877677b010a905e477081b15f), [`e797a6a25`](https://github.com/Khan/perseus/commit/e797a6a2509326920ba28b14f128a54fcdd065b9), [`e7ad604af`](https://github.com/Khan/perseus/commit/e7ad604afce45feab7d268582ec6db41d6ab5e06), [`913551712`](https://github.com/Khan/perseus/commit/913551712b2ee90ace89ac2df8ed6b60c135fe28), [`c7f6f63c8`](https://github.com/Khan/perseus/commit/c7f6f63c845566d99dae6df604426e5fb14a7e85), [`b71154170`](https://github.com/Khan/perseus/commit/b711541701ec10ccb506d0f9cbafac4a1c7c4cc1), [`e5d17bbf2`](https://github.com/Khan/perseus/commit/e5d17bbf2bb14441dcfd5f412d0826e3a78078f2), [`a90cf7901`](https://github.com/Khan/perseus/commit/a90cf790159fefbee41437f20ac9a403a06f148f), [`e797a6a25`](https://github.com/Khan/perseus/commit/e797a6a2509326920ba28b14f128a54fcdd065b9), [`9d01457fc`](https://github.com/Khan/perseus/commit/9d01457fcb882ce3df555e3c7f733f94b02d0b6c), [`56b4ee61b`](https://github.com/Khan/perseus/commit/56b4ee61b064603fdbeb4577851fe142d881e245), [`da01542f2`](https://github.com/Khan/perseus/commit/da01542f2f9676f6d99fa930244ab6b21830a2f2), [`5de2e740b`](https://github.com/Khan/perseus/commit/5de2e740b35d69fc0059af5dbb74bd894986e124), [`24e2b4e45`](https://github.com/Khan/perseus/commit/24e2b4e45af4a7ef7657f99be5d1b07516d2ee0f), [`458d3ed60`](https://github.com/Khan/perseus/commit/458d3ed600be91dd75a30a80bfac1fbd87c60bcd), [`ee91b7063`](https://github.com/Khan/perseus/commit/ee91b7063982530274e3cc736b3e78ad9fae43cf), [`bd8a3b9d5`](https://github.com/Khan/perseus/commit/bd8a3b9d59ddbe71417d4c6b821503ab79c20830), [`20a08315b`](https://github.com/Khan/perseus/commit/20a08315b288244357b8a2526f87c2c5014f2fa6), [`d1d5a8247`](https://github.com/Khan/perseus/commit/d1d5a824766c6924249b00549128e8c57a960e77), [`926d42c99`](https://github.com/Khan/perseus/commit/926d42c990903583b36c4e9c5a72a2c80c85ac16), [`381842745`](https://github.com/Khan/perseus/commit/3818427456a2ffca56481adbdafa01fee40e83c0), [`c0149a1b9`](https://github.com/Khan/perseus/commit/c0149a1b9f9d917f0f9b98dd6d61414e9bb7d895), [`08409c6c9`](https://github.com/Khan/perseus/commit/08409c6c9eea1d19212d332acb056c5ef4971419), [`b9f5f97a8`](https://github.com/Khan/perseus/commit/b9f5f97a8a1bf9c0509c84e829dce7a8c7a9d2da), [`4eb9fe04a`](https://github.com/Khan/perseus/commit/4eb9fe04ab490799225569c9c64b84a1da92a5df), [`d1b655095`](https://github.com/Khan/perseus/commit/d1b65509552a64d95766dc6252215842e758d7f8), [`f6795c2e4`](https://github.com/Khan/perseus/commit/f6795c2e4b7fd639bb2df3fb9f123adb65659fb8), [`a0c897d74`](https://github.com/Khan/perseus/commit/a0c897d7406318e5492466a244b8d436b62d354d)]:
    -   @khanacademy/perseus-core@4.0.0
    -   @khanacademy/perseus@55.0.0
    -   @khanacademy/perseus-score@2.3.0
    -   @khanacademy/kmath@0.4.0
    -   @khanacademy/kas@0.5.0
    -   @khanacademy/keypad-context@1.1.0
    -   @khanacademy/math-input@22.3.0
    -   @khanacademy/perseus-linter@1.3.0
    -   @khanacademy/pure-markdown@0.4.0

## 17.7.0

### Minor Changes

-   [#2242](https://github.com/Khan/perseus/pull/2242) [`e187c6b67`](https://github.com/Khan/perseus/commit/e187c6b67cb4d83e42907527acfe6562346e92d8) Thanks [@benchristel](https://github.com/benchristel)! - Deprecate the `metadata` field in renderer, hint, and Group widget data schemas.

### Patch Changes

-   Updated dependencies [[`e63f83d0d`](https://github.com/Khan/perseus/commit/e63f83d0d89fd5b8e7aee3ab7248bcb19ec9be8a), [`e187c6b67`](https://github.com/Khan/perseus/commit/e187c6b67cb4d83e42907527acfe6562346e92d8), [`62ed407b8`](https://github.com/Khan/perseus/commit/62ed407b8647472f955467b8ce64261182bb8b59), [`cbd5a6528`](https://github.com/Khan/perseus/commit/cbd5a652818554aa368bcddb0381d4716bc7a8ba)]:
    -   @khanacademy/perseus-core@3.7.0
    -   @khanacademy/perseus@54.1.0
    -   @khanacademy/kas@0.4.16
    -   @khanacademy/keypad-context@1.0.19
    -   @khanacademy/kmath@0.3.5
    -   @khanacademy/math-input@22.2.6
    -   @khanacademy/perseus-score@2.2.2
    -   @khanacademy/pure-markdown@0.3.27

## 17.6.1

### Patch Changes

-   [#2223](https://github.com/Khan/perseus/pull/2223) [`f8a4becb0`](https://github.com/Khan/perseus/commit/f8a4becb03c543b034cc47d91d3335078bce76c0) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [Bugfix] Interactive Graph crashes in editor when setting domain for locked function

*   [#2230](https://github.com/Khan/perseus/pull/2230) [`5fd3aa351`](https://github.com/Khan/perseus/commit/5fd3aa35123d1bcbc64dd8b63c914396a1ad9f06) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Add screen reader support for pi-based numbers

-   [#2232](https://github.com/Khan/perseus/pull/2232) [`dc9989893`](https://github.com/Khan/perseus/commit/dc9989893a58b9ca758554606ada51441e0190fa) Thanks [@beaesguerra](https://github.com/beaesguerra)! - Tooling: Enabled jsx-a11y lint rules and disabled existing errors that were found

*   [#2229](https://github.com/Khan/perseus/pull/2229) [`91cd0c937`](https://github.com/Khan/perseus/commit/91cd0c9370447b9f8ffb4ae32c957649a3709ba9) Thanks [@nishasy](https://github.com/nishasy)! - [SR] Sinusoid - add screen reader support

-   [#2235](https://github.com/Khan/perseus/pull/2235) [`ab2041897`](https://github.com/Khan/perseus/commit/ab2041897dff393e2e86d4d4a6e5ad278eff17bd) Thanks [@benchristel](https://github.com/benchristel)! - Remove unused code, and export the `ParseFailureDetail` type from `@khanacademy/perseus-core`

*   [#2244](https://github.com/Khan/perseus/pull/2244) [`c565e26d4`](https://github.com/Khan/perseus/commit/c565e26d4cb56ec7114beb5a563f82a2993751b6) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Replace string-based function call with switch statement

*   Updated dependencies [[`f8a4becb0`](https://github.com/Khan/perseus/commit/f8a4becb03c543b034cc47d91d3335078bce76c0), [`91cede41f`](https://github.com/Khan/perseus/commit/91cede41fa6ef2744709e82d651d9bf3ba4c928a), [`5fd3aa351`](https://github.com/Khan/perseus/commit/5fd3aa35123d1bcbc64dd8b63c914396a1ad9f06), [`639eb089d`](https://github.com/Khan/perseus/commit/639eb089d120b01bd9cb87b5d1e0ba2b34772846), [`edd34241e`](https://github.com/Khan/perseus/commit/edd34241ea54bab011a7b66789c115850e2ae7a4), [`ae29e2b2f`](https://github.com/Khan/perseus/commit/ae29e2b2fd3b4ec9533b3a1845d2ca94d05d4ed7), [`dc9989893`](https://github.com/Khan/perseus/commit/dc9989893a58b9ca758554606ada51441e0190fa), [`91cd0c937`](https://github.com/Khan/perseus/commit/91cd0c9370447b9f8ffb4ae32c957649a3709ba9), [`df75123e5`](https://github.com/Khan/perseus/commit/df75123e59f0423b807a101d054a7a297e316d1c), [`43005350f`](https://github.com/Khan/perseus/commit/43005350f5dfb4f4a00badb442e2cfb8dca18014), [`037aaa2f4`](https://github.com/Khan/perseus/commit/037aaa2f486802926abbe4e754fef5e329c9526b), [`db9bc4fb6`](https://github.com/Khan/perseus/commit/db9bc4fb6b3929b6f727fc5b549a20d997b2a00a), [`3ec6ec179`](https://github.com/Khan/perseus/commit/3ec6ec1799b9dec7f8e8a5ae025abcfc3a068822), [`8e4cb7f53`](https://github.com/Khan/perseus/commit/8e4cb7f53efafed365ca5fa321dad14cb5ce2d30), [`ab2041897`](https://github.com/Khan/perseus/commit/ab2041897dff393e2e86d4d4a6e5ad278eff17bd), [`1ade12c18`](https://github.com/Khan/perseus/commit/1ade12c184ba9ef657a7c7d53b81da70fe85de31), [`71329fe35`](https://github.com/Khan/perseus/commit/71329fe353212e92411fdbbea7efd62f70068151), [`c565e26d4`](https://github.com/Khan/perseus/commit/c565e26d4cb56ec7114beb5a563f82a2993751b6), [`ce320b496`](https://github.com/Khan/perseus/commit/ce320b496bdc9580c194f878674773b845bb27b3)]:
    -   @khanacademy/perseus@54.0.0
    -   @khanacademy/perseus-core@3.6.0
    -   @khanacademy/math-input@22.2.5
    -   @khanacademy/perseus-score@2.2.1
    -   @khanacademy/kas@0.4.15
    -   @khanacademy/keypad-context@1.0.18
    -   @khanacademy/kmath@0.3.4
    -   @khanacademy/pure-markdown@0.3.26

## 17.6.0

### Minor Changes

-   [#2200](https://github.com/Khan/perseus/pull/2200) [`47cebd20f`](https://github.com/Khan/perseus/commit/47cebd20fdcf1f47c50f30901f0a1e1654ae4790) Thanks [@nishasy](https://github.com/nishasy)! - [Mafs] Remove mafs flag from Interactive Graph code

### Patch Changes

-   [#2190](https://github.com/Khan/perseus/pull/2190) [`7ec6c2fbc`](https://github.com/Khan/perseus/commit/7ec6c2fbc21d3d7d4ef98a58e021da4684561447) Thanks [@nishasy](https://github.com/nishasy)! - Add convertRadiansToDegrees function to kmath

*   [#2222](https://github.com/Khan/perseus/pull/2222) [`55be8a775`](https://github.com/Khan/perseus/commit/55be8a7751b92ea5192bc657ecb459a447373659) Thanks [@dependabot](https://github.com/apps/dependabot)! - Updating wonderblocks package versions.

-   [#2208](https://github.com/Khan/perseus/pull/2208) [`6a0bf7a52`](https://github.com/Khan/perseus/commit/6a0bf7a52b90518c4b957e3efe9a37e05db57ff8) Thanks [@nishasy](https://github.com/nishasy)! - [SR Tree] Handle SR Tree when multiple editors are on the page

*   [#2193](https://github.com/Khan/perseus/pull/2193) [`8d569b74c`](https://github.com/Khan/perseus/commit/8d569b74c7eee09b943234bcb462c8636c968234) Thanks [@beaesguerra](https://github.com/beaesguerra)! - Update internal addStyle variable name to address aphrodite-add-style-variable-name linting rule

*   Updated dependencies [[`fd606f43d`](https://github.com/Khan/perseus/commit/fd606f43d7687a15d6dc2cabd0e85fc71b5ed878), [`b44c8cb0a`](https://github.com/Khan/perseus/commit/b44c8cb0a54756b949b208d6fe4470aa23da4e8d), [`3ba74d173`](https://github.com/Khan/perseus/commit/3ba74d1731ceff13c9794a3aeaf79f1735b5fb86), [`55317d65e`](https://github.com/Khan/perseus/commit/55317d65e4cd859784aa9bacb7b5a550a54045f1), [`47cebd20f`](https://github.com/Khan/perseus/commit/47cebd20fdcf1f47c50f30901f0a1e1654ae4790), [`7ec6c2fbc`](https://github.com/Khan/perseus/commit/7ec6c2fbc21d3d7d4ef98a58e021da4684561447), [`6b8185885`](https://github.com/Khan/perseus/commit/6b8185885dc1836ee736fb52b10394ebf55edaee), [`f83a1fb03`](https://github.com/Khan/perseus/commit/f83a1fb03185645d636b102cf15e0366b9cf84b1), [`097176a26`](https://github.com/Khan/perseus/commit/097176a26db7b0c80b3be5e6fe469539f65de0ea), [`b3c562ac2`](https://github.com/Khan/perseus/commit/b3c562ac2cc6d02c433bf0587379c09a49080795), [`55be8a775`](https://github.com/Khan/perseus/commit/55be8a7751b92ea5192bc657ecb459a447373659), [`649e6b16a`](https://github.com/Khan/perseus/commit/649e6b16ab67fad694cde5473bcfb3abb719a57d), [`07779783a`](https://github.com/Khan/perseus/commit/07779783ae0e3a19c0c72e95a8eaa0b58a9cc968), [`cac39013b`](https://github.com/Khan/perseus/commit/cac39013bd59a5ef73f151e1170dec83b463f076), [`10ee67a9c`](https://github.com/Khan/perseus/commit/10ee67a9ce1584b994f50aad007e686ad54d294e), [`163dd67d2`](https://github.com/Khan/perseus/commit/163dd67d2a8e119bc18191816668352e43292da2), [`b07f2936f`](https://github.com/Khan/perseus/commit/b07f2936fccb94cde5cd34ce258973581611416a)]:
    -   @khanacademy/perseus@53.1.0
    -   @khanacademy/perseus-core@3.5.0
    -   @khanacademy/kmath@0.3.3
    -   @khanacademy/math-input@22.2.4
    -   @khanacademy/perseus-score@2.2.0
    -   @khanacademy/kas@0.4.14
    -   @khanacademy/keypad-context@1.0.17
    -   @khanacademy/pure-markdown@0.3.25

## 17.5.0

### Minor Changes

-   [#2167](https://github.com/Khan/perseus/pull/2167) [`c72166c30`](https://github.com/Khan/perseus/commit/c72166c3046aa7c0fcd4e3348d604248e8565c2e) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Allow axis tick labels to be multiples of pi

### Patch Changes

-   [#2157](https://github.com/Khan/perseus/pull/2157) [`af8f5d3ca`](https://github.com/Khan/perseus/commit/af8f5d3cac1f642bb5f0c96a2f536990c277224f) Thanks [@handeyeco](https://github.com/handeyeco)! - Move default widget options for Grapher to Perseus Core

*   [#2165](https://github.com/Khan/perseus/pull/2165) [`c8e383b46`](https://github.com/Khan/perseus/commit/c8e383b469426182a1392ca6ad2cde21b61e2f40) Thanks [@handeyeco](https://github.com/handeyeco)! - Move scorePerseusItem logic to PerseusScore

*   Updated dependencies [[`a21fd908d`](https://github.com/Khan/perseus/commit/a21fd908d705c5b9de56f29af54d726824f5668e), [`781834332`](https://github.com/Khan/perseus/commit/781834332921f839028aa5cb3c5c867121859e02), [`af8f5d3ca`](https://github.com/Khan/perseus/commit/af8f5d3cac1f642bb5f0c96a2f536990c277224f), [`a470c799e`](https://github.com/Khan/perseus/commit/a470c799eb53c87e08fb2f829b27e114ca80f63f), [`97e07c8ba`](https://github.com/Khan/perseus/commit/97e07c8baee12a37e471e8292dedbcf0588e2f50), [`43d8bc68e`](https://github.com/Khan/perseus/commit/43d8bc68e1b816f8eaf56d15c8d4623d4cd163b6), [`c72166c30`](https://github.com/Khan/perseus/commit/c72166c3046aa7c0fcd4e3348d604248e8565c2e), [`dbd496769`](https://github.com/Khan/perseus/commit/dbd496769e210fc4aca33778a567a99ff1654e7e), [`7f88f17fc`](https://github.com/Khan/perseus/commit/7f88f17fcd19914e6652e7abe86afc769930a0a4), [`3c4c6bc92`](https://github.com/Khan/perseus/commit/3c4c6bc9207f6f2d65312df1c2bd5bf5246182a2), [`c8e383b46`](https://github.com/Khan/perseus/commit/c8e383b469426182a1392ca6ad2cde21b61e2f40), [`564447af2`](https://github.com/Khan/perseus/commit/564447af2c030143c303c7ec88b055bab324fff1)]:
    -   @khanacademy/perseus@53.0.0
    -   @khanacademy/perseus-core@3.4.0
    -   @khanacademy/kmath@0.3.2
    -   @khanacademy/perseus-score@2.1.0
    -   @khanacademy/kas@0.4.13
    -   @khanacademy/keypad-context@1.0.16
    -   @khanacademy/math-input@22.2.3
    -   @khanacademy/pure-markdown@0.3.24

## 17.4.1

### Patch Changes

-   Updated dependencies [[`26de8f41f`](https://github.com/Khan/perseus/commit/26de8f41f544d2f72ab05e2829ffe53309a74fa2)]:
    -   @khanacademy/perseus@52.0.1

## 17.4.0

### Minor Changes

-   [#2015](https://github.com/Khan/perseus/pull/2015) [`46623c8f1`](https://github.com/Khan/perseus/commit/46623c8f19bedd15b3b29a1b156889aef3f91876) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [Numeric Input] Re-organize editor and improve its UI

*   [#2015](https://github.com/Khan/perseus/pull/2015) [`46623c8f1`](https://github.com/Khan/perseus/commit/46623c8f19bedd15b3b29a1b156889aef3f91876) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - [Numeric Input] - Adjust editor to organize settings more logically

### Patch Changes

-   [#2142](https://github.com/Khan/perseus/pull/2142) [`d7bcb14c3`](https://github.com/Khan/perseus/commit/d7bcb14c398059be0be20bea118f9fee1dfc93f6) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Radio upgrade logic to Perseus Core

*   [#2148](https://github.com/Khan/perseus/pull/2148) [`685774f2e`](https://github.com/Khan/perseus/commit/685774f2eae44e4cd5e0d6341a209012cf7e9bcb) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Matcher upgrade logic to Perseus Core

-   [#2145](https://github.com/Khan/perseus/pull/2145) [`8a489600e`](https://github.com/Khan/perseus/commit/8a489600e3b0b474da36cc492671879d1372ea46) Thanks [@handeyeco](https://github.com/handeyeco)! - Move simple widget upgrade logic to Perseus Core (pt 2)

*   [#2122](https://github.com/Khan/perseus/pull/2122) [`1a75ca628`](https://github.com/Khan/perseus/commit/1a75ca628405dbd9cbe8ee21d7a9039a78327c47) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Type and test fixes for new MockWidget (isolating to be seen only in tests)

-   [#2143](https://github.com/Khan/perseus/pull/2143) [`459c25074`](https://github.com/Khan/perseus/commit/459c2507472f104f521b5410feaa64402d473a43) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Passage widgets upgrade logic to Perseus Core

*   [#2144](https://github.com/Khan/perseus/pull/2144) [`dc8118aa1`](https://github.com/Khan/perseus/commit/dc8118aa1e28e77d78a57bc13e50d1954e3f8f69) Thanks [@handeyeco](https://github.com/handeyeco)! - Move simple widget upgrade logic to Perseus Core (pt 1)

-   [#2150](https://github.com/Khan/perseus/pull/2150) [`82fa90299`](https://github.com/Khan/perseus/commit/82fa902999d9d79a050fe9acf0031ba886b387fa) Thanks [@handeyeco](https://github.com/handeyeco)! - Move InteractiveGraph widget upgrade to Perseus Core

*   [#1965](https://github.com/Khan/perseus/pull/1965) [`0f2bec314`](https://github.com/Khan/perseus/commit/0f2bec314518636e822e8ca0fc080209f4be8bfe) Thanks [@Myranae](https://github.com/Myranae)! - Refactor the LabelImage widget to separate out answers from userInput into scoringData

-   [#2124](https://github.com/Khan/perseus/pull/2124) [`bdbdafe5d`](https://github.com/Khan/perseus/commit/bdbdafe5d66a76149624410a746909e4dc3a1ddc) Thanks [@dependabot](https://github.com/apps/dependabot)! - Updating wonder-blocks dependences.

*   [#2135](https://github.com/Khan/perseus/pull/2135) [`7a984eba6`](https://github.com/Khan/perseus/commit/7a984eba6f1cec3df314ec245d2176f5db190548) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Expression WidgetOptions logic to core

-   [#2141](https://github.com/Khan/perseus/pull/2141) [`1355d6cfc`](https://github.com/Khan/perseus/commit/1355d6cfcbd4cb44de3f05084744dbdefd19def8) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Measurer upgrade logic to Perseus Core

*   [#2149](https://github.com/Khan/perseus/pull/2149) [`75f43a8f4`](https://github.com/Khan/perseus/commit/75f43a8f41739df4831e589e0a2724e1c7169312) Thanks [@handeyeco](https://github.com/handeyeco)! - Move Table upgrade logic to Perseus Core

-   [#2147](https://github.com/Khan/perseus/pull/2147) [`ebf3695b6`](https://github.com/Khan/perseus/commit/ebf3695b69c7526279ef1c999f13b4e24be885be) Thanks [@handeyeco](https://github.com/handeyeco)! - Move upgrade logic for NumberLine to Perseus Core

-   Updated dependencies [[`8f8955718`](https://github.com/Khan/perseus/commit/8f89557185f7bed910251520863ed1c8ed3a4410), [`d7bcb14c3`](https://github.com/Khan/perseus/commit/d7bcb14c398059be0be20bea118f9fee1dfc93f6), [`685774f2e`](https://github.com/Khan/perseus/commit/685774f2eae44e4cd5e0d6341a209012cf7e9bcb), [`8a489600e`](https://github.com/Khan/perseus/commit/8a489600e3b0b474da36cc492671879d1372ea46), [`1a75ca628`](https://github.com/Khan/perseus/commit/1a75ca628405dbd9cbe8ee21d7a9039a78327c47), [`459c25074`](https://github.com/Khan/perseus/commit/459c2507472f104f521b5410feaa64402d473a43), [`a1e22a4e3`](https://github.com/Khan/perseus/commit/a1e22a4e3cc752fb8b768d4441b9cf79e777b37f), [`0464a760f`](https://github.com/Khan/perseus/commit/0464a760f3b6b49e30accde9b41a320dd2ea7bed), [`0df0b1940`](https://github.com/Khan/perseus/commit/0df0b194012627a98708cfcafd1ad5eb76ad91e2), [`22d108fdc`](https://github.com/Khan/perseus/commit/22d108fdc1bd6cc6b150abae137e3716c5c59b92), [`dc8118aa1`](https://github.com/Khan/perseus/commit/dc8118aa1e28e77d78a57bc13e50d1954e3f8f69), [`82fa90299`](https://github.com/Khan/perseus/commit/82fa902999d9d79a050fe9acf0031ba886b387fa), [`e2f2cee9f`](https://github.com/Khan/perseus/commit/e2f2cee9fe39313885e7c6aaed963612f807caca), [`ffaa3904a`](https://github.com/Khan/perseus/commit/ffaa3904aa885f29694bf1fd6348578c6ab3e19e), [`0f2bec314`](https://github.com/Khan/perseus/commit/0f2bec314518636e822e8ca0fc080209f4be8bfe), [`b4b3a3dbb`](https://github.com/Khan/perseus/commit/b4b3a3dbb5097b1225e9e5acdda254f2f1e66122), [`e6f7cc91e`](https://github.com/Khan/perseus/commit/e6f7cc91ec9601bb7df7e8e6846349c114d09cd0), [`4c10af109`](https://github.com/Khan/perseus/commit/4c10af109245ac10846ef1d0c6fad2a095c11d0b), [`b6623bb56`](https://github.com/Khan/perseus/commit/b6623bb569c8776ad5bf4e770789e4b079e230e0), [`0db68d222`](https://github.com/Khan/perseus/commit/0db68d2227118cf4de51c3ccad59b525be657cf3), [`bdbdafe5d`](https://github.com/Khan/perseus/commit/bdbdafe5d66a76149624410a746909e4dc3a1ddc), [`117e78d03`](https://github.com/Khan/perseus/commit/117e78d03f29304274c1d7cc206743439f94d6ef), [`b4b3a3dbb`](https://github.com/Khan/perseus/commit/b4b3a3dbb5097b1225e9e5acdda254f2f1e66122), [`29a1c656e`](https://github.com/Khan/perseus/commit/29a1c656ee7f74b6eba8ce95fa9c239b2f328813), [`7a984eba6`](https://github.com/Khan/perseus/commit/7a984eba6f1cec3df314ec245d2176f5db190548), [`f8c9d3574`](https://github.com/Khan/perseus/commit/f8c9d35743d2e8ccf12875ef91498543e2015576), [`879d2a501`](https://github.com/Khan/perseus/commit/879d2a501e25304bd715eb73a2d615a7d06d2cd9), [`32cc4a45b`](https://github.com/Khan/perseus/commit/32cc4a45bd2df34a0620729ca659a8aec6bcd62a), [`99cd254de`](https://github.com/Khan/perseus/commit/99cd254de354bbebf6b6ea84e0c33241d2a18763), [`1355d6cfc`](https://github.com/Khan/perseus/commit/1355d6cfcbd4cb44de3f05084744dbdefd19def8), [`75f43a8f4`](https://github.com/Khan/perseus/commit/75f43a8f41739df4831e589e0a2724e1c7169312), [`32cc4a45b`](https://github.com/Khan/perseus/commit/32cc4a45bd2df34a0620729ca659a8aec6bcd62a), [`55ad836c6`](https://github.com/Khan/perseus/commit/55ad836c6a65526762a0a9b189305941f2bc422f), [`ebf3695b6`](https://github.com/Khan/perseus/commit/ebf3695b69c7526279ef1c999f13b4e24be885be)]:
    -   @khanacademy/perseus-core@3.3.0
    -   @khanacademy/perseus@52.0.0
    -   @khanacademy/perseus-score@2.0.0
    -   @khanacademy/kas@0.4.12
    -   @khanacademy/keypad-context@1.0.15
    -   @khanacademy/kmath@0.3.1
    -   @khanacademy/math-input@22.2.2
    -   @khanacademy/pure-markdown@0.3.23

## 17.3.2

### Patch Changes

-   Updated dependencies [[`cb15921b8`](https://github.com/Khan/perseus/commit/cb15921b8bdfd850c40610b4df5c9919a668a2a1)]:
    -   @khanacademy/perseus@51.0.1

## 17.3.1

### Patch Changes

-   [#2101](https://github.com/Khan/perseus/pull/2101) [`9cabe689a`](https://github.com/Khan/perseus/commit/9cabe689a7aa143f95adf4556bf5c10d654a66ae) Thanks [@handeyeco](https://github.com/handeyeco)! - Move scorers and validators to `perseus-score`

*   [#2126](https://github.com/Khan/perseus/pull/2126) [`518b005f2`](https://github.com/Khan/perseus/commit/518b005f2b0b9a173dec6526a7b5c808062fe144) Thanks [@benchristel](https://github.com/benchristel)! - Fix a React warning about non-unique component keys in the exercise editor.

-   [#2109](https://github.com/Khan/perseus/pull/2109) [`41ffd4a71`](https://github.com/Khan/perseus/commit/41ffd4a71673399657d7024c206af4fa4e0be267) Thanks [@dependabot](https://github.com/apps/dependabot)! - Updating our wonder-blocks packages with the latest versions.

-   Updated dependencies [[`165305e11`](https://github.com/Khan/perseus/commit/165305e11c5ba196e1a2a9c4fd814d387d34dc55), [`6f2813cfc`](https://github.com/Khan/perseus/commit/6f2813cfcb6bce063d8f0f8f66219ce0123aac66), [`faccc2d59`](https://github.com/Khan/perseus/commit/faccc2d5959a4a7051720f7a3dfe4a4875b6ace9), [`9cabe689a`](https://github.com/Khan/perseus/commit/9cabe689a7aa143f95adf4556bf5c10d654a66ae), [`d96821e08`](https://github.com/Khan/perseus/commit/d96821e08b3f80eb0a277882f4a8a40330b27adc), [`0f8d11c0b`](https://github.com/Khan/perseus/commit/0f8d11c0b8c00a10eb49f2d84b664803c5c83f3f), [`41ffd4a71`](https://github.com/Khan/perseus/commit/41ffd4a71673399657d7024c206af4fa4e0be267)]:
    -   @khanacademy/perseus@51.0.0
    -   @khanacademy/kmath@0.3.0
    -   @khanacademy/perseus-core@3.2.0
    -   @khanacademy/perseus-score@1.1.0
    -   @khanacademy/math-input@22.2.1
    -   @khanacademy/kas@0.4.11
    -   @khanacademy/keypad-context@1.0.14
    -   @khanacademy/pure-markdown@0.3.22

## 17.3.0

### Minor Changes

-   [#2103](https://github.com/Khan/perseus/pull/2103) [`01caf5f31`](https://github.com/Khan/perseus/commit/01caf5f3111d84cf37dffc45012f21860d1648b1) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - revert wb versions

### Patch Changes

-   Updated dependencies [[`600bf6acb`](https://github.com/Khan/perseus/commit/600bf6acbbf76817e3bf7893f8f85188a538bd6a), [`01caf5f31`](https://github.com/Khan/perseus/commit/01caf5f3111d84cf37dffc45012f21860d1648b1), [`7ed21f49e`](https://github.com/Khan/perseus/commit/7ed21f49ee0cccbb40f200903a7fdfb9c2c0389b), [`ce67b0f0a`](https://github.com/Khan/perseus/commit/ce67b0f0a823c09c1c942220d93eca20aa8a963f)]:
    -   @khanacademy/perseus@50.1.0
    -   @khanacademy/math-input@22.2.0

## 17.2.0

### Minor Changes

-   [#2053](https://github.com/Khan/perseus/pull/2053) [`5173c2e43`](https://github.com/Khan/perseus/commit/5173c2e43bf939159f420dcd448b90691d52353b) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Adding new interactive graph marking type, axes.

### Patch Changes

-   [#2090](https://github.com/Khan/perseus/pull/2090) [`5ca79eab6`](https://github.com/Khan/perseus/commit/5ca79eab69d89c5f40368514ee42f029c00d2ffe) Thanks [@nishasy](https://github.com/nishasy)! - [SR][sr tree] Update tree to use innerText

*   [#2096](https://github.com/Khan/perseus/pull/2096) [`a3c7b6419`](https://github.com/Khan/perseus/commit/a3c7b64197e056826f54c0f1c3a0081bd79c5d95) Thanks [@nishasy](https://github.com/nishasy)! - [SR][sr tree] Show descriptions again

-   [#2062](https://github.com/Khan/perseus/pull/2062) [`785908077`](https://github.com/Khan/perseus/commit/78590807708e3d8745ac99440dbeb96b7d3d42bd) Thanks [@nishasy](https://github.com/nishasy)! - [SR][sr tree] Add screen reader tree to interactive graph editor

*   [#2072](https://github.com/Khan/perseus/pull/2072) [`6cf647729`](https://github.com/Khan/perseus/commit/6cf6477291053d85faac48028b8f038fd0c28930) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - The creation of a new Mock Widget for tests.

-   [#2093](https://github.com/Khan/perseus/pull/2093) [`766d33577`](https://github.com/Khan/perseus/commit/766d33577a5ea83ef8f8c291534eb34833c54197) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove exports from Perseus that were moved to Perseus-Core

*   [#2086](https://github.com/Khan/perseus/pull/2086) [`bc3d955b5`](https://github.com/Khan/perseus/commit/bc3d955b57e847a379328fcc7cf276f42e0874dd) Thanks [@handeyeco](https://github.com/handeyeco)! - Init perseus-score, move AnswerTypes from perseus to perseus-score, move perseus-types in perseus to data-schema in perseus-core

-   [#2088](https://github.com/Khan/perseus/pull/2088) [`d2797bb2d`](https://github.com/Khan/perseus/commit/d2797bb2dc51bd80cb03f2c1eeb39286e4dfa45c) Thanks [@handeyeco](https://github.com/handeyeco)! - Move objective\_ helpers into perseus-core

*   [#2081](https://github.com/Khan/perseus/pull/2081) [`e23647af8`](https://github.com/Khan/perseus/commit/e23647af865e89153a50007c050761b65e187272) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figures Aria] Correct aria autogen for negative coords

*   Updated dependencies [[`785908077`](https://github.com/Khan/perseus/commit/78590807708e3d8745ac99440dbeb96b7d3d42bd), [`bbf7f3b1b`](https://github.com/Khan/perseus/commit/bbf7f3b1be657c588270a3b47983c0aecbf84418), [`43e99d28d`](https://github.com/Khan/perseus/commit/43e99d28d90ead605fb2319c9b6b9982cdbc6edd), [`6cf647729`](https://github.com/Khan/perseus/commit/6cf6477291053d85faac48028b8f038fd0c28930), [`766d33577`](https://github.com/Khan/perseus/commit/766d33577a5ea83ef8f8c291534eb34833c54197), [`72fb7ecd3`](https://github.com/Khan/perseus/commit/72fb7ecd35fa302b88a051af4f1380f513e53b21), [`5173c2e43`](https://github.com/Khan/perseus/commit/5173c2e43bf939159f420dcd448b90691d52353b), [`bc3d955b5`](https://github.com/Khan/perseus/commit/bc3d955b57e847a379328fcc7cf276f42e0874dd), [`d2797bb2d`](https://github.com/Khan/perseus/commit/d2797bb2dc51bd80cb03f2c1eeb39286e4dfa45c)]:
    -   @khanacademy/perseus@50.0.0
    -   @khanacademy/perseus-core@3.1.0
    -   @khanacademy/pure-markdown@0.3.21
    -   @khanacademy/kmath@0.2.0
    -   @khanacademy/kas@0.4.10
    -   @khanacademy/keypad-context@1.0.13
    -   @khanacademy/math-input@22.1.2

## 17.1.2

### Patch Changes

-   [#2057](https://github.com/Khan/perseus/pull/2057) [`2dc22def4`](https://github.com/Khan/perseus/commit/2dc22def44b7616ad739d2c5a575b83bd6362949) Thanks [@dependabot](https://github.com/apps/dependabot)! - update wonderblocks dependencies

-   Updated dependencies [[`2dc22def4`](https://github.com/Khan/perseus/commit/2dc22def44b7616ad739d2c5a575b83bd6362949), [`92a741701`](https://github.com/Khan/perseus/commit/92a741701e00f79bcd5f35640d686fac7e858cd5)]:
    -   @khanacademy/math-input@22.1.1
    -   @khanacademy/perseus@49.2.2

## 17.1.1

### Patch Changes

-   [#2064](https://github.com/Khan/perseus/pull/2064) [`55b4615d3`](https://github.com/Khan/perseus/commit/55b4615d3297884d90e6ef4640f7202066334b0d) Thanks [@nishasy](https://github.com/nishasy)! - Remove the locked-figures-aria flag

*   [#2063](https://github.com/Khan/perseus/pull/2063) [`85a5b5e44`](https://github.com/Khan/perseus/commit/85a5b5e4408b19a598107468d7cb0bd10e33b6be) Thanks [@nishasy](https://github.com/nishasy)! - Remove the interactive-graph-locked-features-labels flag

-   [#2065](https://github.com/Khan/perseus/pull/2065) [`eefcf5c5c`](https://github.com/Khan/perseus/commit/eefcf5c5c434455295e17bf4cb411d029f24fe49) Thanks [@nishasy](https://github.com/nishasy)! - Remove the locked-[figureName]-labels flags

-   Updated dependencies [[`55b4615d3`](https://github.com/Khan/perseus/commit/55b4615d3297884d90e6ef4640f7202066334b0d), [`85a5b5e44`](https://github.com/Khan/perseus/commit/85a5b5e4408b19a598107468d7cb0bd10e33b6be), [`781cc7df6`](https://github.com/Khan/perseus/commit/781cc7df65a80e03d3cb809ccf585cb6cf25556e), [`eefcf5c5c`](https://github.com/Khan/perseus/commit/eefcf5c5c434455295e17bf4cb411d029f24fe49), [`265a93104`](https://github.com/Khan/perseus/commit/265a9310486e5c1524af9b502619db9de2f7c01d), [`4bf4960d4`](https://github.com/Khan/perseus/commit/4bf4960d4d88abf9fe07803f1364678a29a20f6e), [`c9a28b34c`](https://github.com/Khan/perseus/commit/c9a28b34c66fdf25d2b0ef8fa1111a5fb97854da), [`4bf4960d4`](https://github.com/Khan/perseus/commit/4bf4960d4d88abf9fe07803f1364678a29a20f6e)]:
    -   @khanacademy/perseus@49.2.1

## 17.1.0

### Minor Changes

-   [#1738](https://github.com/Khan/perseus/pull/1738) [`dbbc82f2d`](https://github.com/Khan/perseus/commit/dbbc82f2dd33545b12c6073174b05ebcf8d551ba) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - add scientific notation button / toggle to basic keypad

### Patch Changes

-   Updated dependencies [[`d8b2f7eaf`](https://github.com/Khan/perseus/commit/d8b2f7eaff83062516ad1e273c17fd6579716265), [`bac10129b`](https://github.com/Khan/perseus/commit/bac10129b523d61904a88ef3c7dbfcad2bd18750), [`37c642f24`](https://github.com/Khan/perseus/commit/37c642f24e645db954895510ba40bede94e09889), [`617377147`](https://github.com/Khan/perseus/commit/61737714796dfb8434fc139471d1add3c18853b3), [`dbbc82f2d`](https://github.com/Khan/perseus/commit/dbbc82f2dd33545b12c6073174b05ebcf8d551ba), [`53ba9f5d1`](https://github.com/Khan/perseus/commit/53ba9f5d136f817257188ccf2696a8b91896ba72)]:
    -   @khanacademy/perseus@49.2.0
    -   @khanacademy/math-input@22.1.0

## 17.0.12

### Patch Changes

-   Updated dependencies [[`f23b383e7`](https://github.com/Khan/perseus/commit/f23b383e797a522ddee064c79e582467dfc08f94)]:
    -   @khanacademy/perseus@49.1.7

## 17.0.11

### Patch Changes

-   [#2042](https://github.com/Khan/perseus/pull/2042) [`705d74b69`](https://github.com/Khan/perseus/commit/705d74b69351a6239cd7fe21a0dfc7d4133dfd9f) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - fix for editor

## 17.0.10

### Patch Changes

-   Updated dependencies [[`9c17ab518`](https://github.com/Khan/perseus/commit/9c17ab5188052bb0f42de615e48af1a7439f2770)]:
    -   @khanacademy/kmath@0.1.24
    -   @khanacademy/perseus@49.1.6

## 17.0.9

### Patch Changes

-   Updated dependencies [[`4345801bf`](https://github.com/Khan/perseus/commit/4345801bfc09942e0d6dc0459d1e4d53c4f57561)]:
    -   @khanacademy/keypad-context@1.0.12
    -   @khanacademy/math-input@22.0.7
    -   @khanacademy/perseus@49.1.5

## 17.0.8

### Patch Changes

-   Updated dependencies [[`57f9056f8`](https://github.com/Khan/perseus/commit/57f9056f82775e80a15d9097a8d85df4bc37343a)]:
    -   @khanacademy/perseus@49.1.4

## 17.0.7

### Patch Changes

-   [#2040](https://github.com/Khan/perseus/pull/2040) [`1496a7a93`](https://github.com/Khan/perseus/commit/1496a7a93ef691c8e34da309c10cb77d35627bf3) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Bump versions to fix release

-   Updated dependencies [[`1496a7a93`](https://github.com/Khan/perseus/commit/1496a7a93ef691c8e34da309c10cb77d35627bf3)]:
    -   @khanacademy/kas@0.4.9
    -   @khanacademy/keypad-context@1.0.11
    -   @khanacademy/kmath@0.1.23
    -   @khanacademy/math-input@22.0.6
    -   @khanacademy/perseus@49.1.3
    -   @khanacademy/perseus-core@3.0.5
    -   @khanacademy/pure-markdown@0.3.20

## 17.0.6

### Patch Changes

-   [#2034](https://github.com/Khan/perseus/pull/2034) [`8e9b2395d`](https://github.com/Khan/perseus/commit/8e9b2395d733b9831b3eefc064e9077341c145f5) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Removing final usage of createReactClass.

*   [#2037](https://github.com/Khan/perseus/pull/2037) [`b80e7882b`](https://github.com/Khan/perseus/commit/b80e7882bf58f8e71cbf9482585577032c317428) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Nothing has changed, but our action requires a changeset per package and I don't know how to do an infrastructure update like this and pass that check

-   [#2033](https://github.com/Khan/perseus/pull/2033) [`881c0aac3`](https://github.com/Khan/perseus/commit/881c0aac33b5425efffc4d191f6c0c031f3a9127) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph][axis labels] Make default x & y axis labels TeX on load

-   Updated dependencies [[`8e9b2395d`](https://github.com/Khan/perseus/commit/8e9b2395d733b9831b3eefc064e9077341c145f5), [`b52310d1b`](https://github.com/Khan/perseus/commit/b52310d1bacd5c4e9844bb9094edc02307106af3), [`b80e7882b`](https://github.com/Khan/perseus/commit/b80e7882bf58f8e71cbf9482585577032c317428), [`881c0aac3`](https://github.com/Khan/perseus/commit/881c0aac33b5425efffc4d191f6c0c031f3a9127)]:
    -   @khanacademy/perseus@49.1.2
    -   @khanacademy/kas@0.4.8
    -   @khanacademy/keypad-context@1.0.10
    -   @khanacademy/kmath@0.1.22
    -   @khanacademy/math-input@22.0.5
    -   @khanacademy/perseus-core@3.0.4
    -   @khanacademy/pure-markdown@0.3.19

## 17.0.5

### Patch Changes

-   [#2028](https://github.com/Khan/perseus/pull/2028) [`762b295ec`](https://github.com/Khan/perseus/commit/762b295eccd7d0dbc344edd271d3300b506adb93) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Forcing release

-   Updated dependencies [[`762b295ec`](https://github.com/Khan/perseus/commit/762b295eccd7d0dbc344edd271d3300b506adb93)]:
    -   @khanacademy/kas@0.4.7
    -   @khanacademy/keypad-context@1.0.9
    -   @khanacademy/kmath@0.1.21
    -   @khanacademy/math-input@22.0.4
    -   @khanacademy/perseus@49.1.1
    -   @khanacademy/perseus-core@3.0.3
    -   @khanacademy/pure-markdown@0.3.18

## 17.0.4

### Patch Changes

-   [#2027](https://github.com/Khan/perseus/pull/2027) [`368e222a6`](https://github.com/Khan/perseus/commit/368e222a6577dff38143d1584d6773129e8abbd7) Thanks [@handeyeco](https://github.com/handeyeco)! - Bump all packages to reset releases

-   Updated dependencies [[`78c5a77ce`](https://github.com/Khan/perseus/commit/78c5a77ce17c5392e5c8ebb1fff8e2ed8a69a0c1), [`37dc680b4`](https://github.com/Khan/perseus/commit/37dc680b4415c9c75bcda39e0440ded55d24d4a1), [`368e222a6`](https://github.com/Khan/perseus/commit/368e222a6577dff38143d1584d6773129e8abbd7)]:
    -   @khanacademy/perseus@49.1.0
    -   @khanacademy/kas@0.4.6
    -   @khanacademy/keypad-context@1.0.8
    -   @khanacademy/kmath@0.1.20
    -   @khanacademy/math-input@22.0.3
    -   @khanacademy/perseus-core@3.0.2
    -   @khanacademy/pure-markdown@0.3.17

## 17.0.3

### Patch Changes

-   [#1810](https://github.com/Khan/perseus/pull/1810) [`e21ead80e`](https://github.com/Khan/perseus/commit/e21ead80e7cf467a2003fc145bfa1f65973eb270) Thanks [@daniellewhyte](https://github.com/daniellewhyte)! - Update Dropdown widget to support displaying TeX

-   Updated dependencies [[`e21ead80e`](https://github.com/Khan/perseus/commit/e21ead80e7cf467a2003fc145bfa1f65973eb270), [`51386d6e0`](https://github.com/Khan/perseus/commit/51386d6e0b454942cb550036072669fc01e769c2)]:
    -   @khanacademy/math-input@22.0.2
    -   @khanacademy/perseus@49.0.3
    -   @khanacademy/perseus-core@3.0.1
    -   @khanacademy/kas@0.4.5
    -   @khanacademy/keypad-context@1.0.7
    -   @khanacademy/kmath@0.1.19
    -   @khanacademy/pure-markdown@0.3.16

## 17.0.2

### Patch Changes

-   [#2022](https://github.com/Khan/perseus/pull/2022) [`266d240ed`](https://github.com/Khan/perseus/commit/266d240ed01f9b32242d150414e18fcfa8bd5230) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Update to Wonder Blocks without custom ID generation API

-   Updated dependencies [[`4508e7bea`](https://github.com/Khan/perseus/commit/4508e7bea859957eea296a3fc25180c66098dbb4), [`266d240ed`](https://github.com/Khan/perseus/commit/266d240ed01f9b32242d150414e18fcfa8bd5230), [`1fe437079`](https://github.com/Khan/perseus/commit/1fe43707954ba7e35a42747dc1392fb2972fc7b1)]:
    -   @khanacademy/perseus@49.0.2
    -   @khanacademy/math-input@22.0.1

## 17.0.1

### Patch Changes

-   [#2014](https://github.com/Khan/perseus/pull/2014) [`763d2d0f1`](https://github.com/Khan/perseus/commit/763d2d0f14e3aade030b1ef0aa28c3895c17b685) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Migrate off deprecated ID generation APIs

*   [#1978](https://github.com/Khan/perseus/pull/1978) [`81632c326`](https://github.com/Khan/perseus/commit/81632c3262737c1219663fbdd54000ba1fdcf4eb) Thanks [@nishasy](https://github.com/nishasy)! - [Polygon] Remove duplicate points when determining if a polygon can be closed

-   [#1999](https://github.com/Khan/perseus/pull/1999) [`278527b08`](https://github.com/Khan/perseus/commit/278527b08701cd8424728c6b5915408cc16a07a0) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixing open polygon scoring issues within exercises and editors.

-   Updated dependencies [[`763d2d0f1`](https://github.com/Khan/perseus/commit/763d2d0f14e3aade030b1ef0aa28c3895c17b685), [`b09d19b7b`](https://github.com/Khan/perseus/commit/b09d19b7b1723f79e4fad63ef2efcef3cc702792), [`81632c326`](https://github.com/Khan/perseus/commit/81632c3262737c1219663fbdd54000ba1fdcf4eb), [`278527b08`](https://github.com/Khan/perseus/commit/278527b08701cd8424728c6b5915408cc16a07a0)]:
    -   @khanacademy/perseus@49.0.1

## 17.0.0

### Major Changes

-   [#2007](https://github.com/Khan/perseus/pull/2007) [`ea1bf0c2c`](https://github.com/Khan/perseus/commit/ea1bf0c2cfc7ae552d039549950d1973b56f5ca9) Thanks [@somewhatabstract](https://github.com/somewhatabstract)! - Update to latest webapp dependencies and prepare for deprecation of custom WB ID generators

### Patch Changes

-   Updated dependencies [[`ea1bf0c2c`](https://github.com/Khan/perseus/commit/ea1bf0c2cfc7ae552d039549950d1973b56f5ca9)]:
    -   @khanacademy/math-input@22.0.0
    -   @khanacademy/perseus@49.0.0
    -   @khanacademy/perseus-core@3.0.0
    -   @khanacademy/kas@0.4.4
    -   @khanacademy/keypad-context@1.0.6
    -   @khanacademy/kmath@0.1.18
    -   @khanacademy/pure-markdown@0.3.15

## 16.0.4

### Patch Changes

-   Updated dependencies [[`09d906cd2`](https://github.com/Khan/perseus/commit/09d906cd289a886bdc92b8a5df65ccbc8ad3f29e), [`99e55b623`](https://github.com/Khan/perseus/commit/99e55b623deef244f99b554d8aa7ef0fb45a4bbb), [`ac07da03c`](https://github.com/Khan/perseus/commit/ac07da03cb332f9dd9ebf82820e409b9fb0844be), [`2135e0dc3`](https://github.com/Khan/perseus/commit/2135e0dc3eddde1b3c842223e10e1ee94823c7e7)]:
    -   @khanacademy/perseus@48.2.0

## 16.0.3

### Patch Changes

-   Updated dependencies [[`cc9d3a4bc`](https://github.com/Khan/perseus/commit/cc9d3a4bc8866bbdaa09e2bf3fdb321fb9a125c1), [`2748a1ff8`](https://github.com/Khan/perseus/commit/2748a1ff82b5e04b12f6b740b29b5e01a0561882)]:
    -   @khanacademy/perseus@48.1.0

## 16.0.2

### Patch Changes

-   [#1985](https://github.com/Khan/perseus/pull/1985) [`701895c01`](https://github.com/Khan/perseus/commit/701895c01bd2792a4dccc6ce0d5edc23f7483db3) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Update placeholder to include TeX \$s. Start new visible labels with text "label".

*   [#1971](https://github.com/Khan/perseus/pull/1971) [`341d316aa`](https://github.com/Khan/perseus/commit/341d316aa8727ebb9e7fde28fc4e2d8779aa3e82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Move to using optional chaining in a few places to resolve new lint rule violations.

-   [#1984](https://github.com/Khan/perseus/pull/1984) [`990a3170c`](https://github.com/Khan/perseus/commit/990a3170c2111ddc2c6e6f8f6420a4908cc71c82) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixed crashing behavior that occurs in when selecting "unlimited" in polygon option of interactive graph editor.

-   Updated dependencies [[`f9906728c`](https://github.com/Khan/perseus/commit/f9906728c1a8f09c91c11d824718b8a06d6a7609), [`f9906728c`](https://github.com/Khan/perseus/commit/f9906728c1a8f09c91c11d824718b8a06d6a7609), [`341d316aa`](https://github.com/Khan/perseus/commit/341d316aa8727ebb9e7fde28fc4e2d8779aa3e82), [`990a3170c`](https://github.com/Khan/perseus/commit/990a3170c2111ddc2c6e6f8f6420a4908cc71c82)]:
    -   @khanacademy/perseus@48.0.0
    -   @khanacademy/perseus-core@2.0.0
    -   @khanacademy/kas@0.4.3
    -   @khanacademy/keypad-context@1.0.5
    -   @khanacademy/kmath@0.1.17
    -   @khanacademy/math-input@21.1.7
    -   @khanacademy/pure-markdown@0.3.14

## 16.0.1

### Patch Changes

-   Updated dependencies [[`335615bab`](https://github.com/Khan/perseus/commit/335615bab18685aa6331c7628c1225bdecc54aab), [`acd8bd566`](https://github.com/Khan/perseus/commit/acd8bd56664c6a0849bf3d532be8978115a97dfd)]:
    -   @khanacademy/perseus@47.0.1

## 16.0.0

### Major Changes

-   [#1955](https://github.com/Khan/perseus/pull/1955) [`e7b4db0bf`](https://github.com/Khan/perseus/commit/e7b4db0bf193241a36508804dd6e58c729f0a3db) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove support for MultiRenderer

### Patch Changes

-   Updated dependencies [[`e7b4db0bf`](https://github.com/Khan/perseus/commit/e7b4db0bf193241a36508804dd6e58c729f0a3db)]:
    -   @khanacademy/perseus@47.0.0

## 15.1.4

### Patch Changes

-   [#1976](https://github.com/Khan/perseus/pull/1976) [`2ad163b5e`](https://github.com/Khan/perseus/commit/2ad163b5ea20d40fb9f0edf30e03cd54ecf9bf31) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figures Aria] Update the auto-generated text to spell out commas

-   Updated dependencies [[`e22a931d9`](https://github.com/Khan/perseus/commit/e22a931d987291258b66f2c80db3536970a4555d)]:
    -   @khanacademy/perseus@46.0.1

## 15.1.3

### Patch Changes

-   Updated dependencies [[`435280ac4`](https://github.com/Khan/perseus/commit/435280ac4cf33ee98ddb1166631f87f81cafa0fc), [`d93e3ecde`](https://github.com/Khan/perseus/commit/d93e3ecdeb6bd714a35dcd9f886299fa80ba71ec)]:
    -   @khanacademy/perseus@46.0.0

## 15.1.2

### Patch Changes

-   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Type fixes

*   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Ensure links opening to style guide (Google Docs) set `rel="noreferrer"`

-   [#1958](https://github.com/Khan/perseus/pull/1958) [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove debugging call in GraphSettings component

-   Updated dependencies [[`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82), [`051ba6392`](https://github.com/Khan/perseus/commit/051ba639242fc501e3196a63e3ab984b9338fa82)]:
    -   @khanacademy/perseus@45.1.0

## 15.1.1

### Patch Changes

-   Updated dependencies [[`0a44d468d`](https://github.com/Khan/perseus/commit/0a44d468dd127bf15dc32e720b9b0301af41a572)]:
    -   @khanacademy/perseus@45.0.0

## 15.1.0

### Minor Changes

-   [#1845](https://github.com/Khan/perseus/pull/1845) [`066daab0e`](https://github.com/Khan/perseus/commit/066daab0ea8463e8b2a5381e90ed8392ea20a5bf) Thanks [@daniellewhyte](https://github.com/daniellewhyte)! - Add labels to Dropdown widget

### Patch Changes

-   [#1904](https://github.com/Khan/perseus/pull/1904) [`83b1beab8`](https://github.com/Khan/perseus/commit/83b1beab86dd9e7ee1e1760c4fad4be9f2ff5a71) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Upgrade Storybook to v8.x

*   [#1893](https://github.com/Khan/perseus/pull/1893) [`3d777d1c1`](https://github.com/Khan/perseus/commit/3d777d1c13eefedee250d8a494e08b513ddec937) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Removing usage of createReactClass from several component files.

*   Updated dependencies [[`83b1beab8`](https://github.com/Khan/perseus/commit/83b1beab86dd9e7ee1e1760c4fad4be9f2ff5a71), [`066daab0e`](https://github.com/Khan/perseus/commit/066daab0ea8463e8b2a5381e90ed8392ea20a5bf), [`834bd8bfb`](https://github.com/Khan/perseus/commit/834bd8bfbc063d0a1935ae9a697e5505c5ee606d), [`89244ccc0`](https://github.com/Khan/perseus/commit/89244ccc0d7384d7f76678204cd49dd7e8301185)]:
    -   @khanacademy/math-input@21.1.6
    -   @khanacademy/perseus@44.0.0

## 15.0.2

### Patch Changes

-   [#1920](https://github.com/Khan/perseus/pull/1920) [`88ba71bef`](https://github.com/Khan/perseus/commit/88ba71bef0cdd75fa0c8b467dcea2cccc637d034) Thanks [@handeyeco](https://github.com/handeyeco)! - Fix some file-wide error suppressions

*   [#1863](https://github.com/Khan/perseus/pull/1863) [`584153588`](https://github.com/Khan/perseus/commit/584153588be04c6deb7b5d76ed2b258d0f75a3e1) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Switch two corner usages of deprecated @khanacademy/wonder-blocks-spacing to @khanacademy/wonder-blocks-tokens

*   Updated dependencies [[`3dbca965a`](https://github.com/Khan/perseus/commit/3dbca965a2bbaa2d980c1cc4c439469157e0bd33), [`ee09e9fc0`](https://github.com/Khan/perseus/commit/ee09e9fc0ad5eb65340d0f1cbe240741ebfcd3c3), [`3a9b5921b`](https://github.com/Khan/perseus/commit/3a9b5921bff7ae038f59ecb6817babd2b21df0bb), [`88ba71bef`](https://github.com/Khan/perseus/commit/88ba71bef0cdd75fa0c8b467dcea2cccc637d034), [`64ea2ee86`](https://github.com/Khan/perseus/commit/64ea2ee86264a20f1d0e34968831945fea8ed36b), [`451de899f`](https://github.com/Khan/perseus/commit/451de899fd3d40bf415cb2318048e90fb1e6670f), [`40d2ebb75`](https://github.com/Khan/perseus/commit/40d2ebb75fdadfb361330236e0fb9e54a32d0fc2), [`799ffe4a5`](https://github.com/Khan/perseus/commit/799ffe4a50e3e3bc435d0ef96388c1e8fae2167d), [`2437ce61b`](https://github.com/Khan/perseus/commit/2437ce61bae1aef2db28e89956aa73463ada16cc), [`841551a65`](https://github.com/Khan/perseus/commit/841551a65732a276266690ddaaa51a3810398d03), [`8ec06f444`](https://github.com/Khan/perseus/commit/8ec06f444d8f4559eda5c3dbf189e5183b1c5b42), [`f43edd42c`](https://github.com/Khan/perseus/commit/f43edd42ccfacd1500d2f73ccb0d3f8dce777173), [`0cec7628c`](https://github.com/Khan/perseus/commit/0cec7628c4a061f14b126fd1e3dab6df45fc0178), [`0bd4270ad`](https://github.com/Khan/perseus/commit/0bd4270ade576bec1ac0c86b251f972a2c354056), [`3e98b7cd3`](https://github.com/Khan/perseus/commit/3e98b7cd300052eeacbe9fcdbd312091c678107b), [`7f2866cf4`](https://github.com/Khan/perseus/commit/7f2866cf401aa4fc7a3b2b15d8cdc247a953e9f8)]:
    -   @khanacademy/perseus@43.1.0
    -   @khanacademy/kas@0.4.2
    -   @khanacademy/pure-markdown@0.3.13

## 15.0.1

### Patch Changes

-   [#1874](https://github.com/Khan/perseus/pull/1874) [`42d25c2d2`](https://github.com/Khan/perseus/commit/42d25c2d2d844d6408d76b07794f171d962b91a7) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Fix \$ edge cases for spoken math aria labels

*   [#1912](https://github.com/Khan/perseus/pull/1912) [`44e78a95d`](https://github.com/Khan/perseus/commit/44e78a95dc1f0d2d4a16794feb590d05df0f2e0a) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Stop cursor jumps in number input fields

-   [#1875](https://github.com/Khan/perseus/pull/1875) [`28cae9d2a`](https://github.com/Khan/perseus/commit/28cae9d2afe65e1345906de8106d349c93ddb97c) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Labels] Count lone unescaped \$ as regular dollar signs in TeX

-   Updated dependencies [[`56fd44806`](https://github.com/Khan/perseus/commit/56fd448063b2e13c5e9cb9e1874c12494c6f0e34), [`01edfb8be`](https://github.com/Khan/perseus/commit/01edfb8be849f869c26ada923e275648780d36f3), [`28cae9d2a`](https://github.com/Khan/perseus/commit/28cae9d2afe65e1345906de8106d349c93ddb97c)]:
    -   @khanacademy/perseus@43.0.1

## 15.0.0

### Major Changes

-   [#1905](https://github.com/Khan/perseus/pull/1905) [`9c225f936`](https://github.com/Khan/perseus/commit/9c225f9365cbb2e92bba3bd67b1abde724809367) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - We're reverting work done for the Server Side Scoring and Input Number Conversion projects.

### Patch Changes

-   [#1889](https://github.com/Khan/perseus/pull/1889) [`55a532175`](https://github.com/Khan/perseus/commit/55a532175192bfee3dc550c7eb7ce74d4a6542a9) Thanks [@benchristel](https://github.com/benchristel)! - Internal: enable strict typechecking of function parameters

-   Updated dependencies [[`adad642ab`](https://github.com/Khan/perseus/commit/adad642ab0ae95de6600e7018f0aff836acc5911), [`0afb1a4f7`](https://github.com/Khan/perseus/commit/0afb1a4f70e35de7e2b04ee1af835a0ebe84bbe5), [`55a532175`](https://github.com/Khan/perseus/commit/55a532175192bfee3dc550c7eb7ce74d4a6542a9), [`9c225f936`](https://github.com/Khan/perseus/commit/9c225f9365cbb2e92bba3bd67b1abde724809367), [`4b8836b84`](https://github.com/Khan/perseus/commit/4b8836b846c4f6adc6f4bb9c204deedb019c9f51), [`a27f23bb4`](https://github.com/Khan/perseus/commit/a27f23bb48e585aa2229975b1779161b921cbd9d)]:
    -   @khanacademy/perseus@43.0.0
    -   @khanacademy/kas@0.4.1
    -   @khanacademy/math-input@21.1.5
    -   @khanacademy/pure-markdown@0.3.12

## 14.12.4

### Patch Changes

-   Updated dependencies [[`4c2db8d38`](https://github.com/Khan/perseus/commit/4c2db8d384f5542cfc7f6aafd8294049a7afe1c3), [`7ca5bbf0e`](https://github.com/Khan/perseus/commit/7ca5bbf0e0f5c24a0bda5de9142703a913ce3fa8), [`500315145`](https://github.com/Khan/perseus/commit/5003151457ce737056950192225cb0ac522571a6), [`44933f88e`](https://github.com/Khan/perseus/commit/44933f88e90c4b8f15dc2d1d39a4297d69e21c39), [`d0e7a0383`](https://github.com/Khan/perseus/commit/d0e7a0383002414d874297ccc88bf5c9863b4ea5)]:
    -   @khanacademy/perseus@42.0.3

## 14.12.3

### Patch Changes

-   Updated dependencies [[`b4cf444e9`](https://github.com/Khan/perseus/commit/b4cf444e962b5e4c152cad6507ddb63515fc305e)]:
    -   @khanacademy/perseus@42.0.2

## 14.12.2

### Patch Changes

-   [#1879](https://github.com/Khan/perseus/pull/1879) [`04d6e60de`](https://github.com/Khan/perseus/commit/04d6e60de2b9176f546a7058038a10689e52f9ac) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixing conflicts that arose from scoring and widget conversion efforts

-   Updated dependencies [[`04d6e60de`](https://github.com/Khan/perseus/commit/04d6e60de2b9176f546a7058038a10689e52f9ac)]:
    -   @khanacademy/perseus@42.0.1

## 14.12.1

### Patch Changes

-   [#1866](https://github.com/Khan/perseus/pull/1866) [`94eba15ca`](https://github.com/Khan/perseus/commit/94eba15cacf904daabce378d080291613490c4a1) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixing a regression and a bug in the Input Conversion Logic

*   [#1866](https://github.com/Khan/perseus/pull/1866) [`94eba15ca`](https://github.com/Khan/perseus/commit/94eba15cacf904daabce378d080291613490c4a1) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixing a regression in the Input Conversion Logic

-   [#1858](https://github.com/Khan/perseus/pull/1858) [`5e930cebe`](https://github.com/Khan/perseus/commit/5e930cebec1e7cac9d9a49214b2cbe036da482b0) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Util function to generate spoken math + use it within Locked Point aria labels

*   [#1858](https://github.com/Khan/perseus/pull/1858) [`5e930cebe`](https://github.com/Khan/perseus/commit/5e930cebec1e7cac9d9a49214b2cbe036da482b0) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Use spoken math in locked figure settings autogen labels

-   [#1854](https://github.com/Khan/perseus/pull/1854) [`ef0ad9883`](https://github.com/Khan/perseus/commit/ef0ad9883d57115edc0e8c9d73b4abda061aba57) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Aria] Add math descriptions to locked line aria labels

-   Updated dependencies [[`7b18e94d7`](https://github.com/Khan/perseus/commit/7b18e94d7d2102669b3afde7988c63fd3de8b568), [`ec5f8773e`](https://github.com/Khan/perseus/commit/ec5f8773e97c8357b14e525c03fcb5842c0db6aa), [`94eba15ca`](https://github.com/Khan/perseus/commit/94eba15cacf904daabce378d080291613490c4a1), [`9c2289b3f`](https://github.com/Khan/perseus/commit/9c2289b3fb0e415c4cef979ab146dc583ef91b7d), [`5e930cebe`](https://github.com/Khan/perseus/commit/5e930cebec1e7cac9d9a49214b2cbe036da482b0), [`c1ba55fc0`](https://github.com/Khan/perseus/commit/c1ba55fc0247e16d9a78558721969382ee6992f8), [`c303009f5`](https://github.com/Khan/perseus/commit/c303009f54b90bf006cce01acf82b886d19472f5), [`def463014`](https://github.com/Khan/perseus/commit/def46301492122490183a72f6b17050b0a329e00), [`ef0ad9883`](https://github.com/Khan/perseus/commit/ef0ad9883d57115edc0e8c9d73b4abda061aba57)]:
    -   @khanacademy/perseus@42.0.0

## 14.12.0

### Minor Changes

-   [#1859](https://github.com/Khan/perseus/pull/1859) [`dcf1fbe35`](https://github.com/Khan/perseus/commit/dcf1fbe358e4de059a921ed14688dd2e03041196) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Addition of a new alert for the content editors when Input numbers are converted to Numeric Inputs

*   [#1731](https://github.com/Khan/perseus/pull/1731) [`27126aa00`](https://github.com/Khan/perseus/commit/27126aa00b92ce1facd97abd38989e6981836e3f) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Conversion of Input Number to Numeric Input

### Patch Changes

-   [#1839](https://github.com/Khan/perseus/pull/1839) [`150888870`](https://github.com/Khan/perseus/commit/150888870b4934e555cd355c58e6f71f9da21463) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Util function to generate spoken math + use it within Locked Point aria labels

-   Updated dependencies [[`8eb1ff5d1`](https://github.com/Khan/perseus/commit/8eb1ff5d10cc9572682c7283d52d7d96e14e9fd6), [`150888870`](https://github.com/Khan/perseus/commit/150888870b4934e555cd355c58e6f71f9da21463), [`27126aa00`](https://github.com/Khan/perseus/commit/27126aa00b92ce1facd97abd38989e6981836e3f)]:
    -   @khanacademy/perseus@41.5.0

## 14.11.2

### Patch Changes

-   Updated dependencies [[`f7160d66f`](https://github.com/Khan/perseus/commit/f7160d66f6e0185dd11d8b802ad88f94cf4b92dd), [`281f5647e`](https://github.com/Khan/perseus/commit/281f5647ea2cc6a944651466f0841140a7bc7d7b), [`46dc13f10`](https://github.com/Khan/perseus/commit/46dc13f10b97c22537e70e106540aa754c75b7b0)]:
    -   @khanacademy/perseus@41.4.0
    -   @khanacademy/kas@0.4.0

## 14.11.1

### Patch Changes

-   [#1825](https://github.com/Khan/perseus/pull/1825) [`3dd1fa5ce`](https://github.com/Khan/perseus/commit/3dd1fa5cea46e7c90db8d0e1efdf0e8c449853a7) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Adding stronger typing to expression editor issues.

*   [#1847](https://github.com/Khan/perseus/pull/1847) [`dcb4b27b3`](https://github.com/Khan/perseus/commit/dcb4b27b3dbd3f8757cd015a390e8badd30dcd4f) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Labels] Allow the usage of `{$}` to denote actual dollar signs within locked label TeX

*   Updated dependencies [[`092c81f6c`](https://github.com/Khan/perseus/commit/092c81f6ce0ae597e7dabf597d76642abebdf401), [`80f0480e6`](https://github.com/Khan/perseus/commit/80f0480e6dc5fd45e2a870c323b67decc1e8d254), [`32b27322c`](https://github.com/Khan/perseus/commit/32b27322c78fc818900d3c48dc738cb50d086505), [`08fa66103`](https://github.com/Khan/perseus/commit/08fa6610346debf178edb944d7570cdb7d98af6a), [`55371ded7`](https://github.com/Khan/perseus/commit/55371ded7a7ff882979022d341026a21637f22ee), [`3dd1fa5ce`](https://github.com/Khan/perseus/commit/3dd1fa5cea46e7c90db8d0e1efdf0e8c449853a7), [`dcb4b27b3`](https://github.com/Khan/perseus/commit/dcb4b27b3dbd3f8757cd015a390e8badd30dcd4f), [`61dbd4a2c`](https://github.com/Khan/perseus/commit/61dbd4a2cb985887de391ea9fd9839770d0deef8), [`77f1bf98f`](https://github.com/Khan/perseus/commit/77f1bf98fc9027464f2a83967d2a30dba27ee88c), [`cf2ea471e`](https://github.com/Khan/perseus/commit/cf2ea471e7d38cf8f0cd45ac0962eef6fa270b8a)]:
    -   @khanacademy/perseus@41.3.0

## 14.11.0

### Minor Changes

-   [#1834](https://github.com/Khan/perseus/pull/1834) [`429b9cc15`](https://github.com/Khan/perseus/commit/429b9cc15e5d69ad10b42db0016ba21992343267) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figures] Use \$ symbols to denote TeX within locked labels and locked figure labels

### Patch Changes

-   Updated dependencies [[`429b9cc15`](https://github.com/Khan/perseus/commit/429b9cc15e5d69ad10b42db0016ba21992343267), [`122b3cc1b`](https://github.com/Khan/perseus/commit/122b3cc1b9b233e1014ec2176319af8bbb0c54ce)]:
    -   @khanacademy/perseus@41.2.0

## 14.10.3

### Patch Changes

-   [#1830](https://github.com/Khan/perseus/pull/1830) [`e452c0ae6`](https://github.com/Khan/perseus/commit/e452c0ae63c4f8b05dfa7d9bfb1b8a741142aeab) Thanks [@handeyeco](https://github.com/handeyeco)! - Bug fix for LabelImageEditor URL race condition

-   Updated dependencies [[`8aaf29670`](https://github.com/Khan/perseus/commit/8aaf2967088e55e6907ef4b01411d6e9579b4677), [`f6b66b001`](https://github.com/Khan/perseus/commit/f6b66b00186875fd1d61e5d217b472a9a4e2cdf9)]:
    -   @khanacademy/perseus@41.1.1

## 14.10.2

### Patch Changes

-   Updated dependencies [[`b14d19160`](https://github.com/Khan/perseus/commit/b14d19160f6461c90290500519fe9d54bbc70c11)]:
    -   @khanacademy/perseus@41.1.0

## 14.10.1

### Patch Changes

-   [#1793](https://github.com/Khan/perseus/pull/1793) [`486e4cdc1`](https://github.com/Khan/perseus/commit/486e4cdc1196e78101cd9067f37888881fd58f2b) Thanks [@handeyeco](https://github.com/handeyeco)! - Move useVideo from v1 dependency to v2 dependency

-   Updated dependencies [[`2c402198c`](https://github.com/Khan/perseus/commit/2c402198c00b1eb342a799820a58d49ec5d9d9f4), [`486e4cdc1`](https://github.com/Khan/perseus/commit/486e4cdc1196e78101cd9067f37888881fd58f2b), [`d6381f773`](https://github.com/Khan/perseus/commit/d6381f7737ff44f1ec3d91c4ab25ce51f47b35b9), [`22d1c0229`](https://github.com/Khan/perseus/commit/22d1c0229e52fc2dc6bc9f38a3ca400c6e4a3884), [`035191c9e`](https://github.com/Khan/perseus/commit/035191c9ec0c70db062cdfb44cdee69682edcbcf), [`33891dc0b`](https://github.com/Khan/perseus/commit/33891dc0b5e477b0b6db2f0d3733d81215d13ebe)]:
    -   @khanacademy/perseus@41.0.0
    -   @khanacademy/math-input@21.1.4

## 14.10.0

### Minor Changes

-   [#1764](https://github.com/Khan/perseus/pull/1764) [`c2e678e5c`](https://github.com/Khan/perseus/commit/c2e678e5c109a8e0161907fea54aacb572e16bb3) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Adding new interactive graph type "unlimited-points" for mafs.

### Patch Changes

-   [#1803](https://github.com/Khan/perseus/pull/1803) [`eecfa54dd`](https://github.com/Khan/perseus/commit/eecfa54dd7810a98999e68054c9483959d7c0bd9) Thanks [@handeyeco](https://github.com/handeyeco)! - Refine exports of icon paths from Perseus

*   [#1806](https://github.com/Khan/perseus/pull/1806) [`666a1e1f4`](https://github.com/Khan/perseus/commit/666a1e1f452e7c2c041c4f339c25cb30efbd946f) Thanks [@handeyeco](https://github.com/handeyeco)! - Scope exports from grapher's util

-   [#1804](https://github.com/Khan/perseus/pull/1804) [`6907fd4fc`](https://github.com/Khan/perseus/commit/6907fd4fca22ab16466e8ee718058943c04c79f8) Thanks [@handeyeco](https://github.com/handeyeco)! - Move contants file from perseus to perseus-editor

*   [#1801](https://github.com/Khan/perseus/pull/1801) [`ed088a629`](https://github.com/Khan/perseus/commit/ed088a629c77619740a8c902ad769ed8d3622367) Thanks [@handeyeco](https://github.com/handeyeco)! - Cleanup global-styles and global-constants exports from Perseus

-   [#1805](https://github.com/Khan/perseus/pull/1805) [`faf62afd0`](https://github.com/Khan/perseus/commit/faf62afd094a758e376c5a8ac2acce140dedffdd) Thanks [@handeyeco](https://github.com/handeyeco)! - Scope sizing-utils exports to the essentials

*   [#1791](https://github.com/Khan/perseus/pull/1791) [`b119147fc`](https://github.com/Khan/perseus/commit/b119147fc042bf71193d61f9cea99b5f3d73b484) Thanks [@handeyeco](https://github.com/handeyeco)! - Check types for import/no-extraneous-dependencies eslint check

*   Updated dependencies [[`eecfa54dd`](https://github.com/Khan/perseus/commit/eecfa54dd7810a98999e68054c9483959d7c0bd9), [`c2e678e5c`](https://github.com/Khan/perseus/commit/c2e678e5c109a8e0161907fea54aacb572e16bb3), [`666a1e1f4`](https://github.com/Khan/perseus/commit/666a1e1f452e7c2c041c4f339c25cb30efbd946f), [`6907fd4fc`](https://github.com/Khan/perseus/commit/6907fd4fca22ab16466e8ee718058943c04c79f8), [`ed088a629`](https://github.com/Khan/perseus/commit/ed088a629c77619740a8c902ad769ed8d3622367), [`faf62afd0`](https://github.com/Khan/perseus/commit/faf62afd094a758e376c5a8ac2acce140dedffdd), [`b119147fc`](https://github.com/Khan/perseus/commit/b119147fc042bf71193d61f9cea99b5f3d73b484), [`f1aaf4f2b`](https://github.com/Khan/perseus/commit/f1aaf4f2b0ff2eedbd2f41aa67a7ee86363fbc2d)]:
    -   @khanacademy/perseus@40.0.0
    -   @khanacademy/kas@0.3.16
    -   @khanacademy/keypad-context@1.0.4
    -   @khanacademy/kmath@0.1.16
    -   @khanacademy/math-input@21.1.3
    -   @khanacademy/perseus-core@1.5.3

## 14.9.1

### Patch Changes

-   [#1794](https://github.com/Khan/perseus/pull/1794) [`9dd0f8c56`](https://github.com/Khan/perseus/commit/9dd0f8c56e5d824d89ae1041bee17c5c2f5edfe3) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove unused prop, optionRenderer, from dropdown-option component

-   Updated dependencies [[`39e1292a9`](https://github.com/Khan/perseus/commit/39e1292a9d93453037b77c157ee5421ed23b88ad), [`f3139edfe`](https://github.com/Khan/perseus/commit/f3139edfeb5f8b6faf0e537961165e3d3499c30b), [`5cf8d975b`](https://github.com/Khan/perseus/commit/5cf8d975b249e103e4f439b2682741c25a0b4084), [`d6edf18ef`](https://github.com/Khan/perseus/commit/d6edf18ef07c6b82ae585e77d75e9132d554baf5), [`5ea5d5927`](https://github.com/Khan/perseus/commit/5ea5d592755bd5b2889547718fc39523e5595ea1), [`9426509cd`](https://github.com/Khan/perseus/commit/9426509cdcdc9c51dfd957e0e51f6bac0e11ffe5), [`dbe17d1ee`](https://github.com/Khan/perseus/commit/dbe17d1ee9c22d11ec916e898cb5ca4a01409896)]:
    -   @khanacademy/perseus@39.0.1
    -   @khanacademy/math-input@21.1.2

## 14.9.0

### Minor Changes

-   [#1745](https://github.com/Khan/perseus/pull/1745) [`5cbbeebdf`](https://github.com/Khan/perseus/commit/5cbbeebdf368a06c318940f477af08fd73a84e66) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - adds appearance description to aria label

### Patch Changes

-   [#1744](https://github.com/Khan/perseus/pull/1744) [`236ef4458`](https://github.com/Khan/perseus/commit/236ef4458aaffc9b6265e72dc64cb1ee3a21a71c) Thanks [@handeyeco](https://github.com/handeyeco)! - Cleanup: remove scorePreview and refine some types

*   [#1776](https://github.com/Khan/perseus/pull/1776) [`d05a4a228`](https://github.com/Khan/perseus/commit/d05a4a22895c2c939e5c90a9b412ddfaaa0ba2f0) Thanks [@handeyeco](https://github.com/handeyeco)! - Don't export things that aren't used externally

-   [#1741](https://github.com/Khan/perseus/pull/1741) [`3e48b2c26`](https://github.com/Khan/perseus/commit/3e48b2c26fbd1f649ce3878468e06043b88b0949) Thanks [@handeyeco](https://github.com/handeyeco)! - Scope reviewModeRubric to just the component that uses it (Radio)

*   [#1780](https://github.com/Khan/perseus/pull/1780) [`6729af8c8`](https://github.com/Khan/perseus/commit/6729af8c8af8617f7f7159976efb2989dc925909) Thanks [@handeyeco](https://github.com/handeyeco)! - Don't export types that aren't used externally

*   Updated dependencies [[`e8160105c`](https://github.com/Khan/perseus/commit/e8160105c967143b593954d967504dcbeab59468), [`ea7ede69f`](https://github.com/Khan/perseus/commit/ea7ede69fc8b5265162cfbfedf863766fa1e0aee), [`f220366d0`](https://github.com/Khan/perseus/commit/f220366d0b3550a84b0d744119331d3307348c34), [`236ef4458`](https://github.com/Khan/perseus/commit/236ef4458aaffc9b6265e72dc64cb1ee3a21a71c), [`cf57871df`](https://github.com/Khan/perseus/commit/cf57871df1d0eb63be2b83b8c5dda5f4f1f709ad), [`d05a4a228`](https://github.com/Khan/perseus/commit/d05a4a22895c2c939e5c90a9b412ddfaaa0ba2f0), [`8eacf0bda`](https://github.com/Khan/perseus/commit/8eacf0bda557c459be996b8c66a0fd93ad797b39), [`cb3b8f3ea`](https://github.com/Khan/perseus/commit/cb3b8f3ea58e147d402238994227284e8a21ba51), [`3e48b2c26`](https://github.com/Khan/perseus/commit/3e48b2c26fbd1f649ce3878468e06043b88b0949), [`c27ee11bc`](https://github.com/Khan/perseus/commit/c27ee11bc69ff9dcf89814f9f66b4e1b3508f129), [`0587dc04b`](https://github.com/Khan/perseus/commit/0587dc04b770524cce8c603fcd90e7c25844be46), [`6729af8c8`](https://github.com/Khan/perseus/commit/6729af8c8af8617f7f7159976efb2989dc925909), [`5cbbeebdf`](https://github.com/Khan/perseus/commit/5cbbeebdf368a06c318940f477af08fd73a84e66), [`69f3facad`](https://github.com/Khan/perseus/commit/69f3facadd0dd38ef98c4ba6e04461d2bbe92578), [`c6ee2662a`](https://github.com/Khan/perseus/commit/c6ee2662a18e6703c3a7816d5fb89a70e0f9f50b), [`c91cba9e0`](https://github.com/Khan/perseus/commit/c91cba9e01bc391accac2014ed3c87b42ba174fd)]:
    -   @khanacademy/math-input@21.1.1
    -   @khanacademy/perseus@39.0.0

## 14.8.1

### Patch Changes

-   Updated dependencies [[`81ee69b0a`](https://github.com/Khan/perseus/commit/81ee69b0aa5fd5746a63567dce633ae0358d7ff9), [`c95d08056`](https://github.com/Khan/perseus/commit/c95d0805624f553718ec2c1a18108cc86e712f93), [`93bd39b6b`](https://github.com/Khan/perseus/commit/93bd39b6b3d7751ef269bd2ac8b7380c52886921), [`3a208ba12`](https://github.com/Khan/perseus/commit/3a208ba127da6145dd26ef80c7fd3b2809a1b768), [`a0f438fd7`](https://github.com/Khan/perseus/commit/a0f438fd7ef564e2df348c2f42809f46c7216194)]:
    -   @khanacademy/kas@0.3.15
    -   @khanacademy/perseus@38.0.1

## 14.8.0

### Minor Changes

-   [#1739](https://github.com/Khan/perseus/pull/1739) [`ab0a10eec`](https://github.com/Khan/perseus/commit/ab0a10eec0daeefe56b2b4a0ba1df0f7d8cfa66e) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - updates position of visible label within aria label

### Patch Changes

-   [#1717](https://github.com/Khan/perseus/pull/1717) [`8a40e99e6`](https://github.com/Khan/perseus/commit/8a40e99e6cd6dd2424d84ec4d03744984aa68275) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove duplicate WidgetDict type and bespoke typings of `widgets` in favour of `PerseusWidgetsMap` type.

-   Updated dependencies [[`8a40e99e6`](https://github.com/Khan/perseus/commit/8a40e99e6cd6dd2424d84ec4d03744984aa68275), [`c4d96ccaf`](https://github.com/Khan/perseus/commit/c4d96ccaf941638d6a24b29d8d91111581cca1be), [`2cc20b32e`](https://github.com/Khan/perseus/commit/2cc20b32efc0e03f3e87f465d02bcfc29b3882f9)]:
    -   @khanacademy/perseus@38.0.0

## 14.7.1

### Patch Changes

-   Updated dependencies [[`f383d4399`](https://github.com/Khan/perseus/commit/f383d4399d16ee31ad8e24867b0d171c160a1f1b), [`c57e114f2`](https://github.com/Khan/perseus/commit/c57e114f25cfa7d95508d4244c28e00b10e9d130), [`5e30fcde8`](https://github.com/Khan/perseus/commit/5e30fcde8a0692b259955a95a9a22d9b7c7e75f9)]:
    -   @khanacademy/perseus@37.0.1

## 14.7.0

### Minor Changes

-   [#1618](https://github.com/Khan/perseus/pull/1618) [`147f9a17d`](https://github.com/Khan/perseus/commit/147f9a17dc953a7bf24e6cc60a46589471a1e82c) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - add scientific notation button / toggle to basic keypad

*   [#1733](https://github.com/Khan/perseus/pull/1733) [`74ba298fa`](https://github.com/Khan/perseus/commit/74ba298faaeb8adb1b403c837e8daaafc2eb5c94) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - reverts scientific option addition to keypad

### Patch Changes

-   Updated dependencies [[`22ee7bc0d`](https://github.com/Khan/perseus/commit/22ee7bc0def5a15cb5390f0c932b84fe93cbe6f5), [`92c4e6215`](https://github.com/Khan/perseus/commit/92c4e62153cc83eab1116fccf2d353496c0f220a), [`5ecfd4455`](https://github.com/Khan/perseus/commit/5ecfd44552e8021389aede22ee189f0262327497), [`387273b07`](https://github.com/Khan/perseus/commit/387273b07f80f364cabd0de65a1831fc48a8fac5), [`147f9a17d`](https://github.com/Khan/perseus/commit/147f9a17dc953a7bf24e6cc60a46589471a1e82c), [`74ba298fa`](https://github.com/Khan/perseus/commit/74ba298faaeb8adb1b403c837e8daaafc2eb5c94)]:
    -   @khanacademy/perseus@37.0.0
    -   @khanacademy/math-input@21.1.0

## 14.6.5

### Patch Changes

-   [#1666](https://github.com/Khan/perseus/pull/1666) [`c2b1d8d05`](https://github.com/Khan/perseus/commit/c2b1d8d05a71f1c58cefe02498074987fe6fdcd2) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Fixed bug related to Angle Equation and refactored Angle Equation logic.

-   Updated dependencies [[`c2b1d8d05`](https://github.com/Khan/perseus/commit/c2b1d8d05a71f1c58cefe02498074987fe6fdcd2), [`65497a600`](https://github.com/Khan/perseus/commit/65497a6007fed7be0775c49538e0f09830109fa1), [`08ad41b92`](https://github.com/Khan/perseus/commit/08ad41b9260db8b34e7a79e562f3fcd464104864), [`d4f4e2be1`](https://github.com/Khan/perseus/commit/d4f4e2be1408c4531a146bcd496344a629d90bd1)]:
    -   @khanacademy/perseus@36.1.2
    -   @khanacademy/perseus-core@1.5.2
    -   @khanacademy/kas@0.3.14
    -   @khanacademy/keypad-context@1.0.3
    -   @khanacademy/kmath@0.1.15
    -   @khanacademy/math-input@21.0.4

## 14.6.4

### Patch Changes

-   Updated dependencies [[`cde39a896`](https://github.com/Khan/perseus/commit/cde39a8963f3e2d34d2de85c6b128ec005ea3f21), [`b22b053f6`](https://github.com/Khan/perseus/commit/b22b053f60c5ee8bc3f9150ae7f37c4e792e4caa)]:
    -   @khanacademy/perseus@36.1.1

## 14.6.3

### Patch Changes

-   Updated dependencies [[`eb733b3ec`](https://github.com/Khan/perseus/commit/eb733b3ec2e3354a0c4647e9993b6f08a1b77e4a), [`2ff9ae90e`](https://github.com/Khan/perseus/commit/2ff9ae90ed65bbe6c4ec8c023298f130d27591cc), [`da44c4a3b`](https://github.com/Khan/perseus/commit/da44c4a3b7cd3413df6aee477f0391c583547936)]:
    -   @khanacademy/perseus@36.1.0
    -   @khanacademy/perseus-core@1.5.1
    -   @khanacademy/kas@0.3.13
    -   @khanacademy/keypad-context@1.0.2
    -   @khanacademy/kmath@0.1.14
    -   @khanacademy/math-input@21.0.3

## 14.6.2

### Patch Changes

-   Updated dependencies [[`b9d84ccba`](https://github.com/Khan/perseus/commit/b9d84ccba8df83df4d2a042f730707e5fa6e562b), [`bcd32425c`](https://github.com/Khan/perseus/commit/bcd32425cbf4c74646ee66f998294c2f9cd3253d), [`8e95e00c4`](https://github.com/Khan/perseus/commit/8e95e00c4decf76f443d286cae29cc4ebf6284b5), [`3e1697229`](https://github.com/Khan/perseus/commit/3e16972293b757e8631f4c5d8c3fb121babf5324), [`3e1697229`](https://github.com/Khan/perseus/commit/3e16972293b757e8631f4c5d8c3fb121babf5324)]:
    -   @khanacademy/perseus@36.0.0

## 14.6.1

### Patch Changes

-   Updated dependencies [[`d0aa0cc0c`](https://github.com/Khan/perseus/commit/d0aa0cc0cff9fab6f3798cd7c03300f863d02e20)]:
    -   @khanacademy/perseus@35.1.1

## 14.6.0

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

-   [#1706](https://github.com/Khan/perseus/pull/1706) [`624be8143`](https://github.com/Khan/perseus/commit/624be81437ed560984ea662647451f4846a71141) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figures Aria] Use TextArea instead of TextField in the locked figures aria settings

*   [#1693](https://github.com/Khan/perseus/pull/1693) [`466d010c6`](https://github.com/Khan/perseus/commit/466d010c6dcf57e92c5e857d4c1c3829da238b61) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add color select to locked figure labels settings

*   Updated dependencies [[`30725ec88`](https://github.com/Khan/perseus/commit/30725ec8812c3431cbe721e29e578aefe60e867d), [`c0cbb484a`](https://github.com/Khan/perseus/commit/c0cbb484af491b6451a23db3a29b31b3285ccdec), [`f326139ee`](https://github.com/Khan/perseus/commit/f326139ee6bf9680075eac6353b1e84c44fa3f77), [`a65da60c2`](https://github.com/Khan/perseus/commit/a65da60c2b16f18c123b3a3befa880bd2d0a1854), [`82e0ebd71`](https://github.com/Khan/perseus/commit/82e0ebd7101a98ee67487507e66f6ef6270aa0f7), [`c41e4b2f3`](https://github.com/Khan/perseus/commit/c41e4b2f35cd2036778c79e035d402dee7f12893), [`2d7cadaf0`](https://github.com/Khan/perseus/commit/2d7cadaf0a7699a4f3d9203c9eb9d38ee0c42e6c), [`49efaaff5`](https://github.com/Khan/perseus/commit/49efaaff5235bea1b6499df6a9d05fca7d022cd2), [`fc16bc77f`](https://github.com/Khan/perseus/commit/fc16bc77feabfbaf594cd26836d2c56dadbbca90), [`f5af24371`](https://github.com/Khan/perseus/commit/f5af2437133d68dcbaa42830850341c46d7affee), [`339a6db38`](https://github.com/Khan/perseus/commit/339a6db386b44f0481ea48dc9ea19b6debb4ae7c), [`3c73f4aa4`](https://github.com/Khan/perseus/commit/3c73f4aa40b4912affa7ec3a71ce21a9cbf11af5), [`17ebfc0de`](https://github.com/Khan/perseus/commit/17ebfc0de9a89df44c65dfbc49fb74c6c7895ec2), [`493715e3d`](https://github.com/Khan/perseus/commit/493715e3d9a8892ae6f7e052b830e4d88367cd19), [`e432666fd`](https://github.com/Khan/perseus/commit/e432666fd1635d7c519bc9b5d402db081a54f1d3), [`466d010c6`](https://github.com/Khan/perseus/commit/466d010c6dcf57e92c5e857d4c1c3829da238b61), [`b3de0d80e`](https://github.com/Khan/perseus/commit/b3de0d80ea4a8710000c56d8458eb31cbf11c3fc), [`eda436f00`](https://github.com/Khan/perseus/commit/eda436f005544172e4eb443e903978e2c13d6afb), [`d3767f720`](https://github.com/Khan/perseus/commit/d3767f7209ea8263997cd8f08d7522a31d4db709), [`463755970`](https://github.com/Khan/perseus/commit/463755970951a97db23baa5f73084549fe56c936), [`10ce86925`](https://github.com/Khan/perseus/commit/10ce869258bc8506aba848c06ada8e5ae5fca4ff), [`039e0a360`](https://github.com/Khan/perseus/commit/039e0a360e56044ce2b4a1decfd82e6c01841ea9), [`8230d96ee`](https://github.com/Khan/perseus/commit/8230d96ee03b421d8bb6dc823943faccf7908058), [`e818b0f15`](https://github.com/Khan/perseus/commit/e818b0f15b4862b23048cd157c2ea96ce8330c25)]:
    -   @khanacademy/perseus@35.1.0

## 14.5.0

### Minor Changes

-   [#1655](https://github.com/Khan/perseus/pull/1655) [`790e189a7`](https://github.com/Khan/perseus/commit/790e189a7fdcd215d78d1999879ab2fc7417e123) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add/edit/delete locked ellipse labels

*   [#1653](https://github.com/Khan/perseus/pull/1653) [`ca4be05ab`](https://github.com/Khan/perseus/commit/ca4be05ab7367007330784796ad2561e3f5bb1c8) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] View locked ellipse labels

-   [#1652](https://github.com/Khan/perseus/pull/1652) [`1ed045583`](https://github.com/Khan/perseus/commit/1ed045583fec01be5baf5d4e86a8b582cbf782c2) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add/edit/delete locked vector labels

*   [#1659](https://github.com/Khan/perseus/pull/1659) [`3dcb1fdf2`](https://github.com/Khan/perseus/commit/3dcb1fdf247eda0f0b78966daf04a9e4278d4373) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add/edit/delete locked function labels

-   [#1658](https://github.com/Khan/perseus/pull/1658) [`20b3a2485`](https://github.com/Khan/perseus/commit/20b3a2485e2ba8deea798acc2732d9570c0dac45) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] View locked function labels

*   [#1650](https://github.com/Khan/perseus/pull/1650) [`03cddb6c3`](https://github.com/Khan/perseus/commit/03cddb6c39570e87ff2437273eb1287ff1417eec) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] View locked vector labels

### Patch Changes

-   [#1661](https://github.com/Khan/perseus/pull/1661) [`391641acb`](https://github.com/Khan/perseus/commit/391641acb153d2d6c0f8c29f5026a392ac1b3a62) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove unused onInputError from APIOptions

*   [#1674](https://github.com/Khan/perseus/pull/1674) [`f38d104d5`](https://github.com/Khan/perseus/commit/f38d104d580775cd67a0586143eacf7b864e4814) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Save empty full graph aria label/description as undefined

-   [#1673](https://github.com/Khan/perseus/pull/1673) [`6f4702e41`](https://github.com/Khan/perseus/commit/6f4702e418ffdfaae01aa3f3a126b304b3250e34) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figures Labels] Make labels optional to increase type safety

-   Updated dependencies [[`063159313`](https://github.com/Khan/perseus/commit/063159313c8b146589912ce42c14f06aa23d3e51), [`13d79edb9`](https://github.com/Khan/perseus/commit/13d79edb94fd7009b18a176b5c93b43fb03fee72), [`790e189a7`](https://github.com/Khan/perseus/commit/790e189a7fdcd215d78d1999879ab2fc7417e123), [`ae51ccdb8`](https://github.com/Khan/perseus/commit/ae51ccdb820894f6fc5c1b23556823efdd4edba6), [`3a10f6b1f`](https://github.com/Khan/perseus/commit/3a10f6b1fe85d915fbf947434d7ebdc0b35607f5), [`ca4be05ab`](https://github.com/Khan/perseus/commit/ca4be05ab7367007330784796ad2561e3f5bb1c8), [`b9d1af181`](https://github.com/Khan/perseus/commit/b9d1af181efeb093407d59ba0a8efe8912524757), [`9f9d42c4e`](https://github.com/Khan/perseus/commit/9f9d42c4e2d041408cf508f5bfaeafe03dc2acbc), [`1ed045583`](https://github.com/Khan/perseus/commit/1ed045583fec01be5baf5d4e86a8b582cbf782c2), [`9efad87d0`](https://github.com/Khan/perseus/commit/9efad87d00c58f16c5a5a95c6c7148bde62fe71a), [`3dcb1fdf2`](https://github.com/Khan/perseus/commit/3dcb1fdf247eda0f0b78966daf04a9e4278d4373), [`20b3a2485`](https://github.com/Khan/perseus/commit/20b3a2485e2ba8deea798acc2732d9570c0dac45), [`03cddb6c3`](https://github.com/Khan/perseus/commit/03cddb6c39570e87ff2437273eb1287ff1417eec), [`1642ad9c0`](https://github.com/Khan/perseus/commit/1642ad9c0cadaf2e4db316e5e4cb38a5c9a9f5fe), [`391641acb`](https://github.com/Khan/perseus/commit/391641acb153d2d6c0f8c29f5026a392ac1b3a62), [`6f4702e41`](https://github.com/Khan/perseus/commit/6f4702e418ffdfaae01aa3f3a126b304b3250e34), [`56f33ae01`](https://github.com/Khan/perseus/commit/56f33ae010390abd2050028db98c9a72fc604e1a)]:
    -   @khanacademy/perseus@35.0.0

## 14.4.0

### Minor Changes

-   [#1642](https://github.com/Khan/perseus/pull/1642) [`75e19c557`](https://github.com/Khan/perseus/commit/75e19c557a0439b6645d09c3a0586d7f09d06539) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] View locked line labels

*   [#1647](https://github.com/Khan/perseus/pull/1647) [`49bf45573`](https://github.com/Khan/perseus/commit/49bf4557313c7d69d5a287095991cf11cbc81752) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add labels to locked lines' defining points in the graph and editor

-   [#1644](https://github.com/Khan/perseus/pull/1644) [`136b6e54c`](https://github.com/Khan/perseus/commit/136b6e54cf6ab1a8514533bad03ac7f752532084) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add/edit/delete locked line labels

*   [#1643](https://github.com/Khan/perseus/pull/1643) [`2950ec33f`](https://github.com/Khan/perseus/commit/2950ec33ff6bcea92ffc3bf035fff6fdffa22804) Thanks [@anniegallagher](https://github.com/anniegallagher)! - Make widget editors expanded by default. Add ability to expand/collapse all widget editors on a page externally.

### Patch Changes

-   Updated dependencies [[`7822ea63c`](https://github.com/Khan/perseus/commit/7822ea63c9f91adebe2b6ea0841db1ae62c9d088), [`75e19c557`](https://github.com/Khan/perseus/commit/75e19c557a0439b6645d09c3a0586d7f09d06539), [`49bf45573`](https://github.com/Khan/perseus/commit/49bf4557313c7d69d5a287095991cf11cbc81752), [`1080a628b`](https://github.com/Khan/perseus/commit/1080a628bd77139be91987763153273318dd8792), [`d766b33dd`](https://github.com/Khan/perseus/commit/d766b33dd70d63e2441fa1655ca30230432a6418), [`25d45af95`](https://github.com/Khan/perseus/commit/25d45af95aaacf302a7ea0cceae9d4c0cf1cab0b), [`b5594e81d`](https://github.com/Khan/perseus/commit/b5594e81d81bbc9dcd100bfc35dbca98c2241c51), [`f5ceabb7d`](https://github.com/Khan/perseus/commit/f5ceabb7dbdfc984d08eed0ea55cf4202ca276e2), [`136b6e54c`](https://github.com/Khan/perseus/commit/136b6e54cf6ab1a8514533bad03ac7f752532084), [`64bcde0a1`](https://github.com/Khan/perseus/commit/64bcde0a1f98b4232e5347a06f4c8cad7265d006)]:
    -   @khanacademy/perseus@34.1.0

## 14.3.0

### Minor Changes

-   [#1630](https://github.com/Khan/perseus/pull/1630) [`fd474e58e`](https://github.com/Khan/perseus/commit/fd474e58edc39956b885fe1db323789c0db7e435) Thanks [@handeyeco](https://github.com/handeyeco)! - Convert some PropTypes to TS

*   [#1638](https://github.com/Khan/perseus/pull/1638) [`973de7a65`](https://github.com/Khan/perseus/commit/973de7a653a5dd176a65cde35cfb3c0fb4efea69) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Add/Edit/Delete locked point labels in the editor

-   [#1637](https://github.com/Khan/perseus/pull/1637) [`56166be34`](https://github.com/Khan/perseus/commit/56166be340c7c408767884be975ea157052e93df) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Figure Labels] Locked points: Add the labels field to LockedPointType and the feature flag for locked point labels

### Patch Changes

-   Updated dependencies [[`732a052f8`](https://github.com/Khan/perseus/commit/732a052f8966163768b9ee04fd6bbf504abf1902), [`fd474e58e`](https://github.com/Khan/perseus/commit/fd474e58edc39956b885fe1db323789c0db7e435), [`98eaad0d1`](https://github.com/Khan/perseus/commit/98eaad0d13fd778309fd69f8515c5d90e10d4880), [`973de7a65`](https://github.com/Khan/perseus/commit/973de7a653a5dd176a65cde35cfb3c0fb4efea69), [`ada946eac`](https://github.com/Khan/perseus/commit/ada946eac97610ffe3b5e52789bd64aaf5e08014), [`1b71657a0`](https://github.com/Khan/perseus/commit/1b71657a0b4494cdcac40ae7e232f645067894a8), [`56166be34`](https://github.com/Khan/perseus/commit/56166be340c7c408767884be975ea157052e93df), [`45bb43b92`](https://github.com/Khan/perseus/commit/45bb43b923a2498747fdf4a42388d3cda8354078), [`e910f9b80`](https://github.com/Khan/perseus/commit/e910f9b80558481dfbe4a2420935a98b32190d13)]:
    -   @khanacademy/perseus@34.0.0

## 14.2.0

### Minor Changes

-   [#1605](https://github.com/Khan/perseus/pull/1605) [`ddc3f5d05`](https://github.com/Khan/perseus/commit/ddc3f5d057da2d2c96ba92c5f5784c245ce6f573) Thanks [@benchristel](https://github.com/benchristel)! - Add 'None' graph type, for graphs that should only display locked figures.

### Patch Changes

-   [#1601](https://github.com/Khan/perseus/pull/1601) [`ef7b35bce`](https://github.com/Khan/perseus/commit/ef7b35bce082c2552cde2b3bca5edbbefbfa587a) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Reorganize interactive graph editor files.

-   Updated dependencies [[`51b6e1431`](https://github.com/Khan/perseus/commit/51b6e14319ec34ee0bf661f047f138f7b63034c1), [`cea62ad11`](https://github.com/Khan/perseus/commit/cea62ad11fa39234da56d1a0d7d876212a1be56a), [`ddc3f5d05`](https://github.com/Khan/perseus/commit/ddc3f5d057da2d2c96ba92c5f5784c245ce6f573), [`12b8e01bf`](https://github.com/Khan/perseus/commit/12b8e01bf89abbc88d6bfc9bf243d5a0e95b5ed3)]:
    -   @khanacademy/perseus@33.3.0

## 14.1.3

### Patch Changes

-   Updated dependencies [[`ab7b0fde5`](https://github.com/Khan/perseus/commit/ab7b0fde555cd201a23be2efdaa5ae4e2528e1f8), [`67aa2aa50`](https://github.com/Khan/perseus/commit/67aa2aa5011c0d367f49f66beb12bd5b5a6e4e57), [`dbac5d491`](https://github.com/Khan/perseus/commit/dbac5d491386fc0daf813d583de02af55b02920f)]:
    -   @khanacademy/perseus@33.2.1

## 14.1.2

### Patch Changes

-   Updated dependencies [[`d266ba110`](https://github.com/Khan/perseus/commit/d266ba110b5acc644f4bafec7940753bb1b95600), [`f28d610a1`](https://github.com/Khan/perseus/commit/f28d610a18495ef6b9b0d6a52924cbfd12aa2fe3), [`67c58b4ad`](https://github.com/Khan/perseus/commit/67c58b4ada8b2543de5c4defb09fa1eed4cbc538), [`e533822aa`](https://github.com/Khan/perseus/commit/e533822aa7e54517b19ded83720c0fa706805041)]:
    -   @khanacademy/perseus@33.2.0

## 14.1.1

### Patch Changes

-   [#1609](https://github.com/Khan/perseus/pull/1609) [`981047211`](https://github.com/Khan/perseus/commit/9810472110434f22d8f446e9e6bf4bd69cdc3136) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Remove the start-coords-ui flags

*   [#1607](https://github.com/Khan/perseus/pull/1607) [`1b340b197`](https://github.com/Khan/perseus/commit/1b340b197be03c4ee0c6fbaa4eb1871e68b4a915) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Use Wonder Blocks TextArea in the graph description settings UI

-   [#1610](https://github.com/Khan/perseus/pull/1610) [`e9b317ca0`](https://github.com/Khan/perseus/commit/e9b317ca0398bb39de7b3605247d2abec09d791a) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Remove the start coords UI if the graph is static

*   [#1608](https://github.com/Khan/perseus/pull/1608) [`737fe30b4`](https://github.com/Khan/perseus/commit/737fe30b492c598c70b7bb1cebad00adf9a25c93) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Remove the interactive-graph-locked-feature-m2b flag

*   Updated dependencies [[`981047211`](https://github.com/Khan/perseus/commit/9810472110434f22d8f446e9e6bf4bd69cdc3136), [`e9b317ca0`](https://github.com/Khan/perseus/commit/e9b317ca0398bb39de7b3605247d2abec09d791a), [`737fe30b4`](https://github.com/Khan/perseus/commit/737fe30b492c598c70b7bb1cebad00adf9a25c93), [`3980a36fa`](https://github.com/Khan/perseus/commit/3980a36fa2eb66c61d648d82e73d323ab8b8f5b0)]:
    -   @khanacademy/perseus@33.1.0

## 14.1.0

### Minor Changes

-   [#1600](https://github.com/Khan/perseus/pull/1600) [`bdb382fda`](https://github.com/Khan/perseus/commit/bdb382fdaef1f3f02695620aa955c49237c256c1) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Interactive Graph - Add example functions for copy/paste to locked functions settings

*   [#1568](https://github.com/Khan/perseus/pull/1568) [`eddcb9417`](https://github.com/Khan/perseus/commit/eddcb941742355bd4f339fd727ac97bb340ee474) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph + Editor] Add a full graph aria-label and aria-description/describedby to interactive graphs, as well as the UI for content authors to add this in the interactive graph editor

### Patch Changes

-   [#1592](https://github.com/Khan/perseus/pull/1592) [`d88b0ffdf`](https://github.com/Khan/perseus/commit/d88b0ffdf1eb61f2efb0f589efe81dbbf5088947) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Move tests, test data, and Storybook stories for the Interactive Graph widget to the directory specific to that widget.

*   [#1591](https://github.com/Khan/perseus/pull/1591) [`05d048026`](https://github.com/Khan/perseus/commit/05d04802603fde4ca5be1fcf88ade7c09fb49c96) Thanks [@handeyeco](https://github.com/handeyeco)! - Move interaction-editor sub-components into perseus-editor

-   [#1594](https://github.com/Khan/perseus/pull/1594) [`435f3f6d8`](https://github.com/Khan/perseus/commit/435f3f6d8c70de980afc5beb3ac981d9a3f6a4a3) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Remove Storybook stories that generate random widgets

*   [#1599](https://github.com/Khan/perseus/pull/1599) [`71715afd2`](https://github.com/Khan/perseus/commit/71715afd2418f16d23d04cb57252a1940597cfa0) Thanks [@benchristel](https://github.com/benchristel)! - Internal: improve type safety of interactive graph editor

-   [#1590](https://github.com/Khan/perseus/pull/1590) [`6c4e9e154`](https://github.com/Khan/perseus/commit/6c4e9e154aea90f0ab484e9efc39a351f4790d9d) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Move InteractiveGraphEditor to its own directory

-   Updated dependencies [[`08068dc71`](https://github.com/Khan/perseus/commit/08068dc7131d00ea0c74b90e9798cda47902a5f5), [`d88b0ffdf`](https://github.com/Khan/perseus/commit/d88b0ffdf1eb61f2efb0f589efe81dbbf5088947), [`eddcb9417`](https://github.com/Khan/perseus/commit/eddcb941742355bd4f339fd727ac97bb340ee474), [`05d048026`](https://github.com/Khan/perseus/commit/05d04802603fde4ca5be1fcf88ade7c09fb49c96), [`435f3f6d8`](https://github.com/Khan/perseus/commit/435f3f6d8c70de980afc5beb3ac981d9a3f6a4a3), [`71715afd2`](https://github.com/Khan/perseus/commit/71715afd2418f16d23d04cb57252a1940597cfa0), [`6c4e9e154`](https://github.com/Khan/perseus/commit/6c4e9e154aea90f0ab484e9efc39a351f4790d9d)]:
    -   @khanacademy/perseus@33.0.0

## 14.0.1

### Patch Changes

-   [#1588](https://github.com/Khan/perseus/pull/1588) [`9dad8a089`](https://github.com/Khan/perseus/commit/9dad8a0891bbd3e4a9943fade3c00c073a281541) Thanks [@benchristel](https://github.com/benchristel)! - Remove unused handling of deprecated Interactive Graph prop

-   Updated dependencies [[`b54f886f6`](https://github.com/Khan/perseus/commit/b54f886f64fced1fe0c211369f5d89a7c459dd97), [`9dad8a089`](https://github.com/Khan/perseus/commit/9dad8a0891bbd3e4a9943fade3c00c073a281541)]:
    -   @khanacademy/perseus@32.0.1

## 14.0.0

### Major Changes

-   [#1577](https://github.com/Khan/perseus/pull/1577) [`c875acd01`](https://github.com/Khan/perseus/commit/c875acd01fe8cfa84a2b10177a6fcedfb612cb3f) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove example widgets and their editors

### Minor Changes

-   [#1582](https://github.com/Khan/perseus/pull/1582) [`377b7ce68`](https://github.com/Khan/perseus/commit/377b7ce68801cef99cd3a09474b28a8b60f90f0a) Thanks [@aemandine](https://github.com/aemandine)! - Add save warnings to PhET widget editor and un-hide widget from content editor widget dropdown

### Patch Changes

-   [#1585](https://github.com/Khan/perseus/pull/1585) [`a6ec402c0`](https://github.com/Khan/perseus/commit/a6ec402c0e41dae1dbd980106265929ebe761bce) Thanks [@handeyeco](https://github.com/handeyeco)! - Reorganize files in the widgets folder

*   [#1587](https://github.com/Khan/perseus/pull/1587) [`8015cdefb`](https://github.com/Khan/perseus/commit/8015cdefbafa094e9e1969ddb6ec39033c990687) Thanks [@aemandine](https://github.com/aemandine)! - Tidying up PhET widget

-   [#1583](https://github.com/Khan/perseus/pull/1583) [`615567bd2`](https://github.com/Khan/perseus/commit/615567bd2eeec45d16d845a1cb8bd5c33c04d701) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove sort-comp exceptions and reorder components

-   Updated dependencies [[`78bb8573e`](https://github.com/Khan/perseus/commit/78bb8573e9b00992554c2b1339678cc78363773b), [`a6ec402c0`](https://github.com/Khan/perseus/commit/a6ec402c0e41dae1dbd980106265929ebe761bce), [`d56952564`](https://github.com/Khan/perseus/commit/d569525643d1dcf9c2cca78bc3b5ce18b7f584d1), [`c875acd01`](https://github.com/Khan/perseus/commit/c875acd01fe8cfa84a2b10177a6fcedfb612cb3f), [`8015cdefb`](https://github.com/Khan/perseus/commit/8015cdefbafa094e9e1969ddb6ec39033c990687), [`c4432ffad`](https://github.com/Khan/perseus/commit/c4432ffad978a224b7d981e1577c7897342a01ee), [`615567bd2`](https://github.com/Khan/perseus/commit/615567bd2eeec45d16d845a1cb8bd5c33c04d701), [`377b7ce68`](https://github.com/Khan/perseus/commit/377b7ce68801cef99cd3a09474b28a8b60f90f0a)]:
    -   @khanacademy/perseus@32.0.0

## 13.1.0

### Minor Changes

-   [#1534](https://github.com/Khan/perseus/pull/1534) [`d446d4251`](https://github.com/Khan/perseus/commit/d446d4251307279bca1e20b1d2d63d0b71b33076) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove 'strings' prop from ContentPreview (we'll pull it from context)

### Patch Changes

-   [#1552](https://github.com/Khan/perseus/pull/1552) [`873f10790`](https://github.com/Khan/perseus/commit/873f1079076f80ed28705e1da1cf0c0dcfb79aac) Thanks [@nishasy](https://github.com/nishasy)! - Update dependency on wonder-blocks-form

*   [#1569](https://github.com/Khan/perseus/pull/1569) [`40d0b67a8`](https://github.com/Khan/perseus/commit/40d0b67a87bbb2ef5e3afcb7421ff8b64406adcb) Thanks [@handeyeco](https://github.com/handeyeco)! - bump peer dependencies to match webapp

-   [#1548](https://github.com/Khan/perseus/pull/1548) [`21a908e8f`](https://github.com/Khan/perseus/commit/21a908e8f9eec99ec1fabe1c311f0417828f5575) Thanks [@catandthemachines](https://github.com/catandthemachines)! - Fixing resizing behavior of Expression Widget in 400% zoom.

*   [#1534](https://github.com/Khan/perseus/pull/1534) [`d446d4251`](https://github.com/Khan/perseus/commit/d446d4251307279bca1e20b1d2d63d0b71b33076) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Ensure 'React' is imported in ContentPreview component.

*   Updated dependencies [[`efced74db`](https://github.com/Khan/perseus/commit/efced74db8f560d3df53c67c54ee7b74c45405cf), [`873f10790`](https://github.com/Khan/perseus/commit/873f1079076f80ed28705e1da1cf0c0dcfb79aac), [`40d0b67a8`](https://github.com/Khan/perseus/commit/40d0b67a87bbb2ef5e3afcb7421ff8b64406adcb), [`21a908e8f`](https://github.com/Khan/perseus/commit/21a908e8f9eec99ec1fabe1c311f0417828f5575), [`598f7450f`](https://github.com/Khan/perseus/commit/598f7450faf4a639ff41a26e2946234c37e3320d), [`070430166`](https://github.com/Khan/perseus/commit/070430166e3ad987300aa5db1a8c6f385d27d734), [`50c1b19e5`](https://github.com/Khan/perseus/commit/50c1b19e529e5c096abdd2512c7e17e9f717a3cb)]:
    -   @khanacademy/perseus@31.1.0
    -   @khanacademy/keypad-context@1.0.1
    -   @khanacademy/math-input@21.0.2

## 13.0.1

### Patch Changes

-   [#1550](https://github.com/Khan/perseus/pull/1550) [`7c5de59f2`](https://github.com/Khan/perseus/commit/7c5de59f25e77c8a5b6fd595647835b340c7aa3c) Thanks [@nishasy](https://github.com/nishasy)! - [Locked labels] Bugfix from merge conflict: Add back locked label settings

*   [#1549](https://github.com/Khan/perseus/pull/1549) [`cae713da5`](https://github.com/Khan/perseus/commit/cae713da54be20aba8150f98b8f99ade9c2a8bb7) Thanks [@aemandine](https://github.com/aemandine)! - Refactor PhET Sim widget name to PhET Simulation

*   Updated dependencies [[`cae713da5`](https://github.com/Khan/perseus/commit/cae713da54be20aba8150f98b8f99ade9c2a8bb7)]:
    -   @khanacademy/perseus@31.0.1

## 13.0.0

### Major Changes

-   [#1546](https://github.com/Khan/perseus/pull/1546) [`6cbe4947e`](https://github.com/Khan/perseus/commit/6cbe4947e441d0723bb333409752f8d66473af73) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Release PhET widget

    This PR releases a new PhET simulation widget to Perseus that requires an
    update in order to allow the support of new, upcoming content. Older versions
    of Perseus will be unable to render content that contains this widget.

    PhET simulations come from https://phet.colorado.edu/.

### Minor Changes

-   [#1539](https://github.com/Khan/perseus/pull/1539) [`7805626e1`](https://github.com/Khan/perseus/commit/7805626e10bde2d256d9523709fdba3267cea381) Thanks [@nishasy](https://github.com/nishasy)! - [Locked Labels] Implement adding/editing/deleting a standalone locked label

*   [#1542](https://github.com/Khan/perseus/pull/1542) [`a7fc2a3e3`](https://github.com/Khan/perseus/commit/a7fc2a3e3230ad695d3ab5fb8ff1dd9b40711250) Thanks [@aemandine](https://github.com/aemandine)! - Design update for PhET widget

-   [#1532](https://github.com/Khan/perseus/pull/1532) [`6e102f9c4`](https://github.com/Khan/perseus/commit/6e102f9c4d15b4b1a94a97b98684a1a997590121) Thanks [@aemandine](https://github.com/aemandine)! - Add a content editor for the PhET widget

*   [#1533](https://github.com/Khan/perseus/pull/1533) [`cc1995daf`](https://github.com/Khan/perseus/commit/cc1995dafaac637b035c71270e4d4e6f57a15e19) Thanks [@nishasy](https://github.com/nishasy)! - [Locked labels] View locked labels in an Interactive Graph

### Patch Changes

-   Updated dependencies [[`7805626e1`](https://github.com/Khan/perseus/commit/7805626e10bde2d256d9523709fdba3267cea381), [`0bf2711c0`](https://github.com/Khan/perseus/commit/0bf2711c02f8a383235a5d524b29bc184ced3aa1), [`a7fc2a3e3`](https://github.com/Khan/perseus/commit/a7fc2a3e3230ad695d3ab5fb8ff1dd9b40711250), [`4f24be79d`](https://github.com/Khan/perseus/commit/4f24be79d599a5fc53a14130d1cad86adb48cd2e), [`6cbe4947e`](https://github.com/Khan/perseus/commit/6cbe4947e441d0723bb333409752f8d66473af73), [`36471197c`](https://github.com/Khan/perseus/commit/36471197cc25d78b8f9515ba0da04875480c788d), [`6e102f9c4`](https://github.com/Khan/perseus/commit/6e102f9c4d15b4b1a94a97b98684a1a997590121), [`cc1995daf`](https://github.com/Khan/perseus/commit/cc1995dafaac637b035c71270e4d4e6f57a15e19)]:
    -   @khanacademy/perseus@31.0.0

## 12.0.1

### Patch Changes

-   [#1518](https://github.com/Khan/perseus/pull/1518) [`0667abecf`](https://github.com/Khan/perseus/commit/0667abecfc40990033ec46babf92f752e22c6444) Thanks [@handeyeco](https://github.com/handeyeco)! - Revert reorder of NumericInputEditor fields

-   Updated dependencies [[`e19c58eb9`](https://github.com/Khan/perseus/commit/e19c58eb9f0ef84c32dfdb40a4382cfa4c82392d), [`96f0337ce`](https://github.com/Khan/perseus/commit/96f0337ce459dea6a0860b45704e188876d38720), [`811f914cb`](https://github.com/Khan/perseus/commit/811f914cbded3a9a3af1c08cc6aa79cadb1dbb23)]:
    -   @khanacademy/kas@0.3.12
    -   @khanacademy/math-input@21.0.1
    -   @khanacademy/perseus@30.0.1

## 12.0.0

### Major Changes

-   [#1536](https://github.com/Khan/perseus/pull/1536) [`78a5558f9`](https://github.com/Khan/perseus/commit/78a5558f93c966a076a35b74c5c01d697408ce84) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Revert introduction of ContentPreview component (broke editor linting tooltip)"

### Patch Changes

-   Updated dependencies [[`78a5558f9`](https://github.com/Khan/perseus/commit/78a5558f93c966a076a35b74c5c01d697408ce84)]:
    -   @khanacademy/perseus@30.0.0

## 11.6.0

### Minor Changes

-   [#1521](https://github.com/Khan/perseus/pull/1521) [`a9292af78`](https://github.com/Khan/perseus/commit/a9292af78f569b703fcae07de01852f264861158) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add ContentPreview component

*   [#1517](https://github.com/Khan/perseus/pull/1517) [`93ad3c638`](https://github.com/Khan/perseus/commit/93ad3c638878d1238393c71703b63cef9b93871b) Thanks [@benchristel](https://github.com/benchristel)! - Replace the "(un)set as static" button in the widget editor with a toggle switch

### Patch Changes

-   [#1525](https://github.com/Khan/perseus/pull/1525) [`426a3ae1d`](https://github.com/Khan/perseus/commit/426a3ae1d5a7f0aef20ccea6b99ada6929e1abc4) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change PerseusItem to no longer include multi items

*   [#1526](https://github.com/Khan/perseus/pull/1526) [`487aa464a`](https://github.com/Khan/perseus/commit/487aa464ad450aa37ec2b8ef11596a585112a6fd) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Locked Figures] Add controls to move a whole locked polygon

*   Updated dependencies [[`426a3ae1d`](https://github.com/Khan/perseus/commit/426a3ae1d5a7f0aef20ccea6b99ada6929e1abc4), [`3e6a65378`](https://github.com/Khan/perseus/commit/3e6a6537842ce2659ff2a12523a75b41a90681e6), [`a9292af78`](https://github.com/Khan/perseus/commit/a9292af78f569b703fcae07de01852f264861158), [`da65a54a2`](https://github.com/Khan/perseus/commit/da65a54a2cadc381c19255e9c2a402ed74733449), [`250971357`](https://github.com/Khan/perseus/commit/25097135792ecb1b5679d6fc8b41dc0c5bb1da9b)]:
    -   @khanacademy/perseus@29.0.0

## 11.5.0

### Minor Changes

-   [#1515](https://github.com/Khan/perseus/pull/1515) [`ab19ffe0f`](https://github.com/Khan/perseus/commit/ab19ffe0f7a52d86fc6e7228c997c2cc8607ff0e) Thanks [@nishasy](https://github.com/nishasy)! - [Start Coords] Implement start coords UI for angle graphs

## 11.4.1

### Patch Changes

-   Updated dependencies [[`f08320034`](https://github.com/Khan/perseus/commit/f083200340545f41275f0696dbfc967f45028b0c), [`720e3bfd2`](https://github.com/Khan/perseus/commit/720e3bfd2d7f46fdbb25db2f561d0f519ae4c9b3), [`7eb7ab165`](https://github.com/Khan/perseus/commit/7eb7ab165e20af37ee10ad38c2bbef8538c79f08), [`84d9c62d2`](https://github.com/Khan/perseus/commit/84d9c62d2ae7b55680f2ef90c5915e7f7406020d)]:
    -   @khanacademy/perseus@28.2.0
    -   @khanacademy/math-input@21.0.0

## 11.4.0

### Minor Changes

-   [#1480](https://github.com/Khan/perseus/pull/1480) [`182c8f660`](https://github.com/Khan/perseus/commit/182c8f6600bbefa817c4553e3827498b8d425bbe) Thanks [@handeyeco](https://github.com/handeyeco)! - Refactor ExpressionEditor to use Wonder-Blocks

### Patch Changes

-   [#1509](https://github.com/Khan/perseus/pull/1509) [`76b55a9b3`](https://github.com/Khan/perseus/commit/76b55a9b3673a9f4aa072574afddb5312d7b06f5) Thanks [@nishasy](https://github.com/nishasy)! - [Start Coords] Fix the radius input in circle graph start coords UI

*   [#1490](https://github.com/Khan/perseus/pull/1490) [`c2464eef8`](https://github.com/Khan/perseus/commit/c2464eef807b0b1c2696e553300026462262544d) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Explicitly export bundled css in package.json

*   Updated dependencies [[`5b6b97641`](https://github.com/Khan/perseus/commit/5b6b976416f885c08bda2ead5948fcdbe94dc380), [`c2464eef8`](https://github.com/Khan/perseus/commit/c2464eef807b0b1c2696e553300026462262544d), [`182c8f660`](https://github.com/Khan/perseus/commit/182c8f6600bbefa817c4553e3827498b8d425bbe), [`3f18a2211`](https://github.com/Khan/perseus/commit/3f18a22118ad9b952009a78c30bb1c8242e81d9c), [`3f9cc14fe`](https://github.com/Khan/perseus/commit/3f9cc14fe469a6792b56edf2510f0adebd65fd73)]:
    -   @khanacademy/math-input@20.1.2
    -   @khanacademy/perseus@28.1.0

## 11.3.0

### Minor Changes

-   [#1493](https://github.com/Khan/perseus/pull/1493) [`de13fd337`](https://github.com/Khan/perseus/commit/de13fd3378cb078119f2b5311d347d4ee3b1d687) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Add/Edit/Delete Locked Function in Interactive Graph Editor

*   [#1492](https://github.com/Khan/perseus/pull/1492) [`2ebbc1978`](https://github.com/Khan/perseus/commit/2ebbc1978da4d021e7044ac49829063e356af846) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Build the foundation for adding start coords UI for angle graphs

-   [#1486](https://github.com/Khan/perseus/pull/1486) [`0b625f560`](https://github.com/Khan/perseus/commit/0b625f56098c4db142891ab4ffed2b2300924711) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Add start coords UI for point graphs

*   [#1488](https://github.com/Khan/perseus/pull/1488) [`0bec013e8`](https://github.com/Khan/perseus/commit/0bec013e89c70dd431f86b4872dd3378ed29e110) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Add start coords UI for polygon graphs (snap to grid only)

### Patch Changes

-   [#1491](https://github.com/Khan/perseus/pull/1491) [`395b44f29`](https://github.com/Khan/perseus/commit/395b44f2999ede7fcb968284a949a1e4fdd87200) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Correct flag logic for polygon graph start coords UI

*   [#1476](https://github.com/Khan/perseus/pull/1476) [`18f38fca4`](https://github.com/Khan/perseus/commit/18f38fca404678ff6162df09355acb072a1e6120) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Miscellaneous type improvements

-   [#1479](https://github.com/Khan/perseus/pull/1479) [`ef96cdd54`](https://github.com/Khan/perseus/commit/ef96cdd541999a203cbde089c76cc132b937adce) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove PropCheckBox component from Perseus; use WB instead

*   [#1489](https://github.com/Khan/perseus/pull/1489) [`de2883b3f`](https://github.com/Khan/perseus/commit/de2883b3fdc7a6e294c39b33cd2989aed75cd969) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Correct `hints` type on ItemRenderer

-   [#1478](https://github.com/Khan/perseus/pull/1478) [`7fd586ef4`](https://github.com/Khan/perseus/commit/7fd586ef4a36c753bb57f1f0eb0c0f98afe8fa0d) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Add "white" as a fill option for locked ellipses and polygons

*   [#1482](https://github.com/Khan/perseus/pull/1482) [`f920a4cc7`](https://github.com/Khan/perseus/commit/f920a4cc7f0e8e8072ee55598e8e13698d6dc2cf) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor: Storybook] Add a story for Point graph type start coords

-   [#1471](https://github.com/Khan/perseus/pull/1471) [`b4e0b60dc`](https://github.com/Khan/perseus/commit/b4e0b60dce773f5bcd5c49ce2f2a47cfd74024ae) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Fix the dropdowns overlapping labels in locked figures settings

*   [#1481](https://github.com/Khan/perseus/pull/1481) [`a35be719f`](https://github.com/Khan/perseus/commit/a35be719fdf177ea3a028679d518c5da1535ee23) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Stop page scrolling on number text field focused scroll

-   [#1484](https://github.com/Khan/perseus/pull/1484) [`808956098`](https://github.com/Khan/perseus/commit/808956098d9502cff4d9759ee07d6dcaa61a83ab) Thanks [@handeyeco](https://github.com/handeyeco)! - Minor cleanup around InfoTip

*   [#1477](https://github.com/Khan/perseus/pull/1477) [`653b520c6`](https://github.com/Khan/perseus/commit/653b520c6fa4f184657ca8f63d6658aaa42235da) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Migrate ItemExtrasEditor to WB checkboxes

*   Updated dependencies [[`a8aaac339`](https://github.com/Khan/perseus/commit/a8aaac33921f31c65e8cb02c0eb66d15fc4f019e), [`de13fd337`](https://github.com/Khan/perseus/commit/de13fd3378cb078119f2b5311d347d4ee3b1d687), [`8b0268215`](https://github.com/Khan/perseus/commit/8b02682152223982f80e7bee38e9567027b8ed4e), [`2ebbc1978`](https://github.com/Khan/perseus/commit/2ebbc1978da4d021e7044ac49829063e356af846), [`6c6ff52f4`](https://github.com/Khan/perseus/commit/6c6ff52f4725ff78f50bd6ca71f201a6c9ab786b), [`18f38fca4`](https://github.com/Khan/perseus/commit/18f38fca404678ff6162df09355acb072a1e6120), [`ef96cdd54`](https://github.com/Khan/perseus/commit/ef96cdd541999a203cbde089c76cc132b937adce), [`342a72211`](https://github.com/Khan/perseus/commit/342a722119f549f20e71ff1e44d2bba6c44c9ba3), [`de2883b3f`](https://github.com/Khan/perseus/commit/de2883b3fdc7a6e294c39b33cd2989aed75cd969), [`7fd586ef4`](https://github.com/Khan/perseus/commit/7fd586ef4a36c753bb57f1f0eb0c0f98afe8fa0d), [`f920a4cc7`](https://github.com/Khan/perseus/commit/f920a4cc7f0e8e8072ee55598e8e13698d6dc2cf), [`eb9f3f9c0`](https://github.com/Khan/perseus/commit/eb9f3f9c064e6b6260bd667222f7370aae263715), [`4c2ace57a`](https://github.com/Khan/perseus/commit/4c2ace57a922a527579293c065f8ed8120193344), [`53031f8df`](https://github.com/Khan/perseus/commit/53031f8df120a7ea15b6d82e5a94988d9281a9b3), [`808956098`](https://github.com/Khan/perseus/commit/808956098d9502cff4d9759ee07d6dcaa61a83ab), [`5e66539e6`](https://github.com/Khan/perseus/commit/5e66539e6a3edfd784041c5ba2b17135eafebe1b), [`0b625f560`](https://github.com/Khan/perseus/commit/0b625f56098c4db142891ab4ffed2b2300924711), [`6a218bcc1`](https://github.com/Khan/perseus/commit/6a218bcc1a7757dd93c1b90dfc03bd1c3715c8c8), [`0bec013e8`](https://github.com/Khan/perseus/commit/0bec013e89c70dd431f86b4872dd3378ed29e110)]:
    -   @khanacademy/perseus@28.0.0
    -   @khanacademy/math-input@20.1.1

## 11.2.0

### Minor Changes

-   [#1468](https://github.com/Khan/perseus/pull/1468) [`af68a9e08`](https://github.com/Khan/perseus/commit/af68a9e082f7b042aeb516ddba38274fcc66c4fc) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Add start coords UI for sinusoid graphs

*   [#1469](https://github.com/Khan/perseus/pull/1469) [`6e1ec850c`](https://github.com/Khan/perseus/commit/6e1ec850c7efb186444dcd9023e2a2c37cd731d2) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Add start coords UI for quadratic graphs

### Patch Changes

-   [#1470](https://github.com/Khan/perseus/pull/1470) [`942b0a9a5`](https://github.com/Khan/perseus/commit/942b0a9a5c42b92137a024b3c76ba8e99df55440) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Locked Figures] Remove m2 flag from the code

*   [#1465](https://github.com/Khan/perseus/pull/1465) [`94ad04fee`](https://github.com/Khan/perseus/commit/94ad04fee00ae4601ed5d23a19bfeb9f68964c74) Thanks [@nishasy](https://github.com/nishasy)! - [Hint Mode: Start Coords] Add separate flags for graph types

*   Updated dependencies [[`af68a9e08`](https://github.com/Khan/perseus/commit/af68a9e082f7b042aeb516ddba38274fcc66c4fc), [`942b0a9a5`](https://github.com/Khan/perseus/commit/942b0a9a5c42b92137a024b3c76ba8e99df55440), [`6e1ec850c`](https://github.com/Khan/perseus/commit/6e1ec850c7efb186444dcd9023e2a2c37cd731d2), [`94ad04fee`](https://github.com/Khan/perseus/commit/94ad04fee00ae4601ed5d23a19bfeb9f68964c74), [`ed6737025`](https://github.com/Khan/perseus/commit/ed67370251d2ebff672423b8e4da839c9dfb78c7)]:
    -   @khanacademy/perseus@27.2.0

## 11.1.0

### Minor Changes

-   [#1453](https://github.com/Khan/perseus/pull/1453) [`79a09d62f`](https://github.com/Khan/perseus/commit/79a09d62f532fd3373fea4838c0d72812de14046) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Implement the UI for adding start coords for circle graphs

*   [#1404](https://github.com/Khan/perseus/pull/1404) [`284e068b8`](https://github.com/Khan/perseus/commit/284e068b8e3bfb1f9ab49d84d209c5f9ef2d93c1) Thanks [@handeyeco](https://github.com/handeyeco)! - Add label options for Expression

### Patch Changes

-   [#1463](https://github.com/Khan/perseus/pull/1463) [`0a118ca38`](https://github.com/Khan/perseus/commit/0a118ca3869110fb8d4cb44a5cce89453d7e4e8a) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor - Storybook] Fix broken default and controlled stories

-   Updated dependencies [[`79a09d62f`](https://github.com/Khan/perseus/commit/79a09d62f532fd3373fea4838c0d72812de14046), [`284e068b8`](https://github.com/Khan/perseus/commit/284e068b8e3bfb1f9ab49d84d209c5f9ef2d93c1)]:
    -   @khanacademy/perseus@27.1.0
    -   @khanacademy/math-input@20.1.0

## 11.0.2

### Patch Changes

-   Updated dependencies [[`2e8022adb`](https://github.com/Khan/perseus/commit/2e8022adb11a000fb77528b1268ad5725dec817b)]:
    -   @khanacademy/math-input@20.0.3
    -   @khanacademy/perseus@27.0.2

## 11.0.1

### Patch Changes

-   Updated dependencies [[`be40d776a`](https://github.com/Khan/perseus/commit/be40d776a5ee6bbf4c5af4df57889a32e9b8b3bf), [`ca31afb35`](https://github.com/Khan/perseus/commit/ca31afb359cc00035a4af965f19d20d7919a14a5)]:
    -   @khanacademy/perseus@27.0.1
    -   @khanacademy/kas@0.3.11

## 11.0.0

### Major Changes

-   [#1456](https://github.com/Khan/perseus/pull/1456) [`b868801fa`](https://github.com/Khan/perseus/commit/b868801fab4ea28930f21be12d671e63f79b50ab) Thanks [@benchristel](https://github.com/benchristel)! - Remove unused "Show ruler" option from the interactive graph editor. The
    new Mafs version of the interactive graph does not implement the ruler,
    and we have no plans to implement it, since it can't be made accessible
    and isn't used in Khan Academy's existing content.

*   [#1450](https://github.com/Khan/perseus/pull/1450) [`2216ad012`](https://github.com/Khan/perseus/commit/2216ad012668a5627c1ff3934bf600cc0788e335) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove Unit aka UnitInput widget

### Minor Changes

-   [#1422](https://github.com/Khan/perseus/pull/1422) [`c386515ad`](https://github.com/Khan/perseus/commit/c386515ad52eef657f41ba7039614bc96e96e024) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Segment and Linear System graph start coords UI

### Patch Changes

-   [#1446](https://github.com/Khan/perseus/pull/1446) [`4985d2d4c`](https://github.com/Khan/perseus/commit/4985d2d4ce0a82f5dbcc3209067f75b34fd173bc) Thanks [@nishasy](https://github.com/nishasy)! - Rename StartCoordSettings to StartCoordsSettings

*   [#1448](https://github.com/Khan/perseus/pull/1448) [`84675574c`](https://github.com/Khan/perseus/commit/84675574c95341d422eda61867e745627b76d349) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Refactor and clean up start coords UI implementation

*   Updated dependencies [[`b868801fa`](https://github.com/Khan/perseus/commit/b868801fab4ea28930f21be12d671e63f79b50ab), [`84675574c`](https://github.com/Khan/perseus/commit/84675574c95341d422eda61867e745627b76d349), [`7e71f8e8a`](https://github.com/Khan/perseus/commit/7e71f8e8a114d80ad7d26f478c31149d9009a9e5), [`9bc4812fc`](https://github.com/Khan/perseus/commit/9bc4812fcfb3a08a083124e56f9378e8aefbc8ef), [`130ab9446`](https://github.com/Khan/perseus/commit/130ab94465da943c1582851122a409d72c6a96e1), [`9bc264ce1`](https://github.com/Khan/perseus/commit/9bc264ce10dc8a6c0a26b26e7568f4cd3c2bd4fe), [`bb1ac584b`](https://github.com/Khan/perseus/commit/bb1ac584b35e6c85284472d796bc4a4345349628), [`2216ad012`](https://github.com/Khan/perseus/commit/2216ad012668a5627c1ff3934bf600cc0788e335), [`7a448e77c`](https://github.com/Khan/perseus/commit/7a448e77c18d9c8437c24e6567f1e4fa03efc6b9), [`c386515ad`](https://github.com/Khan/perseus/commit/c386515ad52eef657f41ba7039614bc96e96e024)]:
    -   @khanacademy/perseus@27.0.0
    -   @khanacademy/math-input@20.0.2

## 10.0.0

### Major Changes

-   [#1435](https://github.com/Khan/perseus/pull/1435) [`364ccbecc`](https://github.com/Khan/perseus/commit/364ccbecc390981090f723fac116338888f295e9) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove StatefulArticleEditor

### Minor Changes

-   [#1431](https://github.com/Khan/perseus/pull/1431) [`83bebcfaf`](https://github.com/Khan/perseus/commit/83bebcfafb7691475dda6a34aa4c92156d56a6e4) Thanks [@benchristel](https://github.com/benchristel)! - Add a `hintMode` prop to `Renderer` and widgets.

### Patch Changes

-   Updated dependencies [[`fedac0be5`](https://github.com/Khan/perseus/commit/fedac0be518bb51345c82599b3d6729b52703961), [`83bebcfaf`](https://github.com/Khan/perseus/commit/83bebcfafb7691475dda6a34aa4c92156d56a6e4)]:
    -   @khanacademy/math-input@20.0.1
    -   @khanacademy/perseus@26.1.0

## 9.0.0

### Major Changes

-   [#1064](https://github.com/Khan/perseus/pull/1064) [`c6a5cbe13`](https://github.com/Khan/perseus/commit/c6a5cbe13c5b586f7511e2c9cc3392d180b002df) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - React 18

### Patch Changes

-   [#1421](https://github.com/Khan/perseus/pull/1421) [`9a3bce37f`](https://github.com/Khan/perseus/commit/9a3bce37fe0d4718638b2571fab7081217b9f6cc) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Enhance types in tests using @testing-library/user-event

-   Updated dependencies [[`4b6fc712e`](https://github.com/Khan/perseus/commit/4b6fc712ea259eba4482480796a8b46602cb0ec1), [`9a3bce37f`](https://github.com/Khan/perseus/commit/9a3bce37fe0d4718638b2571fab7081217b9f6cc), [`c6a5cbe13`](https://github.com/Khan/perseus/commit/c6a5cbe13c5b586f7511e2c9cc3392d180b002df), [`c6a5cbe13`](https://github.com/Khan/perseus/commit/c6a5cbe13c5b586f7511e2c9cc3392d180b002df)]:
    -   @khanacademy/perseus@26.0.0
    -   @khanacademy/math-input@20.0.0

## 8.2.0

### Minor Changes

-   [#1416](https://github.com/Khan/perseus/pull/1416) [`daa3082d3`](https://github.com/Khan/perseus/commit/daa3082d37b6a1a86847a39e44940faf85ce61a2) Thanks [@nicolecomputer](https://github.com/nicolecomputer)! - Organizes the graph editor

### Patch Changes

-   Updated dependencies [[`c41662717`](https://github.com/Khan/perseus/commit/c41662717e5ee795bce17d4fe283ceeb6ff6620f), [`3ff40dd23`](https://github.com/Khan/perseus/commit/3ff40dd23396771be7dbdd1d549a2dc730a5cac4), [`a8eb6908b`](https://github.com/Khan/perseus/commit/a8eb6908b07c37771dc2b011f76e8ae4855c3479), [`a9dbbc4b1`](https://github.com/Khan/perseus/commit/a9dbbc4b1d6ada81f22b5466df86436e8d773921)]:
    -   @khanacademy/perseus@25.1.1

## 8.1.0

### Minor Changes

-   [#1382](https://github.com/Khan/perseus/pull/1382) [`f392dcfba`](https://github.com/Khan/perseus/commit/f392dcfba515ac27ccaa465c2ca89bef63330837) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Implement UI to edit start coordinates for linear and ray graphs

### Patch Changes

-   Updated dependencies [[`f392dcfba`](https://github.com/Khan/perseus/commit/f392dcfba515ac27ccaa465c2ca89bef63330837)]:
    -   @khanacademy/perseus@25.1.0

## 8.0.0

### Major Changes

-   [#1411](https://github.com/Khan/perseus/pull/1411) [`b0df85a80`](https://github.com/Khan/perseus/commit/b0df85a803444a5de1f74672c5f0f5ccc3aa5617) Thanks [@handeyeco](https://github.com/handeyeco)! - Consolidate PerseusError code and move it into perseus-core (deletes the perseus-error package)

### Patch Changes

-   [#1405](https://github.com/Khan/perseus/pull/1405) [`a430de4c1`](https://github.com/Khan/perseus/commit/a430de4c1727afc9a71ff5a6f976579e8b17b754) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Fix console errors and warnings printed in tests

-   Updated dependencies [[`a430de4c1`](https://github.com/Khan/perseus/commit/a430de4c1727afc9a71ff5a6f976579e8b17b754), [`fa19dbc97`](https://github.com/Khan/perseus/commit/fa19dbc9791e95143f6c7c784bc78332ab5cd5b0), [`be7f14153`](https://github.com/Khan/perseus/commit/be7f141536b6ed69bba8a4378a1ddae51fd5307e), [`147ab0442`](https://github.com/Khan/perseus/commit/147ab0442cc31a86553edc8535e228b5893a0acc), [`8ae3d18f1`](https://github.com/Khan/perseus/commit/8ae3d18f102c0bfc13c41c77c1ca4083e00f1dc7), [`b0df85a80`](https://github.com/Khan/perseus/commit/b0df85a803444a5de1f74672c5f0f5ccc3aa5617), [`f5711a331`](https://github.com/Khan/perseus/commit/f5711a331f6fce02d8c5f753e752fd8665b90344), [`3108f933e`](https://github.com/Khan/perseus/commit/3108f933eb527b37dc4d02f3cab189c047548a11), [`e6424d5e7`](https://github.com/Khan/perseus/commit/e6424d5e72c37a9c4c3b595855071a2d0af43d35)]:
    -   @khanacademy/perseus@25.0.0
    -   @khanacademy/kas@0.3.10
    -   @khanacademy/kmath@0.1.13
    -   @khanacademy/math-input@19.2.1
    -   @khanacademy/perseus-core@1.5.0

## 7.0.3

### Patch Changes

-   [#1383](https://github.com/Khan/perseus/pull/1383) [`4b56e10de`](https://github.com/Khan/perseus/commit/4b56e10dedc9b1ddc82bf7e7406ffdaecdef7462) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - View Locked Functions in the Interactive Graph

*   [#1390](https://github.com/Khan/perseus/pull/1390) [`7e6ccf38d`](https://github.com/Khan/perseus/commit/7e6ccf38da2f385cbd7a1db4cf81f858997ffba8) Thanks [@benchristel](https://github.com/benchristel)! - Internal: Move graphing-agnostic, mathy functions in the interactive graph code to a math/ folder.

-   [#1392](https://github.com/Khan/perseus/pull/1392) [`b710d07db`](https://github.com/Khan/perseus/commit/b710d07db18579b36a5bfd448c2d0aa9144d5ac4) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Creation of new angle graph for Mafs interactive graph widget

-   Updated dependencies [[`4b56e10de`](https://github.com/Khan/perseus/commit/4b56e10dedc9b1ddc82bf7e7406ffdaecdef7462), [`7e6ccf38d`](https://github.com/Khan/perseus/commit/7e6ccf38da2f385cbd7a1db4cf81f858997ffba8), [`5de483386`](https://github.com/Khan/perseus/commit/5de483386693884ccdef22b9740582e6098a5baa), [`b710d07db`](https://github.com/Khan/perseus/commit/b710d07db18579b36a5bfd448c2d0aa9144d5ac4)]:
    -   @khanacademy/perseus@24.3.0
    -   @khanacademy/math-input@19.2.0

## 7.0.2

### Patch Changes

-   [#1385](https://github.com/Khan/perseus/pull/1385) [`30f898c44`](https://github.com/Khan/perseus/commit/30f898c44954cf6f1d3d99038f476bd2038cb7c4) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Remove the use of graphKey for remounting

-   Updated dependencies [[`5fdbeb980`](https://github.com/Khan/perseus/commit/5fdbeb980880f9239696633934c2bd95b4931db6), [`94067d752`](https://github.com/Khan/perseus/commit/94067d7522a2ffcb04d213e1ebdb4a96cc0414bc)]:
    -   @khanacademy/perseus@24.2.0

## 7.0.1

### Patch Changes

-   [#1375](https://github.com/Khan/perseus/pull/1375) [`a8b3aa9c0`](https://github.com/Khan/perseus/commit/a8b3aa9c0098e515d304ee5e4eb5d6b01ba96fcd) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Fix the broken storybook preview for segments, points, and polygons

*   [#1379](https://github.com/Khan/perseus/pull/1379) [`685fa9048`](https://github.com/Khan/perseus/commit/685fa904815926cfd75105476df63ce76d4f00ae) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Moving around/renaming components so they make more sense for the upcoming hint mode work

*   Updated dependencies [[`3ee100add`](https://github.com/Khan/perseus/commit/3ee100add8e25da442edccfbde458f270c282112), [`93eeda1e2`](https://github.com/Khan/perseus/commit/93eeda1e2e45345a622f9866bcfd31a27d717e3f), [`685fa9048`](https://github.com/Khan/perseus/commit/685fa904815926cfd75105476df63ce76d4f00ae), [`48e879ace`](https://github.com/Khan/perseus/commit/48e879acee304cac48d67bb0030ac2fc8dc00a50), [`26dceb8d7`](https://github.com/Khan/perseus/commit/26dceb8d7ada9b6f3c47893d8dfaccdbeb3df980)]:
    -   @khanacademy/perseus@24.1.0

## 7.0.0

### Major Changes

-   [#1371](https://github.com/Khan/perseus/pull/1371) [`ba5f33460`](https://github.com/Khan/perseus/commit/ba5f33460d6d5131f95955abae135c9ee138c858) Thanks [@anakaren-rojas](https://github.com/anakaren-rojas)! - update attributes for expression widget button

### Patch Changes

-   [#1373](https://github.com/Khan/perseus/pull/1373) [`961510673`](https://github.com/Khan/perseus/commit/96151067381fbfbb9ec325ac6b921ba2830cc344) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] Update the interactive graph builder with all currently migrated graph types

-   Updated dependencies [[`35651e097`](https://github.com/Khan/perseus/commit/35651e09710f47d978be03270ba4011ff2dbe591), [`961510673`](https://github.com/Khan/perseus/commit/96151067381fbfbb9ec325ac6b921ba2830cc344), [`ba5f33460`](https://github.com/Khan/perseus/commit/ba5f33460d6d5131f95955abae135c9ee138c858)]:
    -   @khanacademy/perseus@24.0.0

## 6.12.0

### Minor Changes

-   [#1360](https://github.com/Khan/perseus/pull/1360) [`753d6eafe`](https://github.com/Khan/perseus/commit/753d6eafe9f18dd1ae00b4a092e765972a514370) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Add the ability to reorder locked figure settings

*   [#1357](https://github.com/Khan/perseus/pull/1357) [`a60809858`](https://github.com/Khan/perseus/commit/a60809858f88ec6403c442e434aac98ecc6b6056) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] UI for adding/editing/deleting a locked polygon

### Patch Changes

-   [#1365](https://github.com/Khan/perseus/pull/1365) [`33adc625e`](https://github.com/Khan/perseus/commit/33adc625edae89540be22939cc0eea1cd573a46a) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Put the action buttons behind the m2 flag

*   [#1368](https://github.com/Khan/perseus/pull/1368) [`86f94e126`](https://github.com/Khan/perseus/commit/86f94e126cedfc9d6c61735054c0d2bb619bc633) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Organize locked figures within Interactive Graph into their own folders for better organization

-   [#1366](https://github.com/Khan/perseus/pull/1366) [`1351ca38b`](https://github.com/Khan/perseus/commit/1351ca38b46901d1571d1c06a8234546560acc39) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Add the M2b flag in preparation for locked graphs, labels, and polygon markings.

*   [#1372](https://github.com/Khan/perseus/pull/1372) [`8cbfeba12`](https://github.com/Khan/perseus/commit/8cbfeba12afea524d442a881e46ec8b76a62c134) Thanks [@nishasy](https://github.com/nishasy)! - [Storybook: Editor Page] Add a storybook-only preview for the questions and hints in the EditorPage component

*   Updated dependencies [[`e5a2dd874`](https://github.com/Khan/perseus/commit/e5a2dd8747f3d2691161874923dbac9b4366d654), [`86f94e126`](https://github.com/Khan/perseus/commit/86f94e126cedfc9d6c61735054c0d2bb619bc633), [`753d6eafe`](https://github.com/Khan/perseus/commit/753d6eafe9f18dd1ae00b4a092e765972a514370), [`4bb2b8742`](https://github.com/Khan/perseus/commit/4bb2b8742c7396d212734aee34b5d64320ae1b18), [`e5a54d805`](https://github.com/Khan/perseus/commit/e5a54d805e8ec09b4641fbee8bc120e173a14ba6), [`c6c5064da`](https://github.com/Khan/perseus/commit/c6c5064da1f9e6a18c4cc49be073a198bcfb3be8), [`1351ca38b`](https://github.com/Khan/perseus/commit/1351ca38b46901d1571d1c06a8234546560acc39), [`a60809858`](https://github.com/Khan/perseus/commit/a60809858f88ec6403c442e434aac98ecc6b6056)]:
    -   @khanacademy/perseus@23.6.0

## 6.11.0

### Minor Changes

-   [#1348](https://github.com/Khan/perseus/pull/1348) [`73ba4f7c9`](https://github.com/Khan/perseus/commit/73ba4f7c9d502e0598617cc4c1710df5c10b086b) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Update the locked ellipse settings so they only take degrees as input.

*   [#1353](https://github.com/Khan/perseus/pull/1353) [`e528c5b2b`](https://github.com/Khan/perseus/commit/e528c5b2b763e6a2ad8fbef31cd98f1f991a354d) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph] View a locked polygon

-   [#1351](https://github.com/Khan/perseus/pull/1351) [`9a6517ca2`](https://github.com/Khan/perseus/commit/9a6517ca22857921acdbf206c7c21d989cccdf86) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Add blue and gold to locked figures colorset

*   [#1354](https://github.com/Khan/perseus/pull/1354) [`e73373f48`](https://github.com/Khan/perseus/commit/e73373f48a4cc65dedf5f7c591fcfc6cce8f08c7) Thanks [@Myranae](https://github.com/Myranae)! - Fix interactive graph editor in storybook to display and persist options

### Patch Changes

-   [#1350](https://github.com/Khan/perseus/pull/1350) [`1e877c6d4`](https://github.com/Khan/perseus/commit/1e877c6d44a0de351bfbfa5716391b6522bebbeb) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Add locked vector to storybook story for all locked figures

-   Updated dependencies [[`1e877c6d4`](https://github.com/Khan/perseus/commit/1e877c6d44a0de351bfbfa5716391b6522bebbeb), [`92990f15f`](https://github.com/Khan/perseus/commit/92990f15f4eb020cd079b0eaa607cc8e086acec9), [`73ba4f7c9`](https://github.com/Khan/perseus/commit/73ba4f7c9d502e0598617cc4c1710df5c10b086b), [`e528c5b2b`](https://github.com/Khan/perseus/commit/e528c5b2b763e6a2ad8fbef31cd98f1f991a354d), [`9a6517ca2`](https://github.com/Khan/perseus/commit/9a6517ca22857921acdbf206c7c21d989cccdf86)]:
    -   @khanacademy/perseus@23.5.0

## 6.10.0

### Minor Changes

-   [#1344](https://github.com/Khan/perseus/pull/1344) [`3ce606e8c`](https://github.com/Khan/perseus/commit/3ce606e8c18c8be8e515d12a0c70c40235abae07) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Revert usage of min and max in range inputs for locked figures UI

*   [#1330](https://github.com/Khan/perseus/pull/1330) [`1df3824ab`](https://github.com/Khan/perseus/commit/1df3824ab72b121bdebe4d67ca667e5349f0e843) Thanks [@Myranae](https://github.com/Myranae)! - Implement the "angles" snapTo type for Polygon interactive graphs

### Patch Changes

-   [#1335](https://github.com/Khan/perseus/pull/1335) [`7927487c9`](https://github.com/Khan/perseus/commit/7927487c9a0430aeb4ddc1be2b19bc9fdce210c7) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Minor refactor - remove unnecessary uses of useUniqueIdWithMock

*   [#1349](https://github.com/Khan/perseus/pull/1349) [`56b2b9f58`](https://github.com/Khan/perseus/commit/56b2b9f58ee44fd2fd297cb53b9ad1495972bf55) Thanks [@nishasy](https://github.com/nishasy)! - Update to Wonder Blocks Form 4.7.1

*   Updated dependencies [[`50c8233ee`](https://github.com/Khan/perseus/commit/50c8233eec4faf3c001a6ce73b3053fa28135961), [`56b2b9f58`](https://github.com/Khan/perseus/commit/56b2b9f58ee44fd2fd297cb53b9ad1495972bf55), [`509542a3b`](https://github.com/Khan/perseus/commit/509542a3bb155f3828bd9596858b0a7c46a98319), [`bfb294453`](https://github.com/Khan/perseus/commit/bfb2944530a47fb4ae8d13a5ee218feebec023d9), [`1df3824ab`](https://github.com/Khan/perseus/commit/1df3824ab72b121bdebe4d67ca667e5349f0e843), [`4910b2ec3`](https://github.com/Khan/perseus/commit/4910b2ec3385c7d96bab5172a697722ce31f9339), [`7a530de8d`](https://github.com/Khan/perseus/commit/7a530de8df3d7edf709b4c4e42843b295f8e73bc), [`970f94119`](https://github.com/Khan/perseus/commit/970f941197bea8f9eabfe31020160dc3cbfb204d)]:
    -   @khanacademy/perseus@23.4.0

## 6.9.0

### Minor Changes

-   [#1333](https://github.com/Khan/perseus/pull/1333) [`7ccb70c12`](https://github.com/Khan/perseus/commit/7ccb70c126a3ab54e5a4dc1264793ccb2577c913) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Remove m1 flag from the code, and put locked vector and locked ellipse UI behind the m2 flag.

### Patch Changes

-   Updated dependencies [[`7ccb70c12`](https://github.com/Khan/perseus/commit/7ccb70c126a3ab54e5a4dc1264793ccb2577c913)]:
    -   @khanacademy/perseus@23.3.0

## 6.8.0

### Minor Changes

-   [#1326](https://github.com/Khan/perseus/pull/1326) [`322e7eaf7`](https://github.com/Khan/perseus/commit/322e7eaf769574e8fb046a81696b7e580d2ad0af) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Implement "Add locked ellipse" UI

*   [#1332](https://github.com/Khan/perseus/pull/1332) [`f94d98468`](https://github.com/Khan/perseus/commit/f94d98468d2ee94cf6a83f43a39ed563249beee3) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Switch from locked circles to locked ellipses

### Patch Changes

-   [#1329](https://github.com/Khan/perseus/pull/1329) [`aaa3026ef`](https://github.com/Khan/perseus/commit/aaa3026ef3ba58d0adb059c1e9043af30c3e1b8b) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Ensuring that Ray and Linear graphs have consistent types to solve bug crashing content editor.

*   [#1322](https://github.com/Khan/perseus/pull/1322) [`de6e421d9`](https://github.com/Khan/perseus/commit/de6e421d9e41a86c394fa836ec068f554af085d4) Thanks [@nishasy](https://github.com/nishasy)! - [Perseus Editor package] udpate Wonder Blocks Form dependency

-   [#1321](https://github.com/Khan/perseus/pull/1321) [`6d9b9cbb3`](https://github.com/Khan/perseus/commit/6d9b9cbb3e59ac4185dc5fe78265c117a61d3851) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Add ability to view a locked vector in Interactive Graph

*   [#1327](https://github.com/Khan/perseus/pull/1327) [`bb8def7ab`](https://github.com/Khan/perseus/commit/bb8def7abe7009e37fd5d3f53d61a3ca23de903a) Thanks [@mark-fitzgerald](https://github.com/mark-fitzgerald)! - Add/Edit Locked Vector for Interactive Graph

*   Updated dependencies [[`e5afe4b27`](https://github.com/Khan/perseus/commit/e5afe4b27be0d83c22b7129dfc566ae0998eac38), [`aaa3026ef`](https://github.com/Khan/perseus/commit/aaa3026ef3ba58d0adb059c1e9043af30c3e1b8b), [`676f6f400`](https://github.com/Khan/perseus/commit/676f6f4001b13001083827cc75a36d28a4b5fb3a), [`6d9b9cbb3`](https://github.com/Khan/perseus/commit/6d9b9cbb3e59ac4185dc5fe78265c117a61d3851), [`f153e2924`](https://github.com/Khan/perseus/commit/f153e2924b057e1b6238bc41b83da5c7d1bb3d74), [`322e7eaf7`](https://github.com/Khan/perseus/commit/322e7eaf769574e8fb046a81696b7e580d2ad0af), [`f94d98468`](https://github.com/Khan/perseus/commit/f94d98468d2ee94cf6a83f43a39ed563249beee3)]:
    -   @khanacademy/perseus@23.2.0

## 6.7.0

### Minor Changes

-   [#1315](https://github.com/Khan/perseus/pull/1315) [`73e5828a5`](https://github.com/Khan/perseus/commit/73e5828a5ee219435187402f4942dab32fefc2c4) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Creation of the new Mafs-based Sinusoid Graph

### Patch Changes

-   Updated dependencies [[`57e72b8d5`](https://github.com/Khan/perseus/commit/57e72b8d5bdb146de52b0bb9f3a206ce7d2fa8a5), [`73e5828a5`](https://github.com/Khan/perseus/commit/73e5828a5ee219435187402f4942dab32fefc2c4), [`c8422cd99`](https://github.com/Khan/perseus/commit/c8422cd99bf3c09b66b602c77240262d1ca68533)]:
    -   @khanacademy/perseus@23.1.0

## 6.6.0

### Minor Changes

-   [#1298](https://github.com/Khan/perseus/pull/1298) [`b84e4a981`](https://github.com/Khan/perseus/commit/b84e4a981202efd4394d75e50fa48b90f92ebd31) Thanks [@nishasy](https://github.com/nishasy)! - [Interactive Graph Editor] Setting a locked line's length to 0 (equal points) will stop the exercise from saving via getSaveWarnings()

*   [#1305](https://github.com/Khan/perseus/pull/1305) [`ec600a11e`](https://github.com/Khan/perseus/commit/ec600a11e22420005fbf35157a46e890e6b0d488) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Creation of the new Mafs-based Quadratic Graph for the Interactive Graph Widget

### Patch Changes

-   [#1301](https://github.com/Khan/perseus/pull/1301) [`1ca5a12aa`](https://github.com/Khan/perseus/commit/1ca5a12aaea6ec2cd06f778981303e2da7b5889f) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove duplicate `Empty` type

-   Updated dependencies [[`1ca5a12aa`](https://github.com/Khan/perseus/commit/1ca5a12aaea6ec2cd06f778981303e2da7b5889f), [`3b85777c7`](https://github.com/Khan/perseus/commit/3b85777c7b2b970121a9c5242d34a2f9cdd2319b), [`ec600a11e`](https://github.com/Khan/perseus/commit/ec600a11e22420005fbf35157a46e890e6b0d488), [`925f4ee03`](https://github.com/Khan/perseus/commit/925f4ee037e7130b73b471c211050adfd7d44d00), [`1ca5a12aa`](https://github.com/Khan/perseus/commit/1ca5a12aaea6ec2cd06f778981303e2da7b5889f), [`e6fc912bf`](https://github.com/Khan/perseus/commit/e6fc912bf907477efeb4c5989fb17b5b1e2a99e8)]:
    -   @khanacademy/perseus@23.0.0

## 6.5.1

### Patch Changes

-   Updated dependencies [[`9426dee46`](https://github.com/Khan/perseus/commit/9426dee4608b43f8b6b9ea189b0bc81105b73fa7), [`49baacd04`](https://github.com/Khan/perseus/commit/49baacd04b981eaa46d1b42af8952ff899152f1d), [`364e67884`](https://github.com/Khan/perseus/commit/364e678845a0a02e271f7666e204b12a46f81fa7)]:
    -   @khanacademy/perseus@22.7.0

## 6.5.0

### Minor Changes

-   [#1277](https://github.com/Khan/perseus/pull/1277) [`f8539c880`](https://github.com/Khan/perseus/commit/f8539c880f194bcf35174aa7ab8eef0c72889f53) Thanks [@nishasy](https://github.com/nishasy)! - Shows error in the editor if locked line has length 0

*   [#1284](https://github.com/Khan/perseus/pull/1284) [`8534a9f01`](https://github.com/Khan/perseus/commit/8534a9f017a9a5404201c2459fabe91a83d6709f) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add ToggleableCaret component and use in TexErrorView

### Patch Changes

-   [#1287](https://github.com/Khan/perseus/pull/1287) [`d9b51dcc0`](https://github.com/Khan/perseus/commit/d9b51dcc00a9280705483269c91c9d67b90351ec) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Interactive Graph Editor: Make the common graph settings a collapsable panel

*   [#1278](https://github.com/Khan/perseus/pull/1278) [`fffd130db`](https://github.com/Khan/perseus/commit/fffd130db2eff64a06d3f6635f4588e110bdba5b) Thanks [@nishasy](https://github.com/nishasy)! - Nit: put the line kind dropdown options in alphabetical order

-   [#1280](https://github.com/Khan/perseus/pull/1280) [`5b1e04abc`](https://github.com/Khan/perseus/commit/5b1e04abc4155edbcb16aa8d8ea3fdf7beb3068e) Thanks [@nishasy](https://github.com/nishasy)! - Fix the bug where the first added locked figure settings would be collapsed when it's supposed to be expanded on add

-   Updated dependencies [[`e14a003be`](https://github.com/Khan/perseus/commit/e14a003beebf73185630416c0b3667ed75b230c2), [`42c0c607f`](https://github.com/Khan/perseus/commit/42c0c607f8b4b1713edb578cfb1d8168d1edebd1), [`55039a430`](https://github.com/Khan/perseus/commit/55039a430ef298f3d8a28e27798481130b28ca24), [`f6be03dd8`](https://github.com/Khan/perseus/commit/f6be03dd85f0e394df16fb5e632684aea7486216), [`fba227fe8`](https://github.com/Khan/perseus/commit/fba227fe8e2852d171197f7a02fed2b6b2f0d541), [`dc0adedeb`](https://github.com/Khan/perseus/commit/dc0adedebbae0c4a1940d67f64e19b0104ac85f4), [`a0dfc66cc`](https://github.com/Khan/perseus/commit/a0dfc66ccb1d92d4f15e9f1be983217e051e2aaa), [`d70fab6a7`](https://github.com/Khan/perseus/commit/d70fab6a797b04f9365ec1442e96fdddbb100a46), [`5b52a1569`](https://github.com/Khan/perseus/commit/5b52a156996d7e1debff3490db9fa798d5b95bd3)]:
    -   @khanacademy/perseus@22.6.0

## 6.4.1

### Patch Changes

-   [#1267](https://github.com/Khan/perseus/pull/1267) [`3977d361a`](https://github.com/Khan/perseus/commit/3977d361a91db647b79d499cc3f5b695af356f74) Thanks [@benchristel](https://github.com/benchristel)! - Internal: remove the `markings` property from the interactive graph state

-   Updated dependencies [[`3977d361a`](https://github.com/Khan/perseus/commit/3977d361a91db647b79d499cc3f5b695af356f74), [`478398ff7`](https://github.com/Khan/perseus/commit/478398ff79cdd558256d628edce16cf14efe6f72)]:
    -   @khanacademy/perseus@22.5.1

## 6.4.0

### Minor Changes

-   [#1268](https://github.com/Khan/perseus/pull/1268) [`9d7f119d3`](https://github.com/Khan/perseus/commit/9d7f119d3e3121290a5e497f219555462e44d03c) Thanks [@nishasy](https://github.com/nishasy)! - Add expand/collapse all button for locked figures settings

### Patch Changes

-   [#1268](https://github.com/Khan/perseus/pull/1268) [`9d7f119d3`](https://github.com/Khan/perseus/commit/9d7f119d3e3121290a5e497f219555462e44d03c) Thanks [@nishasy](https://github.com/nishasy)! - Refactor: Split LockedPointSettings out into LockedPointSettings (for a regular standalone locked point) and DefiningPointSettings (for points that define other locked figures such as lines)

## 6.3.0

### Minor Changes

-   [#1265](https://github.com/Khan/perseus/pull/1265) [`ef684516c`](https://github.com/Khan/perseus/commit/ef684516c4b15c97686229f16c1b6b97d26f958a) Thanks [@nishasy](https://github.com/nishasy)! - LockedLineSettings summary now uses a line swatch instead of a color swatch

*   [#1259](https://github.com/Khan/perseus/pull/1259) [`c07644f63`](https://github.com/Khan/perseus/commit/c07644f63957ada78ba60c9b3ecd7b42e289f67b) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Update all Perseus peer dependencies to match webapp exactly (commit: 2bd290251a8)
    -   @khanacademy/wonder-blocks-accordion v1.3.1
    -   @khanacademy/wonder-blocks-button v6.3.1
    -   @khanacademy/wonder-blocks-banner v3.0.42
    -   @khanacademy/wonder-blocks-clickable v4.2.1
    -   @khanacademy/wonder-blocks-core v6.4.0
    -   @khanacademy/wonder-blocks-dropdown v5.3.0
    -   @khanacademy/wonder-blocks-form v4.5.1
    -   @khanacademy/wonder-blocks-icon-button v5.2.1
    -   @khanacademy/wonder-blocks-switch v1.1.16
    -   @khanacademy/wonder-blocks-tooltip v2.3.1
    -   @khanacademy/wonder-blocks-tokens v1.3.0
    -   @khanacademy/wonder-blocks-typography v2.1.11
    -   @khanacademy/wonder-stuff-core v1.5.2
    -   classnames v1.1.4
    -   create-react-class v15.6.3
    -   prop-types v15.6.1

### Patch Changes

-   [#1260](https://github.com/Khan/perseus/pull/1260) [`896a159a6`](https://github.com/Khan/perseus/commit/896a159a6f602f2453a9e69af0ca73e7081dfc02) Thanks [@nishasy](https://github.com/nishasy)! - Rename "start point" and "end point" to "point 1" and "point 2" respectively in Interactive Graph locked line settings

*   [#1262](https://github.com/Khan/perseus/pull/1262) [`88c48a784`](https://github.com/Khan/perseus/commit/88c48a784270553bad5a05133fbabdcc17a35969) Thanks [@nishasy](https://github.com/nishasy)! - Locked line coordinates update on input change instead of on input blur

-   [#1254](https://github.com/Khan/perseus/pull/1254) [`e4b893c76`](https://github.com/Khan/perseus/commit/e4b893c76f181386c6e1b2b8c01e8620041ec1d7) Thanks [@nishasy](https://github.com/nishasy)! - Locked line summary reflects line kind

-   Updated dependencies [[`9e2f404bb`](https://github.com/Khan/perseus/commit/9e2f404bb52ab599c61a5c322bed492e4568b8ae), [`1f03243ba`](https://github.com/Khan/perseus/commit/1f03243ba7ed5a9fe82b1b272bfce4ae4be68212), [`896a159a6`](https://github.com/Khan/perseus/commit/896a159a6f602f2453a9e69af0ca73e7081dfc02), [`3806759ea`](https://github.com/Khan/perseus/commit/3806759ea4f140724a820d619604d8ef221059f2), [`c07644f63`](https://github.com/Khan/perseus/commit/c07644f63957ada78ba60c9b3ecd7b42e289f67b), [`c07644f63`](https://github.com/Khan/perseus/commit/c07644f63957ada78ba60c9b3ecd7b42e289f67b), [`f92c52412`](https://github.com/Khan/perseus/commit/f92c524129294c1940c95d5134477c1d0e6193b1)]:
    -   @khanacademy/perseus@22.5.0
    -   @khanacademy/math-input@19.1.0

## 6.2.3

### Patch Changes

-   Updated dependencies [[`917a6dafb`](https://github.com/Khan/perseus/commit/917a6dafb54cbff371d0d390384d001d11c15a9b)]:
    -   @khanacademy/perseus@22.4.2

## 6.2.2

### Patch Changes

-   [#1247](https://github.com/Khan/perseus/pull/1247) [`99f32f531`](https://github.com/Khan/perseus/commit/99f32f531d8a8ad6dd0bed5d7bc5729dd853218b) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Only show a11y banner for ruler and protractor when either or both is enabled

*   [#1240](https://github.com/Khan/perseus/pull/1240) [`4a59b85ab`](https://github.com/Khan/perseus/commit/4a59b85ab8d4d49e66bbd771c88e1f3d40c23a85) Thanks [@benchristel](https://github.com/benchristel)! - Adjust spacing in locked point and locked line settings

-   [#1235](https://github.com/Khan/perseus/pull/1235) [`87169b22b`](https://github.com/Khan/perseus/commit/87169b22b45c37d7cece4e3fc19acc8665f04c39) Thanks [@jeresig](https://github.com/jeresig)! - Update mathjax-renderer usage, locale is now required for createMathField.

-   Updated dependencies [[`4a59b85ab`](https://github.com/Khan/perseus/commit/4a59b85ab8d4d49e66bbd771c88e1f3d40c23a85), [`4a59b85ab`](https://github.com/Khan/perseus/commit/4a59b85ab8d4d49e66bbd771c88e1f3d40c23a85), [`87169b22b`](https://github.com/Khan/perseus/commit/87169b22b45c37d7cece4e3fc19acc8665f04c39)]:
    -   @khanacademy/perseus@22.4.1
    -   @khanacademy/math-input@19.0.0

## 6.2.1

### Patch Changes

-   [#1237](https://github.com/Khan/perseus/pull/1237) [`54689a18f`](https://github.com/Khan/perseus/commit/54689a18f73bc29b6601c9309d5385bd47c101b9) Thanks [@handeyeco](https://github.com/handeyeco)! - Rough out new Circle Graph behind a feature flag

*   [#1246](https://github.com/Khan/perseus/pull/1246) [`d66b79e44`](https://github.com/Khan/perseus/commit/d66b79e449a4b359ea35617f7903d1b7087d2566) Thanks [@nishasy](https://github.com/nishasy)! - Change locked figures' initial color to grayH (previusly green)

-   [#1242](https://github.com/Khan/perseus/pull/1242) [`7d172698e`](https://github.com/Khan/perseus/commit/7d172698e81cc8cb1bf9bc92680717f0af130e7e) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Adds a warning above the protractor and ruler checkboxes in interactive-graph settings

*   [#1245](https://github.com/Khan/perseus/pull/1245) [`45a6647cf`](https://github.com/Khan/perseus/commit/45a6647cf1b0ce032cbd2926a30cdf5ff7a3b7fb) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix location of DeviceFramer and ViewportResizer in Storybook

*   Updated dependencies [[`44cf7348c`](https://github.com/Khan/perseus/commit/44cf7348c5f80726da8b93a71e0ce0121b90a4ba), [`3c1e398d5`](https://github.com/Khan/perseus/commit/3c1e398d5f6fd3fad256eedfec821264ba857f9a), [`ee89a1b01`](https://github.com/Khan/perseus/commit/ee89a1b0169808c9c7fb14c14d2e78975e390ce9), [`54689a18f`](https://github.com/Khan/perseus/commit/54689a18f73bc29b6601c9309d5385bd47c101b9)]:
    -   @khanacademy/perseus@22.4.0

## 6.2.0

### Minor Changes

-   [#1210](https://github.com/Khan/perseus/pull/1210) [`2d3c3b49a`](https://github.com/Khan/perseus/commit/2d3c3b49a652020e5bf662b7b19682fa94212755) Thanks [@nishasy](https://github.com/nishasy)! - Limit color set for locked figures in Interactive Graph

### Patch Changes

-   [#1231](https://github.com/Khan/perseus/pull/1231) [`4fae0155d`](https://github.com/Khan/perseus/commit/4fae0155d358ca3c6bfaaac328631fec77d3fbe3) Thanks [@nishasy](https://github.com/nishasy)! - Adjust spacing in locked point and locked line settings

*   [#1232](https://github.com/Khan/perseus/pull/1232) [`cf1dc61b0`](https://github.com/Khan/perseus/commit/cf1dc61b041bbb15bac4120490bfd0f1909f5507) Thanks [@nishasy](https://github.com/nishasy)! - Refactor: separate LockedFigureSettingsAccordion component to reduce redundancy

*   Updated dependencies [[`2d3c3b49a`](https://github.com/Khan/perseus/commit/2d3c3b49a652020e5bf662b7b19682fa94212755), [`4fae0155d`](https://github.com/Khan/perseus/commit/4fae0155d358ca3c6bfaaac328631fec77d3fbe3), [`71e74ff64`](https://github.com/Khan/perseus/commit/71e74ff647264f0067d279cfa51e7c9dd8b45043), [`cf1dc61b0`](https://github.com/Khan/perseus/commit/cf1dc61b041bbb15bac4120490bfd0f1909f5507), [`db041577d`](https://github.com/Khan/perseus/commit/db041577dda780e2a871ad9e63c295a1d3fbe185), [`f757db589`](https://github.com/Khan/perseus/commit/f757db589c6500e0e1487e886fc3e92646492f1c)]:
    -   @khanacademy/perseus@22.3.0
    -   @khanacademy/math-input@18.1.0

## 6.1.0

### Minor Changes

-   [#1208](https://github.com/Khan/perseus/pull/1208) [`87c0e75d6`](https://github.com/Khan/perseus/commit/87c0e75d6b64723f33d0a2319c34ec5b4a81dfc3) Thanks [@nishasy](https://github.com/nishasy)! - Implement locked rays for Interactive Graph

### Patch Changes

-   [#1225](https://github.com/Khan/perseus/pull/1225) [`be7de3a5e`](https://github.com/Khan/perseus/commit/be7de3a5edb9c08b6976be508c56dd4253e3c86c) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Update all story names to avoid spaces

-   Updated dependencies [[`87c0e75d6`](https://github.com/Khan/perseus/commit/87c0e75d6b64723f33d0a2319c34ec5b4a81dfc3), [`162f0c855`](https://github.com/Khan/perseus/commit/162f0c855f1e5b8777bf429fcbd18be73e1b9a11)]:
    -   @khanacademy/perseus@22.2.0

## 6.0.4

### Patch Changes

-   [#1219](https://github.com/Khan/perseus/pull/1219) [`ca9b86e91`](https://github.com/Khan/perseus/commit/ca9b86e91190f9535ba57edcdb0f635d0a4e61be) Thanks [@nishasy](https://github.com/nishasy)! - Move the delete button in locked figure settings

*   [#1212](https://github.com/Khan/perseus/pull/1212) [`b4143615b`](https://github.com/Khan/perseus/commit/b4143615b294da439339836d679052c8e1d479a5) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: interactive graph editor kept resetting state

-   [#1218](https://github.com/Khan/perseus/pull/1218) [`04f57fdd0`](https://github.com/Khan/perseus/commit/04f57fdd00b9f8327ccb97f612cc2aae33ada1da) Thanks [@nishasy](https://github.com/nishasy)! - Use Wonder Blocks Tooltip for InfoTip

-   Updated dependencies [[`f0b51093b`](https://github.com/Khan/perseus/commit/f0b51093b809e2ad3408437bb8eb47ec2bd809e3), [`b4143615b`](https://github.com/Khan/perseus/commit/b4143615b294da439339836d679052c8e1d479a5), [`361d5e7ad`](https://github.com/Khan/perseus/commit/361d5e7adcea4c4156ad536bccb2b2b9fa6eb872), [`04f57fdd0`](https://github.com/Khan/perseus/commit/04f57fdd00b9f8327ccb97f612cc2aae33ada1da), [`e419bb89c`](https://github.com/Khan/perseus/commit/e419bb89c1001472447f4ec3e5ca7f2fc60e1da9)]:
    -   @khanacademy/perseus@22.1.0
    -   @khanacademy/math-input@18.0.1

## 6.0.3

### Patch Changes

-   [#1215](https://github.com/Khan/perseus/pull/1215) [`efa0e3737`](https://github.com/Khan/perseus/commit/efa0e3737b2b6af528f3e42b32d7787ecf763911) Thanks [@jeresig](https://github.com/jeresig)! - Fix up a binding issue with NumericInputEditor

## 6.0.2

### Patch Changes

-   Updated dependencies [[`463b80d67`](https://github.com/Khan/perseus/commit/463b80d679d84e6d70c42dd7a019024b9a8e7aec)]:
    -   @khanacademy/perseus@22.0.2

## 6.0.1

### Patch Changes

-   Updated dependencies [[`08b401d34`](https://github.com/Khan/perseus/commit/08b401d34cd06ad5bdee7298a35d1adb1497f611), [`87d12ad4a`](https://github.com/Khan/perseus/commit/87d12ad4afedafe70063715163d8f448b4d31b85)]:
    -   @khanacademy/perseus@22.0.1

## 6.0.0

### Major Changes

-   [#1168](https://github.com/Khan/perseus/pull/1168) [`a9c2308f9`](https://github.com/Khan/perseus/commit/a9c2308f907178794cfe761240ae9d1bec839296) Thanks [@jeresig](https://github.com/jeresig)! - Remove wonder-blocks-i18n usage from perseus and perseus-editor packages.

*   [#1153](https://github.com/Khan/perseus/pull/1153) [`22709bd9b`](https://github.com/Khan/perseus/commit/22709bd9be3e7fa7965939c7dc6a548a6189d2af) Thanks [@jeresig](https://github.com/jeresig)! - Remove wonder-blocks-i18n from math-input, support multiple exports in rollup.

### Minor Changes

-   [#1186](https://github.com/Khan/perseus/pull/1186) [`d7fbe3e99`](https://github.com/Khan/perseus/commit/d7fbe3e99eaa8686144442b47c7b46cc9ace6c12) Thanks [@nishasy](https://github.com/nishasy)! - Add UI within InteractiveGraphEditor to add/edit locked lines

*   [#1195](https://github.com/Khan/perseus/pull/1195) [`9b5a9a40a`](https://github.com/Khan/perseus/commit/9b5a9a40a0d3453ccb4e7f2883815869c3d32f37) Thanks [@nishasy](https://github.com/nishasy)! - Use MathJax colors for Interactive Graph locked figures

-   [#1195](https://github.com/Khan/perseus/pull/1195) [`9b5a9a40a`](https://github.com/Khan/perseus/commit/9b5a9a40a0d3453ccb4e7f2883815869c3d32f37) Thanks [@nishasy](https://github.com/nishasy)! - View locked lines on Interactive Graph

### Patch Changes

-   [#1196](https://github.com/Khan/perseus/pull/1196) [`52b57c95d`](https://github.com/Khan/perseus/commit/52b57c95d3e0f8c1445e2a7e862d3a52041b26c2) Thanks [@nishasy](https://github.com/nishasy)! - Rename ColorCircle to ColorSwatch

*   [#1201](https://github.com/Khan/perseus/pull/1201) [`125394c94`](https://github.com/Khan/perseus/commit/125394c944a361f6b747ac826201834337d5f76d) Thanks [@jeanettehead](https://github.com/jeanettehead)! - Default a new radio widget to having four options

-   [#1200](https://github.com/Khan/perseus/pull/1200) [`d733aeaec`](https://github.com/Khan/perseus/commit/d733aeaec46b57da9bb592702070e36c0fd30501) Thanks [@jeanettehead](https://github.com/jeanettehead)! - Prevent horizontal scrolling of radio widget options in the editor

-   Updated dependencies [[`52b57c95d`](https://github.com/Khan/perseus/commit/52b57c95d3e0f8c1445e2a7e862d3a52041b26c2), [`890587ef1`](https://github.com/Khan/perseus/commit/890587ef174007ac019a363874b2088f4b4ca9e9), [`d7fbe3e99`](https://github.com/Khan/perseus/commit/d7fbe3e99eaa8686144442b47c7b46cc9ace6c12), [`e86ed507e`](https://github.com/Khan/perseus/commit/e86ed507e67beffb02f59c064f072b8e6fb9f484), [`a9c2308f9`](https://github.com/Khan/perseus/commit/a9c2308f907178794cfe761240ae9d1bec839296), [`22709bd9b`](https://github.com/Khan/perseus/commit/22709bd9be3e7fa7965939c7dc6a548a6189d2af), [`9b5a9a40a`](https://github.com/Khan/perseus/commit/9b5a9a40a0d3453ccb4e7f2883815869c3d32f37), [`9b5a9a40a`](https://github.com/Khan/perseus/commit/9b5a9a40a0d3453ccb4e7f2883815869c3d32f37)]:
    -   @khanacademy/perseus@22.0.0
    -   @khanacademy/math-input@18.0.0

## 5.3.0

### Minor Changes

-   [#1182](https://github.com/Khan/perseus/pull/1182) [`066719c82`](https://github.com/Khan/perseus/commit/066719c82cbb934287082961de93abb427c7600e) Thanks [@nishasy](https://github.com/nishasy)! - View locked lines on Interactive Graph

*   [#1179](https://github.com/Khan/perseus/pull/1179) [`437bce7be`](https://github.com/Khan/perseus/commit/437bce7be32cbb03e0926719df0e03c193ba6df5) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change testId to render the default Testing Library HTML attribute: data-testid (was data-test-id)

### Patch Changes

-   [#1190](https://github.com/Khan/perseus/pull/1190) [`da6238a3a`](https://github.com/Khan/perseus/commit/da6238a3ad526c492476287c7bd7edd6ef04e4cb) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: remount graph in editor when a major change happens

*   [#1177](https://github.com/Khan/perseus/pull/1177) [`f419d18fb`](https://github.com/Khan/perseus/commit/f419d18fbc76ff87720d9d49562c0b43ed1c2b33) Thanks [@nishasy](https://github.com/nishasy)! - LockedPointSettings update: Allow toggleable points, refactor so that it's easy to add lines later

-   [#1194](https://github.com/Khan/perseus/pull/1194) [`09627c8dd`](https://github.com/Khan/perseus/commit/09627c8dde74136234a97a6e708e783797daf511) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Enable M1 locked features in Perseus Editor storybook stories

*   [#1178](https://github.com/Khan/perseus/pull/1178) [`ba0f36561`](https://github.com/Khan/perseus/commit/ba0f36561bf556b7bd0f85eb98be25c834643022) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Move locked features for interactive-graph behind new flag named "interactive-graph-locked-features-m1"

*   Updated dependencies [[`ba0f36561`](https://github.com/Khan/perseus/commit/ba0f36561bf556b7bd0f85eb98be25c834643022), [`a1e3fdfee`](https://github.com/Khan/perseus/commit/a1e3fdfee5768209a9d96749e78c5fd0e05f7dfb), [`066719c82`](https://github.com/Khan/perseus/commit/066719c82cbb934287082961de93abb427c7600e), [`437bce7be`](https://github.com/Khan/perseus/commit/437bce7be32cbb03e0926719df0e03c193ba6df5), [`f419d18fb`](https://github.com/Khan/perseus/commit/f419d18fbc76ff87720d9d49562c0b43ed1c2b33)]:
    -   @khanacademy/perseus@21.6.0
    -   @khanacademy/math-input@17.5.0

## 5.2.14

### Patch Changes

-   Updated dependencies [[`661964d40`](https://github.com/Khan/perseus/commit/661964d40ba86e6b477ab87224692361f7aaaa27)]:
    -   @khanacademy/perseus@21.5.0

## 5.2.13

### Patch Changes

-   Updated dependencies [[`a3d724b86`](https://github.com/Khan/perseus/commit/a3d724b8657edd78266335e236f8eba5f5f1b9dd), [`dd97c422a`](https://github.com/Khan/perseus/commit/dd97c422a7d40a3786075d8c6988509fc2c43012), [`e3063ddc7`](https://github.com/Khan/perseus/commit/e3063ddc76ad22469ca5a8557bee78216869f5d3), [`3da51638b`](https://github.com/Khan/perseus/commit/3da51638b513e10c42da421667c3d877c5dcc161), [`0f80f4089`](https://github.com/Khan/perseus/commit/0f80f4089a6000301fc63ceef24646bd05a26db6), [`ccead133f`](https://github.com/Khan/perseus/commit/ccead133fa30e1d93e02fd9a7c9e544c750e55ab)]:
    -   @khanacademy/perseus@21.4.0

## 5.2.12

### Patch Changes

-   [#1174](https://github.com/Khan/perseus/pull/1174) [`108cb3bc4`](https://github.com/Khan/perseus/commit/108cb3bc4b9c4d734c4f8cd424e55f8c14c77009) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: allow selecting financial calculator options again

## 5.2.11

### Patch Changes

-   Updated dependencies [[`53fa89b50`](https://github.com/Khan/perseus/commit/53fa89b50240309dcf56919b77715e135682e0ee), [`9c5363795`](https://github.com/Khan/perseus/commit/9c53637953ff0267306bdc98175be9770bf2f098), [`ce547c5ec`](https://github.com/Khan/perseus/commit/ce547c5ec1ef0d17e0adebe24532c93007e82c4d)]:
    -   @khanacademy/perseus@21.3.1

## 5.2.10

### Patch Changes

-   Updated dependencies [[`98ae896e1`](https://github.com/Khan/perseus/commit/98ae896e1b4bb394f4776699e19b0eab020e14eb), [`163e650d4`](https://github.com/Khan/perseus/commit/163e650d47732f80395934761bc44714cd89d937), [`2ba54f4ba`](https://github.com/Khan/perseus/commit/2ba54f4ba2a3e0a447e0975f0a238a62250933ae), [`004a62e8e`](https://github.com/Khan/perseus/commit/004a62e8e71e41c7d2d9d86ff9606fdbe5893728), [`44f83a700`](https://github.com/Khan/perseus/commit/44f83a700779a0a8dd6b74ba79a99dfcecb47072), [`754934486`](https://github.com/Khan/perseus/commit/754934486b89e3d308e75cd46acde823266ac588)]:
    -   @khanacademy/perseus@21.3.0

## 5.2.9

### Patch Changes

-   Updated dependencies [[`000ce4bff`](https://github.com/Khan/perseus/commit/000ce4bff9bc91d7e3adff289a32bea972c4e827)]:
    -   @khanacademy/perseus@21.2.2

## 5.2.8

### Patch Changes

-   Updated dependencies [[`369316014`](https://github.com/Khan/perseus/commit/369316014208e7bc941de77d65e77586cf9b4d9b)]:
    -   @khanacademy/perseus@21.2.1

## 5.2.7

### Patch Changes

-   Updated dependencies [[`ab3c47f96`](https://github.com/Khan/perseus/commit/ab3c47f96de9ee42280def09f05429585b7c38b6), [`3d29e9f8d`](https://github.com/Khan/perseus/commit/3d29e9f8d21bdc49c1c7c97ab3887dd818bcf6d0), [`f4f85583c`](https://github.com/Khan/perseus/commit/f4f85583c794cd6513914537baf0536e96855ff7), [`e2165df84`](https://github.com/Khan/perseus/commit/e2165df84110a94c3ff5251a71da2b82905c36b2), [`d3faae5a2`](https://github.com/Khan/perseus/commit/d3faae5a25f1a21b72907ba4cd769105c1c2d43b), [`df96d28c5`](https://github.com/Khan/perseus/commit/df96d28c5cb6f1503ab907582260edc2448fa8cf), [`9195c4f28`](https://github.com/Khan/perseus/commit/9195c4f284842688f60985e901a8534a9e4ac0c9)]:
    -   @khanacademy/perseus@21.2.0

## 5.2.6

### Patch Changes

-   Updated dependencies [[`f7aa9a26d`](https://github.com/Khan/perseus/commit/f7aa9a26d5355e7e7e7e5229ca4bb8b71c3e967a), [`7ecc1dc64`](https://github.com/Khan/perseus/commit/7ecc1dc64f5c7c249c96c1dff17c884f1ecc442f), [`6341541f4`](https://github.com/Khan/perseus/commit/6341541f44a217e69e5f2599704bb635bf33fb2e), [`e36173d6a`](https://github.com/Khan/perseus/commit/e36173d6a125813f66ec4457d0cccdcba57d87dc), [`7851bcb85`](https://github.com/Khan/perseus/commit/7851bcb85f5f09c2f93e5c8c435e59adef6afb40), [`3eb870e7a`](https://github.com/Khan/perseus/commit/3eb870e7a1fbcdd0cbec82568491fb9124037057), [`8089ad435`](https://github.com/Khan/perseus/commit/8089ad43564044c59cad28428f4a744baaba7250)]:
    -   @khanacademy/perseus@21.1.0

## 5.2.5

### Patch Changes

-   [#1117](https://github.com/Khan/perseus/pull/1117) [`4a2117e86`](https://github.com/Khan/perseus/commit/4a2117e865b709cd0788c7ddfc0abd011b3d4bac) Thanks [@handeyeco](https://github.com/handeyeco)! - Stop deriving widget type from widget ID

-   Updated dependencies [[`4a2117e86`](https://github.com/Khan/perseus/commit/4a2117e865b709cd0788c7ddfc0abd011b3d4bac), [`64fd65129`](https://github.com/Khan/perseus/commit/64fd65129cac78750b848f32e205cb46860ee24b), [`c56633482`](https://github.com/Khan/perseus/commit/c566334824faf9f6f90362bba0276e2ef7d59829), [`ad392c7b1`](https://github.com/Khan/perseus/commit/ad392c7b12ac7a214b03f86b8e68503499aaa381)]:
    -   @khanacademy/perseus@21.0.0

## 5.2.4

### Patch Changes

-   [#1104](https://github.com/Khan/perseus/pull/1104) [`bb48417ab`](https://github.com/Khan/perseus/commit/bb48417abe681f2aadf3181e9a316877dff8e5fb) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Migrates ViewportResizer and DeviceFramer components to modern, functional components

*   [#1120](https://github.com/Khan/perseus/pull/1120) [`1ef9c7b67`](https://github.com/Khan/perseus/commit/1ef9c7b679e911880b77b22001a734be76c7f9a5) Thanks [@benchristel](https://github.com/benchristel)! - Internal: reduce console log noise in tests

-   [#1105](https://github.com/Khan/perseus/pull/1105) [`76dc2394d`](https://github.com/Khan/perseus/commit/76dc2394dfd1dcdf389923997d104fa2e42e1b38) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Migrate to @khanacademy/wonder-blocks-tokens

-   Updated dependencies [[`fc01f490f`](https://github.com/Khan/perseus/commit/fc01f490f6aabcfedca10e5833834488234e0efa), [`0f1f3fdac`](https://github.com/Khan/perseus/commit/0f1f3fdaccd2ad52b660bac5fe691e8a64de728b), [`1ef9c7b67`](https://github.com/Khan/perseus/commit/1ef9c7b679e911880b77b22001a734be76c7f9a5), [`74c6efc6a`](https://github.com/Khan/perseus/commit/74c6efc6a185c62ab204e21a991012fde6eab12c), [`76dc2394d`](https://github.com/Khan/perseus/commit/76dc2394dfd1dcdf389923997d104fa2e42e1b38), [`74c6efc6a`](https://github.com/Khan/perseus/commit/74c6efc6a185c62ab204e21a991012fde6eab12c), [`73bc6da07`](https://github.com/Khan/perseus/commit/73bc6da0789a59905590e15bcf8d0ec45f8853b5), [`900e1cea8`](https://github.com/Khan/perseus/commit/900e1cea86610c8dab5a481f100ef1a89cb1cf7b), [`d2c6e3129`](https://github.com/Khan/perseus/commit/d2c6e3129e1a6488d24bddbc4f4638c9eba9047d), [`9139a9246`](https://github.com/Khan/perseus/commit/9139a92468def2b0804ed30d0356b30c08854daf), [`b53cf2a3a`](https://github.com/Khan/perseus/commit/b53cf2a3a3d2e59d95c9428561417a7789522cb6)]:
    -   @khanacademy/perseus@20.8.1
    -   @khanacademy/math-input@17.4.1

## 5.2.3

### Patch Changes

-   Updated dependencies [[`5ce75a23`](https://github.com/Khan/perseus/commit/5ce75a2357a7ab972028fd1fbf6d7378c65f48ec), [`e70d1701`](https://github.com/Khan/perseus/commit/e70d17010eb3943f114ea382025016e5ed68cde5)]:
    -   @khanacademy/perseus@20.8.0
    -   @khanacademy/math-input@17.4.0

## 5.2.2

### Patch Changes

-   [#1096](https://github.com/Khan/perseus/pull/1096) [`c614a001`](https://github.com/Khan/perseus/commit/c614a001003b4a4be395ea86c7d785f967262c64) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Tooling: Upgrade ESLint to latest and apply fixes

-   Updated dependencies [[`08e4a422`](https://github.com/Khan/perseus/commit/08e4a4229f57bf5c1c029591fcf5dfa9ef9b4ee2), [`ed9a9432`](https://github.com/Khan/perseus/commit/ed9a9432935183e3c7b9ec8f55e758e5820f156a), [`c614a001`](https://github.com/Khan/perseus/commit/c614a001003b4a4be395ea86c7d785f967262c64)]:
    -   @khanacademy/perseus@20.7.0
    -   @khanacademy/kas@0.3.9

## 5.2.1

### Patch Changes

-   Updated dependencies [[`20a23a39`](https://github.com/Khan/perseus/commit/20a23a3976a70378e86c8871e47d5497ddc9d51e), [`11e04962`](https://github.com/Khan/perseus/commit/11e04962fee178c997ca50d96eaebc446d43e66c), [`a431883d`](https://github.com/Khan/perseus/commit/a431883d7d157160f07daa27c3d3d08eb07563f5), [`0cd66f88`](https://github.com/Khan/perseus/commit/0cd66f882e549d2bc3c9e6911a50656e07c549f2), [`47eade13`](https://github.com/Khan/perseus/commit/47eade137687d829b0ac46ac11218afe1c9308f4)]:
    -   @khanacademy/perseus@20.6.0

## 5.2.0

### Minor Changes

-   [#1077](https://github.com/Khan/perseus/pull/1077) [`ab00539f`](https://github.com/Khan/perseus/commit/ab00539f8d9514dff92ba1abe179100038fd79d4) Thanks [@nishasy](https://github.com/nishasy)! - Add UI for adjusting the color of a locked point

### Patch Changes

-   Updated dependencies [[`ab00539f`](https://github.com/Khan/perseus/commit/ab00539f8d9514dff92ba1abe179100038fd79d4)]:
    -   @khanacademy/perseus@20.5.0

## 5.1.4

### Patch Changes

-   Updated dependencies [[`d1294120`](https://github.com/Khan/perseus/commit/d1294120fd62d8753aa5c85b3d789a2449739481)]:
    -   @khanacademy/perseus@20.4.1

## 5.1.3

### Patch Changes

-   Updated dependencies [[`512265cc`](https://github.com/Khan/perseus/commit/512265cc5ae75e2ea658255291ef75539b1c1702), [`e03e2b03`](https://github.com/Khan/perseus/commit/e03e2b03c9b799f2f900c1f74f1a7b74bd5efe1f)]:
    -   @khanacademy/perseus@20.4.0

## 5.1.2

### Patch Changes

-   Updated dependencies [[`e1706bba`](https://github.com/Khan/perseus/commit/e1706bba2e5f38493301ff401d784e8777f4e48f)]:
    -   @khanacademy/perseus@20.3.1

## 5.1.1

### Patch Changes

-   Updated dependencies [[`857ea95b`](https://github.com/Khan/perseus/commit/857ea95bba32b230bca6d43467995cbdc1b9dca9)]:
    -   @khanacademy/perseus@20.3.0

## 5.1.0

### Minor Changes

-   [#1074](https://github.com/Khan/perseus/pull/1074) [`a263e940`](https://github.com/Khan/perseus/commit/a263e940de35cc51a5be81ca507a4e9b6827b422) Thanks [@nishasy](https://github.com/nishasy)! - Add "add a locked figure" UI to interactive graph editor + adding points (mafs graphs only)

### Patch Changes

-   Updated dependencies [[`881da724`](https://github.com/Khan/perseus/commit/881da724d36561b2a200af0258ab81523d4d236a), [`eb637b35`](https://github.com/Khan/perseus/commit/eb637b3528b6ecaf1df83e53d429b6bdc89613d4), [`6196375a`](https://github.com/Khan/perseus/commit/6196375add76025fb1f30473912dd38cc001cca4), [`a263e940`](https://github.com/Khan/perseus/commit/a263e940de35cc51a5be81ca507a4e9b6827b422), [`ea0db7d9`](https://github.com/Khan/perseus/commit/ea0db7d9b2013637a27f1ea9fc36b46b0a7488a2)]:
    -   @khanacademy/perseus@20.2.0

## 5.0.3

### Patch Changes

-   [#1049](https://github.com/Khan/perseus/pull/1049) [`f5d5852c`](https://github.com/Khan/perseus/commit/f5d5852c4e6c4c7e701433f56ec82cd9fdf77684) Thanks [@nishasy](https://github.com/nishasy)! - Use Wonder Blocks + minor refactoring in interactive graph editor

-   Updated dependencies [[`631af3a4`](https://github.com/Khan/perseus/commit/631af3a459e7ee54e552d011438bd7daa6dc9197), [`f5d5852c`](https://github.com/Khan/perseus/commit/f5d5852c4e6c4c7e701433f56ec82cd9fdf77684)]:
    -   @khanacademy/perseus@20.1.0

## 5.0.2

### Patch Changes

-   [#1042](https://github.com/Khan/perseus/pull/1042) [`9ae993c8`](https://github.com/Khan/perseus/commit/9ae993c8beecb0419b2b461916ee704f8b12fb28) Thanks [@nishasy](https://github.com/nishasy)! - Update props in InteractiveGraphSettings and InteractiveGraphEditor to more accurately reflect how they are used. Minor refactoring.

*   [#1062](https://github.com/Khan/perseus/pull/1062) [`48cf0c07`](https://github.com/Khan/perseus/commit/48cf0c07895f66b3d868ce265befc17f316bb785) Thanks [@nedredmond](https://github.com/nedredmond)! - Renormed tests for Perseus Math Input debounce

*   Updated dependencies [[`9ae993c8`](https://github.com/Khan/perseus/commit/9ae993c8beecb0419b2b461916ee704f8b12fb28), [`48cf0c07`](https://github.com/Khan/perseus/commit/48cf0c07895f66b3d868ce265befc17f316bb785)]:
    -   @khanacademy/perseus@20.0.2

## 5.0.1

### Patch Changes

-   [#978](https://github.com/Khan/perseus/pull/978) [`881be46f`](https://github.com/Khan/perseus/commit/881be46fc75117d57bab30d1568b417cca5d6976) Thanks [@nishasy](https://github.com/nishasy)! - Update WB Clickable. Stop keypad button clicks from removing focus from the input.

-   Updated dependencies [[`881be46f`](https://github.com/Khan/perseus/commit/881be46fc75117d57bab30d1568b417cca5d6976)]:
    -   @khanacademy/math-input@17.3.0
    -   @khanacademy/perseus@20.0.1

## 5.0.0

### Major Changes

-   [#1046](https://github.com/Khan/perseus/pull/1046) [`18a2862a`](https://github.com/Khan/perseus/commit/18a2862ab5eb56bc69b527fcad0edf86ad91ba12) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Deprecation of Lights-Puzzle, Simulator, Reaction Diagram, and Sequence Widgets.

### Patch Changes

-   Updated dependencies [[`18a2862a`](https://github.com/Khan/perseus/commit/18a2862ab5eb56bc69b527fcad0edf86ad91ba12)]:
    -   @khanacademy/perseus@20.0.0

## 4.4.1

### Patch Changes

-   Updated dependencies [[`bacbb3a2`](https://github.com/Khan/perseus/commit/bacbb3a2ccc06b54531a5a9537be709c165a8a61)]:
    -   @khanacademy/perseus@19.9.0

## 4.4.0

### Minor Changes

-   [#1028](https://github.com/Khan/perseus/pull/1028) [`06abf394`](https://github.com/Khan/perseus/commit/06abf3946f044a7ebfdaddaa369f43f781cb091b) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Typescript improvements for Perseus Widget Options and Widget types

### Patch Changes

-   Updated dependencies [[`06abf394`](https://github.com/Khan/perseus/commit/06abf3946f044a7ebfdaddaa369f43f781cb091b), [`ec31bc74`](https://github.com/Khan/perseus/commit/ec31bc74efe089f312895f4133d20440e19aebe9)]:
    -   @khanacademy/perseus@19.8.0

## 4.3.5

### Patch Changes

-   Updated dependencies [[`54a301e9`](https://github.com/Khan/perseus/commit/54a301e9fa264310927c0909899706a786357c4b)]:
    -   @khanacademy/math-input@17.2.3
    -   @khanacademy/perseus@19.7.3

## 4.3.4

### Patch Changes

-   Updated dependencies [[`16ca445c`](https://github.com/Khan/perseus/commit/16ca445cf138b82092518498159de2826b169ee8), [`4ef7b067`](https://github.com/Khan/perseus/commit/4ef7b06705bdab89298b8b36b5773cfdf8ce0bec)]:
    -   @khanacademy/math-input@17.2.2
    -   @khanacademy/perseus@19.7.2

## 4.3.3

### Patch Changes

-   Updated dependencies [[`1b1d0404`](https://github.com/Khan/perseus/commit/1b1d040461dc6c6b9d238a81be4d2d3e96c452d8)]:
    -   @khanacademy/perseus@19.7.1

## 4.3.2

### Patch Changes

-   [#1041](https://github.com/Khan/perseus/pull/1041) [`11c2d97f`](https://github.com/Khan/perseus/commit/11c2d97f85e660e2c87cde50ea1bbbe703c8113c) Thanks [@nedredmond](https://github.com/nedredmond)! - Fix bug that would cause Financial Calculator options to appear unchecked on initial render

*   [#1033](https://github.com/Khan/perseus/pull/1033) [`a78cfc0f`](https://github.com/Khan/perseus/commit/a78cfc0f138fced4b1a465f8774be2c12b2fe789) Thanks [@nishasy](https://github.com/nishasy)! - Update InteractiveGraphSettings to React class. Update `markings` to be "graph" | "grid" | "none" instead of string.

*   Updated dependencies [[`3901f863`](https://github.com/Khan/perseus/commit/3901f863f674fec614ec6422af45aa7ad96f0d6d), [`a78cfc0f`](https://github.com/Khan/perseus/commit/a78cfc0f138fced4b1a465f8774be2c12b2fe789)]:
    -   @khanacademy/perseus@19.7.0

## 4.3.1

### Patch Changes

-   Updated dependencies [[`664b037f`](https://github.com/Khan/perseus/commit/664b037fd76e4406f21add1449fc56e90d742148)]:
    -   @khanacademy/perseus@19.6.3

## 4.3.0

### Minor Changes

-   [#1025](https://github.com/Khan/perseus/pull/1025) [`5ec2bb71`](https://github.com/Khan/perseus/commit/5ec2bb7152bfb9b980798c3247b4df9c5846d092) Thanks [@nishasy](https://github.com/nishasy)! - Create InteractiveGraphSettings to be used in InteractiveGraphEditor in place of GraphSettings

### Patch Changes

-   [#1029](https://github.com/Khan/perseus/pull/1029) [`17d05e8e`](https://github.com/Khan/perseus/commit/17d05e8ec4edb417cff8007efd333b166ffdd139) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Migrate to @testing-library/user-event v14.

*   [#1022](https://github.com/Khan/perseus/pull/1022) [`b2649c32`](https://github.com/Khan/perseus/commit/b2649c32ac15a5d8ad9787155ecebe24ffcf783d) Thanks [@nishasy](https://github.com/nishasy)! - Correct type for `valid` prop from `boolean` to `boolean | string`

-   [#1024](https://github.com/Khan/perseus/pull/1024) [`0c9fe476`](https://github.com/Khan/perseus/commit/0c9fe476de5e6712c0f0abdd42768d1c1fbfdba5) Thanks [@nishasy](https://github.com/nishasy)! - Add labels to input fields in GraphSettings + tests.

-   Updated dependencies [[`17d05e8e`](https://github.com/Khan/perseus/commit/17d05e8ec4edb417cff8007efd333b166ffdd139), [`7e4a65f0`](https://github.com/Khan/perseus/commit/7e4a65f0ea795ea004437099de4df8ca3cdbb171)]:
    -   @khanacademy/math-input@17.2.1
    -   @khanacademy/perseus@19.6.2

## 4.2.8

### Patch Changes

-   Updated dependencies [[`b1552885`](https://github.com/Khan/perseus/commit/b155288568a3f13b3983515391cdbf4dd5092a51)]:
    -   @khanacademy/perseus@19.6.1

## 4.2.7

### Patch Changes

-   Updated dependencies [[`0562929c`](https://github.com/Khan/perseus/commit/0562929c03645028b68da497382489747f0fc2c6), [`4e2b5100`](https://github.com/Khan/perseus/commit/4e2b51002e41c8f36051775a7ceff4fd1a564526)]:
    -   @khanacademy/perseus@19.6.0

## 4.2.6

### Patch Changes

-   [#1020](https://github.com/Khan/perseus/pull/1020) [`30405816`](https://github.com/Khan/perseus/commit/3040581645a67f518920fdf6d94b4f78f2233f0c) Thanks [@nishasy](https://github.com/nishasy)! - Undo update to GraphSettings making it a class function

-   Updated dependencies [[`30405816`](https://github.com/Khan/perseus/commit/3040581645a67f518920fdf6d94b4f78f2233f0c)]:
    -   @khanacademy/perseus@19.5.1

## 4.2.5

### Patch Changes

-   Updated dependencies [[`7038c046`](https://github.com/Khan/perseus/commit/7038c046d3e869e4ad43e3805248f06d61a94af0)]:
    -   @khanacademy/math-input@17.2.0
    -   @khanacademy/perseus@19.5.0

## 4.2.4

### Patch Changes

-   [#1009](https://github.com/Khan/perseus/pull/1009) [`7c030e61`](https://github.com/Khan/perseus/commit/7c030e61613b67ba92d2fc4f0015c85e0af6b878) Thanks [@nishasy](https://github.com/nishasy)! - Update GraphSettings to React class. Update `markings` type to be "graph" | "grid" | "none" instead of string.

-   Updated dependencies [[`7c030e61`](https://github.com/Khan/perseus/commit/7c030e61613b67ba92d2fc4f0015c85e0af6b878), [`7d4d098d`](https://github.com/Khan/perseus/commit/7d4d098dbdbc3f41e89d7e118c8cd83fbcaeb928)]:
    -   @khanacademy/perseus@19.4.0

## 4.2.3

### Patch Changes

-   Updated dependencies [[`6ef53d21`](https://github.com/Khan/perseus/commit/6ef53d213fae13977effbd28c784aa6cd91c6e7f)]:
    -   @khanacademy/perseus@19.3.1

## 4.2.2

### Patch Changes

-   Updated dependencies [[`955ae480`](https://github.com/Khan/perseus/commit/955ae480a822d875784fb2de65240fe1acd283a5), [`17c38bf7`](https://github.com/Khan/perseus/commit/17c38bf743da3675d8ce13d4dc3c0b8efaa93d89)]:
    -   @khanacademy/perseus@19.3.0
    -   @khanacademy/math-input@17.1.0

## 4.2.1

### Patch Changes

-   Updated dependencies [[`f30c6639`](https://github.com/Khan/perseus/commit/f30c663941a21189f3520b7e38beda0e38320ed3)]:
    -   @khanacademy/perseus@19.2.1

## 4.2.0

### Minor Changes

-   [#989](https://github.com/Khan/perseus/pull/989) [`97b5bbfb`](https://github.com/Khan/perseus/commit/97b5bbfbea591d3b6d814ed4717135138fb30dec) Thanks [@aag](https://github.com/aag)! - Add a new python-program widget and its editor

### Patch Changes

-   [#995](https://github.com/Khan/perseus/pull/995) [`a4ead994`](https://github.com/Khan/perseus/commit/a4ead9940cddc09434b823039ff51b85ecd9e639) Thanks [@benchristel](https://github.com/benchristel)! - Update formatting for Prettier 2.8.8

-   Updated dependencies [[`a4ead994`](https://github.com/Khan/perseus/commit/a4ead9940cddc09434b823039ff51b85ecd9e639), [`a4ead994`](https://github.com/Khan/perseus/commit/a4ead9940cddc09434b823039ff51b85ecd9e639), [`97b5bbfb`](https://github.com/Khan/perseus/commit/97b5bbfbea591d3b6d814ed4717135138fb30dec)]:
    -   @khanacademy/perseus@19.2.0
    -   @khanacademy/math-input@17.0.8

## 4.1.9

### Patch Changes

-   Updated dependencies [[`585a3fe9`](https://github.com/Khan/perseus/commit/585a3fe9aaa26ee550d36768c36e626f626a3417), [`e4ca3c53`](https://github.com/Khan/perseus/commit/e4ca3c5384e9a16e79e4fb2704c0a6dd3c4ebf54), [`9f2eafe4`](https://github.com/Khan/perseus/commit/9f2eafe4c4649fd1ee1a83611b53908eb9cf3468), [`36a5ebe1`](https://github.com/Khan/perseus/commit/36a5ebe1ef373058090841fc734778c06e318397)]:
    -   @khanacademy/perseus@19.1.9

## 4.1.8

### Patch Changes

-   [#985](https://github.com/Khan/perseus/pull/985) [`260bf9b8`](https://github.com/Khan/perseus/commit/260bf9b8af039270a513e15b0fe6034afcf522b6) Thanks [@nedredmond](https://github.com/nedredmond)! - Prevent call on editor methods when editor has not been initialized.

-   Updated dependencies [[`279c3730`](https://github.com/Khan/perseus/commit/279c3730fba6a9854b1434ba7499f5c5cfd2151a)]:
    -   @khanacademy/math-input@17.0.7
    -   @khanacademy/perseus@19.1.8

## 4.1.7

### Patch Changes

-   Updated dependencies [[`ca0af2eb`](https://github.com/Khan/perseus/commit/ca0af2eb613ece0be8c59798d0e886577c9590c7), [`cdf7c0aa`](https://github.com/Khan/perseus/commit/cdf7c0aa0f095b8afba429f2da5328cc11cdb7a3), [`3f718367`](https://github.com/Khan/perseus/commit/3f718367f82ecb8819b91220831e34becdbab8c9)]:
    -   @khanacademy/perseus@19.1.7
    -   @khanacademy/math-input@17.0.6

## 4.1.6

### Patch Changes

-   [#971](https://github.com/Khan/perseus/pull/971) [`90ff7a48`](https://github.com/Khan/perseus/commit/90ff7a483b01552a556c7852427e98153cc20417) Thanks [@benchristel](https://github.com/benchristel)! - Remove source files from the distributed NPM package

-   Updated dependencies [[`90ff7a48`](https://github.com/Khan/perseus/commit/90ff7a483b01552a556c7852427e98153cc20417)]:
    -   @khanacademy/kas@0.3.8
    -   @khanacademy/kmath@0.1.12
    -   @khanacademy/math-input@17.0.5
    -   @khanacademy/perseus@19.1.6
    -   @khanacademy/perseus-core@1.4.2

## 4.1.5

### Patch Changes

-   Updated dependencies [[`d8fbc251`](https://github.com/Khan/perseus/commit/d8fbc25170bd671ad984893553f79f44e3a0d048), [`ba44dd40`](https://github.com/Khan/perseus/commit/ba44dd405272b066615099c8bd30033715305939)]:
    -   @khanacademy/kmath@0.1.11
    -   @khanacademy/perseus@19.1.5
    -   @khanacademy/math-input@17.0.4

## 4.1.4

### Patch Changes

-   Updated dependencies [[`729b419a`](https://github.com/Khan/perseus/commit/729b419a5c31eaa6ac4da996a0683a2fdffc5997), [`a4a4dc44`](https://github.com/Khan/perseus/commit/a4a4dc447037eaea83423dc21a15076435c4b638), [`ce0227c1`](https://github.com/Khan/perseus/commit/ce0227c1d7b432b6a9484c32542ddf23d27b1e95)]:
    -   @khanacademy/perseus@19.1.4
    -   @khanacademy/math-input@17.0.3

## 4.1.3

### Patch Changes

-   Updated dependencies [[`19114138`](https://github.com/Khan/perseus/commit/1911413844b59ef87d5b2329f6120e4568be9ae3), [`19114138`](https://github.com/Khan/perseus/commit/1911413844b59ef87d5b2329f6120e4568be9ae3), [`6bebefcb`](https://github.com/Khan/perseus/commit/6bebefcb4ce54c3ed0d57707c34d4399f763368f), [`03e1461f`](https://github.com/Khan/perseus/commit/03e1461fe16d5dd31fd1f6d11669126dce96f088)]:
    -   @khanacademy/math-input@17.0.2
    -   @khanacademy/perseus@19.1.3

## 4.1.2

### Patch Changes

-   [#956](https://github.com/Khan/perseus/pull/956) [`14e107f5`](https://github.com/Khan/perseus/commit/14e107f57c10fb3a442e55506810eb309caced24) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Bump Perseus to version that correctly replaces transformer widget with deprecated-standin

-   Updated dependencies [[`43820ff9`](https://github.com/Khan/perseus/commit/43820ff9ce391682b951279a4c6fb9e3db966eb9), [`14e107f5`](https://github.com/Khan/perseus/commit/14e107f57c10fb3a442e55506810eb309caced24)]:
    -   @khanacademy/kmath@0.1.10
    -   @khanacademy/perseus@19.1.2

## 4.1.1

### Patch Changes

-   Updated dependencies [[`8c8af142`](https://github.com/Khan/perseus/commit/8c8af1425a5cd257ca894b20bdb481f7148ffa7d)]:
    -   @khanacademy/math-input@17.0.1
    -   @khanacademy/perseus@19.1.1

## 4.1.0

### Minor Changes

-   [#895](https://github.com/Khan/perseus/pull/895) [`15b4bc02`](https://github.com/Khan/perseus/commit/15b4bc02d65fd1900e01ce7dd35863c1be579d73) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Convert ImageEditor compoment to modern React class component

*   [#937](https://github.com/Khan/perseus/pull/937) [`ef898f77`](https://github.com/Khan/perseus/commit/ef898f77f45f3494f5012d2db52a3461aad93c69) Thanks [@nishasy](https://github.com/nishasy)! - bumped mathquill version + minor type updates

### Patch Changes

-   Updated dependencies [[`15b4bc02`](https://github.com/Khan/perseus/commit/15b4bc02d65fd1900e01ce7dd35863c1be579d73), [`0b737502`](https://github.com/Khan/perseus/commit/0b7375023826ef5ee46eb5ae00136b2356e10be4), [`ef898f77`](https://github.com/Khan/perseus/commit/ef898f77f45f3494f5012d2db52a3461aad93c69), [`319e330e`](https://github.com/Khan/perseus/commit/319e330ed77d2145266a9b231693ac65320032a2), [`3bfd44e3`](https://github.com/Khan/perseus/commit/3bfd44e37643cdd13392fbaabb9fb4370378d2b3), [`59ce1e09`](https://github.com/Khan/perseus/commit/59ce1e0990cecd1123d7b9a671b032fcd03ce1b1), [`ef898f77`](https://github.com/Khan/perseus/commit/ef898f77f45f3494f5012d2db52a3461aad93c69), [`f16e4184`](https://github.com/Khan/perseus/commit/f16e4184a24dcdaafc0cb4ebde5651f5bb135df9), [`247f8b1b`](https://github.com/Khan/perseus/commit/247f8b1be0647c39a5cabd9ce72a216d750a707b), [`62e04cfa`](https://github.com/Khan/perseus/commit/62e04cfa3139c6417442cbb96f8012d098a7c279), [`583becef`](https://github.com/Khan/perseus/commit/583becefbf690e96df709bcb7f8150cf686deadf)]:
    -   @khanacademy/perseus@19.1.0
    -   @khanacademy/math-input@17.0.0
    -   @khanacademy/kmath@0.1.9

## 4.0.0

### Major Changes

-   [#915](https://github.com/Khan/perseus/pull/915) [`98bf2106`](https://github.com/Khan/perseus/commit/98bf2106e0ae56f37f3c0c2d0a5563802e4db62d) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Remove Transformer widget and replace with a standin widget

### Patch Changes

-   Updated dependencies [[`98bf2106`](https://github.com/Khan/perseus/commit/98bf2106e0ae56f37f3c0c2d0a5563802e4db62d)]:
    -   @khanacademy/perseus@19.0.0

## 3.0.1

### Patch Changes

-   Updated dependencies [[`e970dfcc`](https://github.com/Khan/perseus/commit/e970dfcc51e7b535e94669e6ffe0cbdd6d9b7b89), [`e970dfcc`](https://github.com/Khan/perseus/commit/e970dfcc51e7b535e94669e6ffe0cbdd6d9b7b89)]:
    -   @khanacademy/perseus@18.0.1
    -   @khanacademy/math-input@16.5.1

## 3.0.0

### Major Changes

-   [#933](https://github.com/Khan/perseus/pull/933) [`851c2cb8`](https://github.com/Khan/perseus/commit/851c2cb8cd6f6c0d6a62343f9232cc618476b85e) Thanks [@handeyeco](https://github.com/handeyeco)! - Update external and internal facing Perseus types

### Patch Changes

-   Updated dependencies [[`851c2cb8`](https://github.com/Khan/perseus/commit/851c2cb8cd6f6c0d6a62343f9232cc618476b85e), [`f7ac2929`](https://github.com/Khan/perseus/commit/f7ac2929ac18e6fd18b1e6c460350d5119762b42), [`87bfcc6f`](https://github.com/Khan/perseus/commit/87bfcc6f4a59a95027d76018625802726aa0d309), [`738aa661`](https://github.com/Khan/perseus/commit/738aa6613fdf752b8a4348c43690666fb5f0531f), [`d95e7044`](https://github.com/Khan/perseus/commit/d95e70444e2d038460a3b3fbe4e3c5aa4f4bd41d), [`6c3b6afe`](https://github.com/Khan/perseus/commit/6c3b6afea87f95bc3dc1da78cc0ddd29418d14dc), [`1e179194`](https://github.com/Khan/perseus/commit/1e179194e9674b267be11c280f80faa5cc671d91), [`4c2c2abc`](https://github.com/Khan/perseus/commit/4c2c2abc9c8dbe57a0036ff7873926ef5ecdd6e6), [`544ca540`](https://github.com/Khan/perseus/commit/544ca540469b2d0b34a8d00de256872d32648fda), [`76ebdc76`](https://github.com/Khan/perseus/commit/76ebdc7620a2f1ffe28524f95a99a13393162951), [`237593b8`](https://github.com/Khan/perseus/commit/237593b8d5bd36148cb5adabf51a796acf8f81a4)]:
    -   @khanacademy/perseus@18.0.0

## 2.17.0

### Minor Changes

-   [#894](https://github.com/Khan/perseus/pull/894) [`49d5c821`](https://github.com/Khan/perseus/commit/49d5c821a2ad07aadf31f09f2814859de2c0f157) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add a confirmation before deleting a configured widget in the Exercise Editor

*   [#896](https://github.com/Khan/perseus/pull/896) [`04981063`](https://github.com/Khan/perseus/commit/049810636968afac5672f790896768338319810a) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add a confirmation before deleting a hint in the Exercise Editor

### Patch Changes

-   Updated dependencies [[`a5479339`](https://github.com/Khan/perseus/commit/a547933946b8be33b388fa4654d87289734848f0)]:
    -   @khanacademy/perseus@17.8.0

## 2.16.2

### Patch Changes

-   Updated dependencies [[`81b9a562`](https://github.com/Khan/perseus/commit/81b9a562d0fb8ff2cd82e708781432bff8437116)]:
    -   @khanacademy/math-input@16.5.0
    -   @khanacademy/perseus@17.7.0

## 2.16.1

### Patch Changes

-   Updated dependencies [[`21222f55`](https://github.com/Khan/perseus/commit/21222f55b1efd46acbc0fe1dcc8aa0399b8555ee)]:
    -   @khanacademy/perseus@17.6.2

## 2.16.0

### Minor Changes

-   [#897](https://github.com/Khan/perseus/pull/897) [`e8020f58`](https://github.com/Khan/perseus/commit/e8020f58bb538372f77785a14a31dc11be2bc441) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Convert many string refs to React refs

### Patch Changes

-   [#881](https://github.com/Khan/perseus/pull/881) [`f02eb991`](https://github.com/Khan/perseus/commit/f02eb991cec37dcff02056c0d6b54fc6dfd96948) Thanks [@nedredmond](https://github.com/nedredmond)! - Swap out Label Image custom dropdown for WonderBlocks

*   [#870](https://github.com/Khan/perseus/pull/870) [`9354fb55`](https://github.com/Khan/perseus/commit/9354fb55357f2441a2ca6198c52cca33edeba3c0) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Replace transformer widget with a deprecated-standin widget

*   Updated dependencies [[`f02eb991`](https://github.com/Khan/perseus/commit/f02eb991cec37dcff02056c0d6b54fc6dfd96948), [`9354fb55`](https://github.com/Khan/perseus/commit/9354fb55357f2441a2ca6198c52cca33edeba3c0)]:
    -   @khanacademy/math-input@16.4.1
    -   @khanacademy/perseus@17.6.1

## 2.15.7

### Patch Changes

-   Updated dependencies [[`83884550`](https://github.com/Khan/perseus/commit/83884550df8b394e9afa6e95947c987614e2d242)]:
    -   @khanacademy/perseus@17.6.0

## 2.15.6

### Patch Changes

-   [#905](https://github.com/Khan/perseus/pull/905) [`b18ddb28`](https://github.com/Khan/perseus/commit/b18ddb28d9b1f77b1263b3cf24b55a862998fb78) Thanks [@handeyeco](https://github.com/handeyeco)! - Convert interaction-editor components from PropTypes to TS

*   [#911](https://github.com/Khan/perseus/pull/911) [`e9a8808d`](https://github.com/Khan/perseus/commit/e9a8808de00132db4cb992c1428d3ac3628e389c) Thanks [@handeyeco](https://github.com/handeyeco)! - Restructure interaction-editor subcomponents

## 2.15.5

### Patch Changes

-   [#904](https://github.com/Khan/perseus/pull/904) [`ca241171`](https://github.com/Khan/perseus/commit/ca241171e5fa893fc114241ac1ebc0260c9d57c5) Thanks [@handeyeco](https://github.com/handeyeco)! - Restructure interaction-editor subcomponents

-   Updated dependencies [[`29563723`](https://github.com/Khan/perseus/commit/29563723cf229a9169d0c78a0174a8dbc8029861), [`6c841f55`](https://github.com/Khan/perseus/commit/6c841f55027c87bfc8339816dac582f175a84193)]:
    -   @khanacademy/perseus@17.5.0

## 2.15.4

### Patch Changes

-   [#892](https://github.com/Khan/perseus/pull/892) [`22a8f42c`](https://github.com/Khan/perseus/commit/22a8f42c9e31cc74f1ab2f5a375ce5166353153f) Thanks [@handeyeco](https://github.com/handeyeco)! - add tests for NumberLineEditor

*   [#887](https://github.com/Khan/perseus/pull/887) [`d09fdb98`](https://github.com/Khan/perseus/commit/d09fdb98963f23dbeb2009518513db671e0f09bb) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Add Storybook story for EditorPage component

-   [#882](https://github.com/Khan/perseus/pull/882) [`6f1ddaa3`](https://github.com/Khan/perseus/commit/6f1ddaa3eae41d87aaf3514ab0f4cd7875b3125b) Thanks [@handeyeco](https://github.com/handeyeco)! - Add tests for RadioEditor

*   [#893](https://github.com/Khan/perseus/pull/893) [`cbd51e81`](https://github.com/Khan/perseus/commit/cbd51e810cc6f6f406fa92b5faceb4fb3655bbb4) Thanks [@handeyeco](https://github.com/handeyeco)! - add tests for InputNumber

-   [#884](https://github.com/Khan/perseus/pull/884) [`c2172fb9`](https://github.com/Khan/perseus/commit/c2172fb90f247b3a914eaf7eb01b7b15ceb1f0c0) Thanks [@handeyeco](https://github.com/handeyeco)! - Add tests for DropdownEditor

*   [#891](https://github.com/Khan/perseus/pull/891) [`4fe720db`](https://github.com/Khan/perseus/commit/4fe720dbb388b71606bbf98c0606523b3eb3e395) Thanks [@handeyeco](https://github.com/handeyeco)! - add tests for DefinitionEditor

-   [#890](https://github.com/Khan/perseus/pull/890) [`6607ed0d`](https://github.com/Khan/perseus/commit/6607ed0d81adedc84a201ddb4b55f32a78e92dc0) Thanks [@handeyeco](https://github.com/handeyeco)! - add tests for CategorizerEditor

*   [#888](https://github.com/Khan/perseus/pull/888) [`68d8a766`](https://github.com/Khan/perseus/commit/68d8a766bfa769b8ab57c60e79be7080c6b32593) Thanks [@handeyeco](https://github.com/handeyeco)! - add tests for MatcherEditor

-   [#886](https://github.com/Khan/perseus/pull/886) [`eeac31b7`](https://github.com/Khan/perseus/commit/eeac31b7be6ef2526f0f7ae20cc6bfa237581798) Thanks [@handeyeco](https://github.com/handeyeco)! - Add tests for SorterEditor

*   [#885](https://github.com/Khan/perseus/pull/885) [`8e0eb5bc`](https://github.com/Khan/perseus/commit/8e0eb5bc7059c99054f9b13af9780c1103ebf5ee) Thanks [@handeyeco](https://github.com/handeyeco)! - Add tests for ExplanationEditor

-   [#883](https://github.com/Khan/perseus/pull/883) [`0b90e681`](https://github.com/Khan/perseus/commit/0b90e681b7c81f76bca419c879c0985e3fa1226f) Thanks [@handeyeco](https://github.com/handeyeco)! - Add tests for NumericInputEditor

-   Updated dependencies [[`c9db8185`](https://github.com/Khan/perseus/commit/c9db818510e2e0fd142c23298890dcad89a7549a), [`d09fdb98`](https://github.com/Khan/perseus/commit/d09fdb98963f23dbeb2009518513db671e0f09bb)]:
    -   @khanacademy/perseus@17.4.0

## 2.15.3

### Patch Changes

-   Updated dependencies [[`fdc00c90`](https://github.com/Khan/perseus/commit/fdc00c90a19d3e241b3a5cdc2b1df5d761b24af3)]:
    -   @khanacademy/perseus@17.3.3

## 2.15.2

### Patch Changes

-   Updated dependencies [[`f4cd2a76`](https://github.com/Khan/perseus/commit/f4cd2a7639556312af75b9ba9c6a97c41c94beac)]:
    -   @khanacademy/perseus@17.3.2

## 2.15.1

### Patch Changes

-   Updated dependencies [[`b7777865`](https://github.com/Khan/perseus/commit/b777786517afc289e92201e3fea876c30c493290)]:
    -   @khanacademy/perseus@17.3.1

## 2.15.0

### Minor Changes

-   [#867](https://github.com/Khan/perseus/pull/867) [`378294da`](https://github.com/Khan/perseus/commit/378294da3d207839a861333175920b562773ee97) Thanks [@nedredmond](https://github.com/nedredmond)! - Add financial calculators to Item Extras

### Patch Changes

-   [#869](https://github.com/Khan/perseus/pull/869) [`57eeec68`](https://github.com/Khan/perseus/commit/57eeec681072591c64b633527833f3ab9f6e3f1a) Thanks [@nedredmond](https://github.com/nedredmond)! - Remove new unused field from PerseusAnswerArea API

-   Updated dependencies [[`57eeec68`](https://github.com/Khan/perseus/commit/57eeec681072591c64b633527833f3ab9f6e3f1a), [`378294da`](https://github.com/Khan/perseus/commit/378294da3d207839a861333175920b562773ee97)]:
    -   @khanacademy/perseus@17.3.0

## 2.14.2

### Patch Changes

-   Updated dependencies [[`347d6d15`](https://github.com/Khan/perseus/commit/347d6d15ee7989819852067e5916a86725e95def), [`f910bd72`](https://github.com/Khan/perseus/commit/f910bd72fc5cbf88a1a00d57f8aefa8eea2c755d)]:
    -   @khanacademy/perseus@17.2.0

## 2.14.1

### Patch Changes

-   Updated dependencies []:
    -   @khanacademy/perseus@17.1.1

## 2.14.0

### Minor Changes

-   [#804](https://github.com/Khan/perseus/pull/804) [`954dbb96`](https://github.com/Khan/perseus/commit/954dbb96eda47946a15ed819fde73aa931f318bc) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Add a preferred popover direction option to label image

### Patch Changes

-   [#856](https://github.com/Khan/perseus/pull/856) [`6c323dc3`](https://github.com/Khan/perseus/commit/6c323dc37e7cc972fe5a1ab7cbf90a23bf4dd3a0) Thanks [@nedredmond](https://github.com/nedredmond)! - Upgrade WB

*   [#804](https://github.com/Khan/perseus/pull/804) [`07537aae`](https://github.com/Khan/perseus/commit/07537aae870866f4418055b5956e9387f85f72c4) Thanks [@nixterrimus](https://github.com/nixterrimus)! - Unchecking periodic table option unchecks key as well

*   Updated dependencies [[`2c295e2c`](https://github.com/Khan/perseus/commit/2c295e2c26ff2bf15e1e8e82bcc34e04e4b9bab0), [`ce343147`](https://github.com/Khan/perseus/commit/ce343147f558c2f2a1dcbabae20bdba22c0de86d), [`1c8f2753`](https://github.com/Khan/perseus/commit/1c8f275391b02bef8e14d1daccef8fadea9066cd), [`6c323dc3`](https://github.com/Khan/perseus/commit/6c323dc37e7cc972fe5a1ab7cbf90a23bf4dd3a0), [`7433c91b`](https://github.com/Khan/perseus/commit/7433c91bb05ad0441475f40bcd05a3076e7e19f1), [`dd41dd0e`](https://github.com/Khan/perseus/commit/dd41dd0e8bc76a414bb5906bba4648f57547f188), [`53612027`](https://github.com/Khan/perseus/commit/536120272b8cae3b01cdbe09a59488cc4704329d), [`bb9cd667`](https://github.com/Khan/perseus/commit/bb9cd667dbb4a38724ae174063021fdf18040f9b), [`4553af79`](https://github.com/Khan/perseus/commit/4553af79a26fc0e635d7dc03be74f39cb00a05f6), [`07537aae`](https://github.com/Khan/perseus/commit/07537aae870866f4418055b5956e9387f85f72c4), [`bb81559e`](https://github.com/Khan/perseus/commit/bb81559e02359092ba4d48107010c476b5ae09d5), [`fd09014c`](https://github.com/Khan/perseus/commit/fd09014c26e33d2c83a1e6ae3672027ac9583d41), [`1f4e17ba`](https://github.com/Khan/perseus/commit/1f4e17ba77e1491523813655af18a70285a25989), [`f6be48a9`](https://github.com/Khan/perseus/commit/f6be48a96795858e009bea18cc1092d150f98b71), [`34f7696b`](https://github.com/Khan/perseus/commit/34f7696b537d28c4b2054a3995f567a9a6834f73), [`8857950b`](https://github.com/Khan/perseus/commit/8857950bdeeb6e13bc3766b1c6545289b21cbe2a), [`ded7af48`](https://github.com/Khan/perseus/commit/ded7af488d57e6309f7244ca4b897ac680754d74), [`6f530d58`](https://github.com/Khan/perseus/commit/6f530d58b4368fb3c38d62d4dcf1f63cecf67d90), [`1906ec5a`](https://github.com/Khan/perseus/commit/1906ec5afb7fd7332a6cabc6afc79ee1f779f8ec), [`5e4c21bd`](https://github.com/Khan/perseus/commit/5e4c21bda5717fb793386a810be3144d7b9a9011), [`30ce593a`](https://github.com/Khan/perseus/commit/30ce593a2f1d552338ce0818cf754c13c22af281), [`cccf1897`](https://github.com/Khan/perseus/commit/cccf1897da294e4b1fec804f2639c1c56bd68201)]:
    -   @khanacademy/perseus@17.1.0
    -   @khanacademy/perseus-core@1.4.1
    -   @khanacademy/kas@0.3.7
    -   @khanacademy/kmath@0.1.8

## 2.13.0

### Minor Changes

-   [#838](https://github.com/Khan/perseus/pull/838) [`233fc9fc`](https://github.com/Khan/perseus/commit/233fc9fcd4c65d2ff0c8f1ebd1cb1b17b76cbe0c) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove TexButtons and update ExpressionEditor

### Patch Changes

-   Updated dependencies [[`2e2f2cc1`](https://github.com/Khan/perseus/commit/2e2f2cc1afe99613eb688ab1e4e1fccad0c8df57), [`204788f8`](https://github.com/Khan/perseus/commit/204788f8f583bda5ff94d74fd70ec542fedd3d6e), [`233fc9fc`](https://github.com/Khan/perseus/commit/233fc9fcd4c65d2ff0c8f1ebd1cb1b17b76cbe0c)]:
    -   @khanacademy/perseus@17.0.0

## 2.12.1

### Patch Changes

-   Updated dependencies [[`45350a24`](https://github.com/Khan/perseus/commit/45350a2458cd3f816bc87af40997e426feb4b13b)]:
    -   @khanacademy/perseus@16.0.0

## 2.12.0

### Minor Changes

-   [#814](https://github.com/Khan/perseus/pull/814) [`105d2060`](https://github.com/Khan/perseus/commit/105d20603d935d35cff237b17f0bfb57ca751e4c) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change KaTeXErrorView to TeXErrorView and adopt Phosphor Icons in it

### Patch Changes

-   [#814](https://github.com/Khan/perseus/pull/814) [`105d2060`](https://github.com/Khan/perseus/commit/105d20603d935d35cff237b17f0bfb57ca751e4c) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Minor build change to how we provide Typescript type definitions (should be no change to build output).

-   Updated dependencies [[`a91c84fe`](https://github.com/Khan/perseus/commit/a91c84fe53827ff4333220777a9918882b7fe9f0), [`3e176246`](https://github.com/Khan/perseus/commit/3e176246025ba237682569481dd9960f7a0dabf4), [`105d2060`](https://github.com/Khan/perseus/commit/105d20603d935d35cff237b17f0bfb57ca751e4c), [`3cf5ac4c`](https://github.com/Khan/perseus/commit/3cf5ac4c3f9d51dbcddc6f75bfbf0f8778b20f78)]:
    -   @khanacademy/perseus@15.0.0
    -   @khanacademy/perseus-core@1.4.0
    -   @khanacademy/kas@0.3.6
    -   @khanacademy/kmath@0.1.7

## 2.11.0

### Minor Changes

-   [#827](https://github.com/Khan/perseus/pull/827) [`c7410ccc`](https://github.com/Khan/perseus/commit/c7410ccc6254034b599e1909b3cbbd7a6c9ea9b2) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Revert defensive code in ExpressionEditor that caused a crash when an expression config's answer form was missing a `key` property.

### Patch Changes

-   Updated dependencies [[`cdcd162e`](https://github.com/Khan/perseus/commit/cdcd162ea0902d3ff1d77b1b66ad15f2d55a86cd), [`7cb40e4c`](https://github.com/Khan/perseus/commit/7cb40e4c919be50e5ced41e4937178bbf849ec74), [`8f1f0208`](https://github.com/Khan/perseus/commit/8f1f0208fcc08e137053bfd05d330b6f8bf3522d)]:
    -   @khanacademy/perseus@14.0.0

## 2.10.0

### Minor Changes

-   [#811](https://github.com/Khan/perseus/pull/811) [`bca527ab`](https://github.com/Khan/perseus/commit/bca527abc4d8b29942efec12509f9cf8be401e75) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Bump all Wonder Blocks dependencies to latest

### Patch Changes

-   [#808](https://github.com/Khan/perseus/pull/808) [`8358da80`](https://github.com/Khan/perseus/commit/8358da8010dcb8976d8cfb542afa7e303ce4971a) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Removing unnecessary conflicting CSS for #problemarea.

-   Updated dependencies [[`8358da80`](https://github.com/Khan/perseus/commit/8358da8010dcb8976d8cfb542afa7e303ce4971a), [`691d29b4`](https://github.com/Khan/perseus/commit/691d29b4224a523a3dd8d53a7aab28c80118e7ac), [`021f9462`](https://github.com/Khan/perseus/commit/021f946255f423de8df13f6872b0664f79408484), [`bca527ab`](https://github.com/Khan/perseus/commit/bca527abc4d8b29942efec12509f9cf8be401e75), [`6d31e044`](https://github.com/Khan/perseus/commit/6d31e044d6f5b304e63602795e9bbd7ba443dac5)]:
    -   @khanacademy/perseus@13.2.0

## 2.9.1

### Patch Changes

-   Updated dependencies [[`2adb82b2`](https://github.com/Khan/perseus/commit/2adb82b22ac17a31aef403b7562191cac06cc13b)]:
    -   @khanacademy/perseus@13.1.0

## 2.9.0

### Minor Changes

-   [#796](https://github.com/Khan/perseus/pull/796) [`c26fbdde`](https://github.com/Khan/perseus/commit/c26fbdde0d0bce0e7e88046eaddf88307f722eb9) Thanks [@nedredmond](https://github.com/nedredmond)! - Add option to show key on periodic table

### Patch Changes

-   [#670](https://github.com/Khan/perseus/pull/670) [`88616529`](https://github.com/Khan/perseus/commit/88616529c70f6c03529c26c2a4f04e5bb9f92b38) Thanks [@handeyeco](https://github.com/handeyeco)! - Update types for Plotter widget

-   Updated dependencies [[`88616529`](https://github.com/Khan/perseus/commit/88616529c70f6c03529c26c2a4f04e5bb9f92b38), [`c26fbdde`](https://github.com/Khan/perseus/commit/c26fbdde0d0bce0e7e88046eaddf88307f722eb9), [`847b0568`](https://github.com/Khan/perseus/commit/847b0568bd5bb23ef08ddd8cbbe24f7158eeaaca), [`af4ebf37`](https://github.com/Khan/perseus/commit/af4ebf37dfed15ffd93a8cf2a20d0be464120dd7)]:
    -   @khanacademy/perseus@13.0.0

## 2.8.5

### Patch Changes

-   Updated dependencies [[`cfff6ad1`](https://github.com/Khan/perseus/commit/cfff6ad16a3923418a3c75816af7c99689b94da4), [`79403e06`](https://github.com/Khan/perseus/commit/79403e06eedb597d7818d6c858bbba6f51ff3fe1)]:
    -   @khanacademy/perseus@12.4.0
    -   @khanacademy/perseus-core@1.3.0
    -   @khanacademy/kas@0.3.5
    -   @khanacademy/kmath@0.1.6

## 2.8.4

### Patch Changes

-   Updated dependencies [[`c431c4b8`](https://github.com/Khan/perseus/commit/c431c4b8147ae0630df2d2b19b0f5a5b5f04d4bf), [`cb529549`](https://github.com/Khan/perseus/commit/cb5295497fe74e3f4cc00eef0f99da9f83f58e4d), [`376eb0e4`](https://github.com/Khan/perseus/commit/376eb0e4aaaa4c7a90fd6107a84bb74d382b077c), [`9b9dfd4f`](https://github.com/Khan/perseus/commit/9b9dfd4f6779d129040d9afcf3205f1863a64c25), [`376eb0e4`](https://github.com/Khan/perseus/commit/376eb0e4aaaa4c7a90fd6107a84bb74d382b077c)]:
    -   @khanacademy/perseus@12.3.0
    -   @khanacademy/perseus-core@1.2.0
    -   @khanacademy/kas@0.3.4
    -   @khanacademy/kmath@0.1.5

## 2.8.3

### Patch Changes

-   Updated dependencies [[`809823e4`](https://github.com/Khan/perseus/commit/809823e490f65cbcbaa05b548de985035810ba8d), [`6d9e31a4`](https://github.com/Khan/perseus/commit/6d9e31a4ea4a1ed29bef2d9812d21e5b2fd41af6)]:
    -   @khanacademy/perseus@12.2.0

## 2.8.2

### Patch Changes

-   Updated dependencies [c4ae088f]
-   Updated dependencies [6dbc58c6]
    -   @khanacademy/perseus@12.1.0

## 2.8.1

### Patch Changes

-   Updated dependencies [22a9c408]
    -   @khanacademy/perseus-core@1.1.2
    -   @khanacademy/kas@0.3.3
    -   @khanacademy/kmath@0.1.4
    -   @khanacademy/perseus@12.0.1

## 2.8.0

### Minor Changes

-   5bcf118c: Desktop Expression Widget now uses v2 keypad

### Patch Changes

-   5bcf118c: # Update MathInput

    -   `buttonSets` is now deprecated in favor of `keypadButtonSets`, but currently maps to the new prop for backwards compatability.
    -   `buttonsVisible` is now a bit misleading: "focused" is the default state with a toggle-able keypad and "always" shows the keypad by default.

-   Updated dependencies [5bcf118c]
-   Updated dependencies [5bcf118c]
    -   @khanacademy/perseus@12.0.0

## 2.7.7

### Patch Changes

-   55d4cd00: Print package name and version when loaded in the page
-   Updated dependencies [1721c05c]
-   Updated dependencies [55d4cd00]
    -   @khanacademy/perseus@11.6.1
    -   @khanacademy/kas@0.3.2
    -   @khanacademy/kmath@0.1.3
    -   @khanacademy/perseus-core@1.1.1

## 2.7.6

### Patch Changes

-   Updated dependencies [0761377a]
-   Updated dependencies [14138bb0]
-   Updated dependencies [14138bb0]
-   Updated dependencies [332d5d6d]
    -   @khanacademy/perseus@11.6.0

## 2.7.5

### Patch Changes

-   Updated dependencies [7e2ae0ef]
-   Updated dependencies [1dc460c7]
    -   @khanacademy/perseus@11.5.1

## 2.7.4

### Patch Changes

-   Updated dependencies [609aeb0a]
    -   @khanacademy/perseus@11.5.0

## 2.7.3

### Patch Changes

-   Updated dependencies [6751a680]
    -   @khanacademy/perseus@11.4.0

## 2.7.2

### Patch Changes

-   Updated dependencies [26fc0b41]
    -   @khanacademy/perseus@11.3.0

## 2.7.1

### Patch Changes

-   a383823d: Bump @khanacademy/wonder-stuff-core to v1.5.1 (which adds needed support for `isTruthy` helper function)
-   Updated dependencies [a383823d]
    -   @khanacademy/perseus@11.2.1

## 2.7.0

### Minor Changes

-   9ff8a575: Fix image widget caption styling

### Patch Changes

-   Updated dependencies [9ff8a575]
-   Updated dependencies [1b618343]
    -   @khanacademy/perseus@11.2.0

## 2.6.8

### Patch Changes

-   Updated dependencies [8dc86906]
    -   @khanacademy/perseus@11.1.0

## 2.6.7

### Patch Changes

-   2af4f9fa: Switch from using ProvideKeypad in ArticleRenderer to passing the keypad element down instead
-   Updated dependencies [2af4f9fa]
    -   @khanacademy/perseus@11.0.0

## 2.6.6

### Patch Changes

-   Updated dependencies [3078825a]
-   Updated dependencies [100fb7e5]
    -   @khanacademy/perseus@10.1.0

## 2.6.5

### Patch Changes

-   Updated dependencies [5f33560b]
-   Updated dependencies [0f95281c]
    -   @khanacademy/perseus@10.0.1

## 2.6.4

### Patch Changes

-   aea86eec: Convert all usages of JSX.LibraryManagedAttributes to WB Core's PropsFor type
-   Updated dependencies [aea86eec]
-   Updated dependencies [9eb50ae1]
    -   @khanacademy/perseus@10.0.0

## 2.6.3

### Patch Changes

-   Updated dependencies [ec50a510]
-   Updated dependencies [dd800c22]
-   Updated dependencies [2c69b0dc]
-   Updated dependencies [2b99fbda]
-   Updated dependencies [673f61b3]
    -   @khanacademy/perseus@9.0.0

## 2.6.2

### Patch Changes

-   afb14cff: Add eslint rule to make type imports consistent
-   ce5e6297: Upgrade wonder-blocks deps to package versions without Flow types
-   Updated dependencies [0993a46b]
-   Updated dependencies [afb14cff]
-   Updated dependencies [ce5e6297]
-   Updated dependencies [410d490d]
    -   @khanacademy/perseus@8.0.0
    -   @khanacademy/kmath@0.1.2

## 2.6.1

### Patch Changes

-   89f54569: Types and tests for Plotter and Plotter-Editor
-   89f54569: Bugfix to hide drag instructions in static plotter
-   Updated dependencies [89f54569]
-   Updated dependencies [ea9dac75]
-   Updated dependencies [89f54569]
    -   @khanacademy/perseus@7.2.1

## 2.6.0

### Minor Changes

-   e08f85ee: Add testing and improve error logging in the image editor

### Patch Changes

-   Updated dependencies [e08f85ee]
    -   @khanacademy/perseus@7.2.0

## 2.5.2

### Patch Changes

-   eeda31bd: Fix loading graphie URLs into the image editor

## 2.5.1

### Patch Changes

-   Updated dependencies [fc70e558]
    -   @khanacademy/perseus@7.1.1

## 2.5.0

### Minor Changes

-   2fb66a97: Remove functionality of `useNewStyles` prop on `ArticleRenderer`

### Patch Changes

-   Updated dependencies [2fb66a97]
    -   @khanacademy/perseus@7.1.0

## 2.4.1

### Patch Changes

-   @khanacademy/perseus@7.0.2

## 2.4.0

### Minor Changes

-   97d02dac: Fixes a bug where images don't get dimensions in the image editor, and adds small preview to the image editor

### Patch Changes

-   Updated dependencies [5611204a]
    -   @khanacademy/perseus@7.0.1

## 2.3.13

### Patch Changes

-   Updated dependencies [f9ee9d24]
-   Updated dependencies [b18986d3]
-   Updated dependencies [b18986d3]
    -   @khanacademy/perseus@7.0.0

## 2.3.12

### Patch Changes

-   Updated dependencies [a0c71567]
    -   @khanacademy/perseus@6.7.0

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
