import {pureMarkdownRules} from "@khanacademy/pure-markdown";
import SimpleMarkdown from "@khanacademy/simple-markdown";

import {clampToBox, inset, MIN, size, X, Y} from "./math";

import type {MafsGraphProps} from "./mafs-graph";
import type {InteractiveGraphState, UnlimitedGraphState} from "./types";
import type {Coord} from "../../interactive2/types";
import type {PerseusInteractiveGraphWidgetOptions} from "@khanacademy/perseus-core";
import type {Interval, vec} from "mafs";

/**
 * 44 is touch best practice and AAA compliant for WCAG
 * https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
 */
export const TARGET_SIZE = 44;

export const REMOVE_BUTTON_ID = "perseus_mafs_remove_button";

// same as pointsFromNormalized in interactive-graph.tsx
export const normalizePoints = <A extends Coord[]>(
    range: PerseusInteractiveGraphWidgetOptions["range"],
    step: PerseusInteractiveGraphWidgetOptions["step"],
    coordsList: A,
    noSnap?: boolean,
): A =>
    coordsList.map(
        (coords) =>
            // maps over [x, y]
            coords.map((coord, i) => {
                const axisRange = range[i];
                if (noSnap) {
                    return axisRange[MIN] + size(axisRange) * coord;
                }
                const axisStep = step[i];
                const nSteps = Math.floor(size(axisRange) / axisStep);
                const tick = Math.round(coord * nSteps);
                return axisRange[MIN] + axisStep * tick;
            }) as Coord,
    ) as any;

// same as normalizeCoords in interactive-graph.tsx
export const normalizeCoords = <A extends Coord[]>(
    coordsList: A,
    ranges: PerseusInteractiveGraphWidgetOptions["range"],
): A =>
    coordsList.map<Coord>(
        (coords) =>
            coords.map((coord, i) => {
                return (coord + ranges[i][1]) / size(ranges[i]);
            }) as Coord,
    ) as any;

// Returns the closest point to the given `point` that is within the graph
// bounds given in `state`.
export function bound({
    snapStep,
    range,
    point,
}: {
    snapStep: vec.Vector2;
    range: [Interval, Interval];
    point: vec.Vector2;
}): vec.Vector2 {
    const boundingBox = inset(snapStep, range);
    return clampToBox(boundingBox, point);
}

// Returns the closest point to the given `point` that is within or on the
// edge of the graph bounds given in `state`.
export function boundToEdge({
    range,
    point,
}: {
    range: [Interval, Interval];
    point: vec.Vector2;
}): vec.Vector2 {
    // Use the full range instead of insetting it, allowing points to
    // be placed on the edge of the graph.
    return clampToBox(range, point);
}

export function isUnlimitedGraphState(
    state: InteractiveGraphState,
): state is UnlimitedGraphState {
    return (
        (state.type === "point" && state.numPoints === "unlimited") ||
        (state.type === "polygon" && state.numSides === "unlimited")
    );
}

/**
 * Parse a string of text and math into a list of objects with type and content
 *
 * Example: "Pi is about $\frac{22}{7}$" ==>
 *    [
 *      {type: "text", content: "Pi is about "},
 *      {type: "math", content: "\\frac{22}{7}"},
 *    ]
 */
export const mathOnlyParser = SimpleMarkdown.parserFor(
    {
        math: {
            ...pureMarkdownRules.math,
            order: 0,
        },
        text: {
            order: 1,
            match: SimpleMarkdown.anyScopeRegex(/^([^$\\{}]+)/),
            parse: (capture) => ({content: capture[0]}),
        },
        specialCharacter: {
            order: 2,
            match: SimpleMarkdown.anyScopeRegex(/^(\\[\S\s]|\$|\\$|{|})/),
            parse: (capture) => ({content: capture[0]}),
        },
    },
    {inline: true},
);

/**
 * Replace all text outside of the $ TeX blocks with `\\text{...}`
 * This way, the entire resulting string can be rendered within <TeX>
 * and the text outside of the $ blocks will be non-TeX text.
 */
export function replaceOutsideTeX(mathString: string) {
    // All the information we need is in the first section,
    // whether it's typed as "blockmath" or "paragraph"
    const parsed = mathOnlyParser(mathString);

    let result = "";

    for (const piece of parsed) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        piece.type === "math"
            ? (result += "$" + piece.content + "$")
            : piece.type === "specialCharacter"
              ? (result += escapeIfUnescaped(piece.content))
              : (result += piece.content);
    }

    return `\\text{${result}}`;
}

function escapeIfUnescaped(character: string) {
    if (character.length === 1) {
        return "\\" + character;
    } else {
        return character;
    }
}

export function getBaseMafsGraphPropsForTests(): MafsGraphProps {
    return {
        box: [400, 400],
        step: [1, 1],
        gridStep: [1, 1],
        markings: "graph",
        containerSizeClass: "small",
        showTooltips: false,
        showProtractor: false,
        readOnly: false,
        labels: ["x", "y"],
        lockedFigures: [],
        static: false,
        showAxisArrows: {
            xMin: true,
            xMax: true,
            yMin: true,
            yMax: true,
        },
        dispatch: () => {},
        state: {
            type: "segment",
            hasBeenInteractedWith: false,
            coords: [],
            snapStep: [1, 1],
            range: [
                [-10, 10],
                [-10, 10],
            ],
        },
        widgetId: "test-widget-id",
    };
}
// Calculate the difference between the min and max values of a range
const getRangeDiff = (range: vec.Vector2) => {
    const [min, max] = range;
    return Math.abs(max - min);
};

// We need to adjust the nested SVG viewbox x and Y values based on the range of the graph in order
// to ensure that the graph is sized and positioned correctly within the Mafs SVG and the clipping mask.
// Exported for testing.
export const calculateNestedSVGCoords = (
    range: vec.Vector2[],
    width: number,
    height: number,
): {viewboxX: number; viewboxY: number} => {
    // X RANGE
    let viewboxX = 0; // When xMin is 0, we want to use 0 as the viewboxX value
    const totalXRange = getRangeDiff(range[X]);
    const gridCellWidth = width / totalXRange;
    const minX = range[X][MIN];

    // If xMin is entirely positive, we need to adjust the
    // viewboxX to be the grid cell width multiplied by xMin
    if (minX > 0) {
        viewboxX = gridCellWidth * Math.abs(minX);
    }
    // If xMin is negative, we need to adjust the viewboxX to be
    // the negative value of the grid cell width multiplied by xMin
    if (minX < 0) {
        viewboxX = -gridCellWidth * Math.abs(minX);
    }

    // Y RANGE
    let viewboxY = -height; // When yMin is 0, we want to use the negative value of the graph height
    const totalYRange = getRangeDiff(range[Y]);
    const gridCellHeight = height / totalYRange;
    const minY = range[Y][MIN];

    // If the y range is entirely positive, we want a negative sum of the
    // height and the gridcell height multiplied by the absolute value of yMin
    if (minY > 0) {
        viewboxY = -height - gridCellHeight * Math.abs(minY);
    }

    // If the yMin is negative, we want to multiply the gridcell height
    // by the absolute value of yMin, and subtract the full height of the graph
    if (minY < 0) {
        viewboxY = gridCellHeight * Math.abs(minY) - height;
    }

    return {
        viewboxX,
        viewboxY,
    };
};

/**
 * Gets the effective CSS zoom factor applied to an element or any of its ancestors.
 * This is used to compensate for the mobile font scaling zoom applied to the body
 * or exercise content via the fontScale query parameter.
 *
 * On mobile, the parent application may apply CSS zoom to accommodate device font
 * size settings. This zoom affects coordinate calculations for click/touch events,
 * as both clientX/clientY and getBoundingClientRect() return zoomed values, but
 * the SVG coordinate system expects unzoomed pixel values.
 *
 * In the KA architecture, zoom is applied once to either the body element (articles)
 * or .exercise-chrome-content-for-mobile-zoom (exercises), not nested.
 *
 * @param element - The DOM element to check for CSS zoom
 * @returns The zoom factor (e.g., 1.5 for 150% zoom, 1.0 for no zoom)
 */
export function getCSSZoomFactor(element: Element): number {
    let currentElement: Element | null = element;

    // Traverse up the DOM tree to find the first zoom value
    while (currentElement) {
        const computedStyle = window.getComputedStyle(currentElement);
        const zoom = computedStyle.zoom;

        if (zoom && zoom !== "normal") {
            const zoomValue = parseFloat(zoom);
            if (!isNaN(zoomValue)) {
                return zoomValue;
            }
        }

        currentElement = currentElement.parentElement;
    }

    return 1;
}
