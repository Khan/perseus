import * as KAS from "../index";

describe("var", () => {
    it("should Var with symbol only", () => {
        const expr = new KAS.Var("x");
        expect(expr.print()).toBe("x");
        expect(expr.args()).toEqual(["x", undefined]);
    });

    it("should Var with symbol and subscript", () => {
        const expr = new KAS.Var("y", new KAS.Int(5));
        expect(expr.print()).toBe("y_(5)");
        expect(expr.args()).toEqual([
            "y",
            {
                d: 1,
                func: expect.anything(),
                hints: expect.anything(),
                n: 5,
            },
        ]);
    });
});
