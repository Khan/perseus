import getLabelImagePublicWidgetOptions from "./label-image-util";

import type {
    PerseusLabelImageWidgetOptions,
    PerseusWidgetOptions,
} from "../../data-schema";
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
    // Function determining if a label image is accessible.
    // Label Images is inaccessible if it does not have alt text for the image.
    accessible: (widgetOptions: PerseusWidgetOptions): boolean => {
        const labelImageOptions =
            widgetOptions as PerseusLabelImageWidgetOptions;

        if (
            labelImageOptions.imageUrl !== "" &&
            labelImageOptions.imageAlt === ""
        ) {
            return false;
        }

        return true;
    },
};

export default labelImageWidgetLogic;
