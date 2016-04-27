/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/* global jest:false */

const _ = require("underscore");

// Returns a promise that will resolve shortly after the end of this
// browser tick (roughly a `setTimeout(0)`)
const delayedPromise = (value) => {
    const deferred = $.Deferred();
    _.defer(() => {
        deferred.resolve(value);
    });
    if (typeof jest !== "undefined") {
        jest.runAllTimers();
    }
    return deferred.promise();
};

module.exports = delayedPromise;
