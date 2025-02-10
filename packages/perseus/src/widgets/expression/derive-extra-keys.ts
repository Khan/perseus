import * as KAS from "@khanacademy/kas";
import {
    Keys as Key,
    KeyArray,
    KeypadConfiguration,
} from "@khanacademy/math-input";
import {PerseusExpressionWidgetOptions} from "@khanacademy/perseus-core";

/**
 * Scrape the answer forms for any variables or contants (like Pi)
 * that need to be included as keys on the keypad.
 */
function deriveExtraKeys(
    widgetOptions: PerseusExpressionWidgetOptions,
): KeypadConfiguration["extraKeys"] {
    // Extract any and all variables and constants from the answer forms.
    const uniqueExtraVariables: Partial<Record<Key, boolean>> = {};
    const uniqueExtraConstants: Partial<Record<Key, boolean>> = {};
    for (const answerForm of widgetOptions.answerForms) {
        const maybeExpr = KAS.parse(answerForm.value, widgetOptions);
        if (maybeExpr.parsed) {
            const expr = maybeExpr.expr;

            // The keypad expects Greek letters to be capitalized (e.g., it
            // requires `PI` instead of `pi`). Right now, it only supports Pi
            // and Theta, so we special-case.
            const isGreek = (symbol: any) =>
                symbol === "pi" || symbol === "theta";
            const toKey = (symbol: any) =>
                isGreek(symbol) ? symbol.toUpperCase() : symbol;
            const isKey = (key: string): key is Key =>
                KeyArray.includes(key as Key);

            for (const variable of expr.getVars()) {
                const maybeKey = toKey(variable);
                if (isKey(maybeKey)) {
                    uniqueExtraVariables[maybeKey] = true;
                }
            }
            for (const constant of expr.getConsts()) {
                const maybeKey = toKey(constant);
                if (isKey(maybeKey)) {
                    uniqueExtraConstants[maybeKey] = true;
                }
            }
        }
    }

    // TODO(charlie): Alert the keypad as to which of these symbols should be
    // treated as functions.
    const extraVariables = Object.keys(
        uniqueExtraVariables,
    ).sort() as ReadonlyArray<Key>;

    const extraConstants = Object.keys(
        uniqueExtraConstants,
    ).sort() as ReadonlyArray<Key>;

    let extraKeys = [...extraVariables, ...extraConstants];
    if (!extraKeys.length) {
        // If there are no extra symbols available, we include Pi anyway, so
        // that the "extra symbols" button doesn't appear empty.
        extraKeys = ["PI"];
    }

    return extraKeys;
}

export default deriveExtraKeys;
