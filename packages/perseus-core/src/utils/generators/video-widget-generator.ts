import type {PerseusVideoWidgetOptions, VideoWidget} from "../../data-schema";

export function generateVideoOptions(
    options?: Partial<PerseusVideoWidgetOptions>,
): PerseusVideoWidgetOptions {
    const defaultVideoOptions: PerseusVideoWidgetOptions = {
        location: "",
    };

    return {
        ...defaultVideoOptions,
        ...options,
    };
}

export function generateVideoWidget(
    videoWidgetProperties?: Partial<Omit<VideoWidget, "type">>,
): VideoWidget {
    return {
        type: "video",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateVideoOptions({}), // default options
        ...videoWidgetProperties,
    };
}
