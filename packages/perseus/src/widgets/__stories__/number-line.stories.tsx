// @ts-expect-error it can't find type declaration
// eslint-disable-next-line monorepo/no-internal-import
import {KeypadContext} from "@khanacademy/keypad-context";
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {question1, question2} from "../__testdata__/number-line.testdata";

import TestKeypadContextWrapper from "./test-keypad-context-wrapper";

import type {PerseusItem} from "../../perseus-types";

export default {
    title: "Perseus/Widgets/Number Line",
};

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};

export const ShowTickController = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question2} />;
};

export const ShowTickControllerMobile = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <TestKeypadContextWrapper>
            <KeypadContext.Consumer>
                {({keypadElement}) => {
                    return (
                        <ServerItemRendererWithDebugUI
                            item={
                                {
                                    question: question2,
                                    _multi: null,
                                    answer: null,
                                    answerArea: null,
                                    itemDataVersion: {
                                        major: 0,
                                        minor: 1,
                                    },
                                    hints: [],
                                } as PerseusItem
                            }
                            apiOptions={{
                                isMobile: true,
                                customKeypad: true,
                            }}
                            keypadElement={keypadElement}
                        />
                    );
                }}
            </KeypadContext.Consumer>
        </TestKeypadContextWrapper>
    );
};

export const Question2 = (args: StoryArgs): React.ReactElement => {
    return (
        <RendererWithDebugUI
            apiOptions={{isMobile: true, customKeypad: true}}
            question={question2}
        />
    );
};
