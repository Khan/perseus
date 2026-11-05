// The content search tools: search published content, count it, and import
// what's found into drafts. They're always offered; when search can't be
// used, they say why and how to start it.
import {z} from "zod";

import {MAX_IMPORT, MAX_ITEM_HITS} from "../../app/search";
import {
    EXTRA_FIELD_NAMES,
    FACETS,
    SEARCH_FIELD_NAMES,
} from "../../domain/search/content-query";

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
            .describe('A domain\'s slug ("math") or title ("Math").'),
        course: z
            .string()
            .optional()
            .describe(
                'A course\'s slug ("cc-2nd-grade-math") or its whole title ' +
                    '("2nd grade math", any case). facet_content with facets ' +
                    '["course"] lists the slugs.',
            ),
        unit: z.string().optional().describe("A unit's slug or whole title."),
        lesson: z
            .string()
            .optional()
            .describe("A lesson's slug or whole title."),
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
        hasGraphie: z
            .boolean()
            .optional()
            .describe(
                "Has a Graphie image (a web+graphie:// URL), in its content " +
                    "or an image widget.",
            ),
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
        "Words to search for, all of them by default (see matchAny); put " +
            'a phrase in double quotes to match it as written ("square ' +
            'root of x squared plus 1"). In ' +
            "the fields searchIn names, or all of them: the question and " +
            "hint text, widget text (choices, labels), TeX, the math read " +
            'as words ("the square root of x", "x squared", "one half"), ' +
            "and the titles of the exercise and its lesson, unit, course " +
            "and domain. Leave " +
            "it out to match everything the filters allow.",
    );

// What to search.
const sourceSchema = z
    .enum(["published", "drafts", "all"])
    .optional()
    .describe(
        "What to search: published content (the default), the person's " +
            "drafts, or both, ranked together. Drafts are searched as " +
            "published content is (the same fields, filters, facets and " +
            'speech); a draft\'s hit says source "draft", its contentId is ' +
            "its itemId, its titles and problem types are its exercises', " +
            "and its place in the tree is the published item's it was " +
            "imported from, if it was. Read or change drafts found with " +
            "read_items, export_item and edit_item.",
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
                "(TeX), speech (the math read as words, in ClearSpeak " +
                'English: "the square root of 2", "x is greater than or ' +
                'equal to 4", "a over b"), tree (lesson, unit, course and ' +
                "domain titles), " +
                'options (widget option values). For "items that test X", ' +
                '["titles", "question", "speech"] keeps out items that only ' +
                "mention X in a hint or sit in a lesson named for it. " +
                "Default: all.",
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
                "of them; read them then with export_item. To check a hit " +
                "first (its answer, choices, hints, speech), ask for " +
                "`fields` or `itemPaths` rather than importing it. Words " +
                "match " +
                "whole (no prefixes, few typos). The math is searched as TeX " +
                "and as speech: each formula read aloud in ClearSpeak " +
                'English, so \\sqrt{x^2+1} is "the square root of x squared ' +
                'plus 1" and \\frac{3}{4} is "three fourths". Don\'t query ' +
                "the search index or read the content snapshot yourself.",
            inputSchema: z.object({
                query: querySchema,
                source: sourceSchema,
                ...optionsSchema,
                filters: filtersSchema,
                limit: z.number().int().min(1).max(50).default(10),
                offset: z.number().int().min(0).optional(),
                fields: z
                    .array(z.enum(EXTRA_FIELD_NAMES))
                    .min(1)
                    .optional()
                    .describe(
                        "Index fields to add to each hit in full (long text " +
                            "cut): question (its text, TeX left out), " +
                            "hints, math (TeX), speech (the math read " +
                            "aloud), widgets (choices, labels), options " +
                            "(widget option values), courses (all of " +
                            "them), exercises (every exercise and problem " +
                            "type the item is in). For checking hits " +
                            "without importing them.",
                    ),
                itemPaths: z
                    .array(z.string().regex(/^(\/.*)?$/))
                    .min(1)
                    .optional()
                    .describe(
                        "JSON Pointers into each item (migrated to the " +
                            'latest schema), such as "/question/widgets", ' +
                            '"/question/widgets/radio 1/options/choices" ' +
                            'or "/hints": each hit gets `item` with those ' +
                            "parts (null where there's none; long ones cut). " +
                            `At most ${MAX_ITEM_HITS} hits when given. For ` +
                            "checking answers, choices or widget options of " +
                            "what was found without importing it.",
                    ),
            }),
            annotations: {readOnlyHint: true},
        },
        ({
            query,
            source,
            filters,
            limit,
            offset,
            fields,
            itemPaths,
            ...options
        }) =>
            run("search_content", async () =>
                jsonResult(
                    await search.searchContent({
                        query,
                        source,
                        filters,
                        options,
                        fields,
                        itemPaths,
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
                source: sourceSchema,
                searchIn: optionsSchema.searchIn,
                matchAny: optionsSchema.matchAny,
                filters: filtersSchema,
                facets: z.array(z.enum(FACETS)).min(1),
                top: z.number().int().min(1).max(500).default(20),
            }),
            annotations: {readOnlyHint: true},
        },
        ({query, source, filters, facets, top, ...options}) =>
            run("facet_content", async () =>
                jsonResult(
                    await search.facetContent({
                        query,
                        source,
                        filters,
                        options,
                        facets,
                        top,
                    }),
                ),
            ),
    );

    server.registerTool(
        "speak_math",
        {
            title: "Read TeX aloud as search does",
            description:
                "Read each TeX formula aloud as the search index does " +
                "(MathJax's speech engine, ClearSpeak English, Khan " +
                'Academy\'s color macros left out): "\\sqrt{x^2+1}" is ' +
                '"the square root of x squared plus 1". Use it to write a ' +
                'speech query (searchIn ["speech"], the phrase in double ' +
                "quotes) that matches the math you mean, rather than " +
                "guessing the words or running the engine yourself. A " +
                "formula that reads as its own TeX (a number or a single " +
                "letter) isn't indexed as speech; `indexed` says so.",
            inputSchema: z.object({
                tex: z
                    .array(z.string().min(1))
                    .min(1)
                    .max(50)
                    .describe("The formulas, without their $ delimiters."),
            }),
            annotations: {readOnlyHint: true},
        },
        ({tex}) =>
            run("speak_math", async () =>
                jsonResult({readings: await search.speakMath(tex)}),
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
