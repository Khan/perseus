import {vector as kvector} from "@khanacademy/kmath";
import _ from "underscore";

import InteractiveUtil from './interactive-util';
import WrappedDefaults from './wrapped-defaults';

import type {Coord} from './types';

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
    _.extend(this, fixedEllipse, {
        graphie: graphie,
        initialPoint: center,
    });

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

    if (options.shadow) {
        const filter = "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))";
        const wrapper = this.wrapper;
        wrapper.style.filter = filter;

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
        this.wrapper.style.pointerEvents = "none";
        this.visibleShape.node.style.pointerEvents = "auto";
    }
};

_.extend(WrappedEllipse.prototype, WrappedDefaults);

export default WrappedEllipse;
