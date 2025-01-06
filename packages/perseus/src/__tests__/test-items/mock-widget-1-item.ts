import type {PerseusRenderer} from "@khanacademy/perseus-core";

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
    } as PerseusRenderer,
    answerArea: {
        calculator: false,
    },
    hints: [] as ReadonlyArray<any>,
};
