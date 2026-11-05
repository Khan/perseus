import middie from "@fastify/middie";
import {hostHeaderValidation, toNodeHandler} from "@modelcontextprotocol/node";
import {createMcpHandler} from "@modelcontextprotocol/server";
import Fastify from "fastify";

import {watchDraftPreview} from "../../app/draft-preview-feed";
import {DraftNotFoundError} from "../../app/errors";

import {streamEvents} from "./event-stream";
import {registerExerciseRoutes} from "./exercise-routes";
import {registerGraffitiRoutes} from "./graffiti-routes";

import type {DraftUseCases} from "../../app/drafts";
import type {ExerciseUseCases} from "../../app/exercises";
import type {GraffitiUseCases} from "../../app/graffiti";
import type {Draft} from "../../domain/draft";
import type {PreviewLinks} from "../../ports/preview-links";
import type {McpServer} from "@modelcontextprotocol/server";
import type {FastifyInstance} from "fastify";
import type {IncomingMessage, Server, ServerResponse} from "node:http";

/**
 * The preview's pages: the shell for one draft, the frame inside it that
 * renders the item, the exercise pages (the list, and one exercise with its
 * tree and a preview of the selected item), and a Graffiti diagram's page.
 */
export type PreviewPage =
    | "shell"
    | "frame"
    | "exercise-list"
    | "exercise-page"
    | "graffiti-page";

export type PreviewPages = {
    /** Serves the pages' scripts, styles and other assets. */
    middleware: (
        req: IncomingMessage,
        res: ServerResponse,
        next: (error?: unknown) => void,
    ) => void;
    /** Returns a page's HTML, ready to send, for a request to `url`. */
    html(page: PreviewPage, url: string): Promise<string>;
    close(): Promise<void>;
};

function draftEventData(draft: Draft, diagrams: Record<string, number>) {
    return {
        itemId: draft.itemId,
        revision: draft.revision,
        updatedAt: draft.updatedAt,
        item: draft.item,
        // The latest revision of each diagram the item shows, for the
        // preview to name in their URLs.
        diagrams,
    };
}

/**
 * Links to the preview pages this server serves at `baseUrl`, which is null
 * until the server is listening (and stays null if it never does).
 */
export function previewLinks(baseUrl: () => string | null): PreviewLinks {
    return {
        urlFor(itemId) {
            const base = baseUrl();
            return base == null
                ? null
                : `${base}/drafts/${encodeURIComponent(itemId)}/preview`;
        },
        exerciseUrlFor(exerciseId) {
            const base = baseUrl();
            return base == null
                ? null
                : `${base}/exercises/${encodeURIComponent(exerciseId)}`;
        },
        graffitiUrlFor(graffitiId) {
            const base = baseUrl();
            return base == null
                ? null
                : `${base}/graffiti/${encodeURIComponent(graffitiId)}`;
        },
    };
}

const LOCALHOST_NAMES = ["localhost", "127.0.0.1", "[::1]"];
const WILDCARD_HOSTS = new Set(["0.0.0.0", "::", "[::]"]);

/**
 * The hostnames a request's `Host` header may name, for a server listening on
 * `host`: localhost's names, `host` itself unless it's a wildcard address
 * (any of the machine's addresses), and `publicHost`, the name links use
 * (such as a development domain that resolves to this machine).
 */
export function allowedHostnames(host: string, publicHost?: string): string[] {
    // Host headers put IPv6 addresses in brackets.
    const name =
        host.includes(":") && !host.startsWith("[") ? `[${host}]` : host;
    const names =
        WILDCARD_HOSTS.has(name) || LOCALHOST_NAMES.includes(name)
            ? LOCALHOST_NAMES
            : [...LOCALHOST_NAMES, name];
    return publicHost == null || names.includes(publicHost)
        ? names
        : [...names, publicHost];
}

/** A certificate and its key, in PEM, for serving HTTPS. */
export type TlsFiles = {cert: string; key: string};

/**
 * Creates the HTTP server:
 *
 * - MCP (Streamable HTTP) on `/mcp`, through the SDK's `createMcpHandler`:
 *   stateless, with a fresh MCP server from `createMcpServer` per request.
 * - `/drafts/<itemId>/events`: a server-sent event stream of a draft, with
 *   the latest revision of each diagram it shows, sent once on connect and
 *   again after every change to the draft or one of its diagrams. Previews
 *   follow it.
 * - With `createPreview`, `/drafts/<itemId>/preview`: a page that shows the
 *   draft and follows its changes. `createPreview` gets the HTTP server, so
 *   the preview can share it.
 *
 * Every request must name one of `allowedHostnames` in its `Host` header, or
 * gets a 403: otherwise a web page could reach the server through DNS
 * rebinding (a name of its own that resolves to 127.0.0.1) and read or
 * change drafts.
 */
export async function createHttpServer({
    createMcpServer,
    drafts,
    exercises,
    graffiti,
    createPreview,
    allowedHostnames,
    tls,
}: {
    createMcpServer: () => McpServer;
    drafts: DraftUseCases;
    /** Serves the exercise pages' data, and the pages with `createPreview`. */
    exercises?: ExerciseUseCases;
    /** Serves Graffiti diagrams as Graphie images, on `/graffiti`. */
    graffiti?: GraffitiUseCases;
    createPreview?: (server: Server) => Promise<PreviewPages>;
    allowedHostnames: string[];
    /** Serve HTTPS with this certificate instead of HTTP. */
    tls?: TlsFiles;
}): Promise<FastifyInstance> {
    const app = Fastify({logger: false, ...(tls != null ? {https: tls} : {})});

    const validateHost = hostHeaderValidation(allowedHostnames);
    app.addHook("onRequest", async (request, reply) => {
        if (!validateHost(request.raw, reply.raw)) {
            // The guard has already sent the 403; returning the reply ends
            // the request here.
            reply.hijack();
            return reply;
        }
    });

    let previewPages: PreviewPages | null = null;
    if (createPreview != null) {
        const preview = await createPreview(app.server);
        previewPages = preview;
        app.addHook("onClose", () => preview.close());
        await app.register(middie);
        app.use(preview.middleware);

        app.get<{Params: {itemId: string}}>(
            "/drafts/:itemId/preview",
            async (request, reply) => {
                try {
                    drafts.exportItem(request.params.itemId);
                } catch (e) {
                    if (e instanceof DraftNotFoundError) {
                        return reply.code(404).send({error: e.message});
                    }
                    throw e;
                }
                const html = await preview.html("shell", request.url);
                return reply.type("text/html; charset=utf-8").send(html);
            },
        );
        app.get("/preview/frame", async (request, reply) => {
            const html = await preview.html("frame", request.url);
            return reply.type("text/html; charset=utf-8").send(html);
        });
    }

    // A fresh MCP server per request; the handler also answers the methods
    // a stateless server doesn't support.
    const mcp = toNodeHandler(createMcpHandler(() => createMcpServer()));
    app.all("/mcp", async (request, reply) => {
        // The handler writes the response itself.
        reply.hijack();
        await mcp(request.raw, reply.raw, request.body);
    });

    app.get<{Params: {itemId: string}}>(
        "/drafts/:itemId/events",
        async (request, reply) =>
            streamEvents(request, reply, {
                event: "draft",
                watch: (send) =>
                    watchDraftPreview(
                        {drafts, graffiti},
                        request.params.itemId,
                        (draft, diagrams) =>
                            send(draftEventData(draft, diagrams)),
                    ),
                onError(e) {
                    if (e instanceof DraftNotFoundError) {
                        return reply.code(404).send({error: e.message});
                    }
                    throw e;
                },
            }),
    );

    if (exercises != null) {
        registerExerciseRoutes(app, {exercises, pages: previewPages});
    }
    if (graffiti != null) {
        registerGraffitiRoutes(app, {graffiti, pages: previewPages});
    }

    return app;
}
