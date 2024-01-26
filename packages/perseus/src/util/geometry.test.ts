import {reverseVector, sumVectors} from "./geometry";

describe("addVectors", () => {
    it("returns [0, 0] given no vectors", () => {
        expect(sumVectors()).toEqual([0, 0])
    })

    it("sums the components of the vectors", () => {
        expect(sumVectors([1, 2], [5, 8])).toEqual([6, 10])
    })

    it("works with any number of arguments", () => {
        expect(sumVectors([1, 2], [1, 2], [1, 2], [1, 2])).toEqual([4, 8])
    })
})

describe("reverseVector", () => {
    it("flips the sign of zero", () => {
        // This is a characterization test for legacy behavior. It might not
        // actually be desired behavior.
        expect(reverseVector([0, 0])).toEqual([-0, -0])
    })

    it("flips the sign of each component", () => {
        expect(reverseVector([1, -5])).toEqual([-1, 5])
    })
})
