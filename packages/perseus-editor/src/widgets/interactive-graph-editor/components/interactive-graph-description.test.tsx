import {Dependencies} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../testing/test-dependencies";

import InteractiveGraphDescription from "./interactive-graph-description";

import type {UserEvent} from "@testing-library/user-event";

import "@testing-library/jest-dom"; // Imports custom matchers

function userEventForFakeTimers() {
    return userEventLib.setup({
        advanceTimers: jest.advanceTimersByTime,
    });
}

describe("InteractiveGraphSettings", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventForFakeTimers();
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    test("renders", () => {
        // Arrange
        render(
            <InteractiveGraphDescription
                ariaLabelValue="Graph Title"
                ariaDescriptionValue="Graph Description"
                onChange={jest.fn()}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const titleInput = screen.getByRole("textbox", {name: "Title"});
        const descriptionInput = screen.getByRole("textbox", {
            name: "Description",
        });

        // Assert
        expect(titleInput).toBeInTheDocument();
        expect(titleInput).toHaveValue("Graph Title");
        expect(descriptionInput).toBeInTheDocument();
        expect(descriptionInput).toHaveValue("Graph Description");
    });

    test("calls onChange when the title is changed", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <InteractiveGraphDescription
                ariaLabelValue=""
                ariaDescriptionValue=""
                onChange={onChange}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const titleInput = screen.getByRole("textbox", {name: "Title"});
        await userEvent.clear(titleInput);
        await userEvent.type(titleInput, "Zot");

        // Assert
        // Calls are not being accumulated because they're mocked.
        expect(onChange.mock.calls).toEqual([
            [{fullGraphAriaLabel: "Z"}],
            [{fullGraphAriaLabel: "o"}],
            [{fullGraphAriaLabel: "t"}],
        ]);
    });

    test("calls onChange when the description is changed", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <InteractiveGraphDescription
                ariaLabelValue=""
                ariaDescriptionValue=""
                onChange={onChange}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const descriptionInput = screen.getByRole("textbox", {
            name: "Description",
        });
        await userEvent.clear(descriptionInput);
        await userEvent.type(descriptionInput, "Zot");

        // Assert
        // Calls are not being accumulated because they're mocked.
        expect(onChange.mock.calls).toEqual([
            [{fullGraphAriaDescription: "Z"}],
            [{fullGraphAriaDescription: "o"}],
            [{fullGraphAriaDescription: "t"}],
        ]);
    });

    test("saves undefined when the title is cleared", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <InteractiveGraphDescription
                ariaLabelValue="Graph Title"
                ariaDescriptionValue=""
                onChange={onChange}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const titleInput = screen.getByRole("textbox", {name: "Title"});
        await userEvent.clear(titleInput);

        // Assert
        expect(onChange).toHaveBeenCalledWith({fullGraphAriaLabel: undefined});
    });

    test("saves undefined when the description is cleared", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <InteractiveGraphDescription
                ariaLabelValue=""
                ariaDescriptionValue="Graph Description"
                onChange={onChange}
            />,
            {wrapper: RenderStateRoot},
        );

        // Act
        const descriptionInput = screen.getByRole("textbox", {
            name: "Description",
        });
        await userEvent.clear(descriptionInput);

        // Assert
        expect(onChange).toHaveBeenCalledWith({
            fullGraphAriaDescription: undefined,
        });
    });
});
