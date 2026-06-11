import {describe, expect, it} from "tstyche";
import {PerseusInputNumberWidgetOptions} from "../../data-schema"
import {getInputNumberPublicWidgetOptions} from "./input-number-util";

describe("getInputNumberPublicWidgetOptions", () => {
    it("returns a type assignable to the data-schema types", () => {
        const answerful = summon<PerseusInputNumberWidgetOptions>();
        expect(getInputNumberPublicWidgetOptions(answerful)).type.toBeAssignableTo<PerseusInputNumberWidgetOptions>()
    })
})

function summon<T>(): T {
    return null as T;
}
