/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-invalid-this */
/**
 * Interactive graphie utilities.
 *
 * This file exposes a couple functions, but mostly it adds functions to the
 * `Graphie` prototype for dealing with interactive graphie elements.
 */

// TODO(emily): This file breaks our line length limits like nobody's business.
// Figure out how to fix that.
import {
    vector as kvector,
    point as kpoint,
    line as kline,
    KhanMath,
    geometry,
} from "@khanacademy/kmath";
import {Errors, PerseusError} from "@khanacademy/perseus-core";
import $ from "jquery";
import _ from "underscore";

// NOTE(jeresig): We include a special copy of jQuery vmouse so
// that Perseus will continue to work in mobile native devices
// (this should have no impact in the browser)
// eslint-disable-next-line import/no-unassigned-import
import "../jquery.mobile.vmouse";

import {Arrowhead} from "../interactive2/arrowhead";
import WrappedEllipse from "../interactive2/wrapped-ellipse";
import WrappedLine from "../interactive2/wrapped-line";

import KhanColors from "./colors";
import GraphUtils, {polar} from "./graphie";

import type {Coord} from "../interactive2/types";

export type MouseHandler = (position: Coord) => void;

const {clockwise, reverseVector} = geometry;

function scaledDistanceFromAngle(angle: number) {
    const a = 3.51470560176242 * 20;
    const b = 0.5687298702748785 * 20;
    const c = -0.037587715462826674;
    return (a - b) * Math.exp(c * angle) + b;
}

function scaledPolarRad(radius: number, radians: number): Coord {
    return [
        radius * Math.cos(radians),
        radius * Math.sin(radians) * -1, // SVG flips y axis
    ];
}

function scaledPolarDeg(radius: number, degrees): Coord {
    const radians = (degrees * Math.PI) / 180;
    return scaledPolarRad(radius, radians);
}

// Global dragging state
let dragging = false;

const InteractiveUtils: any = {
    // Useful for shapes that are only sometimes drawn. If a shape isn't
    // needed, it can be replaced with bogusShape which just has stub methods
    // that successfully do nothing.
    // The alternative would be 'if..typeof' checks all over the place.
    bogusShape: {
        animate: function () {},
        attr: function () {},
        remove: function () {},
    },
};

_.extend(GraphUtils.Graphie.prototype, {
    /**
     * Unlike all other Graphie-related code, the following three functions use
     * a lot of scaled coordinates (so that labels appear the same size
     * regardless of current shape/figure scale). These are prefixed with 's'.
     */
    labelAngle: function (options) {
        const graphie = this;

        _.defaults(options, {
            point1: [0, 0],
            vertex: [0, 0],
            point3: [0, 0],
            label: null,
            numArcs: 1,
            showRightAngleMarker: true,
            pushOut: 0,
            clockwise: false,
            style: {},
        });

        let text = options.text === undefined ? "" : options.text;
        const vertex = options.vertex;
        const sVertex = graphie.scalePoint(vertex);
        let p1;
        let p3;
        if (options.clockwise) {
            p1 = options.point1;
            p3 = options.point3;
        } else {
            p1 = options.point3;
            p3 = options.point1;
        }

        const startAngle = GraphUtils.findAngleDeprecated(p1, vertex);
        const endAngle = GraphUtils.findAngleDeprecated(p3, vertex);
        const angle = (endAngle + 360 - startAngle) % 360;
        const halfAngle = (startAngle + angle / 2) % 360;
        const sPadding = 5 * options.pushOut;
        let sRadius = sPadding + scaledDistanceFromAngle(angle);
        const temp: Array<never> = [];

        if (Math.abs(angle - 90) < 1e-9 && options.showRightAngleMarker) {
            const v1 = kvector.add(
                sVertex,
                scaledPolarDeg(sRadius, startAngle),
            );
            const v2 = kvector.add(sVertex, scaledPolarDeg(sRadius, endAngle));

            sRadius *= Math.SQRT2;
            const v3 = kvector.add(sVertex, scaledPolarDeg(sRadius, halfAngle));

            _.each([v1, v2], function (v) {
                // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
                temp.push(graphie.scaledPath([v, v3], options.style));
            });
        } else {
            // Draw arcs
            _.times(options.numArcs, function (i) {
                temp.push(
                    // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
                    graphie.arc(
                        vertex,
                        graphie.unscaleVector(sRadius),
                        startAngle,
                        endAngle,
                        options.style,
                    ),
                );
                sRadius += 3;
            });
        }

        if (text) {
            const match = text.match(/\$deg(\d)?/);
            if (match) {
                const precision = match[1] || 1;
                text = text.replace(
                    match[0],
                    KhanMath.toFixedApprox(angle, precision) + "^{\\circ}",
                );
            }

            const sOffset = scaledPolarDeg(sRadius + 15, halfAngle);
            const sPosition = kvector.add(sVertex, sOffset);
            const position = graphie.unscalePoint(sPosition);

            // Reuse label if possible
            if (options.label) {
                options.label.setPosition(position);
                options.label.processMath(text, /* force */ true);
            } else {
                graphie.label(position, text, "center", options.style);
            }
        }

        return temp;
    },

    labelSide: function (options) {
        const graphie = this;

        _.defaults(options, {
            point1: [0, 0],
            point2: [0, 0],
            label: null,
            text: "",
            numTicks: 0,
            numArrows: 0,
            clockwise: false,
            style: {},
        });

        let p1;
        let p2;
        if (options.clockwise) {
            p1 = options.point1;
            p2 = options.point2;
        } else {
            p1 = options.point2;
            p2 = options.point1;
        }

        const midpoint = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
        const sMidpoint = graphie.scalePoint(midpoint);
        const parallelAngle = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
        const perpendicularAngle = parallelAngle + Math.PI / 2;
        const temp: Array<never> = [];
        let sCumulativeOffset = 0;

        if (options.numTicks) {
            const n = options.numTicks;

            const sSpacing = 5;
            const sHeight = 5;

            const style = _.extend({}, options.style, {
                strokeWidth: 2,
            });

            _.times(n, function (i) {
                const sOffset = sSpacing * (i - (n - 1) / 2);

                const sOffsetVector = scaledPolarRad(sOffset, parallelAngle);
                const sHeightVector = scaledPolarRad(
                    sHeight,
                    perpendicularAngle,
                );

                const sPath = [
                    kvector.add(sMidpoint, sOffsetVector, sHeightVector),
                    kvector.add(
                        sMidpoint,
                        sOffsetVector,
                        reverseVector(sHeightVector),
                    ),
                ];

                // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
                temp.push(graphie.scaledPath(sPath, style));
            });

            sCumulativeOffset += sSpacing * (n - 1) + 15;
        }

        if (options.numArrows) {
            const n = options.numArrows;

            const start = [p1, p2].sort(function (a, b) {
                if (a[1] === b[1]) {
                    return a[0] - b[0];
                }
                return a[1] - b[1];
            })[0];
            const sStart = graphie.scalePoint(start);

            const style = _.extend({}, options.style, {
                arrows: "->",
                strokeWidth: 2,
            });

            const sSpacing = 5;

            _.times(n, function (i) {
                const sOffset = sCumulativeOffset + sSpacing * i;
                let sOffsetVector = scaledPolarRad(sOffset, parallelAngle);

                if (start !== p1) {
                    sOffsetVector = reverseVector(sOffsetVector);
                }

                const sEnd = kvector.add(sMidpoint, sOffsetVector);

                // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
                temp.push(graphie.scaledPath([sStart, sEnd], style));
            });
        }

        let text = options.text;
        if (text) {
            const match = text.match(/\$len(\d)?/);
            if (match) {
                const distance = GraphUtils.getDistance(p1, p2);
                const precision = match[1] || 1;
                text = text.replace(
                    match[0],
                    KhanMath.toFixedApprox(distance, precision),
                );
            }

            const sOffset = 20;
            const sOffsetVector = scaledPolarRad(sOffset, perpendicularAngle);
            const sPosition = kvector.add(sMidpoint, sOffsetVector);
            const position = graphie.unscalePoint(sPosition);

            // Reuse label if possible
            if (options.label) {
                options.label.setPosition(position);
                options.label.processMath(text, /* force */ true);
            } else {
                graphie.label(position, text, "center", options.style);
            }
        }

        return temp;
    },

    /* Can also be used to label points that aren't vertices */
    labelVertex: function (options) {
        const graphie = this;

        _.defaults(options, {
            point1: null,
            vertex: [0, 0],
            point3: null,
            label: null,
            text: "",
            clockwise: false,
            style: {},
        });

        if (!options.text) {
            return;
        }

        const vertex = options.vertex;
        const sVertex = graphie.scalePoint(vertex);
        let p1;
        let p3;
        if (options.clockwise) {
            p1 = options.point1;
            p3 = options.point3;
        } else {
            p1 = options.point3;
            p3 = options.point1;
        }

        let angle = 135;
        let halfAngle;
        if (p1 && p3) {
            const startAngle = GraphUtils.findAngleDeprecated(p1, vertex);
            const endAngle = GraphUtils.findAngleDeprecated(p3, vertex);
            angle = (endAngle + 360 - startAngle) % 360;
            halfAngle = (startAngle + angle / 2 + 180) % 360;
        } else if (p1) {
            const parallelAngle = GraphUtils.findAngleDeprecated(vertex, p1);
            halfAngle = parallelAngle + 90;
        } else if (p3) {
            const parallelAngle = GraphUtils.findAngleDeprecated(p3, vertex);
            halfAngle = parallelAngle + 90;
        } else {
            // Standalone point
            halfAngle = 135;
        }

        const sRadius = 10 + scaledDistanceFromAngle(360 - angle);
        const sOffsetVector = scaledPolarDeg(sRadius, halfAngle);
        const sPosition = kvector.add(sVertex, sOffsetVector);
        const position = graphie.unscalePoint(sPosition);

        // Reuse label if possible
        if (options.label) {
            options.label.setPosition(position);
            options.label.processMath(options.text, /* force */ true);
        } else {
            graphie.label(position, options.text, "center", options.style);
        }
    },

    // Add a point to the graph that can be dragged around.
    // It allows automatic constraints on its movement as well as automatically
    // managing line segments that terminate at the point.
    //
    // Options can be set to control how the point behaves:
    //   coord[]:
    //     The initial position of the point
    //   snapX, snapY:
    //     The minimum increment the point can be moved
    //
    // The return value is an object that can be used to manipulate the point:
    //   The coordX and coordY properties tell you the current position
    //
    //   By adding an onMove() method to the returned object, you can install an
    //   event handler that gets called every time the user moves the point.
    //
    //   The returned object also provides a moveTo(x,y) method that will move
    //   the point to a specific coordinate
    //
    // Constraints can be set on the on the returned object:
    //
    //  - Set point to be immovable:
    //        movablePoint.constraints.fixed = true
    //
    //  - Constrain point to a fixed distance from another point. The resulting
    //    point will move in a circle:
    //        movablePoint.fixedDistance = {
    //           dist: 2,
    //           point: point1
    //        }
    //
    //  - Constrain point to a line defined by a fixed angle between it and
    //    two other points:
    //        movablePoint.fixedAngle = {
    //           angle: 45,
    //           vertex: point1,
    //           ref: point2
    //        }
    //
    //  - Confined the point to traveling in a vertical or horizontal line,
    //    respectively
    //        movablePoint.constrainX = true;
    //        movablePoint.constrainY = true;
    //
    //  - Connect a movableLineSegment to a movablePoint. The point is attached
    //    to a specific end of the line segment by adding the segment either to
    //    the list of lines that start at the point or the list of lines that
    //    end at the point (movableLineSegment can do this for you):
    //        movablePoint.lineStarts.push(movableLineSegment);
    //          - or -
    //        movablePoint.lineEnds.push(movableLineSegment);
    //
    //  - Connect a movablePolygon to a movablePoint in exacty the same way:
    //        movablePoint.polygonVertices.push(movablePolygon);
    //
    addMovablePoint: function (options) {
        const movablePoint = $.extend(
            true,
            {
                graph: this,
                coord: [0, 0],
                snapX: 0,
                snapY: 0,
                pointSize: 4,
                highlight: false,
                dragging: false,
                visible: true,
                bounded: true,
                constraints: {
                    fixed: false,
                    constrainX: false,
                    constrainY: false,
                    fixedAngle: {},
                    fixedDistance: {},
                },
                lineStarts: [],
                lineEnds: [],
                polygonVertices: [],
                normalStyle: {},
                highlightStyle: {
                    fill: KhanColors.INTERACTING,
                    stroke: KhanColors.INTERACTING,
                },
                labelStyle: {
                    color: KhanColors.INTERACTIVE,
                },
                vertexLabel: "",
                mouseTarget: null,
            },
            options,
        );

        const normalColor = movablePoint.constraints.fixed
            ? KhanColors.DYNAMIC
            : KhanColors.INTERACTIVE;
        movablePoint.normalStyle = _.extend(
            {},
            {
                fill: normalColor,
                stroke: normalColor,
            },
            options.normalStyle,
        );

        // deprecated: don't use coordX/coordY; use coord[]
        if (options.coordX !== undefined) {
            movablePoint.coord[0] = options.coordX;
        }
        if (options.coordY !== undefined) {
            movablePoint.coord[1] = options.coordY;
        }

        const graph = movablePoint.graph;

        const applySnapAndConstraints = function (coord: any) {
            // coord should be the scaled coordinate

            // move point away from edge of graph unless it's invisible or fixed
            if (
                movablePoint.visible &&
                movablePoint.bounded &&
                !movablePoint.constraints.fixed
            ) {
                // can't go beyond 10 pixels from the edge
                coord = graph.constrainToBounds(coord, 10);
            }

            let coordX = coord[0];
            let coordY = coord[1];

            // snap coordinates to grid
            if (movablePoint.snapX !== 0) {
                coordX =
                    Math.round(coordX / movablePoint.snapX) *
                    movablePoint.snapX;
            }
            if (movablePoint.snapY !== 0) {
                coordY =
                    Math.round(coordY / movablePoint.snapY) *
                    movablePoint.snapY;
            }

            // snap to points around circle
            if (movablePoint.constraints.fixedDistance.snapPoints) {
                const mouse = graph.scalePoint(coord);
                let mouseX = mouse[0];
                let mouseY = mouse[1];

                const snapRadians =
                    (2 * Math.PI) /
                    movablePoint.constraints.fixedDistance.snapPoints;
                const radius = movablePoint.constraints.fixedDistance.dist;

                const centerCoord =
                    movablePoint.constraints.fixedDistance.point;
                const centerX =
                    (centerCoord[0] - graph.range[0][0]) * graph.scale[0];
                const centerY =
                    (-centerCoord[1] + graph.range[1][1]) * graph.scale[1];

                let mouseXrel = mouseX - centerX;
                let mouseYrel = -mouseY + centerY;
                let radians = Math.atan(mouseYrel / mouseXrel);
                const outsideArcTanRange = mouseXrel < 0;

                // adjust so that angles increase from 0 to 2 pi as you go
                // around the circle
                if (outsideArcTanRange) {
                    radians += Math.PI;
                }

                // perform the snap
                radians = Math.round(radians / snapRadians) * snapRadians;

                // convert from radians back to pixels
                mouseXrel = radius * Math.cos(radians);
                mouseYrel = radius * Math.sin(radians);
                // convert back to coordinates relative to graphie canvas
                mouseX = mouseXrel + centerX;
                mouseY = -mouseYrel + centerY;
                coordX = KhanMath.roundTo(
                    5,
                    mouseX / graph.scale[0] + graph.range[0][0],
                );
                coordY = KhanMath.roundTo(
                    5,
                    graph.range[1][1] - mouseY / graph.scale[1],
                );
            }

            const result = movablePoint.applyConstraint([coordX, coordY]);
            return result;
        };

        // Using the passed coordinates, apply any constraints and return
        // the closest coordinates that match the constraints.
        movablePoint.applyConstraint = function (
            coord: any,
            extraConstraints: any,
            override: any,
        ) {
            let newCoord = coord.slice();
            const constraints: Record<string, any> = {};
            if (override) {
                $.extend(
                    constraints,
                    {
                        fixed: false,
                        constrainX: false,
                        constrainY: false,
                        fixedAngle: {},
                        fixedDistance: {},
                    },
                    extraConstraints,
                );
            } else {
                $.extend(constraints, this.constraints, extraConstraints);
            }

            // constrain to vertical movement
            if (constraints.constrainX) {
                newCoord = [this.coord[0], coord[1]];

                // constrain to horizontal movement
            } else if (constraints.constrainY) {
                newCoord = [coord[0], this.coord[1]];

                // both distance and angle are constrained
            } else if (
                typeof constraints.fixedAngle.angle === "number" &&
                typeof constraints.fixedDistance.dist === "number"
            ) {
                const vertex =
                    constraints.fixedAngle.vertex.coord ||
                    constraints.fixedAngle.vertex;
                const ref =
                    constraints.fixedAngle.ref.coord ||
                    constraints.fixedAngle.ref;
                const distPoint =
                    constraints.fixedDistance.point.coord ||
                    constraints.fixedDistance.point;

                const constrainedAngle =
                    ((constraints.fixedAngle.angle +
                        GraphUtils.findAngleDeprecated(ref, vertex)) *
                        Math.PI) /
                    180;
                const length = constraints.fixedDistance.dist;
                newCoord[0] =
                    length * Math.cos(constrainedAngle) + distPoint[0];
                newCoord[1] =
                    length * Math.sin(constrainedAngle) + distPoint[1];

                // angle is constrained
            } else if (typeof constraints.fixedAngle.angle === "number") {
                const vertex =
                    constraints.fixedAngle.vertex.coord ||
                    constraints.fixedAngle.vertex;
                const ref =
                    constraints.fixedAngle.ref.coord ||
                    constraints.fixedAngle.ref;

                const constrainedAngle =
                    ((constraints.fixedAngle.angle +
                        GraphUtils.findAngleDeprecated(ref, vertex)) *
                        Math.PI) /
                    180;
                const angle =
                    (GraphUtils.findAngleDeprecated(coord, vertex) * Math.PI) /
                    180;
                const distance = GraphUtils.getDistance(coord, vertex);
                let length = distance * Math.cos(constrainedAngle - angle);
                length = length < 1.0 ? 1.0 : length;
                newCoord[0] = length * Math.cos(constrainedAngle) + vertex[0];
                newCoord[1] = length * Math.sin(constrainedAngle) + vertex[1];

                // distance is constrained
            } else if (typeof constraints.fixedDistance.dist === "number") {
                const distPoint =
                    constraints.fixedDistance.point.coord ||
                    constraints.fixedDistance.point;

                let angle = GraphUtils.findAngleDeprecated(coord, distPoint);
                const length = constraints.fixedDistance.dist;
                angle = (angle * Math.PI) / 180;
                newCoord[0] = length * Math.cos(angle) + distPoint[0];
                newCoord[1] = length * Math.sin(angle) + distPoint[1];

                // point is fixed
            } else if (constraints.fixed) {
                newCoord = movablePoint.coord;
            }
            return newCoord;
        };

        movablePoint.coord = applySnapAndConstraints(movablePoint.coord);

        const highlightScale = 2;

        if (movablePoint.visible) {
            graph.style(movablePoint.normalStyle, function () {
                const radii = [
                    movablePoint.pointSize / graph.scale[0],
                    movablePoint.pointSize / graph.scale[1],
                ];
                const options = {
                    maxScale: highlightScale,
                    // Add in 2px of padding to avoid clipping at the edges.
                    padding: 2,
                } as const;
                movablePoint.visibleShape = new WrappedEllipse(
                    graph,
                    movablePoint.coord,
                    // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type '[number, number]'.
                    radii,
                    options,
                );
                movablePoint.visibleShape.attr(
                    _.omit(movablePoint.normalStyle, "scale"),
                );
                movablePoint.visibleShape.toFront();
            });
        }
        movablePoint.normalStyle.scale = 1;
        movablePoint.highlightStyle.scale = highlightScale;

        if (movablePoint.vertexLabel) {
            movablePoint.labeledVertex = this.label(
                [0, 0],
                "",
                "center",
                movablePoint.labelStyle,
            );
        }

        movablePoint.drawLabel = function () {
            if (movablePoint.vertexLabel) {
                movablePoint.graph.labelVertex({
                    vertex: movablePoint.coord,
                    label: movablePoint.labeledVertex,
                    text: movablePoint.vertexLabel,
                    style: movablePoint.labelStyle,
                });
            }
        };

        movablePoint.drawLabel();

        movablePoint.grab = function (offset) {
            // The offset for the gesture. When provided, the movable point will
            // track the mouse's position, plus this offset. This is typically
            // used to lock the distance between a user's finger and the movable
            // point, when dragging.
            offset = offset || [0, 0];

            $(document).bind(
                "vmousemove.point vmouseup.point",
                function (event) {
                    event.preventDefault();
                    movablePoint.dragging = true;
                    dragging = true;

                    // Adjust the target coordinate by accounting for the gesture's
                    // offset.
                    let coord = kvector.add(graph.getMouseCoord(event), offset);

                    coord = applySnapAndConstraints(coord);
                    let coordX = coord[0];
                    let coordY = coord[1];
                    let mouseX;
                    let mouseY;

                    if (event.type === "vmousemove") {
                        let doMove = true;
                        // The caller has the option of adding an onMove() method
                        // to the movablePoint object we return as a sort of event
                        // handler. By returning false from onMove(), the move
                        // can be vetoed, providing custom constraints on where
                        // the point can be moved. By returning array [x, y], the
                        // move can be overridden
                        if (_.isFunction(movablePoint.onMove)) {
                            const result = movablePoint.onMove(coordX, coordY);
                            if (result === false) {
                                doMove = false;
                            }
                            if (_.isArray(result)) {
                                coordX = result[0];
                                coordY = result[1];
                            }
                        }
                        // coord{X|Y} may have been modified by constraints or
                        // onMove handler; adjust mouse{X|Y} to match
                        mouseX = (coordX - graph.range[0][0]) * graph.scale[0];
                        mouseY = (-coordY + graph.range[1][1]) * graph.scale[1];

                        if (doMove) {
                            const point = graph.unscalePoint([mouseX, mouseY]);
                            movablePoint.visibleShape.moveTo(point);
                            movablePoint.mouseTarget.moveTo(point);
                            movablePoint.coord = [coordX, coordY];
                            movablePoint.updateLineEnds();
                            $(movablePoint).trigger("move");
                        }

                        movablePoint.drawLabel();
                    } else if (event.type === "vmouseup") {
                        $(document).unbind(".point");
                        movablePoint.dragging = false;
                        dragging = false;
                        if (_.isFunction(movablePoint.onMoveEnd)) {
                            const result = movablePoint.onMoveEnd(
                                coordX,
                                coordY,
                            );
                            if (_.isArray(result)) {
                                coordX = result[0];
                                coordY = result[1];
                                mouseX =
                                    (coordX - graph.range[0][0]) *
                                    graph.scale[0];
                                mouseY =
                                    (-coordY + graph.range[1][1]) *
                                    graph.scale[1];
                                const point = graph.unscalePoint([
                                    mouseX,
                                    mouseY,
                                ]);
                                movablePoint.visibleShape.moveTo(point);
                                movablePoint.mouseTarget.moveTo(point);
                                movablePoint.coord = [coordX, coordY];
                            }
                        }
                        if (!movablePoint.highlight) {
                            movablePoint.visibleShape.animate(
                                movablePoint.normalStyle,
                                50,
                            );
                            if (movablePoint.onUnhighlight) {
                                movablePoint.onUnhighlight();
                            }
                        }
                    }
                },
            );
        };

        if (movablePoint.visible && !movablePoint.constraints.fixed) {
            // the invisible shape in front of the point that gets mouse events
            if (!movablePoint.mouseTarget) {
                const radii = graph.unscaleVector(16);
                const options = {
                    mouselayer: true,
                    padding: 0,
                    disableMouseEventsOnWrapper: true,
                    interactiveKindForTesting: "movable-point",
                } as const;
                movablePoint.mouseTarget = new WrappedEllipse(
                    graph,
                    movablePoint.coord,
                    radii,
                    options,
                );
                movablePoint.mouseTarget.attr({fill: "#000", opacity: 0.0});
            }

            const $mouseTarget = $(movablePoint.mouseTarget.getMouseTarget());
            $mouseTarget.css("cursor", "move");
            $mouseTarget.bind(
                "vmousedown vmouseover vmouseout",
                function (event) {
                    if (event.type === "vmouseover") {
                        movablePoint.highlight = true;
                        if (!dragging) {
                            movablePoint.visibleShape.animate(
                                movablePoint.highlightStyle,
                                50,
                            );
                            if (movablePoint.onHighlight) {
                                movablePoint.onHighlight();
                            }
                        }
                    } else if (event.type === "vmouseout") {
                        movablePoint.highlight = false;
                        if (!movablePoint.dragging && !dragging) {
                            movablePoint.visibleShape.animate(
                                movablePoint.normalStyle,
                                50,
                            );
                            if (movablePoint.onUnhighlight) {
                                movablePoint.onUnhighlight();
                            }
                        }
                    } else if (
                        event.type === "vmousedown" &&
                        (event.which === 1 || event.which === 0)
                    ) {
                        event.preventDefault();

                        // The offset between the cursor or finger and the initial
                        // coordinates of the point. This is tracked so as to avoid
                        // locking the moving point to the user's finger on touch
                        // devices, which would obscure it, no matter how large we
                        // made the touch target. Instead, we respect the offset at
                        // which the point was grabbed for the entirety of the
                        // gesture, if it's a touch-based interaction.
                        const startCoord = movablePoint.coord;
                        const startMouseCoord = graph.getMouseCoord(event);
                        const isMouse = !("ontouchstart" in window);
                        const touchOffset = isMouse
                            ? [0, 0]
                            : kvector.subtract(startCoord, startMouseCoord);

                        movablePoint.grab(touchOffset);
                    }
                },
            );
        }

        // Method to let the caller animate the point to a new position.
        // Useful as part of a hint to show the user the correct place
        // to put the point.
        movablePoint.moveTo = function (
            coordX: any,
            coordY: any,
            updateLines: any,
        ) {
            const distance = GraphUtils.getDistance(
                this.graph.scalePoint([coordX, coordY]),
                this.graph.scalePoint(this.coord),
            );

            const time = distance * 5;

            const cb =
                updateLines &&
                function (coord: any) {
                    movablePoint.coord = coord;
                    movablePoint.updateLineEnds();
                };
            this.visibleShape.animateTo([coordX, coordY], time, cb);
            this.mouseTarget.animateTo([coordX, coordY], time, cb);
            this.coord = [coordX, coordY];
            if (_.isFunction(this.onMove)) {
                this.onMove(coordX, coordY);
            }
        };

        // After moving the point, call this to update all line segments
        // terminating at the point
        movablePoint.updateLineEnds = function () {
            $(this.lineStarts).each(function () {
                this.coordA = movablePoint.coord;
                this.transform();
            });
            $(this.lineEnds).each(function () {
                this.coordZ = movablePoint.coord;
                this.transform();
            });
            $(this.polygonVertices).each(function () {
                this.transform();
            });
        };

        // Put the point at a new position without any checks, animation,
        // or callbacks
        movablePoint.setCoord = function (coord: any) {
            if (this.visible) {
                this.visibleShape.moveTo(coord);
                if (this.mouseTarget != null) {
                    this.mouseTarget.moveTo(coord);
                }
            }
            this.coord = coord.slice();
        };

        // Put the point at the new position, checking that it is
        // within the graph's bounds
        movablePoint.setCoordConstrained = function (coord: any) {
            this.setCoord(applySnapAndConstraints(coord));
        };

        // Change z-order to back
        movablePoint.toBack = function () {
            if (this.visible) {
                if (this.mouseTarget != null) {
                    this.mouseTarget.toBack();
                }
                this.visibleShape.toBack();
            }
        };

        // Change z-order to front
        movablePoint.toFront = function () {
            if (this.visible) {
                if (this.mouseTarget != null) {
                    this.mouseTarget.toFront();
                }
                this.visibleShape.toFront();
            }
        };

        movablePoint.remove = function () {
            if (this.visibleShape) {
                this.visibleShape.remove();
            }
            if (this.mouseTarget) {
                this.mouseTarget.remove();
            }
            if (this.labeledVertex) {
                this.labeledVertex.remove();
            }
        };

        return movablePoint;
    },

    // MovableLineSegment is a line segment that can be dragged around the
    // screen. By attaching a smartPoint to each (or one) end, the ends can be
    // manipulated individually.
    //
    // To use with smartPoints, add the smartPoints first, then:
    //   addMovableLineSegment({ pointA: smartPoint1, pointZ: smartPoint2 });
    // Or just one end:
    //   addMovableLineSegment({ pointA: smartPoint, coordZ: [0, 0] });
    //
    // Include "fixed: true" in the options if you don't want the entire line
    // to be draggable (you can still use points to make the endpoints
    // draggable)
    //
    // The returned object includes the following properties/methods:
    //
    //   - lineSegment.coordA / lineSegment.coordZ
    //         The coordinates of each end of the line segment
    //
    //   - lineSegment.transform(syncToPoints)
    //         Repositions the line segment. Call after changing coordA
    //         and/or coordZ, or pass syncToPoints = true to use the current
    //         position of the corresponding smartPoints, if the segment was
    //         defined using smartPoints
    //
    addMovableLineSegment: function (options: any) {
        const lineSegment = $.extend(
            {
                graph: this,
                coordA: [0, 0],
                coordZ: [1, 1],
                snapX: 0,
                snapY: 0,
                fixed: false,
                ticks: 0,
                normalStyle: {},
                highlightStyle: {
                    stroke: KhanColors.INTERACTING,
                    "stroke-width": 6,
                },
                labelStyle: {
                    stroke: KhanColors.INTERACTIVE,
                    color: KhanColors.INTERACTIVE,
                },
                highlight: false,
                dragging: false,
                tick: [],
                extendLine: false,
                extendRay: false,
                constraints: {
                    fixed: false,
                    constrainX: false,
                    constrainY: false,
                },
                sideLabel: "",
                vertexLabels: [],
                numArrows: 0,
                numTicks: 0,
                movePointsWithLine: false,
            },
            options,
        );

        const normalColor = lineSegment.fixed
            ? KhanColors.DYNAMIC
            : KhanColors.INTERACTIVE;
        lineSegment.normalStyle = _.extend(
            {},
            {
                "stroke-width": 2,
                stroke: normalColor,
            },
            options.normalStyle,
        );
        // arrowStyle should be kept in sync with styling of the line
        lineSegment.arrowStyle = _.extend({}, lineSegment.normalStyle, {
            color: lineSegment.normalStyle.stroke,
        });

        // If the line segment is defined by movablePoints, coordA/coordZ are
        // owned by the points, otherwise they're owned by us
        if (options.pointA !== undefined) {
            lineSegment.coordA = options.pointA.coord;
            lineSegment.pointA.lineStarts.push(lineSegment);
        } else if (options.coordA !== undefined) {
            lineSegment.coordA = options.coordA.slice();
        }

        if (options.pointZ !== undefined) {
            lineSegment.coordZ = options.pointZ.coord;
            lineSegment.pointZ.lineEnds.push(lineSegment);
        } else if (options.coordA !== undefined) {
            lineSegment.coordA = lineSegment.coordA.slice();
        }

        const graph = lineSegment.graph;

        graph.style(lineSegment.normalStyle);
        for (let i = 0; i < lineSegment.ticks; ++i) {
            lineSegment.tick[i] = InteractiveUtils.bogusShape;
        }
        let path = GraphUtils.unscaledSvgPath([
            [0, 0],
            [1, 0],
        ]);
        for (let i = 0; i < lineSegment.ticks; ++i) {
            const tickoffset =
                0.5 - (lineSegment.ticks - 1 + i * 2) / graph.scale[0];
            // TODO(kevinb) figure out why path isn't being used
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            path += GraphUtils.unscaledSvgPath([
                [tickoffset, -7],
                [tickoffset, 7],
            ]);
        }

        options = {
            thickness: Math.max(
                lineSegment.normalStyle["stroke-width"],
                lineSegment.highlightStyle["stroke-width"],
            ),
        };
        lineSegment.visibleLine = new WrappedLine(
            graph,
            [0, 0],
            [1, 0],
            options,
        );
        lineSegment.visibleLine.attr(lineSegment.normalStyle);

        // Add mouse target
        if (!lineSegment.fixed) {
            const options = {
                thickness: 30,
                mouselayer: true,
                interactiveKindForTesting: "movable-line",
            } as const;
            lineSegment.mouseTarget = new WrappedLine(
                graph,
                [0, 0],
                [1, 0],
                options,
            );
            lineSegment.mouseTarget.attr({fill: "#000", opacity: 0.0});
        }

        // Reposition the line segment. Call after changing coordA and/or
        // coordZ, or pass syncToPoints = true to use the current position of
        // the corresponding movablePoints, if the segment was defined using
        // movablePoints
        lineSegment.transform = function (syncToPoints) {
            if (syncToPoints) {
                if (typeof this.pointA === "object") {
                    this.coordA = this.pointA.coord;
                }
                if (typeof this.pointZ === "object") {
                    this.coordZ = this.pointZ.coord;
                }
            }

            const getScaledAngle = function (line) {
                const scaledA = line.graph.scalePoint(line.coordA);
                const scaledZ = line.graph.scalePoint(line.coordZ);
                return kvector.polarDegFromCart(
                    kvector.subtract(scaledZ, scaledA),
                )[1];
            };

            const getClipPoint = function (graph: any, coord, angle: number) {
                graph = lineSegment.graph;
                const xExtent = graph.range[0][1] - graph.range[0][0];
                const yExtent = graph.range[1][1] - graph.range[1][0];

                const distance = xExtent + yExtent;
                const angleVec = graph.unscaleVector(
                    kvector.cartFromPolarDeg(1, angle),
                );
                const distVec = kvector.scale(
                    kvector.normalize(angleVec),
                    distance,
                );
                const farCoord = kvector.add(coord, distVec);
                const scaledAngle = kvector.polarDegFromCart(angleVec)[1];
                const clipPoint = graph.constrainToBoundsOnAngle(
                    farCoord,
                    4,
                    (scaledAngle * Math.PI) / 180,
                );
                return clipPoint;
            };

            const angle = getScaledAngle(this);
            let start = this.coordA;
            let end = this.coordZ;

            // Extend start, end if necessary (i.e., if not a line segment)
            if (this.extendLine) {
                start = getClipPoint(graph, start, 360 - angle);
                end = getClipPoint(graph, end, (540 - angle) % 360);
            } else if (this.extendRay) {
                end = getClipPoint(graph, start, 360 - angle);
            }

            const elements = [this.visibleLine];
            if (!this.fixed) {
                elements.push(this.mouseTarget);
            }
            _.each(elements, function (element) {
                element.moveTo(start, end);
            });

            // Add arrows
            if (this._arrows == null) {
                this._arrows = [];

                if (this.extendLine) {
                    this._arrows.push(new Arrowhead(graph, this.normalStyle));
                    this._arrows.push(new Arrowhead(graph, this.normalStyle));
                } else if (this.extendRay) {
                    this._arrows.push(new Arrowhead(graph, this.normalStyle));
                }
            }

            const coordForArrow = [this.coordA, this.coordZ];
            const angleForArrow = [360 - angle, (540 - angle) % 360];
            _.each(this._arrows, function (arrow, i) {
                arrow.toCoordAtAngle(coordForArrow[i], angleForArrow[i]);
            });

            // Temporary objects: array of SVG nodes that get recreated on drag
            _.invoke(this.temp, "remove");
            this.temp = [];

            const isClockwise =
                this.coordA[0] < this.coordZ[0] ||
                (this.coordA[0] === this.coordZ[0] &&
                    this.coordA[1] > this.coordZ[1]);

            // Update side label
            if (this.sideLabel) {
                this.temp.push(
                    this.graph.labelSide({
                        point1: this.coordA,
                        point2: this.coordZ,
                        label: this.labeledSide,
                        text: this.sideLabel,
                        numArrows: this.numArrows,
                        numTicks: this.numTicks,
                        clockwise: isClockwise,
                        style: this.labelStyle,
                    }),
                );
            }

            // Update vertex labels
            if (this.vertexLabels.length) {
                this.graph.labelVertex({
                    vertex: this.coordA,
                    point3: this.coordZ,
                    label: this.labeledVertices[0],
                    text: this.vertexLabels[0],
                    clockwise: isClockwise,
                    style: this.labelStyle,
                });

                this.graph.labelVertex({
                    point1: this.coordA,
                    vertex: this.coordZ,
                    label: this.labeledVertices[1],
                    text: this.vertexLabels[1],
                    clockwise: isClockwise,
                    style: this.labelStyle,
                });
            }

            this.temp = _.flatten(this.temp);
        };

        // Change z-order to back;
        lineSegment.toBack = function () {
            if (!lineSegment.fixed) {
                lineSegment.mouseTarget.toBack();
            }
            lineSegment.visibleLine.toBack();
        };

        // Change z-order to front
        lineSegment.toFront = function () {
            if (!lineSegment.fixed) {
                lineSegment.mouseTarget.toFront();
            }
            lineSegment.visibleLine.toFront();
        };

        lineSegment.remove = function () {
            if (!lineSegment.fixed) {
                lineSegment.mouseTarget.remove();
            }
            lineSegment.visibleLine.remove();
            if (lineSegment.labeledSide) {
                lineSegment.labeledSide.remove();
            }
            if (lineSegment.labeledVertices) {
                _.invoke(lineSegment.labeledVertices, "remove");
            }
            if (lineSegment._arrows) {
                _.invoke(lineSegment._arrows, "remove");
            }
            if (lineSegment.temp.length) {
                _.invoke(lineSegment.temp, "remove");
            }
        };

        lineSegment.hide = function () {
            lineSegment.visibleLine.hide();
            if (lineSegment.temp.length) {
                _.invoke(lineSegment.temp, "hide");
            }
            if (lineSegment._arrows) {
                _.invoke(lineSegment._arrows, "hide");
            }
        };

        lineSegment.show = function () {
            lineSegment.visibleLine.show();
            if (lineSegment.temp.length) {
                _.invoke(lineSegment.temp, "show");
            }
            if (lineSegment._arrows) {
                _.invoke(lineSegment._arrows, "show");
            }
        };

        if (lineSegment.sideLabel) {
            lineSegment.labeledSide = this.label(
                [0, 0],
                "",
                "center",
                lineSegment.labelStyle,
            );
        }

        if (lineSegment.vertexLabels.length) {
            lineSegment.labeledVertices = _.map(
                lineSegment.vertexLabels,
                function (label) {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    return this.label(
                        [0, 0],
                        "",
                        "center",
                        lineSegment.labelStyle,
                    );
                },
                this,
            );
        }

        if (!lineSegment.fixed && !lineSegment.constraints.fixed) {
            const $mouseTarget = $(lineSegment.mouseTarget.getMouseTarget());
            $mouseTarget.css("cursor", "move");
            $mouseTarget.bind(
                "vmousedown vmouseover vmouseout",
                function (event) {
                    if (event.type === "vmouseover") {
                        if (!dragging) {
                            lineSegment.highlight = true;
                            lineSegment.visibleLine.animate(
                                lineSegment.highlightStyle,
                                50,
                            );
                            lineSegment.arrowStyle = _.extend(
                                {},
                                lineSegment.arrowStyle,
                                {
                                    color: lineSegment.highlightStyle.stroke,
                                    stroke: lineSegment.highlightStyle.stroke,
                                },
                            );
                            lineSegment.transform();
                        }
                    } else if (event.type === "vmouseout") {
                        lineSegment.highlight = false;
                        if (!lineSegment.dragging) {
                            lineSegment.visibleLine.animate(
                                lineSegment.normalStyle,
                                50,
                            );
                            lineSegment.arrowStyle = _.extend(
                                {},
                                lineSegment.arrowStyle,
                                {
                                    color: lineSegment.normalStyle.stroke,
                                    stroke: lineSegment.normalStyle.stroke,
                                },
                            );
                            lineSegment.transform();
                        }
                    } else if (
                        event.type === "vmousedown" &&
                        (event.which === 1 || event.which === 0)
                    ) {
                        event.preventDefault();
                        let coordX =
                            // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                            (event.pageX -
                                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                $(graph.raphael.canvas.parentNode).offset()
                                    .left) /
                                graph.scale[0] +
                            graph.range[0][0];
                        let coordY =
                            graph.range[1][1] -
                            // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                            (event.pageY -
                                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                $(graph.raphael.canvas.parentNode).offset()
                                    .top) /
                                graph.scale[1];
                        if (lineSegment.snapX > 0) {
                            coordX =
                                Math.round(coordX / lineSegment.snapX) *
                                lineSegment.snapX;
                        }
                        if (lineSegment.snapY > 0) {
                            coordY =
                                Math.round(coordY / lineSegment.snapY) *
                                lineSegment.snapY;
                        }
                        const mouseOffsetA = [
                            lineSegment.coordA[0] - coordX,
                            lineSegment.coordA[1] - coordY,
                        ];
                        const mouseOffsetZ = [
                            lineSegment.coordZ[0] - coordX,
                            lineSegment.coordZ[1] - coordY,
                        ];

                        const offsetLeft = -Math.min(
                            graph.scaleVector(mouseOffsetA)[0],
                            graph.scaleVector(mouseOffsetZ)[0],
                        );
                        const offsetRight = Math.max(
                            graph.scaleVector(mouseOffsetA)[0],
                            graph.scaleVector(mouseOffsetZ)[0],
                        );
                        const offsetTop = Math.max(
                            graph.scaleVector(mouseOffsetA)[1],
                            graph.scaleVector(mouseOffsetZ)[1],
                        );
                        const offsetBottom = -Math.min(
                            graph.scaleVector(mouseOffsetA)[1],
                            graph.scaleVector(mouseOffsetZ)[1],
                        );

                        $(document).bind(
                            "vmousemove.lineSegment vmouseup.lineSegment",
                            function (event) {
                                event.preventDefault();
                                lineSegment.dragging = true;
                                dragging = true;

                                let mouseX =
                                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                    event.pageX -
                                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                    $(graph.raphael.canvas.parentNode).offset()
                                        .left;
                                let mouseY =
                                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                    event.pageY -
                                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                    $(graph.raphael.canvas.parentNode).offset()
                                        .top;
                                // no part of the line segment can go beyond 10
                                // pixels from the edge
                                mouseX = Math.max(
                                    offsetLeft + 10,
                                    Math.min(
                                        graph.xpixels - 10 - offsetRight,
                                        mouseX,
                                    ),
                                );
                                mouseY = Math.max(
                                    offsetTop + 10,
                                    Math.min(
                                        graph.ypixels - 10 - offsetBottom,
                                        mouseY,
                                    ),
                                );

                                let coordX =
                                    mouseX / graph.scale[0] + graph.range[0][0];
                                let coordY =
                                    graph.range[1][1] - mouseY / graph.scale[1];
                                if (lineSegment.snapX > 0) {
                                    coordX =
                                        Math.round(coordX / lineSegment.snapX) *
                                        lineSegment.snapX;
                                }
                                if (lineSegment.snapY > 0) {
                                    coordY =
                                        Math.round(coordY / lineSegment.snapY) *
                                        lineSegment.snapY;
                                }

                                if (event.type === "vmousemove") {
                                    if (lineSegment.constraints.constrainX) {
                                        coordX =
                                            lineSegment.coordA[0] -
                                            mouseOffsetA[0];
                                    }
                                    if (lineSegment.constraints.constrainY) {
                                        coordY =
                                            lineSegment.coordA[1] -
                                            mouseOffsetA[1];
                                    }
                                    const dX =
                                        coordX +
                                        mouseOffsetA[0] -
                                        lineSegment.coordA[0];
                                    const dY =
                                        coordY +
                                        mouseOffsetA[1] -
                                        lineSegment.coordA[1];
                                    lineSegment.coordA = [
                                        coordX + mouseOffsetA[0],
                                        coordY + mouseOffsetA[1],
                                    ];
                                    lineSegment.coordZ = [
                                        coordX + mouseOffsetZ[0],
                                        coordY + mouseOffsetZ[1],
                                    ];
                                    lineSegment.transform();

                                    if (lineSegment.movePointsWithLine) {
                                        // If the points are movablePoints, adjust
                                        // their coordinates when the line itself is
                                        // dragged
                                        if (
                                            typeof lineSegment.pointA ===
                                            "object"
                                        ) {
                                            lineSegment.pointA.setCoord([
                                                lineSegment.pointA.coord[0] +
                                                    dX,
                                                lineSegment.pointA.coord[1] +
                                                    dY,
                                            ]);
                                        }
                                        if (
                                            typeof lineSegment.pointZ ===
                                            "object"
                                        ) {
                                            lineSegment.pointZ.setCoord([
                                                lineSegment.pointZ.coord[0] +
                                                    dX,
                                                lineSegment.pointZ.coord[1] +
                                                    dY,
                                            ]);
                                        }
                                    }

                                    if (_.isFunction(lineSegment.onMove)) {
                                        lineSegment.onMove(dX, dY);
                                    }
                                } else if (event.type === "vmouseup") {
                                    $(document).unbind(".lineSegment");
                                    lineSegment.dragging = false;
                                    dragging = false;
                                    if (!lineSegment.highlight) {
                                        lineSegment.visibleLine.animate(
                                            lineSegment.normalStyle,
                                            50,
                                        );
                                        lineSegment.arrowStyle = _.extend(
                                            {},
                                            lineSegment.arrowStyle,
                                            {
                                                color: lineSegment.normalStyle
                                                    .stroke,
                                                stroke: lineSegment.normalStyle
                                                    .stroke,
                                            },
                                        );
                                        lineSegment.transform();
                                    }
                                    if (_.isFunction(lineSegment.onMoveEnd)) {
                                        lineSegment.onMoveEnd();
                                    }
                                }

                                $(lineSegment).trigger("move");
                            },
                        );
                    }
                },
            );
        }

        if (lineSegment.pointA !== undefined) {
            lineSegment.pointA.toFront();
        }
        if (lineSegment.pointZ !== undefined) {
            lineSegment.pointZ.toFront();
        }
        lineSegment.transform();
        return lineSegment;
    },

    // MovablePolygon is a polygon that can be dragged around the screen.
    // By attaching a smartPoint to each vertex, the points can be
    // manipulated individually.
    //
    // To use with smartPoints, add the smartPoints first, then:
    //   addMovablePolygon({points: [...]});
    //
    // Include "fixed: true" in the options if you don't want the entire
    // polygon to be draggable (you can still use points to make the
    // vertices draggable)
    //
    // The returned object includes the following properties/methods:
    //
    //   - polygon.points
    //         The polygon's dynamic smartPoints and static coordinates, mixed.
    //
    //   - polygon.coords
    //         The polygon's current coordinates (generated, don't edit).
    //
    //   - polygon.transform()
    //         Repositions the polygon. Call after changing any points.
    //
    addMovablePolygon: function (options) {
        const graphie = this;

        const polygon = $.extend(
            {
                snapX: 0,
                snapY: 0,
                fixed: false,
                constrainToGraph: true,
                normalStyle: {},
                highlightStyle: {
                    stroke: KhanColors.INTERACTING,
                    "stroke-width": 2,
                    fill: KhanColors.INTERACTING,
                    "fill-opacity": 0.05,
                },
                pointHighlightStyle: {
                    fill: KhanColors.INTERACTING,
                    stroke: KhanColors.INTERACTING,
                },
                labelStyle: {
                    stroke: KhanColors.DYNAMIC,
                    "stroke-width": 1,
                    color: KhanColors.DYNAMIC,
                },
                angleLabels: [],
                showRightAngleMarkers: [],
                sideLabels: [],
                vertexLabels: [],
                numArcs: [],
                numArrows: [],
                numTicks: [],
                updateOnPointMove: true,
                closed: true,
            },
            _.omit(options, "points"),
        );

        const normalColor = polygon.fixed
            ? KhanColors.DYNAMIC
            : KhanColors.INTERACTIVE;
        polygon.normalStyle = _.extend(
            {
                "stroke-width": 2,
                "fill-opacity": 0,
                fill: normalColor,
                stroke: normalColor,
            },
            options.normalStyle,
        );

        // don't deep copy the points array with $.extend;
        // we may want to append to it later for click-to-add-points
        polygon.points = options.points;

        const isPoint = function (coordOrPoint: any) {
            return !_.isArray(coordOrPoint);
        };

        polygon.update = function () {
            const n = polygon.points.length;

            // Update coords
            polygon.coords = _.map(polygon.points, function (coordOrPoint, i) {
                if (isPoint(coordOrPoint)) {
                    return coordOrPoint.coord;
                }
                return coordOrPoint;
            });

            // Calculate bounding box
            polygon.left = _.min(_.pluck(polygon.coords, 0));
            polygon.right = _.max(_.pluck(polygon.coords, 0));
            polygon.top = _.max(_.pluck(polygon.coords, 1));
            polygon.bottom = _.min(_.pluck(polygon.coords, 1));

            let scaledCoords = _.map(polygon.coords, function (coord) {
                return graphie.scalePoint(coord);
            });

            // Create path
            if (polygon.closed) {
                scaledCoords.push(true);
            } else {
                // For open polygons, concatenate a reverse of the path,
                // to remove the inside area of the path, which would
                // otherwise be clickable (even if the closing line segment
                // wasn't drawn
                scaledCoords = scaledCoords.concat(
                    _.clone(scaledCoords).reverse(),
                );
            }
            polygon.path = GraphUtils.unscaledSvgPath(scaledCoords);

            // Temporary objects
            _.invoke(polygon.temp, "remove");
            polygon.temp = [];

            const isClockwise = clockwise(polygon.coords);

            // Update angle labels
            if (
                polygon.angleLabels.length ||
                polygon.showRightAngleMarkers.length
            ) {
                _.each(polygon.labeledAngles, function (label, i) {
                    polygon.temp.push(
                        graphie.labelAngle({
                            point1: polygon.coords[(i - 1 + n) % n],
                            vertex: polygon.coords[i],
                            point3: polygon.coords[(i + 1) % n],
                            label: label,
                            text: polygon.angleLabels[i],
                            showRightAngleMarker:
                                polygon.showRightAngleMarkers[i],
                            numArcs: polygon.numArcs[i],
                            clockwise: isClockwise,
                            style: polygon.labelStyle,
                        }),
                    );
                });
            }

            // Update side labels
            if (polygon.sideLabels.length) {
                _.each(polygon.labeledSides, function (label, i) {
                    polygon.temp.push(
                        graphie.labelSide({
                            point1: polygon.coords[i],
                            point2: polygon.coords[(i + 1) % n],
                            label: label,
                            text: polygon.sideLabels[i],
                            numArrows: polygon.numArrows[i],
                            numTicks: polygon.numTicks[i],
                            clockwise: isClockwise,
                            style: polygon.labelStyle,
                        }),
                    );
                });
            }

            // Update vertex labels
            if (polygon.vertexLabels.length) {
                _.each(polygon.labeledVertices, function (label, i) {
                    graphie.labelVertex({
                        point1: polygon.coords[(i - 1 + n) % n],
                        vertex: polygon.coords[i],
                        point3: polygon.coords[(i + 1) % n],
                        label: label,
                        text: polygon.vertexLabels[i],
                        clockwise: isClockwise,
                        style: polygon.labelStyle,
                    });
                });
            }

            polygon.temp = _.flatten(polygon.temp);
        };

        polygon.transform = function () {
            polygon.update();

            polygon.visibleShape.attr({path: polygon.path});

            if (!polygon.fixed) {
                polygon.mouseTarget.attr({path: polygon.path});
            }
        };

        polygon.remove = function () {
            polygon.visibleShape.remove();

            if (!polygon.fixed) {
                polygon.mouseTarget.remove();
            }

            if (polygon.labeledAngles) {
                _.invoke(polygon.labeledAngles, "remove");
            }

            if (polygon.labeledSides) {
                _.invoke(polygon.labeledSides, "remove");
            }

            if (polygon.labeledVertices) {
                _.invoke(polygon.labeledVertices, "remove");
            }

            if (polygon.temp.length) {
                _.invoke(polygon.temp, "remove");
            }
        };

        polygon.toBack = function () {
            if (!polygon.fixed) {
                polygon.mouseTarget.toBack();
            }

            polygon.visibleShape.toBack();
        };

        polygon.toFront = function () {
            if (!polygon.fixed) {
                polygon.mouseTarget.toFront();
            }

            polygon.visibleShape.toFront();
        };

        // Setup

        if (polygon.updateOnPointMove) {
            _.each(_.filter(polygon.points, isPoint), function (coordOrPoint) {
                coordOrPoint.polygonVertices.push(polygon);
            });
        }

        polygon.coords = new Array(polygon.points.length);

        if (polygon.angleLabels.length) {
            const numLabels = Math.max(
                polygon.angleLabels.length,
                polygon.showRightAngleMarkers.length,
            );
            polygon.labeledAngles = _.times(
                numLabels,
                function () {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    return this.label([0, 0], "", "center", polygon.labelStyle);
                },
                this,
            );
        }

        if (polygon.sideLabels.length) {
            polygon.labeledSides = _.map(
                polygon.sideLabels,
                function (label) {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    return this.label([0, 0], "", "center", polygon.labelStyle);
                },
                this,
            );
        }

        if (polygon.vertexLabels.length) {
            polygon.labeledVertices = _.map(
                polygon.vertexLabels,
                function (label) {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    return this.label([0, 0], "", "center", polygon.labelStyle);
                },
                this,
            );
        }

        polygon.update();

        polygon.visibleShape = graphie.raphael.path(polygon.path);
        polygon.visibleShape.attr(polygon.normalStyle);

        if (!polygon.fixed) {
            polygon.mouseTarget = graphie.mouselayer.path(polygon.path);
            polygon.mouseTarget.attr({
                fill: "#000",
                opacity: 0,
                cursor: "move",
            });

            $(polygon.mouseTarget[0]).bind(
                "vmousedown vmouseover vmouseout",
                function (event) {
                    if (event.type === "vmouseover") {
                        if (!dragging || polygon.dragging) {
                            polygon.highlight = true;
                            polygon.visibleShape.animate(
                                polygon.highlightStyle,
                                50,
                            );
                            _.each(
                                _.filter(polygon.points, isPoint),
                                function (point) {
                                    point.visibleShape.animate(
                                        polygon.pointHighlightStyle,
                                        50,
                                    );
                                },
                            );
                        }
                    } else if (event.type === "vmouseout") {
                        polygon.highlight = false;
                        if (!polygon.dragging) {
                            polygon.visibleShape.animate(
                                polygon.normalStyle,
                                50,
                            );
                            const points = _.filter(polygon.points, isPoint);
                            if (!_.any(_.pluck(points, "dragging"))) {
                                _.each(points, function (point) {
                                    point.visibleShape.animate(
                                        point.normalStyle,
                                        50,
                                    );
                                });
                            }
                        }
                    } else if (
                        event.type === "vmousedown" &&
                        (event.which === 1 || event.which === 0)
                    ) {
                        event.preventDefault();

                        _.each(
                            _.filter(polygon.points, isPoint),
                            function (point) {
                                point.dragging = true;
                            },
                        );

                        let startX =
                            // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                            (event.pageX -
                                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                $(graphie.raphael.canvas.parentNode).offset()
                                    .left) /
                                graphie.scale[0] +
                            graphie.range[0][0];
                        let startY =
                            graphie.range[1][1] -
                            // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                            (event.pageY -
                                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                $(graphie.raphael.canvas.parentNode).offset()
                                    .top) /
                                graphie.scale[1];
                        if (polygon.snapX > 0) {
                            startX =
                                Math.round(startX / polygon.snapX) *
                                polygon.snapX;
                        }
                        if (polygon.snapY > 0) {
                            startY =
                                Math.round(startY / polygon.snapY) *
                                polygon.snapY;
                        }
                        let lastX = startX;
                        let lastY = startY;

                        const polygonCoords = polygon.coords.slice();

                        const offsetLeft =
                            (startX - polygon.left) * graphie.scale[0];
                        const offsetRight =
                            (polygon.right - startX) * graphie.scale[0];
                        const offsetTop =
                            (polygon.top - startY) * graphie.scale[1];
                        const offsetBottom =
                            (startY - polygon.bottom) * graphie.scale[1];

                        $(document).bind(
                            "vmousemove.polygon vmouseup.polygon",
                            function (event) {
                                event.preventDefault();

                                polygon.dragging = true;
                                dragging = true;

                                let mouseX =
                                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                    event.pageX -
                                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                    $(
                                        graphie.raphael.canvas.parentNode,
                                    ).offset().left;
                                let mouseY =
                                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                    event.pageY -
                                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                                    $(
                                        graphie.raphael.canvas.parentNode,
                                    ).offset().top;

                                // no part of the polygon can go beyond 10 pixels from
                                // the edge
                                if (polygon.constrainToGraph) {
                                    mouseX = Math.max(
                                        offsetLeft + 10,
                                        Math.min(
                                            graphie.xpixels - 10 - offsetRight,
                                            mouseX,
                                        ),
                                    );
                                    mouseY = Math.max(
                                        offsetTop + 10,
                                        Math.min(
                                            graphie.ypixels - 10 - offsetBottom,
                                            mouseY,
                                        ),
                                    );
                                }

                                let currentX =
                                    mouseX / graphie.scale[0] +
                                    graphie.range[0][0];
                                let currentY =
                                    graphie.range[1][1] -
                                    mouseY / graphie.scale[1];
                                if (polygon.snapX > 0) {
                                    currentX =
                                        Math.round(currentX / polygon.snapX) *
                                        polygon.snapX;
                                }
                                if (polygon.snapY > 0) {
                                    currentY =
                                        Math.round(currentY / polygon.snapY) *
                                        polygon.snapY;
                                }

                                if (event.type === "vmousemove") {
                                    let dX = currentX - startX;
                                    let dY = currentY - startY;

                                    let doMove = true;
                                    if (_.isFunction(polygon.onMove)) {
                                        const onMoveResult = polygon.onMove(
                                            dX,
                                            dY,
                                        );
                                        if (onMoveResult === false) {
                                            doMove = false;
                                        } else if (_.isArray(onMoveResult)) {
                                            dX = onMoveResult[0];
                                            dY = onMoveResult[1];
                                            currentX = startX + dX;
                                            currentY = startY + dY;
                                        }
                                    }

                                    const increment = function (i: any) {
                                        return [
                                            polygonCoords[i][0] + dX,
                                            polygonCoords[i][1] + dY,
                                        ];
                                    };

                                    if (doMove) {
                                        _.each(
                                            polygon.points,
                                            function (coordOrPoint, i) {
                                                if (isPoint(coordOrPoint)) {
                                                    coordOrPoint.setCoord(
                                                        increment(i),
                                                    );
                                                } else {
                                                    polygon.points[i] =
                                                        increment(i);
                                                }
                                            },
                                        );

                                        polygon.transform();

                                        $(polygon).trigger("move");

                                        lastX = currentX;
                                        lastY = currentY;
                                    }
                                } else if (event.type === "vmouseup") {
                                    $(document).unbind(".polygon");

                                    const points = _.filter(
                                        polygon.points,
                                        isPoint,
                                    );
                                    _.each(points, function (point) {
                                        point.dragging = false;
                                    });

                                    polygon.dragging = false;
                                    dragging = false;
                                    if (!polygon.highlight) {
                                        polygon.visibleShape.animate(
                                            polygon.normalStyle,
                                            50,
                                        );

                                        _.each(points, function (point) {
                                            point.visibleShape.animate(
                                                point.normalStyle,
                                                50,
                                            );
                                        });
                                    }
                                    if (_.isFunction(polygon.onMoveEnd)) {
                                        polygon.onMoveEnd(
                                            lastX - startX,
                                            lastY - startY,
                                        );
                                    }
                                }
                            },
                        );
                    }
                },
            );
        }

        // Bring any movable points to the front
        _.invoke(_.filter(polygon.points, isPoint), "toFront");

        return polygon;
    },

    /**
     * Constrain a point to be within the graph (including padding).
     * If outside graph, point's x and y coordinates are clamped within
     * the graph.
     */
    constrainToBounds: function (point, padding) {
        const lower = this.unscalePoint([padding, this.ypixels - padding]);
        const upper = this.unscalePoint([this.xpixels - padding, padding]);
        const coordX = Math.max(lower[0], Math.min(upper[0], point[0]));
        const coordY = Math.max(lower[1], Math.min(upper[1], point[1]));
        return [coordX, coordY];
    },

    /**
     * Constrain a point to be within the graph (including padding).
     * If outside graph, point is moved along the ray specified by angle
     * until inside graph.
     */
    constrainToBoundsOnAngle: function (point, padding, angle) {
        const lower = this.unscalePoint([padding, this.ypixels - padding]);
        const upper = this.unscalePoint([this.xpixels - padding, padding]);

        let result = point.slice();

        if (result[0] < lower[0]) {
            result = [
                lower[0],
                result[1] + (lower[0] - result[0]) * Math.tan(angle),
            ];
        } else if (result[0] > upper[0]) {
            result = [
                upper[0],
                result[1] - (result[0] - upper[0]) * Math.tan(angle),
            ];
        }

        if (result[1] < lower[1]) {
            result = [
                result[0] + (lower[1] - result[1]) / Math.tan(angle),
                lower[1],
            ];
        } else if (result[1] > upper[1]) {
            result = [
                result[0] - (result[1] - upper[1]) / Math.tan(angle),
                upper[1],
            ];
        }

        return result;
    },

    // MovableAngle is an angle that can be dragged around the screen.
    // By attaching a smartPoint to the vertex and ray control points, the
    // rays can be manipulated individually.
    //
    // Use only with smartPoints; add the smartPoints first, then:
    //   addMovableAngle({points: [...]});
    //
    // The rays can be controlled to snap on degrees (more useful than snapping
    // on coordinates) by setting snapDegrees to a positive integer.
    //
    // The returned object includes the following properties/methods:
    //
    //   - movableAngle.points
    //         The movableAngle's dynamic smartPoints.
    //
    //   - movableAngle.coords
    //         The movableAngle's current coordinates (generated, don't edit).
    //
    addMovableAngle: function (options) {
        return new MovableAngle(this, options);
    },

    // center: movable point
    // radius: int
    // circ: graphie circle
    // perim: invisible mouse target for dragging/changing radius
    addCircleGraph: function (options) {
        const graphie = this;
        const circle = $.extend(
            {
                center: [0, 0],
                radius: 2,
                snapX: 0.5,
                snapY: 0.5,
                snapRadius: 0.5,
                minRadius: 1,
                centerConstraints: {},
                centerNormalStyle: {},
                centerHighlightStyle: {
                    stroke: KhanColors.INTERACTING,
                    fill: KhanColors.INTERACTING,
                },
                circleNormalStyle: {
                    stroke: KhanColors.INTERACTIVE,
                    "fill-opacity": 0,
                },
                circleHighlightStyle: {
                    stroke: KhanColors.INTERACTING,
                    fill: KhanColors.INTERACTING,
                    "fill-opacity": 0.05,
                },
            },
            options,
        );

        const normalColor = circle.centerConstraints.fixed
            ? KhanColors.DYNAMIC
            : KhanColors.INTERACTIVE;
        const centerNormalStyle = options ? options.centerNormalStyle : null;
        circle.centerNormalStyle = _.extend(
            {},
            {
                fill: normalColor,
                stroke: normalColor,
            },
            centerNormalStyle,
        );

        circle.centerPoint = graphie.addMovablePoint({
            graph: graphie,
            coord: circle.center,
            normalStyle: circle.centerNormalStyle,
            snapX: circle.snapX,
            snapY: circle.snapY,
            constraints: circle.centerConstraints,
        });
        circle.circ = graphie.circle(
            circle.center,
            circle.radius,
            circle.circleNormalStyle,
        );
        circle.perim = graphie.mouselayer
            .circle(
                graphie.scalePoint(circle.center)[0],
                graphie.scalePoint(circle.center)[1],
                graphie.scaleVector(circle.radius)[0],
            )
            .attr({
                "stroke-width": 20,
                opacity: 0.002, // This is as close to 0 as MSIE will allow
            });

        // Highlight circle circumference on center point hover
        if (!circle.centerConstraints.fixed) {
            $(circle.centerPoint.mouseTarget.getMouseTarget()).on(
                "vmouseover vmouseout",
                function (event) {
                    if (
                        circle.centerPoint.highlight ||
                        circle.centerPoint.dragging
                    ) {
                        circle.circ.animate(circle.circleHighlightStyle, 50);
                    } else {
                        circle.circ.animate(circle.circleNormalStyle, 50);
                    }
                },
            );
        }

        circle.toFront = function () {
            circle.circ.toFront();
            circle.perim.toFront();
            circle.centerPoint.visibleShape.toFront();
            if (!circle.centerConstraints.fixed) {
                circle.centerPoint.mouseTarget.toFront();
            }
        };

        circle.centerPoint.onMove = function (x: any, y: any) {
            circle.toFront();
            circle.circ.attr({
                cx: graphie.scalePoint(x)[0],
                cy: graphie.scalePoint(y)[1],
            });
            circle.perim.attr({
                cx: graphie.scalePoint(x)[0],
                cy: graphie.scalePoint(y)[1],
            });
            if (circle.onMove) {
                circle.onMove(x, y);
            }
        };

        $(circle.centerPoint).on("move", function () {
            circle.center = this.coord;
            $(circle).trigger("move");
        });

        // circle.setCenter(x, y) moves the circle to the specified
        // x, y coordinate as if the user had dragged it there.
        circle.setCenter = function (x: any, y: any) {
            circle.centerPoint.setCoord([x, y]);
            circle.centerPoint.onMove(x, y);
            circle.center = [x, y];
        };

        // circle.setRadius(r) sets the circle's radius to the specified
        // value as if the user had dragged it there.
        circle.setRadius = function (r: any) {
            circle.radius = r;

            circle.perim.attr({
                r: graphie.scaleVector(r)[0],
            });
            circle.circ.attr({
                rx: graphie.scaleVector(r)[0],
                ry: graphie.scaleVector(r)[1],
            });
        };

        circle.remove = function () {
            circle.centerPoint.remove();
            circle.circ.remove();
            circle.perim.remove();
        };

        // Define a set of axes using polar coordinates to specify
        // which resizing cursor we want to show based on where the
        // mouse position lies in relation to the circle's center.
        // The first two columns in cursorAxes refer to the minimum
        // and maximum angle values bounding a circle sector, and
        // the third column refers to the cursor name that will be
        // applied if the mouse position falls inside the given sector.
        const cursorAxes: Array<[number, number, string]> = [
            [Math.PI * -1.0, Math.PI * -0.875, "ew-resize"],
            [Math.PI * -0.875, Math.PI * -0.625, "nesw-resize"],
            [Math.PI * -0.625, Math.PI * -0.375, "ns-resize"],
            [Math.PI * -0.375, Math.PI * -0.125, "nwse-resize"],
            [Math.PI * -0.125, Math.PI * 0.125, "ew-resize"],
            [Math.PI * 0.125, Math.PI * 0.375, "nesw-resize"],
            [Math.PI * 0.375, Math.PI * 0.625, "ns-resize"],
            [Math.PI * 0.625, Math.PI * 0.875, "nwse-resize"],
            [Math.PI * 0.875, Math.PI * 1.0, "ew-resize"],
        ];

        // When the mouse moves along the circle's perimeter, we
        // dynamically set a CSS rule to show the correct
        // bidirectional cursor so a student knows they can resize
        // our circle. To do this, we convert the x and y coordinates
        // of the mouse position into polar coordinates and use the
        // defined cursorAxes above to set our rule.
        $(circle.perim.node).on("vmousemove", (event) => {
            let [x, y] = this.getMouseCoord(event);

            x -= circle.center[0];
            y -= circle.center[1];

            const theta = Math.atan2(y, x);

            cursorAxes.forEach(function (axes) {
                const [min, max, cursorName] = axes;
                if (theta >= min && theta < max) {
                    $(circle.perim.node).css("cursor", cursorName);
                }
            });
        });

        // Set a default resizing-friendly cursor to be safe.
        $(circle.perim.node).css("cursor", "nesw-resize");

        // Prevent the page from scrolling when we grab and drag the circle on
        // a mobile device.
        circle.perim.node.addEventListener(
            "touchstart",
            function (event) {
                event.preventDefault();
            },
            {passive: false},
        );

        $(circle.perim.node).on(
            "vmouseover vmouseout vmousedown",
            function (event) {
                if (event.type === "vmouseover") {
                    circle.highlight = true;
                    if (!dragging) {
                        // TODO(jack): Figure out why this doesn't work
                        // for circleHighlightStyle's that change
                        // stroke-dasharray
                        circle.circ.animate(circle.circleHighlightStyle, 50);
                        circle.centerPoint.visibleShape.animate(
                            circle.centerHighlightStyle,
                            50,
                        );
                    }
                } else if (event.type === "vmouseout") {
                    circle.highlight = false;
                    if (!circle.dragging && !circle.centerPoint.dragging) {
                        circle.circ.animate(circle.circleNormalStyle, 50);
                        circle.centerPoint.visibleShape.animate(
                            circle.centerNormalStyle,
                            50,
                        );
                    }
                } else if (
                    event.type === "vmousedown" &&
                    (event.which === 1 || event.which === 0)
                ) {
                    event.preventDefault();
                    circle.toFront();
                    const startRadius = circle.radius;

                    $(document).on("vmousemove vmouseup", function (event) {
                        event.preventDefault();
                        circle.dragging = true;
                        dragging = true;

                        if (event.type === "vmousemove") {
                            const coord = graphie.constrainToBounds(
                                graphie.getMouseCoord(event),
                                10,
                            );

                            let radius = GraphUtils.getDistance(
                                circle.centerPoint.coord,
                                coord,
                            );
                            radius = Math.max(
                                circle.minRadius,
                                Math.round(radius / circle.snapRadius) *
                                    circle.snapRadius,
                            );
                            const oldRadius = circle.radius;
                            let doResize = true;
                            if (circle.onResize) {
                                const onResizeResult = circle.onResize(
                                    radius,
                                    oldRadius,
                                );
                                if (_.isNumber(onResizeResult)) {
                                    radius = onResizeResult;
                                } else if (onResizeResult === false) {
                                    doResize = false;
                                }
                            }
                            if (doResize) {
                                circle.setRadius(radius);
                                $(circle).trigger("move");
                            }
                        } else if (event.type === "vmouseup") {
                            $(document).off("vmousemove vmouseup");
                            circle.dragging = false;
                            dragging = false;
                            if (circle.onResizeEnd) {
                                circle.onResizeEnd(circle.radius, startRadius);
                            }
                        }
                    });
                }
            },
        );

        return circle;
    },

    addRotateHandle: (function () {
        const drawRotateHandle = function (
            graphie,
            center: any,
            radius,
            halfWidth,
            lengthAngle,
            angle,
            interacting,
        ) {
            const getRotateHandlePoint = function (
                offset: number,
                distanceFromArrowMidline,
            ) {
                const distFromRotationCenter =
                    radius + distanceFromArrowMidline;
                const vec = kvector.cartFromPolarDeg(
                    distFromRotationCenter,
                    angle + offset,
                );
                const absolute = kvector.add(center, vec);
                const pixels = graphie.scalePoint(absolute);
                return pixels[0] + "," + pixels[1];
            };

            const innerR = graphie.scaleVector(radius - halfWidth);
            const outerR = graphie.scaleVector(radius + halfWidth);

            // Draw the double-headed arrow thing that shows users where to
            // click and drag to rotate
            return graphie.raphael
                .path(
                    // upper arrowhead
                    " M" +
                        getRotateHandlePoint(lengthAngle, -halfWidth) +
                        " L" +
                        getRotateHandlePoint(lengthAngle, -3 * halfWidth) +
                        " L" +
                        getRotateHandlePoint(2 * lengthAngle, 0) +
                        " L" +
                        getRotateHandlePoint(lengthAngle, 3 * halfWidth) +
                        " L" +
                        getRotateHandlePoint(lengthAngle, halfWidth) +
                        // outer arc
                        " A" +
                        outerR[0] +
                        "," +
                        outerR[1] +
                        ",0,0,1," +
                        getRotateHandlePoint(-lengthAngle, halfWidth) +
                        // lower arrowhead
                        " L" +
                        getRotateHandlePoint(-lengthAngle, 3 * halfWidth) +
                        " L" +
                        getRotateHandlePoint(-2 * lengthAngle, 0) +
                        " L" +
                        getRotateHandlePoint(-lengthAngle, -3 * halfWidth) +
                        " L" +
                        getRotateHandlePoint(-lengthAngle, -halfWidth) +
                        // inner arc
                        " A" +
                        innerR[0] +
                        "," +
                        innerR[1] +
                        ",0,0,0," +
                        getRotateHandlePoint(lengthAngle, -halfWidth) +
                        " Z",
                )
                .attr({
                    stroke: null,
                    fill: interacting
                        ? KhanColors.INTERACTING
                        : KhanColors.INTERACTIVE,
                });
        };

        return function (options: any) {
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            const graph = this;

            let rotatePoint = options.center;
            const radius = options.radius;
            const lengthAngle = options.lengthAngle || 30;
            const hideArrow = options.hideArrow || false;
            const mouseTarget = options.mouseTarget;
            const id = _.uniqueId("rotateHandle");

            // Normalize rotatePoint into something that always looks
            // like a movablePoint
            if (_.isArray(rotatePoint)) {
                rotatePoint = {
                    coord: rotatePoint,
                };
            }

            const rotateHandle = graph.addMovablePoint({
                coord: kpoint.addVector(
                    rotatePoint.coord,
                    kvector.cartFromPolarDeg(radius, options.angleDeg || 0),
                ),
                constraints: {
                    fixedDistance: {
                        dist: radius,
                        point: rotatePoint,
                    },
                },
                mouseTarget: mouseTarget,
            });

            // move the rotatePoint in front of the rotateHandle to avoid
            // confusing clicking/scaling of the rotateHandle when the user
            // intends to click on the rotatePoint
            rotatePoint.toFront();

            let rotatePointPrevCoord = rotatePoint.coord;
            let rotateHandlePrevCoord = rotateHandle.coord;
            let rotateHandleStartCoord = rotateHandlePrevCoord;
            let isRotating = false;
            let isHovering = false;
            let drawnRotateHandle;

            const redrawRotateHandle = function (
                handleCoord: Array<never> | ReadonlyArray<number>,
            ) {
                if (hideArrow) {
                    return; // Don't draw anything!
                }

                const handleVec = kvector.subtract(
                    handleCoord,
                    rotatePoint.coord,
                );
                const handlePolar = kvector.polarDegFromCart(handleVec);
                const angle = handlePolar[1];

                if (drawnRotateHandle) {
                    drawnRotateHandle.remove();
                }

                drawnRotateHandle = drawRotateHandle(
                    graph,
                    rotatePoint.coord,
                    options.radius,
                    isRotating || isHovering
                        ? options.hoverWidth / 2
                        : options.width / 2,
                    lengthAngle,
                    angle,
                    isRotating || isHovering,
                );
            };

            // when the rotation center moves, we need to move
            // the rotationHandle as well, or it will end up out
            // of sync
            $(rotatePoint).on("move." + id, function () {
                const delta = kvector.subtract(
                    rotatePoint.coord,
                    rotatePointPrevCoord,
                );

                rotateHandle.setCoord(kvector.add(rotateHandle.coord, delta));

                redrawRotateHandle(rotateHandle.coord);

                rotatePointPrevCoord = rotatePoint.coord;
                rotateHandle.constraints.fixedDistance.point = rotatePoint;
                rotateHandlePrevCoord = rotateHandle.coord;
            });

            // Rotate polygon with rotateHandle
            rotateHandle.onMove = function (x, y) {
                if (!isRotating) {
                    rotateHandleStartCoord = rotateHandlePrevCoord;
                    isRotating = true;
                }

                let coord = [x, y];

                if (options.onMove) {
                    const oldPolar = kvector.polarDegFromCart(
                        kvector.subtract(
                            rotateHandlePrevCoord,
                            rotatePoint.coord,
                        ),
                    );
                    const newPolar = kvector.polarDegFromCart(
                        kvector.subtract(coord, rotatePoint.coord),
                    );

                    const oldAngle = oldPolar[1];
                    const newAngle = newPolar[1];
                    let result = options.onMove(newAngle, oldAngle);
                    if (result != null && result !== true) {
                        if (result === false) {
                            result = oldAngle;
                        }
                        coord = kvector.add(
                            rotatePoint.coord,
                            kvector.cartFromPolarDeg(oldPolar[0], result),
                        );
                    }
                }

                redrawRotateHandle(coord);

                rotateHandlePrevCoord = coord;
                return coord;
            };

            rotateHandle.onMoveEnd = function () {
                isRotating = false;
                redrawRotateHandle(rotateHandle.coord);
                if (options.onMoveEnd) {
                    const oldPolar = kvector.polarDegFromCart(
                        kvector.subtract(
                            rotateHandleStartCoord,
                            rotatePoint.coord,
                        ),
                    );
                    const newPolar = kvector.polarDegFromCart(
                        kvector.subtract(rotateHandle.coord, rotatePoint.coord),
                    );
                    options.onMoveEnd(newPolar[1], oldPolar[1]);
                }
            };

            // Remove the default dot added by the movablePoint since we have
            // our double-arrow thing
            rotateHandle.visibleShape.remove();

            if (!mouseTarget) {
                // Make the default mouse target bigger to encompass the whole
                // area around the double-arrow thing
                rotateHandle.mouseTarget.attr({scale: 2});
            }

            const $mouseTarget = $(rotateHandle.mouseTarget.getMouseTarget());
            $mouseTarget.bind("vmouseover", function (e) {
                isHovering = true;
                redrawRotateHandle(rotateHandle.coord);
            });
            $mouseTarget.bind("vmouseout", function (e) {
                isHovering = false;
                redrawRotateHandle(rotateHandle.coord);
            });

            redrawRotateHandle(rotateHandle.coord);

            const oldRemove = rotateHandle.remove;
            rotateHandle.remove = function () {
                oldRemove.call(rotateHandle);
                if (drawnRotateHandle) {
                    drawnRotateHandle.remove();
                }
                $(rotatePoint).off("move." + id);
            };

            rotateHandle.update = function () {
                redrawRotateHandle(rotateHandle.coord);
            };

            return rotateHandle;
        };
    })(),

    addReflectButton: (function () {
        const drawButton = function (
            graphie,
            buttonCoord: kpoint.Point,
            lineCoords: Array<any> | Array<never> | Array<any | Array<number>>,
            size: number,
            distanceFromCenter: number,
            leftStyle: any,
            rightStyle: any,
        ) {
            // Avoid invalid lines
            if (kpoint.equal(lineCoords[0], lineCoords[1])) {
                lineCoords = [
                    lineCoords[0],
                    kpoint.addVector(lineCoords[0], [1, 1]),
                ];
            }

            const lineDirection = kvector.normalize(
                kvector.subtract(lineCoords[1], lineCoords[0]),
            );

            const lineVec = kvector.scale(lineDirection, size / 2);

            const centerVec = kvector.scale(lineDirection, distanceFromCenter);
            const leftCenterVec = kvector.rotateDeg(centerVec, 90);
            const rightCenterVec = kvector.rotateDeg(centerVec, -90);

            const negLineVec = kvector.negate(lineVec);
            const leftVec = kvector.rotateDeg(lineVec, 90);
            const rightVec = kvector.rotateDeg(lineVec, -90);

            const leftCenter = kpoint.addVectors(buttonCoord, leftCenterVec);
            const rightCenter = kpoint.addVectors(buttonCoord, rightCenterVec);

            const leftCoord1 = kpoint.addVectors(
                buttonCoord,
                leftCenterVec,
                lineVec,
                leftVec,
            );
            const leftCoord2 = kpoint.addVectors(
                buttonCoord,
                leftCenterVec,
                negLineVec,
                leftVec,
            );
            const rightCoord1 = kpoint.addVectors(
                buttonCoord,
                rightCenterVec,
                lineVec,
                rightVec,
            );
            const rightCoord2 = kpoint.addVectors(
                buttonCoord,
                rightCenterVec,
                negLineVec,
                rightVec,
            );

            const leftButton = graphie.path(
                [leftCenter, leftCoord1, leftCoord2, true],
                leftStyle,
            );
            const rightButton = graphie.path(
                [rightCenter, rightCoord1, rightCoord2, true],
                rightStyle,
            );

            return {
                remove: function () {
                    leftButton.remove();
                    rightButton.remove();
                },
            };
        };

        return function (options: any) {
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            const graphie = this;

            const line = options.line;

            const button = graphie.addMovablePoint({
                constraints: options.constraints,
                coord: kline.midpoint([line.pointA.coord, line.pointZ.coord]),
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
                onMove: function (x, y) {
                    // Don't allow the button to actually move. This is a hack
                    // around the inability to both set a point as fixed AND
                    // allow it to be clicked.
                    return false;
                },
                onMoveEnd: function (x, y) {
                    if (options.onMoveEnd) {
                        options.onMoveEnd.call(this, x, y);
                    }
                },
            });

            let isHovering = false;
            let isFlipped = false;
            let currentlyDrawnButton;

            const isHighlight = function () {
                return isHovering;
            };

            const styles = _.map([0, 1], function (isHighlight) {
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                const baseStyle = isHighlight
                    ? options.highlightStyle
                    : options.normalStyle;

                return _.map([0, 1], function (opacity) {
                    return _.defaults(
                        {
                            "fill-opacity": opacity,
                        },
                        baseStyle,
                    );
                });
            });

            const getStyle = function (isRight: number | boolean) {
                if (isFlipped) {
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    isRight = !isRight;
                }
                return styles[+isHighlight()][+isRight];
            };

            const redraw = function (
                coord: kpoint.Point,
                lineCoords: Array<any> | Array<never>,
            ) {
                if (currentlyDrawnButton) {
                    currentlyDrawnButton.remove();
                }
                currentlyDrawnButton = drawButton(
                    graphie,
                    coord,
                    lineCoords,
                    isHighlight() ? options.size * 1.5 : options.size,
                    isHighlight() ? options.size * 0.125 : 0.25,
                    getStyle(0),
                    getStyle(1),
                );
            };

            const update = function (coordA, coordZ) {
                coordA = coordA || line.pointA.coord;
                coordZ = coordZ || line.pointZ.coord;

                const buttonCoord = kline.midpoint([coordA, coordZ]);
                button.setCoord(buttonCoord);

                redraw(buttonCoord, [coordA, coordZ]);
            };

            $(line).on("move", _.bind(update, button, null, null));

            const $mouseTarget = $(button.mouseTarget.getMouseTarget());
            $mouseTarget.on("vclick", function () {
                const result = options.onClick();
                if (result !== false) {
                    isFlipped = !isFlipped;
                    redraw(button.coord, [
                        line.pointA.coord,
                        line.pointZ.coord,
                    ]);
                }
            });

            // Bring the reflection line handles in front of the button, so
            // that if we drag the reflectPoints really close together, we can
            // still move the handles away from each other, rather than only
            // being able to apply the reflection.
            line.pointA.toFront();
            line.pointZ.toFront();

            // Replace the visual point with the double triangle thing
            button.visibleShape.remove();
            const pointScale = graphie.scaleVector(options.size)[0] / 20;
            button.mouseTarget.attr({scale: 1.5 * pointScale});
            $mouseTarget.css("cursor", "pointer");

            // Make the arrow-thing grow and shrink with mouseover/out
            $mouseTarget.bind("vmouseover", function (e) {
                isHovering = true;
                redraw(button.coord, [line.pointA.coord, line.pointZ.coord]);
            });
            $mouseTarget.bind("vmouseout", function (e) {
                isHovering = false;
                redraw(button.coord, [line.pointA.coord, line.pointZ.coord]);
            });

            const oldButtonRemove = button.remove;
            button.remove = function () {
                currentlyDrawnButton.remove();
                oldButtonRemove.call(button);
            };

            button.update = update;
            button.isFlipped = function () {
                return isFlipped;
            };

            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 0.
            update();
            return button;
        };
    })(),

    protractor: function (center) {
        // @ts-expect-error - TS2350 - Only a void function can be called with the 'new' keyword.
        return new Protractor(this, center);
    },

    ruler: function (options) {
        // @ts-expect-error - TS2350 - Only a void function can be called with the 'new' keyword.
        return new Ruler(this, options || {});
    },

    addPoints: kvector.add,
});

function Protractor(graph: any, center: any) {
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.set = graph.raphael.set();

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.cx = center[0];
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.cy = center[1];
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    const pro = this;

    const r = graph.unscaleVector(180.5)[0];
    const imgPos = graph.scalePoint([
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.cx - r,
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.cy + r - graph.unscaleVector(10.5)[1],
    ]);
    const image = graph.mouselayer.image(
        "https://ka-perseus-graphie.s3.amazonaws.com/e9d032f2ab8b95979f674fbfa67056442ba1ff6a.png",
        imgPos[0],
        imgPos[1],
        360,
        180,
    );
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.set.push(image);

    // Prevent the page from scrolling when we grab and drag the image on a
    // mobile device.
    image.node.addEventListener(
        "touchstart",
        function (event) {
            event.preventDefault();
        },
        {passive: false},
    );

    const arrowHelper = function (angle: number, pixelsFromEdge: number) {
        const scaledRadius = graph.scaleVector(r);
        scaledRadius[0] -= 16;
        scaledRadius[1] -= 16;
        const scaledCenter = graph.scalePoint(center);
        const x =
            Math.sin(((angle + 90) * Math.PI) / 180) *
                (scaledRadius[0] + pixelsFromEdge) +
            scaledCenter[0];
        const y =
            Math.cos(((angle + 90) * Math.PI) / 180) *
                (scaledRadius[1] + pixelsFromEdge) +
            scaledCenter[1];
        return x + "," + y;
    };

    const arrow = graph.raphael
        .path(
            " M" +
                arrowHelper(180, 6) +
                " L" +
                arrowHelper(180, 2) +
                " L" +
                arrowHelper(183, 10) +
                " L" +
                arrowHelper(180, 18) +
                " L" +
                arrowHelper(180, 14) +
                " A" +
                (graph.scaleVector(r)[0] + 10) +
                "," +
                (graph.scaleVector(r)[1] + 10) +
                ",0,0,1," +
                arrowHelper(170, 14) +
                " L" +
                arrowHelper(170, 18) +
                " L" +
                arrowHelper(167, 10) +
                " L" +
                arrowHelper(170, 2) +
                " L" +
                arrowHelper(170, 6) +
                " A" +
                (graph.scaleVector(r)[0] + 10) +
                "," +
                (graph.scaleVector(r)[1] + 10) +
                ",0,0,0," +
                arrowHelper(180, 6) +
                " Z",
        )
        .attr({
            stroke: null,
            fill: KhanColors.INTERACTIVE,
        });

    // add it to the set so it translates with everything else
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.set.push(arrow);

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.centerPoint = graph.addMovablePoint({
        coord: center,
        visible: false,
    });

    // Use a movablePoint for rotation
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.rotateHandle = graph.addMovablePoint({
        bounded: false,
        coord: [
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            Math.sin((275 * Math.PI) / 180) * r + this.cx,
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            Math.cos((275 * Math.PI) / 180) * r + this.cy,
        ],
        onMove: function (x, y) {
            const angle =
                (Math.atan2(
                    pro.centerPoint.coord[1] - y,
                    pro.centerPoint.coord[0] - x,
                ) *
                    180) /
                Math.PI;
            pro.rotate(-angle - 5, true);
        },
    });

    // Add a constraint so the point moves in a circle
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.rotateHandle.constraints.fixedDistance.dist = r;
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.rotateHandle.constraints.fixedDistance.point = this.centerPoint;

    // Remove the default dot added by the movablePoint since we have our
    // double-arrow thing
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.rotateHandle.visibleShape.remove();
    // Make the mouse target bigger to encompass the whole area around the
    // double-arrow thing
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.rotateHandle.mouseTarget.attr({scale: 2.0});

    let isDragging = false;
    let isHovering = false;
    const isHighlight = function () {
        return isHovering || isDragging;
    };

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    const self = this;
    const $mouseTarget = $(self.rotateHandle.mouseTarget.getMouseTarget());
    $mouseTarget.bind("vmousedown", function (event) {
        isDragging = true;
        $mouseTarget.css("cursor", "-webkit-grabbing");
        $mouseTarget.css("cursor", "grabbing");
        arrow.animate({scale: 1.5, fill: KhanColors.INTERACTING}, 50);

        $(document).bind("vmouseup.rotateHandle", function (event) {
            isDragging = false;
            $mouseTarget.css("cursor", "-webkit-grab");
            $mouseTarget.css("cursor", "grab");

            if (!isHighlight()) {
                arrow.animate({scale: 1.0, fill: KhanColors.INTERACTIVE}, 50);
            }

            $(document).unbind("vmouseup.rotateHandle");
        });
    });

    $mouseTarget.bind("vmouseover", function (event) {
        isHovering = true;
        arrow.animate({scale: 1.5, fill: KhanColors.INTERACTING}, 50);
    });
    $mouseTarget.bind("vmouseout", function (event) {
        isHovering = false;
        if (!isHighlight()) {
            arrow.animate({scale: 1.0, fill: KhanColors.INTERACTIVE}, 50);
        }
    });

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    const setNodes = $.map(this.set, function (el) {
        return el.node;
    });
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.makeTranslatable = function makeTranslatable() {
        $(setNodes).css("cursor", "move");
        $mouseTarget.css("cursor", "-webkit-grab");
        $mouseTarget.css("cursor", "grab");

        $(setNodes).bind("vmousedown", function (event) {
            event.preventDefault();
            let startx =
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                event.pageX - $(graph.raphael.canvas.parentNode).offset().left;
            let starty =
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                event.pageY - $(graph.raphael.canvas.parentNode).offset().top;

            $(document).bind("vmousemove.protractor", function (event) {
                let mouseX =
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                    event.pageX -
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                    $(graph.raphael.canvas.parentNode).offset().left;
                let mouseY =
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                    event.pageY -
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                    $(graph.raphael.canvas.parentNode).offset().top;
                // can't go beyond 10 pixels from the edge
                mouseX = Math.max(10, Math.min(graph.xpixels - 10, mouseX));
                mouseY = Math.max(10, Math.min(graph.ypixels - 10, mouseY));

                const dx = mouseX - startx;
                const dy = mouseY - starty;

                $.each(pro.set.items, function () {
                    this.translate(dx, dy);
                });
                pro.centerPoint.setCoord([
                    pro.centerPoint.coord[0] + dx / graph.scale[0],
                    pro.centerPoint.coord[1] - dy / graph.scale[1],
                ]);
                pro.rotateHandle.setCoord([
                    pro.rotateHandle.coord[0] + dx / graph.scale[0],
                    pro.rotateHandle.coord[1] - dy / graph.scale[1],
                ]);
                startx = mouseX;
                starty = mouseY;
            });

            $(document).one("vmouseup", function (event) {
                $(document).unbind("vmousemove.protractor");
            });
        });
    };

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.rotation = 0;

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.rotate = function (offset: any, absolute: any) {
        const center = graph.scalePoint(this.centerPoint.coord);

        if (absolute) {
            this.rotation = 0;
        }

        this.set.rotate(this.rotation + offset, center[0], center[1]);
        this.rotation = this.rotation + offset;

        return this;
    };

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.moveTo = function moveTo(x: any, y: any) {
        const start = graph.scalePoint(pro.centerPoint.coord);
        const end = graph.scalePoint([x, y]);
        const time = GraphUtils.getDistance(start, end) * 2;

        $({x: start[0], y: start[1]}).animate(
            {x: end[0], y: end[1]},
            {
                duration: time,
                step: function (now, fx) {
                    let dx = 0;
                    let dy = 0;
                    if (fx.prop === "x") {
                        dx = now - graph.scalePoint(pro.centerPoint.coord)[0];
                    } else if (fx.prop === "y") {
                        dy = now - graph.scalePoint(pro.centerPoint.coord)[1];
                    }
                    $.each(pro.set.items, function () {
                        this.translate(dx, dy);
                    });
                    pro.centerPoint.setCoord([
                        pro.centerPoint.coord[0] + dx / graph.scale[0],
                        pro.centerPoint.coord[1] - dy / graph.scale[1],
                    ]);
                    pro.rotateHandle.setCoord([
                        pro.rotateHandle.coord[0] + dx / graph.scale[0],
                        pro.rotateHandle.coord[1] - dy / graph.scale[1],
                    ]);
                },
            },
        );
    };

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.rotateTo = function rotateTo(angle: any) {
        if (Math.abs(this.rotation - angle) > 180) {
            this.rotation += 360;
        }
        const time = Math.abs(this.rotation - angle) * 5;
        $({0: this.rotation}).animate(
            {0: angle},
            {
                duration: time,
                step: function (now, fx) {
                    pro.rotate(now, true);
                    pro.rotateHandle.setCoord([
                        Math.sin(((now + 275) * Math.PI) / 180) * r +
                            pro.centerPoint.coord[0],
                        Math.cos(((now + 275) * Math.PI) / 180) * r +
                            pro.centerPoint.coord[1],
                    ]);
                },
            },
        );
    };

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.remove = function () {
        this.set.remove();
    };

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.makeTranslatable();
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    return this;
}

function Ruler(graphie: any, options: any) {
    _.defaults(options, {
        center: [0, 0],
        pixelsPerUnit: 40,
        ticksPerUnit: 10, // 10 or power of 2
        units: 10, // the length the ruler can measure
        label: "", // e.g "cm" (the shorter, the better)
        style: {
            fill: null,
            stroke: KhanColors.GRAY,
        },
    });

    const light = _.extend({}, options.style, {strokeWidth: 1});
    const bold = _.extend({}, options.style, {strokeWidth: 2});

    const width = options.units * options.pixelsPerUnit;
    const height = 50;

    const leftBottom = graphie.unscalePoint(
        kvector.subtract(
            graphie.scalePoint(options.center),
            kvector.scale([width, -height], 0.5),
        ),
    );

    const graphieUnitsPerUnit = options.pixelsPerUnit / graphie.scale[0];
    const graphieUnitsHeight = height / graphie.scale[0];

    const rightTop = kvector.add(leftBottom, [
        options.units * graphieUnitsPerUnit,
        graphieUnitsHeight,
    ]);

    const tickHeight = 1.0;
    let tickHeightMap;

    if (options.ticksPerUnit === 10) {
        // decimal, as on a centimeter ruler
        tickHeightMap = {
            10: tickHeight,
            5: tickHeight * 0.55,
            1: tickHeight * 0.35,
        };
    } else {
        const sizes = [1, 0.6, 0.45, 0.3];

        tickHeightMap = {};
        for (let i = options.ticksPerUnit; i >= 1; i /= 2) {
            tickHeightMap[i] = tickHeight * (sizes.shift() || 0.2);
        }
    }

    const tickFrequencies = _.keys(tickHeightMap).sort(function (a, b) {
        // @ts-expect-error - TS2362 - The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type. | TS2363 - The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
        return b - a;
    });

    function getTickHeight(i: any): number {
        for (let k = 0; k < tickFrequencies.length; k++) {
            const key = tickFrequencies[k];
            // @ts-expect-error - TS2363 - The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
            if (i % key === 0) {
                return tickHeightMap[key];
            }
        }
        return 0;
    }

    const left = leftBottom[0];
    const bottom = leftBottom[1];
    const right = rightTop[0];
    const top = rightTop[1];

    const numTicks = options.units * options.ticksPerUnit + 1;

    const set = graphie.raphael.set();

    const px = 1 / graphie.scale[0];
    set.push(graphie.line([left - px, bottom], [right + px, bottom], bold));
    set.push(graphie.line([left - px, top], [right + px, top], bold));

    _.times(numTicks, function (i) {
        const n = i / options.ticksPerUnit;
        const x = left + n * graphieUnitsPerUnit;
        const height = getTickHeight(i) * graphieUnitsHeight;

        const style = i === 0 || i === numTicks - 1 ? bold : light;
        set.push(graphie.line([x, bottom], [x, bottom + height], style));

        if (n % 1 === 0) {
            const coord = graphie.scalePoint([x, top]);
            let text;
            let offset;

            if (n === 0) {
                // Unit label
                text = options.label;
                offset =
                    {
                        mm: 13,
                        cm: 11,
                        m: 8,
                        km: 11,
                        in: 8,
                        ft: 8,
                        yd: 10,
                        mi: 10,
                    }[text] || 3 * text.toString().length;
            } else {
                // Tick label
                text = n;
                offset = -3 * (n.toString().length + 1);
            }
            const label = graphie.raphael.text(
                coord[0] + offset,
                coord[1] + 10,
                text,
            );
            label.attr({
                "font-family": "KaTeX_Main",
                "font-size": "12px",
                color: "#444",
            });
            set.push(label);
        }
    });

    const mouseTarget = graphie.mouselayer.path(
        graphie.svgPath([
            leftBottom,
            [left, top],
            rightTop,
            [right, bottom],
            /* closed */ true,
        ]),
    );
    mouseTarget.attr({
        fill: "#000",
        opacity: 0,
        stroke: "#000",
        "stroke-width": 2,
    });
    set.push(mouseTarget);

    // Prevent the page from scrolling when we grab and drag the ruler on a
    // mobile device.
    mouseTarget.node.addEventListener(
        "touchstart",
        function (event) {
            event.preventDefault();
        },
        {passive: false},
    );

    const setNodes = $.map(set, function (el) {
        return el.node;
    });
    $(setNodes).css("cursor", "move");

    $(setNodes).bind("vmousedown", function (event) {
        event.preventDefault();
        let startx =
            // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
            event.pageX - $(graphie.raphael.canvas.parentNode).offset().left;
        let starty =
            // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
            event.pageY - $(graphie.raphael.canvas.parentNode).offset().top;

        $(document).bind("vmousemove.ruler", function (event) {
            let mouseX =
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                event.pageX -
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                $(graphie.raphael.canvas.parentNode).offset().left;
            let mouseY =
                // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                event.pageY - $(graphie.raphael.canvas.parentNode).offset().top;
            // can't go beyond 10 pixels from the edge
            mouseX = Math.max(10, Math.min(graphie.xpixels - 10, mouseX));
            mouseY = Math.max(10, Math.min(graphie.ypixels - 10, mouseY));

            const dx = mouseX - startx;
            const dy = mouseY - starty;

            set.translate(dx, dy);
            leftBottomHandle.setCoord([
                leftBottomHandle.coord[0] + dx / graphie.scale[0],
                leftBottomHandle.coord[1] - dy / graphie.scale[1],
            ]);
            rightBottomHandle.setCoord([
                rightBottomHandle.coord[0] + dx / graphie.scale[0],
                rightBottomHandle.coord[1] - dy / graphie.scale[1],
            ]);

            startx = mouseX;
            starty = mouseY;
        });

        $(document).one("vmouseup", function (event) {
            $(document).unbind("vmousemove.ruler");
        });
    });

    const leftBottomHandle = graphie.addMovablePoint({
        coord: leftBottom,
        normalStyle: {
            fill: KhanColors.INTERACTIVE,
            "fill-opacity": 0,
            stroke: KhanColors.INTERACTIVE,
        },
        highlightStyle: {
            fill: KhanColors.INTERACTING,
            "fill-opacity": 0.1,
            stroke: KhanColors.INTERACTING,
        },
        pointSize: 6, // or 8 maybe?
        onMove: function (x, y) {
            const dy = rightBottomHandle.coord[1] - y;
            const dx = rightBottomHandle.coord[0] - x;
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            const center = kvector.scale(
                kvector.add([x, y], rightBottomHandle.coord),
                0.5,
            );
            const scaledCenter = graphie.scalePoint(center);
            const oldCenter = kvector.scale(
                kvector.add(leftBottomHandle.coord, rightBottomHandle.coord),
                0.5,
            );
            const scaledOldCenter = graphie.scalePoint(oldCenter);
            const diff = kvector.subtract(scaledCenter, scaledOldCenter);
            set.rotate(-angle, scaledOldCenter[0], scaledOldCenter[1]);
            set.translate(diff[0], diff[1]);
        },
    });
    const rightBottomHandle = graphie.addMovablePoint({
        coord: [right, bottom],
        normalStyle: {
            fill: KhanColors.INTERACTIVE,
            "fill-opacity": 0,
            stroke: KhanColors.INTERACTIVE,
        },
        highlightStyle: {
            fill: KhanColors.INTERACTING,
            "fill-opacity": 0.1,
            stroke: KhanColors.INTERACTING,
        },
        pointSize: 6, // or 8 maybe?
        onMove: function (x, y) {
            const dy = y - leftBottomHandle.coord[1];
            const dx = x - leftBottomHandle.coord[0];
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            const center = kvector.scale(
                kvector.add([x, y], leftBottomHandle.coord),
                0.5,
            );
            const scaledCenter = graphie.scalePoint(center);
            const oldCenter = kvector.scale(
                kvector.add(leftBottomHandle.coord, rightBottomHandle.coord),
                0.5,
            );
            const scaledOldCenter = graphie.scalePoint(oldCenter);
            const diff = kvector.subtract(scaledCenter, scaledOldCenter);
            set.rotate(-angle, scaledOldCenter[0], scaledOldCenter[1]);
            set.translate(diff[0], diff[1]);
        },
    });

    // Make each handle rotate the ruler about the other one
    leftBottomHandle.constraints.fixedDistance.dist = width / graphie.scale[0];
    leftBottomHandle.constraints.fixedDistance.point = rightBottomHandle;
    rightBottomHandle.constraints.fixedDistance.dist = width / graphie.scale[0];
    rightBottomHandle.constraints.fixedDistance.point = leftBottomHandle;

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.remove = function () {
        set.remove();
        leftBottomHandle.remove();
        rightBottomHandle.remove();
    };

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    return this;
}

function MovableAngle(graphie: any, options: any) {
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.graphie = graphie;

    // TODO(alex): Move standard colors from math.js to somewhere else
    // so that they are available when this file is first parsed
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    _.extend(this, options);
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    _.defaults(this, {
        normalStyle: {
            stroke: KhanColors.INTERACTIVE,
            "stroke-width": 2,
            fill: KhanColors.INTERACTIVE,
        },
        highlightStyle: {
            stroke: KhanColors.INTERACTING,
            "stroke-width": 2,
            fill: KhanColors.INTERACTING,
        },
        labelStyle: {
            stroke: KhanColors.DYNAMIC,
            "stroke-width": 1,
            color: KhanColors.DYNAMIC,
        },
        angleStyle: {
            stroke: KhanColors.DYNAMIC,
            "stroke-width": 1,
            color: KhanColors.DYNAMIC,
        },
        allowReflex: true, // not on MovableAngle.prototype so that
        // it is not overridden by undefined
    });

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    if (!this.points || this.points.length !== 3) {
        throw new PerseusError(
            "MovableAngle requires 3 points",
            Errors.InvalidInput,
        );
    }

    // Handle coordinates that are not MovablePoints (i.e. [2, 4])
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.points = _.map(
        options.points,
        function (point) {
            if (_.isArray(point)) {
                return graphie.addMovablePoint({
                    coord: point,
                    visible: false,
                    constraints: {
                        fixed: true,
                    },
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    normalStyle: this.normalStyle,
                });
            }
            return point;
        },
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this,
    );
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.coords = _.pluck(this.points, "coord");
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    if (this.reflex == null) {
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        if (this.allowReflex) {
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            this.reflex = this._getClockwiseAngle(this.coords) > 180;
        } else {
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            this.reflex = false;
        }
    }

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.rays = _.map(
        [0, 2],
        function (i) {
            return graphie.addMovableLineSegment({
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                pointA: this.points[1],
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                pointZ: this.points[i],
                fixed: true,
                extendRay: true,
            });
        },
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this,
    );

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.temp = [];
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.labeledAngle = graphie.label([0, 0], "", "center", this.labelStyle);

    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    if (!this.fixed) {
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.addMoveHandlers();
        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
        this.addHighlightHandlers();
    }
    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
    this.update();
}

_.extend(MovableAngle.prototype, {
    points: [],
    snapDegrees: 0,
    snapOffsetDeg: 0,
    angleLabel: "",
    numArcs: 1,
    pushOut: 0,
    fixed: false,

    addMoveHandlers: function () {
        const graphie = this.graphie;

        function tooClose(point1: Array<never>, point2: Array<never>) {
            const safeDistance = 30;
            const distance = GraphUtils.getDistance(
                graphie.scalePoint(point1),
                graphie.scalePoint(point2),
            );
            return distance < safeDistance;
        }

        const points = this.points;

        // Drag the vertex to move the entire angle
        points[1].onMove = function (x: number, y: number) {
            const oldVertex = points[1].coord;
            const newVertex: Coord = [x, y];
            const delta = kvector.add(newVertex, reverseVector(oldVertex));

            let valid = true;
            const newPoints: Record<string, any> = {};
            _.each([0, 2], function (i) {
                const oldPoint = points[i].coord;
                let newPoint = kvector.add(oldPoint, delta);

                let angle = GraphUtils.findAngleDeprecated(newVertex, newPoint);
                angle *= Math.PI / 180;
                newPoint = graphie.constrainToBoundsOnAngle(
                    newPoint,
                    10,
                    angle,
                );
                newPoints[i] = newPoint;

                // @ts-expect-error - TS2345 - Argument of type 'any[]' is not assignable to parameter of type 'never[]'.
                if (tooClose(newVertex, newPoint)) {
                    valid = false;
                }
            });

            // Only move points if all new positions are valid
            if (valid) {
                _.each(newPoints, function (newPoint, i) {
                    points[i].setCoord(newPoint);
                });
            }
            return valid;
        };

        const snap = this.snapDegrees;
        const snapOffset = this.snapOffsetDeg;

        // Drag ray control points to move each ray individually
        _.each([0, 2], function (i) {
            points[i].onMove = function (x: number, y: number) {
                const newPoint: Coord = [x, y];
                const vertex = points[1].coord;

                // @ts-expect-error - TS2345 - Argument of type 'any[]' is not assignable to parameter of type 'never[]'.
                if (tooClose(vertex, newPoint)) {
                    return false;
                }
                if (snap) {
                    let angle = GraphUtils.findAngleDeprecated(
                        newPoint,
                        vertex,
                    );
                    angle =
                        Math.round((angle - snapOffset) / snap) * snap +
                        snapOffset;
                    const distance = GraphUtils.getDistance(newPoint, vertex);
                    return kvector.add(vertex, polar(distance, angle));
                }
                return true;
            };
        });

        // Expose only a single move event
        $(points).on(
            "move",
            function () {
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                this.update();
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                $(this).trigger("move");
            }.bind(this),
        );
    },

    addHighlightHandlers: function () {
        const vertex = this.points[1];

        vertex.onHighlight = function () {
            _.each(
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                this.points,
                function (point) {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    point.visibleShape.animate(this.highlightStyle, 50);
                },
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                this,
            );
            _.each(
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                this.rays,
                function (ray) {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    ray.visibleLine.animate(this.highlightStyle, 50);
                    ray.arrowStyle = _.extend({}, ray.arrowStyle, {
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        color: this.highlightStyle.stroke,
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        stroke: this.highlightStyle.stroke,
                    });
                },
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                this,
            );

            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            this.angleStyle = _.extend({}, this.angleStyle, {
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                color: this.highlightStyle.stroke,
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                stroke: this.highlightStyle.stroke,
            });
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            this.update();
        }.bind(this);

        vertex.onUnhighlight = function () {
            _.each(
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                this.points,
                function (point) {
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    point.visibleShape.animate(this.normalStyle, 50);
                },
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                this,
            );
            _.each(
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                this.rays,
                function (ray) {
                    ray.visibleLine.animate(ray.normalStyle, 50);
                    ray.arrowStyle = _.extend({}, ray.arrowStyle, {
                        color: ray.normalStyle.stroke,
                        stroke: ray.normalStyle.stroke,
                    });
                },
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                this,
            );

            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation. | TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            this.angleStyle = _.extend({}, this.angleStyle, {
                color: KhanColors.DYNAMIC,
                stroke: KhanColors.DYNAMIC,
            });
            // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
            this.update();
        }.bind(this);
    },

    /**
     * Returns the angle in [0, 360) degrees created by the
     * coords when interpreted in a clockwise direction.
     */
    _getClockwiseAngle: function (coords) {
        const rawAngle = GraphUtils.findAngleDeprecated(
            // The order of these is "weird" to match what a clockwise
            // order is in graphie.labelAngle
            coords[2], // from the second point
            coords[0], // clockwise to the first point
            coords[1], // the vertex parameter is last
        );
        const clockwiseAngle = rawAngle + (360 % 360);

        return clockwiseAngle;
    },

    isReflex: function () {
        return this.reflex;
    },

    isClockwise: function () {
        const clockwiseReflexive = this._getClockwiseAngle(this.coords) > 180;
        return clockwiseReflexive === this.reflex;
    },

    getClockwiseCoords: function () {
        if (this.isClockwise()) {
            return _.clone(this.coords);
        }
        return _.clone(this.coords).reverse();
    },

    update: function (shouldChangeReflexivity) {
        const prevCoords = this.coords;
        this.coords = _.pluck(this.points, "coord");

        // Update lines
        _.invoke(this.points, "updateLineEnds");

        const prevAngle = this._getClockwiseAngle(prevCoords);
        const angle = this._getClockwiseAngle(this.coords);
        const prevClockwiseReflexive = prevAngle > 180;
        const clockwiseReflexive = angle > 180;

        if (this.allowReflex) {
            if (shouldChangeReflexivity == null) {
                shouldChangeReflexivity =
                    prevClockwiseReflexive !== clockwiseReflexive &&
                    Math.abs(angle - prevAngle) < 180;
            }

            if (shouldChangeReflexivity) {
                this.reflex = !this.reflex;
            }
        }

        _.invoke(this.temp, "remove");
        this.temp = this.graphie.labelAngle({
            point1: this.coords[0],
            vertex: this.coords[1],
            point3: this.coords[2],
            label: this.labeledAngle,
            text: this.angleLabel,
            numArcs: this.numArcs,
            pushOut: this.pushOut,
            clockwise: this.reflex === clockwiseReflexive,
            style: this.angleStyle,
        });
    },

    remove: function () {
        _.invoke(this.rays, "remove");
        _.invoke(this.temp, "remove");
        this.labeledAngle.remove();
    },
});
