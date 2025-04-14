import type {PerseusItem} from "@khanacademy/perseus-core";

export default {
    question: {
        content: "[[☃ mock-widget 1]]",
        images: {},
        widgets: {
            "mock-widget 1": {
                type: "mock-widget",
                graded: true,
                options: {
                    value: "5",
                },
            },
        },
    },
    answerArea: null,
    hints: [] as ReadonlyArray<any>,
    itemDataVersion: {
        major: 1,
        minor: 0,
    },
} satisfies PerseusItem;
