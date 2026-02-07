// Return the portion of a URL between // and /. This is the authority
// portion which is usually just the hostname, but may also include
// a username, password or port. We don't strip those things out because
// we typically want to reject any URL that includes them
const HOSTNAME = /\/\/([^/]+)/;

// Return the hostname of the URL, with any "www." prefix removed.
// If this is a relative URL with no hostname, return an empty string.
export function getHostname(url: string): string {
    if (!url) {
        return "";
    }
    const match = url.match(HOSTNAME);
    return match ? match[1] : "";
}
