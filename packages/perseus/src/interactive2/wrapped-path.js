// @flow
import _ from "underscore";

import WrappedDefaults from "./wrapped-defaults.js";

import type {Coord} from "./types.js";

const DEFAULT_OPTIONS = {
    center: null, // gets ignored in `graphie.fixedPath` if `null`
    createPath: null, // gets defaulted in `graphie.fixedPath` if `null`
    mouselayer: false,
};

const WrappedPath = function (
    graphie: $FlowFixMe,
    points: $ReadOnlyArray<Coord>,
    options: $FlowFixMe,
) {
    options = _.extend({}, DEFAULT_OPTIONS, options);

    // Add `wrapper` and `visibleShape`
    _.extend(
        this,
        graphie.fixedPath(points, options.center, options.createPath),
    );

    // Add remaining properties
    _.extend(this, {
        graphie: graphie,
        initialPoint: graphie.scalePoint(_.head(points)),
    });

    // Add to appropriate graphie layer
    if (options.mouselayer) {
        // Disable browser handling of all panning and zooming gestures on the
        // movable wrapper so that when moved the browser does not scroll page
        this.wrapper.style.touchAction = "none";

        this.graphie.addToMouseLayerWrapper(this.wrapper);
    } else {
        this.graphie.addToVisibleLayerWrapper(this.wrapper);
    }
};

_.extend(WrappedPath.prototype, WrappedDefaults);

export default WrappedPath;
