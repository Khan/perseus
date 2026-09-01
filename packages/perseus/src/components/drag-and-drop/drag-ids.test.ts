import {tileDragId} from "./drag-ids";

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
