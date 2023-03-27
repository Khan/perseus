// @flow
import * as React from "react";

import {ItemRenderer} from "../../index.js";
import KeypadContext from "../../keypad-context.js";
import {expressionItem3} from "../__testdata__/expression_testdata.js";

import TestKeypadContextWrapper from "./test-keypad-context-wrapper.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Demos/On Screen Keypad",
}: Story);

export const CustomKeypad = (args: StoryArgs): React.Node => (
    <TestKeypadContextWrapper>
        <KeypadContext.Consumer>
            {({keypadElement, setRenderer, scrollableElement}) => (
                <>
                    <ItemRenderer
                        ref={setRenderer}
                        problemNum={0}
                        apiOptions={{
                            customKeypad: true,
                            onFocusChange: (
                                newFocusPath,
                                oldFocusPath,
                                keypadElement,
                                focusedElement,
                            ) => {},
                        }}
                        item={expressionItem3}
                        savedState={null}
                    />
                    <div id="workarea" />
                    <div id="hintsarea" />
                </>
            )}
        </KeypadContext.Consumer>
    </TestKeypadContextWrapper>
);
