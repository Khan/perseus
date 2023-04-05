// @flow
/* global MathJax */
import $ from "jquery";
import * as React from "react";

import {getDependencies} from "../dependencies.js";

import KhanMath from "./math.js";
import reactRender from "./react-render.js";

function findChildOrAdd(elem, className) {
    const $child = $(elem).find("." + className);
    if ($child.length === 0) {
        return $("<span>").addClass(className).appendTo($(elem));
    }
    return $child;
}

function doCallback(elem, callback) {
    let tries = 0;
    (function check() {
        const height = elem.scrollHeight;
        // Heuristic to guess if the font has kicked in
        // so we have box metrics (magic number ick,
        // but this seems to work mostly-consistently)
        if (height > 18 || tries >= 10) {
            callback();
        } else {
            tries++;
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API
            // eslint-disable-next-line no-restricted-syntax
            setTimeout(check, 100);
        }
    })();
}

export default {
    // Process a node and add math inside of it. This attempts to use KaTeX to
    // format the math, and if that fails it falls back to MathJax.
    //
    // elem: The element which the math should be added to.
    //
    // text: The text that should be formatted inside of the node. If the node
    //       has already had math formatted inside of it before, this doesn't
    //       have to be provided. If this is not provided, and the node hasn't
    //       been formatted before, the text content of the node is used.
    //
    // force: (optional) if the node has been processed before, then it will
    //        not be formatted again, unless this argument is true
    //
    // callback: (optional) a callback to be run after the math has been
    //           processed
    processMath: async function (
        elem: HTMLElement,
        text: string,
        force?: boolean,
        callback?: () => mixed,
    ) {
        const $elem = $(elem);

        // Only process if it hasn't been done before, or it is forced
        if ($elem.attr("data-math-formula") == null || force) {
            const $katexHolder = findChildOrAdd($elem, "katex-holder");
            const $mathjaxHolder = findChildOrAdd($elem, "mathjax-holder");

            // Search for MathJax-y script tags inside of the node. These are
            // used by MathJax to denote the formula to be typeset. Before, we
            // would update the formula by updating the contents of the script
            // tag, which shouldn't happen any more, but we manage them just in
            // case.
            const script = $mathjaxHolder.find("script[type='math/tex']")[0];

            // If text wasn't provided, we look in two places
            if (text == null) {
                if ($elem.attr("data-math-formula")) {
                    // The old typeset formula
                    text = $elem.attr("data-math-formula");
                } else if (script) {
                    // The contents of the <script> tag
                    text = script.text || script.textContent;
                }
            }

            text = text != null ? text + "" : "";

            // Attempt to clean up some of the math
            text = KhanMath.cleanMath(text);

            // Store the formula that we're using
            $elem.attr("data-math-formula", text);

            const TeX = await getDependencies().TeX;
            reactRender(
                React.createElement(TeX, {children: text}),
                $katexHolder[0],
                () => {
                    if (callback) {
                        doCallback(elem, callback);
                    }
                },
            );
        }
    },

    // Function to restore a node to a non-math-processed state
    cleanupMath: function (elem: HTMLElement): HTMLElement {
        const $elem = $(elem);

        // Only mess with it if it's been processed before
        if ($elem.attr("data-math-formula")) {
            // Remove MathJax remnants
            // $FlowIgnore[cannot-resolve-name] MathJax is a known global
            if (typeof MathJax !== "undefined") {
                const jax = MathJax.Hub.getJaxFor($elem.find("script")[0]);
                if (jax) {
                    const e = jax.SourceElement();
                    if (e.previousSibling && e.previousSibling.className) {
                        jax.Remove();
                    }
                }
            }

            $elem.text($elem.attr("data-math-formula"));
            $elem.attr("data-math-formula", null);
            $elem.attr("data-math-type", null);
        }

        return elem;
    },

    // Function to retrieve the formula of a typeset math node
    retrieveMathFormula: function (elem: HTMLElement): any {
        return $(elem).attr("data-math-formula");
    },
};
