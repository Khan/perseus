// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "**In the given setup, only half of the pinhole is covered. Predict what the image on the screen will look like.**  \n\n[[☃ image 1]]\n\n\n[[☃ radio 1]] ",
        widgets: {
            "image 1": {
                type: "image",
                alignment: "block",
                static: false,
                graded: true,
                options: {
                    title: "",
                    range: [
                        [0, 10],
                        [0, 10],
                    ],
                    box: [1502, 906],
                    backgroundImage: {
                        url: "https://cdn.kastatic.org/ka-content-images/ab309c0f39b2f392e5651c44a7d5f96d7f23777b.png",
                        width: 382,
                        height: 230.42077230359527,
                    },
                    labels: [],
                    alt: "A diagramatic setup of an object in front of the pinhole camera. The pinhole is covered 50%, and the image is captured on the screen inside the pinhole camera.",
                    caption: "",
                    static: false,
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "radio 1": {
                options: {
                    choices: [
                        {
                            id: "radio-choice-0",
                            content: "The image disappears completely.",
                        },
                        {
                            id: "radio-choice-1",
                            content: "The image becomes dim or partly visible.",
                        },
                        {
                            id: "radio-choice-2",
                            content: "The image becomes larger.",
                        },
                        {
                            id: "radio-choice-3",
                            content: "The image remains unchanged.",
                        },
                    ],
                    randomize: true,
                    hasNoneOfTheAbove: false,
                    multipleSelect: false,
                    countChoices: false,
                    deselectEnabled: false,
                },
                type: "radio",
                version: {
                    major: 3,
                    minor: 0,
                },
                graded: true,
                alignment: "NCERT Grade 7 Science – Chapter 11: Pinhole Camera",
                static: false,
            },
        },
        images: {},
    },
    hints: [],
    answerArea: {
        calculator: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTable: false,
        periodicTableWithKey: false,
    },
};
