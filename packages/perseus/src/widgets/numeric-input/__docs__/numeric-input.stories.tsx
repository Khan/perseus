import {
    generateTestPerseusItem,
    type PerseusNumericInputWidgetOptions,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {NumericInput} from "../numeric-input.class";
import {
    decimalProblem,
    defaultQuestion,
    improperProblem,
    integerProblem,
    mixedProblem,
    piProblem,
    properProblem,
    withCoefficient,
} from "../numeric-input.testdata";

import type {Meta} from "@storybook/react-vite";

// We're using this format as storybook was not able to infer the type of the options.
// It also gives us a lovely hover view of the JSON structure.
const answerFormsArray: string = `[
    {
        simplify: string;
        name: string;
    }
]`;

const answersArray: string = `[
    {
        message: string;
        value: number;
        status: string;
        answerForms: array<string>;
        strict: boolean;
        maxError: number;
        simplify: string;
    }
]`;

const meta: Meta<typeof NumericInput> = {
    component: NumericInput,
    title: "Widgets/Numeric Input",
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to input numeric answers with specific validation criteria,\
                    supporting various formats including fractions, decimals, and mathematical expressions.",
            },
        },
    },
    args: {
        coefficient: false,
        userInput: {currentValue: ""},
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
                // We're including all the answer forms to make it easier to edit in storybook.
                // Note: that setting all of the answer forms results in the example tooltip being hidden,
                // which mimics our default behaviour for the widget.
                answerForms: [
                    "decimal",
                    "integer",
                    "mixed",
                    "pi",
                    "proper",
                    "improper",
                ],
            },
        ],
    },
    argTypes: {
        answers: {
            control: {type: "object"},
            description:
                "A list of all the possible correct and incorrect answers",
            table: {
                type: {
                    summary: "array",
                    detail: answersArray,
                },
            },
        },
        answerForms: {
            control: {type: "object"},
            description:
                "Used by examples, maybe not used and should be removed in the future",
            table: {
                type: {
                    summary: "array",
                    detail: answerFormsArray,
                },
            },
        },
        userInput: {
            currentValue: {
                control: {type: "text"},
                description: "The current value of the input field",
                table: {
                    type: {summary: "string"},
                },
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
    const question = updateWidgetOptions(
        defaultQuestion,
        "numeric-input 1",
        args,
    );
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
        />
    );
};
Default.args = defaultQuestion.widgets["numeric-input 1"].options;
Default.parameters = {
    docs: {
        description: {
            story: "The default Numeric Input widget.",
        },
    },
};

export const IntegerExample = (
    args: PerseusNumericInputWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(
        integerProblem,
        "numeric-input 1",
        args,
    );
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
        />
    );
};
IntegerExample.args = integerProblem.widgets["numeric-input 1"].options;
IntegerExample.parameters = {
    docs: {
        description: {
            story: "Numeric Input set to strictly integer mode will only accept integer answers.",
        },
    },
};

export const DecimalExample = (
    args: PerseusNumericInputWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(
        decimalProblem,
        "numeric-input 1",
        args,
    );
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
        />
    );
};
DecimalExample.args = decimalProblem.widgets["numeric-input 1"].options;
DecimalExample.parameters = {
    docs: {
        description: {
            story: "Numeric Inputs set to strictly decimal mode will only accept decimal answers.",
        },
    },
};

export const ImproperExample = (
    args: PerseusNumericInputWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(
        improperProblem,
        "numeric-input 1",
        args,
    );
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
        />
    );
};
ImproperExample.args = improperProblem.widgets["numeric-input 1"].options;
ImproperExample.parameters = {
    docs: {
        description: {
            story: "Numeric Inputs set to strictly improper mode will only accept improper fractions.",
        },
    },
};

export const ProperExample = (
    args: PerseusNumericInputWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(
        properProblem,
        "numeric-input 1",
        args,
    );
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
        />
    );
};
ProperExample.args = properProblem.widgets["numeric-input 1"].options;
ProperExample.parameters = {
    docs: {
        description: {
            story: "Numeric Inputs set to strictly proper mode will only accept proper fractions. This example does not require simplifying.",
        },
    },
};

export const MixedExample = (
    args: PerseusNumericInputWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(mixedProblem, "numeric-input 1", args);
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
        />
    );
};
MixedExample.args = mixedProblem.widgets["numeric-input 1"].options;
MixedExample.parameters = {
    docs: {
        description: {
            story: "Numeric Inputs set to strictly mixed mode will only accept mixed fractions.",
        },
    },
};

export const PiExample = (
    args: PerseusNumericInputWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(piProblem, "numeric-input 1", args);
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
        />
    );
};
PiExample.args = piProblem.widgets["numeric-input 1"].options;
PiExample.parameters = {
    docs: {
        description: {
            story: "Numeric Inputs set to strictly pi mode will only accept answers in terms of π. Approximating pi will result in an incorrect answer and a hint.",
        },
    },
};

export const CoefficientExample = (
    args: PerseusNumericInputWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(
        withCoefficient,
        "numeric-input 1",
        args,
    );
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question})}
        />
    );
};
CoefficientExample.args = withCoefficient.widgets["numeric-input 1"].options;
CoefficientExample.parameters = {
    docs: {
        description: {
            story: "When Numeric Input is set to coefficient mode, it allows the student to use - for -1 and an empty string to mean 1.",
        },
    },
};

export const Answerless = (
    args: PerseusNumericInputWidgetOptions,
): React.ReactElement => {
    const question = updateWidgetOptions(
        defaultQuestion,
        "numeric-input 1",
        args,
    );
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question,
            })}
            startAnswerless={true}
        />
    );
};
Answerless.args = defaultQuestion.widgets["numeric-input 1"].options;
Answerless.parameters = {
    docs: {
        description: {
            story: "The answerless Numeric Input widget.",
        },
    },
};
