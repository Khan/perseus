import type {KnipConfig} from "knip";

/**
 * knip is a tool for discovering dead code:
 * https://knip.dev/
 *
 * To use: `pnpm knip`
 */
const config: KnipConfig = {
    // Where our external APIs are exported from
    entry: ["packages/*/src/index.ts"],
    // Where we want to look for dead code
    project: ["packages/*/src/*.{ts,tsx,js,jsx}"],
    rules: {
        // TODO, we need to turn this back on
        // but it will require going through unused deps
        dependencies: "off",
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
        "jest.config.js",
        "config/test/**",
        // these need fixing
        // TODO(LEMS-3867)
        "packages/perseus-editor/src/components/__stories__/**",
        // TODO(LEMS-3868)
        "packages/perseus-editor/src/preview/message-types.ts",
    ],
    // Scripts we use in `package.json`
    ignoreBinaries: [
        "utils/pre-publish-check-ci.ts",
        "utils/update-catalog-hashes-cli.ts",
    ],
};

export default config;
