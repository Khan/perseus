/**
 * Sets up the basic environment for running Perseus in.
 */

window.icu = {
    getDecimalFormatSymbols: function() {
        return {
            decimal_separator: ".",
            grouping_separator: ",",
            minus: "-",
        };
    },
};

window.KhanUtil = {
    debugLog: function() {},
    localeToFixed: function(num, precision) {
        return num.toFixed(precision);
    },
};

window.Exercises = {
    localMode: true,

    useKatex: true,
    khanExercisesUrlBase: "../",

    getCurrentFramework: function() {
        return "khan-exercises";
    },
    PerseusBridge: {
        cleanupProblem: function() {
            return false;
        },
    },
};
