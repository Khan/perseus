import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import WrappedServerItemRenderer from "../../../server-item-renderer";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {
    basicDropdown,
    dropdownWithEmptyPlaceholder,
    dropdownWithMath,
    dropdownWithVisibleLabel,
    inlineDropdownWithVisibleLabel,
} from "../dropdown.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Dropdown",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to select an option from a dropdown menu,\
                    enabling multiple-choice responses within inline text.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof WrappedServerItemRenderer>;

// TODO(ivy): Find way not to include sorting of stories.
export const BasicDropdown: Story = {
    args: {
        item: generateTestPerseusItem({question: basicDropdown}),
    },
};

export const DropdownWithMath: Story = {
    args: {
        item: generateTestPerseusItem({question: dropdownWithMath}),
    },
};

export const DropdownWithVisibleLabel: Story = {
    args: {
        item: generateTestPerseusItem({question: dropdownWithVisibleLabel}),
    },
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
        item: generateTestPerseusItem({question: dropdownWithEmptyPlaceholder}),
    },
};

export const AnswerlessBasicDropdown: Story = {
    args: {
        item: generateTestPerseusItem({question: basicDropdown}),
    },
};
