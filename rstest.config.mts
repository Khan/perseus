import path from "node:path";

import {defineConfig} from "@rstest/core";

export default defineConfig({
    globals: true,
    // Some test files run in node instead with an `@jest-environment node`
    // docblock.
    testEnvironment: "jsdom",
    include: ["**/*.test.{js,jsx,ts,tsx}"],
    // Skip in-repo git worktrees under .claude/, so their tests aren't found
    // twice.
    exclude: ["**/node_modules/**", "**/dist/**", ".claude/**"],
    setupFiles: [
        "./config/test/rstest/setup.ts",
        "./config/test/modules/custom-matchers.ts",
    ],
    restoreMocks: true,
    resetMocks: true,
    resolve: {
        alias: {
            // Tests that import from `@jest/globals` get Rstest's test
            // functions, and `rs` as `jest`. This is an adaptation JUST for
            // migration and will be cleaned up at the end of this Rstest
            // migration!
            "@jest/globals$": path.join(
                import.meta.dirname,
                "config/test/rstest/jest-globals.ts",
            ),
        },
    },
    output: {
        // Bundle node_modules packages in node-environment tests too (jsdom
        // tests already do), so loaders handle the .svg and .css files they
        // import.
        bundleDependencies: true,
        cssModules: {
            // A CSS module's class names are the names in its source, as they
            // were under Jest, so snapshots and class queries don't change.
            localIdentName: "[local]",
        },
    },
    tools: {
        // Changes the Rspack config that Rstest builds tests with, through
        // rspack-chain's API. `CHAIN_ID` names Rsbuild's built-in rules.
        bundlerChain: (chain, {CHAIN_ID}) => {
            // Rsbuild (on which Rstest is based) includes an SVG rule that
            // imports an .svg file as a URL. However, files under a certain
            // size become `data:` URLs of the whole file, and those make our
            // snapshots extremely noisy! So, we delete the built-in rule and
            // replace it with our own custom handling next.
            chain.module.rules.delete(CHAIN_ID.RULE.SVG);
            // This rule (and loader) imports an .svg file as its file name,
            // e.g. "trash-bold.svg", as Jest did:
            // - Snapshots contain it: `mask-image: url(trash-bold.svg)`.
            // - Tests find icons by it: `getByTestId("issues-icon-x.svg")`.
            chain.module
                // The name for this rule, but ignored by Rspack.
                .rule("svg-basename")
                .test(/\.svg$/)
                .type("javascript/auto")
                // Adds a loader (which transforms matching files) to this
                // rule. The name is ignored by Rspack.
                .use("basename")
                .loader(
                    path.join(
                        import.meta.dirname,
                        "config/test/rstest/basename-loader.mjs",
                    ),
                );
        },
        swc: {
            // SWC compiles our TypeScript and JSX for Rstest. `jsc` holds its
            // compiler options.
            jsc: {
                // Parse .ts and .tsx files.
                parser: {syntax: "typescript", tsx: true},
                // Compile JSX for React's automatic runtime, so files don't
                // need `import React`.
                transform: {react: {runtime: "automatic"}},
            },
        },
    },
});
