import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import Marker from "./marker";

import type {UserEvent} from "@testing-library/user-event";

describe("Marker", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe("component rendering", () => {
        it("renders an empty marker", async () => {
            // Arrange
            const onChange = jest.fn();
            const onRemove = jest.fn();

            // Act
            // `baseElement` (document.body) rather than `container`, because
            // Wonder Blocks Popover portals the dropdown out of the render
            // container.
            const {baseElement} = render(
                <Marker
                    answers={[]}
                    choices={[]}
                    label={"Marker 1"}
                    onChange={onChange}
                    onRemove={onRemove}
                    x={50}
                    y={50}
                />,
            );

            // Open marker dropdown.
            await userEvent.click(
                screen.getByRole("button", {name: "Edit marker: Marker 1"}),
            );

            // Assert
            expect(screen.getByDisplayValue("Marker 1")).toBeInTheDocument();
            expect(baseElement).toMatchSnapshot();
        });

        it("renders with answers and choices", async () => {
            // Arrange
            const onChange = jest.fn();
            const onRemove = jest.fn();

            // Act
            // `baseElement` (document.body) rather than `container`, because
            // Wonder Blocks Popover portals the dropdown out of the render
            // container.
            const {baseElement} = render(
                <Marker
                    answers={["Answer 1", "Answer 2"]}
                    choices={["Choice 1", "Choice 2"]}
                    label={"Marker 1"}
                    onChange={onChange}
                    onRemove={onRemove}
                    x={50}
                    y={50}
                />,
            );

            // Open marker dropdown.
            await userEvent.click(
                screen.getByRole("button", {name: "Edit marker: Marker 1"}),
            );

            // Assert
            expect(screen.getByDisplayValue("Marker 1")).toBeInTheDocument();
            expect(screen.getByText("Choice 1")).toBeInTheDocument();
            expect(screen.getByText("Choice 2")).toBeInTheDocument();
            expect(baseElement).toMatchSnapshot();
        });
    });
});
