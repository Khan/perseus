import getSorterPublicWidgetOptions from "./sorter-util";

import type {PerseusSorterWidgetOptions} from "../../data-schema";

describe("getSorterPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data, in a shuffled state", () => {
        // Arrange
        const options: PerseusSorterWidgetOptions = {
            correct: ["$15$ grams", "$55$ grams", "$0.005$ kilograms"],
            layout: "horizontal",
            padding: true,
        };

        // Act
        const publicWidgetOptions = getSorterPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            correct: ["$55$ grams", "$15$ grams", "$0.005$ kilograms"],
            layout: "horizontal",
            padding: true,
        });
        expect(publicWidgetOptions.correct).not.toEqual(options.correct);
    });
});
