import {getImagesWithoutAltData, injectWidgets} from "./extract-perseus-data";

import type {
    PerseusRadioChoice,
    PerseusRenderer,
    PerseusWidgetsMap,
} from "@khanacademy/perseus-core";

describe("injectWidgets", () => {
    describe("radio", () => {
        it("should replace widget with options", () => {
            const content = "[[☃ Radio 1]]";
            const widgets = {
                "Radio 1": {
                    type: "radio",
                    options: {
                        choices: [
                            {
                                id: "0-0-0-0-0",
                                content: "option 1",
                            },
                            {
                                id: "1-1-1-1-1",
                                content: "option 2",
                            },
                            {
                                id: "2-2-2-2-2",
                                content: "option 3",
                            },
                        ] satisfies PerseusRadioChoice[],
                    },
                },
            };
            const expected = "option 1\noption 2\noption 3";
            const result = injectWidgets(content, widgets);
            expect(result).toEqual(expected);
        });

        it("should attach a note if the order is randomized and there is no widget props", () => {
            const content = "[[☃ Radio 1]]";
            const widgets = {
                "Radio 1": {
                    type: "radio",
                    options: {
                        choices: [
                            {
                                id: "0-0-0-0-0",
                                content: "option 1",
                            },
                            {
                                id: "1-1-1-1-1",
                                content: "option 2",
                            },
                            {
                                id: "2-2-2-2-2",
                                content: "option 3",
                            },
                        ],
                        randomize: true,
                    },
                },
            };
            const expected =
                "option 1\noption 2\noption 3\nThose options are displayed in a different order to the user. If the user says the letter, number, or ordinal number, always ask them clarify which option they are referring to.\n";
            const result = injectWidgets(content, widgets);
            expect(result).toEqual(expected);
        });

        it("should use widget props when available to get correct order", () => {
            const content = "[[☃ radio 1]]";
            const widgets = {
                "radio 1": {
                    type: "radio",
                    options: {
                        choices: [
                            {
                                id: "0-0-0-0-0",
                                content: "1",
                            },
                            {
                                id: "1-1-1-1-1",
                                content: "2",
                            },
                            {
                                id: "2-2-2-2-2",
                                content: "3",
                            },
                        ],
                        randomize: true,
                    },
                },
            } satisfies PerseusWidgetsMap;
            const widgetProps = {
                "radio 1": {
                    choices: [{content: "2"}, {content: "1"}, {content: "3"}],
                    type: "radio" as const,
                    options: {} as any,
                },
            };
            const expected = "Option A: 2\nOption B: 1\nOption C: 3";
            const result = injectWidgets(content, widgets, widgetProps);
            expect(result).toEqual(expected);
        });
    });

    it("should replace image widget with alt text", () => {
        const content = "[[☃ Image 1]]";
        const widgets = {
            "Image 1": {
                type: "image",
                options: {
                    alt: "The text for this image",
                },
            },
        };
        const expected = '<img id="Image 1" alt="The text for this image">';
        const result = injectWidgets(content, widgets);
        expect(result).toEqual(expected);
    });

    // Add more test cases for other widget types...
});

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
