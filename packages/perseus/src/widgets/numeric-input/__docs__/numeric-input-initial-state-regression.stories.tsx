import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {testDependenciesV2} from "../../../../../../testing/test-dependencies";
import {ApiOptions} from "../../../perseus-api";
import {ServerItemRenderer} from "../../../server-item-renderer";
import {numericInputQuestionBuilder} from "../numeric-input-question-builder";

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

export const Narrow: Story = {
    args: {
        item: generateTestPerseusItem({
            question: numericInputQuestionBuilder().withSize("small").build(),
        }),
    },
};

export const Wide: Story = {
    args: {
        item: generateTestPerseusItem({
            question: numericInputQuestionBuilder().withSize("normal").build(),
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
