import {
    generateDropdownOptions,
    generateDropdownWidget,
    generateExpressionAnswerForm,
    generateExpressionOptions,
    generateExpressionWidget,
    generateGroupOptions,
    generateGroupWidget,
    generateImageOptions,
    generateImageWidget,
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateRadioChoice,
    generateRadioWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
    splitPerseusItem,
    type PerseusItem,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const question1: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "![](https://ka-perseus-graphie.s3.amazonaws.com/3e6d0981127dea205c2becc0ead24702fbe862a1.png)\n\n=====\n\n[[☃ group 1]]\n\n[[☃ group 2]]",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/3e6d0981127dea205c2becc0ead24702fbe862a1.png":
            {height: 480, width: 428},
    },
    widgets: {
        "group 1": generateGroupWidget({
            graded: true,
            options: generateGroupOptions({
                content:
                    "**In one week, how many more hours are in the periods with a $35$ percent discount than in the periods with the regular price?**\n\n[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: {
                            choices: [
                                generateRadioChoice("$45$", {id: "0-0-0-0-0"}),
                                generateRadioChoice("$42$", {id: "1-1-1-1-1"}),
                                generateRadioChoice("$30$", {
                                    rationale:
                                        "Here's some rationale, this isn't the correct answer!",
                                    id: "2-2-2-2-2",
                                }),
                                generateRadioChoice("$18$", {id: "3-3-3-3-3"}),
                                generateRadioChoice("$15$", {
                                    correct: true,
                                    id: "4-4-4-4-4",
                                }),
                            ],
                            numCorrect: 1,
                        },
                    }),
                },
            }),
        }),
        "group 2": generateGroupWidget({
            graded: true,
            options: generateGroupOptions({
                content:
                    "**What is $\\redD{\\text{A}}$ rounded to the nearest ten?**   \n\n[[☃ numeric-input 1]]\n\n**What is $\\redD{\\text{A}}$ rounded to the nearest hundred?**   \n\n[[☃ numeric-input 2]]\n\n[[☃ image 1]]\n\n",
                images: {
                    "web+graphie://ka-perseus-graphie.s3.amazonaws.com/3351ccf19e60c28a1d08664f5c16defa76ed0348":
                        {height: 80, width: 380},
                },
                widgets: {
                    "image 1": generateImageWidget({
                        alignment: "block",
                        options: generateImageOptions({
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
                        }),
                    }),
                    "numeric-input 1": generateNumericInputWidget({
                        options: generateNumericInputOptions({
                            answers: [generateNumericInputAnswer({value: 230})],
                            labelText: "value rounded to the nearest ten",
                        }),
                    }),
                    "numeric-input 2": generateNumericInputWidget({
                        options: generateNumericInputOptions({
                            answers: [generateNumericInputAnswer({value: 200})],
                            labelText: "value rounded to the nearest hundred",
                        }),
                    }),
                },
            }),
        }),
    },
});

export const simpleGroupQuestion: PerseusRenderer = generateTestPerseusRenderer(
    {
        content: "[[☃ group 1]]",
        widgets: {
            "group 1": generateGroupWidget({
                options: generateGroupOptions({
                    content: "[[☃ expression 1]]",
                    widgets: {
                        "expression 1": generateExpressionWidget({
                            options: generateExpressionOptions({
                                answerForms: [
                                    generateExpressionAnswerForm({
                                        considered: "correct",
                                        form: true,
                                        simplify: true,
                                        value: "1.0",
                                    }),
                                ],
                                functions: [],
                                times: true,
                            }),
                        }),
                    },
                }),
            }),
        },
    },
);

export function getFullGroupTestItem(): PerseusItem {
    const groupRenderer = generateTestPerseusRenderer({
        content: "Group Renderer\n\n[[☃ dropdown 1]]",
        widgets: {
            "dropdown 1": generateDropdownWidget({
                options: generateDropdownOptions({
                    choices: [
                        {content: "Incorrect", correct: false},
                        {content: "Correct", correct: true},
                    ],
                    placeholder: "Choose an answer",
                }),
            }),
        },
    });

    const itemRenderer = generateTestPerseusRenderer({
        content: "Item Renderer\n\n[[☃ group 1]]",
        widgets: {
            "group 1": generateGroupWidget({
                graded: true,
                options: groupRenderer,
            }),
        },
    });

    return generateTestPerseusItem({question: itemRenderer});
}

export function getSplitGroupTestItem(): PerseusItem {
    return splitPerseusItem(getFullGroupTestItem());
}
