// Builds the bundle testers install in Claude Desktop: its folder (default
// dist/bundle/perseus-mcp) and the zip of it (default
// dist/perseus-mcp-macos-arm64.zip). Registers swc first, as
// bin/perseus-mcp.mjs does, to run the TypeScript source.
import {register} from "node:module";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
process.env.SWC_NODE_PROJECT ??= path.join(repoRoot, "tsconfig.json");
register("@swc-node/register/esm", import.meta.url);

// eslint-disable-next-line no-restricted-syntax
const {buildBundle} = await import("./build-bundle-lib.ts");
const outDir = path.resolve(process.argv[2] ?? "dist/bundle");
const zipFile = path.resolve(
    process.argv[3] ?? "dist/perseus-mcp-macos-arm64.zip",
);
await buildBundle(outDir, zipFile);
process.stdout.write(`Built the bundle into ${zipFile}\n`);
