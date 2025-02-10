import getSorterPublicWidgetOptions from "./sorter-util";

import type {PerseusSorterWidgetOptions} from "../../data-schema";

describe("getSorterPublicWidgetOptions", () => {
    it("should return options without any answer data due to the shuffled state of the correct field", () => {
        // Arrange
        const options: PerseusSorterWidgetOptions = {
            correct: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            layout: "horizontal",
            padding: true,
        };

        // Act
        const publicWidgetOptions = getSorterPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions.correct).not.toEqual(options.correct);
    });
});
