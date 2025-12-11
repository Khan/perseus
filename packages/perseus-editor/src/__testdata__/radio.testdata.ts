import {
    generateRadioOptions,
    generateRadioWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const singleSelectQuestion: PerseusRenderer =
    generateTestPerseusRenderer({
        content:
            "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    choices: [
                        {
                            id: "choice-1",
                            content: "$-8$ and $8$",
                            correct: false,
                            rationale:
                                "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
                        },
                        {
                            id: "choice-2",
                            content: "$-8$",
                            correct: false,
                            rationale:
                                "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
                        },
                        {
                            id: "choice-3",
                            content: "$8$",
                            correct: true,
                            rationale:
                                "$8$ is the positive square root of $64$.",
                        },
                        {
                            id: "choice-4",
                            content: "No value of $x$ satisfies the equation.",
                            correct: false,
                            rationale: "$8$ satisfies the equation.",
                        },
                    ],
                }),
            }),
        },
    });

export const multiChoiceQuestion: PerseusRenderer = generateTestPerseusRenderer(
    {
        content:
            "**Select all input values for which $g(x)=2$.**\n\n[[\u2603 radio 1]]\n\n ![web graph](web+graphie://ka-perseus-graphie.s3.amazonaws.com/4613e0d9c906b3053fb5523eed83d4f779fdf6bb)",
        widgets: {
            "radio 1": generateRadioWidget({
                options: generateRadioOptions({
                    choices: [
                        {
                            id: "choice-1",
                            content: "$x=-6$",
                            correct: false,
                        },
                        {
                            id: "choice-2",
                            content: "$x=4$",
                            correct: false,
                        },
                        {
                            id: "choice-3",
                            content: "$x=7$",
                            correct: false,
                            isNoneOfTheAbove: false,
                        },
                        {
                            id: "choice-4",
                            content: "There is no such input value.",
                            correct: true,
                            isNoneOfTheAbove: true,
                        },
                    ],
                    hasNoneOfTheAbove: true,
                    multipleSelect: true,
                }),
            }),
        },
    },
);

export const withLintErrors: PerseusRenderer = generateTestPerseusRenderer({
    content: `# H1s bad

Here is some unclosed math: $1+1=3

We should use \`\\dfrac{}\` instead of \`\\frac{}\`: $\\frac{3}{5}$

What is the best color in the world?

[[☃ radio 1]]`,
    widgets: {
        "radio 1": generateRadioWidget({
            options: generateRadioOptions({
                choices: [
                    {content: "Red", id: "choice-1"},
                    {content: "# Green", id: "choice-2"},
                    {content: "Blue", correct: true, id: "choice-3"},
                    {
                        content: "None of these!",
                        isNoneOfTheAbove: true,
                        id: "choice-4",
                    },
                ],
            }),
        }),
    },
});
