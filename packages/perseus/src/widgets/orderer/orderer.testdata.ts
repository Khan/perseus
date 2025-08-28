import type {PerseusRenderer} from "@khanacademy/perseus-core";

export const question1: PerseusRenderer = {
    content:
        "**Without using a calculator, put the numbers in order  from least to greatest.**  \n\n[[\u2603 orderer 1]]",
    images: {},
    widgets: {
        "orderer 1": {
            version: {major: 0, minor: 0},
            type: "orderer",
            graded: true,
            options: {
                otherOptions: [],
                layout: "horizontal",
                options: [
                    {content: "$10.9$", images: {}, widgets: {}},
                    {content: "$11$", images: {}, widgets: {}},
                    {content: "$\\sqrt{120}$", images: {}, widgets: {}},
                ],
                correctOptions: [
                    {content: "$10.9$", images: {}, widgets: {}},
                    {content: "$\\sqrt{120}$", images: {}, widgets: {}},
                    {content: "$11$", images: {}, widgets: {}},
                ],
                height: "normal",
            },
        },
    },
};

export const question2: PerseusRenderer = {
    content:
        "**Without using a calculator, put the numbers in order  from least to greatest.**  \n\n[[\u2603 orderer 1]]",
    images: {},
    widgets: {
        "orderer 1": {
            version: {major: 0, minor: 0},
            type: "orderer",
            graded: true,
            options: {
                otherOptions: [],
                layout: "horizontal",
                options: [
                    {content: "1", images: {}, widgets: {}},
                    {content: "3", images: {}, widgets: {}},
                    {content: "2", images: {}, widgets: {}},
                ],
                correctOptions: [
                    {content: "1", images: {}, widgets: {}},
                    {content: "2", images: {}, widgets: {}},
                    {content: "3", images: {}, widgets: {}},
                ],
                height: "normal",
            },
        },
    },
};

export const questionWithImages: PerseusRenderer = {
    content: "**Put $6$ flowers in the box.**\n\n[[☃ orderer 1]]",
    images: {},
    widgets: {
        "orderer 1": {
            graded: true,
            options: {
                correctOptions: [
                    {
                        content:
                            "![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",
                        widgets: {},
                        images: {},
                    },
                    {
                        content:
                            "![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",
                        widgets: {},
                        images: {},
                    },
                    {
                        content:
                            "![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",
                        widgets: {},
                        images: {},
                    },
                    {
                        content:
                            "![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",
                        widgets: {},
                        images: {},
                    },
                    {
                        content:
                            "![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",
                        widgets: {},
                        images: {},
                    },
                    {
                        content:
                            "![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",
                        widgets: {},
                        images: {},
                    },
                ],
                height: "auto",
                layout: "horizontal",
                options: [
                    {
                        content:
                            "![](https://ka-perseus-graphie.s3.amazonaws.com/b7a6f30d245d186cf42961677ddafa118fef5fdd.png)",
                        widgets: {},
                        images: {},
                    },
                ],
                otherOptions: [],
            },
            type: "orderer",
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const questionWithManyCards: PerseusRenderer = {
    content:
        "**Arrange these numbers in order from 1 to 10.**  \n\nThis tests horizontal layout with many cards to ensure no wrapping occurs.\n\n[[\u2603 orderer 1]]",
    images: {},
    widgets: {
        "orderer 1": {
            version: {major: 0, minor: 0},
            type: "orderer",
            graded: true,
            options: {
                otherOptions: [],
                layout: "horizontal",
                options: [
                    {content: "1", images: {}, widgets: {}},
                    {content: "2", images: {}, widgets: {}},
                    {content: "3", images: {}, widgets: {}},
                    {content: "4", images: {}, widgets: {}},
                    {content: "5", images: {}, widgets: {}},
                    {content: "6", images: {}, widgets: {}},
                    {content: "7", images: {}, widgets: {}},
                    {content: "8", images: {}, widgets: {}},
                    {content: "9", images: {}, widgets: {}},
                    {content: "10", images: {}, widgets: {}},
                ],
                correctOptions: [
                    {content: "1", images: {}, widgets: {}},
                    {content: "2", images: {}, widgets: {}},
                    {content: "3", images: {}, widgets: {}},
                    {content: "4", images: {}, widgets: {}},
                    {content: "5", images: {}, widgets: {}},
                    {content: "6", images: {}, widgets: {}},
                    {content: "7", images: {}, widgets: {}},
                    {content: "8", images: {}, widgets: {}},
                    {content: "9", images: {}, widgets: {}},
                    {content: "10", images: {}, widgets: {}},
                ],
                height: "normal",
            },
        },
    },
};
