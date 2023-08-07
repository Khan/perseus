import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "The elementary school principal asked teachers to report the number of students absent in each grade during the past week.\n\n**Create a bar graph to show how many students were absent in each grade.**\n\nSchool grade | Number of absent students  \n:- | :-: \n$1^{\\text{st}} \\text{ grade}$ | $15$ \n$2^{\\text{nd}} \\text{ grade}$ |$25$ \n$3^{\\text{rd}} \\text{ grade}$ | $5$  \n$4^{\\text{th}} \\text{ grade}$ | $10$  \n$5^{\\text{th}} \\text{ grade}$ | $10$  \n\n[[☃ plotter 1]]\n\n",
    images: {},
    widgets: {
        // This is the actual problem from the server
        // I don't know why the type is incorrect
        // @ts-expect-error - TS2322
        "plotter 1": {
            alignment: "default",
            graded: true,
            options: {
                categories: [
                    "$1^{\\text{st}} \\text{}$",
                    "$2^{\\text{nd}} \\text{}$",
                    "$3^{\\text{rd}} \\text{}$",
                    "$4^{\\text{th}} \\text{}$",
                    "$5^{\\text{th}} \\text{}$",
                ],
                correct: [15, 25, 5, 10, 10],
                labelInterval: 1,
                labels: ["School grade", "Number of absent students"],
                maxY: 30,
                scaleY: 5,
                snapsPerLine: 1,
                starting: [0, 0, 0, 0, 0],
                type: "bar",
            },
            static: false,
            type: "plotter",
            version: {major: 0, minor: 0},
        },
    },
};
