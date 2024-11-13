import scoreNoop from "./score-noop";

describe("score-noop", () => {
    it("returns a pointless object", () => {
        const result = scoreNoop();
        expect(result).toHaveBeenAnsweredCorrectly({shouldHavePoints: false});

        // This is is just to narrow the type
        // the expect above checks correctness
        if (result.type === "points") {
            expect(result.earned).toBe(0);
            expect(result.total).toBe(0);
        }
    });

    it("can be configured to be pointful", () => {
        const result = scoreNoop(1);
        expect(result).toHaveBeenAnsweredCorrectly();

        // This is is just to narrow the type
        // the expect above checks correctness
        if (result.type === "points") {
            expect(result.earned).toBe(1);
            expect(result.total).toBe(1);
        }
    });
});
