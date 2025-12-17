import {
    generateLabelImageOptions,
    generateLabelImageWidget,
} from "./label-image-widget-generator";

import type {
    LabelImageWidget,
    PerseusLabelImageWidgetOptions,
} from "../../data-schema";

describe("generateImageOptions", () => {
    test("builds a default image options", () => {
        const options: PerseusLabelImageWidgetOptions =
            generateLabelImageOptions();

        expect(options.choices).toEqual([]);
        expect(options.imageUrl).toBe("");
        expect(options.imageAlt).toBe("");
        expect(options.imageHeight).toBe(0);
        expect(options.imageWidth).toBe(0);
        expect(options.markers).toEqual([]);
        expect(options.multipleAnswers).toBe(false);
        expect(options.hideChoicesFromInstructions).toBe(false);
    });

    test("builds an image options with all props", () => {
        const options: PerseusLabelImageWidgetOptions =
            generateLabelImageOptions({
                choices: ["right", "wrong"],
                imageUrl: "image.png",
                imageAlt: "image alt",
                imageHeight: 400,
                imageWidth: 400,
                markers: [
                    {
                        answers: ["right"],
                        label: "right",
                        x: 0,
                        y: 0,
                    },
                ],
                hideChoicesFromInstructions: true,
                multipleAnswers: true,
            });

        expect(options.choices).toEqual(["right", "wrong"]);
        expect(options.imageUrl).toBe("image.png");
        expect(options.imageAlt).toBe("image alt");
        expect(options.imageHeight).toBe(400);
        expect(options.imageWidth).toBe(400);
        expect(options.markers).toEqual([
            {
                answers: ["right"],
                label: "right",
                x: 0,
                y: 0,
            },
        ]);
        expect(options.hideChoicesFromInstructions).toBe(true);
        expect(options.multipleAnswers).toBe(true);
    });
});

describe("generateImageWidget", () => {
    test("builds a default image widget", () => {
        const widget: LabelImageWidget = generateLabelImageWidget();

        expect(widget.type).toBe("label-image");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            choices: [],
            imageUrl: "",
            imageAlt: "",
            imageHeight: 0,
            imageWidth: 0,
            markers: [],
            hideChoicesFromInstructions: false,
            multipleAnswers: false,
        });
    });

    test("builds an image widget with all props", () => {
        const widget: LabelImageWidget = generateLabelImageWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: generateLabelImageOptions({
                choices: ["right", "wrong"],
                imageUrl: "image.png",
                imageAlt: "image alt",
                imageHeight: 400,
                imageWidth: 400,
                markers: [
                    {
                        answers: ["right"],
                        label: "right",
                        x: 0,
                        y: 0,
                    },
                ],
                hideChoicesFromInstructions: true,
                multipleAnswers: true,
            }),
        });

        expect(widget.static).toBe(true);
        expect(widget.graded).toBe(false);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            choices: ["right", "wrong"],
            imageUrl: "image.png",
            imageAlt: "image alt",
            imageHeight: 400,
            imageWidth: 400,
            markers: [{answers: ["right"], label: "right", x: 0, y: 0}],
            hideChoicesFromInstructions: true,
            multipleAnswers: true,
        });
    });

    test("adds options when option builder is used", () => {
        const widget: LabelImageWidget = generateLabelImageWidget({
            static: true,
            alignment: "block",
            options: generateLabelImageOptions({
                choices: ["right", "wrong"],
                imageUrl: "image.png",
                imageAlt: "image alt",
                imageHeight: 400,
                imageWidth: 400,
                markers: [
                    {
                        answers: ["right"],
                        label: "right",
                        x: 0,
                        y: 0,
                    },
                ],
                hideChoicesFromInstructions: true,
                multipleAnswers: true,
            }),
        });

        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options.choices).toEqual(["right", "wrong"]);
        expect(widget.options.imageUrl).toBe("image.png");
        expect(widget.options.imageAlt).toBe("image alt");
        expect(widget.options.imageHeight).toBe(400);
        expect(widget.options.imageWidth).toBe(400);
        expect(widget.options.markers).toEqual([
            {answers: ["right"], label: "right", x: 0, y: 0},
        ]);
        expect(widget.options.hideChoicesFromInstructions).toBe(true);
        expect(widget.options.multipleAnswers).toBe(true);
    });
});
