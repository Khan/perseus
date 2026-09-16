import {build} from "vite";

import {createPackageConfig, getPackageNames} from "./vite.config.mts";

const getOption = (name: string) => {
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
