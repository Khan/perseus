// An asset import (an .svg file) is the asset's file name, so tests can check
// which asset a component uses.
import path from "node:path";

export default function basenameLoader() {
    // TODO: Are there RsPack types so we don't need untyped `this` here??
    return `module.exports = ${JSON.stringify(path.basename(this.resourcePath))};`;
}
