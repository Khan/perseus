import {Util} from "@khanacademy/perseus";
import {
    generateImageOptions,
    generateImageWidget,
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {mockImageLoading} from "../../../../testing/image-loader-utils";
import {
    earthMoonImage,
    frescoImage,
} from "../../../perseus/src/widgets/image/utils";

import {
    getFirstAvailableWidgetIndex,
    convertImageMarkdownToImageWidget,
    getCtaForIssueId,
} from "./issue-ctas-utils";

import type {PerseusWidgetsMap} from "@khanacademy/perseus-core";

const defaultImageWidget = generateImageWidget({
    options: generateImageOptions(),
});

const defaultRadioWidget = generateRadioWidget({
    options: generateRadioOptions(),
});

describe("getFirstAvailableWidgetIndex", () => {
    // Breaking this out so that it won't complain about types.
    const testCases: Array<{
        widgetType: string;
        widgets: PerseusWidgetsMap;
        expected: number;
    }> = [
        {
            widgetType: "image",
            widgets: {"image 1": defaultImageWidget},
            expected: 2,
        },
        {
            widgetType: "image",
            widgets: {"image 3": defaultImageWidget},
            expected: 1,
        },
        {
            widgetType: "image",
            widgets: {
                "image 1": defaultImageWidget,
                "image 2": defaultImageWidget,
            },
            expected: 3,
        },
        {
            widgetType: "image",
            widgets: {
                "image 1": defaultImageWidget,
                "image 3": defaultImageWidget,
            },
            expected: 2,
        },
        {
            widgetType: "image",
            widgets: {
                "image 2": defaultImageWidget,
                "image 4": defaultImageWidget,
            },
            expected: 1,
        },
        {
            widgetType: "image",
            widgets: {
                "image 1": defaultImageWidget,
                "radio 1": defaultRadioWidget,
            },
            expected: 2,
        },
        {
            widgetType: "image",
            widgets: {
                "image 1": defaultImageWidget,
                "radio 2": defaultRadioWidget,
            },
            expected: 2,
        },
        {
            widgetType: "image",
            widgets: {
                "image 2": defaultImageWidget,
                "radio 1": defaultRadioWidget,
            },
            expected: 1,
        },
    ];

    it.each(testCases)(
        "returns $expected when widgets has keys: $widgets",
        ({widgetType, widgets, expected}) => {
            // Arrange, Act
            const index = getFirstAvailableWidgetIndex(widgetType, widgets);

            // Assert
            expect(index).toBe(expected);
        },
    );

    it("returns 1 when widgets is empty", () => {
        // Arrange, Act
        const index = getFirstAvailableWidgetIndex("image", {});

        // Assert
        expect(index).toBe(1);
    });
});

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

    it("returns when no image markdown is found", () => {
        // Arrange
        const question = {
            content: "Hello World",
            widgets: {},
            images: {},
        };
        const onEditorChange = jest.fn();

        // Act
        convertImageMarkdownToImageWidget(question, onEditorChange);

        // Assert
        expect(onEditorChange).not.toHaveBeenCalled();
    });

    it("converts image markdown to image widget", async () => {
        // Arrange
        const question = {
            content: `![some alt text](${earthMoonImage.url})`,
            widgets: {},
            images: {},
        };
        const onEditorChange = jest.fn();

        // Act
        await convertImageMarkdownToImageWidget(question, onEditorChange);

        // Assert
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
        // Arrange
        const question = {
            content: `Hello ![some alt text](${earthMoonImage.url}) World`,
            widgets: {},
            images: {},
        };
        const onEditorChange = jest.fn();

        // Act
        await convertImageMarkdownToImageWidget(question, onEditorChange);

        // Assert
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
        // Arrange
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

        // Act
        await convertImageMarkdownToImageWidget(question, onEditorChange);

        // Assert
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
        // Arrange
        const question = generateTestPerseusRenderer({
            content: `![alt 1](${earthMoonImage.url}) ![alt 2](${earthMoonImage.url})`,
            widgets: {},
            images: {},
        });
        const onEditorChange = jest.fn();

        // Act
        await convertImageMarkdownToImageWidget(question, onEditorChange);

        // Assert
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
        // Arrange
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

        // Act
        await convertImageMarkdownToImageWidget(question, onEditorChange);

        // Assert
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
        // Arrange
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

        // Act
        await convertImageMarkdownToImageWidget(question, onEditorChange);

        // Assert
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

    it("converts image markdown within markdown tables", async () => {
        // Arrange
        const question = generateTestPerseusRenderer({
            content: `| col 1 | col 2 |\n| --- | --- |\n| ![markdown 1](${earthMoonImage.url}) | ![markdown 2](${frescoImage.url}) |`,
            widgets: {},
            images: {},
        });
        const onEditorChange = jest.fn();

        // Act
        await convertImageMarkdownToImageWidget(question, onEditorChange);

        // Assert

        expect(onEditorChange).toHaveBeenCalledWith({
            content: `| col 1 | col 2 |\n| --- | --- |\n| [[☃ image 1]] | [[☃ image 2]] |`,
            widgets: {
                "image 1": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: earthMoonImage,
                        alt: "markdown 1",
                    }),
                }),
                "image 2": generateImageWidget({
                    options: generateImageOptions({
                        backgroundImage: {
                            url: frescoImage.url,
                            width: 400, // mocked
                            height: 225, // mocked
                        },
                        alt: "markdown 2",
                    }),
                }),
            },
        });
    });
});

describe("getCtaForIssueId", () => {
    it("returns null when no issue id is found", () => {
        // Arrange
        const question = generateTestPerseusRenderer({
            content: "Hello World",
            widgets: {},
            images: {},
        });
        const onEditorChange = jest.fn();

        // Act
        const cta = getCtaForIssueId(
            "unknown-issue-id",
            question,
            onEditorChange,
        );

        // Assert
        expect(cta).toBeNull();
    });

    it.each([
        {
            issueId: "image-markdown",
            exectedCtaLabel: "Convert all image markdown to widget",
        },
        // Add more cases here as we develop more CTAs for issues.
    ])(
        "returns the correct cta for the issue id",
        ({issueId, exectedCtaLabel}) => {
            // Arrange
            const question = generateTestPerseusRenderer({
                content: "![alt text](url)",
                widgets: {},
                images: {},
            });
            const onEditorChange = jest.fn();

            // Act
            const cta = getCtaForIssueId(issueId, question, onEditorChange);

            // Assert
            expect(cta).toEqual({
                label: exectedCtaLabel,
                onClick: expect.any(Function),
            });
        },
    );
});
