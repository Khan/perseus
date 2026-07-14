import {
    generateImageOptions,
    generateImageWidget,
} from "./image-widget-generator";

import type {ImageWidget, PerseusImageWidgetOptions} from "../../data-schema";

describe("generateImageOptions", () => {
    test("builds a default image options", () => {
        const options: PerseusImageWidgetOptions = generateImageOptions();

        expect(options.title).toBe("");
        expect(options.caption).toBe("");
        expect(options.alt).toBe("");
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
    it("builds a default image widget", () => {
        const widget: ImageWidget = generateImageWidget();

        expect(widget.type).toBe("image");
        expect(widget.graded).toBe(false);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            alt: "",
            backgroundImage: {},
            caption: "",
            decorative: false,
            longDescription: "",
            scale: 1,
            title: "",
        });
    });

    it("lets you override the defaults", () => {
        const widget: ImageWidget = generateImageWidget({
            graded: false,
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

        expect(widget.graded).toBe(false);
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
