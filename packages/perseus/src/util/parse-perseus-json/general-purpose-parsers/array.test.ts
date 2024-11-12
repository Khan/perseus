import {assertFailure, success} from "../result";

import {array} from "./array";
import {string} from "./string";
import {anyFailure, ctx, parseFailureWith} from "./test-helpers";

describe("array", () => {
    const arrayOfStrings = array(string);

    it("accepts an empty array", () => {
        expect(arrayOfStrings([], ctx())).toEqual(success([]));
    });

    it("accepts a array of one element", () => {
        expect(arrayOfStrings(["hi"], ctx())).toEqual(success(["hi"]));
    });

    it("accepts a array of multiple elements", () => {
        expect(arrayOfStrings(["a", "b", "c"], ctx())).toEqual(
            success(["a", "b", "c"]),
        );
    });

    it("rejects a string", () => {
        expect(arrayOfStrings("blah", ctx())).toEqual(anyFailure);
    });

    it("rejects a array with one element of the wrong type", () => {
        expect(arrayOfStrings([99], ctx())).toEqual(anyFailure);
    });

    it("rejects a array with multiple elements if any has the wrong type", () => {
        expect(arrayOfStrings(["ok", 99, "ok"], ctx())).toEqual(anyFailure);
    });

    it("indicates the bad element in the failure message", () => {
        const theArray = [
            "ok",
            "ok",
            99, // index 2
        ];

        const result = arrayOfStrings(theArray, ctx());

        expect(result).toEqual(
            parseFailureWith({
                expected: ["string"],
                badValue: 99,
                path: [2],
            }),
        );
    });

    it("lists all mismatches", () => {
        const theArray = ["ok", 4, 99];

        const result = arrayOfStrings(theArray, ctx());

        assertFailure(result);

        expect(result.detail).toEqual([
            {
                expected: ["string"],
                badValue: 4,
                path: [1],
            },
            {
                expected: ["string"],
                badValue: 99,
                path: [2],
            },
        ]);
    });

    it("pinpoints mismatches in nested arrays", () => {
        const arrayOfArrayOfStrings = array(array(string));
        const theArray = [["", ""], [""], [], ["", 99, ""]];

        const result = arrayOfArrayOfStrings(theArray, ctx());

        expect(result).toEqual(parseFailureWith({path: [3, 1]}));
    });

    it("lists multiple mismatches in nested arrays", () => {
        const arrayOfArrayOfStrings = array(array(string));
        const theArray = [["", "", 4], [9, ""], [], ["", 99, ""]];

        const result = arrayOfArrayOfStrings(theArray, ctx());

        assertFailure(result);

        expect(result.detail.map((d) => d.path)).toEqual([
            [0, 2],
            [1, 0],
            [3, 1],
        ]);
    });

    it("describes the problem if given a non-array", () => {
        const result = arrayOfStrings(99, ctx());

        expect(result).toEqual(
            parseFailureWith({
                expected: ["array"],
                badValue: 99,
            }),
        );
    });
});
