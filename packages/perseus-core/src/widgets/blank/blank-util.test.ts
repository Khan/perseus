import {getBlankPublicWidgetOptions} from "./blank-util";

import type {PerseusBlankWidgetOptions} from "../../data-schema";

describe("getNumericInputPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusBlankWidgetOptions = {
            displayType: "normal",
            correct: "answer-tile-2",
        };

        // Act
        const publicWidgetOptions = getBlankPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            displayType: "normal",
        });
    });
});
