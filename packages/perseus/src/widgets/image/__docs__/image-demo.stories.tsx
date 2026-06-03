import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ApiOptions} from "../../../perseus-api";
import {getFeatureFlags} from "../../../testing/feature-flags-util";
import {getWidget} from "../../../widgets";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {
    mobileDecorator,
    articleDecorator,
    mobileArticleDecorator,
    articleFloatLeftDecorator,
} from "../../__testutils__/story-decorators";
import {
    earthMoonImage,
    frescoImage,
    animatedGifLandscape,
    animatedGifLandscapeAlt,
    graphieImage,
    graphieImageAlt,
    portraitImage,
    portraitImageCaption,
    portraitImageLongDescription,
    portraitImageTitle,
    scienceImage,
    scienceImageAlt,
    scienceImageCaption,
    svgImage,
    extremelyLongDescription,
    graphieImage2,
    graphieImage2Alt,
} from "../utils";

import {imageRendererDecorator} from "./image-renderer-decorator";

import type {Meta, StoryObj} from "@storybook/react-vite";

const ImageWidget = getWidget("image")!;

type Story = StoryObj<typeof ImageWidget>;

const earthMoonImageCaption =
    "The Moon above Earth's horizon, captured by the International Space Station, [NASA](https://images.nasa.gov/details/iss071e515452)";
const articleContent = `But in other cases, an object may experience a centripetal force for an extended time and complete *repeated* revolutions. An example of this type of motion is an astronomical object in **orbit**.\n\n[[☃ image 1]]\n\nLet's explore some of the language and relationships involved in orbital motion.`;

const meta: Meta<typeof ImageWidget> = {
    title: "Widgets/Image/Widget Demo",
    component: ImageWidget,
    tags: ["!autodocs"],
    parameters: {
        chromatic: {disableSnapshot: false},
    },
};
export default meta;

export const Image: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        longDescription:
            "This is a *very* long description of the earth and moon.",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
    },
};

export const ImageMobile: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
        title: "Earth and Moon",
    },
};

export const ImagePortrait: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: portraitImage,
        caption: portraitImageCaption,
        title: portraitImageTitle,
        longDescription: portraitImageLongDescription,
    },
};

export const ImageWithinArticle: Story = {
    decorators: [imageRendererDecorator, articleDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        caption: earthMoonImageCaption,
        title: "Earth and Moon",
    },
};

export const ImageWithinArticleMobile: Story = {
    decorators: [imageRendererDecorator, mobileArticleDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        caption: earthMoonImageCaption,
        title: "Earth and Moon",
    },
};

export const ImageFloatLeftWithinArticle: Story = {
    decorators: [imageRendererDecorator, articleFloatLeftDecorator],
    args: {
        backgroundImage: scienceImage,
        alt: scienceImageAlt,
        caption: scienceImageCaption,
        alignment: "wrap-left",
    },
};

export const DecorativeImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
        decorative: true,
    },
};

export const DecorativeImageMobile: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
        decorative: true,
    },
};

export const GraphieImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: graphieImage,
        alt: graphieImageAlt,
    },
};

export const GifImage: Story = {
    decorators: [imageRendererDecorator],
    parameters: {
        apiOptions: {
            ...ApiOptions.defaults,
            flags: getFeatureFlags({
                "image-widget-upgrade-gif-controls": true,
            }),
        },
    },
    args: {
        backgroundImage: animatedGifLandscape,
        alt: animatedGifLandscapeAlt,
        caption: animatedGifLandscapeAlt,
        longDescription: animatedGifLandscapeAlt,
    },
};

export const LargeImageWithNoSizeSaved: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: {url: frescoImage.url},
        alt: "Fresco painting",
        longDescription:
            "This is a *very* long description of the fresco painting.",
    },
};

export const SmallImageWithNoSizeSaved: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: {url: earthMoonImage.url},
        alt: "Earth and Moon",
        title: "Hello world. Testing this with a super duper extra long, longest title",
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const LargeSVGImageWithNoSizeSaved: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: {url: svgImage.url},
        alt: "Fresco painting",
        longDescription: extremelyLongDescription,
    },
};

/* Different sizes using the scale prop. */
export const ImageWithScaledSizes: Story = {
    render: function Render() {
        return (
            <QuestionRendererForStories
                question={generateTestPerseusRenderer({
                    content:
                        "[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n\n[[☃ image 4]]\n\n[[☃ image 5]]\n\n[[☃ image 6]]\n\n[[☃ image 7]]\n\n[[☃ image 8]]\n\n[[☃ image 9]]",
                    widgets: {
                        "image 1": generateImageWidget({
                            options: generateImageOptions({
                                backgroundImage: earthMoonImage,
                                scale: 1,
                                alt: "Fresco painting",
                                longDescription: "long description",
                            }),
                        }),
                        "image 2": generateImageWidget({
                            options: generateImageOptions({
                                backgroundImage: earthMoonImage,
                                scale: 0.5,
                                alt: "Fresco painting",
                                longDescription: "long description",
                            }),
                        }),
                        "image 3": generateImageWidget({
                            options: generateImageOptions({
                                backgroundImage: earthMoonImage,
                                scale: 2,
                                alt: "Fresco painting",
                                longDescription: "long description",
                            }),
                        }),
                        "image 4": generateImageWidget({
                            options: generateImageOptions({
                                backgroundImage: graphieImage,
                                alt: graphieImageAlt,
                                longDescription: "long description",
                            }),
                        }),
                        "image 5": generateImageWidget({
                            options: generateImageOptions({
                                backgroundImage: graphieImage,
                                scale: 0.5,
                                alt: graphieImageAlt,
                                longDescription: "long description",
                            }),
                        }),
                        "image 6": generateImageWidget({
                            options: generateImageOptions({
                                backgroundImage: graphieImage,
                                scale: 2,
                                alt: graphieImageAlt,
                                longDescription: "long description",
                            }),
                        }),
                        "image 7": generateImageWidget({
                            options: generateImageOptions({
                                backgroundImage: graphieImage2,
                                alt: graphieImage2Alt,
                                longDescription: "long description",
                            }),
                        }),
                        "image 8": generateImageWidget({
                            options: generateImageOptions({
                                backgroundImage: graphieImage2,
                                scale: 0.5,
                                alt: graphieImage2Alt,
                                longDescription: "long description",
                            }),
                        }),
                        "image 9": generateImageWidget({
                            options: generateImageOptions({
                                backgroundImage: graphieImage2,
                                scale: 2,
                                alt: graphieImage2Alt,
                                longDescription: "long description",
                            }),
                        }),
                    },
                })}
            />
        );
    },
};

/**
 * Image widgets within a markdown table.
 */
export const MarkdownTableWithImageWidgets: Story = {
    render: function Render() {
        return (
            // Limit width so zoom becomes possible.
            <div style={{width: 600}}>
                <QuestionRendererForStories
                    question={generateTestPerseusRenderer({
                        content:
                            "| col 1 | col 2 | col 3 |\n| --- | --- | --- |\n| [[☃ image 1]] | [[☃ image 2]] | [[☃ image 3]] |",
                        widgets: {
                            "image 1": generateImageWidget({
                                options: generateImageOptions({
                                    backgroundImage: frescoImage,
                                    alt: "Fresco painting",
                                }),
                            }),
                            "image 2": generateImageWidget({
                                options: generateImageOptions({
                                    backgroundImage: earthMoonImage,
                                    alt: "Earth and Moon",
                                }),
                            }),
                            "image 3": generateImageWidget({
                                options: generateImageOptions({
                                    backgroundImage: graphieImage,
                                    alt: graphieImageAlt,
                                }),
                            }),
                        },
                    })}
                />
            </div>
        );
    },
};

/**
 * Markdown images within a markdown table.
 */
export const MarkdownTableWithMarkdownImages: Story = {
    render: function Render() {
        return (
            // Limit width so zoom becomes possible.
            <div style={{width: 600}}>
                <QuestionRendererForStories
                    question={generateTestPerseusRenderer({
                        content: `| col 1 | col 2 | col 3 |\n| --- | --- | --- |\n| ![Fresco painting](${frescoImage.url}) | ![Earth and Moon](${earthMoonImage.url}) | ![Graphie image](${graphieImage.url}) |`,
                        widgets: {},
                    })}
                />
            </div>
        );
    },
};
