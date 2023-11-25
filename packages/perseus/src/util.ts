/* eslint-disable @babel/no-invalid-this, getter-return, one-var */
import _ from "underscore";

import {Errors} from "./logging/log";
import {PerseusError} from "./perseus-error";
import KhanAnswerTypes from "./util/answer-types";
import * as GraphieUtil from "./util.graphie";

import type {Range} from "./perseus-types";
import type {Widget, PerseusScore} from "./types";
import type {KEScore} from "@khanacademy/perseus-core";

type WordPosition = {
    start: number;
    end: number;
};

type WordAndPosition = {
    string: string;
    pos: WordPosition;
};

type RNG = () => number;

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
const noScore: PerseusScore = {
    type: "points",
    earned: 0,
    total: 0,
    message: null,
};

const seededRNG: (seed: number) => RNG = function (seed: number): RNG {
    let randomSeed = seed;

    return function () {
        // Robert Jenkins' 32 bit integer hash function.
        let seed = randomSeed;
        seed = (seed + 0x7ed55d16 + (seed << 12)) & 0xffffffff;
        seed = (seed ^ 0xc761c23c ^ (seed >>> 19)) & 0xffffffff;
        seed = (seed + 0x165667b1 + (seed << 5)) & 0xffffffff;
        seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
        seed = (seed + 0xfd7046c5 + (seed << 3)) & 0xffffffff;
        seed = (seed ^ 0xb55a4f09 ^ (seed >>> 16)) & 0xffffffff;
        return (randomSeed = seed & 0xfffffff) / 0x10000000;
    };
};

// Shuffle an array using a given random seed or function.
// If `ensurePermuted` is true, the input and ouput are guaranteed to be
// distinct permutations.
function shuffle<T>(
    array: ReadonlyArray<T>,
    randomSeed: number | RNG,
    ensurePermuted = false,
): ReadonlyArray<T> {
    // Always return a copy of the input array
    const shuffled = _.clone(array);

    // Handle edge cases (input array is empty or uniform)
    if (
        !shuffled.length ||
        _.all(shuffled, function (value) {
            return _.isEqual(value, shuffled[0]);
        })
    ) {
        return shuffled;
    }

    let random;
    if (typeof randomSeed === "function") {
        random = randomSeed;
    } else {
        random = seededRNG(randomSeed);
    }

    do {
        // Fischer-Yates shuffle
        for (let top = shuffled.length; top > 0; top--) {
            const newEnd = Math.floor(random() * top),
                temp = shuffled[newEnd];

            // @ts-expect-error - TS2542 - Index signature in type 'readonly T[]' only permits reading.
            shuffled[newEnd] = shuffled[top - 1];
            // @ts-expect-error - TS2542 - Index signature in type 'readonly T[]' only permits reading.
            shuffled[top - 1] = temp;
        }
    } while (ensurePermuted && _.isEqual(array, shuffled));

    return shuffled;
}

/**
 * TODO(somewhatabstract, FEI-3463):
 * Drop this custom split thing.
 */
// In IE8, split doesn't work right. Implement it ourselves.
const split: (str: string, r: RegExp) => ReadonlyArray<string> = "x".split(
    /(.)/g,
).length
    ? function (str: string, r) {
          return str.split(r);
      }
    : function (str: string, r: RegExp) {
          // Based on Steven Levithan's MIT-licensed split, available at
          // http://blog.stevenlevithan.com/archives/cross-browser-split
          const output = [];
          let lastIndex = (r.lastIndex = 0);
          let match;

          while ((match = r.exec(str))) {
              const m = match;
              // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type 'never'.
              output.push(str.slice(lastIndex, m.index));
              // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
              output.push(...m.slice(1));
              lastIndex = m.index + m[0].length;
          }

          // @ts-expect-error - TS2345 - Argument of type 'string' is not assignable to parameter of type 'never'.
          output.push(str.slice(lastIndex));
          return output;
      };

/**
 * Combine two score objects.
 *
 * Given two score objects for two different widgets, combine them so that
 * if one is wrong, the total score is wrong, etc.
 */
function combineScores(
    scoreA: PerseusScore,
    scoreB: PerseusScore,
): PerseusScore {
    let message;

    if (scoreA.type === "points" && scoreB.type === "points") {
        if (
            scoreA.message &&
            scoreB.message &&
            scoreA.message !== scoreB.message
        ) {
            // TODO(alpert): Figure out how to combine messages usefully
            message = null;
        } else {
            message = scoreA.message || scoreB.message;
        }

        return {
            type: "points",
            earned: scoreA.earned + scoreB.earned,
            total: scoreA.total + scoreB.total,
            message: message,
        };
    }
    if (scoreA.type === "points" && scoreB.type === "invalid") {
        return scoreB;
    }
    if (scoreA.type === "invalid" && scoreB.type === "points") {
        return scoreA;
    }
    if (scoreA.type === "invalid" && scoreB.type === "invalid") {
        if (
            scoreA.message &&
            scoreB.message &&
            scoreA.message !== scoreB.message
        ) {
            // TODO(alpert): Figure out how to combine messages usefully
            message = null;
        } else {
            message = scoreA.message || scoreB.message;
        }

        return {
            type: "invalid",
            message: message,
        };
    }

    /**
     * The above checks cover all combinations of score type, so if we get here
     * then something is amiss with our inputs.
     */
    throw new PerseusError(
        "PerseusScore with unknown type encountered",
        Errors.InvalidInput,
        {
            metadata: {
                scoreA: JSON.stringify(scoreA),
                scoreB: JSON.stringify(scoreB),
            },
        },
    );
}

function keScoreFromPerseusScore(
    score: PerseusScore,
    guess: any,
    state: any,
): KEScore {
    if (score.type === "points") {
        return {
            empty: false,
            correct: score.earned >= score.total,
            message: score.message,
            guess: guess,
            state: state,
        };
    }
    if (score.type === "invalid") {
        return {
            empty: true,
            correct: false,
            message: score.message,
            suppressAlmostThere: score.suppressAlmostThere,
            guess: guess,
            state: state,
        };
    }
    throw new PerseusError(
        // @ts-expect-error - TS2339 - Property 'type' does not exist on type 'never'.
        "Invalid score type: " + score.type,
        Errors.InvalidInput,
        {
            metadata: {
                score: JSON.stringify(score),
                guess: JSON.stringify(guess),
                state: JSON.stringify(state),
            },
        },
    );
}

/**
 * Return the first valid interpretation of 'text' as a number, in the form
 * {value: 2.3, exact: true}.
 */
function firstNumericalParse(text: string): ParsedValue | null | undefined {
    // TODO(alpert): This is sort of hacky...
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

function stringArrayOfSize(size: number): ReadonlyArray<string> {
    return _(size).times(function () {
        return "";
    });
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
 *
 * TODO(somewhatabstract, FEI-3464): Consolidate query string parsing functions.
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
 * Transparently update deprecated props so that the code to deal
 * with them only lives in one place: (Widget).deprecatedProps
 *
 * For example, if a boolean `foo` was deprecated in favor of a
 * number 'bar':
 *      deprecatedProps: {
 *          foo: function(props) {
 *              return {bar: props.foo ? 1 : 0};
 *          }
 *      }
 */
const DeprecationMixin: any = {
    // This lifecycle stage is only called before first render
    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount: function () {
        const newProps: Record<string, any> = {};

        _.each(
            this.deprecatedProps,
            function (func, prop) {
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                if (_.has(this.props, prop)) {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    _.extend(newProps, func(this.props));
                }
            },
            this,
        );

        if (!_.isEmpty(newProps)) {
            // Set new props directly so that widget renders correctly
            // when it first mounts, even though these will be overwritten
            // almost immediately afterwards...
            _.extend(this.props, newProps);

            // ...when we propagate the new props upwards and they come
            // back down again.
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            // eslint-disable-next-line no-restricted-syntax
            setTimeout(this.props.onChange, 0, newProps);
        }
    },
};

/**
 * Approximate equality on numbers and primitives.
 */
function eq<T>(x: T, y: T): boolean {
    if (typeof x === "number" && typeof y === "number") {
        return Math.abs(x - y) < 1e-9;
    }
    return x === y;
}

/**
 * Deep approximate equality on primitives, numbers, arrays, and objects.
 * Recursive.
 */
function deepEq<T>(x: T, y: T): boolean {
    if (Array.isArray(x) && Array.isArray(y)) {
        if (x.length !== y.length) {
            return false;
        }
        for (let i = 0; i < x.length; i++) {
            if (!deepEq(x[i], y[i])) {
                return false;
            }
        }
        return true;
    }
    if (Array.isArray(x) || Array.isArray(y)) {
        return false;
    }
    if (typeof x === "function" && typeof y === "function") {
        return eq(x, y);
    }
    if (typeof x === "function" || typeof y === "function") {
        return false;
    }
    if (typeof x === "object" && typeof y === "object" && !!x && !!y) {
        return (
            x === y ||
            (_.all(x, function (v, k) {
                // @ts-expect-error - TS2536 - Type 'CollectionKey<T>' cannot be used to index type 'T'.
                return deepEq(y[k], v);
            }) &&
                _.all(y, function (v, k) {
                    // @ts-expect-error - TS2536 - Type 'CollectionKey<T>' cannot be used to index type 'T'.
                    return deepEq(x[k], v);
                }))
        );
    }
    if ((typeof x === "object" && !!x) || (typeof y === "object" && !!y)) {
        return false;
    }
    return eq(x, y);
}

/**
 * Query String Parser
 *
 * Original from:
 * http://stackoverflow.com/questions/901115/get-querystring-values-in-javascript/2880929#2880929
 */
function parseQueryString(query: string): QueryParams {
    // TODO(jangmi, CP-3340): Use withLocation to access SSR safe location.
    // eslint-disable-next-line no-restricted-syntax
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

/**
 * TODO(somewhatabstract, JIRA-XXXX):
 * This does not appear to be used within webapp. Could be dead code.
 * Need to check with mobile.
 */
// There are certain widgets where we don't want to provide the "answered"
// highlight indicator.
// The issue with just using the `graded` flag on questions is that showing
// that a certain widget is ungraded can sometimes reveal the answer to a
// question ("is this transformation possible? if so, do it")
// This is kind of a hack to get around this.
function widgetShouldHighlight(widget: Widget): boolean {
    if (!widget) {
        return false;
    }
    switch (widget.type) {
        /**
         * Highlight bar denylist
         */
        case "measurer":
        case "protractor":
            return true;

        default:
            return false;
    }
}

/**
 * If a widget says that it is empty once it is graded.
 * Trying to encapsulate references to the score format.
 */
function scoreIsEmpty(score: PerseusScore): boolean {
    // HACK(benkomalo): ugh. this isn't great; the Perseus score objects
    // overload the type "invalid" for what should probably be three
    // distinct cases:
    //  - truly empty or not fully filled out
    //  - invalid or malformed inputs
    //  - "almost correct" like inputs where the widget wants to give
    //  feedback (e.g. a fraction needs to be reduced, or `pi` should
    //  be used instead of 3.14)
    //
    //  Unfortunately the coercion happens all over the place, as these
    //  Perseus style score objects are created *everywhere* (basically
    //  in every widget), so it's hard to change now. We assume that
    //  anything with a "message" is not truly empty, and one of the
    //  latter two cases for now.
    return (
        score.type === "invalid" &&
        (!score.message || score.message.length === 0)
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
    } catch (e: any) {
        // Intentionally left empty!
    }

    return supportsPassive;
};

/**
 * Pass this function as the touchstart for an element to
 * avoid sending the touch to the mobile scratchpad
 */
function captureScratchpadTouchStart(e: TouchEvent) {
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
        // TODO(scottgrant): This is correctly calculating the width of SVG
        // images in browsers, but incorrectly saving the width of what may
        // be a smaller viewport when using the editor, and reusing that
        // width in a full-screen article.
        if (img.width === 0 && img.height === 0) {
            document.body?.appendChild(img);
            // TODO(scottgrant): Remove this use of _.defer.
            _.defer(function () {
                callback(img.clientWidth, img.clientHeight);
                document.body?.removeChild(img);
            });
        } else {
            callback(img.width, img.height);
        }
    };

    img.src = GraphieUtil.getRealImageUrl(url);
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

const random: RNG = seededRNG(new Date().getTime() & 0xffffffff);

const Util = {
    inputPathsEqual,
    nestedMap,
    rWidgetRule,
    rTypeFromWidgetId,
    rWidgetParts,
    snowman,
    noScore,
    seededRNG,
    shuffle,
    split,
    combineScores,
    keScoreFromPerseusScore,
    firstNumericalParse,
    stringArrayOfSize,
    gridDimensionConfig,
    getGridStep,
    snapStepFromGridStep,
    scaleFromExtent,
    tickStepFromExtent,
    gridStepFromTickStep,
    tickStepFromNumTicks,
    constrainedTickStepsFromTickSteps,
    DeprecationMixin,
    eq,
    deepEq,
    parseQueryString,
    updateQueryString,
    strongEncodeURIComponent,
    widgetShouldHighlight,
    scoreIsEmpty,
    touchHandlers,
    resetTouchHandlers,
    extractPointerLocation,
    supportsPassiveEvents,
    captureScratchpadTouchStart,
    getImageSize,
    getImageSizeModern: GraphieUtil.getImageSizeModern,
    getRealImageUrl: GraphieUtil.getRealImageUrl,
    isLabeledSVG: GraphieUtil.isLabeledSVG,
    getBaseUrl: GraphieUtil.getBaseUrl,
    getSvgUrl: GraphieUtil.getSvgUrl,
    getDataUrl: GraphieUtil.getDataUrl,
    textarea,
    unescapeMathMode,
    random,
} as const;

export default Util;
