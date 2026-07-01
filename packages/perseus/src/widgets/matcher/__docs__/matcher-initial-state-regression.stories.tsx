import {themeModes} from "../../../../../../.storybook/modes";

import {matcherRendererDecorator} from "./matcher-renderer-decorator";

import type {PerseusMatcherWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusMatcherWidgetOptions> = {
    title: "Widgets/Matcher/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Matcher widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

const sharedArgs: Partial<PerseusMatcherWidgetOptions> = {
    labels: ["Claims", "Evidence"],
    left: [
        "Our Sun will run out of fuel in ~5 billion years",
        "Plate tectonics will rearrange the continents",
        "Average global temperatures will rise",
    ],
    right: [
        "Medium-sized stars exist for ~10 billion years",
        "The current trajectory of tectonic plate movement",
        "Rapid escalation of greenhouse gas emissions",
    ],
    orderMatters: false,
    padding: true,
};

// Verifies the default state with column labels: both the vertical column
// divider (borderLeft) and the header row underline (borderBottom) render,
// and fontWeight: "inherit" is applied to the label cells.
export const DefaultWithLabels: Story = {
    decorators: [matcherRendererDecorator],
    args: sharedArgs,
};

// Verifies the no-labels state: header row is hidden so only the vertical
// column divider (borderLeft) is visible.
export const WithoutLabels: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        ...sharedArgs,
        labels: ["", ""],
    },
};

// Verifies the orderMatters state: both columns render as draggable cards
// (white background, visible border) rather than the left column appearing
// flat/disabled as it does when orderMatters is false.
export const OrderMatters: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        ...sharedArgs,
        orderMatters: true,
    },
};
