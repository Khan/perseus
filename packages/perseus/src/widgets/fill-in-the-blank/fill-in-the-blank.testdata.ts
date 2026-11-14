import {
    generateBlankOptions,
    generateBlankWidget,
    generateFillInTheBlankOptions,
    generateFillInTheBlankTile,
    generateFillInTheBlankWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

export const basicFillInTheBlankQuestion = generateTestPerseusRenderer({
    content: "[[☃ fill-in-the-blank 1]]",
    widgets: {
        "fill-in-the-blank 1": generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                content: "A [[☃ blank 1]] is a drum.\n\n(Correct: Djembe)",
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: generateBlankOptions({correctId: "djembe"}),
                    }),
                },
                tiles: [
                    generateFillInTheBlankTile({
                        id: "djembe",
                        content: "djembe",
                        label: "djembe",
                    }),
                    generateFillInTheBlankTile({
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
].map((drum) =>
    generateFillInTheBlankTile({id: drum, content: drum, label: drum}),
);

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
                    "in a marching band is a [[☃ blank 4]] drum.\n\n" +
                    "Correct: Bongo, Tambourine, Snare, Bass",
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

export const multiUseFillInTheBlankQuestion = generateTestPerseusRenderer({
    content: "[[☃ fill-in-the-blank 1]]",
    widgets: {
        "fill-in-the-blank 1": generateFillInTheBlankWidget({
            options: generateFillInTheBlankOptions({
                content:
                    "[[☃ blank 1]] + [[☃ blank 2]] + [[☃ blank 3]] + [[☃ blank 4]] = [[☃ blank 5]] + [[☃ blank 6]]",
                widgets: {
                    "blank 1": generateBlankWidget({
                        options: generateBlankOptions({correctId: "1"}),
                    }),
                    "blank 2": generateBlankWidget({
                        options: generateBlankOptions({correctId: "1"}),
                    }),
                    "blank 3": generateBlankWidget({
                        options: generateBlankOptions({correctId: "1"}),
                    }),
                    "blank 4": generateBlankWidget({
                        options: generateBlankOptions({correctId: "1"}),
                    }),
                    "blank 5": generateBlankWidget({
                        options: generateBlankOptions({correctId: "2"}),
                    }),
                    "blank 6": generateBlankWidget({
                        options: generateBlankOptions({correctId: "2"}),
                    }),
                },
                tiles: [
                    {
                        id: "1",
                        content: "1",
                        label: "1",
                        maxUses: 4,
                    },
                    {
                        id: "2",
                        content: "2",
                        label: "2",
                        maxUses: 2,
                    },
                ],
            }),
        }),
    },
});
