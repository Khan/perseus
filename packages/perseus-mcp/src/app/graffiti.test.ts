/**
 * @jest-environment node
 */
import {GraffitiNotFoundError, GraffitiRenderError} from "./errors";
import {createGraffitiUseCases} from "./graffiti";

import type {Diagram, RenderedDiagram} from "../domain/graffiti/diagram";
import type {GraffitiRepository} from "../ports/graffiti-repository";

function inMemoryDiagrams(): GraffitiRepository {
    const revisions = new Map<string, Diagram[]>();
    return {
        get: (id) => revisions.get(id)?.at(-1),
        getRevision: (id, revision) =>
            revisions.get(id)?.find((d) => d.revision === revision),
        list: () => [...revisions.values()].map((all) => all.at(-1)!),
        save: (diagram) =>
            void revisions.set(diagram.graffitiId, [
                ...(revisions.get(diagram.graffitiId) ?? []),
                diagram,
            ]),
    };
}

function drawingOf(source: string): RenderedDiagram {
    return {
        svg: `<svg>${source}</svg>`,
        data: {
            range: [
                [0, 1],
                [0, 1],
            ],
            labels: [],
        },
        width: 10,
        height: 20,
    };
}

function setUp() {
    const render = jest.fn(async (source: string) => {
        if (source === "broken") {
            throw new GraffitiRenderError("it threw.");
        }
        return drawingOf(source);
    });
    const graffiti = createGraffitiUseCases({
        diagrams: inMemoryDiagrams(),
        renderer: {render},
        now: () => new Date("2026-01-01T00:00:00Z"),
        newId: () => "g1",
    });
    return {graffiti, render};
}

describe("graffiti use cases", () => {
    it("keeps a new diagram as revision 1 under a new id", async () => {
        // Arrange
        const {graffiti} = setUp();

        // Act
        const result = await graffiti.createGraffiti({source: "a"});

        // Assert
        expect(result).toEqual({
            graffitiId: "g1",
            revision: 1,
            width: 10,
            height: 20,
            labels: 0,
        });
    });

    it("doesn't keep a diagram whose script fails", async () => {
        // Arrange
        const {graffiti} = setUp();

        // Act
        const creating = graffiti.createGraffiti({source: "broken"});

        // Assert
        await expect(creating).rejects.toThrow(GraffitiRenderError);
        expect(graffiti.listGraffiti()).toEqual([]);
    });

    it("keeps each new script as a revision under the same id", async () => {
        // Arrange
        const {graffiti} = setUp();
        await graffiti.createGraffiti({source: "a"});

        // Act
        await graffiti.updateGraffiti("g1", {source: "b"});

        // Assert
        expect({
            latest: (await graffiti.renderGraffiti("g1")).svg,
            first: (await graffiti.renderGraffiti("g1", 1)).svg,
            revision: graffiti.getGraffiti("g1").revision,
        }).toEqual({
            latest: "<svg>b</svg>",
            first: "<svg>a</svg>",
            revision: 2,
        });
    });

    it("draws a revision only once", async () => {
        // Arrange
        const {graffiti, render} = setUp();
        await graffiti.createGraffiti({source: "a"});
        render.mockClear();

        // Act
        await graffiti.renderGraffiti("g1");
        await graffiti.renderGraffiti("g1", 1);

        // Assert
        expect(render).not.toHaveBeenCalled();
    });

    it("throws GraffitiNotFoundError for a revision that doesn't exist", async () => {
        // Arrange
        const {graffiti} = setUp();
        await graffiti.createGraffiti({source: "a"});

        // Act, Assert
        expect(() => graffiti.renderGraffiti("g1", 5)).toThrow(
            GraffitiNotFoundError,
        );
    });
});
