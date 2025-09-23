// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    answerArea: {
        calculator: false,
        options: {
            content: "",
            images: {},
            widgets: {},
        },
        type: "multiple",
    },
    hints: [],
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    question: {
        content: "$\\Huge36+3$\n\n[[☃ numeric-input 1]]",
        images: {},
        widgets: {
            "numeric-input 1": {
                graded: true,
                options: {
                    answers: [
                        {
                            answerForms: [],
                            maxError: null,
                            message: "",
                            simplify: "required",
                            status: "correct",
                            strict: false,
                            value: null,
                        },
                    ],
                    coefficient: false,
                    size: "normal",
                },
                type: "numeric-input",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};
