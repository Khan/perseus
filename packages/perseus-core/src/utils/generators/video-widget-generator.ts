import type {VideoWidget} from "../../data-schema";

export function generateVideoWidget(
    videoWidgetProperties?: Partial<Omit<VideoWidget, "type">>,
): VideoWidget {
    return {
        type: "video",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        // video widget only has one option: location
        options: {location: ""}, // default options
        ...videoWidgetProperties,
    };
}
