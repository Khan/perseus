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
    parameters: {
        chromatic: {
            // Enable visual snapshot testing for all the stories here.
            disableSnapshot: false,
        },
    },
};
export default meta;

export const SquareBoxSizeAndOtherwiseEmpty: Story = {};

export const LabeledSquaredBox: Story = {
    args: {labels: ["First label", "Second label"]},
};
