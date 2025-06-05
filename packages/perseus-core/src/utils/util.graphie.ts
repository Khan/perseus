const svgLabelsRegex = /^web\+graphie:/;
// For offline exercises in the mobile app, we download the graphie data
// (svgs and localized data files) and serve them from the local file
// system (with file://). We replace urls that start with `web+graphie`
// in the perseus json with this `file+graphie` prefix to indicate that
// they should have the `file://` protocol instead of `https://`.
const svgLocalLabelsRegex = /^file\+graphie:/;

// Sometimes other components want to download the actual image e.g. to
// determine its size. Here, we transform an .svg-labels url into the
// correct image url, and leave normal image urls alone
export function getRealImageUrl(graphieUrl: string): string {
    if (isLabeledSVG(graphieUrl)) {
        return getSvgUrl(graphieUrl);
    }
    return graphieUrl;
}

export function isLabeledSVG(graphieUrl: string): boolean {
    return (
        svgLabelsRegex.test(graphieUrl) || svgLocalLabelsRegex.test(graphieUrl)
    );
}

// For each graphie, there are two urls we need to download from. This gets
// the base url without the suffix, and `getSvgUrl` and `getDataUrl` apply
// appropriate suffixes to get the image and other data
export function getBaseUrl(graphieUrl: string): string {
    return graphieUrl
        .replace(svgLabelsRegex, "https:")
        .replace(svgLocalLabelsRegex, "file:");
}

export function getSvgUrl(graphieUrl: string): string {
    return getBaseUrl(graphieUrl) + ".svg";
}

export function getDataUrl(graphieUrl: string): string {
    return getBaseUrl(graphieUrl) + "-data.json";
}

export async function getImageSizeModern(
    url: string,
): Promise<[number, number]> {
    const image = new Image();

    return new Promise((resolve, reject) => {
        // Handle the success case
        image.onload = () => {
            resolve([image.naturalWidth, image.naturalHeight]);
        };

        // Handle the error case
        image.onerror = reject;

        // Kick off the loading
        image.src = getRealImageUrl(url);
    });
}
