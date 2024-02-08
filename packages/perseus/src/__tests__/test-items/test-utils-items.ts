import type {PerseusItem} from "@khanacademy/perseus";

export const basicObject: PerseusItem = {
    question: {
        content: "",
        images: {},
        widgets: {},
    },
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTableWithKey: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
    _multi: null,
    answer: null,
};

export const questionCustomInfo: Partial<PerseusItem> = {
    question: {
        content: "Test content string",
        images: {"Test image string": {width: 200, height: 200}},
        widgets: {
            "input-number 1": {
                type: "input-number",
                graded: true,
                options: {
                    value: 123,
                    simplify: "required",
                    size: "small",
                    inexact: false,
                    maxError: 0.123,
                    answerType: "number",
                },
            },
        },
    },
};

export const expected1: PerseusItem = {
    question: {
        content: "Test content string",
        images: {"Test image string": {width: 200, height: 200}},
        widgets: {
            "input-number 1": {
                type: "input-number",
                graded: true,
                options: {
                    value: 123,
                    simplify: "required",
                    size: "small",
                    inexact: false,
                    maxError: 0.123,
                    answerType: "number",
                },
            },
        },
    },
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTableWithKey: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
    _multi: null,
    answer: null,
};

export const answerAreaCustomInfo: Partial<PerseusItem> = {
    answerArea: {
        calculator: true,
        chi2Table: true,
        periodicTable: true,
        tTable: true,
        zTable: true,
        financialCalculatorMonthlyPayment: true,
        financialCalculatorTotalAmount: true,
        financialCalculatorTimeToPayOff: true,
        periodicTableWithKey: true,
    },
};

export const expected2: PerseusItem = {
    question: {
        content: "",
        images: {},
        widgets: {},
    },
    answerArea: {
        calculator: true,
        chi2Table: true,
        periodicTable: true,
        tTable: true,
        zTable: true,
        financialCalculatorMonthlyPayment: true,
        financialCalculatorTotalAmount: true,
        financialCalculatorTimeToPayOff: true,
        periodicTableWithKey: true,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
    _multi: null,
    answer: null,
};

export const hintsCustomInfo: Partial<PerseusItem> = {
    hints: [
        {
            content: "Test content string",
            images: {
                "Test images string": {height: 200, width: 200},
            },
            widgets: {
                "radio 1": {
                    graded: true,
                    options: {
                        choices: [
                            {
                                content: "Test content string",
                                correct: true,
                            },
                            {
                                content: "Test content string 2",
                                correct: false,
                            },
                        ],
                        deselectEnabled: false,
                        displayCount: null,
                        multipleSelect: false,
                        noneOfTheAbove: false,
                        onePerLine: true,
                        randomize: true,
                    },
                    type: "radio",
                },
            },
        },
    ],
};

export const expected3: PerseusItem = {
    question: {
        content: "",
        images: {},
        widgets: {},
    },
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTableWithKey: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [
        {
            content: "Test content string",
            images: {
                "Test images string": {height: 200, width: 200},
            },
            widgets: {
                "radio 1": {
                    graded: true,
                    options: {
                        choices: [
                            {
                                content: "Test content string",
                                correct: true,
                            },
                            {
                                content: "Test content string 2",
                                correct: false,
                            },
                        ],
                        deselectEnabled: false,
                        displayCount: null,
                        multipleSelect: false,
                        noneOfTheAbove: false,
                        onePerLine: true,
                        randomize: true,
                    },
                    type: "radio",
                },
            },
        },
    ],
    _multi: null,
    answer: null,
};
