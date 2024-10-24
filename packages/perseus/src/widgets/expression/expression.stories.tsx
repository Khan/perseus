import {KeypadContext} from "@khanacademy/keypad-context";
import type {KeypadConfiguration, PerseusItem} from "@khanacademy/perseus-core";
import {action} from "@storybook/addon-actions";
import * as React from "react";
import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import TestKeypadContextWrapper from "../__shared__/test-keypad-context-wrapper";
import expressionExport from "./expression";
import {expressionItem2, expressionItem3} from "./expression.testdata";

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
    answerless?: boolean;
};

const WrappedKeypadContext = ({
    item,
    customKeypad,
    isMobile = false,
    answerless = false,
}: WrappedKeypadContextProps) => {
    return (
        <TestKeypadContextWrapper>
            <KeypadContext.Consumer>
                {({keypadElement}) => {
                    return (
                        <ServerItemRendererWithDebugUI
                            item={item}
                            answerless={answerless}
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
    const keypadConfiguration: KeypadConfiguration = {
        keypadType: "EXPRESSION",
        extraKeys: ["x", "y", "z"],
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
                keypadConfiguration={keypadConfiguration}
                reviewMode={false}
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

export const AnswerlessExpression = (args: StoryArgs): React.ReactElement => {
    return (
        <WrappedKeypadContext
            item={expressionItem3}
            customKeypad={false}
            answerless
        />
    );
};

export default {
    title: "Perseus/Widgets/Expression",
    argTypes: {customKeypad: {control: "boolean"}},
} as Story;
