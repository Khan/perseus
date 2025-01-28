import {scorePerseusItem} from "@khanacademy/perseus-score";
import {act, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";

import {question1} from "./__testdata__/renderer.testdata";
import * as Dependencies from "./dependencies";
import {registerAllWidgetsForTesting} from "./util/register-all-widgets-for-testing";
import {renderQuestion} from "./widgets/__testutils__/renderQuestion";
import DropdownWidgetExport from "./widgets/dropdown";

import type {UserEvent} from "@testing-library/user-event";

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
                // 1st call - Empty
                .mockReturnValueOnce({
                    type: "invalid",
                    message: null,
                })
                // 2nd call - Not empty
                .mockReturnValueOnce(null);
            const scoringSpy = jest
                .spyOn(DropdownWidgetExport, "scorer")
                .mockReturnValueOnce({type: "points", total: 1, earned: 1});

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

                "en",
            );

            // Assert
            expect(validatorSpy).toHaveBeenCalledTimes(2);
            // Scoring is only called if validation passes
            expect(scoringSpy).toHaveBeenCalledTimes(1);
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
            const score = scorePerseusItem(question1, userInput, "en");

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });
    });
});
