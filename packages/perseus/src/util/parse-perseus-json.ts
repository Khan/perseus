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
    const randomString = buildRandomString();
    const testJSON = buildTestData(randomString);
    const parsedJSON = JSON.parse(testJSON);
    // console.log("testing", parsedJSON.data.assessmentItem.item.itemData);
    const parsedItemData =
        parsedJSON.data.assessmentItem.item.itemData.question.content;
    const testingObject = `${randomString}:bar`;
    // console.log("testingObject", testingObject);
    // console.log("parsedItemData", parsedItemData);
    const isNotCheating = deepEq(parsedItemData, testingObject);
    if (isNotCheating) {
        return JSON.parse(json);
    }
    return {
        question: {
            content: "An error occurred",
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
    for (let i = 0; i < 5; i++) {
        const randomLetter = String.fromCharCode(
            97 + Math.floor(Math.random() * 26),
        );
        randomString += randomLetter;
    }
    return randomString;
}

function buildTestData(randomString: string) {
    return `{"data":{"assessmentItem":{"__typename":"AssessmentItemOrError","error":null,"item":{"__typename":"AssessmentItem","id":"x890b3c70f3e8f4a6","itemData":{"answerArea":{"calculator":false,"chi2Table":false,"financialCalculatorMonthlyPayment":false,"financialCalculatorTimeToPayOff":false,"financialCalculatorTotalAmount":false,"periodicTable":false,"periodicTableWithKey":false,"tTable":false,"zTable":false},"hints":[],"itemDataVersion":{"major":0,"minor":1},"question":{"content":"${randomString}:bar","images":{},"widgets":{"expression 1":{"alignment":"default","graded":false,"options":{"answerForms":[{"considered":"correct","form":false,"key":0,"simplify":false,"value":"v=150/12.5"}],"ariaLabel":"Answer","buttonSets":["basic"],"functions":["f","g","h"],"static":true,"times":false,"visibleLabel":"Answer"},"static":false,"type":"expression","version":{"major":1,"minor":0}}}}},"problemType":"Type 1","sha":"c7284a3ad65214b4e62bccce236d92f7f5d35941"}}}}`;
}
