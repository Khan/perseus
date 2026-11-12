// Builds the bundles testers install in Claude Desktop, one per platform
// (macos-arm64, macos-x64, windows-x64, windows-arm64; all by default, or
// the ones named): dist/perseus-mcp-<platform>.zip, from folders in dist/bundle.
// Registers swc first, as bin/perseus-mcp.mjs does, to run the TypeScript
// source.
import {register} from "node:module";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
process.env.SWC_NODE_PROJECT ??= path.join(repoRoot, "tsconfig.json");
register("@swc-node/register/esm", import.meta.url);

const {buildBundles, isPlatform, PLATFORMS} = await import(
    // eslint-disable-next-line no-restricted-syntax
    "./build-bundle-lib.ts"
);
const named = process.argv.slice(2);
const unknown = named.filter((name) => !isPlatform(name));
if (unknown.length > 0) {
    process.stderr.write(
        `Unknown platform: ${unknown.join(", ")}. ` +
            `Use ${PLATFORMS.join(", ")}.\n`,
    );
    process.exit(1);
}
const zips = await buildBundles(
    path.resolve("dist/bundle"),
    named.length > 0 ? named : PLATFORMS,
);
process.stdout.write(`Built ${zips.join(", ")}\n`);
