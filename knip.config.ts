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
        // TODO(LEMS-3867): fix these
        "packages/perseus-editor/src/components/__stories__/**",
    ],
    // Scripts we use in `package.json`
    ignoreBinaries: [
        "utils/pre-publish-check-ci.ts",
        "utils/update-catalog-hashes-cli.ts",
    ],
};

export default config;
