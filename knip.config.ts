import type {KnipConfig} from "knip";

/**
 * knip is a tool for discovering dead code:
 * https://knip.dev/
 *
 * To use: `pnpm knip`
 */

// About `project` and `entry`: Knip will only look for dead code in `project`
// files. Files and exports in `project` are reported as unused if they are
// not reachable from any of the `entry` files.
// See: https://knip.dev/guides/configuring-project-files#unused-files
// Paths marked with `!` are production files.
const basePackageConfig = {
    project: [
        "src/**/*.{ts,tsx,js,jsx}!",
        "src/**/*.{cypress,mockData,stories,test,testdata,testutils,typetest}.{ts,tsx,js,jsx}",
    ],
    entry: [
        "src/index.{ts,tsx}!",
        "src/**/*.{cypress,stories,test,typetest}.{ts,tsx}",
    ],
};

// Base configuration for packages that contain non-production directories like
// __docs__, __testdata__, etc. Knip warns if this configuration is used for
// a package that has no such directories, which is why it's separate from the
// basePackageConfig.
const basePackageConfigWithTestHelpers = {
    ...basePackageConfig,
    project: [
        ...basePackageConfig.project,
        "src/**/{__docs__,__testdata__,__testutils__,testing}/**/*.{ts,tsx,js,jsx}",
    ],
};

// Configuration for packages that should not be checked by knip. By default,
// knip will analyze all packages listed in pnpm-workspace.yaml.
const ignoredPackageConfig = {
    project: [],
    entry: [],
};

const config: KnipConfig = {
    ignoreExportsUsedInFile: true,
    workspaces: {
        ".": {
            project: [
                "{config,utils}/**/*.{ts,tsx,js,jsx,mdx}",
            ],
            entry: [
                // CLI tools
                "utils/**/*.{ts,tsx,js,jsx}",
            ],
        },
        // FUTURE(benchristel): we might want to unignore these packages in the
        // future. Right now (2026), it's hard to make knip understand the
        // structure (I think it gets confused because `config/build` is
        // included in the `project` files for the root (".") workspace, but is
        // also a package) so checking these packages for unused code isn't
        // worth it.
        __docs__: ignoredPackageConfig,
        "config/build": ignoredPackageConfig,
        "config/cypress": {
            // Cypress loads this file through its supportFile setting.
            entry: ["support.ts"],
        },
        "config/eslint-plugin": {
            project: [
                "**/*.{ts,tsx,js,jsx}",
                // ESLint rule test fixtures are referenced by path (RuleTester
                // `filename`), never imported.
                "!rules/__fixtures__/**",
            ],
        },
        data: ignoredPackageConfig,
        "packages/*": basePackageConfig,
        "packages/kas": {
            ...basePackageConfig,
            project: [
                ...basePackageConfig.project,
                // The parser generator is a dev tool. Exclude it from the
                // production project.
                "!src/parser-generator.ts!",
            ],
        },
        "packages/math-input": basePackageConfigWithTestHelpers,
        "packages/perseus": basePackageConfigWithTestHelpers,
        "packages/perseus-editor": basePackageConfigWithTestHelpers,
        "packages/perseus-core": {
            ...basePackageConfig,
            entry: [
                ...basePackageConfig.entry,
                // These files contain test data. They are dynamically imported via
                // glob patterns, so Knip can't figure out that they're used.
                "src/parse-perseus-json/regression-tests/{article,item,user-input,renderer}-data/**",
                // CLI used for testing against production data.
                "src/parse-perseus-json/exhaustive-test-tool/index.ts",
                // Bundled by the item-splitting check in
                // .github/workflows/pr-comparison-checks.yml; nothing imports it.
                "src/index.item-splitting.ts",
            ],
        },
    },
    // These are packages that are listed in package.json files but not
    // directly imported in our code.
    ignoreDependencies: [
        // @internal/build-settings is listed as a dependency so package
        // versions will get automatically bumped when there is a change to
        // our build tooling.
        "@internal/build-settings",
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
};

export default config;
