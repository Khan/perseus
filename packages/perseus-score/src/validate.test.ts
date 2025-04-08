import {
    getExpressionWidget,
    getLegacyExpressionWidget,
    getTestDropdownWidget,
} from "./util/test-helpers";
import {emptyWidgetsFunctional} from "./validate";

import type {UserInputMap} from "./validation.types";
import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";

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

    it("regression LEMS-3000: input with letter should be considered non-empty", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "expression 1": {
                alignment: "default",
                graded: true,
                options: {
                    answerForms: [
                        {
                            considered: "correct",
                            form: false,
                            key: "0",
                            simplify: false,
                            value: "AB",
                        },
                        {
                            considered: "correct",
                            form: false,
                            key: "1",
                            simplify: false,
                            value: "BA",
                        },
                    ],
                    ariaLabel:
                        "expression multiplied by A B equal to A C squared plus B C squared",
                    buttonSets: [
                        "basic",
                        "trig",
                        "prealgebra",
                        "scientific",
                        "basic relations",
                        "advanced relations",
                    ],
                    extraKeys: ["A", "B"],
                    functions: ["f", "g", "h"],
                    times: false,
                },
                static: false,
                type: "expression",
                version: {
                    major: 2,
                    minor: 0,
                },
            },
            "expression 2": {
                alignment: "default",
                graded: true,
                options: {
                    answerForms: [
                        {
                            considered: "correct",
                            form: false,
                            key: "0",
                            simplify: false,
                            value: "AB^{2}",
                        },
                        {
                            considered: "correct",
                            form: false,
                            key: "1",
                            simplify: false,
                            value: "BA^{2}",
                        },
                        {
                            considered: "correct",
                            form: false,
                            key: "2",
                            simplify: false,
                            value: "\\left(AB\\right)^{2}",
                        },
                        {
                            considered: "correct",
                            form: false,
                            key: "3",
                            simplify: false,
                            value: "\\left(BA\\right)^{2}",
                        },
                    ],
                    ariaLabel:
                        "expression equal to A C squared plus B C squared",
                    buttonSets: [
                        "basic",
                        "trig",
                        "prealgebra",
                        "scientific",
                        "basic relations",
                        "advanced relations",
                    ],
                    extraKeys: ["A", "B"],
                    functions: ["f", "g", "h"],
                    times: false,
                },
                static: false,
                type: "expression",
                version: {
                    major: 2,
                    minor: 0,
                },
            },
        };
        const widgetIds: Array<string> = ["expression 1", "expression 2"];
        const userInputMap: UserInputMap = {
            "expression 1": "AC",
            "expression 2": "42",
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
