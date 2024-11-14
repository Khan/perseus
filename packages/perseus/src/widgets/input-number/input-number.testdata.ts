import type {PerseusRenderer, InputNumberWidget} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?**  \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 input-number 1]]  \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {
        "input-number 1": {
            version: {
                major: 0,
                minor: 0,
            },
            type: "input-number",
            graded: true,
            alignment: "default",
            options: {
                maxError: 0.1,
                inexact: false,
                value: 0.3333333333333333,
                simplify: "optional",
                answerType: "rational",
                size: "normal",
                rightAlign: true,
            },
        } as InputNumberWidget,
    },
};

export const question2: PerseusRenderer = {
    content:
        "A washing machine is being redesigned to handle a greater volume of water.  One part is a pipe with a radius of $3 \\,\\text{cm}$ and a length of $11\\,\\text{cm}$.  It gets replaced with a pipe of radius $4\\,\\text{cm}$, and the same length. \n\n**How many more cubic centimeters of water can the new pipe hold?**\n\n [[\u2603 input-number 1]] $\\text{cm}^3$",
    images: Object.freeze({}),
    widgets: {
        "input-number 1": {
            type: "input-number",
            graded: true,
            options: {
                maxError: 0.1,
                inexact: false,
                value: 241.90263432641407,
                simplify: "required",
                answerType: "pi",
                size: "normal",
            },
        } as InputNumberWidget,
    },
};

export const question3: PerseusRenderer = {
    content:
        'Akshat works in a hospital lab.\n\nTo project blood quantities, he wants to know the probability that more than $1$ of the next $7$ donors will have type-A blood. From his previous work, Sorin knows that $\\dfrac14$ of donors have type-A blood.\n\nAkshat uses a computer to produce many samples that simulate the next $7$ donors. The first $8$ samples are shown in the table below where "$\\text{\\red{A}}$" represents a donor *with* type-A blood, and "$\\text{\\blue{Z}}$" represents a donor *without* type-A blood.\n\n**Based on the samples below, estimate the probability that  more than $1$ of the next $7$ donors will have type-A blood.** If necessary, round your answer to the nearest hundredth. [[\u2603 input-number 1]]\n\n*Note: This a small sample to practice with. A larger sample could give a much better estimate.*\n\n | Sample |\n:-: | :-: | \n$1$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}}$\n$2$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$3$ | $\\text{\\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$4$ | $\\text{\\red{A}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$5$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\red{A}}$\n$6$ | $\\text{\\blue{Z}, \\red{A}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}}$\n$7$ | $\\text{\\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}}$\n$8$ | $\\text{\\blue{Z}, \\blue{Z}, \\blue{Z}, \\blue{Z}, \\red{A}, \\blue{Z}, \\blue{Z}}$\n\n',
    images: Object.freeze({}),
    widgets: {
        "input-number 1": {
            type: "input-number",
            graded: true,
            options: {
                maxError: 0.1,
                inexact: false,
                value: 0.5,
                simplify: "optional",
                answerType: "percent",
                size: "small",
            },
        } as InputNumberWidget,
    },
};
