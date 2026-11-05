/**
 * A Graffiti diagram: the source of a script that draws it with the Graffiti
 * library, kept by revision under a stable id. An item shows it as a Graphie
 * image whose URL names only the id, so the item needn't change when the
 * diagram does.
 */
export type Diagram = {
    graffitiId: string;
    /** 1 for the first source, and one more for each change. */
    revision: number;
    /** The script, TypeScript or JavaScript, as the agent wrote it. */
    source: string;
    /** What it shows and what it's for, to find it again. */
    notes?: string;
    createdAt: string;
    updatedAt: string;
    /** What made this revision. */
    change?: string;
};

/** A Graphie image's label data, as Perseus reads it. */
export type GraphieData = {
    range: [[number, number], [number, number]];
    labels: Array<{
        content: string;
        alignment: number | string;
        coordinates: [number, number];
        style: Record<string, string>;
        typesetAsMath: boolean;
    }>;
};

/** A diagram drawn: the label-free SVG and the labels Perseus lays over it. */
export type RenderedDiagram = {
    svg: string;
    data: GraphieData;
    width: number;
    height: number;
};

/**
 * The host in a diagram's Graphie URL, `web+graphie://<host>/graffiti/<id>`.
 * Nothing answers at it: previews point it at perseus-mcp's own server, and
 * publishing replaces the URL with the published image's.
 */
export const GRAFFITI_HOST = "perseus-mcp.localhost";

/** The Graphie URL an image widget shows a diagram with: its latest revision. */
export function graphieUrlFor(graffitiId: string): string {
    return `web+graphie://${GRAFFITI_HOST}/graffiti/${graffitiId}`;
}

/** Ids are made by the server; anything else isn't one, so it's never a path. */
export function isDiagramId(id: string): boolean {
    return /^[a-z0-9-]{1,64}$/.test(id);
}

// A diagram's Graphie URL, without a revision: one naming a revision ends
// with `.<revision>` and isn't matched.
const DIAGRAM_URL = new RegExp(
    `web\\+graphie://${GRAFFITI_HOST.replace(/\./g, "\\.")}/graffiti/` +
        "([a-z0-9-]{1,64})(?![a-z0-9.-])",
    "g",
);

/** The ids of the diagrams something shows, such as an item, in order. */
export function diagramIdsIn(value: unknown): string[] {
    const ids = [...JSON.stringify(value).matchAll(DIAGRAM_URL)].map(
        (match) => match[1],
    );
    return [...new Set(ids)];
}

/**
 * A copy of `value`, such as an item, whose diagram URLs name the revisions
 * `revisions` gives, `.../graffiti/<id>.<revision>`, so Perseus, which keeps
 * a Graphie image's labels by URL, loads a new revision's.
 */
export function pinDiagramRevisions<T>(
    value: T,
    revisions: Readonly<Record<string, number>>,
): T {
    return JSON.parse(
        JSON.stringify(value).replace(DIAGRAM_URL, (url, graffitiId) =>
            revisions[graffitiId] == null
                ? url
                : `${url}.${revisions[graffitiId]}`,
        ),
    );
}
