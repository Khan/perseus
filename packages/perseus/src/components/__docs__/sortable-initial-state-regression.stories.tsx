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

// Verifies the default card appearance in horizontal layout: white background
// and light gray border (card style).
export const HorizontalLayout: Story = {
    args: {
        layout: "horizontal",
        options: defaultOptions,
        waitForTexRendererToLoad: false,
    },
};

// Verifies the default card appearance in vertical layout: white background
// and light gray border (card style).
export const VerticalLayout: Story = {
    args: {
        layout: "vertical",
        options: defaultOptions,
        waitForTexRendererToLoad: false,
    },
};

// Verifies the disabled card appearance: transparent border and inherited
// background override the default card colors.
export const DisabledState: Story = {
    args: {
        layout: "horizontal",
        options: defaultOptions,
        disabled: true,
        waitForTexRendererToLoad: false,
    },
};
