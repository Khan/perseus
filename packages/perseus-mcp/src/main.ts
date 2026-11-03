// The composition root: reads the command line, builds the adapters and use
// cases, and starts the server. Everything that knows about the process, the
// command line or how errors are shown to people lives here.
import {randomUUID} from "node:crypto";
import path from "node:path";
import {parseArgs} from "node:util";

import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import {
    DataDirNotWritableError,
    FileDraftRepository,
} from "./adapters/fs/file-draft-repository";
import {nodeItemFileReader} from "./adapters/fs/node-item-file-reader";
import {createPerseusCoreSchemaSource} from "./adapters/fs/perseus-core-schema-source";
import {createHttpServer} from "./adapters/http/server";
import {StdioServerTransport} from "./adapters/mcp/sdk";
import {createMcpServer} from "./adapters/mcp/server";
import {createVitePreviewPages} from "./adapters/preview/vite-preview-pages";
import {createCatalog} from "./app/catalog";
import {withDraftFeed} from "./app/draft-feed";
import {createDraftUseCases} from "./app/drafts";
import {createReviewUseCases} from "./app/review";
import {createScoringUseCases} from "./app/scoring";
import {createWidgetUseCases} from "./app/widgets";

// Drafts are local work, so by default they live in the checkout (each
// worktree gets its own); `.perseus-mcp/` is gitignored.
const REPO_ROOT = path.resolve(import.meta.dirname, "../../..");
const DEFAULT_DATA_DIR =
    process.env.PERSEUS_MCP_DATA_DIR ?? path.join(REPO_ROOT, ".perseus-mcp");

const USAGE = `\
Usage: perseus-mcp [--http | --stdio] [--port <n>] [--host <host>] [--data-dir <dir>]

  --http        Serve MCP on http://<host>:<port>/mcp (the default).
  --stdio       Serve MCP over stdin/stdout. HTTP still runs, for previews.
  --port        HTTP port (default 4567 with --http; with --stdio, a free
                port the OS picks, so several stdio servers can run at once).
  --host        HTTP host (default 127.0.0.1).
  --data-dir    Where drafts are saved (default $PERSEUS_MCP_DATA_DIR, else
                .perseus-mcp/ at the repo root).
`;

const {values} = parseArgs({
    options: {
        http: {type: "boolean"},
        stdio: {type: "boolean"},
        port: {type: "string"},
        host: {type: "string", default: "127.0.0.1"},
        "data-dir": {type: "string"},
        help: {type: "boolean"},
    },
    strict: true,
});

if (values.help) {
    process.stdout.write(USAGE);
    process.exit(0);
}

// Over stdio, stdout carries the protocol, so all logging goes to stderr.
function log(message: string) {
    process.stderr.write(`${message}\n`);
}

// Parsing, migration and every other widget lookup go through this registry.
CoreWidgetRegistry.registerCoreWidgets();

const fileRepository = new FileDraftRepository(
    values["data-dir"] ?? DEFAULT_DATA_DIR,
);
try {
    fileRepository.init();
} catch (e) {
    if (e instanceof DataDirNotWritableError) {
        log(
            `perseus-mcp can't write to its data directory (${e.dir}). Set ` +
                `PERSEUS_MCP_DATA_DIR or pass --data-dir to choose another ` +
                `one. Cause: ${String(e.reason)}`,
        );
        process.exit(1);
    }
    throw e;
}
for (const {location, reason} of fileRepository.skipped()) {
    log(`perseus-mcp: skipped ${location}: ${reason}`);
}
// Every save goes through the feed, so open previews hear about it.
const {drafts: repository, feed} = withDraftFeed(fileRepository);

const catalog = createCatalog(createPerseusCoreSchemaSource());
const useCases = {
    drafts: createDraftUseCases({
        drafts: repository,
        feed,
        files: nodeItemFileReader,
        catalog,
        now: () => new Date(),
        newId: () => randomUUID().slice(0, 8),
    }),
    widgets: createWidgetUseCases({catalog, drafts: repository}),
    scoring: createScoringUseCases({drafts: repository}),
    review: createReviewUseCases({drafts: repository}),
};

const host = values.host;
// Port 0 asks the OS for a free port.
const port = Number(values.port ?? (values.stdio ? 0 : 4567));
const httpServer = await createHttpServer({
    createMcpServer: () => createMcpServer(useCases),
    drafts: useCases.drafts,
    createPreview: createVitePreviewPages,
});
try {
    const address = new URL(await httpServer.listen({port, host}));
    const baseUrl = `http://${host === "127.0.0.1" ? "localhost" : host}:${address.port}`;
    log(`perseus-mcp: HTTP on ${baseUrl} (MCP on ${baseUrl}/mcp)`);
} catch (e) {
    log(`perseus-mcp: couldn't listen on ${host}:${port}: ${String(e)}`);
    // Over stdio, MCP still works without HTTP; only previews are lost.
    if (!values.stdio) {
        process.exit(1);
    }
}

if (values.stdio) {
    // The host ends a stdio session by closing stdin. The HTTP server would
    // otherwise keep the process running after it.
    process.stdin.on("end", () => process.exit(0));
    await createMcpServer(useCases).connect(new StdioServerTransport());
}
