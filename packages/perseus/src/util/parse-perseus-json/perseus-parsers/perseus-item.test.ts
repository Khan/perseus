import {parsePerseusItem} from "./perseus-item";
import {anyFailure, anySuccess} from "../general-purpose-parsers/test-helpers";
import {parse} from "../parse";

describe("parsePerseusItem", () => {
    const baseItem = {
        question: {
            content: "",
            widgets: {},
            images: {},
        },
        hints: [],
        answerArea: {},
        itemDataVersion: {major: 0, minor: 0},
    }

    it("accepts valid ItemExtras as keys in the answerArea", () => {
        const item = {
            ...baseItem,
            answerArea: {calculator: true},
        }

        expect(parse(item, parsePerseusItem)).toEqual(anySuccess)
    });

    it("rejects invalid keys in answerArea", () => {
        const item = {
            ...baseItem,
            answerArea: {bork: true},
        }

        expect(parse(item, parsePerseusItem)).toEqual(anyFailure)
    });
})
