import {semanticColor} from "@khanacademy/wonder-blocks-tokens";
import _ from "underscore";

import WrappedDrawing from "./wrapped-drawing";

import type {Coord} from "./types";
import type {VisibleShape} from "./wrapped-drawing";

const DEFAULT_OPTIONS = {
    maxScale: 1,
    mouselayer: false,
    shadow: false,
    disableMouseEventsOnWrapper: false,
} as const;

export const wrappedEllipseShadow = `drop-shadow(0px 0px 2px ${semanticColor.core.foreground.instructive.default})`;

class WrappedEllipse extends WrappedDrawing {
    initialPoint: Coord;
    wrapper: HTMLDivElement;
    visibleShape: VisibleShape;

    constructor(
        graphie: any,
        center: Coord,
        radii: [number, number],
        options: any,
    ) {
        super(graphie, center);
        options = _.extend({}, DEFAULT_OPTIONS, options);

        // Add `wrapper`, `visibleShape`, and remaining properties.
        const fixedEllipse = graphie.fixedEllipse(
            center,
            radii,
            options.maxScale,
            options.padding,
        );
        this.visibleShape = fixedEllipse.visibleShape;
        this.wrapper = fixedEllipse.wrapper;
        this.graphie = graphie;
        this.initialPoint = center;

        if (options.interactiveKindForTesting) {
            this.wrapper.setAttribute(
                "data-interactive-kind-for-testing",
                options.interactiveKindForTesting,
            );
        }

        // Add to appropriate graphie layer
        if (options.mouselayer) {
            // Disable browser handling of all panning and zooming gestures on the
            // movable wrapper so that when moved the browser does not scroll page
            this.wrapper.style.touchAction = "none";

            this.graphie.addToMouseLayerWrapper(this.wrapper);
        } else {
            this.graphie.addToVisibleLayerWrapper(this.wrapper);
        }

        this.setShadow(options.shadow);

        if (options.disableMouseEventsOnWrapper) {
            this.wrapper.style.pointerEvents = "none";
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            this.visibleShape.node.style.pointerEvents = "auto";
        }
    }

    /**
     * Turns the ellipse's drop shadow on or off.
     */
    setShadow(shadow: boolean) {
        this.wrapper.style.filter = shadow ? wrappedEllipseShadow : "";
    }
}

export default WrappedEllipse;
