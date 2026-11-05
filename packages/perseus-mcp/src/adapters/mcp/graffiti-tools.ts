// The tools for Graffiti diagrams: scripts that draw Graphie images with the
// Graffiti library, kept by revision under a stable id.
import {z} from "zod";

import {GRAFFITI_HOST} from "../../domain/graffiti/diagram";

import {jsonResult} from "./tool-results";

import type {GraffitiUseCases} from "../../app/graffiti";
import type {CallToolResult, McpServer} from "@modelcontextprotocol/server";

const SCRIPT_CONTRACT =
    "The script is TypeScript or JavaScript that imports from " +
    '"graffiti" (and nothing else) and default-exports {canvas, shapes, ' +
    "labels?}, or a function (it may be async, and gets the library as " +
    "its argument) returning that: a canvas such as " +
    "scaledUniform([-5, 5], [-5, 5], 40, {margin: 10}), the drawables to " +
    "draw on it (grid(), axes(), segment(point(0, 0), point(3, 4)), " +
    "circle(…), polygon(…), plot(…), rightAngle(…), …), and labels made " +
    'with label(point(x, y), "text", "above right", {typesetAsMath}), ' +
    "placed in plane coordinates. It runs in a process of its own with no " +
    "file, network or process access, for at most 10 seconds.";

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
        run,
    }: {
        graffiti: GraffitiUseCases;
        /** Runs a tool's handler, recording its errors under its name. */
        run: (
            tool: string,
            handler: () => CallToolResult | Promise<CallToolResult>,
        ) => Promise<CallToolResult>;
    },
): void {
    server.registerTool(
        "create_graffiti",
        {
            title: "Draw a diagram with Graffiti",
            description:
                "Draw a diagram (an illustration, not a graph for the " +
                "learner to interact with; that's interactive-graph) from a " +
                "Graffiti script, and keep it as a new diagram. It's kept " +
                "only if the script draws: an error says what went wrong. " +
                "Returns its graffitiId, revision, size in pixels and label " +
                "count. " +
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
