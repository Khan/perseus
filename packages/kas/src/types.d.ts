export interface CompareOptions {
    // Check that the two expressions have the same form
    form: boolean;
    // Check that the second expression is simplified
    simplify: boolean;
}

export interface CompareResult {
    equal: boolean;
    message: string | null;
}

export interface Expression {
    compare: (expr: Expression) => boolean;
    getVars: () => string[];
    sameForm: (expr: Expression) => unknown;
    isSimplified: () => boolean;
}
