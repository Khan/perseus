import {
    generateTestPerseusRenderer,
    generateBlankOptions,
    generateBlankWidget,
} from "@khanacademy/perseus-core";

export const question1 = generateTestPerseusRenderer({
    content: "Hello my name is [[☃ blank 1]]",
    widgets: {
        "blank 1": generateBlankWidget({
            options: generateBlankOptions({
                correct: "answer-tile-1",
            }),
        }),
    },
});
