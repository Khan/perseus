/**
 * Movable
 *
 * A Movable Something, that sends onMove events based on the
 * mouse coordinate (graphie unscaled, non-pixel-value) of the
 * move.
 *
 * Other MovableThings should generally have a Movable field, and
 * let this class handle all of the virtual mouse events, and then
 * take appropriate action in onMoveStart, onMove, onMoveEnd
 */

var InteractiveUtil = require("./interactive-util.js");
var normalizeOptions = InteractiveUtil.normalizeOptions;

var knumber = KhanUtil.knumber;
var kpoint = KhanUtil.kpoint;

// state parameters that should be converted into an array of
// functions
var FUNCTION_ARRAY_OPTIONS = [
    "add",
    "draw",
    "remove",
    "onMoveStart",
    "onMove",
    "onMoveEnd",
    "onClick"
];

// default state. these properties are added to this.state and
// receive magic getter methods (this.isHovering() etc)
var DEFAULT_PROPERTIES = {
    isHovering: false,
    isMouseOver: false,
    isDragging: false,
    cursor: null,
    mouseTarget: null
};

var Movable = function(graphie, options) {
    _.extend(this, {
        graphie: graphie,
        state: {
            id: _.uniqueId("movable"),
            add: [],
            draw: [],
            remove: [],
            onMoveStart: [],
            onMove: [],
            onMoveEnd: [],
            onClick: []
        }
    });

    this.modify(options);
};

InteractiveUtil.createGettersFor(Movable, DEFAULT_PROPERTIES);
InteractiveUtil.addMovableHelperMethodsTo(Movable);

_.extend(Movable.prototype, {

    cloneState: function() {
        return _.clone(this.state);
    },

    modify: function(options) {
        var self = this;
        var graphie = self.graphie;

        self.remove();

        var state = _.extend(self.state, DEFAULT_PROPERTIES,
            normalizeOptions(FUNCTION_ARRAY_OPTIONS, options));

        // the invisible shape in front of the point that gets mouse events
        if (state.mouseTarget) {
            var $mouseTarget = $(state.mouseTarget[0]);

            if (state.cursor !== undefined) {
                // "" removes the css cursor if state.cursor is null
                $mouseTarget.css("cursor", state.cursor || "");
            }

            $mouseTarget.on("vmouseover", function() {
                state.isMouseOver = true;
                if (!graphie.isDragging) {
                    state.isHovering = true;
                }
                self.draw();
            });

            $mouseTarget.on("vmouseout", function() {
                state.isMouseOver = false;
                if (!state.isDragging) {
                    state.isHovering = false;
                }
                self.draw();
            });

            $mouseTarget.on("vmousedown", function(e) {
                if (e.which !== 0 && e.which !== 1) {
                    return;
                }
                e.preventDefault();

                var startMouseCoord = graphie.getMouseCoord(e);
                var prevMouseCoord = startMouseCoord;
                self._fireEvent(
                    state.onMoveStart,
                    startMouseCoord,
                    startMouseCoord
                );

                $(document).bind("vmousemove", function(e) {
                    e.preventDefault();

                    state.isDragging = true;
                    graphie.isDragging = true;

                    var mouseCoord = graphie.getMouseCoord(e);
                    self._fireEvent(
                        state.onMove,
                        mouseCoord,
                        prevMouseCoord
                    );
                    self.draw();
                    prevMouseCoord = mouseCoord;
                });

                $(document).bind("vmouseup", function(e) {
                    $(document).unbind("vmousemove vmouseup");
                    if (state.isHovering) {
                        self._fireEvent(
                            state.onClick,
                            prevMouseCoord,
                            startMouseCoord
                        );
                    }
                    state.isHovering = self.state.isMouseOver;
                    state.isDragging = false;
                    graphie.isDragging = false;
                    self._fireEvent(
                        state.onMoveEnd,
                        prevMouseCoord,
                        startMouseCoord
                    );
                    self.draw();
                });
            });
        }

        self.prevState = self.cloneState();
        self._fireEvent(state.add, self.prevState);
        // Update the state if add() changed it
        self.prevState = self.cloneState();
    },

    remove: function() {
        this._fireEvent(this.state.remove);
        if (this.state.mouseTarget) {
            $(this.state.mouseTarget).off();
            this.state.mouseTarget.remove();
            this.state.mouseTarget = null;
        }
    },

    // Change z-order to back
    toBack: function() {
        if (this.state.mouseTarget) {
            this.state.mouseTarget.toBack();
        }
    },

    // Change z-order to front
    toFront: function() {
        if (this.state.mouseTarget) {
            this.state.mouseTarget.toFront();
        }
    }
});

module.exports = Movable;
