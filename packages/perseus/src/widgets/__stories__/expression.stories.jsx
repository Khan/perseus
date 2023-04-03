// @flow
import * as React from "react";

import {ItemRendererWithDebugUI} from "../../../../../testing/item-renderer-with-debug-ui.jsx";
import KeypadContext from "../../keypad-context.js";
import {
    expressionItem2,
    expressionItem3,
} from "../__testdata__/expression_testdata.js";
import Expression from "../expression.jsx";

import TestKeypadContext from "./test-keypad-context-wrapper.jsx";

import type {PerseusItem} from "../../perseus-types.js";

type StoryArgs = {|
    customKeypad: boolean,
|};

type Story = {|
    title: string,
    argTypes: $FlowFixMe,
|};

type WrappedKeypadContextProps = {|
    item: PerseusItem,
    customKeypad: boolean,
|};

const WrappedKeypadContext = (props: WrappedKeypadContextProps) => {
    return (
        <TestKeypadContext>
            <KeypadContext.Consumer>
                {({keypadElement, setRenderer, scrollableElement}) => {
                    return (
                        <ItemRendererWithDebugUI
                            item={props.item}
                            apiOptions={{
                                customKeypad: props.customKeypad,
                            }}
                        />
                    );
                }}
            </KeypadContext.Consumer>
        </TestKeypadContext>
    );
};

export default ({
    title: "Perseus/Widgets/Expression",
    argTypes: {customKeypad: {control: "boolean"}},
}: Story);

export const DesktopKitchenSink = (args: StoryArgs): React.Node => {
    const reviewModeRubric = {
        functions: ["f", "g", "h"],
        times: true,
        answerForms: [],
        buttonSets: [
            "basic",
            "basic+div",
            "trig",
            "prealgebra",
            "logarithms",
            "basic relations",
            "advanced relations",
        ],
    };

    const keypadConfiguration = {
        keypadType: "EXPRESSION",
        extraKeys: ["x", "y", "z"],
    };

    return (
        <div style={{padding: "2rem"}}>
            <Expression.widget
                alignment={null}
                value=""
                containerSizeClass="small"
                findWidgets={(callback) => []}
                isLastUsedWidget={false}
                onChange={() => {}}
                problemNum={1}
                static={false}
                trackInteraction={() => {}}
                widgetId="expression"
                reviewModeRubric={reviewModeRubric}
                keypadConfiguration={keypadConfiguration}
                buttonsVisible={"always"}
            />
        </div>
    );
};

export const Desktop = (args: StoryArgs): React.Node => {
    return <WrappedKeypadContext item={expressionItem3} customKeypad={false} />;
};

export const Mobile = (args: StoryArgs): React.Node => {
    return (
        <div>
            <p>
                For some reason you need to be{" "}
                <a href="https://developer.chrome.com/docs/devtools/device-mode/">
                    emulating mobile
                </a>{" "}
                to see the custom keypad.
            </p>
            <WrappedKeypadContext item={expressionItem3} customKeypad={true} />
        </div>
    );
};

export const ExpressionItem2 = (args: StoryArgs): React.Node => {
    return (
        <WrappedKeypadContext
            item={expressionItem2}
            customKeypad={args.customKeypad}
        />
    );
};

export const ExpressionItem3 = (args: StoryArgs): React.Node => {
    return (
        <WrappedKeypadContext
            item={expressionItem3}
            customKeypad={args.customKeypad}
        />
    );
};
