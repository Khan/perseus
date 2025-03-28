# @khanacademy/perseus-score

## 3.0.0

### Major Changes

-   [#2331](https://github.com/Khan/perseus/pull/2331) [`c2e33e522`](https://github.com/Khan/perseus/commit/c2e33e52291d6379799754e27c5d33b02ff4b1fa) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Remove CJS output from package (package is now ESM only)

### Patch Changes

-   Updated dependencies [[`c2e33e522`](https://github.com/Khan/perseus/commit/c2e33e52291d6379799754e27c5d33b02ff4b1fa)]:
    -   @khanacademy/kas@1.0.0
    -   @khanacademy/kmath@1.0.0
    -   @khanacademy/perseus-core@6.0.0
    -   @khanacademy/perseus-utils@1.0.0

## 2.3.7

### Patch Changes

-   [#2328](https://github.com/Khan/perseus/pull/2328) [`5b6e9df5b`](https://github.com/Khan/perseus/commit/5b6e9df5b6bcacf7646475ff7884415b815f68c5) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Fix import of internal items to use relative paths instead of the package name

*   [#2322](https://github.com/Khan/perseus/pull/2322) [`4bd882b43`](https://github.com/Khan/perseus/commit/4bd882b43b15d9d3d5ca850f5148eba57c7dca59) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Change how version injection code is shared/bundled

*   Updated dependencies [[`5b6e9df5b`](https://github.com/Khan/perseus/commit/5b6e9df5b6bcacf7646475ff7884415b815f68c5), [`ca06cb806`](https://github.com/Khan/perseus/commit/ca06cb80686b8b414766d9b1d91a48fa4b71994c), [`4bd882b43`](https://github.com/Khan/perseus/commit/4bd882b43b15d9d3d5ca850f5148eba57c7dca59)]:
    -   @khanacademy/kmath@0.4.7
    -   @khanacademy/perseus-core@5.4.2
    -   @khanacademy/kas@0.5.1
    -   @khanacademy/perseus-utils@0.0.2

## 2.3.6

### Patch Changes

-   [#2278](https://github.com/Khan/perseus/pull/2278) [`c170c1d3c`](https://github.com/Khan/perseus/commit/c170c1d3c59e67e382d132aa7058260f876121fc) Thanks [@handeyeco](https://github.com/handeyeco)! - Remove jQuery as a dependency of perseus-score

*   [#2272](https://github.com/Khan/perseus/pull/2272) [`335940746`](https://github.com/Khan/perseus/commit/3359407467fe5d36b4c5600da29c4ce623a2ef28) Thanks [@handeyeco](https://github.com/handeyeco)! - Add comments to external-facing functions

*   Updated dependencies [[`1b5f51415`](https://github.com/Khan/perseus/commit/1b5f514159c25fd0eb760cb6d20cab62a813cca4), [`4c0b317c3`](https://github.com/Khan/perseus/commit/4c0b317c357ac06277a58e5d6ae83dc4dfa04189), [`335940746`](https://github.com/Khan/perseus/commit/3359407467fe5d36b4c5600da29c4ce623a2ef28)]:
    -   @khanacademy/perseus-core@5.4.1
    -   @khanacademy/kmath@0.4.6

## 2.3.5

### Patch Changes

-   Updated dependencies [[`3c8ff9936`](https://github.com/Khan/perseus/commit/3c8ff993615a7224a18250f4a7e96a55ab5c724d)]:
    -   @khanacademy/perseus-core@5.4.0
    -   @khanacademy/kmath@0.4.5

## 2.3.4

### Patch Changes

-   Updated dependencies [[`48bc498f8`](https://github.com/Khan/perseus/commit/48bc498f88f98e817ea426924cbc0b016e5802b9)]:
    -   @khanacademy/perseus-core@5.3.0
    -   @khanacademy/kmath@0.4.4

## 2.3.3

### Patch Changes

-   Updated dependencies [[`0d5ab0b2e`](https://github.com/Khan/perseus/commit/0d5ab0b2e5d079b8ac805077a2abad6bc5b2132d), [`fea65eaf1`](https://github.com/Khan/perseus/commit/fea65eaf12918e7e1b1e893bea80549e69313ce2)]:
    -   @khanacademy/perseus-core@5.2.0
    -   @khanacademy/kmath@0.4.3

## 2.3.2

### Patch Changes

-   Updated dependencies [[`91e30c02c`](https://github.com/Khan/perseus/commit/91e30c02c15ddc7c811b658bdb052172739a690a)]:
    -   @khanacademy/perseus-core@5.1.0
    -   @khanacademy/kmath@0.4.2

## 2.3.1

### Patch Changes

-   Updated dependencies [[`a0aee41b6`](https://github.com/Khan/perseus/commit/a0aee41b69d4288ef165416cea293100d037ce5f), [`909148cdc`](https://github.com/Khan/perseus/commit/909148cdccabb3f0a2156587ea1e870bae910f8d)]:
    -   @khanacademy/perseus-core@5.0.0
    -   @khanacademy/kmath@0.4.1

## 2.3.0

### Minor Changes

-   [#2209](https://github.com/Khan/perseus/pull/2209) [`dcf9017d9`](https://github.com/Khan/perseus/commit/dcf9017d9917e0f877677b010a905e477081b15f) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bugfix to ensure that Numerics that require Improper fractions don't accept whole numbers.

*   [#2202](https://github.com/Khan/perseus/pull/2202) [`c7f6f63c8`](https://github.com/Khan/perseus/commit/c7f6f63c845566d99dae6df604426e5fb14a7e85) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Tooling:

    -   Switching to `pnpm`.

### Patch Changes

-   [#2259](https://github.com/Khan/perseus/pull/2259) [`a90cf7901`](https://github.com/Khan/perseus/commit/a90cf790159fefbee41437f20ac9a403a06f148f) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Minor change to how each package embeds it's package version in itself (slightly larger bundle size)

*   [#2268](https://github.com/Khan/perseus/pull/2268) [`9d01457fc`](https://github.com/Khan/perseus/commit/9d01457fcb882ce3df555e3c7f733f94b02d0b6c) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Minor dev improvements for Numeric Input after Refactor changes.

-   [#2271](https://github.com/Khan/perseus/pull/2271) [`458d3ed60`](https://github.com/Khan/perseus/commit/458d3ed600be91dd75a30a80bfac1fbd87c60bcd) Thanks [@handeyeco](https://github.com/handeyeco)! - Add test for TeX in Expression scoring

*   [#2209](https://github.com/Khan/perseus/pull/2209) [`ee91b7063`](https://github.com/Khan/perseus/commit/ee91b7063982530274e3cc736b3e78ad9fae43cf) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Bugfix to ensure users cannot create infinite loop with incomplete tex in Numeric Input

-   [#2266](https://github.com/Khan/perseus/pull/2266) [`20a08315b`](https://github.com/Khan/perseus/commit/20a08315b288244357b8a2526f87c2c5014f2fa6) Thanks [@handeyeco](https://github.com/handeyeco)! - Bugfix: KAS handling functions around plain numbers

-   Updated dependencies [[`90034a875`](https://github.com/Khan/perseus/commit/90034a8754ab735ec84d959916b62a69d39efc2a), [`e7ad604af`](https://github.com/Khan/perseus/commit/e7ad604afce45feab7d268582ec6db41d6ab5e06), [`c7f6f63c8`](https://github.com/Khan/perseus/commit/c7f6f63c845566d99dae6df604426e5fb14a7e85), [`b71154170`](https://github.com/Khan/perseus/commit/b711541701ec10ccb506d0f9cbafac4a1c7c4cc1), [`a90cf7901`](https://github.com/Khan/perseus/commit/a90cf790159fefbee41437f20ac9a403a06f148f), [`56b4ee61b`](https://github.com/Khan/perseus/commit/56b4ee61b064603fdbeb4577851fe142d881e245), [`5de2e740b`](https://github.com/Khan/perseus/commit/5de2e740b35d69fc0059af5dbb74bd894986e124), [`20a08315b`](https://github.com/Khan/perseus/commit/20a08315b288244357b8a2526f87c2c5014f2fa6), [`381842745`](https://github.com/Khan/perseus/commit/3818427456a2ffca56481adbdafa01fee40e83c0), [`c0149a1b9`](https://github.com/Khan/perseus/commit/c0149a1b9f9d917f0f9b98dd6d61414e9bb7d895), [`08409c6c9`](https://github.com/Khan/perseus/commit/08409c6c9eea1d19212d332acb056c5ef4971419)]:
    -   @khanacademy/perseus-core@4.0.0
    -   @khanacademy/kmath@0.4.0
    -   @khanacademy/kas@0.5.0

## 2.2.2

### Patch Changes

-   Updated dependencies [[`e63f83d0d`](https://github.com/Khan/perseus/commit/e63f83d0d89fd5b8e7aee3ab7248bcb19ec9be8a), [`e187c6b67`](https://github.com/Khan/perseus/commit/e187c6b67cb4d83e42907527acfe6562346e92d8), [`62ed407b8`](https://github.com/Khan/perseus/commit/62ed407b8647472f955467b8ce64261182bb8b59), [`cbd5a6528`](https://github.com/Khan/perseus/commit/cbd5a652818554aa368bcddb0381d4716bc7a8ba)]:
    -   @khanacademy/perseus-core@3.7.0
    -   @khanacademy/kas@0.4.16
    -   @khanacademy/kmath@0.3.5

## 2.2.1

### Patch Changes

-   [#2235](https://github.com/Khan/perseus/pull/2235) [`ab2041897`](https://github.com/Khan/perseus/commit/ab2041897dff393e2e86d4d4a6e5ad278eff17bd) Thanks [@benchristel](https://github.com/benchristel)! - Remove unused code, and export the `ParseFailureDetail` type from `@khanacademy/perseus-core`

-   Updated dependencies [[`f8a4becb0`](https://github.com/Khan/perseus/commit/f8a4becb03c543b034cc47d91d3335078bce76c0), [`ae29e2b2f`](https://github.com/Khan/perseus/commit/ae29e2b2fd3b4ec9533b3a1845d2ca94d05d4ed7), [`ab2041897`](https://github.com/Khan/perseus/commit/ab2041897dff393e2e86d4d4a6e5ad278eff17bd), [`1ade12c18`](https://github.com/Khan/perseus/commit/1ade12c184ba9ef657a7c7d53b81da70fe85de31), [`ce320b496`](https://github.com/Khan/perseus/commit/ce320b496bdc9580c194f878674773b845bb27b3)]:
    -   @khanacademy/perseus-core@3.6.0
    -   @khanacademy/kas@0.4.15
    -   @khanacademy/kmath@0.3.4

## 2.2.0

### Minor Changes

-   [#2217](https://github.com/Khan/perseus/pull/2217) [`07779783a`](https://github.com/Khan/perseus/commit/07779783ae0e3a19c0c72e95a8eaa0b58a9cc968) Thanks [@SonicScrewdriver](https://github.com/SonicScrewdriver)! - Move coord reverse logic for Angle graphs into scoring logic

### Patch Changes

-   Updated dependencies [[`fd606f43d`](https://github.com/Khan/perseus/commit/fd606f43d7687a15d6dc2cabd0e85fc71b5ed878), [`3ba74d173`](https://github.com/Khan/perseus/commit/3ba74d1731ceff13c9794a3aeaf79f1735b5fb86), [`7ec6c2fbc`](https://github.com/Khan/perseus/commit/7ec6c2fbc21d3d7d4ef98a58e021da4684561447), [`097176a26`](https://github.com/Khan/perseus/commit/097176a26db7b0c80b3be5e6fe469539f65de0ea), [`b3c562ac2`](https://github.com/Khan/perseus/commit/b3c562ac2cc6d02c433bf0587379c09a49080795), [`649e6b16a`](https://github.com/Khan/perseus/commit/649e6b16ab67fad694cde5473bcfb3abb719a57d), [`07779783a`](https://github.com/Khan/perseus/commit/07779783ae0e3a19c0c72e95a8eaa0b58a9cc968), [`cac39013b`](https://github.com/Khan/perseus/commit/cac39013bd59a5ef73f151e1170dec83b463f076), [`163dd67d2`](https://github.com/Khan/perseus/commit/163dd67d2a8e119bc18191816668352e43292da2)]:
    -   @khanacademy/perseus-core@3.5.0
    -   @khanacademy/kmath@0.3.3
    -   @khanacademy/kas@0.4.14

## 2.1.0

### Minor Changes

-   [#2165](https://github.com/Khan/perseus/pull/2165) [`c8e383b46`](https://github.com/Khan/perseus/commit/c8e383b469426182a1392ca6ad2cde21b61e2f40) Thanks [@handeyeco](https://github.com/handeyeco)! - Move scorePerseusItem logic to PerseusScore

### Patch Changes

-   Updated dependencies [[`a21fd908d`](https://github.com/Khan/perseus/commit/a21fd908d705c5b9de56f29af54d726824f5668e), [`781834332`](https://github.com/Khan/perseus/commit/781834332921f839028aa5cb3c5c867121859e02), [`af8f5d3ca`](https://github.com/Khan/perseus/commit/af8f5d3cac1f642bb5f0c96a2f536990c277224f), [`a470c799e`](https://github.com/Khan/perseus/commit/a470c799eb53c87e08fb2f829b27e114ca80f63f), [`97e07c8ba`](https://github.com/Khan/perseus/commit/97e07c8baee12a37e471e8292dedbcf0588e2f50), [`dbd496769`](https://github.com/Khan/perseus/commit/dbd496769e210fc4aca33778a567a99ff1654e7e), [`3c4c6bc92`](https://github.com/Khan/perseus/commit/3c4c6bc9207f6f2d65312df1c2bd5bf5246182a2), [`c8e383b46`](https://github.com/Khan/perseus/commit/c8e383b469426182a1392ca6ad2cde21b61e2f40), [`564447af2`](https://github.com/Khan/perseus/commit/564447af2c030143c303c7ec88b055bab324fff1)]:
    -   @khanacademy/perseus-core@3.4.0
    -   @khanacademy/kmath@0.3.2
    -   @khanacademy/kas@0.4.13

## 2.0.0

### Major Changes

-   [#2153](https://github.com/Khan/perseus/pull/2153) [`29a1c656e`](https://github.com/Khan/perseus/commit/29a1c656ee7f74b6eba8ce95fa9c239b2f328813) Thanks [@jeremywiebe](https://github.com/jeremywiebe)! - Rename all instances of the term "ScoringData" back to "Rubric"

### Patch Changes

-   Updated dependencies [[`8f8955718`](https://github.com/Khan/perseus/commit/8f89557185f7bed910251520863ed1c8ed3a4410), [`d7bcb14c3`](https://github.com/Khan/perseus/commit/d7bcb14c398059be0be20bea118f9fee1dfc93f6), [`685774f2e`](https://github.com/Khan/perseus/commit/685774f2eae44e4cd5e0d6341a209012cf7e9bcb), [`8a489600e`](https://github.com/Khan/perseus/commit/8a489600e3b0b474da36cc492671879d1372ea46), [`1a75ca628`](https://github.com/Khan/perseus/commit/1a75ca628405dbd9cbe8ee21d7a9039a78327c47), [`459c25074`](https://github.com/Khan/perseus/commit/459c2507472f104f521b5410feaa64402d473a43), [`0df0b1940`](https://github.com/Khan/perseus/commit/0df0b194012627a98708cfcafd1ad5eb76ad91e2), [`dc8118aa1`](https://github.com/Khan/perseus/commit/dc8118aa1e28e77d78a57bc13e50d1954e3f8f69), [`82fa90299`](https://github.com/Khan/perseus/commit/82fa902999d9d79a050fe9acf0031ba886b387fa), [`b4b3a3dbb`](https://github.com/Khan/perseus/commit/b4b3a3dbb5097b1225e9e5acdda254f2f1e66122), [`117e78d03`](https://github.com/Khan/perseus/commit/117e78d03f29304274c1d7cc206743439f94d6ef), [`7a984eba6`](https://github.com/Khan/perseus/commit/7a984eba6f1cec3df314ec245d2176f5db190548), [`f8c9d3574`](https://github.com/Khan/perseus/commit/f8c9d35743d2e8ccf12875ef91498543e2015576), [`1355d6cfc`](https://github.com/Khan/perseus/commit/1355d6cfcbd4cb44de3f05084744dbdefd19def8), [`75f43a8f4`](https://github.com/Khan/perseus/commit/75f43a8f41739df4831e589e0a2724e1c7169312), [`32cc4a45b`](https://github.com/Khan/perseus/commit/32cc4a45bd2df34a0620729ca659a8aec6bcd62a), [`ebf3695b6`](https://github.com/Khan/perseus/commit/ebf3695b69c7526279ef1c999f13b4e24be885be)]:
    -   @khanacademy/perseus-core@3.3.0
    -   @khanacademy/kas@0.4.12
    -   @khanacademy/kmath@0.3.1

## 1.1.0

### Minor Changes

-   [#2101](https://github.com/Khan/perseus/pull/2101) [`9cabe689a`](https://github.com/Khan/perseus/commit/9cabe689a7aa143f95adf4556bf5c10d654a66ae) Thanks [@handeyeco](https://github.com/handeyeco)! - Move scorers and validators to `perseus-score`

### Patch Changes

-   Updated dependencies [[`9cabe689a`](https://github.com/Khan/perseus/commit/9cabe689a7aa143f95adf4556bf5c10d654a66ae)]:
    -   @khanacademy/kmath@0.3.0
    -   @khanacademy/perseus-core@3.2.0
    -   @khanacademy/kas@0.4.11

## 1.0.0

### Major Changes

-   [#2086](https://github.com/Khan/perseus/pull/2086) [`bc3d955b5`](https://github.com/Khan/perseus/commit/bc3d955b57e847a379328fcc7cf276f42e0874dd) Thanks [@handeyeco](https://github.com/handeyeco)! - Init perseus-score, move AnswerTypes from perseus to perseus-score, move perseus-types in perseus to data-schema in perseus-core

### Patch Changes

-   Updated dependencies [[`bbf7f3b1b`](https://github.com/Khan/perseus/commit/bbf7f3b1be657c588270a3b47983c0aecbf84418), [`6cf647729`](https://github.com/Khan/perseus/commit/6cf6477291053d85faac48028b8f038fd0c28930), [`5173c2e43`](https://github.com/Khan/perseus/commit/5173c2e43bf939159f420dcd448b90691d52353b), [`bc3d955b5`](https://github.com/Khan/perseus/commit/bc3d955b57e847a379328fcc7cf276f42e0874dd), [`d2797bb2d`](https://github.com/Khan/perseus/commit/d2797bb2dc51bd80cb03f2c1eeb39286e4dfa45c)]:
    -   @khanacademy/perseus-core@3.1.0
    -   @khanacademy/kmath@0.2.0
    -   @khanacademy/kas@0.4.10
