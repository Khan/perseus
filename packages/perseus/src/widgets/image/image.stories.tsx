import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {question, questionWithZoom} from "./image.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Image",
    component: ServerItemRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({
            question: {
                ...question,
                widgets: {
                    ...question.widgets,
                    "image 1": {
                        ...question.widgets["image 1"],
                        options: {
                            ...question.widgets["image 1"].options,
                            title: "A very nice image",
                            caption: "This is a caption",
                        },
                    },
                },
            },
        }),
    },
    parameters: {
        docs: {
            disable: false, // This specific story will be shown in autodocs as the default story
        },
    },
};

export const Question2: Story = {
    args: {
        item: generateTestPerseusItem({
            question: {
                ...question,
                widgets: {
                    ...question.widgets,
                    "image 1": {
                        ...question.widgets["image 1"],
                        options: {
                            ...question.widgets["image 1"].options,
                            // alignment: "full-width",
                            title: "A huge image",
                            caption:
                                "There is neither happiness nor unhappiness in this world; there is only the comparison of one state with another. Only a man who has felt ultimate despair is capable of feeling ultimate bliss. It is necessary to have wished for death in order to know how good it is to live.....the sum of all human wisdom will be contained in these two words: Wait and Hope",
                        },
                    },
                },
            },
        }),
    },
};

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
            question: {
                ...questionWithZoom,
                widgets: {
                    ...questionWithZoom.widgets,
                    "image 1": {
                        ...questionWithZoom.widgets["image 1"],
                        options: {
                            ...questionWithZoom.widgets["image 1"].options,
                            title: "An image in a narrow container - tap it to zoom",
                            caption:
                                "There is neither happiness nor unhappiness in this world; there is only the comparison of one state with another. Only a man who has felt ultimate despair is capable of feeling ultimate bliss. It is necessary to have wished for death in order to know how good it is to live.....the sum of all human wisdom will be contained in these two words: Wait and Hope",
                        },
                    },
                },
            },
        }),
    },
};
