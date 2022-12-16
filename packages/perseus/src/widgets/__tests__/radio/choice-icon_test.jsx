// @flow

import {render, screen} from "@testing-library/react";
import * as React from "react";

import "@testing-library/jest-dom"; // Imports custom mathers

import ChoiceIcon from "../../radio/choice-icon/choice-icon.jsx";
import {
    SAT_ICON_SIZE,
    LIBRARY_ICON_SIZE,
} from "../../radio/choice-icon/shared-styles.js";

function renderChoiceIcon(options) {
    const defaultOptions = {
        pos: 0,
        checked: false,
        crossedOut: false,
        focused: false,
        hovered: false,
        pressed: false,
        correct: false,
        showCorrectness: false,
        product: "library",
        multipleSelect: false,
        reviewMode: false,
        previouslyAnswered: false,
        transparentBackground: false,
    };

    const overwrittenOptions = {...defaultOptions, ...options};

    return render(<ChoiceIcon {...overwrittenOptions} />);
}

describe("choice icon", () => {
    describe.each([["sat"], ["library"]])("product: %s", (product) => {
        describe.each([[true], [false]])(
            "multipleSelect: %s",
            (multipleSelect) => {
                it("renders with the correct border radius", () => {
                    // Arrange
                    let expectedRadius;
                    if (multipleSelect) {
                        expectedRadius = 3;
                    } else if (product === "sat") {
                        expectedRadius = SAT_ICON_SIZE;
                    } else {
                        expectedRadius = LIBRARY_ICON_SIZE;
                    }

                    // Act
                    renderChoiceIcon({product, multipleSelect});

                    const choiceWrapper = screen.getByTestId(
                        `choice-icon__${product}-choice-icon`,
                    );

                    // Assert
                    expect(choiceWrapper).toHaveStyle(
                        `border-radius: ${expectedRadius}px`,
                    );
                });
            },
        );
    });

    it("shows a checkmark for correct answers when product is set to library", () => {
        // Arrange & Act
        renderChoiceIcon({
            product: "library",
            correct: true,
            reviewMode: true,
            checked: true,
            showCorrectness: true,
        });

        const choiceWrapper = screen.getByTestId(
            `choice-icon__library-choice-icon`,
        );
        const choiceAttrib = choiceWrapper.getAttribute("class");

        // Assert
        expect(choiceAttrib).toContain("circleCorrect");
    });

    it("shows a dash for incorrect answers when product is set to library", () => {
        // Arrange & Act
        renderChoiceIcon({
            product: "library",
            correct: false,
            reviewMode: true,
            checked: true,
            showCorrectness: true,
        });

        const choiceWrapper = screen.getByTestId(
            `choice-icon__library-choice-icon`,
        );
        const choiceAttrib = choiceWrapper.getAttribute("class");

        // Assert
        expect(choiceAttrib).toContain("circleIncorrect");
    });

    it("displays green border for correct answers when product is set to sat", () => {
        // Arrange & Act
        renderChoiceIcon({
            product: "sat",
            correct: true,
            reviewMode: true,
            checked: true,
        });

        const choiceWrapper = screen.getByTestId(
            `choice-icon__sat-choice-icon`,
        );
        const choiceStyle = choiceWrapper.getAttribute("style");

        // Assert
        expect(choiceStyle).toContain("border-color: #009900");
    });

    it("displays red border for incorrect answers when product is set to sat", () => {
        // Arrange & Act
        renderChoiceIcon({
            product: "sat",
            correct: false,
            reviewMode: true,
            checked: true,
        });

        const choiceWrapper = screen.getByTestId(
            `choice-icon__sat-choice-icon`,
        );
        const choiceStyle = choiceWrapper.getAttribute("style");

        // Assert
        expect(choiceStyle).toContain("border-color: #990000");
    });
});
