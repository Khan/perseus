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
    hints: [
        {
            content:
                "While the Articles of Confederation did not provide for a federal executive, delegates to the Continental Congress did elect a president.",
            images: {},
            widgets: {},
        },
    ],
    question: {
        content:
            "**Under the Articles of Confederation[[☃ dropdown 1]] chose the president of the United States.** ",
        images: {},
        widgets: {
            "dropdown 1": {
                graded: true,
                options: {
                    choices: [
                        {
                            content: "state legislatures",
                            correct: false,
                        },
                        {
                            content: "delegates to the Continental Congress",
                            correct: true,
                        },
                        {
                            content: "the people",
                            correct: false,
                        },
                    ],
                    placeholder: "",
                },
                type: "dropdown",
            },
        },
    },
};
