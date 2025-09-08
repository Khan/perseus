import type {KnipConfig} from "knip";

/**
 * knip is a tool for discovering dead code:
 * https://knip.dev/
 *
 * To use: `pnpm knip`
 */
const config: KnipConfig = {
    entry: [
        "{index,main,cli}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
        "src/{index,main,cli}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
    ],
    project: [
        "**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
        // dev tools
        "!utils/**",
        // there seems to be a bug with the knip Jest plugin?
        "!config/test/**",
    ],
    ignore: [
        // symlinked type defs for third-party libs
        "**/aphrodite.d.ts",
        "**/assets.d.ts",
        "**/jsdiff.d.ts",
        "**/raphael.d.ts",
        "**/utility.d.ts",
        // dev tools
        "wallaby.js",
        "data/find-questions.ts",
        // there seems to be a bug with the knip Jest plugin?
        "jest.config.js",
        // this file causes side-effects by importing it
        // so it's not "used" in the conventional sense
        "packages/perseus/src/util/interactive.ts",
        // type tests, code that's not run
        // but can trigger helpful TS errors when things change
        "**/*.typetest.ts",
    ],
};

export default config;
