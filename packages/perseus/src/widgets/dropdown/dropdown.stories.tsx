import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {generateTestPerseusItem} from "../../util/test-utils";

import {
    basicDropdown,
    dropdownWithEmptyPlaceholder,
    dropdownWithMath,
    dropdownWithVisibleLabel,
    inlineDropdownWithVisibleLabel,
} from "./dropdown.testdata";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Widgets/Dropdown",
    component: ServerItemRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const BasicDropdown: Story = {
    args: {item: generateTestPerseusItem({question: basicDropdown})},
};

export const DropdownWithMath: Story = {
    args: {item: generateTestPerseusItem({question: dropdownWithMath})},
};

export const DropdownWithVisibleLabel: Story = {
    args: {item: generateTestPerseusItem({question: dropdownWithVisibleLabel})},
};

export const InlineDropdownWithVisibleLabel: Story = {
    args: {
        item: generateTestPerseusItem({
            question: inlineDropdownWithVisibleLabel,
        }),
    },
};

export const DropdownWithEmptyPlaceholder: Story = {
    args: {
        item: generateTestPerseusItem({
            question: dropdownWithEmptyPlaceholder,
        }),
    },
};

export const AnswerlessBasicDropdown: Story = {
    args: {
        item: generateTestPerseusItem({
            question: basicDropdown,
        }),
        startAnswerless: true,
    },
};
