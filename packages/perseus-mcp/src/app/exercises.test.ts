/**
 * @jest-environment node
 */
import {
    CoreWidgetRegistry,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {createPerseusCoreSchemaSource} from "../adapters/fs/perseus-core-schema-source";
import {checkoutPaths} from "../runtime-paths";

import {createCatalog} from "./catalog";
import {withDraftFeed} from "./draft-feed";
import {
    DraftNotFoundError,
    ExportExistsError,
    InvalidImportError,
} from "./errors";
import {withExerciseFeed} from "./exercise-feed";
import {createExerciseUseCases} from "./exercises";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";

import type {Exercise} from "../domain/exercises/exercise";
import type {ExerciseRepository} from "../ports/exercise-repository";

function inMemoryExercises(): ExerciseRepository {
    const exercises = new Map<string, Exercise>();
    return {
        get: (id) => exercises.get(id),
        list: () => [...exercises.values()],
        save: (exercise) => void exercises.set(exercise.exerciseId, exercise),
    };
}

function itemWith(content: string) {
    return generateTestPerseusItem({
        question: generateTestPerseusRenderer({content}),
    });
}

function setUp(fileContents: unknown) {
    const {drafts, feed: draftFeed} = withDraftFeed(inMemoryRepository());
    const {exercises, feed: exerciseFeed} =
        withExerciseFeed(inMemoryExercises());
    const written = new Map<string, string>();
    const copied: string[] = [];
    let nextId = 0;
    const useCases = createExerciseUseCases({
        exercises,
        drafts,
        exerciseFeed,
        draftFeed,
        files: {read: async () => JSON.stringify(fileContents)},
        exports: {
            exists: (path) => written.has(path),
            write(path, contents) {
                written.set(path, contents);
                return path;
            },
        },
        clipboard: {
            copy(text) {
                copied.push(text);
                return true;
            },
        },
        catalog: createCatalog(
            createPerseusCoreSchemaSource(checkoutPaths().perseusCoreTypesDir),
        ),
        defaultExportPath: (exercise) => `exports/${exercise.exerciseId}.json`,
        now: () => new Date("2026-01-01T00:00:00Z"),
        newId: () => `id${++nextId}`,
    });
    return {drafts, written, copied, useCases};
}

// The exercise editor's bulk JSON format, with item data as JSON strings.
const bulkExport = [
    {
        problemType: "Type 1",
        contentId: "pt1",
        assessmentItems: [
            {contentId: "a1", itemData: JSON.stringify(itemWith("One"))},
            {contentId: "a2", itemData: JSON.stringify(itemWith("Two"))},
        ],
    },
    {
        problemType: "Type 2",
        assessmentItems: [{itemData: JSON.stringify(itemWith("Three"))}],
    },
];

describe("exercise use cases", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    it("imports a bulk export as a draft per item, grouped by problem type", async () => {
        // Arrange
        const {useCases} = setUp(bulkExport);

        // Act
        const {exercise} = await useCases.importExercise({path: "in.json"});

        // Assert
        expect(
            useCases
                .getExercise(exercise.exerciseId)
                .problemTypes.map((problemType) => [
                    problemType.name,
                    problemType.items.map((item) => item.summary),
                ]),
        ).toEqual([
            ["Type 1", ["One", "Two"]],
            ["Type 2", ["Three"]],
        ]);
    });

    it("imports an uploaded file's text, named after the file", () => {
        // Arrange
        const {useCases, drafts} = setUp([]);

        // Act
        const {exercise} = useCases.importExerciseText({
            text: JSON.stringify(bulkExport),
            fileName: "Fractions.json",
        });

        // Assert
        const firstItemId = exercise.problemTypes[0].items[0].itemId;
        expect({
            name: exercise.name,
            change: drafts.get(firstItemId)?.change,
        }).toEqual({name: "Fractions", change: "Uploaded Fractions.json"});
    });

    it("refuses uploaded text that isn't JSON", () => {
        // Arrange
        const {useCases} = setUp([]);

        // Act, Assert
        expect(() =>
            useCases.importExerciseText({text: "nope", fileName: "x.json"}),
        ).toThrow("Couldn't read x.json as JSON");
    });

    it("skips and reports items that don't parse", async () => {
        // Arrange
        const {useCases} = setUp([
            {
                problemType: "Type 1",
                assessmentItems: [
                    {itemData: JSON.stringify(itemWith("Good"))},
                    {itemData: "not json"},
                ],
            },
        ]);

        // Act
        const result = await useCases.importExercise({path: "in.json"});

        // Assert
        expect({
            imported: result.imported,
            skipped: result.skipped.map(({problemType, position}) => ({
                problemType,
                position,
            })),
        }).toEqual({
            imported: 1,
            skipped: [{problemType: "Type 1", position: 2}],
        });
    });

    it("rejects a file in no known shape", async () => {
        // Arrange
        const {useCases} = setUp({something: "else"});

        // Act, Assert
        await expect(
            useCases.importExercise({path: "in.json"}),
        ).rejects.toThrow(InvalidImportError);
    });

    it("exports the latest revisions in the bulk format, keeping contentIds", async () => {
        // Arrange
        const {drafts, written, useCases} = setUp(bulkExport);
        const {exercise} = await useCases.importExercise({path: "in.json"});
        const [firstId] = exercise.problemTypes[0].items.map(
            (item) => item.itemId,
        );
        const first = drafts.get(firstId)!;
        drafts.save({
            ...first,
            revision: 2,
            item: {
                ...first.item,
                question: {...first.item.question, content: "Edited"},
            },
        });

        // Act
        const result = useCases.exportExercise({
            exerciseId: exercise.exerciseId,
        });

        // Assert
        const payload = JSON.parse(written.get(result.path)!);
        expect(
            payload.map((problemType: any) => ({
                problemType: problemType.problemType,
                contentId: problemType.contentId,
                items: problemType.assessmentItems.map((item: any) => [
                    item.contentId,
                    JSON.parse(item.itemData).question.content,
                ]),
            })),
        ).toEqual([
            {
                problemType: "Type 1",
                contentId: "pt1",
                items: [
                    ["a1", "Edited"],
                    ["a2", "Two"],
                ],
            },
            {
                problemType: "Type 2",
                contentId: undefined,
                items: [[undefined, "Three"]],
            },
        ]);
    });

    it("counts new, edited and unchanged items, and copies the export", async () => {
        // Arrange
        const {drafts, written, copied, useCases} = setUp(bulkExport);
        const {exercise} = await useCases.importExercise({path: "in.json"});
        const [firstId] = exercise.problemTypes[0].items.map(
            (item) => item.itemId,
        );
        const first = drafts.get(firstId)!;
        drafts.save({
            ...first,
            revision: 2,
            item: {
                ...first.item,
                question: {...first.item.question, content: "Edited"},
            },
        });

        // Act
        const result = useCases.exportExercise({
            exerciseId: exercise.exerciseId,
        });

        // Assert
        expect({
            counts: result.counts,
            copied: result.copied,
            pasted: copied[0] === written.get(result.path),
        }).toEqual({
            counts: {new: 1, edited: 1, unchanged: 1},
            copied: true,
            pasted: true,
        });
    });

    it("exports only new and edited items with onlyChanged", async () => {
        // Arrange
        const {written, useCases} = setUp(bulkExport);
        const {exercise} = await useCases.importExercise({path: "in.json"});

        // Act
        const result = useCases.exportExercise({
            exerciseId: exercise.exerciseId,
            onlyChanged: true,
        });

        // Assert
        const payload = JSON.parse(written.get(result.path)!);
        expect(
            payload.map((problemType: any) => [
                problemType.problemType,
                problemType.assessmentItems.length,
            ]),
        ).toEqual([["Type 2", 1]]);
    });

    it("warns when more items need review than the import takes", async () => {
        // Arrange
        const many = [
            {
                problemType: "Big",
                assessmentItems: Array.from({length: 51}, (_, i) => ({
                    itemData: JSON.stringify(itemWith(`Item ${i}`)),
                })),
            },
        ];
        const {useCases} = setUp(many);
        const {exercise} = await useCases.importExercise({path: "in.json"});

        // Act
        const result = useCases.exportExercise({
            exerciseId: exercise.exerciseId,
        });

        // Assert
        expect(result.overReviewLimit).toContain("51 items are new or edited");
    });

    it("doesn't overwrite an export unless asked to", async () => {
        // Arrange
        const {useCases} = setUp(bulkExport);
        const {exercise} = await useCases.importExercise({path: "in.json"});
        useCases.exportExercise({exerciseId: exercise.exerciseId});

        // Act, Assert
        expect(() =>
            useCases.exportExercise({exerciseId: exercise.exerciseId}),
        ).toThrow(ExportExistsError);
    });

    it("moves an item to a new problem type", async () => {
        // Arrange
        const {useCases} = setUp(bulkExport);
        const {exercise} = await useCases.importExercise({path: "in.json"});
        const [, secondId] = exercise.problemTypes[0].items.map(
            (item) => item.itemId,
        );

        // Act
        useCases.placeItems(exercise.exerciseId, [secondId], "Type 3");

        // Assert
        expect(
            useCases
                .getExercise(exercise.exerciseId)
                .problemTypes.map((problemType) => problemType.name),
        ).toEqual(["Type 1", "Type 2", "Type 3"]);
    });

    it("validates every item in the exercise", async () => {
        // Arrange
        const {useCases} = setUp(bulkExport);
        const {exercise} = await useCases.importExercise({path: "in.json"});

        // Act
        const results = useCases.validateExercise(exercise.exerciseId);

        // Assert
        expect(results.map((result) => result.valid)).toEqual([
            true,
            true,
            true,
        ]);
    });

    it("sets and clears an exercise's editor URL", async () => {
        // Arrange
        const {useCases} = setUp(bulkExport);
        const {exercise} = await useCases.importExercise({
            path: "in.json",
            editorUrl: "https://example.org/edit/1",
        });

        // Act
        useCases.updateExercise(exercise.exerciseId, {editorUrl: ""});

        // Assert
        expect({
            imported: exercise.editorUrl,
            after: useCases.getExercise(exercise.exerciseId).editorUrl,
        }).toEqual({imported: "https://example.org/edit/1", after: undefined});
    });

    it("sends an exercise's view again, once, after its drafts change together", async () => {
        // Arrange
        const {drafts, useCases} = setUp(bulkExport);
        const {exercise} = await useCases.importExercise({path: "in.json"});
        const views: Array<Array<string | undefined>> = [];
        useCases.watchExercise(exercise.exerciseId, (view) =>
            views.push(
                view.problemTypes.flatMap((problemType) =>
                    problemType.items.map((item) => item.change),
                ),
            ),
        );

        // Act
        for (const itemId of exercise.problemTypes[0].items.map(
            (item) => item.itemId,
        )) {
            const draft = drafts.get(itemId)!;
            drafts.save({
                ...draft,
                revision: draft.revision + 1,
                item: {
                    ...draft.item,
                    question: {...draft.item.question, content: "Edited"},
                },
            });
        }
        // Jest fakes queueMicrotask here, as it does timers.
        jest.runAllTicks();

        // Assert
        expect(views).toEqual([
            ["unchanged", "unchanged", "new"],
            ["edited", "edited", "new"],
        ]);
    });

    it("includes each draft's validation issues in the exercise's view", async () => {
        // Arrange
        const {useCases} = setUp([
            {
                problemType: "Type 1",
                assessmentItems: [
                    {itemData: JSON.stringify(itemWith("[[☃ radio 1]]"))},
                ],
            },
        ]);
        const {exercise} = await useCases.importExercise({path: "in.json"});
        let issues: unknown[] | undefined;

        // Act
        useCases.watchExercise(exercise.exerciseId, (view) => {
            issues = view.problemTypes[0].items[0].issues;
        });

        // Assert
        expect(issues?.length).toBeGreaterThan(0);
    });

    it("creates an exercise holding existing drafts, not copies", async () => {
        // Arrange
        const {drafts, useCases} = setUp(bulkExport);
        const {exercise: imported} = await useCases.importExercise({
            path: "in.json",
        });
        const itemIds = imported.problemTypes[0].items.map(
            (item) => item.itemId,
        );
        const draftsBefore = drafts.list().length;

        // Act
        const created = useCases.createExercise({
            name: "Regrouped",
            itemIds,
            problemType: "Type A",
        });

        // Assert
        expect({
            tree: useCases
                .getExercise(created.exerciseId)
                .problemTypes.map((problemType) => [
                    problemType.name,
                    problemType.items.map((item) => item.itemId),
                ]),
            newDrafts: drafts.list().length - draftsBefore,
        }).toEqual({tree: [["Type A", itemIds]], newDrafts: 0});
    });

    it("creates an empty exercise", () => {
        // Arrange
        const {useCases} = setUp(bulkExport);

        // Act
        const created = useCases.createExercise({name: "New"});

        // Assert
        expect(useCases.getExercise(created.exerciseId).problemTypes).toEqual(
            [],
        );
    });

    it("refuses to create an exercise with a draft that doesn't exist", () => {
        // Arrange
        const {useCases} = setUp(bulkExport);

        // Act, Assert
        expect(() =>
            useCases.createExercise({name: "New", itemIds: ["nope"]}),
        ).toThrow(DraftNotFoundError);
    });
});
