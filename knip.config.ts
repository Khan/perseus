import type {KnipConfig} from "knip";

/**
 * knip is a tool for discovering dead code:
 * https://knip.dev/
 *
 * To use: `pnpm knip`
 */
const config: KnipConfig = {
    // About `project` and `entry`: Knip will only look for dead code in
    // `project` files. Files and exports in `project` are reported as unused
    // if they are not reachable from any of the `entry` files.
    // See: https://knip.dev/guides/configuring-project-files#unused-files
    // Paths marked with `!` are production files.
    workspaces: {
        ".": {
            project: ["{config,utils}/**/*.{ts,tsx,js,jsx}"],
            entry: [
                // CLI tools
                "utils/**/*.{ts,tsx,js,jsx}",
                "packages/perseus-core/src/parse-perseus-json/exhaustive-test-tool/index.ts",
            ],
        },
        "packages/*": {
            project: ["src/**/*.{ts,tsx,js,jsx}!"],
            entry: [
                "src/index.{ts,tsx}!",
                "src/**/*.cypress.{ts,tsx}",
                "src/**/*.test.{ts,tsx}",
                "src/**/*.typetest.{ts,tsx}",
                "src/**/*.stories.{ts,tsx}",
            ],
        },
    },
    rules: {
        dependencies: "error",
    },
    // Special exceptions
    ignore: [
        // These files contain test data. They are dynamically imported via
        // glob patterns, so Knip can't figure out that they're used.
        "packages/perseus-core/src/parse-perseus-json/regression-tests/{article,item,user-input}-data/**",
        // TODO(LEMS-3868)
        "packages/perseus-editor/src/preview/message-types.ts",
    ],
    // These are packages that are listed in package.json files but not
    // directly imported in our code.
    ignoreDependencies: [
        // perseus-build-settings is listed as a dependency so package
        // versions will get automatically bumped when there is a change to
        // our build tooling.
        "perseus-build-settings",
        // @swc-node/register is used in the shabang of executable TypeScript
        // files.
        "@swc-node/register",
        // nyc measures code coverage.
        "nyc",
        // swc_mut_cjs_exports is a plugin for swc, configured like
        // `swcrc.jsc.experimental.plugins.push(["swc_mut_cjs_exports", {}]);`
        // (hence, not imported).
        "swc_mut_cjs_exports",
    ],
    // Scripts we use in `package.json`
    ignoreBinaries: [
        "utils/pre-publish-check-ci.ts",
        "utils/update-catalog-hashes-cli.ts",
    ],
};

export default config;
