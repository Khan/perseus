import {
    generateGroupOptions,
    generateGroupWidget,
    generateImageOptions,
    generateImageWidget,
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateRadioChoice,
    generateRadioWidget,
    generateTestPerseusRenderer,
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
            options: generateGroupOptions({
                content:
                    "**In one week, how many more hours are in the periods with a $35$ percent discount than in the periods with the regular price?**\n\n[[☃ radio 1]]",
                widgets: {
                    "radio 1": generateRadioWidget({
                        options: {
                            choices: [
                                generateRadioChoice("$45$"),
                                generateRadioChoice("$42$"),
                                generateRadioChoice("$30$", {
                                    rationale:
                                        "Here's some rationale, this isn't the correct answer!",
                                }),
                                generateRadioChoice("$18$"),
                                generateRadioChoice("$15$", {
                                    correct: true,
                                }),
                            ],
                        },
                    }),
                },
            }),
        }),
        "group 2": generateGroupWidget({
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
        "radio 1": generateRadioWidget(),
    },
});
