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
import {createDraftUseCases} from "./drafts";
import {
    DraftNotFoundError,
    InvalidItemError,
    RevisionNotFoundError,
} from "./errors";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";

import type {SkippedDraft} from "../ports/draft-repository";
import type {ItemFileReader} from "../ports/item-file-reader";

function setUp(
    options: {files?: ItemFileReader; skipped?: SkippedDraft[]} = {},
) {
    const {drafts, feed} = withDraftFeed(inMemoryRepository(options.skipped));
    const useCases = createDraftUseCases({
        drafts,
        feed,
        files: options.files ?? {read: () => Promise.reject(new Error())},
        catalog: createCatalog(
            createPerseusCoreSchemaSource(checkoutPaths().perseusCoreTypesDir),
        ),
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

    describe("createItem", () => {
        it("saves a new draft holding the built item", () => {
            // Arrange
            const {drafts, useCases} = setUp();

            // Act
            useCases.createItem(
                {
                    question: {
                        content: "Pick one: [[☃ dropdown 1]]",
                        widgets: [{id: "dropdown 1", type: "dropdown"}],
                    },
                },
                "Fractions unit",
            );

            // Assert
            expect(drafts.get("abc")).toMatchObject({
                revision: 1,
                notes: "Fractions unit",
                item: {
                    question: {widgets: {"dropdown 1": {type: "dropdown"}}},
                },
            });
        });

        it("saves nothing when the item has errors", () => {
            // Arrange
            const {drafts, useCases} = setUp();

            // Act
            const result = useCases.createItem({
                question: {content: "[[☃ radio 1]]"},
            });

            // Assert
            expect({ok: result.ok, drafts: drafts.list()}).toEqual({
                ok: false,
                drafts: [],
            });
        });
    });

    describe("editItem", () => {
        async function openedDraft() {
            const setup = setUp();
            await setup.useCases.openItem(
                {
                    item: generateTestPerseusItem({
                        question: generateTestPerseusRenderer({
                            content: "Before",
                        }),
                    }),
                },
                "Original notes",
            );
            return setup;
        }

        it("saves the patched item as the next revision", async () => {
            // Arrange
            const {drafts, useCases} = await openedDraft();

            // Act
            useCases.editItem("abc", {
                patch: [
                    {op: "replace", path: "/question/content", value: "After"},
                ],
            });

            // Assert
            expect(drafts.get("abc")).toMatchObject({
                revision: 2,
                notes: "Original notes",
                item: {question: {content: "After"}},
            });
        });

        it("replaces the notes without a patch", async () => {
            // Arrange
            const {drafts, useCases} = await openedDraft();

            // Act
            useCases.editItem("abc", {notes: "Reviewed"});

            // Assert
            expect(drafts.get("abc")).toMatchObject({
                revision: 2,
                notes: "Reviewed",
                item: {question: {content: "Before"}},
            });
        });

        it("leaves the stored draft unchanged when the edit is rejected", async () => {
            // Arrange
            const {drafts, useCases} = await openedDraft();
            const before = drafts.get("abc");

            // Act
            const result = useCases.editItem("abc", {
                patch: [
                    {
                        op: "replace",
                        path: "/question/content",
                        value: "[[☃ radio 1]]",
                    },
                ],
                notes: "Should not be saved",
            });

            // Assert
            expect({ok: result.ok, draft: drafts.get("abc")}).toEqual({
                ok: false,
                draft: before,
            });
        });

        it("throws DraftNotFoundError for an unknown itemId", () => {
            // Arrange
            const {useCases} = setUp();

            // Act, Assert
            expect(() => useCases.editItem("nope", {notes: "x"})).toThrow(
                DraftNotFoundError,
            );
        });
    });

    describe("addWidget", () => {
        it("saves the draft with the widget as the next revision", async () => {
            // Arrange
            const {drafts, useCases} = setUp();
            await useCases.openItem({item: generateTestPerseusItem()});

            // Act
            const result = useCases.addWidget("abc", {type: "dropdown"});

            // Assert
            expect({result, draft: drafts.get("abc")}).toMatchObject({
                result: {ok: true, widgetId: "dropdown 1"},
                draft: {
                    revision: 2,
                    item: {question: {widgets: {"dropdown 1": {}}}},
                },
            });
        });

        it("leaves the stored draft unchanged when the widget is rejected", async () => {
            // Arrange
            const {drafts, useCases} = setUp();
            await useCases.openItem({item: generateTestPerseusItem()});
            const before = drafts.get("abc");

            // Act
            useCases.addWidget("abc", {type: "slider"});

            // Assert
            expect(drafts.get("abc")).toEqual(before);
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

    describe("revisions", () => {
        async function draftWithTwoEdits() {
            const setup = setUp();
            await setup.useCases.openItem({
                item: generateTestPerseusItem({
                    question: generateTestPerseusRenderer({content: "First"}),
                }),
            });
            for (const content of ["Second", "Third"]) {
                setup.useCases.editItem("abc", {
                    patch: [
                        {
                            op: "replace",
                            path: "/question/content",
                            value: content,
                        },
                    ],
                });
            }
            return setup;
        }

        it("lists every revision with what made it", async () => {
            // Arrange
            const {useCases} = await draftWithTwoEdits();

            // Act
            const revisions = useCases.listRevisions("abc");

            // Assert
            expect(
                revisions.map(({revision, change}) => [revision, change]),
            ).toEqual([
                [1, "Opened from an item"],
                [2, "edit_item: 1 operation"],
                [3, "edit_item: 1 operation"],
            ]);
        });

        it("exports the item as it was at an earlier revision", async () => {
            // Arrange
            const {useCases} = await draftWithTwoEdits();

            // Act
            const {draft} = useCases.exportItem("abc", 1);

            // Assert
            expect(draft.item.question.content).toBe("First");
        });

        it("throws for a revision that wasn't kept", async () => {
            // Arrange
            const {useCases} = await draftWithTwoEdits();

            // Act, Assert
            expect(() => useCases.exportItem("abc", 9)).toThrow(
                RevisionNotFoundError,
            );
        });

        it("reverts by saving the earlier item as a new revision", async () => {
            // Arrange
            const {drafts, useCases} = await draftWithTwoEdits();

            // Act
            useCases.revertItem("abc", 1);

            // Assert
            expect({
                current: drafts.get("abc"),
                kept: useCases.listRevisions("abc").map((r) => r.revision),
            }).toMatchObject({
                current: {
                    revision: 4,
                    change: "Reverted to revision 1",
                    item: {question: {content: "First"}},
                },
                kept: [1, 2, 3, 4],
            });
        });
    });

    describe("watchItem", () => {
        it("calls the listener with the draft now and after each change", async () => {
            // Arrange
            const {useCases} = setUp();
            await useCases.openItem({item: generateTestPerseusItem()});
            const listener = jest.fn();

            // Act
            useCases.watchItem("abc", listener);
            useCases.editItem("abc", {notes: "Changed"});

            // Assert
            expect(
                listener.mock.calls.map(([draft]) => draft.revision),
            ).toEqual([1, 2]);
        });

        it("stops calling the listener once unsubscribed", async () => {
            // Arrange
            const {useCases} = setUp();
            await useCases.openItem({item: generateTestPerseusItem()});
            const listener = jest.fn();
            const unsubscribe = useCases.watchItem("abc", listener);

            // Act
            unsubscribe();
            useCases.editItem("abc", {notes: "Changed"});

            // Assert
            expect(listener).toHaveBeenCalledTimes(1);
        });

        it("throws DraftNotFoundError for an unknown itemId", () => {
            // Arrange
            const {useCases} = setUp();

            // Act, Assert
            expect(() => useCases.watchItem("nope", jest.fn())).toThrow(
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
