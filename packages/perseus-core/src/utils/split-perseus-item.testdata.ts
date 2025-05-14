export const norwegianKnownIssue = {
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
                "$15 = 10 + \\blue5$\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/0876fd870e2630c7dd66cb96883dfda286282a66.png)",
            images: {
                "https://ka-perseus-graphie.s3.amazonaws.com/0876fd870e2630c7dd66cb96883dfda286282a66.png":
                    {
                        height: 126,
                        width: 450,
                    },
            },
            widgets: {},
        },
        {
            content:
                "$15$ bomster:  \n![](https://ka-perseus-graphie.s3.amazonaws.com/e424cd65122a3422fa7b448da0967f1bb22c60d7.png)",
            images: {
                "https://ka-perseus-graphie.s3.amazonaws.com/e424cd65122a3422fa7b448da0967f1bb22c60d7.png":
                    {
                        height: 126,
                        width: 450,
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
        content: "**Hvilken gruppe har $15$ blomster?**\n[[☃ radio 1]]\n\n",
        images: {},
        widgets: {
            "input-number 1": {
                graded: true,
                options: {
                    answerType: "number",
                    inexact: false,
                    maxError: 0.1,
                    simplify: "required",
                    size: "normal",
                    value: 7,
                },
                type: "input-number",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "radio 1": {
                graded: true,
                options: {
                    choices: [
                        {
                            content:
                                "![](https://ka-perseus-graphie.s3.amazonaws.com/515a1477fcdedc80e9d93ba83b29197c1f10a3a2.png)",
                            correct: false,
                        },
                        {
                            content:
                                "![](https://ka-perseus-graphie.s3.amazonaws.com/e424cd65122a3422fa7b448da0967f1bb22c60d7.png)",
                            correct: true,
                        },
                        {
                            content:
                                "![](https://ka-perseus-graphie.s3.amazonaws.com/dd3d6e3a72387e7a944e379385948907a333bd28.png)",
                            correct: false,
                        },
                    ],
                    displayCount: null,
                    multipleSelect: false,
                    noneOfTheAbove: false,
                    onePerLine: true,
                    randomize: true,
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
