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
        periodicTable: false,
        type: "multiple",
    },
    hints: [
        {
            content:
                "We can plot the points using the equation to find $d$ for each value of  $w$. \n\nIf $w=\\blue 6$, \n\n$\\qquad d=\\blue 6+5\\\\~~~~~~~~~~=\\red{11}.$  \n\nSo we place one point at $(\\blue 6,\\red{11})$.",
            images: {},
            widgets: {},
        },
        {
            content:
                "If $w=\\blue{10}$,\n\n$\\qquad d=\\blue{10}+5=\\red{15}$.\n\nSo the second point is at $(\\blue{10},\\red{15})$.",
            images: {},
            widgets: {},
        },
        {
            content:
                "The graph should look like this:\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/d29e6802062c091aac9761cf34e41438104bd6a2.png)",
            images: {
                "https://ka-perseus-graphie.s3.amazonaws.com/d29e6802062c091aac9761cf34e41438104bd6a2.png":
                    {
                        height: 425,
                        width: 425,
                    },
            },
            widgets: {},
        },
    ],
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    question: {
        content:
            "You are $5$ miles away from your house when you start walking directly away from your house.  In the table below, $w$ represents the number of miles you have walked, and $d$ represents your distance from home in miles.\n\nThe relationship between these two variables can be expressed by the following equation:\n\n$d=w+5.$\n\n**Plot two points on the graph that show your distance from home if you walked $6$ miles and $10$ miles.**\n\n$w$ | $d$\n:-:|:-:\n$0$ | $5$\n$1$ | $6$\n$2$ | $7$\n$3$ | $8$\n\n\n\n[[☃ interactive-graph 1]]",
        images: {},
        widgets: {
            "interactive-graph 1": {
                alignment: "default",
                graded: true,
                options: {
                    backgroundImage: {
                        bottom: "",
                        height: 0,
                        left: "",
                        scale: "1",
                        url: null,
                        width: 0,
                    },
                    correct: {
                        coords: [
                            [6, 11],
                            [10, 15],
                        ],
                        numPoints: 2,
                        type: "point",
                    },
                    graph: {
                        numPoints: 2,
                        type: "point",
                    },
                    gridStep: [1, 1],
                    labels: ["w", "d"],
                    markings: "graph",
                    range: [
                        [-1, 18],
                        [-1, 18],
                    ],
                    rulerLabel: "",
                    rulerTicks: 10,
                    showProtractor: false,
                    showRuler: false,
                    snapStep: [0.5, 0.5],
                    step: [1, 1],
                },
                type: "interactive-graph",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};
