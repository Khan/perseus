import {
    generateAnswerTile,
    generateBlankOptions,
    generateBlankWidget,
    generateFillInTheBlankOptions,
    generateFillInTheBlankWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

export const basicFillInTheBlankQuestion = generateTestPerseusRenderer({
    content: "[[☃ fill-in-the-blank 1]]",
    widgets: {
        "fill-in-the-blank 1": generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                content: "A [[☃ blank 1]] is a drum.",
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: generateBlankOptions({correctId: "djembe"}),
                    }),
                },
                tiles: [
                    generateAnswerTile({
                        id: "djembe",
                        content: "djembe",
                        label: "djembe",
                    }),
                    generateAnswerTile({
                        id: "kora",
                        content: "kora",
                        label: "kora",
                    }),
                ],
            }),
        }),
    },
});
