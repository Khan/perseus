import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {
    expressionItem2,
    expressionItem3,
    expressionItem4,
    expressionItem4Static,
    expressionItemKitchenSink,
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

export const ExpressionItem2: Story = {
    args: {
        item: expressionItem2,
    },
};

export const ExpressionItem3: Story = {
    args: {
        item: expressionItem3,
    },
};

/**
 * This story allows us to specifically test division in the expression widget.
 */
export const ExpressionItem4: Story = {
    args: {
        item: expressionItem4,
    },
};

export const StaticExpression: Story = {
    args: {
        item: expressionItem4Static,
    },
};
