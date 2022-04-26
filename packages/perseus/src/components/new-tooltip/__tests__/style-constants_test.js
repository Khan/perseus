// @flow
import * as types from "../style-constants.js";

describe("style-constants module", () => {
    it("has some runtime exports", () => {
        expect(Object.keys(types)).not.toHaveLength(0);
    });
});
