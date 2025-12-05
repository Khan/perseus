import {
    getExpressionWidget,
    getLegacyExpressionWidget,
    getTestDropdownWidget,
} from "./util/test-helpers";
import {emptyWidgetsFunctional, validateUserInput} from "./validate";

import type {PerseusWidgetsMap, UserInputMap} from "@khanacademy/perseus-core";

describe("validateUserInput", () => {
    it("should return null if no widgets are invalid", () => {
        // Act
        const score = validateUserInput(
            {
                content: "[[☃ dropdown 1]] [[☃ dropdown 2]]",
                widgets: {
                    "dropdown 1": getTestDropdownWidget(),
                    "dropdown 2": getTestDropdownWidget(),
                },
                images: {},
            },
            {
                "dropdown 1": {value: 1},
                "dropdown 2": {value: 1},
            },
            "en",
        );

        // Assert
        expect(score).toBeNull();
    });

    it("returns a score of 'invalid' if some widgets are missing from the user input", () => {
        // Arrange:
        const item = {
            content: "[[☃ dropdown 1]]",
            widgets: {"dropdown 1": getTestDropdownWidget()},
            images: {},
        };
        const userInputMap = {};

        // Act:
        const score = validateUserInput(item, userInputMap, "en");

        // Assert:
        expect(score).toHaveInvalidInput();
        expect(score).toEqual({type: "invalid", message: null});
    });

    it("should return invalid if any widget is unanswered", () => {
        // Act
        const score = validateUserInput(
            {
                content: "[[☃ dropdown 1]] [[☃ dropdown 2]]",
                widgets: {
                    "dropdown 1": getTestDropdownWidget(),
                    "dropdown 2": getTestDropdownWidget(),
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

    it("should ignore widgets that aren't referenced in content", () => {
        const score = validateUserInput(
            {
                content: "[[☃ dropdown 1]]",
                widgets: {
                    "dropdown 1": getTestDropdownWidget(),
                    "dropdown 2": getTestDropdownWidget(),
                },
                images: {},
            },
            {"dropdown 1": {value: 2}},
            "en",
        );

        expect(score).toBeNull();
    });
});

describe("emptyWidgetsFunctional", () => {
    it("returns an empty array if there are no widgets", () => {
        // Arrange / Act
        const result = emptyWidgetsFunctional({}, [], {}, "en");

        // Assert
        expect(result).toEqual([]);
    });

    it("properly identifies empty widgets", () => {
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
        const result = emptyWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result).toEqual(["dropdown 1"]);
    });

    it("does not return widget IDs that are not empty", () => {
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
        const result = emptyWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result).toEqual([]);
    });

    it("does not check for empty widgets whose IDs aren't provided", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": getTestDropdownWidget(),
        };
        const widgetIds: Array<string> = [];
        const userInputMap: UserInputMap = {
            "dropdown 1": {
                value: 0,
            },
        };

        // Act
        const result = emptyWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result).toEqual([]);
    });

    it("can properly split empty and non-empty widgets", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": getTestDropdownWidget(),
            "dropdown 2": getTestDropdownWidget(),
        };
        const widgetIds: Array<string> = ["dropdown 1", "dropdown 2"];
        const userInputMap: UserInputMap = {
            "dropdown 1": {
                value: 0,
            },
            "dropdown 2": {
                value: 1,
            },
        };

        // Act
        const result = emptyWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result).toEqual(["dropdown 1"]);
    });

    it("properly identifies groups with empty widgets", () => {
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
        const result = emptyWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result).toEqual(["group 1"]);
    });

    it("does not return group ID when its widgets are non-empty", () => {
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
        const result = emptyWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result).toEqual([]);
    });

    it("handles an empty modern Expression widget", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "expression 1": getExpressionWidget(),
        };
        const widgetIds: Array<string> = ["expression 1"];
        const userInputMap: UserInputMap = {
            "expression 1": "",
        };

        // Act
        const result = emptyWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result).toEqual(["expression 1"]);
    });

    it("upgrades an empty legacy Expression widget", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "expression 1": getLegacyExpressionWidget() as any,
        };
        const widgetIds: Array<string> = ["expression 1"];
        const userInputMap: UserInputMap = {
            "expression 1": "",
        };

        // Act
        const result = emptyWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result).toEqual(["expression 1"]);
    });

    it("handles a non-empty modern Expression widget", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "expression 1": getExpressionWidget(),
        };
        const widgetIds: Array<string> = ["expression 1"];
        const userInputMap: UserInputMap = {
            "expression 1": "2+2",
        };

        // Act
        const result = emptyWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result).toEqual([]);
    });

    it("upgrades a non-empty legacy Expression widget", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "expression 1": getLegacyExpressionWidget() as any,
        };
        const widgetIds: Array<string> = ["expression 1"];
        const userInputMap: UserInputMap = {
            "expression 1": "2+2",
        };

        // Act
        const result = emptyWidgetsFunctional(
            widgets,
            widgetIds,
            userInputMap,
            "en",
        );

        // Assert
        expect(result).toEqual([]);
    });
});
