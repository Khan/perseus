import {action} from "@storybook/addon-actions";

import RangeInput from "../range-input";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Range Input",
    component: RangeInput,
    args: {
        value: [],
        onChange: action("onChange"),
    },
    argTypes: {
        onChange: {table: {disable: true}},
    },
};
export default meta;

type Story = StoryObj<typeof RangeInput>;

export const EmptyValueArray: Story = {};

export const SimpleWithSmallValueRanges: Story = {
    args: {
        value: [-10, 10],
    },
};

export const Placeholders: Story = {
    args: {
        placeholder: ["?", "!"],
    },
};
