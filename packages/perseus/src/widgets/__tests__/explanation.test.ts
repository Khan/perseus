import {screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {question1} from "../__testdata__/explanation.testdata";
import ExplanationWidgetExports from "../explanation";

import {renderQuestion} from "./renderQuestion";

import type {PerseusExplanationWidgetOptions} from "../../perseus-types";

describe("Explanation", function () {
    let userEvent;

    const verifyExpandCollapseState = (
        buttonText: string,
        isExpanded: boolean,
    ) => {
        // Widget Button state
        const widgetButton = screen.getByRole("button", {name: buttonText});
        expect(widgetButton).toHaveAttribute(
            "aria-expanded",
            String(isExpanded),
        );

        // Content container state
        const contentContainer = screen.getByTestId("content-container");
        expect(contentContainer).toHaveAttribute(
            "aria-hidden",
            String(!isExpanded),
        );

        const expectedClass = isExpanded
            ? "contentExpanded"
            : "contentCollapsed";
        expect(contentContainer.className).toContain(expectedClass);

        const excludedClass = isExpanded
            ? "contentCollapsed"
            : "contentExpanded";
        expect(contentContainer.className).not.toContain(excludedClass);
    };

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

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

    it("should snapshot when expanded", async () => {
        // Arrange
        const {container} = renderQuestion(question1);

        // Act
        await userEvent.click(screen.getByRole("button"));

        // Assert
        // The only real difference between expanded and not expanded is the
        //     classes and aria that are applied.
        expect(container).toMatchSnapshot("expanded");
    });

    it("can be expanded and collapsed with a mouse click", async function () {
        // Arrange
        renderQuestion(question1);

        // Verify initial state
        verifyExpandCollapseState("Explanation", false);

        // Act - expand with a click
        await userEvent.click(
            screen.getByRole("button", {name: "Explanation"}),
        );

        // Assert - elements have attributes changed that represent an expanded state
        verifyExpandCollapseState("Hide explanation!", true);

        // Act - collapse with a click
        await userEvent.click(
            screen.getByRole("button", {name: "Hide explanation!"}),
        );

        // Assert - elements have attributes reset to represent a collapsed state
        verifyExpandCollapseState("Explanation", false);
    });

    it("can be expanded and collapsed with the keyboard - Enter key", async function () {
        // Arrange
        renderQuestion(question1);

        // Verify initial state
        verifyExpandCollapseState("Explanation", false);

        // Act - expand with the enter key
        screen.getByRole("button", {name: "Explanation"}).focus();
        await userEvent.keyboard("{Enter}");

        // Assert - elements have attributes changed that represent an expanded state
        verifyExpandCollapseState("Hide explanation!", true);

        // Act - collapse with the enter key
        screen.getByRole("button", {name: "Hide explanation!"}).focus();
        await userEvent.keyboard("{Enter}");

        // Assert - elements have attributes reset to represent a collapsed state
        verifyExpandCollapseState("Explanation", false);
    });

    it("can be expanded and collapsed with the keyboard - Space bar", async function () {
        // Arrange
        renderQuestion(question1);

        // Verify initial state
        verifyExpandCollapseState("Explanation", false);

        // Act - expand with a space bar
        screen.getByRole("button", {name: "Explanation"}).focus();
        await userEvent.keyboard(" ");

        // Assert - elements have attributes changed that represent an expanded state
        verifyExpandCollapseState("Hide explanation!", true);

        // Act - collapse with a space bar
        screen.getByRole("button", {name: "Hide explanation!"}).focus();
        await userEvent.keyboard(" ");

        // Assert - elements have attributes reset to represent a collapsed state
        verifyExpandCollapseState("Explanation", false);
    });

    it("should return an empty object for getUserInput()", async () => {
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

    it("should return a zero score for simpleValidate()", async () => {
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
        it("should always return 0 points", async () => {
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
