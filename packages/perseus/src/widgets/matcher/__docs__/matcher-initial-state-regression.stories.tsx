import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";

import {matcherRendererDecorator} from "./matcher-renderer-decorator";

import type {PerseusMatcherWidgetOptions} from "@khanacademy/perseus-core";
import type {Decorator, Meta, StoryObj} from "@storybook/react-vite";

// Renders the matcher inside a right-to-left context so we can confirm the
// vertical column divider and the header underline still render correctly when
// the writing direction is flipped.
const rtlDecorator: Decorator = (Story) => (
    <div dir="rtl">
        <Story />
    </div>
);

// Constrains the matcher to a narrow container to confirm the two-column
// layout holds when horizontal space is tight.
const narrowContainerDecorator: Decorator = (Story) => (
    <div style={{maxWidth: 256}}>
        <Story />
    </div>
);

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

//Verifies that one columns items will be the same size as the much longer/taller sider
export const UnevenSize: Story = {
    decorators: [matcherRendererDecorator],
    args: {
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
            "Hydrogen fusion in the core is finite",
            "Convection currents in the mantle stay active",
            "Feedback loops amplify polar ice melt",
            "Spectral analysis of comparable G-type stars",
            "Fossil evidence of once-joined landmasses",
            "Rising sea levels recorded across coastlines",
            "Helium accumulation slows the fusion rate",
            "Magnetic striping on the ocean floor",
            "Shrinking glaciers documented over decades",
        ],
        orderMatters: false,
        padding: true,
    },
};

// Verifies the padding: false state produces tighter spacing between cards
// than the default padding: true.
export const PaddingOff: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        ...sharedArgs,
        padding: false,
    },
};

// Verifies that cards containing markdown graphie images render at their
// natural size and that rows still match the taller side.
export const WithImages: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        labels: ["Graph", "Description"],
        left: [
            "![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/8d0cbfb1d32d421b366091ab3453d13b610d4bc6)",
            "![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/2280e396ebb64c6e8840c624dfd52bf223bbd58d)",
        ],
        right: ["A rhombus that's a square", "Half of an Acorn"],
        orderMatters: false,
        padding: true,
    },
};

//Verifies the table actually aligns and orders itself from right to left for rtl languages
export const RightToLeft: Story = {
    decorators: [matcherRendererDecorator, rtlDecorator],
    args: sharedArgs,
};

// Verifies the two-column layout holds when horizontal space is tight.
// NOTE: Remove if the columns/lines shift unpredictably
export const NarrowContainer: Story = {
    decorators: [matcherRendererDecorator, narrowContainerDecorator],
    args: sharedArgs,
};

// Verifies a tall list with colorful (TeX-colored) content renders each row at
// a consistent height across both columns.
export const TallColorfulList: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        labels: ["Term", "Color"],
        left: [
            "$\\color{red}{\\text{Cardinal}}$",
            "$\\color{orange}{\\text{Tangerine}}$",
            "$\\color{#ca337c}{\\text{Magenta}}$",
            "$\\color{green}{\\text{Emerald}}$",
            "$\\color{blue}{\\text{Sapphire}}$",
            "$\\color{purple}{\\text{Amethyst}}$",
            "$\\color{#946700}{\\text{Ochre}}$",
            "$\\color{#0c7f99}{\\text{Teal}}$",
        ],
        right: [
            "$\\color{red}{\\blacksquare}$",
            "$\\color{orange}{\\blacksquare}$",
            "$\\color{#ca337c}{\\blacksquare}$",
            "$\\color{green}{\\blacksquare}$",
            "$\\color{blue}{\\blacksquare}$",
            "$\\color{purple}{\\blacksquare}$",
            "$\\color{#946700}{\\blacksquare}$",
            "$\\color{#0c7f99}{\\blacksquare}$",
        ],
        orderMatters: false,
        padding: true,
    },
};
