import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";

import {question1} from "./__testdata__/renderer.testdata";
import * as Dependencies from "./dependencies";
import {
    emptyWidgetsFunctional,
    scorePerseusItem,
    scoreWidgetsFunctional,
} from "./renderer-util";
import {mockStrings} from "./strings";
import {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing";
import {renderQuestion} from "./widgets/__testutils__/renderQuestion";
import DropdownWidgetExport from "./widgets/dropdown";

import type {UserInputMap} from "./validation.types";
import type {
    DropdownWidget,
    ExpressionWidget,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

function getTestDropdownWidget(): DropdownWidget {
    return {
        type: "dropdown",
        options: {
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
}

function getExpressionWidget(): ExpressionWidget {
    return {
        type: "expression",
        version: {major: 1, minor: 0},
        options: {
            times: false,
            buttonSets: ["basic"],
            functions: [],
            answerForms: [
                {
                    form: false,
                    simplify: false,
                    value: "2+2",
                    considered: "correct",
                },
            ],
        },
    };
}

function getLegacyExpressionWidget() {
    return {
        type: "expression",
        options: {
            times: false,
            buttonSets: ["basic"],
            functions: [],
            form: false,
            simplify: false,
            value: "2+2",
        },
    };
}

describe("renderer utils", () => {
    beforeAll(() => {
        registerAllWidgetsForTesting();
    });

    beforeEach(() => {
        jest.spyOn(testDependenciesV2.analytics, "onAnalyticsEvent");
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.spyOn(Dependencies, "useDependencies").mockReturnValue(
            testDependenciesV2,
        );
        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    describe("emptyWidgetsFunctional", () => {
        it("returns an empty array if there are no widgets", () => {
            // Arrange / Act
            const result = emptyWidgetsFunctional(
                {},
                [],
                {},
                mockStrings,
                "en",
            );

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
                mockStrings,
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
                mockStrings,
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
                mockStrings,
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
                mockStrings,
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
                mockStrings,
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
                mockStrings,
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
                mockStrings,
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
                mockStrings,
                "en",
            );

            // Assert
            expect(result).toEqual([]);
        });
    });

    describe("scoreWidgetsFunctional", () => {
        it("returns an empty object when there's no widgets", () => {
            // Arrange / Act
            const result = scoreWidgetsFunctional(
                {},
                [],
                {},
                mockStrings,
                "en",
            );

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
                mockStrings,
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
                mockStrings,
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
                mockStrings,
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
                mockStrings,
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
                mockStrings,
                "en",
            );

            // Assert
            expect(result["expression 1"]).toHaveBeenAnsweredCorrectly();
        });

        it("can handle a correct legacy Expression widget", () => {
            // Arrange
            const widgets: PerseusWidgetsMap = {
                "expression 1": getLegacyExpressionWidget() as any,
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
                mockStrings,
                "en",
            );

            // Assert
            expect(result["expression 1"]).toHaveBeenAnsweredCorrectly();
        });

        it("can handle an incorrect modern Expression widget", () => {
            // Arrange
            const widgets: PerseusWidgetsMap = {
                "expression 1": getExpressionWidget(),
            };
            const widgetIds: Array<string> = ["expression 1"];
            const userInputMap: UserInputMap = {
                "expression 1": "2+42",
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
            expect(result["expression 1"]).toHaveBeenAnsweredIncorrectly();
        });

        it("can handle an incorrect legacy Expression widget", () => {
            // Arrange
            const widgets: PerseusWidgetsMap = {
                "expression 1": getLegacyExpressionWidget() as any,
            };
            const widgetIds: Array<string> = ["expression 1"];
            const userInputMap: UserInputMap = {
                "expression 1": "2+42",
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
            expect(result["expression 1"]).toHaveBeenAnsweredIncorrectly();
        });
    });

    describe("scorePerseusItem", () => {
        let userEvent: UserEvent;
        beforeEach(() => {
            userEvent = userEventLib.setup({
                advanceTimers: jest.advanceTimersByTime,
            });
        });

        it("should return empty if any validator returns empty", () => {
            // Act
            const validatorSpy = jest
                .spyOn(DropdownWidgetExport, "validator")
                // Empty
                .mockReturnValueOnce({
                    type: "invalid",
                    message: null,
                })
                // Not empty
                .mockReturnValueOnce(null);
            const scoringSpy = jest.spyOn(DropdownWidgetExport, "scorer");

            // Act
            const score = scorePerseusItem(
                {
                    content:
                        question1.content +
                        question1.content.replace("dropdown 1", "dropdown 2"),
                    widgets: {
                        "dropdown 1": question1.widgets["dropdown 1"],
                        "dropdown 2": question1.widgets["dropdown 1"],
                    },
                    images: {},
                },
                {},
                mockStrings,
                "en",
            );

            // Assert
            expect(validatorSpy).toHaveBeenCalledTimes(2);
            expect(scoringSpy).not.toHaveBeenCalled();
            expect(score).toEqual({type: "invalid", message: null});
        });

        it("should score item if all validators return null", () => {
            // Arrange
            const validatorSpy = jest
                .spyOn(DropdownWidgetExport, "validator")
                .mockReturnValue(null);
            const scoreSpy = jest
                .spyOn(DropdownWidgetExport, "scorer")
                .mockReturnValue({
                    type: "points",
                    total: 1,
                    earned: 1,
                    message: null,
                });

            // Act
            const score = scorePerseusItem(
                {
                    content:
                        question1.content +
                        question1.content.replace("dropdown 1", "dropdown 2"),
                    widgets: {
                        "dropdown 1": question1.widgets["dropdown 1"],
                        "dropdown 2": question1.widgets["dropdown 1"],
                    },
                    images: {},
                },
                {"dropdown 1": {value: 0}},
                mockStrings,
                "en",
            );

            // Assert
            expect(validatorSpy).toHaveBeenCalledTimes(2);
            expect(scoreSpy).toHaveBeenCalledTimes(2);
            expect(score).toEqual({
                type: "points",
                total: 2,
                earned: 2,
                message: null,
            });
        });

        it("should return correct, with no points earned, if widget is static", () => {
            const validatorSpy = jest.spyOn(DropdownWidgetExport, "validator");

            const score = scorePerseusItem(
                {
                    ...question1,
                    widgets: {
                        "dropdown 1": {
                            ...question1.widgets["dropdown 1"],
                            static: true,
                        },
                    },
                },
                {"dropdown 1": {value: 1}},
                mockStrings,
                "en",
            );

            expect(validatorSpy).not.toHaveBeenCalled();
            expect(score).toHaveBeenAnsweredCorrectly({
                shouldHavePoints: false,
            });
        });

        it("should ignore widgets that aren't referenced in content", () => {
            const validatorSpy = jest.spyOn(DropdownWidgetExport, "validator");
            const score = scorePerseusItem(
                {
                    content:
                        "This content references [[☃ dropdown 1]] but not dropdown 2!",
                    widgets: {
                        ...question1.widgets,
                        "dropdown 2": {
                            ...question1.widgets["dropdown 1"],
                        },
                    },
                    images: {},
                },
                {"dropdown 1": {value: 2}},
                mockStrings,
                "en",
            );

            expect(validatorSpy).toHaveBeenCalledTimes(1);
            expect(score).toHaveBeenAnsweredCorrectly({
                shouldHavePoints: true,
            });
        });

        it("should return score from contained Renderer", async () => {
            // Arrange
            const {renderer} = renderQuestion(question1);

            // Answer correctly
            await userEvent.click(screen.getByRole("combobox"));
            await act(() => jest.runOnlyPendingTimers());

            await userEvent.click(
                screen.getByRole("option", {
                    name: "less than or equal to",
                }),
            );

            // Act
            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItem(
                question1,
                userInput,
                mockStrings,
                "en",
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });
    });
});
