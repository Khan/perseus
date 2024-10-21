import type {KnipConfig} from "knip";

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
        "**/hubble.d.ts",
        "**/jsdiff.d.ts",
        "**/raphael.d.ts",
        "**/utility.d.ts",
        // dev tools
        "wallaby.js",
        "data/find-questions.ts",
        // there seems to be a bug with the knip Jest plugin?
        "jest.config.js",
    ],
};

export default config;
