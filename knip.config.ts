import type {KnipConfig} from "knip";

const base: KnipConfig = {
    entry: [
        "{index,main,cli}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
        "src/{index,main,cli}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
    ],
    project: ["**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}"],
};

const config: KnipConfig = {
    entry: [
        // default
        "{index,main,cli}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
        "src/{index,main,cli}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
    ],
    project: [
        // default
        "**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
        // dev tools
        "!utils/**",
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
    ],
};

// export default config;
export default base;
