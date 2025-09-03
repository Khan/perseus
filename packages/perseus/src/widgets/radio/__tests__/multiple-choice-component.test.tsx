import {describe, it} from "@jest/globals";
import {act, render, screen} from "@testing-library/react";
import * as React from "react";

import * as Choice from "../choice.new";
import MultipleChoiceComponent from "../multiple-choice-component.new";

import type {MultipleChoiceComponentProps} from "../multiple-choice-component.new";
import type {ChoiceType} from "../multiple-choice-widget.new";

type overrideProps = {
    choiceOverrides?: Partial<ChoiceType>;
    onChoiceChange?: (choiceId: string, newCheckedState: boolean) => void;
    reviewMode?: boolean;
};

const baseChoiceValues = {
    checked: false,
    content: "",
    id: "choice-1",
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

const getComponentProps = (props?: overrideProps) => {
    const {
        choiceOverrides = {},
        onChoiceChange = () => {},
        reviewMode = false,
    } = props || {};
    const choices = {...baseChoiceValues, ...choiceOverrides};
    return {
        choices: [choices],
        onChoiceChange,
        reviewMode,
        countChoices: false,
        numCorrect: 1,
    } as MultipleChoiceComponentProps;
};

describe("Multiple choice component", () => {
    let choiceSpy: jest.SpyInstance;

    beforeEach(() => {
        choiceSpy = jest.spyOn(Choice, "default");
    });

    describe("styling", () => {
        it("applies expected styling by default", () => {
            /*
                Testing for a CSS class here primarily for test coverage.
                Verifying the base case here since subsequent tests check for changes.
             */
            const props = getComponentProps();
            render(<MultipleChoiceComponent {...props} />);
            const classes = Array.from(screen.getByRole("list").classList);
            expect(classes).toHaveLength(1);
            expect(classes).toContain(`choice-list`);
        });

        it("adjusts the margin of the options and rationale when in review mode", () => {
            const props = getComponentProps({reviewMode: true});
            render(<MultipleChoiceComponent {...props} />);
            const classes = Array.from(screen.getByRole("list").classList);
            expect(classes).toContain(`review-answers`);
        });

        it("applies expected stying to rationale", () => {
            const rationaleContent = "foo-bar-zot";
            const choiceOverrides = {
                rationale: rationaleContent,
                hasRationale: true,
            };
            const props = getComponentProps({
                choiceOverrides,
                reviewMode: true,
            });
            render(<MultipleChoiceComponent {...props} />);
            const classes = Array.from(
                screen.getByText(rationaleContent).classList,
            );
            expect(classes).toEqual(expect.arrayContaining(["rationale"]));
        });

        it("applies EXTRA styling to rationale for correct choices", () => {
            const rationaleContent = "foo-bar-zot";
            const choiceOverrides = {
                rationale: rationaleContent,
                hasRationale: true,
                showCorrectness: true,
                correct: true,
            };
            const props = getComponentProps({
                choiceOverrides,
                reviewMode: true,
            });
            render(<MultipleChoiceComponent {...props} />);
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
            ${false}   | ${true}   | ${undefined}        | ${"NOT in review mode and choice is correct"}
            ${true}    | ${true}   | ${"correct"}        | ${"in review mode and choice is correct"}
            ${true}    | ${false}  | ${"wrong"}          | ${"in review mode and choice is NOT correct"}
            ${false}   | ${false}  | ${undefined}        | ${"NOT in review mode and choice is NOT correct"}
        `("sends '$expectedCorrectness' to the choice when $when", (args) => {
            type testArgs = {
                reviewMode: boolean;
                isCorrect: boolean;
                expectedCorrectness: "correct" | "wrong" | undefined;
            };
            const {reviewMode, isCorrect, expectedCorrectness} =
                args as testArgs;
            const choiceOverrides = {correct: isCorrect};
            const props = getComponentProps({
                choiceOverrides,
                reviewMode,
            });
            render(<MultipleChoiceComponent {...props} />);
            expect(choiceSpy.mock.calls[0][0].showCorrectness).toBe(
                expectedCorrectness,
            );
        });
    });

    describe("content", () => {
        it("uses the provided content in the choice component", () => {
            const choiceOverrides = {content: "foo-bar-zot"};
            const props = getComponentProps({
                choiceOverrides,
            });
            render(<MultipleChoiceComponent {...props} />);
            expect(screen.getByText("foo-bar-zot")).toBeInTheDocument();
        });

        it("uses the i18n version of 'None of the above' when the choice is set as such", () => {
            const choiceOverrides = {
                isNoneOfTheAbove: true,
                content: "foo-bar-zot",
            };
            const props = getComponentProps({
                choiceOverrides,
            });
            render(<MultipleChoiceComponent {...props} />);
            expect(screen.queryByText("foo-bar-zot")).not.toBeInTheDocument();
            expect(screen.getByText("None of the above")).toBeInTheDocument();
        });

        it("shows the provided rationale when in review mode", () => {
            const choiceContent = "choice foo";
            const rationaleContent = "rationale bar";
            const choiceOverrides = {
                content: choiceContent,
                rationale: rationaleContent,
                hasRationale: true,
            };
            const props = getComponentProps({
                choiceOverrides,
                reviewMode: true,
            });
            render(<MultipleChoiceComponent {...props} />);
            expect(screen.getByText(rationaleContent)).toBeInTheDocument();
        });

        it("does NOT show the provided rationale when NOT in review mode", () => {
            const choiceContent = "choice foo";
            const rationaleContent = "rationale bar";
            const choiceOverrides = {
                content: choiceContent,
                rationale: rationaleContent,
                hasRationale: true,
            };
            const props = getComponentProps({
                choiceOverrides,
            });
            render(<MultipleChoiceComponent {...props} />);
            expect(
                screen.queryByText(rationaleContent),
            ).not.toBeInTheDocument();
        });

        it("does NOT show the provided rationale when rationale has NO content", () => {
            const choiceContent = "choice foo";
            const rationaleContent = "rationale bar";
            const choiceOverrides = {
                content: choiceContent,
                rationale: rationaleContent,
                hasRationale: false,
            };
            const props = getComponentProps({
                choiceOverrides,
                reviewMode: true,
            });
            render(<MultipleChoiceComponent {...props} />);
            expect(
                screen.queryByText(rationaleContent),
            ).not.toBeInTheDocument();
        });

        it.each`
            reviewMode | isCorrect | expectedLabel            | shows              | when
            ${true}    | ${true}   | ${"(Choice A, Correct)"} | ${"shows"}         | ${"when in review mode and choice is correct"}
            ${true}    | ${false}  | ${"(Choice A)"}          | ${"does NOT show"} | ${"when in review mode and choice is NOT correct"}
            ${false}   | ${true}   | ${"(Choice A)"}          | ${"does NOT show"} | ${"when NOT in review mode and choice is correct"}
            ${false}   | ${false}  | ${"(Choice A)"}          | ${"does NOT show"} | ${"when NOT in review mode and choice is NOT correct"}
        `("$shows correctness in the accessible name $when", (args) => {
            type testArgs = {
                reviewMode: boolean;
                isCorrect: boolean;
                expectedLabel: string;
            };
            const {reviewMode, isCorrect, expectedLabel} = args as testArgs;
            const choiceOverrides = {correct: isCorrect};
            const props = getComponentProps({
                choiceOverrides,
                reviewMode,
            });
            render(<MultipleChoiceComponent {...props} />);
            expect(screen.getByRole("button")).toHaveAttribute(
                "aria-label",
                expectedLabel,
            );
        });
    });

    describe("functionality", () => {
        it("calls the 'onChoiceChange' callback when a choice is activated", () => {
            const onChoiceChangeFn = jest.fn();
            const props = getComponentProps({
                onChoiceChange: onChoiceChangeFn,
            });
            render(<MultipleChoiceComponent {...props} />);
            act(() => {
                screen.getByRole("listitem").click();
            });
            expect(onChoiceChangeFn).toHaveBeenCalledTimes(1);
            expect(onChoiceChangeFn.mock.calls[0][0]).toBe("choice-1");
            expect(typeof onChoiceChangeFn.mock.calls[0][1]).toBe("boolean");
        });
    });
});
