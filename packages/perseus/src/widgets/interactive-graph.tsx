/* eslint-disable @typescript-eslint/no-invalid-this, react/no-unsafe, react/sort-comp */
import {angles, geometry} from "@khanacademy/kmath";
import {
    approximateEqual,
    Errors,
    PerseusError,
} from "@khanacademy/perseus-core";
import {UnreachableCaseError} from "@khanacademy/wonder-stuff-core";
import * as React from "react";
import _ from "underscore";

import Util from "../util";
import {getInteractiveBoxFromSizeClass} from "../util/sizing-utils";
import {getPromptJSON} from "../widget-ai-utils/interactive-graph/interactive-graph-ai-utils";

import {StatefulMafsGraph} from "./interactive-graphs";

import type {StatefulMafsGraphType} from "./interactive-graphs/stateful-mafs-graph";
import type {QuadraticGraphState} from "./interactive-graphs/types";
import type {Coord} from "../interactive2/types";
import type {WidgetExports, WidgetProps} from "../types";
import type {InteractiveGraphPromptJSON} from "../widget-ai-utils/interactive-graph/interactive-graph-ai-utils";
import type {UnsupportedWidgetPromptJSON} from "../widget-ai-utils/unsupported-widget";
import type {
    QuadraticCoefficient,
    SineCoefficient,
    Range,
} from "@khanacademy/kmath";
import type {
    PerseusGraphType,
    PerseusGraphTypeAngle,
    PerseusGraphTypePoint,
    PerseusGraphTypeSegment,
    PerseusInteractiveGraphWidgetOptions,
    GraphRange,
    InteractiveGraphPublicWidgetOptions,
    LockedFigure,
    PerseusImageBackground,
    MarkingsType,
    PerseusInteractiveGraphUserInput,
    AxisLabelLocation,
} from "@khanacademy/perseus-core";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

const {getClockwiseAngle} = angles;

const {getLineEquation, getLineIntersectionString, magnitude, vector} =
    geometry;

const defaultBackgroundImage = {
    url: null,
};

const UNLIMITED = "unlimited" as const;

// Sample background image:
// https://ka-perseus-graphie.s3.amazonaws.com/29c1b0fcd17fe63df0f148fe357044d5d5c7d0bb.png

function numSteps(range: Range, step: number) {
    return Math.floor((range[1] - range[0]) / step);
}

const makeInvalidTypeError = (
    functionName: string,
    graphType: string,
): PerseusError => {
    return new PerseusError(
        `${functionName} called but current graph type is not a '${graphType}'`,
        Errors.NotAllowed,
        {metadata: {graphType}},
    );
};

type RenderProps = {
    /**
     * Where the little black axis lines & labels (ticks) should render.
     * Also known as the tick step. default [1, 1]
     *
     * NOTE(kevinb): perseus_data.go defines this as Array<number>
     */
    step: [number, number];
    /**
     * Where the grid lines on the graph will render. default [1, 1]
     *
     * NOTE(kevinb): perseus_data.go defines this as Array<number>
     */
    gridStep?: [x: number, y: number];
    /**
     * Where the graph points will lock to when they are dragged. default [0.5, 0.5]
     *
     * NOTE(kevinb): perseus_data.go defines this as Array<number>
     */
    snapStep?: [x: number, y: number];
    /**
     * An optional image to use in the background
     */
    backgroundImage?: PerseusImageBackground;
    /**
     * The type of markings to display on the graph.
     * - axes: shows the axes without the gride lines
     * - graph: shows the axes and the grid lines
     * - grid: shows only the grid lines
     * - none: shows no markings
     */
    markings: MarkingsType;
    /**
     * How to label the X and Y axis.  default: ["x", "y"]
     */
    labels: string[];
    /**
     * Where to put the axis labels on the graph.  default: "onAxis"
     */
    labelLocation: AxisLabelLocation;
    /**
     * Whether to show the Protractor tool overlaid on top of the graph
     */
    showProtractor: boolean;
    /**
     * Whether to show the Ruler tool overlaid on top of the graph.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    showRuler?: boolean;
    /**
     * Whether to show tooltips on the graph
     */
    showTooltips?: boolean;
    /**
     * The unit to show on the ruler.  e.g. "mm", "cm",  "m", "km", "in", "ft",
     * "yd", "mi".
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerLabel?: string;
    /**
     * How many ticks to show on the ruler.  e.g. 1, 2, 4, 8, 10, 16. Must be
     * an integer.
     * @deprecated - no longer used by the InteractiveGraph widget. The
     * property is kept on this type to prevent its accidental reuse in future
     * features, since it may appear in production data.
     */
    rulerTicks?: number;
    /**
     * The X and Y coordinate ranges for the view of the graph.  default: [[-10, 10], [-10, 10]]
     *
     * NOTE(kevinb): perseus_data.go defines this as Array<Array<number>>
     */
    // TODO(kevinb): Add a transform function to interactive-graph.jsx to
    // rename `range` to `ranges` so that things are less confusing.
    range: GraphRange;
    /**
     * The correct answer for this widget. Will be undefined if the graph is
     * being provided answerless data (e.g. because the learner has not yet
     * submitted their guess).
     */
    // TODO(LEMS-2344): make the type of `correct` more specific
    correct?: PerseusGraphType;
    /**
     * Shapes (points, chords, etc) displayed on the graph that cannot be moved
     * by the user.
     */
    lockedFigures: LockedFigure[];
    /**
     * Aria label that applies to the entire graph.
     */
    fullGraphAriaLabel?: string;
    /**
     * Aria description that applies to the entire graph.
     */
    fullGraphAriaDescription?: string;
}; // There's no transform function in exports
type Props = WidgetProps<RenderProps, PerseusInteractiveGraphUserInput>;
type State = any;
type DefaultProps = {
    labels: string[];
    labelLocation: Props["labelLocation"];
    range: Props["range"];
    step: Props["step"];
    backgroundImage: Props["backgroundImage"];
    markings: Props["markings"];
    showTooltips: Props["showTooltips"];
    showProtractor: Props["showProtractor"];
    userInput: Props["userInput"];
};

// Assert that the PerseusInteractiveGraphWidgetOptions parsed from JSON can be
// passed as props to this component. This ensures that the
// PerseusInteractiveGraphWidgetOptions type stays in sync with the prop types.
// The PropsFor<Component> type takes defaultProps into account, which is
// important because PerseusInteractiveGraphWidgetOptions has optional fields
// which receive defaults via defaultProps.
0 as any as WidgetProps<
    PerseusInteractiveGraphWidgetOptions,
    PerseusInteractiveGraphUserInput
> satisfies PropsFor<typeof InteractiveGraph>;

0 as any as WidgetProps<
    InteractiveGraphPublicWidgetOptions,
    PerseusInteractiveGraphUserInput
> satisfies PropsFor<typeof InteractiveGraph>;

// TODO: there's another, very similar getSinusoidCoefficients function
// they should probably be merged
function getSinusoidCoefficients(coords: Coord[]): SineCoefficient {
    // It's assumed that p1 is the root and p2 is the first peak
    const p1 = coords[0];
    const p2 = coords[1];

    // Resulting coefficients are canonical for this sine curve
    const amplitude = p2[1] - p1[1];
    const angularFrequency = Math.PI / (2 * (p2[0] - p1[0]));
    const phase = p1[0] * angularFrequency;
    const verticalOffset = p1[1];

    return [amplitude, angularFrequency, phase, verticalOffset];
}

// TODO: there's another, very similar getQuadraticCoefficients function
// they should probably be merged
function getQuadraticCoefficients(coords: Coord[]): QuadraticCoefficient {
    const p1 = coords[0];
    const p2 = coords[1];
    const p3 = coords[2];

    const denom = (p1[0] - p2[0]) * (p1[0] - p3[0]) * (p2[0] - p3[0]);
    if (denom === 0) {
        // Many of the callers assume that the return value is always defined.
        // @ts-expect-error - TS2322 - Type 'undefined' is not assignable to type 'QuadraticCoefficient'.
        return;
    }
    const a =
        (p3[0] * (p2[1] - p1[1]) +
            p2[0] * (p1[1] - p3[1]) +
            p1[0] * (p3[1] - p2[1])) /
        denom;
    const b =
        (p3[0] * p3[0] * (p1[1] - p2[1]) +
            p2[0] * p2[0] * (p3[1] - p1[1]) +
            p1[0] * p1[0] * (p2[1] - p3[1])) /
        denom;
    const c =
        (p2[0] * p3[0] * (p2[0] - p3[0]) * p1[1] +
            p3[0] * p1[0] * (p3[0] - p1[0]) * p2[1] +
            p1[0] * p2[0] * (p1[0] - p2[0]) * p3[1]) /
        denom;
    return [a, b, c];
}

class InteractiveGraph extends React.Component<Props, State> {
    mafsRef = React.createRef<StatefulMafsGraphType>();

    static defaultProps: DefaultProps = {
        labels: ["x", "y"],
        labelLocation: "onAxis",
        range: [
            [-10, 10],
            [-10, 10],
        ],
        step: [1, 1],
        backgroundImage: defaultBackgroundImage,
        markings: "graph",
        showTooltips: false,
        showProtractor: false,
        userInput: {
            type: "linear",
        },
    };

    getUserInput(): PerseusInteractiveGraphUserInput {
        if (this.mafsRef.current?.getUserInput) {
            return this.mafsRef.current.getUserInput();
        }
        throw new PerseusError(
            "Cannot getUserInput from a graph that has never rendered",
            Errors.NotAllowed,
        );
    }

    getPromptJSON(): InteractiveGraphPromptJSON | UnsupportedWidgetPromptJSON {
        return getPromptJSON(this.props, this.getUserInput());
    }

    /**
     * @deprecated and likely very broken API
     * [LEMS-3185] do not trust serializedState/restoreSerializedState
     */
    getSerializedState() {
        const {userInput: _, ...rest} = this.props;
        return {
            ...rest,
            graph: this.props.userInput,
        };
    }

    render() {
        const box = getInteractiveBoxFromSizeClass(
            this.props.containerSizeClass,
        );
        const gridStep =
            this.props.gridStep ||
            Util.getGridStep(this.props.range, this.props.step, box[0]);
        const snapStep =
            this.props.snapStep || Util.snapStepFromGridStep(gridStep);

        const mafsProps = {
            ...this.props,
            graph: this.props.userInput,
            onChange: () =>
                this.props.handleUserInput(
                    // StatefulMafsGraph maintains its own internal state
                    // and manipulates that state when calling getUserInput.
                    // So we watch for changes in StatefulMafsGraph and call
                    // getUserInput so we can pass the parent the most up-to-date
                    // user input.
                    this.mafsRef.current?.getUserInput() as PerseusGraphType,
                ),
        };

        return (
            <StatefulMafsGraph
                {...mafsProps}
                ref={this.mafsRef}
                gridStep={gridStep}
                snapStep={snapStep}
                box={box}
                showTooltips={!!this.props.showTooltips}
                readOnly={this.props.apiOptions?.readOnly}
            />
        );
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getLineCoords(graph: PerseusGraphType, props: Props): Coord[] {
        return (
            // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
            graph.coords ||
            InteractiveGraph.pointsFromNormalized(props, [
                [0.25, 0.75],
                [0.75, 0.75],
            ])
        );
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getPointCoords(graph: PerseusGraphTypePoint, props: Props): Coord[] {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const numPoints = graph.numPoints || 1;
        let coords = graph.coords;

        if (coords) {
            return coords;
        }
        switch (numPoints) {
            case 1:
                // Back in the day, one point's coords were in graph.coord
                coords = [graph.coord || [0, 0]];
                break;
            case 2:
                coords = [
                    [-5, 0],
                    [5, 0],
                ];
                break;
            case 3:
                coords = [
                    [-5, 0],
                    [0, 0],
                    [5, 0],
                ];
                break;
            case 4:
                coords = [
                    [-6, 0],
                    [-2, 0],
                    [2, 0],
                    [6, 0],
                ];
                break;
            case 5:
                coords = [
                    [-6, 0],
                    [-3, 0],
                    [0, 0],
                    [3, 0],
                    [6, 0],
                ];
                break;
            case 6:
                coords = [
                    [-5, 0],
                    [-3, 0],
                    [-1, 0],
                    [1, 0],
                    [3, 0],
                    [5, 0],
                ];
                break;
            case UNLIMITED:
                coords = [];
                break;
        }
        // Transform coords from their -10 to 10 space to 0 to 1
        // because of the old graph.coord, and also it's easier.
        const range = [
            [-10, 10],
            [-10, 10],
        ];
        // @ts-expect-error - TS2345 - Argument of type 'readonly Coord[] | undefined' is not assignable to parameter of type 'readonly Coord[]'.
        const newCoords = InteractiveGraph.normalizeCoords(coords, range);

        return InteractiveGraph.pointsFromNormalized(props, newCoords);
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getLinearSystemCoords(
        graph: PerseusGraphType,
        props: Props,
    ): Coord[][] {
        return (
            // The callers assume that we're return an array of points
            // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
            graph.coords ||
            _.map(
                [
                    [
                        [0.25, 0.75],
                        [0.75, 0.75],
                    ],
                    [
                        [0.25, 0.25],
                        [0.75, 0.25],
                    ],
                ] as Coord[][],
                (coords) => {
                    return InteractiveGraph.pointsFromNormalized(props, coords);
                },
            )
        );
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getPolygonCoords(graph: PerseusGraphType, props: Props): Coord[] {
        if (graph.type !== "polygon") {
            throw makeInvalidTypeError("toggleShowSides", "polygon");
        }

        let coords = graph.coords;
        if (coords) {
            return coords;
        }

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const n = graph.numSides || 3;

        if (n === UNLIMITED) {
            coords = [];
        } else {
            const angle = (2 * Math.PI) / n;
            const offset = (1 / n - 1 / 2) * Math.PI;

            // TODO(alex): Generalize this to more than just triangles so that
            // all polygons have whole number side lengths if snapping to sides
            const radius =
                graph.snapTo === "sides" ? (Math.sqrt(3) / 3) * 7 : 4;

            // Generate coords of a regular polygon with n sides
            coords = _.times(n, function (i) {
                return [
                    radius * Math.cos(i * angle + offset),
                    radius * Math.sin(i * angle + offset),
                ];
            });
        }

        const ranges: [Range, Range] = [
            [-10, 10],
            [-10, 10],
        ];
        coords = InteractiveGraph.normalizeCoords(coords, ranges);

        const snapToGrid = !_.contains(["angles", "sides"], graph.snapTo);
        coords = InteractiveGraph.pointsFromNormalized(
            props,
            coords,
            /* noSnap */ !snapToGrid,
        );

        return coords;
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getSegmentCoords(
        graph: PerseusGraphTypeSegment,
        props: Props,
    ): Coord[][] {
        const coords = graph.coords;
        if (coords) {
            return coords;
        }

        const n = graph.numSegments || 1;
        // @ts-expect-error - TS2322 - Type 'number[] | undefined' is not assignable to type 'number[]'.
        const ys: number[] = {
            1: [5],
            2: [5, -5],
            3: [5, 0, -5],
            4: [6, 2, -2, -6],
            5: [6, 3, 0, -3, -6],
            6: [5, 3, 1, -1, -3, -5],
        }[n];
        const range = [
            [-10, 10],
            [-10, 10],
        ];

        // @ts-expect-error - TS2322 - Type 'number[][][]' is not assignable to type 'readonly (readonly Coord[])[]'.
        return ys.map(function (y) {
            let segment = [
                [-5, y],
                [5, y],
            ];
            // @ts-expect-error - TS4104 - The type 'readonly Coord[]' is 'readonly' and cannot be assigned to the mutable type 'number[][]'. | TS2345 - Argument of type 'number[][]' is not assignable to parameter of type 'readonly Coord[]'.
            segment = InteractiveGraph.normalizeCoords(segment, range);
            // @ts-expect-error - TS4104 - The type 'readonly Coord[]' is 'readonly' and cannot be assigned to the mutable type 'number[][]'. | TS2345 - Argument of type 'number[][]' is not assignable to parameter of type 'readonly Coord[]'.
            segment = InteractiveGraph.pointsFromNormalized(props, segment);
            return segment;
        });
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getAngleCoords(
        graph: PerseusGraphTypeAngle,
        props: Props,
    ): [Coord, Coord, Coord] {
        let coords = graph.coords;
        if (coords) {
            return coords;
        }

        const snap = graph.snapDegrees || 1;
        let angle = snap;
        while (angle < 20) {
            angle += snap;
        }
        angle = (angle * Math.PI) / 180;
        const offset = ((graph.angleOffsetDeg || 0) * Math.PI) / 180;

        coords = InteractiveGraph.pointsFromNormalized(props, [
            [0.85, 0.5],
            [0.5, 0.5],
        ]) as [Coord, Coord, Coord];

        // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type 'readonly Coord[]'. | TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
        const radius = magnitude(vector(...coords));

        // Adjust the lower point by angleOffsetDeg degrees
        coords[0] = [
            coords[1][0] + radius * Math.cos(offset),
            coords[1][1] + radius * Math.sin(offset),
        ];
        // Position the upper point angle radians from the
        // lower point
        coords[2] = [
            coords[1][0] + radius * Math.cos(angle + offset),
            coords[1][1] + radius * Math.sin(angle + offset),
        ];

        return coords;
    }

    static normalizeCoords(
        coordsList: Coord[],
        ranges: [Range, Range],
    ): Coord[] {
        // @ts-expect-error - TS2322 - Type 'number[][]' is not assignable to type 'readonly Coord[]'.
        return _.map(coordsList, function (coords) {
            return _.map(coords, function (coord, i) {
                const extent = ranges[i][1] - ranges[i][0];
                return (coord + ranges[i][1]) / extent;
            });
        });
    }

    static getEquationString(props: Props): string {
        const type = props.userInput.type;
        switch (type) {
            case "none":
                return InteractiveGraph.getNoneEquationString();
            case "linear":
                return InteractiveGraph.getLinearEquationString(props);
            case "quadratic":
                return InteractiveGraph.getQuadraticEquationString(props);
            case "sinusoid":
                return InteractiveGraph.getSinusoidEquationString(props);
            case "circle":
                return InteractiveGraph.getCircleEquationString(props);
            case "linear-system":
                return InteractiveGraph.getLinearSystemEquationString(props);
            case "point":
                return InteractiveGraph.getPointEquationString(props);
            case "segment":
                return InteractiveGraph.getSegmentEquationString(props);
            case "ray":
                return InteractiveGraph.getRayEquationString(props);
            case "polygon":
                return InteractiveGraph.getPolygonEquationString(props);
            case "angle":
                return InteractiveGraph.getAngleEquationString(props);
            default:
                throw new UnreachableCaseError(type);
        }
    }

    static pointsFromNormalized(
        props: Props,
        coordsList: Coord[],
        noSnap?: boolean,
    ): Coord[] {
        // @ts-expect-error - TS2322 - Type 'number[][]' is not assignable to type 'readonly Coord[]'.
        return _.map(coordsList, function (coords) {
            return _.map(coords, function (coord, i) {
                const range: Range = props.range[i];
                if (noSnap) {
                    return range[0] + (range[1] - range[0]) * coord;
                }
                const step = props.step[i];
                const nSteps = numSteps(range, step);
                const tick = Math.round(coord * nSteps);
                return range[0] + step * tick;
            });
        });
    }

    static getNoneEquationString(): string {
        return "";
    }

    static getLinearEquationString(props: Props): string {
        const coords = InteractiveGraph.getLineCoords(props.userInput, props);
        if (approximateEqual(coords[0][0], coords[1][0])) {
            return "x = " + coords[0][0].toFixed(3);
        }
        const m = (coords[1][1] - coords[0][1]) / (coords[1][0] - coords[0][0]);
        const b = coords[0][1] - m * coords[0][0];
        if (approximateEqual(m, 0)) {
            return "y = " + b.toFixed(3);
        }
        return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
    }

    static getCurrentQuadraticCoefficients(props: Props): QuadraticCoefficient {
        // TODO(alpert): Don't duplicate
        const coords =
            // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
            props.userInput.coords ||
            InteractiveGraph.defaultQuadraticCoords(props);
        return getQuadraticCoefficients(coords);
    }

    static defaultQuadraticCoords(props: Props): QuadraticGraphState["coords"] {
        const coords = [
            [0.25, 0.75],
            [0.5, 0.25],
            [0.75, 0.75],
        ];
        // @ts-expect-error - TS2345 - Argument of type 'number[][]' is not assignable to parameter of type 'readonly Coord[]'.
        return InteractiveGraph.pointsFromNormalized(props, coords);
    }

    static getQuadraticEquationString(props: Props): string {
        const coeffs = InteractiveGraph.getCurrentQuadraticCoefficients(props);
        return (
            "y = " +
            coeffs[0].toFixed(3) +
            "x^2 + " +
            coeffs[1].toFixed(3) +
            "x + " +
            coeffs[2].toFixed(3)
        );
    }

    static getCurrentSinusoidCoefficients(props: Props): SineCoefficient {
        const coords =
            // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
            props.userInput.coords ||
            InteractiveGraph.defaultSinusoidCoords(props);
        return getSinusoidCoefficients(coords);
    }

    static defaultSinusoidCoords(props: Props): Coord[] {
        const coords = [
            [0.5, 0.5],
            [0.65, 0.6],
        ];
        // @ts-expect-error - TS2345 - Argument of type 'number[][]' is not assignable to parameter of type 'readonly Coord[]'.
        return InteractiveGraph.pointsFromNormalized(props, coords);
    }

    static getSinusoidEquationString(props: Props): string {
        const coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(props);
        return (
            "y = " +
            coeffs[0].toFixed(3) +
            "sin(" +
            coeffs[1].toFixed(3) +
            "x - " +
            coeffs[2].toFixed(3) +
            ") + " +
            coeffs[3].toFixed(3)
        );
    }

    static getCircleEquationString(props: Props): string {
        const graph = props.userInput;
        // TODO(alpert): Don't duplicate
        // @ts-expect-error - TS2339 - Property 'center' does not exist on type 'PerseusGraphType'.
        const center = graph.center || [0, 0];
        // @ts-expect-error - TS2339 - Property 'radius' does not exist on type 'PerseusGraphType'.
        const radius = graph.radius || 2;
        return (
            "center (" + center[0] + ", " + center[1] + "), radius " + radius
        );
    }

    static getLinearSystemEquationString(props: Props): string {
        const coords = InteractiveGraph.getLinearSystemCoords(
            props.userInput,
            props,
        );

        return (
            "\n" +
            getLineEquation(coords[0][0], coords[0][1]) +
            "\n" +
            getLineEquation(coords[1][0], coords[1][1]) +
            "\n" +
            getLineIntersectionString(coords[0], coords[1])
        );
    }

    static getPointEquationString(props: Props): string {
        if (props.userInput.type !== "point") {
            throw makeInvalidTypeError("getPointEquationString", "point");
        }

        const coords = InteractiveGraph.getPointCoords(props.userInput, props);
        return coords
            .map(function (coord) {
                return "(" + coord[0] + ", " + coord[1] + ")";
            })
            .join(", ");
    }

    static getSegmentEquationString(props: Props): string {
        if (props.userInput.type !== "segment") {
            throw makeInvalidTypeError("getSegmentEquationString", "segment");
        }

        const segments = InteractiveGraph.getSegmentCoords(
            props.userInput,
            props,
        );
        return _.map(segments, function (segment) {
            return (
                "[" +
                _.map(segment, function (coord) {
                    return "(" + coord.join(", ") + ")";
                }).join(" ") +
                "]"
            );
        }).join(" ");
    }

    static getRayEquationString(props: Props): string {
        if (props.userInput.type !== "ray") {
            throw makeInvalidTypeError("createPointForPolygonType", "ray");
        }

        const coords = InteractiveGraph.getLineCoords(props.userInput, props);
        const a = coords[0];
        const b = coords[1];
        let eq = InteractiveGraph.getLinearEquationString(props);

        if (a[0] > b[0]) {
            eq += " (for x <= " + a[0].toFixed(3) + ")";
        } else if (a[0] < b[0]) {
            eq += " (for x >= " + a[0].toFixed(3) + ")";
        } else if (a[1] > b[1]) {
            eq += " (for y <= " + a[1].toFixed(3) + ")";
        } else {
            eq += " (for y >= " + a[1].toFixed(3) + ")";
        }

        return eq;
    }

    static getPolygonEquationString(props: Props): string {
        if (props.userInput.type !== "polygon") {
            throw makeInvalidTypeError("getPolygonEquationString", "polygon");
        }
        const coords = InteractiveGraph.getPolygonCoords(
            props.userInput,
            props,
        );
        return _.map(coords, function (coord) {
            return "(" + coord.join(", ") + ")";
        }).join(" ");
    }

    static getAngleEquationString(props: Props): string {
        if (props.userInput.type !== "angle") {
            throw makeInvalidTypeError("getAngleEquationString", "angle");
        }
        const coords = InteractiveGraph.getAngleCoords(props.userInput, props);
        const allowReflexAngles = props.userInput.allowReflexAngles;
        const angle = getClockwiseAngle(coords, allowReflexAngles);
        return (
            angle.toFixed(0) +
            "\u00B0 angle" +
            " at (" +
            coords[1].join(", ") +
            ")"
        );
    }
}

/**
 * @deprecated and likely a very broken API
 * [LEMS-3185] do not trust serializedState/restoreSerializedState
 */
function getUserInputFromSerializedState(
    serializedState: any,
): PerseusInteractiveGraphUserInput {
    return serializedState.graph;
}

function getStartUserInput(options: InteractiveGraphPublicWidgetOptions) {
    return options.graph;
}

export default {
    name: "interactive-graph",
    displayName: "Interactive graph",
    widget: InteractiveGraph,
    getStartUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof InteractiveGraph>;
