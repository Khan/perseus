import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {testDependenciesV2} from "../../../../../../testing/test-dependencies";
import {ApiOptions} from "../../../perseus-api";
import {ServerItemRenderer} from "../../../server-item-renderer";
import {NumericInput} from "../numeric-input.class";
import {defaultQuestion} from "../numeric-input.testdata";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {StoryObj} from "@storybook/react-vite";

type Story = StoryObj<typeof NumericInputQuestionRenderer>;

/**
 * This is a visual regression story for the radio widget.
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

export const Basic: Story = {
    args: {
        item: generateTestPerseusItem({
            question: defaultQuestion,
        }),
    },
};

function NumericInputQuestionRenderer(props: {
    item: PerseusItem;
    rtl?: boolean;
}) {
    const {item, rtl} = props;

    return (
        <div dir={rtl ? "rtl" : "ltr"}>
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
