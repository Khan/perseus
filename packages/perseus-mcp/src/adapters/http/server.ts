import Fastify from "fastify";

import {StreamableHTTPServerTransport} from "../mcp/sdk";

import type {McpServer} from "../mcp/sdk";
import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

/**
 * Creates the HTTP server, with MCP (Streamable HTTP) on `/mcp`. MCP runs
 * stateless: each request gets a fresh MCP server from `createMcpServer` and a
 * fresh transport.
 */
export function createHttpServer(
    createMcpServer: () => McpServer,
): FastifyInstance {
    const app = Fastify({logger: false});

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

    return app;
}
