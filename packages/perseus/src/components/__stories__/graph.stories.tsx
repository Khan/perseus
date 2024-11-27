import Graph from "../graph";

import type {StoryObj, Meta} from "@storybook/react";

type Story = StoryObj<typeof Graph>;

const size = 200;

const meta: Meta = {
    title: "Perseus/Components/Graph",
    component: Graph,
    args: {
        box: [size, size],
    },
};
export default meta;

export const SquareBoxSizeAndOtherwiseEmpty: Story = {};

export const LabeledSquaredBox: Story = {
    args: {labels: ["First label", "Second label"]},
};
