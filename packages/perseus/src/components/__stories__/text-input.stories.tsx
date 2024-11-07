import {action} from "@storybook/addon-actions";

import TextInput from "../text-input";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Text Input",
    component: TextInput,
    args: {
        onChange: action("onChange"),
        onBlur: action("onBlur"),
        onFocus: action("onFocus"),
    },
    argTypes: {
        onChange: {control: {type: null}},
        onBlur: {control: {type: null}},
        onFocus: {control: {type: null}},
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
