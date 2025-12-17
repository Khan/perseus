import type {
    PerseusLabelImageMarker,
    PerseusLabelImageWidgetOptions,
    PerseusWidgetOptions,
} from "../../data-schema";

/**
 * For details on the individual options, see the
 * PerseusLabelImageWidgetOptions type
 */
export type LabelImagePublicWidgetOptions = {
    choices: PerseusLabelImageWidgetOptions["choices"];
    imageUrl: PerseusLabelImageWidgetOptions["imageUrl"];
    imageAlt: PerseusLabelImageWidgetOptions["imageAlt"];
    imageHeight: PerseusLabelImageWidgetOptions["imageHeight"];
    imageWidth: PerseusLabelImageWidgetOptions["imageWidth"];
    markers: ReadonlyArray<LabelImageMarkerPublicData>;
    hideChoicesFromInstructions: PerseusLabelImageWidgetOptions["hideChoicesFromInstructions"];
    multipleAnswers: PerseusLabelImageWidgetOptions["multipleAnswers"];
    static: PerseusLabelImageWidgetOptions["static"];
};

export type LabelImageMarkerPublicData = Pick<
    PerseusLabelImageMarker,
    "x" | "y" | "label"
>;

export default function getLabelImagePublicWidgetOptions(
    options: PerseusLabelImageWidgetOptions,
): LabelImagePublicWidgetOptions {
    return {
        ...options,
        markers: options.markers.map(getLabelImageMarkerPublicData),
    };
}

function getLabelImageMarkerPublicData(
    marker: PerseusLabelImageMarker,
): LabelImageMarkerPublicData {
    const {answers: _, ...publicData} = marker;
    return publicData;
}

export function isLabelImageAccessible(options: PerseusWidgetOptions): boolean {
    const labelImageOptions = options as PerseusLabelImageWidgetOptions;

    // Label Images are inaccessible if the image url is not empty and the image alt is empty.
    if (
        labelImageOptions.imageUrl !== "" &&
        labelImageOptions.imageAlt === ""
    ) {
        return false;
    }

    // Label Images are inaccessible if there is a marker with an empty label.
    for (const marker of labelImageOptions.markers) {
        if (marker.label === "") {
            return false;
        }
    }

    return true;
}
