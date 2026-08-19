import {KhanMath} from "@khanacademy/kmath";
import * as React from "react";

import {getDependencies} from "../dependencies";

import reactRender from "./react-render";

function findChildOrAdd(elem: HTMLElement, className: string): HTMLElement {
    const child = elem.querySelector<HTMLElement>("." + className);
    if (child) {
        return child;
    }

    const newChild = document.createElement("span");
    newChild.classList.add(className);
    elem.appendChild(newChild);
    return newChild;
}

export default {
    // Process a node and add math inside of it. This uses MathJax to
    // format the math.
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
        text: string | number,
        force?: boolean,
        callback?: () => unknown,
    ) {
        const cachedFormula = elem.getAttribute("data-math-formula");

        // Only process if it hasn't been done before, or it is forced
        if (cachedFormula == null || force) {
            const texHolder = findChildOrAdd(elem, "tex-holder");

            // If text wasn't provided, we use the cached text.
            // NOTE(benchristel): I'm not sure if text can ever be null. It's
            // possible we don't need this check.
            if (text == null && cachedFormula) {
                text = cachedFormula;
            }

            text = text != null ? text + "" : "";

            // Attempt to clean up some of the math
            text = KhanMath.cleanMath(text);

            // Store the formula that we're using
            elem.setAttribute("data-math-formula", text);

            const {TeX} = await getDependencies();
            // We use createElement instead of JSX here because we can't name this file tex.tsx;
            // that name is already taken.
            reactRender(
                // eslint-disable-next-line react/no-children-prop
                React.createElement(TeX, {
                    children: text,
                    onRender: callback,
                }),
                texHolder,
            );
        }
    },
};
