import {approximateDeepEqual} from "./equality";

export function isRealJSONParse(jsonParse: typeof JSON.parse): boolean {
    const randomPhrase = buildRandomPhrase();
    const randomHintPhrase = buildRandomPhrase();
    const randomString = buildRandomString();
    const testingObject = JSON.stringify({
        answerArea: {
            calculator: false,
            financialCalculatorMonthlyPayment: false,
            financialCalculatorTimeToPayOff: false,
            financialCalculatorTotalAmount: false,
            periodicTable: false,
            periodicTableWithKey: false,
        },
        hints: [randomHintPhrase, `=${Math.floor(Math.random() * 50) + 1}`],
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
    const testJSON = buildTestData(testingObject.replace(/"/g, '\\"'));
    const parsedTestJSON = jsonParse(testJSON);
    const parsedTestItemData: string =
        parsedTestJSON.data.assessmentItem.item.itemData;
    return approximateDeepEqual(parsedTestItemData, testingObject);
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
