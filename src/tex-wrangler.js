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
function findEndpoint(tex, currentIndex) {
    var bracketDepth = 0;

    for (var i = currentIndex, len = tex.length; i < len; i++) {
        var c = tex[i];

        if (c === '{') {
            bracketDepth++;
        } else if (c === '}') {
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
function parseNextExpression(tex, currentIndex, handler) {
    // Find the first '{' and grab subsequent TeX
    // Ex) tex: '{3}{7}', and we want the '3'
    var openBracketIndex = tex.indexOf('{', currentIndex);
    var nextExpIndex = openBracketIndex + 1;

    // Truncate to only contain remaining TeX
    var endpoint = findEndpoint(tex, nextExpIndex);
    var expressionTeX = tex.substring(nextExpIndex, endpoint);
    var parsedExp = walkTex(expressionTeX, handler);

    return {
        endpoint: endpoint,
        expression: parsedExp
    };
}


function getNextFracIndex(tex, currentIndex) {
    var dfrac = "\\dfrac";
    var frac = "\\frac";

    var nextFrac = tex.indexOf(frac, currentIndex);
    var nextDFrac = tex.indexOf(dfrac, currentIndex);

    if (nextFrac > -1 && nextDFrac > -1) {
        return Math.min(nextFrac, nextDFrac);
    } else if (nextFrac > -1) {
        return nextFrac;
    } else if (nextDFrac > -1) {
        return nextDFrac;
    } else {
        return -1;
    }
}


function walkTex(tex, handler) {
    // Ex) tex: '2 \dfrac {3}{7}'
    var parsedString = "";
    var currentIndex = 0;
    var nextFrac = getNextFracIndex(tex, currentIndex);

    // For each \dfrac, find the two expressions (wrapped in {}) and recur
    while (nextFrac > -1) {
        // Gather first fragment, preceding \dfrac
        // Ex) parsedString: '2 '
        parsedString += tex.substring(currentIndex, nextFrac);

        // Remove everything preceding \dfrac, which has been parsed
        currentIndex = nextFrac;

        // Parse first expression and move index past it
        // Ex) firstParsedExpression.expression: '3'
        var firstParsedExpression = parseNextExpression(
            tex, currentIndex, handler
        );
        currentIndex = firstParsedExpression.endpoint + 1;

        // Parse second expression
        // Ex) secondParsedExpression.expression: '7'
        var secondParsedExpression = parseNextExpression(
            tex, currentIndex, handler
        );
        currentIndex = secondParsedExpression.endpoint + 1;

        // Add expressions to running total of parsed expressions
        if (parsedString.length) {
            parsedString += " ";
        }

        // Apply a custom handler based on the parsed subexpressions
        parsedString += handler(firstParsedExpression.expression,
            secondParsedExpression.expression);

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
function modifyTex(tex) {
    function isNestedFraction(tex) {
        return tex.indexOf("\\frac") > -1 || tex.indexOf("\\dfrac") > -1;
    }
    var handler = function(exp1, exp2) {
        var prefix;
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
 * The process is exclusively concerned with parsing fractions, i.e., \dfracs.
 * The basic algorithm splits on \dfracs and then recurs on the subsequent
 * "expressions", i.e., the {} pairs that follow \dfrac. The recursion is to
 * allow for nested \dfrac elements.
 */
function parseTex(tex) {
    var handler = function(exp1, exp2) {
        return exp1 + "/" + exp2;
    };
    return walkTex(tex, handler);
}

module.exports = {
    parseTex: parseTex,
    modifyTex: modifyTex
};
