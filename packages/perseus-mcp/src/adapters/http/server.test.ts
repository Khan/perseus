/**
 * @jest-environment node
 */
import {
    CoreWidgetRegistry,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {createCatalog} from "../../app/catalog";
import {withDraftFeed} from "../../app/draft-feed";
import {createDraftUseCases} from "../../app/drafts";
import {inMemoryRepository} from "../../app/in-memory-draft-repository.testutils";
import {checkoutPaths} from "../../runtime-paths";
import {createPerseusCoreSchemaSource} from "../fs/perseus-core-schema-source";

import {createHttpServer, previewLinks} from "./server";

import type {PreviewPages} from "./server";
import type {FastifyInstance} from "fastify";

// Stands in for Vite: echoes which page was asked for, and serves one asset.
const fakePreview: PreviewPages = {
    middleware: (req, res, next) => {
        if (req.url === "/preview/asset.js") {
            res.end("asset");
            return;
        }
        next();
    },
    html: async (page, url) => `<p>${page} for ${url}</p>`,
    close: async () => {},
};

async function setUp() {
    const {drafts, feed} = withDraftFeed(inMemoryRepository());
    const useCases = createDraftUseCases({
        drafts,
        feed,
        files: {read: () => Promise.reject(new Error())},
        catalog: createCatalog(
            createPerseusCoreSchemaSource(checkoutPaths().perseusCoreTypesDir),
        ),
        now: () => new Date("2026-01-01T00:00:00Z"),
        newId: () => "abc",
    });
    const app = await createHttpServer({
        createMcpServer: () => {
            throw new Error("MCP isn't used in these tests");
        },
        drafts: useCases,
        createPreview: async () => fakePreview,
    });
    return {app, useCases};
}

/** Reads server-sent events from a response body, one `data` per call. */
function eventReader(body: ReadableStream<Uint8Array>) {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffered = "";
    return async function nextEvent(): Promise<{revision: number}> {
        while (!buffered.includes("\n\n")) {
            const {value} = await reader.read();
            buffered += decoder.decode(value, {stream: true});
        }
        const end = buffered.indexOf("\n\n");
        const event = buffered.slice(0, end);
        buffered = buffered.slice(end + 2);
        const data = event
            .split("\n")
            .find((line) => line.startsWith("data: "))
            ?.slice("data: ".length);
        return JSON.parse(data ?? "null");
    };
}

describe("createHttpServer", () => {
    let app: FastifyInstance;

    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    beforeEach(() => {
        // The shared test setup fakes timers, which stalls real network I/O.
        jest.useRealTimers();
    });

    afterEach(async () => {
        await app.close();
    });

    it("streams a draft's events, starting with its current state", async () => {
        // Arrange
        const setup = await setUp();
        app = setup.app;
        await setup.useCases.openItem({
            item: generateTestPerseusItem({
                question: generateTestPerseusRenderer({content: "Before"}),
            }),
        });
        const address = await app.listen({port: 0, host: "127.0.0.1"});
        const controller = new AbortController();
        const response = await fetch(`${address}/drafts/abc/events`, {
            signal: controller.signal,
        });
        const nextEvent = eventReader(response.body!);

        // Act
        const first = await nextEvent();
        setup.useCases.editItem("abc", {notes: "Changed"});
        const second = await nextEvent();
        controller.abort();

        // Assert
        expect({
            contentType: response.headers.get("content-type"),
            revisions: [first.revision, second.revision],
        }).toEqual({contentType: "text/event-stream", revisions: [1, 2]});
    });

    it("returns 404 for a draft that doesn't exist", async () => {
        // Arrange
        app = (await setUp()).app;
        const address = await app.listen({port: 0, host: "127.0.0.1"});

        // Act
        const response = await fetch(`${address}/drafts/nope/events`);

        // Assert
        expect(response.status).toBe(404);
    });

    it("serves a draft's preview page", async () => {
        // Arrange
        const setup = await setUp();
        app = setup.app;
        await setup.useCases.openItem({item: generateTestPerseusItem()});
        const address = await app.listen({port: 0, host: "127.0.0.1"});

        // Act
        const response = await fetch(`${address}/drafts/abc/preview`);

        // Assert
        expect({
            contentType: response.headers.get("content-type"),
            body: await response.text(),
        }).toEqual({
            contentType: "text/html; charset=utf-8",
            body: "<p>shell for /drafts/abc/preview</p>",
        });
    });

    it("returns 404 for the preview of a draft that doesn't exist", async () => {
        // Arrange
        app = (await setUp()).app;
        const address = await app.listen({port: 0, host: "127.0.0.1"});

        // Act
        const response = await fetch(`${address}/drafts/nope/preview`);

        // Assert
        expect(response.status).toBe(404);
    });

    it("serves the preview frame", async () => {
        // Arrange
        app = (await setUp()).app;
        const address = await app.listen({port: 0, host: "127.0.0.1"});

        // Act
        const response = await fetch(`${address}/preview/frame`);

        // Assert
        expect(await response.text()).toBe("<p>frame for /preview/frame</p>");
    });

    it("serves the preview's assets through its middleware", async () => {
        // Arrange
        app = (await setUp()).app;
        const address = await app.listen({port: 0, host: "127.0.0.1"});

        // Act
        const response = await fetch(`${address}/preview/asset.js`);

        // Assert
        expect(await response.text()).toBe("asset");
    });
});

describe("previewLinks", () => {
    it("links to a draft's preview page at the base URL", () => {
        // Arrange
        const links = previewLinks(() => "http://localhost:4567");

        // Act
        const url = links.urlFor("a b");

        // Assert
        expect(url).toBe("http://localhost:4567/drafts/a%20b/preview");
    });

    it("returns null while the server has no address", () => {
        // Arrange
        const links = previewLinks(() => null);

        // Act
        const url = links.urlFor("abc");

        // Assert
        expect(url).toBeNull();
    });
});
