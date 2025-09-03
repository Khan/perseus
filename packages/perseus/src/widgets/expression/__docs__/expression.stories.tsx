import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import expressionExport from "../expression";
import {
    expressionItem2,
    expressionItem3,
    expressionItem4,
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
// TODO: use a Renderer wrapper rather than rendering this directly
export const DesktopKitchenSink = (args: Story["args"]): React.ReactElement => {
    return (
        <div style={{padding: "2rem"}}>
            <expressionExport.widget
                alignment={null}
                visibleLabel=""
                ariaLabel=""
                containerSizeClass="small"
                findWidgets={(callback) => []}
                isLastUsedWidget={false}
                onChange={() => {}}
                problemNum={1}
                static={false}
                handleUserInput={() => {}}
                userInput=""
                trackInteraction={() => {}}
                widgetId="expression"
                widgetIndex={0}
                extraKeys={["x", "y", "z"]}
                reviewMode={false}
                answerForms={[
                    {
                        considered: "correct",
                        form: false,
                        simplify: false,
                        value: "8675309",
                    },
                ]}
            />
        </div>
    );
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

export const ExpressionItem4: Story = {
    args: {
        item: expressionItem4,
    },
};

export const AnswerlessExpression: Story = {
    args: {
        item: expressionItem3,
        startAnswerless: true,
    },
};
