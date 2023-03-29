/* eslint-disable @babel/no-invalid-this */
/**
 * A library of options to pass to add/draw/remove/constraints
 */
import {vector as kvector, point as kpoint} from "@khanacademy/kmath";
import _ from "underscore";

import KhanMath from '../util/math';

import WrappedLine from './wrapped-line';
import WrappedPath from './wrapped-path';

import type {Coord} from './types';

/**
 * Helper functions
 */
const getScaledAngle = function (line: any) {
    const scaledA = line.graphie.scalePoint(line.coord(0));
    const scaledZ = line.graphie.scalePoint(line.coord(1));
    return kvector.polarDegFromCart(kvector.subtract(scaledZ, scaledA))[1];
};

// Given `coord` and `angle`, find the point where a line extended
// from `coord` in the direction of `angle` would be clipped by the
// edge of the graphie canvas. Then draw an arrowhead at that point
// pointing in the direction of `angle`.
const getClipPoint = function (graph, coord: Coord, angle: number) {
    // Actually put the arrowheads 4px from the edge so they have
    // a bit of room
    const xExtent = graph.range[0][1] - graph.range[0][0];
    const yExtent = graph.range[1][1] - graph.range[1][0];

    // shoot a point off into the distance ...
    const distance = xExtent + yExtent;
    // we need to scale the point according to the scale of the axes
    const angleVec = graph.unscaleVector(kvector.cartFromPolarDeg(1, angle));
    const distVec = kvector.scale(kvector.normalize(angleVec), distance);
    const farCoord = kvector.add(coord, distVec);
    const scaledAngle = kvector.polarDegFromCart(angleVec)[1];
    // ... and then bring it back
    const clipPoint = graph.constrainToBoundsOnAngle(
        farCoord,
        4,
        (scaledAngle * Math.PI) / 180,
    );
    return clipPoint;
};

// Given `coord` and `angle`, find the point where a line extended
// from `coord` in the direction of `angle` would be clipped by the
// edge of the graphie canvas. Then draw an arrowhead at that point
// pointing in the direction of `angle`.
const createArrow = function (graph, style: any) {
    // Points that define the arrowhead
    const center = [0.75, 0];
    let points = [
        [-3, 4],
        [-2.75, 2.5],
        [0, 0.25],
        center,
        [0, -0.25],
        [-2.75, -2.5],
        [-3, -4],
    ];

    // Scale points by 1.4 around (0.75, 0)
    const scale = 1.4;
    points = _.map(points, function (point) {
        const pv = kvector.subtract(point, center);
        const pvScaled = kvector.scale(pv, scale);
        return kvector.add(center, pvScaled);
    });

    // We can't just pass in a path to `graph.fixedPath` as we need to modify
    // the points in some way, so instead we provide a function for creating
    // the path once the points have been transformed
    const createCubicPath = function (points) {
        let path = "M" + points[0][0] + " " + points[0][1];
        for (let i = 1; i < points.length; i += 3) {
            path +=
                "C" +
                points[i][0] +
                " " +
                points[i][1] +
                " " +
                points[i + 1][0] +
                " " +
                points[i + 1][1] +
                " " +
                points[i + 2][0] +
                " " +
                points[i + 2][1];
        }
        return path;
    };

    // Create arrowhead
    const unscaledPoints = _.map(points, graph.unscalePoint);
    const options = {
        center: graph.unscalePoint(center),
        createPath: createCubicPath,
    } as const;
    const arrowHead = new WrappedPath(graph, unscaledPoints, options);
    arrowHead.attr(
        _.extend(
            {
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-dasharray": "",
            },
            style,
        ),
    );

    // Add custom function for transforming arrowheads that accounts for
    // center, scaling, etc.
    arrowHead.toCoordAtAngle = function (coord: Coord, angle: number) {
        const clipPoint = graph.scalePoint(getClipPoint(graph, coord, angle));
        arrowHead.transform(
            "translateX(" +
                (clipPoint[0] + scale * center[0]) +
                "px) " +
                "translateY(" +
                (clipPoint[1] + scale * center[1]) +
                "px) " +
                "translateZ(0) " +
                "rotate(" +
                (360 - KhanMath.bound(angle)) +
                "deg)",
        );
    };

    return arrowHead;
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

add.standard = [add.draw, add.pointsToFront];

const modify = {
    draw: function () {
        this.draw();
    },
} as const;

modify.standard = [modify.draw];

const draw = {
    basic: function (state: any) {
        const graphie = this.graphie;
        let start = this.coord(0);
        let end = this.coord(1);

        if (!this.state.visibleShape) {
            const options = {
                thickness: 10,
            } as const;
            this.state.visibleShape = new WrappedLine(
                graphie,
                start,
                end,
                options,
            );
            this.state.visibleShape.attr(this.normalStyle());
            this.state.visibleShape.toFront();

            if (this.mouseTarget()) {
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
        const elements = [this.state.visibleShape];

        if (this.mouseTarget()) {
            elements.push(this.mouseTarget());
        }
        _.each(elements, function (element) {
            element.moveTo(start, end);
        });
    },

    arrows: function (state: any) {
        // Create arrows, if not yet created
        if (this._arrows == null) {
            this._arrows = [];
            if (state.extendLine) {
                this._arrows.push(
                    createArrow(this.graphie, this.normalStyle()),
                );
                this._arrows.push(
                    createArrow(this.graphie, this.normalStyle()),
                );
            } else if (state.extendRay) {
                this._arrows.push(
                    createArrow(this.graphie, this.normalStyle()),
                );
            }
        }

        // Transform arrows
        const angle = getScaledAngle(this);
        const angleForArrow = [360 - angle, (540 - angle) % 360];
        _.each(
            this._arrows,
            function (arrow, i) {
                arrow.toCoordAtAngle(this.coord(i), angleForArrow[i]);
            },
            this,
        );
    },

    highlight: function (state: any, prevState: any) {
        // TODO(jack): Figure out a way to highlight the points attached to
        // the line. Maybe this means an additional isHovering: []
        // function to state of movable/movablepoint to define [additional?]
        // times it should be highlighted
        if (state.isHovering && !prevState.isHovering) {
            state.visibleShape.animate(state.highlightStyle, 50);
        } else if (!state.isHovering && prevState.isHovering) {
            state.visibleShape.animate(state.normalStyle, 50);
        }
    },
} as const;

draw.standard = [draw.basic, draw.arrows, draw.highlight];

const remove = {
    basic: function () {
        if (this.state.visibleShape) {
            this.state.visibleShape.remove();
        }
    },

    arrows: function () {
        if (this._arrows != null) {
            _.invoke(this._arrows, "remove");
        }
        this._arrows = null;
    },
} as const;

remove.standard = [remove.basic, remove.arrows];

const constraints = {
    fixed: function(): () => boolean {
        return function () {
            return false;
        };
    },

    snap: function(snap: any): (arg1: Coord, arg2: Coord) => any {
        return function (coord: Coord, prevCoord: Coord) {
            if (snap === null) {
                return true;
            }
            let delta = kvector.subtract(coord, prevCoord);
            snap = snap || this.graphie.snap;
            delta = kpoint.roundTo(delta, snap);
            return kvector.add(prevCoord, delta);
        };
    },

    bound: function(range: any, snap: any, paddingPx: number): (arg1: any, arg2: any) => any {
        if (paddingPx === undefined) {
            if (range === undefined) {
                paddingPx = 10;
            } else {
                paddingPx = 0;
            }
        }
        return function (coord: Coord, prevCoord: Coord) {
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

constraints.standard = null;

const onMove = {
    updatePoints: function (coord: Coord, prevCoord: Coord) {
        const actualDelta = kvector.subtract(coord, prevCoord);
        _.each(this.state.points, function (point) {
            point.setCoord(kvector.add(point.coord(), actualDelta));
        });
    },
} as const;

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
