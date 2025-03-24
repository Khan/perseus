import getFreeResponsePublicWidgetOptions from "./free-response-util";

import type {PerseusFreeResponseWidgetOptions} from "../../data-schema";

describe("getFreeResponsePublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusFreeResponseWidgetOptions = {
            placeholder: "Please provide response here",
            question: "What is the wind speed velocity of an unladen swallow?",
            scoringCriteria: [
                {
                    text: "Depends on whether it's an African or European swallow",
                },
            ],
        };

        // Act
        const publicWidgetOptions = getFreeResponsePublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            placeholder: "Please provide response here",
            question: "What is the wind speed velocity of an unladen swallow?",
        });
    });
});
