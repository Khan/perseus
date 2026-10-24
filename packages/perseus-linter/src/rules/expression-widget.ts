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
export default Rule.makeWidgetRule({
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
