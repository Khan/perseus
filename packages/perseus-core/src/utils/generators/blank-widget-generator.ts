import type {PerseusBlankWidgetOptions, BlankWidget} from "../../data-schema";

export function generateBlankOptions(
    options?: Partial<PerseusBlankWidgetOptions>,
): PerseusBlankWidgetOptions {
    const defaultImageOptions: PerseusBlankWidgetOptions = {
        displayType: "normal",
    };

    return {
        ...defaultImageOptions,
        ...options,
    };
}

export function generateBlankWidget(
    blankWidgetProperties?: Partial<Omit<BlankWidget, "type">>,
): BlankWidget {
    return {
        type: "blank",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        ...blankWidgetProperties,
        options: generateBlankOptions({...blankWidgetProperties?.options}),
    };
}
