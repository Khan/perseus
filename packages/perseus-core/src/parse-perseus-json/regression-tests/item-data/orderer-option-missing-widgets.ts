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
                "Extinction is a natural process, and the rate of extinction can be determined by studying changes in biodiversity during the history of life on Earth.\n",
            images: {},
            widgets: {
                "orderer 1": {
                    graded: true,
                    options: {
                        correctOptions: [
                            {
                                content: "$x$",
                            },
                        ],
                        height: "normal",
                        layout: "horizontal",
                        options: [
                            {
                                content: "$x$",
                            },
                            {
                                content: "$y$",
                            },
                        ],
                        otherOptions: [
                            {
                                content: "$y$",
                            },
                        ],
                    },
                    type: "orderer",
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        },
        {
            content:
                "Humans are causing a current sixth mass extinction event, but are not the only reason species go extinct.",
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
            "What is the definition of the natural background rate of extinction? \n\n![](https://ka-perseus-images.s3.amazonaws.com/1f68a48ffbc7b137e99fbcbb11e9747ae799fe01.jpg)\n\n[[☃ radio 1]]",
        images: {
            "https://ka-perseus-images.s3.amazonaws.com/1f68a48ffbc7b137e99fbcbb11e9747ae799fe01.jpg":
                {
                    height: 253,
                    width: 396,
                },
        },
        widgets: {
            "radio 1": {
                graded: true,
                options: {
                    choices: [
                        {
                            content:
                                "a.\tthe rate of extinction that balances the rate of speciation",
                            correct: false,
                        },
                        {
                            content:
                                "b.\tthe average rate at which extinctions have occurred naturally in the geologic past, without human involvement",
                            correct: true,
                        },
                        {
                            content:
                                "c.\tthe rate of extinction that is currently occurring in protected areas like national parks and marine sanctuaries",
                            correct: false,
                        },
                        {
                            content:
                                "d.\tthe rate of extinction that can be determined by using Geiger counters and detecting radiation",
                            correct: false,
                        },
                    ],
                    deselectEnabled: false,
                    displayCount: null,
                    multipleSelect: false,
                    noneOfTheAbove: false,
                    onePerLine: true,
                    randomize: false,
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
