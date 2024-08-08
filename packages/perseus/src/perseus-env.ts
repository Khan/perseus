/**
 * Sets up the basic environment for running Perseus in.
 */

// @ts-expect-error - TS2339 - Property 'Exercises' does not exist on type 'Window & typeof globalThis'.
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
