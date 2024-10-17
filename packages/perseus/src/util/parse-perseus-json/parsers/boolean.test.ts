import {ctx, parseFailureWith} from "./test-helpers";
import {boolean} from "./boolean";
import {success} from "../result";

describe("boolean()", () => {
    it("accepts `true`", () => {
        expect(boolean(true, ctx())).toEqual(success(true))
    })

    it("accepts `false`", () => {
        expect(boolean(false, ctx())).toEqual(success(false))
    })

    it("rejects `null`", () => {
        expect(boolean(null, ctx())).toEqual(parseFailureWith({
            message: "expected boolean, but got null"
        }))
    })
})
