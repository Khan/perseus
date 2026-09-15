import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";
import {registerWidgetsDecorator} from "../__testutils__/story-decorators";

import {question1} from "./matcher.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

import {matcherRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/Matcher",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    decorators: [registerWidgetsDecorator([matcherRegistration])],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to match items from two different columns,\
                    creating connections between related concepts or terms.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const Question1Answerless: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};
