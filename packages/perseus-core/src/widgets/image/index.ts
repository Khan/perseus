import type {PerseusImageWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type ImageDefaultWidgetOptions = Pick<
    PerseusImageWidgetOptions,
    "title" | "range" | "box" | "backgroundImage" | "labels" | "alt" | "caption"
>;

const defaultBoxSize = 400;
const defaultRange = [0, 10] as any;

const defaultWidgetOptions: ImageDefaultWidgetOptions = {
    title: "",
    range: [defaultRange, defaultRange],
    box: [defaultBoxSize, defaultBoxSize],
    backgroundImage: {
        url: null,
        width: 0,
        height: 0,
    },
    labels: [],
    alt: "",
    caption: "",
};

const ImageWidgetLogic: WidgetLogic = {
    name: "Image",
    defaultWidgetOptions,
};

export default ImageWidgetLogic;
