import {parseAndMigratePerseusItem} from "@khanacademy/perseus-core";
import {assertSuccess} from "@khanacademy/perseus-core/src/parse-perseus-json/result";

const item = {
    question: {
        content: "[[☃ radio 1]]",
        widgets: {
            "radio 1": {
                type: "radio",
                static: false,
                graded: true,
                alignment: "default",
                id: null,
                key: null,
                version: {major: 1, minor: 0},
                options: {
                    choices: [
                        {
                            content: "Content 1",
                            rationale: "",
                            correct: false,
                            isNoneOfTheAbove: false,
                            id: "",
                            widgets: null,
                            clue: "Clue 1",
                        },
                        {
                            content: "Content 2",
                            rationale: "",
                            correct: false,
                            isNoneOfTheAbove: false,
                            id: "",
                            widgets: null,
                            clue: "Clue 2",
                        },
                    ],
                    numCorrect: 0,
                    hasNoneOfTheAbove: false,
                    countChoices: true,
                    deselectEnabled: false,
                    randomize: false,
                    multipleSelect: false,
                    displayCount: null,
                    noneOfTheAbove: null, // <= important
                    onePerLine: null, // <= important
                },
            },
        },
        replace: null,
        metadata: null,
        images: {},
    },
};

describe("Broken Cypress", () => {
    // see: https://khanacademy.slack.com/archives/C01AZ9H8TTQ/p1750165141757919
    it("regression: should have rationales when onePerLine/noneOfTheAbove are null", async () => {
        // Arrange / Act
        const rv = parseAndMigratePerseusItem(item);

        // Assert
        assertSuccess(rv);
        expect(
            rv.value.question.widgets["radio 1"].options.choices[0].rationale,
        ).toBe("Clue 1");
        expect(
            (rv.value.question.widgets["radio 1"].options.choices[0] as any)
                .clue,
        ).toBeUndefined();
    });
});
