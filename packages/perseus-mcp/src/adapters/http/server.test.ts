/**
 * @jest-environment node
 */
import http from "node:http";

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

import {allowedHostnames, createHttpServer, previewLinks} from "./server";

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
        allowedHostnames: allowedHostnames("127.0.0.1"),
    });
    return {app, useCases};
}

/**
 * Sends a request with the given `Host` header, which fetch() won't let a
 * caller set.
 */
function requestWithHost(
    address: string,
    {
        host,
        path,
        method = "GET",
        body,
    }: {host: string; path: string; method?: string; body?: unknown},
): Promise<{status: number; body: string}> {
    return new Promise((resolve, reject) => {
        const req = http.request(
            new URL(path, address),
            {
                method,
                headers: {
                    host,
                    "content-type": "application/json",
                    accept: "application/json, text/event-stream",
                },
            },
            (res) => {
                let text = "";
                res.setEncoding("utf8");
                res.on("data", (chunk) => (text += chunk));
                res.on("end", () =>
                    resolve({status: res.statusCode ?? 0, body: text}),
                );
            },
        );
        req.on("error", reject);
        req.end(body == null ? undefined : JSON.stringify(body));
    });
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

    it("returns a draft as its event stream would start", async () => {
        // Arrange
        const setup = await setUp();
        app = setup.app;
        await setup.useCases.openItem({
            item: generateTestPerseusItem({
                question: generateTestPerseusRenderer({content: "Hello"}),
            }),
        });
        const address = await app.listen({port: 0, host: "127.0.0.1"});

        // Act
        const response = await fetch(`${address}/api/drafts/abc`);
        const body = await response.json();

        // Assert
        expect({
            itemId: body.itemId,
            revision: body.revision,
            content: body.item.question.content,
            diagrams: body.diagrams,
        }).toEqual({
            itemId: "abc",
            revision: 1,
            content: "Hello",
            diagrams: {},
        });
    });

    it("returns 404 when reading a draft that doesn't exist", async () => {
        // Arrange
        app = (await setUp()).app;
        const address = await app.listen({port: 0, host: "127.0.0.1"});

        // Act
        const response = await fetch(`${address}/api/drafts/nope`);

        // Assert
        expect(response.status).toBe(404);
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

    it("rejects a request whose Host header names another host", async () => {
        // Arrange
        app = (await setUp()).app;
        const address = await app.listen({port: 0, host: "127.0.0.1"});

        // Act
        const response = await requestWithHost(address, {
            host: "attacker.example:4567",
            path: "/preview/frame",
        });

        // Assert
        expect(response.status).toBe(403);
    });

    it("rejects an MCP request whose Host header names another host", async () => {
        // Arrange
        app = (await setUp()).app;
        const address = await app.listen({port: 0, host: "127.0.0.1"});

        // Act
        const response = await requestWithHost(address, {
            host: "attacker.example",
            path: "/mcp",
            method: "POST",
            body: {jsonrpc: "2.0", id: 1, method: "ping"},
        });

        // Assert
        expect(response.status).toBe(403);
    });

    it("accepts a request to localhost by name", async () => {
        // Arrange
        app = (await setUp()).app;
        const address = await app.listen({port: 0, host: "127.0.0.1"});

        // Act
        const response = await requestWithHost(address, {
            host: "localhost:4567",
            path: "/preview/frame",
        });

        // Assert
        expect(response.body).toBe("<p>frame for /preview/frame</p>");
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

describe("allowedHostnames", () => {
    it("adds the public host links use", () => {
        // Arrange, Act
        const names = allowedHostnames("127.0.0.1", "khanacademy.dev");

        // Assert
        expect(names).toEqual([
            "localhost",
            "127.0.0.1",
            "[::1]",
            "khanacademy.dev",
        ]);
    });

    it("allows only localhost's names for a loopback address", () => {
        // Arrange, Act
        const names = allowedHostnames("127.0.0.1");

        // Assert
        expect(names).toEqual(["localhost", "127.0.0.1", "[::1]"]);
    });

    it("allows only localhost's names for a wildcard address", () => {
        // Arrange, Act
        const names = allowedHostnames("::");

        // Assert
        expect(names).toEqual(["localhost", "127.0.0.1", "[::1]"]);
    });

    it("adds the listening host, in brackets for IPv6", () => {
        // Arrange, Act
        const names = [
            allowedHostnames("dev.test"),
            allowedHostnames("fe80::1"),
        ];

        // Assert
        expect(names.map((n) => n.at(-1))).toEqual(["dev.test", "[fe80::1]"]);
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
