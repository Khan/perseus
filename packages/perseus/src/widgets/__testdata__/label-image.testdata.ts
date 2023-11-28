import type {PerseusRenderer} from "../../perseus-types";

export const textQuestion: PerseusRenderer = {
    content:
        "Carol created a chart and a bar graph to show how many of each type of vehicle were in her supermarket parking lot.\n\nVehicle Type | Number in the parking lot\n:- | :-: \nTrucks| $25$ \nVans | $5$ \nCars| $40$ \nSUVs | $10$ \n\n**Label each bar on the bar graph.**\n\n[[☃ label-image 1]]\n\n",
    images: {
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/1e28332fd2321975639ab50c9ce442e568c18421":
            {
                width: 341,
                height: 310,
            },
    },
    widgets: {
        "label-image 1": {
            type: "label-image",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                choices: ["Trucks", "Vans", "Cars", "SUVs"],
                imageAlt:
                    "A bar graph with four bar lines that shows the horizontal axis labeled Number in the parking lot and the vertical axis labeled Vehicle Type. The horizontal axis is labeled, from left to right: 0, 10, 20, 30, 40, and 50. The vertical axis has, from the bottom to the top, four unlabeled bar lines as follows: the first unlabeled bar line extends to the middle of 0 and 10, the second unlabeled bar line extends to 40, the third unlabeled bar line extends to the middle of 20 and 30, and fourth unlabeled bar line extends to 10.",
                imageUrl:
                    "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
                imageWidth: 415,
                imageHeight: 314,
                markers: [
                    {
                        answers: ["SUVs"],
                        label: "The fourth unlabeled bar line.",
                        x: 25,
                        y: 17.7,
                    },
                    {
                        answers: ["Trucks"],
                        label: "The third unlabeled bar line.",
                        x: 25,
                        y: 35.3,
                    },
                    {
                        answers: ["Cars"],
                        label: "The second unlabeled bar line.",
                        x: 25,
                        y: 53,
                    },
                    {
                        answers: ["Vans"],
                        label: "The first unlabeled bar line.",
                        x: 25,
                        y: 70.3,
                    },
                ],
                multipleAnswers: false,
                hideChoicesFromInstructions: true,
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const mathQuestion: PerseusRenderer = {
    content:
        "Carol created a chart and a bar graph to show how many of each type of vehicle were in her supermarket parking lot.\n\nVehicle Type | Number in the parking lot\n:- | :-: \nTrucks| $25$ \nVans | $5$ \nCars| $40$ \nSUVs | $10$ \n\n**Label each bar on the bar graph.**\n\n[[☃ label-image 1]]\n\n",
    images: {
        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/1e28332fd2321975639ab50c9ce442e568c18421":
            {
                width: 341,
                height: 310,
            },
    },
    widgets: {
        "label-image 1": {
            type: "label-image",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                choices: [
                    "$\\dfrac{1}{2}$",
                    "$\\dfrac{3}{4}$",
                    "$\\dfrac{5}{6}$",
                    "$\\dfrac{7}{8}$",
                ],
                imageAlt:
                    "A bar graph with four bar lines that shows the horizontal axis labeled Number in the parking lot and the vertical axis labeled Vehicle Type. The horizontal axis is labeled, from left to right: 0, 10, 20, 30, 40, and 50. The vertical axis has, from the bottom to the top, four unlabeled bar lines as follows: the first unlabeled bar line extends to the middle of 0 and 10, the second unlabeled bar line extends to 40, the third unlabeled bar line extends to the middle of 20 and 30, and fourth unlabeled bar line extends to 10.",
                imageUrl:
                    "web+graphie://ka-perseus-graphie.s3.amazonaws.com/56c60c72e96cd353e4a8b5434506cd3a21e717af",
                imageWidth: 415,
                imageHeight: 314,
                markers: [
                    {
                        answers: ["$\\dfrac{1}{2}$"],
                        label: "The fourth unlabeled bar line.",
                        x: 25,
                        y: 17.7,
                    },
                    {
                        answers: ["$\\dfrac{3}{4}$"],
                        label: "The third unlabeled bar line.",
                        x: 25,
                        y: 35.3,
                    },
                    {
                        answers: ["$\\dfrac{5}{6}$"],
                        label: "The second unlabeled bar line.",
                        x: 25,
                        y: 53,
                    },
                    {
                        answers: ["$\\dfrac{7}{8}$"],
                        label: "The first unlabeled bar line.",
                        x: 25,
                        y: 70.3,
                    },
                ],
                multipleAnswers: false,
                hideChoicesFromInstructions: true,
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const numberline: PerseusRenderer = {
    content:
        "**Label each point on the number line with the correct value.**\n\n[[☃ label-image 1]]",
    images: {},
    widgets: {
        "label-image 1": {
            type: "label-image",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                choices: ["$-\\dfrac{7}{3}$", "$-2\\dfrac{5}{8}$", "$-2.9$"],
                imageAlt:
                    "A number line from negative 6 halves to negative 3 halves, labeled in increments of 1 half. There are three points on the line, labeled from left to right with a, b, and c.",
                imageUrl:
                    "web+graphie://ka-perseus-graphie.s3.amazonaws.com/05faa925d02e5effd3069bf24da4777e3ae1a28b",
                imageWidth: 360,
                imageHeight: 160,
                markers: [
                    {
                        answers: ["$-2.9$"],
                        label: "Point a is the leftmost of two points between negative 6 halves and negative 5 halves.",
                        x: 14.25,
                        y: 50,
                    },
                    {
                        answers: ["$-2\\dfrac{5}{8}$"],
                        label: "Point b is the rightmost of two points between negative 6 halves and negative 5 halves.",
                        x: 29.5,
                        y: 50,
                    },
                    {
                        answers: ["$-\\dfrac{7}{3}$"],
                        label: "Point c is between negative 5 halves and negative 4 halves.",
                        x: 45.5,
                        y: 50,
                    },
                ],
                multipleAnswers: false,
                hideChoicesFromInstructions: false,
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};
