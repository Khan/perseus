import _ from "underscore";

import WrappedDefaults from "./wrapped-defaults";

import type {Coord} from "./types";

const DEFAULT_OPTIONS = {
    center: null, // gets ignored in `graphie.fixedPath` if `null`
    createPath: null, // gets defaulted in `graphie.fixedPath` if `null`
    mouselayer: false,
} as const;

const WrappedPath = function (
    graphie: any,
    points: ReadonlyArray<Coord>,
    options: any,
) {
    options = _.extend({}, DEFAULT_OPTIONS, options);

    // Add `wrapper` and `visibleShape`
    _.extend(
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this,
        graphie.fixedPath(points, options.center, options.createPath),
    );

    // Add remaining properties
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    _.extend(this, {
        graphie: graphie,
        initialPoint: graphie.scalePoint(_.head(points)),
    });

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
};

_.extend(WrappedPath.prototype, WrappedDefaults);

export default WrappedPath;
