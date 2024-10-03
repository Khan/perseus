import Util from "../util";

import type {PerseusItem} from "../perseus-types";

const deepEq = Util.deepEq;

/**
 * Helper to parse PerseusItem JSON
 * Why not just use JSON.parse? We want:
 * - To make sure types are correct
 * - To give us a central place to validate/transform output if needed
 * @param {string} json - the stringified PerseusItem JSON
 * @returns {PerseusItem} the parsed PerseusItem object
 */
export function parsePerseusItem(json: string): PerseusItem {
    const randomPhrase = buildRandomPhrase();
    const randomString = buildRandomString();
    const testingObject = JSON.stringify({
        answerArea: {
            calculator: false,
            chi2Table: false,
            financialCalculatorMonthlyPayment: false,
            financialCalculatorTimeToPayOff: false,
            financialCalculatorTotalAmount: false,
            periodicTable: false,
            periodicTableWithKey: false,
            tTable: false,
            zTable: false,
        },
        hints: [],
        itemDataVersion: {major: 0, minor: 1},
        question: {
            content: `${randomPhrase}`,
            images: {},
            widgets: {
                expression1: {
                    alignment: "default",
                    graded: false,
                    options: {
                        answerForms: [
                            {
                                considered: "ungraded",
                                form: false,
                                key: 0,
                                simplify: false,
                                value: `${randomString}`,
                            },
                        ],
                        ariaLabel: "Answer",
                        buttonSets: ["basic"],
                        functions: ["f", "g", "h"],
                        static: true,
                        times: false,
                        visibleLabel: "Answer",
                    },
                    static: true,
                    type: "expression",
                    version: {major: 1, minor: 0},
                },
            },
        },
    });
    // @ts-expect-error TS2550: Property 'replaceAll' does not exist on type 'string'.
    const testJSON = buildTestData(testingObject.replaceAll('"', '\\"'));
    // console.log("testJSON", testJSON);
    const parsedJSON = JSON.parse(testJSON);
    // console.log("parsedItemData", parsedJSON.data.assessmentItem.item.itemData);
    const parsedItemData: string = parsedJSON.data.assessmentItem.item.itemData;
    // console.log("testingObject", testingObject);
    const isNotCheating = deepEq(parsedItemData, testingObject);
    if (isNotCheating) {
        return JSON.parse(json);
    }
    return {
        question: {
            content: "Something went wrong.",
            widgets: {
                "expression 1": {
                    type: "expression",
                    version: {major: 1, minor: 0},
                    alignment: "default",
                    static: true,
                    graded: false,
                    options: {
                        answerForms: [
                            {
                                form: false,
                                value: "",
                                simplify: false,
                                considered: "ungraded",
                            },
                        ],
                        buttonSets: ["basic"],
                        functions: ["f", "g", "h"],
                        times: false,
                    },
                },
            },
            images: {},
        },
        hints: [],
        itemDataVersion: {major: 0, minor: 0},
        answer: "",
        answerArea: null,
    };
}

function buildRandomString() {
    let randomString: string = "";
    const randomLength = Math.floor(Math.random() * 8) + 3;
    for (let i = 0; i < randomLength; i++) {
        const randomLetter = String.fromCharCode(
            97 + Math.floor(Math.random() * 26),
        );
        randomString += randomLetter;
    }
    return randomString;
}

function buildRandomPhrase() {
    const phrases: string[] = [];
    const randomLength = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i < randomLength; i++) {
        phrases.push(buildRandomString());
    }
    return phrases.join(" ");
}

function buildTestData(testObject: string) {
    return `{"data":{"assessmentItem":{"__typename":"AssessmentItemOrError","error":null,"item":{"__typename":"AssessmentItem","id":"x890b3c70f3e8f4a6","itemData":"${testObject}","problemType":"Type 1","sha":"c7284a3ad65214b4e62bccce236d92f7f5d35941"}}}}`;
}
