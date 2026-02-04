import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import {ApiOptions} from "../../../perseus-api";
import Renderer from "../../../renderer";
import {mockStrings} from "../../../strings";
import {getFeatureFlags} from "../../../testing/feature-flags-util";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import UserInputManager from "../../../user-input-manager";
import {earthMoonImage} from "../utils";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";

const earthMoonImageCaption =
    "The Moon above Earth's horizon, captured by the International Space Station, [NASA](https://images.nasa.gov/details/iss071e515452)";

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

const meta: Meta = {
    title: "Widgets/Image/Visual Regression Tests/Interactions",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Image widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

export const LongDescriptionClickedState = {
    decorators: [rendererDecorator],
    args: {
        backgroundImage: earthMoonImage,
        alt: "Earth and Moon",
        longDescription:
            "This is a *very* long description of the earth and moon.",
        title: "Earth and Moon",
        caption: earthMoonImageCaption,
    },
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const imageTrigger = canvas.getByRole("button", {
            name: "Explore image",
        });
        await userEvent.click(imageTrigger);
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
                    apiOptions={{
                        ...ApiOptions.defaults,
                        flags: getFeatureFlags({"image-widget-upgrade": true}),
                    }}
                />
            )}
        </UserInputManager>
    );
}
