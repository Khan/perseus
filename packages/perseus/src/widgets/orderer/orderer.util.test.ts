import {question1} from "./orderer.testdata";
import splitOrdererWidgetOptions from "./orderer.util";

import type {PerseusOrdererWidgetOptions} from "@khanacademy/perseus-core";

describe("getOrdererPublicOptions", () => {
    it("should return the correct public options without any answer data", () => {
        // Arrange
        const options: PerseusOrdererWidgetOptions =
            question1.widgets["orderer 1"].options;

        // Act
        const result = splitOrdererWidgetOptions(options);

        // Assert
        expect(result).toEqual({
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
