import getLabelImagePublicWidgetOptions from "./label-image-util";

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
