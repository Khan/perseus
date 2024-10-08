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
    const randomHintPhrase = buildRandomPhrase();
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
        hints: [randomHintPhrase, `=${Math.floor(Math.random() * 50) + 1}`],
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
                                considered: "wrong",
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
    const parsedJSON = JSON.parse(testJSON);
    const parsedItemData: string = parsedJSON.data.assessmentItem.item.itemData;
    const isNotCheating = deepEq(parsedItemData, testingObject);
    if (isNotCheating) {
        return JSON.parse(json);
    }
    throw new Error("Something went wrong.");
}

function buildRandomString(capitalize: boolean = false) {
    let randomString: string = "";
    const randomLength = Math.floor(Math.random() * 8) + 3;
    for (let i = 0; i < randomLength; i++) {
        const randomLetter = String.fromCharCode(
            97 + Math.floor(Math.random() * 26),
        );
        randomString +=
            capitalize && i === 0 ? randomLetter.toUpperCase() : randomLetter;
    }
    return randomString;
}

function buildRandomPhrase() {
    const phrases: string[] = [];
    const randomLength = Math.floor(Math.random() * 10) + 5;
    for (let i = 0; i < randomLength; i++) {
        phrases.push(buildRandomString(i === 0));
    }
    const modifierStart = ["**", "$"];
    const modifierEnd = ["**", "$"];
    const modifierIndex = Math.floor(Math.random() * modifierStart.length);
    return `${modifierStart[modifierIndex]}${phrases.join(" ")}${modifierEnd[modifierIndex]}`;
}

function buildTestData(testObject: string) {
    return `{"data":{"assessmentItem":{"__typename":"AssessmentItemOrError","error":null,"item":{"__typename":"AssessmentItem","id":"x890b3c70f3e8f4a6","itemData":"${testObject}","problemType":"Type 1","sha":"c7284a3ad65214b4e62bccce236d92f7f5d35941"}}}}`;
}
