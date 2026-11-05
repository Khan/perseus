// The chat page can't load anything from perseus-mcp's server, so the
// Graffiti diagrams a draft shows come with the draft, and the page hands
// them to Perseus itself: the image as a data: URL, which hosts allow, and
// the label data by answering Perseus's fetch of it, which they'd block.
import {GRAFFITI_HOST} from "../../../domain/graffiti/diagram";

import type {GenerateUrlArgs} from "@khanacademy/perseus";

/** A diagram drawn, as get_preview_draft sends it. */
export type DiagramFiles = {revision: number; svg: string; data: unknown};

// Perseus turns web+graphie://<host>/<path> into https://<host>/<path>.svg
// and -data.json.
const BASE = `https://${GRAFFITI_HOST}/`;
const FILE = /^graffiti\/([a-z0-9-]{1,64})(?:\.(\d+))?(\.svg|-data\.json)$/;

function parse(url: string) {
    const match = FILE.exec(url.slice(BASE.length));
    return match == null
        ? null
        : {
              graffitiId: match[1],
              revision: match[2] == null ? undefined : Number(match[2]),
              isImage: match[3] === ".svg",
          };
}

export function createDiagramStore() {
    const diagrams = new Map<string, DiagramFiles>();

    return {
        /** Keeps the drawings of new and changed diagrams. */
        update(changed: Readonly<Record<string, DiagramFiles>>): void {
            for (const [graffitiId, files] of Object.entries(changed)) {
                diagrams.set(graffitiId, files);
            }
        },

        /** The revision of each diagram the page has. */
        revisions(): Record<string, number> {
            return Object.fromEntries(
                [...diagrams].map(([id, {revision}]) => [id, revision]),
            );
        },

        /**
         * Perseus's generateUrl: a diagram's image becomes a data: URL, and
         * its label data URL names the revision, since Perseus keeps label
         * data by URL and a new revision has new labels.
         */
        generateUrl({url}: GenerateUrlArgs): string {
            const file = url.startsWith(BASE) ? parse(url) : null;
            const diagram = file && diagrams.get(file.graffitiId);
            if (file == null || diagram == null) {
                return url;
            }
            if (file.isImage) {
                return (
                    "data:image/svg+xml;charset=utf-8," +
                    encodeURIComponent(diagram.svg)
                );
            }
            return `${BASE}graffiti/${file.graffitiId}.${diagram.revision}-data.json`;
        },

        /**
         * The answer to a fetch of a diagram's label data, or null for a URL
         * that isn't a diagram's. Nothing answers at the diagram host, so any
         * other file there, such as another locale's labels, is not found.
         */
        respond(url: string): Response | null {
            if (!url.startsWith(BASE)) {
                return null;
            }
            const file = parse(url);
            const diagram = file && diagrams.get(file.graffitiId);
            if (
                file == null ||
                file.isImage ||
                diagram == null ||
                (file.revision != null && file.revision !== diagram.revision)
            ) {
                return new Response("Not found", {status: 404});
            }
            return new Response(JSON.stringify(diagram.data), {
                headers: {"Content-Type": "application/json"},
            });
        },
    };
}

export type DiagramStore = ReturnType<typeof createDiagramStore>;

/** Answers the page's fetches of diagram files from the store. */
export function serveDiagramsThroughFetch(store: DiagramStore): void {
    const fetchFromNetwork = globalThis.fetch.bind(globalThis);
    globalThis.fetch = (input, init) => {
        const url =
            typeof input === "string"
                ? input
                : input instanceof URL
                  ? input.href
                  : input.url;
        const response = store.respond(url);
        return response == null
            ? fetchFromNetwork(input, init)
            : Promise.resolve(response);
    };
}
