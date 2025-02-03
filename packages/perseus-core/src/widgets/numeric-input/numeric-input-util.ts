import type {PerseusNumericInputWidgetOptions} from "@khanacademy/perseus-core";

/**
 * For details on the individual options, see the
 * PerseusNumericInputWidgetOptions type
 */
type NumericInputPublicWidgetOptions = {
    labelText?: PerseusNumericInputWidgetOptions["labelText"];
    size: PerseusNumericInputWidgetOptions["size"];
    coefficient: PerseusNumericInputWidgetOptions["coefficient"];
    rightAlign?: PerseusNumericInputWidgetOptions["rightAlign"];
    static: PerseusNumericInputWidgetOptions["static"];
    answerForms?: PerseusNumericInputWidgetOptions["answerForms"];
};

/**
 * Given a PerseusNumericInputWidgetOptions object, return a new object with only
 * the public options that should be exposed to the client.
 */
function getNumericInputPublicWidgetOptions(
    options: PerseusNumericInputWidgetOptions,
): NumericInputPublicWidgetOptions {
    const {answers: _, ...publicWidgetOptions} = options;
    return publicWidgetOptions;
}

export default getNumericInputPublicWidgetOptions;
