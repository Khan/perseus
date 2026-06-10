import type {PerseusInputNumberWidgetOptionsV0} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusInputNumberWidgetOptions type
 */
export type InputNumberPublicWidgetOptions = Pick<
    // FIXME: use v1 options
    PerseusInputNumberWidgetOptionsV0,
    "answerType" | "inexact" | "maxError" | "rightAlign" | "simplify" | "size"
>;

/**
 * Given a PerseusInputNumberWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
export function getInputNumberPublicWidgetOptions(
    // FIXME: use v1 options
    options: any,
): InputNumberPublicWidgetOptions {
    const {value: _, ...publicWidgetOptions} = options;
    return publicWidgetOptions;
}
