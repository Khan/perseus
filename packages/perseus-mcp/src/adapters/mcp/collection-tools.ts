// The tools for collections: importing a file of items, organizing and
// checking them, and exporting them for the exercise editor's bulk import.
import {z} from "zod";

import {jsonResult} from "./tool-results";

import type {CollectionUseCases} from "../../app/collections";
import type {CallToolResult, McpServer} from "@modelcontextprotocol/server";

export function registerCollectionTools(
    server: McpServer,
    {
        collections,
        run,
    }: {
        collections: CollectionUseCases;
        /** Runs a tool's handler, recording its errors under its name. */
        run: (
            tool: string,
            handler: () => CallToolResult | Promise<CallToolResult>,
        ) => Promise<CallToolResult>;
    },
): void {
    server.registerTool(
        "import_items",
        {
            title: "Import a file of Perseus items",
            description:
                "Read a JSON file of items into a new collection: a draft per " +
                "item (migrated to the latest schema), grouped by problem " +
                "type. Reads an exercise's bulk JSON export (an array of " +
                "{problemType, contentId?, assessmentItems: [{contentId?, " +
                "itemData}]}), keeping its problem types and contentIds so " +
                "export_collection can write it back; an exercise export " +
                "({items: [{name, item_data}]}), whose names become the " +
                "drafts' notes; or an item, an array of items or a bare " +
                "renderer, under no problem type. Items that don't parse are " +
                "skipped and listed.",
            inputSchema: z.object({
                path: z.string().describe("The JSON file to read."),
                name: z
                    .string()
                    .optional()
                    .describe("The collection's name; the path if left out."),
                notes: z
                    .string()
                    .optional()
                    .describe("Context to keep with the collection."),
            }),
        },
        (input) =>
            run("import_items", async () => {
                const result = await collections.importItems(input);
                return jsonResult({
                    collectionId: result.collection.collectionId,
                    shape: result.shape,
                    imported: result.imported,
                    skipped: result.skipped,
                    problemTypes: result.collection.problemTypes.map(
                        (problemType) => ({
                            name: problemType.name,
                            items: problemType.items.map((item) => item.itemId),
                        }),
                    ),
                });
            }),
    );

    server.registerTool(
        "list_collections",
        {
            title: "List collections",
            description:
                "List saved collections, most recently changed first, with " +
                "how many items each holds.",
            inputSchema: z.object({}),
            annotations: {readOnlyHint: true},
        },
        () =>
            run("list_collections", () =>
                jsonResult({collections: collections.listCollections()}),
            ),
    );

    server.registerTool(
        "get_collection",
        {
            title: "Show a collection",
            description:
                "Show a collection's problem types and, under each, its " +
                "drafts' itemIds, revisions, imported contentIds and the " +
                "start of each question. Read an item with export_item.",
            inputSchema: z.object({collectionId: z.string()}),
            annotations: {readOnlyHint: true},
        },
        ({collectionId}) =>
            run("get_collection", () =>
                jsonResult(collections.getCollection(collectionId)),
            ),
    );

    const problemTypeSchema = z
        .string()
        .nullable()
        .describe(
            "The problem type's name, a new one to add it, or null for no " +
                "problem type.",
        );

    server.registerTool(
        "move_items",
        {
            title: "Move items to a problem type",
            description:
                "Move drafts in a collection to the end of a problem type, " +
                "adding the problem type if it's new. A problem type left " +
                "empty is removed.",
            inputSchema: z.object({
                collectionId: z.string(),
                itemIds: z.array(z.string()).min(1),
                problemType: problemTypeSchema,
            }),
        },
        ({collectionId, itemIds, problemType}) =>
            run("move_items", () => {
                collections.placeItems(collectionId, itemIds, problemType);
                return jsonResult(collections.getCollection(collectionId));
            }),
    );

    server.registerTool(
        "add_to_collection",
        {
            title: "Add an item to a collection",
            description:
                "Add a draft (such as one made with create_item) to the end " +
                "of a problem type in a collection, adding the problem type " +
                "if it's new. A draft already in the collection moves there.",
            inputSchema: z.object({
                collectionId: z.string(),
                itemId: z.string(),
                problemType: problemTypeSchema,
            }),
        },
        ({collectionId, itemId, problemType}) =>
            run("add_to_collection", () => {
                collections.placeItems(collectionId, [itemId], problemType);
                return jsonResult(collections.getCollection(collectionId));
            }),
    );

    server.registerTool(
        "validate_collection",
        {
            title: "Validate a collection",
            description:
                "Validate every draft in a collection, as validate_item " +
                "does. Lists the items with errors or warnings, and how many " +
                "passed clean.",
            inputSchema: z.object({collectionId: z.string()}),
            annotations: {readOnlyHint: true},
        },
        ({collectionId}) =>
            run("validate_collection", () => {
                const results = collections.validateCollection(collectionId);
                return jsonResult({
                    items: results.length,
                    clean: results.filter((r) => r.issues.length === 0).length,
                    withIssues: results.filter((r) => r.issues.length > 0),
                });
            }),
    );

    server.registerTool(
        "export_collection",
        {
            title: "Export a collection",
            description:
                "Write a collection to a JSON file in the exercise editor's " +
                "bulk JSON format, which its import reads: an array of " +
                "{problemType, contentId?, assessmentItems: [{contentId?, " +
                "itemData}]}, each item's data its latest revision as a JSON " +
                "string. Items keep the contentIds they were imported with, " +
                "so the import treats them as edits; new items have none. " +
                "The JSON is also copied to the clipboard: tell the person " +
                "to open the exercise in the exercise editor, choose Import " +
                "and paste. Returns the file's path (not its contents), " +
                "whether it was copied, and how many items are new, edited " +
                "and unchanged; the import reviews at most 50 new or edited " +
                "items at a time, so pass the warning on if it's over.",
            inputSchema: z.object({
                collectionId: z.string(),
                path: z
                    .string()
                    .optional()
                    .describe(
                        "Where to write; perseus-mcp's exports folder if " +
                            "left out.",
                    ),
                overwrite: z
                    .boolean()
                    .optional()
                    .describe("Replace the file if it exists."),
                onlyChanged: z
                    .boolean()
                    .optional()
                    .describe(
                        "Export only the items that are new or edited since " +
                            "import: what the exercise editor's import reviews.",
                    ),
                copy: z
                    .boolean()
                    .optional()
                    .describe(
                        "Copy the JSON to the clipboard too (the default), " +
                            "for pasting into the exercise editor's import.",
                    ),
            }),
        },
        (input) =>
            run("export_collection", () =>
                jsonResult(collections.exportCollection(input)),
            ),
    );
}
