/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable brace-style, object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/* global i18n:false */

const $ = require("jquery");
const _ = require("underscore");

const KhanMath = require("./math.js");

const MAXERROR_EPSILON = Math.pow(2, -42);

/*
 * Answer types
 *
 * Utility for creating answerable questions displayed in exercises
 *
 * Different answer types produce different kinds of input displays, and do
 * different kinds of checking on the solutions.
 *
 * Each of the objects contain two functions, setup and createValidator.
 *
 * The setup function takes a solutionarea and solution, and performs setup
 * within the solutionarea, and then returns an object which contains:
 *
 * answer: a function which, when called, will retrieve the current answer from
 *         the solutionarea, which can then be validated using the validator
 *         function
 * validator: a function returned from the createValidator function (defined
 *            below)
 * solution: the correct answer to the problem
 * showGuess: a function which, when given a guess, shows the guess within the
 *            provided solutionarea
 * showGuessCustom: a function which displays parts of a guess that are not
 *                  within the solutionarea; currently only used for custom
 *                  answers
 *
 * The createValidator function only takes a solution, and it returns a
 * function which can be used to validate an answer.
 *
 * The resulting validator function returns:
 * - true: if the answer is fully correct
 * - false: if the answer is incorrect
 * - "" (the empty string): if no answer has been provided (e.g. the answer box
 *   is left unfilled)
 * - a string: if there is some slight error
 *
 * In most cases, setup and createValidator don't really need the solution DOM
 * element so we have setupFunctional and createValidatorFunctional for them
 * which take only $solution.text() and $solution.data(). This makes it easier
 * to reuse specific answer types.
 *
 * TODO(alpert): Think of a less-absurd name for createValidatorFunctional.
 *
 */

const KhanAnswerTypes = {
    /*
     * predicate answer type
     *
     * performs simple predicate-based checking of a numeric solution, with
     * different kinds of number formats
     *
     * Uses the data-forms option on the solution to choose which number formats
     * are acceptable. Available data-forms:
     *
     * - integer:  3
     * - proper:   3/5
     * - improper: 5/3
     * - pi:       3 pi
     * - log:      log(5)
     * - percent:  15%
     * - mixed:    1 1/3
     * - decimal:  1.7
     *
     * The solution should be a predicate of the form:
     *
     * function(guess, maxError) {
     *     return abs(guess - 3) < maxError;
     * }
     *
     */
    predicate: {
        defaultForms: "integer, proper, improper, mixed, decimal",
        createValidatorFunctional: function(predicate, options) {
            // Extract the options from the given solution object
            options = _.extend({
                simplify: "required",
                ratio: false,
                forms: KhanAnswerTypes.predicate.defaultForms,
            }, options);
            let acceptableForms;
            // this is maintaining backwards compatibility
            // TODO(merlob) fix all places that depend on this, then delete
            if (!_.isArray(options.forms)) {
                acceptableForms = options.forms.split(/\s*,\s*/);
            } else {
                acceptableForms = options.forms;
            }

            // TODO(jack): remove options.inexact in favor of options.maxError
            if (options.inexact === undefined) {
                // If we aren't allowing inexact, ensure that we don't have a
                // large maxError as well.
                options.maxError = 0;
            }
            // Allow a small tolerance on maxError, to avoid numerical
            // representation issues (2.3 should be correct for a solution of
            // 2.45 with maxError=0.15).
            options.maxError = +options.maxError + MAXERROR_EPSILON;

            // If percent is an acceptable form, make sure it's the last one
            // in the list so we don't prematurely complain about not having
            // a percent sign when the user entered the correct answer in a
            // different form (such as a decimal or fraction)
            if (_.contains(acceptableForms, "percent")) {
                acceptableForms = _.without(acceptableForms, "percent");
                acceptableForms.push("percent");
            }

            // Take text looking like a fraction, and turn it into a number
            const fractionTransformer = function(text) {
                text = text
                    // Replace unicode minus sign with hyphen
                    .replace(/\u2212/, "-")

                    // Remove space after +, -
                    .replace(/([+-])\s+/g, "$1")

                    // Remove leading/trailing whitespace
                    .replace(/(^\s*)|(\s*$)/gi, "");

                    // Extract numerator and denominator
                const match = text.match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/);
                const parsedInt = parseInt(text, 10);
                if (match) {
                    const num = parseFloat(match[1]);
                    const denom = parseFloat(match[2]);
                    const simplified = denom > 0 &&
                        (options.ratio || match[2] !== "1") &&
                        KhanMath.getGCD(num, denom) === 1;
                    return [{
                        value: num / denom,
                        exact: simplified,
                    }];
                } else if (!isNaN(parsedInt) && "" + parsedInt === text) {
                    return [{
                        value: parsedInt,
                        exact: true,
                    }];
                }

                return [];
            };

            /*
             * Different forms of numbers
             *
             * Each function returns a list of objects of the form:
             *
             * {
             *    value: numerical value,
             *    exact: true/false
             * }
             */
            const forms = {
                // integer, which is encompassed by decimal
                integer: function(text) {
                    // Compare the decimal form to the decimal form rounded to
                    // an integer. Only accept if the user actually entered an
                    // integer.
                    const decimal = forms.decimal(text);
                    const rounded = forms.decimal(text, 1);
                    if ((decimal[0].value != null &&
                            decimal[0].value === rounded[0].value) ||
                            (decimal[1].value != null &&
                            decimal[1].value === rounded[1].value)) {
                        return decimal;
                    }
                    return [];
                },

                // A proper fraction
                proper: function(text) {
                    return $.map(fractionTransformer(text), function(o) {
                        // All fractions that are less than 1
                        if (Math.abs(o.value) < 1) {
                            return [o];
                        } else {
                            return [];
                        }
                    });
                },

                // an improper fraction
                improper: function(text) {
                    return $.map(fractionTransformer(text), function(o) {
                        // All fractions that are greater than 1
                        if (Math.abs(o.value) >= 1) {
                            return [o];
                        } else {
                            return [];
                        }
                    });
                },

                // pi-like numbers
                pi: function(text) {
                    let match;
                    let possibilities = [];

                    // Replace unicode minus sign with hyphen
                    text = text.replace(/\u2212/, "-");

                    // - pi
                    // (Note: we also support \pi (for TeX), p, tau (and \tau,
                    // and t), pau.)
                    if ((match = text.match(
                            /^([+-]?)\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)$/i
                    ))) {
                        possibilities = [{
                            value: parseFloat(match[1] + "1"),
                            exact: true,
                        }];

                    // 5 / 6 pi
                    } else if ((match = text.match(/^([+-]?\s*\d+\s*(?:\/\s*[+-]?\s*\d+)?)\s*\*?\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)$/i))) { // @Nolint
                        possibilities = fractionTransformer(match[1]);

                    // 4 5 / 6 pi
                    } else if ((match = text.match(/^([+-]?)\s*(\d+)\s*([+-]?\d+)\s*\/\s*([+-]?\d+)\s*\*?\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)$/i))) { // @Nolint
                        const sign = parseFloat(match[1] + "1");
                        const integ = parseFloat(match[2]);
                        const num = parseFloat(match[3]);
                        const denom = parseFloat(match[4]);
                        const simplified = num < denom &&
                            KhanMath.getGCD(num, denom) === 1;

                        possibilities = [{
                            value: sign * (integ + num / denom),
                            exact: simplified,
                        }];

                    // 5 pi / 6
                    } else if ((match = text.match(/^([+-]?\s*\d+)\s*\*?\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)\s*(?:\/\s*([+-]?\s*\d+))?$/i))) { // @Nolint
                        possibilities = fractionTransformer(
                            match[1] + "/" + match[3]);

                    // - pi / 4
                    } else if ((match = text.match(/^([+-]?)\s*\*?\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)\s*(?:\/\s*([+-]?\d+))?$/i))) { // @Nolint
                        possibilities = fractionTransformer(
                            match[1] + "1/" + match[3]);

                    // 0
                    } else if (text === "0") {
                        possibilities = [{ value: 0, exact: true }];

                    // 0.5 pi (fallback)
                    } else if ((match = text.match(
                        /^(.+)\s*\*?\s*(\\?pi|p|\u03c0|\\?tau|t|\u03c4|pau)$/i
                    ))) {
                        possibilities = forms.decimal(match[1]);
                    } else {
                        possibilities = _.reduce(
                            KhanAnswerTypes.predicate.defaultForms.split(
                                    /\s*,\s*/),
                            function(memo, form) {
                                return memo.concat(forms[form](text));
                            }, []);

                        // If the answer is a floating point number that's
                        // near a multiple of pi, mark is as being possibly
                        // an approximation of pi.  We actually check if
                        // it's a plausible approximation of pi/12, since
                        // sometimes the correct answer is like pi/3 or pi/4.
                        // We also say it's a pi-approximation if it involves
                        // x/7 (since 22/7 is an approximation of pi.)
                        // Never mark an integer as being an approximation
                        // of pi.
                        let approximatesPi = false;
                        const number = parseFloat(text);
                        if (!isNaN(number) && number !== parseInt(text)) {
                            const piMult = Math.PI / 12;
                            const roundedNumber = (piMult *
                                                   Math.round(number / piMult));
                            if (Math.abs(number - roundedNumber) < 0.01) {
                                approximatesPi = true;
                            }
                        } else if (text.match(/\/\s*7/)) {
                            approximatesPi = true;
                        }
                        if (approximatesPi) {
                            _.each(possibilities, function(possibility) {
                                possibility.piApprox = true;
                            });
                        }
                        return possibilities;
                    }

                    let multiplier = Math.PI;
                    if (text.match(/\\?tau|t|\u03c4/)) {
                        multiplier = Math.PI * 2;
                    }

                    // We're taking an early stand along side xkcd in the
                    // inevitable ti vs. pau debate... http://xkcd.com/1292
                    if (text.match(/pau/)) {
                        multiplier = Math.PI * 1.5;
                    }

                    $.each(possibilities, function(ix, possibility) {
                        possibility.value *= multiplier;
                    });
                    return possibilities;
                },

                // Converts '' to 1 and '-' to -1 so you can write "[___] x"
                // and accept sane things
                coefficient: function(text) {
                    let possibilities = [];

                    // Replace unicode minus sign with hyphen
                    text = text.replace(/\u2212/, "-");

                    if (text === "") {
                        possibilities = [{ value: 1, exact: true }];
                    } else if (text === "-") {
                        possibilities = [{ value: -1, exact: true }];
                    }
                    return possibilities;
                },

                // simple log(c) form
                log: function(text) {
                    let match;
                    let possibilities = [];

                    // Replace unicode minus sign with hyphen
                    text = text.replace(/\u2212/, "-");
                    text = text.replace(/[ \(\)]/g, "");

                    if ((match = text.match(/^log\s*(\S+)\s*$/i))) {
                        possibilities = forms.decimal(match[1]);
                    } else if (text === "0") {
                        possibilities = [{ value: 0, exact: true }];
                    }
                    return possibilities;
                },

                // Numbers with percent signs
                percent: function(text) {
                    text = $.trim(text);
                    // store whether or not there is a percent sign
                    let hasPercentSign = false;

                    if (text.indexOf("%") === (text.length - 1)) {
                        text = $.trim(text.substring(0, text.length - 1));
                        hasPercentSign = true;
                    }

                    const transformed = forms.decimal(text);
                    $.each(transformed, function(ix, t) {
                        t.exact = hasPercentSign;
                        t.value = t.value / 100;
                    });
                    return transformed;
                },

                // Mixed numbers, like 1 3/4
                mixed: function(text) {
                    const match = text
                        // Replace unicode minus sign with hyphen
                        .replace(/\u2212/, "-")

                        // Remove space after +, -
                        .replace(/([+-])\s+/g, "$1")

                        // Extract integer, numerator and denominator
                        .match(/^([+-]?)(\d+)\s+(\d+)\s*\/\s*(\d+)$/);

                    if (match) {
                        const sign = parseFloat(match[1] + "1");
                        const integ = parseFloat(match[2]);
                        const num = parseFloat(match[3]);
                        const denom = parseFloat(match[4]);
                        const simplified = num < denom &&
                            KhanMath.getGCD(num, denom) === 1;

                        return [{
                            value: sign * (integ + num / denom),
                            exact: simplified,
                        }];
                    }

                    return [];
                },

                // Decimal numbers -- compare entered text rounded to
                // 'precision' Reciprical of the precision against the correct
                // answer. We round to 1/1e10 by default, which is healthily
                // less than machine epsilon but should be more than any real
                // decimal answer would use. (The 'integer' answer type uses
                // precision == 1.)
                decimal: function(text, precision) {
                    if (precision == null) {
                        precision = 1e10;
                    }

                    const normal = function(text) {
                        text = $.trim(text);

                        const match = text
                            // Replace unicode minus sign with hyphen
                            .replace(/\u2212/, "-")
                            // Remove space after +, -
                            .replace(/([+-])\s+/g, "$1")
                            // Extract integer, numerator and denominator. If
                            // commas or spaces are used, they must be in the
                            // "correct" places
                            .match(/^([+-]?(?:\d{1,3}(?:[, ]?\d{3})*\.?|\d{0,3}(?:[, ]?\d{3})*\.(?:\d{3}[, ]?)*\d{1,3}))$/); // @Nolint

                        // You can't start a number with `0,`, to prevent us
                        // interpeting '0.342' as correct for '342'
                        const badLeadingZero = text.match(/^0[0,]*,/);

                        if (match && !badLeadingZero) {
                            let x = parseFloat(match[1].replace(/[, ]/g, ""));

                            if (options.inexact === undefined) {
                                x = Math.round(x * precision) / precision;
                            }

                            return x;
                        }
                    };

                    const commas = function(text) {
                        text = text.replace(/([\.,])/g, function(_, c) {
                            return (c === "." ? "," : ".");
                        });
                        return normal(text);
                    };

                    return [
                        { value: normal(text), exact: true },
                        { value: commas(text), exact: true },
                    ];
                },
            };

            // validator function
            return function(guess) {
                // The fallback variable is used in place of the answer, if no
                // answer is provided (i.e. the field is left blank)
                const fallback =
                    options.fallback != null ? "" + options.fallback : "";

                guess = $.trim(guess) || fallback;
                const score = {
                    empty: guess === "",
                    correct: false,
                    message: null,
                    guess: guess,
                };

                // iterate over all the acceptable forms, and if one of the
                // answers is correct, return true
                $.each(acceptableForms, function(i, form) {
                    const transformed = forms[form](guess);

                    for (let j = 0, l = transformed.length; j < l; j++) {
                        const val = transformed[j].value;
                        const exact = transformed[j].exact;
                        const piApprox = transformed[j].piApprox;
                        // If a string was returned, and it exactly matches,
                        // return true
                        if (predicate(val, options.maxError)) {
                            // If the exact correct number was returned,
                            // return true
                            if (exact || options.simplify === "optional") {
                                score.correct = true;
                                score.message = options.message || null;
                                // If the answer is correct, don't say it's
                                // empty. This happens, for example, with the
                                // coefficient type where guess === "" but is
                                // interpreted as "1" which is correct.
                                score.empty = false;
                            } else if (form === "percent") {
                                // Otherwise, an error was returned
                                score.empty = true;
                                score.message = i18n._(
                                    "Your answer is almost correct, " +
                                        "but it is missing a " +
                                        "<code>\\%</code> at the end.");
                            } else {
                                if (options.simplify !== "enforced") {
                                    score.empty = true;
                                }
                                score.message = i18n._(
                                    "Your answer is almost correct, " +
                                        "but it needs to be simplified.");
                            }

                            return false;
                        } else if (piApprox &&
                                   predicate(val, Math.abs(val * 0.001))) {
                            score.empty = true;
                            score.message = i18n._(
                                "Your answer is close, but you may " +
                                    "have approximated pi. Enter your " +
                                    "answer as a multiple of pi, like " +
                                    "<code>12\\ \\text{pi}</code> or " +
                                    "<code>2/3\\ \\text{pi}</code>");
                        }
                    }
                });

                if (score.correct === false) {
                    let interpretedGuess = false;
                    _.each(forms, function(form) {
                        const anyAreNaN = _.any(form(guess), function(t) {
                            return t.value != null && !_.isNaN(t.value);
                        });

                        if (anyAreNaN) {
                            interpretedGuess = true;
                        }
                    });
                    if (!interpretedGuess) {
                        score.empty = true;
                        score.message = i18n._(
                            "We could not understand your " +
                                "answer. Please check your answer for extra " +
                                "text or symbols.");
                        return score;
                    }
                }

                return score;
            };
        },
    },

    /*
     * number answer type
     *
     * wraps the predicate answer type to performs simple number-based checking
     * of a solution
     */
    number: {
        convertToPredicate: function(correct, options) {
            // TODO(alpert): Don't think this $.trim is necessary
            const correctFloat = parseFloat($.trim(correct));

            return [
                function(guess, maxError) {
                    return Math.abs(guess - correctFloat) < maxError;
                },
                $.extend({}, options, {type: "predicate"}),
            ];
        },
        createValidatorFunctional: function(correct, options) {
            return KhanAnswerTypes.predicate.createValidatorFunctional(
                ...KhanAnswerTypes.number.convertToPredicate(
                    correct, options));
        },
    },

    /*
     * The expression answer type parses a given expression or equation
     * and semantically compares it to the solution. In addition, instant
     * feedback is provided by rendering the last answer that fully parsed.
     *
     * Parsing options:
     * functions (e.g. data-functions="f g h")
     *     A space or comma separated list of single-letter variables that
     *     should be interpreted as functions. Case sensitive. "e" and "i"
     *     are reserved.
     *
     *     no functions specified: f(x+y) == fx + fy
     *     with "f" as a function: f(x+y) != fx + fy
     *
     * Comparison options:
     * same-form (e.g. data-same-form)
     *     If present, the answer must match the solution's structure in
     *     addition to evaluating the same. Commutativity and excess negation
     *     are ignored, but all other changes will trigger a rejection. Useful
     *     for requiring a particular form of an equation, or if the answer
     *     must be factored.
     *
     *     example question:    Factor x^2 + x - 2
     *     example solution:    (x-1)(x+2)
     *     accepted answers:    (x-1)(x+2), (x+2)(x-1), ---(-x-2)(-1+x), etc.
     *     rejected answers:    x^2+x-2, x*x+x-2, x(x+1)-2, (x-1)(x+2)^1, etc.
     *     rejection message:   Your answer is not in the correct form
     *
     * simplify (e.g. data-simplify)
     *     If present, the answer must be fully expanded and simplified. Use
     *     carefully - simplification is hard and there may be bugs, or you
     *     might not agree on the definition of "simplified" used. You will
     *     get an error if the provided solution is not itself fully expanded
     *     and simplified.
     *
     *     example question:    Simplify ((n*x^5)^5) / (n^(-2)*x^2)^-3
     *     example solution:    x^31 / n
     *     accepted answers:    x^31 / n, x^31 / n^1, x^31 * n^(-1), etc.
     *     rejected answers:    (x^25 * n^5) / (x^(-6) * n^6), etc.
     *     rejection message:   Your answer is not fully expanded and simplified
     *
     * Rendering options:
     * times (e.g. data-times)
     *     If present, explicit multiplication (such as between numbers) will
     *     be rendered with a cross/x symbol (TeX: \times) instead of the usual
     *     center dot (TeX: \cdot).
     *
     *     normal rendering:    2 * 3^x -> 2 \cdot 3^{x}
     *     but with "times":    2 * 3^x -> 2 \times 3^{x}
     */
    expression: {
        parseSolution: function(solutionString, options) {
            let solution = KAS.parse(solutionString, options);
            if (!solution.parsed) {
                throw new Error("The provided solution (" + solutionString +
                    ") didn't parse.");
            } else if (options.simplified && !solution.expr.isSimplified()) {
                throw new Error("The provided solution (" + solutionString +
                    ") isn't fully expanded and simplified.");
            } else {
                solution = solution.expr;
            }
            return solution;
        },

        createValidatorFunctional: function(solution, options) {
            return function(guess) {
                const score = {
                    empty: false,
                    correct: false,
                    message: null,
                    guess: guess,
                };
                // Don't bother parsing an empty input
                if (!guess) {
                    score.empty = true;
                    return score;
                }

                const answer = KAS.parse(guess, options);

                // An unsuccessful parse doesn't count as wrong
                if (!answer.parsed) {
                    score.empty = true;
                    return score;
                }

                // Solution will need to be parsed again if we're creating
                // this from a multiple question type
                if (typeof solution === 'string') {
                    solution = KhanAnswerTypes.expression.parseSolution(
                        solution, options);
                }

                const result = KAS.compare(answer.expr, solution, options);

                if (result.equal) {
                    // Correct answer
                    score.correct = true;
                } else if (result.message) {
                    // Nearly correct answer
                    score.message = result.message;
                } else {
                    // Replace x with * and see if it would have been correct
                    const answerX = KAS.parse(
                        guess.replace(/[xX]/g, "*"), options);
                    if (answerX.parsed) {
                        const resultX = KAS.compare(
                            answerX.expr, solution, options);
                        if (resultX.equal) {
                            score.empty = true;
                            score.message = "I'm a computer. I only " +
                                    "understand multiplication if you use an " +
                                    "asterisk (*) as the multiplication sign.";
                        } else if (resultX.message) {
                            score.message = resultX.message + " Also, " +
                                    "I'm a computer. I only " +
                                    "understand multiplication if you use an " +
                                    "asterisk (*) as the multiplication sign.";
                        }
                    }
                }
                return score;
            };
        },
    },
};

module.exports = KhanAnswerTypes;
