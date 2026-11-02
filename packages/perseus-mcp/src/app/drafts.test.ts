/**
 * @jest-environment node
 */
import {
    CoreWidgetRegistry,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {createDraftUseCases} from "./drafts";
import {DraftNotFoundError, InvalidItemError} from "./errors";

import type {Draft} from "../domain/draft";
import type {DraftRepository, SkippedDraft} from "../ports/draft-repository";
import type {ItemFileReader} from "../ports/item-file-reader";

function inMemoryRepository(skipped: SkippedDraft[] = []): DraftRepository {
    const drafts = new Map<string, Draft>();
    return {
        get: (itemId) => drafts.get(itemId),
        list: () => [...drafts.values()],
        save: (draft) => void drafts.set(draft.itemId, draft),
        locationOf: (itemId) => `memory://${itemId}`,
        skipped: () => skipped,
    };
}

function setUp(
    options: {files?: ItemFileReader; skipped?: SkippedDraft[]} = {},
) {
    const drafts = inMemoryRepository(options.skipped);
    const useCases = createDraftUseCases({
        drafts,
        files: options.files ?? {read: () => Promise.reject(new Error())},
        now: () => new Date("2026-01-01T00:00:00Z"),
        newId: () => "abc",
    });
    return {drafts, useCases};
}

describe("draft use cases", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    describe("openItem", () => {
        it("saves a new draft holding the item", async () => {
            // Arrange
            const {drafts, useCases} = setUp();
            const item = generateTestPerseusItem({
                question: generateTestPerseusRenderer({
                    content: "What is 2+2?",
                }),
            });

            // Act
            await useCases.openItem({item}, "From the addition unit");

            // Assert
            expect(drafts.get("abc")).toMatchObject({
                itemId: "abc",
                revision: 1,
                notes: "From the addition unit",
                item: {question: {content: "What is 2+2?"}},
            });
        });

        it("reads the item from a file when given a path", async () => {
            // Arrange
            const item = generateTestPerseusItem({
                question: generateTestPerseusRenderer({content: "From a file"}),
            });
            const read = jest.fn().mockResolvedValue(JSON.stringify(item));
            const {useCases} = setUp({files: {read}});

            // Act
            const draft = await useCases.openItem({path: "item.json"});

            // Assert
            expect({readPath: read.mock.calls[0][0], draft}).toMatchObject({
                readPath: "item.json",
                draft: {item: {question: {content: "From a file"}}},
            });
        });

        it("throws InvalidItemError and saves nothing for an invalid item", async () => {
            // Arrange
            const {drafts, useCases} = setUp();

            // Act
            const opening = useCases.openItem({
                item: {question: {content: 5}, hints: []},
            });

            // Assert
            await expect(opening).rejects.toThrow(InvalidItemError);
            expect(drafts.list()).toEqual([]);
        });
    });

    describe("exportItem", () => {
        it("returns the draft and where it's stored", async () => {
            // Arrange
            const {useCases} = setUp();
            await useCases.openItem({item: generateTestPerseusItem()});

            // Act
            const result = useCases.exportItem("abc");

            // Assert
            expect(result).toMatchObject({
                draft: {itemId: "abc"},
                location: "memory://abc",
            });
        });

        it("throws DraftNotFoundError for an unknown itemId", () => {
            // Arrange
            const {useCases} = setUp();

            // Act, Assert
            expect(() => useCases.exportItem("nope")).toThrow(
                DraftNotFoundError,
            );
        });
    });

    describe("listItems", () => {
        it("returns the drafts and the files that couldn't be loaded", async () => {
            // Arrange
            const skipped = [{location: "bad.json", reason: "Not valid JSON"}];
            const {useCases} = setUp({skipped});
            await useCases.openItem({item: generateTestPerseusItem()});

            // Act
            const result = useCases.listItems();

            // Assert
            expect(result).toEqual({
                drafts: [expect.objectContaining({itemId: "abc"})],
                skipped,
            });
        });
    });
});
