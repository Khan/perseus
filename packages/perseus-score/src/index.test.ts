import {scorePerseusItem, scoreUserInputMap} from "./index";

describe("scorePerseusItem", () => {
    it("is a deprecated alias of scoreUserInputMap", () => {
        // Assert
        expect(scorePerseusItem).toBe(scoreUserInputMap);
    });
});
