import type {PerseusRenderer} from "../../perseus-types";

export default {
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
    hints: [] as ReadonlyArray<any>,
};
