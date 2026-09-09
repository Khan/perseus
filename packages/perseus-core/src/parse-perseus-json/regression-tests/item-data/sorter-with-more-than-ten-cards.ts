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
            "**Sort the numbers from smallest to largest.**\n\n[[☃ sorter 1]]",
        images: {},
        widgets: {
            "sorter 1": {
                graded: true,
                options: {
                    correct: [
                        "$1$",
                        "$2$",
                        "$3$",
                        "$4$",
                        "$5$",
                        "$6$",
                        "$7$",
                        "$8$",
                        "$9$",
                        "$10$",
                        "$11$",
                    ],
                    layout: "horizontal",
                    padding: true,
                },
                type: "sorter",
            },
        },
    },
};
