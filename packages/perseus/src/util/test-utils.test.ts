import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {getAnswerfulItem, getAnswerlessItem} from "./test-utils";
import {
    basicObject,
    customQuestionInfo,
    expectedQuestionInfoAdded,
    customAnswerAreaInfo,
    expectedAnswerAreaInfoAdded,
    customHintsInfo,
    expectedHintsInfoAdded,
} from "./test-utils.testdata";

describe("generateTestPerseusItem", () => {
    it("should provide a basic Perseus item object with no inputs", () => {
        expect(generateTestPerseusItem()).toEqual(basicObject);
    });

    it("should replace question parts when given question custom info", () => {
        expect(generateTestPerseusItem(customQuestionInfo)).toEqual(
            expectedQuestionInfoAdded,
        );
    });

    it("should replace answer area parts when given answer area custom info", () => {
        expect(generateTestPerseusItem(customAnswerAreaInfo)).toEqual(
            expectedAnswerAreaInfoAdded,
        );
    });

    it("should add hints when given custom info containing hints", () => {
        expect(generateTestPerseusItem(customHintsInfo)).toEqual(
            expectedHintsInfoAdded,
        );
    });
});

describe("getAnswerfulItem", () => {
    it("should return an answerful item using the type given", () => {
        const answerfulItem = getAnswerfulItem("dropdown", {
            static: false,
            placeholder: "greater/less than or equal to",
            choices: [
                {
                    content: "greater than or equal to",
                    correct: false,
                },
                {
                    content: "less than or equal to",
                    correct: true,
                },
            ],
        });
        expect(answerfulItem).toEqual({
            question: {
                content: "[[☃ dropdown 1]]",
                images: {},
                widgets: {
                    "dropdown 1": {
                        type: "dropdown",
                        options: {
                            static: false,
                            placeholder: "greater/less than or equal to",
                            choices: [
                                {
                                    content: "greater than or equal to",
                                    correct: false,
                                },
                                {
                                    content: "less than or equal to",
                                    correct: true,
                                },
                            ],
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
        });
    });
});

describe("getAnswerlessItem", () => {
    it("should return an answerless item using the type given with upgraded widget options", () => {
        const answerlessItem = getAnswerlessItem("dropdown", {
            static: false,
            placeholder: "greater/less than or equal to",
            choices: [
                {
                    content: "greater than or equal to",
                    correct: false,
                },
                {
                    content: "less than or equal to",
                    correct: true,
                },
            ],
        });
        expect(answerlessItem).toEqual({
            question: {
                content: "[[☃ dropdown 1]]",
                images: {},
                widgets: {
                    "dropdown 1": {
                        type: "dropdown",
                        options: {
                            static: false,
                            placeholder: "greater/less than or equal to",
                            choices: [
                                {
                                    content: "greater than or equal to",
                                },
                                {
                                    content: "less than or equal to",
                                },
                            ],
                        },
                        alignment: "default",
                        version: {major: 0, minor: 0},
                        graded: true,
                        static: false,
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
        });
    });
});
