import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {matcherRendererDecorator} from "../../__testutils__/matcher-renderer-decorator";
import {rtlDecorator} from "../../__testutils__/story-decorators";

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
    labels: ["Concepts", "Definitions"],
    left: ["Photosynthesis", "Respiration", "Transpiration"],
    right: [
        "Process by which plants convert light to energy",
        "Process by which organisms convert glucose to energy",
        "Process by which water evaporates from plants",
    ],
    padding: true,
    orderMatters: false,
} satisfies Partial<PerseusMatcherWidgetOptions>;

// Verifies the default state with column labels visible: both the vertical column
// separator border and the horizontal label row bottom border (1px solid #444) are
// rendered, and column headers use fontWeight: inherit.
export const WithLabels: Story = {
    decorators: [matcherRendererDecorator],
    args: sharedArgs,
};

// Verifies the matcher renders without labels: the label row is hidden so only
// the vertical column separator border is visible; no label bottom border renders.
export const WithoutLabels: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        labels: ["", ""],
        left: ["Photosynthesis", "Respiration", "Transpiration"],
        right: [
            "Process by which plants convert light to energy",
            "Process by which organisms convert glucose to energy",
            "Process by which water evaporates from plants",
        ],
        padding: true,
        orderMatters: false,
    } satisfies Partial<PerseusMatcherWidgetOptions>,
};

// Verifies the matcher renders correctly with TeX mathematical expressions in
// both columns, alongside the column separator and label borders.
export const WithTexContent: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        labels: ["Expression", "Value"],
        left: ["$\\dfrac{1}{2} + \\dfrac{1}{2}$", "$2^3$", "$\\sqrt{16}$"],
        right: ["$1$", "$8$", "$4$"],
        padding: true,
        orderMatters: false,
    } satisfies Partial<PerseusMatcherWidgetOptions>,
};

// Verifies the matcher with orderMatters: true, where the left column is fixed
// (non-draggable) and only the right column items can be rearranged.
export const OrderMatters: Story = {
    decorators: [matcherRendererDecorator],
    args: {
        labels: ["Steps", "Actions"],
        left: ["Step 1", "Step 2", "Step 3"],
        right: ["Action A", "Action B", "Action C"],
        padding: true,
        orderMatters: true,
    } satisfies Partial<PerseusMatcherWidgetOptions>,
};

// Verifies the RTL layout: in right-to-left mode the table column order and
// border positions flip, testing that the separator border renders correctly
// under direction: rtl.
export const RightToLeft: Story = {
    decorators: [matcherRendererDecorator, rtlDecorator],
    args: sharedArgs,
};
