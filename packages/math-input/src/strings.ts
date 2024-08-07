/**
 * The translated strings that are used to render the Math Input.
 */
export type MathInputStrings = {
    mathInputBox: string;
    fingerTap: string;
    before: ({obj}: {obj: string}) => string;
    after: ({obj}: {obj: string}) => string;
    "beginning of": ({obj}: {obj: string}) => string;
    "end of": ({obj}: {obj: string}) => string;
    Baseline: string;
    Superscript: string;
    selected: ({obj}: {obj: string}) => string;
    "no answer": string;
    "nothing selected": string;
    "nothing to the right": string;
    "nothing to the left": string;
    "block is empty": string;
    "nothing above": string;
    labelValue: ({label, value}: {label: string; value: string}) => string;
    plus: string;
    minus: string;
    negative: string;
    times: string;
    divide: string;
    decimal: string;
    percent: string;
    cdot: string;
    equalsSign: string;
    notEqualsSign: string;
    greaterThanSign: string;
    lessThanSign: string;
    greaterThanOrEqualToSign: string;
    lessThanOrEqualSign: string;
    fractionExpressionInNumerator: string;
    fractionExcludingExpression: string;
    customExponent: string;
    square: string;
    cube: string;
    squareRoot: string;
    cubeRoot: string;
    radicalWithCustomRoot: string;
    leftParenthesis: string;
    rightParenthesis: string;
    naturalLog: string;
    logBase10: string;
    logCustomBase: string;
    sine: string;
    sin: string;
    cosine: string;
    cos: string;
    tangent: string;
    tan: string;
    pi: string;
    theta: string;
    upArrow: string;
    rightArrow: string;
    downArrow: string;
    leftArrow: string;
    navOutOfParentheses: string;
    navOutOfExponent: string;
    navOutOfBase: string;
    navIntoNumerator: string;
    navOutOfNumeratorIntoDenominator: string;
    navOutOfDenominator: string;
    delete: string;
    dismiss: string;
};

/**
 * Untranslated strings used in the math input. To be used by an external
 * translator to produce translated strings, passed in as `MathInputStrings`.
 */
export const strings: {
    [key in keyof MathInputStrings]:
        | string
        | {context?: string; message: string}
        | {context?: string; one: string; other: string};
} = {
    mathInputBox: "Math input box",
    fingerTap: "Tap with one or two fingers to open keyboard",
    before: "before %(obj)s",
    after: "after %(obj)s",
    "beginning of": "beginning of %(obj)s",
    "end of": "end of %(obj)s",
    Baseline: "Baseline",
    Superscript: "Superscript",
    selected: "%(obj)s selected",
    "no answer": "no answer",
    "nothing selected": "nothing selected",
    "nothing to the right": "nothing to the right",
    "nothing to the left": "nothing to the left",
    "block is empty": "block is empty",
    "nothing above": "nothing above",
    labelValue: "%(label)s: %(value)s",
    plus: {
        context: "A label for a 'plus' sign.",
        message: "Plus",
    },
    minus: {context: "A label for a 'minus' sign.", message: "Minus"},
    negative: {context: "A label for a 'negative' sign.", message: "Negative"},
    times: {context: "A label for a 'multiply' sign.", message: "Multiply"},
    divide: {context: "A label for a 'divide' sign.", message: "Divide"},
    decimal: {
        context: "A label for a 'decimal' sign (represented as '.' or ',').",
        message: "Decimal",
    },
    percent: {
        context: "A label for a 'percent' sign (represented as '%').",
        message: "Percent",
    },
    cdot: {
        context:
            "A label for a 'centered dot' multiplication sign (represented as '⋅').",
        message: "Multiply",
    },
    equalsSign: {
        context: "A label for an 'equals' sign (represented as '=').",
        message: "Equals sign",
    },
    notEqualsSign: {
        context: "A label for a 'not-equals' sign (represented as '≠').",
        message: "Not-equals sign",
    },
    greaterThanSign: {
        context: "A label for a 'greater than' sign (represented as '>').",
        message: "Greater than sign",
    },
    lessThanSign: {
        context: "A label for a 'less than' sign (represented as '<').",
        message: "Less than sign",
    },
    greaterThanOrEqualToSign: {
        context:
            "A label for a 'greater than or equal to' sign (represented as '≥').",
        message: "Greater than or equal to sign",
    },
    lessThanOrEqualSign: {
        context:
            "A label for a 'less than or equal to' sign (represented as '≤').",
        message: "Less than or equal to sign",
    },
    fractionExpressionInNumerator: {
        context:
            "A label for a button that creates a new fraction and puts the current expression in the numerator of that fraction.",
        message: "Fraction, with current expression in numerator",
    },
    fractionExcludingExpression: {
        context:
            "A label for a button that creates a new fraction next to the cursor.",
        message: "Fraction, excluding the current expression",
    },
    customExponent: {
        context:
            "A label for a button that will allow the user to input a custom exponent.",
        message: "Custom exponent",
    },
    square: {
        context:
            "A label for a button that will square (take to the second power) some math.",
        message: "Square",
    },
    cube: {
        context:
            "A label for a button that will cube (take to the third power) some math.",
        message: "Cube",
    },
    squareRoot: {
        context:
            "A label for a button that will allow the user to input a square root.",
        message: "Square root",
    },
    cubeRoot: {
        context:
            "A label for a button that will allow the user to input a cube root.",
        message: "Cube root",
    },
    radicalWithCustomRoot: {
        context:
            "A label for a button that will allow the user to input a radical with a custom root.",
        message: "Radical with custom root",
    },
    leftParenthesis: {
        context:
            "A label for a button that will allow the user to input a left parenthesis (i.e. '(')",
        message: "Left parenthesis",
    },
    rightParenthesis: {
        context:
            "A label for a button that will allow the user to input a right parenthesis (i.e. ')')",
        message: "Right parenthesis",
    },
    naturalLog: {
        context:
            "A label for a button that will allow the user to input a natural logarithm.",
        message: "Natural logarithm",
    },
    logBase10: {
        context:
            "A label for a button that will allow the user to input a logarithm with base 10.",
        message: "Logarithm with base 10",
    },
    logCustomBase: {
        context:
            "A label for a button that will allow the user to input a logarithm with a custom base.",
        message: "Logarithm with custom base",
    },
    sine: {
        context:
            "A label for a button that will allow the user to input a sine function.",
        message: "Sine",
    },
    sin: {
        context:
            "A label for a button that will allow the user to input a sine function (shorthand version).",
        message: "sin",
    },
    cosine: {
        context:
            "A label for a button that will allow the user to input a cosine function.",
        message: "Cosine",
    },
    cos: {
        context:
            "A label for a button that will allow the user to input a cosine function (shorthand version).",
        message: "cos",
    },
    tangent: {
        context:
            "A label for a button that will allow the user to input a tangent function.",
        message: "Tangent",
    },
    tan: {
        context:
            "A label for a button that will allow the user to input a tangent function (shorthand version).",
        message: "tan",
    },
    pi: {
        context:
            "A label for a button that will allow the user to input the mathematical constant pi (i.e., π)",
        message: "Pi",
    },
    theta: {
        context:
            "A label for a button that will allow the user to input the mathematical constant theta (i.e., θ)",
        message: "Theta",
    },
    upArrow: "Up arrow",
    rightArrow: "Right arrow",
    downArrow: "Down arrow",
    leftArrow: "Left arrow",
    navOutOfParentheses: "Navigate right out of a set of parentheses",
    navOutOfExponent: "Navigate right out of an exponent",
    navOutOfBase: "Navigate right out of a base",
    navIntoNumerator: "Navigate right into the numerator of a fraction",
    navOutOfNumeratorIntoDenominator:
        "Navigate right out of the numerator and into the denominator",
    navOutOfDenominator: "Navigate right out of the denominator of a fraction",
    delete: "Delete",
    dismiss: {
        context: "A label for a button that will dismiss/hide a keypad.",
        message: "Dismiss",
    },
};

/**
 * Mock strings for the Math Input package, to be used for tests and Storybook.
 */
export const mockStrings: MathInputStrings = {
    mathInputBox: "Math input box",
    fingerTap: "Tap with one or two fingers to open keyboard",
    before: ({obj}: {obj: string}) => `before ${obj}`,
    after: ({obj}: {obj: string}) => `after ${obj}`,
    "beginning of": ({obj}: {obj: string}) => `beginning of ${obj}`,
    "end of": ({obj}: {obj: string}) => `end of ${obj}`,
    Baseline: "Baseline",
    Superscript: "Superscript",
    selected: ({obj}: {obj: string}) => `${obj} selected`,
    "no answer": "no answer",
    "nothing selected": "nothing selected",
    "nothing to the right": "nothing to the right",
    "nothing to the left": "nothing to the left",
    "block is empty": "block is empty",
    "nothing above": "nothing above",
    labelValue: ({label, value}: {label: string; value: string}) =>
        `${label}: ${value}`,
    plus: "Plus",
    minus: "Minus",
    negative: "Negative",
    times: "Multiply",
    divide: "Divide",
    decimal: "Decimal",
    percent: "Percent",
    cdot: "Multiply",
    equalsSign: "Equals sign",
    notEqualsSign: "Not-equals sign",
    greaterThanSign: "Greater than sign",
    lessThanSign: "Less than sign",
    greaterThanOrEqualToSign: "Greater than or equal to sign",
    lessThanOrEqualSign: "Less than or equal to sign",
    fractionExpressionInNumerator:
        "Fraction, with current expression in numerator",
    fractionExcludingExpression: "Fraction, excluding the current expression",
    customExponent: "Custom exponent",
    square: "Square",
    cube: "Cube",
    squareRoot: "Square root",
    cubeRoot: "Cube root",
    radicalWithCustomRoot: "Radical with custom root",
    leftParenthesis: "Left parenthesis",
    rightParenthesis: "Right parenthesis",
    naturalLog: "Natural logarithm",
    logBase10: "Logarithm with base 10",
    logCustomBase: "Logarithm with custom base",
    sine: "Sine",
    sin: "sin",
    cosine: "Cosine",
    cos: "cos",
    tangent: "Tangent",
    tan: "tan",
    pi: "Pi",
    theta: "Theta",
    upArrow: "Up arrow",
    rightArrow: "Right arrow",
    downArrow: "Down arrow",
    leftArrow: "Left arrow",
    navOutOfParentheses: "Navigate right out of a set of parentheses",
    navOutOfExponent: "Navigate right out of an exponent",
    navOutOfBase: "Navigate right out of a base",
    navIntoNumerator: "Navigate right into the numerator of a fraction",
    navOutOfNumeratorIntoDenominator:
        "Navigate right out of the numerator and into the denominator",
    navOutOfDenominator: "Navigate right out of the denominator of a fraction",
    delete: "Delete",
    dismiss: "Dismiss",
};
