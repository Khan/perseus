// @flow

import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
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
        questionId: "",
    };

    const overwrittenOptions = {...defaultOptions, ...options};

    return render(
        <RenderStateRoot>
            <Choice {...overwrittenOptions} />
        </RenderStateRoot>,
    );
}

describe("all choice options", () => {
    it("renders rationale", () => {
        // Arrange / Act
        renderChoice({showRationale: true});

        // Assert
        expect(screen.getByText("This is a good rationale")).toBeVisible();
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

    it("shows correct a11y text when in review mode", () => {
        // Arrange / Act
        renderChoice({
            checked: false,
            correct: true,
            showCorrectness: true,
            reviewMode: true,
        });

        // Assert
        expect(
            screen.getByText("(Choice A, Correct) This is a possible choice"),
        ).toBeVisible();
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
});

describe("choice button", () => {
    it("selects the choice by clicking the button", () => {
        // Arrange / Act
        const onChangeSpy = jest.fn();
        renderChoice({onChange: onChangeSpy});

        const button = screen.getByRole("button", {hidden: true});
        userEvent.click(button);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({
            checked: true,
            crossedOut: false,
        });
    });

    it("registers as unchecked with checked set to false", () => {
        // Arrange / Act
        renderChoice({checked: false});

        const button = screen.getByRole("listitem");

        // Assert
        expect(button.getAttribute("data-test-checked")).toBe("false");
    });

    it("registers as checked with checked set to true", () => {
        // Arrange / Act
        renderChoice({checked: true});

        const button = screen.getByRole("button", {hidden: true});

        // Assert
        expect(button).toBeChecked();
    });

    it("has correct aria-disabled when disabled", () => {
        // Arrange / Act
        renderChoice({disabled: true});

        const button = screen.getByRole("button", {hidden: true});

        // Assert
        expect(button.getAttribute("aria-disabled")).toBe("true");
    });

    it("has correct aria-disabled when not disabled", () => {
        // Arrange / Act
        renderChoice({disabled: false});

        const button = screen.getByRole("button", {hidden: true});

        // Assert
        expect(button.getAttribute("aria-disabled")).toBe("false");
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
        const button = screen.getByRole("button", {hidden: true});
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
        const button = screen.getByRole("button", {hidden: true});
        userEvent.click(button);

        // Assert
        expect(checked).toBeFalse();
    });
});

describe("choice input (screen reader only)", () => {
    it("selects the choice by clicking the input", () => {
        // Arrange / Act
        const onChangeSpy = jest.fn();
        renderChoice({onChange: onChangeSpy});

        const input = screen.getByRole("radio", {
            name: "(Choice A) This is a possible choice",
        });
        userEvent.click(input);

        // Assert
        expect(onChangeSpy).toHaveBeenCalledWith({
            checked: true,
            crossedOut: false,
        });
    });

    it("renders screen reader choice input", () => {
        // Arrange / Act
        renderChoice();

        const input = screen.getByRole("radio", {
            name: "(Choice A) This is a possible choice",
        });

        // Assert
        expect(input).toBeVisible();
    });

    it("has correct a11y text when checked", () => {
        // Arrange / Act
        renderChoice({checked: true});

        const button = screen.getByRole("radio", {
            name: "(Choice A, Checked) This is a possible choice",
        });

        // Assert
        expect(button).toBeChecked();
    });

    it("has correct a11y text when crossed out", () => {
        // Arrange / Act
        renderChoice({crossedOut: true});

        const button = screen.getByRole("radio", {
            name: "(Choice A, Crossed out) This is a possible choice",
        });

        // Assert
        expect(button).toBeVisible();
    });

    it("has correct a11y text when incorrect, crossed out, and showCorrectness is true", () => {
        // Arrange / Act
        renderChoice({crossedOut: true, correct: false, showCorrectness: true});

        const button = screen.getByRole("radio", {
            name: "(Choice A, Crossed out, Incorrect) This is a possible choice",
        });

        // Assert
        expect(button).toBeVisible();
    });

    it("has correct a11y text when correct, crossed out, and showCorrectness is true", () => {
        // Arrange / Act
        renderChoice({crossedOut: true, correct: true, showCorrectness: true});

        const button = screen.getByRole("radio", {
            name: "(Choice A, Crossed out, Correct) This is a possible choice",
        });

        // Assert
        expect(button).toBeVisible();
    });
});
