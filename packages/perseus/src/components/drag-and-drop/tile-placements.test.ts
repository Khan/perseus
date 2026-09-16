import {
    clearBlank,
    isTileInBank,
    placeTile,
    remainingUses,
} from "./tile-placements";

describe("placeTile", () => {
    it("places a bank tile into an empty blank", () => {
        // Arrange, Act
        const next = placeTile({}, {tileId: "t1"}, "blank 1", "single");

        expect(next).toEqual({"blank 1": "t1"});
    });

    it("returns the occupant of a full blank to the bank", () => {
        const placements = {"blank 1": "t1"};

        const next = placeTile(placements, {tileId: "t2"}, "blank 1", "single");

        expect(next).toEqual({"blank 1": "t2"});
    });

    it("empties the source blank when a tile moves between blanks", () => {
        const placements = {"blank 1": "t1"};

        const next = placeTile(
            placements,
            {tileId: "t1", fromBlankId: "blank 1"},
            "blank 2",
            "single",
        );

        expect(next).toEqual({"blank 2": "t1"});
    });

    it("keeps a single-use tile in one blank at a time", () => {
        const placements = {"blank 1": "t1"};

        // No fromBlankId: the caller thinks the tile came from the bank,
        // but a single-use tile still can't be in two places.
        const next = placeTile(placements, {tileId: "t1"}, "blank 2", "single");

        expect(next).toEqual({"blank 2": "t1"});
    });

    it("lets a multi-use tile occupy several blanks", () => {
        const placements = {"blank 1": "t1"};

        const next = placeTile(placements, {tileId: "t1"}, "blank 2", "multi");

        expect(next).toEqual({"blank 1": "t1", "blank 2": "t1"});
    });

    it("does not disturb unrelated placements", () => {
        const placements = {"blank 1": "t1", "blank 2": "t2"};

        const next = placeTile(placements, {tileId: "t3"}, "blank 3", "single");

        expect(next).toEqual({
            "blank 1": "t1",
            "blank 2": "t2",
            "blank 3": "t3",
        });
    });
});

describe("clearBlank", () => {
    it("empties the given blank", () => {
        const placements = {"blank 1": "t1", "blank 2": "t2"};

        const next = clearBlank(placements, "blank 1");

        expect(next).toEqual({"blank 2": "t2"});
    });

    it("returns the same placements when the blank is already empty", () => {
        const placements = {"blank 1": "t1"};

        const next = clearBlank(placements, "blank 2");

        expect(next).toBe(placements);
    });
});

describe("remainingUses", () => {
    it("returns 1 for an unplaced single-use tile", () => {
        expect(remainingUses({}, "t1", "single")).toBe(1);
    });

    it("returns 0 for a placed single-use tile", () => {
        expect(remainingUses({"blank 1": "t1"}, "t1", "single")).toBe(0);
    });

    it("returns null (unlimited) for an uncapped multi-use tile", () => {
        expect(remainingUses({"blank 1": "t1"}, "t1", "multi")).toBeNull();
    });

    it("decrements a capped multi-use tile per placement", () => {
        const placements = {"blank 1": "t1", "blank 2": "t1"};

        expect(remainingUses(placements, "t1", "multi", 3)).toBe(1);
    });
});

describe("isTileInBank", () => {
    it("removes a placed single-use tile from the bank", () => {
        expect(isTileInBank({"blank 1": "t1"}, "t1", "single")).toBe(false);
    });

    it("keeps an uncapped multi-use tile in the bank forever", () => {
        expect(isTileInBank({"blank 1": "t1"}, "t1", "multi")).toBe(true);
    });

    it("removes an exhausted capped multi-use tile from the bank", () => {
        const placements = {"blank 1": "t1", "blank 2": "t1"};

        expect(isTileInBank(placements, "t1", "multi", 2)).toBe(false);
    });
});
