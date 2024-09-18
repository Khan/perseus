import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {mockStrings} from "../../strings";
import {renderQuestion} from "../__testutils__/renderQuestion";

import {Categorizer} from "./categorizer";
import {question1} from "./categorizer.testdata";

import type {Rubric} from "./categorizer.types";
import type {APIOptions} from "../../types";
import type {UserEvent} from "@testing-library/user-event";

describe("categorizer widget", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("is incorrect when blank", async () => {
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

    it("can be answered incorrectly", async () => {
        // arrange
        const {renderer} = renderQuestion(question1);

        const firstItem = screen.getAllByRole("row")[0];
        await userEvent.click(firstItem);

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

    it("can be answered correctly", async () => {
        // arrange
        const {renderer} = renderQuestion(question1);

        // act
        await userEvent.click(
            screen.getAllByRole("button", {name: "No relationship"})[0],
        );
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Positive linear relationship",
            })[0],
        );
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Negative linear relationship",
            })[1],
        );
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Nonlinear relationship",
            })[1],
        );

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
        const score = Categorizer.validate(useInput, rubric, mockStrings);

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
        const score = Categorizer.validate(useInput, rubric, mockStrings);

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
        const score = Categorizer.validate(useInput, rubric, mockStrings);

        expect(score).toMatchInlineSnapshot(`
            {
              "message": "Make sure you select something for every row.",
              "type": "invalid",
            }
        `);
    });
});
