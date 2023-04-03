// We cache the client location as we want to only ever return the initial
// location that was used to render the page.
let _cachedClientLocation: Location;

/**
 * Get the location.
 */
const location = (): Location => {
    /**
     * We cache the result to ensure that on subsequent requests we always get
     * the first URL that was used to initially render the page.
     */
    if (!_cachedClientLocation) {
        // eslint-disable-next-line no-restricted-syntax
        _cachedClientLocation = window.location;
    }

    return _cachedClientLocation;
};

/**
 * Parses a URL using the browser's built-in new URL(). Is also able to handle
 * relative URLs.
 *
 * @param {string} url The URL to parse.
 */
const parseUrl = (url: string): URL => new URL(url, location().origin);

/**
 * Turns a URL into an absolute URL.
 *
 * @param {string} url The URL to turn into an absolute URL.
 */
export const toAbsoluteUrl = (url: string): string => parseUrl(url).href;
