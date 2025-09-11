import {describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import ChoiceIcon from "../choice-icon/choice-icon";

function renderChoiceIcon(options) {
    const defaultOptions = {
        pos: 0,
        checked: false,
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
        it("renders with the correct shape", () => {
            // Arrange
            const expectedClass = multipleSelect
                ? "multiSelectShape"
                : "singleSelectShape";

            // Act
            renderChoiceIcon({multipleSelect});

            const choiceWrapper = screen.getByTestId(
                `choice-icon__library-choice-icon`,
            );
            const choiceAttrib = choiceWrapper.getAttribute("class");

            // Assert
            expect(choiceAttrib).toContain(expectedClass);
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
        expect(choiceAttrib).toContain("choiceCorrect");
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
        expect(choiceAttrib).toContain("choiceIncorrect");
    });
});
