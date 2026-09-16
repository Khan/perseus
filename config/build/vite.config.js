import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

import react from "@vitejs/plugin-react-swc";
import MagicString from "magic-string";
import postcssImport from "postcss-import";
import postcssUrl from "postcss-url";
import {defineConfig} from "vite";

// Node's native ES module loader requires the file extension.
// eslint-disable-next-line no-restricted-syntax
import {getEntryPoints} from "./get-entry-points.js";

const rootDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../..",
);

const makeScopedClassName = (name, filename) => {
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

const isPackageImport = (id, packageName) =>
    id === packageName || id.startsWith(`${packageName}/`);

const createExternal = (pkgJson) => {
    const bundledDependencies = new Set(["jsdiff", "raphael"]);
    const externalDependencies = [
        ...Object.keys(pkgJson.dependencies ?? {}),
        ...Object.keys(pkgJson.peerDependencies ?? {}),
    ].filter((name) => !bundledDependencies.has(name));

    return (id) =>
        id.startsWith("@phosphor-icons/core/") ||
        externalDependencies.some((name) => isPackageImport(id, name));
};

const createCssAssetPlugins = (packageDir) => {
    const copiedAssets = new Map();

    return {
        postcss: postcssUrl({
            url(asset) {
                if (
                    !asset.absolutePath ||
                    /^(?:[a-z]+:|\/\/|#)/i.test(asset.url)
                ) {
                    return asset.url;
                }

                const name = path.basename(asset.absolutePath);
                copiedAssets.set(asset.absolutePath, name);
                return `assets/${name}${asset.hash ?? ""}`;
            },
        }),
        vite: {
            name: "copy-css-assets",
            writeBundle() {
                if (copiedAssets.size === 0) {
                    return;
                }

                const assetsDir = path.join(packageDir, "dist/assets");
                fs.mkdirSync(assetsDir, {recursive: true});
                for (const [source, name] of copiedAssets) {
                    fs.copyFileSync(source, path.join(assetsDir, name));
                }
            },
        },
    };
};

const createVersionPlugin = (pkgName, version) => {
    const versionFile = path.join(
        rootDir,
        "packages",
        pkgName,
        "src/version.ts",
    );

    return {
        name: "inject-package-version",
        transform(code, id) {
            if (id !== versionFile) {
                return;
            }

            const start = code.indexOf("__lib_version__");
            if (start === -1) {
                return;
            }

            const transformed = new MagicString(code);
            transformed.overwrite(
                start,
                start + "__lib_version__".length,
                version,
            );
            return {
                code: transformed.toString(),
                map: transformed.generateMap({hires: true, source: id}),
            };
        },
    };
};

export const createPackageConfig = (pkgName, options = {}) => {
    const packageDir = path.join(rootDir, "packages", pkgName);
    const pkgJson = JSON.parse(
        fs.readFileSync(path.join(packageDir, "package.json"), "utf8"),
    );
    const entries = Object.fromEntries(
        Object.entries(getEntryPoints(pkgJson)).map(([name, source]) => [
            name,
            path.resolve(packageDir, source),
        ]),
    );
    const define = {__IS_BROWSER__: "true"};
    const cssAssetPlugins = createCssAssetPlugins(packageDir);

    if (options.environment) {
        define["process.env.NODE_ENV"] = JSON.stringify(options.environment);
        if (options.environment === "production") {
            define["process.env.STORYBOOK"] = "false";
        }
    }

    return defineConfig({
        configFile: false,
        root: rootDir,
        resolve: {
            alias: {
                jsdiff: path.join(rootDir, "vendor/jsdiff"),
                raphael: path.join(rootDir, "vendor/raphael"),
            },
        },
        define,
        plugins: [
            react(),
            createVersionPlugin(pkgName, pkgJson.version),
            cssAssetPlugins.vite,
        ],
        css: {
            modules: {
                localsConvention: "camelCase",
                generateScopedName: makeScopedClassName,
            },
            postcss: {
                plugins: [postcssImport(), cssAssetPlugins.postcss],
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
    });
};

export const getPackageNames = () =>
    fs
        .readdirSync(path.join(rootDir, "packages"))
        .filter((name) =>
            fs.existsSync(path.join(rootDir, "packages", name, "package.json")),
        );
