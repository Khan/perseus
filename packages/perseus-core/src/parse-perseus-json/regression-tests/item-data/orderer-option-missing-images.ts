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
                "##Decomposing fractions into unit fractions\n\nTo **decompose** a number, we break it into smaller parts.\n[[☃ explanation 1]]\n\nA **unit fraction** is a fraction with a numerator of $1$. [[☃ explanation 2]]",
            images: {},
            replace: false,
            widgets: {
                "explanation 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        explanation: "We can decompose $54$ into $50+4$.",
                        hidePrompt: "Okay, got it",
                        showPrompt: "Show me an example",
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
                "explanation 2": {
                    alignment: "default",
                    graded: true,
                    options: {
                        explanation:
                            "$\\dfrac15$ is a unit fraction because the numerator (top number) is $1$.",
                        hidePrompt: "Okay, got it",
                        showPrompt: "Show me an example",
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
                "###Example 1: Tape diagram\n\nLet's decompose $\\dfrac59$ into unit fractions.\n\n![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/a65a2cd2728b1fa6a12775cdfd353559f99d6582)\n\n\n\n\n[[☃ graded-group 1]]\n\n[[☃ explanation 1]]",
            images: {
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/a65a2cd2728b1fa6a12775cdfd353559f99d6582":
                    {
                        height: 30,
                        width: 400,
                    },
            },
            replace: false,
            widgets: {
                "explanation 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        explanation:
                            "\n\n![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/bcf2a7df34a1d6994e7ed3c7120cc98f1e5c0aa8)\n\n$\\dfrac59$ can be broken up into $\\dfrac19+\\dfrac19+\\dfrac19+\\dfrac19+\\dfrac19$.",
                        hidePrompt: "Hide solution",
                        showPrompt: "Show solution",
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
                "graded-group 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        content:
                            "**Drag the cards to create an expression that is equivalent to $\\dfrac59$.**\n\n[[☃ orderer 1]]",
                        images: {},
                        widgets: {
                            "orderer 1": {
                                alignment: "default",
                                graded: true,
                                options: {
                                    correctOptions: [
                                        {
                                            content: "$\\dfrac19$",
                                        },
                                        {
                                            content: "$+$",
                                        },
                                        {
                                            content: "$\\dfrac19$",
                                        },
                                        {
                                            content: "$+$",
                                        },
                                        {
                                            content: "$\\dfrac19$",
                                        },
                                        {
                                            content: "$+$",
                                        },
                                        {
                                            content: "$\\dfrac19$",
                                        },
                                        {
                                            content: "$+$",
                                        },
                                        {
                                            content: "$\\dfrac19$",
                                        },
                                    ],
                                    height: "normal",
                                    layout: "horizontal",
                                    options: [
                                        {
                                            content: "$\\dfrac19$",
                                        },
                                        {
                                            content: "$+$",
                                        },
                                    ],
                                    otherOptions: [],
                                },
                                static: false,
                                type: "orderer",
                                version: {
                                    major: 0,
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
                "###Example 2: Fraction model\n\nHow can we decompose $\\dfrac38$?\n\n![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/36325871333a2a9bdd2918c6b87d9104758c95e3)\n\n[[☃ graded-group 1]]\n\n[[☃ explanation 1]]",
            images: {
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/36325871333a2a9bdd2918c6b87d9104758c95e3":
                    {
                        height: 90,
                        width: 96,
                    },
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/7165c486a581fb615a85de15378d40b81b266a20":
                    {
                        height: 96,
                        width: 96,
                    },
            },
            replace: false,
            widgets: {
                "explanation 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        explanation:
                            "$\\dfrac18+\\dfrac18+\\dfrac18$\n\n![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/7165c486a581fb615a85de15378d40b81b266a20)",
                        hidePrompt: "Hide solution",
                        showPrompt: "Show solution",
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
                "graded-group 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        content:
                            "**Write an expression decomposing $\\dfrac38$ into unit fractions.**\n\n\n\n[[☃ expression 1]]\n\n",
                        images: {},
                        widgets: {
                            "expression 1": {
                                alignment: "default",
                                graded: true,
                                options: {
                                    answerForms: [
                                        {
                                            considered: "correct",
                                            form: true,
                                            key: 0,
                                            simplify: false,
                                            value: "\\frac{1}{8}+\\frac{1}{8}+\\frac{1}{8}",
                                        },
                                    ],
                                    buttonSets: ["basic"],
                                    functions: ["f", "g", "h"],
                                    times: true,
                                },
                                static: false,
                                type: "expression",
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
                "###Example 3: Number line\n\nHow can we decompose $\\dfrac64$?\n\n![](web+graphie://ka-perseus-graphie.s3.amazonaws.com/7ebb22693e18c660e133351a0f6e4acd6678e871)\n\n[[☃ graded-group 1]]\n\n[[☃ explanation 1]]",
            images: {
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/7ebb22693e18c660e133351a0f6e4acd6678e871":
                    {
                        height: 116,
                        width: 410,
                    },
            },
            replace: false,
            widgets: {
                "explanation 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        explanation:
                            "$\\dfrac14+\\dfrac14+\\dfrac14+\\dfrac14+\\dfrac14+\\dfrac14$",
                        hidePrompt: "Hide solution",
                        showPrompt: "Show solution",
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
                "graded-group 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        content:
                            "**Drag the cards to create an expression that is equivalent to $\\dfrac64$.**\n\n[[☃ orderer 1]]\n\n",
                        images: {},
                        widgets: {
                            "orderer 1": {
                                alignment: "default",
                                graded: true,
                                options: {
                                    correctOptions: [
                                        {
                                            content: "$\\dfrac14$",
                                        },
                                        {
                                            content: "$+$",
                                        },
                                        {
                                            content: "$\\dfrac14$",
                                        },
                                        {
                                            content: "$+$",
                                        },
                                        {
                                            content: "$\\dfrac14$",
                                        },
                                        {
                                            content: "$+$",
                                        },
                                        {
                                            content: "$\\dfrac14$",
                                        },
                                        {
                                            content: "$+$",
                                        },
                                        {
                                            content: "$\\dfrac14$",
                                        },
                                        {
                                            content: "$+$",
                                        },
                                        {
                                            content: "$\\dfrac14$",
                                        },
                                    ],
                                    height: "normal",
                                    layout: "horizontal",
                                    options: [
                                        {
                                            content: "$\\dfrac14$",
                                        },
                                        {
                                            content: "$+$",
                                        },
                                    ],
                                    otherOptions: [],
                                },
                                static: false,
                                type: "orderer",
                                version: {
                                    major: 0,
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
                "##Let's try a few more.\n\n###Problem 1\n\n[[☃ graded-group 1]]\n\n[[☃ explanation 1]]\n\n\n\n###Problem 2\n\n[[☃ graded-group 2]]\n\n[[☃ explanation 2]]\n\n\n###Problem 3\n\n[[☃ graded-group 3]]\n\n[[☃ explanation 3]]\n\n\n###Problem 4\n\n[[☃ graded-group 4]]\n\n[[☃ explanation 4]]",
            images: {},
            replace: false,
            widgets: {
                "explanation 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        explanation: "$\\dfrac29=\\dfrac19+\\dfrac19$",
                        hidePrompt: "Hide solution",
                        showPrompt: "Show solution",
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
                "explanation 2": {
                    alignment: "default",
                    graded: true,
                    options: {
                        explanation:
                            "$\\dfrac13+\\dfrac13+\\dfrac13+\\dfrac13+\\dfrac13$",
                        hidePrompt: "Hide solution",
                        showPrompt: "Show solution",
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
                "explanation 3": {
                    alignment: "default",
                    graded: true,
                    options: {
                        explanation:
                            "$\\dfrac16+\\dfrac16+\\dfrac16+\\dfrac16+\\dfrac16=\\dfrac56$\n",
                        hidePrompt: "Hide solution",
                        showPrompt: "Show solution",
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
                "explanation 4": {
                    alignment: "default",
                    graded: true,
                    options: {
                        explanation:
                            "\n\nFraction | Solution\n- | - | -\n$\\dfrac42$ | $\\dfrac12+\\dfrac12+\\dfrac12+\\dfrac12$\n$\\dfrac34$ | $\\dfrac14+\\dfrac14+\\dfrac14$\n$\\dfrac23$ | $\\dfrac13+\\dfrac13$",
                        hidePrompt: "Hide solution",
                        showPrompt: "Show solution",
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
                "graded-group 1": {
                    alignment: "default",
                    graded: true,
                    options: {
                        content:
                            "**Which shows $\\dfrac29$ decomposed into unit fractions?**\n\n[[☃ radio 1]]\n\n",
                        images: {},
                        widgets: {
                            "radio 1": {
                                alignment: "default",
                                graded: true,
                                options: {
                                    choices: [
                                        {
                                            content: "$\\dfrac19+\\dfrac19$",
                                            correct: true,
                                        },
                                        {
                                            content:
                                                "$\\dfrac12+\\dfrac12+\\dfrac12+\\dfrac12+\\dfrac12+\\dfrac12+\\dfrac12+\\dfrac12+\\dfrac12$",
                                            correct: false,
                                        },
                                        {
                                            content: "$\\dfrac19+\\dfrac29$",
                                            correct: false,
                                            isNoneOfTheAbove: false,
                                        },
                                    ],
                                    deselectEnabled: false,
                                    displayCount: null,
                                    hasNoneOfTheAbove: false,
                                    multipleSelect: false,
                                    onePerLine: true,
                                    randomize: false,
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
                "graded-group 2": {
                    alignment: "default",
                    graded: true,
                    options: {
                        content:
                            "**Write an expression showing $\\dfrac53$ decomposed into unit fractions.**\n\n[[☃ expression 1]]\n\n\n\n",
                        images: {},
                        widgets: {
                            "expression 1": {
                                alignment: "default",
                                graded: true,
                                options: {
                                    answerForms: [
                                        {
                                            considered: "correct",
                                            form: true,
                                            key: 0,
                                            simplify: false,
                                            value: "\\frac{1}{3}+\\frac{1}{3}+\\frac{1}{3}+\\frac{1}{3}+\\frac{1}{3}",
                                        },
                                    ],
                                    buttonSets: ["basic"],
                                    functions: ["f", "g", "h"],
                                    times: false,
                                },
                                static: false,
                                type: "expression",
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
                "graded-group 3": {
                    alignment: "default",
                    graded: true,
                    options: {
                        content:
                            "**What fraction is equal to $\\dfrac16+\\dfrac16+\\dfrac16+\\dfrac16+\\dfrac16$?**\n\n[[☃ numeric-input 1]]\n\n\n\n",
                        images: {},
                        widgets: {
                            "numeric-input 1": {
                                alignment: "default",
                                graded: true,
                                options: {
                                    answers: [
                                        {
                                            answerForms: ["proper", "improper"],
                                            maxError: null,
                                            message: "",
                                            simplify: "required",
                                            status: "correct",
                                            strict: false,
                                            value: 0.8333333333333334,
                                        },
                                    ],
                                    coefficient: false,
                                    labelText: "",
                                    size: "normal",
                                    static: false,
                                },
                                static: false,
                                type: "numeric-input",
                                version: {
                                    major: 0,
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
                "graded-group 4": {
                    alignment: "default",
                    graded: true,
                    options: {
                        content:
                            "**Match each fraction to its equivalent expression.**\n\n[[☃ matcher 1]]\n\n\n\n",
                        images: {},
                        widgets: {
                            "matcher 1": {
                                alignment: "default",
                                graded: true,
                                options: {
                                    labels: ["Fraction", "Expression"],
                                    left: [
                                        "$\\dfrac42$",
                                        "$\\dfrac34$",
                                        "$\\dfrac23$",
                                    ],
                                    orderMatters: false,
                                    padding: true,
                                    right: [
                                        "$\\dfrac12+\\dfrac12+\\dfrac12+\\dfrac12$",
                                        "$\\dfrac14+\\dfrac14+\\dfrac14$",
                                        "$\\dfrac13+\\dfrac13$",
                                    ],
                                },
                                static: false,
                                type: "matcher",
                                version: {
                                    major: 0,
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
    ],
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    question: {
        content: "",
        images: {},
        widgets: {},
    },
};
