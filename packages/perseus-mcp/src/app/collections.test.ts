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
import {createCollectionUseCases} from "./collections";
import {ExportExistsError, InvalidImportError} from "./errors";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";

import type {Collection} from "../domain/collections/collection";
import type {CollectionRepository} from "../ports/collection-repository";

function inMemoryCollections(): CollectionRepository {
    const collections = new Map<string, Collection>();
    return {
        get: (id) => collections.get(id),
        list: () => [...collections.values()],
        save: (collection) =>
            void collections.set(collection.collectionId, collection),
    };
}

function itemWith(content: string) {
    return generateTestPerseusItem({
        question: generateTestPerseusRenderer({content}),
    });
}

function setUp(fileContents: unknown) {
    const drafts = inMemoryRepository();
    const written = new Map<string, string>();
    const copied: string[] = [];
    let nextId = 0;
    const useCases = createCollectionUseCases({
        collections: inMemoryCollections(),
        drafts,
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
        defaultExportPath: (collection) =>
            `exports/${collection.collectionId}.json`,
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

describe("collection use cases", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    it("imports a bulk export as a draft per item, grouped by problem type", async () => {
        // Arrange
        const {useCases} = setUp(bulkExport);

        // Act
        const {collection} = await useCases.importItems({path: "in.json"});

        // Assert
        expect(
            useCases
                .getCollection(collection.collectionId)
                .problemTypes.map((problemType) => [
                    problemType.name,
                    problemType.items.map((item) => item.summary),
                ]),
        ).toEqual([
            ["Type 1", ["One", "Two"]],
            ["Type 2", ["Three"]],
        ]);
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
        const result = await useCases.importItems({path: "in.json"});

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
        await expect(useCases.importItems({path: "in.json"})).rejects.toThrow(
            InvalidImportError,
        );
    });

    it("exports the latest revisions in the bulk format, keeping contentIds", async () => {
        // Arrange
        const {drafts, written, useCases} = setUp(bulkExport);
        const {collection} = await useCases.importItems({path: "in.json"});
        const [firstId] = collection.problemTypes[0].items.map(
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
        const result = useCases.exportCollection({
            collectionId: collection.collectionId,
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
        const {collection} = await useCases.importItems({path: "in.json"});
        const [firstId] = collection.problemTypes[0].items.map(
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
        const result = useCases.exportCollection({
            collectionId: collection.collectionId,
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
        const {collection} = await useCases.importItems({path: "in.json"});

        // Act
        const result = useCases.exportCollection({
            collectionId: collection.collectionId,
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
        const {collection} = await useCases.importItems({path: "in.json"});

        // Act
        const result = useCases.exportCollection({
            collectionId: collection.collectionId,
        });

        // Assert
        expect(result.overReviewLimit).toContain("51 items are new or edited");
    });

    it("doesn't overwrite an export unless asked to", async () => {
        // Arrange
        const {useCases} = setUp(bulkExport);
        const {collection} = await useCases.importItems({path: "in.json"});
        useCases.exportCollection({collectionId: collection.collectionId});

        // Act, Assert
        expect(() =>
            useCases.exportCollection({collectionId: collection.collectionId}),
        ).toThrow(ExportExistsError);
    });

    it("moves an item to a new problem type", async () => {
        // Arrange
        const {useCases} = setUp(bulkExport);
        const {collection} = await useCases.importItems({path: "in.json"});
        const [, secondId] = collection.problemTypes[0].items.map(
            (item) => item.itemId,
        );

        // Act
        useCases.placeItems(collection.collectionId, [secondId], "Type 3");

        // Assert
        expect(
            useCases
                .getCollection(collection.collectionId)
                .problemTypes.map((problemType) => problemType.name),
        ).toEqual(["Type 1", "Type 2", "Type 3"]);
    });

    it("validates every item in the collection", async () => {
        // Arrange
        const {useCases} = setUp(bulkExport);
        const {collection} = await useCases.importItems({path: "in.json"});

        // Act
        const results = useCases.validateCollection(collection.collectionId);

        // Assert
        expect(results.map((result) => result.valid)).toEqual([
            true,
            true,
            true,
        ]);
    });
});
