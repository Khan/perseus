import {actions} from "@storybook/addon-actions";

import TextInput from "../text-input";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Text Input",
    component: TextInput,
    args: {
        onChange: actions("onChange"),
        onBlur: actions("onBlur"),
        onFocus: actions("onFocus"),
    },
    argTypes: {
        onChange: {table: {disable: true}},
        onBlur: {table: {disable: true}},
        onFocus: {table: {disable: true}},
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
