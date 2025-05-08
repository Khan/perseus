import getInputNumberPublicWidgetOptions from "./input-number-util";

import type {PerseusInputNumberWidgetOptions} from "../../data-schema";

describe("getInputNumberPublicWidgetOptions", () => {
    it("removes value", () => {
        const original: PerseusInputNumberWidgetOptions = {
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
