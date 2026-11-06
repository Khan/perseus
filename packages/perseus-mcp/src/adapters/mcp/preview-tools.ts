// The preview tools: URLs of the pages that show drafts, exercises and
// diagrams in a browser, opening them in the default browser, and showing
// one draft in the chat (MCP Apps), with the tool its page reads drafts by.
import {z} from "zod";

import {diagramIdsIn} from "../../domain/graffiti/diagram";

import {errorResult, jsonResult} from "./tool-results";

import type {DraftUseCases} from "../../app/drafts";
import type {GraffitiUseCases} from "../../app/graffiti";
import type {PreviewUseCases} from "../../app/preview";
import type {CallToolResult, McpServer} from "@modelcontextprotocol/server";

/** The MCP Apps page that shows a draft's preview inside the chat. */
export type PreviewApp = {
    /** The page's HTML: one self-contained document, as MCP Apps requires. */
    html(): Promise<string>;
};

// MCP Apps (the `ui://` extension): the host shows this resource in the
// chat when show_item is called.
const PREVIEW_APP_URI = "ui://perseus/preview.html";
const MCP_APP_MIME_TYPE = "text/html;profile=mcp-app";
const RESOURCE_DOMAINS = [
    "https://cdn.kastatic.org",
    "https://ka-perseus-images.s3.amazonaws.com",
    "https://ka-perseus-graphie.s3.amazonaws.com",
];

export function registerPreviewTools(
    server: McpServer,
    {
        drafts,
        preview,
        previewApp,
        graffiti,
        run,
    }: {
        drafts: DraftUseCases;
        preview: PreviewUseCases;
        /** The page show_item shows; show_item is left out without it. */
        previewApp?: PreviewApp;
        graffiti?: GraffitiUseCases;
        /** Runs a tool's handler, recording its errors under its name. */
        run: (
            tool: string,
            handler: () => CallToolResult | Promise<CallToolResult>,
        ) => Promise<CallToolResult>;
    },
): void {
    server.registerTool(
        "preview_item",
        {
            title: "Preview a draft",
            description:
                "Return the URL of a page showing a draft as learners will " +
                "see it, where a person can answer it, check their answer " +
                "and reveal the hints. The page updates as the draft " +
                "changes, so give the URL once and keep editing. Give it " +
                "to the person you're working with to open in a browser " +
                "(open_in_browser opens it for them), or open it in a " +
                "browser pane of your own if you have one. For several " +
                "items, preview_exercise shows them all on one page. It " +
                "works while this server runs; if they say it stopped " +
                "working, call this again for a new one.",
            inputSchema: z.object({itemId: z.string()}),
            annotations: {readOnlyHint: true},
        },
        ({itemId}) =>
            run("preview_item", () =>
                jsonResult({itemId, url: preview.previewUrl(itemId)}),
            ),
    );

    if (previewApp != null) {
        server.registerTool(
            "show_item",
            {
                title: "Show a draft in the chat",
                description:
                    "Show one draft in the chat, as learners will see it, " +
                    "where the host can show it (hosts that support MCP " +
                    "Apps). For a quick look at a single item: when the " +
                    "person asks to see it here, or has no browser at hand. " +
                    "Otherwise prefer preview_item's URL, which they can " +
                    "keep open in a browser, and for several items " +
                    "preview_exercise; don't show items in the chat one " +
                    "after another. Returns the preview's URL too.",
                inputSchema: z.object({itemId: z.string()}),
                annotations: {readOnlyHint: true},
                // The host shows the app page in the chat. The older key
                // is deprecated but still read by some hosts.
                _meta: {
                    ui: {resourceUri: PREVIEW_APP_URI},
                    "ui/resourceUri": PREVIEW_APP_URI,
                },
            },
            ({itemId}) =>
                run("show_item", () =>
                    jsonResult({itemId, url: preview.previewUrl(itemId)}),
                ),
        );
    }

    server.registerTool(
        "open_in_browser",
        {
            title: "Open a preview in the browser",
            description:
                "Open a preview page in the default browser of the machine " +
                "this server runs on: a draft's (itemId), an exercise's " +
                "(exerciseId, with grid for every item at once) or a " +
                "diagram's (graffitiId). Give exactly one. Use it when the " +
                "person asks you to open a page; otherwise give them the " +
                "URL. Returns the URL and whether a browser was started.",
            inputSchema: z.object({
                itemId: z.string().optional(),
                exerciseId: z.string().optional(),
                grid: z
                    .boolean()
                    .optional()
                    .describe("With exerciseId: open its grid."),
                graffitiId: z.string().optional(),
            }),
        },
        ({itemId, exerciseId, grid, graffitiId}) =>
            run("open_in_browser", () => {
                const given = [itemId, exerciseId, graffitiId].filter(
                    (id) => id != null,
                );
                if (given.length !== 1) {
                    return errorResult(
                        "Give exactly one of itemId, exerciseId and " +
                            "graffitiId.",
                    );
                }
                if (graffitiId != null) {
                    // Not found, if it doesn't exist.
                    graffiti?.getGraffiti(graffitiId);
                }
                const {url, opened} = preview.openInBrowser(
                    itemId != null
                        ? {itemId}
                        : exerciseId != null
                          ? {exerciseId, grid}
                          : {graffitiId: graffitiId!},
                );
                return jsonResult({
                    url,
                    opened,
                    ...(!opened && {
                        note:
                            "No browser could be started on this machine; " +
                            "give the person the URL.",
                    }),
                });
            }),
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
                    "revision, with the drawings of the Graffiti diagrams it " +
                    "shows whose revision isn't in `diagramRevisions`; or " +
                    "`changed: false` when its revision is still " +
                    "`sinceRevision` and no diagram changed.",
                inputSchema: z.object({
                    itemId: z.string(),
                    sinceRevision: z.number().int().optional(),
                    diagramRevisions: z
                        .record(z.string(), z.number().int())
                        .optional(),
                }),
                annotations: {readOnlyHint: true},
                _meta: {
                    ui: {resourceUri: PREVIEW_APP_URI, visibility: ["app"]},
                },
            },
            ({itemId, sinceRevision, diagramRevisions}) =>
                run("get_preview_draft", async () => {
                    const {draft} = drafts.exportItem(itemId);
                    // The page can't load diagrams from this server, so
                    // their drawings come with the draft, and a new revision
                    // of one is a change too.
                    const {diagrams, missing} =
                        graffiti == null
                            ? {diagrams: {}, missing: []}
                            : await graffiti.changedDiagrams(
                                  diagramIdsIn(draft.item),
                                  diagramRevisions,
                              );
                    if (
                        draft.revision === sinceRevision &&
                        Object.keys(diagrams).length === 0
                    ) {
                        return jsonResult({changed: false});
                    }
                    return jsonResult({
                        changed: true,
                        revision: draft.revision,
                        item: draft.item,
                        diagrams,
                        missingDiagrams: missing,
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
}
