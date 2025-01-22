import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {NumericInput} from "./numeric-input.class";
import {decimalProblem, question1} from "./numeric-input.testdata";

import type {
    PerseusNumericInputWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react";

const meta: Meta<typeof NumericInput> = {
    component: NumericInput,
    title: "Perseus/Widgets/Numeric Input",
    args: {
        coefficient: false,
        currentValue: "",
        rightAlign: false,
        size: "normal",
        answers: [
            {
                status: "correct",
                maxError: null,
                strict: false,
                value: 1252,
                simplify: "required",
                message: "",
            },
        ],
        labelText: "What's the answer?",
        answerForms: [],
    },
    argTypes: {
        answers: {
            control: {type: "object"},
            description:
                "A list of all the possible correct and incorrect answers",
            type: {
                name: "array",
                value: {
                    name: "object",
                    value: {
                        message: {name: "string", required: true},
                        value: {name: "number"},
                        status: {name: "string", required: true},
                        answerForms: {
                            name: "array",
                            value: {name: "string"},
                        },
                        strict: {name: "boolean", required: true},
                        maxError: {name: "number"},
                        simplify: {name: "string"},
                    },
                },
            },
        },
        answerForms: {
            control: {type: "object"},
            description:
                "Used by examples, maybe not used and should be removed in the future",
            type: {
                name: "array",
                value: {
                    name: "object",
                    value: {
                        simplify: {name: "string"},
                        name: {name: "string"},
                    },
                },
            },
        },
        currentValue: {
            control: {type: "text"},
            description: "The current value of the input field",
            table: {
                type: {summary: "string"},
            },
        },
        coefficient: {
            control: {type: "boolean"},
            description:
                "A coefficient style number allows the student to use - for -1 and an empty string to mean 1.",
            table: {
                type: {summary: "boolean"},
            },
        },
        labelText: {
            control: {type: "text"},
            description:
                " Translatable Text; Text to describe this input. This will be shown to users using screenreaders.",
            value: "What's the answer?",
            table: {
                type: {summary: "string"},
            },
        },
        rightAlign: {
            control: {type: "boolean"},
            description: "Whether to right-align the text or not",
            table: {
                type: {summary: "boolean"},
            },
        },
        size: {
            options: ["normal", "small"],
            control: {type: "radio"},
            defaultValue: "normal",
            description:
                "Use size 'Normal' for all text boxes, unless there are multiple text boxes in one line and the answer area is too narrow to fit them.",
            table: {
                type: {summary: "string"},
                defaultValue: {summary: "normal"},
            },
        },
        static: {
            control: {type: "boolean"},
            description: "Always false.  Not used for this widget",
            table: {
                type: {summary: "boolean"},
            },
        },
        // ApiOptions and linterContext are large objects and not particularly applicable to this story,
        // so we're hiding them from view to simplify the UI.
        apiOptions: {
            table: {
                disable: true,
            },
        },
        linterContext: {
            table: {
                disable: true,
            },
        },
    },
};

export default meta;

const updateWidgetOptions = (
    question: PerseusRenderer,
    widgetId: string,
    options: PerseusNumericInputWidgetOptions,
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

export const Default = (
    args: PerseusNumericInputWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(question1, "numeric-input 1", args);
    return <RendererWithDebugUI question={question} />;
};
Default.args = question1.widgets["numeric-input 1"].options;

export const WithExample = (
    args: PerseusNumericInputWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(
        decimalProblem,
        "numeric-input 1",
        args,
    );
    return <RendererWithDebugUI question={question} />;
};
WithExample.args = decimalProblem.widgets["numeric-input 1"].options;
