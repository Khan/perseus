// An asset import (an .svg file) is the asset's file name, so tests can check
// which asset a component uses.
import path from "node:path";

import type {LoaderContext} from "@rspack/core";

export default function basenameLoader(this: LoaderContext): string {
    return `module.exports = ${JSON.stringify(path.basename(this.resourcePath))};`;
}
