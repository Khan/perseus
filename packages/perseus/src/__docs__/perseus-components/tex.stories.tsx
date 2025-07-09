import TeX from "../../components/tex";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Components/Tex",
    component: TeX,
    args: {
        children: "f(x) = x + 1",
    },
};
export default meta;

type Story = StoryObj<typeof TeX>;

export const BasicOperation: Story = {};
