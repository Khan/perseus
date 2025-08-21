import {
    generateImageOptions,
    generateImageWidget,
} from "./image-widget-generator";
import {generateQuestion} from "./perseus-question-generator";

import type {PerseusRenderer} from "../../data-schema";

describe("generateQuestion", () => {
    test("builds a default question", () => {
        const question: PerseusRenderer = generateQuestion({});

        expect(question.content).toBe("");
        expect(question.images).toEqual({});
        expect(question.widgets).toEqual({});
    });

    test("builds a question with content and widgets", () => {
        const question: PerseusRenderer = generateQuestion({
            content: "the content",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        alt: "image 1",
                    }),
                }),
                "image 2": generateImageWidget({
                    options: generateImageOptions({
                        alt: "image 2",
                    }),
                }),
            },
        });

        expect(question.content).toBe("the content");
        expect(Object.keys(question.widgets)).toHaveLength(2);
        expect(question.widgets["image 1"].options.alt).toBe("image 1");
        expect(question.widgets["image 2"].options.alt).toBe("image 2");
    });

    test("builds a question with widgets and no specified content", () => {
        const question: PerseusRenderer = generateQuestion({
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        alt: "image 1",
                    }),
                }),
                "image 2": generateImageWidget({
                    options: generateImageOptions({
                        alt: "image 2",
                    }),
                }),
            },
        });

        expect(question.content).toBe("[[☃ image 1]]\n[[☃ image 2]]\n");
        expect(Object.keys(question.widgets)).toHaveLength(2);
        expect(question.widgets["image 1"].options.alt).toBe("image 1");
        expect(question.widgets["image 2"].options.alt).toBe("image 2");
    });
});
