import {
    generateNumericInputWidget,
    generateNumericInputOptions,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {testDependenciesV2} from "../../../../../../testing/test-dependencies";
import {ApiOptions} from "../../../perseus-api";
import {ServerItemRenderer} from "../../../server-item-renderer";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof NumericInputQuestionRenderer>;

/**
 * This is a visual regression story for the numeric input widget.
 */

export default {
    title: "Widgets/Numeric Input/Visual Regression Tests/Initial State",
    component: NumericInputQuestionRenderer,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the numeric input widget that do NOT need any interactions to test, which will be used with Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
};

export const SizeSmall: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content:
                    "Registry numbers for USS Enterprise: [[☃ numeric-input 1]]",
                widgets: {
                    "numeric-input 1": generateNumericInputWidget({
                        options: generateNumericInputOptions({
                            size: "small",
                        }),
                    }),
                },
            }),
        }),
    },
};

export const SizeNormal: Story = {
    args: {
        item: generateTestPerseusItem({
            question: generateTestPerseusRenderer({
                content:
                    "Registry numbers for USS Enterprise: [[☃ numeric-input 1]]",
                widgets: {
                    "numeric-input 1": generateNumericInputWidget({
                        options: generateNumericInputOptions({
                            size: "normal",
                        }),
                    }),
                },
            }),
        }),
    },
};

function NumericInputQuestionRenderer(props: {
    item: PerseusItem;
    rtl?: boolean;
}) {
    const {item, rtl} = props;
    const style = {margin: 20};

    return (
        <div dir={rtl ? "rtl" : "ltr"} style={style}>
            <ServerItemRenderer
                item={item}
                apiOptions={{
                    ...ApiOptions.defaults,
                }}
                dependencies={testDependenciesV2}
            />
        </div>
    );
}
