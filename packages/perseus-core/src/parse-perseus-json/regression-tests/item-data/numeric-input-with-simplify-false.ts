// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "**What is $\\text{sec}(\\angle A)?$**  \n*Reduce fractional answers to lowest terms.*\n\n[[☃ numeric-input 1]]\n\n ![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/b886f0f83c43c5f13fb41bed1e6c067500ec31d9)",
        images: {
            "web+graphie://ka-perseus-graphie.s3.amazonaws.com/b886f0f83c43c5f13fb41bed1e6c067500ec31d9":
                {
                    width: 285,
                    height: 157,
                },
        },
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
                            maxError: 0,
                            status: "correct",
                            strict: false,
                            value: 2.6,
                            simplify: false,
                            message: "",
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                    labelText: "",
                    multipleNumberInput: false,
                    rightAlign: false,
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
