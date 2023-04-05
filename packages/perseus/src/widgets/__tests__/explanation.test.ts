import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// TODO(FEI-3857): Include in jest setup so that we don't need to import it everywhere
import "@testing-library/jest-dom/extend-expect";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {question1} from "../__testdata__/explanation.testdata";
import ExplanationWidgetExports from "../explanation";

import {renderQuestion} from "./renderQuestion";

import type {PerseusExplanationWidgetOptions} from "../../perseus-types";

describe("Explanation", function () {
    beforeEach(() => {
        // We mock out `console.error` because the explanation widget adds
        // `javascript:void(0);` to the `onClick` handler which triggers an
        // error in our test env.
        jest.spyOn(console, "error").mockImplementation(() => {});

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange and Act
        const {container} = renderQuestion(question1);

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot when expanded", () => {
        // Arrange
        const {container} = renderQuestion(question1);

        // Act
        userEvent.click(screen.getByRole("button"));

        // Assert
        expect(container).toMatchSnapshot("expanded");
    });

    it("should snapshot for mobile", () => {
        // Arrange and Act
        const {container} = renderQuestion(question1, {
            isMobile: true,
        });

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot for mobile when expanded", () => {
        // Arrange
        const {container} = renderQuestion(question1, {
            isMobile: true,
        });

        // Act
        userEvent.click(screen.getByRole("button"));

        // Assert
        expect(container).toMatchSnapshot("expanded");
    });

    it("should snapshot for article", () => {
        // Arrange and Act
        const {container} = renderQuestion(question1, {
            isArticle: true,
        });

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot for article when expanded", () => {
        // Arrange
        const {container} = renderQuestion(question1, {
            isArticle: true,
        });

        // Act
        userEvent.click(screen.getByRole("button"));

        // Assert
        expect(container).toMatchSnapshot("expanded");
    });

    it("should snapshot for article+mobile", () => {
        // Arrange and Act
        const {container} = renderQuestion(question1, {
            isMobile: true,
            isArticle: true,
        });

        // Assert
        expect(container).toMatchSnapshot("initial render");
    });

    it("should snapshot for article+mobile when expanded", () => {
        // Arrange
        const {container} = renderQuestion(question1, {
            isMobile: true,
            isArticle: true,
        });

        // Act
        userEvent.click(screen.getByRole("button"));

        // Assert
        expect(container).toMatchSnapshot("expanded");
    });

    it("can be expanded", function () {
        // Arrange
        renderQuestion(question1);

        // Act
        const expandLink = screen.getByRole("button", {expanded: false});
        userEvent.click(expandLink);

        // Assert
        // get asserts if it doesn't find a single matching element
        expect(screen.getByText("This is an explanation")).toBeVisible();
    });

    it("can be collapsed", function () {
        // Arrange
        renderQuestion(question1);

        // Act
        const expandLink = screen.getByRole("button", {expanded: false});
        userEvent.click(expandLink); // expand and then
        const collapseLink = screen.getByRole("button", {expanded: true});
        userEvent.click(collapseLink); // collapse

        // Assert
        expect(screen.queryByText("This is an explanation")).toBeNull();
    });

    it("should return an empty object for getUserInput()", () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const userInput = renderer.getUserInput();

        // Assert
        expect(userInput).toMatchInlineSnapshot(`
            [
              {},
            ]
        `);
    });

    it("should return a zero score for simpleValidate()", () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        const score = renderer.scoreWidgets();

        // Assert
        expect(score).toMatchInlineSnapshot(`
            {
              "explanation 1": {
                "earned": 0,
                "message": null,
                "total": 0,
                "type": "points",
              },
            }
        `);
    });

    describe("static validate", () => {
        it("should always return 0 points", () => {
            const result = ExplanationWidgetExports.widget.validate(
                {},
                question1.widgets["explanation 1"]
                    .options as PerseusExplanationWidgetOptions,
            );

            expect(result).toMatchInlineSnapshot(`
                {
                  "earned": 0,
                  "message": null,
                  "total": 0,
                  "type": "points",
                }
            `);
        });
    });
});
