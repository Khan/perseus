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

const drumTiles = [
    "bongo",
    "acoustic",
    "snare",
    "tambourine",
    "bass",
    "steel",
].map((drum) => generateAnswerTile({id: drum, content: drum, label: drum}));

export const paragraphFillInTheBlankQuestion = generateTestPerseusRenderer({
    content: "[[☃ fill-in-the-blank 1]]",
    widgets: {
        "fill-in-the-blank 1": generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                content:
                    "There are several different types of drums. The " +
                    "[[☃ blank 1]] drum is a long-bodied drum typically held " +
                    "between the knees and played with the fingers. A drum " +
                    "with small metal disks around the edge played by being " +
                    "shaken is a [[☃ blank 2]]. Many years ago, a " +
                    "[[☃ blank 3]] drum was used to announce an army's " +
                    "arrival onto a battlefield. Finally, the biggest drum " +
                    "in a marching band is a [[☃ blank 4]] drum.",
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: generateBlankOptions({correctId: "bongo"}),
                    }),
                    "blank 2": generateBlankWidget({
                        options: generateBlankOptions({
                            correctId: "tambourine",
                        }),
                    }),
                    "blank 3": generateBlankWidget({
                        options: generateBlankOptions({correctId: "snare"}),
                    }),
                    "blank 4": generateBlankWidget({
                        options: generateBlankOptions({correctId: "bass"}),
                    }),
                },
                tiles: drumTiles,
            }),
        }),
    },
});
