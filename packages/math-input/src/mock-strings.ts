import type {MathInputStrings} from "./types";

/**
 * Mock strings for the Math Input package, to be used for tests and Storybook.
 */
export const strings: MathInputStrings = {
    mathInputBox: "Math input box",
    fingerTap: "Tap with one or two fingers to open keyboard",
    before: ({obj}: {obj: string}) => "before %(obj)s".replace("%(obj)s", obj),
    after: ({obj}: {obj: string}) => "after %(obj)s".replace("%(obj)s", obj),
    "beginning of": ({obj}: {obj: string}) =>
        "beginning of %(obj)s".replace("%(obj)s", obj),
    "end of": ({obj}: {obj: string}) =>
        "end of %(obj)s".replace("%(obj)s", obj),
    Baseline: "Baseline",
    Superscript: "Superscript",
    selected: ({obj}: {obj: string}) =>
        "%(obj)s selected".replace("%(obj)s", obj),
    "no answer": "no answer",
    "nothing selected": "nothing selected",
    "nothing to the right": "nothing to the right",
    "nothing to the left": "nothing to the left",
    "block is empty": "block is empty",
    "nothing above": "nothing above",
    labelValue: ({label, value}: {label: string; value: string}) =>
        "%(label)s: %(value)s"
            .replace("%(label)s", label)
            .replace("%(value)s", value),
    plus: "Plus",
    minus: "Minus",
    negative: "Negative",
    multiply: "Multiply",
    divide: "Divide",
    decimal: "Decimal",
    percent: "Percent",
    multiply2: "Multiply",
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
    cosine: "Cosine",
    tangent: "Tangent",
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
