/**
 * @jest-environment node
 */
import {
    CoreWidgetRegistry,
    generateRadioWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {newDraft} from "../domain/draft";

import {DraftNotFoundError} from "./errors";
import {inMemoryRepository} from "./in-memory-draft-repository.testutils";
import {createReadItemsUseCase} from "./read-items";

import type {ExerciseUseCases} from "./exercises";

function setUp() {
    const drafts = inMemoryRepository();
    const save = (itemId: string, content: string, at: string, radio = false) =>
        drafts.save(
            newDraft({
                itemId,
                item: generateTestPerseusItem({
                    question: generateTestPerseusRenderer({
                        content: radio ? `${content} [[☃ radio 1]]` : content,
                        widgets: radio
                            ? {"radio 1": generateRadioWidget()}
                            : {},
                    }),
                    hints: [generateTestPerseusRenderer({content: "A hint."})],
                }),
                change: "Created",
                now: new Date(at),
            }),
        );
    save("d1", "**Add $2+2$.**", "2026-01-01T00:00:00Z", true);
    save("d2", "Subtract.", "2026-01-03T00:00:00Z");
    save("d3", "**Add again.**", "2026-01-02T00:00:00Z");
    const exercises: Pick<ExerciseUseCases, "getExercise"> = {
        getExercise: (exerciseId) => ({
            exerciseId,
            name: "Exercise",
            problemTypes: [
                {name: "Type 1", items: [{itemId: "d3"}, {itemId: "d1"}]},
                {name: null, items: [{itemId: "gone"}]},
            ],
        }),
    };
    return createReadItemsUseCase({drafts, exercises});
}

describe("readItems", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    it("reads every draft's question, most recently changed first", () => {
        // Arrange
        const useCase = setUp();

        // Act
        const result = useCase.readItems({limit: 50});

        // Assert
        expect(result.matched).toBe(3);
        expect(result.items.map((i) => i.itemId)).toEqual(["d2", "d3", "d1"]);
        expect(result.items[0].parts).toEqual({
            "/question/content": "Subtract.",
        });
    });

    it("reads an exercise's drafts in its order, skipping missing ones", () => {
        // Arrange
        const useCase = setUp();

        // Act
        const result = useCase.readItems({
            exerciseId: "e",
            paths: ["/hints/0/content"],
            limit: 50,
        });

        // Assert
        expect(result.items).toEqual([
            expect.objectContaining({
                itemId: "d3",
                problemType: "Type 1",
                parts: {"/hints/0/content": "A hint."},
            }),
            expect.objectContaining({itemId: "d1", problemType: "Type 1"}),
        ]);
    });

    it("filters by text and by widget type", () => {
        // Arrange
        const useCase = setUp();

        // Act
        const byText = useCase.readItems({contains: "add", limit: 50});
        const byWidget = useCase.readItems({widgetType: "radio", limit: 50});

        // Assert
        expect(byText.items.map((i) => i.itemId)).toEqual(["d3", "d1"]);
        expect(byWidget.items.map((i) => i.itemId)).toEqual(["d1"]);
    });

    it("counts every match but returns only `limit`", () => {
        // Arrange
        const useCase = setUp();

        // Act
        const result = useCase.readItems({limit: 1});

        // Assert
        expect(result).toMatchObject({matched: 3, notReturned: 2});
        expect(result.items).toHaveLength(1);
    });

    it("throws for a named draft that doesn't exist", () => {
        // Arrange
        const useCase = setUp();

        // Act
        const read = () => useCase.readItems({itemIds: ["nope"], limit: 50});

        // Assert
        expect(read).toThrow(DraftNotFoundError);
    });
});
