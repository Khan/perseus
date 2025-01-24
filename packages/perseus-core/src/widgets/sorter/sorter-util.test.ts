import getSorterPublicWidgetOptions from "./sorter-util";

import type {PerseusSorterWidgetOptions} from "../../data-schema";

describe("getSorterPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusSorterWidgetOptions = {
            correct: ["$0.005$ kilograms", "$15$ grams", "$55$ grams"],
            layout: "horizontal",
            padding: true,
        };

        // Act
        const publicWidgetOptions = getSorterPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            layout: "horizontal",
            padding: true,
        });
    });
});
