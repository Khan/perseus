// @flow

import {render, screen} from "@testing-library/react";
import * as React from "react";

import "@testing-library/jest-dom"; // Imports custom mathers

import OptionStatus from "../../radio/option-status.jsx";

function renderOptionStatus(options) {
    const defaultOptions = {
        correct: false,
        checked: false,
        crossedOut: false,
        previouslyAnswered: false,
        reviewMode: true,
    };

    const overwrittenOptions = {...defaultOptions, ...options};

    return render(<OptionStatus {...overwrittenOptions} />);
}

describe("answer text", () => {
    describe.each([[true], [false]])("correct: %s", (correct) => {
        it("renders with the correct text based on correct prop", () => {
            // Arrange/Act
            renderOptionStatus({correct: correct});
            const expectedText = correct ? "Correct" : "Incorrect";

            // Assert - Will fail if the element has the incorrect inner text
            const optionStatus = screen.getByText(expectedText);
        });
    });

    describe.each([[true], [false]])("checked: %s", (checked) => {
        it("renders with the correct text based on checked prop", () => {
            // Arrange/Act
            renderOptionStatus({checked: checked});
            const expectedText = checked ? "Incorrect (selected)" : "Incorrect";

            // Assert - Will fail if the element has the incorrect inner text
            const optionStatus = screen.getByText(expectedText);
        });
    });

    // describe.each([[true], [false]])(
    //     "previouslyAnswered: %s",
    //     (previouslyAnswered) => {
    //         it("renders with the correct class based on previouslyAnswered prop", () => {
    //             // Arrange/Act
    //             renderOptionStatus({
    //                 previouslyAnswered: previouslyAnswered,
    //             });

    //             // Assert - Will fail if the element has the incorrect inner text
    //             const optionStatus = screen.getByText("Incorrect");
    //         });
    //     },
    // );

    it("renders with correct text based on crossedOut and correct", () => {
        // Arrange/Act
        renderOptionStatus({crossedOut: true, correct: true});

        // Assert - Will fail if the element has the incorrect inner text
        const optionStatus = screen.getByText(
            "Correct (but you crossed it out)",
        );
    });
});
