import {
    getLabelImagePublicWidgetOptions,
    isLabelImageAccessible,
} from "./label-image-util";

import type {LabelImagePublicWidgetOptions} from "./label-image-util";
import type {PerseusLabelImageWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusLabelImageWidgetOptions = {
    choices: [],
    imageAlt: "",
    imageUrl: "",
    imageWidth: 0,
    imageHeight: 0,
    markers: [],
    multipleAnswers: false,
    hideChoicesFromInstructions: false,
};

const labelImageWidgetLogic: WidgetLogic<
    PerseusLabelImageWidgetOptions,
    LabelImagePublicWidgetOptions
> = {
    name: "label-image",
    defaultWidgetOptions,
    getPublicWidgetOptions: getLabelImagePublicWidgetOptions,
    // Function determining if a label image is accessible.
    // Label Images is inaccessible if it does not have alt text for the image.
    accessible: isLabelImageAccessible,
};

export default labelImageWidgetLogic;
