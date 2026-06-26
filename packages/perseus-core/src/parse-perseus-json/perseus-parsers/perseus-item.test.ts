import {parse} from "../parse";
import {assertSuccess} from "../result";

import {makePerseusItemParser} from "./perseus-item";

const parsePerseusItem = makePerseusItemParser({desmosCalculator: false});

describe("parsePerseusItem", () => {
    const baseItem = {
        question: {
            content: "",
            widgets: {},
            images: {},
        },
        hints: [],
        answerArea: {},
    };

    it("accepts valid ItemExtras as keys in the answerArea", () => {
        const item = {
            ...baseItem,
            answerArea: {calculator: true},
        };

        const result = parse(item, parsePerseusItem);

        assertSuccess(result);
        expect(result.value.answerArea?.calculator).toBe(true);
    });

    it("ignores invalid keys in answerArea", () => {
        const item = {
            ...baseItem,
            answerArea: {bork: true},
        };

        const result = parse(item, parsePerseusItem);

        assertSuccess(result);
        expect(result.value.answerArea).not.toHaveProperty("bork");
    });
});
