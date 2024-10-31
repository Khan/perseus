import {action} from "@storybook/addon-actions";

import SimpleKeypadInput from "../simple-keypad-input";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Simple Keypad Input",
    component: SimpleKeypadInput,
    args: {
        onChange: action("onChange"),
        onFocus: action("onFocus"),
        onBlur: action("onBlur"),
    },
};
export default meta;

type Story = StoryObj<typeof SimpleKeypadInput>;

export const EmptyPropsObject: Story = {};

export const CustomValue: Story = {
    args: {value: "Test value"},
};
