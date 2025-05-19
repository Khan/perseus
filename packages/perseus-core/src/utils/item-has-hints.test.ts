import {itemHasHints} from "./item-has-hints";
import {generateTestPerseusItem} from "./test-utils";

describe("itemHasHints", () => {
    it("returns true when item has hints", () => {
        // Arrange
        const item = generateTestPerseusItem({
            hints: [
                {
                    content: "This is a hint",
                    widgets: {},
                    images: {},
                },
            ],
        });

        // Act
        const result = itemHasHints(item);

        // Assert
        expect(result).toBe(true);
    });

    it("returns false when item has no hints", () => {
        // Arrange
        const item = generateTestPerseusItem({
            hints: [],
        });

        // Act
        const result = itemHasHints(item);

        // Assert
        expect(result).toBe(false);
    });
});
