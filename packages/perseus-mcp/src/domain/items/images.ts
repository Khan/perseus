import {GRAFFITI_HOST} from "../graffiti/diagram";

import type {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";

/**
 * An image in an item, with what describes it and where to change that, for
 * describe_images.
 */
export type ItemImage = {
    /** "question" or "hints[1]". */
    where: string;
    kind: "image widget" | "markdown image";
    url: string;
    /** What the URL is: a picture, a Graphie image, or a Graffiti diagram. */
    format: "raster" | "graphie" | "graffiti" | "other";
    /** The Graffiti diagram's id, when it is one. */
    graffitiId?: string;
    widgetId?: string;
    alt: string;
    longDescription?: string;
    decorative?: boolean;
    caption?: string;
    title?: string;
    size?: {width: number; height: number};
    /**
     * JSON Pointers to change the description with edit_item; a Markdown
     * image's alt text is in its content, at `content`.
     */
    pointers: {
        alt?: string;
        longDescription?: string;
        decorative?: string;
        content?: string;
    };
};

const MARKDOWN_IMAGE = /!\[([^\]]*)\]\(\s*([^)\s]+)/g;
const RASTER = /\.(png|jpe?g|gif|webp)(\?|#|$)/i;
const GRAFFITI = new RegExp(
    `^web\\+graphie://${GRAFFITI_HOST.replace(/\./g, "\\.")}/graffiti/([^/?#.]+)`,
);

/** A JSON Pointer token: "~" and "/" escaped (RFC 6901). */
function token(value: string): string {
    return value.replace(/~/g, "~0").replace(/\//g, "~1");
}

function formatOf(url: string): Pick<ItemImage, "format" | "graffitiId"> {
    const graffiti = GRAFFITI.exec(url);
    if (graffiti != null) {
        return {format: "graffiti", graffitiId: graffiti[1]};
    }
    // A Graphie image is an SVG with its labels laid over it; its bucket
    // refuses requests for a PNG of it.
    if (
        url.startsWith("web+graphie://") ||
        url.includes("ka-perseus-graphie")
    ) {
        return {format: "graphie"};
    }
    return RASTER.test(url) ? {format: "raster"} : {format: "other"};
}

function imagesIn(
    renderer: PerseusRenderer,
    where: string,
    base: string,
): ItemImage[] {
    const images: ItemImage[] = [];
    for (const [id, widget] of Object.entries(renderer.widgets ?? {})) {
        if (widget?.type !== "image") {
            continue;
        }
        const options = widget.options;
        const url = options.backgroundImage?.url ?? "";
        const at = `${base}/widgets/${token(id)}/options`;
        images.push({
            where,
            kind: "image widget",
            url,
            ...formatOf(url),
            widgetId: id,
            alt: options.alt ?? "",
            ...(options.longDescription
                ? {longDescription: options.longDescription}
                : {}),
            ...(options.decorative != null
                ? {decorative: options.decorative}
                : {}),
            ...(options.caption ? {caption: options.caption} : {}),
            ...(options.title ? {title: options.title} : {}),
            ...(options.backgroundImage?.width != null &&
            options.backgroundImage.height != null
                ? {
                      size: {
                          width: options.backgroundImage.width,
                          height: options.backgroundImage.height,
                      },
                  }
                : {}),
            pointers: {
                alt: `${at}/alt`,
                longDescription: `${at}/longDescription`,
                decorative: `${at}/decorative`,
            },
        });
    }
    for (const match of renderer.content.matchAll(MARKDOWN_IMAGE)) {
        images.push({
            where,
            kind: "markdown image",
            url: match[2],
            ...formatOf(match[2]),
            alt: match[1],
            pointers: {content: `${base}/content`},
        });
    }
    return images;
}

/**
 * Every image in an item's question and hints: image widgets and Markdown
 * images. Images inside other widgets (a graded group's, a radio choice's)
 * aren't listed.
 */
export function imagesOf(item: PerseusItem): ItemImage[] {
    return [
        ...imagesIn(item.question, "question", "/question"),
        ...item.hints.flatMap((hint, i) =>
            imagesIn(hint, `hints[${i}]`, `/hints/${i}`),
        ),
    ];
}
