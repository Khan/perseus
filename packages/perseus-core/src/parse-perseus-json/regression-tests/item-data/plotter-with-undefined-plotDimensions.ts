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
                "If there is a 60° angle to the ground, this gives us a 30-60-90 triangle. ",
            images: {},
            widgets: {
                "plotter 1": {
                    graded: true,
                    options: {
                        categories: [""],
                        correct: [1],
                        labelInterval: 1,
                        labels: ["", ""],
                        maxY: 10,
                        scaleY: 1,
                        snapsPerLine: 2,
                        starting: [1],
                        type: "bar",
                    },
                    type: "plotter",
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        },
        {
            content:
                "In this case, the horizontal component of force should be equal to the cos θ multiplied by the force of tension. ",
            images: {},
            widgets: {},
        },
        {
            content:
                "Since we know θ=60, and T=30N, we can solve: 30cos60 = 15 N.",
            images: {},
            widgets: {},
        },
    ],
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    question: {
        content:
            "A kite enthusiast flies her kite on a particularly windy day. The kite string is pulled upward to make a 60° angle with respect to the ground. Using a tension meter, she finds that the kite is pulling with 30 N of force. What is the horizontal component of force produced by the kite?\n\n[[☃ radio 1]]\n\n",
        images: {},
        widgets: {
            "radio 1": {
                graded: true,
                options: {
                    choices: [
                        {
                            content: "15 N",
                            correct: true,
                        },
                        {
                            content: "30 N",
                            correct: false,
                        },
                        {
                            content: "60 N",
                        },
                        {
                            content: "180 N",
                        },
                    ],
                    deselectEnabled: false,
                    displayCount: null,
                    multipleSelect: false,
                    noneOfTheAbove: false,
                    onePerLine: true,
                    randomize: true,
                },
                type: "radio",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};
