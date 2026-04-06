import {describe, it} from "@jest/globals";
import {act, render, screen} from "@testing-library/react";
import * as React from "react";

import Choice from "../choice";
import * as IndicatorComponent from "../choice-indicator";

import type {IndicatorContent} from "../choice-indicator";

const indicatorContent: IndicatorContent = {
    visible: "A",
    screenReader: "Choice A",
};

describe("Radio widget choice option", () => {
    it.each`
        isMultiSelect | isOrIsNot   | shape
        ${false}      | ${"is NOT"} | ${"circle"}
        ${true}       | ${"is"}     | ${"square"}
    `(
        "renders with a $shape indicator when choice $isOrIsNot multi-select",
        (args) => {
            const {isMultiSelect, shape} = args as {
                isMultiSelect: boolean;
                shape: "circle" | "square";
            };
            const indicatorSpy = jest.spyOn(IndicatorComponent, "default");
            render(
                <Choice
                    checked={false}
                    indicatorContent={indicatorContent}
                    isMultiSelect={isMultiSelect}
                    updateChecked={() => {}}
                >
                    Option A
                </Choice>,
            );
            expect(indicatorSpy.mock.calls[0][0].shape).toBe(shape);
        },
    );

    it.each`
        showCorrectness | stylingDescription
        ${"correct"}    | ${"proper styling for correctness"}
        ${"wrong"}      | ${"proper styling for wrongness"}
        ${undefined}    | ${"no additional styling when not in review mode"}
    `("applies $stylingDescription", (args) => {
        const {showCorrectness} = args as {
            showCorrectness: "correct" | "wrong" | undefined;
        };
        const correctnessClasses = ["is-correct", "is-wrong"];
        const classToExpect = showCorrectness ? [`is-${showCorrectness}`] : [];
        const classesToNotExpect = correctnessClasses.filter(
            (className) => !classToExpect.includes(className),
        );
        render(
            <Choice
                checked={false}
                indicatorContent={indicatorContent}
                isMultiSelect={false}
                showCorrectness={showCorrectness}
                updateChecked={() => {}}
            >
                Option A
            </Choice>,
        );
        const classes = Array.from(screen.getByRole("listitem").classList);
        expect(classes).toEqual(expect.arrayContaining(classToExpect));
        expect(classes).not.toEqual(expect.arrayContaining(classesToNotExpect));
    });

    it.each`
        showCorrectness | doesOrDoesNot | callCount
        ${"correct"}    | ${"does NOT"} | ${0}
        ${"wrong"}      | ${"does NOT"} | ${0}
        ${undefined}    | ${"does"}     | ${1}
    `(
        "click handler $doesOrDoesNot work when correctness is $showCorrectness",
        (args) => {
            const {showCorrectness, callCount} = args as {
                showCorrectness: "correct" | "wrong" | undefined;
                callCount: number;
            };
            const updateCheckedMock = jest.fn();
            render(
                <Choice
                    checked={false}
                    indicatorContent={indicatorContent}
                    isMultiSelect={false}
                    showCorrectness={showCorrectness}
                    updateChecked={updateCheckedMock}
                >
                    Option A
                </Choice>,
            );
            const choiceElement = screen.getByRole("listitem");
            act(() => {
                choiceElement.click();
            });
            expect(updateCheckedMock).toHaveBeenCalledTimes(callCount);
        },
    );
});
