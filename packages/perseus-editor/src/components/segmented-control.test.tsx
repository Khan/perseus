import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {SegmentedControl, ToggleButtonGroup} from "./segmented-control";

import type {UserEvent} from "@testing-library/user-event";

const options = [
    {value: "a", label: "A"},
    {value: "b", label: "B"},
    {value: "c", label: "C"},
];

describe("SegmentedControl", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders each option as a radio in a radiogroup", () => {
        // Arrange, Act
        render(
            <SegmentedControl
                aria-label="Letter"
                options={options}
                selectedValue="a"
                onChange={() => {}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("radiogroup", {name: "Letter"}),
        ).toBeInTheDocument();
        expect(screen.getAllByRole("radio")).toHaveLength(3);
    });

    it("marks the selected option as checked", () => {
        // Arrange, Act
        render(
            <SegmentedControl
                options={options}
                selectedValue="b"
                onChange={() => {}}
            />,
        );

        // Assert
        expect(screen.getByRole("radio", {name: "B"})).toBeChecked();
        expect(screen.getByRole("radio", {name: "A"})).not.toBeChecked();
    });

    it("calls onChange with the value when an option is clicked", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <SegmentedControl
                options={options}
                selectedValue="a"
                onChange={onChange}
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("radio", {name: "C"}));

        // Assert
        expect(onChange).toHaveBeenCalledWith("c");
    });

    it("does not call onChange when disabled", async () => {
        // Arrange
        const onChange = jest.fn();
        render(
            <SegmentedControl
                options={options}
                selectedValue="a"
                onChange={onChange}
                disabled={true}
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("radio", {name: "B"}));

        // Assert
        expect(onChange).not.toHaveBeenCalled();
    });
});

describe("ToggleButtonGroup", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it("renders each option as a checkbox in a group", () => {
        // Arrange, Act
        render(
            <ToggleButtonGroup
                aria-label="Letters"
                options={options}
                selectedValues={["a", "c"]}
                onToggle={() => {}}
            />,
        );

        // Assert
        expect(
            screen.getByRole("group", {name: "Letters"}),
        ).toBeInTheDocument();
        expect(screen.getByRole("checkbox", {name: "A"})).toBeChecked();
        expect(screen.getByRole("checkbox", {name: "B"})).not.toBeChecked();
        expect(screen.getByRole("checkbox", {name: "C"})).toBeChecked();
    });

    it("calls onToggle with the value when an option is clicked", async () => {
        // Arrange
        const onToggle = jest.fn();
        render(
            <ToggleButtonGroup
                options={options}
                selectedValues={["a"]}
                onToggle={onToggle}
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("checkbox", {name: "B"}));

        // Assert
        expect(onToggle).toHaveBeenCalledWith("b");
    });

    it("does not call onToggle when disabled", async () => {
        // Arrange
        const onToggle = jest.fn();
        render(
            <ToggleButtonGroup
                options={options}
                selectedValues={[]}
                onToggle={onToggle}
                disabled={true}
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("checkbox", {name: "A"}));

        // Assert
        expect(onToggle).not.toHaveBeenCalled();
    });
});
