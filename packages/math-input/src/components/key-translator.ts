import Key from "../data/keys";
import {MathQuillInterface} from "../types";

enum ActionType {
    WRITE = "write",
    CMD = "cmd",
    KEYSTROKE = "keystroke",
    MQ_END = 0,
}

type MathQuillCallback = (mathQuill: MathQuillInterface) => void;

function getGenericCallback(
    str: string,
    type: ActionType = ActionType.WRITE,
): MathQuillCallback {
    return function (mathQuill: MathQuillInterface) {
        switch (type) {
            case ActionType.WRITE: {
                mathQuill.write(str);
                return;
            }
            case ActionType.CMD: {
                mathQuill.cmd(str);
                return;
            }
            case ActionType.KEYSTROKE: {
                mathQuill.keystroke(str);
                return;
            }
        }
    };
}

const keyToMathquillMap: Record<Key, MathQuillCallback | null> = {
    CDOT: getGenericCallback("\\cdot"),
    COS: getGenericCallback("cos"),
    DECIMAL: getGenericCallback("."),
    DIVIDE: getGenericCallback("\\div"),
    EQUAL: getGenericCallback("="),
    EXP: getGenericCallback("^"),
    EXP_2: getGenericCallback("^2"),
    EXP_3: getGenericCallback("^3"),
    GEQ: getGenericCallback("\\geq"),
    GT: getGenericCallback(">"),
    LEQ: getGenericCallback("\\leq"),
    LN: getGenericCallback("\\ln"),
    LOG: getGenericCallback("\\log"),
    LOG_N: getGenericCallback("log_{ }"),
    LT: getGenericCallback("<"),
    MINUS: getGenericCallback("-"),
    NEGATIVE: getGenericCallback("-"),
    NEQ: getGenericCallback("\\neq"),
    PERCENT: getGenericCallback("%"),
    PERIOD: getGenericCallback("."),
    PLUS: getGenericCallback("+"),
    SIN: getGenericCallback("sin"),
    TAN: getGenericCallback("tan"),
    TIMES: getGenericCallback("\\times"),

    // The `FRAC_EXCLUSIVE` variant is handled manually, since we may need to do
    // some additional navigation depending on the cursor position.
    FRAC_INCLUSIVE: getGenericCallback("/", ActionType.CMD),
    LEFT_PAREN: getGenericCallback("(", ActionType.CMD),
    RIGHT_PAREN: getGenericCallback(")", ActionType.CMD),
    SQRT: getGenericCallback("sqrt", ActionType.CMD),
    PHI: getGenericCallback("\\phi", ActionType.CMD),
    PI: getGenericCallback("pi", ActionType.CMD),
    THETA: getGenericCallback("theta", ActionType.CMD),
    RADICAL: getGenericCallback("nthroot", ActionType.CMD),

    UP: getGenericCallback("Up", ActionType.KEYSTROKE),
    DOWN: getGenericCallback("Down", ActionType.KEYSTROKE),

    LOG_B: (mathQuill) => {
        mathQuill.typedText("log_");
        mathQuill.keystroke("Right");
        mathQuill.typedText("(");
        mathQuill.keystroke("Left");
        mathQuill.keystroke("Left");
    },

    NTHROOT3: (mathQuill) => {
        mathQuill.typedText("nthroot3");
        mathQuill.keystroke("Right");
    },

    POW: (mathQuill) => {
        const contents = mathQuill.latex();
        mathQuill.typedText("^");

        // If the input hasn't changed (for example, if we're
        // attempting to add an exponent on an empty input or an empty
        // denominator), insert our own "a^b"
        if (mathQuill.latex() === contents) {
            mathQuill.typedText("a^b");
        }
    },

    // These need to be overwritten by the consumer
    // if they're going to be used
    CUBE_ROOT: null,
    FRAC: null,
    FRAC_EXCLUSIVE: null,
    RIGHT: null,
    LEFT: null,
    BACKSPACE: null,
    DISMISS: null,
    JUMP_OUT_PARENTHESES: null,
    JUMP_OUT_EXPONENT: null,
    JUMP_OUT_BASE: null,
    JUMP_INTO_NUMERATOR: null,
    JUMP_OUT_NUMERATOR: null,
    JUMP_OUT_DENOMINATOR: null,
    NOOP: null,
    MANY: null,

    NUM_0: getGenericCallback("0"),
    NUM_1: getGenericCallback("1"),
    NUM_2: getGenericCallback("2"),
    NUM_3: getGenericCallback("3"),
    NUM_4: getGenericCallback("4"),
    NUM_5: getGenericCallback("5"),
    NUM_6: getGenericCallback("6"),
    NUM_7: getGenericCallback("7"),
    NUM_8: getGenericCallback("8"),
    NUM_9: getGenericCallback("9"),
    a: getGenericCallback("a"),
    b: getGenericCallback("b"),
    c: getGenericCallback("c"),
    d: getGenericCallback("d"),
    e: getGenericCallback("e"),
    f: getGenericCallback("f"),
    g: getGenericCallback("g"),
    h: getGenericCallback("h"),
    i: getGenericCallback("i"),
    j: getGenericCallback("j"),
    k: getGenericCallback("k"),
    l: getGenericCallback("l"),
    m: getGenericCallback("m"),
    n: getGenericCallback("n"),
    o: getGenericCallback("o"),
    p: getGenericCallback("p"),
    q: getGenericCallback("q"),
    r: getGenericCallback("r"),
    s: getGenericCallback("s"),
    t: getGenericCallback("t"),
    u: getGenericCallback("u"),
    v: getGenericCallback("v"),
    w: getGenericCallback("w"),
    x: getGenericCallback("x"),
    y: getGenericCallback("y"),
    z: getGenericCallback("z"),
    A: getGenericCallback("A"),
    B: getGenericCallback("B"),
    C: getGenericCallback("C"),
    D: getGenericCallback("D"),
    E: getGenericCallback("E"),
    F: getGenericCallback("F"),
    G: getGenericCallback("G"),
    H: getGenericCallback("H"),
    I: getGenericCallback("I"),
    J: getGenericCallback("J"),
    K: getGenericCallback("K"),
    L: getGenericCallback("L"),
    M: getGenericCallback("M"),
    N: getGenericCallback("N"),
    O: getGenericCallback("O"),
    P: getGenericCallback("P"),
    Q: getGenericCallback("Q"),
    R: getGenericCallback("R"),
    S: getGenericCallback("S"),
    T: getGenericCallback("T"),
    U: getGenericCallback("U"),
    V: getGenericCallback("V"),
    W: getGenericCallback("W"),
    X: getGenericCallback("X"),
    Y: getGenericCallback("Y"),
    Z: getGenericCallback("Z"),
};

export default keyToMathquillMap;
