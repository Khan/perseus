/* eslint-disable @babel/no-invalid-this */
import {point as kpoint, vector as kvector} from "@khanacademy/kmath";
import $ from "jquery";
// eslint-disable-next-line import/no-extraneous-dependencies
import Raphael from "raphael";
import _ from "underscore";

// Minify Raphael ourselves because IE8 has a problem with the 1.5.2 minified
// release
// http://groups.google.com/group/raphaeljs/browse_thread/thread/c34c75ad8d431544

import {Errors, Log} from "../logging/log";
import {PerseusError} from "../perseus-error";

import KhanColors from "./colors";
import {DrawingTransform} from "./drawing-transform";
import {GraphBounds} from "./graph-bounds";
import KhanMath from "./math";
import Tex from "./tex";

import type {Interval} from "./interval";
import type {Coord} from "../interactive2/types";

const {processMath} = Tex;

export function polar(r: number | Coord, th: number) {
    if (typeof r === "number") {
        r = [r, r];
    }
    th = (th * Math.PI) / 180;
    return [r[0] * Math.cos(th), r[1] * Math.sin(th)];
}

const GraphUtils: any = {
    unscaledSvgPath: function (points) {
        // If this is an empty closed path, return "" instead of "z", which
        // would give an error
        if (points[0] === true) {
            return "";
        }
        return $.map(points, function (point, i) {
            if (point === true) {
                return "z";
            }
            return (i === 0 ? "M" : "L") + point[0] + " " + point[1];
        }).join("");
    },

    getDistance: function (point1, point2) {
        return kpoint.distanceToPoint(point1, point2);
    },

    /**
     * Return the difference between two sets of coordinates
     */
    coordDiff: function (startCoord, endCoord) {
        return _.map(endCoord, function (val, i) {
            return endCoord[i] - startCoord[i];
        });
    },

    /**
     * Round the given coordinates to a given snap value
     * (e.g., nearest 0.2 increment)
     */
    snapCoord: function (coord, snap) {
        return _.map(coord, function (val, i) {
            return KhanMath.roundToNearest(snap[i], val);
        });
    },

    // Find the angle in degrees between two or three points
    findAngle: function (point1, point2, vertex) {
        if (vertex === undefined) {
            const x = point1[0] - point2[0];
            const y = point1[1] - point2[1];
            if (!x && !y) {
                return 0;
            }
            return (180 + (Math.atan2(-y, -x) * 180) / Math.PI + 360) % 360;
        }
        return (
            GraphUtils.findAngle(point1, vertex) -
            GraphUtils.findAngle(point2, vertex)
        );
    },

    graphs: {},
};

class Graphie {
    el: HTMLElement;
    #bounds?: GraphBounds;
    #drawingTransform?: DrawingTransform;
    raphael?: any;
    isMobile = false;
    // Set up some reasonable defaults
    currentStyle: any = {
        "stroke-width": 2,
        fill: "none",
    };

    range?: [Interval, Interval];
    scale?: Coord;
    dimensions?: Coord;
    // TODO(benchristel): xpixels and ypixels are never used by this class, but
    // other code reaches in to access them :(
    // Refactor to accessor methods that look at this.dimensions.
    xpixels?: number;
    ypixels?: number;

    constructor(el: HTMLElement) {
        this.el = el;
        $(el).css("position", "relative");
        this.raphael = Raphael(el);

        // For a sometimes-reproducible IE8 bug; doesn't affect SVG browsers at all
        $(el).children("div").css("position", "absolute");
    }

    init(options: {
        range?: [Interval, Interval];
        scale?: number | Coord;
        isMobile: boolean;
    }) {
        let scale = options.scale || [40, 40];
        scale = typeof scale === "number" ? [scale, scale] : scale;

        if (options.range == null) {
            throw new PerseusError(
                "range should be specified in graph init",
                Errors.Internal,
            );
        }

        this.#bounds = new GraphBounds(...options.range);

        this.#drawingTransform = new DrawingTransform(
            this.raphael,
            scale,
            this.bounds(),
        );

        const [w, h] = this.drawingTransform().canvasDimensions();

        $(this.el).css({
            width: w,
            height: h,
        });

        this.range = options.range;
        this.scale = scale;
        // TODO(benchristel): I don't think dimensions is used. Can we
        // remove it?
        this.dimensions = [w, h];
        this.xpixels = w;
        this.ypixels = h;

        this.isMobile = options.isMobile;

        return this;
    }

    // Initializes graphie settings for a graph and draws the basic graph
    // features (axes, grid, tick marks, and axis labels)
    // Options expected are:
    // - range: [[a, b], [c, d]] or [a, b]
    // - scale: [a, b] or number
    // - gridOpacity: number (0 - 1)
    // - gridStep: [a, b] or number (relative to units)
    // - tickStep: [a, b] or number (relative to grid steps)
    // - tickLen: [a, b] or number (in pixels)
    // - labelStep: [a, b] or number (relative to tick steps)
    // - yLabelFormat: fn to format label string for y-axis
    // - xLabelFormat: fn to format label string for x-axis
    graphInit(options: any) {
        options = options || {};

        $.each(options, function (prop, val: any) {
            // allow options to be specified by a single number for shorthand if
            // the horizontal and vertical components are the same
            if (
                // @ts-expect-error - TS2339 - Property 'match' does not exist on type 'string | number | symbol'.
                !prop.match(/.*Opacity$/) &&
                prop !== "range" &&
                typeof val === "number"
            ) {
                options[prop] = [val, val];
            }

            // allow symmetric ranges to be specified by the absolute values
            if (prop === "range" || prop === "gridRange") {
                if (val.constructor === Array) {
                    // but don't mandate symmetric ranges
                    if (val[0].constructor !== Array) {
                        options[prop] = [
                            [-val[0], val[0]],
                            [-val[1], val[1]],
                        ];
                    }
                } else if (typeof val === "number") {
                    options[prop] = [
                        [-val, val],
                        [-val, val],
                    ];
                }
            }
        });

        const range = options.range || [
            [-10, 10],
            [-10, 10],
        ];
        const gridRange = options.gridRange || options.range;
        const scale = options.scale || [20, 20];
        const grid = options.grid != null ? options.grid : true;
        const gridOpacity = options.gridOpacity || 0.1;
        const gridStep = options.gridStep || [1, 1];
        const axes = options.axes != null ? options.axes : true;
        const axisArrows = options.axisArrows || "";
        const axisOpacity = options.axisOpacity || 1.0;
        const axisCenter = options.axisCenter || [
            Math.min(Math.max(range[0][0], 0), range[0][1]),
            Math.min(Math.max(range[1][0], 0), range[1][1]),
        ];
        const axisLabels =
            options.axisLabels != null ? options.axisLabels : false;
        const ticks = options.ticks != null ? options.ticks : true;
        const tickStep = options.tickStep || [2, 2];
        const tickLen = options.tickLen || [5, 5];
        const tickOpacity = options.tickOpacity || 1.0;
        const labels = options.labels || options.labelStep || false;
        const labelStep = options.labelStep || [1, 1];
        const labelOpacity = options.labelOpacity || 1.0;
        let unityLabels = options.unityLabels || false;
        const labelFormat =
            options.labelFormat ||
            function (a: any) {
                return a;
            };
        let xLabelFormat = options.xLabelFormat || labelFormat;
        let yLabelFormat = options.yLabelFormat || labelFormat;
        const realRange = [
            [
                range[0][0] - (range[0][0] > 0 ? 1 : 0),
                range[0][1] + (range[0][1] < 0 ? 1 : 0),
            ],
            [
                range[1][0] - (range[1][0] > 0 ? 1 : 0),
                range[1][1] + (range[1][1] < 0 ? 1 : 0),
            ],
        ] as [Interval, Interval];

        if (!_.isArray(unityLabels)) {
            unityLabels = [unityLabels, unityLabels];
        }

        const minusIgnorer = function (lf: any) {
            return function (a) {
                return (lf(a) + "").replace(/-(\d)/g, "\\llap{-}$1");
            };
        };

        xLabelFormat = minusIgnorer(xLabelFormat);
        yLabelFormat = minusIgnorer(yLabelFormat);

        this.init({
            range: realRange,
            scale: scale,
            isMobile: options.isMobile,
        });

        // draw grid
        if (grid) {
            this.grid(gridRange[0], gridRange[1], {
                stroke: options.isMobile ? KhanColors.GRAY_C : "#000000",
                opacity: options.isMobile ? 1 : gridOpacity,
                step: gridStep,
                strokeWidth: options.isMobile ? 1 : 2,
            });
        }

        // draw axes
        if (axes) {
            // this is a slight hack until <-> arrowheads work
            if (axisArrows === "<->" || axisArrows === true) {
                const thisGraphie = this;
                this.style(
                    {
                        stroke: options.isMobile
                            ? KhanColors.GRAY_G
                            : "#000000",
                        opacity: options.isMobile ? 1 : axisOpacity,
                        strokeWidth: options.isMobile ? 1 : 2,
                        arrows: "->",
                    },
                    function () {
                        if (range[1][0] < 0 && range[1][1] > 0) {
                            thisGraphie.path([
                                axisCenter,
                                [gridRange[0][0], axisCenter[1]],
                            ]);
                            thisGraphie.path([
                                axisCenter,
                                [gridRange[0][1], axisCenter[1]],
                            ]);
                        }
                        if (range[0][0] < 0 && range[0][1] > 0) {
                            thisGraphie.path([
                                axisCenter,
                                [axisCenter[0], gridRange[1][0]],
                            ]);
                            thisGraphie.path([
                                axisCenter,
                                [axisCenter[0], gridRange[1][1]],
                            ]);
                        }
                    },
                );

                // also, we don't support "<-" arrows yet, but why you
                // would want that on your graph is beyond me.
            } else if (axisArrows === "->" || axisArrows === "") {
                const thisGraphie = this;
                this.style(
                    {
                        stroke: "#000000",
                        opacity: axisOpacity,
                        strokeWidth: 2,
                        arrows: axisArrows,
                    },
                    function () {
                        thisGraphie.path([
                            [gridRange[0][0], axisCenter[1]],
                            [gridRange[0][1], axisCenter[1]],
                        ]);
                        thisGraphie.path([
                            [axisCenter[0], gridRange[1][0]],
                            [axisCenter[0], gridRange[1][1]],
                        ]);
                    },
                );
            }

            if (axisLabels && axisLabels.length === 2) {
                this.label(
                    [gridRange[0][1], axisCenter[1]],
                    axisLabels[0],
                    "right",
                );
                this.label(
                    [axisCenter[0], gridRange[1][1]],
                    axisLabels[1],
                    "above",
                );
            }
        }

        // draw tick marks
        if (ticks) {
            const halfWidthTicks = options.isMobile;
            const thisGraphie = this;
            this.style(
                {
                    stroke: options.isMobile ? KhanColors.GRAY_G : "#000000",
                    opacity: options.isMobile ? 1 : tickOpacity,
                    strokeWidth: 1,
                },
                function () {
                    // horizontal axis
                    let step = gridStep[0] * tickStep[0];
                    let len = tickLen[0] / scale[1];
                    let start = gridRange[0][0];
                    let stop = gridRange[0][1];

                    if (range[1][0] < 0 && range[1][1] > 0) {
                        for (
                            let x = step + axisCenter[0];
                            x <= stop;
                            x += step
                        ) {
                            if (x < stop || !axisArrows) {
                                thisGraphie.line(
                                    [x, -len + axisCenter[1]],
                                    [
                                        x,
                                        halfWidthTicks
                                            ? 0
                                            : len + axisCenter[1],
                                    ],
                                );
                            }
                        }

                        for (
                            let x = -step + axisCenter[0];
                            x >= start;
                            x -= step
                        ) {
                            if (x > start || !axisArrows) {
                                thisGraphie.line(
                                    [x, -len + axisCenter[1]],
                                    [
                                        x,
                                        halfWidthTicks
                                            ? 0
                                            : len + axisCenter[1],
                                    ],
                                );
                            }
                        }
                    }

                    // vertical axis
                    step = gridStep[1] * tickStep[1];
                    len = tickLen[1] / scale[0];
                    start = gridRange[1][0];
                    stop = gridRange[1][1];

                    if (range[0][0] < 0 && range[0][1] > 0) {
                        for (
                            let y = step + axisCenter[1];
                            y <= stop;
                            y += step
                        ) {
                            if (y < stop || !axisArrows) {
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this.line(
                                    [-len + axisCenter[0], y],
                                    [
                                        halfWidthTicks
                                            ? 0
                                            : len + axisCenter[0],
                                        y,
                                    ],
                                );
                            }
                        }

                        for (
                            let y = -step + axisCenter[1];
                            y >= start;
                            y -= step
                        ) {
                            if (y > start || !axisArrows) {
                                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                                this.line(
                                    [-len + axisCenter[0], y],
                                    [
                                        halfWidthTicks
                                            ? 0
                                            : len + axisCenter[0],
                                        y,
                                    ],
                                );
                            }
                        }
                    }
                },
            );
        }

        // draw axis labels
        if (labels) {
            const thisGraphie = this;
            this.style(
                {
                    stroke: options.isMobile ? KhanColors.GRAY_G : "#000000",
                    opacity: options.isMobile ? 1 : labelOpacity,
                },
                function () {
                    // horizontal axis
                    let step = gridStep[0] * tickStep[0] * labelStep[0];
                    let start = gridRange[0][0];
                    let stop = gridRange[0][1];
                    const xAxisPosition = axisCenter[0] < 0 ? "above" : "below";
                    const yAxisPosition = axisCenter[0] < 0 ? "right" : "left";
                    const xShowZero =
                        axisCenter[0] === 0 && axisCenter[1] !== 0;
                    const yShowZero =
                        axisCenter[0] !== 0 && axisCenter[1] === 0;
                    const axisOffCenter =
                        axisCenter[0] !== 0 || axisCenter[1] !== 0;
                    const showUnityX = unityLabels[0] || axisOffCenter;
                    const showUnityY = unityLabels[1] || axisOffCenter;

                    // positive x-axis
                    for (
                        let x = (xShowZero ? 0 : step) + axisCenter[0];
                        x <= stop;
                        x += step
                    ) {
                        if (x < stop || !axisArrows) {
                            thisGraphie.label(
                                [x, axisCenter[1]],
                                xLabelFormat(x),
                                xAxisPosition,
                            );
                        }
                    }

                    // negative x-axis
                    for (
                        let x = -step * (showUnityX ? 1 : 2) + axisCenter[0];
                        x >= start;
                        x -= step
                    ) {
                        if (x > start || !axisArrows) {
                            thisGraphie.label(
                                [x, axisCenter[1]],
                                xLabelFormat(x),
                                xAxisPosition,
                            );
                        }
                    }

                    step = gridStep[1] * tickStep[1] * labelStep[1];
                    start = gridRange[1][0];
                    stop = gridRange[1][1];

                    // positive y-axis
                    for (
                        let y = (yShowZero ? 0 : step) + axisCenter[1];
                        y <= stop;
                        y += step
                    ) {
                        if (y < stop || !axisArrows) {
                            thisGraphie.label(
                                [axisCenter[0], y],
                                yLabelFormat(y),
                                yAxisPosition,
                            );
                        }
                    }

                    // negative y-axis
                    for (
                        let y = -step * (showUnityY ? 1 : 2) + axisCenter[1];
                        y >= start;
                        y -= step
                    ) {
                        if (y > start || !axisArrows) {
                            thisGraphie.label(
                                [axisCenter[0], y],
                                yLabelFormat(y),
                                yAxisPosition,
                            );
                        }
                    }
                },
            );
        }
    }

    drawingTransform(): DrawingTransform {
        if (this.#drawingTransform == null) {
            throw new Error(
                "Can't get drawingTransform of an uninitialized Graphie",
            );
        }
        return this.#drawingTransform;
    }

    bounds(): GraphBounds {
        if (this.#bounds == null) {
            throw new Error("Can't get bounds of an uninitialized Graphie");
        }
        return this.#bounds;
    }

    style(attrs: any, fn: any) {
        const processed = this.processAttributes(attrs);

        if (typeof fn === "function") {
            const oldStyle = this.currentStyle;
            this.currentStyle = $.extend({}, this.currentStyle, processed);
            const result = fn.call(this);
            this.currentStyle = oldStyle;
            return result;
        }
        $.extend(this.currentStyle, processed);
    }

    label(point: any, text: any, direction: any, latex?: any) {}

    grid(xr: any, yr: any, styleAttributes: any) {}

    // path is a stub that gets overwritten with a function from drawingTools
    // in createGraphie
    path(points: any) {}

    // line is a stub that gets overwritten with a function from drawingTools
    // in createGraphie
    line(start: any, end: any) {}

    svgPath = (points: any, alreadyScaled) => {
        return $.map(points, (point, i) => {
            if (point === true) {
                return "z";
            }
            const scaled = alreadyScaled ? point : this.scalePoint(point);
            return (
                (i === 0 ? "M" : "L") +
                KhanMath.bound(scaled[0]) +
                " " +
                KhanMath.bound(scaled[1])
            );
        }).join("");
    };

    svgParabolaPath = (a: any, b: any, c: any) => {
        const computeParabola = function (x) {
            return (a * x + b) * x + c;
        };

        // If points are collinear, plot a line instead
        if (a === 0) {
            const points = [
                [this.bounds().xMin, computeParabola(this.bounds().xMin)],
                [this.bounds().xMax, computeParabola(this.bounds().xMax)],
            ];
            // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
            return this.svgPath(points);
        }

        // Calculate x coordinates of points on parabola
        const xVertex = -b / (2 * a);
        const distToEdge = Math.max(
            Math.abs(xVertex - this.bounds().xMin),
            Math.abs(xVertex - this.bounds().xMax),
        );

        // To guarantee that drawn parabola to spans the viewport, use a point
        // on the edge of the graph furtherest from the vertex
        const xPoint = xVertex + distToEdge;

        // Compute parabola and other point on the curve
        const vertex = [xVertex, computeParabola(xVertex)];
        const point = [xPoint, computeParabola(xPoint)];

        // Calculate SVG 'control' point, defined by spec
        const control = [vertex[0], vertex[1] - (point[1] - vertex[1])];

        // Calculate mirror points across parabola's axis of symmetry
        const dx = Math.abs(vertex[0] - point[0]);
        const left = [vertex[0] - dx, point[1]];
        const right = [vertex[0] + dx, point[1]];

        // Scale and bound
        // @ts-expect-error - TS2345 - Argument of type '(point: number | Coord) => Coord' is not assignable to parameter of type 'Iteratee<any[][], any, any[]>'.
        const points = _.map([left, control, right], this.scalePoint);
        const values = _.map(_.flatten(points), KhanMath.bound);
        return (
            "M" +
            values[0] +
            "," +
            values[1] +
            " Q" +
            values[2] +
            "," +
            values[3] +
            " " +
            values[4] +
            "," +
            values[5]
        );
    };

    svgSinusoidPath = (a, b, c: any, d: any) => {
        // Plot a sinusoid of the form: f(x) = a * sin(b * x - c) + d
        const quarterPeriod = Math.abs(Math.PI / (2 * b));

        const computeSine = function (x: number) {
            return a * Math.sin(b * x - c) + d;
        };

        const computeDerivative = function (x) {
            return a * b * Math.cos(c - b * x);
        };

        const coordsForOffset = (initial: number, i: number) => {
            // Return the cubic coordinates (including the two anchor and two
            // control points) for the ith portion of the sinusoid.
            const x0 = initial + quarterPeriod * i;
            const x1 = x0 + quarterPeriod;

            // Interpolate using derivative technique
            // See: http://stackoverflow.com/questions/13932704/how-to-draw-sine-waves-with-svg-js
            const xCoords = [
                x0,
                (x0 * 2) / 3 + (x1 * 1) / 3,
                (x0 * 1) / 3 + (x1 * 2) / 3,
                x1,
            ];
            const yCoords = [
                computeSine(x0),
                computeSine(x0) + (computeDerivative(x0) * (x1 - x0)) / 3,
                computeSine(x1) - (computeDerivative(x1) * (x1 - x0)) / 3,
                computeSine(x1),
            ];

            // Zip and scale
            // @ts-expect-error - TS2345 - Argument of type '(point: number | Coord) => Coord' is not assignable to parameter of type 'Iteratee<any[][], any, any[]>'.
            return _.map(_.zip(xCoords, yCoords), this.scalePoint);
        };

        // How many quarter-periods do we need to span the graph?
        const extent = this.bounds().width();
        const numQuarterPeriods = Math.ceil(extent / quarterPeriod) + 1;

        // Find starting coordinate: first anchor point curve left of bounds.xMin
        let initial = c / b;
        const distToEdge = initial - this.bounds().xMin;
        initial -= quarterPeriod * Math.ceil(distToEdge / quarterPeriod);

        // First portion of path is special-case, requiring move-to ('M')
        let coords = coordsForOffset(initial, 0);
        let path =
            "M" +
            coords[0][0] +
            "," +
            coords[0][1] +
            " C" +
            coords[1][0] +
            "," +
            coords[1][1] +
            " " +
            coords[2][0] +
            "," +
            coords[2][1] +
            " " +
            coords[3][0] +
            "," +
            coords[3][1];
        for (let i = 1; i < numQuarterPeriods; i++) {
            coords = coordsForOffset(initial, i);
            path +=
                " C" +
                coords[1][0] +
                "," +
                coords[1][1] +
                " " +
                coords[2][0] +
                "," +
                coords[2][1] +
                " " +
                coords[3][0] +
                "," +
                coords[3][1];
        }

        return path;
    };

    scalePoint = (point: number | Coord): Coord => {
        return this.drawingTransform().scalePoint(point);
    };

    scaleVector = (point: number | Coord) => {
        return this.drawingTransform().scaleVector(point);
    };

    unscalePoint = (point: Coord) => {
        return this.drawingTransform().unscalePoint(point);
    };

    unscaleVector = (point: Coord) => {
        return this.drawingTransform().unscaleVector(point);
    };

    processAttributes(attrs: any) {
        const transformers = {
            scale: (scale) => {
                this.drawingTransform().setScale(scale);
            },

            clipRect: (pair) => {
                const point = pair[0];
                const size = pair[1];
                point[1] += size[1]; // because our coordinates are flipped

                return {
                    "clip-rect": this.scalePoint(point)
                        .concat(this.scaleVector(size))
                        .join(" "),
                };
            },

            strokeWidth: function (val) {
                return {"stroke-width": parseFloat(val)};
            },

            rx: (val) => {
                return {rx: this.scaleVector([val, 0])[0]};
            },

            ry: (val) => {
                return {ry: this.scaleVector([0, val])[1]};
            },

            r: (val) => {
                const scaled = this.scaleVector([val, val]);
                return {rx: scaled[0], ry: scaled[1]};
            },
        } as const;

        const processed: Record<string, any> = {};
        $.each(attrs || {}, function (key, value) {
            const transformer = transformers[key];

            if (typeof transformer === "function") {
                $.extend(processed, transformer(value));
            } else {
                const dasherized = key
                    // @ts-expect-error - TS2339 - Property 'replace' does not exist on type 'string | number | symbol'.
                    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
                    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
                    .toLowerCase();
                processed[dasherized] = value;
            }
        });

        return processed;
    }
}

GraphUtils.Graphie = Graphie;

const labelDirections = {
    center: [-0.5, -0.5],
    above: [-0.5, -1.0],
    "above right": [0.0, -1.0],
    right: [0.0, -0.5],
    "below right": [0.0, 0.0],
    below: [-0.5, 0.0],
    "below left": [-1.0, 0.0],
    left: [-1.0, -0.5],
    "above left": [-1.0, -1.0],
} as const;

/**
 * Safari applies some SVG-specific styles to things that are not SVGs, so we
 * need to exclude those styles from things that are not SVGs.
 *
 * To see this behavior in action, open https://codepen.io/anon/pen/zENEoa in
 * Safari.
 *
 * Usage `$.extend({}, someStyles, SVG_SPECIFIC_STYLE_MASK)`
 */
const SVG_SPECIFIC_STYLE_MASK = {
    "stroke-width": null,
} as const;

GraphUtils.createGraphie = function (el: any) {
    const thisGraphie = new Graphie(el);

    const setLabelMargins = function (span: any, size: Array<any>) {
        const $span = $(span);
        const direction = $span.data("labelDirection");
        let [width, height] = size;
        // This can happen when a span
        // is invisible but we still want to update the CSS. At worst, we will
        // be off by a few pixels instead of in a different position entirely.
        if (width === 0 && height === 0) {
            [width, height] = [1, 1];
            Log.log("Label size was 0x0 in graphie.js; using 1x1 instead");
        }
        $span.css("visibility", "");

        if (typeof direction === "number") {
            const x = Math.cos(direction);
            const y = Math.sin(direction);

            const scale = Math.min(
                width / 2 / Math.abs(x),
                height / 2 / Math.abs(y),
            );

            $span.css({
                marginLeft: -width / 2 + x * scale,
                marginTop: -height / 2 - y * scale,
            });
        } else {
            const multipliers = labelDirections[direction || "center"];
            $span.css({
                marginLeft: Math.round(width * multipliers[0]),
                marginTop: Math.round(height * multipliers[1]),
            });
        }
    };

    // `svgPath` is independent of graphie range, so we export it independently
    GraphUtils.svgPath = thisGraphie.svgPath;

    const addArrowheads = function arrows(path: any) {
        const type = path.constructor.prototype;

        if (type === Raphael.el) {
            if (
                path.type === "path" &&
                typeof path.arrowheadsDrawn === "undefined"
            ) {
                const w = path.attr("stroke-width");
                const s = 0.6 + 0.4 * w;
                const l = path.getTotalLength();
                const set = thisGraphie.raphael.set();
                const head = thisGraphie.raphael.path(
                    thisGraphie.isMobile
                        ? "M-4,4 C-4,4 -0.25,0 -0.25,0 C-0.25,0 -4,-4 -4,-4"
                        : "M-3 4 C-2.75 2.5 0 0.25 0.75 0C0 -0.25 -2.75 -2.5 -3 -4",
                );
                const end = path.getPointAtLength(l - 0.4);
                const almostTheEnd = path.getPointAtLength(l - 0.75 * s);
                const angle =
                    (Math.atan2(
                        end.y - almostTheEnd.y,
                        end.x - almostTheEnd.x,
                    ) *
                        180) /
                    Math.PI;
                const attrs = path.attr();
                delete attrs.path;

                let subpath = path.getSubpath(0, l - 0.75 * s);
                subpath = thisGraphie.raphael.path(subpath).attr(attrs);
                subpath.arrowheadsDrawn = true;
                path.remove();

                // For some unknown reason 0 doesn't work for the rotation
                // origin so we use a tiny number.
                head.rotate(angle, thisGraphie.isMobile ? 1e-5 : 0.75, 0)
                    .scale(s, s, 0.75, 0)
                    .translate(almostTheEnd.x, almostTheEnd.y)
                    .attr(attrs)
                    .attr({
                        "stroke-linejoin": "round",
                        "stroke-linecap": "round",
                    });

                head.arrowheadsDrawn = true;
                set.push(subpath);
                set.push(head);
                return set;
            }
        } else if (type === Raphael.st) {
            for (let i = 0, l = path.items.length; i < l; i++) {
                arrows(path.items[i]);
            }
        }
        return path;
    };

    function circle(center, radius) {
        return thisGraphie.raphael.ellipse(
            ...thisGraphie
                .scalePoint(center)
                .concat(thisGraphie.scaleVector([radius, radius])),
        );
    }

    // (x, y) is coordinate of bottom left corner
    function rect(x, y, width, height) {
        // Raphael needs (x, y) to be coordinate of upper left corner
        const corner = thisGraphie.scalePoint([x, y + height]);
        const dims = thisGraphie.scaleVector([width, height]);
        const elem = thisGraphie.raphael.rect(...corner.concat(dims));

        if (thisGraphie.isMobile) {
            elem.node.style.shapeRendering = "crispEdges";
        }

        return elem;
    }

    function ellipse(center, radii) {
        return thisGraphie.raphael.ellipse(
            ...thisGraphie
                .scalePoint(center)
                .concat(thisGraphie.scaleVector(radii)),
        );
    }

    function fixedEllipse(
        center: number | Coord,
        // Different type than Coord, this is radiusX, radiusY
        radii: number | [number, number],
        maxScale: number,
        padding: number,
    ) {
        // Scale point and radius
        const scaledPoint = thisGraphie.scalePoint(center);
        const scaledRadii = thisGraphie.scaleVector(radii);

        const width = 2 * scaledRadii[0] * maxScale + padding;
        const height = 2 * scaledRadii[1] * maxScale + padding;

        // Calculate absolute left, top
        const left = scaledPoint[0] - width / 2;
        const top = scaledPoint[1] - height / 2;

        // Wrap in <div>
        const wrapper = document.createElement("div");
        $(wrapper).css({
            position: "absolute",
            width: width + "px",
            height: height + "px",
            left: left + "px",
            top: top + "px",
        });
        // wrapper.setAttribute("data-graphie-type", "ellipse");

        // Create Raphael canvas
        const localRaphael = Raphael(wrapper, width, height);
        const visibleShape = localRaphael.ellipse(
            width / 2,
            height / 2,
            scaledRadii[0],
            scaledRadii[1],
        );

        return {
            wrapper: wrapper,
            visibleShape: visibleShape,
        };
    }

    function arc(center, radius, startAngle, endAngle, sector) {
        startAngle = ((startAngle % 360) + 360) % 360;
        endAngle = ((endAngle % 360) + 360) % 360;

        const cent = thisGraphie.scalePoint(center);
        const radii = thisGraphie.scaleVector(radius);
        const startVector = polar(radius, startAngle);
        const endVector = polar(radius, endAngle);

        const startPoint = thisGraphie.scalePoint([
            center[0] + startVector[0],
            center[1] + startVector[1],
        ]);
        const endPoint = thisGraphie.scalePoint([
            center[0] + endVector[0],
            center[1] + endVector[1],
        ]);

        const largeAngle = (((endAngle - startAngle) % 360) + 360) % 360 > 180;

        return thisGraphie.raphael.path(
            "M" +
                startPoint.join(" ") +
                "A" +
                radii.join(" ") +
                " 0 " + // ellipse rotation
                (largeAngle ? 1 : 0) +
                " 0 " + // sweep flag
                endPoint.join(" ") +
                (sector ? "L" + cent.join(" ") + "z" : ""),
        );
    }

    function path(points) {
        // @ts-expect-error - TS2554 - Expected 2 arguments, but got 1.
        const p = thisGraphie.raphael.path(thisGraphie.svgPath(points));
        p.graphiePath = points;

        return p;
    }

    function fixedPath(points, center, createPath) {
        points = _.map(points, thisGraphie.scalePoint);
        center = center ? thisGraphie.scalePoint(center) : null;
        createPath = createPath || thisGraphie.svgPath;

        const pathLeft = _.min(_.pluck(points, 0));
        const pathRight = _.max(_.pluck(points, 0));
        const pathTop = _.min(_.pluck(points, 1));
        const pathBottom = _.max(_.pluck(points, 1));

        // Apply padding to line
        const padding = [4, 4];

        // Calculate and apply additional offset
        const extraOffset = [pathLeft, pathTop];

        // Apply padding and offset to points
        points = _.map(points, function (point) {
            return kvector.add(
                kvector.subtract(point, extraOffset),
                kvector.scale(padding, 0.5),
            );
        });

        // Calculate <div> dimensions
        const width = pathRight - pathLeft + padding[0];
        const height = pathBottom - pathTop + padding[1];
        const left = extraOffset[0] - padding[0] / 2;
        const top = extraOffset[1] - padding[1] / 2;

        // Create <div>
        const wrapper = document.createElement("div");
        $(wrapper).css({
            position: "absolute",
            width: width + "px",
            height: height + "px",
            left: left + "px",
            top: top + "px",
            // If user specified a center, set it
            // NOTE(kevinb): jQuery doesn't like that `transformOrigin `could be `null`
            // so we cast to `any` here.
            transformOrigin: center
                ? width / 2 +
                  center[0] +
                  "px " +
                  (height / 2 + center[1]) +
                  "px"
                : null,
        } as any);

        // Create Raphael canvas
        const localRaphael = Raphael(wrapper, width, height);

        // Calculate path
        const visibleShape = localRaphael.path(createPath(points));

        return {
            wrapper: wrapper,
            visibleShape: visibleShape,
        };
    }

    function scaledPath(points) {
        const p = thisGraphie.raphael.path(
            thisGraphie.svgPath(points, /* alreadyScaled */ true),
        );
        p.graphiePath = points;
        return p;
    }

    function line(start, end) {
        const l = path([start, end]);

        if (thisGraphie.isMobile) {
            l.node.style.shapeRendering = "crispEdges";
        }

        return l;
    }

    function parabola(a, b, c) {
        // Plot a parabola of the form: f(x) = (a * x + b) * x + c
        return thisGraphie.raphael.path(thisGraphie.svgParabolaPath(a, b, c));
    }

    function fixedLine(start, end, thickness) {
        // Apply padding to line
        const padding = [thickness, thickness];

        // Scale points to get values in pixels
        start = thisGraphie.scalePoint(start);
        end = thisGraphie.scalePoint(end);

        // Calculate and apply additional offset
        const extraOffset = [
            Math.min(start[0], end[0]),
            Math.min(start[1], end[1]),
        ];

        // Apply padding and offset to start, end points
        start = kvector.add(
            kvector.subtract(start, extraOffset),
            kvector.scale(padding, 0.5),
        );
        end = kvector.add(
            kvector.subtract(end, extraOffset),
            kvector.scale(padding, 0.5),
        );

        // Calculate <div> dimensions
        const left = extraOffset[0] - padding[0] / 2;
        const top = extraOffset[1] - padding[1] / 2;
        const width = Math.abs(start[0] - end[0]) + padding[0];
        const height = Math.abs(start[1] - end[1]) + padding[1];

        // Create <div>
        const wrapper = document.createElement("div");
        $(wrapper).css({
            position: "absolute",
            width: width + "px",
            height: height + "px",
            left: left + "px",
            top: top + "px",
            // Outsiders should feel like the line's 'origin' (i.e., for
            // rotation) is the starting point
            transformOrigin: start[0] + "px " + start[1] + "px",
        });

        // Create Raphael canvas
        const localRaphael = Raphael(wrapper, width, height);

        // Calculate path
        const path =
            "M" + start[0] + " " + start[1] + " " + "L" + end[0] + " " + end[1];
        const visibleShape = localRaphael.path(path);
        visibleShape.graphiePath = [start, end];

        return {
            wrapper: wrapper,
            visibleShape: visibleShape,
        };
    }

    function sinusoid(a, b, c, d) {
        // Plot a sinusoid of the form: f(x) = a * sin(b * x - c) + d
        return thisGraphie.raphael.path(
            thisGraphie.svgSinusoidPath(a, b, c, d),
        );
    }

    function grid(xr, yr) {
        const step: any = thisGraphie.currentStyle.step || [1, 1];
        const set = thisGraphie.raphael.set();

        let x = step[0] * Math.ceil(xr[0] / step[0]);
        for (; x <= xr[1]; x += step[0]) {
            set.push(line([x, yr[0]], [x, yr[1]]));
        }

        let y = step[1] * Math.ceil(yr[0] / step[1]);
        for (; y <= yr[1]; y += step[1]) {
            set.push(line([xr[0], y], [xr[1], y]));
        }

        return set;
    }

    function label(point, text, direction, latex) {
        latex = typeof latex === "undefined" || latex;

        const $span = $("<span>").addClass("graphie-label");

        const pad = thisGraphie.currentStyle["label-distance"];

        $span
            .css(
                $.extend(
                    {},
                    {
                        position: "absolute",
                        padding: (pad != null ? pad : 7) + "px",
                        color: "black",
                    },
                ),
            )
            .data("labelDirection", direction)
            .appendTo(thisGraphie.el);

        // @ts-expect-error - TS2339 - Property 'setPosition' does not exist on type 'JQuery<HTMLElement>'.
        $span.setPosition = function (point) {
            const scaledPoint = thisGraphie.scalePoint(point);
            $span.css({
                left: scaledPoint[0],
                top: scaledPoint[1],
            });
        };

        // @ts-expect-error - TS2339 - Property 'setPosition' does not exist on type 'JQuery<HTMLElement>'.
        $span.setPosition(point);

        const span = $span[0];

        // @ts-expect-error - TS2339 - Property 'processMath' does not exist on type 'JQuery<HTMLElement>'.
        $span.processMath = function (math, force) {
            processMath(span, math, force, function () {
                const width = span.scrollWidth;
                const height = span.scrollHeight;
                setLabelMargins(span, [width, height]);
            });
        };

        // @ts-expect-error - TS2339 - Property 'processText' does not exist on type 'JQuery<HTMLElement>'.
        $span.processText = function (text: any) {
            $span.html(text);
            const width = span.scrollWidth;
            const height = span.scrollHeight;
            setLabelMargins(span, [width, height]);
        };

        if (latex) {
            // @ts-expect-error - TS2339 - Property 'processMath' does not exist on type 'JQuery<HTMLElement>'.
            $span.processMath(text, /* force */ false);
        } else {
            // @ts-expect-error - TS2339 - Property 'processText' does not exist on type 'JQuery<HTMLElement>'.
            $span.processText(text);
        }

        return $span;
    }

    function plotParametric(
        fn: (t: number) => Coord,
        range,
        shade,
        fn2: (t: number) => Coord = (t) => [t, 0],
    ) {
        // Note: fn2 should only be set if 'shade' is true, as it denotes
        // the function between which fn should have its area shaded.
        // In general, plotParametric shouldn't be used to shade the area
        // between two arbitrary parametrics functions over an interval,
        // as the method assumes that fn and fn2 are both of the form
        // fn(t) = (t, fn'(t)) for some initial fn'.

        // We truncate to 500,000, since anything bigger causes
        // overflow in the firefox svg renderer.  This is safe
        // since 500,000 is outside the viewport anyway.  We
        // write these functions the way we do to handle undefined.
        const clipper = (xy) => {
            if (Math.abs(xy[1]) > 500000) {
                return [xy[0], Math.min(Math.max(xy[1], -500000), 500000)];
            }
            return xy;
        };
        const clippedFn = (x) => clipper(fn(x));
        const clippedFn2 = (x: number) => clipper(fn2(x));

        if (!thisGraphie.currentStyle.strokeLinejoin) {
            thisGraphie.currentStyle.strokeLinejoin = "round";
        }
        if (!thisGraphie.currentStyle.strokeLinecap) {
            thisGraphie.currentStyle.strokeLinecap = "round";
        }

        const min = range[0];
        const max = range[1];
        let step =
            (max - min) / (thisGraphie.currentStyle["plot-points"] || 800);
        if (step === 0) {
            step = 1;
        }

        const paths = thisGraphie.raphael.set();
        let points = [];
        let lastDiff = GraphUtils.coordDiff(clippedFn(min), clippedFn2(min));

        let lastFlip = min;
        for (let t = min; t <= max; t += step) {
            const top = clippedFn(t);
            const bottom = clippedFn2(t);
            const diff = GraphUtils.coordDiff(top, bottom);

            // Find points where it flips
            // Create path that sketches area between the two functions
            if (
                // if there is an asymptote here, meaning that the graph
                // switches signs and has a large difference
                (diff[1] < 0 !== lastDiff[1] < 0 &&
                    Math.abs(diff[1] - lastDiff[1]) >
                        2 * thisGraphie.drawingTransform().pixelsPerUnitY()) ||
                // or the function is undefined
                isNaN(diff[1])
            ) {
                // split the path at this point, and draw it
                if (shade) {
                    // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
                    points.push(top);

                    // backtrack to draw paired function
                    for (let u = t - step; u >= lastFlip; u -= step) {
                        // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
                        points.push(clippedFn2(u));
                    }
                    lastFlip = t;
                }
                paths.push(path(points));
                // restart the path, excluding this point
                points = [];
                if (shade) {
                    // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
                    points.push(top);
                }
            } else {
                // otherwise, just add the point to the path
                // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
                points.push(top);
            }

            lastDiff = diff;
        }

        if (shade) {
            // backtrack to draw paired function
            for (let u = max - step; u >= lastFlip; u -= step) {
                // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
                points.push(clippedFn2(u));
            }
        }
        paths.push(path(points));

        return paths;
    }

    function plot(fn, range, swapAxes, shade, fn2) {
        const min = range[0];
        const max = range[1];
        if (!thisGraphie.currentStyle["plot-points"]) {
            thisGraphie.currentStyle["plot-points"] =
                2 *
                (max - min) *
                thisGraphie.drawingTransform().pixelsPerUnitX();
        }

        if (swapAxes) {
            if (fn2) {
                // TODO(charlie): support swapped axis area shading
                throw new PerseusError(
                    "Can't shade area between functions with swapped axes.",
                    Errors.Internal,
                );
            }
            return plotParametric(
                function (y) {
                    return [fn(y), y];
                },
                range,
                shade,
            );
        }
        if (fn2) {
            if (shade) {
                return plotParametric(
                    function (x) {
                        return [x, fn(x)];
                    },
                    range,
                    shade,
                    function (x) {
                        return [x, fn2(x)];
                    },
                );
            }
            throw new PerseusError(
                "fn2 should only be set when 'shade' is True.",
                Errors.Internal,
            );
        }
        return plotParametric(
            function (x) {
                return [x, fn(x)];
            },
            range,
            shade,
        );
    }

    const drawingTools = {
        circle,
        rect,
        ellipse,
        fixedEllipse,
        arc,
        path,
        fixedPath,
        scaledPath,
        line,
        parabola,
        fixedLine,
        sinusoid,
        grid,
        label,
        plotParametric,
        plot,
    };

    function graphify(drawingFn: any): any {
        return function (...args) {
            const last = args[args.length - 1];
            const oldStyle = thisGraphie.currentStyle;
            let result;

            // The last argument is probably trying to change the style
            if (typeof last === "object" && !_.isArray(last)) {
                thisGraphie.currentStyle = {
                    ...thisGraphie.currentStyle,
                    ...thisGraphie.processAttributes(last),
                };

                const rest = [].slice.call(args, 0, args.length - 1);
                result = drawingFn(...rest);
            } else {
                thisGraphie.currentStyle = $.extend(
                    {},
                    thisGraphie.currentStyle,
                );

                result = drawingFn(...args);
            }

            // Bad heuristic for recognizing Raphael elements and sets
            const type = result.constructor.prototype;
            if (type === Raphael.el || type === Raphael.st) {
                result.attr(thisGraphie.currentStyle);

                if (thisGraphie.currentStyle.arrows) {
                    result = addArrowheads(result);
                }
            } else if (result instanceof $) {
                // We assume that if it's not a Raphael element/set, it
                // does not contain SVG.
                // @ts-expect-error - TS2339 - Property 'css' does not exist on type '{}'.
                result.css({
                    ...thisGraphie.currentStyle,
                    ...SVG_SPECIFIC_STYLE_MASK,
                });
            }

            thisGraphie.currentStyle = oldStyle;
            return result;
        };
    }

    $.each(drawingTools, function (name) {
        thisGraphie[name] = graphify(drawingTools[name]);
    });

    return thisGraphie;
};

export default GraphUtils;
