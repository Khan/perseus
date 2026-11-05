// Builds the content search index in Meilisearch from a local content
// snapshot: build-search-index.mjs <snapshot folder>, or the folder in
// PERSEUS_MCP_CONTENT_SNAPSHOT. Meilisearch's URL comes from
// PERSEUS_MCP_SEARCH_URL (default http://localhost:7700) and its key from
// PERSEUS_MCP_SEARCH_KEY. Registers swc first, as bin/perseus-mcp.mjs does,
// to run the TypeScript source.
import {register} from "node:module";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
process.env.SWC_NODE_PROJECT ??= path.join(repoRoot, "tsconfig.json");
register("@swc-node/register/esm", import.meta.url);

const snapshotDir = process.argv[2] ?? process.env.PERSEUS_MCP_CONTENT_SNAPSHOT;
if (snapshotDir == null) {
    process.stderr.write(
        "Give the content snapshot folder as an argument or in " +
            "PERSEUS_MCP_CONTENT_SNAPSHOT.\n",
    );
    process.exit(1);
}

// eslint-disable-next-line no-restricted-syntax
const {buildSearchIndex} = await import("./build-search-index-lib.ts");
const started = Date.now();
const result = await buildSearchIndex({
    snapshotDir: path.resolve(snapshotDir),
    url: process.env.PERSEUS_MCP_SEARCH_URL ?? "http://localhost:7700",
    apiKey: process.env.PERSEUS_MCP_SEARCH_KEY,
    log: (line) => process.stdout.write(`${line}\n`),
});
const seconds = Math.round((Date.now() - started) / 1000);
process.stdout.write(
    `Indexed ${result.items} items and ${result.articles} articles from ` +
        `snapshot ${result.snapshotVersion} in ${seconds}s. Skipped: ` +
        `${result.missingFiles} with no content file, ` +
        `${result.missingItems} items missing from their file, ` +
        `${result.unparsable} Perseus couldn't parse.\n`,
);
