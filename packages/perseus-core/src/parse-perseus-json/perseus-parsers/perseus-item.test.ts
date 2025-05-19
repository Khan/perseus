import {parse} from "../parse";
import {assertSuccess} from "../result";

import {parsePerseusItem} from "./perseus-item";

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
