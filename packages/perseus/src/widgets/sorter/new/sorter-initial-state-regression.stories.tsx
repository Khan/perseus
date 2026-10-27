import {
    generateSorterOptions,
    generateSorterWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import type {SorterLegend} from "../legend/legend-types";
import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

// TODO(anakaren): Drop the `{legend?: SorterLegend}` addition once the legend schema adds it
// to PerseusSorterWidgetOptions.
type SorterStoryArgs = PerseusSorterWidgetOptions & {legend?: SorterLegend};

const meta: Meta<SorterStoryArgs> = {
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

const scaleLegend: SorterLegend = {
    startCap: "arrow",
    endCap: "arrow",
    startLabel: "Shortest",
    endLabel: "Longest",
    ariaLabel: "Distances, from shortest at the start to longest at the end",
    position: "below",
};

const timelineCards = ["D-Day", "Battle of the Bulge", "V-E Day", "V-J Day"];

const timelineLegend: SorterLegend = {
    startCap: "bar",
    endCap: "bar",
    startLabel: "1944",
    endLabel: "1946",
    ariaLabel:
        "Events of World War II, from 1944 at the start to 1946 at the end",
    position: "below",
};

export const ScaleLegendBelow: Story = {
    args: {correct: fourCards, layout: "horizontal", legend: scaleLegend},
};

export const ScaleLegendAbove: Story = {
    args: {
        correct: fourCards,
        layout: "horizontal",
        legend: {...scaleLegend, position: "above"},
    },
};

export const TimelineLegend: Story = {
    args: {
        correct: timelineCards,
        layout: "horizontal",
        legend: timelineLegend,
    },
};

export const MixedLegendCaps: Story = {
    args: {
        correct: fourCards,
        layout: "horizontal",
        legend: {...scaleLegend, startCap: "arrow", endCap: "bar"},
    },
};

export const LongLegendLabels: Story = {
    args: {
        correct: fourCards,
        layout: "horizontal",
        legend: {
            ...scaleLegend,
            startLabel: "Shortest distance traveled in a single day",
            endLabel: "Longest distance traveled in a single day",
        },
    },
};

export const ScaleLegendRightToLeft: Story = {
    args: {
        correct: fourCards,
        layout: "horizontal",
        legend: {...scaleLegend, endCap: "bar"},
    },
    decorators: [rtlDecorator],
};

export const VerticalScaleLegend: Story = {
    args: {correct: fourCards, layout: "vertical", legend: scaleLegend},
};

export const VerticalTimelineLegend: Story = {
    args: {correct: timelineCards, layout: "vertical", legend: timelineLegend},
};

export const VerticalScaleLegendRightToLeft: Story = {
    args: {
        correct: fourCards,
        layout: "vertical",
        legend: {...scaleLegend, endCap: "bar"},
    },
    decorators: [rtlDecorator],
};
