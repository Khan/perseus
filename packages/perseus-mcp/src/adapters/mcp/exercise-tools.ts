// The tools for exercises: importing a file of items, organizing and
// checking them, and exporting them for the exercise editor's bulk import.
import {z} from "zod";

import {jsonResult} from "./tool-results";

import type {ExerciseUseCases} from "../../app/exercises";
import type {PreviewUseCases} from "../../app/preview";
import type {CallToolResult, McpServer} from "@modelcontextprotocol/server";

export function registerExerciseTools(
    server: McpServer,
    {
        exercises,
        preview,
        run,
    }: {
        exercises: ExerciseUseCases;
        preview: PreviewUseCases;
        /** Runs a tool's handler, recording its errors under its name. */
        run: (
            tool: string,
            handler: () => CallToolResult | Promise<CallToolResult>,
        ) => Promise<CallToolResult>;
    },
): void {
    const editorUrlSchema = z
        .string()
        .url()
        .optional()
        .describe(
            "The exercise's page in the exercise editor, if the person gave " +
                "it, so the exercise page can link to it.",
        );

    server.registerTool(
        "import_exercise",
        {
            title: "Import a file of Perseus items",
            description:
                "Read a JSON file of items into a new exercise: a draft per " +
                "item (migrated to the latest schema), grouped by problem " +
                "type. Reads an exercise's bulk JSON export (an array of " +
                "{problemType, contentId?, assessmentItems: [{contentId?, " +
                "itemData}]}), keeping its problem types and contentIds so " +
                "export_exercise can write it back; an exercise export " +
                "({items: [{name, item_data}]}), whose names become the " +
                "drafts' notes; or an item, an array of items or a bare " +
                "renderer, under no problem type. Items that don't parse are " +
                "skipped and listed.",
            inputSchema: z.object({
                path: z.string().describe("The JSON file to read."),
                name: z
                    .string()
                    .optional()
                    .describe("The exercise's name; the path if left out."),
                notes: z
                    .string()
                    .optional()
                    .describe("Context to keep with the exercise."),
                editorUrl: editorUrlSchema,
            }),
        },
        (input) =>
            run("import_exercise", async () => {
                const result = await exercises.importExercise(input);
                return jsonResult({
                    exerciseId: result.exercise.exerciseId,
                    shape: result.shape,
                    imported: result.imported,
                    skipped: result.skipped,
                    problemTypes: result.exercise.problemTypes.map(
                        (problemType) => ({
                            name: problemType.name,
                            items: problemType.items.map((item) => item.itemId),
                        }),
                    ),
                });
            }),
    );

    server.registerTool(
        "list_exercises",
        {
            title: "List exercises",
            description:
                "List saved exercises, most recently changed first, with " +
                "how many items each holds.",
            inputSchema: z.object({}),
            annotations: {readOnlyHint: true},
        },
        () =>
            run("list_exercises", () =>
                jsonResult({exercises: exercises.listExercises()}),
            ),
    );

    server.registerTool(
        "get_exercise",
        {
            title: "Show an exercise",
            description:
                "Show an exercise's problem types and, under each, its " +
                "drafts' itemIds, revisions, imported contentIds and the " +
                "first line of each question. Read an item with export_item.",
            inputSchema: z.object({exerciseId: z.string()}),
            annotations: {readOnlyHint: true},
        },
        ({exerciseId}) =>
            run("get_exercise", () =>
                jsonResult(exercises.getExercise(exerciseId)),
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
        "create_exercise",
        {
            title: "Create an exercise",
            description:
                "Make a new exercise, empty or holding existing drafts (such " +
                "as ones made with create_item) under one problem type. The " +
                "drafts are the same drafts, not copies: editing one changes " +
                "what the exercise exports. Add more with add_to_exercise and " +
                "organize them with move_items. To start from a file, use " +
                "import_exercise instead.",
            inputSchema: z.object({
                name: z.string().min(1),
                notes: z
                    .string()
                    .optional()
                    .describe("Context to keep with the exercise."),
                editorUrl: editorUrlSchema,
                itemIds: z
                    .array(z.string())
                    .optional()
                    .describe("Drafts to put in it, in order."),
                problemType: problemTypeSchema
                    .optional()
                    .describe(
                        "The problem type for itemIds; none if left out.",
                    ),
            }),
        },
        (input) =>
            run("create_exercise", () => {
                const exercise = exercises.createExercise(input);
                return jsonResult(exercises.getExercise(exercise.exerciseId));
            }),
    );

    server.registerTool(
        "update_exercise",
        {
            title: "Change an exercise's details",
            description:
                "Change an exercise's name, notes or editor URL (its page " +
                "in the exercise editor, when the person gives it). An " +
                "empty string clears the notes or the URL.",
            inputSchema: z.object({
                exerciseId: z.string(),
                name: z.string().min(1).optional(),
                notes: z.string().optional(),
                editorUrl: z
                    .union([z.string().url(), z.literal("")])
                    .optional()
                    .describe(
                        "The exercise's page in the exercise editor; empty " +
                            "to clear it.",
                    ),
            }),
        },
        ({exerciseId, ...changes}) =>
            run("update_exercise", () => {
                exercises.updateExercise(exerciseId, changes);
                return jsonResult(exercises.getExercise(exerciseId));
            }),
    );

    server.registerTool(
        "move_items",
        {
            title: "Move items to a problem type",
            description:
                "Move drafts in an exercise to the end of a problem type, " +
                "adding the problem type if it's new. A problem type left " +
                "empty is removed.",
            inputSchema: z.object({
                exerciseId: z.string(),
                itemIds: z.array(z.string()).min(1),
                problemType: problemTypeSchema,
            }),
        },
        ({exerciseId, itemIds, problemType}) =>
            run("move_items", () => {
                exercises.placeItems(exerciseId, itemIds, problemType);
                return jsonResult(exercises.getExercise(exerciseId));
            }),
    );

    server.registerTool(
        "add_to_exercise",
        {
            title: "Add an item to an exercise",
            description:
                "Add a draft (such as one made with create_item) to the end " +
                "of a problem type in an exercise, adding the problem type " +
                "if it's new. A draft already in the exercise moves there.",
            inputSchema: z.object({
                exerciseId: z.string(),
                itemId: z.string(),
                problemType: problemTypeSchema,
            }),
        },
        ({exerciseId, itemId, problemType}) =>
            run("add_to_exercise", () => {
                exercises.placeItems(exerciseId, [itemId], problemType);
                return jsonResult(exercises.getExercise(exerciseId));
            }),
    );

    server.registerTool(
        "validate_exercise",
        {
            title: "Validate an exercise",
            description:
                "Validate every draft in an exercise, as validate_item " +
                "does. Lists the items with errors or warnings, and how many " +
                "passed clean.",
            inputSchema: z.object({exerciseId: z.string()}),
            annotations: {readOnlyHint: true},
        },
        ({exerciseId}) =>
            run("validate_exercise", () => {
                const results = exercises.validateExercise(exerciseId);
                return jsonResult({
                    items: results.length,
                    clean: results.filter((r) => r.issues.length === 0).length,
                    withIssues: results.filter((r) => r.issues.length > 0),
                });
            }),
    );

    server.registerTool(
        "preview_exercise",
        {
            title: "Preview an exercise",
            description:
                "Return the URL of a browser page showing an exercise: its " +
                "problem types and items as a tree, each with its change " +
                "since import (new, edited, unchanged) and its validation " +
                "issues, and a preview of the selected item. The page " +
                "updates as the exercise and its drafts change, and can " +
                "copy the exercise for the exercise editor's bulk import. " +
                "Give the URL to the person you're working with.",
            inputSchema: z.object({exerciseId: z.string()}),
            annotations: {readOnlyHint: true},
        },
        ({exerciseId}) =>
            run("preview_exercise", () =>
                jsonResult({exerciseId, url: preview.exerciseUrl(exerciseId)}),
            ),
    );

    server.registerTool(
        "export_exercise",
        {
            title: "Export an exercise",
            description:
                "Write an exercise to a JSON file in the exercise editor's " +
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
                exerciseId: z.string(),
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
            run("export_exercise", () =>
                jsonResult(exercises.exportExercise(input)),
            ),
    );
}
