import {
    generateDropdownOptions,
    generateDropdownWidget,
} from "@khanacademy/perseus-core";
import invariant from "tiny-invariant";

import {
    combineScoreWithWidgetScores,
    onlyInvalidScores,
    scorePerseusItem,
    scoreWidgetsFunctional,
} from "./score";
import {getExpressionWidget, getTestDropdownWidget} from "./util/test-helpers";

import type {
    PerseusRenderer,
    DropdownWidget,
    PerseusWidgetsMap,
    UserInputMap,
} from "@khanacademy/perseus-core";

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
    });

    it("should include only invalid widget scores when overall score is invalid", () => {
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
        expect(score).toEqual({
            type: "invalid",
            message: null,
            widgetScores: {
                "dropdown 1": {type: "invalid", message: null},
            },
        });
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
            widgetScores: {
                "dropdown 1": {
                    earned: 1,
                    message: null,
                    total: 1,
                    type: "points",
                },
                "dropdown 2": {
                    earned: 1,
                    message: null,
                    total: 1,
                    type: "points",
                },
            },
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

    it("returns per-widget scores in widgetScores keyed by widget ID", () => {
        // Arrange
        const item: PerseusRenderer = {
            content: "[[☃ dropdown 1]]\n[[☃ dropdown 2]]",
            widgets: {
                "dropdown 1": generateBasicDropdown(),
                "dropdown 2": generateBasicDropdown(),
            },
            images: {},
        };
        const userInputMap: UserInputMap = {
            "dropdown 1": {value: 2}, // correct
            "dropdown 2": {value: 1}, // incorrect
        };

        // Act
        const score = scorePerseusItem(item, userInputMap, "en");

        // Assert
        invariant(score.type === "points");
        expect(score.widgetScores).toEqual({
            "dropdown 1": {
                type: "points",
                earned: 1,
                total: 1,
                message: null,
            },
            "dropdown 2": {
                type: "points",
                earned: 0,
                total: 1,
                message: null,
            },
        });
    });
});

describe("onlyInvalidScores", () => {
    it("returns an empty object when given an empty object", () => {
        expect(onlyInvalidScores({})).toStrictEqual({});
    });

    it("only includes 'invalid' scores", () => {
        expect(
            onlyInvalidScores({
                "radio 1": {type: "points", total: 1, earned: 1},
                "radio 2": {type: "invalid", message: null},
                "dropdown 1": {type: "points", total: 1, earned: 0},
                "interactive-graph 1": {type: "invalid", message: null},
            }),
        ).toStrictEqual({
            "radio 2": {type: "invalid", message: null},
            "interactive-graph 1": {type: "invalid", message: null},
        });
    });
});

describe("combineScoreWithWidgetScores", () => {
    it("should include all widgetScores when overall score is correct", () => {
        const score = combineScoreWithWidgetScores(
            {type: "points", total: 2, earned: 2},
            {
                "radio 1": {type: "points", total: 1, earned: 1},
                "radio 2": {type: "points", total: 1, earned: 1},
            },
        );

        expect(score).toStrictEqual({
            type: "points",
            total: 2,
            earned: 2,
            widgetScores: {
                "radio 1": {type: "points", total: 1, earned: 1},
                "radio 2": {type: "points", total: 1, earned: 1},
            },
        });
    });

    it("should include all widgetScores when overall score is incorrect", () => {
        const score = combineScoreWithWidgetScores(
            {type: "points", total: 2, earned: 1},
            {
                "radio 1": {type: "points", total: 1, earned: 0},
                "radio 2": {type: "points", total: 1, earned: 1},
            },
        );

        expect(score).toStrictEqual({
            type: "points",
            total: 2,
            earned: 1,
            widgetScores: {
                "radio 1": {type: "points", total: 1, earned: 0},
                "radio 2": {type: "points", total: 1, earned: 1},
            },
        });
    });

    it("should omit points scores when overall score is invalid", () => {
        const score = combineScoreWithWidgetScores(
            {type: "invalid", message: "SOME_ERROR_CODE"},
            {
                "radio 1": {type: "points", total: 1, earned: 1},
                "expression 1": {type: "invalid", message: "SOME_ERROR_CODE"},
                "radio 2": {type: "points", total: 1, earned: 1},
            },
        );

        expect(score).toStrictEqual({
            type: "invalid",
            message: "SOME_ERROR_CODE",
            widgetScores: {
                "expression 1": {type: "invalid", message: "SOME_ERROR_CODE"},
            },
        });
    });
});
