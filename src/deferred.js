/**
 * Simple version of jQuery's Deferred.
 */

class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    then(callback) {
        return this.promise.then(callback);
    }
}

module.exports = Deferred;
