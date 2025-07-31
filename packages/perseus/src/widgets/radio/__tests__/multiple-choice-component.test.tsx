import {describe, it} from "@jest/globals";
import {act, render, screen} from "@testing-library/react";
import * as React from "react";

import * as Choice from "../choice.new";
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

describe("Multiple choice component", () => {
    let choiceSpy: jest.SpyInstance;

    beforeEach(() => {
        choiceSpy = jest.spyOn(Choice, "default");
    });

    describe("styling", () => {
        it("applies expected styling by default", () => {
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
            expect(classes).toContain(`choice-list`);
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
            expect(classes).toContain(`review-answers`);
        });

        it("applies expected stying to rationale", () => {
            const rationaleContent = "foo-bar-zot";
            const choiceValues = {
                ...baseChoiceValues,
                rationale: rationaleContent,
                hasRationale: true,
            };
            render(
                <MultipleChoiceComponent
                    choices={[choiceValues]}
                    countChoices={false}
                    numCorrect={1}
                    onChoiceChange={() => {}}
                    reviewMode={true}
                />,
            );
            const classes = Array.from(
                screen.getByText(rationaleContent).classList,
            );
            expect(classes).toEqual(expect.arrayContaining(["rationale"]));
        });

        it("applies EXTRA stying to rationale for correct choices", () => {
            const rationaleContent = "foo-bar-zot";
            const choiceValues = {
                ...baseChoiceValues,
                rationale: rationaleContent,
                hasRationale: true,
                showCorrectness: true,
                correct: true,
            };
            render(
                <MultipleChoiceComponent
                    choices={[choiceValues]}
                    countChoices={false}
                    numCorrect={1}
                    onChoiceChange={() => {}}
                    reviewMode={true}
                />,
            );
            const classes = Array.from(
                screen.getByText(rationaleContent).classList,
            );
            expect(classes).toEqual(
                expect.arrayContaining(["rationale", `is-correct`]),
            );
        });
    });

    describe("choice option configuration", () => {
        it.each`
            reviewMode | isCorrect | expectedCorrectness | when
            ${false}   | ${true}   | ${undefined}        | ${"NOT in review mode"}
            ${true}    | ${true}   | ${"correct"}        | ${"in review mode and choice is correct"}
            ${true}    | ${false}  | ${"wrong"}          | ${"in review mode and choice NOT correct"}
        `("sends '$expectedCorrectness' to the choice when $when", (args) => {
            type testArgs = {
                reviewMode: boolean;
                isCorrect: boolean;
                expectedCorrectness: "correct" | "wrong" | undefined;
            };
            const {reviewMode, isCorrect, expectedCorrectness} =
                args as testArgs;
            const choiceValues = {...baseChoiceValues, correct: isCorrect};
            render(
                <MultipleChoiceComponent
                    choices={[choiceValues]}
                    countChoices={false}
                    numCorrect={1}
                    onChoiceChange={() => {}}
                    reviewMode={reviewMode}
                />,
            );
            expect(choiceSpy.mock.calls[0][0].showCorrectness).toBe(
                expectedCorrectness,
            );
        });
    });

    describe("content", () => {
        it("uses the provided content in the choice component", () => {
            const choiceValues = {...baseChoiceValues, content: "foo-bar-zot"};
            render(
                <MultipleChoiceComponent
                    choices={[choiceValues]}
                    countChoices={false}
                    numCorrect={1}
                    onChoiceChange={() => {}}
                    reviewMode={false}
                />,
            );
            expect(screen.getByText("foo-bar-zot")).toBeInTheDocument();
        });

        it("uses the i18n version of 'None of the above' when the choice is set as such", () => {
            const choiceValues = {
                ...baseChoiceValues,
                isNoneOfTheAbove: true,
                content: "foo-bar-zot",
            };
            render(
                <MultipleChoiceComponent
                    choices={[choiceValues]}
                    countChoices={false}
                    numCorrect={1}
                    onChoiceChange={() => {}}
                    reviewMode={false}
                />,
            );
            expect(screen.queryByText("foo-bar-zot")).not.toBeInTheDocument();
            expect(screen.getByText("None of the above")).toBeInTheDocument();
        });

        it("shows the provided rationale when in review mode", () => {
            const choiceContent = "choice foo";
            const rationaleContent = "rationale bar";
            const choiceValues = {
                ...baseChoiceValues,
                content: choiceContent,
                rationale: rationaleContent,
                hasRationale: true,
            };
            render(
                <MultipleChoiceComponent
                    choices={[choiceValues]}
                    countChoices={false}
                    numCorrect={1}
                    onChoiceChange={() => {}}
                    reviewMode={true}
                />,
            );
            expect(screen.getByText(rationaleContent)).toBeInTheDocument();
        });

        it("does NOT show the provided rationale when NOT in review mode", () => {
            const choiceContent = "choice foo";
            const rationaleContent = "rationale bar";
            const choiceValues = {
                ...baseChoiceValues,
                content: choiceContent,
                rationale: rationaleContent,
                hasRationale: true,
            };
            render(
                <MultipleChoiceComponent
                    choices={[choiceValues]}
                    countChoices={false}
                    numCorrect={1}
                    onChoiceChange={() => {}}
                    reviewMode={false}
                />,
            );
            expect(
                screen.queryByText(rationaleContent),
            ).not.toBeInTheDocument();
        });

        it("does NOT show the provided rationale when rationale has NO content", () => {
            const choiceContent = "choice foo";
            const rationaleContent = "rationale bar";
            const choiceValues = {
                ...baseChoiceValues,
                content: choiceContent,
                rationale: rationaleContent,
                hasRationale: false,
            };
            render(
                <MultipleChoiceComponent
                    choices={[choiceValues]}
                    countChoices={false}
                    numCorrect={1}
                    onChoiceChange={() => {}}
                    reviewMode={true}
                />,
            );
            expect(
                screen.queryByText(rationaleContent),
            ).not.toBeInTheDocument();
        });
    });

    describe("functionality", () => {
        it("calls the 'onChoiceChange' callback when a choice is activated", () => {
            const onChoiceChangeFn = jest.fn();
            render(
                <MultipleChoiceComponent
                    choices={[baseChoiceValues]}
                    countChoices={false}
                    numCorrect={1}
                    onChoiceChange={onChoiceChangeFn}
                    reviewMode={false}
                />,
            );
            act(() => {
                screen.getByRole("listitem").click();
            });
            expect(onChoiceChangeFn).toHaveBeenCalledTimes(1);
            expect(onChoiceChangeFn.mock.calls[0][0]).toBe(0);
            expect(typeof onChoiceChangeFn.mock.calls[0][1]).toBe("boolean");
        });
    });
});
