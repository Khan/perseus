import type {ContentFields} from "./content-fields";

/** A domain, course, unit or lesson. */
export type TreeNode = {
    id: string;
    slug: string;
    title: string;
    /** Shown to learners; unlisted ones are drafts, tests and staging. */
    listed: boolean;
};

/**
 * The levels of the content tree an item or article is placed in, by node
 * id. Exercises and articles sit in lessons, which sit in units, in courses,
 * in domains.
 */
export type ContentTree = {
    domains: ReadonlyMap<string, TreeNode>;
    courses: ReadonlyMap<string, TreeNode>;
    units: ReadonlyMap<string, TreeNode>;
    lessons: ReadonlyMap<string, TreeNode>;
};

/** A path from the root of the tree to the content, as ids. */
export type TopicPath = {path: ReadonlyArray<{id: string}>};

/**
 * Where content is in the tree, as slugs (to filter and count by) and
 * titles (to search and show). Lists, since content can be in several
 * courses. Each list holds a value once.
 */
export type Placement = {
    domain: string[];
    domainTitle: string[];
    course: string[];
    courseTitle: string[];
    unit: string[];
    unitTitle: string[];
    lesson: string[];
    lessonTitle: string[];
};

/**
 * One search document: an item, or an article. An item used in several
 * exercises has one document, listing them all. The content itself isn't
 * kept: `sourceFile` names the file it came from, relative to the content
 * snapshot, for an import to read.
 */
export type ContentDocument = Placement &
    ContentFields & {
        /** `item-<itemId>` or `article-<contentId>`. */
        id: string;
        kind: "item" | "article";
        /** The item's id, or the article's. */
        contentId: string;
        /** The exercises' titles, or the article's. */
        title: string[];
        /** Where it's shown on the site, as paths. */
        url: string[];
        /**
         * Whether learners see it: in a listed exercise (or a listed
         * article) on a path through listed domains, courses, units and
         * lessons. When it is, its placement holds only those listed paths.
         */
        listed: boolean;
        exerciseId?: string[];
        exerciseSlug?: string[];
        problemType?: string[];
        live?: boolean;
        aiGenerated?: boolean;
        sourceFile: string;
        snapshotVersion: string;
        /** Each formula read as words: "the square root of x plus 1". */
        mathSpeech: string[];
    };

/** Content to place: an exercise or an article, with its topic paths. */
export type PlacedContent = {
    listed: boolean;
    topicPaths: ReadonlyArray<TopicPath>;
};

/**
 * Places content (an article, or an item in each of the exercises it's in)
 * in the tree. Content learners see is placed only on its listed paths, so
 * counts by course aren't swamped by draft, test and staging courses; other
 * content is placed on all its paths, so it can still be found by course.
 */
export function placeContent(
    tree: ContentTree,
    sources: ReadonlyArray<PlacedContent>,
): Placement & {listed: boolean} {
    const nodes = [tree.domains, tree.courses, tree.units, tree.lessons];
    const pathListed = ({path}: TopicPath) =>
        path.every(({id}) =>
            nodes.every((level) => level.get(id)?.listed ?? true),
        );
    const listedPaths = sources
        .filter((source) => source.listed)
        .flatMap((source) => source.topicPaths)
        .filter(pathListed);
    if (listedPaths.length > 0) {
        return {...placeInTree(tree, listedPaths), listed: true};
    }
    return {
        ...placeInTree(
            tree,
            sources.flatMap((source) => source.topicPaths),
        ),
        listed: false,
    };
}

/** Places content in the tree from its topic paths. */
export function placeInTree(
    tree: ContentTree,
    topicPaths: ReadonlyArray<TopicPath>,
): Placement {
    const levels = [
        ["domain", tree.domains],
        ["course", tree.courses],
        ["unit", tree.units],
        ["lesson", tree.lessons],
    ] as const;
    const found = new Map<string, Map<string, TreeNode>>(
        levels.map(([level]) => [level, new Map()]),
    );
    for (const {path} of topicPaths) {
        for (const {id} of path) {
            for (const [level, nodes] of levels) {
                const node = nodes.get(id);
                if (node != null) {
                    found.get(level)?.set(node.slug, node);
                }
            }
        }
    }
    const slugs = (level: string) => [...(found.get(level)?.keys() ?? [])];
    const titles = (level: string) => [
        ...new Set([...(found.get(level)?.values() ?? [])].map((n) => n.title)),
    ];
    return {
        domain: slugs("domain"),
        domainTitle: titles("domain"),
        course: slugs("course"),
        courseTitle: titles("course"),
        unit: slugs("unit"),
        unitTitle: titles("unit"),
        lesson: slugs("lesson"),
        lessonTitle: titles("lesson"),
    };
}

/** The search index the documents go in. */
export const CONTENT_INDEX_UID = "perseus-content";

/**
 * An index holding one document, `INDEX_META_ID`, saying what the content
 * index was built from.
 */
export const CONTENT_META_INDEX_UID = "perseus-content-meta";
export const INDEX_META_ID = "snapshot";

export type IndexMeta = {
    id: typeof INDEX_META_ID;
    /** The content snapshot's folder, where an import reads items. */
    snapshotDir: string;
    snapshotVersion: string;
    builtAt: string;
    items: number;
    articles: number;
};

/**
 * The search index's settings for these documents. Searchable fields are in
 * order of weight: a match in a title counts for more than one in a hint.
 */
export const CONTENT_INDEX_SETTINGS = {
    searchableAttributes: [
        "title",
        "problemType",
        "text",
        "widgetText",
        "hintText",
        "math",
        "mathSpeech",
        "lessonTitle",
        "unitTitle",
        "courseTitle",
        "domainTitle",
        "widgetProps",
    ],
    filterableAttributes: [
        "kind",
        "contentId",
        "domain",
        "course",
        "unit",
        "lesson",
        "exerciseId",
        "problemType",
        "widgetTypes",
        "widgetProps",
        "widgetCount",
        "hintCount",
        "imageCount",
        "hasGraphie",
        "listed",
        "live",
        "aiGenerated",
        "title",
        // So a filter can name a course (or unit, lesson, domain) by title.
        "domainTitle",
        "courseTitle",
        "unitTitle",
        "lessonTitle",
    ],
    sortableAttributes: ["widgetCount", "hintCount", "imageCount"],
    // Counts need every value: about 1,500 courses, and the exercise count
    // comes from the exerciseId facet (about 14,000 exercises).
    faceting: {maxValuesPerFacet: 20000},
    // Agents search for whole words: a prefix match made "addition" match
    // "additional".
    prefixSearch: "disabled",
    // Default typo tolerance lets a 5-letter word match with one typo and
    // a 9-letter one with two, so "addition" also matched "addiction".
    // TeX and option values are exact.
    typoTolerance: {
        minWordSizeForTypos: {oneTypo: 6, twoTypos: 12},
        disableOnAttributes: ["math", "widgetProps"],
    },
    pagination: {maxTotalHits: 10000},
} as const;
