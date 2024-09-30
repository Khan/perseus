import numberLineValidator from "./number-line-validator";

import type {
    PerseusNumberLineRubric,
    PerseusNumberLineUserInput,
} from "../../validation.types";

const baseInput: PerseusNumberLineUserInput = {
    isTickCrtl: true,
    numLinePosition: 1,
    rel: "eq",
    numDivisions: 10,
    divisionRange: [-10, 10],
};

const baseRubric: PerseusNumberLineRubric = {
    correctRel: "eq",
    correctX: -1.5,
    divisionRange: [1, 12],
    initialX: -1,
    labelRange: [null, null],
    labelStyle: "decimal",
    labelTicks: true,
    numDivisions: null,
    range: [-1.5, 1.5],
    snapDivisions: 2,
    static: false,
    tickStep: 0.5,
    isInequality: false,
};

function generateInput(
    extend?: Partial<PerseusNumberLineUserInput>,
): PerseusNumberLineUserInput {
    return {...baseInput, ...extend};
}

function generateRubric(
    extend?: Partial<PerseusNumberLineRubric>,
): PerseusNumberLineRubric {
    return {...baseRubric, ...extend};
}

describe("numberLineValidator", () => {
    it(`is invalid when outside allowed range`, () => {
        // Arrange
        const userInput = generateInput({
            divisionRange: [-1, 1],
            numLinePosition: 10,
        });

        const rubric = generateRubric();

        // Act
        const result = numberLineValidator(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput(
            "Number of divisions is outside the allowed range.",
        );
    });

    it(`is invalid when end state is the same as beginning state`, () => {
        // Arrange
        const userInput = generateInput({
            numLinePosition: 0,
        });

        const rubric = generateRubric({
            initialX: 0,
        });

        // Act
        const result = numberLineValidator(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it(`can be answered correctly`, () => {
        // Arrange
        const userInput = generateInput({
            numLinePosition: -1.5,
        });

        const rubric = generateRubric();

        // Act
        const result = numberLineValidator(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it(`can be answered incorrectly`, () => {
        // Arrange
        const userInput = generateInput({
            numLinePosition: 1.5,
        });

        const rubric = generateRubric();

        // Act
        const result = numberLineValidator(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});
