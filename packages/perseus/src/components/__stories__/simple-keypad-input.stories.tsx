import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";
import SimpleKeypadInput from "../simple-keypad-input";

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
