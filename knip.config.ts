import type {KnipConfig} from "knip";

/**
 * knip is a tool for discovering dead code:
 * https://knip.dev/
 *
 * To use: `pnpm knip`
 */
const config: KnipConfig = {
    // Entrypoints to the code, including:
    // - Where our external APIs are exported from (index.ts).
    // - Tests and stories.
    // Paths marked with `!` are production files.
    entry: [
        "config/**/*.{ts,js}",
        "packages/*/src/index.ts!",
        "packages/*/src/**/*.cypress.ts",
        "packages/*/src/**/*.test.{ts,tsx}",
        "packages/*/src/**/*.stories.{ts,tsx}",
        "testing/**/*.{ts,tsx,js,jsx}",
        "utils/**/*.{ts,tsx,js,jsx}",
    ],
    // Where we want to look for dead code.
    // Paths marked with `!` are production files.
    project: ["packages/*/src/*.{ts,tsx,js,jsx}!"],
    rules: {
        dependencies: "error",
    },
    // Special exceptions
    ignore: [
        // symlinked type defs for third-party libs
        "**/aphrodite.d.ts",
        "**/assets.d.ts",
        "**/jsdiff.d.ts",
        "**/raphael.d.ts",
        "**/utility.d.ts",
        // these files are used by tests
        "packages/perseus-core/src/parse-perseus-json/**",
        // these need fixing
        // TODO(LEMS-3867)
        "packages/perseus-editor/src/components/__stories__/**",
        // TODO(LEMS-3868)
        "packages/perseus-editor/src/preview/message-types.ts",
    ],
    ignoreDependencies: [
        "perseus-build-settings",
        "@swc-node/register",
        "nyc",
        "swc_mut_cjs_exports",
    ],
    // Scripts we use in `package.json`
    ignoreBinaries: [
        "utils/pre-publish-check-ci.ts",
        "utils/update-catalog-hashes-cli.ts",
    ],
};

export default config;
