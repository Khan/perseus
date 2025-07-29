import {action} from "storybook/actions";

import InputWithExamples from "../input-with-examples";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Numeric Input/Widget States Gallery",
    component: InputWithExamples,
    args: {
        examples: [],
        id: "",
        onChange: action("onChange"),
        value: "",
    },
    tags: ["!dev"],
};
export default meta;

type Story = StoryObj<typeof InputWithExamples>;

const testExamples = ["Sample 1", "Sample 2", "Sample 3"];

// TODO: This will be the states gallery for new documentation format.
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
