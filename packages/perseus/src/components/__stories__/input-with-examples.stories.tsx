import {actions} from "@storybook/addon-actions";

import InputWithExamples from "../input-with-examples";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Input with Examples",
    component: InputWithExamples,
    args: {
        examples: [],
        id: "",
        onChange: actions("onChange"),
        value: "",
    },
    argTypes: {
        onChange: {
            table: {disable: true},
        },
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

export const DisabledInput = {
    args: {
        disabled: true,
        examples: testExamples,
    },
};
