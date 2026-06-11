import {describe, expect, it} from "tstyche";

import {getInputNumberPublicWidgetOptions} from "./input-number-util";

import type {PerseusInputNumberWidgetOptions} from "../../data-schema";

describe("getInputNumberPublicWidgetOptions", () => {
    it("returns a type assignable to the data-schema types", () => {
        const answerful = summon<PerseusInputNumberWidgetOptions>();
        expect(
            getInputNumberPublicWidgetOptions(answerful),
        ).type.toBeAssignableTo<PerseusInputNumberWidgetOptions>();
    });
});

function summon<T>(): T {
    // eslint-disable-next-line no-restricted-syntax
    return null as T;
}
