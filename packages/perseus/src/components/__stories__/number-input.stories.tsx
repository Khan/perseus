import {action} from "storybook/actions";

import NumberInput from "../number-input";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Perseus/Components/Number Input",
    component: NumberInput,
    args: {
        onChange: action("onChange"),
        onFormatChange: action("onFormatChange"),
    },
};
export default meta;

type Story = StoryObj<typeof NumberInput>;

export const EmptyPropsObject: Story = {};

export const SampleValue: Story = {
    args: {value: 1234567890},
};

export const Placeholder: Story = {
    args: {
        placeholder: "Sample placeholder",
    },
};

export const SizeMini: Story = {
    args: {
        size: "mini",
        placeholder: "Sample placeholder",
    },
};

export const SizeSmall: Story = {
    args: {
        size: "small",
        placeholder: "Sample placeholder",
    },
};

export const SizeNormal: Story = {
    args: {
        size: "normal",
        placeholder: "Sample placeholder",
    },
};
