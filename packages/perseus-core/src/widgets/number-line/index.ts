import type {PerseusNumberLineWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type NumberLineDefaultWidgetOptions = Pick<
    PerseusNumberLineWidgetOptions,
    | "range"
    | "labelRange"
    | "labelStyle"
    | "labelTicks"
    | "divisionRange"
    | "numDivisions"
    | "snapDivisions"
    | "tickStep"
    | "correctRel"
    | "correctX"
    | "initialX"
    | "showTooltip"
>;

const defaultWidgetOptions: NumberLineDefaultWidgetOptions = {
    range: [0, 10],

    labelRange: [null, null],
    labelStyle: "decimal",
    labelTicks: true,

    divisionRange: [1, 12],
    numDivisions: 5,
    snapDivisions: 2,

    tickStep: null,
    correctRel: "eq",
    correctX: null,
    initialX: null,

    showTooltip: false,
};

const numberLineWidgetLogic: WidgetLogic = {
    name: "number-line",
    defaultWidgetOptions,
};

export default numberLineWidgetLogic;
