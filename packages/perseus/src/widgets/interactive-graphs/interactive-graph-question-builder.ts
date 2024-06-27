import type {
    CollinearTuple,
    Domain,
    LockedEllipseType,
    LockedFigure,
    LockedFigureColor,
    LockedFigureFillType,
    LockedFunctionType,
    LockedLineType,
    LockedPointType,
    LockedPolygonType,
    LockedVectorType,
    PerseusGraphType,
    PerseusRenderer,
} from "../../perseus-types";
import type {Coord} from "@khanacademy/perseus";
import type {Interval, vec} from "mafs";

export type LockedFunctionOptions = {
    color?: LockedFigureColor;
    strokeStyle?: "solid" | "dashed";
    directionalAxis?: "x" | "y";
    domain?: Domain;
    equationParsed?: any; // KAS doesn't have any types
};

export function interactiveGraphQuestionBuilder(): InteractiveGraphQuestionBuilder {
    return new InteractiveGraphQuestionBuilder();
}

class InteractiveGraphQuestionBuilder {
    private gridStep: vec.Vector2 = [1, 1];
    private labels: [string, string] = ["x", "y"];
    private markings: "graph" | "grid" | "none" = "graph";
    private xRange: Interval = [-10, 10];
    private yRange: Interval = [-10, 10];
    private snapStep: vec.Vector2 = [0.5, 0.5];
    private tickStep: vec.Vector2 = [1, 1];
    private interactiveFigureConfig: InteractiveFigureConfig =
        new SegmentGraphConfig(1);
    private lockedFigures: LockedFigure[] = [];

    build(): PerseusRenderer {
        return {
            content: "[[☃ interactive-graph 1]]",
            images: {},
            widgets: {
                "interactive-graph 1": {
                    graded: true,
                    options: {
                        correct: this.interactiveFigureConfig.correct(),
                        graph: this.interactiveFigureConfig.graph(),
                        gridStep: this.gridStep,
                        labels: this.labels,
                        markings: this.markings,
                        range: [this.xRange, this.yRange],
                        rulerLabel: "",
                        rulerTicks: 10,
                        showProtractor: false,
                        showRuler: false,
                        snapStep: this.snapStep,
                        step: this.tickStep,
                        lockedFigures: this.lockedFigures,
                    },
                    type: "interactive-graph",
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        };
    }

    withGridStep(x: number, y: number): InteractiveGraphQuestionBuilder {
        this.gridStep = [x, y];
        return this;
    }

    withAxisLabels(x: string, y: string): InteractiveGraphQuestionBuilder {
        this.labels = [x, y];
        return this;
    }

    withMarkings(
        markings: "graph" | "grid" | "none",
    ): InteractiveGraphQuestionBuilder {
        this.markings = markings;
        return this;
    }

    withXRange(min: number, max: number): InteractiveGraphQuestionBuilder {
        this.xRange = [min, max];
        return this;
    }

    withYRange(min: number, max: number): InteractiveGraphQuestionBuilder {
        this.yRange = [min, max];
        return this;
    }

    withSnapStep(x: number, y: number): InteractiveGraphQuestionBuilder {
        this.snapStep = [x, y];
        return this;
    }

    withTickStep(x: number, y: number): InteractiveGraphQuestionBuilder {
        this.tickStep = [x, y];
        return this;
    }

    withSegments(
        startCoords: CollinearTuple[],
    ): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new SegmentGraphConfig(
            startCoords.length,
            startCoords,
        );
        return this;
    }

    withNumSegments(numSegments: number): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new SegmentGraphConfig(numSegments);
        return this;
    }

    withLinear(startCoords?: CollinearTuple): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new LinearConfig(startCoords);
        return this;
    }

    withLinearSystem(
        startCoords?: CollinearTuple[],
    ): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new LinearSystemConfig(startCoords);
        return this;
    }

    withRay(startCoords?: CollinearTuple): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new RayConfig(startCoords);
        return this;
    }

    withCircle(startCoords?: Coord): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new CircleGraphConfig(startCoords);
        return this;
    }

    withQuadratic(
        startCoords?: [Coord, Coord, Coord],
    ): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new QuadraticConfig(startCoords);
        return this;
    }

    withSinusoid(
        startCoords?: [Coord, Coord],
    ): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new SinusoidGraphConfig(startCoords);
        return this;
    }

    withPolygon(
        snapTo: "grid" | "angles" | "sides",
    ): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new PolygonGraphConfig(snapTo);
        return this;
    }

    // TODO(benchristel): if we want other attributes of locked points to be
    // configurable in the future, we can add an `options` param to this method.
    addLockedPointAt(x: number, y: number): InteractiveGraphQuestionBuilder {
        this.addLockedFigure(this.createLockedPoint(x, y));
        return this;
    }

    addLockedLine(
        point1: vec.Vector2,
        point2: vec.Vector2,
    ): InteractiveGraphQuestionBuilder {
        const line: LockedLineType = {
            type: "line",
            kind: "line",
            showPoint1: true,
            showPoint2: true,
            color: "green",
            lineStyle: "solid",
            points: [
                this.createLockedPoint(...point1),
                this.createLockedPoint(...point2),
            ],
        };
        this.addLockedFigure(line);
        return this;
    }

    addLockedVector(
        tail: vec.Vector2,
        tip: vec.Vector2,
        color?: LockedFigureColor,
    ): InteractiveGraphQuestionBuilder {
        const vector: LockedVectorType = {
            type: "vector",
            color: color ?? "grayH",
            points: [tail, tip],
        };
        this.addLockedFigure(vector);
        return this;
    }

    addLockedEllipse(
        center: vec.Vector2,
        radius: [x: number, y: number],
        options?: {
            angle?: number;
            color?: LockedFigureColor;
            fillStyle?: LockedFigureFillType;
            strokeStyle?: "solid" | "dashed";
        },
    ): InteractiveGraphQuestionBuilder {
        const ellipse: LockedEllipseType = {
            type: "ellipse",
            center: center,
            radius: radius,
            angle: 0,
            color: "grayH",
            fillStyle: "none",
            strokeStyle: "solid",
            ...options,
        };

        this.addLockedFigure(ellipse);
        return this;
    }

    addLockedPolygon(
        points: vec.Vector2[],
        options?: {
            color?: LockedFigureColor;
            showVertices?: boolean;
            fillStyle?: LockedFigureFillType;
            strokeStyle?: "solid" | "dashed";
        },
    ): InteractiveGraphQuestionBuilder {
        const polygon: LockedPolygonType = {
            type: "polygon",
            points: points,
            color: "grayH",
            showVertices: false,
            fillStyle: "none",
            strokeStyle: "solid",
            ...options,
        };

        this.addLockedFigure(polygon);
        return this;
    }

    addLockedFunction(equation: string, options?: LockedFunctionOptions) {
        const lockedFunction: LockedFunctionType = {
            type: "function",
            equation,
            equationParsed: "",
            color: "grayH",
            strokeStyle: "solid",
            directionalAxis: "x",
            ...options,
        };

        this.addLockedFigure(lockedFunction);
        return this;
    }

    private createLockedPoint(x: number, y: number): LockedPointType {
        return {type: "point", coord: [x, y], color: "green", filled: true};
    }

    private addLockedFigure(figure: LockedFigure) {
        this.lockedFigures = [...this.lockedFigures, figure];
    }
}

interface InteractiveFigureConfig {
    graph(): PerseusGraphType;
    correct(): PerseusGraphType;
}

class SegmentGraphConfig implements InteractiveFigureConfig {
    private numSegments: number;
    private startCoords?: CollinearTuple[];

    constructor(numSegments: number, startCoords?: CollinearTuple[]) {
        this.numSegments = numSegments;
        this.startCoords = startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "segment",
            numSegments: this.numSegments,
            coords: repeat(this.numSegments, () => [
                [-7, 7],
                [2, 5],
            ]),
        };
    }

    graph(): PerseusGraphType {
        return {
            type: "segment",
            numSegments: this.numSegments,
            coords: this.startCoords,
        };
    }
}

class LinearConfig implements InteractiveFigureConfig {
    private startCoords?: CollinearTuple;

    constructor(startCoords?: CollinearTuple) {
        this.startCoords = startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "linear",
            coords: [
                [-10, -5],
                [10, 5],
            ],
        };
    }

    graph(): PerseusGraphType {
        return {type: "linear", coords: this.startCoords};
    }
}

class LinearSystemConfig implements InteractiveFigureConfig {
    private startCoords?: CollinearTuple[];

    constructor(startCoords?: CollinearTuple[]) {
        this.startCoords = startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "linear-system",
            coords: [
                [
                    [-10, -5],
                    [10, 5],
                ],
                [
                    [-10, 5],
                    [10, -5],
                ],
            ],
        };
    }

    graph(): PerseusGraphType {
        return {type: "linear-system", coords: this.startCoords};
    }
}

class RayConfig implements InteractiveFigureConfig {
    private startCoords?: CollinearTuple;

    constructor(startCoords?: CollinearTuple) {
        this.startCoords = startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "ray",
            coords: [
                [-10, -5],
                [10, 5],
            ],
        };
    }

    graph(): PerseusGraphType {
        return {type: "ray", coords: this.startCoords};
    }
}

class CircleGraphConfig implements InteractiveFigureConfig {
    private startCoords?: Coord;

    constructor(startCoords?: Coord) {
        this.startCoords = startCoords;
    }

    correct(): PerseusGraphType {
        return {type: "circle", radius: 5, center: [0, 0]};
    }

    graph(): PerseusGraphType {
        if (this.startCoords) {
            return {type: "circle", center: this.startCoords, radius: 5};
        }

        return {type: "circle"};
    }
}

class QuadraticConfig implements InteractiveFigureConfig {
    private startCoords?: [Coord, Coord, Coord];

    constructor(startCoords?: [Coord, Coord, Coord]) {
        this.startCoords = startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "quadratic",
            coords: [
                [-10, 5],
                [10, 5],
                [0, -5],
            ],
        };
    }

    graph(): PerseusGraphType {
        return {type: "quadratic", coords: this.startCoords};
    }
}

class SinusoidGraphConfig implements InteractiveFigureConfig {
    private startCoords?: [Coord, Coord];

    constructor(startCoords?: [Coord, Coord]) {
        this.startCoords = startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "sinusoid",
            coords: [
                [-10, 5],
                [10, 5],
            ],
        };
    }

    graph(): PerseusGraphType {
        return {type: "sinusoid", coords: this.startCoords};
    }
}

class PolygonGraphConfig implements InteractiveFigureConfig {
    private snapTo: "grid" | "angles" | "sides";
    constructor(snapTo: "grid" | "angles" | "sides") {
        this.snapTo = snapTo;
    }
    correct(): PerseusGraphType {
        return {
            type: "polygon",
            numSides: 4,
            showAngles: true,
            showSides: true,
            snapTo: "grid",
            coords: [
                [-1, 2],
                [3, 4],
                [1, -2],
                [-3, 0],
            ],
        };
    }

    graph(): PerseusGraphType {
        return {
            type: "polygon",
            snapTo: this.snapTo,
        };
    }
}

function repeat<T>(n: number, makeItem: () => T): T[] {
    return new Array(n).fill(null).map(makeItem);
}
