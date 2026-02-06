import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {
    expressionItemKitchenSink,
    expressionItemMixedAnswerStates,
    expressionItemMultipleEquivalentAnswers,
    expressionItemWithFraction,
    expressionItemWithFractionStatic,
} from "../expression.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Expression",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to input and validate mathematical expressions,\
                    supporting various notations and formats for algebra, calculus, and other math topics.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

/** This story shows how the expression widget looks when the keypad is
 * configured with _every_ option it supports.  */
export const DesktopKitchenSink: Story = {
    args: {
        item: expressionItemKitchenSink,
    },
};

export const MultipleEquivalentAnswers: Story = {
    args: {
        item: expressionItemMultipleEquivalentAnswers,
    },
};

export const MixedAnswerStates: Story = {
    args: {
        item: expressionItemMixedAnswerStates,
    },
};

export const FractionInput: Story = {
    args: {
        item: expressionItemWithFraction,
    },
};

export const StaticExpression: Story = {
    args: {
        item: expressionItemWithFractionStatic,
    },
};
