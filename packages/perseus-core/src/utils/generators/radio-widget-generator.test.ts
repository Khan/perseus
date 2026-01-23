import {
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
    generateSimpleRadioItem,
    generateSimpleRadioQuestion,
} from "./radio-widget-generator";

import type {PerseusRadioWidgetOptions} from "../../data-schema";

describe("generateRadioOptions", () => {
    it("builds a default radio options", () => {
        // Arrange, Act
        const options = generateRadioOptions();

        // Assert
        expect(options.choices).toEqual([
            {content: "", id: "radio-choice-0"},
            {content: "", id: "radio-choice-1"},
            {content: "", id: "radio-choice-2"},
            {content: "", id: "radio-choice-3"},
        ]);
        expect(options.randomize).toBe(false);
        expect(options.hasNoneOfTheAbove).toBe(false);
        expect(options.multipleSelect).toBe(false);
        expect(options.countChoices).toBe(false);
        expect(options.deselectEnabled).toBe(false);
    });

    it("builds a radio options with all props", () => {
        // Arrange, Act
        const options = generateRadioOptions({
            choices: [{content: "choice 1", id: "choice-1"}],
            randomize: true,
            hasNoneOfTheAbove: true,
            multipleSelect: true,
            countChoices: true,
            deselectEnabled: true,
        });

        // Assert
        expect(options.choices).toEqual([
            {content: "choice 1", id: "choice-1"},
        ]);
        expect(options.randomize).toBe(true);
        expect(options.hasNoneOfTheAbove).toBe(true);
        expect(options.multipleSelect).toBe(true);
        expect(options.countChoices).toBe(true);
        expect(options.deselectEnabled).toBe(true);
    });
});

describe("generateRadioWidget", () => {
    it("builds a default radio widget", () => {
        // Arrange, Act
        const widget = generateRadioWidget();

        // Assert
        expect(widget.type).toBe("radio");
        expect(widget.graded).toBe(true);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.static).toBe(false);
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            choices: [
                {content: "", id: "radio-choice-0"},
                {content: "", id: "radio-choice-1"},
                {content: "", id: "radio-choice-2"},
                {content: "", id: "radio-choice-3"},
            ],
            randomize: false,
            hasNoneOfTheAbove: false,
            multipleSelect: false,
            countChoices: false,
            deselectEnabled: false,
        });
    });

    it("builds a radio widget with all props", () => {
        // Arrange, Act
        const widget = generateRadioWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: {
                choices: [{content: "choice 1", id: "choice-1"}],
                randomize: true,
                hasNoneOfTheAbove: true,
                multipleSelect: true,
                countChoices: true,
                deselectEnabled: true,
            },
        });

        // Assert
        expect(widget.graded).toBe(false);
        expect(widget.version).toEqual({major: 1, minor: 0});
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            choices: [{content: "choice 1", id: "choice-1"}],
            randomize: true,
            hasNoneOfTheAbove: true,
            multipleSelect: true,
            countChoices: true,
            deselectEnabled: true,
        });
    });

    it("adds options when option builder is used", () => {
        // Arrange, Act
        const widget = generateRadioWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: generateRadioOptions({
                choices: [{content: "choice 1", id: "choice-1"}],
                randomize: true,
                hasNoneOfTheAbove: true,
                multipleSelect: true,
                countChoices: true,
                deselectEnabled: true,
            }),
        });

        // Assert
        expect(widget.graded).toBe(false);
        expect(widget.version).toEqual({major: 1, minor: 0});
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            choices: [{content: "choice 1", id: "choice-1"}],
            randomize: true,
            hasNoneOfTheAbove: true,
            multipleSelect: true,
            countChoices: true,
            deselectEnabled: true,
        });
    });
});

describe("generateRadioChoice", () => {
    it("builds a default radio choice", () => {
        // Arrange, Act
        const choice = generateRadioChoice("");

        // Assert
        expect(choice.content).toBe("");
        // Using regex because the id is generated randomly
        expect(choice.id).toMatch(/radio-choice-\d+/);
        expect(choice.correct).toBe(false);
    });

    it("builds a radio choice with all props", () => {
        // Arrange, Act
        const choice = generateRadioChoice("choice 1", {
            correct: true,
            id: "choice-1",
            rationale: "test-rationale",
            isNoneOfTheAbove: true,
        });

        // Assert
        expect(choice.content).toBe("choice 1");
        expect(choice.id).toBe("choice-1");
        expect(choice.correct).toBe(true);
        expect(choice.rationale).toBe("test-rationale");
        expect(choice.isNoneOfTheAbove).toBe(true);
    });
});

describe("generateSimpleRadioQuestion", () => {
    it("builds a default simple radio question", () => {
        // Arrange, Act
        const question = generateSimpleRadioQuestion();

        // Assert
        expect(question.content).toBe("[[☃ radio 1]]");
        expect(question.widgets).toEqual({
            "radio 1": generateRadioWidget(),
        });
    });

    it("builds a simple radio question with all props", () => {
        // Arrange, Act
        const options: PerseusRadioWidgetOptions = {
            choices: [
                {
                    content: "choice 1",
                    correct: true,
                    id: "choice-1",
                },
            ],
            randomize: true,
            hasNoneOfTheAbove: true,
            multipleSelect: true,
            countChoices: true,
            deselectEnabled: true,
            numCorrect: 1,
        };

        const question = generateSimpleRadioQuestion(options);

        // Assert
        expect(question).toEqual({
            content: "[[☃ radio 1]]",
            images: {},
            widgets: {
                "radio 1": {
                    type: "radio",
                    static: false,
                    graded: true,
                    version: {major: 0, minor: 0},
                    alignment: "default",
                    options: options,
                },
            },
        });
    });
});

describe("generateSimpleRadioItem", () => {
    it("builds a default simple radio item", () => {
        // Arrange, Act
        const item = generateSimpleRadioItem();

        // Assert
        expect(item).toEqual({
            question: generateSimpleRadioQuestion(),
            hints: [],
            answerArea: {
                calculator: false,
                periodicTable: false,
                financialCalculatorMonthlyPayment: false,
                financialCalculatorTotalAmount: false,
                financialCalculatorTimeToPayOff: false,
                periodicTableWithKey: false,
            },
        });
    });

    it("builds a simple radio item with all props", () => {
        // Arrange, Act
        const options: PerseusRadioWidgetOptions = {
            choices: [
                {
                    content: "choice 1",
                    correct: true,
                    id: "choice-1",
                },
            ],
            randomize: true,
            hasNoneOfTheAbove: true,
            multipleSelect: true,
            countChoices: true,
            deselectEnabled: true,
            numCorrect: 1,
        };

        const item = generateSimpleRadioItem(options);

        // Assert
        expect(item).toEqual({
            question: {
                content: "[[☃ radio 1]]",
                images: {},
                widgets: {
                    "radio 1": {
                        type: "radio",
                        static: false,
                        graded: true,
                        version: {major: 0, minor: 0},
                        alignment: "default",
                        options: options,
                    },
                },
            },
            hints: [],
            answerArea: {
                calculator: false,
                periodicTable: false,
                financialCalculatorMonthlyPayment: false,
                financialCalculatorTotalAmount: false,
                financialCalculatorTimeToPayOff: false,
                periodicTableWithKey: false,
            },
        });
    });
});
