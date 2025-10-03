import {Util} from "@khanacademy/perseus";
import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {mockImageLoading} from "../../../../testing/image-loader-utils";
import {earthMoonImage} from "../../../perseus/src/widgets/image/utils";

import {convertImageMarkdownToImageWidget} from "./issue-ctas-utils";

describe("convertImageMarkdownToImageWidget", () => {
    let unmockImageLoading: () => void;

    beforeEach(() => {
        unmockImageLoading = mockImageLoading();
        jest.spyOn(Util, "getImageSizeModern").mockResolvedValue([400, 255]);
    });

    afterEach(() => {
        unmockImageLoading();
        jest.restoreAllMocks();
    });

    it("should convert image markdown to image widget", async () => {
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
                        backgroundImage: {
                            url: earthMoonImage.url,
                            width: 400,
                            height: 255,
                        },
                        alt: "some alt text",
                    }),
                }),
            },
        });
    });

    it("should convert image markdown to image widget with surrounding text", async () => {
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
                        backgroundImage: {
                            url: earthMoonImage.url,
                            width: 400,
                            height: 255,
                        },
                        alt: "some alt text",
                    }),
                }),
            },
        });
    });

    it("should convert the image markdown and keep surrounding widgets", async () => {
        const question = generateTestPerseusRenderer({
            content: `Hello ![some alt text](${earthMoonImage.url}) World [[☃ image 1]]`,
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: {
                            url: earthMoonImage.url,
                            width: 400,
                            height: 255,
                        },
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
                        backgroundImage: {
                            url: earthMoonImage.url,
                            width: 400,
                            height: 255,
                        },
                        alt: "some alt text",
                    }),
                }),
                "image 2": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: {
                            url: earthMoonImage.url,
                            width: 400,
                            height: 255,
                        },
                        alt: "some alt text",
                    }),
                }),
            },
        });
    });

    it("should conver multiple images", async () => {
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
                        backgroundImage: {
                            url: earthMoonImage.url,
                            width: 400,
                            height: 255,
                        },
                        alt: "alt 1",
                    }),
                }),
                "image 2": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: {
                            url: earthMoonImage.url,
                            width: 400,
                            height: 255,
                        },
                        alt: "alt 2",
                    }),
                }),
            },
        });
    });
});
