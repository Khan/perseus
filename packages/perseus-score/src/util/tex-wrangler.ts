/*
 * In this file, an `expression` is some portion of valid TeX enclosed in
 * curly brackets.
 */

/*
 * Find the index at which an expression ends, i.e., has an unmatched
 * closing curly bracket. This method assumes that we start with a non-open
 * bracket character and end when we've seen more left than right brackets
 * (rather than assuming that we start with a bracket character and wait for
 * bracket equality).
 */
function findEndpoint(tex, currentIndex: number) {
    let bracketDepth = 0;

    for (let i = currentIndex, len = tex.length; i < len; i++) {
        const c = tex[i];

        if (c === "{") {
            bracketDepth++;
        } else if (c === "}") {
            bracketDepth--;
        }

        if (bracketDepth < 0) {
            return i;
        }
    }
    // If we never see unbalanced curly brackets, default to the
    // entire string
    return tex.length;
}

/*
 * Parses an individual set of curly brackets into TeX.
 */
function parseNextExpression(
    tex: string,
    currentIndex: number,
    handler: (exp1: string, exp2: string) => string,
) {
    // Find the first '{' and grab subsequent TeX
    // Ex) tex: '{3}{7}', and we want the '3'
    const openBracketIndex = tex.indexOf("{", currentIndex);

    // If there is no open bracket, set the endpoint to the end of the string
    // and the expression to an empty string. This helps ensure we don't
    // get stuck in an infinite loop when users handtype TeX.
    if (openBracketIndex === -1) {
        return {
            endpoint: tex.length,
            expression: "",
        };
    }

    const nextExpIndex = openBracketIndex + 1;

    // Truncate to only contain remaining TeX
    const endpoint = findEndpoint(tex, nextExpIndex);
    const expressionTeX = tex.substring(nextExpIndex, endpoint);

    const parsedExp = walkTex(expressionTeX, handler);

    return {
        endpoint: endpoint,
        expression: parsedExp,
    };
}

function getNextFracIndex(tex: string, currentIndex: number) {
    const dfrac = "\\dfrac";
    const frac = "\\frac";

    const nextFrac = tex.indexOf(frac, currentIndex);
    const nextDFrac = tex.indexOf(dfrac, currentIndex);

    if (nextFrac > -1 && nextDFrac > -1) {
        return Math.min(nextFrac, nextDFrac);
    }
    if (nextFrac > -1) {
        return nextFrac;
    }
    if (nextDFrac > -1) {
        return nextDFrac;
    }
    return -1;
}

function walkTex(
    tex: string,
    handler: (exp1: string, exp2: string) => string,
): string {
    if (!tex) {
        return "";
    }

    // Ex) tex: '2 \dfrac {3}{7}'
    let parsedString = "";
    let currentIndex = 0;
    let nextFrac = getNextFracIndex(tex, currentIndex);

    // For each \dfrac, find the two expressions (wrapped in {}) and recur
    while (nextFrac > -1) {
        // Gather first fragment, preceding \dfrac
        // Ex) parsedString: '2 '
        parsedString += tex.substring(currentIndex, nextFrac);

        // Remove everything preceding \dfrac, which has been parsed
        currentIndex = nextFrac;

        // Parse first expression and move index past it
        // Ex) firstParsedExpression.expression: '3'
        const firstParsedExpression = parseNextExpression(
            tex,
            currentIndex,
            handler,
        );
        currentIndex = firstParsedExpression.endpoint + 1;

        // Parse second expression
        // Ex) secondParsedExpression.expression: '7'
        const secondParsedExpression = parseNextExpression(
            tex,
            currentIndex,
            handler,
        );
        currentIndex = secondParsedExpression.endpoint + 1;

        // Add expressions to running total of parsed expressions
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (parsedString.length) {
            parsedString += " ";
        }

        // Apply a custom handler based on the parsed subexpressions
        parsedString += handler(
            firstParsedExpression.expression,
            secondParsedExpression.expression,
        );

        // Find next DFrac, relative to currentIndex
        nextFrac = getNextFracIndex(tex, currentIndex);
    }

    // Add remaining TeX, which is \dfrac-free
    parsedString += tex.slice(currentIndex);

    return parsedString;
}

/*
 * Modify a TeX expression, returning another TeX expression. The resulting
 * expression will have its innermost fractions stubbed out with \fracs
 * (as opposed to \dfracs). All other content will remain untouched.
 */
export function modifyTex(tex: string): string {
    function isNestedFraction(tex: string) {
        return tex.indexOf("\\frac") > -1 || tex.indexOf("\\dfrac") > -1;
    }
    const handler = function (exp1: string, exp2: string) {
        let prefix;
        if (isNestedFraction(exp1) || isNestedFraction(exp2)) {
            prefix = "\\dfrac";
        } else {
            prefix = "\\frac";
        }
        return prefix + " {" + exp1 + "}{" + exp2 + "}";
    };
    return walkTex(tex, handler);
}

/*
 * Parse a TeX expression into something interpretable by input-number.
 * The process is concerned with: (1) parsing fractions, i.e., \dfracs; and
 * (2) removing backslash-escaping from certain characters (right now, only
 * percent signs).
 *
 * The basic algorithm for handling \dfracs splits on \dfracs and then recurs
 * on the subsequent "expressions", i.e., the {} pairs that follow \dfrac. The
 * recursion is to allow for nested \dfrac elements.
 *
 * Backslash-escapes are removed with a simple search-and-replace.
 */
export function parseTex(tex: string): string {
    const handler = function (exp1: string, exp2: string) {
        return exp1 + "/" + exp2;
    };
    const texWithoutFracs = walkTex(tex, handler);
    return texWithoutFracs.replace("\\%", "%");
}
