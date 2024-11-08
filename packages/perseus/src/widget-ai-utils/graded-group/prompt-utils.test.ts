import {getPromptJSON} from "./prompt-utils";

import type {CategorizerPromptJSON} from "../categorizer/prompt-utils";
import type {ImagePromptJSON} from "../image/prompt-utils";

describe("GradedGroup getPromptJSON", () => {
    it("it returns JSON with the expected format and fields when rendererJSON is undefined", () => {
        const title = "title";
        const rendererJSON = undefined;
        const hintRendererJSON = {
            content: "hint content",
            widgets: {},
        };
        const result = getPromptJSON(title, rendererJSON, hintRendererJSON);

        expect(result).toEqual({
            type: "graded-group",
            title,
            content: "",
            widgets: {},
            hint: {
                content: "hint content",
                widgets: {},
            },
        });
    });

    it("it returns JSON with the expected format and fields", () => {
        const title = "title";
        const rendererJSON = {
            title: "Metabolic strategies of bacteria",
            content:
                "1. **Which of the following statements about metabolic strategies of bacteria are true?**\n\n [[☃ categorizer 1]]",
            images: {},
            widgets: {
                "categorizer 1": {
                    type: "categorizer",
                    options: {
                        items: [
                            "Some bacteria conduct photosynthesis and produce oxygen, much like plants.",
                            "Bacteria are always autotrophic but they may get energy from either light or chemical sources.",
                            "Some chemosynthetic bacteria introduce energy and fixed carbon into communities where photosynthesis is not possible (e.g., deep-sea vents).",
                            "Some bacteria live symbiotically inside of host organisms and provide the host with nutrients.",
                        ],
                        categories: ["True", "False"],
                    },
                    userInput: {
                        itemToCategoryMapping: [0, 0, 0, 0],
                    },
                } satisfies CategorizerPromptJSON,
            },
        };

        const hintRendererJSON = {
            content: "hint content",
            widgets: {
                "image 1": {
                    type: "image",
                    options: {
                        altText: "alt text",
                        title: "title",
                        caption: "caption",
                        imageUrl: "url",
                    },
                } satisfies ImagePromptJSON,
            },
        };
        const result = getPromptJSON(title, rendererJSON, hintRendererJSON);

        expect(result).toEqual({
            type: "graded-group",
            title,
            content:
                "1. **Which of the following statements about metabolic strategies of bacteria are true?**\n\n [[☃ categorizer 1]]",
            images: {},
            widgets: {
                "categorizer 1": {
                    type: "categorizer",
                    options: {
                        items: [
                            "Some bacteria conduct photosynthesis and produce oxygen, much like plants.",
                            "Bacteria are always autotrophic but they may get energy from either light or chemical sources.",
                            "Some chemosynthetic bacteria introduce energy and fixed carbon into communities where photosynthesis is not possible (e.g., deep-sea vents).",
                            "Some bacteria live symbiotically inside of host organisms and provide the host with nutrients.",
                        ],
                        categories: ["True", "False"],
                    },
                    userInput: {
                        itemToCategoryMapping: [0, 0, 0, 0],
                    },
                },
            },
            hint: {
                content: "hint content",
                widgets: {
                    "image 1": {
                        type: "image",
                        options: {
                            altText: "alt text",
                            title: "title",
                            caption: "caption",
                            imageUrl: "url",
                        },
                    },
                },
            },
        });
    });
});
