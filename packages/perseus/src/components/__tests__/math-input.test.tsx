import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import MathInput from "../math-input";

import type {KeypadButtonSets} from "../math-input";
import type {UserEvent} from "@testing-library/user-event";

const allButtonSets: KeypadButtonSets = {
    advancedRelations: true,
    basicRelations: true,
    divisionKey: true,
    logarithms: true,
    preAlgebra: true,
    trigonometry: true,
    scientific: true,
};

describe("Perseus' MathInput", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        jest.useFakeTimers();
    });

    it("renders", () => {
        // Arrange
        render(
            <MathInput
                onChange={() => {}}
                keypadButtonSets={allButtonSets}
                onAnalyticsEvent={() => Promise.resolve()}
                convertDotToTimes={false}
                value=""
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(
            screen.getByRole("textbox", {name: "Math input:"}),
        ).toBeInTheDocument();
    });

    it("provides a default aria label", () => {
        // Arrange
        render(
            <MathInput
                onChange={() => {}}
                keypadButtonSets={allButtonSets}
                onAnalyticsEvent={() => Promise.resolve()}
                convertDotToTimes={false}
                value=""
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(
            screen.getByRole("textbox", {name: "Math input:"}),
        ).toBeInTheDocument();
    });

    it("is possible to overwrite the aria label", () => {
        // Arrange
        render(
            <MathInput
                onChange={() => {}}
                keypadButtonSets={allButtonSets}
                onAnalyticsEvent={() => Promise.resolve()}
                convertDotToTimes={false}
                value=""
                ariaLabel="Hello world"
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(
            screen.getByRole("textbox", {name: "Hello world:"}),
        ).toBeInTheDocument();
    });

    it("is possible to type in the input", async () => {
        // Arrange
        const mockOnChange = jest.fn();
        render(
            <MathInput
                onChange={mockOnChange}
                keypadButtonSets={allButtonSets}
                onAnalyticsEvent={() => Promise.resolve()}
                convertDotToTimes={false}
                value=""
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        // Act
        await userEvent.type(
            screen.getByRole("textbox", {name: "Math input:"}),
            "12345",
        );
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("12345");
    });

    it("is possible to use buttons", async () => {
        // Arrange
        const mockOnChange = jest.fn();
        render(
            <MathInput
                onChange={mockOnChange}
                keypadButtonSets={allButtonSets}
                onAnalyticsEvent={() => Promise.resolve()}
                convertDotToTimes={false}
                value=""
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: /open math keypad/}),
        );
        await userEvent.click(screen.getByRole("button", {name: "1"}));
        await userEvent.click(screen.getByRole("button", {name: "Plus"}));
        await userEvent.click(screen.getByRole("button", {name: "2"}));
        await userEvent.click(screen.getByRole("button", {name: "Minus"}));
        await userEvent.click(screen.getByRole("button", {name: "3"}));
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("1+2-3");
    });

    it("is possible to use the scientific keypad", async () => {
        // Arrange
        const mockOnChange = jest.fn();
        render(
            <MathInput
                onChange={mockOnChange}
                keypadButtonSets={{scientific: true}}
                onAnalyticsEvent={() => Promise.resolve()}
                convertDotToTimes={false}
                value=""
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: /open math keypad/}),
        );
        await userEvent.click(screen.getByRole("button", {name: "2"}));
        await userEvent.click(
            screen.getByRole("button", {name: "Custom exponent"}),
        );
        await userEvent.click(screen.getByRole("button", {name: "2"}));
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("2^{2}");
    });

    it("is possible to use buttons with legacy props", async () => {
        // Arrange
        const mockOnChange = jest.fn();
        render(
            <MathInput
                onChange={mockOnChange}
                buttonSets={["basic+div"]}
                onAnalyticsEvent={() => Promise.resolve()}
                convertDotToTimes={false}
                value=""
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        // Act
        // focusing the input triggers the popover
        await userEvent.click(
            screen.getByRole("button", {name: /open math keypad/}),
        );
        await userEvent.click(screen.getByRole("button", {name: "1"}));
        await userEvent.click(screen.getByRole("button", {name: "Plus"}));
        await userEvent.click(screen.getByRole("button", {name: "2"}));
        await userEvent.click(screen.getByRole("button", {name: "Divide"}));
        await userEvent.click(screen.getByRole("button", {name: "3"}));
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("1+2\\div3");
    });

    it("returns focus to input after button click", async () => {
        // Arrange
        render(
            <MathInput
                onChange={() => {}}
                keypadButtonSets={allButtonSets}
                onAnalyticsEvent={() => Promise.resolve()}
                convertDotToTimes={false}
                value=""
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        // Act
        // focusing the input triggers the popover
        await userEvent.click(
            screen.getByRole("button", {name: /open math keypad/}),
        );
        await userEvent.click(screen.getByRole("button", {name: "1"}));

        // Assert
        expect(screen.getByRole("textbox", {name: /Math input/})).toHaveFocus();
    });

    it("does not return focus to input after button press via keyboard", async () => {
        // Arrange
        render(
            <MathInput
                onChange={() => {}}
                keypadButtonSets={allButtonSets}
                onAnalyticsEvent={() => Promise.resolve()}
                convertDotToTimes={false}
                value=""
            />,
        );
        act(() => jest.runOnlyPendingTimers());

        // Act
        // focusing the input triggers the popover
        await userEvent.click(
            screen.getByRole("button", {name: /open math keypad/}),
        );
        await userEvent.tab(); // to "123" tab
        await userEvent.tab(); // to "1" button
        await userEvent.keyboard("{enter}");
        act(() => jest.runOnlyPendingTimers());

        // Assert
        expect(
            screen.getByRole("textbox", {name: "Math input:"}),
        ).not.toHaveFocus();
    });

    it("does not focus on the keypad button when it is clicked with the mouse", async () => {
        // Arrange
        render(
            <MathInput
                onChange={() => {}}
                buttonsVisible="always"
                onAnalyticsEvent={() => Promise.resolve()}
                convertDotToTimes={false}
                value=""
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("button", {name: "1"}));

        // Assert
        expect(screen.getByRole("button", {name: "1"})).not.toHaveFocus();
        expect(screen.getByRole("textbox")).toHaveFocus();
    });
});
