// Returns a promise that will resolve shortly after the end of this
// browser tick (roughly a `setTimeout(0)`)
var delayedPromise = (value) => {
    var deferred = $.Deferred();
    _.defer(() => {
        deferred.resolve(value);
    });
    if (typeof jest !== "undefined") {
        jest.runAllTimers();
    }
    return deferred.promise();
};

module.exports = delayedPromise;
