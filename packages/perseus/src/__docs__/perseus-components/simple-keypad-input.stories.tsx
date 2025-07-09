import {action} from "storybook/actions";

import SimpleKeypadInput from "../../components/simple-keypad-input";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Components/Simple Keypad Input",
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
