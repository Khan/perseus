import {action} from "@storybook/addon-actions";

import StubTagEditor from "../stub-tag-editor";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Components/Stub Tag Editor",
    component: StubTagEditor,
    args: {
        value: [],
        onChange: action("onChange"),
    },
};

export default meta;

type Story = StoryObj<typeof StubTagEditor>;

const defaultValues = ["Test value 1", "Test value 2", "Test value 3"];

export const ShowingTitle: Story = {
    args: {showTitle: true},
};

export const NotShowingTitle: Story = {
    args: {showTitle: false},
};

export const ShowingTitleWithValue: Story = {
    args: {
        showTitle: true,
        value: defaultValues,
    },
};

export const NotShowingTitleWithValue: Story = {
    args: {
        showTitle: false,
        value: defaultValues,
    },
};
