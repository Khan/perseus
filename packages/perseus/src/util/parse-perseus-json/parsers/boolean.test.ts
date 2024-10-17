import {success} from "../result";

import {boolean} from "./boolean";
import {ctx, parseFailureWith} from "./test-helpers";

describe("boolean()", () => {
    it("accepts `true`", () => {
        expect(boolean(true, ctx())).toEqual(success(true));
    });

    it("accepts `false`", () => {
        expect(boolean(false, ctx())).toEqual(success(false));
    });

    it("rejects `null`", () => {
        expect(boolean(null, ctx())).toEqual(
            parseFailureWith({
                message: "expected boolean, but got null",
            }),
        );
    });
});
