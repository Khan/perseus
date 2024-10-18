import {type Token, type ParseOptions, lex} from "./lexer";
import {
    Abs,
    Add,
    Const,
    Eq,
    Float,
    Func,
    Int,
    Log,
    Mul,
    Pow,
    Trig,
    Var,
} from "./nodes";

import type {Expr} from "./nodes";

// Parser implements a recursive descent parser that can parse a simple
// subset of LaTeX.  See lexer.ts for a list of the commands it supports.
//
// WARNING: This class should not be used directly, instead use the `parse`.
//
// The parser is split into two parts:
// - `lex` (defined in lexer.ts) splits a string into multiple tokens
//   which are then consumed by the Parser class.
// - `Parser` is a class that consumes an array of tokens and produces
//   an AST representing the mathmatical expression using nodes from
//   nodes.js.
//
// The grammar for this parser is shown below.  Each rule is in lowercase
// and can have multiple options.  The parser attempts each option in the
// order they appear except for when we know the options are mutually
// exclusive.  Tokens appear either as uppercase words or quoted strings.
// Parens (when they appear outside quotes) are used for grouping.
// '*' and '?' have the same meaning they do in regexes.
//
// equation:
//      expression SIGN expression EOF
//      expression EOF
//      EOF
// expression:
//      additive
// additive:
//      multiplicative (("+" | "-") multiplicative)*
// multiplicative:
//      negative (trilog | (("*" | "/") negative))*
// negative:
//      "-"* triglog
// trigfunc:
//      TRIG ("^" negative)?
//      TRIGINV
// logbase:
//      LN
//      LOG ("_" subscriptable)?
// triglog:
//      (trigfunc | logbase) negative
//      power
// power:
//      primative ("^" negative)
// subscriptable:
//      VAR ("_" subscriptable)?
//      CONST
//      INT
//      FLOAT
//      "{" additive "}"
//      "(" additive ")"
// invocation:
//      SQRT "(" additive ")"
//      SQRT "{" additive "}"
//      SQRT "[" additive "]" "{" additive "}"
//      ABS "(" additive ")"
//      "|" additive "|"
//      "LEFT|" additive "RIGHT|"
//      FUNC "(" additive ")"
// primitive:
//      subscriptable
//      invocation
//      FRAC "{" additive "}" "{" additive "}"
//
// `Parser` has a method for each of the grammar rules.  Its `parse` method
// begins parsing by calling the `equation` method.  From the rules above,
// `equation` can parse either an equation or an `additive` (expression).
// Calling`additive` tries to parse one or more `multiplicative`s and so on.
//
// Parsing the number `5` results in the following methods would be called
// in order:
// - parse
// - equation
// - additive
// - multiplicative
// - negative
// - triglog
// - power
// - primitive
// - subscriptable
//
// `subscriptable` would return a `Num` node (defined in nodes.js) which
// would then be bubbled up the call stack and be returned by `parse`.

export class Parser {
    tokens: Token[];
    index: number;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.index = 0;
    }

    // Returns the next token without consuming it.
    peek() {
        const next = this.tokens[this.index];
        return next;
    }

    // Consumes the next token.
    consume() {
        this.index++;
    }

    // Checks if the next token's kind is the specified `tokenKind` and
    // consumes the token.  Otherwise, it throws an error.
    expect<Kind extends Token["kind"]>(tokenKind: Kind) {
        const next = this.peek();
        if (next.kind !== tokenKind) {
            throw new Error(`Expected ${tokenKind} but got ${next.kind}`);
        }
        this.consume();
    }

    // Checks if the next token's kind is the specified `tokenKind` and
    // consumes the token and return the token's value.  Otherwise, it
    // throws an error.
    //
    // This method can only be called with `tokenKind`s for tokens that
    // have a `value` property.  See lexer.ts.
    expectValue<Kind extends "FUNC" | "VAR" | "TRIG">(tokenKind: Kind): string {
        const next = this.peek();
        if (next.kind !== tokenKind) {
            throw new Error(`Expected ${tokenKind} but got ${next.kind}`);
        }
        this.consume();
        return next.value;
    }

    parse(): Expr {
        return this.equation();
    }

    equation(): Expr {
        if (this.peek().kind === "EOF") {
            return new Add([]);
        }
        const left = this.additive();
        const next = this.peek();
        if (next.kind === "EOF") {
            return left;
        }
        if (next.kind === "SIGN") {
            this.consume(); // equality operator
            const right = this.additive();
            return new Eq(left, next.value, right);
        }
        throw new Error(`Expected SIGN token but got ${next.kind}`);
    }

    additive(): Expr {
        let left = this.multiplicative();

        let op = this.peek();
        while (op.kind === "+" || op.kind === "-") {
            this.consume(); // op
            const right = this.multiplicative();
            switch (op.kind) {
                case "+":
                    left = Add.createOrAppend(left, right); // left associative
                    break;
                case "-":
                    left = Add.createOrAppend(
                        left,
                        Mul.handleNegative(right, "subtract"),
                    ); // left associative
                    break;
            }
            op = this.peek();
        }

        return left;
    }

    additiveBetween<Kind extends Token["kind"]>(start: Kind, end: Kind): Expr {
        this.expect(start);
        const node = this.additive();
        this.expect(end);
        return node;
    }

    multiplicative(): Expr {
        let left = this.negative();

        while (this.index < this.tokens.length) {
            const index = this.index; // save state
            try {
                // the second term in an implicit multiplication cannot be negative
                const right = this.triglog();
                left = Mul.fold(Mul.createOrAppend(left, right)); // left associative
            } catch (e) {
                this.index = index; // restore state
                const op = this.peek();
                if (op.kind === "*" || op.kind === "/") {
                    this.consume(); // op
                    const right = this.negative();
                    switch (op.kind) {
                        case "*":
                            left = Mul.fold(Mul.createOrAppend(left, right)); // left associative
                            break;
                        case "/":
                            left = Mul.fold(Mul.handleDivide(left, right)); // left associative
                            break;
                    }
                } else {
                    break;
                }
            }
        }

        return left;
    }

    negative(): Expr {
        if (this.peek().kind === "-") {
            this.consume(); // -
            return Mul.handleNegative(this.negative());
        } else {
            return this.triglog();
        }
    }

    trigfunc(): [string] | [string, Expr] {
        const index = this.index; // save state
        try {
            const left: [string] = [this.expectValue("TRIG")];
            const op = this.peek();
            if (op.kind === "^") {
                this.consume(); // ^
                const right = this.negative();
                return [left[0], right];
            } else {
                return left;
            }
        } catch (e) {
            this.index = index; // restore state
            const next = this.peek();
            if (next.kind === "TRIGINV") {
                this.consume(); // triginv
                return [next.value];
            } else {
                throw new Error(`Expected TRIGINV but got ${next.kind}`);
            }
        }
    }

    logbase(): Expr {
        const next = this.peek();
        switch (next.kind) {
            case "LN":
                this.consume(); // LN
                return Log.natural();
            case "LOG":
                this.consume(); // LOG
                if (this.peek().kind === "_") {
                    this.consume(); // _
                    return this.subscriptable();
                } else {
                    return Log.common();
                }
            default:
                throw new Error(
                    `Expected either ln or log but got ${next.kind}`,
                );
        }
    }

    triglog(): Expr {
        const index = this.index; // save state
        try {
            const func = this.trigfunc();
            const arg = this.negative();
            return Trig.create(func, arg);
        } catch {
            this.index = index; // restore state
            try {
                const func = this.logbase();
                const arg = this.negative();
                return Log.create(func, arg);
            } catch {
                this.index = index; // restore state
                return this.power();
            }
        }
    }

    power(): Expr {
        const base = this.primitive();
        const op = this.peek();
        if (op.kind === "^") {
            this.consume(); // ^
            const exp = this.negative();
            return new Pow(base, exp);
        } else {
            return base;
        }
    }

    subscriptable(): Expr {
        const index = this.index; // save state
        try {
            const left = this.expectValue("VAR");
            if (this.peek().kind === "_") {
                this.consume(); // _
                const right = this.subscriptable();
                return new Var(left, right);
            } else {
                return new Var(left);
            }
        } catch (e) {
            this.index = index; // restore state
            const next = this.peek();
            switch (next.kind) {
                case "CONST":
                    this.consume(); // CONST
                    return new Const(next.value.toLocaleLowerCase());
                case "INT":
                    this.consume(); // INT
                    return Int.create(parseInt(next.value, 10));
                case "FLOAT":
                    this.consume(); // FLOAT
                    return Float.create(parseFloat(next.value));
                case "{": {
                    const node = this.additiveBetween("{", "}");
                    return node.completeParse(); // post-process Trig ndoes with exponents
                }
                case "(": {
                    const node = this.additiveBetween("(", ")");
                    // post-process Trig ndoes with exponents
                    return node.completeParse().addHint("parens"); // this probably shouldn't be a hint...
                }
                default:
                    throw new Error(
                        `Expected either CONST, INT, FLOAT, {, or ( but got ${next.kind}`,
                    );
            }
        }
    }

    invocation(): Expr {
        const next = this.peek();
        switch (next.kind) {
            case "SQRT": {
                this.consume(); // SQRT
                const next = this.peek();
                switch (next.kind) {
                    case "(": {
                        const arg = this.additiveBetween("(", ")");
                        return Pow.sqrt(arg);
                    }
                    case "{": {
                        const arg = this.additiveBetween("{", "}");
                        return Pow.sqrt(arg);
                    }
                    case "[": {
                        const index = this.additiveBetween("[", "]");
                        const arg = this.additiveBetween("{", "}");
                        return Pow.nthroot(arg, index);
                    }
                    default:
                        throw new Error(
                            `Expected (, {, or [ but got ${next.kind}`,
                        );
                }
            }
            case "ABS": {
                this.consume(); // ABS
                const arg = this.additiveBetween("(", ")");
                return new Abs(arg);
            }
            case "|": {
                const arg = this.additiveBetween("|", "|");
                return new Abs(arg);
            }
            case "LEFT|": {
                const arg = this.additiveBetween("LEFT|", "RIGHT|");
                return new Abs(arg);
            }
            case "FUNC": {
                this.consume(); // FUNC
                const arg = this.additiveBetween("(", ")");
                return new Func(next.value, arg);
            }
            default:
                throw new Error(
                    `Expected sqrt, abs, |, LEFT|, or FUNC but got ${next.kind}`,
                );
        }
    }

    primitive(): Expr {
        const index = this.index; // save state
        try {
            return this.subscriptable();
        } catch (e) {
            this.index = index; // restore state
            try {
                return this.invocation();
            } catch (e) {
                this.index = index; // restore state
                this.expect("FRAC");
                const n = this.additiveBetween("{", "}");
                const d = this.additiveBetween("{", "}");
                return Mul.handleDivide(n, d);
            }
        }
    }
}

type ParseResult =
    | {
          parsed: true;
          expr: Expr;
      }
    | {
          parsed: false;
          error: string;
      };

export function parse(input: string, options?: ParseOptions): ParseResult {
    try {
        const tokens = lex(input, options);
        const parser = new Parser(tokens);
        const expr = parser.parse().completeParse();
        return {parsed: true, expr};
    } catch (e) {
        return {parsed: false, error: (e as Error).message};
    }
}
