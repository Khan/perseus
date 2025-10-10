import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {testDependenciesV2} from "../../../../../../testing/test-dependencies";
import {ApiOptions} from "../../../perseus-api";
import {ServerItemRenderer} from "../../../server-item-renderer";
import {numericInputQuestionBuilder} from "../numeric-input-question-builder";

import type {PerseusItem} from "@khanacademy/perseus-core";

/**
 * This is a visual regression story for the numeric input widget.
 */

export default {
    title: "Widgets/Numeric Input/Visual Regression Tests/Interactions",
    component: NumericInputQuestionRenderer,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the numeric input widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
};

export const Focus = {
    args: {
        item: generateTestPerseusItem({
            question: numericInputQuestionBuilder().withSize("normal").build(),
        }),
    },
    play: async ({canvas}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const inputToFocus = canvas.getByRole("textbox");
        inputToFocus.focus();
    },
};

export const With1Tooltip = {
    args: {
        item: generateTestPerseusItem({
            question: numericInputQuestionBuilder()
                .withSize("normal")
                .withAnswer({answerForms: ["integer"]})
                .build(),
        }),
    },
    play: async ({canvas}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const inputToFocus = canvas.getByRole("textbox");
        inputToFocus.focus();
    },
};

export const WithMultipleTooltips = {
    args: {
        item: generateTestPerseusItem({
            question: numericInputQuestionBuilder()
                .withSize("normal")
                .withAnswer({answerForms: ["integer", "decimal"]})
                .build(),
        }),
    },
    play: async ({canvas}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const inputToFocus = canvas.getByRole("textbox");
        inputToFocus.focus();
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
