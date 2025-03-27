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
import filesize from "rollup-plugin-filesize";
import styles from "rollup-plugin-styles";

const babelConfig = require("./babel.config");

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

    const config = {
        output: {
            file: makePackageBasedPath(name, file),
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
                less: {
                    math: "always",
                },
            }),
            babel({
                babelHelpers: "runtime",
                comments: false,
                presets: babelConfig.presets,
                plugins: babelConfig.plugins,
                exclude: "node_modules/**",
                extensions,
            }),
            // This must come after babel() since this plugin doesn't know how
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
        if (exportConfig.default) {
            configs.push({
                name: pkgName,
                fullName: pkgJson.name,
                version: pkgJson.version,
                format: "esm",
                platform: "browser",
                inputFile: exportConfig.source,
                file: exportConfig.default,
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
