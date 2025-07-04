import * as React from "react";

import InfoTip from "../../components/info-tip";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Perseus/Components/Info Tip",
    component: InfoTip,
};
export default meta;

type Story = StoryObj<typeof InfoTip>;

export const TextOnMouseover: Story = {
    args: {
        children: "Sample text",
    },
};

export const CodeInText: Story = {
    args: {
        children: (
            <>
                Settings that you add here are available to the program as an
                object returned by <code>Program.settings()</code>
            </>
        ),
    },
};

export const MultipleElements: Story = {
    args: {
        children: (
            <>
                <p>First paragraph</p>
                <p>Second paragraph</p>
            </>
        ),
    },
};
