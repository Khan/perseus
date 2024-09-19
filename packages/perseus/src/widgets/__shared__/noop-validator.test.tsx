import noopValidator from "./noop-validator";

describe("noop-validator", () => {
    it("returns a pointless object", () => {
        expect(noopValidator()).toHaveBeenAnsweredCorrectly();
    });
});
