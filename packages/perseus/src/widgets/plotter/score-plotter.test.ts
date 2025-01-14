import scorePlotter from "./score-plotter";

import type {
    PerseusPlotterScoringData,
    PerseusPlotterUserInput,
} from "@khanacademy/perseus-score";

describe("scorePlotter", () => {
    it("can be answered correctly", () => {
        // Arrange
        const scoringData: PerseusPlotterScoringData = {
            correct: [15, 25, 5, 10, 10],
            starting: [0, 0, 0, 0, 0],
        };

        const userInput: PerseusPlotterUserInput = scoringData.correct;

        // Act
        const score = scorePlotter(userInput, scoringData);

        // Assert
        expect(score).toHaveBeenAnsweredCorrectly();
    });

    it("can be answered incorrectly", () => {
        // Arrange
        const scoringData: PerseusPlotterScoringData = {
            correct: [15, 25, 5, 10, 10],
            starting: [0, 0, 0, 0, 0],
        };

        const userInput: PerseusPlotterUserInput = [8, 6, 7, 5, 3, 0, 9];

        // Act
        const score = scorePlotter(userInput, scoringData);

        // Assert
        expect(score).toHaveBeenAnsweredIncorrectly();
    });
});
