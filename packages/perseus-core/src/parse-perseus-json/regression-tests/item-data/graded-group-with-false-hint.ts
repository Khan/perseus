// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
    },
    hints: [
        {
            content:
                "###The Strategy \n\nWhen multiplying matrices, we should find each entry of the resulting product matrix separately.\n\nTo find entry $(i,j)$ of the resulting product matrix, we calculate the vector *dot product* of row $i$ of the first matrix and column $j$ of the second matrix. [[☃ explanation 1]] \n\n",
            images: {},
            replace: false,
            widgets: {
                "explanation 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        explanation:
                            "In general, vector dot product is an operation that takes two vectors of equal dimensions and returns a single real number.\n\nFor any two $n$-dimensional vectors, $\\vec{v}=(v_1, v_2, ..., v_n)$ and $\\vec{u}=(u_1, u_2, ..., u_n)$, their dot product $\\vec{v}\\cdot\\vec{u}$ is defined as follows.\n\n>$\\vec{v}\\cdot\\vec{u}=v_1\\cdot u_1+v_2\\cdot u_2 +...+v_n\\cdot u_n$\n\nFor example, for $\\vec{v}=(a,b)$ and $\\vec{u}=(c,d)$, we have $\\vec{v}\\cdot\\vec{u}=a\\cdot c+b\\cdot d$.\n\n",
                        hidePrompt: "Got it, thanks!",
                        showPrompt:
                            'I don\'t know what "vector dot product" is!',
                        static: false,
                        widgets: {},
                    },
                    static: false,
                    type: "explanation",
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        },
        {
            content:
                "###Finding $\\text {H}_{1,1}$ \n\n$\\text{H}_{1,1}$ is the dot product of the first row of $\\text{B}$ and the first column of $\\text{D}$.\n\n$ \\text {H}=\\left[\\begin{array}{rr}\\maroonC{1} & \\maroonC{4} \\\\ 1 & 3\\end{array}\\right]\\left[\\begin{array}{rr} \\maroonC{4} & 3 \\\\ \\maroonC{0} &  -1\\end{array}\\right]$\n\nTherefore, this is the appropriate calculation of $\\text{H}_{1,1}$.\n\n$\\begin{align}\\text{H}_{1,1}&=(1,4)\\cdot(4,0)\\\\\\\\\n&=1 \\cdot 4 + 4\\cdot 0\\\\\\\\\n&=4\n\\end{align}$\n\nThe other entries of $\\text{H}$ can be found similarly.\n\n### Try it yourself for $\\text{H}_{2,1}$\n\n[[☃ graded-group 1]]\n",
            images: {
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/bf8bd5bdea1a5aa51b012c0ee041bc4c57edc4d4":
                    {
                        height: 80,
                        width: 160,
                    },
            },
            replace: false,
            widgets: {
                "graded-group 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        content:
                            "**What is the appropriate calculation of $\\textbf{H}_{2,1}$?**\n\n[[☃ radio 1]]\n\n",
                        hasHint: false,
                        hint: false,
                        images: {},
                        title: "",
                        widgets: {
                            "radio 1": {
                                alignment: "default",
                                graded: true,
                                options: {
                                    choices: [
                                        {
                                            content:
                                                "$1 \\cdot 4 + 3\\cdot 0 = 4$",
                                            correct: true,
                                        },
                                        {
                                            content:
                                                "$4 \\cdot 4 + 3\\cdot 3= 25$",
                                            correct: false,
                                        },
                                        {
                                            content:
                                                "$1 \\cdot 3 + 4\\cdot -1 = -1$",
                                            isNoneOfTheAbove: false,
                                        },
                                    ],
                                    deselectEnabled: false,
                                    displayCount: null,
                                    hasNoneOfTheAbove: false,
                                    multipleSelect: false,
                                    onePerLine: true,
                                    randomize: true,
                                },
                                static: false,
                                type: "radio",
                                version: {
                                    major: 1,
                                    minor: 0,
                                },
                            },
                        },
                    },
                    static: false,
                    type: "graded-group",
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        },
        {
            content:
                "###Summary \n\nAfter calculating all the remaining entries of $\\text{H}$, we get the following answer.\n\n$ \\text{H}=\\left[\\begin{array}{rr}4 & -1 \\\\ 4 & 0\\end{array}\\right]$ ",
            images: {},
            replace: false,
            widgets: {},
        },
    ],
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    question: {
        content:
            "$\\text B = \\left[\\begin{array}{rr}1 & 4 \\\\ 1 & 3\\end{array}\\right]$ and $\\text D = \\left[\\begin{array}{rr}4 & 3 \\\\ 0 & -1\\end{array}\\right]$. \n\n** Let $\\text {H = BD}$. Find $\\text H$. **\n\n[[☃ matrix 1]]\n",
        images: {},
        widgets: {
            "matrix 1": {
                alignment: "default",
                graded: true,
                options: {
                    answers: [
                        [4, -1],
                        [4, 0],
                    ],
                    cursorPosition: [0, 0],
                    matrixBoardSize: [3, 3],
                    prefix: "$\\textbf {H = }$",
                    static: false,
                    suffix: "",
                },
                static: false,
                type: "matrix",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};
