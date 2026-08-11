import {themeModes} from "../../../../../../.storybook/modes";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import {
    generateCard,
    ordererRendererDecorator,
} from "./orderer-renderer-decorator";

import type {PerseusOrdererWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusOrdererWidgetOptions> = {
    title: "Widgets/Orderer/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Orderer widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    decorators: [ordererRendererDecorator],
    args: {
        options: [
            generateCard("First"),
            generateCard("Second"),
            generateCard("Third"),
        ],
    } satisfies Partial<PerseusOrdererWidgetOptions>,
};

export const RightToLeft: Story = {
    decorators: [ordererRendererDecorator, rtlDecorator],
    args: {
        options: [generateCard("First"), generateCard("Second")],
    },
    parameters: {
        initialUserInput: {"orderer 1": {current: ["First", "Second"]}},
    },
};
