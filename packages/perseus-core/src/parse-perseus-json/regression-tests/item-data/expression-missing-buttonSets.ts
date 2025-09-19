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
    question: {
        content:
            " $ax + by = c$\n\n**Solve for $y$.**\n\n$y=$ [[☃ expression 1]]",
        images: {
            "http://s3.amazonaws.com/illustrativemathematics/images/000/000/818/medium/seven_circles_ba4a5fd8b0a4a751dc704e843912f6ef.jpg?1336174598":
                {
                    height: 300,
                    width: 291,
                },
        },
        widgets: {
            "expression 1": {
                graded: true,
                options: {
                    form: false,
                    functions: ["f", "g", "h"],
                    simplify: false,
                    times: false,
                    value: "\\frac{ax}{b}+\\frac{c}{b}",
                },
                type: "expression",
            },
        },
    },
};
