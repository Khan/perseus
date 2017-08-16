/*
    We are currently in a situation where Crowdin adds extra backslashes
    to some strings, but not all. Luckily, after a bugfix that is expected
    for the week of 6/12/17, we will no longer see JIPT's partial unescaping
    of some escaped strings. This will allow us to use a heuristic to determine
    with a high probability whether a string is escaped or not, and thus
    whether to unescape it or not in our `before_dom_insert()` JIPT hook.

    TODO(aasmund): Delete this file when we have converted all our strings
    to the new, unescaped Crowdin format. Calls to `maybeUnescape()` should
    be deleted (unescaping will never be needed anymore).

    The heuristic is as follows:
    - For each LaTeX-like token (one or more backslashes followed by a special
      character or by at least one letter) in the string:
      - If the token cannot be unescaped (e.g. \e ), return the original string.
        Otherwise, we now have two candidate tokens: the original tokens
        and the escaped tokens.
      - For both the original and the unescaped token, compute a number that
        indicates *how* LaTeX-like the token is:
        - 6 if there's an odd number of backslashes followed by a valid LaTeX
          macro name (all backslashes but the last form a sequence of LaTeX
          newlines, and the last one starts the LaTeX macro)
        - 4 if there's one backslash followed by a dollar sign
          (this is likely intended to actually display a dollar sign)
        - 3 if there's an even number of backslashes (this is a sequence of
          LaTeX newlines, and the letters that follow are LaTeX math variables)
        - 2 if there are no backslashes (this is valid, but not LaTeX)
        - 1 if there's an odd number of backslashes (but more than one)
          followed by a dollar sign (our strings don't currently contain this)
        - 0 otherwise (if there's an odd number of backslashes followed by
          something that isn't a valid LaTeX macro name)
    - If exactly one of the candidate strings contains one or more tokens
      that scored 0, return the other string. Otherwise, return the string
      with the highest sum of token scores, choosing the unescaped string
      if there's a tie.

    This algorithm was implemented in Python and run against all of our current
    Crowdin strings (about 440,000), both in original form and escaped form.
    It *always* makes the correct guess for the original strings, and makes
    the wrong guess only for 30 of the escaped strings.
 */

// This regex captures sequences that might represent LaTeX or escape sequences
const MAYBE_LATEX_REGEX = /\\+([ !#$%*,.:;\[\]\^_{|}]|[a-zA-Z]*)/g;

// These are the LaTeX macros that are currently in use in our strings.
// They were collected by applying the above regex to all of our
// Crowdin strings, and manually removing most invalid macro names. Macro name
// validity was tested by pasting the macros into the Perseus editor.
// Invalid macros would typically be the result of the regex finding a sequence
// of LaTeX newlines followed by regular text, e.g. "\\\\xy = z". However,
// there are some actual misspellings around, so we've kept those.
// Note that \$ is handled separately.
const LATEX_MACROS_LIST = [
    " ",
    "!",
    "#",
    "%",
    "*",
    ",",
    ".",
    ":",
    ";",
    "[",
    "]",
    "^",
    "_",
    "{",
    "|",
    "}",
    "alpha",
    "angle",
    "approx",
    "arccos",
    "arcsin",
    "arctan",
    "arrow",
    "bar",
    "barwedge",
    "begin",
    "beta",
    "bf",
    "big",
    "Big",
    "bigg",
    "Bigg",
    "bigl",
    "Bigl",
    "bigr",
    "Bigr",
    "bigstar",
    "bigtriangledown",
    "bigtriangleup",
    "binom",
    "blacklozenge",
    "blue",
    "blueA",
    "blueB",
    "blueC",
    "blueD",
    "blueE",
    "boldsymbol",
    "Box",
    "boxdot",
    "boxed",
    "bullet",
    "cancel",
    "cap",
    "cdot",
    "cdots",
    "checkmark",
    "chi",
    "circ",
    "circledcirc",
    "clubsuit",
    "colon",
    "color",
    "cong",
    "cos",
    "cot",
    "csc",
    "cup",
    "curvearrowright",
    "dagger",
    "dbinom",
    "ddots",
    "delta",
    "Delta",
    "det",
    "dfrac",
    "diamond",
    "diamondsuit",
    "displaystyle",
    "div",
    "dot",
    "dots",
    "downarrow",
    "Downarrow",
    "ell",
    "end",
    "enspace",
    "epsilon",
    "equiv",
    "eta",
    "fbox",
    "flat",
    "footnotesize",
    "frac",
    "frown",
    "gamma",
    "Gamma",
    "gcf",
    "ge",
    "geq",
    "gg",
    "goldB",
    "goldC",
    "goldD",
    "goldE",
    "gray",
    "grayD",
    "grayE",
    "grayF",
    "green",
    "greenB",
    "greenC",
    "greenD",
    "greenE",
    "gt",
    "hat",
    "hbox",
    "heartsuit",
    "hline",
    "hphantom",
    "huge",
    "Huge",
    "iff",
    "iiint",
    "iint",
    "implies",
    "in",
    "infty",
    "int",
    "intercal",
    "it",
    "kaBlue",
    "kappa",
    "kern",
    "lambda",
    "langle",
    "large",
    "Large",
    "LARGE",
    "lcm",
    "ldots",
    "le",
    "left",
    "leftarrow",
    "leftrightarrow",
    "Leftrightarrow",
    "leftrightharpoons",
    "leftroot",
    "leq",
    "lfloor",
    "lg",
    "lim",
    "limits",
    "llap",
    "ln",
    "log",
    "longrightarrow",
    "Longrightarrow",
    "lozenge",
    "lt",
    "lvert",
    "maroonB",
    "maroonC",
    "maroonD",
    "maroonE",
    "mathbb",
    "mathbf",
    "mathcal",
    "mathop",
    "mathrm",
    "mathsf",
    "max",
    "mbox",
    "mid",
    "mp",
    "mu",
    "nabla",
    "ne",
    "nearrow",
    "neq",
    "ngeq",
    "ngtr",
    "nleq",
    "nless",
    "normalsize",
    "not",
    "nu",
    "nx",
    "odot",
    "oint",
    "omega",
    "Omega",
    "operatorname",
    "oplus",
    "orange",
    "oslash",
    "otimes",
    "overbrace",
    "overleftarrow",
    "overleftrightarrow",
    "overline",
    "overrightarrow",
    "overset",
    "parallel",
    "partial",
    "perp",
    "phantom",
    "phi",
    "Phi",
    "pi",
    "pink",
    "pm",
    "prime",
    "propto",
    "psi",
    "Psi",
    "purple",
    "purpleA",
    "purpleC",
    "purpleD",
    "purpleE",
    "qquad",
    "quad",
    "raise",
    "rangle",
    "red",
    "redA",
    "redB",
    "redC",
    "redD",
    "redE",
    "rfloor",
    "rho",
    "right",
    "rightarrow",
    "Rightarrow",
    "rightleftharpoons",
    "rvert",
    "scriptsize",
    "scriptstyle",
    "searrow",
    "sec",
    "setminus",
    "sharp",
    "sigma",
    "Sigma",
    "sim",
    "simeq",
    "sin",
    "small",
    "space",
    "sqrt",
    "square",
    "stackrel",
    "star",
    "substack",
    "sum",
    "swarrow",
    "tan",
    "tan",
    "tau",
    "tealA",
    "tealB",
    "tealC",
    "tealD",
    "tealE",
    "text",
    "textbf",
    "textit",
    "textrm",
    "tfrac",
    "therefore",
    "theta",
    "Theta",
    "tilde",
    "times",
    "tiny",
    "to",
    "triangle",
    "triangleleft",
    "triangleright",
    "underbrace",
    "underline",
    "underset",
    "uparrow",
    "uproot",
    "varphi",
    "vdots",
    "vec",
    "veebar",
    "vert",
    "vphantom",
    "widehat",
    "xi",
    "xrightarrow",

    // These aren't valid LaTeX macros, but they are misspellings
    // that also occur in our strings.
    "Begin",
    "End",
    "inte",
    "lamba",
    "textb",
];

const LATEX_MACROS = LATEX_MACROS_LIST.reduce(function(result, macro) {
    result[macro] = null;
    return result;
}, {});

// These escape sequences are the only ones that are in use. Note that newline,
// carriage return, tab, and backslash are the only characters we use that have
// standard escape sequences (we do not use vertical tab, form feed, etc.).
// We also expect that Unicode characters are never represented
// by their \u escape sequence.
const ESCAPE_SEQUENCES = {
    "n": "\n",
    "r": "\r",
    "t": "\t",
    "\\": "\\",
};

// Returns a number representing how "LaTeX-like" a token is.
// Will only be run on tokens that match `MAYBE_LATEX_REGEX`, or the result of
// unescaping such a token. See the comment at the top of the file for details.
const getLatexLevel = function(text) {
    let backslashCount = 0;
    while (backslashCount < text.length && text[backslashCount] === '\\') {
        backslashCount++;
    }
    if (backslashCount === 0) {
        return 2; // Valid, but doesn't contain any LaTeX syntax
    } else if (backslashCount % 2 === 0) {
        return 3; // Sequence of LaTeX newlines followed by other chars
    } else {
        // An odd number of backslashes would be a sequence of LaTeX newlines
        // followed by a LaTeX macro
        const maybeMacro = text.substring(backslashCount);
        if (maybeMacro === "$") {
            // Valid, but all our strings that use escaped dollars only have
            // one backslash, so this is likely wrong if there are more
            return backslashCount === 1 ? 4 : 1;
        } else {
            return LATEX_MACROS.hasOwnProperty(maybeMacro) ? 6 : 0;
        }
    }
};

const tryUnescape = function(text) {
    let i = 0;
    let result = "";
    while (i < text.length) {
        const c = text[i];
        if (c === '\\') {
            i += 1;
            if (i === text.length) {
                return null; // Odd number of backslashes - not unescapable
            }
            const e = text[i];
            if (ESCAPE_SEQUENCES.hasOwnProperty(e)) {
                result += ESCAPE_SEQUENCES[e];
            } else {
                return null; // Invalid escape sequence
            }
        } else {
            result += c;
        }
        i += 1;
    }
    return result;
};

const shouldUnescape = function(text) {
    // - For each token that might be LaTeX:
    //   - Try to unescape it. If that fails, we can say for certain
    //     that `text` is not escaped.
    //   - Compute the LaTeX level (see the comment at the top of the file)
    //     for the original and the unescaped token, and sum these values over
    //     all the tokens. Also, keep track of whether any of the original
    //     or escaped tokens contain invalid LaTeX.
    // - If there existed invalid LaTeX only in the original tokens, we need to
    //   unescape; if there existed invalid LaTeX only in the escaped tokens,
    //   we need to keep the original.
    // - Otherwise, select the version with the highest LaTeX level, preferring
    //   the unescaped version if there's a tie (because most of our strings
    //   are currently in the "old Crowdin style", meaning that they
    //   are escaped).
    let levelSumOriginal = 0;
    let levelSumUnescaped = 0;
    let anyInvalidLatexInOriginal = false;
    let anyInvalidLatexInUnescaped = false;
    let match;
    MAYBE_LATEX_REGEX.lastIndex = 0;
    while ((match = MAYBE_LATEX_REGEX.exec(text)) !== null) {
        const original = match[0];
        const unescaped = tryUnescape(original);
        if (unescaped === null) {
            return false;
        }
        const originalLevel = getLatexLevel(original);
        if (originalLevel === 0) {
            anyInvalidLatexInOriginal = true;
        }
        const unescapedLevel = getLatexLevel(unescaped);
        if (unescapedLevel === 0) {
            anyInvalidLatexInUnescaped = true;
        }
        levelSumOriginal += originalLevel;
        levelSumUnescaped += unescapedLevel;
    }
    if (anyInvalidLatexInOriginal !== anyInvalidLatexInUnescaped) {
        return anyInvalidLatexInOriginal;
    }
    return levelSumUnescaped >= levelSumOriginal;
};

const maybeUnescape = function(text) {
    if (shouldUnescape(text)) {
        return tryUnescape(text);
    } else {
        return text;
    }
};

module.exports = {maybeUnescape};
