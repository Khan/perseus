import {vec} from "mafs";

import type {SnapTo} from "./types";
import type {Coord} from "../../interactive2/types";
import type {
    AxisLabelLocation,
    CollinearTuple,
    LockedEllipseType,
    LockedFigure,
    LockedFigureColor,
    LockedFigureFillType,
    LockedFunctionType,
    LockedLabelType,
    LockedLineStyle,
    LockedLineType,
    LockedPointType,
    LockedPolygonType,
    LockedVectorType,
    MarkingsType,
    PerseusGraphType,
    PerseusRenderer,
    StrokeWeight,
} from "@khanacademy/perseus-core";
import type {Interval} from "mafs";

export type LockedFunctionOptions = {
    color?: LockedFigureColor;
    strokeStyle?: LockedLineStyle;
    directionalAxis?: "x" | "y";
    domain?: [min: number, max: number];
    labels?: LockedFigureLabelOptions[];
    ariaLabel?: string;
};

type LockedFigureLabelOptions = {
    text: string;
    coord?: Coord;
    size?: "small" | "medium" | "large";
};

export function interactiveGraphQuestionBuilder(): InteractiveGraphQuestionBuilder {
    return new InteractiveGraphQuestionBuilder();
}

class InteractiveGraphQuestionBuilder {
    private content: string = "[[☃ interactive-graph 1]]";
    private fullGraphAriaLabel?: string;
    private fullGraphAriaDescription?: string;
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
    private labels: [string, string] = ["$x$", "$y$"];
    private labelLocation: AxisLabelLocation | undefined = undefined;
    private markings: MarkingsType = "graph";
    private xRange: Interval = [-10, 10];
    private yRange: Interval = [-10, 10];
    private snapStep: vec.Vector2 = [0.5, 0.5];
    private tickStep: vec.Vector2 = [1, 1];
    private showProtractor: boolean = false;
    private interactiveFigureConfig: InteractiveFigureConfig =
        new SegmentGraphConfig();
    private lockedFigures: LockedFigure[] = [];
    private snapTo: SnapTo = "grid";
    private staticMode: boolean = false;

    build(): PerseusRenderer {
        return {
            content: this.content,
            images: {},
            widgets: {
                "interactive-graph 1": {
                    graded: true,
                    static: this.staticMode,
                    options: {
                        correct: this.interactiveFigureConfig.correct(),
                        fullGraphAriaLabel: this.fullGraphAriaLabel,
                        fullGraphAriaDescription: this.fullGraphAriaDescription,
                        backgroundImage: this.backgroundImage,
                        graph: this.interactiveFigureConfig.graph(),
                        gridStep: this.gridStep,
                        labels: this.labels,
                        labelLocation: this.labelLocation,
                        markings: this.markings,
                        range: [this.xRange, this.yRange],
                        showProtractor: this.showProtractor,
                        snapStep: this.snapStep,
                        step: this.tickStep,
                        lockedFigures: this.lockedFigures,
                    },
                    type: "interactive-graph",
                },
            },
        };
    }

    withContent(content: string): InteractiveGraphQuestionBuilder {
        this.content = content;
        return this;
    }

    withFullGraphAriaLabel(label: string): InteractiveGraphQuestionBuilder {
        this.fullGraphAriaLabel = label;
        return this;
    }

    withFullGraphAriaDescription(
        description: string,
    ): InteractiveGraphQuestionBuilder {
        this.fullGraphAriaDescription = description;
        return this;
    }

    withStaticMode(staticMode: boolean): InteractiveGraphQuestionBuilder {
        this.staticMode = staticMode;
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

    withLabelLocation(
        labelLocation: AxisLabelLocation,
    ): InteractiveGraphQuestionBuilder {
        this.labelLocation = labelLocation;
        return this;
    }

    withMarkings(markings: MarkingsType): InteractiveGraphQuestionBuilder {
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

    withNoInteractiveFigure() {
        this.interactiveFigureConfig = new NoInteractiveFigureConfig();
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
        startCoords?: {
            center: Coord;
            radius: number;
        };
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
        snapTo?: SnapTo,
        options?: {
            match?: "similar" | "congruent" | "approx";
            numSides?: number | "unlimited";
            showAngles?: boolean;
            showSides?: boolean;
            coords?: Coord[];
            startCoords?: Coord[];
        },
    ): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new PolygonGraphConfig(snapTo, options);
        return this;
    }

    withPoints(
        numPoints: number | "unlimited",
        options?: {
            coords?: Coord[];
            startCoords?: Coord[];
        },
    ): InteractiveGraphQuestionBuilder {
        this.interactiveFigureConfig = new PointsGraphConfig(
            numPoints,
            options,
        );
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

    addLockedPointAt(
        x: number,
        y: number,
        options?: {
            color?: LockedFigureColor;
            filled?: boolean;
            labels?: LockedFigureLabelOptions[];
            ariaLabel?: string;
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
            lineStyle?: LockedLineStyle;
            color?: LockedFigureColor;
            filled?: [boolean, boolean];
            showPoint1?: boolean;
            showPoint2?: boolean;
            weight?: "thin" | "medium" | "thick";
            labels?: LockedFigureLabelOptions[];
            ariaLabel?: string;
        },
    ): InteractiveGraphQuestionBuilder {
        const line: LockedLineType = {
            type: "line",
            kind: options?.kind ?? "line",
            showPoint1: options?.showPoint1 ?? false,
            showPoint2: options?.showPoint2 ?? false,
            color: options?.color ?? "grayH",
            lineStyle: options?.lineStyle ?? "solid",
            weight: options?.weight ?? "medium",
            labels:
                options?.labels?.map((label) => ({
                    type: "label",
                    coord: label.coord ?? vec.midpoint(point1, point2),
                    text: label.text,
                    color: options?.color ?? "grayH",
                    size: label.size ?? "medium",
                })) ?? [],
            ariaLabel: options?.ariaLabel,
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
        options?: {
            color?: LockedFigureColor;
            labels?: LockedFigureLabelOptions[];
            ariaLabel?: string;
        },
    ): InteractiveGraphQuestionBuilder {
        const vector: LockedVectorType = {
            type: "vector",
            color: options?.color ?? "grayH",
            points: [tail, tip],
            labels:
                options?.labels?.map((label) => ({
                    type: "label",
                    coord: label.coord ?? vec.midpoint(tail, tip),
                    text: label.text,
                    color: options?.color ?? "grayH",
                    size: label.size ?? "medium",
                })) ?? [],
            ariaLabel: options?.ariaLabel,
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
            labels?: LockedFigureLabelOptions[];
            ariaLabel?: string;
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
            labels:
                options?.labels?.map((label) => ({
                    type: "label",
                    coord: label.coord ?? center,
                    text: label.text,
                    color: options?.color ?? "grayH",
                    size: label.size ?? "medium",
                })) ?? [],
            ariaLabel: options?.ariaLabel,
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
            strokeStyle?: LockedLineStyle;
            weight?: StrokeWeight;
            labels?: LockedFigureLabelOptions[];
            ariaLabel?: string;
        },
    ): InteractiveGraphQuestionBuilder {
        const polygon: LockedPolygonType = {
            type: "polygon",
            points: points,
            color: "grayH",
            showVertices: false,
            fillStyle: "none",
            strokeStyle: "solid",
            weight: options?.weight ?? "medium",
            ...options,
            labels:
                options?.labels?.map((label) => ({
                    type: "label",
                    coord: label.coord ?? points[0],
                    text: label.text,
                    color: options?.color ?? "grayH",
                    size: label.size ?? "medium",
                })) ?? [],
            ariaLabel: options?.ariaLabel,
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
            domain: [-Infinity, Infinity],
            ...options,
            labels:
                options?.labels?.map(
                    (label) =>
                        ({
                            type: "label",
                            coord: label.coord ?? [0, 0],
                            text: label.text,
                            color: options?.color ?? "grayH",
                            size: label.size ?? "medium",
                        }) satisfies LockedLabelType,
                ) ?? [],
            ariaLabel: options?.ariaLabel,
        };

        this.addLockedFigure(lockedFunction);
        return this;
    }

    addLockedLabel(
        text: string,
        coord: Coord,
        options?: {
            color?: LockedFigureColor;
            size?: "small" | "medium" | "large";
        },
    ) {
        const lockedLabel: LockedLabelType = {
            type: "label",
            coord,
            text,
            color: "grayH",
            size: "medium",
            ...options,
        };

        this.addLockedFigure(lockedLabel);
        return this;
    }

    private createLockedPoint(
        x: number,
        y: number,
        options?: {
            color?: LockedFigureColor;
            filled?: boolean;
            labels?: LockedFigureLabelOptions[];
            ariaLabel?: string;
        },
    ): LockedPointType {
        return {
            type: "point",
            coord: [x, y],
            color: options?.color ?? "grayH",
            filled: options?.filled ?? true,
            labels:
                options?.labels?.map((label) => ({
                    type: "label",
                    coord: label.coord ?? [x + 0.5, y],
                    text: label.text,
                    color: options?.color ?? "grayH",
                    size: label.size ?? "medium",
                })) ?? [],
            ariaLabel: options?.ariaLabel,
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
    private coords?: CollinearTuple[];
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
        this.coords = options?.coords;
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
            startCoords: this.startCoords,
        };
    }
}

class NoInteractiveFigureConfig implements InteractiveFigureConfig {
    correct(): PerseusGraphType {
        return {type: "none"};
    }

    graph(): PerseusGraphType {
        return {type: "none"};
    }
}

class LinearGraphConfig implements InteractiveFigureConfig {
    private startCoords?: CollinearTuple;
    private correctCoords?: CollinearTuple;

    constructor(options?: {
        coords?: CollinearTuple;
        startCoords?: CollinearTuple;
    }) {
        this.startCoords = options?.startCoords;
        this.correctCoords = options?.coords;
    }

    correct(): PerseusGraphType {
        return {
            type: "linear",
            coords: this.correctCoords,
        };
    }

    graph(): PerseusGraphType {
        return {type: "linear", startCoords: this.startCoords};
    }
}

class LinearSystemGraphConfig implements InteractiveFigureConfig {
    private startCoords?: CollinearTuple[];
    private correctCoords?: CollinearTuple[];

    constructor(options?: {
        coords?: CollinearTuple[];
        startCoords?: CollinearTuple[];
    }) {
        this.startCoords = options?.startCoords;
        this.correctCoords = options?.coords;
    }

    correct(): PerseusGraphType {
        return {
            type: "linear-system",
            coords: this.correctCoords,
        };
    }

    graph(): PerseusGraphType {
        return {type: "linear-system", startCoords: this.startCoords};
    }
}

class RayGraphConfig implements InteractiveFigureConfig {
    private coords?: CollinearTuple;
    private startCoords?: CollinearTuple;

    constructor(options?: {
        coords?: CollinearTuple;
        startCoords?: CollinearTuple;
    }) {
        this.coords = options?.coords;
        this.startCoords = options?.startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "ray",
            coords: this.coords,
        };
    }

    graph(): PerseusGraphType {
        return {type: "ray", startCoords: this.startCoords};
    }
}

class CircleGraphConfig implements InteractiveFigureConfig {
    private startCoords?: {
        center: Coord;
        radius: number;
    };
    private correctCenter: Coord;
    private correctRadius: number;

    constructor(options?: {
        center?: Coord;
        radius?: number;
        startCoords?: {
            center: Coord;
            radius: number;
        };
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
            return {
                type: "circle",
                startCoords: this.startCoords,
            };
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
        this.coords = options?.coords;
        this.startCoords = options?.startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "quadratic",
            coords: this.coords,
        };
    }

    graph(): PerseusGraphType {
        return {type: "quadratic", startCoords: this.startCoords};
    }
}

class SinusoidGraphConfig implements InteractiveFigureConfig {
    private coords?: [Coord, Coord];
    private startCoords?: [Coord, Coord];

    constructor(options?: {
        coords?: [Coord, Coord];
        startCoords?: [Coord, Coord];
    }) {
        this.coords = options?.coords;
        this.startCoords = options?.startCoords;
    }

    correct(): PerseusGraphType {
        return {
            type: "sinusoid",
            coords: this.coords,
        };
    }

    graph(): PerseusGraphType {
        return {type: "sinusoid", startCoords: this.startCoords};
    }
}

class PolygonGraphConfig implements InteractiveFigureConfig {
    private snapTo: SnapTo;
    private match?: "similar" | "congruent" | "approx";
    private numSides: number | "unlimited";
    private showAngles: boolean;
    private showSides: boolean;
    private coords?: Coord[];
    private startCoords?: Coord[];

    constructor(
        snapTo?: SnapTo,
        options?: {
            match?: "similar" | "congruent" | "approx";
            numSides?: number | "unlimited";
            showAngles?: boolean;
            showSides?: boolean;
            coords?: Coord[];
            startCoords?: Coord[];
        },
    ) {
        this.snapTo = snapTo ?? "grid";
        this.match = options?.match;
        this.numSides =
            options?.numSides ??
            options?.startCoords?.length ??
            options?.coords?.length ??
            3;
        this.showAngles = options?.showAngles ?? false;
        this.showSides = options?.showSides ?? false;
        this.coords = options?.coords;
        this.startCoords = options?.startCoords;
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
            numSides: this.numSides,
            showAngles: this.showAngles,
            showSides: this.showSides,
            snapTo: this.snapTo,
            startCoords: this.startCoords,
        };
    }
}

class PointsGraphConfig implements InteractiveFigureConfig {
    private numPoints: number | "unlimited";
    private coords?: Coord[];
    private startCoords?: Coord[];

    constructor(
        numPoints: number | "unlimited",
        options?: {
            coords?: Coord[];
            startCoords?: Coord[];
        },
    ) {
        this.numPoints = numPoints;
        this.coords = options?.coords;
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
            startCoords: this.startCoords,
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
        this.coords = options?.coords;
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
            startCoords: this.startCoords,
            showAngles: this.showAngles,
            allowReflexAngles: this.allowReflexAngles,
            angleOffsetDeg: this.angleOffsetDeg,
            snapDegrees: this.snapDegrees,
            match: this.match,
        };
    }
}
