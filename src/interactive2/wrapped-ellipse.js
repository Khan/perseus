const _ = require("underscore");
const WrappedDefaults = require("./wrapped-defaults.js");

const DEFAULT_OPTIONS = {
    maxScale: 1,
    mouselayer: false,
};

const WrappedEllipse = function(graphie, center, radii, options) {
    options = _.extend({}, DEFAULT_OPTIONS, options);

    // Add `wrapper`, `visibleShape`, and remaining properties
    _.extend(this, graphie.fixedEllipse(center, radii, options.maxScale), {
        graphie: graphie,
        initialPoint: center,
    });

    // Add to appropriate graphie layer
    if (options.mouselayer) {
        this.graphie.addToMouseLayerWrapper(this.wrapper);
    } else {
        this.graphie.addToVisibleLayerWrapper(this.wrapper);
    }
};

_.extend(WrappedEllipse.prototype,  WrappedDefaults);

module.exports = WrappedEllipse;
