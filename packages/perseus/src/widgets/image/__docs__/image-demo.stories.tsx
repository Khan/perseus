import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {getWidget} from "../../../widgets";
import {
    ImageQuestionRenderer,
    imageRendererDecorator,
} from "../../__testutils__/image-renderer-decorator";
import {
    mobileDecorator,
    articleDecorator,
    mobileArticleDecorator,
    articleFloatLeftDecorator,
} from "../../__testutils__/story-decorators";
import {
    earthMoonImage,
    frescoImage,
    monasteryImage,
    scienceImage,
    scienceImageAlt,
    scienceImageCaption,
} from "../utils";

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
        backgroundImage: monasteryImage,
        caption:
            "Kalenić Monastery, after 1407, Serbia (photo: [Ванилица](https://commons.wikimedia.org/wiki/File:Wiki_%C5%A0umadija_XI_Kaleni%C4%87_Monastery_874.jpg), CC BY-SA 4.0)",
        title: "Kalenić Monastery",
        longDescription:
            "Later architecture in Serbia, notably that of the so-called Morava School, is smaller and more decorative, often utilizing the so-called Athonite plan (with choroi and subsidiary chapels), as at Ravanica (1370s), with five domes, or the smaller and simpler Kalenić (after 1407).",
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
        alignment: "float-left",
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

/**
 * Images with different sizes.
 *
 * The sizes are different when rendering inside the item.
 * However, when clicked, the image should be zoomed to the original size,
 * if the original is big enough to allow zooming. The fresco images
 * support zooming, but the earth and moon image does not. The fresco
 * images take up the full available width of the "explore image" modal,
 * whereas the earth and moon image is takes up a smaller width because
 * its original width is smaller.
 */
export const ImageWithDifferentSizes: Story = {
    render: function Render() {
        return (
            // Limit width so zoom becomes possible.
            <div style={{width: 600}}>
                <ImageQuestionRenderer
                    question={generateTestPerseusRenderer({
                        content:
                            "[[☃ image 1]]\n\n[[☃ image 2]]\n\n[[☃ image 3]]\n\n[[☃ image 4]]",
                        widgets: {
                            "image 1": generateImageWidget({
                                options: generateImageOptions({
                                    backgroundImage: frescoImage,
                                    alt: "Fresco painting",
                                    longDescription: "long description",
                                }),
                            }),
                            "image 2": generateImageWidget({
                                options: generateImageOptions({
                                    backgroundImage: {
                                        url: frescoImage.url,
                                        width: 400,
                                        height: 225,
                                    },
                                    alt: "Fresco painting",
                                    longDescription: "long description",
                                }),
                            }),
                            "image 3": generateImageWidget({
                                options: generateImageOptions({
                                    backgroundImage: {
                                        url: frescoImage.url,
                                        width: 200,
                                        height: 112,
                                    },
                                    alt: "Fresco painting",
                                    longDescription: "long description",
                                }),
                            }),
                            "image 4": generateImageWidget({
                                options: generateImageOptions({
                                    backgroundImage: earthMoonImage,
                                    alt: "Earth and Moon",
                                    longDescription: "long description",
                                }),
                            }),
                        },
                    })}
                />
            </div>
        );
    },
};
