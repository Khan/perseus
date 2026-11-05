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
import {makeZip} from "./zip-entries.testutils";

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

    describe("POST /exercises/import", () => {
        function upload(
            address: string,
            body: string | Buffer,
            {
                type = "application/json",
                origin = address,
                fileName = "My exercise.json",
            }: {type?: string; origin?: string | null; fileName?: string} = {},
        ) {
            return fetch(
                `${address}/exercises/import?fileName=${encodeURIComponent(fileName)}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": type,
                        ...(origin != null && {Origin: origin}),
                    },
                    body:
                        typeof body === "string" ? body : new Uint8Array(body),
                },
            );
        }

        it("imports an uploaded file as an exercise named after it", async () => {
            // Arrange
            const setup = await setUp();
            app = setup.app;

            // Act
            const response = await upload(
                setup.address,
                JSON.stringify(bulkExport),
            );

            // Assert
            expect(await response.json()).toEqual({
                exercises: [
                    {
                        exerciseId: expect.any(String),
                        name: "My exercise",
                        imported: 1,
                        skipped: 0,
                    },
                ],
                failed: [],
            });
        });

        it("imports each .json file in an uploaded zip", async () => {
            // Arrange
            const setup = await setUp();
            app = setup.app;
            const zip = makeZip([
                {name: "a.json", text: JSON.stringify(bulkExport)},
                {name: "b.json", text: "not JSON"},
            ]);

            // Act
            const response = await upload(setup.address, zip, {
                type: "application/zip",
                fileName: "both.zip",
            });

            // Assert
            const payload = await response.json();
            expect({
                imported: payload.exercises.map((e: any) => e.name),
                failed: payload.failed.map((f: any) => f.fileName),
            }).toEqual({imported: ["a"], failed: ["b.json"]});
        });

        it("refuses an upload from another site", async () => {
            // Arrange
            const setup = await setUp();
            app = setup.app;

            // Act
            const statuses = [
                (
                    await upload(setup.address, "[]", {
                        origin: "https://evil.example",
                    })
                ).status,
                (await upload(setup.address, "[]", {origin: null})).status,
            ];

            // Assert
            expect(statuses).toEqual([403, 403]);
        });

        it("returns 400 for a file import doesn't read", async () => {
            // Arrange
            const setup = await setUp();
            app = setup.app;

            // Act
            const response = await upload(setup.address, '{"not": "items"}');

            // Assert
            expect(response.status).toBe(400);
        });

        it("returns 415 for a body that's neither JSON nor a zip", async () => {
            // Arrange
            const setup = await setUp();
            app = setup.app;

            // Act
            const response = await upload(setup.address, "hello", {
                type: "text/plain",
            });

            // Assert
            expect(response.status).toBe(415);
        });
    });
});
