import noopValidator from "./noop-validator";

describe("noop-validator", () => {
    it("returns a pointless object", () => {
        expect(noopValidator()).toEqual({
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        });
    });
});
