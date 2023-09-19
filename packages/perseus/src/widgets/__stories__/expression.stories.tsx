import {KeypadContext, KeypadType} from "@khanacademy/math-input";
import * as React from "react";

import {ItemRendererWithDebugUI} from "../../../../../testing/item-renderer-with-debug-ui";
import {
    expressionItem2,
    expressionItem3,
} from "../__testdata__/expression.testdata";
import expressionExport from "../expression";

import TestKeypadContextWrapper from "./test-keypad-context-wrapper";

import type {PerseusItem} from "../../perseus-types";
import type {Keys as Key} from "@khanacademy/math-input";

type StoryArgs = {
    customKeypad: boolean;
};

type Story = {
    title: string;
    argTypes: any;
};

type WrappedKeypadContextProps = {
    item: PerseusItem;
    customKeypad: boolean;
};

const WrappedKeypadContext = (props: WrappedKeypadContextProps) => {
    return (
        <TestKeypadContextWrapper>
            <KeypadContext.Consumer>
                {({keypadElement, setRenderer, scrollableElement}) => {
                    return (
                        <ItemRendererWithDebugUI
                            item={props.item}
                            apiOptions={{
                                customKeypad: props.customKeypad,
                                useV2Keypad: true,
                            }}
                        />
                    );
                }}
            </KeypadContext.Consumer>
        </TestKeypadContextWrapper>
    );
};

export const DesktopKitchenSink = (args: StoryArgs): React.ReactElement => {
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
        keypadType: KeypadType.EXPRESSION,
        extraKeys: ["x", "y", "z"] as Key[],
    };

    return (
        <div style={{padding: "2rem"}}>
            <expressionExport.widget
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
            />
        </div>
    );
};

export const Desktop = (args: StoryArgs): React.ReactElement => {
    return <WrappedKeypadContext item={expressionItem3} customKeypad={false} />;
};

export const Mobile = (args: StoryArgs): React.ReactElement => {
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

export const ExpressionItem2 = (args: StoryArgs): React.ReactElement => {
    return (
        <WrappedKeypadContext
            item={expressionItem2}
            customKeypad={args.customKeypad}
        />
    );
};

export const ExpressionItem3 = (args: StoryArgs): React.ReactElement => {
    return (
        <WrappedKeypadContext
            item={expressionItem3}
            customKeypad={args.customKeypad}
        />
    );
};

export default {
    title: "Perseus/Widgets/Expression",
    argTypes: {customKeypad: {control: "boolean"}},
} as Story;
