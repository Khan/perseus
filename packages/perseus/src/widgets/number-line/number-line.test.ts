import {act} from "@testing-library/react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {question1} from "./number-line.testdata";

import type {APIOptions} from "../../types";

describe("number-line widget", () => {
    beforeEach(() => {
        // This module complains but doesn't have a real problem
        // with displaying the graphie
        jest.spyOn(console, "log").mockImplementation(() => {});
        jest.spyOn(console, "error").mockImplementation(() => {});

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    describe("snapshots", () => {
        let apiOptions: APIOptions;
        const createNumberLineQuestionWithOptions = (widgetOptions) => {
            return {
                ...question1,
                widgets: {
                    ...question1.widgets,
                    "number-line 1": {
                        ...question1.widgets["number-line 1"],
                        options: {
                            ...question1.widgets["number-line 1"].options,
                            range: [-10, 10],
                            ...widgetOptions,
                        },
                    },
                },
            };
        };

        beforeAll(() => {
            apiOptions = {
                isMobile: false,
            };
        });

        it("default", () => {
            // Act
            const {container} = renderQuestion(question1, apiOptions);

            // Assert
            expect(container).toMatchSnapshot("first render");
        });

        it("mobile", () => {
            // Arrange
            jest.useRealTimers();

            const mobileApiOptions: APIOptions = {
                isMobile: true,
            };

            // Act
            const {container} = renderQuestion(question1, mobileApiOptions);

            // Assert
            expect(container).toMatchSnapshot("first mobile render");
        });

        it(`only endpoints/labels show when "Show label ticks" is off`, () => {
            // Arrange - endpoints
            let question = createNumberLineQuestionWithOptions({
                labelTicks: false,
            });

            // Act
            let {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot(
                "show label ticks off (endpoints)",
            );

            // Arrange - labels
            question = createNumberLineQuestionWithOptions({
                labelTicks: false,
                labelRange: [-4, 4],
            });

            // Act
            container = renderQuestion(question, apiOptions).container;

            // Assert
            expect(container).toMatchSnapshot("show label ticks off (labels)");
        });

        it(`labels are highlighted when part of the tick step`, () => {
            // Arrange
            const question = createNumberLineQuestionWithOptions({
                tickStep: 2,
                labelRange: [-6, 6],
            });

            // Act
            const {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot("show highlighted labels");
        });

        it(`labels are inserted when NOT part of the tick step`, () => {
            // Arrange
            const question = createNumberLineQuestionWithOptions({
                tickStep: 2,
                labelRange: [-5, 5],
            });

            // Act
            const {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot("show inserted labels");
        });

        it(`endpoints are highlighted when labels are NOT indicated`, () => {
            // Arrange - right endpoint should highlight
            let question = createNumberLineQuestionWithOptions({
                labelRange: [-5, null],
            });

            // Act
            let {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot("right endpoint highlighted");

            // Arrange - left endpoint should highlight
            question = createNumberLineQuestionWithOptions({
                labelRange: [null, 5],
            });

            // Act
            container = renderQuestion(question, apiOptions).container;

            // Assert
            expect(container).toMatchSnapshot("left endpoint highlighted");
        });

        it(`all tick labels show when "Style" is "decimal ticks" (deprecated option)`, () => {
            // Arrange
            const question = createNumberLineQuestionWithOptions({
                labelTicks: false,
                labelStyle: "decimal ticks",
            });

            // Act
            const {container} = renderQuestion(question, apiOptions);

            // Assert
            expect(container).toMatchSnapshot("show decimal ticks");
        });
    });

    it("can be answered correctly", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question1, apiOptions);

        // Act
        const [numberLine] = renderer.findWidgets("number-line 1");
        act(() => numberLine.movePosition(-2.5));

        // assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question1, apiOptions);

        // Act
        const [numberLine] = renderer.findWidgets("number-line 1");
        act(() => numberLine.movePosition(3.5));

        // Assert
        expect(renderer).toHaveBeenAnsweredIncorrectly();
    });
});
