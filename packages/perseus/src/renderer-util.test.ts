import {emptyWidgetsFunctional, scoreWidgetsFunctional} from "./renderer-util";
import {mockStrings} from "./strings";
import {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing";

import type {DropdownWidget, PerseusWidgetsMap} from "./perseus-types";
import type {UserInputMap} from "./validation.types";

const testDropdownWidget: DropdownWidget = {
    type: "dropdown",
    options: {
        ariaLabel: "",
        choices: [
            {
                content: "Test choice 1",
                correct: true,
            },
            {
                content: "Test choice 2",
                correct: false,
            },
        ],
        placeholder: "Test placeholder",
        static: false,
    },
};

describe("emptyWidgetsFunctional", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    it("returns an empty array if there are no widgets", () => {
        // Arrange / Act
        const result = emptyWidgetsFunctional({}, [], {}, mockStrings, "en");

        // Assert
        expect(result).toEqual([]);
    });

    it("properly identifies empty widgets", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": testDropdownWidget,
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
            mockStrings,
            "en",
        );

        // Assert
        expect(result).toEqual(["dropdown 1"]);
    });

    it("does not return widget IDs that are not empty", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": testDropdownWidget,
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
            mockStrings,
            "en",
        );

        // Assert
        expect(result).toEqual([]);
    });

    it("does not check for empty widgets whose IDs aren't provided", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": testDropdownWidget,
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
            mockStrings,
            "en",
        );

        // Assert
        expect(result).toEqual([]);
    });

    it("can properly split empty and non-empty widgets", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": testDropdownWidget,
            "dropdown 2": testDropdownWidget,
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
            mockStrings,
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
                        "dropdown 1": testDropdownWidget,
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
            mockStrings,
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
                        "dropdown 1": testDropdownWidget,
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
            mockStrings,
            "en",
        );

        // Assert
        expect(result).toEqual([]);
    });
});

describe("scoreWidgetsFunctional", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    it("returns an empty object when there's no widgets", () => {
        // Arrange / Act
        const result = scoreWidgetsFunctional({}, [], {}, mockStrings, "en");

        // Assert
        expect(result).toEqual({});
    });

    it("returns invalid if widget is unanswered", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": testDropdownWidget,
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
            mockStrings,
            "en",
        );

        // Assert
        expect(result["dropdown 1"]).toHaveInvalidInput();
    });

    it("can determine if a widget was answered correctly", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": testDropdownWidget,
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
            mockStrings,
            "en",
        );

        // Assert
        expect(result["dropdown 1"]).toHaveBeenAnsweredCorrectly();
    });

    it("can determine if a widget was answered incorrectly", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": testDropdownWidget,
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
            mockStrings,
            "en",
        );

        // Assert
        expect(result["dropdown 1"]).toHaveBeenAnsweredIncorrectly();
    });

    it("can handle multiple widgets", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": testDropdownWidget,
            "dropdown 2": testDropdownWidget,
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
            mockStrings,
            "en",
        );

        // Assert
        expect(result["dropdown 1"]).toHaveBeenAnsweredCorrectly();
        expect(result["dropdown 2"]).toHaveBeenAnsweredIncorrectly();
    });

    it("skips widgets not in widgetIds", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "dropdown 1": testDropdownWidget,
            "dropdown 2": testDropdownWidget,
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
            mockStrings,
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
                        "dropdown 1": testDropdownWidget,
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
            mockStrings,
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
                        "dropdown 1": testDropdownWidget,
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
            mockStrings,
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
                        "dropdown 1": testDropdownWidget,
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
            mockStrings,
            "en",
        );

        // Assert
        expect(result["group 1"]).toHaveBeenAnsweredIncorrectly();
    });
});
