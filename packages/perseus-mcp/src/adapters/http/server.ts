import middie from "@fastify/middie";
import {hostHeaderValidation, toNodeHandler} from "@modelcontextprotocol/node";
import {createMcpHandler} from "@modelcontextprotocol/server";
import Fastify from "fastify";

import {DraftNotFoundError} from "../../app/errors";

import type {DraftUseCases} from "../../app/drafts";
import type {Draft} from "../../domain/draft";
import type {PreviewLinks} from "../../ports/preview-links";
import type {McpServer} from "@modelcontextprotocol/server";
import type {FastifyInstance} from "fastify";
import type {IncomingMessage, Server, ServerResponse} from "node:http";

/**
 * The preview's two pages: the shell for one draft, and the frame inside it
 * that renders the item.
 */
export type PreviewPage = "shell" | "frame";

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

// Proxies and browsers drop an idle stream; a comment line keeps it open.
const KEEP_ALIVE_MS = 25_000;

function draftEvent(draft: Draft): string {
    const data = {
        itemId: draft.itemId,
        revision: draft.revision,
        updatedAt: draft.updatedAt,
        item: draft.item,
    };
    return `event: draft\ndata: ${JSON.stringify(data)}\n\n`;
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
    };
}

const LOCALHOST_NAMES = ["localhost", "127.0.0.1", "[::1]"];
const WILDCARD_HOSTS = new Set(["0.0.0.0", "::", "[::]"]);

/**
 * The hostnames a request's `Host` header may name, for a server listening on
 * `host`: localhost's names, and `host` itself unless it's a wildcard
 * address (any of the machine's addresses), which allows only localhost.
 */
export function allowedHostnames(host: string): string[] {
    // Host headers put IPv6 addresses in brackets.
    const name =
        host.includes(":") && !host.startsWith("[") ? `[${host}]` : host;
    return WILDCARD_HOSTS.has(name) || LOCALHOST_NAMES.includes(name)
        ? LOCALHOST_NAMES
        : [...LOCALHOST_NAMES, name];
}

/**
 * Creates the HTTP server:
 *
 * - MCP (Streamable HTTP) on `/mcp`, through the SDK's `createMcpHandler`:
 *   stateless, with a fresh MCP server from `createMcpServer` per request.
 * - `/drafts/<itemId>/events`: a server-sent event stream of a draft, sent
 *   once on connect and again after every change. Previews follow it.
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
    createPreview,
    allowedHostnames,
}: {
    createMcpServer: () => McpServer;
    drafts: DraftUseCases;
    createPreview?: (server: Server) => Promise<PreviewPages>;
    allowedHostnames: string[];
}): Promise<FastifyInstance> {
    const app = Fastify({logger: false});

    const validateHost = hostHeaderValidation(allowedHostnames);
    app.addHook("onRequest", async (request, reply) => {
        if (!validateHost(request.raw, reply.raw)) {
            // The guard has already sent the 403; returning the reply ends
            // the request here.
            reply.hijack();
            return reply;
        }
    });

    if (createPreview != null) {
        const preview = await createPreview(app.server);
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
        async (request, reply) => {
            const res = reply.raw;
            let unsubscribe: () => void;
            try {
                // watchItem sends the current draft straight away, so the
                // stream starts with the first event.
                unsubscribe = drafts.watchItem(request.params.itemId, (d) => {
                    if (!res.headersSent) {
                        // The stream stays open, so it's written directly
                        // rather than through Fastify's reply.
                        reply.hijack();
                        res.writeHead(200, {
                            "Content-Type": "text/event-stream",
                            "Cache-Control": "no-cache",
                            Connection: "keep-alive",
                        });
                    }
                    res.write(draftEvent(d));
                });
            } catch (e) {
                if (e instanceof DraftNotFoundError) {
                    return reply.code(404).send({error: e.message});
                }
                throw e;
            }
            const keepAlive = setInterval(
                () => res.write(": keep-alive\n\n"),
                KEEP_ALIVE_MS,
            );
            request.raw.on("close", () => {
                clearInterval(keepAlive);
                unsubscribe();
            });
        },
    );

    return app;
}
