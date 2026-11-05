import {graphieUrlFor} from "../domain/graffiti/diagram";
import {graffitiReference} from "../domain/graffiti/reference";

import {GraffitiNotFoundError} from "./errors";

import type {Diagram, RenderedDiagram} from "../domain/graffiti/diagram";
import type {GraffitiFeed} from "../ports/graffiti-feed";
import type {GraffitiRenderer} from "../ports/graffiti-renderer";
import type {GraffitiRepository} from "../ports/graffiti-repository";
import type {GraffitiTypesSource} from "../ports/graffiti-types";

export type GraffitiDependencies = {
    diagrams: GraffitiRepository;
    renderer: GraffitiRenderer;
    /** The library's type definitions, for the reference agents read. */
    types?: GraffitiTypesSource;
    /** Announces new revisions, for previews that follow diagrams. */
    feed?: GraffitiFeed;
    now: () => Date;
    newId: () => string;
};

/** What a tool reports about a diagram it made or changed. */
export type DiagramResult = {
    graffitiId: string;
    revision: number;
    /** The image's size in pixels. */
    width: number;
    height: number;
    /** How many labels it lays over the image. */
    labels: number;
};

/** What a diagram's page shows of it. */
export type DiagramView = {
    graffitiId: string;
    /** Its latest revision. */
    revision: number;
    notes?: string;
    updatedAt: string;
    /** Every revision, oldest first, with what made it. */
    revisions: Array<{revision: number; change?: string; updatedAt: string}>;
};

/**
 * The use cases for Graffiti diagrams: scripts that draw Graphie images,
 * kept by revision under a stable id.
 */
export function createGraffitiUseCases(deps: GraffitiDependencies) {
    const {diagrams, renderer} = deps;
    // A revision's source never changes, so neither does its drawing.
    const rendered = new Map<string, Promise<RenderedDiagram>>();

    function getDiagram(graffitiId: string, revision?: number): Diagram {
        const diagram =
            revision == null
                ? diagrams.get(graffitiId)
                : diagrams.getRevision(graffitiId, revision);
        if (diagram == null) {
            throw new GraffitiNotFoundError(graffitiId, revision);
        }
        return diagram;
    }

    function render(diagram: Diagram): Promise<RenderedDiagram> {
        const key = `${diagram.graffitiId}@${diagram.revision}`;
        let drawing = rendered.get(key);
        if (drawing == null) {
            drawing = renderer.render(diagram.source);
            rendered.set(key, drawing);
            // A failure isn't kept, so a fixed renderer can try again.
            drawing.catch(() => rendered.delete(key));
        }
        return drawing;
    }

    function viewOf(diagram: Diagram): DiagramView {
        const revisions: DiagramView["revisions"] = [];
        for (let n = 1; n <= diagram.revision; n++) {
            const earlier = diagrams.getRevision(diagram.graffitiId, n);
            if (earlier != null) {
                revisions.push({
                    revision: n,
                    change: earlier.change,
                    updatedAt: earlier.updatedAt,
                });
            }
        }
        return {
            graffitiId: diagram.graffitiId,
            revision: diagram.revision,
            notes: diagram.notes,
            updatedAt: diagram.updatedAt,
            revisions,
        };
    }

    function result(diagram: Diagram, drawing: RenderedDiagram): DiagramResult {
        return {
            graffitiId: diagram.graffitiId,
            revision: diagram.revision,
            width: drawing.width,
            height: drawing.height,
            labels: drawing.data.labels.length,
        };
    }

    return {
        /**
         * How Graffiti behaves and its API, for writing a script: all an
         * agent needs, since an author has no Graffiti source to read.
         */
        async reference(): Promise<string> {
            return graffitiReference((await deps.types?.read()) ?? []);
        },

        /**
         * Draws a new diagram from its script, and keeps it only if it
         * draws.
         *
         * @throws GraffitiRenderError
         */
        async createGraffiti(input: {
            source: string;
            notes?: string;
        }): Promise<DiagramResult> {
            const drawing = await renderer.render(input.source);
            const now = deps.now().toISOString();
            const diagram: Diagram = {
                graffitiId: deps.newId(),
                revision: 1,
                source: input.source,
                notes: input.notes,
                createdAt: now,
                updatedAt: now,
                change: "Created",
            };
            diagrams.save(diagram);
            rendered.set(`${diagram.graffitiId}@1`, Promise.resolve(drawing));
            return result(diagram, drawing);
        },

        /**
         * Makes a new revision with a new script, new notes, or both; a new
         * script is kept only if it draws.
         *
         * @throws GraffitiNotFoundError
         * @throws GraffitiRenderError
         */
        async updateGraffiti(
            graffitiId: string,
            changes: {source?: string; notes?: string},
        ): Promise<DiagramResult> {
            const current = getDiagram(graffitiId);
            const source = changes.source ?? current.source;
            const drawing = await (changes.source == null
                ? render(current)
                : renderer.render(source));
            const diagram: Diagram = {
                ...current,
                revision: current.revision + 1,
                source,
                notes: changes.notes ?? current.notes,
                updatedAt: deps.now().toISOString(),
                change:
                    changes.source == null ? "Changed the notes" : "New script",
            };
            diagrams.save(diagram);
            rendered.set(
                `${graffitiId}@${diagram.revision}`,
                Promise.resolve(drawing),
            );
            return result(diagram, drawing);
        },

        /**
         * A diagram's source and notes, at its latest revision or another.
         *
         * @throws GraffitiNotFoundError
         */
        getGraffiti(
            graffitiId: string,
            revision?: number,
        ): Diagram & {latestRevision: number; imageUrl: string} {
            const diagram = getDiagram(graffitiId, revision);
            return {
                ...diagram,
                latestRevision: getDiagram(graffitiId).revision,
                imageUrl: graphieUrlFor(graffitiId),
            };
        },

        listGraffiti(): Array<{
            graffitiId: string;
            revision: number;
            notes?: string;
            updatedAt: string;
        }> {
            return diagrams.list().map((diagram) => ({
                graffitiId: diagram.graffitiId,
                revision: diagram.revision,
                notes: diagram.notes,
                updatedAt: diagram.updatedAt,
            }));
        },

        /**
         * The diagrams whose latest revision isn't the one `known` gives,
         * drawn, for a page that can't load them from this server; and the
         * ids that name no diagram.
         */
        async changedDiagrams(
            graffitiIds: readonly string[],
            known: Readonly<Record<string, number>> = {},
        ): Promise<{
            diagrams: Record<string, {revision: number} & RenderedDiagram>;
            missing: string[];
        }> {
            const drawn: Record<string, {revision: number} & RenderedDiagram> =
                {};
            const missing: string[] = [];
            for (const graffitiId of graffitiIds) {
                const diagram = diagrams.get(graffitiId);
                if (diagram == null) {
                    missing.push(graffitiId);
                } else if (known[graffitiId] !== diagram.revision) {
                    drawn[graffitiId] = {
                        revision: diagram.revision,
                        ...(await render(diagram)),
                    };
                }
            }
            return {diagrams: drawn, missing};
        },

        /** The latest revision of each of the diagrams that exist. */
        latestRevisions(
            graffitiIds: readonly string[],
        ): Record<string, number> {
            const revisions: Record<string, number> = {};
            for (const graffitiId of graffitiIds) {
                const diagram = diagrams.get(graffitiId);
                if (diagram != null) {
                    revisions[graffitiId] = diagram.revision;
                }
            }
            return revisions;
        },

        /**
         * Calls `onChange` each time one of the diagrams gets a new
         * revision, until the returned function is called.
         */
        watchDiagrams(
            graffitiIds: readonly string[],
            onChange: () => void,
        ): () => void {
            const unsubscribes = graffitiIds.map(
                (graffitiId) =>
                    deps.feed?.subscribe(graffitiId, onChange) ?? (() => {}),
            );
            return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
        },

        /**
         * Calls `listener` with what a diagram's page shows, now and after
         * each new revision, until the returned function is called.
         *
         * @throws GraffitiNotFoundError
         */
        watchGraffiti(
            graffitiId: string,
            listener: (view: DiagramView) => void,
        ): () => void {
            const diagram = getDiagram(graffitiId);
            const unsubscribe =
                deps.feed?.subscribe(graffitiId, (latest) =>
                    listener(viewOf(latest)),
                ) ?? (() => {});
            listener(viewOf(diagram));
            return unsubscribe;
        },

        /**
         * A diagram drawn, at its latest revision or another.
         *
         * @throws GraffitiNotFoundError
         * @throws GraffitiRenderError
         */
        renderGraffiti(
            graffitiId: string,
            revision?: number,
        ): Promise<RenderedDiagram> {
            return render(getDiagram(graffitiId, revision));
        },
    };
}

export type GraffitiUseCases = ReturnType<typeof createGraffitiUseCases>;
