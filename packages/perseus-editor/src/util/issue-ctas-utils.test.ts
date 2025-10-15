import {Util} from "@khanacademy/perseus";
import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {mockImageLoading} from "../../../../testing/image-loader-utils";
import {earthMoonImage} from "../../../perseus/src/widgets/image/utils";

import {convertImageMarkdownToImageWidget} from "./issue-ctas-utils";

describe("getFirstAvailableWidgetIndex", () => {});

describe("convertImageMarkdownToImageWidget", () => {
    let unmockImageLoading: () => void;

    beforeEach(() => {
        unmockImageLoading = mockImageLoading();
        // Size of earthMoonImage
        jest.spyOn(Util, "getImageSizeModern").mockResolvedValue([400, 225]);
    });

    afterEach(() => {
        unmockImageLoading();
        jest.restoreAllMocks();
    });

    it("converts image markdown to image widget", async () => {
        const question = {
            content: `![some alt text](${earthMoonImage.url})`,
            widgets: {},
            images: {},
        };
        const onEditorChange = jest.fn();
        await convertImageMarkdownToImageWidget(question, onEditorChange);
        expect(onEditorChange).toHaveBeenCalledWith({
            content: "[[☃ image 1]]",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "some alt text",
                    }),
                }),
            },
        });
    });

    it("converts image markdown to image widget with surrounding text", async () => {
        const question = {
            content: `Hello ![some alt text](${earthMoonImage.url}) World`,
            widgets: {},
            images: {},
        };
        const onEditorChange = jest.fn();
        await convertImageMarkdownToImageWidget(question, onEditorChange);
        expect(onEditorChange).toHaveBeenCalledWith({
            content: "Hello [[☃ image 1]] World",
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "some alt text",
                    }),
                }),
            },
        });
    });

    it("converts the image markdown and keep surrounding widgets", async () => {
        const question = generateTestPerseusRenderer({
            content: `Hello ![some alt text](${earthMoonImage.url}) World [[☃ image 1]]`,
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "some alt text",
                    }),
                }),
            },
        });

        const onEditorChange = jest.fn();
        await convertImageMarkdownToImageWidget(question, onEditorChange);
        expect(onEditorChange).toHaveBeenCalledWith({
            content: `Hello [[☃ image 2]] World [[☃ image 1]]`,
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "some alt text",
                    }),
                }),
                "image 2": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "some alt text",
                    }),
                }),
            },
        });
    });

    it("converts multiple images", async () => {
        const question = generateTestPerseusRenderer({
            content: `![alt 1](${earthMoonImage.url}) ![alt 2](${earthMoonImage.url})`,
            widgets: {},
            images: {},
        });
        const onEditorChange = jest.fn();
        await convertImageMarkdownToImageWidget(question, onEditorChange);
        expect(onEditorChange).toHaveBeenCalledWith({
            content: `[[☃ image 1]] [[☃ image 2]]`,
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "alt 1",
                    }),
                }),
                "image 2": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "alt 2",
                    }),
                }),
            },
        });
    });

    it("converts multiple images with skipped indices", async () => {
        const question = generateTestPerseusRenderer({
            content: `[[☃ image 3]] ![markdown 1](${earthMoonImage.url}) ![markdown 2](${earthMoonImage.url}) [[☃ image 2]]`,
            widgets: {
                "image 2": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "alt 2",
                    }),
                }),
                "image 3": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "alt 3",
                    }),
                }),
            },
            images: {},
        });
        const onEditorChange = jest.fn();
        await convertImageMarkdownToImageWidget(question, onEditorChange);
        expect(onEditorChange).toHaveBeenCalledWith({
            content: `[[☃ image 3]] [[☃ image 1]] [[☃ image 4]] [[☃ image 2]]`,
            widgets: {
                "image 2": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "alt 2",
                    }),
                }),
                "image 3": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "alt 3",
                    }),
                }),
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "markdown 1",
                    }),
                }),
                "image 4": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "markdown 2",
                    }),
                }),
            },
        });
    });

    it("preserves other markdown", async () => {
        const question = generateTestPerseusRenderer({
            content: `![markdown 1](${earthMoonImage.url}) [[☃ image 1]] **bold** *italic* \n\n| col 1 | col 2 |\n| --- | --- |\n| row 1 | row 2 |`,
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "alt 1",
                    }),
                }),
            },
            images: {},
        });
        const onEditorChange = jest.fn();
        await convertImageMarkdownToImageWidget(question, onEditorChange);
        expect(onEditorChange).toHaveBeenCalledWith({
            content: `[[☃ image 2]] [[☃ image 1]] **bold** *italic* \n\n| col 1 | col 2 |\n| --- | --- |\n| row 1 | row 2 |`,
            widgets: {
                "image 2": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "markdown 1",
                    }),
                }),
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "alt 1",
                    }),
                }),
            },
        });
    });
});

describe("getCtaForIssueId", () => {});
