/**
 * MovableLine
 */
var _ = require("underscore");

var MovableLineOptions = require("./movable-line-options.js");
var WrappedLine = require("./wrapped-line.js");
var InteractiveUtil = require("./interactive-util.js");
var objective_ = require("./objective_.js");
var assert = InteractiveUtil.assert;
var normalizeOptions = InteractiveUtil.normalizeOptions;

var kvector = require("kmath").vector;

var FUNCTION_ARRAY_OPTIONS = [
    "add",
    "draw",
    "remove",
    "onMoveStart",
    "constraints",
    "onMove",
    "onMoveEnd"
];

// Default "props" and "state". Both are added to this.state and
// receive magic getter methods (this.cursor() etc).
// However, properties in DEFAULT_PROPS are updated on `modify()`,
// while those in DEFAULT_STATE persist and are not updated.
// Things that the user might want to change should be on "props",
// while things used to render the point should be on "state".
var DEFAULT_PROPS = {
    points: null,
    static: false,
    cursor: "move",
    normalStyle: null,     // turned into an object in this.modify
    highlightStyle: null,  // likewise
    extendLine: false,
    extendRay: false
};
var DEFAULT_STATE = {
    visibleShape: null,
    mouseTarget: null
};

var MovableLine = function(graphie, movable, options) {
    assert(graphie != null);
    assert(options != null);

    _.extend(this, {
        graphie: graphie,
        movable: movable,
        state: {
            // Set here because this must be unique for each instance
            id: _.uniqueId("movableLine")
        }
    });

    // We only set DEFAULT_STATE once, here
    this.modify(_.extend({}, DEFAULT_STATE, options));
};

_.extend(MovableLine, MovableLineOptions);
InteractiveUtil.createGettersFor(MovableLine, _.extend({},
    DEFAULT_PROPS,
    DEFAULT_STATE
));
InteractiveUtil.addMovableHelperMethodsTo(MovableLine);

_.extend(MovableLine.prototype, {

    cloneState: function() {
        return _.extend(this.movable.cloneState(), {
            coords: this.coords(),
        }, this.state);
    },

    _createDefaultState: function() {
        return _.extend({
            id: this.state.id,
        }, normalizeOptions(
            FUNCTION_ARRAY_OPTIONS,
            // Defaults are copied from MovableLineOptions.*.standard
            // These defaults are set here instead of DEFAULT_PROPS/STATE
            // because they:
            //    - are objects, not primitives (and need a deeper copy)
            //    - they don't need getters created for them
            // TODO(jack): Consider "default" once we es3ify perseus
            objective_.pluck(MovableLineOptions, "standard")
        ), DEFAULT_PROPS);
    },

    /**
     * Resets the object to its state as if it were constructed with
     * `options` originally. state not on DEFAULT_PROPS is maintained.
     *
     * Analogous to React.js's replaceProps
     */
    modify: function(options) {
        this.update(_.extend(this._createDefaultState(), options));
    },

    /**
     * Adjusts constructor parameters without changing previous settings
     * for any option not specified
     *
     * Analogous to React.js's setProps
     */
    update: function(options) {
        var self = this;
        var graphie = this.graphie;
        var state = self.state = _.extend(
            self.state,
            normalizeOptions(FUNCTION_ARRAY_OPTIONS, options)
        );

        // Default things inside the state.normalStyle object, because
        // _.extend is not deep.
        // We use _.extend instead of _.defaults because we don't want
        // to modify the passed-in copy (especially if it's from
        // DEFAULT_PROPERTIES!)
        var normalColor = (state.static) ? KhanUtil.DYNAMIC :
                                           KhanUtil.INTERACTIVE;
        state.normalStyle = _.extend({
            stroke: normalColor,
            "stroke-width": 2
        }, state.normalStyle);

        state.highlightStyle = _.extend({
            stroke: KhanUtil.INTERACTING,
            "stroke-width": 3
        }, state.highlightStyle);

        if (!state.static) {
            // the invisible shape in front of the line that gets mouse events
            if (!state.mouseTarget) {
                var options = {
                    thickness: 30,
                    mouselayer: true
                };
                state.mouseTarget = new WrappedLine(graphie, this.coord(0),
                    this.coord(1), options);
                state.mouseTarget.attr({fill: "#000", "opacity": 0.0});
            }
        }

        if (state.static && state.mouseTarget) {
            // state.static was specified, remove any previously
            // existing mousetarget (from a previous modify)
            state.mouseTarget.remove();
            state.mouseTarget = null;
        }

        // The movable that handles mouse events for us
        self.movable.modify(_.extend({}, state, {
            mouseTarget: state.mouseTarget,

            // We null out the add/modify/remove to avoid propagating our
            // state.add... to the movable, so that we can fire those
            // events ourselves, rather than letting the movable handle
            // them
            add: null,
            modify: null,
            draw: self.draw.bind(self),
            remove: null,

            onMoveStart: function() {
                self._initialRefCoord = self.coord(0);
                self._prevRefCoord = self._initialRefCoord;
                self._totalDelta = [0, 0];

                self._fireEvent(self.state.onMoveStart,
                    self.coord(0),
                    self.coord(0)
                );
            },

            onMove: function(mouseCoord, prevMouseCoord) {
                var delta = kvector.subtract(mouseCoord, prevMouseCoord);
                self._totalDelta = kvector.add(self._totalDelta, delta);
                var refCoord = kvector.add(self._initialRefCoord, self._totalDelta);

                refCoord = self._applyConstraints(refCoord, self._prevRefCoord);
                if (refCoord === false) {
                    return;
                }

                self._fireEvent(self.state.onMove, refCoord, self._prevRefCoord);
                self._prevRefCoord = refCoord;
            },

            onMoveEnd: function() {
                self._fireEvent(self.state.onMoveEnd,
                    self._prevRefCoord,
                    self._initialRefCoord
                );
            },
        }));

        // Trigger an add event if this hasn't been added before
        if (!state.added) {
            self.prevState = {};
            self._fireEvent(state.add, self.cloneState(), self.prevState);
            state.added = true;

            // Update the line with the points' movement
            _.invoke(state.points, "listen", "onMove", state.id,
                    self.draw.bind(self));

            // Update the state for `added` and in case the add event
            // changed it
            self.prevState = self.cloneState();
        }

        // Trigger a modify event
        self._fireEvent(state.modify, self.cloneState(), self.prevState);
    },

    coords: function() {
        return _.invoke(this.state.points, "coord");
    },

    point: function(index) {
        return this.state.points[index];
    },

    coord: function(index) {
        return this.point(index).coord();
    },

    remove: function() {
        this.state.added = false;
        this._fireEvent(this.state.remove);
        if (this.points) {
            _.invoke(this.points, "unlisten", "onMove", this.state.id);
        }

        if (this.movable) {
            // We need this to be guarded because it is called on the initial
            // constructor/modify call, before this.movable is created
            this.movable.remove();
        }
    },

    // Change z-order to back
    toBack: function() {
        this.movable.toBack();
        if (this.state.visibleShape) {
            this.state.visibleShape.toBack();
        }
    },

    // Change z-order to front
    toFront: function() {
        if (this.state.visibleShape) {
            this.state.visibleShape.toFront();
        }
        this.movable.toFront();
    },

    /**
     * Forwarding methods to this.movable:
     */
    isHovering: function() {
        return this.movable.isHovering();
    },

    isDragging: function() {
        return this.movable.isDragging();
    },

    mouseTarget: function() {
        return this.movable.mouseTarget();
    }
});

module.exports = MovableLine;
