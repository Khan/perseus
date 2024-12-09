import {Errors, PerseusError} from "@khanacademy/perseus-core";
import $ from "jquery";
import _ from "underscore";

import {getDependencies} from "../dependencies";
import {Log} from "../logging/log";
import Util from "../util";

import type {Coord} from "../interactive2/types";

// For offline exercises in the mobile app, we download the graphie data
// (svgs and localized data files) and serve them from the local file
// system (with file://). We replace urls that start with `web+graphie`
// in the perseus json with this `file+graphie` prefix to indicate that
// they should have the `file://` protocol instead of `https://`.
const svgLocalLabelsRegex = /^file\+graphie:/;
const hashRegex = /\/([^/]+)$/;

function getLocale() {
    const {JIPT, kaLocale} = getDependencies();
    return JIPT.useJIPT ? "en-pt" : kaLocale;
}

function shouldUseLocalizedData() {
    return getLocale() !== "en";
}

// A regex to split at the last / of a URL, separating the base part from the
// hash. This is used to create the localized label data URLs.
const splitHashRegex = /\/(?=[^/]+$)/;

function getLocalizedDataUrl(url: string) {
    // For local (cached) graphie images, they are already localized.
    if (svgLocalLabelsRegex.test(url)) {
        return Util.getDataUrl(url);
    }
    const [base, hash] = Util.getBaseUrl(url).split(splitHashRegex);
    return `${base}/${getLocale()}/${hash}-data.json`;
}

// Get the hash from the url, which is just the filename
function getUrlHash(url: string) {
    const match = url.match(hashRegex);
    if (match == null) {
        throw new PerseusError("not a valid URL", Errors.InvalidInput);
    }
    return match && match[1];
}

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

type CacheEntry = {
    labels: ReadonlyArray<any>;
    range: [Coord, Coord];
};

// The global cache of label data. Its format is:
// {
//   hash (e.g. "c21435944d2cf0c8f39d9059cb35836aa701d04a"): {
//     loaded: a boolean of whether the data has been loaded or not
//     dataCallbacks: a list of callbacks to call with the data when the data
//                    is loaded
//     data: the other data for this hash
//   },
//   ...
// }
const labelDataCache: Record<
    string,
    | {loaded: false; localized: boolean; dataCallbacks: Array<any>}
    | {
          loaded: true;
          data: CacheEntry;
          localized: boolean;
          dataCallbacks: Array<any>;
      }
> = {};

export function loadGraphie(
    url: string,
    onDataLoaded: (data: CacheEntry, localized: boolean) => void,
) {
    const hash = getUrlHash(url);

    // We can't make multiple jsonp calls to the same file because their
    // callbacks will collide with each other. Instead, we cache the data
    // and only make the jsonp calls once.
    const entry = labelDataCache[hash];
    if (entry != null) {
        if (entry.loaded) {
            const {data, localized} = entry;
            onDataLoaded(data, localized);
        } else {
            entry.dataCallbacks.push(onDataLoaded);
        }
    } else {
        const cacheData = {
            loaded: false as const,
            dataCallbacks: [onDataLoaded],
            localized: shouldUseLocalizedData(),
        };

        labelDataCache[hash] = cacheData;

        const retrieveData = (
            url: string,
            errorCallback: (x?: any, status?: any, error?: any) => void,
        ) => {
            doJSONP(url, {
                callbackName: "svgData" + hash,
                success: (data) => {
                    const newCacheEntry = (labelDataCache[hash] = {
                        ...labelDataCache[hash],
                        loaded: true as const,
                        data,
                    });

                    _.each(newCacheEntry.dataCallbacks, (callback) => {
                        callback(newCacheEntry.data, cacheData.localized);
                    });
                },
                error: errorCallback,
            });
        };

        if (shouldUseLocalizedData()) {
            retrieveData(getLocalizedDataUrl(url), (x, status, error) => {
                cacheData.localized = false;

                // If there is isn't any localized data, fall back to
                // the original, unlocalized data
                retrieveData(Util.getDataUrl(url), (x, status, error) => {
                    Log.error(
                        "Data load failed for svg-image",
                        Errors.Service,
                        {
                            cause: error,
                            loggedMetadata: {
                                dataUrl: Util.getDataUrl(url),
                                status,
                            },
                        },
                    );
                });
            });
        } else {
            retrieveData(Util.getDataUrl(url), (x, status, error) => {
                Log.error("Data load failed for svg-image", Errors.Service, {
                    cause: error,
                    loggedMetadata: {
                        dataUrl: Util.getDataUrl(url),
                        status,
                    },
                });
            });
        }
    }
}
