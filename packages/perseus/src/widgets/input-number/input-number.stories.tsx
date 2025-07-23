import {
    type PerseusRenderer,
    type PerseusInputNumberWidgetOptions,
    generateTestPerseusItem,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {getAnswerfulItem} from "../../util/test-utils";

import {question1, question2, question3} from "./input-number.testdata";

import type {Meta} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/InputNumber",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        componentSubtitle:
            "A widget that allows users to input numerical values with specific validation rules,\
            supporting basic mathematical responses.",
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

type Question = PerseusRenderer;
type InputNumberOptions = PerseusInputNumberWidgetOptions;

const updateWidgetOptions = (
    question: Question,
    widgetId: string,
    options: InputNumberOptions,
): Question => {
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

export const Rational = (args: InputNumberOptions): React.ReactElement => {
    const question = updateWidgetOptions(question1, "input-number 1", args);
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
        />
    );
};
Rational.args = question1.widgets["input-number 1"].options;

export const PiSimplify = (args: InputNumberOptions): React.ReactElement => {
    const question = updateWidgetOptions(question2, "input-number 1", args);
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
        />
    );
};
PiSimplify.args = question2.widgets["input-number 1"].options;

export const Percent = (args: InputNumberOptions): React.ReactElement => {
    const question = updateWidgetOptions(question3, "input-number 1", args);
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
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
    return <ServerItemRendererWithDebugUI item={item} />;
};

export const Answerless = (): React.ReactElement => {
    const item = getAnswerfulItem("input-number", {
        simplify: "optional",
        size: "normal",
        value: 42,
    });
    // TODO(LEMS-3083): Remove eslint suppression
    // eslint-disable-next-line
    item.question.content = `The answer is 42\n${item.question.content}`;
    return <ServerItemRendererWithDebugUI item={item} startAnswerless />;
};
