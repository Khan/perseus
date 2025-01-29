import type {
    PerseusLabelImageMarker,
    PerseusLabelImageWidgetOptions,
} from "@khanacademy/perseus-core";

/**
 * For details on the individual options, see the
 * PerseusLabelImageWidgetOptions type
 */
type LabelImagePublicWidgetOptions = {
    choices: PerseusLabelImageWidgetOptions["choices"];
    imageUrl: PerseusLabelImageWidgetOptions["imageUrl"];
    imageAlt: PerseusLabelImageWidgetOptions["imageAlt"];
    imageHeight: PerseusLabelImageWidgetOptions["imageHeight"];
    imageWidth: PerseusLabelImageWidgetOptions["imageWidth"];
    markers: ReadonlyArray<LabelImageMarkerPublicData>;
    hideChoicesFromInstructions: boolean;
    multipleAnswers: boolean;
    static: boolean;
};

type LabelImageMarkerPublicData = Pick<
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
