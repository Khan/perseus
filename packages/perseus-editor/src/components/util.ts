import {vector as kvector} from "@khanacademy/kmath";
import {
    getAngleCoords,
    getCircleCoords,
    getLineCoords,
    getLinearSystemCoords,
    getPointCoords,
    getPolygonCoords,
    getQuadraticCoords,
    getSegmentCoords,
    getSinusoidCoords,
} from "@khanacademy/perseus";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";

import type {
    Range,
    LockedFigure,
    LockedFigureType,
    LockedPointType,
    LockedLineType,
    LockedEllipseType,
    LockedVectorType,
    LockedPolygonType,
    LockedFunctionType,
    LockedLabelType,
    PerseusGraphType,
    Coord,
} from "@khanacademy/perseus";

export function focusWithChromeStickyFocusBugWorkaround(element: Element) {
    // NOTE(marksandstrom) Chrome sticky focus bug.
    //
    // There is a bug in Chrome related to sticky positioning and
    // focus: When a child of an element with sticky positioning is
    // focused with the focus() method, the scrollable area
    // containing that element will scroll to the top (even though
    // the element is already visble on the page). For a dropdown
    // this means that the area will be scrolled to the top when
    // the user interacts with the dropdown (since we actively
    // manage dropdown header and option focus for keyboard users).
    //
    // To work around this bug the `preventScroll` focus option is
    // used.
    //
    // Using `focusOptions` is an experimental browser feature
    // "that should not be used in production code". However, since
    // Chrome is the only browser we support that exhibits this
    // buggy behavior and using `focusOptions` works around the
    // bug, it is perfectly reasonable to use the feature in this
    // case. We are not relying on the effect of the
    // `preventScroll` option otherwise.
    //
    // focusOptions documentation:
    //
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
    //
    // Note that there could be cases where we want default focus() behavior.
    // One that comes to mind is a dropdown with a long list of options that
    // might be rendered off screen when opened. With this workaround the
    // selected option would not be scrolled into view if the option is near
    // the end of the list. We're not aware of any uses of the dropdown where
    // this is an issue, however, so there isn't currently a way to out of the
    // `preventScroll` behavior.

    // @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'Element'.
    element.focus({preventScroll: true});
}

export function degreeToRadian(degrees: number) {
    return (degrees / 180) * Math.PI;
}
export function radianToDegree(radians: number) {
    return (radians / Math.PI) * 180;
}

export function getDefaultGraphStartCoords(
    graph: PerseusGraphType,
    range: [x: Range, y: Range],
    step: [x: number, y: number],
): PerseusGraphType["startCoords"] {
    switch (graph.type) {
        case "linear":
        case "ray":
            return getLineCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "segment":
            return getSegmentCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "linear-system":
            return getLinearSystemCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "circle":
            const startCoords = getCircleCoords({
                ...graph,
                startCoords: undefined,
            });
            const radius = kvector.length(
                kvector.subtract(startCoords.radiusPoint, startCoords.center),
            );
            return {center: startCoords.center, radius};
        case "sinusoid":
            return getSinusoidCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "quadratic":
            return getQuadraticCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "point":
            return getPointCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "polygon":
            return getPolygonCoords(
                {...graph, startCoords: undefined},
                range,
                step,
            );
        case "angle":
            return getAngleCoords({
                graph: {...graph, startCoords: undefined},
                range,
                step,
            });
        default:
            return undefined;
    }
}

export const getSinusoidEquation = (startCoords: [Coord, Coord]) => {
    // Get coefficients
    // It's assumed that p1 is the root and p2 is the first peak
    const p1 = startCoords[0];
    const p2 = startCoords[1];

    // Resulting coefficients are canonical for this sine curve
    const amplitude = p2[1] - p1[1];
    const angularFrequency = Math.PI / (2 * (p2[0] - p1[0]));
    const phase = p1[0] * angularFrequency;
    const verticalOffset = p1[1];

    return (
        "y = " +
        amplitude.toFixed(3) +
        "sin(" +
        angularFrequency.toFixed(3) +
        "x - " +
        phase.toFixed(3) +
        ") + " +
        verticalOffset.toFixed(3)
    );
};

export const getQuadraticEquation = (startCoords: [Coord, Coord, Coord]) => {
    const p1 = startCoords[0];
    const p2 = startCoords[1];
    const p3 = startCoords[2];

    const denom = (p1[0] - p2[0]) * (p1[0] - p3[0]) * (p2[0] - p3[0]);
    if (denom === 0) {
        // Many of the callers assume that the return value is always defined.
        return "Division by zero error";
    }
    const a =
        (p3[0] * (p2[1] - p1[1]) +
            p2[0] * (p1[1] - p3[1]) +
            p1[0] * (p3[1] - p2[1])) /
        denom;
    const b =
        (p3[0] * p3[0] * (p1[1] - p2[1]) +
            p2[0] * p2[0] * (p3[1] - p1[1]) +
            p1[0] * p1[0] * (p2[1] - p3[1])) /
        denom;
    const c =
        (p2[0] * p3[0] * (p2[0] - p3[0]) * p1[1] +
            p3[0] * p1[0] * (p3[0] - p1[0]) * p2[1] +
            p1[0] * p2[0] * (p1[0] - p2[0]) * p3[1]) /
        denom;

    return (
        "y = " + a.toFixed(3) + "x^2 + " + b.toFixed(3) + "x + " + c.toFixed(3)
    );
};

const findAngle = (point1: Coord, point2: Coord) => {
    const x = point1[0] - point2[0];
    const y = point1[1] - point2[1];

    return (180 + (Math.atan2(-y, -x) * 180) / Math.PI + 360) % 360;
};

export const getAngleEquation = (startCoords: [Coord, Coord, Coord]) => {
    const [point1, vertex, point2] = startCoords;

    const angle = findAngle(point2, vertex) - findAngle(point1, vertex);
    const roundedAngle = angle.toFixed(0);

    return `${roundedAngle}\u00B0 angle at (${vertex[0]}, ${vertex[1]})`;
};

export const shouldShowStartCoordsUI = (
    graph: PerseusGraphType,
    isStatic?: boolean,
) => {
    // We don't show the start coords UI for static graphs, since
    // the coords shown for this are determined by the coords on the
    // "correct" graph. The start coords would not be used here.
    if (isStatic) {
        return false;
    }

    if (graph.type === "point" && graph.numPoints === "unlimited") {
        return false;
    }

    if (
        graph.type === "polygon" &&
        (graph.numSides === "unlimited" ||
            graph.snapTo === "angles" ||
            graph.snapTo === "sides")
    ) {
        return false;
    }

    return true;
};
