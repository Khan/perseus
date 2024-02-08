import {lens} from "./hubble";

describe("lens", () => {
    it("wraps an object and lets you get it back with .freeze()", () => {
        const obj = {foo: 1, bar: 2}
        expect(lens(obj).freeze()).toEqual({foo: 1, bar: 2})
    })

    test(".get([]) returns the wrapped object", () => {
        const obj = {foo: 1, bar: 2}
        expect(lens(obj).get([])).toEqual({foo: 1, bar: 2})
    })

    test(".get([prop]) returns the value of the property", () => {
        const obj = {foo: 1, bar: 2}
        expect(lens(obj).get(["foo"])).toBe(1)
    })

    test(".set([], x) exchanges the wrapped object for x", () => {
        const obj = "original"
        expect(lens(obj).set([], "changed").freeze()).toBe("changed")
    })

    test(".set([prop], x) exchanges property 'prop' for x", () => {
        const obj = {foo: 1, bar: 2}
        expect(lens(obj).set(["foo"], "changed").freeze()).toEqual({foo: "changed", bar: 2})
    })

    test(".set does not mutate the original object", () => {
        const obj = {foo: 1, bar: 2}
        lens(obj).set(["foo"], "changed").freeze()
        expect(obj).toEqual({foo: 1, bar: 2})
    })

    test(".set([a, b], x) drills into obj[a][b]", () => {
        const obj = {foo: {bar: 1}}
        expect(lens(obj).set(["foo", "bar"], "changed").freeze()).toEqual({
            foo: {bar: "changed"},
        })
    })

    test(".set sets array elements", () => {
        const array = [1, 2, 3]
        expect(lens(array).set([2], 5).freeze()).toEqual([1, 2, 5])
    })
})
