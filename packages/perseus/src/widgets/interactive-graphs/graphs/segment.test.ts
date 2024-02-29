import {shiftEndpoints} from "./segment";
import {Coord} from "@khanacademy/perseus";

describe("shiftEndpoints", () => {
    it("shifts both endpoints by the shiftBy vector", () => {
        const segment = [[0, 0], [1, 1]] as [Coord, Coord]
        const shiftBy = [2, 3] as Coord
        const expected = [[2, 3], [3, 4]]
        expect(shiftEndpoints(...segment, shiftBy, (pt) => pt)).toEqual(expected)
    })

    it("keeps the endpoints in the same position relative to each other when constrained", () => {
        const segment = [[0, 0], [1, 1]] as [Coord, Coord]
        const shiftBy = [2, 3] as Coord
        const expected = [[0, 0], [1, 1]]
        // if the constraint would move the segment's endpoints relative to each
        // other, then nothing moves
        expect(shiftEndpoints(...segment, shiftBy, (pt) => [0, 0])).toEqual(expected)
    })
})
