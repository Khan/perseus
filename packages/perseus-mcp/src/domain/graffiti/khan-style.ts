import type {RenderedDiagram} from "./diagram";

/**
 * Khan Academy's colors for diagrams, which a Graffiti script imports as
 * "khan-style": the math colors item text uses (so a diagram's blue is the
 * blue of `\blueD` beside it), light tints for regions, and the ink and
 * line colors Perseus's graphs use. The values come from Wonder Blocks when
 * the server starts. Sizes aren't here: the guidelines give them.
 */
export type KhanStyle = {
    /**
     * The math colors, safe for text and lines on white: what TeX's color
     * commands render as (`\blueA` to `\blueE` are all `blue`).
     */
    colors: {
        blue: string;
        green: string;
        gold: string;
        red: string;
        pink: string;
        purple: string;
        purpleD: string;
        gray: string;
        grayH: string;
        grayI: string;
    };
    /** Ink, lines and backgrounds, as Perseus's own graphs draw them. */
    ui: {
        /** Text and outlines: Khan's black. */
        ink: string;
        /** Interactive and plotted points, as Perseus's graphs color them. */
        interactive: string;
        /** Axes and secondary lines. */
        line: string;
        /** Grid lines. */
        gridLine: string;
        background: string;
    };
    /** Light fills for regions, which there's no opacity for. */
    tints: {
        blue: string;
        green: string;
        gold: string;
        red: string;
        gray: string;
    };
};

/**
 * The colors Graffiti draws with when a script gives none, and the Khan
 * colors drawn in their place: Khan's black for black, and Perseus's line
 * colors for Graffiti's grays (axes, grid).
 */
export function graffitiDefaultsReplaced(
    style: KhanStyle,
): Record<string, string> {
    return {
        black: style.ui.ink,
        "#888": style.ui.line,
        "#DDD": style.ui.gridLine,
        // A sector's default fill.
        white: style.ui.background,
    };
}

/** How a color is written, to compare it: lowercase, without spaces. */
function normalized(color: string): string {
    return color.trim().toLowerCase().replace(/\s+/g, "");
}

/** Colors that mean no color at all. */
const NO_COLOR = new Set(["none", "transparent", "inherit", "currentcolor"]);

/**
 * The colors a drawing uses that aren't Khan's, each with where it's used:
 * the SVG's fill and stroke attributes, and the labels' CSS colors.
 */
export function offPaletteColors(
    drawing: RenderedDiagram,
    style: KhanStyle,
): string[] {
    const palette = new Set(
        [
            ...Object.values(style.colors),
            ...Object.values(style.ui),
            ...Object.values(style.tints),
        ].map(normalized),
    );
    const found = new Map<string, Set<string>>();
    function check(color: string, where: string) {
        const key = normalized(color);
        if (!palette.has(key) && !NO_COLOR.has(key)) {
            found.set(color, (found.get(color) ?? new Set()).add(where));
        }
    }
    for (const [, name, value] of drawing.svg.matchAll(
        /\b(fill|stroke)="([^"]*)"/g,
    )) {
        check(value, name);
    }
    for (const label of drawing.data.labels) {
        for (const [property, value] of Object.entries(label.style)) {
            if (/color|background|fill|stroke/i.test(property)) {
                check(value, `label "${label.content}" ${property}`);
            }
        }
    }
    return [...found].map(
        ([color, where]) => `${color} (${[...where].join(", ")})`,
    );
}
