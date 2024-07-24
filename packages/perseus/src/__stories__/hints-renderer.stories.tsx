import {View} from "@khanacademy/wonder-blocks-core";
import React from "react";

import HintsRenderer from "../hints-renderer";
import {interactiveGraphQuestionBuilder} from "../widgets/interactive-graphs/interactive-graph-question-builder";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof HintsRenderer> = {
    title: "Perseus/Renderers/Hints Renderer",
    component: HintsRenderer,
    decorators: [
        (Story) => {
            return (
                <View style={{left: 80}}>
                    <Story />
                </View>
            );
        },
    ],
    argTypes: {
        hintsVisible: {
            control: {min: 0},
            defaultValue: 3,
        },
    },
};

export default meta;

type Story = StoryObj<typeof HintsRenderer>;

export const Interactive: Story = {
    args: {
        hints: [
            {
                content: "this is hint 1",
                images: {},
                replace: false,
                widgets: {},
            },
            {
                content: "this is hint 2",
                images: {},
                replace: false,
                widgets: {},
            },
            {
                content: "this is hint 3",
                images: {},
                replace: false,
                widgets: {},
            },
        ],
    },
};

export const WithInteractiveGraph: Story = {
    args: {
        apiOptions: {
            flags: {
                mafs: {segment: true},
            },
        },
        hints: [
            {
                ...interactiveGraphQuestionBuilder().build(),
                replace: false,
            },
        ],
    },
};
