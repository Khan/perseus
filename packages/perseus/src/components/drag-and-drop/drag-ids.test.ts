import {bankDragId, parseDragId, placedDragId} from "./drag-ids";

describe("parseDragId", () => {
    it("round-trips a bank drag id", () => {
        // Arrange, Act
        const parsed = parseDragId(bankDragId("tile-1"));

        expect(parsed).toEqual({tileId: "tile-1"});
    });

    it("round-trips a placed drag id", () => {
        // Arrange, Act
        const parsed = parseDragId(placedDragId("blank 1", "tile-1"));

        expect(parsed).toEqual({fromBlankId: "blank 1", tileId: "tile-1"});
    });

    it("keeps a tile id that itself contains the separator", () => {
        // Arrange, Act
        const parsed = parseDragId(placedDragId("blank 2", "tile__extra"));

        expect(parsed).toEqual({
            fromBlankId: "blank 2",
            tileId: "tile__extra",
        });
    });

    it("returns null for an id without a location prefix", () => {
        // Arrange, Act, Assert
        expect(parseDragId("tile-1")).toBeNull();
    });

    it("returns null for a placed id without a tile part", () => {
        // Arrange, Act, Assert
        expect(parseDragId("placed__blank 1")).toBeNull();
    });
});
