// Mirrors `input-number.stories.tsx`, but renders every story with the
// `input-number-to-numeric-input` feature flag enabled — so we can verify the
// flag-on rendering side-by-side with the existing stories during the
// migration. This file should be deleted once the flag is removed and
// numeric-input is the only rendering path.
import {
    type PerseusRenderer,
    type PerseusInputNumberWidgetOptions,
    generateTestPerseusItem,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {getFeatureFlags} from "../../testing/feature-flags-util";
import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";
import {getAnswerfulItem, getAnswerlessItem} from "../../util/test-utils";

import {question1, question2, question3} from "./input-number.testdata";

import type {Meta} from "@storybook/react-vite";

const apiOptionsWithFlag = {
    flags: getFeatureFlags({"input-number-to-numeric-input": true}),
};

const meta: Meta = {
    title: "Widgets/Input Number (Numeric Input flag)",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Same content as the Input Number stories, but rendered with the \
                    `input-number-to-numeric-input` feature flag on. Use these to \
                    visually verify the migration path.",
            },
        },
    },
    argTypes: {
        maxError: {
            control: {
                type: "range",
                min: 0,
                max: 1,
                step: 0.1,
            },
        },
        inexact: {
            control: {type: "boolean"},
        },
        value: {
            control: {type: "number"},
        },
        simplify: {
            control: {
                type: "select",
                options: ["required", "optional", "enforced"],
            },
        },
        answerType: {
            control: {
                type: "select",
                options: [
                    "number",
                    "decimal",
                    "integer",
                    "rational",
                    "improper",
                    "mixed",
                    "percent",
                    "pi",
                ],
            },
        },
        size: {
            control: {type: "select", options: ["normal", "small"]},
        },
        rightAlign: {
            control: {type: "boolean"},
        },
    },
};
export default meta;

const updateWidgetOptions = (
    question: PerseusRenderer,
    widgetId: string,
    options: PerseusInputNumberWidgetOptions,
): PerseusRenderer => {
    const widget = question.widgets[widgetId];
    return {
        ...question,
        widgets: {
            [widgetId]: {
                ...widget,
                options: {
                    ...widget.options,
                    ...options,
                },
            },
        },
    };
};

export const Rational = (
    args: PerseusInputNumberWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(question1, "input-number 1", args);
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
            apiOptions={apiOptionsWithFlag}
        />
    );
};
Rational.args = question1.widgets["input-number 1"].options;

export const PiSimplify = (
    args: PerseusInputNumberWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(question2, "input-number 1", args);
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
            apiOptions={apiOptionsWithFlag}
        />
    );
};
PiSimplify.args = question2.widgets["input-number 1"].options;

export const Percent = (
    args: PerseusInputNumberWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(question3, "input-number 1", args);
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
            apiOptions={apiOptionsWithFlag}
        />
    );
};
Percent.args = question3.widgets["input-number 1"].options;

export const Answerful = (): React.ReactElement => {
    const item = getAnswerfulItem("input-number", {
        simplify: "optional",
        size: "normal",
        value: 42,
    });
    // TODO(LEMS-3083): Remove eslint suppression
    // eslint-disable-next-line
    item.question.content = `The answer is 42\n${item.question.content}`;
    return (
        <ServerItemRendererWithDebugUI
            item={item}
            apiOptions={apiOptionsWithFlag}
        />
    );
};

export const Answerless = (): React.ReactElement => {
    const item = getAnswerlessItem("input-number", {
        simplify: "optional",
        size: "normal",
        value: 42,
    });
    // TODO(LEMS-3083): Remove eslint suppression
    // eslint-disable-next-line
    item.question.content = `The answer is 42\n${item.question.content}`;
    return (
        <ServerItemRendererWithDebugUI
            item={item}
            apiOptions={apiOptionsWithFlag}
        />
    );
};
