import TeX from "../tex";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Tex",
    component: TeX,
    args: {
        children: "f(x) = x + 1",
    },
};
export default meta;

type Story = StoryObj<typeof TeX>;

export const BasicOperation: Story = {};
