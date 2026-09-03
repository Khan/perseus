import type {FillInTheBlankTile} from "@khanacademy/perseus";

export type ImageHeight = NonNullable<FillInTheBlankTile["imageHeight"]>;

/**
 * The seven display heights the Drag-and-Drop spec allows for an image choice.
 * Fixing the height is what lets the system reason about responsive behaviour:
 * the displayed width follows from the image's aspect ratio.
 */
export const IMAGE_HEIGHTS = [24, 36, 48, 60, 72, 84, 96] as const;

/**
 * How wide a choice's content may be. The family-wide cap; a whole tile is
 * capped at 256px, which is the choice bank's width at the 320px viewport.
 * An image must fit without scrolling.
 */
export const MAX_TILE_CONTENT_WIDTH = 200;

/**
 * Heights as select options. Keys are strings because `TypedSingleSelect`
 * models a `<select>`, whose values are strings.
 */
export const imageHeightOptions = {
    "24": "24px",
    "36": "36px",
    "48": "48px",
    "60": "60px",
    "72": "72px",
    "84": "84px",
    "96": "96px",
} as const;

export type ImageHeightValue = keyof typeof imageHeightOptions;

/**
 * The same heights as numbers, so reading a selection back is a lookup rather
 * than a `Number(...)` cast. The `satisfies` keeps the two in step: drop or
 * mistype a height and it stops compiling.
 */
export const imageHeightValues = {
    "24": 24,
    "36": 36,
    "48": 48,
    "60": 60,
    "72": 72,
    "84": 84,
    "96": 96,
} as const satisfies Record<ImageHeightValue, ImageHeight>;

/** A height as the select's string value. */
export const toHeightValue = (height: ImageHeight): ImageHeightValue =>
    `${height}`;

/**
 * Whole-string image markdown: a choice is an image *or* text, never both, so
 * the match is anchored. An image with no URL yet (`![]()`) still counts —
 * that is the state right after "Add image".
 */
const IMAGE_MARKDOWN = /^\s*!\[([^\]]*)\]\(([^)]*)\)\s*$/;

/** Reads `![alt](url)`, or null when the content is not a lone image. */
export function parseImageMarkdown(
    content: string,
): {alt: string; url: string} | null {
    const match = IMAGE_MARKDOWN.exec(content);
    return match == null ? null : {alt: match[1], url: match[2]};
}

export function toImageMarkdown(url: string, alt: string): string {
    return `![${alt}](${url})`;
}
