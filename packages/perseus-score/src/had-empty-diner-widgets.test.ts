import {
    generateDropdownOptions,
    generateDropdownWidget,
    generateExpressionAnswerForm,
    generateExpressionOptions,
    generateExpressionWidget,
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    type PerseusRenderer,
    type UserInputMap,
} from "@khanacademy/perseus-core";

import hasEmptyDINERWidgets from "./has-empty-diner-widgets";

function generateBasicDropdownQuestion(): PerseusRenderer {
    return generateTestPerseusRenderer({
        content: "[[☃ dropdown 1]]",
        widgets: {
            "dropdown 1": generateDropdownWidget({
                options: generateDropdownOptions({
                    choices: [
                        {
                            content: "Correct",
                            correct: true,
                        },
                        {
                            content: "Incorrect",
                            correct: false,
                        },
                    ],
                    placeholder: "Pick one",
                }),
            }),
        },
        images: {},
    });
}

function generateBasicNumericInputQuestion(): PerseusRenderer {
    return generateTestPerseusRenderer({
        content: "[[☃ numeric-input 1]]",
        widgets: {
            "numeric-input 1": generateNumericInputWidget({
                options: generateNumericInputOptions({
                    answers: [
                        generateNumericInputAnswer({
                            value: 42,
                            message: "This is correct",
                            simplify: "optional",
                        }),
                    ],
                }),
            }),
        },
    });
}

function generateBasicExpressionQuestion(): PerseusRenderer {
    return generateTestPerseusRenderer({
        content: "[[☃ expression 1]]",
        widgets: {
            "expression 1": generateExpressionWidget({
                options: generateExpressionOptions({
                    answerForms: [
                        generateExpressionAnswerForm({
                            value: "42",
                            considered: "correct",
                        }),
                    ],
                    functions: [],
                }),
            }),
        },
    });
}

function generateBasicRadioQuestion(): PerseusRenderer {
    return {
        content: "[[☃ radio 1]]",
        widgets: {
            "radio 1": {
                type: "radio",
                options: {
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content: "Correct",
                            correct: true,
                        },
                        {
                            id: "1-1-1-1-1",
                            content: "Incorrect",
                            correct: false,
                        },
                    ],
                },
            },
        },
        images: {},
    };
}

describe(`hasEmptyDINERWidgets`, () => {
    it("passes an answered dropdown", () => {
        const question = generateBasicDropdownQuestion();

        const userInput: UserInputMap = {
            "dropdown 1": {
                value: 1,
            },
        };

        expect(
            hasEmptyDINERWidgets(
                generateTestPerseusItem({question}),
                userInput,
            ),
        ).toBe(false);
    });

    it("fails an unanswered dropdown", () => {
        const question = generateBasicDropdownQuestion();

        const userInput: UserInputMap = {
            "dropdown 1": {
                value: 0,
            },
        };

        expect(
            hasEmptyDINERWidgets(
                generateTestPerseusItem({question}),
                userInput,
            ),
        ).toBe(true);
    });

    it("passes any interactive graph", () => {
        // No point in making a whole bunch of data
        // IG doesn't do client-side validation
        const question: any = {
            question: {
                content: "[[☃ interactive-graph 1]]",
                widgets: {
                    "interactive-graph 1": {},
                },
            },
        };

        const userInput: UserInputMap = {};

        expect(hasEmptyDINERWidgets(question, userInput)).toBe(false);
    });

    it("passes an answered numeric-input", () => {
        const question = generateBasicNumericInputQuestion();

        const userInput: UserInputMap = {
            "numeric-input 1": {
                currentValue: "42",
            },
        };

        expect(
            hasEmptyDINERWidgets(
                generateTestPerseusItem({question}),
                userInput,
            ),
        ).toBe(false);
    });

    it("fails an unanswered numeric-input", () => {
        const question = generateBasicNumericInputQuestion();

        const userInput: UserInputMap = {
            "numeric-input 1": {
                currentValue: "",
            },
        };

        expect(
            hasEmptyDINERWidgets(
                generateTestPerseusItem({question}),
                userInput,
            ),
        ).toBe(true);
    });

    it("passes an unanswered numeric-input (coefficient edge case)", () => {
        const question = generateBasicNumericInputQuestion();
        question.widgets["numeric-input 1"].options.coefficient = true;

        const userInput: UserInputMap = {
            "numeric-input 1": {
                // When coefficient is true and there's an answer of `1`
                // an empty string is a valid answer
                currentValue: "",
            },
        };

        expect(
            hasEmptyDINERWidgets(
                generateTestPerseusItem({question}),
                userInput,
            ),
        ).toBe(false);
    });

    it("passes an answered numeric-input (coefficient edge case)", () => {
        const question = generateBasicNumericInputQuestion();
        question.widgets["numeric-input 1"].options.coefficient = true;

        const userInput: UserInputMap = {
            "numeric-input 1": {
                currentValue: "42",
            },
        };

        expect(
            hasEmptyDINERWidgets(
                generateTestPerseusItem({question}),
                userInput,
            ),
        ).toBe(false);
    });

    it("passes an answered expression", () => {
        const question = generateBasicExpressionQuestion();

        const userInput: UserInputMap = {
            "expression 1": "42",
        };

        expect(
            hasEmptyDINERWidgets(
                generateTestPerseusItem({question}),
                userInput,
            ),
        ).toBe(false);
    });

    it("fails an unanswered expression", () => {
        const question = generateBasicExpressionQuestion();

        const userInput: UserInputMap = {
            "expression 1": "",
        };

        expect(
            hasEmptyDINERWidgets(
                generateTestPerseusItem({question}),
                userInput,
            ),
        ).toBe(true);
    });

    it("passes an answered radio", () => {
        const question = generateBasicRadioQuestion();

        const userInput: UserInputMap = {
            "radio 1": {
                selectedChoiceIds: ["1-2-3-4-5"],
            },
        };

        expect(
            hasEmptyDINERWidgets(
                generateTestPerseusItem({question}),
                userInput,
            ),
        ).toBe(false);
    });

    it("fails an unanswered radio", () => {
        const question = generateBasicRadioQuestion();

        const userInput: UserInputMap = {
            "radio 1": {
                selectedChoiceIds: [],
            },
        };

        expect(
            hasEmptyDINERWidgets(
                generateTestPerseusItem({question}),
                userInput,
            ),
        ).toBe(true);
    });
});
