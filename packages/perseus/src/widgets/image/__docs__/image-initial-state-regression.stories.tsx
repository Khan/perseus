import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {imageRendererDecorator} from "../../__testutils__/image-renderer-decorator";
import {
    mobileDecorator,
    articleDecorator,
    mobileArticleDecorator,
    rtlDecorator,
    articleFloatLeftDecorator,
    articleFloatRightDecorator,
    mobileArticleFloatRightDecorator,
    mobileArticleFloatLeftDecorator,
} from "../../__testutils__/story-decorators";
import {
    earthMoonImage,
    frescoImage,
    portraitImage,
    portraitImageCaption,
    portraitImageLongDescription,
    portraitImageTitle,
    scienceImage,
    scienceImageAlt,
    scienceImageCaption,
} from "../utils";

import type {Meta, StoryObj} from "@storybook/react-vite";

const ImageWidget = getWidget("image")!;

type Story = StoryObj<typeof ImageWidget>;

const earthMoonImageCaption =
    "The Moon above Earth's horizon, captured by the International Space Station, [NASA](https://images.nasa.gov/details/iss071e515452)";
const frescsoLongDescription =
    "In the apse, or semicircular recess, The Offer of the Casa Madre to Victory (L’Offerta della Casa Madre alla Vittoria) fresco recalls medieval apse decorative schemes with Christ surrounded by saints to whom the Church is dedicated. Santagata replaced Mary with a triumphant and wingless figure representing Victory, and he replaced saints with sentries. The charismatic wounded veteran Carlo Delcroix, who became the AMNIG president, is depicted presenting a model of the Casa Madre to Victory (not unlike the medieval patron Enrico Scrovegni, who offered the Arena chapel he commissioned to the Virgin Mary).\n\nThis image has some stuff in it. *Here is some italic text.* **Here is some bold text.**";

const articleContent = `But in other cases, an object may experience a centripetal force for an extended time and complete *repeated* revolutions. An example of this type of motion is an astronomical object in **orbit**.\n\n[[☃ image 1]]\n\nLet's explore some of the language and relationships involved in orbital motion.`;

const meta: Meta<typeof ImageWidget> = {
    title: "Widgets/Image/Visual Regression Tests",
    component: ImageWidget,
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Image widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

export const Image: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
    },
};

export const ImageWithCaptionAndLongDescription: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const ImageWithLongDescription: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const ImageWithTitle: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        title: "Earth and Moon",
    },
};

export const MobileImage: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        caption: earthMoonImageCaption,
        title: "Earth and Moon",
        alt: "Earth and Moon",
    },
};

export const MobileImageWithCaptionAndLongDescription: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const MobileImageWithLongDescription: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const MobileImageWithTitle: Story = {
    decorators: [imageRendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        title: "Earth and Moon",
    },
};

export const PortraitImage: Story = {
    decorators: [imageRendererDecorator],
    args: {
        backgroundImage: portraitImage,
        caption: portraitImageCaption,
        title: portraitImageTitle,
        longDescription: portraitImageLongDescription,
    },
};

export const WithinArticle: Story = {
    decorators: [imageRendererDecorator, articleDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
    },
};

export const WithinArticleWithCaptionAndTitle: Story = {
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

export const WithinArticleMobile: Story = {
    decorators: [imageRendererDecorator, mobileArticleDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
    },
};

export const WithinArticleMobileCaptionAndTitle: Story = {
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

export const RightToLeftImage: Story = {
    decorators: [imageRendererDecorator, rtlDecorator],
    args: {
        alt: "Fresco of some people",
        title: "The Offer of the Casa Madre to Victory, 1932",
        caption:
            "Carlo Delcroix presenting the Casa Madre (highlighted) to Victory. Antonio Giuseppe Santagata, The Offer of the Casa Madre to Victory, 1932, fresco (apse, assembly hall, Home for Wounded War Veterans, Rome, photo ©ANMIG)",
        longDescription: frescsoLongDescription,
        backgroundImage: frescoImage,
    },
};

export const RightToLeftImageMobile: Story = {
    decorators: [
        imageRendererDecorator,
        mobileDecorator,
        (Story) => (
            <div style={{direction: "rtl"}}>
                <Story />
            </div>
        ),
    ],
    args: {
        alt: "Fresco of some people",
        title: "The Offer of the Casa Madre to Victory, 1932",
        caption:
            "Carlo Delcroix presenting the Casa Madre (highlighted) to Victory. Antonio Giuseppe Santagata, The Offer of the Casa Madre to Victory, 1932, fresco (apse, assembly hall, Home for Wounded War Veterans, Rome, photo ©ANMIG)",
        longDescription: frescsoLongDescription,
        backgroundImage: frescoImage,
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

export const FloatLeftImageWithinArticle: Story = {
    decorators: [imageRendererDecorator, articleFloatLeftDecorator],
    args: {
        backgroundImage: scienceImage,
        alt: scienceImageAlt,
        caption: scienceImageCaption,
        alignment: "float-left",
    },
};

export const FloatRightImageWithinArticle: Story = {
    decorators: [imageRendererDecorator, articleFloatRightDecorator],
    args: {
        backgroundImage: scienceImage,
        alt: scienceImageAlt,
        caption: scienceImageCaption,
        alignment: "float-right",
    },
};

export const FloatLeftImageWithinArticleMobile: Story = {
    decorators: [imageRendererDecorator, mobileArticleFloatLeftDecorator],
    args: {
        backgroundImage: scienceImage,
        alt: scienceImageAlt,
        caption: scienceImageCaption,
        alignment: "float-left",
    },
};

export const FloatRightImageWithinArticleMobile: Story = {
    decorators: [imageRendererDecorator, mobileArticleFloatRightDecorator],
    args: {
        backgroundImage: scienceImage,
        alt: scienceImageAlt,
        caption: scienceImageCaption,
        alignment: "float-right",
    },
};
