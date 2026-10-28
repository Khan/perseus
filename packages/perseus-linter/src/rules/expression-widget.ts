import * as KAS from "@khanacademy/kas";

import Rule from "../rule";

function buttonNotInButtonSet(name: string, set: string): string {
    return `Answer requires a button not found in the button sets: ${name} (in ${set})`;
}

const stringToButtonSet = {
    "\\sqrt": "prealgebra",
    "^": "prealgebra",
    "\\sin": "trig",
    "\\cos": "trig",
    "\\tan": "trig",
    "\\log": "logarithms",
    "\\ln": "logarithms",
};

/**
 * Rule to make sure that Expression questions that require
 * a specific math symbol to answer have that math symbol
 * available in the keypad (desktop learners can use a keyboard,
 * but mobile learners must use the MathInput keypad)
 */
export const ExpressionWidgetButtons = Rule.makeWidgetRule({
    name: "expression-widget-buttons",
    widgetType: "expression",
    severity: Rule.Severity.WARNING,
    lint(widget) {
        const answers = widget.options.answerForms;
        const buttons: string[] = widget.options.buttonSets;
        for (const answer of answers) {
            for (const [str, set] of Object.entries(stringToButtonSet)) {
                if (answer.value.includes(str) && !buttons.includes(set)) {
                    return buttonNotInButtonSet(str, set);
                }
            }
        }
    },
});

/**
 * Checks that expression widgets have a correct answer.
 */
export const ExpressionWidgetCorrectAnswer = Rule.makeWidgetRule({
    name: "expression-widget-correct-answer",
    widgetType: "expression",
    severity: Rule.Severity.ERROR,
    lint(widget) {
        const {answerForms} = widget.options;

        if (answerForms.length === 0) {
            return "No answers specified.";
        }

        const hasCorrect = answerForms.some((form) => {
            return form.considered === "correct";
        });
        if (!hasCorrect) {
            return "No correct answer specified.";
        }
    },
});

/**
 * Checks that each of an expression widget's answers is a parseable
 * expression, and is simplified if the answer requires simplification.
 */
export const ExpressionWidgetAnswerForms = Rule.makeWidgetRule({
    name: "expression-widget-answer-forms",
    widgetType: "expression",
    severity: Rule.Severity.ERROR,
    lint(widget) {
        const {answerForms, functions} = widget.options;
        const issues: string[] = [];

        answerForms.forEach((form, ix) => {
            if (form.value === "") {
                issues.push(`Answer ${ix + 1} is empty.`);
                return;
            }
            const expression = KAS.parse(form.value, {functions});
            if (!expression.parsed) {
                issues.push(`Couldn't parse ${form.value}.`);
                return;
            }
            if (form.simplify && !expression.expr.isSimplified()) {
                issues.push(
                    `${form.value} isn't simplified, but is required to be.`,
                );
            }
        });

        return issues;
    },
});
