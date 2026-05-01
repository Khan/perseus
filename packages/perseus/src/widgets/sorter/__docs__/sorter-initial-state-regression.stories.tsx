import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import {sorterRendererDecorator} from "./sorter-renderer-decorator";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const SorterWidget = getWidget("sorter")!;

const meta: Meta<typeof SorterWidget> = {
    title: "Widgets/Sorter/Visual Regression Tests/Initial State",
    component: SorterWidget,
    tags: ["!autodocs"],
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

const defaultArgs = {
    correct: ["20,000 micrograms", "15 grams", "0.05 kilograms", "100 grams"],
    padding: true,
    layout: "horizontal",
} satisfies Partial<PerseusSorterWidgetOptions>;

// Verifies the default unanswered horizontal layout: all cards rendered in a
// row with white background and gray border (card static state).
export const DefaultHorizontal: Story = {
    decorators: [sorterRendererDecorator],
    args: defaultArgs,
};

// Verifies the vertical layout: cards stacked in a column, synced to the
// same width, with white background and gray border (card static state).
export const VerticalLayout: Story = {
    decorators: [sorterRendererDecorator],
    args: {
        correct: [
            "20,000 micrograms",
            "15 grams",
            "0.05 kilograms",
            "100 grams",
        ],
        padding: true,
        layout: "vertical",
    } satisfies Partial<PerseusSorterWidgetOptions>,
};

// Verifies that TeX math expressions render correctly inside sorter cards in
// horizontal layout.
export const WithTeXContent: Story = {
    decorators: [sorterRendererDecorator],
    args: {
        correct: [
            "$20000$ micrograms",
            "$15$ grams",
            "$0.05$ kilograms",
            "$100$ grams",
        ],
        padding: true,
        layout: "horizontal",
    } satisfies Partial<PerseusSorterWidgetOptions>,
};

// Verifies that the horizontal layout renders correctly in right-to-left
// direction, confirming card order and text alignment adapt to RTL.
export const RightToLeft: Story = {
    decorators: [sorterRendererDecorator, rtlDecorator],
    args: defaultArgs,
};
