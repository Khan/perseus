import {z} from "zod";

import {libVersion} from "../../version";

import {McpServer} from "./sdk";
import {errorResult, jsonResult, runTool} from "./tool-results";

import type {DraftUseCases} from "../../app/drafts";

// Sent to the agent when it connects (the `instructions` field of the MCP
// initialize result); hosts may add it to the agent's system prompt.
const INSTRUCTIONS = `\
Tools for authoring Perseus items (Khan Academy exercise content).

Work on drafts: open_item returns an itemId, which later tools take instead of
the whole item. Keep notes on a draft (where it came from, what it's for,
what's left) so you can find it again with list_items. Items from any Perseus
version are accepted; items are always returned fully migrated to the latest
schema. export_item returns the finished JSON.`;

const notesSchema = z
    .string()
    .optional()
    .describe(
        "Context to keep with the draft: where the item came from, what " +
            "it's for, what's left to do. list_items shows it.",
    );

/**
 * Creates an MCP server exposing the Perseus authoring tools. Over HTTP, a new
 * server is created per request (stateless transport), so it holds no state
 * of its own.
 */
export function createMcpServer(drafts: DraftUseCases): McpServer {
    const server = new McpServer(
        {name: "perseus", version: libVersion},
        {instructions: INSTRUCTIONS},
    );

    server.registerTool(
        "open_item",
        {
            title: "Open a Perseus item",
            description:
                "Start a draft from an existing PerseusItem, given as a JSON " +
                "object or string (any Perseus version), or as the path of a " +
                "JSON file. Returns the new itemId and the migrated item.",
            inputSchema: {
                item: z
                    .unknown()
                    .optional()
                    .describe("A PerseusItem as an object or JSON string."),
                path: z
                    .string()
                    .optional()
                    .describe("Path to a JSON file holding a PerseusItem."),
                notes: notesSchema,
            },
        },
        ({item, path, notes}) =>
            runTool(async () => {
                if ((item == null) === (path == null)) {
                    return errorResult("Pass exactly one of `item` or `path`.");
                }
                const draft = await drafts.openItem(
                    path != null ? {path} : {item},
                    notes,
                );
                return jsonResult({itemId: draft.itemId, item: draft.item});
            }),
    );

    server.registerTool(
        "export_item",
        {
            title: "Export a Perseus item",
            description:
                "Return a draft's PerseusItem JSON (fully migrated), its " +
                "notes and the path of the file it's saved in.",
            inputSchema: {itemId: z.string()},
            annotations: {readOnlyHint: true},
        },
        ({itemId}) =>
            runTool(() => {
                const {draft, location} = drafts.exportItem(itemId);
                return jsonResult({
                    itemId,
                    revision: draft.revision,
                    notes: draft.notes,
                    path: location,
                    item: draft.item,
                });
            }),
    );

    server.registerTool(
        "list_items",
        {
            title: "List drafts",
            description:
                "List saved drafts, most recently changed first, with their " +
                "notes. Also lists saved files that couldn't be loaded.",
            inputSchema: {},
            annotations: {readOnlyHint: true},
        },
        () =>
            runTool(() => {
                const {drafts: saved, skipped} = drafts.listItems();
                return jsonResult({
                    drafts: saved.map((draft) => ({
                        itemId: draft.itemId,
                        revision: draft.revision,
                        updatedAt: draft.updatedAt,
                        notes: draft.notes,
                        // The start of the question, to tell drafts apart.
                        summary: draft.item.question.content.slice(0, 80),
                    })),
                    skipped,
                });
            }),
    );

    return server;
}
