/* eslint-disable import/no-commonjs */

import {spawnSync} from "child_process";
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
import less from "rollup-plugin-less";
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

// Kahn's algorithm
// https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
const topoSort = (yarnWorkspacesOutput) => {
    const sorted = [];
    // the keys are depended on by the values
    const reverseMapping /*: {[sink: string]: Array<string>} */ = {};
    Object.keys(yarnWorkspacesOutput).forEach((pkgName) => {
        yarnWorkspacesOutput[pkgName].workspaceDependencies.forEach((d) => {
            reverseMapping[d] = (reverseMapping[d] || []).concat([pkgName]);
        });
    });
    const noIncomingEdge = Object.keys(yarnWorkspacesOutput).filter(
        (sink) => !reverseMapping[sink],
    );
    while (noIncomingEdge.length) {
        const next = noIncomingEdge.shift();
        sorted.push(next);
        if (!yarnWorkspacesOutput[next]) {
            throw new Error(
                `Something was referenced that isn't in mapping: ${next}`,
            );
        }
        yarnWorkspacesOutput[next].workspaceDependencies.forEach((sink) => {
            reverseMapping[sink] = reverseMapping[sink].filter(
                (k) => k !== next,
            );
            if (!reverseMapping[sink].length) {
                noIncomingEdge.push(sink);
            }
        });
    }

    // We filter out packages that aren't packages we publish (such as the
    // build settings pseudo-package). We also reverse the order because Kahn's
    // algorithm gives us the dependency order in reverse of what we want.
    return sorted
        .filter((pkgName) => pkgName.startsWith("@khanacademy/"))
        .map((pkgName) => pkgName.replace("@khanacademy/", ""))
        .reverse();
};

/**
 * Calculates the list of packages to build (using `yarn workspaces info`) and
 * uses the dependency info that yarn gives us to return the package names in
 * the order we should build them.
 */
const getPackageDirNamesInBuildOrder = () => {
    // get info from `yarn workspaces info`
    const {stdout, error} = spawnSync(
        "yarn",
        ["--silent", "workspaces", "info"],
        {
            cwd: path.join(__dirname, "../.."),
        },
    );

    if (error) {
        // eslint-disable-next-line no-console
        console.error("Error calculating build order:", error);
        process.exit(1);
    }

    const depTree = JSON.parse(stdout);

    // Now use Kahn's Algorithm to determine package order.
    return topoSort(depTree);
};

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
            less({
                output: path.join(
                    rootDir,
                    "packages",
                    "perseus",
                    "dist",
                    "index.css",
                ),
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
const createRollupConfig = async (commandLineArgs) => {
    // For the packages we have determined we want, let's get more information
    // about them and generate configurations.
    return getPackageDirNamesInBuildOrder()
        .flatMap((p) => getPackageInfo(commandLineArgs, p))
        .map((c) => createConfig(commandLineArgs, c));
};

// eslint-disable-next-line import/no-default-export
export default createRollupConfig;
