import {KhanAnswerTypes} from "@khanacademy/perseus-score";
import _ from "underscore";

import * as GraphieUtil from "./util.graphie";

import type {PerseusStrings} from "./strings";
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

/**
 * Return the first valid interpretation of 'text' as a number, in the form
 * {value: 2.3, exact: true}.
 */
function firstNumericalParse(
    text: string,
    strings: PerseusStrings,
): ParsedValue | null | undefined {
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

/**
 * Pass this function as the touchstart for an element to
 * avoid sending the touch to the mobile scratchpad
 */
function captureScratchpadTouchStart(e: React.TouchEvent) {
    e.stopPropagation();
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

    img.src = Util.getRealImageUrl(url);
}

const Util = {
    firstNumericalParse,
    getImageSize,
    captureScratchpadTouchStart,
    getImageSizeModern: GraphieUtil.getImageSizeModern,
    getRealImageUrl: GraphieUtil.getRealImageUrl,
    isLabeledSVG: GraphieUtil.isLabeledSVG,
    getBaseUrl: GraphieUtil.getBaseUrl,
    getSvgUrl: GraphieUtil.getSvgUrl,
    getDataUrl: GraphieUtil.getDataUrl,
    textarea,
} as const;

export default Util;
