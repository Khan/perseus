// Builds the preview pages for serving without Vite, into the directory
// given (default dist/pages). Serve them with `perseus-mcp --pages <dir>`.
// Registers swc first, as bin/perseus-mcp.mjs does, to run the TypeScript
// source.
import {register} from "node:module";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
process.env.SWC_NODE_PROJECT ??= path.join(repoRoot, "tsconfig.json");
register("@swc-node/register/esm", import.meta.url);

// eslint-disable-next-line no-restricted-syntax
const {buildPages} = await import("./build-pages-lib.ts");
const outDir = path.resolve(process.argv[2] ?? "dist/pages");
await buildPages(outDir);
process.stdout.write(`Built the preview pages into ${outDir}\n`);
