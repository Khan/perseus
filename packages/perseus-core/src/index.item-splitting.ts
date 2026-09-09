/**
 * Entry point for the `check_item_splitting` job in
 * .github/workflows/pr-comparison-checks.yml, which esbuilds this file and
 * diffs the bundle between the base branch and the PR.
 *
 * That check is its only purpose. It is deliberately absent from
 * `package.json`'s `exports`, and `packages/tsconfig-shared.json` excludes it
 * from the build so no declaration ships for it. Publishing it would put a
 * second copy of the core widget registry in the package, separate from the
 * barrel's — registering through one would be invisible to the other.
 */
export {default as splitPerseusItem} from "./utils/split-perseus-item";
export * from "./utils/split-perseus-item";
