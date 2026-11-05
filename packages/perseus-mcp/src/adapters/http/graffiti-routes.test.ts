/**
 * @jest-environment node
 */
import Fastify from "fastify";

import {createGraffitiUseCases} from "../../app/graffiti";

import {registerGraffitiRoutes} from "./graffiti-routes";

import type {Diagram} from "../../domain/graffiti/diagram";

async function setUp() {
    const revisions: Diagram[] = [];
    const graffiti = createGraffitiUseCases({
        diagrams: {
            get: (id) => revisions.filter((d) => d.graffitiId === id).at(-1),
            getRevision: (id, n) =>
                revisions.find((d) => d.graffitiId === id && d.revision === n),
            list: () => revisions,
            save: (diagram) => void revisions.push(diagram),
        },
        renderer: {
            render: async (source) => ({
                svg: `<svg>${source}</svg>`,
                data: {
                    range: [
                        [0, 1],
                        [0, 1],
                    ],
                    labels: [
                        {
                            content: source,
                            alignment: "center",
                            coordinates: [0, 0],
                            style: {},
                            typesetAsMath: false,
                        },
                    ],
                },
                width: 1,
                height: 1,
            }),
        },
        now: () => new Date("2026-01-01T00:00:00Z"),
        newId: () => "g1",
    });
    await graffiti.createGraffiti({source: "one"});
    await graffiti.updateGraffiti("g1", {source: "two"});
    const app = Fastify();
    registerGraffitiRoutes(app, {graffiti});
    const address = await app.listen({port: 0, host: "127.0.0.1"});
    return {
        app,
        get: (path: string) => fetch(`${address}${path}`),
    };
}

describe("graffiti routes", () => {
    let server: Awaited<ReturnType<typeof setUp>>;

    beforeEach(async () => {
        // The shared test setup fakes timers, which stalls real network I/O.
        jest.useRealTimers();
        server = await setUp();
    });

    afterEach(async () => {
        await server.app.close();
    });

    it("serves the latest revision's SVG", async () => {
        // Arrange, Act
        const response = await server.get("/graffiti/g1.svg");

        // Assert
        expect({
            type: response.headers.get("content-type"),
            body: await response.text(),
        }).toEqual({type: "image/svg+xml", body: "<svg>two</svg>"});
    });

    it("serves a named revision's labels", async () => {
        // Arrange, Act
        const response = await server.get("/graffiti/g1.1-data.json");

        // Assert
        expect((await response.json()).labels[0].content).toBe("one");
    });

    it("serves the English labels for another locale", async () => {
        // Arrange, Act
        const response = await server.get("/graffiti/es/g1-data.json");

        // Assert
        expect((await response.json()).labels[0].content).toBe("two");
    });

    it("returns 404 for a diagram that doesn't exist", async () => {
        // Arrange, Act
        const response = await server.get("/graffiti/nope.svg");

        // Assert
        expect(response.status).toBe(404);
    });
});
