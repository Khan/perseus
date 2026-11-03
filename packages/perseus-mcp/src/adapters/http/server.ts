import middie from "@fastify/middie";
import Fastify from "fastify";

import {DraftNotFoundError} from "../../app/errors";
import {StreamableHTTPServerTransport} from "../mcp/sdk";

import type {DraftUseCases} from "../../app/drafts";
import type {Draft} from "../../domain/draft";
import type {McpServer} from "../mcp/sdk";
import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
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
 * Creates the HTTP server:
 *
 * - MCP (Streamable HTTP) on `/mcp`. MCP runs stateless: each request gets a
 *   fresh MCP server from `createMcpServer` and a fresh transport.
 * - `/drafts/<itemId>/events`: a server-sent event stream of a draft, sent
 *   once on connect and again after every change. Previews follow it.
 * - With `createPreview`, `/drafts/<itemId>/preview`: a page that shows the
 *   draft and follows its changes. `createPreview` gets the HTTP server, so
 *   the preview can share it.
 */
export async function createHttpServer({
    createMcpServer,
    drafts,
    createPreview,
}: {
    createMcpServer: () => McpServer;
    drafts: DraftUseCases;
    createPreview?: (server: Server) => Promise<PreviewPages>;
}): Promise<FastifyInstance> {
    const app = Fastify({logger: false});

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

    app.post("/mcp", async (request, reply) => {
        const server = createMcpServer();
        const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined,
        });
        // The transport writes the response itself.
        reply.hijack();
        reply.raw.on("close", () => {
            void transport.close();
            void server.close();
        });
        await server.connect(transport);
        await transport.handleRequest(request.raw, reply.raw, request.body);
    });

    // Stateless servers have no sessions to stream to or tear down.
    const methodNotAllowed = async (
        _request: FastifyRequest,
        reply: FastifyReply,
    ) =>
        reply.code(405).send({
            jsonrpc: "2.0",
            error: {code: -32000, message: "Method not allowed."},
            id: null,
        });
    app.get("/mcp", methodNotAllowed);
    app.delete("/mcp", methodNotAllowed);

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
