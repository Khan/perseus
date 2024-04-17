import {pathBuilder} from "./svg";

describe("pathBuilder", () => {
    it("defaults to an empty path", () => {
        const path = pathBuilder().build();
        expect(path).toBe("");
    });

    it("adds a move command", () => {
        const path = pathBuilder().move(3, 4).build();
        expect(path).toBe("M3 4");
    });

    it("scales a move command", () => {
        const path = pathBuilder().move(2, 5).scale(3).build();
        expect(path).toBe("M6 15");
    });

    it("scales multiple times", () => {
        const path = pathBuilder().move(2, 5).scale(2).scale(3).build();
        expect(path).toBe("M12 30");
    });

    it("lets you specify scale before issuing drawing commands", () => {
        const path = pathBuilder().scale(2).move(3, 5).build();
        expect(path).toBe("M6 10");
    });

    it("creates a curve command", () => {
        const path = pathBuilder().curve(1, 2, 3, 4, 5, 6).build();
        expect(path).toBe("C1 2 3 4 5 6");
    });

    it("combines multiple commands", () => {
        const path = pathBuilder()
            .move(1, 2)
            .curve(1, 2, 3, 4, 5, 6)
            .move(3, 4)
            .build();
        expect(path).toBe("M1 2C1 2 3 4 5 6M3 4");
    });
});
