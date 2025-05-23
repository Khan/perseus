import {mockStrings} from "../../../strings";

import {
    getChoiceLetter,
    getOptionStatusText,
    getInstructionsText,
    getA11yText,
} from "./string-utils";

describe("getChoiceLetter (in English)", () => {
    it("returns the first 5 letters for most questions", () => {
        expect(getChoiceLetter(0, mockStrings)).toEqual("A");
        expect(getChoiceLetter(1, mockStrings)).toEqual("B");
        expect(getChoiceLetter(2, mockStrings)).toEqual("C");
        expect(getChoiceLetter(3, mockStrings)).toEqual("D");
        expect(getChoiceLetter(4, mockStrings)).toEqual("E");
    });

    it("returns Z as the last letter, then spaces afterwards", () => {
        expect(getChoiceLetter(25, mockStrings)).toEqual("Z");
        for (let i = 26; i < 100; i++) {
            expect(getChoiceLetter(i, mockStrings)).toEqual(" ");
        }
    });
});

describe("getOptionStatusText", () => {
    it("returns correct strings for correct answers", () => {
        expect(
            getOptionStatusText({
                checked: true,
                correct: true,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.correctSelected);

        expect(
            getOptionStatusText({
                checked: false,
                correct: true,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.correct);
    });

    it("returns correct strings for incorrect answers", () => {
        expect(
            getOptionStatusText({
                checked: true,
                correct: false,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.incorrectSelected);

        expect(
            getOptionStatusText({
                checked: false,
                correct: false,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.incorrect);
    });
});

describe("getInstructionsText", () => {
    it("returns choose one answer for single select", () => {
        expect(
            getInstructionsText({
                multipleSelect: false,
                countChoices: false,
                numCorrect: 1,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.chooseOneAnswer);
    });

    it("returns choose all answers for multiple select without count", () => {
        expect(
            getInstructionsText({
                multipleSelect: true,
                countChoices: false,
                numCorrect: 2,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.chooseAllAnswers);
    });

    it("returns choose N answers for multiple select with count", () => {
        expect(
            getInstructionsText({
                multipleSelect: true,
                countChoices: true,
                numCorrect: 3,
                strings: mockStrings,
            }),
        ).toEqual(
            mockStrings.chooseNumAnswers({
                numCorrect: "3",
            }),
        );
    });
});

describe("getA11yText", () => {
    const letter = "C";

    it("returns correct a11y strings when correctness is shown and answer is correct", () => {
        expect(
            getA11yText({
                letter,
                checked: true,
                correct: true,
                showCorrectness: true,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.choiceCheckedCorrect({letter}));

        expect(
            getA11yText({
                letter,
                checked: false,
                correct: true,
                showCorrectness: true,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.choiceCorrect({letter}));
    });

    it("returns correct a11y strings when correctness is shown and answer is incorrect", () => {
        expect(
            getA11yText({
                letter,
                checked: true,
                correct: false,
                showCorrectness: true,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.choiceCheckedIncorrect({letter}));

        expect(
            getA11yText({
                letter,
                checked: false,
                correct: false,
                showCorrectness: true,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.choiceIncorrect({letter}));
    });

    it("returns correct a11y strings when correctness is not shown", () => {
        expect(
            getA11yText({
                letter,
                checked: true,
                correct: true, // Should be ignored when showCorrectness is false
                showCorrectness: false,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.choiceChecked({letter}));

        expect(
            getA11yText({
                letter,
                checked: false,
                correct: true, // Should be ignored when showCorrectness is false
                showCorrectness: false,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.choice({letter}));
    });
});
