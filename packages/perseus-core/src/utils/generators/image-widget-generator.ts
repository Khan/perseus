import type {PerseusImageWidgetOptions, ImageWidget} from "../../data-schema";

export function generateImageOptions(
    options?: Partial<PerseusImageWidgetOptions>,
): PerseusImageWidgetOptions {
    const defaultImageOptions: PerseusImageWidgetOptions = {
        backgroundImage: {},
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
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        options: generateImageOptions({}), // default options
        ...imageWidgetProperties,
    };
}
