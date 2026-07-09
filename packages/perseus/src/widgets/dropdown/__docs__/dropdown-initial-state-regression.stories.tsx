import {generateDropdownOptions} from "@khanacademy/perseus-core";

import {themeModes, viewportModes} from "../../../../../../.storybook/modes";
import {
    mobileDecorator,
    rtlDecorator,
} from "../../__testutils__/story-decorators";

import {dropdownRendererDecorator} from "./dropdown-renderer-decorator";

import type {PerseusDropdownWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusDropdownWidgetOptions> = {
    title: "Widgets/Dropdown/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the dropdown widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicDropdown: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "greater/less than or equal to",
        choices: [
            {
                content: "greater than or equal to",
                correct: false,
            },
            {
                content: "less than or equal to",
                correct: true,
            },
        ],
    }),
    parameters: {
        content:
            "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
    },
};

export const DropdownWithEmptyPlaceholder: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "",
        choices: [
            {
                content: "greater than or equal to",
                correct: false,
            },
            {
                content: "less than or equal to",
                correct: true,
            },
        ],
    }),
    parameters: {
        content:
            "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
    },
};

export const InlineDropdownWithVisibleLabel: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose an answer",
        choices: [
            {
                content: "True",
                correct: true,
            },
            {
                content: "False",
                correct: false,
            },
        ],
        visibleLabel: "Test label",
        ariaLabel: "Test ARIA label",
    }),
    parameters: {
        content:
            "The dropdown widget is often used inline. This is how it would look in an article with the new visible label:\n\nLorem ipsum odor amet, consectetuer adipiscing elit. Mus curae sollicitudin penatibus, mattis suscipit habitant tincidunt mauris. Vitae curae dolor gravida vehicula adipiscing vulputate penatibus. [[☃ dropdown 1]] Ultricies mollis taciti vel, penatibus dapibus interdum pharetra. Ultricies sollicitudin facilisi vehicula dapibus ligula maecenas libero ligula. Lobortis luctus accumsan rhoncus posuere sapien mi habitant fusce. Per ultrices ac mus ligula habitant pulvinar aliquam dui lacus.",
    },
};

export const TableDropdownWithVisibleLabel: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        choices: [
            {
                content: "True",
                correct: true,
            },
            {
                content: "False",
                correct: false,
            },
        ],
        visibleLabel: "Test label",
        ariaLabel: "Test ARIA label",
    }),
    parameters: {
        content:
            "Another use case is that it can be used in tables:\n\nheader 1 | header 2 \n- | -\ndata 1 | [[☃ dropdown 1]]\ndata 4 | data 5\ndata 7 | data 8",
    },
};

export const RTL: Story = {
    decorators: [dropdownRendererDecorator, rtlDecorator],
    args: generateDropdownOptions({
        placeholder: "اختر إجابة",
        choices: [
            {content: "الخيار 1", correct: false},
            {content: "الخيار 2", correct: true},
            {content: "الخيار 3", correct: false},
        ],
    }),
    parameters: {
        content: "هذه قائمة منسدلة: [[☃ dropdown 1]]",
    },
};

export const MathInPlaceholder: Story = {
    decorators: [dropdownRendererDecorator],
    args: generateDropdownOptions({
        placeholder: "Choose $\\frac{1}{2}$ or $\\frac{3}{4}$",
        choices: [
            {content: "$\\frac{1}{2}$", correct: false},
            {content: "$\\frac{3}{4}$", correct: true},
        ],
    }),
    parameters: {
        content: "Which fraction is larger? [[☃ dropdown 1]]",
    },
};

// Verifies how a placeholder wider than the available space is handled on a
// mobile-sized screen. `mobileDecorator` applies the `perseus-mobile` styling,
// and the small viewport Chromatic mode constrains the snapshot to a
// mobile-sized width so the overflow behavior is observable.
export const WidePlaceholderOnMobileScreen: Story = {
    decorators: [dropdownRendererDecorator, mobileDecorator],
    args: generateDropdownOptions({
        placeholder:
            "This is an unusually long placeholder that is wider than a mobile screen",
        choices: [
            {content: "greater than or equal to", correct: false},
            {content: "less than or equal to", correct: true},
        ],
    }),
    parameters: {
        content: "The total number of boxes is [[☃ dropdown 1]] $60$.",
        chromatic: {modes: {small: viewportModes.small}},
    },
};
