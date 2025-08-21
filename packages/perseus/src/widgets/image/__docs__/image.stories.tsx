import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {question, questionWithZoom} from "../image.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Image",
    component: ServerItemRendererWithDebugUI,
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
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const BasicQuestion: Story = {
    args: {
        item: generateTestPerseusItem({
            question: question,
        }),
    },
};

/**
 * An image in a narrow container - tap it to zoom.
 */
export const ImageWithZoom: Story = {
    decorators: [
        (Story) => (
            <div style={{width: "50%", margin: "0 auto"}}>
                <Story />
            </div>
        ),
    ],
    args: {
        item: generateTestPerseusItem({
            question: questionWithZoom,
        }),
    },
};
