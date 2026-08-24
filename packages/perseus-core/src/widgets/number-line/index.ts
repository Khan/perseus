import {getNumberLinePublicWidgetOptions} from "./number-line-util";

import type {NumberLinePublicWidgetOptions} from "./number-line-util";
import type {PerseusNumberLineWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusNumberLineWidgetOptions = {
    range: [0, 10],

    labelRange: [null, null],
    labelStyle: "decimal",
    labelTicks: true,
    // The tick controller is opt-in: by default the content creator fixes the number of
    // divisions rather than letting the learner change it.
    isTickCtrl: false,
    // Derived from `correctRel` by the editor (`isInequality: correctRel !==
    // "eq"`), so this must stay in sync with the `correctRel: "eq"` default.
    isInequality: false,

    divisionRange: [1, 12],
    numDivisions: 5,
    snapDivisions: 2,

    tickStep: null,
    correctRel: "eq",
    correctX: null,
    initialX: null,

    showTooltips: false,
};

const numberLineWidgetLogic: WidgetLogic<
    PerseusNumberLineWidgetOptions,
    NumberLinePublicWidgetOptions
> = {
    name: "number-line",
    defaultWidgetOptions,
    getPublicWidgetOptions: getNumberLinePublicWidgetOptions,
    accessible: false,
};

export default numberLineWidgetLogic;
