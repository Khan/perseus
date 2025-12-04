import {
    generateImageOptions,
    generateImageWidget,
} from "./image-widget-generator";

import type {ImageWidget, PerseusImageWidgetOptions} from "../../data-schema";

describe("generateImageOptions", () => {
    test("builds a default image options", () => {
        const options: PerseusImageWidgetOptions = generateImageOptions();

        expect(options.title).toBe(undefined);
        expect(options.caption).toBe(undefined);
        expect(options.alt).toBe(undefined);
        expect(options.backgroundImage).toEqual({});
    });

    test("builds an image options with all props", () => {
        const options: PerseusImageWidgetOptions = generateImageOptions({
            title: "the title",
            caption: "the caption",
            alt: "the alt",
            backgroundImage: {
                url: "image.png",
                width: 400,
                height: 400,
            },
        });

        expect(options.title).toBe("the title");
        expect(options.caption).toBe("the caption");
        expect(options.alt).toBe("the alt");
        expect(options.backgroundImage).toEqual({
            url: "image.png",
            width: 400,
            height: 400,
        });
    });
});

describe("generateImageWidget", () => {
    test("builds a default image widget", () => {
        const widget: ImageWidget = generateImageWidget();

        expect(widget.type).toBe("image");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({backgroundImage: {}});
    });

    test("builds an image widget with all props", () => {
        const widget: ImageWidget = generateImageWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: {backgroundImage: {url: "image.png"}},
        });

        expect(widget.static).toBe(true);
        expect(widget.graded).toBe(false);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({backgroundImage: {url: "image.png"}});
    });

    test("adds options when option builder is used", () => {
        const widget: ImageWidget = generateImageWidget({
            static: true,
            alignment: "block",
            options: generateImageOptions({
                title: "the title",
                caption: "the caption",
                alt: "the alt",
                backgroundImage: {
                    url: "image.png",
                    width: 400,
                    height: 400,
                },
            }),
        });

        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options.title).toBe("the title");
        expect(widget.options.caption).toBe("the caption");
        expect(widget.options.alt).toBe("the alt");
        expect(widget.options.backgroundImage).toEqual({
            url: "image.png",
            width: 400,
            height: 400,
        });
    });
});
