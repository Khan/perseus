import {isLabeledSVG} from "@khanacademy/perseus-core";
import {parseGIF, decompressFrames} from "gifuct-js";

import type {ParsedFrame} from "gifuct-js";

export function isGif(url: string): boolean {
    // Trying to do this the "right way" by loading in the image and counting
    // frames would add more complexity than we need here. With our CDN's filename
    // structure, we can assume that all .gif images will have a URL ending in .gif.
    return url.endsWith(".gif");
}

/**
 * Fetches a GIF and decodes it into individual frames using gifuct-js.
 * Returns the parsed frames array, which includes per-frame pixel data,
 * delay, dimensions, and disposal type.
 */
export async function decodeGifFrames(src: string): Promise<ParsedFrame[]> {
    const res = await fetch(src);
    if (!res.ok) {
        return [];
    }

    const buffer = await res.arrayBuffer();
    const gif = parseGIF(buffer);
    return decompressFrames(gif, true);
}

export function isSvg(url: string): boolean {
    const hasSvgExtension = url.endsWith(".svg");
    const hasGraphieUrl = isLabeledSVG(url);
    return hasSvgExtension || hasGraphieUrl;
}
