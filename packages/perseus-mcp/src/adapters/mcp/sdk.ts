// The MCP SDK publishes its modules only as `.js` subpaths, which our lint
// rules ban everywhere else. Importing them in this one file keeps the
// exceptions in one place.

export {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
export {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
export {StreamableHTTPServerTransport} from "@modelcontextprotocol/sdk/server/streamableHttp.js";
export type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
