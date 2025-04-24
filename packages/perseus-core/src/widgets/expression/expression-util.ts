import type {PerseusExpressionWidgetOptions} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusExpressionWidgetOptions type
 */
export type ExpressionPublicWidgetOptions = {
    buttonSets: PerseusExpressionWidgetOptions["buttonSets"];
    functions: PerseusExpressionWidgetOptions["functions"];
    times: PerseusExpressionWidgetOptions["times"];
    visibleLabel?: PerseusExpressionWidgetOptions["visibleLabel"];
    ariaLabel?: PerseusExpressionWidgetOptions["ariaLabel"];
    buttonsVisible?: PerseusExpressionWidgetOptions["buttonsVisible"];
    extraKeys?: PerseusExpressionWidgetOptions["extraKeys"];
};

/**
 * Given a PerseusExpressionWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getExpressionPublicWidgetOptions(
    options: PerseusExpressionWidgetOptions,
): ExpressionPublicWidgetOptions {
    return {
        buttonSets: options.buttonSets,
        functions: options.functions,
        times: options.times,
        visibleLabel: options.visibleLabel,
        ariaLabel: options.ariaLabel,
        buttonsVisible: options.buttonsVisible,
        extraKeys: options.extraKeys,
    };
}

export default getExpressionPublicWidgetOptions;
