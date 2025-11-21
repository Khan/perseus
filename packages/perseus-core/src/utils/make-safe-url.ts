/**
 * Take the provided URL and make sure it can be parsed, it's of the
 * expected origin, and has the specified locale.
 *
 * If it can't be parsed or if it's not of the expected origin, return null.
 * Setting URL to null will display an error message in the iframe
 *
 * @param urlString - The URL to make safe.
 * @param locale - The locale to use for the URL.
 * @param expectedOrigin - The expected origin of the URL.
 * @returns The safe URL, or null if the URL is not safe.
 */
export const makeSafeUrl = (
    urlString: string,
    locale: string,
    expectedOrigin: string,
): URL | null => {
    if (!URL.canParse(urlString)) {
        return null;
    }
    const url = new URL(urlString);
    if (url.origin !== expectedOrigin) {
        return null;
    }
    url.searchParams.set("locale", locale);
    return url;
};
