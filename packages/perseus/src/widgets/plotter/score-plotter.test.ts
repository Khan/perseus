import scorePlotter from "./score-plotter";

import type {
    PerseusPlotterRubric,
    PerseusPlotterUserInput,
} from "../../validation.types";

const baseRubric: PerseusPlotterRubric = {
    categories: [
        "$1^{\\text{st}} \\text{}$",
        "$2^{\\text{nd}} \\text{}$",
        "$3^{\\text{rd}} \\text{}$",
        "$4^{\\text{th}} \\text{}$",
        "$5^{\\text{th}} \\text{}$",
    ],
    picBoxHeight: 300,
    picSize: 300,
    picUrl: "",
    plotDimensions: [0, 0],
    correct: [15, 25, 5, 10, 10],
    labelInterval: 1,
    labels: ["School grade", "Number of absent students"],
    maxY: 30,
    scaleY: 5,
    snapsPerLine: 1,
    starting: [0, 0, 0, 0, 0],
    type: "bar",
};

function generateRubric(
    extend?: Partial<PerseusPlotterRubric>,
): PerseusPlotterRubric {
    return {...baseRubric, ...extend};
}

describe("scorePlotter", () => {
    it("is invalid if the start and end are the same", () => {
        // Arrange
        const rubric = generateRubric();

        const userInput: PerseusPlotterUserInput = rubric.starting;

        // Act
        const result = scorePlotter(userInput, rubric);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("can be answered correctly", () => {
        // Arrange
        const rubric = generateRubric();

        const userInput: PerseusPlotterUserInput = rubric.correct;

        // Act
        const result = scorePlotter(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const rubric = generateRubric();

        const userInput: PerseusPlotterUserInput = [8, 6, 7, 5, 3, 0, 9];

        // Act
        const result = scorePlotter(userInput, rubric);

        // Assert
        expect(result).toHaveBeenAnsweredIncorrectly();
    });
});
