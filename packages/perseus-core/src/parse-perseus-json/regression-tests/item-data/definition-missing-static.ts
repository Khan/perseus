// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "An object is released from rest near the surface of the Earth and allowed to fall freely. \n\n**How does the speed and acceleration of the object change immediately after release?**\n\n[[☃ categorizer 1]]\n\n",
        images: {},
        widgets: {
            "definition 1": {
                options: {
                    togglePrompt: "",
                    definition: "",
                },
                type: "definition",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "categorizer 1": {
                options: {
                    static: false,
                    items: ["Speed", "Acceleration"],
                    categories: ["Increases", "Decreases", "Stays constant"],
                    values: [0, 2],
                    randomizeItems: false,
                    linterContext: {
                        contentType: "",
                        highlightLint: false,
                        paths: [],
                        stack: [],
                    },
                },
                type: "categorizer",
                version: {
                    major: 0,
                    minor: 0,
                },
                graded: true,
                alignment: "default",
                static: false,
            },
        },
    },
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
};
