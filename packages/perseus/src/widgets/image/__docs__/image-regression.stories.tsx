import {
    generateTestPerseusRenderer,
    generateImageOptions,
    generateImageWidget,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ApiOptions} from "../../../perseus-api";
import Renderer from "../../../renderer";
import {mockStrings} from "../../../strings";
import UserInputManager from "../../../user-input-manager";
import {getWidget} from "../../../widgets";
import {
    mobileDecorator,
    articleDecorator,
    mobileArticleDecorator,
    rtlDecorator,
} from "../../__testutils__/story-decorators";
import {earthMoonImage, frescoImage, monasteryImage} from "../utils";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const ImageWidget = getWidget("image")!;

type Story = StoryObj<typeof ImageWidget>;

const earthMoonImageCaption =
    "The Moon above Earth's horizon, captured by the International Space Station, [NASA](https://images.nasa.gov/details/iss071e515452)";

const articleContent = `But in other cases, an object may experience a centripetal force for an extended time and complete *repeated* revolutions. An example of this type of motion is an astronomical object in **orbit**.\n\n[[☃ image 1]]\n\nLet's explore some of the language and relationships involved in orbital motion.`;

// Breaking this out instead of using it globally, so that the
// right-to-left story can wrap the ImageQuestionRenderer with the
// right-to-left wrapper.
const rendererDecorator = (_, {args, parameters}) => {
    return (
        <ImageQuestionRenderer
            question={generateTestPerseusRenderer({
                content: parameters?.content ?? "[[☃ image 1]]",
                widgets: {
                    "image 1": generateImageWidget({
                        options: generateImageOptions({
                            ...args,
                        }),
                    }),
                },
            })}
        />
    );
};

const meta: Meta<typeof ImageWidget> = {
    title: "Widgets/Image/Visual Regression Tests",
    component: ImageWidget,
    tags: ["!dev"],
    parameters: {
        chromatic: {disableSnapshot: false},
    },
};
export default meta;

export const Image: Story = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
    },
};

export const ImageWithAll: Story = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        longDescription:
            "This is a *very* long description of the earth and moon.",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
    },
};

export const ImageWithAlt: Story = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
    },
};

export const ImageWithCaption: Story = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        caption: earthMoonImageCaption,
    },
};

export const ImageWithCaptionAndLongDescription: Story = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const ImageWithLongDescription: Story = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const ImageWithTitle: Story = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        title: "Earth and Moon",
    },
};

export const ImageWithZoom: Story = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: frescoImage,
    },
};

export const MobileImageAll: Story = {
    decorators: [rendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
        title: "Earth and Moon",
    },
};

export const MobileImageWithAlt: Story = {
    decorators: [rendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
    },
};

export const MobileImageWithCaption: Story = {
    decorators: [rendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        caption: earthMoonImageCaption,
    },
};

export const MobileImageWithCaptionAndLongDescription: Story = {
    decorators: [rendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        caption: earthMoonImageCaption,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const MobileImageWithLongDescription: Story = {
    decorators: [rendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        longDescription:
            "This is a *very* long description of the earth and moon.",
    },
};

export const MobileImageWithTitle: Story = {
    decorators: [rendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        title: "Earth and Moon",
    },
};

export const MobileImageWithZoom: Story = {
    decorators: [rendererDecorator, mobileDecorator],
    args: {
        backgroundImage: frescoImage,
    },
};

export const PortraitImage: Story = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: monasteryImage,
        caption:
            "Kalenić Monastery, after 1407, Serbia (photo: [Ванилица](https://commons.wikimedia.org/wiki/File:Wiki_%C5%A0umadija_XI_Kaleni%C4%87_Monastery_874.jpg), CC BY-SA 4.0)",
        title: "Kalenić Monastery",
        longDescription:
            "Later architecture in Serbia, notably that of the so-called Morava School, is smaller and more decorative, often utilizing the so-called Athonite plan (with choroi and subsidiary chapels), as at Ravanica (1370s), with five domes, or the smaller and simpler Kalenić (after 1407).",
    },
};

export const WithinArticleDesktop: Story = {
    decorators: [rendererDecorator, articleDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
    },
};

export const WithinArticleDesktopCaptionAndTitle: Story = {
    decorators: [rendererDecorator, articleDecorator],
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
    decorators: [rendererDecorator, mobileArticleDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
    },
};

export const WithinArticleMobileCaptionAndTitle: Story = {
    decorators: [rendererDecorator, mobileArticleDecorator],
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
    decorators: [rendererDecorator, rtlDecorator],
    args: {
        alt: "Fresco of some people",
        title: "The Offer of the Casa Madre to Victory, 1932",
        caption:
            "Carlo Delcroix presenting the Casa Madre (highlighted) to Victory. Antonio Giuseppe Santagata, The Offer of the Casa Madre to Victory, 1932, fresco (apse, assembly hall, Home for Wounded War Veterans, Rome, photo ©ANMIG)",
        longDescription: "This is a *very* long description of the fresco.",
        backgroundImage: frescoImage,
    },
};

export const RightToLeftImageMobile: Story = {
    decorators: [
        rendererDecorator,
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
        longDescription: "This is a *very* long description of the fresco.",
        backgroundImage: frescoImage,
    },
};

function ImageQuestionRenderer(props: {question: PerseusRenderer}) {
    const {question} = props;
    return (
        <UserInputManager widgets={question.widgets} problemNum={0}>
            {({userInput, handleUserInput, initializeUserInput}) => (
                <Renderer
                    userInput={userInput}
                    handleUserInput={handleUserInput}
                    initializeUserInput={initializeUserInput}
                    strings={mockStrings}
                    content={question.content}
                    widgets={question.widgets}
                    images={question.images}
                    apiOptions={ApiOptions.defaults}
                />
            )}
        </UserInputManager>
    );
}
