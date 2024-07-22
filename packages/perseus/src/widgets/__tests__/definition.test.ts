import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";

import {renderQuestion} from "./renderQuestion";

import type {UserEvent} from "@testing-library/user-event";

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
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should have a default snapshot", async () => {
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
        await userEvent.click(definitionAnchor);

        // Assert
        const tooltip = screen.getByRole("dialog");
        expect(tooltip).toBeVisible();
        expect(container).toMatchSnapshot("open state");
    });

    it("should display the definition on click", async () => {
        // Arrange
        renderQuestion(question);

        // Act
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.click(definitionAnchor);

        // Assert
        const tooltip = screen.getByRole("dialog");
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should display the definition on click", async () => {
        // Arrange
        renderQuestion(question);

        // Act
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.click(definitionAnchor);
        const tooltip = screen.getByRole("dialog");

        // Assert
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should show via focus on space key", async () => {
        // Arrange
        renderQuestion(question);

        // Act - Tab in to set focus
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.type(definitionAnchor, "{space}");

        // Assert
        const tooltip = screen.getByRole("dialog");
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent("Definition text");
    });

    it("should dismiss by a click on the x when showing", async () => {
        renderQuestion(question);

        // Act
        // Click on the anchor
        const definitionAnchor = screen.getByText("the Pequots");
        await userEvent.click(definitionAnchor);

        // Click close, tooltip is hidden
        const close = screen.getByLabelText("Close Popover");
        await userEvent.click(close);

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
