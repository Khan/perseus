/* eslint-disable @babel/no-invalid-this */
// @flow
/**
 * A library of options to pass to add/draw/remove/constraints
 */
import {point as kpoint} from "@khanacademy/kmath";
import _ from "underscore";

import WrappedEllipse from "./wrapped-ellipse.js";

import type {Coord} from "./types.js";

const add = {
    constrain: function () {
        this.constrain();
    },
};

// $FlowFixMe[prop-missing]
add.standard = [add.constrain];

const modify = {
    draw: function () {
        this.draw();
    },
};

// $FlowFixMe[prop-missing]
modify.standard = [modify.draw];

const draw = {
    basic: function (state: $FlowFixMe, prevState: $FlowFixMe) {
        const graphie = this.graphie;
        if (!this.state.visibleShape) {
            const radii = [
                this.pointSize() / graphie.scale[0],
                this.pointSize() / graphie.scale[1],
            ];
            const options = {
                maxScale: Math.max(
                    this.highlightStyle().scale,
                    this.normalStyle().scale,
                ),
                // Add in 10px of padding to avoid clipping at the edges.
                padding: 10,
                shadow: state.shadow,
            };
            // $FlowFixMe[invalid-constructor]
            this.state.visibleShape = new WrappedEllipse(
                graphie,
                this.coord(),
                radii,
                options,
            );

            this.state.visibleShape.attr(_.omit(this.normalStyle(), "scale"));
            this.state.visibleShape.toFront();

            // Keep mouseTarget in front of visible shape
            if (this.mouseTarget()) {
                this.mouseTarget().toFront();
            }
        }
        if (
            state.normalStyle !== prevState.normalStyle &&
            !_.isEqual(state.normalStyle, prevState.normalStyle)
        ) {
            this.state.visibleShape.attr(this.normalStyle());
        }

        this.state.visibleShape.moveTo(this.coord());
        if (this.mouseTarget()) {
            this.mouseTarget().moveTo(this.coord());
        }
    },

    highlight: function (state: $FlowFixMe, prevState: $FlowFixMe) {
        if (state.isHovering && !prevState.isHovering) {
            state.visibleShape.animate(this.highlightStyle(), 50);
        } else if (!state.isHovering && prevState.isHovering) {
            state.visibleShape.animate(this.normalStyle(), 50);
        }
    },
};

// $FlowFixMe[prop-missing]
draw.standard = [draw.basic, draw.highlight];

const remove = {
    basic: function () {
        if (this.state.visibleShape) {
            this.state.visibleShape.remove();
            this.state.visibleShape = null;
        }
    },
};

// $FlowFixMe[prop-missing]
remove.standard = remove.basic;

const constraints = {
    fixed: function (): () => boolean {
        return function () {
            return false;
        };
    },

    snap: function (snap: $FlowFixMe): (Coord) => mixed {
        return function (coord: Coord): mixed {
            if (snap === null) {
                // NOTE(kevinb): this should probably return the original point
                return true;
            }
            snap = snap || this.graphie.snap;
            return kpoint.roundTo(coord, snap);
        };
    },

    bound: function (
        range: $FlowFixMe,
        snap: $FlowFixMe,
        paddingPx: number,
    ): (Coord, Coord, $FlowFixMe) => Coord {
        if (paddingPx === undefined) {
            if (range === undefined) {
                paddingPx = 10;
            } else {
                paddingPx = 0;
            }
        }
        return function (coord, prev, options) {
            const graphie = this.graphie;
            range = range || graphie.range;

            if (snap === undefined) {
                snap = graphie.snap;
            }

            let lower = graphie.unscalePoint([
                paddingPx,
                graphie.ypixels - paddingPx,
            ]);

            let upper = graphie.unscalePoint([
                graphie.xpixels - paddingPx,
                paddingPx,
            ]);

            if (snap) {
                lower = kpoint.ceilTo(lower, snap);
                upper = kpoint.floorTo(upper, snap);
            }

            if (!!options && !!options.onOutOfBounds) {
                if (
                    coord[0] > upper[0] ||
                    coord[0] < lower[0] ||
                    coord[1] > upper[1] ||
                    coord[1] < lower[1]
                ) {
                    options.onSkipRemaining();
                    options.onOutOfBounds();
                }

                return coord;
            }

            const coordX = Math.max(lower[0], Math.min(upper[0], coord[0]));
            const coordY = Math.max(lower[1], Math.min(upper[1], coord[1]));

            return [coordX, coordY];
        };
    },
};

// $FlowFixMe[prop-missing]
constraints.standard = null;

export default {
    add: add,
    modify: modify,
    draw: draw,
    remove: remove,

    onMoveStart: {standard: null},
    constraints: constraints,
    onMove: {standard: null},
    onMoveEnd: {standard: null},
    onClick: {standard: null},
};
