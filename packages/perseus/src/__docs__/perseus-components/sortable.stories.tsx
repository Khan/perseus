import Sortable from "../../components/sortable";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Components/Sortable",
    component: Sortable,
    args: {
        options: ["Option 1", "Option 2", "Option 3"],
    },
};
export default meta;

type Story = StoryObj<typeof Sortable>;

export const SortableHorizontalExample: Story = {
    args: {
        layout: "horizontal",
        options: ["a", "b", "c"],
        waitForTexRendererToLoad: false,
    },
};

export const SortableVerticalExample: Story = {
    args: {
        layout: "vertical",
        options: ["a", "b", "c"],
        waitForTexRendererToLoad: false,
    },
};

export const BasicSortableOptionsTest: Story = {};

export const BasicSortableOptionsTestWithNoPadding: Story = {
    args: {padding: false},
};

export const BasicSortableOptionsTestWithLargeMargin: Story = {
    args: {margin: 64},
};

export const BasicSortableOptionsTestDisabled: Story = {
    args: {disabled: true},
};

export const BasicSortableOptionsTestWithWidthAndHeightConstraints: Story = {
    args: {
        constraints: {
            height: 128,
            width: 256,
        },
    },
};
