import {
    CoreWidgetRegistry,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {newDraft} from "../domain/draft";

import {createDraftIndexing, withDraftIndexing} from "./draft-index";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";

import type {Exercise} from "../domain/exercises/exercise";
import type {ContentDocument} from "../domain/search/content-document";
import type {ExerciseRepository} from "../ports/exercise-repository";

function draftOf(itemId: string, content: string) {
    return newDraft({
        itemId,
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({content}),
        }),
        change: "Created",
        now: new Date("2026-01-01T00:00:00Z"),
    });
}

function exerciseRepository(exercises: Exercise[]): ExerciseRepository {
    const byId = new Map(exercises.map((e) => [e.exerciseId, e]));
    return {
        get: (id) => byId.get(id),
        list: () => [...byId.values()],
        save: (exercise) => byId.set(exercise.exerciseId, exercise),
    };
}

function setUp(options: {failing?: boolean} = {}) {
    const drafts = inMemoryRepository();
    drafts.save(draftOf("d1", "One"));
    const exercises = exerciseRepository([
        {
            exerciseId: "e1",
            name: "Imported",
            createdAt: "",
            updatedAt: "",
            problemTypes: [
                {name: "Type 1", items: [{itemId: "d1", contentId: "x1"}]},
            ],
        },
    ]);
    const calls: Array<{op: string; documents: ContentDocument[]}> = [];
    const logged: string[] = [];
    const indexing = createDraftIndexing({
        drafts,
        exercises,
        index: {
            async replaceAll(documents) {
                if (options.failing === true) {
                    throw new Error("nothing answered");
                }
                calls.push({op: "replaceAll", documents: [...documents]});
            },
            async upsert(documents) {
                calls.push({op: "upsert", documents: [...documents]});
            },
        },
        placementOf: async (contentId) =>
            contentId === "x1"
                ? {
                      domain: ["math"],
                      domainTitle: ["Math"],
                      course: ["algebra"],
                      courseTitle: ["Algebra"],
                      unit: [],
                      unitTitle: [],
                      lesson: [],
                      lessonTitle: [],
                  }
                : undefined,
        speak: async () => (tex) => tex,
        log: (message) => logged.push(message),
    });
    const wrapped = withDraftIndexing(drafts, exercises, indexing);
    return {indexing, wrapped, calls, logged};
}

describe("draft indexing", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    it("indexes every draft, placed where it was imported from", async () => {
        // Arrange
        const {indexing, calls} = setUp();

        // Act
        await indexing.syncAll();

        // Assert
        expect(calls).toEqual([
            {
                op: "replaceAll",
                documents: [
                    expect.objectContaining({
                        id: "draft-d1",
                        title: ["Imported"],
                        problemType: ["Type 1"],
                        course: ["algebra"],
                    }),
                ],
            },
        ]);
    });

    it("indexes a draft each time it's saved", async () => {
        // Arrange
        const {indexing, wrapped, calls} = setUp();

        // Act
        wrapped.drafts.save(draftOf("d2", "Two"));
        await indexing.syncAll();

        // Assert
        expect(calls[0]).toEqual({
            op: "upsert",
            documents: [expect.objectContaining({id: "draft-d2", text: "Two"})],
        });
    });

    it("reindexes an exercise's drafts when it changes", async () => {
        // Arrange
        const {indexing, wrapped, calls} = setUp();

        // Act
        wrapped.exercises.save({
            exerciseId: "e1",
            name: "Renamed",
            createdAt: "",
            updatedAt: "",
            problemTypes: [{name: "Type 2", items: [{itemId: "d1"}]}],
        });
        await indexing.syncAll();

        // Assert
        expect(calls[0]).toEqual({
            op: "upsert",
            documents: [
                expect.objectContaining({
                    title: ["Renamed"],
                    problemType: ["Type 2"],
                }),
            ],
        });
    });

    it("logs a failure and keeps going", async () => {
        // Arrange
        const {indexing, logged} = setUp({failing: true});

        // Act
        await indexing.syncAll();

        // Assert
        expect(logged).toEqual([
            expect.stringContaining("couldn't index the drafts"),
        ]);
    });
});
