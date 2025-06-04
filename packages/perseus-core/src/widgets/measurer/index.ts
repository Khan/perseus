import type {PerseusMeasurerWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export const currentVersion = {major: 1, minor: 0};

export type MeasurerDefaultWidgetOptions = Pick<
    PerseusMeasurerWidgetOptions,
    | "box"
    | "image"
    | "showProtractor"
    | "showRuler"
    | "rulerLabel"
    | "rulerTicks"
    | "rulerPixels"
    | "rulerLength"
>;

export const defaultWidgetOptions: MeasurerDefaultWidgetOptions = {
    box: [480, 480],
    image: {} as any,
    showProtractor: true,
    showRuler: false,
    rulerLabel: "",
    rulerTicks: 10,
    rulerPixels: 40,
    rulerLength: 10,
};

const measurerWidgetLogic: WidgetLogic = {
    name: "measurer",
    version: currentVersion,
    defaultWidgetOptions: defaultWidgetOptions,
    accessible: false,
};

export default measurerWidgetLogic;
