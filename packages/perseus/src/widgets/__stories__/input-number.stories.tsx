import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {
    question1,
    question2,
    question3,
    // @ts-expect-error [FEI-5003] - TS2307 - Cannot find module '../__testdata__/input-number_testdata' or its corresponding type declarations.
} from "../__testdata__/input-number_testdata";

import type {
    PerseusRenderer,
    PerseusInputNumberWidgetOptions,
} from "../../perseus-types";

export default {
    title: "Perseus/Widgets/InputNumber",
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

export const Rational: React.FC<InputNumberOptions> = (
    args,
): React.ReactElement => {
    const question = updateWidgetOptions(question1, "input-number 1", args);
    return <RendererWithDebugUI question={question} />;
};
// @ts-expect-error [FEI-5003] - TS2339 - Property 'args' does not exist on type 'FC<PerseusInputNumberWidgetOptions>'.
Rational.args = question1.widgets["input-number 1"].options;

export const PiSimplify: React.FC<InputNumberOptions> = (
    args,
): React.ReactElement => {
    const question = updateWidgetOptions(question2, "input-number 1", args);
    return <RendererWithDebugUI question={question} />;
};
// @ts-expect-error [FEI-5003] - TS2339 - Property 'args' does not exist on type 'FC<PerseusInputNumberWidgetOptions>'.
PiSimplify.args = question2.widgets["input-number 1"].options;

export const Percent: React.FC<InputNumberOptions> = (
    args,
): React.ReactElement => {
    const question = updateWidgetOptions(question3, "input-number 1", args);
    return <RendererWithDebugUI question={question} />;
};
// @ts-expect-error [FEI-5003] - TS2339 - Property 'args' does not exist on type 'FC<PerseusInputNumberWidgetOptions>'.
Percent.args = question3.widgets["input-number 1"].options;
