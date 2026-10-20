import fs from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import ancesdir from "ancesdir";
import postcssImport from "postcss-import";

import {jsTarget, cssTarget} from "../browser-targets";
import {createCssAssetPlugin} from "../plugins/css-assets";
import {createVersionPlugin} from "../plugins/inject-package-version";

import {createExternal} from "./create-external";
import {isCssFile} from "./css-files";
import {getEntryPoints} from "./get-entry-points";
import {makeScopedClassName} from "./make-scoped-class-name";
import {parsePackageJson} from "./parse-package-json";

import type {BuildOptions} from "../types";
import type {InlineConfig} from "vite";

/**
 * Builds the Vite config for building one package in `packages/`.
 *
 * @param pkgName The package's directory name in `packages/`.
 * @param options Options from `build-packages.ts`'s command-line flags.
 */
export function createPackageConfig(
    pkgName: string,
    options: BuildOptions = {},
): InlineConfig {
    const rootDir = ancesdir(import.meta.dirname, "pnpm-workspace.yaml");
    const packageDir = path.join(rootDir, "packages", pkgName);
    const packageJson = parsePackageJson(
        JSON.parse(
            fs.readFileSync(path.join(packageDir, "package.json"), "utf8"),
        ),
    );
    const packageEntryPoints = getEntryPoints(packageJson);
    const entries = Object.fromEntries(
        Object.keys(packageEntryPoints).map((name) => [
            name,
            path.resolve(packageDir, packageEntryPoints[name]),
        ]),
    );
    const define: Record<string, string> = {__IS_BROWSER__: "true"};

    if (options.environment) {
        define["process.env.NODE_ENV"] = JSON.stringify(options.environment);
        if (options.environment === "production") {
            define["process.env.STORYBOOK"] = "false";
        }
    }

    return {
        configFile: false,
        root: rootDir,
        // Keep CSS asset URLs relative so consuming bundlers can relocate them.
        base: "./",
        define,
        plugins: [
            react(),
            createVersionPlugin(packageDir, packageJson.version),
        ],
        css: {
            modules: {
                localsConvention: "camelCase",
                generateScopedName: makeScopedClassName,
            },
            postcss: {
                plugins: [postcssImport(), createCssAssetPlugin()],
            },
        },
        build: {
            outDir: path.join(packageDir, "dist"),
            // Types will need to be rebuilt after, but this avoids stale
            // artifacts in our dist/ folders when building!
            emptyOutDir: true,
            sourcemap: true,
            minify: "oxc",
            watch: options.watch ? {} : null,
            // Controls how our build tooling transpiles the javascript (and
            // css if `cssTarget` is missing!) to ensure its compatible with
            // our minimum supported browser targets.
            target: jsTarget,
            // Controls how the build tooling processes CSS. This ensures the
            // CSS we bundle is compatible with our minimum supported browser
            // targets.
            cssTarget,
            lib: {
                entry: entries,
                formats: ["es"],
                fileName: (_format, entryName) => `${entryName}.js`,
                cssFileName: "index",
            },
            rolldownOptions: {
                external: createExternal(packageJson),
                output: {
                    entryFileNames: "[name].js",
                    chunkFileNames: "chunk-[name]-[hash].js",
                    assetFileNames: (assetInfo) =>
                        assetInfo.names.some(isCssFile)
                            ? "[name][extname]"
                            : "assets/[name][extname]",
                    // @khanacademy/kas has functionality that reflects on its
                    // own function names. Some of our production code
                    // _depends_ on those names not being mangled, so we enable
                    // 'keepNames' here!
                    keepNames: true,
                },
            },
        },
    };
}
