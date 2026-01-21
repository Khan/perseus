import type {
    PerseusImageWidgetOptions,
    PerseusWidgetOptions,
} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

export type ImageDefaultWidgetOptions = Pick<
    PerseusImageWidgetOptions,
    "title" | "range" | "box" | "backgroundImage" | "labels" | "alt" | "caption"
>;

const defaultWidgetOptions: ImageDefaultWidgetOptions = {
    title: "",
    range: [
        [0, 10],
        [0, 10],
    ],
    box: [400, 400],
    backgroundImage: {
        url: null,
        width: 0,
        height: 0,
    },
    labels: [],
    alt: "",
    caption: "",
};

const imageWidgetLogic: WidgetLogic = {
    name: "image",
    defaultWidgetOptions,
    // The float alignments will be set to inline-block floated left or right.
    // This will allow text to wrap around the widget and not have large space
    // on either side.
    supportedAlignments: ["block", "wrap-left", "wrap-right", "full-width"],
    defaultAlignment: "block",
    // This widget's accessibility depends on its widget option: if the image
    // has a background but no alt text, it is not accessible
    accessible: (widgetOptions: PerseusWidgetOptions): boolean => {
        const imageOptions = widgetOptions as PerseusImageWidgetOptions;
        const bgImage = imageOptions.backgroundImage;

        // Accessible if:
        // - has background image and alt text (non-empty)
        // - has background image and decorative is true
        const hasBackgroundImage = bgImage.url != null;
        const hasAltText = !!imageOptions.alt;
        const isDecorative = imageOptions.decorative === true;

        return hasBackgroundImage && (hasAltText || isDecorative);
    },
};

export default imageWidgetLogic;
