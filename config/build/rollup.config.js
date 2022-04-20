/* eslint-disable import/no-commonjs */
import fs from "fs";
import path from "path";
import autoExternal from "rollup-plugin-auto-external";
import {babel} from "@rollup/plugin-babel";
import {terser} from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import filesize from "rollup-plugin-filesize";
import {preserveShebangs} from "rollup-plugin-preserve-shebangs";
import rollupExecutable from "rollup-plugin-executable-output";

const createBabelPresets = require("./create-babel-presets.js");
const createBabelPlugins = require("./create-babel-plugins.js");

/**
 * We support the following config args with this rollup configuration:
 *
 * --configPackages
 *      A comma-delimited list of package names to build.
 *      The "perseus-" portion can be omitted.
 *      Default: All packages.
 *
 * --configFormats
 *      A comma-delimited list of formats to build.
 *      Valid options are "cjs" and "esm".
 *      Default: cjs, esm
 *
 * --configPlatforms
 *      A comma-delimited list of platforms to build.
 *      Valid options are "browser" and "node".
 *      Default: browser, node
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
 * Generate the rollup output configuration for a given
 */
const createOutputConfig = (pkgName, format, targetFile) => ({
    file: makePackageBasedPath(pkgName, targetFile),
    sourcemap: true,
    format,
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
 * Determine what platforms we are targetting.
 */
const getPlatforms = ({configPlatforms}) =>
    getSetFromDelimitedString(configPlatforms, ["browser", "node"]);

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
            babel({
                babelHelpers: "bundled",
                presets: createBabelPresets({platform, format}),
                plugins: createBabelPlugins({platform, format}),
                exclude: "node_modules/**",
            }),
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
    const platforms = getPlatforms(commandLineArgs);
    const formats = getFormats(commandLineArgs);

    // Now we have the package.json, we need to look at the main, module, and
    // browser fields and values.
    const {main: cjsNode, module: esmNode, browser} = pkgJson;
    const cjsBrowser = browser == null ? null : browser[cjsNode];
    const esmBrowser = browser == null ? null : browser[esmNode];

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
    if (platforms.has("browser")) {
        if (formats.has("cjs") && cjsBrowser) {
            configs.push({
                name: pkgName,
                format: "cjs",
                platform: "browser",
                file: cjsBrowser,
                plugins: [typesAndDocsCopy],
            });
        }
        if (formats.has("esm") && esmBrowser) {
            configs.push({
                name: pkgName,
                format: "esm",
                platform: "browser",
                file: esmBrowser,
                // We care about the file size of this one.
                plugins: [typesAndDocsCopy, filesize()],
            });
        }
    }
    if (platforms.has("node")) {
        if (formats.has("cjs") && cjsNode) {
            configs.push({
                name: pkgName,
                format: "cjs",
                platform: "node",
                file: cjsNode,
                plugins: [typesAndDocsCopy],
            });
        }
        if (formats.has("esm") && esmNode) {
            configs.push({
                name: pkgName,
                format: "esm",
                platform: "node",
                file: esmNode,
                plugins: [typesAndDocsCopy],
            });
        }
    }

    // Figure out if there are any scripts that we need to generate.
    const binsPath = makePackageBasedPath(pkgName, "./src/bin");
    if (fs.existsSync(binsPath)) {
        const binFiles = fs.readdirSync(binsPath);

        for (const binFile of binFiles) {
            configs.push({
                name: pkgName,
                format: "cjs",
                platform: "node",
                file: `dist/bin/${binFile}`,
                inputFile: `./src/bin/${binFile}`,
                plugins: [preserveShebangs(), rollupExecutable()],
            });
        }
    }

    return configs;
};

const getPkgShortName = (pkgName) => pkgName.replace("perseus-", "");

/**
 * Determine the packages that we want to generate outputs for.
 */
const getPkgNames = (commandLineArgs) => {
    const {configPackages} = commandLineArgs;

    // Get the list of packages that we have in our packages folder.
    const actualPackages = fs.readdirSync("packages");

    // Parse the configPackages arg into an array of package names.
    const specificPackages = getSetFromDelimitedString(
        configPackages,
        actualPackages,
    );

    // Filter our list of actual packages to only those that were requested.
    const pkgNames = actualPackages.filter(
        (p) =>
            specificPackages.has(p) || specificPackages.has(getPkgShortName(p)),
    );

    // Perform some validation to help folks.
    if (
        specificPackages.length > 0 &&
        specificPackages.length !== pkgNames.length
    ) {
        // If we were asked for specific packages but we did not match them
        // all, then let's tell the caller which ones we couldn't find.
        const missingPackages = Array.from(specificPackages).filter(
            (s) => !pkgNames.some((p) => p.endsWith(s)),
        );
        throw new Error(
            `Could not find one or more of the requested packages: ${missingPackages}`,
        );
    } else if (pkgNames.length === 0) {
        // If we just don't have any packages right now, let's also report that.
        throw new Error("No packages found in /packages folder");
    }

    return pkgNames;
};

/**
 * Creates the full rollup configuration for the given args.
 *
 * If the `--configPackages` arg is included, we split it on commas and
 * take each as the name of a package to process. Otherwise, we process all
 * packages.
 */
const createRollupConfig = (commandLineArgs) => {
    // Determine what packages we are building.
    const pkgNames = getPkgNames(commandLineArgs);

    // For the packages we have determined we want, let's get more information
    // about them and  generate configurations.
    return pkgNames
        .flatMap((p) => getPackageInfo(commandLineArgs, p))
        .map((c) => createConfig(commandLineArgs, c));
};

// eslint-disable-next-line import/no-default-export
export default createRollupConfig;
