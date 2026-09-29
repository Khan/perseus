import {parseArgs} from "node:util";

import {build} from "vite";

import {
    createPackageConfig,
    getPackageNames,
    type BuildOptions,
} from "./vite.config.mts";

const {values} = parseArgs({
    options: {
        configEnvironment: {type: "string"},
        watch: {type: "boolean"},
    },
    strict: true,
});

const options: BuildOptions = {
    environment: values.configEnvironment,
    watch: values.watch,
};

for (const packageName of getPackageNames()) {
    await build(createPackageConfig(packageName, options));
}
