/**
 * Checks of a drawn diagram against what Khan's style and the guidelines
 * rule out where code can tell. Errors are what a diagram mustn't do (it
 * isn't kept); warnings need a person's judgment.
 */
import {offPaletteColors} from "./khan-style";

import type {RenderedDiagram} from "./diagram";
import type {KhanStyle} from "./khan-style";

export type DiagramCheck = {errors: string[]; warnings: string[]};

/** The style keys Graffiti draws with; it ignores any other. */
const STYLE_KEYS = new Set([
    "fill",
    "stroke",
    "strokeWidth",
    "strokeDashArray",
]);

/** WCAG 2.2's minimum contrasts: text, and graphics needed to understand. */
const TEXT_CONTRAST = 4.5;
const GRAPHICS_CONTRAST = 3;

/** Shapes drawn only to help read the picture, which needn't stand out. */
const BACKGROUND_SHAPES = new Set(["Grid"]);

/** Shapes whose fill is the mark itself, like a dot, rather than a region. */
const FILLED_MARKS = new Set(["CirclePx"]);

/** The color's red, green and blue (0 to 255), if it's written in hex. */
function rgb(color: string): [number, number, number] | null {
    const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim())?.[1];
    if (hex == null) {
        return null;
    }
    const full =
        hex.length === 3
            ? [...hex].map((digit) => digit + digit).join("")
            : hex;
    const channel = (i: number) => parseInt(full.slice(i, i + 2), 16);
    return [channel(0), channel(2), channel(4)];
}

// https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
function luminance([r, g, b]: [number, number, number]): number {
    const [lr, lg, lb] = [r, g, b].map((channel) => {
        const c = channel / 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/** The contrast ratio of two hex colors, or null if either isn't hex. */
export function contrast(a: string, b: string): number | null {
    const ca = rgb(a);
    const cb = rgb(b);
    if (ca == null || cb == null) {
        return null;
    }
    const [hi, lo] = [luminance(ca), luminance(cb)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
}

function lowContrast(
    color: unknown,
    background: string,
    minimum: number,
): string | null {
    if (typeof color !== "string") {
        return null;
    }
    const ratio = contrast(color, background);
    return ratio != null && ratio < minimum ? ratio.toFixed(1) : null;
}

/** A label's own word for itself, for messages. */
function named(label: {content: string}): string {
    return `label "${label.content}"`;
}

/**
 * The diagram's errors and warnings. Without Khan's style, only what needs
 * none is checked: style keys and TeX labels.
 */
export function checkDiagram(
    drawing: RenderedDiagram,
    style?: KhanStyle,
): DiagramCheck {
    const errors: string[] = [];
    const warnings: string[] = [];
    const background = style?.ui.background ?? "#ffffff";

    for (const {kind, style: given} of drawing.shapes ?? []) {
        const unknown = Object.keys(given).filter(
            (key) => !STYLE_KEYS.has(key),
        );
        if (unknown.length > 0) {
            errors.push(
                `A ${kind}'s style has ${unknown.map((k) => `"${k}"`).join(", ")}, ` +
                    "which Graffiti ignores: its style keys are fill, stroke, " +
                    "strokeWidth and strokeDashArray. There's no opacity: use a " +
                    'tint from "khan-style" for a light region.',
            );
        }
        if (style == null || BACKGROUND_SHAPES.has(kind)) {
            continue;
        }
        const stroke = lowContrast(given.stroke, background, GRAPHICS_CONTRAST);
        if (stroke != null) {
            errors.push(
                `A ${kind}'s stroke ${String(given.stroke)} has a contrast of ` +
                    `${stroke}:1 on the background, under ${GRAPHICS_CONTRAST}:1: ` +
                    'use a darker color from "khan-style" (colors or ui), or ' +
                    "draw it as a filled region with no stroke.",
            );
        }
        if (FILLED_MARKS.has(kind)) {
            const fill = lowContrast(given.fill, background, GRAPHICS_CONTRAST);
            if (fill != null) {
                errors.push(
                    `A ${kind}'s fill ${String(given.fill)} has a contrast of ` +
                        `${fill}:1 on the background, under ` +
                        `${GRAPHICS_CONTRAST}:1: use a color from "khan-style" ` +
                        "colors or ui.",
                );
            }
        }
    }

    for (const label of drawing.data.labels) {
        if (style != null) {
            const color = lowContrast(
                label.style.color,
                background,
                TEXT_CONTRAST,
            );
            if (color != null) {
                errors.push(
                    `The ${named(label)}'s color ${label.style.color} has a ` +
                        `contrast of ${color}:1 on the background, under ` +
                        `${TEXT_CONTRAST}:1 for text: use a color from ` +
                        '"khan-style" colors, or ui.ink.',
                );
            }
        }
        if (label.typesetAsMath) {
            if (/\\frac(?![a-z])/.test(label.content)) {
                errors.push(
                    `The ${named(label)} uses \\frac: write \\dfrac, so the ` +
                        "fraction is full size.",
                );
            }
            const big = /(?<![\d.,{}])\d{5,}(?![\d{])/.exec(label.content);
            if (big != null) {
                const digits = big[0];
                const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, "{,}");
                errors.push(
                    `The ${named(label)} writes ${digits}: group its digits ` +
                        `with {,} as ${grouped}.`,
                );
            }
        } else if (/^\p{L}{3,}$/u.test(label.content.trim())) {
            warnings.push(
                `The ${named(label)} is one word: prefer a few words that ` +
                    "say what it names, unless one word is all it needs.",
            );
        }
    }

    if (style != null) {
        const offPalette = offPaletteColors(drawing, style);
        if (offPalette.length > 0) {
            warnings.push(
                `Colors outside Khan's palette: ${offPalette.join("; ")}. ` +
                    'Use colors, ui or tints from "khan-style".',
            );
        }
    }
    return {errors, warnings};
}
