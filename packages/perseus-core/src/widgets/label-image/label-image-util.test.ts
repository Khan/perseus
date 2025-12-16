import {generateLabelImageOptions} from "../../utils/generators/label-image-widget-generator";

import getLabelImagePublicWidgetOptions, {
    isLabelImageAccessible,
} from "./label-image-util";

import type {PerseusLabelImageWidgetOptions} from "../../data-schema";

describe("getLabelImagePublicWidgetOptions", () => {
    it("removes private fields", () => {
        const options: PerseusLabelImageWidgetOptions = {
            choices: ["right", "wrong"],
            markers: [
                {
                    answers: ["right"],
                    label: "",
                    x: 0,
                    y: 0,
                },
            ],
            imageUrl: "",
            imageHeight: 0,
            imageWidth: 0,
            imageAlt: "",
            hideChoicesFromInstructions: false,
            multipleAnswers: false,
            static: false,
        };

        const publicWidgetOptions = getLabelImagePublicWidgetOptions(options);

        expect(publicWidgetOptions).toEqual({
            choices: ["right", "wrong"],
            markers: [
                {
                    label: "",
                    x: 0,
                    y: 0,
                },
            ],
            imageUrl: "",
            imageHeight: 0,
            imageWidth: 0,
            imageAlt: "",
            hideChoicesFromInstructions: false,
            multipleAnswers: false,
            static: false,
        });
    });
});

describe("isLabelImageAccessible", () => {
    const accessibleOptions: PerseusLabelImageWidgetOptions =
        generateLabelImageOptions({
            imageUrl: "https://example.com/image.png",
            imageAlt: "A descriptive alt text for the image",
            markers: [
                {
                    answers: [],
                    label: "A descriptive label for the image",
                    x: 0,
                    y: 0,
                },
                {
                    answers: [],
                    label: "Another descriptive label for the image",
                    x: 100,
                    y: 100,
                },
            ],
        });

    it("should return true if label image is accessible", () => {
        const options: PerseusLabelImageWidgetOptions = accessibleOptions;

        // Act
        const result = isLabelImageAccessible(options);

        // Assert
        expect(result).toBe(true);
    });

    it("should return true if accessible and there are no markers", () => {
        // Arrange
        const options: PerseusLabelImageWidgetOptions = {
            ...accessibleOptions,
            markers: [],
        };

        // Act
        const result = isLabelImageAccessible(options);

        // Assert
        expect(result).toBe(true);
    });

    it("should return true if accessible and url is empty and alt is empty", () => {
        // Arrange
        const options: PerseusLabelImageWidgetOptions = {
            ...accessibleOptions,
            imageUrl: "",
            imageAlt: "",
        };

        // Act
        const result = isLabelImageAccessible(options);

        // Assert
        expect(result).toBe(true);
    });

    it("should return false if image url is not empty and image alt is empty", () => {
        // Arrange
        const options: PerseusLabelImageWidgetOptions = {
            ...accessibleOptions,
            imageAlt: "",
        };

        // Act
        const result = isLabelImageAccessible(options);

        // Assert
        expect(result).toBe(false);
    });

    it("should return false if there is a marker with an empty label", () => {
        // Arrange
        const options: PerseusLabelImageWidgetOptions = {
            ...accessibleOptions,
            markers: [
                ...accessibleOptions.markers,
                {
                    answers: [],
                    label: "",
                    x: 0,
                    y: 0,
                },
            ],
        };

        // Act
        const result = isLabelImageAccessible(options);

        // Assert
        expect(result).toBe(false);
    });
});
