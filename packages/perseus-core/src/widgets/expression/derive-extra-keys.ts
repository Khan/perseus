import * as KAS from "@khanacademy/kas";

import {type KeypadKey, KeypadKeys} from "../../keypad";

import type {PerseusExpressionWidgetOptions} from "../../data-schema";

/**
 * Scrape the answer forms for any variables or contants (like Pi)
 * that need to be included as keys on the keypad.
 */
function deriveExtraKeys(
    widgetOptions: PerseusExpressionWidgetOptions,
): KeypadKey[] {
    if (widgetOptions.extraKeys) {
        return widgetOptions.extraKeys;
    }

    // If there are no extra symbols available, we include Pi anyway, so
    // that the "extra symbols" button doesn't appear empty.
    const defaultKeys: KeypadKey[] = ["PI"];

    if (widgetOptions.answerForms == null) {
        return defaultKeys;
    }

    // Extract any and all variables and constants from the answer forms.
    const uniqueExtraVariables: Partial<Record<KeypadKey, boolean>> = {};
    const uniqueExtraConstants: Partial<Record<KeypadKey, boolean>> = {};
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
            const isKey = (key: string): key is KeypadKey =>
                KeypadKeys.includes(key as KeypadKey);

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

    const extraVariables = Object.keys(
        uniqueExtraVariables,
    ).sort() as ReadonlyArray<KeypadKey>;

    const extraConstants = Object.keys(
        uniqueExtraConstants,
    ).sort() as ReadonlyArray<KeypadKey>;

    const extraKeys = [...extraVariables, ...extraConstants];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!extraKeys.length) {
        return defaultKeys;
    }

    return extraKeys;
}

export default deriveExtraKeys;
