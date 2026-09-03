import {themeModes} from "../../../../../.storybook/modes";
import MultiButtonGroup from "../multi-button-group";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof MultiButtonGroup> = {
    title: "Components/Multi-Button Group/Visual Regression Tests/Initial State",
    component: MultiButtonGroup,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for MultiButtonGroup's visual states.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
    args: {
        buttons: [
            {value: "One", content: "Item #1"},
            {value: "Two", content: "Item #2"},
            {value: "Three", content: "Item #3"},
        ],
        onChange: () => {},
    },
};
export default meta;

type Story = StoryObj<typeof MultiButtonGroup>;

export const Default: Story = {
    args: {values: []},
};

export const MultipleSelected: Story = {
    args: {values: ["One", "Three"]},
};
