import type {PerseusRenderer, RadioWidget} from "@khanacademy/perseus-core";

export const singleSelectQuestion: PerseusRenderer = {
    content:
        "Which of the following values of $x$ satisfies the equation $\\sqrt{64}=x$ ?\n\n[[\u2603 radio 1]]\n\n",
    images: {},
    widgets: {
        "radio 1": {
            graded: true,
            version: {
                major: 1,
                minor: 0,
            },
            static: false,
            type: "radio",
            options: {
                choices: [
                    {
                        content: "$-8$ and $8$",
                        correct: false,
                        rationale:
                            "The square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number, so $x$ is equal to *only* $8$.",
                    },
                    {
                        content: "$-8$",
                        correct: false,
                        rationale:
                            "While $(-8)^2=64$, the square root operation ($\\sqrt{\\phantom{x}}$) calculates *only* the positive square root when performed on a number.",
                    },
                    {
                        content: "$8$",
                        correct: true,
                        rationale: "$8$ is the positive square root of $64$.",
                    },
                    {
                        content: "No value of $x$ satisfies the equation.",
                        correct: false,
                        rationale: "$8$ satisfies the equation.",
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        } as RadioWidget,
    },
};

export const multiChoiceQuestion: PerseusRenderer = {
    content:
        "**Select all input values for which $g(x)=2$.**\n\n[[\u2603 radio 1]]\n\n ![web graph](web+graphie://ka-perseus-graphie.s3.amazonaws.com/4613e0d9c906b3053fb5523eed83d4f779fdf6bb)",
    images: {},
    widgets: {
        "radio 1": {
            graded: true,
            version: {
                major: 1,
                minor: 0,
            },
            static: false,
            type: "radio",
            options: {
                choices: [
                    {
                        content: "$x=-6$",
                        correct: false,
                    },
                    {
                        content: "$x=4$",
                        correct: false,
                    },
                    {
                        content: "$x=7$",
                        correct: false,
                        isNoneOfTheAbove: false,
                    },
                    {
                        content: "There is no such input value.",
                        correct: true,
                        isNoneOfTheAbove: true,
                    },
                ],
                countChoices: false,
                hasNoneOfTheAbove: true,
                multipleSelect: true,
                randomize: false,
                deselectEnabled: false,
            },
            alignment: "default",
        } as RadioWidget,
    },
};

export const withLintErrors: PerseusRenderer = {
    content: `# H1s bad

Here is some unclosed math: $1+1=3

We should use \`\\dfrac{}\` instead of \`\\frac{}\`: $\\frac{3}{5}$

What is the best color in the world?

[[☃ radio 1]]`,
    images: {},
    widgets: {
        "radio 1": {
            type: "radio",
            options: {
                choices: [
                    {content: "Red"},
                    {content: "# Green"},
                    {content: "Blue", correct: true},
                    {
                        content: "None of these!",
                        isNoneOfTheAbove: true,
                    },
                ],
            },
        } as RadioWidget,
    },
};
