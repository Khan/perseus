import crypto from "crypto";
import fs from "fs";
import path from "path";

import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import swc from "@rollup/plugin-swc";
import ancesdir from "ancesdir";
import postcssImport from "postcss-import";
import postcssUrl from "postcss-url";
import autoExternal from "rollup-plugin-auto-external";
import filesize from "rollup-plugin-filesize";
import postcss from "rollup-plugin-postcss";

import {getEntryPoints} from "./get-entry-points";

const rootDir = ancesdir(__dirname);

/**
 * We support the following config args with this rollup configuration:
 *
 * --configEnvironment
 *      A string to use as the NODE_ENV environment variable.
 *      Valid options are "development" and "production".
 *      Default: We do not target an environment so that consumers can benefit
 *               from the default behavior.
 */

/**
 * Make path to a package relative path.
 */
const makePackageBasedPath = (pkgName, pkgRelPath) => {
    if (pkgRelPath) {
        return path.normalize(path.join("packages", pkgName, pkgRelPath));
    }

    const pkgPath = path.normalize(
        path.join(rootDir, "packages", pkgName, "package.json"),
    );
    const pkgJson = require(pkgPath);
    return path.normalize(path.join("packages", pkgName, pkgJson.source));
};

/**
 * Generate the rollup output configuration for a given package
 */
const createOutputConfig = (pkgName) => ({
    dir: makePackageBasedPath(pkgName, "dist"),
    sourcemap: true,

    // Published packages support only ESM. Their package.json files declare
    // `"type": "module"` and expose no `require`, `main`, or `module` target,
    // so CommonJS consumers fail during module resolution.
    format: "esm",

    // Emit one file per public entry point and share modules used by multiple
    // entry points. In particular, stateful modules such as the widget registry
    // in `perseus-core/src/widgets/core-widget-registry.ts` must have one
    // runtime instance regardless of which entry point imports them. Shared
    // chunks ship in `dist/`, but are not public because package export maps do
    // not expose them.
    entryFileNames: "[name].js",
    chunkFileNames: "chunk-[name]-[hash].js",

    // Governs names of CSS files (for assets from CSS use `hash` option for
    // url handler).
    // Note: using value below will put `.css` files near js,
    // but make sure to adjust `hash`, `assetDir` and `publicPath`
    // options for url handler accordingly.
    assetFileNames: "[name][extname]",
});

/**
 * Generate a rollup configuration.
 */
const createConfig = (
    commandLineArgs,
    {name, version, platform, inputs, plugins},
) => {
    const valueReplacementMappings = {
        __IS_BROWSER__: platform === "browser",
    };

    // We don't normally target a specific environment, leaving that for
    // our consumers to do, but we may want to verify environment builds during
    // dev, so this config option lets us do that.
    if (commandLineArgs.configEnvironment) {
        valueReplacementMappings["process.env.NODE_ENV"] = JSON.stringify(
            commandLineArgs.configEnvironment,
        );

        // If we're doing a prod build we want to disable Storybook.
        if (commandLineArgs.configEnvironment === "production") {
            valueReplacementMappings["process.env.STORYBOOK"] = "false";
        }
    }

    const extensions = [".js", ".jsx", ".ts", ".tsx"];
    const outputConfig = createOutputConfig(name);

    const config = {
        output: outputConfig,
        input: Object.fromEntries(
            Object.entries(inputs).map(([entryName, inputFile]) => [
                entryName,
                makePackageBasedPath(name, inputFile),
            ]),
        ),
        external: [/@phosphor-icons\/core\/.*/],
        plugins: [
            // We don't want to do process.env.NODE_ENV checks in our main
            // builds. Our consumers should handle that. However, if we
            // do our prod build, we do want to do this.
            replace({
                preventAssignment: true,
                values: valueReplacementMappings,
            }),
            // This replace() plugin instance injects the current package
            // version and name into the output bundle. This provides useful
            // runtime information anywhere that Perseus is used.
            replace({
                preventAssignment: true,
                include: [makePackageBasedPath(name, "src/version.ts")],
                values: {
                    __lib_version__: version,
                },
            }),
            alias({
                // We don't use pnpm's workspace:* feature for these because
                // then they are marked as external and not bundled (by the
                // autoExternal() plugin). For now, this works!
                entries: {
                    jsdiff: path.join(rootDir, "vendor", "jsdiff"),
                    raphael: path.join(rootDir, "vendor", "raphael"),
                },
            }),
            postcss({
                extract: "index.css",
                minimize: true,
                sourceMap: true,
                plugins: [
                    postcssImport(),
                    // The postcssUrl() plugin is used to re-write relative
                    // paths in `url(...)` statements in our CSS to be relative
                    // to the `dist/` output folder. It also copies the files
                    // referenced by these `url()`s to the `dist/` folder also.
                    // This is mostly for the Symbola fonts referenced by
                    // Mathquill CSS.
                    //
                    // CAUTION: This PostCSS plugin is patched (using `pnpm
                    // patch`). You can see the patch in this repo at
                    // `patches/postcss-url.patch`. If you ever upgrade to a
                    // newer version of this plugin, please double-check that:
                    //   a) the font file copying still works (ie. the fonts are
                    //      copied to the `math-input/dist/assets` folder) and/or
                    //   b) if the patch is even needed anymore
                    postcssUrl({
                        url: "copy",
                        // The postcssUrl() plugin doesn't know anything about
                        // the Rollup build context. PostCSS doesn't pass it
                        // down, either. So we have to resort to giving it an
                        // absolute path so that the font files are copied to
                        // the correct place (the dist/ folder)
                        assetsPath: path.join(
                            rootDir,
                            outputConfig.dir,
                            "assets",
                        ),
                    }),
                ],
                modules: {
                    localsConvention: "camelCase",
                    generateScopedName: function (name, filename, css) {
                        /*  This function generates the class name for the compiled index.css file.
                            It generates a hash that uses the path of the filename along with the class name.
                            The resulting class name is "perseus_<8-digit-hash>".
                         */
                        if (filename.endsWith(".module.css")) {
                            const hash = crypto
                                .createHash("sha256")
                                .update(`${filename}:${name}`)
                                .digest("base64")
                                .replace(/[/+=]/g, "-") // Remove special characters for CSS compatibility
                                .slice(0, 8); // Limit to 8 characters
                            return `perseus_${hash}`;
                        } else {
                            return name;
                        }
                    },
                },
            }),
            swc({
                swc: {
                    swcrc: true,
                    minify: true,
                },
                exclude: "node_modules/**",
            }),
            // This must come after swc() since this plugin doesn't know how
            // to deal with TypeScript types.
            commonjs(),
            resolve({
                browser: platform === "browser",
                extensions,
            }),
            // Keep dependencies and peer dependencies external. This prevents
            // one Perseus package from bundling another package in this repo.
            autoExternal({
                packagePath: makePackageBasedPath(name, "./package.json"),
            }),
            ...plugins,
        ],
    };

    return config;
};

/**
 * Get the configurations for building a package.
 *
 * For each package in our packages folder, generate the outputs we want.
 *
 * Build each exports sub-path that declares both a `source` input and a
 * `default` published target. If the package has no exports map, build its
 * top-level `source` as `index`. All entry points build in one Rollup config so
 * Rollup can emit shared modules once. Bundles land in `dist/`, which each
 * package's `exports` field exposes.
 */
const getPackageInfo = (pkgName) => {
    const pkgJsonPath = makePackageBasedPath(pkgName, "./package.json");
    if (!fs.existsSync(pkgJsonPath)) {
        return null;
    }
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath));

    return {
        name: pkgName,
        version: pkgJson.version,
        platform: "browser",
        inputs: getEntryPoints(pkgJson),
        plugins: [filesize()],
    };
};

/**
 * Creates the full rollup configuration for the given args.
 */
const createRollupConfig = async (commandLineArgs) => {
    // For the packages we have determined we want, let's get more information
    // about them and generate configurations.
    const results = fs
        .readdirSync("packages")
        .map(getPackageInfo)
        .filter(Boolean)
        .map((c) => createConfig(commandLineArgs, c));
    return results;
};

export default createRollupConfig;
