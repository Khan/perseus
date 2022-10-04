// @flow

import {render, screen} from "@testing-library/react";
import * as React from "react";

import "@testing-library/jest-dom"; // Imports custom mathers

import ChoiceIcon, {
    SAT_ICON_SIZE,
    LIBRARY_ICON_SIZE,
} from "../../radio/choice-icon.jsx";

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
});
