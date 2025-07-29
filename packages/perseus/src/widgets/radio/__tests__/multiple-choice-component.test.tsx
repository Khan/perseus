import {describe, it} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import * as React from "react";

import MultipleChoiceComponent from "../multiple-choice-component.new";

const baseChoiceValues = {
    checked: false,
    content: "",
    rationale: "",
    hasRationale: false,
    showRationale: false,
    showCorrectness: false,
    correct: false,
    isNoneOfTheAbove: false,
    previouslyAnswered: false,
    revealNoneOfTheAbove: false,
    disabled: false,
};

describe("Multiple choice indicator", () => {
    it("applies singular styling by default", () => {
        render(
            <MultipleChoiceComponent
                choices={[baseChoiceValues]}
                countChoices={false}
                numCorrect={1}
                onChoiceChange={() => {}}
                reviewMode={false}
            />,
        );
        const classes = Array.from(screen.getByRole("list").classList);
        expect(classes).toHaveLength(1);
        expect(classes).toContain(`choiceList`);
    });

    it("adjusts the margin of the options and rationale when in review mode", () => {
        render(
            <MultipleChoiceComponent
                choices={[baseChoiceValues]}
                countChoices={false}
                numCorrect={1}
                onChoiceChange={() => {}}
                reviewMode={true}
            />,
        );
        const classes = Array.from(screen.getByRole("list").classList);
        expect(classes).toContain(`reviewAnswers`);
    });
});
