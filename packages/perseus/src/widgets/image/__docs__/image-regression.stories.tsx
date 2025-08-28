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

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const ImageWidget = getWidget("image")!;

type Story = StoryObj<typeof ImageWidget>;

const earthMoonImage = {
    url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",
    width: 400,
    height: 225,
};
const earthMoonImageCaption =
    "The Moon above Earth's horizon, captured by the International Space Station, [NASA](https://images.nasa.gov/details/iss071e515452)";
const frescoImageUrl =
    "https://cdn.kastatic.org/ka-perseus-images/01f44d5b73290da6bec97c75a5316fb05ab61f12.jpg";

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

const mobileDecorator = (Story) => (
    <div className="framework-perseus perseus-mobile">
        <Story />
    </div>
);

const meta: Meta<typeof ImageWidget> = {
    title: "Widgets/Image/Visual Regression Tests",
    component: ImageWidget,
    tags: ["!dev"],
    parameters: {
        chromatic: {disableSnapshot: false},
    },
};
export default meta;

export const Default: Story = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
    },
};

export const Image: Story = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
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
        backgroundImage: {
            url: frescoImageUrl,
            width: 1698,
            height: 955,
        },
    },
};

export const MobileImage: Story = {
    decorators: [rendererDecorator, mobileDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
    },
};

export const WithinArticleDesktop: Story = {
    decorators: [rendererDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
    },
};

export const WithinArticleDesktopCaptionAndTitle: Story = {
    decorators: [rendererDecorator],
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
    decorators: [rendererDecorator, mobileDecorator],
    parameters: {
        content: articleContent,
    },
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
    },
};

export const WithinArticleMobileCaptionAndTitle: Story = {
    decorators: [rendererDecorator, mobileDecorator],
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
    decorators: [
        rendererDecorator,
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
        backgroundImage: {
            url: frescoImageUrl,
            width: 1698,
            height: 955,
        },
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
