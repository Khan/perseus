import {getNumericInputPublicWidgetOptions, NumericInputPublicWidgetOptions} from "../numeric-input/numeric-input-util";

/**
 * For details on the individual options, see the
 * PerseusInputNumberWidgetOptions type
 */
export type InputNumberPublicWidgetOptions = NumericInputPublicWidgetOptions;

/**
 * Given a PerseusInputNumberWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
export const getInputNumberPublicWidgetOptions = getNumericInputPublicWidgetOptions
