import {
    generateTestPerseusItem,
    splitPerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../../../testing/test-dependencies";
import * as Dependencies from "../../../dependencies";
import {scorePerseusItemTesting} from "../../../util/test-utils";
import {renderQuestion} from "../../__testutils__/renderQuestion";
import {LabelImage, getComputedSelectedState} from "../label-image";

import {shortTextQuestion, textQuestion} from "./label-image.testdata";

import type {OptionalAnswersMarkerType} from "../label-image";
import type {
    InteractiveMarkerType,
    PerseusLabelImageUserInputMarker,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const emptyMarker: InteractiveMarkerType = {
    label: "",
    answers: [],
    x: 0,
    y: 0,
};

const emptyAnswerlessMarker: OptionalAnswersMarkerType = {
    label: "",
    x: 0,
    y: 0,
};

describe("LabelImage", function () {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        // Mocked for loading graphie in svg-image
        global.fetch = jest.fn(() =>
            Promise.resolve({
                text: () => "",
                ok: true,
            }),
        ) as jest.Mock;
    });

    describe("getComputedSelectedState", function () {
        it("should return original marker when feedback is not shown", function () {
            // Arrange
            const marker: OptionalAnswersMarkerType = {
                label: "Test marker",
                x: 50,
                y: 50,
                answers: ["Correct Answer"],
            };
            const userInputMarker: PerseusLabelImageUserInputMarker = {
                label: "Test marker",
                selected: ["User Choice"],
            };
            const reviewMode = false;
            const showSolutions = undefined;

            // Act
            const result = getComputedSelectedState(
                marker,
                userInputMarker,
                reviewMode,
                showSolutions,
            );

            // Assert - Should return unchanged since showSolutions and reviewMode are false
            expect(result).toEqual(userInputMarker);
        });

        it("should auto-select correct answers when showSolutions is 'all'", function () {
            // Arrange
            const marker: OptionalAnswersMarkerType = {
                label: "Test marker",
                x: 50,
                y: 50,
                answers: ["Answer A", "Answer B"],
            };
            const userInputMarker: PerseusLabelImageUserInputMarker = {
                label: "Test marker",
                selected: ["Answer C"],
            };
            const reviewMode = false;
            const showSolutions = "all";

            // Act
            const result = getComputedSelectedState(
                marker,
                userInputMarker,
                reviewMode,
                showSolutions,
            );

            // Assert
            expect(result).toEqual({
                ...userInputMarker,
                selected: ["Answer A", "Answer B"],
            });
        });

        it("should auto-select correct answers when reviewMode is true", function () {
            // Arrange
            const marker: OptionalAnswersMarkerType = {
                label: "Test marker",
                x: 50,
                y: 50,
                answers: ["Answer A", "Answer B"],
            };
            const userInputMarker: PerseusLabelImageUserInputMarker = {
                label: "Test marker",
                selected: ["Answer C"],
            };
            const reviewMode = true;
            const showSolutions = undefined;

            // Act
            const result = getComputedSelectedState(
                marker,
                userInputMarker,
                reviewMode,
                showSolutions,
            );

            // Assert
            expect(result).toEqual({
                ...userInputMarker,
                selected: ["Answer A", "Answer B"],
            });
        });

        it("should clear selection for answerless markers when showing feedback", function () {
            // Arrange
            const marker: OptionalAnswersMarkerType = {
                label: "Test marker",
                x: 50,
                y: 50,
                // No answers property - this is an answerless marker
            };
            const userInputMarker: PerseusLabelImageUserInputMarker = {
                label: "Test marker",
                selected: ["Some Choice"],
            };
            const reviewMode = false;
            const showSolutions = "all";

            // Act
            const result = getComputedSelectedState(
                marker,
                userInputMarker,
                reviewMode,
                showSolutions,
            );

            // Assert
            expect(result).toEqual({
                ...userInputMarker,
                selected: undefined,
            });
        });

        it("should handle markers with empty answers array", function () {
            // Arrange
            const marker: OptionalAnswersMarkerType = {
                label: "Test marker",
                x: 50,
                y: 50,
                answers: [],
            };
            const userInputMarker: PerseusLabelImageUserInputMarker = {
                label: "Test marker",
                selected: ["User Choice"],
            };
            const reviewMode = true;
            const showSolutions = undefined;

            // Act
            const result = getComputedSelectedState(
                marker,
                userInputMarker,
                reviewMode,
                showSolutions,
            );

            // Assert
            expect(result).toEqual({
                ...userInputMarker,
                selected: [],
            });
        });
    });

    describe("imageSideForMarkerPosition", function () {
        it("should return side: top", function () {
            expect(
                LabelImage.imageSideForMarkerPosition(21, 0, "NONE"),
            ).toEqual("top");
            expect(
                LabelImage.imageSideForMarkerPosition(79, 0, "NONE"),
            ).toEqual("top");
            expect(
                LabelImage.imageSideForMarkerPosition(50, 0, "NONE"),
            ).toEqual("top");
            expect(
                LabelImage.imageSideForMarkerPosition(50, 25, "NONE"),
            ).toEqual("top");
            expect(
                LabelImage.imageSideForMarkerPosition(50, 50, "NONE"),
            ).toEqual("top");
        });

        it("should return side: right", function () {
            expect(
                LabelImage.imageSideForMarkerPosition(100, 0, "NONE"),
            ).toEqual("right");
            expect(
                LabelImage.imageSideForMarkerPosition(100, 100, "NONE"),
            ).toEqual("right");
            expect(
                LabelImage.imageSideForMarkerPosition(100, 50, "NONE"),
            ).toEqual("right");
            expect(
                LabelImage.imageSideForMarkerPosition(75, 50, "NONE"),
            ).toEqual("right");
            expect(
                LabelImage.imageSideForMarkerPosition(51, 50, "NONE"),
            ).toEqual("right");
        });

        it("should return side: bottom", function () {
            expect(
                LabelImage.imageSideForMarkerPosition(21, 100, "NONE"),
            ).toEqual("bottom");
            expect(
                LabelImage.imageSideForMarkerPosition(79, 100, "NONE"),
            ).toEqual("bottom");
            expect(
                LabelImage.imageSideForMarkerPosition(50, 100, "NONE"),
            ).toEqual("bottom");
            expect(
                LabelImage.imageSideForMarkerPosition(50, 75, "NONE"),
            ).toEqual("bottom");
            expect(
                LabelImage.imageSideForMarkerPosition(50, 51, "NONE"),
            ).toEqual("bottom");
        });

        it("should return side: left", function () {
            expect(LabelImage.imageSideForMarkerPosition(0, 0, "NONE")).toEqual(
                "left",
            );
            expect(
                LabelImage.imageSideForMarkerPosition(0, 100, "NONE"),
            ).toEqual("left");
            expect(
                LabelImage.imageSideForMarkerPosition(0, 50, "NONE"),
            ).toEqual("left");
            expect(
                LabelImage.imageSideForMarkerPosition(25, 50, "NONE"),
            ).toEqual("left");
            expect(
                LabelImage.imageSideForMarkerPosition(49, 50, "NONE"),
            ).toEqual("left");
        });
    });

    describe("navigateToMarkerIndex", function () {
        it("should not navigate if all other markers were answered", function () {
            const markers: ReadonlyArray<InteractiveMarkerType> = [
                {
                    ...emptyMarker,
                    label: "this",
                },
                {
                    ...emptyMarker,
                    label: "above",
                    y: -1,
                    showCorrectness: "correct",
                },
                {
                    ...emptyMarker,
                    label: "right",
                    x: 1,
                    showCorrectness: "correct",
                },
                {
                    ...emptyMarker,
                    label: "below",
                    y: 1,
                    showCorrectness: "correct",
                },
                {
                    ...emptyMarker,
                    label: "left",
                    x: -1,
                    showCorrectness: "correct",
                },
            ];

            expect(
                markers[
                    LabelImage.navigateToMarkerIndex({x: 0, y: 0}, markers, 0)
                ].label,
            ).toEqual("this");
        });

        describe.each([
            ["answerless", emptyAnswerlessMarker],
            ["answerful", emptyMarker],
        ])("given %s options", (_, marker) => {
            describe("up direction", function () {
                const navigateDirecton = {x: 0, y: -1} as const;

                it("should navigate to marker above", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            y: 0,
                        },
                        {
                            ...marker,
                            label: "below",
                            y: 1,
                        },
                        {
                            ...marker,
                            label: "above",
                            y: -1,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("above");
                });

                it("should navigate to lowest marker", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            y: -1,
                        },
                        {
                            ...marker,
                            label: "lowest",
                            y: 1,
                        },
                        {
                            ...marker,
                            label: "below",
                            y: 0,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("lowest");
                });

                it("should navigate to the next above marker in original order", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            y: 0,
                        },
                        {
                            ...marker,
                            label: "above 1",
                            y: -1,
                        },
                        {
                            ...marker,
                            label: "above 2",
                            y: -1,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("above 1");
                });

                it("should navigate to the next coplanar marker in original order", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            y: 0,
                        },
                        {
                            ...marker,
                            label: "coplanar 1",
                            y: 0,
                        },
                        {
                            ...marker,
                            label: "coplanar 2",
                            y: 0,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("coplanar 1");
                });
            });

            describe("right direction", function () {
                const navigateDirecton = {x: 1, y: 0} as const;

                it("should navigate to marker on the right", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            x: 0,
                        },
                        {
                            ...marker,
                            label: "left",
                            x: -1,
                        },
                        {
                            ...marker,
                            label: "right",
                            x: 1,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("right");
                });

                it("should navigate to leftmost marker", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            x: 1,
                        },
                        {
                            ...marker,
                            label: "leftmost",
                            x: -1,
                        },
                        {
                            ...marker,
                            label: "left",
                            x: 0,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("leftmost");
                });

                it("should navigate to the next right marker in original order", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            x: 0,
                        },
                        {
                            ...marker,
                            label: "right 1",
                            x: 1,
                        },
                        {
                            ...marker,
                            label: "right 2",
                            x: 1,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("right 1");
                });

                it("should navigate to the next coplanar marker in original order", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            x: 0,
                        },
                        {
                            ...marker,
                            label: "coplanar 1",
                            x: 0,
                        },
                        {
                            ...marker,
                            label: "coplanar 2",
                            x: 0,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("coplanar 1");
                });
            });

            describe("down direction", function () {
                const navigateDirecton = {x: 0, y: 1} as const;

                it("should navigate to marker below", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            y: 0,
                        },
                        {
                            ...marker,
                            label: "above",
                            y: -1,
                        },
                        {
                            ...marker,
                            label: "below",
                            y: 1,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("below");
                });

                it("should navigate to highest marker", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            y: 1,
                        },
                        {
                            ...marker,
                            label: "highest",
                            y: -1,
                        },
                        {
                            ...marker,
                            label: "above",
                            y: 0,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("highest");
                });

                it("should navigate to the next below marker in original order", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            y: 0,
                        },
                        {
                            ...marker,
                            label: "below 1",
                            y: 1,
                        },
                        {
                            ...marker,
                            label: "below 2",
                            y: 1,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("below 1");
                });

                it("should navigate to the next coplanar marker in original order", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            y: 0,
                        },
                        {
                            ...marker,
                            label: "coplanar 1",
                            y: 0,
                        },
                        {
                            ...marker,
                            label: "coplanar 2",
                            y: 0,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("coplanar 1");
                });
            });

            describe("left direction", function () {
                const navigateDirecton = {x: -1, y: 0} as const;

                it("should navigate to marker on the left", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            x: 0,
                        },
                        {
                            ...marker,
                            label: "right",
                            x: 1,
                        },
                        {
                            ...marker,
                            label: "left",
                            x: -1,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("left");
                });

                it("should navigate to rightmost marker", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            x: -1,
                        },
                        {
                            ...marker,
                            label: "rightmost",
                            x: 1,
                        },
                        {
                            ...marker,
                            label: "right",
                            x: 0,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("rightmost");
                });

                it("should navigate to the next left marker in original order", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            x: 0,
                        },
                        {
                            ...marker,
                            label: "left 1",
                            x: -1,
                        },
                        {
                            ...marker,
                            label: "left 2",
                            x: -1,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("left 1");
                });

                it("should navigate to the next coplanar marker in original order", function () {
                    const markers = [
                        {
                            ...marker,
                            label: "this",
                            x: 0,
                        },
                        {
                            ...marker,
                            label: "coplanar 1",
                            x: 0,
                        },
                        {
                            ...marker,
                            label: "coplanar 2",
                            x: 0,
                        },
                    ];

                    expect(
                        markers[
                            LabelImage.navigateToMarkerIndex(
                                navigateDirecton,
                                markers,
                                0,
                            )
                        ].label,
                    ).toEqual("coplanar 1");
                });
            });
        });
    });

    describe("analytics", () => {
        beforeEach(() => {
            jest.spyOn(testDependenciesV2.analytics, "onAnalyticsEvent");
            jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
                testDependencies,
            );
            jest.spyOn(Dependencies, "useDependencies").mockReturnValue(
                testDependenciesV2,
            );
        });

        it("sends an analytics event when widget is rendered", async () => {
            // render component
            renderQuestion(textQuestion);

            expect(
                testDependenciesV2.analytics.onAnalyticsEvent,
            ).toHaveBeenCalledWith({
                type: "perseus:widget:rendered:ti",
                payload: {
                    widgetSubType: "null",
                    widgetType: "label-image",
                    widgetId: "label-image 1",
                },
            });
        });

        it("sends an analytics event when the toggle is interacted with", async () => {
            // render component
            renderQuestion(textQuestion);

            // Toggle the switch
            const toggleAnswerSwitch = await screen.findByRole("switch");
            await userEvent.click(toggleAnswerSwitch);

            expect(
                testDependenciesV2.analytics.onAnalyticsEvent,
            ).toHaveBeenCalledWith({
                type: "perseus:label-image:toggle-answers-hidden",
                payload: null,
            });
        });

        it("sends an analytics event when a marker is interacted with", async () => {
            // render component
            renderQuestion(textQuestion);

            // Toggle the button
            const markerButton = await screen.findByLabelText(
                "The fourth unlabeled bar line.",
            );
            await userEvent.click(markerButton);

            expect(
                testDependenciesV2.analytics.onAnalyticsEvent,
            ).toHaveBeenCalledWith({
                type: "perseus:label-image:marker-interacted-with",
                payload: null,
            });
        });

        it("sends analytics when a choice is interacted with", async () => {
            // render component
            renderQuestion(textQuestion);

            // Toggle the marker
            const markerButton = await screen.findByLabelText(
                "The fourth unlabeled bar line.",
            );
            await userEvent.click(markerButton);

            // Select a choice
            const choices = await screen.findAllByText("Trucks");
            const choice = choices[choices.length - 1];
            await userEvent.click(choice);

            expect(
                testDependenciesV2.analytics.onAnalyticsEvent,
            ).toHaveBeenCalledWith({
                type: "perseus:label-image:choiced-interacted-with",
                payload: null,
            });
        });
    });

    describe("getUserInput", () => {
        it("should return the current user input on initial render", () => {
            // render component
            const {renderer} = renderQuestion(textQuestion);

            const userInput = renderer.getUserInputMap();

            expect(userInput).toEqual({
                "label-image 1": {
                    markers: [
                        {
                            label: "The fourth unlabeled bar line.",
                            selected: undefined,
                        },
                        {
                            label: "The third unlabeled bar line.",
                            selected: undefined,
                        },
                        {
                            label: "The second unlabeled bar line.",
                            selected: undefined,
                        },
                        {
                            label: "The first unlabeled bar line.",
                            selected: undefined,
                        },
                    ],
                },
            });
        });
    });

    describe("scorePerseusItem", () => {
        it("should be invalid on first render", () => {
            // Arrange
            const {renderer} = renderQuestion(textQuestion);

            // Act
            const score = scorePerseusItemTesting(
                textQuestion,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(score).toHaveInvalidInput();
        });
    });

    const answerfulItem = generateTestPerseusItem({
        question: shortTextQuestion,
    });
    const answerlessItem = splitPerseusItem(answerfulItem);

    test("the answerless test data doesn't contain answers", () => {
        // Arrange / Act / Assert
        expect(
            answerlessItem.question.widgets["label-image 1"].options.markers[0],
        ).not.toEqual(
            answerfulItem.question.widgets["label-image 1"].options.markers[0],
        );
    });

    describe.each([
        ["answerless", answerlessItem],
        ["answerful", answerfulItem],
    ])("given %s options", (_, {question}) => {
        it("renders", async () => {
            // Arrange / Act
            renderQuestion(question);
            // Assert
            expect(
                await screen.findByText(
                    "Click each dot on the image to select an answer.",
                ),
            ).toBeInTheDocument();
        });

        it("can be answered", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const markerButton = await screen.findByLabelText(
                "The fourth unlabeled bar line.",
            );
            await userEvent.click(markerButton);

            const choice = screen.getByRole("option", {name: "SUVs"});
            await userEvent.click(choice);

            const userInput = renderer.getUserInputMap();

            // Assert
            expect(userInput).toEqual({
                "label-image 1": {
                    markers: [
                        {
                            label: "The fourth unlabeled bar line.",
                            selected: ["SUVs"],
                        },
                    ],
                },
            });
        });

        it("can give an invalid score", () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const userInput = renderer.getUserInputMap();
            const score = scorePerseusItem(
                answerfulItem.question,
                userInput,
                "en",
            );

            // Assert
            expect(score).toHaveInvalidInput();
        });

        it("can be answered correctly when correct option is picked for the marker", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const markerButton = await screen.findByLabelText(
                "The fourth unlabeled bar line.",
            );
            await userEvent.click(markerButton);

            const choice = screen.getByRole("option", {name: "SUVs"});
            await userEvent.click(choice);

            const score = scorePerseusItemTesting(
                answerfulItem.question,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it("can be answered incorrectly when incorrect option picked for the marker", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const markerButton = await screen.findByLabelText(
                "The fourth unlabeled bar line.",
            );
            await userEvent.click(markerButton);

            const choice = screen.getByRole("option", {name: "Trucks"});
            await userEvent.click(choice);

            const score = scorePerseusItemTesting(
                answerfulItem.question,
                renderer.getUserInputMap(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredIncorrectly();
        });
    });
});
