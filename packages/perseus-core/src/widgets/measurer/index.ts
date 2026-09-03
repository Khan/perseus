import type {PerseusMeasurerWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusMeasurerWidgetOptions = {
    box: [480, 480],
    image: {},
    showProtractor: true,
    showRuler: false,
    rulerLabel: "",
    rulerTicks: 10,
    rulerPixels: 40,
    rulerLength: 10,
};

const measurerWidgetLogic: WidgetLogic = {
    name: "measurer",
    version: {major: 1, minor: 0},
    defaultWidgetOptions: defaultWidgetOptions,
    accessible: false,
};

export default measurerWidgetLogic;
