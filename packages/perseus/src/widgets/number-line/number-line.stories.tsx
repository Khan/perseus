import {KeypadContext} from "@khanacademy/keypad-context";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {generateTestPerseusItem} from "../../util/test-utils";
import TestKeypadContextWrapper from "../__shared__/test-keypad-context-wrapper";

import {question1, question2} from "./number-line.testdata";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Widgets/Number Line",
    component: ServerItemRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Question1: Story = {
    args: {
        item: generateTestPerseusItem({question: question1}),
    },
};

export const ShowTickController: Story = {
    args: {
        item: generateTestPerseusItem({question: question2}),
    },
};

export const ShowTickControllerMobile = (): React.ReactNode => {
    return (
        <TestKeypadContextWrapper>
            <KeypadContext.Consumer>
                {({keypadElement}) => {
                    return (
                        <ServerItemRendererWithDebugUI
                            item={generateTestPerseusItem({
                                question: question2,
                            })}
                            apiOptions={{
                                isMobile: true,
                            }}
                            keypadElement={keypadElement}
                        />
                    );
                }}
            </KeypadContext.Consumer>
        </TestKeypadContextWrapper>
    );
};

export const Question2: Story = {
    args: {
        item: generateTestPerseusItem({question: question2}),
    },
};
