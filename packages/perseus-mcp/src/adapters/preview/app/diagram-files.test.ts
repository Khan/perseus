/**
 * @jest-environment node
 */
import {createDiagramStore, serveDiagramsThroughFetch} from "./diagram-files";

const BASE = "https://perseus-mcp.localhost/graffiti/";

function storeWith(revision: number) {
    const store = createDiagramStore();
    store.update({
        g1: {revision, svg: "<svg>ü</svg>", data: {labels: [], revision}},
    });
    return store;
}

describe("createDiagramStore", () => {
    it("gives a diagram's image as a data: URL", () => {
        // Arrange
        const store = storeWith(1);

        // Act
        const url = store.generateUrl({
            url: `${BASE}g1.svg`,
            context: "image_loader:image_url",
        });

        // Assert
        expect(decodeURIComponent(url)).toBe(
            "data:image/svg+xml;charset=utf-8,<svg>ü</svg>",
        );
    });

    it("names the revision in a diagram's label data URL", () => {
        // Arrange
        const store = storeWith(3);

        // Act
        const url = store.generateUrl({
            url: `${BASE}g1-data.json`,
            context: "graphie:data_url",
        });

        // Assert
        expect(url).toBe(`${BASE}g1.3-data.json`);
    });

    it("leaves other URLs alone", () => {
        // Arrange
        const store = storeWith(1);
        const url = "https://cdn.kastatic.org/ka-perseus-graphie/abc.svg";

        // Act, Assert
        expect(
            store.generateUrl({url, context: "image_loader:image_url"}),
        ).toBe(url);
    });

    it("answers a fetch of the label data it has", async () => {
        // Arrange
        const store = storeWith(2);

        // Act
        const response = store.respond(`${BASE}g1.2-data.json`);

        // Assert
        expect(await response?.json()).toEqual({labels: [], revision: 2});
    });

    it("answers 404 for another revision's or locale's label data", () => {
        // Arrange
        const store = storeWith(2);

        // Act
        const statuses = [
            store.respond(`${BASE}g1.1-data.json`)?.status,
            store.respond(`${BASE}es/g1.2-data.json`)?.status,
        ];

        // Assert
        expect(statuses).toEqual([404, 404]);
    });

    it("returns the revision of each diagram it has", () => {
        // Arrange
        const store = storeWith(4);

        // Act, Assert
        expect(store.revisions()).toEqual({g1: 4});
    });
});

describe("serveDiagramsThroughFetch", () => {
    const realFetch = globalThis.fetch;

    afterEach(() => {
        globalThis.fetch = realFetch;
    });

    it("answers diagram files without reaching the network", async () => {
        // Arrange
        const network = jest.fn();
        globalThis.fetch = network;
        serveDiagramsThroughFetch(storeWith(1));

        // Act
        const response = await fetch(`${BASE}g1.1-data.json`);

        // Assert
        expect({ok: response.ok, network: network.mock.calls}).toEqual({
            ok: true,
            network: [],
        });
    });

    it("passes every other request on", async () => {
        // Arrange
        const network = jest.fn(async () => new Response("other"));
        globalThis.fetch = network;
        serveDiagramsThroughFetch(storeWith(1));

        // Act
        const response = await fetch("https://example.com/a.json");

        // Assert
        expect(await response.text()).toBe("other");
    });
});
