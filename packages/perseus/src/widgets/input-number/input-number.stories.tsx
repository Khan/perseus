import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {
    question1,
    question2,
    question3,
} from "./input-number.testdata";

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

export const Rational = (args: InputNumberOptions): React.ReactElement => {
    const question = updateWidgetOptions(question1, "input-number 1", args);
    return <RendererWithDebugUI question={question} />;
};
Rational.args = question1.widgets["input-number 1"].options;

export const PiSimplify = (args: InputNumberOptions): React.ReactElement => {
    const question = updateWidgetOptions(question2, "input-number 1", args);
    return <RendererWithDebugUI question={question} />;
};
PiSimplify.args = question2.widgets["input-number 1"].options;

export const Percent = (args: InputNumberOptions): React.ReactElement => {
    const question = updateWidgetOptions(question3, "input-number 1", args);
    return <RendererWithDebugUI question={question} />;
};
Percent.args = question3.widgets["input-number 1"].options;
