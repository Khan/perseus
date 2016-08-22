const _ = require("underscore");
const knumber = require("kmath").number;

const KhanMath = {
    // Simplify formulas before display
    cleanMath: function(expr) {
        return typeof expr === "string" ?
            expr.replace(/\+\s*-/g, "- ")
                .replace(/-\s*-/g, "+ ")
                .replace(/\^1/g, "") :
            expr;
    },

    // Bound a number by 1e-6 and 1e20 to avoid exponents after toString
    bound: function(num) {
        if (num === 0) {
            return num;
        } else if (num < 0) {
            return -KhanMath.bound(-num);
        } else {
            return Math.max(1e-6, Math.min(num, 1e20));
        }
    },

    factorial: function(x) {
        if (x <= 1) {
            return x;
        } else {
            return x * KhanMath.factorial(x - 1);
        }
    },

    getGCD: function(a, b) {
        if (arguments.length > 2) {
            const rest = [].slice.call(arguments, 1);
            return KhanMath.getGCD(a, KhanMath.getGCD(...rest));
        } else {
            let mod;

            a = Math.abs(a);
            b = Math.abs(b);

            while (b) {
                mod = a % b;
                a = b;
                b = mod;
            }

            return a;
        }
    },

    getLCM: function(a, b) {
        if (arguments.length > 2) {
            const rest = [].slice.call(arguments, 1);
            return KhanMath.getLCM(a, KhanMath.getLCM(...rest));
        } else {
            return Math.abs(a * b) / KhanMath.getGCD(a, b);
        }
    },

    primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43,
        47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97],

    isPrime: function(n) {
        if (n <= 1) {
            return false;
        } else if (n < 101) {
            return !!$.grep(KhanMath.primes, function(p, i) {
                return Math.abs(p - n) <= 0.5;
            }).length;
        } else {
            if (n <= 1 || n > 2 && n % 2 === 0) {
                return false;
            } else {
                for (let i = 3, sqrt = Math.sqrt(n); i <= sqrt; i += 2) {
                    if (n % i === 0) {
                        return false;
                    }
                }
            }

            return true;
        }

    },

    getPrimeFactorization: function(number) {
        if (number === 1) {
            return [];
        } else if (KhanMath.isPrime(number)) {
            return [number];
        }

        const maxf = Math.sqrt(number);
        for (let f = 2; f <= maxf; f++) {
            if (number % f === 0) {
                return $.merge(
                    KhanMath.getPrimeFactorization(f),
                    KhanMath.getPrimeFactorization(number / f)
                );
            }
        }
    },

    // Round a number to the nearest increment
    // E.g., if increment = 30 and num = 40, return 30. if increment = 30 and
    //     num = 45, return 60.
    roundToNearest: function(increment, num) {
        return Math.round(num / increment) * increment;
    },

    // Round a number to a certain number of decimal places
    roundTo: function(precision, num) {
        const factor = Math.pow(10, precision).toFixed(5);
        return Math.round((num * factor).toFixed(5)) / factor;
    },

    /**
     * Return a string of num rounded to a fixed precision decimal places,
     * with an approx symbol if num had to be rounded, and trailing 0s
     */
    toFixedApprox: function(num, precision) {
        // TODO(aria): Make this locale-dependent like KhanUtil.localeToFixed
        const fixedStr = num.toFixed(precision);
        if (knumber.equal(+fixedStr, num)) {
            return fixedStr;
        } else {
            return "\\approx " + fixedStr;
        }
    },

    /**
     * Return a string of num rounded to precision decimal places, with an
     * approx symbol if num had to be rounded, but no trailing 0s if it was
     * not rounded.
     */
    roundToApprox: function(num, precision) {
        const fixed = KhanMath.roundTo(precision, num);
        if (knumber.equal(fixed, num)) {
            return String(fixed);
        } else {
            return KhanMath.toFixedApprox(num, precision);
        }
    },

    // toFraction(4/8) => [1, 2]
    // toFraction(0.666) => [333, 500]
    // toFraction(0.666, 0.001) => [2, 3]
    //
    // tolerance can't be bigger than 1, sorry
    toFraction: function(decimal, tolerance) {
        if (tolerance == null) {
            tolerance = Math.pow(2, -46);
        }

        if (decimal < 0 || decimal > 1) {
            let fract = decimal % 1;
            fract += (fract < 0 ? 1 : 0);

            const nd = KhanMath.toFraction(fract, tolerance);
            nd[0] += Math.round(decimal - fract) * nd[1];
            return nd;
        } else if (Math.abs(Math.round(Number(decimal)) - decimal) <=
                tolerance) {
            return [Math.round(decimal), 1];
        } else {
            let loN = 0;
            let loD = 1;
            let hiN = 1;
            let hiD = 1;
            let midN = 1;
            let midD = 2;

            while (true) { // @Nolint(constant condition)
                if (Math.abs(Number(midN / midD) - decimal) <= tolerance) {
                    return [midN, midD];
                } else if (midN / midD < decimal) {
                    loN = midN;
                    loD = midD;
                } else {
                    hiN = midN;
                    hiD = midD;
                }

                midN = loN + hiN;
                midD = loD + hiD;
            }
        }
    },

    // Returns the format (string) of a given numeric string
    // Note: purposively more inclusive than answer-types' predicate.forms
    // That is, it is not necessarily true that interpreted input are numeric
    getNumericFormat: function(text) {
        text = $.trim(text);
        text = text.replace(/\u2212/, "-").replace(/([+-])\s+/g, "$1");
        if (text.match(/^[+-]?\d+$/)) {
            return "integer";
        } else if (text.match(/^[+-]?\d+\s+\d+\s*\/\s*\d+$/)) {
            return "mixed";
        }
        const fraction = text.match(/^[+-]?(\d+)\s*\/\s*(\d+)$/);
        if (fraction) {
            return parseFloat(fraction[1]) > parseFloat(fraction[2]) ?
                    "improper" : "proper";
        } else if (text.replace(/[,. ]/g, "").match(/^\d+$/)) {
            return "decimal";
        } else if (text.match(/(pi?|\u03c0|t(?:au)?|\u03c4|pau)/)) {
            return "pi";
        } else {
            return null;
        }
    },


    // Returns a string of the number in a specified format
    toNumericString: function(number, format) {
        if (number == null) {
            return "";
        } else if (number === 0) {
            return "0"; // otherwise it might end up as 0% or 0pi
        }

        if (format === "percent") {
            return number * 100 + "%";
        }

        if (format === "pi") {
            const fraction = knumber.toFraction(number / Math.PI);
            const numerator = Math.abs(fraction[0]);
            const denominator = fraction[1];
            if (knumber.isInteger(numerator)) {
                const sign = number < 0 ? "-" : "";
                const pi = "\u03C0";
                return sign + (numerator === 1 ? "" : numerator) + pi +
                    (denominator === 1 ? "" : "/" + denominator);
            }
        }

        if (_(["proper", "improper", "mixed", "fraction"]).contains(format)) {
            const fraction = knumber.toFraction(number);
            const numerator = Math.abs(fraction[0]);
            const denominator = fraction[1];
            const sign = number < 0 ? "-" : "";
            if (denominator === 1) {
                return sign + numerator; // for integers, irrational, d > 1000
            } else if (format === "mixed") {
                const modulus = numerator % denominator;
                const integer = (numerator - modulus) / denominator;
                return sign + (integer ? integer + " " : "") +
                        modulus + "/" + denominator;
            } // otherwise proper, improper, or fraction
            return sign + numerator + "/" + denominator;
        }

        // otherwise (decimal, float, long long)
        return String(number);
    },
};

module.exports = KhanMath;
