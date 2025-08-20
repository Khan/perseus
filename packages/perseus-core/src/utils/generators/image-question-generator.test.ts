import {imageQuestionGenerator} from "./image-question-generator";

import type {PerseusRenderer} from "../../data-schema";

describe("imageQuestionGenerator", () => {
    test("builds a default image question", () => {
        const question: PerseusRenderer = imageQuestionGenerator().build();

        expect(question.content).toBe("[[☃ image 1]]");
        expect(question.images).toEqual({});
        expect(question.widgets["image 1"].graded).toBe(true);
        expect(question.widgets["image 1"].static).toBe(false);
        expect(question.widgets["image 1"].version).toEqual({
            major: 0,
            minor: 0,
        });
        expect(question.widgets["image 1"].type).toBe("image");
        expect(question.widgets["image 1"].alignment).toBe("default");

        expect(question.widgets["image 1"].options.title).toBe(undefined);
        expect(question.widgets["image 1"].options.caption).toBe(undefined);
        expect(question.widgets["image 1"].options.alt).toBe(undefined);
        expect(question.widgets["image 1"].options.backgroundImage).toEqual({});
    });

    test("sets the content", () => {
        const question: PerseusRenderer = imageQuestionGenerator()
            .withContent("the content [[☃ image 1]]")
            .build();

        expect(question.content).toBe("the content [[☃ image 1]]");
    });

    test("sets the image", () => {
        const question: PerseusRenderer = imageQuestionGenerator()
            .withImage("https://example.com/image.png")
            .build();

        expect(question.widgets["image 1"].options.backgroundImage).toEqual({
            url: "https://example.com/image.png",
        });
    });

    test("sets the title", () => {
        const question: PerseusRenderer = imageQuestionGenerator()
            .withTitle("the title")
            .build();

        expect(question.widgets["image 1"].options.title).toBe("the title");
    });

    test("sets the caption", () => {
        const question: PerseusRenderer = imageQuestionGenerator()
            .withCaption("the caption")
            .build();

        expect(question.widgets["image 1"].options.caption).toBe("the caption");
    });

    test("sets the alt", () => {
        const question: PerseusRenderer = imageQuestionGenerator()
            .withAlt("the alt")
            .build();

        expect(question.widgets["image 1"].options.alt).toBe("the alt");
    });

    test("builds a new image question with all props", () => {
        const question: PerseusRenderer = imageQuestionGenerator()
            .withContent("the content [[☃ image 1]]")
            .withImage("https://example.com/image.png")
            .withTitle("the title")
            .withCaption("the caption")
            .withAlt("the alt")
            .build();

        expect(question.content).toBe("the content [[☃ image 1]]");
        expect(question.widgets["image 1"].options.backgroundImage).toEqual({
            url: "https://example.com/image.png",
        });
        expect(question.widgets["image 1"].options.title).toBe("the title");
        expect(question.widgets["image 1"].options.caption).toBe("the caption");
        expect(question.widgets["image 1"].options.alt).toBe("the alt");
    });
});
