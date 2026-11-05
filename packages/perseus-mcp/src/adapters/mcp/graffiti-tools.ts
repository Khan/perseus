// The tools for Graffiti diagrams: scripts that draw Graphie images with the
// Graffiti library, kept by revision under a stable id.
import {z} from "zod";

import {GRAFFITI_HOST} from "../../domain/graffiti/diagram";

import {jsonResult} from "./tool-results";

import type {GraffitiUseCases} from "../../app/graffiti";
import type {PreviewUseCases} from "../../app/preview";
import type {CallToolResult, McpServer} from "@modelcontextprotocol/server";

const SCRIPT_CONTRACT =
    "The script is TypeScript or JavaScript that imports from " +
    '"graffiti", and from "khan-style" for Khan\'s colors and sizes (draw ' +
    "with those, not colors of your own), and nothing else, and " +
    "default-exports {canvas, shapes, " +
    "labels?}, or a function (it may be async, and gets the library as " +
    "its argument) returning that: a canvas such as " +
    "scaledUniform([-5, 5], [-5, 5], 40, {margin: 10}), the drawables to " +
    "draw on it (grid(), axes(), segment(point(0, 0), point(3, 4)), " +
    "circle(…), polygon(…), plot(…), rightAngle(…), …), and labels made " +
    'with label(point(x, y), "text", "above right", {typesetAsMath}), ' +
    "placed in plane coordinates. It runs in a process of its own with no " +
    "file, network or process access, for at most 10 seconds. Read " +
    "get_graffiti_reference first: it has the whole API and how it " +
    "behaves (arc direction, style keys, labels). Graffiti's source isn't " +
    "available to read, so don't look for it.";

const EMBED =
    "To show a diagram in an item, give an image widget " +
    `backgroundImage.url "web+graphie://${GRAFFITI_HOST}/graffiti/` +
    '<graffitiId>" with the width and height this returns: the item ' +
    "then always shows the latest revision, so changing the diagram " +
    "doesn't change the item.";

const sourceSchema = z
    .string()
    .min(1)
    .describe("The Graffiti script. " + SCRIPT_CONTRACT);

const notesSchema = z
    .string()
    .optional()
    .describe("What the diagram shows and what it's for.");

export function registerGraffitiTools(
    server: McpServer,
    {
        graffiti,
        preview,
        run,
    }: {
        graffiti: GraffitiUseCases;
        preview: PreviewUseCases;
        /** Runs a tool's handler, recording its errors under its name. */
        run: (
            tool: string,
            handler: () => CallToolResult | Promise<CallToolResult>,
        ) => Promise<CallToolResult>;
    },
): void {
    server.registerTool(
        "get_graffiti_reference",
        {
            title: "Read the Graffiti reference",
            description:
                "Everything there is to know about writing a Graffiti " +
                "script: what a script exports, coordinates and canvases, " +
                "every shape, which way arcs and angle marks go, the style " +
                "keys and defaults, labels, and how to draw marks there are " +
                "no helpers for; then the library's API as its type " +
                "definitions. Read it before writing or changing a script.",
            inputSchema: z.object({}),
            annotations: {readOnlyHint: true},
        },
        () =>
            run("get_graffiti_reference", async () => ({
                content: [{type: "text", text: await graffiti.reference()}],
            })),
    );

    server.registerTool(
        "create_graffiti",
        {
            title: "Draw a diagram with Graffiti",
            description:
                "Draw a diagram (an illustration, not a graph for the " +
                "learner to interact with; that's interactive-graph) from a " +
                "Graffiti script, and keep it as a new diagram. It's kept " +
                "only if the script draws: an error says what went wrong. " +
                "Returns its graffitiId, revision, size in pixels, label " +
                "count, and warnings for what doesn't follow Khan's style " +
                "(colors outside its palette): fix those. " +
                EMBED,
            inputSchema: z.object({source: sourceSchema, notes: notesSchema}),
        },
        (input) =>
            run("create_graffiti", async () =>
                jsonResult(await graffiti.createGraffiti(input)),
            ),
    );

    server.registerTool(
        "update_graffiti",
        {
            title: "Change a diagram",
            description:
                "Give a diagram a new script, new notes, or both, as a new " +
                "revision; earlier revisions are kept. A new script is kept " +
                "only if it draws. Items that show the diagram show the new " +
                "revision without being edited.",
            inputSchema: z.object({
                graffitiId: z.string(),
                source: sourceSchema.optional(),
                notes: notesSchema,
            }),
        },
        ({graffitiId, ...changes}) =>
            run("update_graffiti", async () =>
                jsonResult(await graffiti.updateGraffiti(graffitiId, changes)),
            ),
    );

    server.registerTool(
        "get_graffiti",
        {
            title: "Read a diagram's script",
            description:
                "A diagram's script and notes, at its latest revision or an " +
                "earlier one, with the URL an image widget shows it with.",
            inputSchema: z.object({
                graffitiId: z.string(),
                revision: z.number().int().positive().optional(),
            }),
            annotations: {readOnlyHint: true},
        },
        ({graffitiId, revision}) =>
            run("get_graffiti", () =>
                jsonResult(graffiti.getGraffiti(graffitiId, revision)),
            ),
    );

    server.registerTool(
        "preview_graffiti",
        {
            title: "Preview a diagram",
            description:
                "Return the URL of a page showing a diagram as Perseus shows " +
                "it, labels included, with its notes and a picker for its " +
                "earlier revisions. The page updates as the diagram changes. " +
                "Give the URL to the person you're working with. Previews " +
                "of items (preview_item) show their diagrams too.",
            inputSchema: z.object({graffitiId: z.string()}),
            annotations: {readOnlyHint: true},
        },
        ({graffitiId}) =>
            run("preview_graffiti", () => {
                // Not found, if it doesn't exist.
                graffiti.getGraffiti(graffitiId);
                return jsonResult({
                    graffitiId,
                    url: preview.graffitiUrl(graffitiId),
                });
            }),
    );

    server.registerTool(
        "list_graffiti",
        {
            title: "List diagrams",
            description:
                "List saved Graffiti diagrams, most recently changed first, " +
                "with their latest revision and notes.",
            inputSchema: z.object({}),
            annotations: {readOnlyHint: true},
        },
        () =>
            run("list_graffiti", () =>
                jsonResult({diagrams: graffiti.listGraffiti()}),
            ),
    );
}
