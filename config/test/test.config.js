/**
 * This is the main jest config. Workspace packages without a `react`
 * dependency run in the node test environment; everything else runs in jsdom.
 */
const fs = require("fs");
const path = require("path");

const ancesdir = require("ancesdir");

const root = ancesdir(__dirname, "pnpm-workspace.yaml");

// NOTE: We need to use this plugin in order to turn the module exports
// into module.exports. This will make it so that we can mock exports
// correctly.
const swcrc = JSON.parse(fs.readFileSync(path.join(root, ".swcrc"), "utf8"));
// Check it out - Nullish coalescing _assignment_!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment
swcrc.jsc ??= {};
swcrc.jsc.experimental ??= {};
swcrc.jsc.experimental.plugins ??= [];
swcrc.jsc.experimental.plugins.push(["swc_mut_cjs_exports", {}]);

// Jest workers sometimes segfault and crash. Reducing maxWorkers seems to
// help. On our dev laptops with 12 cores, Jest defaults to 13 workers when
// maxWorkers is not set, so I've reduced it to 10. The test suite seems to run
// faster with 10 workers, too (16s vs. 18s). This setting is not applied on CI.
const maxWorkersConfig = process.env.CI ? {} : {maxWorkers: 10};

// Workspace packages without a `react` dependency, and the repo scripts in
// `utils/`. Their code also runs outside the browser, so their tests run in
// node: code that depends on the DOM fails there instead of passing under
// jsdom.
const nodePackageDirs = fs
    .readdirSync(path.join(root, "packages"))
    .filter((name) => {
        const file = path.join(root, "packages", name, "package.json");
        if (!fs.existsSync(file)) {
            return false;
        }
        const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
        return !["dependencies", "peerDependencies", "devDependencies"].some(
            (field) => pkg[field]?.react,
        );
    })
    .map((name) => `<rootDir>/packages/${name}/`);
const nodeDirs = [...nodePackageDirs, "<rootDir>/utils/"];

const testFilePatterns = [
    "**/*.test.js",
    "**/*.test.jsx",
    "**/*.test.ts",
    "**/*.test.tsx",
];

// Options shared by both projects.
/** @type {import('jest').Config} */
const projectConfig = {
    setupFiles: [],
    transform: {
        "^.+\\.(j|t)sx?$": ["@swc/jest", swcrc],
        // Compile .svg files using a custom transformer that returns the
        // basename of the file being transformed.
        "^.+.svg$": "<rootDir>/config/test/svg.transform.js",
        // This is needed to pull in the class names from CSS Modules files.
        // Otherwise, they just show up as undefined, which prevents unit testing.
        "^.+\\.module\\.css$": "jest-css-modules-transform",
    },
    // Allow transforming files imported from @phosphor-icons/core (required
    // by the .svg transform above) and @preact/signals-core (a dependency of
    // @dnd-kit that only ships untranspiled ESM).
    transformIgnorePatterns: [
        "/node_modules/.pnpm/(?!(@phosphor-icons.core|@preact.signals-core)@)",
    ],
    restoreMocks: true,
    resetMocks: true,
    // Exclude in-repo git worktrees (e.g. Claude Code agent worktrees under
    // .claude/) so their duplicate package.json files don't collide in Jest's
    // Haste module map and their tests aren't discovered twice.
    modulePathIgnorePatterns: ["<rootDir>/\\.claude/"],
    testPathIgnorePatterns: ["/node_modules/", "<rootDir>/\\.claude/"],
    setupFilesAfterEnv: [
        "<rootDir>/config/test/test-setup.ts",
        "<rootDir>/config/test/custom-matchers.ts",
        "<rootDir>/config/test/crypto-polyfill.js",
        "<rootDir>/config/test/aphrodite-snapshot-serializer.js",
    ],
    moduleNameMapper: {
        // Load a .js file with no exports whenever a .css file is requested.
        "(?<!\\.module)\\.css$": "<rootDir>/config/test/style-mock.js",
    },
};

/** @type {import('jest').Config} */
module.exports = {
    // Options that Jest reads only from the top-level config.
    coverageDirectory: "<rootDir>/coverage/jest/",
    collectCoverageFrom: [
        "packages/*/src/**/*.js",
        "packages/*/src/**/*.jsx",
        "packages/*/src/**/*.ts",
        "packages/*/src/**/*.tsx",
        "!packages/*/node_modules/",
        "!**/__tests__/**",
        "!**/__testutils__/**",
        "!**/__docs__/**",
        "!**/__stories__/**",
        "!**/*.stories.tsx",
        "!**/*.testdata.ts",
    ],
    coverageProvider: "v8",
    ...maxWorkersConfig,
    // Disable watchman when running under Claude Code.
    // Watchman doesn't work under Claude Code's sandbox, and `watchman: false`
    // must be set at the global config level (not per-project) to take effect.
    ...(!!process.env.CLAUDECODE && {watchman: false}),
    projects: [
        {
            ...projectConfig,
            displayName: "node",
            testEnvironment: "node",
            testMatch: nodeDirs.flatMap((dir) =>
                testFilePatterns.map((pattern) => `${dir}${pattern}`),
            ),
        },
        {
            ...projectConfig,
            displayName: "jsdom",
            testEnvironment: "jsdom",
            testMatch: testFilePatterns.map(
                (pattern) => `<rootDir>/${pattern}`,
            ),
            testPathIgnorePatterns: [
                ...projectConfig.testPathIgnorePatterns,
                ...nodeDirs,
            ],
        },
    ],
};
