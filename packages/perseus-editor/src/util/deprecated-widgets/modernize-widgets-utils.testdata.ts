import type {
    InputNumberWidget,
    PerseusRenderer,
    NumericInputWidget,
    PerseusWidgetsMap,
} from "@khanacademy/perseus";

export const inputNumberSimple: PerseusRenderer = {
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
            type: "input-number",
            graded: true,
            alignment: "default",
            options: {
                maxError: 0,
                inexact: false,
                value: 0.3333333333333333,
                simplify: "optional",
                answerType: "rational",
                size: "normal",
            },
        } as InputNumberWidget,
    },
};

export const numericInputSimple: PerseusRenderer = {
    content:
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?**  \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 numeric-input 1]]  \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {
        "numeric-input 1": {
            type: "numeric-input",
            options: {
                static: false,
                answers: [
                    {
                        value: 0.3333333333333333,
                        status: "correct",
                        message: "",
                        simplify: "optional",
                        strict: false,
                        maxError: 0,
                        answerForms: ["proper"],
                    },
                ],
                size: "normal",
                coefficient: false,
                labelText: "",
                rightAlign: false,
            },
        } as NumericInputWidget,
    },
};

export const inputNumberNestedWithNumeric: PerseusRenderer = {
    content:
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?** \n[[\u2603 numeric-input 1]] \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 graded-group 1]]  \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {
        "numeric-input 1": {
            type: "numeric-input",
            options: {
                static: false,
                answers: [
                    {
                        value: 0.1,
                        status: "correct",
                        message: "",
                        simplify: "optional",
                        strict: false,
                        maxError: 0,
                    },
                ],
                size: "normal",
                coefficient: false,
                labelText: "",
                rightAlign: false,
            },
        } as NumericInputWidget,
        "graded-group 1": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Group 1",
                content:
                    "This is just a couple of cute lil' [[\u2603 numeric-input 1]]'s and [[\u2603 input-number 1]]'s.",
                images: {},
                widgets: {
                    "numeric-input 1": {
                        type: "numeric-input",
                        options: {
                            static: false,
                            answers: [
                                {
                                    value: 0.2,
                                    status: "correct",
                                    message: "",
                                    simplify: "optional",
                                    strict: false,
                                    maxError: 0,
                                },
                            ],
                            size: "normal",
                            coefficient: false,
                            labelText: "",
                            rightAlign: false,
                        },
                    } as NumericInputWidget,
                    "input-number 1": {
                        type: "input-number",
                        graded: true,
                        alignment: "default",
                        options: {
                            maxError: 0,
                            inexact: false,
                            value: 0.3333333333333333,
                            simplify: "optional",
                            answerType: "rational",
                            size: "normal",
                        },
                    } as InputNumberWidget,
                },
            },
        } as PerseusWidgetsMap["graded-group 1"],
    },
};

export const numericInputNestedWithNumeric: PerseusRenderer = {
    content:
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?** \n[[\u2603 numeric-input 1]] \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 graded-group 1]]  \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {
        "numeric-input 1": {
            type: "numeric-input",
            options: {
                static: false,
                answers: [
                    {
                        value: 0.1,
                        status: "correct",
                        message: "",
                        simplify: "optional",
                        strict: false,
                        maxError: 0,
                    },
                ],
                size: "normal",
                coefficient: false,
                labelText: "",
                rightAlign: false,
            },
        } as NumericInputWidget,
        "graded-group 1": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Group 1",
                content:
                    "This is just a couple of cute lil' [[\u2603 numeric-input 1]]'s and [[\u2603 numeric-input 2]]'s.",
                images: {},
                widgets: {
                    "numeric-input 1": {
                        type: "numeric-input",
                        options: {
                            static: false,
                            answers: [
                                {
                                    value: 0.2,
                                    status: "correct",
                                    message: "",
                                    simplify: "optional",
                                    strict: false,
                                    maxError: 0,
                                },
                            ],
                            size: "normal",
                            coefficient: false,
                            labelText: "",
                            rightAlign: false,
                        },
                    } as NumericInputWidget,
                    "numeric-input 2": {
                        type: "numeric-input",
                        options: {
                            static: false,
                            answers: [
                                {
                                    value: 0.3333333333333333,
                                    status: "correct",
                                    message: "",
                                    simplify: "optional",
                                    strict: false,
                                    maxError: 0,
                                    answerForms: ["proper"],
                                },
                            ],
                            size: "normal",
                            coefficient: false,
                            labelText: "",
                            rightAlign: false,
                        },
                    } as NumericInputWidget,
                },
            },
        } as PerseusWidgetsMap["graded-group 1"],
    },
};

export const inputNumberNested: PerseusRenderer = {
    content:
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?**  \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 graded-group 1]]  \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {
        "graded-group 1": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Group 1",
                content: "This is just a cute lil' [[\u2603 input-number 1]].",
                images: {},
                widgets: {
                    "input-number 1": {
                        type: "input-number",
                        graded: true,
                        alignment: "default",
                        options: {
                            maxError: 0,
                            inexact: false,
                            value: 0.3333333333333333,
                            simplify: "optional",
                            answerType: "rational",
                            size: "normal",
                        },
                    } as InputNumberWidget,
                },
            },
        } as PerseusWidgetsMap["graded-group 1"],
    },
};

export const numericInputNested: PerseusRenderer = {
    content:
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces.  Denis's dad eats $1$ section of the pie.  \n\n**What fraction of the pie did Denis's dad eat?**  \n![](https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png)    \n[[\u2603 graded-group 1]]  \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {
        "graded-group 1": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Group 1",
                content: "This is just a cute lil' [[\u2603 numeric-input 1]].",
                images: {},
                widgets: {
                    "numeric-input 1": {
                        type: "numeric-input",
                        options: {
                            static: false,
                            answers: [
                                {
                                    value: 0.3333333333333333,
                                    status: "correct",
                                    message: "",
                                    simplify: "optional",
                                    strict: false,
                                    maxError: 0,
                                    answerForms: ["proper"],
                                },
                            ],
                            size: "normal",
                            coefficient: false,
                            labelText: "",
                            rightAlign: false,
                        },
                    } as NumericInputWidget,
                },
            },
        } as PerseusWidgetsMap["graded-group 1"],
    },
};

export const inputNumberMultiNested: PerseusRenderer = {
    content:
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces. \n[[\u2603 graded-group 1]] \n[[\u2603 graded-group 2]] \n[[\u2603 numeric-input 1]] \n[[\u2603 input-number 1]] \n[[\u2603 input-number 2]] \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {
        "numeric-input 1": {
            type: "numeric-input",
            options: {
                static: false,
                answers: [
                    {
                        value: 0.3333333333333333,
                        status: "correct",
                        message: "",
                        simplify: "optional",
                        strict: false,
                        maxError: 0,
                    },
                ],
                size: "normal",
                coefficient: false,
                labelText: "",
                rightAlign: false,
            },
        } as NumericInputWidget,
        "input-number 1": {
            type: "input-number",
            graded: true,
            alignment: "default",
            options: {
                maxError: 0,
                inexact: false,
                value: 0.3333333333333333,
                simplify: "optional",
                answerType: "rational",
                size: "normal",
            },
        } as InputNumberWidget,
        "input-number 2": {
            type: "input-number",
            graded: true,
            alignment: "default",
            options: {
                maxError: 0,
                inexact: false,
                value: 0.3333333333333333,
                simplify: "optional",
                answerType: "rational",
                size: "normal",
            },
        } as InputNumberWidget,
        "graded-group 1": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Group 1",
                content:
                    "This is just a cute lil' [[\u2603 input-number 1]] \n[[\u2603 input-number 2]].",
                images: {},
                widgets: {
                    "input-number 1": {
                        type: "input-number",
                        graded: true,
                        alignment: "default",
                        options: {
                            maxError: 0,
                            inexact: false,
                            value: 0.3333333333333333,
                            simplify: "optional",
                            answerType: "rational",
                            size: "normal",
                        },
                    } as InputNumberWidget,
                    "input-number 2": {
                        type: "input-number",
                        graded: true,
                        alignment: "default",
                        options: {
                            maxError: 0,
                            inexact: false,
                            value: 0.3333333333333333,
                            simplify: "optional",
                            answerType: "rational",
                            size: "normal",
                        },
                    } as InputNumberWidget,
                },
            },
        } as PerseusWidgetsMap["graded-group 1"],
        "graded-group 2": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Group 2",
                content: "This is just a cute lil' [[\u2603 input-number 1]].",
                images: {},
                widgets: {
                    "input-number 1": {
                        type: "input-number",
                        graded: true,
                        alignment: "default",
                        options: {
                            maxError: 0,
                            inexact: false,
                            value: 0.3333333333333333,
                            simplify: "optional",
                            answerType: "rational",
                            size: "normal",
                        },
                    } as InputNumberWidget,
                },
            },
        } as PerseusWidgetsMap["graded-group 2"],
        "graded-group 3": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Group 3",
                content: "This is just a cute lil' [[\u2603 input-number 1]].",
                images: {},
                widgets: {
                    "input-number 1": {
                        type: "input-number",
                        graded: true,
                        alignment: "default",
                        options: {
                            maxError: 0,
                            inexact: false,
                            value: 0.3333333333333333,
                            simplify: "optional",
                            answerType: "rational",
                            size: "normal",
                        },
                    } as InputNumberWidget,
                },
            },
        } as PerseusWidgetsMap["graded-group 3"],
    },
};

export const numericInputMultiNested: PerseusRenderer = {
    content:
        "Denis baked a peach pie and cut it into $3$ equal-sized pieces. \n[[\u2603 graded-group 1]] \n[[\u2603 graded-group 2]] \n[[\u2603 numeric-input 1]] \n[[\u2603 numeric-input 2]] \n[[\u2603 numeric-input 3]] \n\n\n\n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/74a2b7583a2c26ebfb3ad714e29867541253fc97.png":
            {
                width: 200,
                height: 200,
            },
    },
    widgets: {
        "numeric-input 1": {
            type: "numeric-input",
            options: {
                static: false,
                answers: [
                    {
                        value: 0.3333333333333333,
                        status: "correct",
                        message: "",
                        simplify: "optional",
                        strict: false,
                        maxError: 0,
                    },
                ],
                size: "normal",
                coefficient: false,
                labelText: "",
                rightAlign: false,
            },
        } as NumericInputWidget,
        "numeric-input 2": {
            type: "numeric-input",
            options: {
                static: false,
                answers: [
                    {
                        value: 0.3333333333333333,
                        status: "correct",
                        message: "",
                        simplify: "optional",
                        strict: false,
                        maxError: 0,
                        answerForms: ["proper"],
                    },
                ],
                size: "normal",
                coefficient: false,
                labelText: "",
                rightAlign: false,
            },
        } as NumericInputWidget,
        "numeric-input 3": {
            type: "numeric-input",
            options: {
                static: false,
                answers: [
                    {
                        value: 0.3333333333333333,
                        status: "correct",
                        message: "",
                        simplify: "optional",
                        strict: false,
                        maxError: 0,
                        answerForms: ["proper"],
                    },
                ],
                size: "normal",
                coefficient: false,
                labelText: "",
                rightAlign: false,
            },
        } as NumericInputWidget,
        "graded-group 1": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Group 1",
                content:
                    "This is just a cute lil' [[\u2603 numeric-input 1]] \n[[\u2603 numeric-input 2]].",
                images: {},
                widgets: {
                    "numeric-input 1": {
                        type: "numeric-input",
                        options: {
                            static: false,
                            answers: [
                                {
                                    value: 0.3333333333333333,
                                    status: "correct",
                                    message: "",
                                    simplify: "optional",
                                    strict: false,
                                    maxError: 0,
                                    answerForms: ["proper"],
                                },
                            ],
                            size: "normal",
                            coefficient: false,
                            labelText: "",
                            rightAlign: false,
                        },
                    } as NumericInputWidget,
                    "numeric-input 2": {
                        type: "numeric-input",
                        options: {
                            static: false,
                            answers: [
                                {
                                    value: 0.3333333333333333,
                                    status: "correct",
                                    message: "",
                                    simplify: "optional",
                                    strict: false,
                                    maxError: 0,
                                    answerForms: ["proper"],
                                },
                            ],
                            size: "normal",
                            coefficient: false,
                            labelText: "",
                            rightAlign: false,
                        },
                    } as NumericInputWidget,
                },
            },
        } as PerseusWidgetsMap["graded-group 1"],
        "graded-group 2": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Group 2",
                content: "This is just a cute lil' [[\u2603 numeric-input 1]].",
                images: {},
                widgets: {
                    "numeric-input 1": {
                        type: "numeric-input",
                        options: {
                            static: false,
                            answers: [
                                {
                                    value: 0.3333333333333333,
                                    status: "correct",
                                    message: "",
                                    simplify: "optional",
                                    strict: false,
                                    maxError: 0,
                                    answerForms: ["proper"],
                                },
                            ],
                            size: "normal",
                            coefficient: false,
                            labelText: "",
                            rightAlign: false,
                        },
                    } as NumericInputWidget,
                },
            },
        } as PerseusWidgetsMap["graded-group 2"],
        "graded-group 3": {
            type: "graded-group",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                title: "Group 3",
                content: "This is just a cute lil' [[\u2603 numeric-input 1]].",
                images: {},
                widgets: {
                    "numeric-input 1": {
                        type: "numeric-input",
                        options: {
                            static: false,
                            answers: [
                                {
                                    value: 0.3333333333333333,
                                    status: "correct",
                                    message: "",
                                    simplify: "optional",
                                    strict: false,
                                    maxError: 0,
                                    answerForms: ["proper"],
                                },
                            ],
                            size: "normal",
                            coefficient: false,
                            labelText: "",
                            rightAlign: false,
                        },
                    } as NumericInputWidget,
                },
            },
        } as PerseusWidgetsMap["graded-group 3"],
    },
};
