import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom"; // Imports custom matchers

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";

import {renderQuestion} from "./renderQuestion";

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
} as const;

describe("Definition widget", () => {
    beforeEach(() => {
        jest.useRealTimers();

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

    it("should have an open state snapshot", async () => {
        // Arrange
        const {container} = renderQuestion(question);

        // Act
        const definitionAnchor = screen.getByText("the Pequots");
        userEvent.click(definitionAnchor);

        // Assert
        const tooltip = await screen.findByRole("dialog");
        expect(tooltip).toBeVisible();
        expect(container).toMatchSnapshot("open state");
    });

    it("should display the definition on click", async () => {
        // Arrange
        renderQuestion(question);

        // Act
        const definitionAnchor = screen.getByText("the Pequots");
        userEvent.click(definitionAnchor);

        // Assert
        const tooltip = await screen.findByRole("dialog");
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should display the definition on click", async () => {
        // Arrange
        renderQuestion(question);

        // Act
        const definitionAnchor = screen.getByText("the Pequots");
        userEvent.click(definitionAnchor);
        const tooltip = await screen.findByRole("dialog");

        // Assert
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should show via focus on space key", async () => {
        // Arrange
        renderQuestion(question);

        // Act - Tab in to set focus
        const definitionAnchor = screen.getByText("the Pequots");
        userEvent.type(definitionAnchor, "{space}");

        // Assert
        const tooltip = await screen.findByRole("dialog");
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should dimiss by a click on the x when showing", async () => {
        renderQuestion(question);

        // Act
        // Click on the anchor
        const definitionAnchor = screen.getByText("the Pequots");
        userEvent.click(definitionAnchor);

        // Click close, tooltip is hidden
        const close = screen.getByTestId("popover-close-btn");
        userEvent.click(close);

        // Assert
        expect(screen.queryByRole("dialog")).toBeNull();
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
