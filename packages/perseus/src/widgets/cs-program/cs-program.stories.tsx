import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";
import {registerWidgetsDecorator} from "../__testutils__/story-decorators";

import {question1} from "./cs-program.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

import {csProgramRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/CS Program",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    decorators: [registerWidgetsDecorator([csProgramRegistration])],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to write and execute computer science programming code within interactive exercises.",
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
