/* eslint-disable no-prototype-builtins */
/**
 * Provides a method for attaching some shims to a window object that JSDOM
 * otherwise doesn't support.
 */
const {performance} = require("perf_hooks");

/**
 * Attaches various shims to the window object that JSDOM doesn't or didn't
 * provide.
 *
 * @param {window} targetWindow
 */
const attachShims = (targetWindow) => {
    if (targetWindow.Node) {
        if (!targetWindow.Node.prototype.hasOwnProperty("innerText")) {
            // innerText is not currently supported by JSDOM
            // See https://github.com/tmpvar/jsdom/issues/1245
            // So, let's patch it.
            // We have to make sure we invoke the `textContent` of the Node
            // instance to make sure things execute correctly.
            Object.defineProperty(targetWindow.Node.prototype, "innerText", {
                get: function () {
                    return this.textContent;
                },
            });
        }

        if (!targetWindow.Node.prototype.hasOwnProperty("createRange")) {
            // JSDOM doesn't support ranges since it's not a rendering engine,
            // but some things want them to exist, so we shim it to at least
            // not error out.
            Object.defineProperty(targetWindow.Node.prototype, "createRange", {
                value: () => ({
                    setStart: () => {},
                    setEnd: () => {},

                    // Codemirror (used in iGraphQL) is calling these things
                    // off ranges.
                    // The spec indicates that they are experimental and
                    // Codemirror is expecting them, so, let's shim them too.
                    getBoundingClientRect: () => ({
                        left: 0,
                        right: 0,
                    }),
                    getClientRects: () => [],
                }),
            });
        }
    }

    // JSDOM currently doesn't support the performance API, so we'll give it Node's.
    // It isn't a 1:1 replacement (timing API differs, for example), but good enough
    // for basic things like now().
    targetWindow.performance = targetWindow.performance || performance;
    targetWindow.performance.timing = targetWindow.performance.timing || {};

    // JSDOM window doesn't support matchMedia. Let's stub it.
    if (!targetWindow.matchMedia) {
        targetWindow.matchMedia = (query) => {
            // Simulate a desktop browser: return `true` if the window is at
            // least 768px wide.
            const windowWidth = 768;

            const minWidthMatcher = /min-width:\s*(\d+)/i;
            const match = query.match(minWidthMatcher);

            const matches = !!(match && match[1] >= windowWidth);

            return {
                matches,
                addListener: () => {},
                removeListener: () => {},
            };
        };
    }

    // JSDOM doesn't implement scrollTo
    targetWindow.scrollTo = () => {};
};

module.exports = attachShims;
