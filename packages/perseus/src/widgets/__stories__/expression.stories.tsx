import {KeypadContext} from "@khanacademy/keypad-context";
import {KeypadType} from "@khanacademy/math-input";
import {action} from "@storybook/addon-actions";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {
    expressionItem2,
    expressionItem3,
} from "../__testdata__/expression.testdata";
import expressionExport from "../expression";

import TestKeypadContextWrapper from "./test-keypad-context-wrapper";

import type {LegacyButtonSets, PerseusItem} from "../../perseus-types";
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
    isMobile?: boolean;
};

const WrappedKeypadContext = ({
    item,
    customKeypad,
    isMobile = false,
}: WrappedKeypadContextProps) => {
    return (
        <TestKeypadContextWrapper>
            <KeypadContext.Consumer>
                {({keypadElement}) => {
                    return (
                        <ServerItemRendererWithDebugUI
                            item={item}
                            keypadElement={keypadElement}
                            // Hardcoding the V2 Keypad to true as the Storybook Args
                            // were not working.
                            apiOptions={{
                                isMobile: isMobile,
                                customKeypad: customKeypad,
                                onFocusChange: action("onFocusChange"),
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
        ] as LegacyButtonSets,
    };

    const keypadConfiguration = {
        keypadType: KeypadType.EXPRESSION,
        extraKeys: ["x", "y", "z"] as Array<Key>,
    };

    return (
        <div style={{padding: "2rem"}}>
            <expressionExport.widget
                alignment={null}
                value=""
                visibleLabel=""
                ariaLabel=""
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
                MathInput uses touch events;{" "}
                <a href="https://developer.chrome.com/docs/devtools/device-mode/">
                    emulate mobile
                </a>{" "}
                to use the custom keypad.
            </p>
            <WrappedKeypadContext
                item={expressionItem3}
                customKeypad
                isMobile
            />
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
