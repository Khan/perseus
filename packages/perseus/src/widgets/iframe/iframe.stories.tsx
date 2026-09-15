import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";
import {registerWidgetsDecorator} from "../__testutils__/story-decorators";

import {question1} from "./iframe.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

import {iframeRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/IFrame",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    decorators: [registerWidgetsDecorator([iframeRegistration])],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that embeds external web content within exercises using iframes,\
                    allowing integration with third-party interactive elements.",
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
