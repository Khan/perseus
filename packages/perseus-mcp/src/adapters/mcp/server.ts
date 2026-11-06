import {McpServer} from "@modelcontextprotocol/server";
import {z} from "zod";

import {CHECKLIST_URI} from "../../domain/review/checklist";
import {libVersion} from "../../version";

import {AUTHORING_RULES, registerAuthoringPrompt} from "./authoring";
import {registerExerciseTools} from "./exercise-tools";
import {registerGraffitiTools} from "./graffiti-tools";
import {registerGuidelineTools} from "./guideline-tools";
import {registerImageTools} from "./image-tools";
import {registerPreviewTools} from "./preview-tools";
import {registerSearchTools} from "./search-tools";
import {errorResult, jsonResult, runTool} from "./tool-results";

import type {PreviewApp} from "./preview-tools";
import type {DraftUseCases} from "../../app/drafts";
import type {ExerciseUseCases} from "../../app/exercises";
import type {FixUseCases} from "../../app/fixes";
import type {GraffitiUseCases} from "../../app/graffiti";
import type {GuidelineUseCases} from "../../app/guidelines";
import type {ImageUseCases} from "../../app/images";
import type {PreviewUseCases} from "../../app/preview";
import type {ReadItemsUseCase} from "../../app/read-items";
import type {ReviewUseCases} from "../../app/review";
import type {ScoringUseCases} from "../../app/scoring";
import type {SearchUseCases} from "../../app/search";
import type {ErrorLog, ServerInfo} from "../../app/server-info";
import type {WidgetUseCases} from "../../app/widgets";
import type {CallToolResult} from "@modelcontextprotocol/server";

// The instructions' paragraph on content search, given only when the search
// tools are there, so the agent isn't told of tools it doesn't have.
const SEARCH_INSTRUCTIONS = `\
Find published content with search: search_content searches an index of a
content snapshot (items and articles, placed in their domain, course, unit
and lesson), facet_content counts it by any field (courses, widget types,
option values) without reading it, and import_from_search makes drafts of the
items found, an exercise per exercise they're from. For work across many
items ("this course", "items using radio"), narrow with filters first and
read or import only what the task needs; do what code can (counts, filters)
with these tools rather than by reading items. Search covers only what
learners see unless includeUnlisted is set. When search isn't available, the
tools say why and how to start it.

`;

/**
 * Sent to the agent when it connects (the `instructions` field of the MCP
 * initialize result); hosts may add it to the agent's system prompt.
 */
function instructions(withSearch: boolean): string {
    const searchInstructions = withSearch ? SEARCH_INSTRUCTIONS : "";
    return `\
Tools for authoring Perseus items (Khan Academy exercise content).

${AUTHORING_RULES}
Work on drafts: create_item (for new content) or open_item (for an existing
item) returns an itemId, which later tools take instead of the whole item.
add_widget adds a widget and edit_item changes a draft with a JSON Patch;
every change is validated before it's saved. Keep notes on a draft (where it
came from, what it's for, what's left) so you can find it again with
list_items. Items from any Perseus version are accepted; items are always
returned fully migrated to the latest schema. export_item returns the finished
JSON.

Every change makes a new revision, and every revision is kept:
list_revisions lists them with what made each one, export_item with a
revision reads an earlier one, and revert_item makes an earlier revision's
item the newest (the revisions in between stay kept).

Work on a whole exercise: import_exercise reads a file of items (an
exercise's bulk JSON export, an exercise export, or items) into a draft per
item, grouped by problem type, and export_exercise writes it back in the
exercise editor's bulk JSON format, to a file. create_exercise starts one
from drafts you already have. get_exercise shows the tree,
move_items and add_to_exercise organize it, edit_items changes many drafts in
one call, and validate_exercise checks them all. update_exercise changes its
name and notes, and keeps its exercise editor URL when the person gives it.

Draw illustrations with Graffiti: read get_graffiti_reference before writing
a script (it's the whole API; there's no Graffiti source to read).
create_graffiti keeps a diagram drawn by a Graffiti script under a stable
graffitiId, update_graffiti makes a new
revision of it, and an image widget shows its latest revision, so an item
needn't change when its diagram does. preview_graffiti returns the URL of a
page showing a diagram, which follows its changes.

${searchInstructions}The content guidelines are topics (writing in general, math, TeX, image
descriptions and so on). Before writing, checking or changing items, list
them with get_guidelines and read the ones the task needs, the general ones
too; the more specific topic wins where they differ. Apply what a fix covers (such as bolding every
question's first line, or replacing a phrase) with apply_fix across the
drafts at once, dry run first; read items only for rules that need judgment
(such as whether hints give the answer away too soon).
Read files by path; don't paste their contents into a call.

list_widgets and get_widget_spec describe each widget's options; validate_item
checks an item the way Perseus will. score_item scores an answer as Perseus
does; to test an item, solve it yourself and give check_user_inputs correct
answers (in several equivalent forms) and common mistakes, each with the
outcome you expect.

Review every item you create or edit before returning it: call review_item,
which gives the procedure, the draft's validation issues and the checklist
entries to check it against, and follow it.

Previews are pages in a browser, which a person can keep open while you work,
since each follows its draft's changes. preview_item returns the URL of a
draft's preview, where a person can see it as learners will, answer it and
reveal its hints; preview_exercise returns the URL of an exercise's page: its
items as a tree with each one's change since import and validation issues,
and a grid of every item at once. Give the person the URL to open in their
browser: open_in_browser opens it for them when they ask, and if you have a
browser pane of your own, open it there. For several items, give them the
exercise's page rather than a preview per item. show_item shows one draft in
the chat instead (in hosts that support it): use it for a quick look at a
single item, or when the person asks to see it here.

To check your own work, score_item and check_user_inputs say how answers
score. When you need to see how an item looks or behaves beyond that, and you
have a browser of your own, open its preview URL there.

A URL works while this server runs, and each start of the server gives new
ones: when a person says a preview link stopped working, call preview_item
(or preview_exercise) again for the same draft and give them the new URL.`;
}

// A JSON Patch (RFC 6902) against a PerseusItem's JSON.
const patchSchema = z
    .array(
        z.object({
            op: z.enum(["add", "remove", "replace", "move", "copy", "test"]),
            path: z.string(),
            value: z.unknown().optional(),
            from: z.string().optional(),
        }),
    )
    .optional();

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
    scoring,
    review,
    preview,
    previewApp,
    exercises,
    readItems,
    images,
    graffiti,
    search,
    guidelines,
    fixes,
    serverInfo,
    errors,
    dataDir,
}: {
    drafts: DraftUseCases;
    exercises: ExerciseUseCases;
    readItems: ReadItemsUseCase;
    images: ImageUseCases;
    /** Graffiti diagrams; their tools are left out when it's missing. */
    graffiti?: GraffitiUseCases;
    /** Content search; its tools are left out when it's missing. */
    search?: SearchUseCases;
    /** Content guidelines and fixes; their tools are left out if missing. */
    guidelines?: GuidelineUseCases;
    fixes?: FixUseCases;
    /** What get_server_info reports. */
    serverInfo?: () => Promise<ServerInfo>;
    /** Where tool errors are recorded, for get_server_info. */
    errors?: ErrorLog;
    /** Where drafts are saved, named when a draft isn't found. */
    dataDir?: string;
    widgets: WidgetUseCases;
    scoring: ScoringUseCases;
    review: ReviewUseCases;
    preview: PreviewUseCases;
    previewApp?: PreviewApp;
}): McpServer {
    const server = new McpServer(
        {name: "perseus", version: libVersion},
        {instructions: instructions(search != null)},
    );

    // Every tool's errors are recorded under its name.
    function run(
        tool: string,
        handler: () => CallToolResult | Promise<CallToolResult>,
    ): Promise<CallToolResult> {
        return runTool(
            handler,
            (message) => errors?.record(tool, message),
            dataDir,
        );
    }

    if (serverInfo != null) {
        server.registerTool(
            "get_server_info",
            {
                title: "Get perseus-mcp's diagnostic information",
                description:
                    "When a person reports a problem with perseus-mcp, call " +
                    "this and give them the result to send to whoever " +
                    "supports them: perseus-mcp's version and commit, whether " +
                    "it runs from the testers' bundle or the repo, the " +
                    "transport, Node, the operating system, the data folder " +
                    "and how many drafts it holds, whether previews are " +
                    "served, whether content search is available (and what " +
                    "its index holds, or why not), whether the content " +
                    "guidelines are set up, and the last errors. It " +
                    "holds nothing of the person's items.",
                inputSchema: z.object({}),
                annotations: {readOnlyHint: true},
            },
            () =>
                run("get_server_info", async () =>
                    jsonResult(await serverInfo()),
                ),
        );
    }

    server.registerTool(
        "open_item",
        {
            title: "Open a Perseus item",
            description:
                "Start a draft from an existing PerseusItem, given as a JSON " +
                "object or string (any Perseus version), or as the path of a " +
                "JSON file. Returns the new itemId and the migrated item.",
            inputSchema: z.object({
                item: z
                    .unknown()
                    .optional()
                    .describe("A PerseusItem as an object or JSON string."),
                path: z
                    .string()
                    .optional()
                    .describe("Path to a JSON file holding a PerseusItem."),
                notes: notesSchema,
            }),
        },
        ({item, path, notes}) =>
            run("open_item", async () => {
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

    const widgetInputSchema = z.object({
        id: z
            .string()
            .describe(
                'Where the content places it, as "<type> <n>": "radio 1" ' +
                    "goes with [[☃ radio 1]].",
            ),
        type: z.string().describe('e.g. "radio"; see list_widgets.'),
        options: z
            .record(z.string(), z.unknown())
            .optional()
            .describe(
                "Merged over the type's default options; see " +
                    "get_widget_spec.",
            ),
        graded: z.boolean().optional().describe("Default true."),
        static: z.boolean().optional().describe("Default false."),
        alignment: z.string().optional(),
    });
    const rendererShape = {
        content: z
            .string()
            .describe(
                "Markdown with $TeX$ math and a [[☃ <widget id>]] " +
                    "placeholder for each widget.",
            ),
        widgets: z.array(widgetInputSchema).optional(),
        images: z.record(z.string(), z.unknown()).optional(),
    };

    server.registerTool(
        "create_item",
        {
            title: "Create a Perseus item",
            description:
                "Start a draft from new content. Give the question (and any " +
                "hints) as content plus a list of widgets; each widget's " +
                "options are merged over its type's defaults and checked, " +
                "and the whole item is validated as validate_item does. If " +
                "anything has errors, nothing is saved and the issues are " +
                "returned. Returns the new itemId and any warnings; use " +
                "export_item to read the item.",
            inputSchema: z.object({
                question: z.object(rendererShape),
                hints: z
                    .array(
                        z.object({
                            ...rendererShape,
                            replace: z
                                .boolean()
                                .optional()
                                .describe(
                                    "Show this hint in place of the one " +
                                        "before it.",
                                ),
                        }),
                    )
                    .optional(),
                answerArea: z
                    .record(z.string(), z.unknown())
                    .optional()
                    .describe(
                        "Tools offered with the item, e.g. a calculator.",
                    ),
                notes: notesSchema,
            }),
        },
        ({notes, ...input}) =>
            run("create_item", () => {
                const result = drafts.createItem(input, notes);
                if (!result.ok) {
                    return errorResult(
                        "The item wasn't created; nothing was saved.",
                        {issues: result.issues},
                    );
                }
                return jsonResult({
                    itemId: result.draft.itemId,
                    issues: result.issues,
                });
            }),
    );

    server.registerTool(
        "add_widget",
        {
            title: "Add a widget",
            description:
                "Add a widget to a draft's question (or a hint) and place its " +
                "[[☃ id]] placeholder in the content: right after the `after` " +
                "text, or at the end if `after` is omitted. `options` are " +
                "merged over the type's defaults; get_widget_spec or the " +
                "data-schema.ts resource gives their exact shape, and the " +
                "Perseus parser checks them. If the widget or the item has " +
                "errors, nothing is saved and the issues are returned. " +
                "Returns the widget's id, the new revision and any warnings.",
            inputSchema: z.object({
                itemId: z.string(),
                ...widgetInputSchema.shape,
                id: widgetInputSchema.shape.id
                    .optional()
                    .describe(
                        'Defaults to the next free "<type> <n>" id, e.g. ' +
                            '"radio 2".',
                    ),
                hint: z
                    .number()
                    .int()
                    .min(0)
                    .optional()
                    .describe(
                        "The hint to add it to; the question if omitted.",
                    ),
                after: z
                    .string()
                    .optional()
                    .describe(
                        "Text already in the content; the placeholder goes " +
                            "right after its first occurrence.",
                    ),
            }),
        },
        ({itemId, ...input}) =>
            run("add_widget", () => {
                const result = drafts.addWidget(itemId, input);
                if (!result.ok) {
                    return errorResult(
                        "The widget wasn't added; the draft is unchanged.",
                        {issues: result.issues},
                    );
                }
                return jsonResult({
                    itemId,
                    widgetId: result.widgetId,
                    revision: result.draft.revision,
                    issues: result.issues,
                });
            }),
    );

    server.registerTool(
        "edit_item",
        {
            title: "Edit a Perseus item",
            description:
                "Change a draft with a JSON Patch (RFC 6902) against its " +
                "PerseusItem JSON, e.g. " +
                '[{"op": "replace", "path": "/question/widgets/radio 1/' +
                'options/choices/1/correct", "value": true}], and/or replace ' +
                "its notes. The patched item is validated as validate_item " +
                "does. If an operation fails or the item has errors, nothing " +
                "is saved and the issues are returned; fix the patch and " +
                "retry. Use a `test` operation to check a value before " +
                "changing it. Returns the new revision and any warnings; use " +
                "export_item to read the item.",
            inputSchema: z.object({
                itemId: z.string(),
                patch: patchSchema,
                notes: notesSchema.describe(
                    "Replaces the draft's notes: context to keep with it, " +
                        "such as where the item came from, what it's for or " +
                        "what's left to do.",
                ),
            }),
        },
        ({itemId, patch, notes}) =>
            run("edit_item", () => {
                if ((patch == null || patch.length === 0) && notes == null) {
                    return errorResult("Pass a `patch`, `notes` or both.");
                }
                const result = drafts.editItem(itemId, {patch, notes});
                if (!result.ok) {
                    return errorResult(
                        "The edit wasn't applied; the draft is unchanged.",
                        {issues: result.issues},
                    );
                }
                return jsonResult({
                    itemId,
                    revision: result.draft.revision,
                    issues: result.issues,
                });
            }),
    );

    server.registerTool(
        "export_item",
        {
            title: "Export a Perseus item",
            description:
                "Return a draft's PerseusItem JSON (fully migrated), its " +
                "notes and the path of the file it's saved in; with " +
                "`revision`, the draft as it was at that revision " +
                "(list_revisions lists them). For many drafts, read_items " +
                "reads their parts in one call. This is how to read a draft: " +
                "the file is the server's, so don't open, script over or " +
                "change it.",
            inputSchema: z.object({
                itemId: z.string(),
                revision: z
                    .number()
                    .int()
                    .positive()
                    .optional()
                    .describe("An earlier revision to read instead."),
            }),
            annotations: {readOnlyHint: true},
        },
        ({itemId, revision}) =>
            run("export_item", () => {
                const {draft, location} = drafts.exportItem(itemId, revision);
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
        "edit_items",
        {
            title: "Edit several Perseus items",
            description:
                "Change several drafts in one call, each as edit_item does " +
                "(a JSON Patch and/or new notes). Each edit is validated and " +
                "saved, or not, on its own, so one failing edit doesn't stop " +
                "the others; the result says which were saved. For a " +
                "mechanical change to many drafts, apply_fix may already " +
                "do it; never edit draft files or script the change.",
            inputSchema: z.object({
                edits: z
                    .array(
                        z.object({
                            itemId: z.string(),
                            patch: patchSchema,
                            notes: notesSchema,
                        }),
                    )
                    .min(1),
            }),
        },
        ({edits}) =>
            run("edit_items", () =>
                jsonResult({
                    results: drafts.editItems(edits).map((result) =>
                        result.ok
                            ? {
                                  itemId: result.itemId,
                                  saved: true,
                                  revision: result.draft.revision,
                                  issues: result.issues,
                              }
                            : {
                                  itemId: result.itemId,
                                  saved: false,
                                  issues: result.issues,
                              },
                    ),
                }),
            ),
    );

    registerExerciseTools(server, {exercises, preview, readItems, run});
    registerImageTools(server, {images, run});
    if (graffiti != null) {
        registerGraffitiTools(server, {graffiti, preview, run});
    }
    if (search != null) {
        registerSearchTools(server, {search, run});
    }
    if (guidelines != null && fixes != null) {
        registerGuidelineTools(server, {guidelines, fixes, run});
    }

    server.registerTool(
        "list_revisions",
        {
            title: "List a draft's revisions",
            description:
                "List every kept revision of a draft, oldest first, with " +
                'when it was made and what made it (e.g. "edit_item: 2 ' +
                'operations"). Drafts saved before revisions were kept ' +
                "start their history at that revision.",
            inputSchema: z.object({itemId: z.string()}),
            annotations: {readOnlyHint: true},
        },
        ({itemId}) =>
            run("list_revisions", () =>
                jsonResult({
                    itemId,
                    revisions: drafts.listRevisions(itemId),
                }),
            ),
    );

    server.registerTool(
        "revert_item",
        {
            title: "Revert a draft to an earlier revision",
            description:
                "Save the item of an earlier revision as the draft's newest " +
                "revision. Nothing is lost: the revisions in between stay " +
                "kept, so a revert can itself be reverted. The draft keeps " +
                "its current notes.",
            inputSchema: z.object({
                itemId: z.string(),
                revision: z.number().int().positive(),
            }),
        },
        ({itemId, revision}) =>
            run("revert_item", () => {
                const draft = drafts.revertItem(itemId, revision);
                return jsonResult({
                    itemId,
                    revision: draft.revision,
                    revertedTo: revision,
                });
            }),
    );

    registerPreviewTools(server, {drafts, preview, previewApp, graffiti, run});

    server.registerTool(
        "list_items",
        {
            title: "List drafts",
            description:
                "List saved drafts, most recently changed first, with their " +
                "notes. Also lists saved files that couldn't be loaded.",
            inputSchema: z.object({}),
            annotations: {readOnlyHint: true},
        },
        () =>
            run("list_items", () => {
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
            inputSchema: z.object({}),
            annotations: {readOnlyHint: true},
        },
        () => run("list_widgets", () => jsonResult(widgets.listWidgets())),
    );

    server.registerTool(
        "get_widget_spec",
        {
            title: "Get a widget's spec",
            description:
                "Return a widget type's status and notes, its default " +
                "options, and the documented TypeScript definitions of its " +
                "options and user input, taken from Perseus's own schema. " +
                "Read a widget's options here rather than in Perseus's " +
                "source, which authors don't have.",
            inputSchema: z.object({type: z.string().describe('e.g. "radio"')}),
            annotations: {readOnlyHint: true},
        },
        ({type}) =>
            run("get_widget_spec", () =>
                jsonResult(widgets.getWidgetSpec(type)),
            ),
    );

    server.registerTool(
        "validate_item",
        {
            title: "Validate a Perseus item",
            description:
                "Check a draft (by itemId) or a PerseusItem (as JSON): it " +
                "must parse, every [[☃ widget-id]] placeholder must have a " +
                "widget and vice versa, and the content is linted. Returns " +
                "`valid` plus issues with JSON paths. Use it, not your own " +
                "checks of the JSON: it parses the item as Perseus does.",
            inputSchema: z.object({
                itemId: z.string().optional(),
                item: z
                    .unknown()
                    .optional()
                    .describe("A PerseusItem as an object or JSON string."),
            }),
            annotations: {readOnlyHint: true},
        },
        ({itemId, item}) =>
            run("validate_item", () => {
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

    const userInputSchema = z
        .record(z.string(), z.unknown())
        .describe(
            "The learner's input for each widget, by widget id, e.g. " +
                '{"numeric-input 1": {"currentValue": "3/4"}}. ' +
                "get_widget_spec gives each widget's user input shape.",
        );
    const localeSchema = z
        .string()
        .optional()
        .describe(
            'How numbers are written, e.g. "de" for 1.000,5; default "en".',
        );

    server.registerTool(
        "score_item",
        {
            title: "Score an answer",
            description:
                "Score a learner's answer to a draft's question as Perseus " +
                'does on "Check". Returns the outcome ("correct", ' +
                '"incorrect", or "invalid" when the answer isn\'t scored, ' +
                "e.g. a widget is empty) with Perseus's score and each " +
                "widget's score. It runs Perseus's own scoring: don't work " +
                "out by code or by reading the answer key whether an " +
                "answer would be accepted.",
            inputSchema: z.object({
                itemId: z.string(),
                userInput: userInputSchema,
                locale: localeSchema,
            }),
            annotations: {readOnlyHint: true},
        },
        ({itemId, userInput, locale}) =>
            run("score_item", () => {
                const result = scoring.scoreItem(itemId, userInput, locale);
                if (!result.ok) {
                    return errorResult("The answer couldn't be scored.", {
                        issues: result.issues,
                    });
                }
                return jsonResult(result.score);
            }),
    );

    server.registerTool(
        "check_user_inputs",
        {
            title: "Check answers against expectations",
            description:
                "Score a batch of answers to a draft's question and compare " +
                "each outcome with the expected one. Write the answers by " +
                "solving the question yourself, not from the answer key: " +
                "correct answers in several equivalent forms (0.75, 3/4) " +
                "and common mistakes. A mismatch points to a wrong key or " +
                "a misconfigured widget. Returns the number of mismatches " +
                "and each answer's outcome, with Perseus's full score only " +
                "for the mismatches.",
            inputSchema: z.object({
                itemId: z.string(),
                inputs: z
                    .array(
                        z.object({
                            label: z
                                .string()
                                .optional()
                                .describe('e.g. "3/4 as a fraction".'),
                            userInput: userInputSchema,
                            expected: z.enum([
                                "correct",
                                "incorrect",
                                "invalid",
                            ]),
                        }),
                    )
                    .min(1),
                locale: localeSchema,
            }),
            annotations: {readOnlyHint: true},
        },
        ({itemId, inputs, locale}) =>
            run("check_user_inputs", () =>
                jsonResult(scoring.checkUserInputs(itemId, inputs, locale)),
            ),
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

    server.registerResource(
        "review-checklist",
        CHECKLIST_URI,
        {
            title: "Perseus item review checklist",
            description:
                "Defects that have reached learners, with how to catch each " +
                "one and a short example. validate_item issues link to " +
                "their entry.",
            mimeType: "text/markdown",
        },
        (uri) => ({
            contents: [{uri: uri.href, text: review.checklist()}],
        }),
    );

    server.registerTool(
        "review_item",
        {
            title: "Review a draft",
            description:
                "Call before returning an item you created or edited. Returns " +
                "the review procedure (solve it independently, test likely " +
                "answers with check_user_inputs, check the last hint against " +
                "the key, and report findings), the draft's validation issues, " +
                "and the checklist entries to check it against: the judgment " +
                "calls, and the entry for each issue. Follow the procedure.",
            inputSchema: z.object({itemId: z.string()}),
            annotations: {readOnlyHint: true},
        },
        ({itemId}) =>
            run("review_item", async () =>
                jsonResult(await review.reviewItem(itemId)),
            ),
    );

    registerAuthoringPrompt(server);

    // The same procedure, for a person to start (a prompt can't be started
    // by the agent).
    server.registerPrompt(
        "review_item",
        {
            title: "Review a Perseus item",
            description:
                "The procedure for reviewing a draft before it goes to " +
                "learners: validate, solve it independently, test likely " +
                "answers with check_user_inputs, and report findings.",
            argsSchema: z.object({
                itemId: z.string().describe("The draft to review."),
            }),
        },
        ({itemId}) => ({
            messages: [
                {
                    role: "user",
                    content: {type: "text", text: review.reviewPrompt(itemId)},
                },
            ],
        }),
    );

    return server;
}
