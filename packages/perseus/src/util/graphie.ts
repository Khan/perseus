/* eslint-disable max-lines */
import {
    point as kpoint,
    vector as kvector,
    number as knumber,
    KhanMath,
} from "@khanacademy/kmath";
import {Errors, PerseusError} from "@khanacademy/perseus-core";
import {entries} from "@khanacademy/wonder-stuff-core";
import $ from "jquery";
import Raphael from "raphael";

// Minify Raphael ourselves because IE8 has a problem with the 1.5.2 minified
// release
// http://groups.google.com/group/raphaeljs/browse_thread/thread/c34c75ad8d431544

import {Log} from "../logging/log";

import KhanColors from "./colors";
import {DrawingTransform} from "./drawing-transform";
import {GraphBounds} from "./graph-bounds";
import Tex from "./tex";

import type {MouseHandler} from "./interactive";
import type {Interval} from "./interval";
import type {Coord} from "../interactive2/types";
import type {GraphieLabelElement} from "../types";

const {processMath} = Tex;

export function polar(r: number | Coord, th: number): Coord {
    if (typeof r === "number") {
        r = [r, r];
    }
    th = (th * Math.PI) / 180;
    return [r[0] * Math.cos(th), r[1] * Math.sin(th)];
}

interface RaphaelElement {
    type: string;
    attrs: Record<string, any>;
    node: {
        style: {
            shapeRendering: "crispEdges" | "geometricPrecision";
        };
    };
}

type PositionedShape = {wrapper: HTMLDivElement; visibleShape: RaphaelElement};

type StyleParams = {
    fill?: string;
    labelDistance?: number;
    opacity?: number;
    step?: Coord;
    stroke?: string;
    strokeWidth?: number;
};

type LabelPosition =
    | "center"
    | "above"
    | "below"
    | "right"
    | "left"
    | "above right"
    | "above left"
    | "below right"
    | "below left";

interface LabelMethod {
    (point: Coord, text: string, position: LabelPosition): GraphieLabelElement;
    (
        point: Coord,
        text: string,
        position: LabelPosition,
        renderTex: boolean,
    ): GraphieLabelElement;
    (
        point: Coord,
        text: string,
        position: LabelPosition,
        style: StyleParams,
    ): GraphieLabelElement;
    (
        point: Coord,
        text: string,
        position: LabelPosition,
        renderTex: boolean,
        style: StyleParams,
    ): GraphieLabelElement;
}

export class Graphie {
    el: Element;
    #bounds?: GraphBounds;
    #drawingTransform?: DrawingTransform;

    // The primary drawing layer
    raphael?: any;
    // The layer that all visuals with mouse handlers are drawn into
    mouselayer?: any;
    _mouselayerWrapper?: HTMLDivElement;
    _visiblelayerWrapper?: HTMLDivElement;

    isMobile = false;
    // Set up some reasonable defaults
    currentStyle: any = {
        "stroke-width": 2,
        fill: "none",
    };

    range?: [Interval, Interval];
    scale?: Coord;
    dimensions?: Coord;
    xpixels?: number;
    ypixels?: number;

    // set by Movables
    isDragging?: boolean;

    constructor(el: Element) {
        this.el = el;
        $(el).css("position", "relative");
        this.raphael = Raphael(el);

        // Hide the Raphael canvas from screen readers
        $(el).attr("aria-hidden", "true");

        // For a sometimes-reproducible IE8 bug; doesn't affect SVG browsers at all
        $(el).children("div").css("position", "absolute");
    }

    init(options: {
        range: [Interval, Interval];
        scale?: number | Coord;
        isMobile?: boolean;
    }) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
        this.dimensions = [w, h];
        this.xpixels = w;
        this.ypixels = h;

        this.isMobile = options.isMobile ?? false;

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
    graphInit(options: {
        range?: [Interval, Interval] | Coord;
        grid?: boolean;
        gridRange?: [Interval, Interval] | Coord;
        scale: Coord | number;
        axes?: boolean;
        axisArrows?: "<->" | "->" | true | "";
        axisOpacity?: number;
        axisCenter?: Coord;
        axisLabels?: [string, string] | false;
        gridOpacity?: number;
        gridStep?: Coord | number;
        ticks?: boolean;
        tickStep?: Coord | number;
        tickLen?: Coord | number;
        tickOpacity?: number;
        labels?: boolean;
        labelStep?: number;
        labelOpacity?: number;
        labelFormat?: (a: number) => string;
        yLabelFormat?: (y: number) => string;
        xLabelFormat?: (x: number) => string;
        unityLabels?: boolean | [boolean, boolean];
        isMobile?: boolean;
    }) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        options = options || {};

        for (const [prop, val] of entries(options)) {
            // allow options to be specified by a single number for shorthand if
            // the horizontal and vertical components are the same
            if (
                !prop.match(/.*Opacity$/) &&
                prop !== "range" &&
                typeof val === "number"
            ) {
                options[prop] = [val, val];
            }

            // allow symmetric ranges to be specified by the absolute values
            if (prop === "range" || prop === "gridRange") {
                options[prop] = normalizeRange(options[prop]);
            }
        }

        const range = normalizeRange(
            options.range || [
                [-10, 10],
                [-10, 10],
            ],
        );
        const gridRange = normalizeRange(options.gridRange || range);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const scale = options.scale || [20, 20];
        const grid = options.grid != null ? options.grid : true;
        const gridOpacity = options.gridOpacity || 0.1;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const gridStep = toPair(options.gridStep || [1, 1]);
        const axes = options.axes != null ? options.axes : true;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const axisArrows = options.axisArrows || "";
        const axisOpacity = options.axisOpacity || 1.0;
        const axisCenter = options.axisCenter || [
            Math.min(Math.max(range[0][0], 0), range[0][1]),
            Math.min(Math.max(range[1][0], 0), range[1][1]),
        ];
        const axisLabels =
            options.axisLabels != null ? options.axisLabels : false;
        const ticks = options.ticks != null ? options.ticks : true;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const tickStep = options.tickStep || [2, 2];
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const tickLen = options.tickLen || [5, 5];
        const tickOpacity = options.tickOpacity || 1.0;
        const labels = options.labels || options.labelStep || false;
        const labelStep = options.labelStep || [1, 1];
        const labelOpacity = options.labelOpacity || 1.0;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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

        if (!Array.isArray(unityLabels)) {
            unityLabels = [unityLabels, unityLabels];
        }

        const minusIgnorer = function (lf: (a: number) => string) {
            return function (a: number) {
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

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
                () => {
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
                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                            if (y < stop || !axisArrows) {
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
                            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                            if (y > start || !axisArrows) {
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
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
                        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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

    private drawingTransform(): DrawingTransform {
        if (this.#drawingTransform == null) {
            throw new Error(
                "Can't get drawingTransform of an uninitialized Graphie",
            );
        }
        return this.#drawingTransform;
    }

    private bounds(): GraphBounds {
        if (this.#bounds == null) {
            throw new Error("Can't get bounds of an uninitialized Graphie");
        }
        return this.#bounds;
    }

    style<T>(attrs: any, fn?: (this: Graphie) => T): T | undefined {
        const processed = this.processAttributes(attrs);

        if (typeof fn === "function") {
            const oldStyle = this.currentStyle;
            this.currentStyle = {...this.currentStyle, ...processed};
            const result = fn.call(this);
            this.currentStyle = oldStyle;
            return result;
        }
        Object.assign(this.currentStyle, processed);
    }

    grid(xr: Interval, yr: Interval, style?: StyleParams): unknown {
        return this.withStyle(style, () => {
            const step: any = this.currentStyle.step || [1, 1];
            const set = this.raphael.set();

            let x = step[0] * Math.ceil(xr[0] / step[0]);
            for (; x <= xr[1]; x += step[0]) {
                set.push(this.line([x, yr[0]], [x, yr[1]]));
            }

            let y = step[1] * Math.ceil(yr[0] / step[1]);
            for (; y <= yr[1]; y += step[1]) {
                set.push(this.line([xr[0], y], [xr[1], y]));
            }

            return set;
        });
    }

    arc(
        center: Coord,
        radius: Coord,
        startAngle: number,
        endAngle: number,
        sector: boolean,
        style?: StyleParams,
    ): RaphaelElement {
        return this.withStyle(style, () => {
            startAngle = ((startAngle % 360) + 360) % 360;
            endAngle = ((endAngle % 360) + 360) % 360;

            const cent = this.scalePoint(center);
            const radii = this.scaleVector(radius);
            const startVector = polar(radius, startAngle);
            const endVector = polar(radius, endAngle);

            // We round the coordinates to make testing easier, because trig
            // operations return unround numbers.
            const round = (x) => knumber.round(x, 6);
            const startPoint = this.scalePoint([
                round(center[0] + startVector[0]),
                round(center[1] + startVector[1]),
            ]);
            const endPoint = this.scalePoint([
                round(center[0] + endVector[0]),
                round(center[1] + endVector[1]),
            ]);

            const largeAngle =
                (((endAngle - startAngle) % 360) + 360) % 360 > 180;

            return this.raphael.path(
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
        });
    }

    circle(center: Coord, radius: number, style?: StyleParams) {
        return this.withStyle(style, () =>
            this.raphael.ellipse(
                ...this.scalePoint(center),
                ...this.scaleVector([radius, radius]),
            ),
        );
    }

    // (x, y) is coordinate of bottom left corner
    rect(x, y, width, height, style?: StyleParams) {
        return this.withStyle(style, () => {
            // Raphael needs (x, y) to be coordinate of upper left corner
            const corner = this.scalePoint([x, y + height]);
            const dims = this.scaleVector([width, height]);
            const elem = this.raphael.rect(...corner.concat(dims));

            if (this.isMobile) {
                elem.node.style.shapeRendering = "crispEdges";
            }

            return elem;
        });
    }

    ellipse(center, radii, style?: StyleParams) {
        return this.withStyle(style, () =>
            this.raphael.ellipse(
                ...this.scalePoint(center).concat(this.scaleVector(radii)),
            ),
        );
    }

    fixedEllipse(
        center: number | Coord,
        // Different type than Coord, this is radiusX, radiusY
        radii: number | [number, number],
        maxScale: number,
        padding: number,
        style?: StyleParams,
    ): PositionedShape {
        return this.withStyle(style, () => {
            // Scale point and radius
            const scaledPoint = this.scalePoint(center);
            const scaledRadii = this.scaleVector(radii);

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
        });
    }

    private unstyledPath(points: Coord[]): RaphaelElement {
        const p = this.raphael.path(this.svgPath(points));
        p.graphiePath = points;
        return p;
    }

    path(points: Coord[], style?: StyleParams): RaphaelElement {
        return this.withStyle(style, () => {
            return this.unstyledPath(points);
        });
    }

    // fixedPath is a stub that gets overwritten with a function from
    // drawingTools in createGraphie
    fixedPath(
        points: Coord[],
        center: Coord | null,
        createPath: (scaledPoints: Coord[]) => string,
    ): PositionedShape {
        points = points.map(this.scalePoint);
        center = center ? this.scalePoint(center) : null;
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        createPath = createPath || this.svgPath;

        // Compute bounding box
        const xs = points.map((p) => p[0]);
        const ys = points.map((p) => p[1]);
        const pathLeft = Math.min(...xs);
        const pathRight = Math.max(...xs);
        const pathTop = Math.min(...ys);
        const pathBottom = Math.max(...ys);

        // Apply padding to line
        const padding: Coord = [4, 4];

        // Calculate and apply additional offset
        const topLeftOfBoundingBox: Coord = [pathLeft, pathTop];

        // Apply padding and offset to points to convert from
        // canvas coordinates to pixel coordinates relative to bounding box
        points = points.map(function (point) {
            return kvector.add(
                kvector.subtract(point, topLeftOfBoundingBox),
                kvector.scale(padding, 0.5),
            );
        });

        // Calculate <div> dimensions
        const width = pathRight - pathLeft + padding[0];
        const height = pathBottom - pathTop + padding[1];
        const left = topLeftOfBoundingBox[0] - padding[0] / 2;
        const top = topLeftOfBoundingBox[1] - padding[1] / 2;

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

    scaledPath(points: Coord[], style?: StyleParams): RaphaelElement {
        return this.withStyle(style, () => {
            const p = this.raphael.path(
                this.svgPath(points, /* alreadyScaled */ true),
            );
            p.graphiePath = points;
            return p;
        });
    }

    line(start: Coord, end: Coord, style?: StyleParams): RaphaelElement {
        return this.withStyle(style, () => {
            const l = this.unstyledPath([start, end]);

            if (this.isMobile) {
                l.node.style.shapeRendering = "crispEdges";
            }

            return l;
        });
    }

    parabola(
        a: number,
        b: number,
        c: number,
        style?: StyleParams,
    ): RaphaelElement {
        return this.withStyle(style, () =>
            this.raphael.path(this.svgParabolaPath(a, b, c)),
        );
    }

    fixedLine(start: Coord, end: Coord, thickness: number): PositionedShape {
        // Apply padding to line
        const padding: Coord = [thickness, thickness];

        // Scale points to get values in pixels
        start = this.scalePoint(start);
        end = this.scalePoint(end);

        // Calculate and apply additional offset
        const extraOffset: Coord = [
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

    sinusoid(
        a: number,
        b: number,
        c: number,
        d: number,
        style?: StyleParams,
    ): RaphaelElement {
        return this.withStyle(style, () =>
            // Plot a sinusoid of the form: f(x) = a * sin(b * x - c) + d
            this.raphael.path(this.svgSinusoidPath(a, b, c, d)),
        );
    }

    label: LabelMethod = (
        point: Coord,
        text: string,
        direction:
            | "center"
            | "above"
            | "below"
            | "right"
            | "left"
            | "above right"
            | "above left"
            | "below right"
            | "below left",
        arg4?: boolean | StyleParams,
        arg5?: StyleParams,
    ): GraphieLabelElement => {
        const style = typeof arg4 === "object" ? arg4 : arg5;
        const latex = typeof arg4 === "boolean" ? arg4 : true;
        return this.withStyle(style, () => {
            // We cast to GraphieLabelElement because we're augmenting the jQuery
            // element with custom methods (setPosition, processMath, processText)
            const $span = $("<span>").addClass(
                "graphie-label",
            ) as GraphieLabelElement;

            const pad = this.currentStyle["label-distance"];

            $span
                .css({
                    position: "absolute",
                    padding: (pad != null ? pad : 7) + "px",
                    color: "black",
                })
                .data("labelDirection", direction)
                .appendTo(this.el);

            $span.setPosition = (point) => {
                const scaledPoint = this.scalePoint(point);
                $span.css({
                    left: scaledPoint[0],
                    top: scaledPoint[1],
                });
            };

            $span.setPosition(point);

            const span = $span[0];

            $span.processMath = function (math, force) {
                processMath(span, math, force, function () {
                    const width = span.scrollWidth;
                    const height = span.scrollHeight;
                    setLabelMargins(span, [width, height]);
                });
            };

            $span.processText = function (text: string) {
                $span.html(text);
                const width = span.scrollWidth;
                const height = span.scrollHeight;
                setLabelMargins(span, [width, height]);
            };

            if (latex) {
                $span.processMath(text, /* force */ false);
            } else {
                $span.processText(text);
            }

            return $span;
        });
    };

    plotParametric(
        fn: (t: number) => Coord,
        range: Interval,
        style?: StyleParams,
    ): RaphaelElement {
        return this.withStyle(style, () => {
            // We truncate to 500,000, since anything bigger causes
            // overflow in the firefox svg renderer.  This is safe
            // since 500,000 is outside the viewport anyway.  We
            // write these functions the way we do to handle undefined.
            const clip = (xy) => {
                if (Math.abs(xy[1]) > 500000) {
                    return [xy[0], Math.min(Math.max(xy[1], -500000), 500000)];
                }
                return xy;
            };
            const clippedFn = (x) => clip(fn(x));

            const min = range[0];
            const max = range[1];
            let step = (max - min) / (this.currentStyle["plot-points"] || 800);
            if (step === 0) {
                step = 1;
            }

            const paths = this.raphael.set();
            let points: Coord[] = [];
            let lastY = clippedFn(min)[1];

            for (let t = min; t <= max; t += step) {
                const point = clippedFn(t);
                const y = point[1];

                // Find points where it flips
                if (
                    // if there is an asymptote here, meaning that the graph
                    // switches signs and has a large difference
                    (y > 0 !== lastY > 0 &&
                        Math.abs(y - lastY) >
                            2 * this.drawingTransform().pixelsPerUnitY()) ||
                    // or the function is undefined
                    isNaN(y)
                ) {
                    // split the path at this point, and draw it
                    paths.push(this.unstyledPath(points));
                    // restart the path, excluding this point
                    points = [];
                } else {
                    // otherwise, just add the point to the path
                    points.push(point);
                }

                lastY = y;
            }

            paths.push(this.unstyledPath(points));

            return paths;
        });
    }

    plot(
        fn: (x: number) => number,
        range: Interval,
        style?: StyleParams,
    ): RaphaelElement {
        return this.withStyle(style, () => {
            const min = range[0];
            const max = range[1];
            if (!this.currentStyle["plot-points"]) {
                this.currentStyle["plot-points"] =
                    2 * (max - min) * this.drawingTransform().pixelsPerUnitX();
            }

            const parametricFn = (x): Coord => [x, fn(x)];
            return this.plotParametric(parametricFn, range);
        });
    }

    svgPath = (points: (Coord | true)[], alreadyScaled?: boolean) => {
        return points
            .map((point, i) => {
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
            })
            .join("");
    };

    svgParabolaPath = (a: number, b: number, c: number) => {
        const computeParabola = function (x) {
            return (a * x + b) * x + c;
        };

        // If points are collinear, plot a line instead
        if (a === 0) {
            const points: Coord[] = [
                [this.bounds().xMin, computeParabola(this.bounds().xMin)],
                [this.bounds().xMax, computeParabola(this.bounds().xMax)],
            ];
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
        const control: Coord = [vertex[0], vertex[1] - (point[1] - vertex[1])];

        // Calculate mirror points across parabola's axis of symmetry
        const dx = Math.abs(vertex[0] - point[0]);
        const left: Coord = [vertex[0] - dx, point[1]];
        const right: Coord = [vertex[0] + dx, point[1]];

        // Scale and bound
        const points = [left, control, right].map(this.scalePoint);
        const values = points.flat().map(KhanMath.bound);
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

    svgSinusoidPath = (a: number, b: number, c: number, d: number) => {
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

            const points = kvector.zip(xCoords, yCoords);
            return points.map(this.scalePoint);
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

    private withStyle<T>(style: StyleParams | undefined, fn: () => T): T {
        const oldStyle = this.currentStyle;
        this.currentStyle = {
            ...this.currentStyle,
            ...this.processAttributes(style),
        };
        const result = this.postprocessDrawingResult(fn());
        this.currentStyle = oldStyle;
        return result;
    }

    private postprocessDrawingResult(result: any): any {
        // Bad heuristic for recognizing Raphael elements and sets
        const type = result.constructor.prototype;
        if (type === Raphael.el || type === Raphael.st) {
            result.attr(this.currentStyle);

            if (this.currentStyle.arrows) {
                result = this.addArrowheads(result);
            }
        } else if (result instanceof $) {
            // We assume that if it's not a Raphael element/set, it
            // does not contain SVG.
            // @ts-expect-error - TS2339 - Property 'css' does not exist on type '{}'.
            result.css({
                ...this.currentStyle,
                ...SVG_SPECIFIC_STYLE_MASK,
            });
        }

        return result;
    }

    private addArrowheads(path: any) {
        const type = path.constructor.prototype;

        if (type === Raphael.el) {
            if (
                path.type === "path" &&
                typeof path.arrowheadsDrawn === "undefined"
            ) {
                const w = path.attr("stroke-width");
                const s = 0.6 + 0.4 * w;
                const l = path.getTotalLength();
                const set = this.raphael.set();
                const head = this.raphael.path(
                    this.isMobile
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
                subpath = this.raphael.path(subpath).attr(attrs);
                subpath.arrowheadsDrawn = true;
                path.remove();

                // For some unknown reason 0 doesn't work for the rotation
                // origin so we use a tiny number.
                head.rotate(angle, this.isMobile ? 1e-5 : 0.75, 0)
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
                this.addArrowheads(path.items[i]);
            }
        }
        return path;
    }

    scalePoint = (point: number | Coord): Coord => {
        return this.drawingTransform().scalePoint(point);
    };

    scaleVector = (point: number | Coord) => {
        return this.drawingTransform().scaleVector(point);
    };

    unscalePoint = (point: number | Coord) => {
        return this.drawingTransform().unscalePoint(point);
    };

    unscaleVector = (point: number | Coord) => {
        return this.drawingTransform().unscaleVector(point);
    };

    private processAttributes(attrs: Record<string, any> | undefined) {
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
        Object.entries(attrs || {}).forEach(function ([key, value]) {
            const transformer = transformers[key];

            if (typeof transformer === "function") {
                Object.assign(processed, transformer(value));
            } else {
                const dasherized = String(key)
                    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
                    .replace(/([a-z\d])([A-Z])/g, "$1-$2")
                    .toLowerCase();
                processed[dasherized] = value;
            }
        });

        return processed;
    }

    // Graphie puts text spans on top of the SVG, which looks good, but gets
    // in the way of mouse events. This adds another SVG element on top
    // of everything else where we can add invisible shapes with mouse
    // handlers wherever we want.
    addMouseLayer(options: {
        onClick?: MouseHandler;
        onMouseMove?: MouseHandler;
        onMouseDown?: MouseHandler | null;
        onMouseOver?: MouseHandler | null;
        onMouseOut?: MouseHandler | null;
        onMouseUp?: MouseHandler | null;
        allowScratchpad?: boolean;
        setDrawingAreaAvailable?: (available: boolean) => void;
    }): void {
        const localOptions = {
            allowScratchpad: false,
            setDrawingAreaAvailable: function () {},

            ...options,
        };

        const mouselayerZIndex = 2;
        this.mouselayer = Raphael(this.el, this.xpixels, this.ypixels);
        $(this.mouselayer.canvas).css("z-index", mouselayerZIndex);
        if (
            localOptions.onClick ||
            localOptions.onMouseDown ||
            localOptions.onMouseMove ||
            localOptions.onMouseOver ||
            localOptions.onMouseOut
        ) {
            const canvasClickTarget = this.mouselayer
                .rect(0, 0, this.xpixels, this.ypixels)
                .attr({
                    fill: "#000",
                    opacity: 0,
                });
            let isClickingCanvas = false;

            $(this.mouselayer.canvas).on("vmousedown", (e) => {
                if (e.target === canvasClickTarget[0]) {
                    if (localOptions.onMouseDown) {
                        localOptions.onMouseDown(this.getMouseCoord(e));
                    }
                    isClickingCanvas = true;

                    if (localOptions.onMouseMove) {
                        const handler = localOptions.onMouseMove;
                        $(document).bind("vmousemove.mouseLayer", (e) => {
                            if (isClickingCanvas) {
                                e.preventDefault();
                                handler(this.getMouseCoord(e));
                            }
                        });
                    }

                    $(document).bind("vmouseup.mouseLayer", (e) => {
                        $(document).unbind(".mouseLayer");

                        // Only register clicks that started on the canvas,
                        // and not on another mouseLayer target
                        if (isClickingCanvas && localOptions.onClick) {
                            localOptions.onClick(this.getMouseCoord(e));
                        }
                        isClickingCanvas = false;
                    });
                }
            });
            if (localOptions.onMouseOver) {
                const handler = localOptions.onMouseOver;
                $(this.mouselayer.canvas).on("vmouseover", (e) => {
                    handler(this.getMouseCoord(e));
                });
            }
            if (localOptions.onMouseOut) {
                const handler = localOptions.onMouseOut;
                $(this.mouselayer.canvas).on("vmouseout", (e) => {
                    handler(this.getMouseCoord(e));
                });
            }
        }
        if (!localOptions.allowScratchpad) {
            localOptions.setDrawingAreaAvailable?.(false);
        }

        // Add mouse and visible wrapper layers for DOM-node-wrapped movables
        this._mouselayerWrapper = document.createElement("div");
        $(this._mouselayerWrapper).css({
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: mouselayerZIndex,
        });

        this._visiblelayerWrapper = document.createElement("div");
        $(this._visiblelayerWrapper).css({
            position: "absolute",
            left: 0,
            top: 0,
        });

        const el = this.el;
        el.appendChild(this._visiblelayerWrapper);
        el.appendChild(this._mouselayerWrapper);

        // Add functions for adding to wrappers
        this.addToMouseLayerWrapper = (el: any) => {
            this._mouselayerWrapper?.appendChild(el);
        };
        this.addToVisibleLayerWrapper = (el: any) => {
            this._visiblelayerWrapper?.appendChild(el);
        };
    }

    addToMouseLayerWrapper(el: HTMLElement) {
        throw new Error(
            "addToMouseLayerWrapper is not ready. Call addMouseLayer() first.",
        );
    }

    addToVisibleLayerWrapper(el: HTMLElement) {
        throw new Error(
            "addToVisibleLayerWrapper is not ready. Call addMouseLayer() first.",
        );
    }
    /**
     * Get mouse coordinates in pixels
     */
    getMousePx(event: Readonly<{pageX?: number; pageY?: number}>): Coord {
        const offset = $(this.el).offset();

        const mouseX =
            // @ts-expect-error - TS18048 - 'event.pageX' is possibly 'undefined'.
            event.pageX -
            // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
            offset.left;

        const mouseY =
            // @ts-expect-error - TS18048 - 'event.pageY' is possibly 'undefined'.
            event.pageY -
            // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
            offset.top;

        return [mouseX, mouseY];
    }

    /**
     * Get mouse coordinates in graph coordinates
     */
    getMouseCoord(event: Readonly<{pageX?: number; pageY?: number}>): Coord {
        return this.unscalePoint(this.getMousePx(event));
    }
}

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

// A range for a Graphie can be specified in one of three forms:
// - A pair of intervals, [[xMin, xMax], [yMin, yMax]]. This is the
//   "normalized" form.
// - A pair of magnitudes for the x and y ranges, respectively. E.g. [5, 10]
//   is equivalent to [[-5, 5], [-10, 10]].
// - A single magnitude to be used for both x and y. E.g. 10 is equivalent to
//   [[-10, 10], [-10, 10]]
type RangeSpecifier = [Interval, Interval] | Coord | number;

// Overload normalizeRange to specify that it only returns undefined if its
// argument is undefined.
export function normalizeRange(range: RangeSpecifier): [Interval, Interval];
export function normalizeRange(
    range: RangeSpecifier | undefined,
): [Interval, Interval] | undefined;

// normalizeRange converts a RangeSpecifier into a pair of Intervals that give
// the x and y ranges, respectively
export function normalizeRange(
    range: RangeSpecifier | undefined,
): [Interval, Interval] | undefined {
    function normalizeInterval(magnitude: number | Interval): Interval {
        if (typeof magnitude === "number") {
            return [-magnitude, magnitude];
        } else {
            return magnitude;
        }
    }

    function getXAndYRanges(
        range: RangeSpecifier,
    ): Coord | [Interval, Interval] {
        if (Array.isArray(range)) {
            return range;
        } else {
            return [range, range];
        }
    }

    if (range == null) {
        return range;
    }

    const [xRange, yRange] = getXAndYRanges(range);
    return [normalizeInterval(xRange), normalizeInterval(yRange)];
}

function toPair(x: number | [number, number]): [number, number] {
    if (Array.isArray(x)) {
        return x;
    }
    return [x, x];
}

/**
 * Safari applies some SVG-specific styles to things that are not SVGs, so we
 * need to exclude those styles from things that are not SVGs.
 *
 * To see this behavior in action, open https://codepen.io/anon/pen/zENEoa in
 * Safari.
 *
 * Usage `{...someStyles, ...SVG_SPECIFIC_STYLE_MASK}`
 */
const SVG_SPECIFIC_STYLE_MASK = {
    "stroke-width": null,
} as const;

const setLabelMargins = function (span: HTMLElement, size: Coord): void {
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
        const currentHeightMatchesProps = span.scrollHeight === height;

        // We are using jQuery to collect information and calculate a scale
        //     since we don't have a way to pass it to this function.
        // We need the width of the container in order to calculate the scale to apply to the label.
        // Unfortunately, the DOM tree leading to the label is not consistent.
        // Therefore, we need to check different elements and different style properties to get the width of the container.
        // Some graphie labels exist within an ".svg-image" container, and others do not.
        // All graphie labels have a ".graphie" container.
        // When a label has an ".svg-image" container,
        //     the width information in the ".graphie" element is expressed as a percentage instead of pixels,
        //     so we can't use it.
        // Instead, the ".svg-image" container can be used to get the width information.
        // The following lines determine which container element to use for the width measurement.
        const $svgImage = $span.closest(".svg-image");
        const $graphie = $span.closest(".graphie");
        // If an ".svg-image" container exists in the DOM tree, then use it, otherwise use the ".graphie" container.
        const $container = $svgImage.length > 0 ? $svgImage : $graphie;

        // Ensuring that the line-height of the text doesn't throw off placement of the text element.
        // Inherited line-height values can really mess up placement.
        $container.css("line-height", "normal");

        // If the change in line-height affected the height of the element,
        //     then the height used for calculations should be updated.
        // This can happen when the first label in the container calls this method,
        //     and the line-height was different when the height measurement was originally referenced.
        if (currentHeightMatchesProps && span.scrollHeight !== height) {
            height = span.scrollHeight;
        }

        // The expected width of the graphie is found in the "max-width" property on ".svg-image" containers,
        //     and is found in the "width" property on ".graphie" containers.
        const widthValues = $container.css(["max-width", "width"]) ?? {
            // The browser will always return a value, but tests won't, so ensuring something is returned.
            "max-width": "0px",
        };
        const expectedWidth =
            // Verified in Chrome, Firefox, and Safari - all return the same "none" value if the property does not exist.
            widthValues["max-width"] !== "none"
                ? widthValues["max-width"]
                : widthValues["width"];
        // We can calculate the true scale of the graphie by taking actual width and dividing by the expected width.
        // NOTE: Using 'replace' to remove the "px" unit from the end of the expected width value.
        // STOPSHIP: Fix the scaling of Graphie labels
        let scale =
            (($container.width() ?? 0) /
                parseInt(expectedWidth.replace(/px$/, ""))) *
            100;
        // If something failed in the calculation, then default to 100% scale.
        if (isNaN(scale)) {
            scale = 100;
        } else if (scale === 0) {
            scale = 100;
        }

        // Any padding needs to be scaled accordingly.
        const padding = $span.css("padding") ?? "0px";
        const currentPadding = padding !== "none" ? padding : "0px";
        const newPadding =
            Math.round(parseInt(currentPadding.replace(/px$/, "")) * scale) /
            100;

        // "multipliers" basically move the position of the text by using 1, 0, -1
        // 'margin-left' and 'margin-top' are used to position the text.
        // Margin and font size need to be scaled accordingly.
        const multipliers = labelDirections[direction || "center"];
        const styling = {
            marginLeft: Math.round(width * multipliers[0] * scale) / 100,
            marginTop: Math.round(height * multipliers[1] * scale) / 100,
            padding: `${newPadding}px`,
        };
        if (scale !== 1) {
            styling["fontSize"] = `${Math.round(scale * 100) / 100}%`;
        }
        $span.css(styling);
    }
};

const GraphUtils = {
    Graphie,

    createGraphie: function (el: Element): Graphie {
        return new Graphie(el);
    },

    unscaledSvgPath: function (points: (Coord | true)[]): string {
        // If this is an empty closed path, return "" instead of "z", which
        // would give an error
        if (points[0] === true) {
            return "";
        }
        return points
            .map(function (point, i) {
                if (point === true) {
                    return "z";
                }
                return (i === 0 ? "M" : "L") + point[0] + " " + point[1];
            })
            .join("");
    },

    getDistance: function (point1: Coord, point2: Coord): number {
        return kpoint.distanceToPoint(point1, point2);
    },

    // Find the angle in degrees between two or three points
    // This function is deprecated as it has several issues calculating
    // correctly when dealing with reflex angles or the position of point2
    // (LEMS-2202) Remove this function while removing the Legacy Interactive Graph.
    findAngleDeprecated: function (
        point1: Coord,
        point2: Coord,
        vertex?: Coord,
    ) {
        if (vertex === undefined) {
            const x = point1[0] - point2[0];
            const y = point1[1] - point2[1];
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (!x && !y) {
                return 0;
            }
            return (180 + (Math.atan2(-y, -x) * 180) / Math.PI + 360) % 360;
        }
        return (
            GraphUtils.findAngleDeprecated(point1, vertex) -
            GraphUtils.findAngleDeprecated(point2, vertex)
        );
    },

    graphs: {},
};

export default GraphUtils;
