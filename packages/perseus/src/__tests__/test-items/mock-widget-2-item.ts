import type {PerseusItem} from "@khanacademy/perseus-core";

export default {
    question: {
        content: "[[☃ mock-widget 1]] [[☃ mock-widget 2]]",
        images: {},
        widgets: {
            "mock-widget 1": {
                type: "mock-widget",
                graded: true,
                options: {
                    value: "5",
                },
            },
            "mock-widget 2": {
                type: "mock-widget",
                graded: true,
                options: {
                    value: "6",
                },
            },
        },
    },
    answerArea: null,
    hints: [],
} satisfies PerseusItem;
