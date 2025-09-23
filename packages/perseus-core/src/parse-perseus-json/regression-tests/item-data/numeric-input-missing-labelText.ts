// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "![](https://ka-perseus-images.s3.amazonaws.com/ec3199bd52c57bcdb3ab16d727a172def834d4fe.jpg)\n\n\nHeart rate is described as the number of heart beats per minute.  The normal human heart rate ranges from 60-100 beats per minute (bpm). Lance Armstrong (pictured above) had a resting heart rate of 32 beats per minute. While racing, his heart rate would increase to 1.6 beats per second. How many more bpm was his heart rate while racing than while resting?\n\n[[☃ numeric-input 1]] bpm \n",
        images: {
            "https://ka-perseus-images.s3.amazonaws.com/ec3199bd52c57bcdb3ab16d727a172def834d4fe.jpg":
                {
                    width: 478,
                    height: 296,
                },
            "https://ka-perseus-images.s3.amazonaws.com/810a87bbf09a2c41bbe02b1611cd91b047f69412.png":
                {
                    width: 342,
                    height: 66,
                },
        },
        widgets: {
            "numeric-input 1": {
                type: "numeric-input",
                graded: true,
                options: {
                    answers: [
                        {
                            value: 64,
                            status: "correct",
                            message: "",
                            simplify: "required",
                            strict: false,
                            maxError: null,
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "expression 1": {
                type: "expression",
                graded: true,
                options: {
                    value: "",
                    form: false,
                    simplify: false,
                    times: false,
                    buttonSets: ["basic"],
                    functions: ["f", "g", "h"],
                    buttonsVisible: "never",
                },
                version: {
                    major: 0,
                    minor: 1,
                },
            },
            "sequence 1": {
                type: "sequence",
                graded: true,
                options: {
                    json: [
                        {
                            content: "",
                            images: {},
                            widgets: {},
                        },
                    ],
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        type: "multiple",
        options: {
            content: "",
            images: {},
            widgets: {},
        },
        calculator: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [
        {
            content:
                "Heart rate is measured in beats per minute: $\\dfrac{beats}{minutes}$",
            images: {},
            widgets: {
                "input-number 1": {
                    type: "input-number",
                    graded: true,
                    options: {
                        value: 0,
                        simplify: "required",
                        size: "normal",
                        inexact: false,
                        maxError: 0.1,
                        answerType: "number",
                    },
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
                "passage 1": {
                    type: "passage",
                    graded: true,
                    options: {
                        passageTitle: "",
                        passageText: "",
                        footnotes: "",
                        showLineNumbers: true,
                    },
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
                "expression 1": {
                    type: "expression",
                    graded: true,
                    options: {
                        value: "",
                        form: false,
                        simplify: false,
                        times: false,
                        buttonSets: ["basic"],
                        functions: ["f", "g", "h"],
                        buttonsVisible: "never",
                    },
                    version: {
                        major: 0,
                        minor: 1,
                    },
                },
            },
        },
        {
            content:
                "The questions first requires you to convert beats per second into beats per minute so the resting heart rate and active heart rate can be compared.\n\n",
            images: {},
            widgets: {
                "image 1": {
                    type: "image",
                    graded: true,
                    options: {
                        title: "",
                        range: [
                            [0, 10],
                            [0, 10],
                        ],
                        box: [400, 400],
                        backgroundImage: {
                            url: null,
                            width: 0,
                            height: 0,
                        },
                        labels: [],
                        caption: "",
                    },
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
                "expression 1": {
                    type: "expression",
                    graded: true,
                    options: {
                        value: "",
                        form: false,
                        simplify: false,
                        times: false,
                        buttonSets: ["basic"],
                        functions: ["f", "g", "h"],
                    },
                    version: {
                        major: 0,
                        minor: 1,
                    },
                },
            },
        },
        {
            content:
                "To convert the active heart rate from beats per second into beats per minute we must multiply 1.6 beats per second by 60 seconds.\n\n![](https://ka-perseus-images.s3.amazonaws.com/810a87bbf09a2c41bbe02b1611cd91b047f69412.png)",
            images: {
                "https://ka-perseus-images.s3.amazonaws.com/810a87bbf09a2c41bbe02b1611cd91b047f69412.png":
                    {
                        width: 342,
                        height: 66,
                    },
            },
            widgets: {},
        },
        {
            content:
                "From the previous calculation, we get 96 beats per minute as  Lance's active heart rate.",
            images: {},
            widgets: {},
        },
        {
            content:
                "To find the difference between the active and resting heart rate, subtract the resting heart rate from the active heart rate. The next hint shows this.",
            images: {},
            widgets: {},
        },
        {
            content: "$96$ $bpm$ $-$ $32$ $bpm$ $=$ $64$ $bpm$",
            images: {},
            widgets: {},
        },
        {
            content:
                "The difference between Lance Armstrong's  active and resting heart rate is $64$ $bpm$. ",
            images: {},
            widgets: {},
        },
    ],
};
