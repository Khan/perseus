import type {PerseusNumberLineWidgetOptions} from "../../data-schema";

type NumberLinePublicWidgetOptions = Pick<
    PerseusNumberLineWidgetOptions,
    | "range"
    | "labelRange"
    | "labelStyle"
    | "labelTicks"
    | "isTickCtrl"
    | "divisionRange"
    | "numDivisions"
    | "snapDivisions"
    | "tickStep"
    | "initialX"
    | "showTooltips"
    | "static"
>;

export default function getNumberLinePublicWidgetOptions(
    options: PerseusNumberLineWidgetOptions,
): NumberLinePublicWidgetOptions {
    const {correctX: _, correctRel: __, ...publicOptions} = options;
    return publicOptions;
}
