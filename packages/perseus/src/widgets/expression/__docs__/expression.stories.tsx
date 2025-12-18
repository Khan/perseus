import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {ApiOptions} from "../../../perseus-api";
import expressionExport from "../expression";
import {
    expressionItem2,
    expressionItem3,
    expressionItem4,
    expressionItem4Static,
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
export const DesktopKitchenSink = (): React.ReactElement => {
    const noop = () => {};
    const handleUserInput = (
        _newValue: string,
        cb?: () => void,
        _silent?: boolean,
    ) => {
        cb?.();
    };

    return (
        <div style={{padding: "2rem"}}>
            <expressionExport.widget
                alignment={null}
                apiOptions={ApiOptions.defaults}
                buttonSets={["basic", "trig", "prealgebra", "logarithms"]}
                functions={["f", "g", "h"]}
                times={true}
                visibleLabel="Expression Kitchen Sink"
                ariaLabel="Expression Kitchen Sink"
                containerSizeClass="small"
                findWidgets={() => []}
                problemNum={1}
                static={false}
                linterContext={linterContextDefault}
                handleUserInput={handleUserInput}
                userInput=""
                onBlur={noop}
                onFocus={noop}
                trackInteraction={noop}
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

/**
 * This story allows us to specifically test division in the expression widget.
 */
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

export const StaticExpression: Story = {
    args: {
        item: expressionItem4Static,
    },
};

/** This story shows how the expression widget looks when the keypad is
 * configured with _every_ option it supports.  */
// TODO: use a Renderer wrapper rather than rendering this directly
export const ShowAnswerButton = (): React.ReactElement => {
    const [showAnswer, setShowAnswer] = React.useState(true);
    return (
        <div style={{padding: "2rem"}}>
            <label>
                <input
                    type="checkbox"
                    checked={showAnswer}
                    onChange={() => setShowAnswer(!showAnswer)}
                />
                Show answer
            </label>
            <ServerItemRendererWithDebugUI
                item={showAnswer ? expressionItem4Static : expressionItem4}
            />
        </div>
    );
};
