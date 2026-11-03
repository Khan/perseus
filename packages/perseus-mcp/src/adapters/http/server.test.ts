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
import {createPerseusCoreSchemaSource} from "../fs/perseus-core-schema-source";

import {createHttpServer} from "./server";

import type {FastifyInstance} from "fastify";

function setUp() {
    const {drafts, feed} = withDraftFeed(inMemoryRepository());
    const useCases = createDraftUseCases({
        drafts,
        feed,
        files: {read: () => Promise.reject(new Error())},
        catalog: createCatalog(createPerseusCoreSchemaSource()),
        now: () => new Date("2026-01-01T00:00:00Z"),
        newId: () => "abc",
    });
    const app = createHttpServer({
        createMcpServer: () => {
            throw new Error("MCP isn't used in these tests");
        },
        drafts: useCases,
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
        const setup = setUp();
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
        app = setUp().app;
        const address = await app.listen({port: 0, host: "127.0.0.1"});

        // Act
        const response = await fetch(`${address}/drafts/nope/events`);

        // Assert
        expect(response.status).toBe(404);
    });
});
