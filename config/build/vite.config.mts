import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

import react from "@vitejs/plugin-react";
import postcssImport from "postcss-import";

// Node's native ES module loader requires the file extension.
import {getEntryPoints} from "./get-entry-points.ts"; // eslint-disable-line no-restricted-syntax
// Node's native ES module loader requires the file extension.
import {createCssAssetPlugin} from "./plugins/css-assets.ts"; // eslint-disable-line no-restricted-syntax
// Node's native ES module loader requires the file extension.
import {createVersionPlugin} from "./plugins/inject-package-version.ts"; // eslint-disable-line no-restricted-syntax

import type {InlineConfig} from "vite";

const rootDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../..",
);

type PackageJson = {
    dependencies?: Record<string, string>;
    exports?: Record<string, unknown>;
    peerDependencies?: Record<string, string>;
    version: string;
};

type BuildOptions = {
    environment?: string;
    watch?: boolean;
};

const makeScopedClassName = (name: string, filename: string) => {
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
};

const isPackageImport = (id: string, packageName: string) =>
    id === packageName || id.startsWith(`${packageName}/`);

const createExternal = (pkgJson: PackageJson) => {
    const bundledDependencies = new Set(["jsdiff", "raphael"]);
    const externalDependencies = [
        ...Object.keys(pkgJson.dependencies ?? {}),
        ...Object.keys(pkgJson.peerDependencies ?? {}),
    ].filter((name) => !bundledDependencies.has(name));

    return (id: string) =>
        id.startsWith("@phosphor-icons/core/") ||
        externalDependencies.some((name) => isPackageImport(id, name));
};

export const createPackageConfig = (
    pkgName: string,
    options: BuildOptions = {},
): InlineConfig => {
    const packageDir = path.join(rootDir, "packages", pkgName);
    const pkgJson: PackageJson = JSON.parse(
        fs.readFileSync(path.join(packageDir, "package.json"), "utf8"),
    );
    const packageEntryPoints = getEntryPoints(pkgJson);
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
        plugins: [react(), createVersionPlugin(packageDir, pkgJson.version)],
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
            // Match the previous Rollup build: keep declarations emitted by
            // `build:types` when JavaScript is rebuilt.
            emptyOutDir: false,
            sourcemap: true,
            minify: "oxc",
            watch: options.watch ? {} : null,
            lib: {
                entry: entries,
                formats: ["es"],
                fileName: (_format, entryName) => `${entryName}.js`,
                cssFileName: "index",
            },
            rolldownOptions: {
                external: createExternal(pkgJson),
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
};

export const getPackageNames = () =>
    fs
        .readdirSync(path.join(rootDir, "packages"))
        .filter((name) =>
            fs.existsSync(path.join(rootDir, "packages", name, "package.json")),
        );
