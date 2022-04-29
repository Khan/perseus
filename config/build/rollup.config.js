/* eslint-disable import/no-commonjs */
import fs from "fs";
import path from "path";

import alias from "@rollup/plugin-alias";
import {babel} from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import ancesdir from "ancesdir";
import autoExternal from "rollup-plugin-auto-external";
import copy from "rollup-plugin-copy";
import filesize from "rollup-plugin-filesize";
import styles from "rollup-plugin-styles";
import {terser} from "rollup-plugin-terser";

const createBabelPlugins = require("./create-babel-plugins.js");
const createBabelPresets = require("./create-babel-presets.js");

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
const makePackageBasedPath = (pkgName, pkgRelPath) =>
    path.normalize(path.join("packages", pkgName, pkgRelPath));

/**
 * Generate the rollup output configuration for a given package
 */
const createOutputConfig = (pkgName, format, targetFile) => ({
    file: makePackageBasedPath(pkgName, targetFile),
    sourcemap: true,
    format,

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
    {name, format, platform, inputFile, file, plugins},
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
    }

    const config = {
        output: createOutputConfig(name, format, file),
        input: makePackageBasedPath(name, inputFile || "./src/index.js"),
        plugins: [
            // We don't want to do process.env.NODE_ENV checks in our main
            // builds. Our consumers should handle that. However, if we
            // do our prod build, we do want to do this.
            replace({
                preventAssignment: true,
                values: valueReplacementMappings,
            }),
            alias({
                entries: {
                    hubble: path.join(rootDir, "vendor", "hubble"),
                    jsdiff: path.join(rootDir, "vendor", "jsdiff"),
                    raphael: path.join(rootDir, "vendor", "raphael"),
                },
            }),
            styles({
                mode: "extract",
                // We don't want to try to resolve the url() occurrences in our
                // stylesheets. We'll leave that for consumers of the library
                // to deal with. Otherwise we end up packaging upstream assets
                // into our libraries when our consumers should be the ones
                // handling asset bundling.
                url: false,
            }),
            babel({
                babelHelpers: "bundled",
                presets: createBabelPresets({platform, format}),
                plugins: createBabelPlugins({platform, format}),
                exclude: "node_modules/**",
            }),
            // This must come after babel() since this plugin doesn't know how
            // to deal with Flow types.
            commonjs(),
            resolve({
                browser: platform === "browser",
            }),
            autoExternal({
                packagePath: makePackageBasedPath(name, "./package.json"),
            }),
            terser(),
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

    // This generates the flow import file and a file for intellisense to work.
    // By using the same instance of it across all output configurations
    // while using the `copyOnce` value, we ensure it only gets copied one time.
    const typesAndDocsCopy = copy({
        copyOnce: true,
        verbose: true,
        targets: [
            // This is the file that provides flow types.
            {
                // src path is relative to the package root unless started
                // with ./
                src: "config/build/index.js.flow.template",
                // dest path is relative to src path.
                dest: makePackageBasedPath(pkgName, "./dist"),
                rename: "index.js.flow",
            },
            // This is the file that we use for intellisense.
            {
                // src path is relative to the package root unless started
                // with ./
                src: "config/build/index.js.flow.template",
                // dest path is relative to src path.
                dest: makePackageBasedPath(pkgName, "./dist"),
                rename: "index.d.ts",
            },
        ],
    });

    const configs = [];
    if (formats.has("cjs")) {
        configs.push({
            name: pkgName,
            format: "cjs",
            platform: "browser",
            file: pkgJson.main,
            plugins: [typesAndDocsCopy],
        });
    }
    if (formats.has("esm")) {
        configs.push({
            name: pkgName,
            format: "esm",
            platform: "browser",
            file: pkgJson.module,
            // We care about the file size of this one.
            plugins: [typesAndDocsCopy, filesize()],
        });
    }

    return configs;
};

/**
 * Creates the full rollup configuration for the given args.
 */
const createRollupConfig = (commandLineArgs) => {
    // Determine what packages we are building.
    const pkgNames = fs.readdirSync("packages");

    // For the packages we have determined we want, let's get more information
    // about them and  generate configurations.
    return pkgNames
        .flatMap((p) => getPackageInfo(commandLineArgs, p))
        .map((c) => createConfig(commandLineArgs, c));
};

// eslint-disable-next-line import/no-default-export
export default createRollupConfig;
