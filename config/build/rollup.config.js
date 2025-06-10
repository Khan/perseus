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
import autoExternal from "rollup-plugin-auto-external";
import filesize from "rollup-plugin-filesize";
import postcss from "rollup-plugin-postcss";

const rootDir = ancesdir(__dirname);

/**
 * We support the following config args with this rollup configuration:
 *
 * --configFormats
 *      A comma-delimited list of formats to build.
 *      Valid options are "cjs" and "esm".
 *      Default: cjs, esm
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
const createOutputConfig = (pkgName, format, targetFile) => ({
    file: makePackageBasedPath(pkgName, targetFile),
    sourcemap: true,
    format,

    // These two settings are to keep the builds as similar to pre-Rollup v4 as
    // possible until we get rid of CJS builds.
    // See: https://rollupjs.org/migration/#changed-defaults
    esModule: true,
    interop: "compat",

    // Governs names of CSS files (for assets from CSS use `hash` option for
    // url handler).
    // Note: using value below will put `.css` files near js,
    // but make sure to adjust `hash`, `assetDir` and `publicPath`
    // options for url handler accordingly.
    assetFileNames: "[name][extname]",
});

/**
 * Get a set of strings from a given string, returning the defaults
 *
 * This assumes comma-delimited strings.
 */
const getSetFromDelimitedString = (arg, defaults) => {
    const values =
        arg != null && arg.length > 0
            ? arg
                  .split(",")
                  .map((p) => p.trim())
                  .filter(Boolean)
            : [];
    return new Set(values.length ? values : defaults);
};

/**
 * Determine what formats we are targetting.
 */
const getFormats = ({configFormats}) =>
    getSetFromDelimitedString(configFormats, ["cjs", "esm"]);

/**
 * Generate a rollup configuration.
 */
const createConfig = (
    commandLineArgs,
    {name, fullName, version, format, platform, inputFile, file, plugins},
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

    const config = {
        output: createOutputConfig(name, format, file),
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
                plugins: [postcssImport()],
                modules: {
                    localsConvention: "camelCase",
                    generateScopedName: function (name, filename, css) {
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
 * To determine what those outputs are, we read the `package.json` file for
 * each package. If the package has a `browser` field, then we generate
 * browser and node assets. If not, we just generate the node assets.
 * Note that we also get the output paths from the package.json.
 *
 * We also can filter the outputs based on command line options:
 * `--configPlatforms` - Comma-separated list. Valid values are "browser"
 *                       and "node".
 * `--configFormats`   - Comma-separated list. Valid values are "cjs" and
 *                       "esm". If not specified, then we generate both.
 */
const getPackageInfo = (commandLineArgs, pkgName) => {
    const pkgJsonPath = makePackageBasedPath(pkgName, "./package.json");
    if (!fs.existsSync(pkgJsonPath)) {
        return [];
    }
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath));

    // Determine what formats and platforms we are building.
    const formats = getFormats(commandLineArgs);

    const configs = [];

    if (pkgJson.exports) {
        for (const exportConfig of Object.values(pkgJson.exports)) {
            if (exportConfig.require && formats.has("cjs")) {
                configs.push({
                    name: pkgName,
                    fullName: pkgJson.name,
                    version: pkgJson.version,
                    format: "cjs",
                    platform: "browser",
                    inputFile: exportConfig.source,
                    file: exportConfig.require,
                    plugins: [],
                });
            }

            if (exportConfig.import && formats.has("esm")) {
                configs.push({
                    name: pkgName,
                    fullName: pkgJson.name,
                    version: pkgJson.version,
                    format: "esm",
                    platform: "browser",
                    inputFile: exportConfig.source,
                    file: exportConfig.import,
                    plugins: [filesize()],
                });
            }
        }
    } else {
        if (formats.has("cjs")) {
            configs.push({
                name: pkgName,
                fullName: pkgJson.name,
                version: pkgJson.version,
                format: "cjs",
                platform: "browser",
                inputFile: pkgJson.source,
                file: pkgJson.main,
                plugins: [],
            });
        }
        if (formats.has("esm")) {
            configs.push({
                name: pkgName,
                fullName: pkgJson.name,
                version: pkgJson.version,
                format: "esm",
                platform: "browser",
                inputFile: pkgJson.source,
                file: pkgJson.module,
                // We care about the file size of this one.
                plugins: [filesize()],
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
        .flatMap((p) => getPackageInfo(commandLineArgs, p))
        .map((c) => createConfig(commandLineArgs, c));
    return results;
};

// eslint-disable-next-line import/no-default-export
export default createRollupConfig;
