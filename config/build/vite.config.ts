import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

import react from "@vitejs/plugin-react";
import postcssImport from "postcss-import";

import {jsTarget} from "./browser-targets";
import {getEntryPoints} from "./get-entry-points";
import {parseBuildPackageMetadata} from "./package-json";
import {createCssAssetPlugin} from "./plugins/css-assets";
import {createVersionPlugin} from "./plugins/inject-package-version";

import type {InlineConfig} from "vite";

const rootDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../..",
);

export type BuildOptions = {
    environment?: string;
    watch?: boolean;
};

function makeScopedClassName(name: string, filename: string) {
    if (!filename.endsWith(".module.css")) {
        return name;
    }

    const hash = crypto
        .createHash("sha256")
        .update(`${filename}:${name}`)
        .digest("base64")
        .replace(/[/+=]/g, "-")
        .slice(0, 8);
    return `perseus_${hash}`;
}

function isPackageImport(id: string, packageName: string) {
    return id === packageName || id.startsWith(`${packageName}/`);
}

// Builds a function that returns `true` if the module should be treated as
// external and not bundled (we don't want to bundle any packages that are
// listed as a dependency or peerDependency!)
function createExternal(pkgJson: ReturnType<typeof parseBuildPackageMetadata>) {
    const bundledDependencies = new Set(["jsdiff", "raphael"]);
    const externalDependencies = [
        ...Object.keys(pkgJson.dependencies ?? {}),
        ...Object.keys(pkgJson.peerDependencies ?? {}),
    ].filter((name) => !bundledDependencies.has(name));

    return (id: string) =>
        // Always bundle CSS, including dependencies' stylesheets such as
        // mafs/core.css, so it all lands in dist/index.css.
        !id.endsWith(".css") &&
        (id.startsWith("@phosphor-icons/core/") ||
            externalDependencies.some((name) => isPackageImport(id, name)));
}

export function createPackageConfig(
    pkgName: string,
    options: BuildOptions = {},
): InlineConfig {
    const packageDir = path.join(rootDir, "packages", pkgName);
    const rawPackageJson: unknown = JSON.parse(
        fs.readFileSync(path.join(packageDir, "package.json"), "utf8"),
    );
    const packageJson = parseBuildPackageMetadata(rawPackageJson);
    const packageEntryPoints = getEntryPoints(rawPackageJson);
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
        resolve: {
            alias: {
                jsdiff: path.join(rootDir, "vendor/jsdiff"),
                raphael: path.join(rootDir, "vendor/raphael"),
            },
        },
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
            target: jsTarget,
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
                        assetInfo.names.some((name) => name.endsWith(".css"))
                            ? "[name][extname]"
                            : "assets/[name][extname]",
                },
            },
        },
    };
}

export function getPackageNames() {
    return fs
        .readdirSync(path.join(rootDir, "packages"))
        .filter((name) =>
            fs.existsSync(path.join(rootDir, "packages", name, "package.json")),
        );
}
