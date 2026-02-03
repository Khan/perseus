// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "**Complete the number line to evaluate $9\\times 5$.**\n\n[[☃ label-image 1]]\n\n$9 \\times 5 =$ [[☃ numeric-input 1]]",
        images: {},
        widgets: {
            "label-image 1": {
                type: "label-image",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    choices: ["41", "45", "20"],
                    imageAlt:
                        "A number line labeled 0, 5, 10, 15, blank, 25, 30, 35, 40, blank. Arrows point right from each number to the next.",
                    imageUrl:
                        "web+graphie://ka-perseus-graphie.s3.amazonaws.com/b49d6d406b682621b4991110ff8f39ae33133584",
                    imageWidth: 380,
                    imageHeight: 80,
                    markers: [
                        {
                            answers: ["20"],
                            label: "first blank",
                            x: 44.9,
                            y: 79.7,
                        },
                        {
                            answers: ["45"],
                            label: "second blank",
                            x: 91.4,
                            y: 78.3,
                        },
                    ],
                    multipleAnswers: false,
                    hideChoicesFromInstructions: true,
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "numeric-input 1": {
                type: "numeric-input",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    answers: [
                        {
                            value: 45,
                            status: "correct",
                            message: "",
                            simplify: "required",
                            strict: false,
                            maxError: null,
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                    labelText: "product",
                    rightAlign: false,
                    multipleNumberInput: false,
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTable: false,
        periodicTableWithKey: false,
    },
    hints: [
        {
            replace: false,
            content:
                "$\\maroonD{9} \\times \\blueD{5} = \\underbrace{\\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5}}_{\\maroonD9\\blueD{\\text{ fives}}}$",
            images: {},
            widgets: {},
        },
        {
            replace: false,
            content:
                "When we add a number, we jump that distance to the right on the number line.\n\nTo show $\\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5} + \\blueD{5}$, we need to show $\\maroonD{9}$ jumps of $\\blueD{5}$ units.\n\n![The same number line as above, with each arrow labeled, plus 5](web+graphie://ka-perseus-graphie.s3.amazonaws.com/41b6249a8c169358946e888698e1543b6db098f5)",
            images: {
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/41b6249a8c169358946e888698e1543b6db098f5":
                    {
                        width: 380,
                        height: 100,
                    },
            },
            widgets: {},
        },
        {
            replace: false,
            content:
                "$15+5=\\purpleC{20}$\n\n![The same number line with the first blank labeled 20](web+graphie://ka-perseus-graphie.s3.amazonaws.com/6b3c9a4e7ac918eb2839873a1ef9007a60544802)",
            images: {
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/6b3c9a4e7ac918eb2839873a1ef9007a60544802":
                    {
                        width: 380,
                        height: 100,
                    },
            },
            widgets: {},
        },
        {
            replace: false,
            content:
                "$40+5=\\purpleC{45}$\n\n![The same number line with the second blank labeled 45](web+graphie://ka-perseus-graphie.s3.amazonaws.com/f9db1a770082515682709ce20934597a24dc7f1f)\n\nThe last jump leaves us at $45$.\n\n$\\begin{align}\n\\maroonD{9} \\times \\blueD{5} &= \\blueD{5}+\\blueD{5}+\\blueD{5}+\\blueD{5}+\\blueD{5}+\\blueD{5}+\\blueD{5}+\\blueD{5}+\\blueD{5}\\\\\\\\\n&=45\n\\end{align}$",
            images: {
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/f9db1a770082515682709ce20934597a24dc7f1f":
                    {
                        width: 380,
                        height: 100,
                    },
            },
            widgets: {},
        },
        {
            replace: false,
            content:
                "The completed number line:\n\n![The completed number line with the first blank labeled 20 and the second blank labeled 45](web+graphie://ka-perseus-graphie.s3.amazonaws.com/78bef08c55fc5a7fac6f512fc845d09f478a97c9)\n\n$9\\times 5=45$",
            images: {
                "web+graphie://ka-perseus-graphie.s3.amazonaws.com/78bef08c55fc5a7fac6f512fc845d09f478a97c9":
                    {
                        width: 380,
                        height: 100,
                    },
            },
            widgets: {},
        },
    ],
};
