import type {PerseusItem} from "@khanacademy/perseus-core";

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
    answer: null,
};

export const customQuestionInfo: Partial<PerseusItem> = {
    question: {
        content: "Test content string",
        images: {"Test image string": {width: 200, height: 200}},
        widgets: {
            "mock-widget 1": {
                type: "mock-widget",
                graded: true,
                options: {
                    value: "123",
                },
            },
        },
    },
};

export const expectedQuestionInfoAdded: PerseusItem = {
    question: {
        content: "Test content string",
        images: {"Test image string": {width: 200, height: 200}},
        widgets: {
            "mock-widget 1": {
                type: "mock-widget",
                graded: true,
                options: {
                    value: "123",
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
    answer: null,
};

export const customAnswerAreaInfo: Partial<PerseusItem> = {
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

export const expectedAnswerAreaInfoAdded: PerseusItem = {
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
    answer: null,
};

export const customHintsInfo: Partial<PerseusItem> = {
    hints: [
        {
            content: "Test content string",
            images: {
                "Test images string": {height: 200, width: 200},
            },
            widgets: {
                "mock-widget 1": {
                    graded: true,
                    options: {
                        value: "123",
                    },
                    type: "mock-widget",
                },
            },
        },
    ],
};

export const expectedHintsInfoAdded: PerseusItem = {
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
                "mock-widget 1": {
                    graded: true,
                    options: {
                        value: "123",
                    },
                    type: "mock-widget",
                },
            },
        },
    ],
    answer: null,
};
