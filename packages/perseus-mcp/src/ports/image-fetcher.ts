/** An image's bytes, for showing it to the agent. */
export type FetchedImage = {mimeType: string; data: string};

/** Fetches images from the web, for describe_images. */
export interface ImageFetcher {
    /**
     * The image at `url`, base64-encoded, or why it couldn't be fetched (not
     * an image, too large, unreachable).
     */
    fetch(url: string): Promise<FetchedImage | {error: string}>;
}
