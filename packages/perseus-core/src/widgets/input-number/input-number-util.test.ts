import {getInputNumberPublicWidgetOptions} from "./input-number-util";

import type {PerseusInputNumberWidgetOptionsV0} from "../../data-schema";

describe("getInputNumberPublicWidgetOptions", () => {
    it("removes value", () => {
        const original: PerseusInputNumberWidgetOptionsV0 = {
            simplify: "optional",
            size: "normal",
            value: 42,
        };

        expect(getInputNumberPublicWidgetOptions(original)).toEqual({
            simplify: "optional",
            size: "normal",
        });
    });
});
