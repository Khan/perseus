export type Token =
    | {kind: "WHITESPACE"}
    | {kind: "INT"; value: string}
    | {kind: "FLOAT"; value: string}
    | {kind: "^"}
    | {kind: "*"}
    | {kind: "/"}
    | {kind: "-"}
    | {kind: "+"}
    | {kind: "("}
    | {kind: ")"}
    | {kind: "["}
    | {kind: "]"}
    | {kind: "{"}
    | {kind: "}"}
    | {kind: "|"}
    | {kind: "!"} // unused
    | {kind: "_"}
    | {kind: "LEFT|"}
    | {kind: "RIGHT|"}
    | {kind: "SIGN"; value: string} // (in)equality
    | {kind: "FRAC"}
    | {kind: "sqrt"}
    | {kind: "abs"}
    | {kind: "ln"}
    | {kind: "log"}
    | {kind: "TRIG"; value: string}
    | {kind: "TRIGINV"; value: string}
    | {kind: "CONST"; value: string}
    | {kind: "VAR"; value: string} // identifier
    | {kind: "FUNC"; value: string}
    | {kind: "EOF"}
    | {kind: "INVALID"};

// Most tokens don't have any additional data.  For those that
// do, we use a thunk to get the token based on the match string.
type Rule = [string, Token | ((match: string) => Token)];

const rules: Rule[] = [
    ["\\s+", {kind: "WHITESPACE"}],
    ["\\\\space", {kind: "WHITESPACE"}],
    ["\\\\ ", () => ({kind: "WHITESPACE"})],
    ["[0-9]+\\.?", (value) => ({kind: "INT", value})],
    ["([0-9]+)?\\.[0-9]+", (value) => ({kind: "FLOAT", value})],
    ["\\*\\*", {kind: "^"}],
    ["\\*", {kind: "*"}],
    ["\\\\cdot|\u00b7", {kind: "*"}],
    ["\\\\times|\u00d7", {kind: "*"}],
    ["\\\\ast", {kind: "*"}],
    ["\\/", {kind: "/"}],
    ["\\\\div|\u00F7", {kind: "/"}],
    ["-", {kind: "-"}],
    ["\u2212", {kind: "-"}], // minus
    ["\\+", {kind: "+"}],
    ["\\^", {kind: "^"}],
    ["\\(", {kind: "("}],
    ["\\)", {kind: ")"}],
    ["\\\\left\\(", {kind: "("}],
    ["\\\\right\\)", {kind: ")"}],
    ["\\[", {kind: "["}],
    ["\\]", {kind: "]"}],
    ["\\{", {kind: "{"}],
    ["\\}", {kind: "}"}],
    ["\\\\left\\{", {kind: "{"}],
    ["\\\\right\\}", {kind: "}"}],
    ["_", {kind: "_"}],
    ["\\|", {kind: "|"}],
    ["\\\\left\\|", {kind: "LEFT|"}],
    ["\\\\right\\|", {kind: "RIGHT|"}],
    ["\\!", {kind: "!"}], // not yet interpreted
    ["<=|>=|<>|<|>|=", (value) => ({kind: "SIGN", value})],
    ["\\\\le", {kind: "SIGN", value: "<="}],
    ["\\\\ge", {kind: "SIGN", value: ">="}],
    ["\\\\leq", {kind: "SIGN", value: "<="}],
    ["\\\\geq", {kind: "SIGN", value: ">="}],
    ["=\\/=", {kind: "SIGN", value: "<>"}],
    ["\\\\ne", {kind: "SIGN", value: "<>"}],
    ["\\\\neq", {kind: "SIGN", value: "<>"}],
    ["\u2260", {kind: "SIGN", value: "<>"}], // ne
    ["\u2264", {kind: "SIGN", value: "<="}], // le
    ["\u2265", {kind: "SIGN", value: ">="}], // ge
    ["\\\\frac", {kind: "FRAC"}],
    ["\\\\dfrac", {kind: "FRAC"}],
    ["sqrt|\\\\sqrt", {kind: "sqrt"}],
    ["abs|\\\\abs", {kind: "abs"}],
    ["ln|\\\\ln", {kind: "ln"}],
    ["log|\\\\log", {kind: "log"}],
    ["sin|cos|tan", (value) => ({kind: "TRIG", value})],
    ["csc|sec|cot", (value) => ({kind: "TRIG", value})],
    ["sinh|cosh|tanh", (value) => ({kind: "TRIG", value})],
    ["csch|sech|coth", (value) => ({kind: "TRIG", value})],
    ["\\\\sin", {kind: "TRIG", value: "sin"}],
    ["\\\\cos", {kind: "TRIG", value: "cos"}],
    ["\\\\tan", {kind: "TRIG", value: "tan"}],
    ["\\\\csc", {kind: "TRIG", value: "csc"}],
    ["\\\\sec", {kind: "TRIG", value: "sec"}],
    ["\\\\cot", {kind: "TRIG", value: "cot"}],
    ["\\\\arcsin", {kind: "TRIG", value: "arcsin"}], // should this be TRIGINV
    ["\\\\arccos", {kind: "TRIG", value: "arccos"}], // should this be TRIGINV
    ["\\\\arctan", {kind: "TRIG", value: "arctan"}], // should this be TRIGINV
    ["\\\\arccsc", {kind: "TRIG", value: "arccsc"}], // should this be TRIGINV
    ["\\\\arcsec", {kind: "TRIG", value: "arcsec"}], // should this be TRIGINV
    ["\\\\arccot", {kind: "TRIG", value: "arccot"}], // should this be TRIGINV
    ["arcsin|arccos|arctan", (value) => ({kind: "TRIGINV", value})],
    ["arccsc|arcsec|arccot", (value) => ({kind: "TRIGINV", value})],
    ["\\\\sinh", {kind: "TRIG", value: "sinh"}],
    ["\\\\cosh", {kind: "TRIG", value: "cosh"}],
    ["\\\\tanh", {kind: "TRIG", value: "tanh"}],
    ["\\\\csch", {kind: "TRIG", value: "csch"}],
    ["\\\\sech", {kind: "TRIG", value: "sech"}],
    ["\\\\coth", {kind: "TRIG", value: "coth"}],
    ["pi", {kind: "CONST", value: "pi"}],
    ["\u03C0", {kind: "CONST", value: "pi"}], // pi
    ["\\\\pi", {kind: "CONST", value: "pi"}],
    ["theta", {kind: "VAR", value: "theta"}],
    ["\u03B8", {kind: "VAR", value: "theta"}], // theta
    ["\\\\theta", {kind: "VAR", value: "theta"}],
    ["phi", {kind: "VAR", value: "phi"}],
    ["\u03C6", {kind: "VAR", value: "phi"}], // phi
    ["\\\\phi", {kind: "VAR", value: "phi"}],
    ["[a-zA-Z]", (value) => ({kind: "VAR", value})], // TODO: post-process
    [".", {kind: "INVALID"}],
];

type PreparedRule = [RegExp, Token | ((match: string) => Token)];

const preparedRules: PreparedRule[] = rules.map((rule) => {
    const regex = new RegExp("^(?:" + rule[0] + ")");
    return [regex, rule[1]];
});

// TODO:
// - try each of the rules in order
// - pick the longest one and return token
// - update the input string so that we match the next token

const next = (
    input: string,
    preparedRules: PreparedRule[],
): [Token, string] => {
    let currentMatch: string = "";
    let token: Token = {kind: "INVALID"};

    for (const rule of preparedRules) {
        const match = input.match(rule[0]);
        if (match && match[0].length > currentMatch.length) {
            currentMatch = match[0];
            if (typeof rule[1] === "function") {
                token = rule[1](currentMatch);
            } else {
                token = rule[1];
            }
        }
    }

    if (currentMatch === "") {
        throw new Error(`No match for ${input}`);
    }

    return [token, input.slice(currentMatch.length)];
};

export type Options = {
    functions?: string[];
};

export const lex = (input: string, options?: Options): Token[] => {
    const tokens: Token[] = [];
    const constants = ["e"];
    const functions = options?.functions
        ? options.functions.filter((fn) => fn !== "i")
        : [];
    while (input.length > 0) {
        const [token, remainingInput] = next(input, preparedRules);
        if (token.kind === "VAR") {
            if (constants.includes(token.value)) {
                tokens.push({kind: "CONST", value: token.value});
            } else if (functions.includes(token.value)) {
                tokens.push({kind: "FUNC", value: token.value});
            } else {
                tokens.push(token);
            }
        } else if (token.kind === "WHITESPACE") {
            // Ignore whitespace
        } else {
            tokens.push(token);
        }
        input = remainingInput;
    }
    tokens.push({kind: "EOF"});
    return tokens;
};
