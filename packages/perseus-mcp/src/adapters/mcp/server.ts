import {z} from "zod";

import {libVersion} from "../../version";

import {McpServer} from "./sdk";
import {errorResult, jsonResult, runTool} from "./tool-results";

import type {DraftUseCases} from "../../app/drafts";
import type {WidgetUseCases} from "../../app/widgets";

// Sent to the agent when it connects (the `instructions` field of the MCP
// initialize result); hosts may add it to the agent's system prompt.
const INSTRUCTIONS = `\
Tools for authoring Perseus items (Khan Academy exercise content).

Work on drafts: open_item returns an itemId, which later tools take instead of
the whole item. Keep notes on a draft (where it came from, what it's for,
what's left) so you can find it again with list_items. Items from any Perseus
version are accepted; items are always returned fully migrated to the latest
schema. export_item returns the finished JSON.

list_widgets and get_widget_spec describe each widget's options; validate_item
checks an item the way Perseus will.`;

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
export function createMcpServer({
    drafts,
    widgets,
}: {
    drafts: DraftUseCases;
    widgets: WidgetUseCases;
}): McpServer {
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

    server.registerTool(
        "list_widgets",
        {
            title: "List widget types",
            description:
                "List every Perseus widget type with its status " +
                '("supported", "avoid" for deprecated widgets, "do-not-use" ' +
                "for unfinished ones), whether it's accessible, and notes. " +
                "Use get_widget_spec for a widget's full options.",
            inputSchema: {},
            annotations: {readOnlyHint: true},
        },
        () => runTool(() => jsonResult(widgets.listWidgets())),
    );

    server.registerTool(
        "get_widget_spec",
        {
            title: "Get a widget's spec",
            description:
                "Return a widget type's status and notes, its default " +
                "options, and the documented TypeScript definitions of its " +
                "options and user input, taken from Perseus's own schema.",
            inputSchema: {type: z.string().describe('e.g. "radio"')},
            annotations: {readOnlyHint: true},
        },
        ({type}) => runTool(() => jsonResult(widgets.getWidgetSpec(type))),
    );

    server.registerTool(
        "validate_item",
        {
            title: "Validate a Perseus item",
            description:
                "Check a draft (by itemId) or a PerseusItem (as JSON): it " +
                "must parse, every [[☃ widget-id]] placeholder must have a " +
                "widget and vice versa, and the content is linted. Returns " +
                "`valid` plus issues with JSON paths.",
            inputSchema: {
                itemId: z.string().optional(),
                item: z
                    .unknown()
                    .optional()
                    .describe("A PerseusItem as an object or JSON string."),
            },
            annotations: {readOnlyHint: true},
        },
        ({itemId, item}) =>
            runTool(() => {
                if ((itemId == null) === (item == null)) {
                    return errorResult(
                        "Pass exactly one of `itemId` or `item`.",
                    );
                }
                return jsonResult(
                    widgets.validateItem(itemId != null ? {itemId} : {item}),
                );
            }),
    );

    server.registerResource(
        "data-schema",
        "perseus://schema/data-schema.ts",
        {
            title: "Perseus data schema",
            description:
                "perseus-core's data-schema.ts: the documented TypeScript " +
                "types for PerseusItem and every widget's options.",
            mimeType: "text/x-typescript",
        },
        (uri) => ({
            contents: [{uri: uri.href, text: widgets.dataSchema()}],
        }),
    );

    return server;
}
