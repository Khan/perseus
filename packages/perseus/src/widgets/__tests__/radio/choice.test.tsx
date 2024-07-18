import {describe, it} from "@jest/globals";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import Choice from "../../radio/choice";

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
    } as const;

    const overwrittenOptions = {...defaultOptions, ...options} as const;

    return render(<Choice {...overwrittenOptions} />, {
        wrapper: RenderStateRoot,
    });
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

// Tests 1 of 2 element types used to select a choice
describe("choice button", () => {
    let userEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it.each([[true], [false]])(
        "selects the choice by clicking the option when multiple select is: %s",
        async (multipleSelect: boolean) => {
            // Arrange / Act
            const onChangeSpy = jest.fn();
            renderChoice({onChange: onChangeSpy, multipleSelect});

            const button = screen.getByRole("button", {hidden: true});
            await userEvent.click(button);

            // Assert
            expect(onChangeSpy).toHaveBeenCalledWith({
                checked: true,
                crossedOut: false,
            });
        },
    );

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

    it("can be checked", async () => {
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
        await userEvent.click(button);

        // Assert
        expect(checked).toBe(true);
    });

    it("can be unchecked", async () => {
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
        await userEvent.click(button);

        // Assert
        expect(checked).toBe(false);
    });
});

// Tests 2 of 2 element types used to select a choice
describe("choice input (screen reader only)", () => {
    let userEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it.each([[true], [false]])(
        "selects the choice by clicking the option when multiple select is: %s",
        async (multipleSelect: boolean) => {
            // Arrange / Act
            const onChangeSpy = jest.fn();
            renderChoice({onChange: onChangeSpy, multipleSelect});

            const input = screen.getByRole(
                multipleSelect ? "checkbox" : "radio",
                {
                    name: "(Choice A) This is a possible choice",
                },
            );
            await userEvent.click(input);

            // Assert
            expect(onChangeSpy).toHaveBeenCalledWith({
                checked: true,
                crossedOut: false,
            });
        },
    );

    it("registers as unchecked with checked set to false", () => {
        // Arrange / Act
        renderChoice({checked: false});

        const input = screen.getByRole("radio", {
            name: "(Choice A) This is a possible choice",
        });

        // Assert
        expect(input).not.toBeChecked();
    });

    it("registers as checked with checked set to true", () => {
        // Arrange / Act
        renderChoice({checked: true});

        const input = screen.getByRole("radio", {
            name: "(Choice A, Checked) This is a possible choice",
        });

        // Assert
        expect(input).toBeChecked();
    });

    it("has correct a11y text when crossed out", () => {
        // Arrange / Act
        renderChoice({crossedOut: true});

        const input = screen.getByRole("radio", {
            name: "(Choice A, Crossed out) This is a possible choice",
        });

        // Assert
        expect(input).toBeVisible();
    });

    it("has correct a11y text when incorrect, crossed out, and showCorrectness is true", () => {
        // Arrange / Act
        renderChoice({crossedOut: true, correct: false, showCorrectness: true});

        const input = screen.getByRole("radio", {
            name: "(Choice A, Crossed out, Incorrect) This is a possible choice",
        });

        // Assert
        expect(input).toBeVisible();
    });

    it("has correct a11y text when correct, crossed out, and showCorrectness is true", () => {
        // Arrange / Act
        renderChoice({crossedOut: true, correct: true, showCorrectness: true});

        const input = screen.getByRole("radio", {
            name: "(Choice A, Crossed out, Correct) This is a possible choice",
        });

        // Assert
        expect(input).toBeVisible();
    });

    it("can be checked", async () => {
        // Arrange
        let checked = false;
        renderChoice({
            checked,
            onChange: (next) => {
                checked = next.checked;
            },
        });

        // Act
        const input = screen.getByRole("radio", {
            name: "(Choice A) This is a possible choice",
        });
        await userEvent.click(input);

        // Assert
        expect(checked).toBe(true);
    });

    it("can be unchecked", async () => {
        // Arrange
        let checked = true;
        renderChoice({
            checked,
            onChange: (next) => {
                checked = next.checked;
            },
        });

        // Act
        const input = screen.getByRole("radio", {
            name: "(Choice A, Checked) This is a possible choice",
        });
        await userEvent.click(input);

        // Assert
        expect(checked).toBe(false);
    });
});
