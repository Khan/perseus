import measurerValidator from "./measurer-validator";

describe("measurer-validator", () => {
    it("always gives points for some reason", () => {
        expect(measurerValidator()).toEqual({
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        });
    });
});
