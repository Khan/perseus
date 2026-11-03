// Starts the server: reads the command line, builds the adapters and use
// cases, and serves MCP. Everything that knows about the process, the command
// line or how errors are shown to people lives here. The entry points
// (main.ts, main-packaged.ts) say where its files are and which preview
// pages it serves.
import {randomUUID} from "node:crypto";
import {parseArgs} from "node:util";

import {CoreWidgetRegistry} from "@khanacademy/perseus-core";
import {serveStdio} from "@modelcontextprotocol/server/stdio";

import {
    DataDirNotWritableError,
    FileDraftRepository,
} from "./adapters/fs/file-draft-repository";
import {nodeItemFileReader} from "./adapters/fs/node-item-file-reader";
import {createPerseusCoreSchemaSource} from "./adapters/fs/perseus-core-schema-source";
import {createHttpServer, previewLinks} from "./adapters/http/server";
import {createMcpServer} from "./adapters/mcp/server";
import {createCatalog} from "./app/catalog";
import {withDraftFeed} from "./app/draft-feed";
import {createDraftUseCases} from "./app/drafts";
import {createPreviewUseCases} from "./app/preview";
import {createReviewUseCases} from "./app/review";
import {createScoringUseCases} from "./app/scoring";
import {createWidgetUseCases} from "./app/widgets";

import type {PreviewPages} from "./adapters/http/server";
import type {PreviewApp} from "./adapters/mcp/server";
import type {RuntimePaths} from "./runtime-paths";
import type {Server} from "node:http";

/** The pages the server shows previews with. */
export type PreviewSource = {
    createPreview: (server: Server) => Promise<PreviewPages>;
    previewApp: PreviewApp;
};

export type StartOptions = {
    paths: RuntimePaths;
    /** Picks the preview pages, given the `--pages` option if there is one. */
    previewSource: (pagesOption: string | undefined) => PreviewSource;
};

export async function start({
    paths,
    previewSource,
}: StartOptions): Promise<void> {
    const defaultDataDir =
        process.env.PERSEUS_MCP_DATA_DIR ?? paths.defaultDataDir;

    const USAGE = `\
Usage: perseus-mcp [--http | --stdio] [--port <n>] [--host <host>] [--data-dir <dir>]
                   [--pages <dir>]

  --http        Serve MCP on http://<host>:<port>/mcp (the default).
  --stdio       Serve MCP over stdin/stdout. HTTP still runs, for previews.
  --port        HTTP port (default 4567 with --http; with --stdio, a free
                port the OS picks, so several stdio servers can run at once).
  --host        HTTP host (default 127.0.0.1).
  --data-dir    Where drafts are saved (default $PERSEUS_MCP_DATA_DIR, else
                ${paths.defaultDataDir}).
  --pages       Serve the preview pages prebuilt in <dir> (by
                \`pnpm --filter @khanacademy/perseus-mcp build:pages\`)
                instead of compiling them with Vite.
`;

    const {values} = parseArgs({
        options: {
            http: {type: "boolean"},
            stdio: {type: "boolean"},
            port: {type: "string"},
            host: {type: "string", default: "127.0.0.1"},
            "data-dir": {type: "string"},
            pages: {type: "string"},
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

    const dataDir = values["data-dir"] ?? defaultDataDir;
    const fileRepository = new FileDraftRepository(dataDir);
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
    log(`perseus-mcp: drafts in ${dataDir}`);
    for (const {location, reason} of fileRepository.skipped()) {
        log(`perseus-mcp: skipped ${location}: ${reason}`);
    }
    // Every save goes through the feed, so open previews hear about it.
    const {drafts: repository, feed} = withDraftFeed(fileRepository);

    // Set once the HTTP server is listening.
    let baseUrl: string | null = null;

    const catalog = createCatalog(
        createPerseusCoreSchemaSource(paths.perseusCoreTypesDir),
    );
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
        preview: createPreviewUseCases({
            drafts: repository,
            links: previewLinks(() => baseUrl),
        }),
    };

    // The browser preview's pages, and the page MCP Apps hosts show in the chat.
    const {createPreview, previewApp} = previewSource(values.pages);

    const host = values.host;
    // Port 0 asks the OS for a free port.
    const port = Number(values.port ?? (values.stdio ? 0 : 4567));
    const httpServer = await createHttpServer({
        createMcpServer: () => createMcpServer({...useCases, previewApp}),
        drafts: useCases.drafts,
        createPreview,
    });
    try {
        const address = new URL(await httpServer.listen({port, host}));
        baseUrl = `http://${host === "127.0.0.1" ? "localhost" : host}:${address.port}`;
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
        serveStdio(() => createMcpServer({...useCases, previewApp}));
    }
}
