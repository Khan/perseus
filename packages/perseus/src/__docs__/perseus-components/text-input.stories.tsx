import {action} from "storybook/actions";

import TextInput from "../../components/text-input";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Components/Text Input",
    component: TextInput,
    args: {
        onChange: action("onChange"),
        onBlur: action("onBlur"),
        onFocus: action("onFocus"),
    },
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const EmptyPropsObject: Story = {};

export const TestValueProvided: Story = {
    args: {value: "Test value"},
};

export const AriaLabelTextProvided: Story = {
    args: {labelText: "Test label"},
};

export const Disabled: Story = {
    args: {disabled: true},
};
