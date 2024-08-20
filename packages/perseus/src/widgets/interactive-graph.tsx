/* eslint-disable @babel/no-invalid-this, react/no-unsafe, react/sort-comp */
import {number as knumber, point as kpoint} from "@khanacademy/kmath";
import {Errors, PerseusError} from "@khanacademy/perseus-core";
import $ from "jquery";
import debounce from "lodash.debounce";
import * as React from "react";
import _ from "underscore";

import Graph from "../components/graph";
import {PerseusI18nContext} from "../components/i18n-context";
import Interactive2 from "../interactive2";
import WrappedLine from "../interactive2/wrapped-line";
import Util from "../util";
import KhanColors from "../util/colors";
import {
    angleMeasures,
    canonicalSineCoefficients,
    ccw,
    collinear,
    getLineEquation,
    getLineIntersection,
    intersects,
    lawOfCosines,
    magnitude,
    rotate,
    sign,
    similar,
    vector,
} from "../util/geometry";
import GraphUtils from "../util/graph-utils";
import {polar} from "../util/graphie";
import {getInteractiveBoxFromSizeClass} from "../util/sizing-utils";

import {StatefulMafsGraph} from "./interactive-graphs";

import type {QuadraticGraphState} from "./interactive-graphs/types";
import type {Coord} from "../interactive2/types";
import type {
    PerseusGraphType,
    PerseusGraphTypeAngle,
    PerseusGraphTypePoint,
    PerseusGraphTypePolygon,
    PerseusGraphTypeSegment,
    PerseusInteractiveGraphWidgetOptions,
} from "../perseus-types";
import type {Widget} from "../renderer";
import type {
    ChangeHandler,
    PerseusScore,
    WidgetExports,
    WidgetProps,
} from "../types";
import type {
    QuadraticCoefficient,
    Range,
    SineCoefficient,
} from "../util/geometry";

const {DeprecationMixin} = Util;

const TRASH_ICON_URI =
    "https://ka-perseus-graphie.s3.amazonaws.com/b1452c0d79fd0f7ff4c3af9488474a0a0decb361.png";

const defaultBackgroundImage = {
    url: null,
};

const eq = Util.eq;
const deepEq = Util.deepEq;

const UNLIMITED = "unlimited" as const;

// Sample background image:
// https://ka-perseus-graphie.s3.amazonaws.com/29c1b0fcd17fe63df0f148fe357044d5d5c7d0bb.png

// default to defaultValue if actual is null or undefined
function defaultVal<T>(actual: T | null | undefined, defaultValue: T): T {
    return actual == null ? defaultValue : actual;
}

// Less than or approximately equal
function leq(a: any, b) {
    return a < b || eq(a, b);
}

function capitalize(str) {
    return str.replace(/(?:^|-)(.)/g, function (match, letter) {
        return letter.toUpperCase();
    });
}

function numSteps(range: Range, step: number) {
    return Math.floor((range[1] - range[0]) / step);
}

const deprecatedProps = {
    showGraph: function (props) {
        return {markings: props.showGraph ? "graph" : "none"};
    },
} as const;

const _getShouldShowInstructions: (arg1: Props) => boolean = (props) => {
    return (
        _isClickToAddPoints(props) &&
        // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'. | TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
        (props.graph.coords == null || props.graph.coords.length === 0)
    );
};

const _isClickToAddPoints: (arg1: Props) => boolean = (props) => {
    return (
        (props.graph.type === "point" && props.graph.numPoints === UNLIMITED) ||
        (props.graph.type === "polygon" && props.graph.numSides === UNLIMITED)
    );
};

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

type RenderProps = PerseusInteractiveGraphWidgetOptions; // There's no transform function in exports
export type Rubric = {
    correct: PerseusGraphType;
    graph: PerseusGraphType;
};
type Props = WidgetProps<RenderProps, Rubric>;
type State = any;
type DefaultProps = {
    labels: Props["labels"];
    range: Props["range"];
    step: Props["step"];
    backgroundImage: Props["backgroundImage"];
    markings: Props["markings"];
    showTooltips: Props["showTooltips"];
    showProtractor: Props["showProtractor"];
    graph: Props["graph"];
};

// (LEMS-2190): Move the Mafs Angle Graph coordinate reversal logic in interactive-graph-state.ts
// to this file when we remove the legacy graph. This logic allows us to support bi-directional angles
// for the new (non-reflexive) Mafs graphs, while maintaining the same scoring behaviour as the legacy graph.
// Once the legacy graph is removed, we should move this logic directly into the validate function below.
class LegacyInteractiveGraph extends React.Component<Props, State> {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    angle: any | null | undefined;
    circle: any | null | undefined;
    graphie: any | null | undefined;
    horizHairline: any | null | undefined;
    line: any | null | undefined;
    lines: ReadonlyArray<ReadonlyArray<Coord>> | null | undefined;
    parabola: any | null | undefined;
    pointA: any | null | undefined;
    pointB: any | null | undefined;
    pointC: any | null | undefined;
    // @ts-expect-error - TS2564 - Property 'points' has no initializer and is not definitely assigned in the constructor.
    points: Array<any>;
    polygon: any | null | undefined;
    // @ts-expect-error - TS2564 - Property 'shouldResetGraphie' has no initializer and is not definitely assigned in the constructor.
    shouldResetGraphie: boolean;
    sinusoid: any | null | undefined;
    trashCan: any | null | undefined;
    vertHairline: any | null | undefined;

    static defaultProps: DefaultProps = {
        labels: ["x", "y"],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        step: [1, 1],
        backgroundImage: defaultBackgroundImage,
        markings: "graph",
        showTooltips: false,
        showProtractor: false,
        graph: {
            type: "linear",
        },
    };

    state: State = {
        shouldShowInstructions: _getShouldShowInstructions(this.props),
    };

    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        DeprecationMixin.UNSAFE_componentWillMount.call(this);
    }

    componentDidMount() {
        if (this.refs.graph) {
            // eslint-disable-next-line react/no-string-refs
            // @ts-expect-error - TS2339 - Property 'graphie' does not exist on type 'ReactInstance'.
            this.setGraphie(this.refs.graph.graphie());
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props) {
        if (this.isClickToAddPoints() !== this.isClickToAddPoints(nextProps)) {
            this.shouldResetGraphie = true;
            this.setState({
                shouldShowInstructions: _getShouldShowInstructions(nextProps),
            });
        }

        if (
            this.props.backgroundImage?.url !==
                nextProps.backgroundImage?.url ||
            this.props.backgroundImage !== nextProps.backgroundImage ||
            this.props.containerSizeClass !== nextProps.containerSizeClass
        ) {
            this.shouldResetGraphie = true;
        }
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        // TODO(jeremy): This feels underspecified. For example, if the props
        // change the coords of a segment graph, but not the numSegments, we'd
        // not count that as an update.
        const oldType = prevProps.graph.type;
        const newType = this.props.graph.type;
        if (
            oldType !== newType ||
            (prevProps.graph.type === "angle" &&
                this.props.graph.type === "angle" &&
                this.areAngleGraphsEqual(prevProps.graph, this.props.graph)) ||
            (prevProps.graph.type === "point" &&
                this.props.graph.type === "point" &&
                this.arePointGraphsEqual(prevProps.graph, this.props.graph)) ||
            (prevProps.graph.type === "polygon" &&
                this.props.graph.type === "polygon" &&
                this.arePolygonGraphsEqual(
                    prevProps.graph,
                    this.props.graph,
                )) ||
            (prevProps.graph.type === "segment" &&
                this.props.graph.type === "segment" &&
                this.areSegmentGraphsEqual(prevProps.graph, this.props.graph))
        ) {
            this["remove" + capitalize(oldType) + "Controls"]();
            this["add" + capitalize(newType) + "Controls"]();
        }
        if (this.shouldResetGraphie) {
            this.resetGraphie();
        }
    }

    _getShouldShowInstructions: (arg1?: Props | null | undefined) => boolean = (
        props,
    ) => {
        props = props || this.props;
        return (
            this.isClickToAddPoints(props) &&
            // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'. | TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
            (props.graph.coords == null || props.graph.coords.length === 0)
        );
    };

    deprecatedProps: any = deprecatedProps;

    setGraphie: (arg1: any) => void = (newGraphie) => {
        this.graphie = newGraphie;
        this.setupGraphie();
    };

    handleAddPointsMouseDown: (arg1: Coord) => void = (coord) => {
        // This function should only be called when this.isClickToAddPoints()
        // is true
        if (!this.isClickToAddPoints()) {
            throw new PerseusError(
                "handleAddPointsClick should not be registered" +
                    "when isClickToAddPoints() is false",
                Errors.NotAllowed,
            );
        }
        if (!this.isCoordInTrash(coord)) {
            let point;

            if (this.props.graph.type === "point") {
                point = this.createPointForPointsType(
                    coord,
                    this.points.length,
                );
                if (!point.constrain()) {
                    point.remove();
                    return;
                }
                this.points.push(point);

                // interactive2 allows us to grab the point
                const idx = this.points.length - 1;
                this.points[idx].grab(coord);

                this.updateCoordsFromPoints();
            } else if (this.props.graph.type === "polygon") {
                if (this.polygon?.closed()) {
                    return;
                }
                point = this.createPointForPolygonType(
                    coord,
                    this.points.length,
                );
                this.points.push(point);

                const idx = this.points.length - 1;
                this.points[idx].grab(coord);

                // We don't call updateCoordsFromPoints for
                // polygons, since the polygon won't be
                // closed yet.
                this.updatePolygon();
            }

            this.setState({
                shouldShowInstructions: false,
            });
        }
    };

    resetGraphie: () => void = () => {
        this.shouldResetGraphie = false;
        this.parabola = null;
        this.sinusoid = null;
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'reset' does not exist on type 'ReactInstance'.
        this.refs.graph?.reset();
    };

    setupGraphie: () => void = () => {
        this.setTrashCanVisibility(0);
        if (this.isClickToAddPoints()) {
            this.setTrashCanVisibility(0.5);
        }

        if (this.props.apiOptions.isMobile) {
            this.horizHairline = new WrappedLine(this.graphie, [0, 0], [0, 0], {
                normalStyle: {
                    strokeWidth: 1,
                },
            });
            this.horizHairline.attr({
                stroke: KhanColors.INTERACTIVE,
            });
            this.horizHairline?.hide();

            this.vertHairline = new WrappedLine(this.graphie, [0, 0], [0, 0], {
                normalStyle: {
                    strokeWidth: 1,
                },
            });
            this.vertHairline.attr({
                stroke: KhanColors.INTERACTIVE,
            });
            this.vertHairline?.hide();
        }

        const type = this.props.graph.type;
        this["add" + capitalize(type) + "Controls"]();
    };

    showHairlines: (arg1: Coord) => void = (point) => {
        if (this.props.apiOptions.isMobile && this.props.markings !== "none") {
            // Hairlines are already initialized when the graph is loaded, so
            // here we just move them to the updated location and make them
            // visible.
            this.horizHairline?.moveTo(
                [this.props.range[0][0], point[1]],
                [this.props.range[0][1], point[1]],
            );

            this.horizHairline?.show();

            this.vertHairline?.moveTo(
                [point[0], this.props.range[1][0]],
                [point[0], this.props.range[1][1]],
            );

            this.vertHairline?.show();
        }
    };

    hideHairlines: () => void = () => {
        if (this.props.apiOptions.isMobile) {
            this.horizHairline?.hide();
            this.vertHairline?.hide();
        }
    };

    setTrashCanVisibility: (arg1: number) => void = (opacity) => {
        const graphie = this.graphie;

        if (knumber.equal(opacity, 0)) {
            if (this.trashCan) {
                this.trashCan.remove();
                this.trashCan = null;
            }
        } else if (!this.props.apiOptions.isMobile) {
            // Only if trash tooltips are not being used, we initialize the old
            // trash can area.
            if (!this.trashCan) {
                this.trashCan = graphie?.raphael?.image(
                    TRASH_ICON_URI,
                    graphie.xpixels - 40,
                    graphie.ypixels - 40,
                    40,
                    40,
                );
            }
            this.trashCan?.attr({
                opacity: opacity,
            });
        }
    };

    isClickToAddPoints: (arg1?: Props | null | undefined) => boolean = (
        props,
    ) => {
        props = props || this.props;
        return _isClickToAddPoints(props);
    };

    areAngleGraphsEqual(
        prevGraph: PerseusGraphTypeAngle,
        currentGraph: PerseusGraphTypeAngle,
    ): boolean {
        return (
            prevGraph.allowReflexAngles !== currentGraph.allowReflexAngles ||
            prevGraph.angleOffsetDeg !== currentGraph.angleOffsetDeg ||
            prevGraph.snapDegrees !== currentGraph.snapDegrees
        );
    }

    arePointGraphsEqual(
        prevGraph: PerseusGraphTypePoint,
        currentGraph: PerseusGraphTypePoint,
    ): boolean {
        return prevGraph.numPoints !== currentGraph.numPoints;
    }

    arePolygonGraphsEqual(
        prevGraph: PerseusGraphTypePolygon,
        currentGraph: PerseusGraphTypePolygon,
    ): boolean {
        return (
            prevGraph.numSides !== currentGraph.numSides ||
            prevGraph.showAngles !== currentGraph.showAngles ||
            prevGraph.showSides !== currentGraph.showSides ||
            prevGraph.snapTo !== currentGraph.snapTo
        );
    }

    areSegmentGraphsEqual(
        prevGraph: PerseusGraphTypeSegment,
        currentGraph: PerseusGraphTypeSegment,
    ): boolean {
        return prevGraph.numSegments !== currentGraph.numSegments;
    }

    _lineStroke: () => {
        ["stroke-width"]?: number;
    } = () => {
        // This should probably use: this.props.apiOptions.isMobile
        // @ts-expect-error - TS2339 - Property 'isMobile' does not exist on type 'Readonly<Props> & Readonly<{ children?: ReactNode; }>'.
        return this.props.isMobile ? {"stroke-width": 3} : {};
    };

    addLine: (arg1: string) => void = (type) => {
        const self = this;
        const graphie = self.graphie;
        const coords = InteractiveGraph.getLineCoords(
            self.props.graph,
            self.props,
        );

        const points = (self.points = _.map(coords, (coord) => {
            return Interactive2.addMaybeMobileMovablePoint(this, {
                coord: coord,
                constraints: [
                    Interactive2.MovablePoint.constraints.bound(),
                    Interactive2.MovablePoint.constraints.snap(),
                ],
                onMove: () => {
                    const graph = _.extend({}, self.props.graph, {
                        coords: _.invoke(points, "coord"),
                    });
                    self.onChange({graph: graph});
                },
            });
        }));

        const lineConfig = {
            points: points,
            static: true,
            normalStyle: {
                stroke: this.props.apiOptions.isMobile
                    ? KhanColors.BLUE_C
                    : KhanColors.INTERACTIVE,
                ...this._lineStroke(),
            },
        } as const;

        if (type === "line") {
            // @ts-expect-error - TS2339 - Property 'extendLine' does not exist on type '{ readonly points: any[]; readonly static: true; readonly normalStyle: { readonly "stroke-width"?: number | undefined; readonly stroke: "#71B307" | "#63D9EA"; }; }'.
            lineConfig.extendLine = true;
        } else if (type === "ray") {
            // @ts-expect-error - TS2339 - Property 'extendRay' does not exist on type '{ readonly points: any[]; readonly static: true; readonly normalStyle: { readonly "stroke-width"?: number | undefined; readonly stroke: "#71B307" | "#63D9EA"; }; }'.
            lineConfig.extendRay = true;
        }

        self.line = Interactive2.addMovableLine(graphie, lineConfig);

        // A and B can't be in the same place
        points[0].listen("constraints", "isLine", (coord) => {
            return !kpoint.equal(coord, points[1].coord());
        });
        points[1].listen("constraints", "isLine", (coord) => {
            return !kpoint.equal(coord, points[0].coord());
        });
    };

    removeLine: () => void = () => {
        _.invoke(this.points, "remove");
        this.line?.remove();
    };

    addLinearControls: () => void = () => {
        this.addLine("line");
    };

    removeLinearControls: () => void = () => {
        this.removeLine();
    };

    addQuadraticControls: () => void = () => {
        if (this.props.graph.type !== "quadratic") {
            throw makeInvalidTypeError("addQuadraticControls", "quadratic");
        }

        let coords = this.props.graph.coords;
        if (!coords) {
            coords = InteractiveGraph.defaultQuadraticCoords(this.props);
        }

        const onMoveHandler = () => {
            const graph = _.extend({}, this.props.graph, {
                // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2531 - Object is possibly 'null'. | TS2531 - Object is possibly 'null'.
                coords: [pointA.coord(), pointB.coord(), pointC.coord()],
            });
            this.onChange({graph});
            this.updateQuadratic();
        };

        // NOTE(jeresig): This code attempts to access the variable while it's
        // still being defined, it should be refactored! The callbacks appear
        // to be executed synchronously, which causes this issue.
        let pointA = null;
        pointA = this.pointA = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coords[0],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                (coord) => {
                    return (
                        !pointA ||
                        // @ts-expect-error - TS2531 - Object is possibly 'null'.
                        (coord[0] !== pointB.coord()[0] &&
                            // @ts-expect-error - TS2531 - Object is possibly 'null'.
                            coord[0] !== pointC.coord()[0])
                    );
                },
            ],
            onMove: onMoveHandler,
        });

        // NOTE(jeresig): This code attempts to access the variable while it's
        // still being defined, it should be refactored! The callbacks appear
        // to be executed synchronously, which causes this issue.
        let pointB = null;
        pointB = this.pointB = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coords[1],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                (coord: any) => {
                    return (
                        !pointB ||
                        // @ts-expect-error - TS2531 - Object is possibly 'null'.
                        (coord[0] !== pointA.coord()[0] &&
                            // @ts-expect-error - TS2531 - Object is possibly 'null'.
                            coord[0] !== pointC.coord()[0])
                    );
                },
            ],
            onMove: onMoveHandler,
        });

        // NOTE(jeresig): This code attempts to access the variable while it's
        // still being defined, it should be refactored! The callbacks appear
        // to be executed synchronously, which causes this issue.
        let pointC = null;
        pointC = this.pointC = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coords[2],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                (coord: any) => {
                    return (
                        !pointC ||
                        // @ts-expect-error - TS2531 - Object is possibly 'null'.
                        (coord[0] !== pointA.coord()[0] &&
                            // @ts-expect-error - TS2531 - Object is possibly 'null'.
                            coord[0] !== pointB.coord()[0])
                    );
                },
            ],
            onMove: onMoveHandler,
        });

        this.updateQuadratic();
    };

    updateQuadratic: () => void = () => {
        const coeffs = InteractiveGraph.getCurrentQuadraticCoefficients(
            this.props,
        );
        if (!coeffs) {
            return;
        }

        // Extract coefficients the parabola
        const a = coeffs[0];
        const b = coeffs[1];
        const c = coeffs[2];

        // Plot and style
        if (this.parabola) {
            const path = this.graphie?.svgParabolaPath(a, b, c);
            this.parabola?.attr({path: path});
        } else {
            this.parabola = this.graphie?.parabola(a, b, c);
            this.parabola?.attr({
                stroke: this.props.apiOptions.isMobile
                    ? KhanColors.BLUE_C
                    : KhanColors.DYNAMIC,
                ...this._lineStroke(),
            });
            this.parabola?.toBack();
        }
    };

    removeQuadraticControls: () => void = () => {
        this.pointA?.remove();
        this.pointB?.remove();
        this.pointC?.remove();
        if (this.parabola) {
            this.parabola.remove();
            this.parabola = null;
        }
    };

    addSinusoidControls: () => void = () => {
        if (this.props.graph.type !== "sinusoid") {
            throw makeInvalidTypeError("addSinusoidControls", "sinusoid");
        }
        let coords = this.props.graph.coords;
        if (!coords) {
            coords = InteractiveGraph.defaultSinusoidCoords(this.props);
        }

        const onMoveHandler = () => {
            const graph = _.extend({}, this.props.graph, {
                // @ts-expect-error - TS2531 - Object is possibly 'null'.
                coords: [pointA.coord(), pointB.coord()],
            });
            this.onChange({graph: graph});
            this.updateSinusoid();
        };

        // NOTE(jeresig): This code attempts to access the variable while it's
        // still being defined, it should be refactored! The callbacks appear
        // to be executed synchronously, which causes this issue.
        let pointA = null;
        pointA = this.pointA = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coords[0],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                (coord: any) => {
                    return !pointA || coord[0] !== pointB.coord()[0];
                },
            ],
            onMove: onMoveHandler,
        });

        const pointB = (this.pointB = Interactive2.addMaybeMobileMovablePoint(
            this,
            {
                coord: coords[1],
                constraints: [
                    Interactive2.MovablePoint.constraints.bound(),
                    Interactive2.MovablePoint.constraints.snap(),
                    (coord: any) => {
                        // @ts-expect-error - TS2339 - Property 'coord' does not exist on type 'never'.
                        return !pointA || coord[0] !== pointA.coord()[0];
                    },
                ],
                onMove: onMoveHandler,
            },
        ));

        this.updateSinusoid();
    };

    updateSinusoid: () => void = () => {
        const coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(
            this.props,
        );
        if (!coeffs) {
            return;
        }

        const a = coeffs[0];
        const b = coeffs[1];
        const c = coeffs[2];
        const d = coeffs[3];

        // Plot and style
        if (this.sinusoid) {
            const path = this.graphie?.svgSinusoidPath(a, b, c, d);
            this.sinusoid?.attr({path: path});
        } else {
            this.sinusoid = this.graphie?.sinusoid(a, b, c, d);
            this.sinusoid?.attr({
                stroke: this.props.apiOptions.isMobile
                    ? KhanColors.BLUE_C
                    : KhanColors.DYNAMIC,
                ...this._lineStroke(),
            });
            this.sinusoid?.toBack();
        }
    };

    removeSinusoidControls: () => void = () => {
        this.pointA?.remove();
        this.pointB?.remove();
        if (this.sinusoid) {
            this.sinusoid.remove();
            this.sinusoid = null;
        }
    };

    addCircleControls: () => void = () => {
        const graphie = this.graphie;
        const minSnap = _.min(graphie.snap);

        const circle = (this.circle = graphie?.addCircleGraph({
            // @ts-expect-error - TS2339 - Property 'center' does not exist on type 'PerseusGraphType'.
            center: this.props.graph.center || [0, 0],
            // @ts-expect-error - TS2339 - Property 'radius' does not exist on type 'PerseusGraphType'.
            radius: this.props.graph.radius || _.min(this.props.step),
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            minRadius: minSnap,
            snapRadius: minSnap,
        }));

        $(circle).on("move", () => {
            const graph = _.extend({}, this.props.graph, {
                center: circle.center,
                radius: circle.radius,
            });
            this.onChange({graph: graph});
        });
    };

    removeCircleControls: () => void = () => {
        this.circle?.remove();
    };

    addLinearSystemControls: () => void = () => {
        const graphie = this.graphie;
        const coords = InteractiveGraph.getLinearSystemCoords(
            this.props.graph,
            this.props,
        );

        const segmentColors = [KhanColors.INTERACTIVE, KhanColors.GREEN];
        const points = (this.points = _.map(
            coords,
            (segmentCoords, segmentIndex) => {
                // NOTE(jeresig): This code attempts to access the variable
                // while it's still being defined, it should be refactored!
                // The callbacks appear to be executed synchronously, which
                // causes this issue.
                const segmentPoints: Array<any> = [];

                for (let i = 0; i < segmentCoords.length; i += 1) {
                    const coord = segmentCoords[i];
                    segmentPoints.push(
                        Interactive2.addMaybeMobileMovablePoint(this, {
                            coord: coord,
                            constraints: [
                                Interactive2.MovablePoint.constraints.bound(),
                                Interactive2.MovablePoint.constraints.snap(),
                                (coord) => {
                                    const otherSegment = segmentPoints[1 - i];
                                    if (!otherSegment) {
                                        // segment hasn't been defined yet
                                        // because we're still creating them
                                        return;
                                    }
                                    return !kpoint.equal(
                                        coord,
                                        otherSegment.coord(),
                                    );
                                },
                            ],
                            onMove: () => {
                                const graph = _.extend({}, this.props.graph, {
                                    coords: _.map(this.points, (segment) =>
                                        _.invoke(segment, "coord"),
                                    ),
                                });
                                this.onChange({graph: graph});
                            },
                            normalStyle: {
                                fill: segmentColors[segmentIndex],
                            },
                            highlightStyle: {
                                fill: segmentColors[segmentIndex],
                            },
                        }),
                    );
                }

                return segmentPoints;
            },
        ));

        this.lines = _.map(points, (segmentPoints, segmentIndex) => {
            return Interactive2.addMovableLine(graphie, {
                points: segmentPoints,
                static: true,
                extendLine: true,
                normalStyle: {
                    stroke: segmentColors[segmentIndex],
                },
            });
        });
    };

    removeLinearSystemControls: () => void = () => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly (readonly Coord[])[] | null | undefined' is not assignable to parameter of type 'Collection<any>'.
        _.invoke(this.lines, "remove");
        _.map(this.points, (segment) => _.invoke(segment, "remove"));
    };

    isCoordInTrash: (arg1: Coord) => boolean = (coord) => {
        if (this.props.apiOptions.isMobile) {
            return false;
        }

        const graphie = this.graphie;
        const screenPoint = graphie?.scalePoint(coord);
        return (
            screenPoint[0] >= graphie.xpixels - 40 &&
            screenPoint[1] >= graphie.ypixels - 40
        );
    };

    createPointForPointsType: (arg1: Coord, arg2: number) => any = (
        coord,
        i,
    ) => {
        const self = this;

        const remove = () => {
            self.points = _.filter(self.points, function (pt) {
                return pt !== point;
            });
            // update the correct answer box
            self.updateCoordsFromPoints();

            // remove this movablePoint from graphie.
            // we wait to do this until we're not inside of
            // said point's onMoveEnd method so its state is
            // consistent throughout this method call
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // @ts-expect-error - TS2531 - Object is possibly 'null'.
            setTimeout(point.remove.bind(point), 0); // eslint-disable-line no-restricted-syntax
        };

        // NOTE(jeresig): This code attempts to access the variable while it's
        // still being defined, it should be refactored! The callbacks appear
        // to be executed synchronously, which causes this issue.
        let point = null;
        point = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coord,
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                function (coord) {
                    // TODO(jack): There ought to be a
                    // MovablePoint.constraints.avoid
                    // default that lets you do things like this
                    return _.all(self.points, function (pt) {
                        return point === pt || !kpoint.equal(coord, pt.coord());
                    });
                },
            ],
            onMoveStart: function () {
                if (self.isClickToAddPoints()) {
                    self.setTrashCanVisibility(1);
                }
            },
            onMove: self.updateCoordsFromPoints,
            onMoveEnd: function (coord) {
                if (self.isClickToAddPoints()) {
                    if (self.isCoordInTrash(coord)) {
                        remove();
                    }
                    // In case we mouseup'd off the graphie and that
                    // stopped the move (in which case, we might not
                    // be in isCoordInTrash()
                    self.setTrashCanVisibility(0.5);
                }
            },
            ...(this.props.apiOptions.isMobile && self.isClickToAddPoints()
                ? {onRemove: remove}
                : {}),
        });

        return point;
    };

    removePoint: (arg1: Coord) => number | null | undefined = (point) => {
        let index = null;
        this.points = _.filter(this.points, function (pt, i) {
            if (pt === point) {
                // @ts-expect-error - TS2322 - Type 'number' is not assignable to type 'null'.
                index = i;
                return false;
            }
            return true;
        });
        return index;
    };

    createPointForPolygonType: (arg1: Coord, arg2: number) => any = (
        coord,
        i,
    ) => {
        if (this.props.graph.type !== "polygon") {
            throw makeInvalidTypeError("createPointForPolygonType", "polygon");
        }

        // TODO(alex): check against "grid" instead, use constants
        const snapToGrid = !_.contains(
            ["angles", "sides"],
            this.props.graph.snapTo,
        );

        // Index relative to current point -> absolute index
        // NOTE: This does not work when isClickToAddPoints() == true,
        // as `i` can be changed by dragging a point to the trash
        // Currently this function is only called when !isClickToAddPoints()
        const rel = (j) => {
            return (i + j + this.points.length) % this.points.length;
        };

        const remove = () => {
            // remove this point from points
            const index = this.removePoint(point);
            if (this.polygon?.closed()) {
                // We should be checking if this.points is defined before rotating them.
                // @ts-expect-error - TS4104 - The type 'readonly any[]' is 'readonly' and cannot be assigned to the mutable type 'any[]'. | TS2345 - Argument of type 'number | null | undefined' is not assignable to parameter of type 'number | undefined'.
                this.points = rotate(this.points, index);
                this.polygon?.update({closed: false});
            }
            this.updatePolygon();
            // the polygon is now unclosed, so we need to
            // remove any points props
            this.clearCoords();

            // remove this movablePoint from graphie.
            // wait to do this until we're not inside of
            // said point's onMoveEnd method so state is
            // consistent throughout the method call
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            setTimeout(point.remove.bind(point), 0);
        };

        const setInitialMove = debounce((point, bool) => {
            point.state.isInitialMove = bool;
        }, 1000);

        const onMoveEndHandler = (coord) => {
            // If the user clicked and dragged a point over endpoint,
            // join the them
            const overlappedPoints =
                this.points.length > 1 &&
                ((point === this.points[0] &&
                    kpoint.equal(coord, _.last(this.points).coord())) ||
                    (point === _.last(this.points) &&
                        kpoint.equal(coord, this.points[0].coord())));

            if (this.isClickToAddPoints()) {
                if (this.isCoordInTrash(coord)) {
                    remove();
                } else if (overlappedPoints) {
                    const pointToRemove = this.points.pop();

                    if (this.points.length > 2) {
                        this.polygon?.update({closed: true});
                        this.updateCoordsFromPoints();
                    } else {
                        this.polygon?.update({closed: false});
                        this.clearCoords();
                    }

                    this.updatePolygon();
                    // remove this movablePoint from graphie.
                    // wait to do this until we're not inside of
                    // said point's onMoveEnd method so state is
                    // consistent throughout the method call
                    // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
                    // eslint-disable-next-line no-restricted-syntax
                    setTimeout(pointToRemove.remove.bind(pointToRemove), 0);
                } else {
                    // If the user clicked and dragged a point over any other
                    // existing point, fix shape
                    const shouldRemove = _.any(this.points, function (pt) {
                        return pt !== point && kpoint.equal(pt.coord(), coord);
                    });

                    if (shouldRemove) {
                        this.removePoint(point);

                        if (this.points.length < 3) {
                            this.polygon?.update({closed: false});
                            this.clearCoords();
                        } else if (this.polygon?.closed()) {
                            this.updateCoordsFromPoints();
                        }

                        this.updatePolygon();
                        // remove this movablePoint from graphie.
                        // wait to do this until we're not inside
                        // said point's onMoveEnd method so state
                        // is consistent throughout the method call
                        // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
                        // eslint-disable-next-line no-restricted-syntax
                        setTimeout(point.remove.bind(point), 0);
                    } else {
                        // If this was
                        //  * a click on the first or last point
                        //  * and not a deletion
                        //  * and not a drag,
                        //  * and not a creation of a new point
                        //    (see !point.state.isInitialMove, below),
                        //  * and our polygon is not closed,
                        //  * and we can close it (we need at least the same
                        //    number of points as coordinates asked for in the
                        //    question),
                        // then close it
                        const isFirstOrLastPoint =
                            point === _.head(this.points) ||
                            point === _.last(this.points);
                        const pointNotMoved = !point.hasMoved();
                        // NOTE (jsatk): Currently different on mobile versus
                        // destkop
                        const notANewPoint = !point.state.isInitialMove;
                        const polygonNotClosed = !this.polygon?.closed();
                        const allPointsPlotted = this.points.length > 2;

                        const canCloseUnclosedPolygon =
                            isFirstOrLastPoint &&
                            pointNotMoved &&
                            notANewPoint &&
                            polygonNotClosed &&
                            allPointsPlotted;

                        if (canCloseUnclosedPolygon) {
                            this.polygon?.update({closed: true});
                            this.updatePolygon();

                            // We finally have a closed polygon, so save our
                            // points to props
                            this.updateCoordsFromPoints();
                        }
                    }
                }

                // In case we mouseup'd off the graphie and that
                // stopped the move
                this.setTrashCanVisibility(0.5);
            }

            setInitialMove(point, false);
        };

        const graphConstraint = (coord: any) => {
            // These constraints are all relative to the other points, so if
            // we're creating the initial points and haven't added any others
            // to the graph, we can't enforce them.
            if (this.points == null || this.points.length === 0) {
                return true;
            }

            const coords: Array<Coord> = _.invoke(this.points, "coord");
            coords[i] = coord;

            // Check for invalid positioning, but only if we aren't adding
            // points one click at a time, since those added points could
            // have already violated these constraints
            if (!this.isClickToAddPoints()) {
                // Polygons can't have consecutive collinear points
                if (
                    collinear(coords[rel(-2)], coords[rel(-1)], coords[i]) ||
                    collinear(coords[rel(-1)], coords[i], coords[rel(1)]) ||
                    collinear(coords[i], coords[rel(1)], coords[rel(2)])
                ) {
                    return false;
                }

                const segments = _.zip(coords, rotate(coords));

                if (this.points.length > 3) {
                    // Constrain to simple (non self-intersecting) polygon by
                    // testing whether adjacent segments intersect any others
                    for (let j = -1; j <= 0; j++) {
                        const segment = segments[rel(j)];
                        const others = _.without(
                            segments,
                            segment,
                            segments[rel(j - 1)],
                            segments[rel(j + 1)],
                        );

                        for (let k = 0; k < others.length; k++) {
                            const other = others[k];
                            // @ts-expect-error - TS2345 - Argument of type 'any[]' is not assignable to parameter of type 'Line'.
                            if (intersects(segment, other)) {
                                return false;
                            }
                        }
                    }
                }
            }

            if (
                // @ts-expect-error - TS2339 - Property 'snapTo' does not exist on type 'PerseusGraphType'.
                this.props.graph.snapTo === "angles" &&
                this.points.length > 2
            ) {
                // Snap to whole degree interior angles

                const angles = _.map(angleMeasures(coords), function (rad) {
                    return (rad * 180) / Math.PI;
                });

                _.each([-1, 1], function (j) {
                    angles[rel(j)] = Math.round(angles[rel(j)]);
                });

                const getAngle = function (a: number, vertex, b: number) {
                    const angle = GraphUtils.findAngle(
                        coords[rel(a)],
                        coords[rel(b)],
                        coords[rel(vertex)],
                    );
                    return (angle + 360) % 360;
                };

                const innerAngles = [
                    angles[rel(-1)] - getAngle(-2, -1, 1),
                    angles[rel(1)] - getAngle(-1, 1, 2),
                ];
                innerAngles[2] = 180 - (innerAngles[0] + innerAngles[1]);

                // Avoid degenerate triangles
                if (
                    _.any(innerAngles, function (angle) {
                        return leq(angle, 1);
                    })
                ) {
                    return false;
                }

                const knownSide = magnitude(
                    // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type 'readonly Coord[]'.
                    vector(coords[rel(-1)], coords[rel(1)]),
                );

                const onLeft =
                    sign(ccw(coords[rel(-1)], coords[rel(1)], coords[i])) === 1;

                // Solve for side by using the law of sines
                const side =
                    (Math.sin((innerAngles[1] * Math.PI) / 180) /
                        Math.sin((innerAngles[2] * Math.PI) / 180)) *
                    knownSide;

                const outerAngle = GraphUtils.findAngle(
                    coords[rel(1)],
                    coords[rel(-1)],
                );

                const offset = polar(
                    side,
                    outerAngle + (onLeft ? 1 : -1) * innerAngles[0],
                );

                return this.graphie?.addPoints(coords[rel(-1)], offset);
            }
            // @ts-expect-error - TS2339 - Property 'snapTo' does not exist on type 'PerseusGraphType'.
            if (this.props.graph.snapTo === "sides" && this.points.length > 1) {
                // Snap to whole unit side measures

                const sides = _.map(
                    [
                        [coords[rel(-1)], coords[i]],
                        [coords[i], coords[rel(1)]],
                        [coords[rel(-1)], coords[rel(1)]],
                    ],
                    function (coords) {
                        // @ts-expect-error - TS2345 - Argument of type 'number[]' is not assignable to parameter of type 'readonly Coord[]'. | TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
                        return magnitude(vector(...coords));
                    },
                );

                _.each([0, 1], function (j) {
                    sides[j] = Math.round(sides[j]);
                });

                // Avoid degenerate triangles
                if (
                    leq(sides[1] + sides[2], sides[0]) ||
                    leq(sides[0] + sides[2], sides[1]) ||
                    leq(sides[0] + sides[1], sides[2])
                ) {
                    return false;
                }

                // Solve for angle by using the law of cosines
                const innerAngle = lawOfCosines(sides[0], sides[2], sides[1]);

                const outerAngle = GraphUtils.findAngle(
                    coords[rel(1)],
                    coords[rel(-1)],
                );

                const onLeft =
                    sign(ccw(coords[rel(-1)], coords[rel(1)], coords[i])) === 1;

                const offset = polar(
                    sides[0],
                    outerAngle + (onLeft ? 1 : -1) * innerAngle,
                );

                return this.graphie?.addPoints(coords[rel(-1)], offset);
            }
            // Snap to grid (already done)
            return true;
        };

        const point = Interactive2.addMaybeMobileMovablePoint(this, {
            coord: coord,
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                snapToGrid
                    ? Interactive2.MovablePoint.constraints.snap()
                    : null,
                graphConstraint,
            ],
            onMoveStart: () => {
                if (this.isClickToAddPoints()) {
                    this.setTrashCanVisibility(1);
                }
            },
            onMove: () => {
                if (this.polygon?.closed()) {
                    this.updateCoordsFromPoints();
                }
            },
            onMoveEnd: onMoveEndHandler,
            ...(this.props.apiOptions.isMobile && this.isClickToAddPoints()
                ? {onRemove: remove}
                : {}),
        });

        point.state.isInitialMove = true;

        return point;
    };

    updateCoordsFromPoints: () => void = () => {
        const graph = _.extend({}, this.props.graph, {
            // Handle old movable points with .coord, or
            // Interactive2.MovablePoint's with .coord()
            coords: _.map(this.points, function (point) {
                return _.result(point, "coord");
            }),
        });
        this.onChange({graph: graph});
    };

    clearCoords: () => void = () => {
        const graph = _.extend({}, this.props.graph, {
            coords: null,
        });
        this.onChange({graph: graph});
    };

    onChange: ChangeHandler = (data) => {
        this.props.onChange(data);
        this.props.trackInteraction();
    };

    addPointControls: () => void = () => {
        if (this.props.graph.type !== "point") {
            throw makeInvalidTypeError("addPointControls", "point");
        }

        const coords = InteractiveGraph.getPointCoords(
            this.props.graph,
            this.props,
        );
        // Clear out our old points so that newly added points don't
        // "collide" with them and reposition when being added
        // Without this, when added, each point checks whether it is on top
        // of a point in this.points, which (a) shouldn't matter since
        // we're clearing out this.points anyways, and (b) can cause problems
        // if each of this.points is a MovablePoint instead of an
        // Interactive2.MovablePoint, since one has a .coord and the other
        // has .coord()
        // TODO(jack): Figure out a better way to do this
        this.points = [];
        this.points = _.map(coords, this.createPointForPointsType, this);
    };

    removePointControls: () => void = () => {
        _.invoke(this.points, "remove");
    };

    addSegmentControls: () => void = () => {
        if (this.props.graph.type !== "segment") {
            throw makeInvalidTypeError("addSegmentControls", "segment");
        }

        const self = this;
        const graphie = this.graphie;

        const coords = InteractiveGraph.getSegmentCoords(
            this.props.graph,
            this.props,
        );

        const createPoint = (options: {
            constraints: Array<any | ((coord: never) => boolean)>;
            coord: any;
            onMove: () => void;
        }) => Interactive2.addMaybeMobileMovablePoint(this, options);

        this.points = [];
        this.lines = _.map(
            coords,
            function (segment, i) {
                const updateCoordProps = function () {
                    const graph = _.extend({}, self.props.graph, {
                        // @ts-expect-error - TS2345 - Argument of type 'readonly (readonly Coord[])[] | null | undefined' is not assignable to parameter of type 'Collection<any>'.
                        coords: _.invoke(self.lines, "coords"),
                    });
                    self.onChange({graph: graph});
                };

                // NOTE(jeresig): This code attempts to access the variable
                // while it's still being defined, it should be refactored!
                // The callbacks appear to be executed synchronously, which
                // causes this issue.
                const points: Array<any> = [];

                for (let i = 0; i < segment.length; i += 1) {
                    const coord = segment[i];
                    points.push(
                        createPoint({
                            coord: coord,
                            constraints: [
                                Interactive2.MovablePoint.constraints.bound(),
                                Interactive2.MovablePoint.constraints.snap(),
                                (coord: any) => {
                                    const otherPoint = points[1 - i];
                                    if (!otherPoint) {
                                        // point hasn't been defined yet
                                        // because we're still creating them
                                        // We return false as the points aren't
                                        // going to be in the same position at
                                        // this point.
                                        return false;
                                    }
                                    return !kpoint.equal(
                                        coord,
                                        otherPoint.coord(),
                                    );
                                },
                            ],
                            onMove: updateCoordProps,
                        }),
                    );
                }

                self.points = self.points.concat(points);
                const line = Interactive2.addMovableLine(graphie, {
                    points: points,
                    static: false,
                    constraints: [
                        // @ts-expect-error - TS2339 - Property 'constraints' does not exist on type '(graphie: any, movable: any, options: any) => void'.
                        Interactive2.MovableLine.constraints.bound(),
                        // @ts-expect-error - TS2339 - Property 'constraints' does not exist on type '(graphie: any, movable: any, options: any) => void'.
                        Interactive2.MovableLine.constraints.snap(),
                    ],
                    onMove: [
                        // @ts-expect-error - TS2339 - Property 'onMove' does not exist on type '(graphie: any, movable: any, options: any) => void'.
                        Interactive2.MovableLine.onMove.updatePoints,
                        updateCoordProps,
                    ],
                    normalStyle: {
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        stroke: this.props.apiOptions.isMobile
                            ? KhanColors.BLUE_C
                            : KhanColors.INTERACTIVE,
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        ...this._lineStroke(),
                    },
                    highlightStyle: {
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        stroke: this.props.apiOptions.isMobile
                            ? KhanColors.BLUE_C
                            : KhanColors.INTERACTING,
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        ...this._lineStroke(),
                    },
                });
                _.invoke(points, "toFront");

                return line;
            },
            this,
        );
    };

    removeSegmentControls: () => void = () => {
        _.invoke(this.points, "remove");
        // @ts-expect-error - TS2345 - Argument of type 'readonly (readonly Coord[])[] | null | undefined' is not assignable to parameter of type 'Collection<any>'.
        _.invoke(this.lines, "remove");
    };

    addRayControls: () => void = () => {
        this.addLine("ray");
    };

    removeRayControls: () => void = () => {
        this.removeLine();
    };

    addPolygonControls: () => void = () => {
        this.polygon = null;
        const coords = InteractiveGraph.getPolygonCoords(
            this.props.graph,
            this.props,
        );
        // Clear out our old points so that newly added points don't
        // "collide", as in `addPointControls`
        this.points = [];
        this.points = _.map(coords, this.createPointForPolygonType, this);
        this.updatePolygon();
    };

    updatePolygon: () => void = () => {
        if (this.props.graph.type !== "polygon") {
            throw makeInvalidTypeError("updatePolygon", "polygon");
        }

        let closed;
        if (this.polygon) {
            closed = this.polygon.closed();
        } else if (this.points.length >= 3) {
            closed = true;
        } else {
            // There will only be fewer than 3 points in click-to-add-vertices
            // mode, so we don't need to explicitly check for that here.
            closed = false;
        }

        const graphie = this.graphie;
        const n = this.points.length;

        // TODO(alex): check against "grid" instead, use constants
        const snapToGrid = !_.contains(
            ["angles", "sides"],
            this.props.graph.snapTo,
        );

        const angleLabels = _.times(
            n,
            function (i) {
                if (
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    !this.props.graph.showAngles ||
                    (!closed && (i === 0 || i === n - 1))
                ) {
                    return "";
                }
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                if (this.props.graph.snapTo === "angles") {
                    return "$deg0";
                }
                return "$deg1";
            },
            this,
        );

        const showRightAngleMarkers = _.times(
            n,
            function (i) {
                return closed || (i !== 0 && i !== n - 1);
            },
            this,
        );

        const numArcs = _.times(
            n,
            function (i) {
                if (
                    // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                    this.props.graph.showAngles &&
                    (closed || (i !== 0 && i !== n - 1))
                ) {
                    return 1;
                }
                return 0;
            },
            this,
        );

        const sideLabels = _.times(
            n,
            function (i) {
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                if (!this.props.graph.showSides || (!closed && i === n - 1)) {
                    return "";
                }
                // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                if (this.props.graph.snapTo === "sides") {
                    return "$len0";
                }
                return "$len1";
            },
            this,
        );

        if (this.polygon == null) {
            const self = this;
            self.polygon = Interactive2.addMovablePolygon(graphie, {
                constraints: [
                    // @ts-expect-error - TS2339 - Property 'constraints' does not exist on type '(graphie: any, movable: any, options: any) => undefined'.
                    Interactive2.MovablePolygon.constraints.bound(),
                    snapToGrid
                        ? // @ts-expect-error - TS2339 - Property 'constraints' does not exist on type '(graphie: any, movable: any, options: any) => undefined'.
                          Interactive2.MovablePolygon.constraints.snap()
                        : null,
                ],
                closed: closed,
                points: self.points,
                angleLabels: angleLabels,
                showRightAngleMarkers: showRightAngleMarkers,
                numArcs: numArcs,
                sideLabels: sideLabels,
                onMove: [
                    // @ts-expect-error - TS2339 - Property 'onMove' does not exist on type '(graphie: any, movable: any, options: any) => undefined'.
                    Interactive2.MovablePolygon.onMove.updatePoints,
                    function () {
                        // @ts-expect-error - TS2683 - 'this' implicitly has type 'any' because it does not have a type annotation.
                        if (this.closed()) {
                            self.updateCoordsFromPoints();
                        }
                    },
                ],
                normalStyle: {
                    stroke: this.props.apiOptions.isMobile
                        ? KhanColors.BLUE_C
                        : KhanColors.INTERACTIVE,
                    ...this._lineStroke(),
                },
            });
        } else {
            // We only need to pass in the properties that might've changed
            this.polygon.update({
                closed: closed,
                points: this.points,
                angleLabels: angleLabels,
                showRightAngleMarkers: showRightAngleMarkers,
                numArcs: numArcs,
                sideLabels: sideLabels,
            });
        }
    };

    removePolygonControls: () => void = () => {
        _.invoke(this.points, "remove");
        this.polygon?.remove();
    };

    addAngleControls: () => void = () => {
        if (this.props.graph.type !== "angle") {
            throw makeInvalidTypeError("addAngleControls", "angle");
        }

        const graph = this.props.graph;
        const graphie = this.graphie;

        const coords = InteractiveGraph.getAngleCoords(
            this.props.graph,
            this.props,
        );

        // The vertex snaps to the grid, but the rays don't...
        this.points = coords.map(function (coord, i) {
            return graphie?.addMovablePoint(
                _.extend(
                    {
                        coord: coord,
                        normalStyle: {
                            stroke: KhanColors.INTERACTIVE,
                            fill: KhanColors.INTERACTIVE,
                        },
                    },
                    i === 1
                        ? {
                              snapX: graphie.snap[0],
                              snapY: graphie.snap[1],
                          }
                        : {},
                ),
            );
        });

        // ...they snap to whole-degree angles from the vertex.
        this.angle = graphie?.addMovableAngle({
            points: this.points,
            snapDegrees: graph.snapDegrees || 1,
            snapOffsetDeg: graph.angleOffsetDeg || 0,
            angleLabel: graph.showAngles ? "$deg0" : "",
            pushOut: 2,
            allowReflex: defaultVal(graph.allowReflexAngles, true),
        });

        $(this.angle).on("move", () => {
            this.onChange({
                // @ts-expect-error Type '{ coords: any; type: "angle"; showAngles?: boolean | undefined; allowReflexAngles?: boolean | undefined; angleOffsetDeg?: number | undefined; snapDegrees?: number | undefined; match?: "congruent" | undefined; }' is not assignable to type 'InteractiveGraphState | undefined'.
                graph: {...graph, coords: this.angle?.getClockwiseCoords()},
            });
        });
    };

    removeAngleControls: () => void = () => {
        _.invoke(this.points, "remove");
        this.angle?.remove();
    };

    toggleShowSides: () => void = () => {
        if (this.props.graph.type !== "polygon") {
            throw makeInvalidTypeError("toggleShowSides", "polygon");
        }
        const graph = _.extend({}, this.props.graph, {
            showSides: !this.props.graph.showSides,
        });
        this.onChange({graph: graph});
    };

    getUserInput() {
        return InteractiveGraph.getUserInputFromProps(this.props);
    }

    simpleValidate(rubric: Rubric) {
        return InteractiveGraph.validate(this.getUserInput(), rubric, this);
    }

    focus: () => void = $.noop;

    render(): React.ReactNode {
        const box = getInteractiveBoxFromSizeClass(
            this.props.containerSizeClass,
        );
        const gridStep =
            this.props.gridStep ||
            Util.getGridStep(this.props.range, this.props.step, box[0]);
        const snapStep =
            this.props.snapStep || Util.snapStepFromGridStep(gridStep);

        let instructions;
        // isClickToAddPoints() only applies to points and polygons
        if (this.isClickToAddPoints() && this.state.shouldShowInstructions) {
            if (this.props.graph.type === "point") {
                instructions = this.context.strings.addPoints;
            } else if (this.props.graph.type === "polygon") {
                instructions = this.context.strings.addVertices;
            }
        } else {
            instructions = undefined;
        }

        let onMouseDown;
        if (this.isClickToAddPoints()) {
            onMouseDown = this.handleAddPointsMouseDown;
        }

        const isMobile = this.props.apiOptions.isMobile;

        return (
            <div
                className={
                    "perseus-widget " + "perseus-widget-interactive-graph"
                }
                style={{
                    width: box[0],
                    height: box[1],
                }}
            >
                <Graph
                    instructions={instructions}
                    // eslint-disable-next-line react/no-string-refs
                    ref="graph"
                    box={box}
                    labels={this.props.labels}
                    range={this.props.range}
                    step={
                        isMobile
                            ? Util.constrainedTickStepsFromTickSteps(
                                  this.props.step,
                                  this.props.range,
                              )
                            : this.props.step
                    }
                    gridStep={gridStep}
                    snapStep={snapStep}
                    markings={this.props.markings}
                    backgroundImage={this.props.backgroundImage}
                    showProtractor={this.props.showProtractor}
                    onMouseDown={onMouseDown}
                    onGraphieUpdated={this.setGraphie}
                    setDrawingAreaAvailable={
                        this.props.apiOptions.setDrawingAreaAvailable
                    }
                    isMobile={isMobile}
                />
            </div>
        );
    }
}

class InteractiveGraph extends React.Component<Props, State> {
    legacyGraphRef = React.createRef<LegacyInteractiveGraph>();
    mafsRef = React.createRef<Widget>();

    static defaultProps: DefaultProps = {
        labels: ["x", "y"],
        range: [
            [-10, 10],
            [-10, 10],
        ],
        step: [1, 1],
        backgroundImage: defaultBackgroundImage,
        markings: "graph",
        showTooltips: false,
        showProtractor: false,
        graph: {
            type: "linear",
        },
    };

    getUserInput: Widget["getUserInput"] = () => {
        if (this.mafsRef.current) {
            return this.mafsRef.current.getUserInput?.();
        }
        if (this.legacyGraphRef.current) {
            return this.legacyGraphRef.current.getUserInput();
        }
        throw new PerseusError(
            "Cannot getUserInput from a graph that has never rendered",
            Errors.NotAllowed,
        );
    };

    simpleValidate(rubric: Rubric) {
        return InteractiveGraph.validate(this.getUserInput?.(), rubric, this);
    }

    render() {
        // Mafs shim
        const mafsFlags = this.props.apiOptions?.flags?.["mafs"];
        if (shouldUseMafs(mafsFlags, this.props.graph)) {
            const box = getInteractiveBoxFromSizeClass(
                this.props.containerSizeClass,
            );
            const gridStep =
                this.props.gridStep ||
                Util.getGridStep(this.props.range, this.props.step, box[0]);
            const snapStep =
                this.props.snapStep || Util.snapStepFromGridStep(gridStep);

            return (
                <StatefulMafsGraph
                    {...this.props}
                    showLabelsFlag={
                        this.props.apiOptions?.flags?.["mafs"]?.[
                            "interactive-graph-locked-features-labels"
                        ]
                    }
                    ref={this.mafsRef}
                    gridStep={gridStep}
                    snapStep={snapStep}
                    box={box}
                    showTooltips={!!this.props.showTooltips}
                    readOnly={this.props.apiOptions?.readOnly}
                />
            );
        }
        return (
            <LegacyInteractiveGraph ref={this.legacyGraphRef} {...this.props} />
        );
    }

    static getQuadraticCoefficients(
        coords: ReadonlyArray<Coord>,
    ): QuadraticCoefficient {
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

    static getSinusoidCoefficients(
        coords: ReadonlyArray<Coord>,
    ): SineCoefficient {
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

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getLineCoords(
        graph: PerseusGraphType,
        props: Props,
    ): ReadonlyArray<Coord> {
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
    static getPointCoords(
        graph: PerseusGraphTypePoint,
        props: Props,
    ): ReadonlyArray<Coord> {
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
    ): ReadonlyArray<ReadonlyArray<Coord>> {
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
                ],
                (coords) => {
                    // @ts-expect-error - TS2345 - Argument of type 'number[][]' is not assignable to parameter of type 'readonly Coord[]'.
                    return InteractiveGraph.pointsFromNormalized(props, coords);
                },
            )
        );
    }

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    static getPolygonCoords(
        graph: PerseusGraphType,
        props: Props,
    ): ReadonlyArray<Coord> {
        if (graph.type !== "polygon") {
            throw makeInvalidTypeError("toggleShowSides", "polygon");
        }

        let coords = graph.coords;
        if (coords) {
            return coords;
        }

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
    ): ReadonlyArray<ReadonlyArray<Coord>> {
        const coords = graph.coords;
        if (coords) {
            return coords;
        }

        const n = graph.numSegments || 1;
        // @ts-expect-error - TS2322 - Type 'number[] | undefined' is not assignable to type 'readonly number[]'.
        const ys: ReadonlyArray<number> = {
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
        coordsList: ReadonlyArray<Coord>,
        ranges: [Range, Range],
    ): ReadonlyArray<Coord> {
        // @ts-expect-error - TS2322 - Type 'number[][]' is not assignable to type 'readonly Coord[]'.
        return _.map(coordsList, function (coords) {
            return _.map(coords, function (coord, i) {
                const extent = ranges[i][1] - ranges[i][0];
                return (coord + ranges[i][1]) / extent;
            });
        });
    }

    static getEquationString(props: Props): string {
        const type = props.graph.type;
        const funcName = "get" + capitalize(type) + "EquationString";
        return InteractiveGraph[funcName](props);
    }

    static pointsFromNormalized(
        props: Props,
        coordsList: ReadonlyArray<Coord>,
        noSnap?: boolean,
    ): ReadonlyArray<Coord> {
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

    static getLinearEquationString(props: Props): string {
        const coords = InteractiveGraph.getLineCoords(props.graph, props);
        if (eq(coords[0][0], coords[1][0])) {
            return "x = " + coords[0][0].toFixed(3);
        }
        const m = (coords[1][1] - coords[0][1]) / (coords[1][0] - coords[0][0]);
        const b = coords[0][1] - m * coords[0][0];
        if (eq(m, 0)) {
            return "y = " + b.toFixed(3);
        }
        return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
    }

    static getCurrentQuadraticCoefficients(props: Props): QuadraticCoefficient {
        // TODO(alpert): Don't duplicate
        const coords =
            // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
            props.graph.coords ||
            InteractiveGraph.defaultQuadraticCoords(props);
        return InteractiveGraph.getQuadraticCoefficients(coords);
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
            props.graph.coords || InteractiveGraph.defaultSinusoidCoords(props);
        return InteractiveGraph.getSinusoidCoefficients(coords);
    }

    static defaultSinusoidCoords(props: Props): ReadonlyArray<Coord> {
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
        const graph = props.graph;
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
            props.graph,
            props,
        );

        return (
            "\n" +
            getLineEquation(coords[0][0], coords[0][1]) +
            "\n" +
            getLineEquation(coords[1][0], coords[1][1]) +
            "\n" +
            getLineIntersection(coords[0], coords[1])
        );
    }

    static getPointEquationString(props: Props): string {
        if (props.graph.type !== "point") {
            throw makeInvalidTypeError("getPointEquationString", "point");
        }

        const coords = InteractiveGraph.getPointCoords(props.graph, props);
        return coords
            .map(function (coord) {
                return "(" + coord[0] + ", " + coord[1] + ")";
            })
            .join(", ");
    }

    static getSegmentEquationString(props: Props): string {
        if (props.graph.type !== "segment") {
            throw makeInvalidTypeError("getSegmentEquationString", "segment");
        }

        const segments = InteractiveGraph.getSegmentCoords(props.graph, props);
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
        if (props.graph.type !== "ray") {
            throw makeInvalidTypeError("createPointForPolygonType", "ray");
        }

        const coords = InteractiveGraph.getLineCoords(props.graph, props);
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
        if (props.graph.type !== "polygon") {
            throw makeInvalidTypeError("getPolygonEquationString", "polygon");
        }
        const coords = InteractiveGraph.getPolygonCoords(props.graph, props);
        return _.map(coords, function (coord) {
            return "(" + coord.join(", ") + ")";
        }).join(" ");
    }

    static getAngleEquationString(props: Props): string {
        if (props.graph.type !== "angle") {
            throw makeInvalidTypeError("getAngleEquationString", "angle");
        }
        const coords = InteractiveGraph.getAngleCoords(props.graph, props);
        const angle = GraphUtils.findAngle(coords[2], coords[0], coords[1]);
        return (
            angle.toFixed(0) +
            "\u00B0 angle" +
            " at (" +
            coords[1].join(", ") +
            ")"
        );
    }

    static validate(
        userInput: PerseusGraphType,
        rubric: Rubric,
        component: any,
    ): PerseusScore {
        // When nothing has moved, there will neither be coords nor the
        // circle's center/radius fields. When those fields are absent, skip
        // all these checks; just go mark the answer as empty.
        const hasValue = Boolean(
            // @ts-expect-error - TS2339 - Property 'coords' does not exist on type 'PerseusGraphType'.
            userInput.coords ||
                // @ts-expect-error - TS2339 - Property 'center' does not exist on type 'PerseusGraphType'. | TS2339 - Property 'radius' does not exist on type 'PerseusGraphType'.
                (userInput.center && userInput.radius),
        );

        if (userInput.type === rubric.correct.type && hasValue) {
            if (
                userInput.type === "linear" &&
                rubric.correct.type === "linear" &&
                userInput.coords != null
            ) {
                const guess = userInput.coords;
                const correct = rubric.correct.coords;

                // If both of the guess points are on the correct line, it's
                // correct.
                if (
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                    collinear(correct[0], correct[1], guess[0]) &&
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                    collinear(correct[0], correct[1], guess[1])
                ) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                userInput.type === "linear-system" &&
                rubric.correct.type === "linear-system" &&
                userInput.coords != null
            ) {
                const guess = userInput.coords;
                const correct = rubric.correct.coords as ReadonlyArray<
                    ReadonlyArray<Coord>
                >;

                if (
                    (collinear(correct[0][0], correct[0][1], guess[0][0]) &&
                        collinear(correct[0][0], correct[0][1], guess[0][1]) &&
                        collinear(correct[1][0], correct[1][1], guess[1][0]) &&
                        collinear(correct[1][0], correct[1][1], guess[1][1])) ||
                    (collinear(correct[0][0], correct[0][1], guess[1][0]) &&
                        collinear(correct[0][0], correct[0][1], guess[1][1]) &&
                        collinear(correct[1][0], correct[1][1], guess[0][0]) &&
                        collinear(correct[1][0], correct[1][1], guess[0][1]))
                ) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                userInput.type === "quadratic" &&
                rubric.correct.type === "quadratic" &&
                userInput.coords != null
            ) {
                // If the parabola coefficients match, it's correct.
                const guessCoeffs = this.getQuadraticCoefficients(
                    userInput.coords,
                );
                const correctCoeffs = this.getQuadraticCoefficients(
                    // @ts-expect-error - TS2345 - Argument of type 'readonly Coord[] | undefined' is not assignable to parameter of type 'readonly Coord[]'.
                    rubric.correct.coords,
                );
                if (deepEq(guessCoeffs, correctCoeffs)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                userInput.type === "sinusoid" &&
                rubric.correct.type === "sinusoid" &&
                userInput.coords != null
            ) {
                const guessCoeffs = this.getSinusoidCoefficients(
                    userInput.coords,
                );
                const correctCoeffs = this.getSinusoidCoefficients(
                    // @ts-expect-error - TS2345 - Argument of type 'readonly Coord[] | undefined' is not assignable to parameter of type 'readonly Coord[]'.
                    rubric.correct.coords,
                );

                const canonicalGuessCoeffs =
                    canonicalSineCoefficients(guessCoeffs);
                const canonicalCorrectCoeffs =
                    canonicalSineCoefficients(correctCoeffs);
                // If the canonical coefficients match, it's correct.
                if (deepEq(canonicalGuessCoeffs, canonicalCorrectCoeffs)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                userInput.type === "circle" &&
                rubric.correct.type === "circle"
            ) {
                if (
                    deepEq(userInput.center, rubric.correct.center) &&
                    eq(userInput.radius, rubric.correct.radius)
                ) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                userInput.type === "point" &&
                rubric.correct.type === "point" &&
                userInput.coords != null
            ) {
                let correct = InteractiveGraph.getPointCoords(
                    rubric.correct,
                    component,
                );
                const guess = userInput.coords.slice();
                correct = correct.slice();
                // Everything's already rounded so we shouldn't need to do an
                // eq() comparison but _.isEqual(0, -0) is false, so we'll use
                // eq() anyway. The sort should be fine because it'll stringify
                // it and -0 converted to a string is "0"
                guess?.sort();
                // @ts-expect-error - TS2339 - Property 'sort' does not exist on type 'readonly Coord[]'.
                correct.sort();
                if (deepEq(guess, correct)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                userInput.type === "polygon" &&
                rubric.correct.type === "polygon" &&
                userInput.coords != null
            ) {
                const guess: Array<Coord> = userInput.coords?.slice();
                // @ts-expect-error - TS2322 - Type 'Coord[] | undefined' is not assignable to type 'Coord[]'.
                const correct: Array<Coord> = rubric.correct.coords?.slice();

                let match;
                if (rubric.correct.match === "similar") {
                    match = similar(guess, correct, Number.POSITIVE_INFINITY);
                } else if (rubric.correct.match === "congruent") {
                    match = similar(guess, correct, knumber.DEFAULT_TOLERANCE);
                } else if (rubric.correct.match === "approx") {
                    match = similar(guess, correct, 0.1);
                } else {
                    /* exact */
                    guess.sort();
                    correct.sort();
                    match = deepEq(guess, correct);
                }

                if (match) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                userInput.type === "segment" &&
                rubric.correct.type === "segment" &&
                userInput.coords != null
            ) {
                let guess = Util.deepClone(userInput.coords);
                let correct = Util.deepClone(rubric.correct?.coords);
                guess = _.invoke(guess, "sort").sort();
                // @ts-expect-error - TS2345 - Argument of type '(readonly Coord[])[] | undefined' is not assignable to parameter of type 'Collection<any>'.
                correct = _.invoke(correct, "sort").sort();
                if (deepEq(guess, correct)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                userInput.type === "ray" &&
                rubric.correct.type === "ray" &&
                userInput.coords != null
            ) {
                const guess = userInput.coords;
                const correct = rubric.correct.coords;
                if (
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                    deepEq(guess[0], correct[0]) &&
                    // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                    collinear(correct[0], correct[1], guess[1])
                ) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            } else if (
                userInput.type === "angle" &&
                rubric.correct.type === "angle"
            ) {
                const guess = userInput.coords;
                const correct = rubric.correct.coords;

                let match;
                if (rubric.correct.match === "congruent") {
                    const angles = _.map([guess, correct], function (coords) {
                        const angle = GraphUtils.findAngle(
                            // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                            coords[2],
                            // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                            coords[0],
                            // @ts-expect-error - TS2532 - Object is possibly 'undefined'.
                            coords[1],
                        );
                        return (angle + 360) % 360;
                    });
                    // @ts-expect-error - TS2556 - A spread argument must either have a tuple type or be passed to a rest parameter.
                    match = eq(...angles);
                } else {
                    /* exact */
                    match = // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                        deepEq(guess[1], correct[1]) &&
                        // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                        collinear(correct[1], correct[0], guess[0]) &&
                        // @ts-expect-error - TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'. | TS2532 - Object is possibly 'undefined'.
                        collinear(correct[1], correct[2], guess[2]);
                }

                if (match) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null,
                    };
                }
            }
        }

        // The input wasn't correct, so check if it's a blank input or if it's
        // actually just wrong
        if (!hasValue || _.isEqual(userInput, rubric.graph)) {
            // We're where we started.
            return {
                type: "invalid",
                message: null,
            };
        }
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: null,
        };
    }

    static getUserInputFromProps(props: Props): PerseusGraphType {
        return props.graph;
    }
}

// exported for testing
export function shouldUseMafs(
    mafsFlags: Record<string, boolean> | undefined | boolean,
    graph: PerseusGraphType,
): boolean {
    if (typeof mafsFlags === "boolean" || typeof mafsFlags === "undefined") {
        return false;
    }

    switch (graph.type) {
        case "point":
            if (graph.numPoints === UNLIMITED) {
                // TODO(benchristel): add a feature flag for the "unlimited"
                // case once we've implemented point graphs with unlimited
                // points
                return false;
            }
            return Boolean(mafsFlags["point"]);
        case "polygon":
            if (graph.numSides === UNLIMITED) {
                // TODO(benchristel): add a feature flag for the "unlimited"
                // case once we've implemented polygon graphs with unlimited
                // sides
                return false;
            }
            return Boolean(mafsFlags["polygon"]);
        default:
            return Boolean(mafsFlags[graph.type]);
    }
}
// We don't need to change any of the original props for static mode
const staticTransform = _.identity;

export default {
    name: "interactive-graph",
    displayName: "Interactive graph",
    widget: InteractiveGraph,
    staticTransform: staticTransform,
} as WidgetExports<typeof InteractiveGraph>;
