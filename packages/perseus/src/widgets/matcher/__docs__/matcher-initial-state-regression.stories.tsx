import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {matcherRendererDecorator} from "../../__testutils__/matcher-renderer-decorator";

import type {PerseusMatcherWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const MatcherWidget = getWidget("matcher")!;

const meta: Meta<typeof MatcherWidget> = {
    title: "Widgets/Matcher/Visual Regression Tests/Initial State",
    component: MatcherWidget,
    tags: ["!autodocs"],
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

type Story = StoryObj<typeof MatcherWidget>;

const sharedArgs = {
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
} satisfies Partial<PerseusMatcherWidgetOptions>;

// Verifies the default state with column labels: both the vertical column
// divider (borderLeft) and the header row underline (borderBottom) use #444,
// and fontWeight: "inherit" is applied to the label cells.
export const DefaultWithLabels: Story = {
    decorators: [matcherRendererDecorator],
    args: sharedArgs,
};

// Verifies the no-labels state: header row is hidden so only the vertical
// column divider (borderLeft using #444) is visible.
export const WithoutLabels: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        labels: ["", ""],
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
    } satisfies Partial<PerseusMatcherWidgetOptions>,
};

// Verifies TeX rendering in column labels: math content renders correctly
// inside the label cells alongside the #444 borderBottom.
export const WithTexLabels: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        labels: ["$f(x)$", "$g(x)$"],
        left: ["$f(x) = x^2$", "$f(x) = \\sqrt{x}$", "$f(x) = \\dfrac{1}{x}$"],
        right: ["Parabola opening upward", "Square root curve", "Hyperbola"],
        orderMatters: false,
        padding: true,
    } satisfies Partial<PerseusMatcherWidgetOptions>,
};

// Verifies the orderMatters state: both columns render as draggable cards
// (white background, visible border) rather than the left column appearing
// flat/disabled as it does when orderMatters is false.
export const OrderMatters: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        ...sharedArgs,
        orderMatters: true,
    } satisfies Partial<PerseusMatcherWidgetOptions>,
};
