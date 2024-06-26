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

    it("creates an arc command, defaulting rotation, sweep, and largeArc to 0", () => {
        // See: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs
        const path = pathBuilder().circularArc(1, 2, 3).build();
        expect(path).toBe("A1 1 0 0 0 2 3");
    });

    it("creates an arc command, setting the largeArc flag", () => {
        // See: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs
        const path = pathBuilder()
            .circularArc(1, 2, 3, {largeArc: true})
            .build();
        expect(path).toBe("A1 1 0 1 0 2 3");
    });

    it("creates an arc command, setting the sweep flag", () => {
        // See: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs
        const path = pathBuilder().circularArc(1, 2, 3, {sweep: true}).build();
        expect(path).toBe("A1 1 0 0 1 2 3");
    });

    it("does not scale the flag arguments to an arc command", () => {
        // See: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs
        const path = pathBuilder()
            .circularArc(1, 1, 1, {largeArc: true, sweep: true})
            .scale(9)
            .build();
        expect(path).toBe("A9 9 0 1 1 9 9");
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
