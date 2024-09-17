/* eslint-disable no-console */
import * as KAS from "@khanacademy/kas";
import {getId} from "@math-blocks/core";
import {builders, NodeType} from "@math-blocks/semantic";

import type {types} from "@math-blocks/semantic";

function convertExpr(expr: KAS.Expr): types.NumericNode {
    // Operations
    if (expr instanceof KAS.Mul) {
        const factors = expr.terms.map(convertExpr);
        return builders.mul(factors, true);
    } else if (expr instanceof KAS.Add) {
        const terms = expr.terms.map(convertExpr);
        return builders.add(terms);
    }

    // Symbols
    else if (expr instanceof KAS.Func) {
        const {symbol, arg} = expr;
        return {
            type: NodeType.Func,
            id: getId(),
            func: builders.identifier(symbol),
            args: [convertExpr(arg)],
        };
    } else if (expr instanceof KAS.Var) {
        const {symbol, subscript} = expr;
        return {
            type: NodeType.Identifier,
            id: getId(),
            name: symbol,
            // TODO: verify that subscript is a NumericNode type
            subscript: subscript
                ? (convertExpr(subscript) as types.NumericNode)
                : undefined,
        };
    } else if (expr instanceof KAS.Const) {
        if (expr === KAS.Const.e) {
            throw new Error("TODO: Add NodeType.E to MathBlocks");
        } else if (expr === KAS.Const.pi) {
            return {
                type: NodeType.Pi,
                id: getId(),
            };
        } else {
            throw new Error("Unrecognized Constant");
        }
    }

    // Numbers
    else if (expr instanceof KAS.Int) {
        const {n} = expr;
        if (n < 0) {
            const arg = builders.number(Math.abs(n).toString());
            return builders.neg(arg, expr.isSubtract());
        } else {
            return builders.number(expr.n.toString());
        }
    } else if (expr instanceof KAS.Rational) {
        // TODO: create a new KAS node type for division
        const n =
            typeof expr.n === "number"
                ? builders.number(expr.n.toString())
                : convertExpr(expr.n);
        const d =
            typeof expr.d === "number"
                ? builders.number(expr.d.toString())
                : convertExpr(expr.d);

        return builders.div(n, d);
    } else if (expr instanceof KAS.Float) {
        return builders.number(expr.n.toString());
    }

    // Error
    else {
        console.error("Unhandled node: ", expr);
        throw new Error();
    }
}

export function parse(value: string): types.Node {
    const result = KAS.parse(value, {dontSimplifyFractions: true});
    if (result.parsed) {
        const {expr} = result;
        if (expr instanceof KAS.Eq) {
            const {left, right} = expr;
            return builders.eq([convertExpr(left), convertExpr(right)]);
        } else {
            return convertExpr(expr);
        }
    } else {
        throw new SyntaxError(`'${value}' is not a valid equation/expression`);
    }
}
