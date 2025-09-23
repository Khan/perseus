// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "\n**Why does the author discuss the clothes and food at Robben Island?**\n\n[[☃ radio 1]]\n\n",
        images: {},
        widgets: {
            "radio 1": {
                type: "radio",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    numCorrect: 1,
                    hasNoneOfTheAbove: false,
                    countChoices: false,
                    randomize: false,
                    multipleSelect: false,
                    deselectEnabled: false,
                    choices: [
                        {
                            content:
                                "to show that Mandela fought for equality even when he was in prison\n",
                            rationale:
                                '**This is the best choice.** The author describes how apartheid affected the lives of Black prisoners: "they were forced to wear shorts and sandals" and their food was "worse than the food for other prisoners." The author goes on to say that Mandela fought for equal rights in prison, and that his work helped to change these rules. This is an example of how he fought for equality in prison.\n',
                            correct: true,
                            id: "",
                        },
                        {
                            content:
                                "to prove that everyone was treated poorly in South African prisons\n",
                            rationale:
                                "This isn’t why the author discusses the clothes and food at Robben Island. The author mentions these details to show that Black prisoners received poorer treatment than other prisoners: they weren't allowed to wear warm clothes and had worse food. The author doesn't suggest that *all* prisoners were treated poorly.\n",
                            correct: false,
                            id: "",
                        },
                        {
                            content:
                                "to introduce the idea that Mandela didn’t win every battle he fought against apartheid\n",
                            rationale:
                                'This isn’t why the author discusses the clothes and food at Robben Island. In fact, the author says that Mandela did help Black prisoners receive better clothes and food. For example, the text says that Mandela\'s work "finally began to pay off when Black prisoners were granted the right to wear pants and shoes."\n',
                            correct: false,
                            isNoneOfTheAbove: false,
                            id: "",
                        },
                        {
                            content:
                                "to demonstrate that prisoners were treated better than South Africans who were not in prison\n",
                            rationale:
                                "This isn’t why the author discusses the clothes and food at Robben Island. The text never compares the treatment of prisoners to the treatment of people who weren't in prison. \n",
                            correct: false,
                            isNoneOfTheAbove: false,
                            id: "",
                        },
                    ],
                },
                version: {
                    major: 3,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTable: false,
        periodicTableWithKey: false,
    },
    hints: [],
};
