import {build} from "vite";

// Node's native ES module loader requires the file extension.
// eslint-disable-next-line no-restricted-syntax
import {createPackageConfig, getPackageNames} from "./vite.config.js";

const getOption = (name) => {
    const prefix = `--${name}=`;
    const argument = process.argv.find((value) => value.startsWith(prefix));
    return argument?.slice(prefix.length);
};

const options = {
    environment: getOption("configEnvironment"),
    watch: process.argv.includes("--watch"),
};

for (const packageName of getPackageNames()) {
    await build(createPackageConfig(packageName, options));
}
