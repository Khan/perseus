import {action} from "storybook/actions";

import BlurInput from "../blur-input";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof BlurInput> = {
    title: "Editors/Components/Blur Input",
    component: BlurInput,
    args: {
        onChange: action("onChange"),
    },
};

export default meta;

type Story = StoryObj<typeof BlurInput>;

export const Example: Story = {
    args: {value: "Test input"},
};
