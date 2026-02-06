// Regexp defining characters that are valid SMILES characters that this parser
// can parse.  In addition to serving as a sort of validation, this also keeps
// out unimplemented features (like cycles and stereochemistry), which use
// additional characters.
const smilesRe = new RegExp("^[A-Za-z\\[\\]()=#+-]*$");

// Regexp defining what characters are valid as atom names.  This includes
// common 1-character elements, Cl and Br for convenience, and the open
// bracket, which can be used to include anything as an atom name.
const atomRe = new RegExp("^(Cl|Br|[CONPSFBI]|\\[)");

function ParseError(message: string) {
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.message = message;
}

/**
 * Perform a functional update of a possibly nested object.
 *
 * Args:
 *     obj: an object, will not be modified
 *     keylist: a list of keys whose values will be updated in the object.
 *         This represents a path to a value inside nested objects.  For
 *         example, if keylist == ["a", "b", "c"], then a new object is
 *         returned with obj["a"]["b"]["c"] updated.  Note that if any of the
 *         keys is not already present, this will insert {} as a default value
 *         for that key.
 *     val: the new value to associate with the keypath
 *
 * Return: a new object, which is a shallow copy of the original with the value
 *     at the specified keypath replaced.
 */
function _mset(obj, keylist, val) {
    const k0 = keylist[0];
    const rest = keylist.slice(1);
    let newObj;
    if (Array.isArray(obj)) {
        newObj = [...obj];
    } else {
        newObj = {...(obj || {})};
    }
    let newVal = val;
    if (rest.length > 0) {
        newVal = _mset(newObj[k0], rest, val);
    }
    newObj[k0] = newVal;
    return newObj;
}

/**
 * Perform a functional increment of a value in a nested object.
 *
 * Args:
 *     obj: an object; this will not be modified
 *     keylist: a list of keys representing a path into a nested object.  (See
 *         `_mset` for examples.)
 *
 * Return:
 *     an object that is a shallow copy of obj, with the value at the specified
 *     path incremeneted.
 */
function _inc(obj, keylist: Array<number | string>) {
    const val = keylist.reduce(function (acc, elt) {
        return acc[elt];
    }, obj);

    return _mset(obj, keylist, val + 1);
}

function validate(smiles) {
    return smilesRe.test(smiles);
}

/**
 * Parse a bond modifier character, updating the context object so that the
 * next bond created has this modifier.
 */
function parseBondModifier(smiles: any, ctx) {
    const firstChar = smiles[0];
    const rest = smiles.slice(1);
    if (firstChar === "=") {
        return parse(rest, _mset(ctx, ["bond", "bondType"], "double"));
    }
    if (firstChar === "#") {
        return parse(rest, _mset(ctx, ["bond", "bondType"], "triple"));
    }
    throw new ParseError("Invalid character: " + firstChar);
}

/**
 * Slice the input string, removing a parenthesized expression.
 * (Will handle nested parentheses.)
 *
 * parenStack should be a list containing any open parentheses already
 * encountered.  (Usually, this will be ["("])
 */
function sliceFromMatchingCloseParen(smiles: any, parenStack: Array<any>) {
    if (parenStack.length === 0) {
        return smiles;
    }

    if (smiles === "") {
        throw new ParseError("Mismatched parentheses");
    }

    const firstChar = smiles[0];
    const rest = smiles.slice(1);

    if (firstChar === "(") {
        return sliceFromMatchingCloseParen(rest, parenStack.concat(firstChar));
    }

    if (firstChar === ")") {
        return sliceFromMatchingCloseParen(rest, parenStack.slice(1));
    }

    return sliceFromMatchingCloseParen(rest, parenStack);
}

/**
 * Parse a branch, as indicated by the presence of a parenthesized experession.
 *
 * This returns a list of all branches (including the continuation of the
 * backbone) that should be added to the previous atom's bond list.
 */
function parseParenthesizedExpression(smiles: any, ctx: any) {
    const firstChar = smiles[0];
    const rest = smiles.slice(1);
    if (firstChar === "(") {
        let newCtx = {...ctx, parens: ctx.parens + "("};
        // increment the branch index
        newCtx = _inc(ctx, ["idx", ctx.idx.length - 1, 1]);

        let inBranchIdx = -1;
        if (ctx.idx[ctx.idx.length - 1][0] % 2 === 0) {
            // HACK(colin): this is so that we preserve the odd/even series in
            // indices in branches; the layout engine uses this to select
            // angles, and if we don't do this, editing one part of a molecule
            // can cause another to flop around oddly.
            inBranchIdx = 0;
        }
        const parenCtx = {
            ...newCtx,
            idx: newCtx.idx.concat([[inBranchIdx, 0]]),
            parens: newCtx.parens.concat("("),
        } as const;
        const parenExpr = parse(rest, parenCtx);
        const remainder = parse(
            sliceFromMatchingCloseParen(rest, ["("]),
            newCtx,
        );
        return [parenExpr].concat(remainder);
    }
    if (firstChar === ")") {
        if (ctx.parens[ctx.parens.length - 1] !== "(") {
            throw new ParseError("Mismatched parentheses");
        }
        return null;
    }
    throw new ParseError("Invalid bare character: " + firstChar);
}

/**
 * Get the symbol of the next atom in the molecule.
 *
 * Return a 2-element list containing that symbol and the remainder of the
 * molecule.
 */
function readAtomSymbol(smiles: any, _ctx) {
    let sym = null;
    let rest = null;
    if (smiles[0] === "[") {
        const closingIdx = smiles.indexOf("]");
        if (closingIdx === -1) {
            return ["", smiles];
        }
        sym = smiles.slice(1, closingIdx);
        rest = smiles.slice(closingIdx + 1);
    } else {
        const match = atomRe.exec(smiles);
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'null'. | TS2531 - Object is possibly 'null'.
        sym = match[1];
        // @ts-expect-error - TS2531 - Object is possibly 'null'.
        rest = smiles.slice(sym.length);
    }

    return [sym, rest];
}

/**
 * Parse the next atom in the molecule, returning an atom object if this is the
 * first atom in the molecule, or a bond object with this atom as the
 * destination of the bond if this is not the first atom.
 */
function parseAtom(smiles, ctx) {
    const symbolInfo = readAtomSymbol(smiles, ctx);
    const atom = symbolInfo[0];
    if (atom === "") {
        return ["error", "Unable to parse bracketed atom."];
    }
    const rest = symbolInfo[1];

    // Atoms are indexed by a list of two-element lists.  In each two-element
    // list, the first element is the atom counter, and the second element is
    // the branch counter.  Branches are 1-indexed so that the main chain of
    // the molecule can be indicated by 0.  Atoms may be either 0- or
    // 1-indexed, defaulting to 1, to maintain a alternating pattern of
    // odd/even indices. So, for example, if an atom has a branch off the main
    // chain, and its atom index is x, then the indices of atoms are:
    //     Atom where branch occurs: [[x, 0]]
    //     First atom in the branch: [[x, 1], [1, 0]]  (assuming x is even)
    //     Next atom in the main chain: [[x + 1, 0]]

    // increment the atom counter and reset the branch counter
    const newCtx = _mset(
        ctx,
        ["idx", ctx.idx.length - 1],
        [1 + ctx.idx[ctx.idx.length - 1][0], 0],
    );
    let restOfMolecule = parse(
        rest,
        _mset(newCtx, ["bond", "bondType"], "single"),
    );
    if (!Array.isArray(restOfMolecule) && !!restOfMolecule) {
        restOfMolecule = [restOfMolecule];
    }
    const atomObj = {
        type: "atom",
        symbol: atom,
        bonds: restOfMolecule,
        idx: newCtx.idx,
    } as const;
    if (ctx.bond) {
        return {
            type: "bond",
            bondType: ctx.bond.bondType,
            to: atomObj,
        };
    }
    return atomObj;
}

function startsWithAtom(s: any) {
    return atomRe.test(s);
}

function isModifierChar(s: any) {
    return s === "=" || s === "#";
}

/**
 * Parse a SMILES string to an internal tree representation.
 *
 * Args:
 *   smiles [string]: a string representing the molecule.
 *
 * Returns: the parse tree (see top-of file docstring for details).
 *
 * Throws:
 *     ParseError: if the input is not valid SMILES or contains features not
 *         yet implemented.
 */
function parse(smiles: any, ctx: any): any {
    if (!validate(smiles)) {
        throw new ParseError("Invalid input.");
    }

    if (!smiles || smiles.length === 0) {
        return null;
    }

    if (startsWithAtom(smiles)) {
        return parseAtom(
            smiles,
            ctx || {
                idx: [[0, 0]],
                parens: [],
                stack: [],
                bondModifiers: [],
            },
        );
    }
    if (isModifierChar(smiles[0])) {
        return parseBondModifier(smiles, ctx);
    }
    return parseParenthesizedExpression(smiles, ctx);
}

export default {parse: parse, ParseError: ParseError};
