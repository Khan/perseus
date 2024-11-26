import {action} from "@storybook/addon-actions";

import InputWithExamples from "../input-with-examples";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Input with Examples",
    component: InputWithExamples,
    args: {
        examples: [],
        id: "",
        onChange: action("onChange"),
        value: "",
    },
};
export default meta;

type Story = StoryObj<typeof InputWithExamples>;

const testExamples = ["Sample 1", "Sample 2", "Sample 3"];

export const DefaultAndMostlyEmptyProps: Story = {};

export const ListOfExamples: Story = {
    args: {
        examples: testExamples,
    },
};

export const AriaLabelTextWithListOfExamples: Story = {
    args: {
        examples: testExamples,
        labelText: "Test label",
    },
};

export const DisabledInput: Story = {
    args: {
        disabled: true,
        examples: testExamples,
    },
};
