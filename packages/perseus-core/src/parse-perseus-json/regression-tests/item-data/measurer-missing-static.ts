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
        content: "[[☃ measurer 1]]\n\n",
        images: {},
        widgets: {
            "measurer 1": {
                graded: true,
                options: {
                    box: [480, 480],
                    image: {},
                    rulerLabel: "",
                    rulerLength: 10,
                    rulerPixels: 40,
                    rulerTicks: 10,
                    showProtractor: true,
                    showRuler: true,
                },
                type: "measurer",
                version: {
                    major: 1,
                    minor: 0,
                },
            },
        },
    },
};
