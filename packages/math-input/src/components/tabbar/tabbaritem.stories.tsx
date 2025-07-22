import TabbarItem from "./item";

import type {Meta, StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof TabbarItem>;

const meta: Meta<typeof TabbarItem> = {
    title: "Math Input/Components/Tab Bar Item",
    tags: ["autodocs", "!dev"],
    parameters: {
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },

    component: TabbarItem,
};

export default meta;

export const Demo: Story = {
    args: {
        itemState: "inactive" as const,
        itemType: "Numbers",
    },
};
