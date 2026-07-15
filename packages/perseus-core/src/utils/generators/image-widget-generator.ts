import type {ImageWidget, PerseusImageWidgetOptions} from "../../data-schema";

export function generateImageOptions(
    options?: Partial<PerseusImageWidgetOptions>,
): PerseusImageWidgetOptions {
    const defaultImageOptions: PerseusImageWidgetOptions = {
        title: "",
        caption: "",
        alt: "",
        longDescription: "",
        decorative: false,
        backgroundImage: {},
        scale: 1,
        box: [400, 400],
        labels: [],
        range: [
            [0, 10],
            [0, 10],
        ],
    };

    return {
        ...defaultImageOptions,
        ...options,
    };
}

export function generateImageWidget(
    imageWidgetProperties?: Partial<Omit<ImageWidget, "type">>,
): ImageWidget {
    return {
        type: "image",
        graded: false,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateImageOptions({}), // default options
        ...imageWidgetProperties,
    };
}
