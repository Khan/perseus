import type {ImageFetcher} from "../../ports/image-fetcher";

/** The type of an image an agent can see, from its first bytes. */
function sniff(bytes: Buffer): string | null {
    if (bytes.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"))) {
        return "image/png";
    }
    if (bytes.subarray(0, 3).equals(Buffer.from("ffd8ff", "hex"))) {
        return "image/jpeg";
    }
    if (bytes.subarray(0, 4).toString("latin1") === "GIF8") {
        return "image/gif";
    }
    if (
        bytes.subarray(0, 4).toString("latin1") === "RIFF" &&
        bytes.subarray(8, 12).toString("latin1") === "WEBP"
    ) {
        return "image/webp";
    }
    return null;
}

/** Larger images aren't attached: they'd cost the agent too much. */
const MAX_BYTES = 1_500_000;

const TIMEOUT_MS = 10_000;

/** Fetches images with Node's fetch, within a size and time limit. */
export const nodeImageFetcher: ImageFetcher = {
    async fetch(url) {
        let response: Response;
        try {
            response = await fetch(url, {
                signal: AbortSignal.timeout(TIMEOUT_MS),
            });
        } catch (e) {
            return {error: `couldn't fetch it: ${String(e)}`};
        }
        if (!response.ok) {
            return {error: `the server answered ${response.status}`};
        }
        const bytes = Buffer.from(await response.arrayBuffer());
        // S3 often serves images as application/octet-stream: the bytes
        // say what they are.
        const mimeType = sniff(bytes);
        if (mimeType == null) {
            return {error: "it isn't a PNG, JPEG, GIF or WebP image"};
        }
        if (bytes.length > MAX_BYTES) {
            return {
                error: `it's ${Math.round(bytes.length / 1000)} KB, over 1,500 KB`,
            };
        }
        return {mimeType, data: bytes.toString("base64")};
    },
};
