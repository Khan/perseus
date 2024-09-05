import {describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import ChoiceIcon from "../choice-icon/choice-icon";
import {CHOICE_ICON_SIZE} from "../choice-icon/shared-styles";

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
        multipleSelect: false,
        reviewMode: false,
        previouslyAnswered: false,
    } as const;

    const overwrittenOptions = {...defaultOptions, ...options} as const;

    return render(<ChoiceIcon {...overwrittenOptions} />);
}

describe("choice icon", () => {
    describe.each([[true], [false]])("multipleSelect: %s", (multipleSelect) => {
        it("renders with the correct border radius", () => {
            // Arrange
            let expectedRadius;
            if (multipleSelect) {
                expectedRadius = 3;
            } else {
                expectedRadius = CHOICE_ICON_SIZE;
            }

            // Act
            renderChoiceIcon({multipleSelect});

            const choiceWrapper = screen.getByTestId(
                `choice-icon__library-choice-icon`,
            );

            // Assert
            expect(choiceWrapper).toHaveStyle(
                `border-radius: ${expectedRadius}px`,
            );
        });
    });

    it("shows a checkmark for correct answers", () => {
        // Arrange & Act
        renderChoiceIcon({
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

    it("shows a dash for incorrect answers", () => {
        // Arrange & Act
        renderChoiceIcon({
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
});
