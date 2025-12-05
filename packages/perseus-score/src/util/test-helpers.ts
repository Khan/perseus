import {
    generateExpressionAnswerForm,
    generateExpressionOptions,
    generateExpressionWidget,
    type DropdownWidget,
    type ExpressionWidget,
} from "@khanacademy/perseus-core";

export function getTestDropdownWidget(): DropdownWidget {
    return {
        type: "dropdown",
        options: {
            choices: [
                {
                    content: "Test choice 1",
                    correct: true,
                },
                {
                    content: "Test choice 2",
                    correct: false,
                },
            ],
            placeholder: "Test placeholder",
            static: false,
        },
    };
}

export function getExpressionWidget(): ExpressionWidget {
    return generateExpressionWidget({
        options: generateExpressionOptions({
            answerForms: [
                generateExpressionAnswerForm({
                    value: "2+2",
                    considered: "correct",
                }),
            ],
            functions: [],
        }),
    });
}

export function getLegacyExpressionWidget() {
    return {
        type: "expression",
        options: {
            times: false,
            buttonSets: ["basic"],
            functions: [],
            form: false,
            simplify: false,
            value: "2+2",
        },
    };
}
