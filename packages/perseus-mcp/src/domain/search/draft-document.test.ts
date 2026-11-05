import {
    CoreWidgetRegistry,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {newDraft} from "../draft";

import {draftDocument} from "./draft-document";

const DRAFT = newDraft({
    itemId: "d1",
    item: generateTestPerseusItem({
        question: generateTestPerseusRenderer({content: "Find $\\sqrt{2}$."}),
    }),
    change: "Created",
    now: new Date("2026-01-01T00:00:00Z"),
});

describe("draftDocument", () => {
    beforeAll(() => {
        CoreWidgetRegistry.registerCoreWidgets();
    });

    it("builds a draft's document as a published item's, from its exercises", () => {
        // Arrange
        const exercises = [
            {
                exerciseId: "e1",
                name: "Roots",
                problemType: "Type 1",
                publishedId: "x1",
            },
            {exerciseId: "e2", name: "Practice", problemType: null},
        ];

        // Act
        const document = draftDocument(
            DRAFT,
            exercises,
            undefined,
            (tex) => `read ${tex}`,
        );

        // Assert
        expect(document).toMatchObject({
            id: "draft-d1",
            kind: "item",
            contentId: "d1",
            title: ["Roots", "Practice"],
            exerciseId: ["e1", "e2"],
            problemType: ["Type 1"],
            listed: true,
            math: ["\\sqrt{2}"],
            mathSpeech: ["read \\sqrt{2}"],
            publishedId: "x1",
            course: [],
        });
    });

    it("takes its place in the tree from what it was imported from", () => {
        // Arrange
        const placement = {
            domain: ["math"],
            domainTitle: ["Math"],
            course: ["algebra"],
            courseTitle: ["Algebra"],
            unit: [],
            unitTitle: [],
            lesson: [],
            lessonTitle: [],
        };

        // Act
        const document = draftDocument(DRAFT, [], placement);

        // Assert
        expect(document).toMatchObject({course: ["algebra"], mathSpeech: []});
    });
});
