import type {MathFieldConfig} from "./mathquill-types";

function createBaseConfig(): MathFieldConfig {
    return {
        // LaTeX commands that, when typed, are immediately replaced by the
        // appropriate symbol. This does not include ln, log, or any of the
        // trig functions; those are always interpreted as commands.
        autoCommands: "pi theta phi sqrt nthroot",
        // Most of these autoOperatorNames are simply the MathQuill defaults.
        // We have to list them all in order to add the `sen` operator (see
        // comment below).
        autoOperatorNames: [
            "arccos",
            "arcsin",
            "arctan",
            "arg",
            "cos",
            "cosh",
            "cot",
            "coth",
            "csc",
            "deg",
            "det",
            "dim",
            "exp",
            "gcd",
            "hom",
            "inf",
            "ker",
            "lg",
            "lim",
            "liminf",
            "limsup",
            "ln",
            "log",
            "max",
            "min",
            "Pr",
            "projlim",
            "sec",
            // sen is used instead of sin in e.g. Portuguese
            "sen",
            "sin",
            "sinh",
            "sup",
            "tan",
            "tanh",
        ].join(" "),

        // Pop the cursor out of super/subscripts on arithmetic operators
        // or (in)equalities.
        charsThatBreakOutOfSupSub: "+-*/=<>≠≤≥",

        // Prevent excessive super/subscripts or fractions from being
        // created without operands, e.g. when somebody holds down a key
        supSubsRequireOperand: true,

        // The name of this option is somewhat misleading, as tabbing in
        // MathQuill breaks you out of a nested context (fraction/script)
        // if you're in one, but moves focus to the next input if you're
        // not. Spaces (with this option enabled) are just ignored in the
        // latter case.
        //
        // TODO(alex): In order to allow inputting mixed numbers, we will
        // have to accept spaces in certain cases. The desired behavior is
        // still to escape nested contexts if currently in one, but to
        // insert a space if not (we don't expect mixed numbers in nested
        // contexts). We should also limit to one consecutive space.
        spaceBehavesLikeTab: true,
    };
}
