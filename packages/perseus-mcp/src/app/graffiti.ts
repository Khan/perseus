import {graphieUrlFor} from "../domain/graffiti/diagram";

import {GraffitiNotFoundError} from "./errors";

import type {Diagram, RenderedDiagram} from "../domain/graffiti/diagram";
import type {GraffitiRenderer} from "../ports/graffiti-renderer";
import type {GraffitiRepository} from "../ports/graffiti-repository";

export type GraffitiDependencies = {
    diagrams: GraffitiRepository;
    renderer: GraffitiRenderer;
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
