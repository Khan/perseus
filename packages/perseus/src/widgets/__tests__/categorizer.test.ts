import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {question1} from "../__testdata__/categorizer.testdata";
import {Categorizer} from "../categorizer";

import {renderQuestion} from "./renderQuestion";

import type {APIOptions} from "../../types";
import type {Rubric} from "../categorizer";

describe("categorizer widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should snapshot on mobile", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: true,
        };

        // Act
        const {container} = renderQuestion(question1, apiOptions);

        // Assert
        expect(container).toMatchSnapshot("first mobile render");
    });

    it("is incorrect when blank", () => {
        // Arrange
        const apiOptions: APIOptions = {
            isMobile: false,
        };
        const {renderer} = renderQuestion(question1, apiOptions);

        // Act
        const [_, score] = renderer.guessAndScore();

        // Assert
        expect(score).toMatchInlineSnapshot(`
            {
              "message": "Make sure you select something for every row.",
              "type": "invalid",
            }
        `);
    });

    it("can be answered incorrectly", () => {
        // arrange
        const {renderer} = renderQuestion(question1);

        const firstItem = screen.getAllByRole("row")[0];
        userEvent.click(firstItem);

        // act
        const [_, score] = renderer.guessAndScore();

        // assert
        expect(score).toMatchInlineSnapshot(`
            {
              "message": "Make sure you select something for every row.",
              "type": "invalid",
            }
        `);
    });

    it("can be answered correctly", () => {
        // arrange
        const {renderer} = renderQuestion(question1);

        // act
        userEvent.click(
            screen.getAllByRole("button", {name: "No relationship"})[0],
        );
        userEvent.click(
            screen.getAllByRole("button", {
                name: "Positive linear relationship",
            })[0],
        );
        userEvent.click(
            screen.getAllByRole("button", {
                name: "Negative linear relationship",
            })[1],
        );
        userEvent.click(
            screen.getAllByRole("button", {name: "Nonlinear relationship"})[1],
        );

        jest.runOnlyPendingTimers();
        renderer.guessAndScore();

        // assert
        expect(renderer).toHaveBeenAnsweredCorrectly();
    });
});

describe("validating answers", () => {
    it("gives points when the answer is correct", () => {
        const rubric: Rubric = {
            items: ["Graph $1$", "Graph $2$"],
            values: [1, 3],
            randomizeItems: false,
            categories: [
                "No relationship",
                "Positive linear relationship",
                "Negative linear relationship",
                "Nonlinear relationship",
            ],
            highlightLint: false,
            static: false,
        };

        const useInput = {
            values: [1, 3],
        } as const;
        const score = Categorizer.validate(useInput, rubric);

        expect(score).toMatchInlineSnapshot(`
            {
              "earned": 1,
              "message": null,
              "total": 1,
              "type": "points",
            }
        `);
    });

    it("does not give points when incorrectly answered", () => {
        const rubric: Rubric = {
            items: ["Graph $1$", "Graph $2$"],
            values: [1, 3],
            randomizeItems: false,
            categories: [
                "No relationship",
                "Positive linear relationship",
                "Negative linear relationship",
                "Nonlinear relationship",
            ],
            highlightLint: false,
            static: false,
        };

        const useInput = {
            values: [2, 3],
        } as const;
        const score = Categorizer.validate(useInput, rubric);

        expect(score).toMatchInlineSnapshot(`
            {
              "earned": 0,
              "message": null,
              "total": 1,
              "type": "points",
            }
        `);
    });
    it("tells the learner its not complete if not selected", () => {
        const rubric: Rubric = {
            items: ["Graph $1$", "Graph $2$"],
            values: [1, 3],
            randomizeItems: false,
            categories: [
                "No relationship",
                "Positive linear relationship",
                "Negative linear relationship",
                "Nonlinear relationship",
            ],
            highlightLint: false,
            static: false,
        };

        const useInput = {
            values: [2],
        } as const;
        const score = Categorizer.validate(useInput, rubric);

        expect(score).toMatchInlineSnapshot(`
            {
              "message": "Make sure you select something for every row.",
              "type": "invalid",
            }
        `);
    });
});
