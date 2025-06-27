import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import expressionExport from "./expression";
import {expressionItem2, expressionItem3} from "./expression.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Perseus/Widgets/Expression",
    component: ServerItemRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

/** This story shows how the expression widget looks when the keypad is
 * configured with _every_ option it supports.  */
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
                reviewMode={false}
                extraKeys={["x", "y", "z"]}
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

export const AnswerlessExpression: Story = {
    args: {
        item: expressionItem3,
        startAnswerless: true,
    },
};
