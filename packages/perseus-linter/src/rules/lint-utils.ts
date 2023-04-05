/* eslint-disable no-useless-escape */
// Return the portion of a URL between // and /. This is the authority
// portion which is usually just the hostname, but may also include
// a username, password or port. We don't strip those things out because
// we typically want to reject any URL that includes them
const HOSTNAME = /\/\/([^\/]+)/;

// Return the hostname of the URL, with any "www." prefix removed.
// If this is a relative URL with no hostname, return an empty string.
export function getHostname(url: string): string {
    if (!url) {
        return "";
    }
    const match = url.match(HOSTNAME);
    return match ? match[1] : "";
}

// This list of domains that count as internal domains is from
// webapp/content/models.py and webapp/url_util.py
const internalDomains = {
    "khanacademy.org": true,
    "www.khanacademy.org": true,
    "kasandbox.org": true,
    "fastly.kastatic.org": true,
    "cdn.kastatic.org": true, // This isn't a link to cdn.kastatic.org
    "ka-youtube-converted.storage.googleapis.com": true,
    "KA-share.s3.amazonaws.com": true,
    "ka-article-iframes.s3.amazonaws.com": true,
    "ka-cs-algorithms.s3.amazonaws.com": true,
    "ka-cs-challenge-images.s3.amazonaws.com": true,
    "ka-cs-scratchpad-audio.s3.amazonaws.com": true,
    "ka-exercise-screenshots.s3.amazonaws.com": true,
    "ka-exercise-screenshots-2.s3.amazonaws.com": true,
    "ka-exercise-screenshots-3.s3.amazonaws.com": true,
    "ka-learnstorm.s3.amazonaws.com": true,
    "ka-mobile.s3.amazonaws.com": true,
    "ka-perseus-graphie.s3.amazonaws.com": true,
    "ka-perseus-images.s3.amazonaws.com": true,
} as const;

// Returns true if this URL is relative, or if it is an absolute
// URL with one of the domains listed above as its hostname.
export function isInternalURL(url: string): boolean {
    const hostname = getHostname(url);
    // eslint-disable-next-line no-prototype-builtins
    return hostname === "" || internalDomains.hasOwnProperty(hostname);
}
