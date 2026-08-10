import {themeModes} from "../../../../../../.storybook/modes";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import {card, ordererRendererDecorator} from "./orderer-renderer-decorator";

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

// Two cards already placed in order, two still in the bank — covers the
// resting `.card` styling and the bank's stacked `.card.stack` styling in a
// single render. One of each also carries TeX content.
const defaultArgs = {
    options: [card("$\\sqrt{5}$"), card("2.5")],
} satisfies Partial<PerseusOrdererWidgetOptions>;

export const Default: Story = {
    decorators: [ordererRendererDecorator],
    args: defaultArgs,
    parameters: {
        initialUserInput: {"orderer 1": {current: ["1", "$\\pi$"]}},
    },
};

export const RightToLeft: Story = {
    decorators: [ordererRendererDecorator, rtlDecorator],
    args: defaultArgs,
    parameters: {
        initialUserInput: {"orderer 1": {current: ["1", "$\\pi$"]}},
    },
};

// Shown whenever no cards have been placed yet, regardless of how many
// options remain in the bank — not an interaction, a genuine initial state.
export const DragHint: Story = {
    decorators: [ordererRendererDecorator],
    args: {
        options: [card("$\\sqrt{5}$"), card("2.5"), card("1")],
    } satisfies Partial<PerseusOrdererWidgetOptions>,
};
