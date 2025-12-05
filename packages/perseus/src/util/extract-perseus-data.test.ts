import {getImagesWithoutAltData} from "./extract-perseus-data";

import type {
    PerseusRenderer,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";

describe("getImagesWithoutAltData", () => {
    it("should return images with an img url that lack alt text", () => {
        // Arrange
        const widgets: PerseusWidgetsMap = {
            "image 1": {
                type: "image",
                options: {
                    alt: "",
                    backgroundImage: {
                        url: "https://example.com/image1.jpg",
                    },
                },
            },
            "image 2": {
                type: "image",
                options: {
                    alt: "Has alt data!",
                    backgroundImage: {
                        url: "https://example.com/image2.jpg",
                    },
                },
            },
            "image 3": {
                type: "image",
                options: {
                    alt: "",
                    backgroundImage: {
                        url: "",
                    },
                },
            },
        };
        const perseusRenderer: PerseusRenderer = {
            content: "Content",
            images: {},
            widgets: widgets,
        };

        // Act
        const result = getImagesWithoutAltData(perseusRenderer);

        // Assert
        // Note: only Image 1 is returned in results because only that img lacks alt data
        // and has an img url.
        expect(result).toEqual(
            '[{"widgetId":"image 1","imgUrl":"https://example.com/image1.jpg"}]',
        );
    });
});
