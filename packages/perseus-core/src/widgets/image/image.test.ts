import {generateImageOptions} from "@khanacademy/perseus-core";

import type {PerseusImageWidgetOptions} from "../../data-schema";

import imageWidgetLogic from "./index";

describe("image widget accessible logic", () => {
    const runAccessible = (options: PerseusImageWidgetOptions) => {
        if (typeof imageWidgetLogic.accessible === "function") {
            return imageWidgetLogic.accessible(options);
        }
        throw new Error("accessible function not defined");
    };

    it("should be accessible if background has 'alt' text and not decorative", () => {
        const options: PerseusImageWidgetOptions = generateImageOptions({
            backgroundImage: {
                url: "https://example.com/image.png",
                width: 400,
                height: 400,
            },
            alt: "A meaningful description",
            decorative: false,
        });

        expect(runAccessible(options)).toBe(true);
    });

    it("should be inaccessible if background has no 'alt' text and not decorative", () => {
        const options: PerseusImageWidgetOptions = generateImageOptions({
            backgroundImage: {
                url: "https://example.com/image.png",
                width: 400,
                height: 400,
            },
            alt: "",
            decorative: false,
        });

        expect(runAccessible(options)).toBe(false);
    });

    it("should be accessible if background has no 'alt' text but is decorative", () => {
        const options: PerseusImageWidgetOptions = generateImageOptions({
            backgroundImage: {
                url: "https://example.com/image.png",
                width: 400,
                height: 400,
            },
            alt: "",
            decorative: true,
        });

        expect(runAccessible(options)).toBe(true);
    });

    it("should be inaccessible if no background image even with alt text", () => {
        const options: PerseusImageWidgetOptions = generateImageOptions({
            backgroundImage: {
                url: null,
                width: 0,
                height: 0,
            },
            alt: "A meaningful description",
            decorative: true,
        });

        expect(runAccessible(options)).toBe(false);
    });
});
