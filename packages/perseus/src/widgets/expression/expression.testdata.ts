import {
    generateExpressionAnswerForm,
    generateExpressionOptions,
    generateExpressionWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    type PerseusItem,
    type ExpressionWidget,
} from "@khanacademy/perseus-core";

const createExpressionItemJson = (
    expressionWidget: ExpressionWidget,
): PerseusItem =>
    generateTestPerseusItem({
        question: generateTestPerseusRenderer({
            content: "[[☃ expression 1]]",
            widgets: {"expression 1": expressionWidget},
        }),
    });

export const expressionItemWithAnswer = (answer: string): PerseusItem => {
    return createExpressionItemJson(
        generateExpressionWidget({
            options: generateExpressionOptions({
                answerForms: [
                    generateExpressionAnswerForm({
                        considered: "correct",
                        form: false,
                        simplify: false,
                        value: answer,
                    }),
                ],
                functions: [],
                buttonsVisible: "always",
                extraKeys: [],
            }),
        }),
    );
};

export const expressionItemWithLabels = createExpressionItemJson(
    generateExpressionWidget({
        options: generateExpressionOptions({
            functions: [],
            buttonsVisible: "always",
            ariaLabel: "Test aria label",
            visibleLabel: "Test visible label",
            extraKeys: [],
        }),
    }),
);

export const expressionItem2: PerseusItem = createExpressionItemJson(
    generateExpressionWidget({
        options: generateExpressionOptions({
            answerForms: [
                generateExpressionAnswerForm({
                    considered: "correct",
                    value: "123-x",
                }),
                generateExpressionAnswerForm({
                    considered: "correct",
                    value: "x-123",
                }),
            ],
            buttonsVisible: "always",
            extraKeys: ["x"],
        }),
    }),
);

export const expressionItem3: PerseusItem = createExpressionItemJson(
    generateExpressionWidget({
        options: generateExpressionOptions({
            answerForms: [
                generateExpressionAnswerForm({
                    considered: "ungraded",
                    value: "x+1",
                }),
                generateExpressionAnswerForm({
                    considered: "wrong",
                    value: "y+1",
                }),
                generateExpressionAnswerForm({
                    considered: "correct",
                    value: "z+1",
                }),
                generateExpressionAnswerForm({
                    considered: "correct",
                    value: "a+1",
                }),
            ],
            buttonsVisible: "focused",
            extraKeys: ["z", "a"],
        }),
    }),
);

export const expressionItem4: PerseusItem = createExpressionItemJson(
    generateExpressionWidget({
        options: generateExpressionOptions({
            answerForms: [
                generateExpressionAnswerForm({
                    considered: "correct",
                    value: "5/8",
                }),
            ],
            times: true,
            buttonSets: ["basic+div"],
            buttonsVisible: "always",
            extraKeys: ["x"],
        }),
    }),
);

export const expressionItem4Static: PerseusItem = createExpressionItemJson(
    generateExpressionWidget({
        static: true,
        options: generateExpressionOptions({
            answerForms: [
                generateExpressionAnswerForm({
                    considered: "correct",
                    value: "5/8",
                }),
            ],
            times: true,
            buttonSets: ["basic+div"],
            buttonsVisible: "always",
            extraKeys: ["x"],
        }),
    }),
);

export const expressionItemKitchenSink: PerseusItem = createExpressionItemJson(
    generateExpressionWidget({
        options: generateExpressionOptions({
            answerForms: [
                generateExpressionAnswerForm({
                    considered: "correct",
                    form: false,
                    simplify: false,
                    value: "8675309",
                }),
            ],
            buttonSets: ["basic", "trig", "prealgebra", "logarithms"],
            functions: ["f", "g", "h"],
            times: true,
            visibleLabel: "Expression Kitchen Sink",
            ariaLabel: "Expression Kitchen Sink",
            buttonsVisible: "always",
            extraKeys: ["x", "y", "z"],
        }),
    }),
);
