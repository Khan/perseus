/**
 * The Graffiti reference agents read before writing a diagram script: how
 * Graffiti behaves, which the types don't say, then its API as the type
 * definitions of the library the scripts run with. An author's machine has
 * neither Graffiti's source nor perseus-mcp's, so this has to be enough.
 */
import type {KhanStyle} from "./khan-style";
import type {GraffitiTypesModule} from "../../ports/graffiti-types";

type Note = {heading: string; text: string};

/**
 * How Graffiti behaves, from its source and documentation. Each function a
 * note names as `name(` is checked against the library's exports by a test.
 */
export const GRAFFITI_NOTES: ReadonlyArray<Note> = [
    {
        heading: "The script",
        text: `\
A script imports from "graffiti" and "khan-style" (Khan's colors, below)
and nothing else, and default-exports
{canvas, shapes, labels?}, or a function (it may be async) that gets the
library as its argument and returns that. It runs in a process of its own,
with no file, network or process access, for at most 10 seconds. Types
aren't checked: a type mistake (such as circle( on a non-uniform canvas)
shows up only as an error when the diagram is drawn.

    import {scaledUniform, segment, point, label} from "graffiti";
    export default {
        canvas: scaledUniform([-1, 5], [-1, 5], 40, {margin: 10}),
        shapes: [segment(point(0, 0), point(3, 4))],
        labels: [label(point(3, 4), "B", "above right")],
    };`,
    },
    {
        heading: "Coordinates",
        text: `\
Shapes and labels are written in the plane: point(x, y), with y up, as in
math. A canvas maps the plane to the image's pixels (y down) and sets the
image's size: the part of the plane it shows, its scale in pixels per
unit, and a margin in pixels on every side so nothing at the edge is
clipped. PlanePoint and Pixel are classes: a plain [x, y] pair isn't
accepted, and coordinates must be finite numbers. distance(a, b) is in
plane units. ray(A, B) is the half-line from A toward B, ray(A,
degrees(30)) toward an angle; ray(A, B).at(d) is the point d units along
it, and .turned(angle) turns it.`,
    },
    {
        heading: "Canvases",
        text: `\
A uniform canvas uses one scale for both axes, so the picture isn't
stretched: scaledUniform(xRange, yRange, pixelsPerUnit, {margin}),
fixedWidthUniform(xRange, yRange, width), fixedHeightUniform(…, height),
minSizeUniform(…) and maxSizeUniform(…). A non-uniform canvas scales x and y
separately (scaledNonUniform(xRange, yRange, xScale, yScale),
fixedSizeNonUniform(xRange, yRange, width, height)), for graphs whose axes
have different units.

circle( and rightAngle( need a uniform canvas: on a stretched picture a
circle isn't round and a right angle isn't square. On a non-uniform canvas
use ellipse(center, r, r) for a plane circle, or circlePx(center, n) for a
fixed pixel radius. canvas.px(n), on a uniform canvas only, is n pixels in
plane units, for sizing a plane shape in pixels.`,
    },
    {
        heading: "Shapes",
        text: `\
segment(A, B), polyline([points]), polygon([points]) and triangle(A, B, C)
are straight in the plane. rect(…) and ellipse(center, rx, ry) as their
types say. plot(f, t0, t1, samples?) samples a curve, f(t) returning a
point or undefined; it breaks where f returns undefined (for asymptotes).
dot(p, diameter = 8, style?) marks a point: a filled circle, 8 pixels across,
with no stroke. axes({step, xTicks, yTicks, tickLengthPx, edgeTicks}) and
grid({step}) take their extent from the canvas; axes draw no tick at the
origin, and none along an edge unless edgeTicks is set.`,
    },
    {
        heading: "Arcs and angle marks",
        text: `\
Angles are Angles, written degrees(60) or radians(Math.PI / 3), never bare
numbers. Radii are in plane units.

arc(center, radius, start, end) runs counterclockwise from start to end,
and draws the larger arc when that sweep is over 180°.
arcBetween(center, from, to, radius) is the arc around center from the
direction of from to the direction of to, also counterclockwise: to mark
the angle at B between rays BA and BC, write arcBetween(B, A, C, r) when C
is counterclockwise from A as seen from B, else arcBetween(B, C, A, r). The
wrong order draws the reflex angle, the rest of the circle. sector(…) is
the arc closed to its center, a pie slice.

rightAngle(vertex, p, q, sizePx = 8) marks a right angle with a square
sizePx pixels on a side; it refuses rays that aren't at right angles, and q
says which side the square goes on.

There are no helpers for congruence marks yet: draw a tick mark as a short
segment( across the side's midpoint, at right angles to it; parallel marks
as small chevrons with polyline(; an angle with several arcs as
arcBetween( arcs of different radii.`,
    },
    {
        heading: "Style",
        text: `\
Shapes take a style object as their last argument, with only these keys,
in camelCase: fill, stroke (colors, as CSS writes them), strokeWidth
("2") and strokeDashArray ("4 2"). Any other key, such as "fill-opacity",
"opacity" or "stroke-width", is ignored without an error, and there's no
opacity: use a solid light color for a tinted region. Without a style a
shape is drawn with a 1-pixel stroke and no fill, except sector(, which is
filled white, and dot(, which is filled with no stroke. Colors come from
"khan-style" (below).`,
    },
    {
        heading: "Labels",
        text: `\
Text goes in labels, never drawn as shapes, so it can be translated: Perseus
lays the labels over the image. label(at, content, alignment = "center",
{typesetAsMath, style}) places content at a plane point. alignment is
"center", "above", "above right", "right", "below right", "below", "below
left", "left", "above left", or a number of degrees. With typesetAsMath true
the content is TeX, written without dollar signs (escape each backslash in
a string: "\\\\dfrac{1}{2}"); otherwise it's text. style is CSS for the label,
such as {color: "#…"}.`,
    },
];

/** What "khan-style" exports, with its values. */
function khanStyleNote(style: KhanStyle): string {
    return `## Khan's colors ("khan-style")

Draw with Khan Academy's colors, not your own: import them from
"khan-style", the one other module a script may import. A color that isn't
one of these comes back as a warning from create_graffiti and
update_graffiti.

    import {colors, ui, tints} from "khan-style";
    segment(A, B, {stroke: colors.blue, strokeWidth: "2"});
    polygon([A, B, C], {fill: tints.blue, stroke: ui.ink});

- colors: the math colors, safe for text and lines on white. They're what
  TeX's color commands render as in the item's text (\\blueA to \\blueE
  are all colors.blue, \\maroonD is colors.pink, \\tealD colors.green), so
  a diagram can match the text beside it. Give a label the same color with
  its style: label(at, "A", "above", {style: {color: colors.blue}}).
- ui: ink (Khan's black, for outlines and text), interactive (the blue
  Perseus's graphs give plotted points), line (axes) and gridLine.
- tints: light fills for regions; there's no opacity.

Without a style, shapes draw in ui.ink instead of black, axes and grids in
ui.line and ui.gridLine, and a sector's fill in ui.background.

    ${JSON.stringify({colors: style.colors, ui: style.ui, tints: style.tints})}

## Size

The canvas sets the image's size in pixels, margin included (create_graffiti
returns it). Choose it from the image dimensions the guidelines give for
where the image goes (get_guidelines, topic math-images): in the question,
in an answer choice, or behind a widget.`;
}

/** The reference: the notes, then each module's declarations. */
export function graffitiReference(
    modules: ReadonlyArray<GraffitiTypesModule>,
    style?: KhanStyle,
): string {
    const notes = GRAFFITI_NOTES.map(
        ({heading, text}) => `## ${heading}\n\n${text}`,
    );
    if (style != null) {
        notes.push(khanStyleNote(style));
    }
    const api = modules.map(
        ({module, text}) => `### ${module}\n\n\`\`\`ts\n${text}\n\`\`\``,
    );
    return [
        "# Graffiti",
        "How Graffiti behaves, then its API as its type definitions. " +
            "This is all there is to know about it: Graffiti's source " +
            "isn't available to read.",
        ...notes,
        "## API",
        ...api,
    ].join("\n\n");
}
