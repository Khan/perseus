import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../../testing/test-dependencies";
import * as Dependencies from "../dependencies";

import {textQuestion} from "./__testdata__/label-image.testdata";
import {renderQuestion} from "./__tests__/renderQuestion";
import {LabelImage} from "./label-image";

import "@testing-library/jest-dom";

const emptyMarker = {
    label: "",
    answers: [],
    selected: [],
    x: 0,
    y: 0,
} as const;

describe("LabelImage", function () {
    describe("gradeMarker", function () {
        it("should score correct for empty marker with no user answers", function () {
            const score = LabelImage.gradeMarker({
                ...emptyMarker,
            });

            expect(score).toEqual({
                hasAnswers: false,
                isCorrect: true,
            });
        });

        it("should score incorrect for empty marker with user answer", function () {
            const score = LabelImage.gradeMarker({
                ...emptyMarker,
                selected: ["Fiat"],
            });

            expect(score).toEqual({
                hasAnswers: true,
                isCorrect: false,
            });
        });

        it("should score incorrect for no user answers", function () {
            const score = LabelImage.gradeMarker({
                ...emptyMarker,
                answers: ["Lamborghini", "Fiat", "Ferrari"],
            });

            expect(score).toEqual({
                hasAnswers: false,
                isCorrect: false,
            });
        });

        it("should score incorrect for wrong user answers", function () {
            const score = LabelImage.gradeMarker({
                ...emptyMarker,
                answers: ["Lamborghini", "Fiat", "Ferrari"],
                selected: ["Fiat", "Ferrari"],
            });

            expect(score).toEqual({
                hasAnswers: true,
                isCorrect: false,
            });
        });

        it("should score correct for user answers", function () {
            const score = LabelImage.gradeMarker({
                ...emptyMarker,
                answers: ["Lamborghini", "Fiat", "Ferrari"],
                selected: ["Lamborghini", "Fiat", "Ferrari"],
            });

            expect(score).toEqual({
                hasAnswers: true,
                isCorrect: true,
            });
        });
    });

    describe("validate", function () {
        it("should not grade non-interacted widget", function () {
            const state = {
                markers: [
                    {
                        ...emptyMarker,
                        label: "England",
                        answers: ["Mini", "Morris Minor", "Reliant Robin"],
                    },
                    {
                        ...emptyMarker,
                        label: "Germany",
                        answers: ["BMW", "Volkswagen", "Porsche"],
                    },
                    {
                        ...emptyMarker,
                        label: "Italy",
                        answers: ["Lamborghini", "Fiat", "Ferrari"],
                    },
                ],
            } as const;

            const score = LabelImage.validate(state);

            expect(score).toEqual({
                type: "invalid",
                message: null,
            });
        });

        it("should not grade widget with not all markers answered", function () {
            const state = {
                markers: [
                    {
                        ...emptyMarker,
                        label: "England",
                        selected: ["Fiat"],
                    },
                    {
                        ...emptyMarker,
                        label: "Germany",
                        answers: ["BMW", "Volkswagen", "Porsche"],
                        selected: ["Lamborghini"],
                    },
                    {
                        ...emptyMarker,
                        label: "Italy",
                        answers: ["Lamborghini", "Fiat", "Ferrari"],
                    },
                ],
            } as const;

            const score = LabelImage.validate(state);

            expect(score).toEqual({
                type: "invalid",
                message: null,
            });
        });

        it("should grade as incorrect for widget with no answers for markers", function () {
            const state = {
                markers: [
                    {
                        ...emptyMarker,
                        label: "England",
                        selected: ["Fiat"],
                    },
                    {
                        ...emptyMarker,
                        label: "Germany",
                        selected: ["Lamborghini"],
                    },
                    {
                        ...emptyMarker,
                        label: "Italy",
                        selected: ["Ferrari"],
                    },
                ],
            } as const;

            const score = LabelImage.validate(state);

            expect(score).toEqual({
                type: "points",
                earned: 0,
                total: 1,
                message: null,
            });
        });

        it("should grade as incorrect for widget with some wrong answers", function () {
            const state = {
                markers: [
                    {
                        ...emptyMarker,
                        label: "England",
                        answers: ["Mini", "Morris Minor", "Reliant Robin"],
                        selected: ["Mini"],
                    },
                    {
                        ...emptyMarker,
                        label: "Germany",
                        answers: ["BMW", "Volkswagen", "Porsche"],
                        selected: ["BMW", "Volkswagen", "Porsche"],
                    },
                    {
                        ...emptyMarker,
                        label: "Italy",
                        answers: ["Lamborghini", "Fiat", "Ferrari"],
                        selected: ["Ferrari"],
                    },
                ],
            } as const;

            const score = LabelImage.validate(state);

            expect(score).toEqual({
                type: "points",
                earned: 0,
                total: 1,
                message: null,
            });
        });

        it("should grade as correct for widget with all correct answers", function () {
            const state = {
                markers: [
                    {
                        ...emptyMarker,
                        label: "England",
                        answers: ["Mini", "Morris Minor", "Reliant Robin"],
                        selected: ["Mini", "Morris Minor", "Reliant Robin"],
                    },
                    {
                        ...emptyMarker,
                        label: "Germany",
                        answers: ["BMW", "Volkswagen", "Porsche"],
                        selected: ["BMW", "Volkswagen", "Porsche"],
                    },
                    {
                        ...emptyMarker,
                        label: "Italy",
                        answers: ["Lamborghini", "Fiat", "Ferrari"],
                        selected: ["Lamborghini", "Fiat", "Ferrari"],
                    },
                ],
            } as const;

            const score = LabelImage.validate(state);

            expect(score).toEqual({
                type: "points",
                earned: 1,
                total: 1,
                message: null,
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

        it("sends an analytics event when the toggle is interacted with", async () => {
            // render component
            renderQuestion(textQuestion);

            // Toggle the switch
            const toggleAnswerSwitch = await screen.findByRole("switch");
            userEvent.click(toggleAnswerSwitch);

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
            userEvent.click(markerButton);

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
            userEvent.click(markerButton);

            // Select a choice
            const choices = await screen.findAllByText("Trucks");
            const choice = choices[choices.length - 1];
            userEvent.click(choice);

            expect(
                testDependenciesV2.analytics.onAnalyticsEvent,
            ).toHaveBeenCalledWith({
                type: "perseus:label-image:choiced-interacted-with",
                payload: null,
            });
        });
    });
});
