import type {PerseusNumberLineWidgetOptions} from "../../data-schema";

export type NumberLinePublicWidgetOptions = Pick<
    PerseusNumberLineWidgetOptions,
    | "range"
    | "labelRange"
    | "labelStyle"
    | "labelTicks"
    | "isTickCtrl"
    | "isInequality"
    | "divisionRange"
    | "numDivisions"
    | "snapDivisions"
    | "tickStep"
    | "initialX"
    | "showTooltips"
>;

export function getNumberLinePublicWidgetOptions(
    options: PerseusNumberLineWidgetOptions,
): NumberLinePublicWidgetOptions {
    const {correctX, correctRel, ...publicOptions} = options;
    return publicOptions;
}
