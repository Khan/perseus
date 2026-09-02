import {readTileDragData, tileDragId} from "./drag-ids";

describe("tileDragId", () => {
    it("gives a tile in the bank and the same tile in a blank different ids", () => {
        // Arrange, Act
        const inBank = tileDragId({tileId: "tile-1"});
        const inBlank = tileDragId({tileId: "tile-1", fromBlankId: "blank 1"});

        expect(inBank).not.toEqual(inBlank);
    });

    it("gives the same tile different ids in different blanks", () => {
        // Arrange, Act
        const first = tileDragId({tileId: "tile-1", fromBlankId: "blank 1"});
        const second = tileDragId({tileId: "tile-1", fromBlankId: "blank 2"});

        expect(first).not.toEqual(second);
    });

    it("gives different tiles in one blank different ids", () => {
        // Arrange, Act
        const first = tileDragId({tileId: "tile-1", fromBlankId: "blank 1"});
        const second = tileDragId({tileId: "tile-2", fromBlankId: "blank 1"});

        expect(first).not.toEqual(second);
    });
});

describe("readTileDragData", () => {
    it("reads a bank tile's payload", () => {
        // Arrange, Act
        const data = readTileDragData({tileId: "tile-1"});

        expect(data).toEqual({tileId: "tile-1"});
    });

    it("reads a placed tile's payload with its blank", () => {
        // Arrange, Act
        const data = readTileDragData({
            tileId: "tile-1",
            fromBlankId: "blank 1",
        });

        expect(data).toEqual({tileId: "tile-1", fromBlankId: "blank 1"});
    });

    it("returns null for a drag that carries no payload", () => {
        // Arrange, Act, Assert
        expect(readTileDragData(undefined)).toBeNull();
    });

    it("returns null for a payload from another component", () => {
        // Arrange, Act, Assert
        expect(readTileDragData({somethingElse: 1})).toBeNull();
    });
});
