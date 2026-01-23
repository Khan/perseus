/* eslint-disable @typescript-eslint/no-invalid-this */
/**
 * A library of options to pass to add/draw/remove/constraints
 */
import {point as kpoint, vector as kvector} from "@khanacademy/kmath";
import _ from "underscore";

import {Arrowhead} from "./arrowhead";
import {getClipPoint} from "./get-clip-point";
import WrappedLine from "./wrapped-line";

import type {Coord} from "./types";

/**
 * Helper functions
 */
const getScaledAngle = function (line: any) {
    const scaledA = line.graphie.scalePoint(line.coord(0));
    const scaledZ = line.graphie.scalePoint(line.coord(1));
    return kvector.polarDegFromCart(kvector.subtract(scaledZ, scaledA))[1];
};

/**
 * MovableLine option functions
 */
const add = {
    // We do this in add as well as in standard so that we can call
    // pointsToFront after the first draw (which adds `this.visibleShape`)
    draw: function () {
        this.draw();
    },

    pointsToFront: function (state: any) {
        _.invoke(state.points, "toFront");
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly draw: () => void; readonly pointsToFront: (state: any) => void; }'.
add.standard = [add.draw, add.pointsToFront];

const modify = {
    draw: function () {
        this.draw();
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly draw: () => void; }'.
modify.standard = [modify.draw];

const draw = {
    basic: function (state: any) {
        // @ts-expect-error - TS2339 - Property 'graphie' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        const graphie = this.graphie;
        // @ts-expect-error - TS2339 - Property 'coord' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        let start = this.coord(0);
        // @ts-expect-error - TS2339 - Property 'coord' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        let end = this.coord(1);

        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        if (!this.state.visibleShape) {
            const options = {
                thickness: 10,
            } as const;
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.state.visibleShape = new WrappedLine(
                graphie,
                start,
                end,
                options,
            );
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. | TS2339 - Property 'normalStyle' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.state.visibleShape.attr(this.normalStyle());
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.state.visibleShape.toFront();

            // @ts-expect-error - TS2339 - Property 'mouseTarget' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            if (this.mouseTarget()) {
                // @ts-expect-error - TS2339 - Property 'mouseTarget' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                this.mouseTarget().toFront();
            }
        }

        // Compute angle
        const angle = getScaledAngle(this);

        // Extend start, end if necessary (i.e., if not a line segment)
        if (state.extendLine) {
            start = getClipPoint(graphie, start, 360 - angle);
            end = getClipPoint(graphie, end, (540 - angle) % 360);
        } else if (state.extendRay) {
            end = getClipPoint(graphie, end, 360 - angle);
        }

        // Move elements
        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        const elements = [this.state.visibleShape];

        // @ts-expect-error - TS2339 - Property 'mouseTarget' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        if (this.mouseTarget()) {
            // @ts-expect-error - TS2339 - Property 'mouseTarget' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            elements.push(this.mouseTarget());
        }
        _.each(elements, function (element) {
            element.moveTo(start, end);
        });
    },

    arrows: function (state: any) {
        // Create arrows, if not yet created
        // @ts-expect-error - TS2551 - Property '_arrows' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. Did you mean 'arrows'?
        if (this._arrows == null) {
            // @ts-expect-error - TS2551 - Property '_arrows' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. Did you mean 'arrows'?
            this._arrows = [];
            if (state.extendLine) {
                // @ts-expect-error - TS2551 - Property '_arrows' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. Did you mean 'arrows'?
                this._arrows.push(
                    // @ts-expect-error - TS2339 - Property 'graphie' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. | TS2339 - Property 'normalStyle' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                    new Arrowhead(this.graphie, this.normalStyle()),
                );
                // @ts-expect-error - TS2551 - Property '_arrows' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. Did you mean 'arrows'?
                this._arrows.push(
                    // @ts-expect-error - TS2339 - Property 'graphie' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. | TS2339 - Property 'normalStyle' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                    new Arrowhead(this.graphie, this.normalStyle()),
                );
            } else if (state.extendRay) {
                // @ts-expect-error - TS2551 - Property '_arrows' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. Did you mean 'arrows'?
                this._arrows.push(
                    // @ts-expect-error - TS2339 - Property 'graphie' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. | TS2339 - Property 'normalStyle' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                    new Arrowhead(this.graphie, this.normalStyle()),
                );
            }
        }

        // Transform arrows
        const angle = getScaledAngle(this);
        const angleForArrow = [360 - angle, (540 - angle) % 360];
        _.each(
            // @ts-expect-error - TS2551 - Property '_arrows' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. Did you mean 'arrows'?
            this._arrows,
            function (arrow, i) {
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                arrow.toCoordAtAngle(this.coord(i), angleForArrow[i]);
            },
            this,
        );
    },

    highlight: function (state: any, prevState: any) {
        if (state.isHovering && !prevState.isHovering) {
            state.visibleShape.animate(state.highlightStyle, 50);
        } else if (!state.isHovering && prevState.isHovering) {
            state.visibleShape.animate(state.normalStyle, 50);
        }
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly basic: (state: any) => void; readonly arrows: (state: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
draw.standard = [draw.basic, draw.arrows, draw.highlight];

const remove = {
    basic: function () {
        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: () => void; readonly arrows: () => void; }'.
        if (this.state.visibleShape) {
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: () => void; readonly arrows: () => void; }'.
            this.state.visibleShape.remove();
        }
    },

    arrows: function () {
        // @ts-expect-error - TS2551 - Property '_arrows' does not exist on type '{ readonly basic: () => void; readonly arrows: () => void; }'. Did you mean 'arrows'?
        if (this._arrows != null) {
            // @ts-expect-error - TS2551 - Property '_arrows' does not exist on type '{ readonly basic: () => void; readonly arrows: () => void; }'. Did you mean 'arrows'?
            _.invoke(this._arrows, "remove");
        }
        // @ts-expect-error - TS2551 - Property '_arrows' does not exist on type '{ readonly basic: () => void; readonly arrows: () => void; }'. Did you mean 'arrows'?
        this._arrows = null;
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly basic: () => void; readonly arrows: () => void; }'.
remove.standard = [remove.basic, remove.arrows];

const constraints = {
    fixed: function (): () => boolean {
        return function () {
            return false;
        };
    },

    snap: function (snap: any): (arg1: Coord, arg2: Coord) => any {
        return function (coord: Coord, prevCoord: Coord) {
            if (snap === null) {
                return true;
            }
            let delta = kvector.subtract(coord, prevCoord);
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            snap = snap || this.graphie.snap;
            delta = kpoint.roundTo(delta, snap);
            return kvector.add(prevCoord, delta);
        };
    },

    bound: function (
        range: any,
        snap: any,
        paddingPx: number,
    ): (arg1: any, arg2: any) => any {
        if (paddingPx === undefined) {
            if (range === undefined) {
                paddingPx = 10;
            } else {
                paddingPx = 0;
            }
        }
        return function (coord: Coord, prevCoord: Coord) {
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            const graphie = this.graphie;
            const delta = kvector.subtract(coord, prevCoord);
            range = range || graphie.range;
            // A null snap means no snap; an undefined snap means
            // default to graphie's
            if (snap === undefined) {
                snap = graphie.snap;
            }

            // Calculate the bounds for both points
            let absoluteLower = graphie.unscalePoint([
                paddingPx,
                graphie.ypixels - paddingPx,
            ]);
            let absoluteUpper = graphie.unscalePoint([
                graphie.xpixels - paddingPx,
                paddingPx,
            ]);
            if (snap) {
                absoluteLower = kpoint.ceilTo(absoluteLower, snap);
                absoluteUpper = kpoint.floorTo(absoluteUpper, snap);
            }

            // Calculate the bounds for the delta.
            const deltaBounds = _.map(
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                this.coords(),
                function (coord: Coord, i: number) {
                    const max = kvector.subtract(absoluteUpper, coord);
                    const min = kvector.subtract(absoluteLower, coord);
                    return [min, max];
                },
            );

            // bound the delta by the calculated bounds
            const boundedDelta = _.reduce(
                deltaBounds,
                // @ts-expect-error: Type 'number[]' is not assignable to type 'Coord'.
                function (delta, bound) {
                    const lower = bound[0];
                    const upper = bound[1];
                    const deltaX = Math.max(
                        lower[0],
                        Math.min(upper[0], delta[0]),
                    );
                    const deltaY = Math.max(
                        lower[1],
                        Math.min(upper[1], delta[1]),
                    );
                    return [deltaX, deltaY];
                },
                delta,
            );

            return kvector.add(prevCoord, boundedDelta);
        };
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly fixed: () => () => boolean; readonly snap: (snap: any) => (arg1: Coord, arg2: Coord) => any; readonly bound: (range: any, snap: any, paddingPx: number) => (arg1: any, arg2: any) => any; }'.
constraints.standard = null;

const onMove = {
    updatePoints: function (coord: Coord, prevCoord: Coord) {
        const actualDelta = kvector.subtract(coord, prevCoord);
        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly updatePoints: (coord: Coord, prevCoord: Coord) => void; }'.
        _.each(this.state.points, function (point) {
            point.setCoord(kvector.add(point.coord(), actualDelta));
        });
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly updatePoints: (coord: Coord, prevCoord: Coord) => void; }'.
onMove.standard = null;

export default {
    add: add,
    modify: modify,
    draw: draw,
    remove: remove,

    onMoveStart: {standard: null},
    constraints: constraints,
    onMove: onMove,
    onMoveEnd: {standard: null},
};
