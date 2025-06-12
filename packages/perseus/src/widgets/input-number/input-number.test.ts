/**
 * Disclaimer: Definitely not thorough enough
 */
import {describe, beforeEach, it} from "@jest/globals";
import {act, screen, waitFor} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import _ from "underscore";

import {testDependencies} from "../../../../../testing/test-dependencies";
import * as Dependencies from "../../dependencies";
import {
    getAnswerfulItem,
    getAnswerlessItem,
    scorePerseusItemTesting,
} from "../../util/test-utils";
import {renderQuestion} from "../__testutils__/renderQuestion";

import InputNumber from "./input-number";
import {question3 as question} from "./input-number.testdata";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

const {transform} = InputNumber;

describe("input-number", function () {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    describe("full render", function () {
        it("Should accept the right answer", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const textbox = await screen.findByRole("textbox");
            await userEvent.click(textbox);
            await userEvent.type(textbox, "1/2");
            const score = scorePerseusItemTesting(
                question,
                renderer.getUserInput(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it("should reject an incorrect answer", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const textbox = await screen.findByRole("textbox");
            await userEvent.click(textbox);
            await userEvent.type(textbox, "0.7");
            const score = scorePerseusItemTesting(
                question,
                renderer.getUserInput(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredIncorrectly();
        });

        it("should refuse to score an incoherent answer", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const textbox = await screen.findByRole("textbox");
            await userEvent.click(textbox);
            await userEvent.type(textbox, "0..7");
            const score = scorePerseusItemTesting(
                question,
                renderer.getUserInput(),
            );

            // Assert
            expect(score).toHaveInvalidInput();
        });
    });

    describe.each([
        [
            {
                content:
                    "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?**  \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 input-number 1]]  \n\n\n\n",
                images: {
                    "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
                        {
                            width: 200,
                            height: 200,
                        },
                },
                widgets: {
                    "input-number 1": {
                        version: {
                            major: 0,
                            minor: 0,
                        },
                        type: "input-number",
                        graded: true,
                        alignment: "default",
                        options: {
                            maxError: 0.1,
                            inexact: false,
                            value: 0.3333333333333333,
                            simplify: "optional",
                            answerType: "rational",
                            size: "normal",
                        },
                    },
                },
            } as PerseusRenderer,
            "1/3",
            "0.4",
        ],
        [
            {
                content:
                    "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?**  \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 input-number 1]]  \n\n\n\n",
                images: {
                    "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
                        {
                            width: 200,
                            height: 200,
                        },
                },
                widgets: {
                    "input-number 1": {
                        version: {
                            major: 0,
                            minor: 0,
                        },
                        type: "input-number",
                        graded: true,
                        alignment: "default",
                        options: {
                            maxError: 0.1,
                            inexact: false,
                            value: 0.3333333333333333,
                            simplify: "required",
                            answerType: "rational",
                            size: "normal",
                        },
                    },
                },
            } as PerseusRenderer,
            "1/3",
            "0.4",
        ],
        [
            {
                content:
                    "A washing machine is being redesigned to handle a greater volume of water.  One part is a pipe with a radius of $3 \\,\\text{cm}$ and a length of $11\\,\\text{cm}$.  It gets replaced with a pipe of radius $4\\,\\text{cm}$, and the same length. \n\n**How many more cubic centimeters of water can the new pipe hold?**\n\n [[\u2603 input-number 1]] $\\text{cm}^3$",
                images: {},
                widgets: {
                    "input-number 1": {
                        type: "input-number",
                        graded: true,
                        options: {
                            maxError: 0.1,
                            inexact: false,
                            value: 241.90263432641407,
                            simplify: "required",
                            answerType: "pi",
                            size: "normal",
                        },
                    },
                },
            } as PerseusRenderer,
            "77 pi",
            "76 pi",
        ],
        [
            {
                content:
                    'Akshat works in a hospital lab.\n\nTo project blood quantities, he wants to know the probability that more than $1$ of the next $7$ donors will have type-A blood. From his previous work, Sorin knows that $\\dfrac14$ of donors have type-A blood.\n\nAkshat uses a computer to produce many samples that simulate the next $7$ donors. The first $8$ samples are shown in the table below where "$\\text{\\red{A}}$" represents a donor *with* type-A blood, and "$\\text{\\blue{Z}}$" represents a donor *without* type-A blood.\n\n**Based on the samples below, estimate the probability that  more than $1$ of the next $7$ donors will have type-A blood.** If necessary, round your answer to the nearest hundredth. [[\u2603 input-number 1]]\n\n*Note: This a small sample to practice with. A larger sample could give a much better estimate.*\n\n | Sample |\n:-: | :-: | \n$1$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}}$\n$2$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$3$ | $\\text{\\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$4$ | $\\text{\\red{A}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$5$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\red{A}}$\n$6$ | $\\text{\\blue{Z}, \\red{A}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$7$ | $\\text{\\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}}$\n$8$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}}$\n\n',
                images: {},
                widgets: {
                    "input-number 1": {
                        type: "input-number",
                        graded: true,
                        options: {
                            maxError: 0.1,
                            inexact: false,
                            value: 0.5,
                            simplify: "optional",
                            answerType: "percent",
                            size: "small",
                        },
                    },
                },
            } as PerseusRenderer,
            "50%",
            "0.56",
        ],
    ])("answer type", (question, correct, incorrect) => {
        it("Should accept the right answer", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const textbox = await screen.findByRole("textbox");
            await userEvent.click(textbox);
            await userEvent.type(textbox, correct);
            const score = scorePerseusItemTesting(
                question,
                renderer.getUserInput(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it("should reject an incorrect answer", async () => {
            // Arrange
            const {renderer} = renderQuestion(question);

            // Act
            const textbox = await screen.findByRole("textbox");
            await userEvent.click(textbox);
            await userEvent.type(textbox, incorrect);
            const score = scorePerseusItemTesting(
                question,
                renderer.getUserInput(),
            );

            // Assert
            expect(score).toHaveBeenAnsweredIncorrectly();
        });
    });

    it("transform should remove the `value` field", function () {
        const editorProps = {
            value: 5,
            simplify: "required",
            size: "normal",
            inexact: false,
            maxError: 0.1,
            answerType: "number",
        } as const;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!transform) {
            throw new Error("transform not defined");
        }
        const widgetProps = transform(editorProps);
        expect(_.has(widgetProps, "value")).toBe(false);
    });
});

describe("getOneCorrectAnswerFromRubric", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("should return undefined if rubric.value is null/undefined", () => {
        // Arrange
        const rubric: Record<string, any> = {};

        // Act
        const result = InputNumber.getOneCorrectAnswerFromRubric?.(rubric);

        // Assert
        expect(result).toBeUndefined();
    });

    it("should return rubric.value if inexact is false", () => {
        // Arrange
        const rubric = {
            value: 0,
            maxError: 0.1,
            inexact: false,
        } as const;

        // Act
        const result = InputNumber.getOneCorrectAnswerFromRubric?.(rubric);

        // Assert
        expect(result).toEqual("0");
    });

    it("should return rubric.value with an error band if inexact is true", () => {
        // Arrange
        const rubric = {
            value: 0,
            maxError: 0.1,
            inexact: true,
        } as const;

        // Act
        const result = InputNumber.getOneCorrectAnswerFromRubric?.(rubric);

        // Assert
        expect(result).toEqual("0 ± 0.1");
    });
});

describe("rendering", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("supports mobile rendering", () => {
        const {container} = renderQuestion(question, {
            // Setting this triggers mobile rendering
            // it would be nice if this was more clear in the code
            customKeypad: true,
        });

        expect(container).toMatchSnapshot("mobile render");
    });
});

describe("focus state", () => {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("supports focusing", async () => {
        //  Arrange
        const {renderer} = renderQuestion(question);

        // Act
        const gotFocus = await act(() => renderer.focus());

        // Assert
        expect(screen.getByRole("textbox")).toHaveFocus();
        expect(gotFocus).toBe(true);
    });

    it("supports blurring", async () => {
        //  Arrange
        const {renderer} = renderQuestion(question);
        await act(() => renderer.focus());
        expect(screen.getByRole("textbox")).toHaveFocus();

        // Act
        await act(() => renderer.blur());

        // Assert
        await waitFor(() => {
            expect(screen.getByRole("textbox")).not.toHaveFocus();
        });
    });
});

function getAnswerlessInputNumber() {
    return getAnswerlessItem("input-number", {
        simplify: "optional",
        size: "normal",
        value: 42,
    });
}

function getAnswerfulInputNumber() {
    return getAnswerfulItem("input-number", {
        simplify: "optional",
        size: "normal",
        value: 42,
    });
}

it("removes answers from item data", () => {
    expect(
        getAnswerfulInputNumber().question.widgets["input-number 1"].options
            .value,
    ).toBe(42);
    expect(
        getAnswerlessInputNumber().question.widgets["input-number 1"].options
            .value,
    ).toBeUndefined();
});

describe.each([
    ["answerless", getAnswerlessInputNumber()],
    ["answerful", getAnswerfulInputNumber()],
])("given %s options", (_, {question}) => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    it(`renders`, async () => {
        // Act
        renderQuestion(question);

        // Assert
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it(`can be answered`, async () => {
        // Act
        const {renderer} = renderQuestion(question);

        await userEvent.type(screen.getByRole("textbox"), "42");
        const userInput = renderer.getUserInput();

        // Assert
        expect(userInput).toEqual({
            "input-number 1": {
                currentValue: "42",
            },
        });
    });

    it(`can be scored correctly`, async () => {
        // Act
        const {renderer} = renderQuestion(question);

        await userEvent.type(screen.getByRole("textbox"), "42");
        const userInput = renderer.getUserInput();
        const score = scorePerseusItemTesting(
            getAnswerfulInputNumber().question,
            userInput,
        );

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it(`can be scored incorrectly`, async () => {
        // Act
        const {renderer} = renderQuestion(question);

        await userEvent.type(screen.getByRole("textbox"), "8675309");
        const userInput = renderer.getUserInput();
        const score = scorePerseusItemTesting(
            getAnswerfulInputNumber().question,
            userInput,
        );

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });

    it(`can be scored as invalid`, async () => {
        // Act
        const {renderer} = renderQuestion(question);

        const userInput = renderer.getUserInput();
        const score = scorePerseusItemTesting(
            getAnswerfulInputNumber().question,
            userInput,
        );

        // Assert
        expect(score).toHaveInvalidInput();
    });
});
