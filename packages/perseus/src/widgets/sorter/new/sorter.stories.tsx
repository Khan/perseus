import {
    generateSorterOptions,
    generateSorterWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {
    basicQuestion,
    texQuestion,
    twoCardVerticalQuestion,
} from "../sorter.testdata";

import type {SorterLegend} from "../legend/legend-types";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type StoryArgs = {
    item: PerseusItem;
};

const meta = {
    title: "Widgets/Sorter/Drag and Drop",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    globals: {featureFlags: ["dnd-widget-sorter"]},
    parameters: {
        docs: {
            description: {
                component:
                    "The drag-and-drop Sorter, behind the `dnd-widget-sorter` feature flag. Learners drag each card from the choice bank into a blank, or move it with the card's actions menu.",
            },
        },
    },
    render: (args: StoryArgs) => (
        <ServerItemRendererWithDebugUI item={args.item} />
    ),
} satisfies Meta<StoryArgs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        item: generateTestPerseusItem({question: texQuestion}),
    },
};

export const TextCards: Story = {
    args: {
        item: generateTestPerseusItem({question: basicQuestion}),
    },
};

export const VerticalLayout: Story = {
    args: {
        item: generateTestPerseusItem({question: twoCardVerticalQuestion}),
    },
};

type LegendStoryArgs = SorterLegend & {layout: "horizontal" | "vertical"};

function generateItemWithLegend(args: LegendStoryArgs): PerseusItem {
    const {layout, ...legend} = args;
    // The legend isn't in the schema yet, so it's added next to the
    // generated options rather than through generateSorterOptions.
    const options = {
        ...generateSorterOptions({
            correct: ["Car loan", "Student loan", "Credit card"],
            layout,
        }),
        legend,
    };

    return generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content: "Arrange the loans by interest rate. [[☃ sorter 1]]",
            widgets: {"sorter 1": generateSorterWidget({options})},
        }),
    });
}

export const Legend: StoryObj<LegendStoryArgs> = {
    args: {
        layout: "horizontal",
        startCap: "arrow",
        endCap: "arrow",
        startLabel: "Lowest",
        endLabel: "Highest",
        ariaLabel:
            "Interest rates, from lowest at the start to highest at the end",
        position: "below",
    },
    argTypes: {
        layout: {control: "inline-radio", options: ["horizontal", "vertical"]},
        startCap: {control: "inline-radio", options: ["arrow", "bar", "none"]},
        endCap: {control: "inline-radio", options: ["arrow", "bar", "none"]},
        position: {control: "inline-radio", options: ["above", "below"]},
    },
    parameters: {
        controls: {
            include: [
                "layout",
                "startCap",
                "endCap",
                "startLabel",
                "endLabel",
                "ariaLabel",
                "position",
            ],
        },
    },
    render: (args) => (
        <ServerItemRendererWithDebugUI item={generateItemWithLegend(args)} />
    ),
};
