import {Errors, PerseusError} from "@khanacademy/perseus-core";

import {getDependencies} from "../dependencies";
import {Log} from "../logging/log";
import Util from "../util";

import type {Coord} from "../interactive2/types";
import type {CSSProperties} from "aphrodite";

// For offline exercises in the mobile app, we download the graphie data
// (svgs and localized data files) and serve them from the local file
// system (with file://). We replace urls that start with `web+graphie`
// in the perseus json with this `file+graphie` prefix to indicate that
// they should have the `file://` protocol instead of `https://`.
const svgLocalLabelsRegex = /^file\+graphie:/;
const hashRegex = /\/([^/]+)$/;

/**
 * A Graphie axis range.
 */
export type GraphieRange = [number, number];

/**
 * A Graphie label.
 */
export type GraphieLabel = {
    // The text of the label.
    content: string;

    // The direction of the label. A number indicates rotation angle.
    alignment:
        | number
        | "center"
        | "above"
        | "above right"
        | "right"
        | "below right"
        | "below"
        | "below left"
        | "left"
        | "above left";

    // The label position in the x, y Graphie axis range.
    coordinates: GraphieRange;

    // Additional label styling.
    style: CSSProperties;

    // Whether content is TeX.
    typesetAsMath: boolean;
};

/**
 * The Graphie data (labels, etc.)
 */
export type GraphieData = {
    // The x, y axis range of the Graphie.
    range: [GraphieRange, GraphieRange];

    // The labels in the Graphie.
    labels: Array<GraphieLabel>;
};

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

export function getLocalizedDataUrl(url: string) {
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
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return match && match[1];
}

/**
 * Parse JSONP for a web+graphie://... hash to extract Graphie data, or throw
 * an error if invalid JSONP.
 */
export function parseDataFromJSONP(
    graphieHash: string,
    graphieJSONP: string,
    errorCallback: (error?: any) => void,
): GraphieData | null {
    // The JSONP is expected to be in the form of `svgDataHASH(...)` or `svgOtherDataHASH(...)`
    const match = graphieJSONP.match(
        new RegExp(`^(?:svgData|svgOtherData)${graphieHash}\\((.+)\\);$`),
    );

    // It is also possible that the JSONP is simply a JSON object,
    //  in which case we can parse it directly.
    const jsonToParse = match ? match[1] : graphieJSONP;

    // Try to parse the JSONP, and if it fails, call the error callback
    try {
        return JSON.parse(jsonToParse);
    } catch (error) {
        errorCallback(error);
        return null;
    }
}

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
    | {
          loaded: false;
          localized: boolean;
          dataCallbacks: Array<any>;
      }
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

        const retrieveData = async (
            url: string,
            errorCallback: (x?: any, status?: any, error?: any) => void,
        ) => {
            const response = await fetch(url);

            if (!response?.ok) {
                errorCallback();
                return;
            }

            const jsonp = await response.text();

            const data = parseDataFromJSONP(hash, jsonp, (error) => {
                Log.error(
                    "Failed to parse JSONP for svg-image",
                    Errors.Service,
                    {
                        cause: error,
                        loggedMetadata: {
                            dataUrl: Util.getDataUrl(url),
                            jsonp,
                        },
                    },
                );
            });

            // If the data is null, then we failed to parse the JSONP
            if (!data) {
                return;
            }

            const newCacheEntry = (labelDataCache[hash] = {
                ...labelDataCache[hash],
                loaded: true as const,
                data,
            });

            newCacheEntry.dataCallbacks.forEach((callback) => {
                callback(newCacheEntry.data, cacheData.localized);
            });
        };

        const dataLoadErrorHandler = (x, status, error) => {
            Log.error("Data load failed for svg-image", Errors.Service, {
                cause: error,
                loggedMetadata: {
                    dataUrl: Util.getDataUrl(url),
                    status,
                },
            });
        };

        if (shouldUseLocalizedData()) {
            // Try to load localized data first. If that fails, fall back to
            // non-localized data and update the localized flag accordingly.
            retrieveData(getLocalizedDataUrl(url), () => {
                // Mark as non-localized since we're falling back to English data
                cacheData.localized = false;
                retrieveData(Util.getDataUrl(url), dataLoadErrorHandler);
            });
        } else {
            retrieveData(Util.getDataUrl(url), dataLoadErrorHandler);
        }
    }
}
