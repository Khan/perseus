import {getWidget} from "../../../widgets";
import {
    mobileDecorator,
    articleDecorator,
    mobileArticleDecorator,
} from "../../__testutils__/story-decorators";
import {earthMoonImage, monasteryImage} from "../utils";

import {imageRendererDecorator} from "../../__testutils__/image-renderer-decorator";

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
