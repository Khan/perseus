// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default [
    {
        content: "This section has an answer area.\n\n[[☃ numeric-input 1]]",
        images: {},
        widgets: {
            "numeric-input 1": {
                type: "numeric-input",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    answers: [
                        {
                            value: 42,
                            status: "correct",
                            maxError: null,
                            strict: false,
                            simplify: "required",
                            message: "",
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                    labelText: "",
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
        answerArea: {
            calculator: true,
            calculatorVariant: "scientific",
            periodicTable: true,
        },
    },
    {
        content: "This section has no answer area.",
        images: {},
        widgets: {},
    },
];
