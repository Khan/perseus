var assert = require("assert");

var SmilesParser = require("../smiles-parser.js");
var parser = SmilesParser.parse;
var ParseError = SmilesParser.ParseError;

describe("SMILES parser", () => {
    describe("single atom parsing", () => {
        it("should parse a single bare atom", () => {
            var parsed = parser("C");
            assert.deepEqual(
                parsed, {
                    type: "atom",
                    symbol: "C",
                    bonds: null,
                    idx: [[1,0]],
                });
        });

        it("should parse a bracketed atom", () => {
            var parsed = parser("[At]");
            assert.deepEqual(
                parsed, {
                    type: "atom",
                    symbol: "At",
                    bonds: null,
                    idx: [[1,0]],
                });
        });

        it("should parse certain common two-letter atoms", () => {
            var parsed = parser("Br");
            assert.deepEqual(
                parsed, {
                    type: "atom",
                    symbol: "Br",
                    bonds: null,
                    idx: [[1, 0]]
                });
        });

        it("should fail to parse an unusual atom when not bracketed", () => {
            assert.throws( () => parser("At"), ParseError);
        });
    });

    describe("bond parsing", () => {
        it("should parse a single bond", () => {
            var parsed = parser("CC");
            var expectedBond = {
                type: "bond",
                bondType: "single",
                to: {
                    type: "atom",
                    symbol: "C",
                    bonds: null,
                    idx: [[2,0]],
                },
            };
            assert.deepEqual(
                parsed, {
                    type: "atom",
                    symbol: "C",
                    bonds: [expectedBond],
                    idx: [[1,0]],
                });
        });

        it("should parse a double bond", () => {
            var parsed = parser("C=C");
            var expectedBond = {
                type: "bond",
                bondType: "double",
                to: {
                    type: "atom",
                    symbol: "C",
                    bonds: null,
                    idx: [[2,0]],
                },
            };
            assert.deepEqual(
                parsed, {
                    type: "atom",
                    symbol: "C",
                    bonds: [expectedBond],
                    idx: [[1,0]],
                });
        });

        it("should parse a triple bond", () => {
            var parsed = parser("C#C");
            var expectedBond = {
                type: "bond",
                bondType: "triple",
                to: {
                    type: "atom",
                    symbol: "C",
                    bonds: null,
                    idx: [[2,0]],
                },
            };
            assert.deepEqual(
                parsed, {
                    type: "atom",
                    symbol: "C",
                    bonds: [expectedBond],
                    idx: [[1,0]],
                });
        });
    });

    describe("branch parsing", () => {
        it("should parse a branch", () => {
            var parsed = parser("C(C)C");
            assert.strictEqual(
                parsed.bonds.length, 2);
            assert.strictEqual(
                parsed.bonds[0].type, "bond");
            assert.strictEqual(
                parsed.bonds[1].type, "bond");

            assert.deepEqual(
                parsed.bonds[0].to.idx, [[1,1], [0,0]]);
            assert.deepEqual(
                parsed.bonds[1].to.idx, [[2,0]]);
        });

        it("should apply bond modifiers only to one branch", () => {
            var parsed = parser("C(=O)C");
            assert.strictEqual(
                parsed.bonds.length, 2);
            assert.strictEqual(
                parsed.bonds[0].bondType, "double");
            assert.strictEqual(
                parsed.bonds[1].bondType, "single");
            parsed = parser("C(O)=C");
            assert.strictEqual(
                parsed.bonds.length, 2);
            assert.strictEqual(
                parsed.bonds[0].bondType, "single");
            assert.strictEqual(
                parsed.bonds[1].bondType, "double");
        });

        it("should error on mismatched parentheses", () => {
            assert.throws(
                () => parser("C)"),
                ParseError);
            assert.throws(
                () => parser("C("),
                ParseError);
            assert.throws(
                () => parser("C(()"),
                ParseError);
            assert.throws(
                () => parser("C())"),
                ParseError);
        });
    });
});
