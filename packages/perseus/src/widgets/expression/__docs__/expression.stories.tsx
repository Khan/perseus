import * as React from "react";

import WrappedServerItemRenderer from "../../../server-item-renderer";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
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
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
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

type Story = StoryObj<typeof WrappedServerItemRenderer>;

/** This story shows how the expression widget looks when the keypad is
 * configured with _every_ option it supports.  */
export const DesktopKitchenSink: Story = {
    args: {
        item: expressionItemKitchenSink,
    },
};

export const MultipleEquivalentAnswers: Story = {
    // Uses the debug UI so the answer can be checked against the
    // configured answer forms.
    render: () => (
        <ServerItemRendererWithDebugUI
            item={expressionItemMultipleEquivalentAnswers}
        />
    ),
};

export const MixedAnswerStates: Story = {
    // Uses the debug UI so the answer can be checked against the
    // configured answer forms.
    render: () => (
        <ServerItemRendererWithDebugUI item={expressionItemMixedAnswerStates} />
    ),
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
