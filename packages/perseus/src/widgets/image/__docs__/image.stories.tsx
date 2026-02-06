import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {getWidget} from "../../../widgets";
import {questionWithZoom} from "../image.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const ImageWidget = getWidget("image")!;

const meta: Meta<typeof ImageWidget> = {
    title: "Widgets/Image",
    component: ImageWidget,
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
    ],
};
export default meta;

type Story = StoryObj<typeof ImageWidget>;

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
