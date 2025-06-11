import type {PerseusImageWidgetOptions} from "../../data-schema";

import imageWidgetLogic from "./index";

describe("image widget accessible logic", () => {
    const runAccessible = (options: PerseusImageWidgetOptions) => {
        if (typeof imageWidgetLogic.accessible === "function") {
            return imageWidgetLogic.accessible(options);
        }
        throw new Error("accessible function not defined");
    };

    it("should be accessible if background has 'alt' text", () => {
        const options: PerseusImageWidgetOptions = {
            title: "",
            range: [
                [0, 10],
                [0, 10],
            ],
            box: [400, 400],
            backgroundImage: {
                url: "https://example.com/image.png",
                width: 400,
                height: 400,
            },
            labels: [],
            alt: "A meaningful description",
            caption: "",
        };

        expect(runAccessible(options)).toBe(true);
    });

    it("should be inaccessible if background has no 'alt' text", () => {
        const options: PerseusImageWidgetOptions = {
            title: "",
            range: [
                [0, 10],
                [0, 10],
            ],
            box: [400, 400],
            backgroundImage: {
                url: "https://example.com/image.png",
                width: 400,
                height: 400,
            },
            labels: [],
            alt: "",
            caption: "",
        };

        expect(runAccessible(options)).toBe(false);
    });
});
