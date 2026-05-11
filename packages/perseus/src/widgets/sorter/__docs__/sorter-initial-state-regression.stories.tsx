import {themeModes} from "../../../../../../.storybook/modes";
import {sorterRendererDecorator} from "../../__testutils__/sorter-renderer-decorator";
import {mobileDecorator} from "../../__testutils__/story-decorators";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusSorterWidgetOptions> = {
    title: "Widgets/Sorter/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    decorators: [sorterRendererDecorator],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Sorter widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

const horizontalItems: Partial<PerseusSorterWidgetOptions> = {
    correct: ["20 km", "150 km", "500 km", "1200 km"],
    padding: true,
    layout: "horizontal",
};

// Verifies the default horizontal layout: cards arranged in a row with padding
export const DefaultHorizontal: Story = {
    args: horizontalItems,
};

// Verifies the vertical layout: cards stacked in a column with padding
export const DefaultVertical: Story = {
    args: {
        correct: [
            "Longest option in the list",
            "Medium length option",
            "Short option",
            "Tiny",
        ],
        padding: true,
        layout: "vertical",
    },
};

// Verifies the horizontal layout on mobile: narrower margin between cards (8px vs 5px)
export const MobileHorizontal: Story = {
    decorators: [mobileDecorator],
    parameters: {
        apiOptions: {isMobile: true},
    },
    args: horizontalItems,
};

// Verifies horizontal layout with padding disabled: cards rendered without inner spacing
export const NoPadding: Story = {
    args: {
        correct: ["Item one", "Item two", "Item three"],
        padding: false,
        layout: "horizontal",
    },
};
