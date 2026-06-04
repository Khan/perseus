import {themeModes} from "../../../../../.storybook/modes";
import Sortable from "../sortable";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof Sortable> = {
    title: "Components/Sortable/Visual Regression Tests/Initial State",
    component: Sortable,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Sortable component that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof Sortable>;

const defaultOptions = ["Apple", "Banana", "Cherry"];

export const HorizontalLayout: Story = {
    args: {
        layout: "horizontal",
        options: defaultOptions,
        waitForTexRendererToLoad: false,
    },
};

export const VerticalLayout: Story = {
    args: {
        layout: "vertical",
        options: defaultOptions,
        waitForTexRendererToLoad: false,
    },
};

export const DisabledState: Story = {
    args: {
        layout: "horizontal",
        options: defaultOptions,
        disabled: true,
        waitForTexRendererToLoad: false,
    },
};
