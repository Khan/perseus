/* eslint-disable @typescript-eslint/no-invalid-this */
/**
 * A library of options to pass to add/draw/remove/constraints
 */

import {point as kpoint, vector as kvector} from "@khanacademy/kmath";
import _ from "underscore";

import type {Coord} from "./types";

function sum(array: any) {
    return _.reduce(
        array,
        function (memo, arg) {
            return memo + arg;
        },
        0,
    );
}

function clockwise(points: any) {
    const segments = _.zip(points, points.slice(1).concat(points.slice(0, 1)));
    const areas = _.map(segments, function (segment: [any, any]) {
        const p1 = segment[0];
        const p2 = segment[1];
        return (p2[0] - p1[0]) * (p2[1] + p1[1]);
    });
    return sum(areas) > 0;
}

const add = {
    constrain: function () {
        this.constrain();
    },

    pointsToFront: function (state: any) {
        _.invoke(state.points, "toFront");
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly constrain: () => void; readonly pointsToFront: (state: any) => void; }'.
add.standard = [add.constrain, add.pointsToFront];

const modify = {
    draw: function () {
        this.draw();
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly draw: () => void; }'.
modify.standard = [modify.draw];

const draw = {
    basic: function (state: any, prevState: any) {
        // @ts-expect-error - TS2339 - Property 'graphie' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        const graphie = this.graphie;
        // @ts-expect-error - TS2339 - Property 'path' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        const path = this.path(state);

        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        if (!this.state.visibleShape) {
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.state.visibleShape = graphie.raphael.path(path);
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. | TS2339 - Property 'normalStyle' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.state.visibleShape.attr(this.normalStyle());
        }
        if (
            state.normalStyle !== prevState.normalStyle &&
            !_.isEqual(state.normalStyle, prevState.normalStyle)
        ) {
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. | TS2339 - Property 'normalStyle' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.state.visibleShape.attr(this.normalStyle());
        }
        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        this.state.visibleShape.attr({path: path});
        // @ts-expect-error - TS2339 - Property 'mouseTarget' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        if (this.mouseTarget()) {
            // @ts-expect-error - TS2339 - Property 'mouseTarget' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            this.mouseTarget().attr({path: path});
        }
    },

    /* Labels are handled primarily by label objects, but sometimes require
     * extra movables, e.g., for the arcs drawn at labeled angles. These extra
     * movables are stored in the label cache. */
    labels: function (state: any, prevState: any) {
        // @ts-expect-error - TS2339 - Property 'graphie' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        const graphie = this.graphie;
        const self = this;

        const coords = _.invoke(state.points, "coord");
        const isClockwise = clockwise(coords);
        const n = coords.length;

        // graphie.labelAngle and similar methods attempt to re-use the label
        // provided, which will have been stored on state._labeledAngles.
        // If they cannot re-use the label, they make a new one, which will
        // get stored on state._labelCache. These will all be cleared out when
        // we remove the polygon.
        // (This logic is borrowed from graphie:addMovablePolygon.)
        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        if (self.state._labelCache != null) {
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            _.invoke(self.state._labelCache, "remove");
        }
        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        self.state._labelCache = [];

        // Update angle labels
        if (state.angleLabels.length || state.showRightAngleMarkers.length) {
            // Generate labels
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            if (self.state._labeledAngles == null) {
                // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                self.state._labeledAngles = _.times(
                    Math.max(
                        state.angleLabels.length,
                        state.showRightAngleMarkers.length,
                    ),
                    function () {
                        return graphie.label(
                            [0, 0],
                            "",
                            "center",
                            state.labelStyle,
                        );
                    },
                );
            }

            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            _.each(self.state._labeledAngles, function (label, i) {
                // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                self.state._labelCache.push(
                    graphie.labelAngle({
                        point1: coords[(i - 1 + n) % n],
                        vertex: coords[i],
                        point3: coords[(i + 1) % n],
                        label: label,
                        text: state.angleLabels[i],
                        showRightAngleMarker: state.showRightAngleMarkers[i],
                        numArcs: state.numArcs[i],
                        clockwise: isClockwise,
                        style: state.labelStyle,
                    }),
                );
            });
        }

        // Update side labels
        if (state.sideLabels.length) {
            // Generate labels
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            if (self.state._labeledSides == null) {
                // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                self.state._labeledSides = _.map(
                    state.sideLabels,
                    function (label) {
                        return graphie.label(
                            [0, 0],
                            "",
                            "center",
                            state.labelStyle,
                        );
                    },
                );
            }

            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            _.each(self.state._labeledSides, function (label, i) {
                // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                self.state._labelCache.push(
                    graphie.labelSide({
                        point1: coords[i],
                        point2: coords[(i + 1) % n],
                        label: label,
                        text: state.sideLabels[i],
                        numArrows: state.numArrows[i],
                        numTicks: state.numTicks[i],
                        clockwise: isClockwise,
                        style: state.labelStyle,
                    }),
                );
            });
        }

        // Update vertex labels
        if (state.vertexLabels.length) {
            // Generate labels
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            if (self.state._labeledVertices == null) {
                // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                self.state._labeledVertices = _.map(
                    state.vertexLabels,
                    function (label) {
                        return graphie.label(
                            [0, 0],
                            "",
                            "center",
                            state.labelStyle,
                        );
                    },
                );
            }

            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            _.each(self.state._labeledVertices, function (label, i) {
                // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
                self.state._labelCache.push(
                    graphie.labelVertex({
                        point1: coords[(i - 1 + n) % n],
                        vertex: coords[i],
                        point3: coords[(i + 1) % n],
                        label: label,
                        text: state.vertexLabels[i],
                        clockwise: isClockwise,
                        style: state.labelStyle,
                    }),
                );
            });
        }

        // graphie.labelVertex and its peer methods return an array of movables
        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'. | TS2339 - Property 'state' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
        self.state._labelCache = _.flatten(self.state._labelCache);
    },

    highlight: function (state: any, prevState: any) {
        if (state.isHovering && !prevState.isHovering) {
            // @ts-expect-error - TS2339 - Property 'highlightStyle' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            state.visibleShape.animate(this.highlightStyle(), 50);
        } else if (!state.isHovering && prevState.isHovering) {
            // @ts-expect-error - TS2339 - Property 'normalStyle' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
            state.visibleShape.animate(this.normalStyle(), 50);
        }
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly basic: (state: any, prevState: any) => void; readonly labels: (state: any, prevState: any) => void; readonly highlight: (state: any, prevState: any) => void; }'.
draw.standard = [draw.basic, draw.labels, draw.highlight];

const remove = {
    basic: function () {
        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: () => void; readonly labels: () => void; }'.
        if (this.state.visibleShape) {
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: () => void; readonly labels: () => void; }'.
            this.state.visibleShape.remove();
        }
    },
    labels: function () {
        const labels = [
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: () => void; readonly labels: () => void; }'.
            this.state._labeledSides,
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: () => void; readonly labels: () => void; }'.
            this.state._labeledVertices,
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: () => void; readonly labels: () => void; }'.
            this.state._labeledAngles,
            // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly basic: () => void; readonly labels: () => void; }'.
            this.state._labelCache,
        ];

        _.each(labels, function (labelType) {
            if (labelType != null && labelType.length) {
                _.invoke(labelType, "remove");
            }
        });
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly basic: () => void; readonly labels: () => void; }'.
remove.standard = [remove.basic, remove.labels];

const constraints = {
    fixed: function (): () => boolean {
        return function () {
            return false;
        };
    },

    snap: function (snap: any): (arg1: Coord) => unknown {
        return function (coord: Coord): unknown {
            if (snap === null) {
                // NOTE(kevin): this should probably return the original point
                return true;
            }
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            snap = snap || this.graphie.snap;
            return kpoint.roundTo(coord, snap);
        };
    },

    bound: function (
        range: any,
        snap: any,
        paddingPx: number,
    ): (arg1: Coord, arg2: Coord) => Coord {
        if (paddingPx === undefined) {
            if (range === undefined) {
                paddingPx = 10;
            } else {
                paddingPx = 0;
            }
        }
        return function (coord: Coord, prevCoord: Coord): Coord {
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
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            const deltaBounds = _.map(this.coords(), function (coord, i) {
                const max = kvector.subtract(absoluteUpper, coord);
                const min = kvector.subtract(absoluteLower, coord);
                return [min, max];
            });

            // bound the delta by the calculated bounds
            const boundedDelta = _.reduce(
                deltaBounds,
                // @ts-expect-error - TS2345 - Type 'number[]' is not assignable to type 'Coord'.
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

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly fixed: () => () => boolean; readonly snap: (snap: any) => (arg1: Coord) => unknown; readonly bound: (range: any, snap: any, paddingPx: number) => (arg1: Coord, arg2: Coord) => Coord; }'.
constraints.standard = null;

const onMove = {
    updatePoints: function (coord: Coord, prevCoord: Coord): void {
        const actualDelta = kvector.subtract(coord, prevCoord);
        // @ts-expect-error - TS2339 - Property 'state' does not exist on type '{ readonly updatePoints: (coord: Coord, prevCoord: Coord) => undefined; }'.
        _.each(this.state.points, function (point) {
            point.setCoord(kvector.add(point.coord(), actualDelta));
        });
    },
} as const;

// @ts-expect-error - TS2339 - Property 'standard' does not exist on type '{ readonly updatePoints: (coord: Coord, prevCoord: Coord) => undefined; }'.
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
    onClick: {standard: null},
};
