/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var _ = require("underscore");
var WrappedDefaults = require("./wrapped-defaults.js");
const InteractiveUtil = require("./interactive-util.js");
const kvector = require("kmath").vector;

var DEFAULT_OPTIONS = {
    maxScale: 1,
    mouselayer: false,
    shadow: false,
    disableMouseEventsOnWrapper: false,
};

var WrappedEllipse = function(graphie, center, radii, options) {
    options = _.extend({}, DEFAULT_OPTIONS, options);

    // Add `wrapper`, `visibleShape`, and remaining properties.
    const fixedEllipse = graphie.fixedEllipse(
        center, radii, options.maxScale, options.padding);
    _.extend(this, fixedEllipse, {
        graphie: graphie,
        initialPoint: center
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

    if (options.shadow) {
        const filter = "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))";
        const wrapper = this.wrapper;
        wrapper.style.webkitFilter = filter;
        wrapper.style.filter = filter;

        this.moveTo = function(point) {
            const delta = kvector.subtract(
                this.graphie.scalePoint(point),
                this.graphie.scalePoint(this.initialPoint)
            );
            const do3dTransform = InteractiveUtil.getCanUse3dTransform();
            const transform = "translateX(" + Math.round(delta[0]) + "px) " +
                              "translateY(" + Math.round(delta[1]) + "px)" +
                              (do3dTransform ? " translateZ(0)" : "");
            this.transform(transform);
        };
    }

    if (options.disableMouseEventsOnWrapper) {
        this.wrapper.style.pointerEvents = "none";
        this.visibleShape.node.style.pointerEvents = "auto";
    }
};

_.extend(WrappedEllipse.prototype,  WrappedDefaults);

module.exports = WrappedEllipse;
