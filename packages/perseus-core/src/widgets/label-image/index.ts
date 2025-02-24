import getLabelImagePublicWidgetOptions from "./label-image-util";

import type {PerseusLabelImageWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type LabelImageDefaultWidgetOptions = Pick<
    PerseusLabelImageWidgetOptions,
    | "choices"
    | "imageAlt"
    | "imageUrl"
    | "imageWidth"
    | "imageHeight"
    | "markers"
    | "multipleAnswers"
    | "hideChoicesFromInstructions"
>;

const defaultWidgetOptions: LabelImageDefaultWidgetOptions = {
    choices: [],
    imageAlt: "",
    imageUrl: "",
    imageWidth: 0,
    imageHeight: 0,
    markers: [],
    multipleAnswers: false,
    hideChoicesFromInstructions: false,
};

const labelImageWidgetLogic: WidgetLogic = {
    name: "label-image",
    defaultWidgetOptions,
    getPublicWidgetOptions: getLabelImagePublicWidgetOptions,
};

export default labelImageWidgetLogic;
