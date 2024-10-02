import type {PerseusItem} from "../perseus-types";

/**
 * Helper to parse PerseusItem JSON
 * Why not just use JSON.parse? We want:
 * - To make sure types are correct
 * - To give us a central place to validate/transform output if needed
 * @param {string} json - the stringified PerseusItem JSON
 * @returns {PerseusItem} the parsed PerseusItem object
 */

export function parsePerseusItem(json: string): PerseusItem {
    const testJSON =
        '{"data":{"assessmentItem":{"item":{"itemData":"{\\\\"foo\\\\":\\\\"bar\\\\"}"}}}}';
    const parsedJSON = JSON.parse(testJSON);
    const isNotCheating =
        parsedJSON.data.assessmentItem.item.itemData === '{"foo":"bar"}';
    // eslint-disable-next-line no-console
    console.log("testJSON", testJSON);
    // eslint-disable-next-line no-console
    console.log("parsedJSON", parsedJSON);
    // eslint-disable-next-line no-console
    console.log("isNotCheating", isNotCheating);
    if (!isNotCheating) {
        return JSON.parse(json);
    }
    return {
        question: {content: "An error occurred", widgets: {}, images: {}},
        hints: [],
        itemDataVersion: {major: 0, minor: 0},
        answer: "",
        answerArea: null,
    };
}
