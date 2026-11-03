// Builds the Claude Desktop extension's package directory, into the
// directory given (default dist/mcpb). Registers swc first, as
// bin/perseus-mcp.mjs does, to run the TypeScript source.
import {register} from "node:module";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
process.env.SWC_NODE_PROJECT ??= path.join(repoRoot, "tsconfig.json");
register("@swc-node/register/esm", import.meta.url);

// eslint-disable-next-line no-restricted-syntax
const {buildMcpb} = await import("./build-mcpb-lib.ts");
const outDir = path.resolve(process.argv[2] ?? "dist/mcpb");
await buildMcpb(outDir);
process.stdout.write(`Built the extension's package into ${outDir}\n`);
