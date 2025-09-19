// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "**Categorise the following into transparent, translucent and opaque objects.**\n\n[[☃ categorizer 1]]",
        images: {},
        widgets: {
            "categorizer 1": {
                type: "categorizer",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    items: [
                        "Water",
                        "Clean glass",
                        "Tracing paper",
                        "Butter paper",
                        "A sheet of aluminium",
                        "Mirror",
                    ],
                    categories: ["Transparent", "Translucent", "Opaque"],
                    values: [0, 0, 1, null, 2, 2],
                    randomizeItems: true,
                    linterContext: {
                        contentType: "",
                        highlightLint: false,
                        paths: [],
                        stack: [],
                    },
                },
                version: {
                    major: 0,
                    minor: 0,
                },
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
