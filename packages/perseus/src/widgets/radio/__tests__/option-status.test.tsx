import {describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import OptionStatus from "../option-status";

function renderOptionStatus(
    options:
        | {
              checked: any;
              correct: boolean;
          }
        | {
              correct: any;
          }
        | {
              correct: boolean;
              crossedOut: boolean;
          },
) {
    const defaultOptions = {
        correct: false,
        checked: false,
        crossedOut: false,
        previouslyAnswered: false,
        reviewMode: true,
    } as const;

    const overwrittenOptions = {...defaultOptions, ...options} as const;

    return render(<OptionStatus {...overwrittenOptions} />);
}

describe("answer text", () => {
    it.each([
        [true, "Correct"],
        [false, "Incorrect"],
    ])(
        "renders with the correct text based on 'correct' prop: %s => %s",
        (correct, expectedText) => {
            // Arrange/Act
            renderOptionStatus({correct: correct});
            const optionStatus = screen.getByText(expectedText);

            // Assert
            expect(optionStatus).toBeVisible();
        },
    );

    it.each([
        [true, "Incorrect (selected)"],
        [false, "Incorrect"],
    ])(
        "renders with the correct text based on 'checked' prop: %s => %s",
        (checked, expectedText) => {
            // Arrange/Act
            renderOptionStatus({correct: false, checked: checked});
            const optionStatus = screen.getByText(expectedText);

            // Assert
            expect(optionStatus).toBeVisible();
        },
    );
});
