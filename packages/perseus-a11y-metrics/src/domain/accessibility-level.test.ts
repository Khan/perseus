import {
    getAccessibilityLevel,
    isAssessmentItemAccessible,
} from "./accessibility-level";
import {
    createAccessibleAssessmentItem,
    createBaseExercise,
    createBlankPerseusItem,
    createEmptyContentRepo,
    createInaccessibleAssessmentItem,
} from "./content-mocks";

import type {
    AssessmentItem,
    ContentRepository,
    Exercise,
} from "./content-types";
import type {InteractionWidget, RadioWidget} from "@khanacademy/perseus-core";

describe("getAccessibilityLevel", () => {
    it(`returns "full" given an accessible exercise`, async () => {
        const exercise = createBaseExercise();
        const contentRepo = createEmptyContentRepo();

        const accessibilityLevel = await getAccessibilityLevel(
            contentRepo,
            exercise,
        );

        expect(accessibilityLevel).toBe("full");
    });

    it(`returns "full" given an exercise with one accessible assessment item`, async () => {
        // Arrange:
        const exercise: Exercise = {
            ...createBaseExercise(),
            exerciseLength: 1,
        };

        const contentRepo: ContentRepository = {
            ...createEmptyContentRepo(),
            async getAssessmentItems(): Promise<AssessmentItem[]> {
                return [createAccessibleAssessmentItem()];
            },
        };

        // Act:
        const accessibilityLevel = await getAccessibilityLevel(
            contentRepo,
            exercise,
        );

        // Assert:
        expect(accessibilityLevel).toBe("full");
    });

    it(`returns "inaccessible" when there are not enough accessible items to fill the exerciseLength`, async () => {
        // Arrange:
        const exercise: Exercise = {
            ...createBaseExercise(),
            exerciseLength: 2,
        };

        const contentRepo: ContentRepository = {
            ...createEmptyContentRepo(),
            async getAssessmentItems(): Promise<AssessmentItem[]> {
                return [
                    createInaccessibleAssessmentItem(),
                    createAccessibleAssessmentItem(),
                ];
            },
        };

        // Act:
        const accessibilityLevel = await getAccessibilityLevel(
            contentRepo,
            exercise,
        );

        // Assert:
        expect(accessibilityLevel).toBe("inaccessible");
    });

    it(`returns "limited" when not all items are accessible, but there are enough accessible items to fill the exerciseLength`, async () => {
        // Arrange:
        const exercise: Exercise = {
            ...createBaseExercise(),
            exerciseLength: 1,
        };

        const contentRepo: ContentRepository = {
            ...createEmptyContentRepo(),
            async getAssessmentItems(): Promise<AssessmentItem[]> {
                return [
                    createInaccessibleAssessmentItem(),
                    createAccessibleAssessmentItem(),
                ];
            },
        };

        // Act:
        const accessibilityLevel = await getAccessibilityLevel(
            contentRepo,
            exercise,
        );

        // Assert:
        expect(accessibilityLevel).toBe("limited");
    });
});

describe("isAssessmentItemAccessible", () => {
    it("returns true when the item has accessible context and no widgets", () => {
        const item: AssessmentItem = {
            isContextInaccessible: false,
            perseusItem: createBlankPerseusItem(),
        };
        expect(isAssessmentItemAccessible(item)).toBe(true);
    });

    it("returns true when the item has accessible context and accessible widgets", () => {
        // Arrange:
        const radioWidget: RadioWidget = {
            type: "radio",
            options: {
                choices: [{id: "", content: ""}],
            },
        };

        const item: AssessmentItem = {
            isContextInaccessible: false,
            perseusItem: {
                ...createBlankPerseusItem(),
                question: {
                    ...createBlankPerseusItem().question,
                    content: "[[☃ radio 1]]",
                    widgets: {
                        "radio 1": radioWidget,
                    },
                },
            },
        };

        // Act:
        const result = isAssessmentItemAccessible(item);

        // Assert:
        expect(result).toBe(true);
    });

    it("returns false when the item has inaccessible widgets", () => {
        // Arrange:
        const interactionWidget: InteractionWidget = {
            type: "interaction",
            options: {
                elements: [],
                static: false,
                graph: {
                    box: [0, 0],
                    labels: [],
                    range: [
                        [0, 0],
                        [0, 0],
                    ],
                    gridStep: [0, 0],
                    markings: "graph",
                    tickStep: [0, 0],
                },
            },
        };

        const item: AssessmentItem = {
            isContextInaccessible: false,
            perseusItem: {
                ...createBlankPerseusItem(),
                question: {
                    ...createBlankPerseusItem().question,
                    content: "[[☃ interaction 1]]",
                    widgets: {
                        "interaction 1": interactionWidget,
                    },
                },
            },
        };

        // Act:
        const result = isAssessmentItemAccessible(item);

        // Assert:
        expect(result).toBe(false);
    });

    it("returns false when the item has inaccessible context", () => {
        const item: AssessmentItem = {
            perseusItem: createBlankPerseusItem(),
            isContextInaccessible: true,
        };
        expect(isAssessmentItemAccessible(item)).toBe(false);
    });
});
