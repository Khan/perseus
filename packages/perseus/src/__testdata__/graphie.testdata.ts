import {
    generateImageOptions,
    generateImageWidget,
    generateTestPerseusItem,
    getDefaultAnswerArea,
    type PerseusItem,
} from "@khanacademy/perseus-core";

export const itemWithPieChart: PerseusItem = {
    answerArea: getDefaultAnswerArea(),
    hints: [],
    question: {
        content: "[[☃ image 1]]",
        images: {},
        widgets: {
            "image 1": {
                alignment: "block",
                graded: true,
                options: generateImageOptions({
                    alt: "This chart presents a pie graph divided into 2 sectors: 28 percent are unsuccessful and 72 percent are successful.",
                    backgroundImage: {
                        height: 210,
                        url: "web+graphie://cdn.kastatic.org/ka-perseus-graphie/7c0a5afb8670fad738df800ffe16c5e516b48777",
                        width: 210,
                    },
                    box: [210, 210],
                    caption: "Source: NASA “Current and Past Missions”",
                    labels: [],
                    range: [
                        [0, 10],
                        [0, 10],
                    ],
                    title: "Percentage of Successful Cometary Missions (1978-2014)",
                }),
                static: false,
                type: "image",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};

export const itemWithLabeledAngle: PerseusItem = generateTestPerseusItem({
    question: {
        content: "[[☃ image 1]]",
        images: {},
        widgets: {
            "image 1": generateImageWidget({
                options: generateImageOptions({
                    backgroundImage: {
                        url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/cc939c7b30d59b952f579a17e410c8e86055e84a",
                    },
                }),
            }),
        },
    },
});

export const itemWithImageLabelWithNoStyle: PerseusItem =
    generateTestPerseusItem({
        question: {
            content: "[[☃ image 1]]",
            images: {},
            widgets: {
                "image 1": {
                    type: "image",
                    static: false,
                    graded: true,
                    alignment: "block",
                    options: generateImageOptions({
                        backgroundImage: {
                            url: "https://ka-perseus-images.s3.amazonaws.com/0ba867e121eb4a2dfc2a854e22f571469a8d8793.svg",
                            width: 264,
                            height: 203,
                        },
                        labels: [
                            {
                                content: "7\\text{ cm}",
                                alignment: "left",
                                coordinates: [3.5, 3.5],
                            },
                            {
                                content: "\\text{width}",
                                alignment: "center",
                                coordinates: [6.9, 9],
                            },
                        ],
                        range: [
                            [0, 10],
                            [0, 10],
                        ],
                        box: [264, 203],
                    }),
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        },
    });
