/**
 * A molecule layout engine.
 *
 * This module transforms the SMILES syntax tree into a set of rendering
 * instructions.  A rendering instruction is an object indicating what type of
 * thing to render (e.g. text or line), where to render it, and any other style
 * properties needed.
 *
 * For instance, an oxygen atom might be rendered as
 * {type: "text", value: "O", pos: [0, 0], idx: "1,0"}
 */

// Default length of the bond.  This currently corresponds directly to pixels
// in the renderer, but we may want this just to be arbitrary in the future.
const bondLength = 30;

/**
 * Compute a coordinate by moving an angle and length from an origin point.
 *
 * Args:
 *     origin: a list of the [x, y] coordinates of the origin
 *     angle: an angle in degrees from the origin, following the typical
 *         convention of +x axis = 0 degrees, +y axis = 90 degrees.
 *     length: the distance to the new point
 * Return:
 *     a two-element list containing the [x, y] coordinates of the point.
 */
function polarAdd(origin: any, angle, length) {
    const x = origin[0];
    const y = origin[1];
    return [
        x + Math.cos((angle * 2 * Math.PI) / 360) * length,
        y + -1.0 * Math.sin((angle * 2 * Math.PI) / 360) * length,
    ];
}

/**
 * Compute the layout for a single atom.
 *
 * Args:
 *     atom: the atom node for which layout is being created, as returned from
 *         convertTree; the computed position of this atom is added to this
 *         object in place, in addition to being returned in the layout
 *         instruction.
 *     atoms: the list of all atoms, as returned from convertTree, used to
 *         position this atom appropriately relative to its neighbors
 *     bonds: the list of all bonds, as returned from convertTree, used to
 *         determine the geometry based on bond type
 *     rotationAngle: a constant rotation for the whole molecule (in degrees)
 *
 * Return:
 *     a rendering instruction for the atom, containing a type (text), the text
 *     to render, the position, and the atom index
 */
function atomLayout(
    atom: any,
    atoms: any,
    bonds: ReadonlyArray<any>,
    rotationAngle: number,
): any {
    let textValue = atom.symbol;
    if (textValue === "C" && Object.keys(atoms).length !== 1) {
        // By convention, don't render the C for carbon in a chain.
        textValue = null;
    }

    if (atom.idx === "1,0") {
        // The first atom is special-cased because there are no neighbors for
        // relative positioning.
        const pos = [0, 0];
        atom.pos = pos;
        // Conventionally, molecules are rendered where the first bond is not
        // horizontal, but at a 30 degree angle, so subtract 30 degrees for the
        // first atom's direction.
        atom.baseAngle = -30 + rotationAngle;
        return {type: "text", value: textValue, pos: pos, idx: atom.idx};
    }
    // If we're an atom with any other index than the case just handled, we're
    // guaranteed to have a neighbor who has a defined position.
    const prevPositionedAtom =
        atoms[
            atom.connections.find(function (c) {
                return atoms[c].pos;
            })
        ];

    // Find this atom's index in the previous atom's connections
    const myIndex = prevPositionedAtom.connections.indexOf(atom.idx);

    let baseAngleIncrement = 60;
    let angleIncrement = 120;
    if (prevPositionedAtom.connections.length === 4) {
        // By convention, if an atom has 4 bonds, we represent it with 90
        // degree angles in 2D, even though it would have tetrahedral geometry
        // with ~110 degree angles in 3D.
        angleIncrement = 90;
        baseAngleIncrement = 90;
    } else if (
        bonds.find(
            (bond) => bond.bondType === "triple" && bond.to === atom.idx,
        ) ||
        bonds.find(
            (bond) =>
                bond.bondType === "triple" &&
                bond.to === prevPositionedAtom.idx,
        )
    ) {
        // Triple bonds have a bond angle of 180 degrees, so don't change the
        // direction in which we made the previous bond.
        angleIncrement = 0;
        baseAngleIncrement = 0;
    }

    let angle = 0;
    const idxPath = prevPositionedAtom.idx.split(":");
    const lastAtomIdx = idxPath[idxPath.length - 1].split(",")[0];

    // Conventionally, a single chain of atoms is rendered as a zig-zag pattern
    // with 120 degree angles.  This means we need to flip the angle every
    // other atom.  The parser ensures that indices always alternate odd-even,
    // including taking into account branch points.
    if (parseInt(lastAtomIdx) % 2 !== 0) {
        angle =
            prevPositionedAtom.baseAngle -
            (baseAngleIncrement - angleIncrement * myIndex);
    } else {
        angle =
            prevPositionedAtom.baseAngle +
            (baseAngleIncrement - angleIncrement * myIndex);
    }

    const pos = polarAdd(prevPositionedAtom.pos, angle, bondLength);

    atom.pos = pos;
    atom.baseAngle = angle;

    return {type: "text", value: textValue, pos: pos, idx: atom.idx};
}

/**
 * Get the start and end position for a bond connecting two atoms.
 *
 * If we have non-carbon atoms that render with explicit letters connected by a
 * bond, we don't want the line for the bond to extend into the lettering for
 * the atom.
 *
 * This function returns the start and end positions of the bond's line, taking
 * into account that one or both end points might need to be moved to make room
 * for text.
 */
function maybeShrinkLines(fromAtom: any, toAtom) {
    const shrinkFactor = 0.25;
    let fromPos = [fromAtom.pos[0], fromAtom.pos[1]];
    let toPos = [toAtom.pos[0], toAtom.pos[1]];
    if (fromAtom.symbol !== "C") {
        fromPos = [
            toAtom.pos[0] -
                (1 - shrinkFactor) * (toAtom.pos[0] - fromAtom.pos[0]),
            toAtom.pos[1] -
                (1 - shrinkFactor) * (toAtom.pos[1] - fromAtom.pos[1]),
        ];
    }
    if (toAtom.symbol !== "C") {
        // For carbon atoms, conventionally we don't draw any letter, so this
        // special cases drawing the bond lines all the way to the point where
        // they meet.
        toPos = [
            fromAtom.pos[0] -
                (1 - shrinkFactor) * (fromAtom.pos[0] - toAtom.pos[0]),
            fromAtom.pos[1] -
                (1 - shrinkFactor) * (fromAtom.pos[1] - toAtom.pos[1]),
        ];
    }
    return [fromPos, toPos];
}

/**
 * Compute the layout for a bond between two atoms.
 *
 * Args:
 *     bond: the bond node for which the layout is being computed, as returned
 *         by convertTree
 *     atoms: the list of all atoms returned by convertTree, which should
 *         already have been processed for layout and thus have positions set
 *
 * Return:
 *     a rendering instruction for the bond containing a type
 *     (line:{single,double,triple}) and the line's endpoints
 */
function bondLayout(bond: any, atoms: any): any {
    const fromAtom = atoms[bond.from];
    const toAtom = atoms[bond.to];
    const startAndEndPos = maybeShrinkLines(fromAtom, toAtom);
    return {
        type: "line:" + bond.bondType,
        startPos: startAndEndPos[0],
        endPos: startAndEndPos[1],
    };
}

/**
 * Convert an array of atom indices to a single string unique identifier.
 *
 * For linear molecules, or for atoms in the main chain, this will just be the
 * atom index, something like "0,1".  For branched molecules, however, we
 * uniquely identify atoms by an array of atoms where the branching happened,
 * followed by the index in the current branch (like ["0,1", "1,2", "1,1"]).
 * This function just joins the parts with a colon so that we can have nice
 * object keys that still track the series of branches to get to an atom, which
 * is guaranteed to be a unique identifier.
 *
 */
function idxString(idx) {
    return idx.join(":");
}

/**
 * Convert the parse tree output by the parser into an ordered list of atoms
 * and bonds to render.
 *
 * Args:
 *     atoms: the output list of atoms that we're in the process of building.
 *         This should be the empty list if not being called recursively.
 *     bonds: the output list of bonds that we're in the process of building.
 *         This should be the empty list if not being called recursively.
 *     tree: the parse tree generated by the SMILES parser module.
 *
 * Return:
 *     the final value of atoms and bonds, which are lists of all the atom
 *     nodes and bond nodes, respectively, that need to be rendered.
 */
function convertTree(atoms: any, bonds: any, tree: any): [any, any] {
    if (tree === null) {
        return [atoms, bonds];
    }
    if (tree.type === "atom") {
        const treeIdx = idxString(tree.idx);
        atoms[treeIdx] = {idx: treeIdx, symbol: tree.symbol, connections: []};
        if (tree.bonds) {
            tree.bonds.forEach(function (b) {
                const toIdx = idxString(b.to.idx);
                atoms[treeIdx].connections.push(toIdx);
                bonds.push({from: treeIdx, to: toIdx, bondType: b.bondType});
                convertTree(atoms, bonds, b.to);
                atoms[toIdx].connections.push(treeIdx);
            });
        }
    }
    return [atoms, bonds];
}

/**
 * Recursively process the queue of atoms that need to have layout computed.
 *
 * Args:
 *     outputs: the array of atom rendering instructions we're in the process
 *         of building.  This should be the empty array if not being called
 *         recursively.
 *     atomProcessingQueue: the array of unique identifier strings (see the
 *         comment for idxString for more information about these) of atoms
 *         currently in line to be processed.  When not being called
 *         recursively, this should be a array with a single element, the
 *         unique identifier of the first atom in the structure ("1,0" in the
 *         current scheme).
 *     atoms: the array of all atom nodes to be rendered, as returned by
 *         convertTree
 *     bonds: the array of all bond nodes to be rendered, as returned by
 *         convertTree
 *
 * Return:
 *     an array of rendering instructions for all the atoms in the molecule
 */
function atomLayoutHelper(
    outputs,
    atomProcessingQueue,
    atoms,
    bonds,
    rotationAngle,
) {
    if (atomProcessingQueue.length === 0) {
        return outputs;
    }

    const queuedAtomIdx = atomProcessingQueue.shift();
    const atom = atoms[queuedAtomIdx];
    atom.connections.forEach(function (c) {
        if (!atoms[c].pos) {
            atomProcessingQueue.push(c);
        }
    });
    return atomLayoutHelper(
        outputs.concat(atomLayout(atom, atoms, bonds, rotationAngle)),
        atomProcessingQueue,
        atoms,
        bonds,
        rotationAngle,
    );
}

/**
 * Recursively process the queue of bonds that need to have layout computed.
 *
 * Args:
 *     outputs: the array of bond rendering instructions we're in the process
 *         of building.  This should be the empty array or the array of all
 *         atom rendering instructions if not being called recursively.
 *     atoms: the array of all atom nodes to be rendered, as returned by
 *         convertTree
 *     bonds: the array of all bond nodes to be rendered, as returned by
 *         convertTree
 *
 * Return:
 *     an array of rendering instructions for all the bonds in the molecule
 *     concatenated to the initial value of outputs
 */
function bondLayoutHelper(outputs: Array<any>, atoms, bonds: any) {
    if (bonds.length === 0) {
        return outputs;
    }
    return bondLayoutHelper(
        outputs.concat(bondLayout(bonds[0], atoms)),
        atoms,
        bonds.slice(1),
    );
}

/**
 * Compute an array of rendering instructions from the parse tree of a molecule.
 *
 * Args:
 *     tree: the parse tree as returned by the SMILES parser module
 *     rotationAngle: a global rotation (in degrees) to be applied to the whole
 *         molecule; this is manually adjustable in the widget.
 *
 * Return:
 *     an array of rendering instructions for all the atoms and bonds in the
 *     molecule suitable for processing by the renderer
 */
function layout(tree: any, rotationAngle: any): any {
    const converted = convertTree({}, [], tree);
    const atoms = converted[0];
    const bonds = converted[1];
    const outputs = atomLayoutHelper([], ["1,0"], atoms, bonds, rotationAngle);
    return bondLayoutHelper(outputs, atoms, bonds);
}

export default {
    layout: layout,
    // The remainder are exported for testing and are not intended for external
    // use.
    _atomLayout: atomLayout,
    _bondLayout: bondLayout,
    _bondLength: bondLength,
    _convertTree: convertTree,
};
