// Starts the server: reads the command line, builds the adapters and use
// cases, and serves MCP. Everything that knows about the process, the command
// line or how errors are shown to people lives here. The entry points
// (main.ts, main-packaged.ts) say where its files are and which preview
// pages it serves.
import {randomUUID} from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {parseArgs} from "node:util";

import {CoreWidgetRegistry} from "@khanacademy/perseus-core";
import {serveStdio} from "@modelcontextprotocol/server/stdio";

import {createSnapshotContentSource} from "./adapters/fs/content-snapshot";
import {copyPreviousData} from "./adapters/fs/copy-previous-data";
import {
    DataDirNotWritableError,
    FileDraftRepository,
} from "./adapters/fs/file-draft-repository";
import {FileExerciseRepository} from "./adapters/fs/file-exercise-repository";
import {FileGraffitiRepository} from "./adapters/fs/file-graffiti-repository";
import {fileGraffitiTypes} from "./adapters/fs/file-graffiti-types";
import {fileGuidelinesSource} from "./adapters/fs/file-guidelines-source";
import {readKhanStyle} from "./adapters/fs/khan-style-source";
import {nodeExportFileWriter} from "./adapters/fs/node-export-file-writer";
import {nodeItemFileReader} from "./adapters/fs/node-item-file-reader";
import {createPerseusCoreSchemaSource} from "./adapters/fs/perseus-core-schema-source";
import {createNodeGraffitiRenderer} from "./adapters/graffiti/node-graffiti-renderer";
import {
    allowedHostnames,
    createHttpServer,
    previewLinks,
} from "./adapters/http/server";
import {createMcpServer} from "./adapters/mcp/server";
import {systemClipboard} from "./adapters/os/system-clipboard";
import {createMeilisearchContentSearch} from "./adapters/search/meilisearch-content-search";
import {createCatalog} from "./app/catalog";
import {withDraftFeed} from "./app/draft-feed";
import {createDraftUseCases} from "./app/drafts";
import {withExerciseFeed} from "./app/exercise-feed";
import {createExerciseUseCases} from "./app/exercises";
import {createFixUseCases} from "./app/fixes";
import {createGraffitiUseCases} from "./app/graffiti";
import {withGraffitiFeed} from "./app/graffiti-feed";
import {createGuidelineUseCases} from "./app/guidelines";
import {createPreviewUseCases} from "./app/preview";
import {createReviewUseCases} from "./app/review";
import {createScoringUseCases} from "./app/scoring";
import {createSearchUseCases} from "./app/search";
import {createErrorLog, describeServer} from "./app/server-info";
import {createWidgetUseCases} from "./app/widgets";

import type {PreviewPages} from "./adapters/http/server";
import type {PreviewApp} from "./adapters/mcp/server";
import type {BuildInfo} from "./build-info";
import type {KhanStyle} from "./domain/graffiti/khan-style";
import type {GraffitiPaths, RuntimePaths} from "./runtime-paths";
import type {Server} from "node:http";

/** The pages the server shows previews with. */
export type PreviewSource = {
    createPreview: (server: Server) => Promise<PreviewPages>;
    previewApp: PreviewApp;
};

export type StartOptions = {
    paths: RuntimePaths;
    /** Which perseus-mcp this is, for get_server_info. */
    build: BuildInfo;
    /** Picks the preview pages, given the `--pages` option if there is one. */
    previewSource: (pagesOption: string | undefined) => PreviewSource;
};

/**
 * Graffiti diagrams, when Graffiti is there to draw them: in the repository
 * it's linked in and has to be built (`npm run build` in its checkout).
 */
function graffitiUseCases(
    graffitiPaths: GraffitiPaths | undefined,
    wonderBlocksTokensCss: string,
    dataDir: string,
    log: (message: string) => void,
) {
    if (graffitiPaths == null || !fs.existsSync(graffitiPaths.module)) {
        log(
            `perseus-mcp: Graffiti diagrams are off: no Graffiti at ` +
                `${graffitiPaths?.module ?? "(none configured)"}`,
        );
        return undefined;
    }
    // Khan's colors and sizes, which scripts import as "khan-style".
    let style: KhanStyle | undefined;
    try {
        style = readKhanStyle(wonderBlocksTokensCss);
    } catch (e) {
        log(`perseus-mcp: diagrams draw without Khan's colors: ${String(e)}`);
    }
    const fileDiagrams = new FileGraffitiRepository(dataDir);
    fileDiagrams.init();
    const {diagrams, feed} = withGraffitiFeed(fileDiagrams);
    return createGraffitiUseCases({
        diagrams,
        feed,
        renderer: createNodeGraffitiRenderer(graffitiPaths, {style}),
        types: fileGraffitiTypes(path.dirname(graffitiPaths.module)),
        style,
        now: () => new Date(),
        newId: () => randomUUID().slice(0, 8),
    });
}

/** A file-name-safe form of an exercise's name. */
function slug(name: string): string {
    const cleaned = path
        .basename(name)
        .replace(/\.json$/i, "")
        .replace(/[^A-Za-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 40);
    return cleaned === "" ? "exercise" : cleaned;
}

export async function start({
    paths,
    build,
    previewSource,
}: StartOptions): Promise<void> {
    const startedAt = new Date().toISOString();
    // The last errors, for get_server_info.
    const errors = createErrorLog(20, () => new Date());
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

    /** Logs a problem, and keeps it for get_server_info. */
    function logProblem(message: string) {
        log(`perseus-mcp: ${message}`);
        errors.record("server", message);
    }

    // Parsing, migration and every other widget lookup go through this registry.
    CoreWidgetRegistry.registerCoreWidgets();

    const dataDir = values["data-dir"] ?? defaultDataDir;
    // Only into the default folder: a folder chosen on purpose gets nothing
    // it didn't ask for.
    if (
        paths.previousDataDir != null &&
        values["data-dir"] == null &&
        process.env.PERSEUS_MCP_DATA_DIR == null
    ) {
        const copied = copyPreviousData(paths.previousDataDir, dataDir);
        if (copied != null) {
            log(
                `perseus-mcp: copied ${copied} drafts from ` +
                    `${paths.previousDataDir}, where earlier versions kept them`,
            );
        }
    }
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
        logProblem(`skipped ${location}: ${reason}`);
    }
    const exerciseRepository = new FileExerciseRepository(dataDir);
    exerciseRepository.init();
    // Every save goes through a feed, so open previews and exercise pages
    // hear about it.
    const {drafts: repository, feed} = withDraftFeed(fileRepository);
    const {exercises, feed: exerciseFeed} =
        withExerciseFeed(exerciseRepository);
    const graffiti = graffitiUseCases(
        paths.graffiti,
        paths.wonderBlocksTokensCss,
        dataDir,
        log,
    );

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
        review: createReviewUseCases({drafts: repository, catalog}),
        exercises: createExerciseUseCases({
            exercises,
            drafts: repository,
            exerciseFeed,
            draftFeed: feed,
            files: nodeItemFileReader,
            exports: nodeExportFileWriter,
            clipboard: systemClipboard,
            catalog,
            defaultExportPath: (exercise) =>
                path.join(
                    dataDir,
                    "exports",
                    `${slug(exercise.name)}-${exercise.exerciseId}.json`,
                ),
            now: () => new Date(),
            newId: () => randomUUID().slice(0, 8),
        }),
        preview: createPreviewUseCases({
            drafts: repository,
            exercises,
            links: previewLinks(() => baseUrl),
        }),
        graffiti,
    };
    // Content search runs in a local Meilisearch (see the README); its tools
    // say how to start it when it isn't running. Only from the repo for now:
    // the testers' bundle leaves it out, tools and all.
    const search =
        build.source === "bundle"
            ? undefined
            : createSearchUseCases({
                  search: createMeilisearchContentSearch({
                      url:
                          process.env.PERSEUS_MCP_SEARCH_URL ??
                          "http://localhost:7700",
                      apiKey: process.env.PERSEUS_MCP_SEARCH_KEY,
                  }),
                  content: createSnapshotContentSource(),
                  exercises: useCases.exercises,
                  snapshotDir: process.env.PERSEUS_MCP_CONTENT_SNAPSHOT,
              });
    // The guidelines' text is the organization's, kept in a local folder.
    const guidanceDir =
        process.env.PERSEUS_MCP_GUIDANCE_DIR ??
        (fs.existsSync(paths.guidanceDir) ? paths.guidanceDir : undefined);
    const guidelines = createGuidelineUseCases({
        source: fileGuidelinesSource(
            guidanceDir,
            process.env.PERSEUS_MCP_GUIDANCE_DIR == null
                ? "the default guidance folder"
                : "PERSEUS_MCP_GUIDANCE_DIR",
        ),
    });
    const fixes = createFixUseCases({
        drafts: repository,
        draftUseCases: useCases.drafts,
        exercises: useCases.exercises,
    });

    // The browser preview's pages, and the page MCP Apps hosts show in the chat.
    const {createPreview, previewApp} = previewSource(values.pages);

    const serverInfo = async () =>
        describeServer({
            build,
            transport: values.stdio ? "stdio" : "http",
            startedAt,
            node: process.version,
            os: {
                platform: os.platform(),
                release: os.release(),
                arch: os.arch(),
            },
            dataDir: path.resolve(dataDir),
            drafts: fileRepository.list().length,
            skippedDrafts: fileRepository.skipped().length,
            exercises: exerciseRepository.list().length,
            httpUrl: baseUrl,
            previewPages:
                values.pages != null || build.source === "bundle"
                    ? "prebuilt"
                    : "compiled by Vite",
            search:
                search == null
                    ? {
                          available: false,
                          reason: "content search isn't part of this build",
                      }
                    : await search.status(),
            guidelines: await guidelines.status(),
            errors: errors.recent(),
        });

    const host = values.host;
    const mcpServer = () =>
        createMcpServer({
            ...useCases,
            search,
            guidelines,
            fixes,
            previewApp,
            serverInfo,
            errors,
            dataDir: path.resolve(dataDir),
        });

    // Port 0 asks the OS for a free port.
    const port = Number(values.port ?? (values.stdio ? 0 : 4567));
    const httpServer = await createHttpServer({
        createMcpServer: mcpServer,
        drafts: useCases.drafts,
        exercises: useCases.exercises,
        graffiti: useCases.graffiti,
        createPreview,
        allowedHostnames: allowedHostnames(host),
    });
    /**
     * Listens on `port`. Over stdio, a port that's taken falls back to a
     * free one: hosts may start the server more than once at a time (Claude
     * Desktop starts it twice), and only the first gets a fixed port.
     */
    async function listen(): Promise<string> {
        try {
            return await httpServer.listen({port, host});
        } catch (e) {
            const inUse =
                e instanceof Error && "code" in e && e.code === "EADDRINUSE";
            if (!values.stdio || port === 0 || !inUse) {
                throw e;
            }
            log(`perseus-mcp: port ${port} is in use; using a free one`);
            return httpServer.listen({port: 0, host});
        }
    }

    try {
        const address = new URL(await listen());
        baseUrl = `http://${host === "127.0.0.1" ? "localhost" : host}:${address.port}`;
        log(`perseus-mcp: HTTP on ${baseUrl} (MCP on ${baseUrl}/mcp)`);
    } catch (e) {
        logProblem(`couldn't listen on ${host}:${port}: ${String(e)}`);
        // Over stdio, MCP still works without HTTP; only previews are lost.
        if (!values.stdio) {
            process.exit(1);
        }
    }

    if (values.stdio) {
        // The host ends a stdio session by closing stdin. The HTTP server would
        // otherwise keep the process running after it.
        process.stdin.on("end", () => process.exit(0));
        serveStdio(mcpServer);
    }
}
