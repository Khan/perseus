import type {PerseusRenderer} from "@khanacademy/perseus-core";

export default {
    // eslint-disable-next-line no-restricted-syntax
    question: {
        content: "[[☃ table 1]]",
        images: {},
        widgets: {
            "table 1": {
                type: "table",
                graded: true,
                options: {
                    headers: ["", ""],
                    rows: 4,
                    columns: 2,
                    answers: [
                        ["", ""],
                        ["", ""],
                        ["", ""],
                        ["", ""],
                    ],
                },
            },
        },
    } as PerseusRenderer,
    answerArea: {
        calculator: false,
    },
    // eslint-disable-next-line no-restricted-syntax
    hints: [] as ReadonlyArray<any>,
};
