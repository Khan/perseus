// The tools for applying content guidelines: reading them, and fixes that
// apply the rules code can apply to many drafts at once.
import {z} from "zod";

import {FIX_NAMES, FIXES} from "../../domain/fixes/fixes";

import {jsonResult} from "./tool-results";

import type {FixUseCases} from "../../app/fixes";
import type {GuidelineUseCases} from "../../app/guidelines";
import type {CallToolResult, McpServer} from "@modelcontextprotocol/server";

const FIX_LIST = Object.entries(FIXES)
    .map(([name, does]) => `${name}: ${does}`)
    .join(" ");

export function registerGuidelineTools(
    server: McpServer,
    {
        guidelines,
        fixes,
        run,
    }: {
        guidelines: GuidelineUseCases;
        fixes: FixUseCases;
        /** Runs a tool's handler, recording its errors under its name. */
        run: (
            tool: string,
            handler: () => CallToolResult | Promise<CallToolResult>,
        ) => Promise<CallToolResult>;
    },
): void {
    server.registerTool(
        "get_guidelines",
        {
            title: "Read the content guidelines",
            description:
                "The organization's content guidelines, as topics (such as " +
                "writing in general, math content, TeX, image " +
                "descriptions), from the local folder the server is set up " +
                "with. Read them a topic at a time, as the task needs: " +
                "with no topic, lists each topic's summary, when to read it " +
                "and related topics; with `topic`, that document (whole when " +
                "it's short, else its headings to ask for by `section`); " +
                "`section` alone finds headings in every topic. Also lists " +
                "the fixes apply_fix has: rules code can apply. Before " +
                "writing, checking or editing items, list the topics and " +
                "read the ones the task needs; apply what a fix covers with " +
                "apply_fix, and read items only for what needs judgment.",
            inputSchema: z.object({
                topic: z
                    .string()
                    .optional()
                    .describe("The topic to read, as the list names it."),
                section: z
                    .string()
                    .optional()
                    .describe("Text in the headings of the sections wanted."),
            }),
            annotations: {readOnlyHint: true},
        },
        ({topic, section}) =>
            run("get_guidelines", async () =>
                jsonResult(await guidelines.getGuidelines({topic, section})),
            ),
    );

    server.registerTool(
        "apply_fix",
        {
            title: "Apply a fix to many drafts",
            description:
                "Apply a mechanical change to drafts (the ones named, or " +
                "every draft of an exercise), so a rule can be applied " +
                "across many items without reading them. `dryRun` (the " +
                "default) only says what would change, with the changed " +
                "lines; run it first, then again with dryRun false to save. " +
                "Each change is a new revision, validated like any edit (one " +
                "that would break an item is rejected), and can be reverted. " +
                "Results list up to 50 drafts; counts cover all. Fixes: " +
                FIX_LIST,
            inputSchema: z.object({
                fix: z.enum(FIX_NAMES),
                exerciseId: z.string().optional(),
                itemIds: z.array(z.string()).min(1).optional(),
                find: z
                    .string()
                    .optional()
                    .describe("replace-text: the text (or pattern) to find."),
                replace: z
                    .string()
                    .optional()
                    .describe("replace-text: what to put in its place."),
                regex: z
                    .boolean()
                    .optional()
                    .describe("replace-text: `find` is a regular expression."),
                scope: z
                    .enum(["question", "hints", "all"])
                    .optional()
                    .describe("replace-text: where to look. Default all."),
                dryRun: z.boolean().default(true),
            }),
        },
        (input) =>
            run("apply_fix", () => {
                const target =
                    input.itemIds != null
                        ? {itemIds: input.itemIds}
                        : input.exerciseId != null
                          ? {exerciseId: input.exerciseId}
                          : null;
                if (target == null) {
                    throw new Error("Give an exerciseId or itemIds.");
                }
                const request =
                    input.fix === "replace-text"
                        ? {
                              fix: input.fix,
                              find: input.find ?? "",
                              replace: input.replace ?? "",
                              regex: input.regex,
                              scope: input.scope,
                          }
                        : {fix: input.fix};
                return jsonResult(
                    fixes.applyFix({request, target, dryRun: input.dryRun}),
                );
            }),
    );
}
