// The content search tools: search published content, count it, and import
// what's found into drafts. They're always offered; when search can't be
// used, they say why and how to start it.
import {z} from "zod";

import {MAX_IMPORT} from "../../app/search";
import {FACETS, SEARCH_FIELD_NAMES} from "../../domain/search/content-query";

import {jsonResult} from "./tool-results";

import type {SearchUseCases} from "../../app/search";
import type {CallToolResult, McpServer} from "@modelcontextprotocol/server";

const NARROW_FIRST =
    "Narrow a request to the content it's about with filters (and a query) " +
    "before reading any content: counts come from facet_content without " +
    "reading items at all.";

const filtersSchema = z
    .object({
        kind: z.enum(["item", "article"]).optional(),
        domain: z
            .string()
            .optional()
            .describe('A domain slug, such as "math".'),
        course: z
            .string()
            .optional()
            .describe(
                'A course slug, such as "cc-2nd-grade-math" (facet_content ' +
                    'with facets ["course"] lists them).',
            ),
        unit: z.string().optional().describe("A unit slug."),
        lesson: z.string().optional().describe("A lesson slug."),
        exerciseId: z.string().optional(),
        widgetTypes: z
            .array(z.string())
            .optional()
            .describe('Widget types it must use, all of them: ["radio"].'),
        widgetProps: z
            .array(z.string())
            .optional()
            .describe(
                "Widget option values it must have, as " +
                    "<type>.<path>=<value> with array indices left out: " +
                    '"interactive-graph.correct.type=circle", ' +
                    '"radio.multipleSelect=true".',
            ),
        hasGraphie: z.boolean().optional(),
        includeUnlisted: z
            .boolean()
            .optional()
            .describe(
                "Also search unlisted content (drafts, tests, staging " +
                    "courses). Default false: only what learners see.",
            ),
        filter: z
            .string()
            .optional()
            .describe(
                "A Meilisearch filter expression, joined to the rest with " +
                    "AND, for what the fields above can't say: \"hintCount " +
                    '>= 4", "widgetCount > 2", "course IN [a, b]", "NOT ' +
                    'widgetTypes = image". Filterable: kind, contentId, ' +
                    `${FACETS.join(", ")}.`,
            ),
    })
    .optional();

const querySchema = z
    .string()
    .optional()
    .describe(
        "Words to search for, all of them by default (see matchAny), in " +
            "the fields searchIn names, or all of them: the question and " +
            "hint text, widget text (choices, labels), TeX, and the titles " +
            "of the exercise and its lesson, unit, course and domain. Leave " +
            "it out to match everything the filters allow.",
    );

// How a query matches: where it looks, whole words, one per exercise.
const optionsSchema = {
    searchIn: z
        .array(z.enum(SEARCH_FIELD_NAMES))
        .min(1)
        .optional()
        .describe(
            "Where the query looks: titles (the exercise's and the problem " +
                "type's), question, hints, widgets (choices, labels), math " +
                "(TeX), tree (lesson, unit, course and domain titles), " +
                'options (widget option values). For "items that test X", ' +
                '["titles", "question"] keeps out items that only mention ' +
                "X in a hint or sit in a lesson named for it. Default: all.",
        ),
    onePerExercise: z
        .boolean()
        .optional()
        .describe(
            "Only the best match of each exercise, so the hits are of " +
                "different exercises: for sampling a course.",
        ),
    matchAny: z
        .boolean()
        .optional()
        .describe(
            "Match documents with any of the query's words, best first. " +
                "Default: all of them.",
        ),
};

export function registerSearchTools(
    server: McpServer,
    {
        search,
        run,
    }: {
        search: SearchUseCases;
        /** Runs a tool's handler, recording its errors under its name. */
        run: (
            tool: string,
            handler: () => CallToolResult | Promise<CallToolResult>,
        ) => Promise<CallToolResult>;
    },
): void {
    server.registerTool(
        "search_content",
        {
            title: "Search published content",
            description:
                "Search Khan Academy's published content (an index of a " +
                "content snapshot, English only): each hit is an item " +
                "(with its exercise and problem type) or an article, with " +
                "its courses, widget types, hint count, the question's first " +
                "line as written and, when the query matched the question, " +
                "a snippet around the match: not the content itself. " +
                "`total` counts every match. To sample a course, use " +
                "onePerExercise, so hits aren't all one exercise's items. " +
                NARROW_FIRST +
                " To work on items found, import_from_search makes drafts " +
                "of them.",
            inputSchema: z.object({
                query: querySchema,
                ...optionsSchema,
                filters: filtersSchema,
                limit: z.number().int().min(1).max(50).default(10),
                offset: z.number().int().min(0).optional(),
            }),
            annotations: {readOnlyHint: true},
        },
        ({query, filters, limit, offset, ...options}) =>
            run("search_content", async () =>
                jsonResult(
                    await search.searchContent({
                        query,
                        filters,
                        options,
                        limit,
                        offset,
                    }),
                ),
            ),
    );

    server.registerTool(
        "facet_content",
        {
            title: "Count published content",
            description:
                "Count the published content matching a query and filters, " +
                "by the values of one or more fields: how many items in the " +
                'math domain use interactive-graph (facets ["kind"] with ' +
                "those filters), which courses use radio most (facets " +
                '["course"]), which widget types a course uses ("widgetTypes"' +
                '), how option values are spread ("widgetProps"). Counts ' +
                "are of documents (items and articles); one in several " +
                "courses counts in each. Each facet returns its most common " +
                "values, `top` of them, and how many values it has. Facet " +
                '"title" for exercises\' titles. `exercises` counts the ' +
                "exercises the matching items are in. Reads no content.",
            inputSchema: z.object({
                query: querySchema,
                searchIn: optionsSchema.searchIn,
                matchAny: optionsSchema.matchAny,
                filters: filtersSchema,
                facets: z.array(z.enum(FACETS)).min(1),
                top: z.number().int().min(1).max(500).default(20),
            }),
            annotations: {readOnlyHint: true},
        },
        ({query, filters, facets, top, ...options}) =>
            run("facet_content", async () =>
                jsonResult(
                    await search.facetContent({
                        query,
                        filters,
                        options,
                        facets,
                        top,
                    }),
                ),
            ),
    );

    server.registerTool(
        "import_from_search",
        {
            title: "Make drafts of items found by search",
            description:
                "Copy published items into drafts, to edit: the items " +
                "named by contentId (from search_content's hits), or those " +
                "matching a query and filters. Makes one exercise per " +
                "exercise they're from, grouped by problem type, each draft " +
                "keeping its item's id so export_exercise writes it back as " +
                `an edit. At most ${MAX_IMPORT} items a call, as the ` +
                "exercise editor reviews at most that many at a time: " +
                "search first, and import only what the task needs. " +
                "Articles are skipped.",
            inputSchema: z.object({
                contentIds: z.array(z.string()).min(1).optional(),
                query: querySchema,
                ...optionsSchema,
                filters: filtersSchema,
                limit: z
                    .number()
                    .int()
                    .min(1)
                    .max(MAX_IMPORT)
                    .default(MAX_IMPORT),
            }),
        },
        ({contentIds, query, filters, limit, ...options}) =>
            run("import_from_search", async () =>
                jsonResult(
                    await search.importFromSearch({
                        contentIds,
                        query,
                        filters,
                        options,
                        limit,
                    }),
                ),
            ),
    );
}
