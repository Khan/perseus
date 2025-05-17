import type {
    PerseusLabelImageMarker,
    PerseusLabelImageWidgetOptions,
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
