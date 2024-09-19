/* eslint-disable no-console */
import * as KAS from "@khanacademy/kas";
import {getId} from "@math-blocks/core";
import {builders, NodeType} from "@math-blocks/semantic";

import type {types} from "@math-blocks/semantic";

// TODO:
// - equations
// - functions
export function kasToMathBlocks(expr: KAS.Expr): types.Node {
    // Operations
    if (expr instanceof KAS.Mul) {
        const factors = expr.terms.map(kasToMathBlocks);
        // TODO: track implicitness hint on child nodes instead of the Mul node itself
        return builders.mul(factors, true); // implicit mul
    } else if (expr instanceof KAS.Add) {
        const terms = expr.terms.map(kasToMathBlocks);
        return builders.add(terms);
    }

    // Symbols
    else if (expr instanceof KAS.Func) {
        const {symbol, arg} = expr;
        return {
            type: NodeType.Func,
            id: getId(),
            func: builders.identifier(symbol),
            // TODO: verify that the arg is a NumericNode type
            args: [kasToMathBlocks(arg) as types.NumericNode],
        };
    } else if (expr instanceof KAS.Var) {
        const {symbol, subscript} = expr;
        return {
            type: NodeType.Identifier,
            id: getId(),
            name: symbol,
            // TODO: verify that subscript is a NumericNode type
            subscript: subscript
                ? (kasToMathBlocks(subscript) as types.NumericNode)
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
                : kasToMathBlocks(expr.n);
        const d =
            typeof expr.d === "number"
                ? builders.number(expr.d.toString())
                : kasToMathBlocks(expr.d);

        // TODO: verify that these are indeed NumericNodes
        return builders.div(n as types.NumericNode, d as types.NumericNode);
    } else if (expr instanceof KAS.Float) {
        return builders.number(expr.n.toString());
    }

    // Error
    else {
        console.error("Unhandled node: ", expr);
        throw new Error();
    }
}

// TODO(kevinb): export these from KAS
const Neg = new KAS.Int(-1).addHint("negate");
const Sub = new KAS.Int(-1).addHint("subtract");
const Div = new KAS.Int(-1).addHint("divide");

export function mathBlocksToKAS(node: types.Node): KAS.Expr {
    switch (node.type) {
        case NodeType.Number: {
            const int = parseInt(node.value, 10);
            const float = parseFloat(node.value);

            if (int === float) {
                return new KAS.Int(int);
            } else {
                return new KAS.Float(float);
            }
        }
        case NodeType.Identifier: {
            if (node.subscript) {
                const subscript = mathBlocksToKAS(node.subscript);
                return new KAS.Var(node.name, subscript);
            }
            return new KAS.Var(node.name);
        }
        case NodeType.Func: {
            const func = node.func;
            if (func.type !== NodeType.Identifier) {
                throw new Error("functions names must use an identifier");
            }
            if (node.args.length > 1) {
                throw new Error(
                    "functions cannot have more than one parameter",
                );
            }
            const arg = mathBlocksToKAS(node.args[0]);
            return new KAS.Func(func.name, arg);
        }

        case NodeType.Add: {
            return new KAS.Add(node.args.map(mathBlocksToKAS));
        }
        case NodeType.Mul: {
            return new KAS.Mul(node.args.map(mathBlocksToKAS));
        }
        case NodeType.Div: {
            const n = mathBlocksToKAS(node.args[0]);
            const d = mathBlocksToKAS(node.args[1]);
            // NOTE(kevinb): KAS models division as a*b^-1.
            return new KAS.Mul([n, new KAS.Pow(d, Div)]);
        }
        case NodeType.Neg: {
            const arg = node.arg;
            const negFactor = node.subtraction ? Sub : Neg;
            if (arg.type === NodeType.Mul) {
                const factors = arg.args.map(mathBlocksToKAS);
                factors.unshift(negFactor);
                return new KAS.Mul(factors);
            }
            return new KAS.Mul(negFactor, mathBlocksToKAS(arg));
        }

        case NodeType.Equals: {
            const left = mathBlocksToKAS(node.args[0]);
            const right = mathBlocksToKAS(node.args[0]);
            return new KAS.Eq(left, "=", right);
        }
        case NodeType.LessThan: {
            const left = mathBlocksToKAS(node.args[0]);
            const right = mathBlocksToKAS(node.args[0]);
            return new KAS.Eq(left, "<", right);
        }
        case NodeType.LessThanOrEquals: {
            const left = mathBlocksToKAS(node.args[0]);
            const right = mathBlocksToKAS(node.args[0]);
            return new KAS.Eq(left, "<=", right);
        }
        case NodeType.GreaterThan: {
            const left = mathBlocksToKAS(node.args[0]);
            const right = mathBlocksToKAS(node.args[0]);
            return new KAS.Eq(left, ">", right);
        }
        case NodeType.GreaterThanOrEquals: {
            const left = mathBlocksToKAS(node.args[0]);
            const right = mathBlocksToKAS(node.args[0]);
            return new KAS.Eq(left, ">=", right);
        }

        // TODO: add support for `e` and `i`
        case NodeType.Pi: {
            return new KAS.Const();
        }
    }
}
