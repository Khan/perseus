import {
    generateTestPerseusRenderer,
    generateBlankOptions,
    generateBlankWidget,
} from "@khanacademy/perseus-core";

export const basicBlankQuestion = generateTestPerseusRenderer({
    content: "Hello my name is [[☃ blank 1]]",
    widgets: {
        "blank 1": generateBlankWidget(),
    },
});
export const superscriptQuestion = generateTestPerseusRenderer({
    content: "Hello my name is [[☃ blank 1]]",
    widgets: {
        "blank 1": generateBlankWidget({
            options: generateBlankOptions({
                displayType: "superscript",
            }),
        }),
    },
});
export const subscriptQuestion = generateTestPerseusRenderer({
    content: "Hello my name is [[☃ blank 1]]",
    widgets: {
        "blank 1": generateBlankWidget({
            options: generateBlankOptions({
                displayType: "subscript",
            }),
        }),
    },
});
