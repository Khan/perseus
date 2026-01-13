import type {PerseusInputNumberWidgetOptions} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusInputNumberWidgetOptions type
 */
export type InputNumberPublicWidgetOptions = Pick<
    PerseusInputNumberWidgetOptions,
    | "answerType"
    | "inexact"
    | "maxError"
    | "rightAlign"
    | "simplify"
    | "size"
    | "customKeypad"
>;

/**
 * Given a PerseusInputNumberWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getInputNumberPublicWidgetOptions(
    options: PerseusInputNumberWidgetOptions,
): InputNumberPublicWidgetOptions {
    const {value: _, ...publicWidgetOptions} = options;
    return publicWidgetOptions;
}

export default getInputNumberPublicWidgetOptions;
