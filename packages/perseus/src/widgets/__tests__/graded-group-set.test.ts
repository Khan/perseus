import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// TODO(FEI-3857): Include in jest setup so that we don't need to import it everywhere
import "@testing-library/jest-dom/extend-expect";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {article1} from "../__testdata__/graded-group-set.testdata";

import {renderQuestion} from "./renderQuestion";

describe("graded group widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should snapshot", () => {
        // Arrange and Act
        const {container} = renderQuestion(article1);

        // Assert
        expect(container).toMatchSnapshot();
    });

    it("should render error message when no current group", () => {
        // Arrange
        const articleWithNoGradedGroups = {
            ...article1,
            widgets: {
                "graded-group-set 1": {
                    ...article1.widgets["graded-group-set 1"],
                    type: "graded-group-set",
                    options: {
                        gradedGroups: [],
                    },
                },
            },
        } as const;

        // Act
        renderQuestion(articleWithNoGradedGroups);

        // Assert
        expect(screen.getByText("No current group...")).toBeVisible();
    });

    it("should show 'Next question' button when answered correctly", () => {
        // Arrange
        renderQuestion(article1);

        // Act
        // Answer first question correctly
        userEvent.type(screen.getByRole("textbox"), "0.9");
        userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(
            screen.getByRole("button", {name: "Next question"}),
        ).toBeVisible();
    });

    it("should not show 'Next question' button when answered incorrectly", () => {
        // Arrange
        renderQuestion(article1);

        // Act
        // Answer first question IN-correctly
        userEvent.type(screen.getByRole("textbox"), "0.000000000001");
        userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent("Incorrect");
        expect(
            screen.queryByRole("button", {name: "Next question"}),
        ).toBeNull();
    });

    it("should be able to advance to next group", () => {
        // Arrange
        renderQuestion(article1);
        // Answer first question correctly
        userEvent.type(screen.getByRole("textbox"), "0.9");
        userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Act
        userEvent.click(screen.getByRole("button", {name: "Next question"}));

        // Assert
        expect(screen.getByText("Problem 1b")).toBeVisible();
    });

    it("should not allow advancing past the last group", () => {
        // Arrange
        renderQuestion(article1);

        userEvent.type(screen.getByRole("textbox"), "0.9");
        userEvent.click(screen.getByRole("button", {name: "Check"}));
        userEvent.click(screen.getByRole("button", {name: "Next question"}));

        userEvent.type(screen.getByRole("textbox"), "1");
        userEvent.click(screen.getByRole("button", {name: "Check"}));
        userEvent.click(screen.getByRole("button", {name: "Next question"}));

        userEvent.type(screen.getByRole("textbox"), "1.2");

        // Act
        userEvent.click(screen.getByRole("button", {name: "Check"}));

        // Assert
        expect(screen.getByRole("alert")).toHaveTextContent("Correct");
        expect(
            screen.queryByRole("button", {name: "Next question"}),
        ).not.toBeInTheDocument();
    });

    describe("should be able to jump to an arbitrary question using Indicators", () => {
        it("by click", () => {
            // Arrange
            renderQuestion(article1);

            // Act
            userEvent.click(
                screen.getByRole("button", {name: "Skip to Problem 1c"}),
            );

            // Assert
            expect(screen.getByText("Problem 1c")).toBeVisible();
        });

        it("by key", () => {
            // Arrange
            renderQuestion(article1);

            // Act
            userEvent.tab(); // 1a
            userEvent.tab(); // 1b
            userEvent.keyboard(" ");

            // Assert
            expect(screen.getByText("Problem 1b")).toBeVisible();

            userEvent.tab(); // 1c
            userEvent.keyboard("[Enter]");

            expect(screen.getByText("Problem 1c")).toBeVisible();
        });
    });

    it("should return input paths", () => {
        // Arrange
        const {renderer} = renderQuestion(article1);

        // Act
        const inputPaths = renderer.getInputPaths();

        // Assert
        expect(inputPaths).toMatchInlineSnapshot(`
            [
              [
                "graded-group-set 1",
                "numeric-input 1",
              ],
            ]
        `);
    });

    it("should be able to set input value on child widget", () => {
        // Arrange
        const {renderer} = renderQuestion(article1);
        const cb = jest.fn();

        // Act
        renderer.setInputValue(
            ["graded-group-set 1", "numeric-input 1"],
            "999",
            cb,
        );

        // Assert
        expect(screen.getByRole("textbox")).toHaveValue("999");
    });

    it("should be able to focus the widgets", () => {
        // Arrange
        const {renderer} = renderQuestion(article1);

        // Act
        // The first "focusable" widget receives focus...
        renderer.focus();

        // Assert
        expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("should be able to focus a specific input path", () => {
        // Arrange
        const {renderer} = renderQuestion(article1);

        // Act
        renderer.focusPath(["graded-group-set 1", "numeric-input 1"]);

        // Assert
        expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("should be able to blur a specific input path", () => {
        // Arrange
        const {renderer} = renderQuestion(article1);
        userEvent.click(screen.getByRole("textbox"));

        // Act
        renderer.blurPath(["graded-group-set 1", "numeric-input 1"]);

        // Assert
        expect(screen.getByRole("textbox")).not.toHaveFocus();
    });

    it("should be able to Explain (via mouse)", () => {
        // Arrange
        renderQuestion(article1);

        // Act
        userEvent.click(screen.getByRole("button", {name: "Explain"}));

        // Assert
        expect(
            screen.getByRole("button", {name: "Hide explanation"}),
        ).toBeVisible();
        expect(
            screen.getByText(/There are many ways to solve this problem/),
        ).toBeVisible();
    });

    it("should be able to Explain (via keyboard)", () => {
        // Arrange
        renderQuestion(article1);

        // Act
        const explainButton = screen.getByRole("button", {name: "Explain"});
        explainButton.focus();
        userEvent.type(explainButton, "{enter}");

        // Assert
        expect(
            screen.getByRole("button", {name: "Hide explanation"}),
        ).toBeVisible();
        expect(
            screen.getByText(/There are many ways to solve this problem/),
        ).toBeVisible();
    });

    it("should be able to hide explanation (via mouse)", () => {
        // Arrange
        renderQuestion(article1);
        userEvent.click(screen.getByRole("button", {name: "Explain"}));

        // Act
        userEvent.click(screen.getByRole("button", {name: "Hide explanation"}));

        // Assert
        expect(screen.getByRole("button", {name: "Explain"})).toBeVisible();
        expect(
            screen.queryByRole("button", {name: "Hide explanation"}),
        ).not.toBeInTheDocument();
    });

    it("should be able to hide explanation (via keyboard)", () => {
        // Arrange
        renderQuestion(article1);
        userEvent.click(screen.getByRole("button", {name: "Explain"}));

        // Act
        const hideExplanationButton = screen.getByRole("button", {
            name: "Hide explanation",
        });
        hideExplanationButton.focus();
        userEvent.type(hideExplanationButton, "{enter}");

        // Assert
        expect(screen.getByRole("button", {name: "Explain"})).toBeVisible();
        expect(
            screen.queryByRole("button", {name: "Hide explanation"}),
        ).not.toBeInTheDocument();
    });
});
