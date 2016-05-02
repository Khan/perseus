/* global i18n:false */

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

    // A simple random number picker
    // Returns a random int in [0, num)
    rand: function(num) {
        return Math.floor(num * KhanUtil.random());
    },

    /* Returns an array of the digits of a nonnegative integer in reverse
     * order: digits(376) = [6, 7, 3] */
    digits: function(n) {
        if (n === 0) {
            return [0];
        }

        const list = [];

        while (n > 0) {
            list.push(n % 10);
            n = Math.floor(n / 10);
        }

        return list;
    },

    // Similar to above digits, but in original order (not reversed)
    integerToDigits: function(n) {
        return KhanMath.digits(n).reverse();
    },

    // Convert a decimal number into an array of digits (reversed)
    decimalDigits: function(n) {
        let str = "" + Math.abs(n);
        str = str.replace(".", "");

        const list = [];
        for (let i = str.length; i > 0; i--) {
            list.push(str.charAt(i - 1));
        }

        return list;
    },

    // Find number of digits after the decimal place
    decimalPlaces: function(n) {
        let str = "" + Math.abs(n);
        str = str.split(".");

        if (str.length === 1) {
            return 0;
        } else {
            return str[1].length;
        }
    },

    digitsToInteger: function(digits) {
        let place = Math.floor(Math.pow(10, digits.length - 1));
        let number = 0;

        $.each(digits, function(index, digit) {
            number += digit * place;
            place /= 10;
        });

        return number;
    },

    padDigitsToNum: function(digits, num) {
        digits = digits.slice(0);
        while (digits.length < num) {
            digits.push(0);
        }
        return digits;
    },

    placesLeftOfDecimal: [i18n._("one"), i18n._("ten"), i18n._("hundred"),
        i18n._("thousand")],
    placesRightOfDecimal: [i18n._("one"), i18n._("tenth"), i18n._("hundredth"),
        i18n._("thousandth"), i18n._("ten thousandth")],

    powerToPlace: function(power) {
        if (power < 0) {
            return KhanMath.placesRightOfDecimal[-1 * power];
        } else {
            return KhanMath.placesLeftOfDecimal[power];
        }
    },


    // Adds 0.001 because of floating points uncertainty so it errs on the side
    // of going further away from 0
    roundTowardsZero: function(x) {
        if (x < 0) {
            return Math.ceil(x - 0.001);
        }
        return Math.floor(x + 0.001);
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

    denominators: [2, 3, 4, 5, 6, 8, 10, 12, 100],
    smallDenominators: [2, 3, 4, 5, 6, 8, 10, 12],

    getPrime: function() {
        return KhanMath.primes[KhanMath.rand(KhanMath.primes.length)];
    },

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

    isOdd: function(n) {
        return n % 2 === 1;
    },

    isEven: function(n) {
        return n % 2 === 0;
    },

    getOddComposite: function(min, max) {
        if (min === undefined) {
            min = 0;
        }

        if (max === undefined) {
            max = 100;
        }

        const oddComposites = [
            9, 15, 21, 25, 27, 33, 35, 39, 45, 49, 51, 55,
            57, 63, 65, 69, 75, 77, 81, 85, 87, 91, 93, 95, 99,
        ];

        let result = -1;
        while (result < min || result > max) {
            result = oddComposites[KhanMath.rand(oddComposites.length)];
        }
        return result;
    },

    getEvenComposite: function(min, max) {
        if (min === undefined) {
            min = 0;
        }

        if (max === undefined) {
            max = 100;
        }

        const evenComposites = [
            4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26,
            28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48,
            50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72,
            74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98,
        ];

        let result = -1;
        while (result < min || result > max) {
            result = evenComposites[KhanMath.rand(evenComposites.length)];
        }
        return result;
    },

    getComposite: function() {
        if (KhanMath.randRange(0, 1)) {
            return KhanMath.getEvenComposite();
        } else {
            return KhanMath.getOddComposite();
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

    getFactors: function(number) {
        const factors = [];
        const ins = function(n) {
            if (_(factors).indexOf(n) === -1) {
                factors.push(n);
            }
        };

        const maxf2 = number;
        for (let f = 1; f * f <= maxf2; f++) {
            if (number % f === 0) {
                ins(f);
                ins(number / f);
            }
        }
        return KhanMath.sortNumbers(factors);
    },

    // Get a random factor of a composite number which is not 1 or that number
    getNontrivialFactor: function(number) {
        const factors = KhanMath.getFactors(number);
        return factors[KhanMath.randRange(1, factors.length - 2)];
    },

    getMultiples: function(number, upperLimit) {
        const multiples = [];
        for (let i = 1; i * number <= upperLimit; i++) {
            multiples.push(i * number);
        }
        return multiples;
    },

    // splitRadical(24) gives [2, 6] to mean 2 sqrt(6)
    splitRadical: function(n) {
        if (n === 0) {
            return [0, 1];
        }

        let coefficient = 1;
        let radical = n;

        for (let i = 2; i * i <= n; i++) {
            while (radical % (i * i) === 0) {
                radical /= i * i;
                coefficient *= i;
            }
        }

        return [coefficient, radical];
    },

    // splitCube(24) gives [2, 3] to mean 2 cube_root(3)
    splitCube: function(n) {
        if (n === 0) {
            return [0, 1];
        }

        let coefficient = 1;
        let radical = n;

        for (let i = 2; i * i * i <= n; i++) {
            while (radical % (i * i * i) === 0) {
                radical /= i * i * i;
                coefficient *= i;
            }
        }

        return [coefficient, radical];
    },

    // randRange(min, max) - Get a random integer between min and max, inclusive
    // randRange(min, max, count) - Get count random integers
    // randRange(min, max, rows, cols) - Get a rows x cols matrix of random
    //     integers
    // randRange(min, max, x, y, z) - You get the point...
    randRange: function(min, max) {
        const dimensions = [].slice.call(arguments, 2);

        if (dimensions.length === 0) {
            return Math.floor(KhanMath.rand(max - min + 1)) + min;
        } else {
            const args = [min, max].concat(dimensions.slice(1));
            return $.map(new Array(dimensions[0]), function() {
                return [KhanMath.randRange.apply(null, args)];
            });
        }
    },

    // Get an array of unique random numbers between min and max
    randRangeUnique: function(min, max, count) {
        if (count == null) {
            return KhanMath.randRange(min, max);
        } else {
            const toReturn = [];
            for (let i = min; i <= max; i++) {
                toReturn.push(i);
            }

            return KhanMath.shuffle(toReturn, count);
        }
    },

    // Get an array of unique random numbers between min and max,
    // that ensures that none of the integers in the array are 0.
    randRangeUniqueNonZero: function(min, max, count) {
        if (count == null) {
            return KhanMath.randRangeNonZero(min, max);
        } else {
            const toReturn = [];
            for (let i = min; i <= max; i++) {
                if (i === 0) {
                    continue;
                }
                toReturn.push(i);
            }

            return KhanMath.shuffle(toReturn, count);
        }
    },

    // Get a random integer between min and max with a perc chance of hitting
    // target (which is assumed to be in the range, but it doesn't have to be).
    randRangeWeighted: function(min, max, target, perc) {
        if (KhanUtil.random() < perc || (target === min && target === max)) {
            return target;
        } else {
            return KhanMath.randRangeExclude(min, max, [target]);
        }
    },

    // Get a random integer between min and max that is never any of the values
    // in the excludes array.
    randRangeExclude: function(min, max, excludes) {
        let result;

        do {
            result = KhanMath.randRange(min, max);
        } while (_(excludes).indexOf(result) !== -1);

        return result;
    },

    // Get a random integer between min and max with a perc chance of hitting
    // target (which is assumed to be in the range, but it doesn't have to be).
    // It never returns any of the values in the excludes array.
    randRangeWeightedExclude: function(min, max, target, perc, excludes) {
        let result;

        do {
            result = KhanMath.randRangeWeighted(min, max, target, perc);
        } while (_(excludes).indexOf(result) !== -1);

        return result;
    },

    // From limits_1
    randRangeNonZero: function(min, max) {
        return KhanMath.randRangeExclude(min, max, [0]);
    },

    // Returns a random member of the given array
    // If a count is passed, it gives an array of random members of the given
    // array
    randFromArray: function(arr, count) {
        if (count == null) {
            return arr[KhanMath.rand(arr.length)];
        } else {
            return $.map(new Array(count), function() {
                return KhanMath.randFromArray(arr);
            });
        }
    },

    // Returns a random member of the given array that is never any of the
    // values in the excludes array.
    randFromArrayExclude: function(arr, excludes) {
        const cleanArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (_(excludes).indexOf(arr[i]) === -1) {
                cleanArr.push(arr[i]);
            }
        }
        return KhanMath.randFromArray(cleanArr);
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
        // TODO(jack): Make this locale-dependent like
        // KhanUtil.localeToFixed
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

    floorTo: function(precision, num) {
        const factor = Math.pow(10, precision).toFixed(5);
        return Math.floor((num * factor).toFixed(5)) / factor;
    },

    ceilTo: function(precision, num) {
        const factor = Math.pow(10, precision).toFixed(5);
        return Math.ceil((num * factor).toFixed(5)) / factor;
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

    // Shuffle an array using a Fischer-Yates shuffle
    // If count is passed, returns an random sublist of that size
    shuffle: function(array, count) {
        array = [].slice.call(array, 0);
        const beginning =
            typeof count === "undefined" ||
            count > array.length ? 0 : array.length - count;

        for (let top = array.length; top > beginning; top--) {
            const newEnd = Math.floor(KhanUtil.random() * top);
            const tmp = array[newEnd];

            array[newEnd] = array[top - 1];
            array[top - 1] = tmp;
        }

        return array.slice(beginning);
    },

    sortNumbers: function(array) {
        return array.slice(0).sort(function(a, b) {
            return a - b;
        });
    },

    // From limits_1
    truncate_to_max: function(num, digits) {
        return parseFloat(num.toFixed(digits));
    },

    // Checks if a number or string representation thereof is an integer
    isInt: function(num) {
        return parseFloat(num) === parseInt(num, 10) && !isNaN(num);
    },


    /**
     * Add LaTeX color markup to a given value.
     */
    colorMarkup: function(val, color) {
        return "\\color{" + color + "}{" + val + "}";
    },

    /**
     * Like _.contains except using _.isEqual to verify if item is present.
     * (Works for lists of non-primitive values.)
     */
    contains: function(list, item) {
        return _.any(list, function(elem) {
            if (_.isEqual(item, elem)) {
                return true;
            }
            return false;
        });
    },
};

module.exports = KhanMath;
