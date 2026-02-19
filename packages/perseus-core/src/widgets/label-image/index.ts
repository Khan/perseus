import getLabelImagePublicWidgetOptions, {
    isLabelImageAccessible,
} from "./label-image-util";

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

function initializeWidgetOptions(): LabelImageDefaultWidgetOptions {
    return {
        choices: [],
        imageAlt: "",
        imageUrl: "",
        imageWidth: 0,
        imageHeight: 0,
        markers: [],
        multipleAnswers: false,
        hideChoicesFromInstructions: false,
    };
}

const labelImageWidgetLogic: WidgetLogic<LabelImageDefaultWidgetOptions> = {
    name: "label-image",
    initializeWidgetOptions,
    getPublicWidgetOptions: getLabelImagePublicWidgetOptions,
    // Function determining if a label image is accessible.
    // Label Images is inaccessible if it does not have alt text for the image.
    accessible: isLabelImageAccessible,
};

export default labelImageWidgetLogic;
