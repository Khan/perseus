/* eslint-disable import/no-commonjs */
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

const rootDir = ancesdir(__dirname);

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
    return path.normalize(
        path.join("packages", pkgName, pkgJson.exports["."].source),
    );
};

/**
 * Generate a rollup configuration.
 */
const createConfig = (
    commandLineArgs,
    {name, fullName, version, inputFile, file},
) => {
    const valueReplacementMappings = {
        __IS_BROWSER__: true,
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
    const outputFile = makePackageBasedPath(name, file);
    const config = {
        output: {
            file: outputFile,
            sourcemap: true,
            format: "esm",

            // Governs names of CSS files (for assets from CSS use `hash` option for
            // url handler).
            // Note: using value below will put `.css` files near js,
            // but make sure to adjust `hash`, `assetDir` and `publicPath`
            // options for url handler accordingly.
            assetFileNames: "[name][extname]",
        },
        input: makePackageBasedPath(name, inputFile),
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
                            path.join(
                                path.dirname(outputFile),
                                "assets",
                            ),
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
                browser: true,
                extensions,
            }),
            autoExternal({
                packagePath: makePackageBasedPath(name, "./package.json"),
            }),
            filesize(),
        ],
    };

    return config;
};

/**
 * Get the configurations for building a package.
 *
 * For each package in our packages folder, generate the outputs we want.
 *
 * To determine what those outputs are, we read the `package.json` file for
 * each package. If the package has a `browser` field, then we generate
 * browser and node assets. If not, we just generate the node assets.
 * Note that we also get the output paths from the package.json.
 */
const getPackageInfo = (pkgName) => {
    const pkgJsonPath = makePackageBasedPath(pkgName, "./package.json");
    if (!fs.existsSync(pkgJsonPath)) {
        return [];
    }
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath));

    const configs = [];

    if (!pkgJson.exports) {
        throw new Error(
            `${pkgName} does not define the required 'exports' field.`,
        );
    }

    for (const exportConfig of Object.values(pkgJson.exports)) {
        if (exportConfig.import) {
            configs.push({
                name: pkgName,
                fullName: pkgJson.name,
                version: pkgJson.version,
                format: "esm",
                platform: "browser",
                inputFile: exportConfig.source,
                file: exportConfig.import,
            });
        }
    }

    return configs;
};

/**
 * Creates the full rollup configuration for the given args.
 */
const createRollupConfig = async (commandLineArgs) => {
    // For the packages we have determined we want, let's get more information
    // about them and generate configurations.
    const results = fs
        .readdirSync("packages")
        .flatMap((p) => getPackageInfo(p))
        .map((c) => createConfig(commandLineArgs, c));

    return results;
};

// eslint-disable-next-line import/no-default-export
export default createRollupConfig;
