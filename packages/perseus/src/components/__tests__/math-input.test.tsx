import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom/extend-expect";
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
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders", () => {
        // Assemble
        render(
            <MathInput
                onChange={() => {}}
                keypadButtonSets={allButtonSets}
                labelText="test"
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
            />,
        );

        // Assert
        expect(screen.getByLabelText("test")).toBeInTheDocument();
    });

    it("is possible to type in the input", () => {
        // Assemble
        const mockOnChange = jest.fn();
        render(
            <MathInput
                onChange={mockOnChange}
                keypadButtonSets={allButtonSets}
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
            />,
        );

        // Act
        userEvent.type(screen.getByRole("textbox"), "12345");

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("12345");
    });

    it("is possible to use buttons", () => {
        // Assemble
        const mockOnChange = jest.fn();
        render(
            <MathInput
                onChange={mockOnChange}
                keypadButtonSets={allButtonSets}
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
            />,
        );

        // Act
        screen.getByRole("switch").click();
        userEvent.click(screen.getByRole("button", {name: "1"}));
        userEvent.click(screen.getByRole("button", {name: "Plus"}));
        userEvent.click(screen.getByRole("button", {name: "2"}));
        userEvent.click(screen.getByRole("button", {name: "Minus"}));
        userEvent.click(screen.getByRole("button", {name: "3"}));

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("1+2-3");
    });

    it("is possible to use buttons with legacy props", () => {
        // Assemble
        const mockOnChange = jest.fn();
        render(
            <MathInput
                onChange={mockOnChange}
                buttonSets={["basic+div"]}
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
            />,
        );

        // Act
        // focusing the input triggers the popover
        screen.getByRole("switch").click();
        userEvent.click(screen.getByRole("button", {name: "1"}));
        userEvent.click(screen.getByRole("button", {name: "Plus"}));
        userEvent.click(screen.getByRole("button", {name: "2"}));
        userEvent.click(screen.getByRole("button", {name: "Divide"}));
        userEvent.click(screen.getByRole("button", {name: "3"}));

        // Assert
        expect(mockOnChange).toHaveBeenLastCalledWith("1+2\\div3");
    });

    it("returns focus to input after button click", () => {
        // Assemble
        render(
            <MathInput
                onChange={() => {}}
                keypadButtonSets={allButtonSets}
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
            />,
        );

        // Act
        // focusing the input triggers the popover
        screen.getByRole("switch").click();
        userEvent.click(screen.getByRole("button", {name: "1"}));

        // Assert
        expect(screen.getByRole("textbox")).toHaveFocus();
    });

    it("does not return focus to input after button press via keyboard", () => {
        // Assemble
        render(
            <MathInput
                onChange={() => {}}
                keypadButtonSets={allButtonSets}
                analytics={{onAnalyticsEvent: () => Promise.resolve()}}
            />,
        );

        // Act
        // focusing the input triggers the popover
        screen.getByRole("switch").click();
        userEvent.tab(); // to "123" tab
        userEvent.tab(); // to extra keys tab
        userEvent.tab(); // to whole keypad
        userEvent.tab(); // to "1" button
        userEvent.keyboard("{enter}");

        // Assert
        expect(screen.getByRole("textbox")).not.toHaveFocus();
    });
});
