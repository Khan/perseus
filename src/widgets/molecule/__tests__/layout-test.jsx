const assert = require("assert");

const Layout = require("../molecule-layout.jsx");
const SmilesParser = require("../smiles-parser.jsx");

function assertApproximately(actual, expected, allowed) {
    assert(
        Math.abs(expected - actual) <= allowed,
        "Value " + actual + " was not within " + allowed + " of " + expected);
}

describe("Molecule layout", () => {
    describe("Simple molecules", () => {
        const parsedAtoms = SmilesParser.parse("CC");
        const converted = Layout._convertTree({}, [], parsedAtoms);
        const atoms = converted[0];
        const bonds = converted[1];

        describe("Converting the parse tree", () => {
            it("should convert to a map of atoms and a list of bonds", () => {
                assert.strictEqual(Object.keys(atoms).length, 2);
                assert.strictEqual(bonds.length, 1);
                assert.strictEqual(
                    atoms[bonds[0].from].connections[0],
                    bonds[0].to);
                assert.strictEqual(
                    atoms[bonds[0].to].connections[0],
                    bonds[0].from);
            });
        });

        describe("Positioning with a single bond", () => {
            it("should put the first atom at the origin", () => {
                const atomInfo = Layout._atomLayout(
                    atoms["1,0"], atoms, bonds, 0);
                assert.deepEqual(atomInfo.pos, [0, 0]);
            });

            it("should put the next atom at a fixed distance", () => {
                // Direction was arbitrarily chosen, but fixed.
                Layout._atomLayout(atoms["1,0"], atoms, bonds, 0);
                const atomInfo = Layout._atomLayout(
                    atoms["2,0"], atoms, bonds, 0);
                assertApproximately(atomInfo.pos[0], 0, 1e-14);
                assert.strictEqual(atomInfo.pos[1], Layout._bondLength);
            });

            it("can rotate", () => {
                // Direction was arbitrarily chosen, but fixed.
                Layout._atomLayout(atoms["1,0"], atoms, bonds, 90);
                const atomInfo = Layout._atomLayout(
                    atoms["2,0"], atoms, bonds, 90);
                assertApproximately(
                    atomInfo.pos[0], Layout._bondLength, 1e-14);
                assert.strictEqual(atomInfo.pos[1], 0);
            });

            it("creates the bond betwen the two atoms", () => {
                Layout._atomLayout(atoms["1,0"], atoms, bonds, 0);
                Layout._atomLayout(atoms["2,0"], atoms, bonds, 0);
                const bondInfo = Layout._bondLayout(bonds[0], atoms);
                assert.deepEqual(bondInfo.startPos, [0, 0]);
                assert.strictEqual(bondInfo.endPos[1], Layout._bondLength);
                assertApproximately(bondInfo.endPos[0], 0, 1e-14);
                assert.strictEqual(bondInfo.type, "line:single");
            });
        });
    });

    describe("Layout at a three-way junction", () => {
        const layoutItems = Layout.layout(SmilesParser.parse("CC(C)C"), 0);
        it("should place the second atom in the center", () => {
            const centerAtom = layoutItems.find((item) => item.idx === "2,0");
            assertApproximately(centerAtom.pos[0], 0, 1e-14);
            assert.strictEqual(centerAtom.pos[1], Layout._bondLength);
        });

        it("should place the branched atom at +60 degrees", () => {
            const branchedAtom = layoutItems.find(
                (item) => item.idx === "2,1:1,0");
            assertApproximately(
                branchedAtom.pos[0],
                Math.sqrt(3) / 2 * Layout._bondLength, 1e-14);
            assertApproximately(
                branchedAtom.pos[1],
                1.5 * Layout._bondLength, 1e-14);
        });

        it("should place the next atom in the backbone at -60 degrees", () => {
            const nextAtom = layoutItems.find((item) => item.idx === "3,0");
            assertApproximately(
                nextAtom.pos[0],
                -1 * Math.sqrt(3) / 2 * Layout._bondLength, 1e-14);
            assertApproximately(
                nextAtom.pos[1], 1.5 * Layout._bondLength, 1e-14);
        });
    });

    describe("Layout at a four-way junction", () => {
        const layoutItems = Layout.layout(SmilesParser.parse("CC(C)(C)C"), 0);
        it("should place the second atom in the center", () => {
            const centerAtom = layoutItems.find((item) => item.idx === "2,0");
            assertApproximately(centerAtom.pos[0], 0, 1e-7);
            assert.strictEqual(centerAtom.pos[1], Layout._bondLength);
        });

        it("should place the branched atom at +90 degrees", () => {
            const branchedAtom = layoutItems.find(
                (item) => item.idx === "2,1:1,0");
            assertApproximately(
                branchedAtom.pos[0],
                Layout._bondLength, 1e-7);
            assertApproximately(
                branchedAtom.pos[1],
                Layout._bondLength, 1e-7);
        });

        it("should place the second branched atom at 0 degrees", () => {
            const branchedAtom = layoutItems.find(
                (item) => item.idx === "2,2:1,0");
            assertApproximately(
                branchedAtom.pos[0],
                0, 1e-7);
            assertApproximately(
                branchedAtom.pos[1],
                2 * Layout._bondLength, 1e-7);
        });

        it("should place the next atom in the backbone at -90 degrees", () => {
            const nextAtom = layoutItems.find((item) => item.idx === "3,0");
            assertApproximately(
                nextAtom.pos[0],
                -1 * Layout._bondLength, 1e-7);
            assertApproximately(nextAtom.pos[1], Layout._bondLength, 1e-7);
        });
    });

    describe("Triple bond layout", () => {
        const layoutItems = Layout.layout(SmilesParser.parse("CC#CC"), 0);
        it("should place all the atoms colinearly", () => {
            const atoms = layoutItems.filter((item) => item.idx);
            assert.strictEqual(atoms.length, 4);
            atoms.forEach((atom, i) => {
                assertApproximately(atom.pos[0], 0, 1e-14);
                assertApproximately(
                    atom.pos[1], i * Layout._bondLength, 1e-14);
            });
        });
    });
});
