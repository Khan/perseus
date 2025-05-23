import {
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
                options: {
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
                    static: false,
                    title: "Percentage of Successful Cometary Missions (1978-2014)",
                },
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
