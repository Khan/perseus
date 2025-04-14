import scorePlotter from "./score-plotter";

import type {
    PerseusPlotterRubric,
    PerseusPlotterUserInput,
} from "@khanacademy/perseus-core";

describe("scorePlotter", () => {
    it("can be answered correctly", () => {
        // Arrange
        const rubric: PerseusPlotterRubric = {
            correct: [15, 25, 5, 10, 10],
            starting: [0, 0, 0, 0, 0],
        };

        const userInput: PerseusPlotterUserInput = rubric.correct;

        // Act
        const score = scorePlotter(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const rubric: PerseusPlotterRubric = {
            correct: [15, 25, 5, 10, 10],
            starting: [0, 0, 0, 0, 0],
        };

        const userInput: PerseusPlotterUserInput = [8, 6, 7, 5, 3, 0, 9];

        // Act
        const score = scorePlotter(userInput, rubric);

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
