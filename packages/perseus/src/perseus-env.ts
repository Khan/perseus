/**
 * Sets up the basic environment for running Perseus in.
 */

window.KhanUtil = {
    debugLog: function () {},
    localeToFixed: function (num, precision) {
        return num.toFixed(precision);
    },
};

window.Exercises = {
    localMode: true,

    khanExercisesUrlBase: "../",

    getCurrentFramework: function () {
        return "khan-exercises";
    },
    PerseusBridge: {
        cleanupProblem: function () {
            return false;
        },
    },
};
