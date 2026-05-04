import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {sorterRendererDecorator} from "../../__testutils__/sorter-renderer-decorator";
import {mobileDecorator} from "../../__testutils__/story-decorators";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const SorterWidget = getWidget("sorter")!;

const meta: Meta<typeof SorterWidget> = {
    title: "Widgets/Sorter/Visual Regression Tests/Initial State",
    component: SorterWidget,
    tags: ["!autodocs", "!manifest"],
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

type Story = StoryObj<typeof SorterWidget>;

const horizontalItems = {
    correct: ["20 km", "150 km", "500 km", "1200 km"],
    padding: true,
    layout: "horizontal",
} satisfies Partial<PerseusSorterWidgetOptions>;

// Verifies the default horizontal layout: cards arranged in a row with padding
export const DefaultHorizontal: Story = {
    decorators: [sorterRendererDecorator],
    args: horizontalItems,
};

// Verifies the vertical layout: cards stacked in a column with padding
export const DefaultVertical: Story = {
    decorators: [sorterRendererDecorator],
    args: {
        correct: [
            "Longest option in the list",
            "Medium length option",
            "Short option",
            "Tiny",
        ],
        padding: true,
        layout: "vertical",
    } satisfies Partial<PerseusSorterWidgetOptions>,
};

// Verifies the horizontal layout on mobile: narrower margin between cards (8px vs 5px)
export const MobileHorizontal: Story = {
    decorators: [sorterRendererDecorator, mobileDecorator],
    parameters: {
        apiOptions: {isMobile: true},
    },
    args: horizontalItems,
};

// Verifies horizontal layout with padding disabled: cards rendered without inner spacing
export const NoPadding: Story = {
    decorators: [sorterRendererDecorator],
    args: {
        correct: ["Item one", "Item two", "Item three"],
        padding: false,
        layout: "horizontal",
    } satisfies Partial<PerseusSorterWidgetOptions>,
};
