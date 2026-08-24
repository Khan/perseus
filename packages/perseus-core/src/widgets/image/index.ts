import type {PerseusImageWidgetOptions} from "../../data-schema";
import type {WidgetLogic} from "../logic-export.types";

const defaultWidgetOptions: PerseusImageWidgetOptions = {
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
    scale: 1,
    labels: [],
    alt: "",
    caption: "",
    longDescription: "",
    // Marking an image decorative (rendering it with `alt=""` and no caption,
    // title, or long description) is an explicit author choice, so it starts
    // off. Note these defaults are inaccessible either way until a background
    // image is chosen -- see `accessible` below.
    decorative: false,
};

const imageWidgetLogic: WidgetLogic<PerseusImageWidgetOptions> = {
    name: "image",
    defaultWidgetOptions,
    // The float alignments will be set to inline-block floated left or right.
    // This will allow text to wrap around the widget and not have large space
    // on either side.
    supportedAlignments: ["block", "wrap-left", "wrap-right", "full-width"],
    defaultAlignment: "block",
    // This widget's accessibility depends on its widget option: if the image
    // has a background but no alt text, it is not accessible
    accessible: (widgetOptions: PerseusImageWidgetOptions): boolean => {
        const bgImage = widgetOptions.backgroundImage;

        // Accessible if:
        // - has background image and alt text (non-empty)
        // - has background image and decorative is true
        const hasBackgroundImage = bgImage.url != null;
        const hasAltText = !!widgetOptions.alt;
        const isDecorative = widgetOptions.decorative;

        return hasBackgroundImage && (hasAltText || isDecorative);
    },
};

export default imageWidgetLogic;
