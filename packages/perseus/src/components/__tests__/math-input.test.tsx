import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import MathInput from "../math-input";

const allButtonSets = {
    advancedRelations: true,
    basicRelations: true,
    divisionKey: true,
    logarithms: true,
    preAlgebra: true,
    trigonometry: true,
};

describe("Perseus' MathInput", () => {
    let userEvent: ReturnType<typeof userEventLib.setup>;
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
        // Assemble
        render(
            <MathInput
                onChange={() => {}}
                keypadButtonSets={allButtonSets}
                labelText="test"
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
                convertDotToTimes={false}
                value=""
            />,
        );
        jest.runOnlyPendingTimers();

        // Assert
        expect(screen.getByLabelText("test")).toBeInTheDocument();
    });

    it("is possible to type in the input", async () => {
        // Assemble
        const mockOnChange = jest.fn();
        render(
            <MathInput
                onChange={mockOnChange}
                keypadButtonSets={allButtonSets}
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
                convertDotToTimes={false}
                value=""
            />,
        );
        jest.runOnlyPendingTimers();

        // Act
        await userEvent.type(screen.getByRole("textbox"), "12345");
        jest.runOnlyPendingTimers();

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("12345");
    });

    it("is possible to use buttons", async () => {
        // Assemble
        const mockOnChange = jest.fn();
        render(
            <MathInput
                onChange={mockOnChange}
                keypadButtonSets={allButtonSets}
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
                convertDotToTimes={false}
                value=""
            />,
        );
        jest.runOnlyPendingTimers();

        // Act
        screen.getByRole("button").click();
        await userEvent.click(screen.getByRole("button", {name: "1"}));
        await userEvent.click(screen.getByRole("button", {name: "Plus"}));
        await userEvent.click(screen.getByRole("button", {name: "2"}));
        await userEvent.click(screen.getByRole("button", {name: "Minus"}));
        await userEvent.click(screen.getByRole("button", {name: "3"}));
        jest.runOnlyPendingTimers();

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("1+2-3");
    });

    it("is possible to use buttons with legacy props", async () => {
        // Assemble
        const mockOnChange = jest.fn();
        render(
            <MathInput
                onChange={mockOnChange}
                buttonSets={["basic+div"]}
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
                convertDotToTimes={false}
                value=""
            />,
        );
        jest.runOnlyPendingTimers();

        // Act
        // focusing the input triggers the popover
        screen.getByRole("button").click();
        await userEvent.click(screen.getByRole("button", {name: "1"}));
        await userEvent.click(screen.getByRole("button", {name: "Plus"}));
        await userEvent.click(screen.getByRole("button", {name: "2"}));
        await userEvent.click(screen.getByRole("button", {name: "Divide"}));
        await userEvent.click(screen.getByRole("button", {name: "3"}));
        jest.runOnlyPendingTimers();

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("1+2\\div3");
    });

    it("returns focus to input after button click", async () => {
        // Assemble
        render(
            <MathInput
                onChange={() => {}}
                keypadButtonSets={allButtonSets}
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
                convertDotToTimes={false}
                value=""
            />,
        );
        jest.runOnlyPendingTimers();

        // Act
        // focusing the input triggers the popover
        screen.getByRole("button").click();
        await userEvent.click(screen.getByRole("button", {name: "1"}));

        // Assert
        expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("does not return focus to input after button press via keyboard", async () => {
        // Assemble
        render(
            <MathInput
                onChange={() => {}}
                keypadButtonSets={allButtonSets}
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
                convertDotToTimes={false}
                value=""
            />,
        );
        jest.runOnlyPendingTimers();

        // Act
        // focusing the input triggers the popover
        screen.getByRole("button").click();
        await userEvent.tab(); // to "123" tab
        await userEvent.tab(); // to "1" button
        await userEvent.keyboard("{enter}");
        jest.runOnlyPendingTimers();

        // Assert
        expect(screen.getByRole("textbox")).not.toHaveFocus();
    });

    it("does not focus on the keypad button when it is clicked with the mouse", () => {
        // Assemble
        render(
            <MathInput
                onChange={() => {}}
                buttonsVisible="always"
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
                convertDotToTimes={false}
                value=""
            />,
        );

        // Act
        const button = screen.getByRole("button", {name: "1"});
        button.click();

        // Assert
        expect(screen.getByRole("button", {name: "1"})).not.toHaveFocus();
        expect(screen.getByRole("textbox")).toHaveFocus();
    });
});
