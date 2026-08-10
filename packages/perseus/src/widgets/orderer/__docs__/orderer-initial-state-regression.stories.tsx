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

const defaultArgs = {
    options: [generateCard("$\\sqrt{5}$"), generateCard("2.5")],
} satisfies Partial<PerseusOrdererWidgetOptions>;

export const Default: Story = {
    decorators: [ordererRendererDecorator],
    args: {
        options: [
            generateCard("$\\sqrt{5}$"),
            generateCard("2.5"),
            generateCard("1"),
        ],
    } satisfies Partial<PerseusOrdererWidgetOptions>,
};

export const RightToLeft: Story = {
    decorators: [ordererRendererDecorator, rtlDecorator],
    args: defaultArgs,
    parameters: {
        initialUserInput: {"orderer 1": {current: ["$\\sqrt{5}$", "2.5"]}},
    },
};
