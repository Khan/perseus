import {themeModes} from "../../../../../../.storybook/modes";
import {
    narrowViewportDecorator,
    rtlDecorator,
} from "../../__testutils__/story-decorators";

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
        right: [
            "![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/8d0cbfb1d32d421b366091ab3453d13b610d4bc6)",
            "![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/2280e396ebb64c6e8840c624dfd52bf223bbd58d)",
        ],
        orderMatters: false,
        padding: true,
    },
};

export const RightToLeft: Story = {
    decorators: [matcherRendererDecorator, rtlDecorator],
    args: sharedArgs,
};

export const NarrowContainer: Story = {
    decorators: [matcherRendererDecorator, narrowViewportDecorator],
    args: sharedArgs,
};

export const TallColorfulList: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        labels: ["Term", "Color"],
        left: [
            "$\\color{#D92916}{\\text{Red}}$",
            "$\\color{#946700}{\\text{Gold}}$",
            "$\\color{#447A53}{\\text{Green}}$",
            "$\\color{#3D7586}{\\text{Blue}}$",
            "$\\color{#594094}{\\text{Purple}}$",
            "$\\color{#8351E8}{\\text{Violet}}$",
            "$\\color{#B25071}{\\text{Pink}}$",
            "$\\color{#5D5F66}{\\text{Gray}}$",
        ],
        right: [
            "$\\color{#D92916}{\\blacksquare}$",
            "$\\color{#946700}{\\blacksquare}$",
            "$\\color{#447A53}{\\blacksquare}$",
            "$\\color{#3D7586}{\\blacksquare}$",
            "$\\color{#594094}{\\blacksquare}$",
            "$\\color{#8351E8}{\\blacksquare}$",
            "$\\color{#B25071}{\\blacksquare}$",
            "$\\color{#5D5F66}{\\blacksquare}$",
        ],
        orderMatters: false,
        padding: true,
    },
};
