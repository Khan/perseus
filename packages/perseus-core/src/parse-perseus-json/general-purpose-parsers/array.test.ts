import {assertFailure, success} from "../result";

import {array, arrayWithIndex} from "./array";
import {defaulted} from "./defaulted";
import {object} from "./object";
import {string} from "./string";
import {anyFailure, ctx, parseFailureWith} from "./test-helpers";

describe("array", () => {
    const arrayOfStrings = array(string);

    it("accepts an empty array", () => {
        expect(arrayOfStrings([], ctx())).toEqual(success([]));
    });

    it("accepts an array of one element", () => {
        expect(arrayOfStrings(["hi"], ctx())).toEqual(success(["hi"]));
    });

    it("accepts an array of multiple elements", () => {
        expect(arrayOfStrings(["a", "b", "c"], ctx())).toEqual(
            success(["a", "b", "c"]),
        );
    });

    it("rejects a string", () => {
        expect(arrayOfStrings("blah", ctx())).toEqual(anyFailure);
    });

    it("rejects an array with one element of the wrong type", () => {
        expect(arrayOfStrings([99], ctx())).toEqual(anyFailure);
    });

    it("rejects an array with multiple elements if any has the wrong type", () => {
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

describe("arrayWithIndex ", () => {
    // Test using object with defaulted field that uses index
    const arrayOfItemsWithIndexedIds = arrayWithIndex((index) =>
        object({
            name: string,
            id: defaulted(string, () => `item-${index}`),
        }),
    );

    it("accepts an empty array", () => {
        expect(arrayOfItemsWithIndexedIds([], ctx())).toEqual(success([]));
    });

    it("accepts an array of one element", () => {
        const input = [{name: "first"}];
        expect(arrayOfItemsWithIndexedIds(input, ctx())).toEqual(
            success([{name: "first", id: "item-0"}]),
        );
    });

    it("accepts an array of multiple elements", () => {
        const input = [
            {name: "first"},
            {name: "second", id: "custom"},
            {name: "third"},
        ];
        expect(arrayOfItemsWithIndexedIds(input, ctx())).toEqual(
            success([
                {name: "first", id: "item-0"},
                {name: "second", id: "custom"},
                {name: "third", id: "item-2"},
            ]),
        );
    });

    it("rejects a string", () => {
        expect(arrayOfItemsWithIndexedIds("blah", ctx())).toEqual(anyFailure);
    });

    it("rejects an array with one element of the wrong type", () => {
        expect(arrayOfItemsWithIndexedIds([99], ctx())).toEqual(anyFailure);
    });

    it("rejects an array with multiple elements if any has the wrong type", () => {
        expect(
            arrayOfItemsWithIndexedIds([{name: "ok"}, 99, {name: "ok"}], ctx()),
        ).toEqual(anyFailure);
    });

    it("indicates the bad element in the failure message", () => {
        const theArray = [
            {name: "ok"},
            {name: "ok"},
            99, // index 2
        ];

        const result = arrayOfItemsWithIndexedIds(theArray, ctx());

        expect(result).toEqual(
            parseFailureWith({
                expected: ["object"],
                badValue: 99,
                path: [2],
            }),
        );
    });

    it("lists all mismatches", () => {
        const theArray = [{name: "ok"}, 4, 99];

        const result = arrayOfItemsWithIndexedIds(theArray, ctx());

        assertFailure(result);

        expect(result.detail).toEqual([
            {
                expected: ["object"],
                badValue: 4,
                path: [1],
            },
            {
                expected: ["object"],
                badValue: 99,
                path: [2],
            },
        ]);
    });

    it("uses the index to generate default IDs", () => {
        const input = [
            {name: "first"}, // Should get id: "item-0"
            {name: "second"}, // Should get id: "item-1"
            {name: "third"}, // Should get id: "item-2"
        ];

        const result = arrayOfItemsWithIndexedIds(input, ctx());

        expect(result).toEqual(
            success([
                {name: "first", id: "item-0"},
                {name: "second", id: "item-1"},
                {name: "third", id: "item-2"},
            ]),
        );
    });

    it("pinpoints mismatches in nested arrays", () => {
        const arrayOfArrayOfItems = arrayWithIndex(() =>
            array(object({name: string})),
        );
        const theArray = [
            [{name: ""}],
            [{name: ""}],
            [],
            [{name: ""}, 99, {name: ""}],
        ];

        const result = arrayOfArrayOfItems(theArray, ctx());

        expect(result).toEqual(parseFailureWith({path: [3, 1]}));
    });

    it("lists multiple mismatches in nested arrays", () => {
        const arrayOfArrayOfItems = arrayWithIndex(() =>
            array(object({name: string})),
        );
        const theArray = [
            [{name: ""}, {name: ""}, 4],
            [9, {name: ""}],
            [],
            [{name: ""}, 99, {name: ""}],
        ];

        const result = arrayOfArrayOfItems(theArray, ctx());

        assertFailure(result);

        expect(result.detail.map((d) => d.path)).toEqual([
            [0, 2],
            [1, 0],
            [3, 1],
        ]);
    });

    it("describes the problem if given a non-array", () => {
        const result = arrayOfItemsWithIndexedIds(99, ctx());

        expect(result).toEqual(
            parseFailureWith({
                expected: ["array"],
                badValue: 99,
            }),
        );
    });
});
