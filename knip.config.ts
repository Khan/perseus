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
    project: ["src/**/*.{ts,tsx,js,jsx}!"],
    entry: [
        "src/index.{ts,tsx}!",
        "src/**/*.cypress.{ts,tsx}",
        "src/**/*.test.{ts,tsx}",
        "src/**/*.typetest.{ts,tsx}",
        "src/**/*.stories.{ts,tsx}",
    ],
};

const config: KnipConfig = {
    // .pi/ holds local agent tooling that git ignores, but knip still picks
    // up its files.
    ignore: [".pi/**"],
    // Knip only parses JS and TS files. To follow imports in other file
    // types, it runs a "compiler" that turns a file into JS/TS source it can
    // parse. See: https://knip.dev/features/compilers
    //
    // Storybook docs pages (.mdx) import components, stories, and packages,
    // so without this knip reports those as unused. Knip has a built-in MDX
    // compiler, but in this version it only turns on when an MDX package
    // (e.g. @mdx-js/mdx) is a direct dependency, and none is here. (Knip 6
    // can turn it on with `mdx: true` instead.)
    //
    // Knip only needs the import statements, so this returns the lines that
    // start with `import`. It first removes fenced code blocks, because the
    // docs show sample imports (e.g. of @khanacademy/perseus-score) that
    // aren't real. An import split over several lines would break this;
    // none of our .mdx files has one.
    compilers: {
        mdx: (text: string) =>
            text
                .replace(/```[\s\S]*?```/g, "")
                .match(/^import\s.+$/gm)
                ?.join("\n") ?? "",
    },
    workspaces: {
        ".": {
            project: ["{config,utils}/**/*.{ts,tsx,js,jsx}"],
            entry: [
                // CLI tools
                "utils/**/*.{ts,tsx,js,jsx}",
            ],
        },
        "packages/*": basePackageConfig,
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
        // @swc/helpers is referenced via externalHelpers in .swcrc, not imported directly.
        "@swc/helpers",
        // We use esbuild for the item-splitting change check in a Github action.
        "esbuild",
    ],
    // Scripts we use in `package.json`
    ignoreBinaries: [
        "utils/changed-files.sh",
        "utils/lint.sh",
        "utils/pre-publish-check-ci.ts",
        "utils/update-catalog-hashes-cli.ts",
    ],
};

export default config;
