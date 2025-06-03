import {action} from "storybook/actions";

import RangeInput from "../range-input";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Perseus/Components/Range Input",
    component: RangeInput,
    args: {
        value: [],
        onChange: action("onChange"),
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
