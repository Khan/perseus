import {McpServer} from "@modelcontextprotocol/server";
import {z} from "zod";

import {CHECKLIST_URI} from "../../domain/review/checklist";
import {libVersion} from "../../version";

import {errorResult, jsonResult, runTool} from "./tool-results";

import type {DraftUseCases} from "../../app/drafts";
import type {PreviewUseCases} from "../../app/preview";
import type {ReviewUseCases} from "../../app/review";
import type {ScoringUseCases} from "../../app/scoring";
import type {WidgetUseCases} from "../../app/widgets";

// Sent to the agent when it connects (the `instructions` field of the MCP
// initialize result); hosts may add it to the agent's system prompt.
const INSTRUCTIONS = `\
Tools for authoring Perseus items (Khan Academy exercise content).

Work on drafts: create_item (for new content) or open_item (for an existing
item) returns an itemId, which later tools take instead of the whole item.
add_widget adds a widget and edit_item changes a draft with a JSON Patch;
every change is validated before it's saved. Keep notes on a draft (where it
came from, what it's for, what's left) so you can find it again with
list_items. Items from any Perseus version are accepted; items are always
returned fully migrated to the latest schema. export_item returns the finished
JSON.

list_widgets and get_widget_spec describe each widget's options; validate_item
checks an item the way Perseus will. score_item scores an answer as Perseus
does; to test an item, solve it yourself and give check_user_inputs correct
answers (in several equivalent forms) and common mistakes, each with the
outcome you expect.

Review every item you create or edit before returning it: the review_item
prompt gives the procedure, and the review checklist resource describes each
kind of defect.

preview_item returns a URL where a person can see a draft as learners will,
answer it and reveal its hints; the page follows the draft's changes, so give
it to them once and keep editing. Hosts that support MCP Apps also show the
preview in the chat.`;

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
/** The MCP Apps page that shows a draft's preview inside the chat. */
export type PreviewApp = {
    /** The page's HTML: one self-contained document, as MCP Apps requires. */
    html(): Promise<string>;
};

// MCP Apps (the `ui://` extension): the host shows this resource in the
// chat when preview_item is called.
const PREVIEW_APP_URI = "ui://perseus/preview.html";
const MCP_APP_MIME_TYPE = "text/html;profile=mcp-app";
const RESOURCE_DOMAINS = [
    "https://cdn.kastatic.org",
    "https://ka-perseus-images.s3.amazonaws.com",
    "https://ka-perseus-graphie.s3.amazonaws.com",
];

export function createMcpServer({
    drafts,
    widgets,
    scoring,
    review,
    preview,
    previewApp,
}: {
    drafts: DraftUseCases;
    widgets: WidgetUseCases;
    scoring: ScoringUseCases;
    review: ReviewUseCases;
    preview: PreviewUseCases;
    previewApp?: PreviewApp;
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
            runTool(() => {
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
            runTool(() => {
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
                patch: z
                    .array(
                        z.object({
                            op: z.enum([
                                "add",
                                "remove",
                                "replace",
                                "move",
                                "copy",
                                "test",
                            ]),
                            path: z.string(),
                            value: z.unknown().optional(),
                            from: z.string().optional(),
                        }),
                    )
                    .optional(),
                notes: notesSchema.describe(
                    "Replaces the draft's notes: context to keep with it, " +
                        "such as where the item came from, what it's for or " +
                        "what's left to do.",
                ),
            }),
        },
        ({itemId, patch, notes}) =>
            runTool(() => {
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
                "notes and the path of the file it's saved in.",
            inputSchema: z.object({itemId: z.string()}),
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
        "preview_item",
        {
            title: "Preview a draft",
            description:
                "Return the URL of a page showing a draft as learners will " +
                "see it, where a person can answer it, check their answer " +
                "and reveal the hints. The page updates as the draft " +
                "changes. Give the URL to the person you're working with.",
            inputSchema: z.object({itemId: z.string()}),
            annotations: {readOnlyHint: true},
            // Hosts that support MCP Apps show the preview in the chat. The
            // older key is deprecated but still read by some hosts.
            ...(previewApp != null && {
                _meta: {
                    ui: {resourceUri: PREVIEW_APP_URI},
                    "ui/resourceUri": PREVIEW_APP_URI,
                },
            }),
        },
        ({itemId}) =>
            runTool(() =>
                jsonResult({itemId, url: preview.previewUrl(itemId)}),
            ),
    );

    if (previewApp != null) {
        // Only the app page calls this: it follows the draft through the
        // host, since hosts don't let app pages reach the local server.
        server.registerTool(
            "get_preview_draft",
            {
                title: "Get a draft for its preview",
                description:
                    "For the preview shown in the chat: the draft's item and " +
                    "revision, or `changed: false` when its revision is still " +
                    "`sinceRevision`.",
                inputSchema: z.object({
                    itemId: z.string(),
                    sinceRevision: z.number().int().optional(),
                }),
                annotations: {readOnlyHint: true},
                _meta: {
                    ui: {resourceUri: PREVIEW_APP_URI, visibility: ["app"]},
                },
            },
            ({itemId, sinceRevision}) =>
                runTool(() => {
                    const {draft} = drafts.exportItem(itemId);
                    if (draft.revision === sinceRevision) {
                        return jsonResult({changed: false});
                    }
                    return jsonResult({
                        changed: true,
                        revision: draft.revision,
                        item: draft.item,
                    });
                }),
        );

        server.registerResource(
            "preview-app",
            PREVIEW_APP_URI,
            {
                title: "Perseus draft preview",
                description:
                    "The page MCP Apps hosts show in the chat for " +
                    "preview_item.",
                mimeType: MCP_APP_MIME_TYPE,
            },
            async (uri) => {
                return {
                    contents: [
                        {
                            uri: uri.href,
                            mimeType: MCP_APP_MIME_TYPE,
                            text: await previewApp.html(),
                            _meta: {
                                ui: {
                                    // Hosts block any outside host not
                                    // declared here: MathJax's fonts and the
                                    // hosts Perseus images come from.
                                    csp: {resourceDomains: RESOURCE_DOMAINS},
                                    prefersBorder: true,
                                },
                            },
                        },
                    ],
                };
            },
        );
    }

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
            inputSchema: z.object({}),
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
            inputSchema: z.object({type: z.string().describe('e.g. "radio"')}),
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
                "widget's score.",
            inputSchema: z.object({
                itemId: z.string(),
                userInput: userInputSchema,
                locale: localeSchema,
            }),
            annotations: {readOnlyHint: true},
        },
        ({itemId, userInput, locale}) =>
            runTool(() => {
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
                "and each answer's result.",
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
            runTool(() =>
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
