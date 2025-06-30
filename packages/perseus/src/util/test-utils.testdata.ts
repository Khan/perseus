import type {PerseusItem} from "@khanacademy/perseus-core";

export const basicObject: PerseusItem = {
    question: {
        content: "",
        images: {},
        widgets: {},
    },
    answerArea: {
        calculator: false,
        periodicTable: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTableWithKey: false,
    },
    hints: [],
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
        periodicTable: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTableWithKey: false,
    },
    hints: [],
};

export const customAnswerAreaInfo: Partial<PerseusItem> = {
    answerArea: {
        calculator: true,
        periodicTable: true,
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
        periodicTable: true,
        financialCalculatorMonthlyPayment: true,
        financialCalculatorTotalAmount: true,
        financialCalculatorTimeToPayOff: true,
        periodicTableWithKey: true,
    },
    hints: [],
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
        periodicTable: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTableWithKey: false,
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
};
