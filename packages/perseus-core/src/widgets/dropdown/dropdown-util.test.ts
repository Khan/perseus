import getDropdownPublicWidgetOptions from "./dropdown-util";

import type {PerseusDropdownWidgetOptions} from "../../data-schema";

describe("getDropdownPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusDropdownWidgetOptions = {
            choices: [
                {content: "1", correct: false},
                {content: "2", correct: false},
                {content: "3", correct: true},
            ],
            placeholder: "Select an option",
            static: false,
            visibleLabel: "Test Label",
            ariaLabel: "Test Aria Label",
        };

        // Act
        const publicWidgetOptions = getDropdownPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            choices: [{content: "1"}, {content: "2"}, {content: "3"}],
            placeholder: "Select an option",
            static: false,
            visibleLabel: "Test Label",
            ariaLabel: "Test Aria Label",
        });
    });
});
