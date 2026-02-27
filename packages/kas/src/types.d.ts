export type CompareOptions = {
    // Check that the two expressions have the same form
    form: boolean;
    // Check that the second expression is simplified
    simplify: boolean;
    // Variables from other answer forms (e.g. intentionally wrong answers) that
    // are "known" — students using these should be considered to have valid answers
    extraKeys?: ReadonlyArray<string>;
};

export type CompareResult = {
    equal: boolean;
    wrongVariableCase?: boolean;
    wrongVariableNames?: boolean;
    message: string | null;
};

export type ExpressionVars = {
    equal: boolean;
    equalIgnoringCase: boolean;
    hasUnexpectedVars: boolean;
};

// TODO: Convert to interface and make the various Expr's implement it?
export type Expression = {
    compare: (expr: Expression) => boolean;
    sameVars: (
        expr: Expression,
        extraKeys?: ReadonlyArray<string>,
    ) => ExpressionVars;
    sameForm: (expr: Expression) => unknown;
    isSimplified: () => boolean;
};
