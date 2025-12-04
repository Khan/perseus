import {
    type DropdownWidget,
    type PerseusWidgetsMap,
    type UserInputMap,
} from "@khanacademy/perseus-core";

import {flattenScores, scorePerseusItem, scoreWidgetsFunctional} from "./score";
import {getExpressionWidget, getTestDropdownWidget} from "./util/test-helpers";

describe("flattenScores", () => {
    it("defaults to an empty score", () => {
        const result = flattenScores({});

        expect(result).toHaveBeenAnsweredCorrectly({shouldHavePoints: false});
        expect(result).toEqual({
            type: "points",
            total: 0,
            earned: 0,
            message: null,
        });
    });

    it("defaults to single score if there is only one", () => {
        const result = flattenScores({
            "radio 1": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
        });

        expect(result).toHaveBeenAnsweredCorrectly();
        expect(result).toEqual({
            type: "points",
            total: 1,
            earned: 1,
            message: null,
        });
    });

    it("returns an invalid score if any are invalid", () => {
        const result = flattenScores({
            "radio 1": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
            "radio 2": {
                type: "invalid",
                message: null,
            },
        });

        expect(result).toHaveInvalidInput();
        expect(result).toEqual({
            type: "invalid",
            message: null,
        });
    });

    it("tallies scores if multiple widgets have points", () => {
        const result = flattenScores({
            "radio 1": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
            "radio 2": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
            "radio 3": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
        });

        expect(result).toHaveBeenAnsweredCorrectly();
        expect(result).toEqual({
            type: "points",
            total: 3,
            earned: 3,
            message: null,
        });
    });

    it("doesn't count incorrect widgets", () => {
        const result = flattenScores({
            "radio 1": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
            "radio 2": {
                type: "points",
                total: 1,
                earned: 1,
                message: null,
            },
            "radio 3": {
                type: "points",
                total: 1,
                earned: 0,
                message: null,
            },
        });

        expect(result).toEqual({
            type: "points",
            total: 3,
            earned: 2,
            message: null,
        });
    });
});

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

function generateDropdown(): DropdownWidget {
    return {
        type: "dropdown",
        alignment: "default",
        static: false,
        graded: true,
        options: {
            static: false,
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
        },
        version: {
            major: 0,
            minor: 0,
        },
    };
}

describe("scorePerseusItem", () => {
    it("returns a score of 'invalid' if some widgets are missing from the user input", () => {
        // Arrange:
        const item = {
            content: "[[☃ dropdown 1]]",
            widgets: {"dropdown 1": generateDropdown()},
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
                    "dropdown 1": generateDropdown(),
                    "dropdown 2": generateDropdown(),
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
                    "dropdown 1": generateDropdown(),
                    "dropdown 2": generateDropdown(),
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
                "dropdown 1": generateDropdown(),
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
                    "dropdown 1": generateDropdown(),
                    "dropdown 2": generateDropdown(),
                },
                images: {},
            },
            {"dropdown 1": {value: 2}},
            "en",
        );

        expect(score).toHaveBeenAnsweredCorrectly({
            shouldHavePoints: true,
        });
    });
});
