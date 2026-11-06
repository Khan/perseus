// Builds the MCP Apps page for show_item and sends its HTML to the process
// that started it, over IPC. The server builds it in a process of its own
// because a production build sets NODE_ENV to "production" for the whole
// process (see productionBuild in vite-shared.ts), and the browser preview's
// Vite server, pre-bundling its dependencies in the same process at that
// moment, then bundled React's production build: every page failed with
// "_jsxDEV is not a function".
//
// Plain JavaScript: it registers swc first, as bin/perseus-mcp.mjs does, to
// load the TypeScript source.
import {register} from "node:module";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "../../../../..");
process.env.SWC_NODE_PROJECT ??= path.join(repoRoot, "tsconfig.json");
register("@swc-node/register/esm", import.meta.url);

try {
    // eslint-disable-next-line no-restricted-syntax
    const {buildAppPage} = await import("./vite-app-page.ts");
    process.send({html: await buildAppPage()});
} catch (error) {
    process.send({error: String(error?.stack ?? error)});
    process.exitCode = 1;
}
