import {type Token, type Options, lex} from "./lexer";
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

type Expr = any;

export class Parser {
    tokens: Token[];
    index: number;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
        this.index = 0;
    }

    peek() {
        const next = this.tokens[this.index];
        return next;
    }

    consume() {
        this.index++;
    }

    expect(tokenKind: string) {
        const next = this.peek();
        if (next.kind !== tokenKind) {
            throw new Error(`Expected ${tokenKind} but got ${next.kind}`);
        }
        this.consume();
    }

    parse() {
        return this.equation();
    }

    equation(): Expr {
        if (this.peek().kind === "EOF") {
            return new Add([]);
        }
        const left = this.expression();
        const next = this.peek();
        if (next.kind === "EOF") {
            return left;
        }
        if (next.kind === "SIGN") {
            this.consume(); // equality operator
            const right = this.expression();
            return new Eq(left, next.value, right);
        }
        throw new Error(`Expected SIGN token but got ${next.kind}`);
    }

    expression(): Add | Mul {
        return this.additive();
    }

    additive(): Add | Mul {
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

    multiplicative(): Mul {
        let left = this.negative();

        while (this.index < this.tokens.length) {
            const index = this.index; // save state
            try {
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

    negative() {
        if (this.peek().kind === "-") {
            this.consume(); // -
            return Mul.handleNegative(this.negative());
        } else {
            return this.triglog();
        }
    }

    trig(): [string] {
        const next = this.peek();
        if (next.kind === "TRIG") {
            this.consume(); // trig
            return [next.value];
        } else {
            throw new Error(`Expected TRIG token but tog ${next.kind}`);
        }
    }

    trigfunc(): [string] | [string, Expr] {
        const next = this.peek();
        // NOTE(kevin): We're able to reorder the rules for `trigfunc()`
        // so that "TRIGINV" is first only because there's no overlap
        // with what `trig()` matches.
        if (next.kind === "TRIGINV") {
            this.consume(); // triginv
            return [next.value];
        } else {
            const left = this.trig();
            const op = this.peek();
            if (op.kind === "^") {
                this.consume(); // ^
                const right = this.negative();
                return [left[0], right];
            } else {
                return left;
            }
        }
    }

    logbase() {
        const next = this.peek();
        this.consume();
        switch (next.kind) {
            case "ln":
                return Log.natural();
            case "log":
                if (this.peek().kind === "_") {
                    this.consume();
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

    triglog() {
        const index = this.index; // save state
        try {
            const left = this.trigfunc();
            const right = this.negative();
            return Trig.create(left, right);
        } catch {
            this.index = index; // restore state
            try {
                const left = this.logbase();
                const right = this.negative();
                return Log.create(left, right);
            } catch {
                this.index = index; // restore state
                return this.power();
            }
        }
    }

    power() {
        const left = this.primitive();
        const op = this.peek();
        if (op.kind === "^") {
            this.consume(); // ^
            const right = this.negative();
            return new Pow(left, right);
        } else {
            return left;
        }
    }

    variable(): string {
        const next = this.peek();
        if (next.kind === "VAR") {
            this.consume();
            return next.value;
        } else {
            throw new Error(`Expected VAR token but got ${next.kind}`);
        }
    }

    subscriptable() {
        const index = this.index; // save state
        try {
            const left = this.variable();
            if (this.peek().kind === "_") {
                this.consume();
                const right = this.subscriptable();
                return new Var(left, right);
            } else {
                return new Var(left);
            }
        } catch (e) {
            this.index = index; // restore state
            const next = this.peek();
            this.consume();
            switch (next.kind) {
                case "CONST":
                    return new Const(next.value.toLocaleLowerCase());
                case "INT":
                    // Why are we using the `Number` constructor instead of `parseInt`?
                    return Int.create(Number(next.value));
                case "FLOAT":
                    // Why are we using the `Number` constructor instead of `parseFlat`?
                    return Float.create(Number(next.value));
                case "{": {
                    const node = this.additive().completeParse(); // post-process Trig ndoes with exponents
                    this.expect("}");
                    return node;
                }
                case "(": {
                    const node = this.additive()
                        .completeParse() // post-process Trig ndoes with exponents
                        .addHint("parens"); // this probably shouldn't be a hint...
                    this.expect(")");
                    return node;
                }
                default:
                    throw new Error(
                        `Expected either CONST, INT, FLOAT, {, or ( but got ${next.kind}`,
                    );
            }
        }
    }

    function() {
        const next = this.peek();
        if (next.kind === "FUNC") {
            this.consume();
            return next.value;
        } else {
            throw new Error(`Expected FUNC token but got ${next.kind}`);
        }
    }

    invocation() {
        const next = this.peek();
        this.consume();
        switch (next.kind) {
            case "sqrt": {
                const next = this.peek();
                this.consume();
                switch (next.kind) {
                    case "(": {
                        const arg = this.additive();
                        this.expect(")");
                        return Pow.sqrt(arg);
                    }
                    case "{": {
                        const arg = this.additive();
                        this.expect("}");
                        return Pow.sqrt(arg);
                    }
                    case "[": {
                        const index = this.additive();
                        this.expect("]");
                        this.expect("{");
                        const arg = this.additive();
                        this.expect("}");
                        return Pow.nthroot(arg, index);
                    }
                    default:
                        throw new Error(
                            `Expected (, {, or [ but got ${next.kind}`,
                        );
                }
            }
            case "abs": {
                this.expect("(");
                const arg = this.additive();
                this.expect(")");
                return new Abs(arg);
            }
            case "|": {
                const arg = this.additive();
                this.expect("|");
                return new Abs(arg);
            }
            case "LEFT|": {
                const arg = this.additive();
                this.expect("RIGHT|");
                return new Abs(arg);
            }
            case "FUNC": {
                this.expect("(");
                const arg = this.additive();
                this.expect(")");
                return new Func(next.value, arg);
            }
            default:
                throw new Error(
                    `Expected sqrt, abs, |, LEFT|, or FUNC but got ${next.kind}`,
                );
        }
    }

    primitive() {
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
                this.expect("{");
                const left = this.additive();
                this.expect("}");
                this.expect("{");
                const right = this.additive();
                this.expect("}");
                return Mul.handleDivide(left, right);
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

export function parse(input: string, options?: Options): ParseResult {
    try {
        const tokens = lex(input, options);
        const parser = new Parser(tokens);
        const expr = parser.parse().completeParse();
        return {parsed: true, expr};
    } catch (e) {
        return {parsed: false, error: (e as Error).message};
    }
}
