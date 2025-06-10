import TabbarItem from "./item";

import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof TabbarItem>;

const meta: Meta<typeof TabbarItem> = {
    title: "math-input/components/Tab Bar Item",

    component: TabbarItem,
};

export default meta;

export const Demo: Story = {
    args: {
        itemState: "inactive" as const,
        itemType: "Numbers",
    },
};
