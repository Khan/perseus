// sync-start:create-simple-storage 473363913 services/static/dev/tools/nodejs-runner/create-simple-storage.js
// sync-start:create-simple-storage 473363913 dev/tools/nodejs-runner/create-simple-storage.js
/**
 * Creates a very simple shim implementation for local storage and session
 * storage.
 *
 * @returns {{setItem:function,removeItem:function,clear:function,getItem:function}}
 * An object that provides a very basic implementation of a storage object for
 * use as a shim for localStorage or sessionStorage.
 */
const createSimpleStorage = () => ({
    clear: function () {
        Object.keys(this).forEach((key) => this.removeItem(key));
    },
    getItem: function (key) {
        return this[key];
    },
    removeItem: function (key) {
        switch (key) {
            case "clear":
            case "getItem":
            case "removeItem":
            case "setItem":
                return;
        }
        delete this[key];
    },
    setItem: function (key, value) {
        this[key] = value;
    },
});

module.exports = createSimpleStorage;
// sync-end:create-simple-storage
