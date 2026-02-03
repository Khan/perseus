import {SpeechRuleEngine} from "@khanacademy/mathjax-renderer";
import MathQuill from "mathquill";

import {inJest} from "../../utils";

import type {
    MathQuillInterface,
    MathFieldConfig,
    MathFieldInterface,
} from "./mathquill-types";
import type {MathInputStrings} from "../../strings";

// We only need one MathQuill instance (referred to as MQ in the docs)
// and that contains some MQ constants and the MathField constructor
export const mathQuillInstance: MathQuillInterface = MathQuill.getInterface(3);

const createBaseConfig = (): MathFieldConfig => ({
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
        "arctg",
        "arg",
        "cos",
        "cosec",
        "cossec",
        "cosh",
        "cot",
        "cotg",
        "coth",
        "csc",
        "ctg",
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
        "tg",
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
    spaceBehavesLikeTab: true,
});

/**
 * Creates a new [MathField](http://docs.mathquill.com/en/latest/Api_Methods/#mqmathfieldhtml_element-config)
 * instance within the given `container`.
 *
 * An optional configuration callback can be provided to customize
 * the created MathField. A default configuration is passed to this
 * callback which can then be adjusted as needed. The configuration
 * returned from this callback is used to create the MathField.
 * This allows callers to do minimal configuration as only configs
 * that vary from the default need to be provided.
 */
export function createMathField(
    container: HTMLDivElement | HTMLSpanElement,
    locale: string,
    strings: MathInputStrings,
    configCallback?: (baseConfig: MathFieldConfig) => MathFieldConfig,
): MathFieldInterface {
    const baseConfig = createBaseConfig();
    const config = configCallback ? configCallback(baseConfig) : baseConfig;

    const mathField = mathQuillInstance
        .MathField(container, config)
        .setAriaLabel(strings.mathInputBox)
        .setAriaStringsOverrideMap({
            before: (obj) => strings.before({obj}),
            after: (obj) => strings.after({obj}),
            "beginning of": (obj) => strings["beginning of"]({obj}),
            "end of": (obj) => strings["end of"]({obj}),
            Baseline: strings.Baseline,
            Superscript: strings.Superscript,
            selected: (obj) => strings.selected({obj}),
            "no answer": strings["no answer"],
            "nothing selected": strings["nothing selected"],
            "nothing to the right": strings["nothing to the right"],
            "nothing to the left": strings["nothing to the left"],
            "block is empty": strings["block is empty"],
            "nothing above": strings["nothing above"],
            labelValue: (label, value) => strings.labelValue({label, value}),
        }) as MathFieldInterface;

    // We should avoid running SpeechRuleEngine.setup() in Jest. It makes an
    //   HTTP request to fetch non-english speech rules, and cannot be easily
    //   mocked in consuming packages now that we do not bundle source code.
    //   When it eventually times out, it will cause arbitrary test failures.
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !inJest &&
        SpeechRuleEngine.setup(locale).then((SRE) =>
            mathField.setMathspeakOverride(SRE.texToSpeech),
        );

    return mathField;
}
