import type {PerseusRenderer} from "@khanacademy/perseus-core";

export const question1: PerseusRenderer = {
    content:
        "![](https://ka-perseus-graphie.s3.amazonaws.com/3e6d0981127dea205c2becc0ead24702fbe862a1.png)\n\n=====\n\n[[☃ group 1]]\n\n[[☃ group 2]]",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/3e6d0981127dea205c2becc0ead24702fbe862a1.png":
            {height: 480, width: 428},
    },
    widgets: {
        "group 1": {
            graded: true,
            options: {
                content:
                    "**In one week, how many more hours are in the periods with a $35$ percent discount than in the periods with the regular price?**\n\n[[☃ radio 1]]",
                images: {},
                widgets: {
                    "radio 1": {
                        graded: true,
                        options: {
                            choices: [
                                {id: "01", content: "$45$", correct: false},
                                {id: "12", content: "$42$", correct: false},
                                {
                                    id: "23",
                                    content: "$30$",
                                    correct: false,
                                    rationale:
                                        "Here's some rationale, this isn't the correct answer!",
                                },
                                {id: "34", content: "$18$", correct: false},
                                {id: "45", content: "$15$", correct: true},
                            ],
                            multipleSelect: false,
                            randomize: false,
                        },
                        type: "radio",
                        version: {major: 0, minor: 0},
                    },
                },
            },
            type: "group",
            version: {major: 0, minor: 0},
        },
        "group 2": {
            graded: true,
            options: {
                content:
                    "**What is $\\redD{\\text{A}}$ rounded to the nearest ten?**   \n\n[[☃ numeric-input 1]]\n\n**What is $\\redD{\\text{A}}$ rounded to the nearest hundred?**   \n\n[[☃ numeric-input 2]]\n\n[[☃ image 1]]\n\n",
                images: {
                    "web+graphie://ka-perseus-graphie.s3.amazonaws.com/3351ccf19e60c28a1d08664f5c16defa76ed0348":
                        {height: 80, width: 380},
                },
                widgets: {
                    "image 1": {
                        alignment: "block",
                        graded: true,
                        options: {
                            alt: "A number line labeled 200 to 300 with tick marks at every 5 units. The tick marks at 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, and 300 are labeled. A red circle labeled A is between 220 tick mark and 230 tick mark.",
                            backgroundImage: {
                                height: 80,
                                url: "web+graphie://ka-perseus-graphie.s3.amazonaws.com/3351ccf19e60c28a1d08664f5c16defa76ed0348",
                                width: 380,
                            },
                            box: [380, 80],
                            caption: "",
                            labels: [],
                            range: [
                                [0, 10],
                                [0, 10],
                            ],
                            static: false,
                            title: "",
                        },
                        static: false,
                        type: "image",
                        version: {major: 0, minor: 0},
                    },
                    "numeric-input 1": {
                        alignment: "default",
                        graded: true,
                        options: {
                            answers: [
                                {
                                    maxError: null,
                                    message: "",
                                    simplify: "required",
                                    status: "correct",
                                    strict: false,
                                    value: 230,
                                },
                            ],
                            coefficient: false,
                            labelText: "value rounded to the nearest ten",
                            rightAlign: false,
                            size: "normal",
                            static: false,
                        },
                        static: false,
                        type: "numeric-input",
                        version: {major: 0, minor: 0},
                    },
                    "numeric-input 2": {
                        alignment: "default",
                        graded: true,
                        options: {
                            answers: [
                                {
                                    maxError: null,
                                    message: "",
                                    simplify: "required",
                                    status: "correct",
                                    strict: false,
                                    value: 200,
                                },
                            ],
                            coefficient: false,
                            labelText: "value rounded to the nearest hundred",
                            rightAlign: false,
                            size: "normal",
                            static: false,
                        },
                        static: false,
                        type: "numeric-input",
                        version: {major: 0, minor: 0},
                    },
                },
            },
            type: "group",
            version: {major: 0, minor: 0},
        },
        "radio 1": {
            graded: true,
            options: {
                choices: [
                    {id: "01", content: "", correct: false},
                    {id: "12", content: "", correct: false},
                    {id: "23", content: "", correct: false},
                    {id: "34", content: "", correct: false},
                    {id: "45", content: "", correct: true},
                ],
                multipleSelect: false,
                randomize: false,
            },
            type: "radio",
            version: {major: 0, minor: 0},
        },
    },
};
