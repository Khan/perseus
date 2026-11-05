import type {ContentDocument} from "./content-document";

/**
 * What to narrow a search or a count to. Every filter given must hold; a
 * list (widget types, option values) must hold for each value in it.
 */
export type ContentFilters = {
    kind?: "item" | "article";
    /** Slugs, as search results and facets show them. */
    domain?: string;
    course?: string;
    unit?: string;
    lesson?: string;
    exerciseId?: string;
    widgetTypes?: ReadonlyArray<string>;
    /** Option values, such as `interactive-graph.correct.type=circle`. */
    widgetProps?: ReadonlyArray<string>;
    hasGraphie?: boolean;
    /** Unlisted content (drafts, tests, staging) is left out unless true. */
    includeUnlisted?: boolean;
    /** A Meilisearch filter expression, joined to the others with AND. */
    filter?: string;
};

/** Fields facets can count by. */
export const FACETS = [
    "domain",
    "course",
    "unit",
    "lesson",
    "exerciseId",
    "problemType",
    "widgetTypes",
    "widgetProps",
    "hintCount",
    "widgetCount",
    "imageCount",
    "hasGraphie",
    "kind",
    "listed",
    "live",
    "aiGenerated",
] as const;

export type Facet = (typeof FACETS)[number];

/** A value quoted for a Meilisearch filter. */
function quote(value: string): string {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/** The Meilisearch filter expression for `filters`. */
export function filterExpression(filters: ContentFilters): string {
    const parts: string[] = [];
    if (filters.includeUnlisted !== true) {
        parts.push("listed = true");
    }
    if (filters.kind != null) {
        parts.push(`kind = ${quote(filters.kind)}`);
    }
    for (const field of [
        "domain",
        "course",
        "unit",
        "lesson",
        "exerciseId",
    ] as const) {
        const value = filters[field];
        if (value != null) {
            parts.push(`${field} = ${quote(value)}`);
        }
    }
    for (const type of filters.widgetTypes ?? []) {
        parts.push(`widgetTypes = ${quote(type)}`);
    }
    for (const prop of filters.widgetProps ?? []) {
        parts.push(`widgetProps = ${quote(prop)}`);
    }
    if (filters.hasGraphie != null) {
        parts.push(`hasGraphie = ${filters.hasGraphie}`);
    }
    if (filters.filter != null && filters.filter.trim() !== "") {
        parts.push(`(${filters.filter})`);
    }
    return parts.join(" AND ");
}

/** A filter for the documents of these items or articles. */
export function contentIdFilter(contentIds: ReadonlyArray<string>): string {
    return `contentId IN [${contentIds.map(quote).join(", ")}]`;
}

/** How many courses a hit lists before saying how many more there are. */
const COURSES_SHOWN = 3;

/** A search result, small enough to list many: no content but a snippet. */
export type ContentHit = {
    contentId: string;
    kind: "item" | "article";
    title: string;
    exerciseId?: string;
    problemType?: string;
    /** Another exercise or two the item is also in, when there are. */
    alsoIn?: number;
    url: string;
    courses: string[];
    moreCourses?: number;
    widgetTypes: string[];
    hintCount: number;
    listed: boolean;
    /** Part of the text, around the match when the query matched it. */
    snippet: string;
};

/**
 * The fields a search returns, the text among them only to cut the
 * snippet from.
 */
export const HIT_FIELDS = [
    "contentId",
    "kind",
    "title",
    "exerciseId",
    "problemType",
    "url",
    "course",
    "widgetTypes",
    "hintCount",
    "listed",
    "text",
] as const;

export type HitFields = Pick<ContentDocument, (typeof HIT_FIELDS)[number]>;

/** A hit from a search's document and the snippet cut from its text. */
export function toHit(document: HitFields, snippet: string): ContentHit {
    const exercises = document.exerciseId ?? [];
    return {
        contentId: document.contentId,
        kind: document.kind,
        title: document.title[0] ?? "",
        ...(exercises.length > 0
            ? {
                  exerciseId: exercises[0],
                  problemType: document.problemType?.[0],
              }
            : {}),
        ...(exercises.length > 1 ? {alsoIn: exercises.length - 1} : {}),
        url: document.url[0] ?? "",
        courses: document.course.slice(0, COURSES_SHOWN),
        ...(document.course.length > COURSES_SHOWN
            ? {moreCourses: document.course.length - COURSES_SHOWN}
            : {}),
        widgetTypes: document.widgetTypes,
        hintCount: document.hintCount,
        listed: document.listed,
        snippet,
    };
}

/** A facet's values, most common first, the first `top` of them. */
export function topValues(
    counts: Readonly<Record<string, number>>,
    top: number,
): {values: Array<{value: string; count: number}>; distinctValues: number} {
    const values = Object.entries(counts)
        .map(([value, count]) => ({value, count}))
        .sort((a, b) =>
            b.count !== a.count
                ? b.count - a.count
                : a.value.localeCompare(b.value),
        );
    return {values: values.slice(0, top), distinctValues: values.length};
}
