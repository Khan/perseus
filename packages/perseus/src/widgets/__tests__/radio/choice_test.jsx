// @flow

import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import "@testing-library/jest-dom"; // Imports custom mathers

import Choice from "../../radio/choice.jsx";

function renderChoice(options) {
    const defaultOptions = {
        checked: false,
        rationale: "This is a good rationale",
        content: "This is a possible choice",
        correct: true,
        disabled: false,
        pos: 0,
        reviewMode: false,
        showRationale: false,
        showCorrectness: false,
        multipleSelect: false,
        crossedOut: false,
        previouslyAnswered: false,
        ref: {current: null},
    };

    const overwrittenOptions = {...defaultOptions, ...options};

    return render(<Choice {...overwrittenOptions} />);
}

describe("choice", () => {
    it("renders choice content", () => {
        // Arrange / Act
        renderChoice();

        // Assert
        expect(screen.getByText("This is a possible choice")).toBeVisible();
    });

    it("renders rationale", () => {
        // Arrange / Act
        renderChoice({showRationale: true});

        // Assert
        expect(screen.getByText("This is a good rationale")).toBeVisible();
    });

    it("renders choice button", () => {
        // Arrange / Act
        renderChoice();

        const button = screen.getByRole("checkbox", {
            name: "Select Choice A",
        });

        // Assert
        expect(button).toBeVisible();
    });

    it("has correct aria-checked when checked", () => {
        // Arrange / Act
        renderChoice({checked: true});

        const button = screen.getByRole("checkbox", {
            name: "Select Choice A",
        });

        // Assert
        expect(button).toBeChecked();
    });

    it("has correct aria-checked when unchecked", () => {
        // Arrange / Act
        renderChoice({checked: false});

        const button = screen.getByRole("checkbox", {
            name: "Select Choice A",
        });

        // Assert
        expect(button).not.toBeChecked();
    });

    it("has correct aria-disabled when disabled", () => {
        // Arrange / Act
        renderChoice({disabled: true});

        const button = screen.getByRole("checkbox", {
            name: "Select Choice A",
        });

        // Assert
        expect(button.getAttribute("aria-disabled")).toBe("true");
    });

    it("has correct aria-disabled when not disabled", () => {
        // Arrange / Act
        renderChoice({disabled: false});

        const button = screen.getByRole("checkbox", {
            name: "Select Choice A",
        });

        // Assert
        expect(button.getAttribute("aria-disabled")).toBe("false");
    });

    it("shows correct when in review mode", () => {
        // Arrange / Act
        renderChoice({
            checked: false,
            correct: true,
            showCorrectness: true,
            reviewMode: true,
        });

        // Assert
        expect(screen.getByText("Correct")).toBeVisible();
    });

    it("shows correct selected when in review mode", () => {
        // Arrange / Act
        renderChoice({
            checked: true,
            correct: true,
            showCorrectness: true,
            reviewMode: true,
        });

        // Assert
        expect(screen.getByText("Correct (selected)")).toBeVisible();
    });

    it("shows incorrect when in review mode", () => {
        // Arrange / Act
        renderChoice({
            checked: false,
            correct: false,
            showCorrectness: true,
            reviewMode: true,
        });

        // Assert
        expect(screen.getByText("Incorrect")).toBeVisible();
    });

    it("shows incorrect selected when in review mode", () => {
        // Arrange / Act
        renderChoice({
            checked: true,
            correct: false,
            showCorrectness: true,
            reviewMode: true,
        });

        // Assert
        expect(screen.getByText("Incorrect (selected)")).toBeVisible();
    });

    it("can be checked", () => {
        // Arrange
        let checked = false;
        renderChoice({
            checked,
            onChange: (next) => {
                checked = next.checked;
            },
        });

        // Act
        const button = screen.getByRole("checkbox", {
            name: "Select Choice A",
        });
        userEvent.click(button);

        // Assert
        expect(checked).toBeTrue();
    });

    it("can be unchecked", () => {
        // Arrange
        let checked = true;
        renderChoice({
            checked,
            onChange: (next) => {
                checked = next.checked;
            },
        });

        // Act
        const button = screen.getByRole("checkbox", {
            name: "Select Choice A",
        });
        userEvent.click(button);

        // Assert
        expect(checked).toBeFalse();
    });
});
