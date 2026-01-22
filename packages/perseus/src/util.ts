import {
    getRealImageUrl,
    getBaseUrl,
    getSvgUrl,
    getDataUrl,
    getImageSizeModern,
    isLabeledSVG,
} from "@khanacademy/perseus-core";
import {KhanAnswerTypes} from "@khanacademy/perseus-score";
import _ from "underscore";

import type {Range} from "@khanacademy/perseus-core";
import type * as React from "react";

type WordPosition = {
    start: number;
    end: number;
};

type WordAndPosition = {
    string: string;
    pos: WordPosition;
};

export type ParsedValue = {
    value: number;
    exact: boolean;
};

// TODO: dedupe this with Coord in interactive2/types.js
type Coordinates = [number, number];

export type GridDimensions = {
    scale: number;
    tickStep: number;
    unityLabel: boolean;
};

type QueryParams = {
    [param: string]: string;
};

export type Position = {
    top: number;
    left: number;
};

type TouchHandlers = {
    pointerDown: boolean;
    currentTouchIdentifier: string | null | undefined;
};

let supportsPassive = false;

const nestedMap = function <T, M>(
    children: T | ReadonlyArray<T>,
    func: (arg1: T) => M,
    context: unknown,
): M | ReadonlyArray<M> {
    if (Array.isArray(children)) {
        // @ts-expect-error - TS2322 - Type '(M | readonly M[])[]' is not assignable to type 'M | readonly M[]'.
        return _.map(children, function (child) {
            // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
            return nestedMap(child, func);
        });
    }
    // TODO(LEMS-2656): remove TS suppression
    // @ts-expect-error: T | ReadonlyArray<T> is not assignable to T
    return func.call(context, children);
};

/**
 * Used to compare equality of two input paths, which are represented as
 * arrays of strings.
 */
function inputPathsEqual(
    a?: ReadonlyArray<string> | null,
    b?: ReadonlyArray<string> | null,
): boolean {
    if (a == null || b == null) {
        return (a == null) === (b == null);
    }

    return (
        a.length === b.length &&
        a.every((item, index) => {
            return b[index] === item;
        })
    );
}

const rWidgetRule = /^\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]/;
const rTypeFromWidgetId = /^([a-z-]+) ([0-9]+)$/;

const rWidgetParts = new RegExp(rWidgetRule.source + "$");
const snowman = "\u2603";

/**
 * Return the first valid interpretation of 'text' as a number, in the form
 * {value: 2.3, exact: true}.
 */
function firstNumericalParse(text: string): ParsedValue | null | undefined {
    let first;
    const val = KhanAnswerTypes.predicate.createValidatorFunctional(
        function (ans) {
            first = ans;
            return true; /* break */
        },
        {
            simplify: "optional",
            inexact: true,
            forms: "integer, proper, improper, pi, log, mixed, decimal",
        },
    );

    val(text);
    return first;
}

function stringArrayOfSize(size: number): string[] {
    return Array(size).fill("");
}

function stringArrayOfSize2D(opt: {rows: number; columns: number}): string[][] {
    const {rows, columns} = opt;
    const rowArr = stringArrayOfSize(rows);
    return rowArr.map(() => stringArrayOfSize(columns));
}

/**
 * For a graph's x or y dimension, given the tick step,
 * the ranges extent (e.g. [-10, 10]), the pixel dimension constraint,
 * and the grid step, return a bunch of configurations for that dimension.
 *
 * Example:
 *      gridDimensionConfig(10, [-50, 50], 400, 5)
 *
 * Returns: {
 *      scale: 4,
 *      snap: 2.5,
 *      tickStep: 2,
 *      unityLabel: true
 * };
 */
function gridDimensionConfig(
    absTickStep: number,
    extent: Coordinates,
    dimensionConstraint: number,
    gridStep: number,
): GridDimensions {
    const scale = scaleFromExtent(extent, dimensionConstraint);
    const stepPx = absTickStep * scale;
    const unityLabel = stepPx > 30;
    return {
        scale: scale,
        tickStep: absTickStep / gridStep,
        unityLabel: unityLabel,
    };
}
/**
 * Given the range, step, and boxSize, calculate the reasonable gridStep.
 * Used for when one was not given explicitly.
 *
 * Example:
 *      getGridStep([[-10, 10], [-10, 10]], [1, 1], 340)
 *
 * Returns: [1, 1]
 */
function getGridStep(
    range: [Coordinates, Coordinates],
    step: Coordinates,
    boxSize: number,
): Coordinates {
    // @ts-expect-error - TS2322 - Type '(number | null | undefined)[]' is not assignable to type 'Coordinates'.
    return _(2).times(function (i) {
        const scale = scaleFromExtent(range[i], boxSize);
        const gridStep = gridStepFromTickStep(step[i], scale);
        return gridStep;
    });
}

function snapStepFromGridStep(gridStep: [number, number]): [number, number] {
    return [gridStep[0] / 2, gridStep[1] / 2];
}

/**
 * Given the tickStep and the graph's scale, find a
 * grid step.
 * Example:
 *      gridStepFromTickStep(200, 0.2) // returns 100
 */
function gridStepFromTickStep(
    tickStep: number,
    scale: number,
): number | null | undefined {
    const tickWidth = tickStep * scale;
    const x = tickStep;
    const y = Math.pow(10, Math.floor(Math.log(x) / Math.LN10));
    const leadingDigit = Math.floor(x / y);
    if (tickWidth < 25) {
        return tickStep;
    }
    if (tickWidth < 50) {
        if (leadingDigit === 5) {
            return tickStep;
        }
        return tickStep / 2;
    }
    if (leadingDigit === 1) {
        return tickStep / 2;
    }
    if (leadingDigit === 2) {
        return tickStep / 4;
    }
    if (leadingDigit === 5) {
        return tickStep / 5;
    }
}

/**
 * Given the range and a dimension, come up with the appropriate
 * scale.
 * Example:
 *      scaleFromExtent([-25, 25], 500) // returns 10
 */
function scaleFromExtent(
    extent: Coordinates,
    dimensionConstraint: number,
): number {
    const span = extent[1] - extent[0];
    const scale = dimensionConstraint / span;
    return scale;
}

/**
 * Return a reasonable tick step given extent and dimension.
 * (extent is [begin, end] of the domain.)
 * Example:
 *      tickStepFromExtent([-10, 10], 300) // returns 2
 */
function tickStepFromExtent(
    extent: Coordinates,
    dimensionConstraint: number,
): number {
    const span = extent[1] - extent[0];

    let tickFactor;
    // If single number digits
    if (15 < span && span <= 20) {
        tickFactor = 23;

        // triple digit or decimal
    } else if (span > 100 || span < 5) {
        tickFactor = 10;

        // double digit
    } else {
        tickFactor = 16;
    }
    const constraintFactor = dimensionConstraint / 500;
    const desiredNumTicks = tickFactor * constraintFactor;
    return tickStepFromNumTicks(span, desiredNumTicks);
}

/**
 * Find a good tick step for the desired number of ticks in the range
 * Modified from d3.scale.linear: d3_scale_linearTickRange.
 * Thanks, mbostock!
 * Example:
 *      tickStepFromNumTicks(50, 6) // returns 10
 */
function tickStepFromNumTicks(span: number, numTicks: number): number {
    let step = Math.pow(10, Math.floor(Math.log(span / numTicks) / Math.LN10));
    const err = (numTicks / span) * step;

    // Filter ticks to get closer to the desired count.
    if (err <= 0.15) {
        step *= 10;
    } else if (err <= 0.35) {
        step *= 5;
    } else if (err <= 0.75) {
        step *= 2;
    }

    // Round start and stop values to step interval.
    return step;
}

const constrainTickStep = (step: number, range: Range): number => {
    const span = range[1] - range[0];
    const numTicks = span / step;
    if (numTicks <= 10) {
        // Will displays fine on mobile
        return step;
    }
    if (numTicks <= 20) {
        // Will be crowded on mobile, so hide every other tick
        return step * 2;
    }
    // Fallback in case we somehow have more than 20 ticks
    // Note: This shouldn't happen due to GraphSettings.validStep
    return tickStepFromNumTicks(span, 10);
};

/**
 * Constrain tick steps intended for desktop size graphs
 * to something more suitable for mobile size graphs.
 * Specifically, we aim for 10 or fewer ticks per graph axis.
 */
function constrainedTickStepsFromTickSteps(
    tickSteps: [number, number],
    ranges: [Range, Range],
): Coordinates {
    return [
        constrainTickStep(tickSteps[0], ranges[0]),
        constrainTickStep(tickSteps[1], ranges[1]),
    ];
}

/**
 * Query String Parser
 *
 * Original from:
 * http://stackoverflow.com/questions/901115/get-querystring-values-in-javascript/2880929#2880929
 */
function parseQueryString(query: string): QueryParams {
    query = query || window.location.search.substring(1);
    const urlParams: Record<string, any> = {};
    // Regex for replacing addition symbol with a space
    const a = /\+/g;
    const r = /([^&=]+)=?([^&]*)/g;
    const d = function (s) {
        return decodeURIComponent(s.replace(a, " "));
    };

    let e;
    while ((e = r.exec(query))) {
        const m = e;
        urlParams[d(m[1])] = d(m[2]);
    }

    return urlParams;
}

/**
 * Query string adder
 * Works for URLs without #.
 * Original from:
 * http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
 */
function updateQueryString(uri: string, key: string, value: string): string {
    value = encodeURIComponent(value);
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, "$1" + key + "=" + value + "$2");
    }
    return uri + separator + key + "=" + value;
}

/**
 * A more strict encodeURIComponent that escapes `()'!`s
 * Especially useful for creating URLs that are embeddable in markdown
 *
 * Adapted from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 * This function and the above original available under the
 * CC-BY-SA 2.5 license.
 */
function strongEncodeURIComponent(str: string): string {
    return (
        encodeURIComponent(str)
            // Note that although RFC3986 reserves "!", RFC5987 does not,
            // so we do not need to escape it
            .replace(/['()!]/g, window.escape) // i.e., %27 %28 %29
            .replace(/\*/g, "%2A")
    );
}

/*
 * The touchHandlers are used to track the current state of the touch
 * event, such as whether or not the user is currently pressed down (either
 * through touch or mouse) on the screen.
 */
const touchHandlers: TouchHandlers = {
    pointerDown: false,
    currentTouchIdentifier: null,
};

function resetTouchHandlers() {
    Object.assign(touchHandlers, {
        pointerDown: false,
        currentTouchIdentifier: null,
    });
}

/**
 * Extracts the location of a touch or mouse event, allowing you to pass
 * in a "mouseup", "mousedown", or "mousemove" event and receive the
 * correct coordinates. Shouldn't be used with "vmouse" events.
 */
function extractPointerLocation(event: any): Position | null | undefined {
    let touchOrEvent;

    if (touchHandlers.pointerDown) {
        // Look for the touch matching the one we're tracking; ignore others
        if (touchHandlers.currentTouchIdentifier != null) {
            const len = event.changedTouches ? event.changedTouches.length : 0;
            for (let i = 0; i < len; i++) {
                if (
                    event.changedTouches[i].identifier ===
                    touchHandlers.currentTouchIdentifier
                ) {
                    touchOrEvent = event.changedTouches[i];
                }
            }
        } else {
            touchOrEvent = event;
        }

        const isEndish =
            event.type === "touchend" || event.type === "touchcancel";
        if (touchOrEvent && isEndish) {
            touchHandlers.pointerDown = false;
            touchHandlers.currentTouchIdentifier = null;
        }
    } else {
        // touchstart or mousedown
        touchHandlers.pointerDown = true;
        if (event.changedTouches) {
            touchOrEvent = event.changedTouches[0];
            touchHandlers.currentTouchIdentifier = touchOrEvent.identifier;
        } else {
            touchOrEvent = event;
        }
    }

    if (touchOrEvent) {
        return {
            left: touchOrEvent.pageX,
            top: touchOrEvent.pageY,
        };
    }
}

// Older browsers don't support passive events and so we need to feature-
// detect them and do event subscription differently for them.
// See: orderer.jsx
const supportsPassiveEvents: () => boolean = () => {
    // Test via a getter in the options object to see if the passive
    // property is accessed
    try {
        const opts = Object.defineProperty({}, "passive", {
            get: function () {
                supportsPassive = true;
            },
        });
        // @ts-expect-error - TS2769 - No overload matches this call.
        window.addEventListener("testPassive", null, opts);
        // @ts-expect-error - TS2769 - No overload matches this call.
        window.removeEventListener("testPassive", null, opts);
    } catch {
        // Intentionally left empty!
    }

    return supportsPassive;
};

/**
 * Pass this function as the touchstart for an element to
 * avoid sending the touch to the mobile scratchpad
 */
function captureScratchpadTouchStart(e: React.TouchEvent) {
    e.stopPropagation();
}

function getImageSize(
    url: string,
    callback: (width: number, height: number) => void,
): void {
    const img = new Image();
    img.onload = function () {
        // IE 11 seems to have problems calculating the heights of svgs
        // if they're not in the DOM. To solve this, we add the element to
        // the dom, wait for a rerender, and use `.clientWidth` and
        // `.clientHeight`. I think we could also solve the problem by
        // adding the image to the document before setting the src, but then
        // the experience would be worse for other browsers.
        if (img.width === 0 && img.height === 0) {
            document.body?.appendChild(img);
            _.defer(function () {
                callback(img.clientWidth, img.clientHeight);
                document.body?.removeChild(img);
            });
        } else {
            callback(img.width, img.height);
        }
    };

    img.src = getRealImageUrl(url);
}

/**
 * Gets the word right before where the textarea cursor is
 *
 * @param {Element} textarea - The textarea DOM element
 * @return {JSON} - An object with the word and its starting and ending positions in the textarea
 */
function getWordBeforeCursor(textarea: HTMLTextAreaElement): WordAndPosition {
    const text = textarea.value;

    const endPos = textarea.selectionStart - 1;
    const startPos =
        Math.max(
            text.lastIndexOf("\n", endPos),
            text.lastIndexOf(" ", endPos),
        ) + 1;

    return {
        string: text.substring(startPos, endPos + 1),
        pos: {
            start: startPos,
            end: endPos,
        },
    };
}

/**
 * Moves the textarea cursor at the specified position
 *
 * @param {Element} textarea - The textarea DOM element
 * @param {int} pos - The position where the cursor will be moved
 */
function moveCursor(textarea: HTMLTextAreaElement, pos: number): void {
    textarea.selectionStart = pos;
    textarea.selectionEnd = pos;
}

const textarea = {
    getWordBeforeCursor,
    moveCursor,
} as const;

/**
 * Many of our labels are automatically converted into math mode without
 * the dollar signs. Unfortunately, this makes them untranslatable! This
 * helper function removes the math mode symbols from a string if we want
 * to translate it but don't need the extra dollar signs.
 */
const unescapeMathMode: (label: string) => string = (label) =>
    label.startsWith("$") && label.endsWith("$") ? label.slice(1, -1) : label;

const Util = {
    inputPathsEqual,
    nestedMap,
    rWidgetRule,
    rTypeFromWidgetId,
    rWidgetParts,
    snowman,
    firstNumericalParse,
    stringArrayOfSize,
    stringArrayOfSize2D,
    gridDimensionConfig,
    getGridStep,
    snapStepFromGridStep,
    scaleFromExtent,
    tickStepFromExtent,
    gridStepFromTickStep,
    tickStepFromNumTicks,
    constrainedTickStepsFromTickSteps,
    parseQueryString,
    updateQueryString,
    strongEncodeURIComponent,
    touchHandlers,
    resetTouchHandlers,
    extractPointerLocation,
    supportsPassiveEvents,
    captureScratchpadTouchStart,
    getImageSize,
    getImageSizeModern: getImageSizeModern,
    getRealImageUrl: getRealImageUrl,
    isLabeledSVG: isLabeledSVG,
    getBaseUrl: getBaseUrl,
    getSvgUrl: getSvgUrl,
    getDataUrl: getDataUrl,
    textarea,
    unescapeMathMode,
} as const;

export default Util;
