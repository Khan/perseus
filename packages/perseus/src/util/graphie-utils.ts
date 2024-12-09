import $ from "underscore";

// Write our own JSONP handler because all the other ones don't do things we
// need.
export const doJSONP = function (url: string, options) {
    options = {
        callbackName: "callback",
        success: $.noop,
        error: $.noop,
        ...options,
    };

    // Create the script
    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("src", url);

    // A cleanup function to run when we're done.
    function cleanup() {
        document.head && document.head.removeChild(script);
        delete window[options.callbackName];
    }

    // Add the global callback.
    // @ts-expect-error - TS2740 - Type '() => void' is missing the following properties from type 'Window': clientInformation, closed, customElements, devicePixelRatio, and 206 more.
    window[options.callbackName] = function (...args) {
        cleanup();
        options.success.apply(null, args);
    };

    // Add the error handler.
    script.addEventListener("error", function (...args) {
        cleanup();
        options.error.apply(null, args);
    });

    // Insert the script to start the download.
    document.head && document.head.appendChild(script);
};
