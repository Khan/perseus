import type {
    CollinearTuple,
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

export type LockedFunctionOptions = Omit<
    Partial<LockedFunctionType>,
    "type" | "equation"
>;

export function interactiveGraphQuestionBuilder(): InteractiveGraphQuestionBuilder {
    return new InteractiveGraphQuestionBuilder();
}

class InteractiveGraphQuestionBuilder {
    private content: string = "[[☃ interactive-graph 1]]";
    private backgroundImage?: {
        url: string;
        height: number;
        width: number;
        scale?: number;
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
    };
    private gridStep: vec.Vector2 = [1, 1];
    private labels: [string, string] = ["x", "y"];
    private markings: "graph" | "grid" | "none" = "graph";
    private xRange: Interval = [-10, 10];
    private yRange: Interval = [-10, 10];
    private snapStep: vec.Vector2 = [0.5, 0.5];
    private tickStep: vec.Vector2 = [1, 1];
    private showProtractor: boolean = false;
    private interactiveFigureConfig: InteractiveFigureConfig =
        new SegmentGraphConfig();
    private lockedFigures: LockedFigure[] = [];

    build(): PerseusRenderer {
        return {
            content: this.content,
            images: {},
            widgets: {
                "interactive-graph 1": {
                    graded: true,
                    options: {
                        correct: this.interactiveFigureConfig.correct(),
                        backgroundImage: this.backgroundImage,
                        graph: this.interactiveFigureConfig.graph(),
                        gridStep: this.gridStep,
                        labels: this.labels,
                        markings: this.markings,
                        range: [this.xRange, this.yRange],
                        rulerLabel: "",
                        rulerTicks: 10,
                        showProtractor: this.showProtractor,
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

    withContent(content: string): InteractiveGraphQuestionBuilder {
        this.content = content;
        return this;
    }

    withBackgroundImage(
        url: string,
        height: number,
        width: number,
        options?: {
            scale?: number;
            bottom?: number;
            left?: number;
            right?: number;
            top?: number;
        },
    ): InteractiveGraphQuestionBuilder {
        this.backgroundImage = {
            url,
            height,
            width,
            ...options,
        };
        return this;
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

    withProtractor(): InteractiveGraphQuestionBuilder {
        this.showProtractor = true;
        return this;
    }

    withSegments(options?: {
        numSegments?: number;
        startCoords?: CollinearTuple[];
        coords?: CollinearTuple[];
    }): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new SegmentGraphConfig(options);
        return this;
    }

    withLinear(options?: {
        coords?: CollinearTuple;
        startCoords?: CollinearTuple;
    }): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new LinearGraphConfig(options);
        return this;
    }

    withLinearSystem(options?: {
        coords?: CollinearTuple[];
        startCoords?: CollinearTuple[];
    }): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new LinearSystemGraphConfig(options);
        return this;
    }

    withRay(options?: {
        coords?: CollinearTuple;
        startCoords?: CollinearTuple;
    }): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new RayGraphConfig(options);
        return this;
    }

    withCircle(options?: {
        center?: Coord;
        radius?: number;
        startCoords?: Coord;
    }): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new CircleGraphConfig(options);
        return this;
    }

    withQuadratic(options?: {
        coords?: [Coord, Coord, Coord];
        startCoords?: [Coord, Coord, Coord];
    }): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new QuadraticGraphConfig(options);
        return this;
    }

    withSinusoid(options?: {
        coords?: [Coord, Coord];
        startCoords?: [Coord, Coord];
    }): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new SinusoidGraphConfig(options);
        return this;
    }

    withPolygon(
        snapTo: "grid" | "angles" | "sides",
        options?: {
            match?: "similar" | "congruent" | "approx";
            numSides?: number | "unlimited";
            showAngles?: boolean;
            showSides?: boolean;
            coords?: Coord[];
        },
    ): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new PolygonGraphConfig(snapTo, options);
        return this;
    }

    withPoint(
        numPoints: number | "unlimited",
        options?: {
            coords?: Coord[];
            startCoords?: Coord[];
        },
    ): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new PointGraphConfig(numPoints, options);
        return this;
    }

    withAngle(options?: {
        coords?: [Coord, Coord, Coord];
        startCoords?: [Coord, Coord, Coord];
        showAngles?: boolean;
        allowReflexAngles?: boolean;
        angleOffsetDeg?: number;
        snapDegrees?: number;
        match?: "congruent";
    }): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new AngleGraphConfig(options);
        return this;
    }

    // TODO(benchristel): if we want other attributes of locked points to be
    // configurable in the future, we can add an `options` param to this method.
    addLockedPointAt(
        x: number,
        y: number,
        options?: {
            color?: LockedFigureColor;
            filled?: boolean;
        },
    ): InteractiveGraphQuestionBuilder {
        this.addLockedFigure(this.createLockedPoint(x, y, options));
        return this;
    }

    addLockedLine(
        point1: vec.Vector2,
        point2: vec.Vector2,
        options?: {
            kind?: "line" | "ray" | "segment";
            lineStyle?: "solid" | "dashed";
            color?: LockedFigureColor;
            filled?: [boolean, boolean];
            showPoint1?: boolean;
            showPoint2?: boolean;
        },
    ): InteractiveGraphQuestionBuilder {
        const line: LockedLineType = {
            type: "line",
            kind: options?.kind ?? "line",
            showPoint1: options?.showPoint1 ?? false,
            showPoint2: options?.showPoint2 ?? false,
            color: options?.color ?? "grayH",
            lineStyle: options?.lineStyle ?? "solid",
            points: [
                {
                    ...this.createLockedPoint(...point1, {
                        color: options?.color,
                        filled: options?.filled?.[0] ?? true,
                    }),
                },
                {
                    ...this.createLockedPoint(...point2, {
                        color: options?.color,
                        filled: options?.filled?.[1] ?? true,
                    }),
                },
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
            color: "grayH",
            strokeStyle: "solid",
            directionalAxis: "x",
            ...options,
        };

        this.addLockedFigure(lockedFunction);
        return this;
    }

    private createLockedPoint(
        x: number,
        y: number,
        options?: {
            color?: LockedFigureColor;
            filled?: boolean;
        },
    ): LockedPointType {
        return {
            type: "point",
            coord: [x, y],
            color: options?.color ?? "grayH",
            filled: options?.filled ?? true,
        };
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
    private coords: CollinearTuple[];
    private startCoords?: CollinearTuple[];

    constructor(options?: {
        numSegments?: number;
        startCoords?: CollinearTuple[];
        coords?: CollinearTuple[];
    }) {
        this.numSegments =
            options?.numSegments ??
            options?.startCoords?.length ??
            options?.coords?.length ??
            1;
        this.coords =
            options?.coords ??
            repeat(this.numSegments, () => [
                [-5, 5],
                [5, 5],
            ]);
        this.startCoords = options?.startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "segment",
            numSegments: this.numSegments,
            coords: this.coords,
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

class LinearGraphConfig implements InteractiveFigureConfig {
    private startCoords?: CollinearTuple;
    private correctCoords: CollinearTuple;

    constructor(options?: {
        coords?: CollinearTuple;
        startCoords?: CollinearTuple;
    }) {
        this.startCoords = options?.startCoords;
        this.correctCoords = options?.coords ?? [
            [-5, 5],
            [5, 5],
        ];
    }

    correct(): PerseusGraphType {
        return {
            type: "linear",
            coords: this.correctCoords,
        };
    }

    graph(): PerseusGraphType {
        return {type: "linear", coords: this.startCoords};
    }
}

class LinearSystemGraphConfig implements InteractiveFigureConfig {
    private startCoords?: CollinearTuple[];
    private correctCoords: CollinearTuple[];

    constructor(options?: {
        coords?: CollinearTuple[];
        startCoords?: CollinearTuple[];
    }) {
        this.startCoords = options?.startCoords;
        this.correctCoords = options?.coords ?? [
            [
                [-5, 5],
                [5, 5],
            ],
            [
                [-5, -5],
                [5, -5],
            ],
        ];
    }

    correct(): PerseusGraphType {
        return {
            type: "linear-system",
            coords: this.correctCoords,
        };
    }

    graph(): PerseusGraphType {
        return {type: "linear-system", coords: this.startCoords};
    }
}

class RayGraphConfig implements InteractiveFigureConfig {
    private coords?: CollinearTuple;
    private startCoords?: CollinearTuple;

    constructor(options?: {
        coords?: CollinearTuple;
        startCoords?: CollinearTuple;
    }) {
        this.coords = options?.coords ?? [
            [-5, 5],
            [5, 5],
        ];
        this.startCoords = options?.startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "ray",
            coords: this.coords,
        };
    }

    graph(): PerseusGraphType {
        return {type: "ray", coords: this.startCoords};
    }
}

class CircleGraphConfig implements InteractiveFigureConfig {
    private startCoords?: Coord;
    private correctCenter: Coord;
    private correctRadius: number;

    constructor(options?: {
        center?: Coord;
        radius?: number;
        startCoords?: Coord;
    }) {
        this.startCoords = options?.startCoords;
        this.correctCenter = options?.center ?? [0, 0];
        this.correctRadius = options?.radius ?? 2;
    }

    correct(): PerseusGraphType {
        return {
            type: "circle",
            radius: this.correctRadius,
            center: this.correctCenter,
        };
    }

    graph(): PerseusGraphType {
        if (this.startCoords) {
            return {type: "circle", center: this.startCoords, radius: 5};
        }

        return {type: "circle"};
    }
}

class QuadraticGraphConfig implements InteractiveFigureConfig {
    private coords?: [Coord, Coord, Coord];
    private startCoords?: [Coord, Coord, Coord];

    constructor(options?: {
        coords?: [Coord, Coord, Coord];
        startCoords?: [Coord, Coord, Coord];
    }) {
        this.coords = options?.coords ?? [
            [-5, 5],
            [0, -5],
            [5, 5],
        ];
        this.startCoords = options?.startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "quadratic",
            coords: this.coords,
        };
    }

    graph(): PerseusGraphType {
        return {type: "quadratic", coords: this.startCoords};
    }
}

class SinusoidGraphConfig implements InteractiveFigureConfig {
    private coords?: [Coord, Coord];
    private startCoords?: [Coord, Coord];

    constructor(options?: {
        coords?: [Coord, Coord];
        startCoords?: [Coord, Coord];
    }) {
        this.coords = options?.coords ?? [
            [0, 0],
            [3, 2],
        ];
        this.startCoords = options?.startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "sinusoid",
            coords: this.coords,
        };
    }

    graph(): PerseusGraphType {
        return {type: "sinusoid", coords: this.startCoords};
    }
}

class PolygonGraphConfig implements InteractiveFigureConfig {
    private snapTo: "grid" | "angles" | "sides";
    private match?: "similar" | "congruent" | "approx";
    private numSides: number | "unlimited";
    private showAngles: boolean;
    private showSides: boolean;
    private coords: Coord[];

    constructor(
        snapTo: "grid" | "angles" | "sides",
        options?: {
            match?: "similar" | "congruent" | "approx";
            numSides?: number | "unlimited";
            showAngles?: boolean;
            showSides?: boolean;
            coords?: Coord[];
        },
    ) {
        this.snapTo = snapTo;
        this.match = options?.match;
        this.numSides = options?.numSides ?? 3;
        this.showAngles = options?.showAngles ?? false;
        this.showSides = options?.showSides ?? false;
        this.coords = options?.coords ?? [
            [3, -2],
            [0, 4],
            [-3, -2],
        ];
    }
    correct(): PerseusGraphType {
        return {
            type: "polygon",
            match: this.match,
            numSides: this.numSides,
            showAngles: this.showAngles,
            showSides: this.showSides,
            snapTo: this.snapTo,
            coords: this.coords,
        };
    }

    graph(): PerseusGraphType {
        return {
            type: "polygon",
            showAngles: this.showAngles,
            showSides: this.showSides,
            snapTo: this.snapTo,
        };
    }
}

class PointGraphConfig implements InteractiveFigureConfig {
    private numPoints: number | "unlimited";
    private coords: Coord[];
    private startCoords?: Coord[];

    constructor(
        numPoints: number | "unlimited",
        options?: {
            coords?: Coord[];
            startCoords?: Coord[];
        },
    ) {
        this.numPoints = numPoints;
        this.coords = options?.coords ?? [[0, 0]];
        this.startCoords = options?.startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "point",
            numPoints: this.numPoints,
            coords: this.coords,
        };
    }

    graph(): PerseusGraphType {
        return {
            type: "point",
            numPoints: this.numPoints,
            coords: this.startCoords,
        };
    }
}

class AngleGraphConfig implements InteractiveFigureConfig {
    private coords?: [Coord, Coord, Coord];
    private startCoords?: [Coord, Coord, Coord];
    private showAngles?: boolean;
    private allowReflexAngles?: boolean;
    private angleOffsetDeg?: number;
    private snapDegrees?: number;
    private match?: "congruent";

    constructor(options?: {
        coords?: [Coord, Coord, Coord];
        startCoords?: [Coord, Coord, Coord];
        showAngles?: boolean;
        allowReflexAngles?: boolean;
        angleOffsetDeg?: number;
        snapDegrees?: number;
        match?: "congruent";
    }) {
        // Default correct answer is 20 degree angle at (0, 0)
        this.coords = options?.coords ?? [
            [6.994907182610915, 0],
            [0, 0],
            [6.5778483455013586, 2.394141003279681],
        ];
        this.startCoords = options?.startCoords;
        this.showAngles = options?.showAngles;
        this.allowReflexAngles = options?.allowReflexAngles;
        this.angleOffsetDeg = options?.angleOffsetDeg;
        this.snapDegrees = options?.snapDegrees;
        this.match = options?.match;
    }

    correct(): PerseusGraphType {
        return {
            type: "angle",
            coords: this.coords,
            showAngles: this.showAngles,
            allowReflexAngles: this.allowReflexAngles,
            angleOffsetDeg: this.angleOffsetDeg,
            snapDegrees: this.snapDegrees,
            match: this.match,
        };
    }

    graph(): PerseusGraphType {
        return {
            type: "angle",
            coords: this.startCoords,
            showAngles: this.showAngles,
            allowReflexAngles: this.allowReflexAngles,
            angleOffsetDeg: this.angleOffsetDeg,
            snapDegrees: this.snapDegrees,
            match: this.match,
        };
    }
}

function repeat<T>(n: number, makeItem: () => T): T[] {
    return new Array(n).fill(null).map(makeItem);
}
