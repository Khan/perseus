import {vector as kvector} from "@khanacademy/kmath";
import _ from "underscore";

import InteractiveUtil from "./interactive-util";
import WrappedDefaults from "./wrapped-defaults";

import type {Coord} from "./types";

const DEFAULT_OPTIONS = {
    maxScale: 1,
    mouselayer: false,
    shadow: false,
    disableMouseEventsOnWrapper: false,
} as const;

const WrappedEllipse = function (
    graphie: any,
    center: Coord,
    radii: [number, number],
    options: any,
) {
    options = _.extend({}, DEFAULT_OPTIONS, options);

    // Add `wrapper`, `visibleShape`, and remaining properties.
    const fixedEllipse = graphie.fixedEllipse(
        center,
        radii,
        options.maxScale,
        options.padding,
    );
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    _.extend(this, fixedEllipse, {
        graphie: graphie,
        initialPoint: center,
    });

    if (options.interactiveKindForTesting) {
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.wrapper.setAttribute(
            "data-interactive-kind-for-testing",
            options.interactiveKindForTesting,
        );
    }

    // Add to appropriate graphie layer
    if (options.mouselayer) {
        // Disable browser handling of all panning and zooming gestures on the
        // movable wrapper so that when moved the browser does not scroll page
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.wrapper.style.touchAction = "none";

        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.graphie.addToMouseLayerWrapper(this.wrapper);
    } else {
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.graphie.addToVisibleLayerWrapper(this.wrapper);
    }

    if (options.shadow) {
        const filter = "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))";
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        const wrapper = this.wrapper;
        wrapper.style.filter = filter;

        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.moveTo = function (point: any) {
            const delta = kvector.subtract(
                this.graphie.scalePoint(point),
                this.graphie.scalePoint(this.initialPoint),
            );
            const do3dTransform = InteractiveUtil.getCanUse3dTransform();
            const transform =
                "translateX(" +
                Math.round(delta[0]) +
                "px) " +
                "translateY(" +
                Math.round(delta[1]) +
                "px)" +
                (do3dTransform ? " translateZ(0)" : "");
            this.transform(transform);
        };
    }

    if (options.disableMouseEventsOnWrapper) {
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.wrapper.style.pointerEvents = "none";
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.visibleShape.node.style.pointerEvents = "auto";
    }
};

_.extend(WrappedEllipse.prototype, WrappedDefaults);

export default WrappedEllipse;
