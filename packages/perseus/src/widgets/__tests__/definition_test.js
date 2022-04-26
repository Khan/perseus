// @flow
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom"; // Imports custom matchers

import {testDependencies} from "../../../../../testing/test-dependencies.js";
import * as Dependencies from "../../dependencies.js";

import {renderQuestion} from "./renderQuestion.jsx";

const question = {
    content:
        "Read the excerpt and answer the question below. \n\nThe Governor and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
    images: {},
    widgets: {
        "definition 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "definition",
            options: {
                definition: "Definition text",
                togglePrompt: "the Pequots",
                static: false,
            },
            alignment: "default",
        },
    },
};

describe("Definition widget", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should have a default snapshot", () => {
        // Arrange & Act
        const {container} = renderQuestion(question);

        // Assert
        expect(container).toMatchSnapshot("first render");
    });

    it("should have an open state snapshot", () => {
        // Arrange
        const {container} = renderQuestion(question);

        // Act
        const definitionAnchor = screen.getByText("the Pequots");
        userEvent.hover(definitionAnchor);
        jest.advanceTimersByTime(250);

        // Assert
        expect(container).toMatchSnapshot("open state");
    });

    it("should display the definition on hover", () => {
        // Arrange
        renderQuestion(question);

        // Act
        const definitionAnchor = screen.getByText("the Pequots");
        userEvent.hover(definitionAnchor);
        jest.advanceTimersByTime(250);

        // Assert
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should display the definition on click", () => {
        // Arrange
        renderQuestion(question);

        // Act
        const definitionAnchor = screen.getByText("the Pequots");
        userEvent.click(definitionAnchor);
        const tooltip = screen.getByRole("tooltip");

        // Assert
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should show via focus by the tab key", () => {
        // Arrange
        renderQuestion(question);

        // Act - Tab in to set focus
        userEvent.tab();
        jest.advanceTimersByTime(250);

        // Assert
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should hide and blur by the tab key", () => {
        // Arrange
        renderQuestion(question);

        // Act - Tab in to set focus, tab out to blur
        userEvent.tab();
        jest.advanceTimersByTime(250);
        userEvent.tab();
        jest.advanceTimersByTime(250);

        // Assert
        expect(screen.queryByRole("tooltip")).toBeNull();
    });

    it("should dimiss by a click when showing", () => {
        renderQuestion(question);

        // Act
        // Click on the anchor
        const definitionAnchor = screen.getByText("the Pequots");
        userEvent.click(definitionAnchor);

        // Move the mouse away and make sure text is still visible
        userEvent.unhover(definitionAnchor);
        jest.advanceTimersByTime(250);

        // Click to elsewhere, tooltip is hidden
        userEvent.click((document.body: any));
        jest.advanceTimersByTime(250);

        // Assert
        expect(screen.queryByRole("tooltip")).toBeNull();
    });

    it("should not affect answerable", () => {
        // Arrange and act
        const {renderer} = renderQuestion(question);
        const result = renderer.scoreWidgets();

        // Assert
        expect(result["definition 1"]).toMatchObject({
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        });
    });
});
