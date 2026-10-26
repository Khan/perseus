import {
    generateSorterOptions,
    generateSorterWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusSorterWidgetOptions> = {
    title: "Widgets/Sorter/Visual Regression Tests/Drag and Drop",
    tags: ["!autodocs", "!manifest"],
    globals: {featureFlags: ["dnd-widget-sorter"]},
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the drag-and-drop Sorter that do " +
                    "NOT need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
    render: (args) => (
        <QuestionRendererForStories
            question={generateTestPerseusRenderer({
                content: "Arrange these items in order. [[☃ sorter 1]]",
                widgets: {
                    "sorter 1": generateSorterWidget({
                        options: generateSorterOptions(args),
                    }),
                },
            })}
        />
    ),
};
export default meta;

type Story = StoryObj<typeof meta>;

const fourCards = ["20 km", "150 km", "500 km", "1200 km"];

export const HorizontalLegendBar: Story = {
    args: {correct: fourCards, layout: "horizontal"},
};

export const VerticalLegendBar: Story = {
    args: {correct: fourCards, layout: "vertical"},
};

export const HorizontalWithMoreCardsThanTheMaximum: Story = {
    args: {
        correct: ["1 km", "2 km", "3 km", "4 km", "5 km", "6 km"],
        layout: "horizontal",
    },
};

export const HorizontalLegendBarRightToLeft: Story = {
    args: {correct: fourCards, layout: "horizontal"},
    decorators: [rtlDecorator],
};

export const VerticalLegendBarRightToLeft: Story = {
    args: {correct: fourCards, layout: "vertical"},
    decorators: [rtlDecorator],
};
