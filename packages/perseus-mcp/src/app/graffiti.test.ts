/**
 * @jest-environment node
 */
import {GraffitiNotFoundError, GraffitiRenderError} from "./errors";
import {createGraffitiUseCases} from "./graffiti";
import {withGraffitiFeed} from "./graffiti-feed";

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

    describe("changedDiagrams", () => {
        it("draws the diagrams whose revision the page doesn't have", async () => {
            // Arrange
            const {graffiti} = setUp();
            await graffiti.createGraffiti({source: "one"});
            await graffiti.updateGraffiti("g1", {source: "two"});

            // Act
            const changed = await graffiti.changedDiagrams(["g1"], {g1: 1});

            // Assert
            expect(changed).toEqual({
                diagrams: {g1: {revision: 2, ...drawingOf("two")}},
                missing: [],
            });
        });

        it("leaves out the diagrams the page has at their latest revision", async () => {
            // Arrange
            const {graffiti} = setUp();
            await graffiti.createGraffiti({source: "one"});

            // Act
            const changed = await graffiti.changedDiagrams(["g1"], {g1: 1});

            // Assert
            expect(changed.diagrams).toEqual({});
        });

        it("names the ids that aren't diagrams", async () => {
            // Arrange
            const {graffiti} = setUp();

            // Act
            const changed = await graffiti.changedDiagrams(["nope"]);

            // Assert
            expect(changed).toEqual({diagrams: {}, missing: ["nope"]});
        });
    });

    describe("watchGraffiti", () => {
        function setUpWithFeed() {
            const {diagrams, feed} = withGraffitiFeed(inMemoryDiagrams());
            let id = 0;
            const graffiti = createGraffitiUseCases({
                diagrams,
                feed,
                renderer: {render: async (source) => drawingOf(source)},
                now: () => new Date("2026-01-01T00:00:00Z"),
                newId: () => `g${++id}`,
            });
            return graffiti;
        }

        it("sends the diagram's view, with its revisions", async () => {
            // Arrange
            const graffiti = setUpWithFeed();
            await graffiti.createGraffiti({source: "one", notes: "A note"});
            const listener = jest.fn();

            // Act
            graffiti.watchGraffiti("g1", listener);

            // Assert
            expect(listener).toHaveBeenCalledWith({
                graffitiId: "g1",
                revision: 1,
                notes: "A note",
                updatedAt: "2026-01-01T00:00:00.000Z",
                revisions: [
                    {
                        revision: 1,
                        change: "Created",
                        updatedAt: "2026-01-01T00:00:00.000Z",
                    },
                ],
            });
        });

        it("sends the view again after each new revision", async () => {
            // Arrange
            const graffiti = setUpWithFeed();
            await graffiti.createGraffiti({source: "one"});
            const listener = jest.fn();
            graffiti.watchGraffiti("g1", listener);

            // Act
            await graffiti.updateGraffiti("g1", {source: "two"});

            // Assert
            expect(listener).toHaveBeenLastCalledWith(
                expect.objectContaining({revision: 2}),
            );
        });

        it("tells watchDiagrams' caller about another diagram's change only", async () => {
            // Arrange
            const graffiti = setUpWithFeed();
            await graffiti.createGraffiti({source: "one"});
            await graffiti.createGraffiti({source: "two"});
            const onChange = jest.fn();
            graffiti.watchDiagrams(["g2"], onChange);

            // Act
            await graffiti.updateGraffiti("g1", {source: "three"});
            await graffiti.updateGraffiti("g2", {source: "four"});

            // Assert
            expect(onChange).toHaveBeenCalledTimes(1);
        });

        it("returns the latest revision of the diagrams that exist", async () => {
            // Arrange
            const graffiti = setUpWithFeed();
            await graffiti.createGraffiti({source: "one"});
            await graffiti.updateGraffiti("g1", {source: "two"});

            // Act, Assert
            expect(graffiti.latestRevisions(["g1", "nope"])).toEqual({g1: 2});
        });
    });
});
