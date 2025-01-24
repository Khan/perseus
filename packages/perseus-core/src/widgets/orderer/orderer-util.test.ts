import getOrdererPublicWidgetOptions from "./orderer-util";

import type {PerseusOrdererWidgetOptions} from "../../data-schema";

describe("getOrdererPublicWidgetOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusOrdererWidgetOptions = {
            otherOptions: [],
            layout: "horizontal",
            options: [
                {content: "$10.9$", images: {}, widgets: {}},
                {content: "$11$", images: {}, widgets: {}},
                {content: "$\\sqrt{120}$", images: {}, widgets: {}},
            ],
            correctOptions: [
                {content: "$10.9$", images: {}, widgets: {}},
                {content: "$\\sqrt{120}$", images: {}, widgets: {}},
                {content: "$11$", images: {}, widgets: {}},
            ],
            height: "normal",
        };

        // Act
        const publicWidgetOptions = getOrdererPublicWidgetOptions(options);

        // Assert
        expect(publicWidgetOptions).toEqual({
            layout: "horizontal",
            options: [
                {content: "$10.9$", images: {}, widgets: {}},
                {content: "$11$", images: {}, widgets: {}},
                {content: "$\\sqrt{120}$", images: {}, widgets: {}},
            ],
            height: "normal",
        });
    });
});
