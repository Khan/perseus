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
import {withExerciseFeed} from "../../app/exercise-feed";
import {createExerciseUseCases} from "../../app/exercises";
import {inMemoryRepository} from "../../app/in-memory-draft-repository.testutils";
import {checkoutPaths} from "../../runtime-paths";
import {createPerseusCoreSchemaSource} from "../fs/perseus-core-schema-source";

import {allowedHostnames, createHttpServer} from "./server";

import type {PreviewPages} from "./server";
import type {Exercise} from "../../domain/exercises/exercise";
import type {FastifyInstance} from "fastify";

const fakePages: PreviewPages = {
    middleware: (req, res, next) => next(),
    html: async (page, url) => `<p>${page} for ${url}</p>`,
    close: async () => {},
};

const bulkExport = [
    {
        problemType: "Type 1",
        contentId: "pt1",
        assessmentItems: [
            {
                contentId: "a1",
                itemData: JSON.stringify(
                    generateTestPerseusItem({
                        question: generateTestPerseusRenderer({content: "One"}),
                    }),
                ),
            },
        ],
    },
];

async function setUp() {
    const {drafts, feed: draftFeed} = withDraftFeed(inMemoryRepository());
    const saved = new Map<string, Exercise>();
    const {exercises, feed: exerciseFeed} = withExerciseFeed({
        get: (id) => saved.get(id),
        list: () => [...saved.values()],
        save: (exercise) => void saved.set(exercise.exerciseId, exercise),
    });
    const catalog = createCatalog(
        createPerseusCoreSchemaSource(checkoutPaths().perseusCoreTypesDir),
    );
    let nextId = 0;
    const exerciseUseCases = createExerciseUseCases({
        exercises,
        drafts,
        exerciseFeed,
        draftFeed,
        files: {read: async () => JSON.stringify(bulkExport)},
        exports: {exists: () => false, write: (path) => path},
        clipboard: {copy: () => false},
        catalog,
        defaultExportPath: () => "unused.json",
        now: () => new Date("2026-01-01T00:00:00Z"),
        newId: () => `id${++nextId}`,
    });
    const draftUseCases = createDraftUseCases({
        drafts,
        feed: draftFeed,
        files: {read: () => Promise.reject(new Error())},
        catalog,
        now: () => new Date("2026-01-01T00:00:00Z"),
        newId: () => "unused",
    });
    const app = await createHttpServer({
        createMcpServer: () => {
            throw new Error("MCP isn't used in these tests");
        },
        drafts: draftUseCases,
        exercises: exerciseUseCases,
        createPreview: async () => fakePages,
        allowedHostnames: allowedHostnames("127.0.0.1"),
    });
    const {exercise} = await exerciseUseCases.importExercise({
        path: "in.json",
    });
    const address = await app.listen({port: 0, host: "127.0.0.1"});
    return {app, address, exercise, draftUseCases};
}

/** Reads server-sent events from a response body, one `data` per call. */
function eventReader(body: ReadableStream<Uint8Array>) {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffered = "";
    return async function nextEvent(): Promise<any> {
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

describe("exercise routes", () => {
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

    it("serves an exercise's page, and 404 for one that doesn't exist", async () => {
        // Arrange
        const setup = await setUp();
        app = setup.app;
        const id = setup.exercise.exerciseId;

        // Act
        const found = await fetch(`${setup.address}/exercises/${id}?item=x`);
        const missing = await fetch(`${setup.address}/exercises/nope`);

        // Assert
        expect({
            found: await found.text(),
            missing: missing.status,
        }).toEqual({
            found: `<p>exercise-page for /exercises/${id}?item=x</p>`,
            missing: 404,
        });
    });

    it("streams an exercise's tree again when one of its drafts changes", async () => {
        // Arrange
        const setup = await setUp();
        app = setup.app;
        const [item] = setup.exercise.problemTypes[0].items;
        const controller = new AbortController();
        const response = await fetch(
            `${setup.address}/exercises/${setup.exercise.exerciseId}/events`,
            {signal: controller.signal},
        );
        const nextEvent = eventReader(response.body!);

        // Act
        const first = await nextEvent();
        setup.draftUseCases.editItem(item.itemId, {
            patch: [
                {op: "replace", path: "/question/content", value: "Edited"},
            ],
        });
        const second = await nextEvent();
        controller.abort();

        // Assert
        const itemOf = (view: any) => view.problemTypes[0].items[0];
        expect([
            [itemOf(first).change, itemOf(first).summary],
            [itemOf(second).change, itemOf(second).summary],
        ]).toEqual([
            ["unchanged", "One"],
            ["edited", "Edited"],
        ]);
    });

    it("returns an exercise in the bulk JSON format", async () => {
        // Arrange
        const setup = await setUp();
        app = setup.app;

        // Act
        const response = await fetch(
            `${setup.address}/api/exercises/${setup.exercise.exerciseId}/bulk.json`,
        );

        // Assert
        const payload = await response.json();
        expect(
            payload.map((problemType: any) => [
                problemType.problemType,
                problemType.assessmentItems.map((item: any) => item.contentId),
            ]),
        ).toEqual([["Type 1", ["a1"]]]);
    });
});
