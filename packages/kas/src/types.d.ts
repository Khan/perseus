export type CompareOptions = {
    // Check that the two expressions have the same form
    form: boolean;
    // Check that the second expression is simplified
    simplify: boolean;
};

export type ExpressionVars = {
    equal: boolean;
    equalIgnoringCase: boolean;
};

export type Expression = {
    compare: (expr: Expression) => boolean;
    sameVars: (expr: Expression) => ExpressionVars;
    sameForm: (expr: Expression) => unknown;
    isSimplified: () => boolean;
};
