import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {convertImageMarkdownToImageWidget} from "./issue-ctas-utils";

describe("convertImageMarkdownToImageWidget", () => {
    it("should convert image markdown to image widget", () => {
        const question = {
            content: "![some alt text](https://example.com/image.png)",
            widgets: {},
            images: {},
        };
        const onEditorChange = jest.fn();
        convertImageMarkdownToImageWidget(question, onEditorChange);
        expect(onEditorChange).toHaveBeenCalledWith({
            content: "image",
        });
    });

    it("should convert image markdown to image widget with surrounding text", () => {
        const question = {
            content:
                "Hello ![some alt text](https://example.com/image.png) World",
            widgets: {},
            images: {},
        };
        const onEditorChange = jest.fn();
        convertImageMarkdownToImageWidget(question, onEditorChange);
        expect(onEditorChange).toHaveBeenCalledWith({
            content: "Hello image World",
        });
    });

    it("should convert the image markdown and keep surrounding widgets", () => {
        const question = generateTestPerseusRenderer({
            content:
                "Hello ![some alt text](https://example.com/image.png) World [[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: {
                            url: "https://example.com/image.png",
                            width: 100,
                            height: 100,
                        },
                        alt: "some alt text",
                    }),
                }),
            },
        });

        const onEditorChange = jest.fn();
        convertImageMarkdownToImageWidget(question, onEditorChange);
        expect(onEditorChange).toHaveBeenCalledWith({
            content: "Hello image World [[☃ image 1]]",
        });
    });
});
