import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    type PerseusImageWidgetOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {registerWidgetsDecorator} from "../../__testutils__/story-decorators";
import {questionWithZoom} from "../image.testdata";
import {imageRegistration} from "../index";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusImageWidgetOptions> = {
    title: "Widgets/Image",
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that displays images within content with configurable size and alignment options,\
                    supporting visual elements in educational materials.",
            },
        },
    },
    // Render a ServerItemRendererWithDebugUI, but allow the image widget
    // props to be passed in as args.
    // Storybook nests later decorators outside earlier ones, so the
    // registering decorator comes last to run before this renderer.
    decorators: [
        (_, {args}) => (
            <ServerItemRendererWithDebugUI
                item={generateTestPerseusItem({
                    question: generateTestPerseusRenderer({
                        content: "[[☃ image 1]]",
                        widgets: {
                            "image 1": generateImageWidget({
                                options: generateImageOptions({
                                    ...args,
                                }),
                            }),
                        },
                    }),
                })}
            />
        ),
        registerWidgetsDecorator([imageRegistration]),
    ],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const BasicQuestion: Story = {
    // Need to add these args so the props table shows all the props correctly.
    args: {
        backgroundImage: {
            url: "https://cdn.kastatic.org/ka-content-images/61831c1329dbc32036d7dd0d03e06e7e2c622718.jpg",
            width: 400,
            height: 225,
        },
        alt: "",
        caption: "",
        title: "",
    },
};

/**
 * An image in a narrow container - tap it to zoom.
 */
export const ImageWithZoom: Story = {
    args: {
        ...questionWithZoom.widgets["image 1"].options,
    },
};
