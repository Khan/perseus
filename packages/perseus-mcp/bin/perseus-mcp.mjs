#!/usr/bin/env node
// Runs the server straight from its TypeScript sources, like the rest of the
// monorepo's dev tooling. MCP hosts such as Claude Desktop launch it from any
// working directory, so swc's loader is registered relative to this file: a
// `node --import` shebang, and swc-node's own `esm-register` entry point,
// both resolve it from the working directory instead.
import {register} from "node:module";
import path from "node:path";
import {fileURLToPath} from "node:url";

const repoRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../..",
);
process.env.SWC_NODE_PROJECT ??= path.join(repoRoot, "tsconfig.json");

register("@swc-node/register/esm", import.meta.url);
// The server has no build step; swc compiles the `.ts` source as it loads.
// eslint-disable-next-line no-restricted-syntax
await import("../src/main.ts");
