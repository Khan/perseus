import {
    generateDropdownOptions,
    generateDropdownWidget,
    type PerseusRenderer,
    type DropdownWidget,
    type PerseusWidgetsMap,
    type UserInputMap,
    generateInputNumberWidget,
    generateInputNumberOptions,
} from "@khanacademy/perseus-core";

import {
    scorePerseusItem,
    scorePerseusItemWithInputNumberAsNumericInput,
    scoreWidgetsFunctional,
} from "./score";
import {getExpressionWidget, getTestDropdownWidget} from "./util/test-helpers";

describe("scoreWidgetsFunctional", () => {
    it("returns an empty object when there's no widgets", () => {
        // Arrange / Act
        const result = scoreWidgetsFunctional({}, [], {}, "en");

        // Assert
        expect(result).toEqual({});
    });

    it("returns invalid if widget is unanswered", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": getTestDropdownWidget(),
        };
        const widgetIds: Array<string> = ["dropdown 1"];
        const userInputMap: UserInputMap = {
            "dropdown 1": {
                value: 0,
            },
        };

        // Act
        const result = scoreWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result["dropdown 1"]).toHaveInvalidInput();
    });

    it("can determine if a widget was answered correctly", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": getTestDropdownWidget(),
        };
        const widgetIds: Array<string> = ["dropdown 1"];
        const userInputMap: UserInputMap = {
            "dropdown 1": {
                value: 1,
            },
        };

        // Act
        const result = scoreWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result["dropdown 1"]).toHaveBeenAnsweredCorrectly();
    });

    it("can determine if a widget was answered incorrectly", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": getTestDropdownWidget(),
        };
        const widgetIds: Array<string> = ["dropdown 1"];
        const userInputMap: UserInputMap = {
            "dropdown 1": {
                value: 2,
            },
        };

        // Act
        const result = scoreWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result["dropdown 1"]).toHaveBeenAnsweredIncorrectly();
    });

    it("can handle multiple widgets", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": getTestDropdownWidget(),
            "dropdown 2": getTestDropdownWidget(),
        };
        const widgetIds: Array<string> = ["dropdown 1", "dropdown 2"];
        const userInputMap: UserInputMap = {
            "dropdown 1": {
                value: 1,
            },
            "dropdown 2": {
                value: 2,
            },
        };

        // Act
        const result = scoreWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result["dropdown 1"]).toHaveBeenAnsweredCorrectly();
        expect(result["dropdown 2"]).toHaveBeenAnsweredIncorrectly();
    });

    it("skips widgets not in widgetIds", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": getTestDropdownWidget(),
            "dropdown 2": getTestDropdownWidget(),
        };
        const widgetIds: Array<string> = ["dropdown 1"];
        const userInputMap: UserInputMap = {
            "dropdown 1": {
                value: 1,
            },
            "dropdown 2": {
                value: 2,
            },
        };

        // Act
        const result = scoreWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result["dropdown 1"]).toHaveBeenAnsweredCorrectly();
        expect(result["dropdown 2"]).toBe(undefined);
    });

    it("returns invalid if a widget in a group is unanswered", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "group 1": {
                type: "group",
                options: {
                    content: "[[☃ dropdown 1]]",
                    widgets: {
                        "dropdown 1": getTestDropdownWidget(),
                    },
                    images: {},
                },
            },
        };
        const widgetIds: Array<string> = ["group 1"];
        const userInputMap: UserInputMap = {
            "group 1": {
                "dropdown 1": {
                    value: 0,
                },
            },
        };

        // Act
        const result = scoreWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result["group 1"]).toHaveInvalidInput();
    });

    it("can score correct widget in group", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "group 1": {
                type: "group",
                options: {
                    content: "[[☃ dropdown 1]]",
                    widgets: {
                        "dropdown 1": getTestDropdownWidget(),
                    },
                    images: {},
                },
            },
        };
        const widgetIds: Array<string> = ["group 1"];
        const userInputMap: UserInputMap = {
            "group 1": {
                "dropdown 1": {
                    value: 1,
                },
            },
        };

        // Act
        const result = scoreWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result["group 1"]).toHaveBeenAnsweredCorrectly();
    });

    it("can score incorrect widget in group", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "group 1": {
                type: "group",
                options: {
                    content: "[[☃ dropdown 1]]",
                    widgets: {
                        "dropdown 1": getTestDropdownWidget(),
                    },
                    images: {},
                },
            },
        };
        const widgetIds: Array<string> = ["group 1"];
        const userInputMap: UserInputMap = {
            "group 1": {
                "dropdown 1": {
                    value: 2,
                },
            },
        };

        // Act
        const result = scoreWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result["group 1"]).toHaveBeenAnsweredIncorrectly();
    });

    it("can handle a correct modern Expression widget", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "expression 1": getExpressionWidget(),
        };
        const widgetIds: Array<string> = ["expression 1"];
        const userInputMap: UserInputMap = {
            "expression 1": "2+2",
        };

        // Act
        const result = scoreWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result["expression 1"]).toHaveBeenAnsweredCorrectly();
    });
});

function generateBasicDropdown(): DropdownWidget {
    return generateDropdownWidget({
        options: generateDropdownOptions({
            ariaLabel: "Test ARIA label",
            visibleLabel: "Test visible label",
            placeholder: "Answer me",
            choices: [
                {
                    content: "Incorrect",
                    correct: false,
                },
                {
                    content: "Correct",
                    correct: true,
                },
            ],
        }),
    });
}

describe("scorePerseusItem", () => {
    it("returns a score of 'invalid' if some widgets are missing from the user input", () => {
        // Arrange:
        const item = {
            content: "[[☃ dropdown 1]]",
            widgets: {"dropdown 1": generateBasicDropdown()},
            images: {},
        };
        const userInputMap = {};

        // Act:
        const score = scorePerseusItem(item, userInputMap, "en");

        // Assert:
        expect(score).toHaveInvalidInput();
        expect(score).toEqual({type: "invalid", message: null});
    });

    it("should return empty if any validator returns empty", () => {
        // Act
        const score = scorePerseusItem(
            {
                content: "[[☃ dropdown 1]] [[☃ dropdown 2]]",
                widgets: {
                    "dropdown 1": generateBasicDropdown(),
                    "dropdown 2": generateBasicDropdown(),
                },
                images: {},
            },
            {
                "dropdown 1": {value: 0},
                "dropdown 2": {value: 1},
            },
            "en",
        );

        // Assert
        expect(score).toHaveInvalidInput();
        expect(score).toEqual({type: "invalid", message: null});
    });

    it("should score item if all validators return null", () => {
        // Arrange

        // Act
        const score = scorePerseusItem(
            {
                content: "[[☃ dropdown 1]] [[☃ dropdown 2]]",
                widgets: {
                    "dropdown 1": generateBasicDropdown(),
                    "dropdown 2": generateBasicDropdown(),
                },
                images: {},
            },
            {
                "dropdown 1": {value: 2},
                "dropdown 2": {value: 2},
            },
            "en",
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
        expect(score).toEqual({
            type: "points",
            total: 2,
            earned: 2,
            message: null,
        });
    });

    it("should return correct, with no points earned, if widget is static", () => {
        const json = {
            content: "[[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": generateBasicDropdown(),
            },
            images: {},
        };
        json.widgets["dropdown 1"].static = true;
        const score = scorePerseusItem(json, {"dropdown 1": {value: 2}}, "en");

        expect(score).toHaveBeenAnsweredCorrectly({
            shouldHavePoints: false,
        });
    });

    it("should ignore widgets that aren't referenced in content", () => {
        const score = scorePerseusItem(
            {
                content: "[[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": generateBasicDropdown(),
                    "dropdown 2": generateBasicDropdown(),
                },
                images: {},
            },
            {
                // valid input
                "dropdown 1": {value: 2},
                // "empty" input on a widget not in content
                // this would return "incorrect" if it were in content
                "dropdown 2": {value: 1},
            },
            "en",
        );

        expect(score).toHaveBeenAnsweredCorrectly({
            shouldHavePoints: true,
        });
    });

    it("doesn't ignore scoring when graded is true", () => {
        const ungraded = generateBasicDropdown();
        ungraded.graded = true;
        const graded = generateBasicDropdown();
        graded.graded = true;

        const item: PerseusRenderer = {
            content: "[[☃ dropdown 1]]\n[[☃ dropdown 2]]",
            widgets: {
                "dropdown 1": ungraded,
                "dropdown 2": graded,
            },
            images: {},
        };

        const userInputMap: UserInputMap = {
            "dropdown 1": {
                value: 1, // incorrect
            },
            "dropdown 2": {
                value: 2, // correct
            },
        };

        const score = scorePerseusItem(item, userInputMap, "en");

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("ignores scoring when graded is false", () => {
        const ungraded = generateBasicDropdown();
        ungraded.graded = false;
        const graded = generateBasicDropdown();
        graded.graded = true;

        const item: PerseusRenderer = {
            content: "[[☃ dropdown 1]]\n[[☃ dropdown 2]]",
            widgets: {
                "dropdown 1": ungraded,
                "dropdown 2": graded,
            },
            images: {},
        };

        const userInputMap: UserInputMap = {
            "dropdown 1": {
                value: 1, // incorrect
            },
            "dropdown 2": {
                value: 2, // correct
            },
        };

        const score = scorePerseusItem(item, userInputMap, "en");

        expect(score).toHaveBeenAnsweredCorrectly({
            shouldHavePoints: true,
        });
    });
});

describe("scorePerseusItemWithInputNumberAsNumericInput", () => {
    it("scores a correctly-answered input-number widget", () => {
        const renderer = {
            content: "[[☃ input-number 1]]",
            widgets: {
                "input-number 1": generateInputNumberWidget({
                    options: generateInputNumberOptions({value: "42"}),
                }),
            },
            images: {},
        };

        const userInputMap = {
            "input-number 1": {
                currentValue: "42",
            },
        };

        const score = scorePerseusItemWithInputNumberAsNumericInput(
            renderer,
            userInputMap,
            "en",
        );

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("scores an incorrectly-answered input-number widget", () => {
        const renderer = {
            content: "[[☃ input-number 1]]",
            widgets: {
                "input-number 1": generateInputNumberWidget({
                    options: generateInputNumberOptions({value: "42"}),
                }),
            },
            images: {},
        };

        const userInputMap = {
            "input-number 1": {
                currentValue: "99",
            },
        };

        const score = scorePerseusItemWithInputNumberAsNumericInput(
            renderer,
            userInputMap,
            "en",
        );

        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it("scores an empty input-number widget", () => {
        const renderer = {
            content: "[[☃ input-number 1]]",
            widgets: {
                "input-number 1": generateInputNumberWidget({
                    options: generateInputNumberOptions({value: "42"}),
                }),
            },
            images: {},
        };

        const userInputMap = {
            "input-number 1": {
                currentValue: "",
            },
        };

        const score = scorePerseusItemWithInputNumberAsNumericInput(
            renderer,
            userInputMap,
            "en",
        );

        expect(score).toHaveInvalidInput();
    });

    it("ignores an input-number widget that does not have a placeholder in the content string", () => {
        const renderer = {
            content: "",
            widgets: {
                "input-number 1": generateInputNumberWidget({
                    options: generateInputNumberOptions({value: "42"}),
                }),
            },
            images: {},
        };

        const userInputMap = {
            "input-number 1": {
                currentValue: "",
            },
        };

        const score = scorePerseusItemWithInputNumberAsNumericInput(
            renderer,
            userInputMap,
            "en",
        );

        expect(score).toHaveBeenAnsweredCorrectly({shouldHavePoints: false});
    });

    it("ignores an input-number widget that is not graded", () => {
        const renderer = {
            content: "[[☃ input-number 1]]",
            widgets: {
                "input-number 1": generateInputNumberWidget({
                    graded: false,
                    options: generateInputNumberOptions({value: "42"}),
                }),
            },
            images: {},
        };

        const userInputMap = {
            "input-number 1": {
                currentValue: "",
            },
        };

        const score = scorePerseusItemWithInputNumberAsNumericInput(
            renderer,
            userInputMap,
            "en",
        );

        expect(score).toHaveBeenAnsweredCorrectly({shouldHavePoints: false});
    });

    it("scores correctly-answered widgets other than input-number", () => {
        const renderer = {
            content: "[[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": generateDropdownWidget({
                    options: generateDropdownOptions({
                        choices: [{content: "A", correct: true}],
                    }),
                }),
            },
            images: {},
        };

        const userInputMap: UserInputMap = {
            "dropdown 1": {
                value: 1,
            },
        };

        const score = scorePerseusItemWithInputNumberAsNumericInput(
            renderer,
            userInputMap,
            "en",
        );

        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("scores incorrectly-answered widgets other than input-number", () => {
        const renderer = {
            content: "[[☃ dropdown 1]]",
            widgets: {
                "dropdown 1": generateDropdownWidget({
                    options: generateDropdownOptions({
                        choices: [
                            {content: "A", correct: true},
                            {content: "B", correct: false},
                        ],
                    }),
                }),
            },
            images: {},
        };

        const userInputMap: UserInputMap = {
            "dropdown 1": {
                value: 2,
            },
        };

        const score = scorePerseusItemWithInputNumberAsNumericInput(
            renderer,
            userInputMap,
            "en",
        );

        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
