import expressionWidgetLogic from "../../widgets/expression";

import type {
    PerseusExpressionWidgetOptions,
    ExpressionWidget,
    PerseusExpressionAnswerForm,
} from "../../data-schema";

export function generateExpressionOptions(
    options?: Partial<PerseusExpressionWidgetOptions>,
): PerseusExpressionWidgetOptions {
    return {
        ...expressionWidgetLogic.defaultWidgetOptions,
        ...options,
    };
}

export function generateExpressionAnswerForm(
    answerFormOptions?: Partial<PerseusExpressionAnswerForm>,
): PerseusExpressionAnswerForm {
    return {
        value: "",
        form: false,
        simplify: false,
        considered: "wrong",
        ...answerFormOptions,
    };
}

export function generateExpressionWidget(
    expressionWidgetProperties?: Partial<Omit<ExpressionWidget, "type">>,
): ExpressionWidget {
    return {
        type: "expression",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateExpressionOptions(),
        ...expressionWidgetProperties,
    };
}
