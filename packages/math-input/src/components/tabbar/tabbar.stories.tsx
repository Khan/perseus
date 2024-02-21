import Tabbar from "./tabbar";

import type {Meta, StoryObj} from "@storybook/react";

type Story = StoryObj<typeof Tabbar>;

const meta: Meta<typeof Tabbar> = {
    title: "math-input/components/Tab Bar",

    component: Tabbar,
};
export default meta;

export const Demo: Story = {
    argTypes: {
        selectedItem: {options: ["Numbers", "Geometry", "Operators"]},
    },
    args: {
        items: ["Numbers", "Geometry", "Operators"],
    },
    parameters: {controls: {exclude: ["items"]}},
};
