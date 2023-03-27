// @flow
import * as React from "react";

import {ItemRendererWithDebugUI} from "../../../../../testing/item-renderer-with-debug-ui.jsx";
import KeypadContext from "../../keypad-context.js";
import {
    expressionItem2,
    expressionItem3,
} from "../__testdata__/expression_testdata.js";

import TestKeypadContext from "./test-keypad-context-wrapper.jsx";

import type {PerseusItem} from "../../perseus-types.js";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

type WrappedKeypadContextProps = {|
    item: PerseusItem,
|};

const WrappedKeypadContext = (props: WrappedKeypadContextProps) => {
    return (
        <TestKeypadContext>
            <KeypadContext.Consumer>
                {({keypadElement, setRenderer, scrollableElement}) => {
                    return (
                        <ItemRendererWithDebugUI
                            ref={setRenderer}
                            item={props.item}
                            apiOptions={{
                                customKeypad: true,
                                onFocusChange: (
                                    newFocusPath,
                                    oldFocusPath,
                                    keypadElement,
                                    focusedElement,
                                ) => {},
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
}: Story);

export const ExpressionItem2 = (args: StoryArgs): React.Node => {
    return <WrappedKeypadContext item={expressionItem2} />;
};

export const ExpressionItem3 = (args: StoryArgs): React.Node => {
    return <WrappedKeypadContext item={expressionItem3} />;
};
