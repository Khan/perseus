import SmilesParser from "../smiles-parser";

const parser = SmilesParser.parse;

describe("SMILES parser", () => {
    describe("single atom parsing", () => {
        it("should parse a single bare atom", () => {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parser("C");
            expect(parsed).toEqual({
                type: "atom",
                symbol: "C",
                bonds: null,
                idx: [[1, 0]],
            });
        });

        it("should parse a bracketed atom", () => {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parser("[At]");
            expect(parsed).toEqual({
                type: "atom",
                symbol: "At",
                bonds: null,
                idx: [[1, 0]],
            });
        });

        it("should parse certain common two-letter atoms", () => {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parser("Br");
            expect(parsed).toEqual({
                type: "atom",
                symbol: "Br",
                bonds: null,
                idx: [[1, 0]],
            });
        });

        it("should fail to parse an unusual atom when not bracketed", () => {
            // Arrange
            // Act
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const underTest = () => parser("At");

            // Assert
            expect(underTest).toThrow();
        });
    });

    describe("bond parsing", () => {
        it("should parse a single bond", () => {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parser("CC");
            const expectedBond = {
                type: "bond",
                bondType: "single",
                to: {
                    type: "atom",
                    symbol: "C",
                    bonds: null,
                    idx: [[2, 0]],
                },
            } as const;
            expect(parsed).toEqual({
                type: "atom",
                symbol: "C",
                bonds: [expectedBond],
                idx: [[1, 0]],
            });
        });

        it("should parse a double bond", () => {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parser("C=C");
            const expectedBond = {
                type: "bond",
                bondType: "double",
                to: {
                    type: "atom",
                    symbol: "C",
                    bonds: null,
                    idx: [[2, 0]],
                },
            } as const;
            expect(parsed).toEqual({
                type: "atom",
                symbol: "C",
                bonds: [expectedBond],
                idx: [[1, 0]],
            });
        });

        it("should parse a triple bond", () => {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parser("C#C");
            const expectedBond = {
                type: "bond",
                bondType: "triple",
                to: {
                    type: "atom",
                    symbol: "C",
                    bonds: null,
                    idx: [[2, 0]],
                },
            } as const;
            expect(parsed).toEqual({
                type: "atom",
                symbol: "C",
                bonds: [expectedBond],
                idx: [[1, 0]],
            });
        });
    });

    describe("branch parsing", () => {
        it("should parse a branch", () => {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            const parsed = parser("C(C)C");
            expect(parsed.bonds).toHaveLength(2);
            expect(parsed.bonds[0].type).toBe("bond");
            expect(parsed.bonds[1].type).toBe("bond");

            expect(parsed.bonds[0].to.idx).toEqual([
                [1, 1],
                [0, 0],
            ]);
            expect(parsed.bonds[1].to.idx).toEqual([[2, 0]]);
        });

        it("should apply bond modifiers only to one branch", () => {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            let parsed = parser("C(=O)C");
            expect(parsed.bonds).toHaveLength(2);
            expect(parsed.bonds[0].bondType).toBe("double");
            expect(parsed.bonds[1].bondType).toBe("single");
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            parsed = parser("C(O)=C");
            expect(parsed.bonds).toHaveLength(2);
            expect(parsed.bonds[0].bondType).toBe("single");
            expect(parsed.bonds[1].bondType).toBe("double");
        });

        it("should error on mismatched parentheses", () => {
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            expect(() => parser("C)")).toThrow();
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            expect(() => parser("C(")).toThrow();
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            expect(() => parser("C(()")).toThrow();
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            expect(() => parser("C())")).toThrow();
        });
    });
});
