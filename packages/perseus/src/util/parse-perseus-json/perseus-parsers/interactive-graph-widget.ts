import {lockedFigureColorNames} from "../../../perseus-types";
import {
    array,
    boolean,
    constant,
    enumeration,
    nullable,
    number,
    object,
    optional,
    pair,
    string,
    trio,
    union,
} from "../general-purpose-parsers";

import {parsePerseusImageBackground} from "./perseus-image-background";
import {parseWidget} from "./widget";

import type {
    InteractiveGraphWidget,
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
    PerseusGraphType,
    PerseusGraphTypeAngle,
    PerseusGraphTypeCircle,
    PerseusGraphTypeLinear,
    PerseusGraphTypeLinearSystem,
    PerseusGraphTypeNone,
    PerseusGraphTypePoint,
    PerseusGraphTypePolygon,
    PerseusGraphTypeQuadratic,
    PerseusGraphTypeRay,
    PerseusGraphTypeSegment,
    PerseusGraphTypeSinusoid,
} from "../../../perseus-types";
import type {Parser} from "../parser-types";

// Used to represent 2-D points and ranges
const pairOfNumbers = pair(number, number);

const parsePerseusGraphTypeAngle: Parser<PerseusGraphTypeAngle> = object({
    type: constant("angle"),
    showAngles: optional(boolean),
    allowReflexAngles: optional(boolean),
    angleOffsetDeg: optional(number),
    snapDegrees: optional(number),
    match: optional(constant("congruent")),
    coords: optional(trio(pairOfNumbers, pairOfNumbers, pairOfNumbers)),
    startCoords: optional(trio(pairOfNumbers, pairOfNumbers, pairOfNumbers)),
});

const parsePerseusGraphTypeCircle: Parser<PerseusGraphTypeCircle> = object({
    type: constant("circle"),
    center: optional(pairOfNumbers),
    radius: optional(number),
    startCoords: optional(
        object({
            center: pairOfNumbers,
            radius: number,
        }),
    ),
    // TODO: remove coord? it's legacy.
    coord: optional(pairOfNumbers),
});

const parsePerseusGraphTypeLinear: Parser<PerseusGraphTypeLinear> = object({
    type: constant("linear"),
    coords: optional(nullable(pair(pairOfNumbers, pairOfNumbers))),
    startCoords: optional(pair(pairOfNumbers, pairOfNumbers)),
    // TODO: remove coord? it's legacy.
    coord: optional(pairOfNumbers),
});

const parsePerseusGraphTypeLinearSystem: Parser<PerseusGraphTypeLinearSystem> =
    object({
        type: constant("linear-system"),
        // TODO: default coords to empty array?
        coords: optional(nullable(array(pair(pairOfNumbers, pairOfNumbers)))),
        startCoords: optional(array(pair(pairOfNumbers, pairOfNumbers))),
        // TODO: remove coord? it's legacy.
        coord: optional(pairOfNumbers),
    });

const parsePerseusGraphTypeNone: Parser<PerseusGraphTypeNone> = object({
    type: constant("none"),
});

const parsePerseusGraphTypePoint: Parser<PerseusGraphTypePoint> = object({
    type: constant("point"),
    numPoints: optional(union(number).or(constant("unlimited")).parser),
    coords: optional(nullable(array(pairOfNumbers))),
    startCoords: optional(array(pairOfNumbers)),
    // TODO: remove coord? it's legacy.
    coord: optional(pairOfNumbers),
});

const parsePerseusGraphTypePolygon: Parser<PerseusGraphTypePolygon> = object({
    type: constant("polygon"),
    numSides: optional(union(number).or(constant("unlimited")).parser),
    showAngles: optional(boolean),
    showSides: optional(boolean),
    snapTo: optional(enumeration("grid", "angles", "sides")),
    match: optional(enumeration("similar", "congruent", "approx")),
    startCoords: optional(array(pairOfNumbers)),
    // TODO: remove coord? it's legacy.
    coord: optional(pairOfNumbers),
});

const parsePerseusGraphTypeQuadratic: Parser<PerseusGraphTypeQuadratic> =
    object({
        type: constant("quadratic"),
        coords: optional(
            nullable(trio(pairOfNumbers, pairOfNumbers, pairOfNumbers)),
        ),
        startCoords: optional(
            trio(pairOfNumbers, pairOfNumbers, pairOfNumbers),
        ),
        // TODO: remove coord? it's legacy.
        coord: optional(pairOfNumbers),
    });

const parsePerseusGraphTypeRay: Parser<PerseusGraphTypeRay> = object({
    type: constant("ray"),
    coords: optional(nullable(pair(pairOfNumbers, pairOfNumbers))),
    startCoords: optional(pair(pairOfNumbers, pairOfNumbers)),
    // TODO: remove coord? it's legacy.
    coord: optional(pairOfNumbers),
});

const parsePerseusGraphTypeSegment: Parser<PerseusGraphTypeSegment> = object({
    type: constant("segment"),
    // TODO: default numSegments?
    numSegments: optional(number),
    coords: optional(nullable(array(pair(pairOfNumbers, pairOfNumbers)))),
    startCoords: optional(array(pair(pairOfNumbers, pairOfNumbers))),
    // TODO: remove coord? it's legacy.
    coord: optional(pairOfNumbers),
});

const parsePerseusGraphTypeSinusoid: Parser<PerseusGraphTypeSinusoid> = object({
    type: constant("sinusoid"),
    coords: optional(nullable(array(pairOfNumbers))),
    startCoords: optional(array(pairOfNumbers)),
    // TODO: remove coord? it's legacy.
    coord: optional(pairOfNumbers),
});

const parsePerseusGraphType: Parser<PerseusGraphType> = union(
    parsePerseusGraphTypeAngle,
)
    .or(parsePerseusGraphTypeAngle)
    .or(parsePerseusGraphTypeCircle)
    .or(parsePerseusGraphTypeLinear)
    .or(parsePerseusGraphTypeLinearSystem)
    .or(parsePerseusGraphTypeNone)
    .or(parsePerseusGraphTypePoint)
    .or(parsePerseusGraphTypePolygon)
    .or(parsePerseusGraphTypeQuadratic)
    .or(parsePerseusGraphTypeRay)
    .or(parsePerseusGraphTypeSegment)
    .or(parsePerseusGraphTypeSinusoid).parser;

const parseLockedFigureColor: Parser<LockedFigureColor> = enumeration(
    ...lockedFigureColorNames,
);

const parseLockedFigureFillType: Parser<LockedFigureFillType> = enumeration(
    "none",
    "white",
    "translucent",
    "solid",
);

const parseLockedLineStyle: Parser<LockedLineStyle> = enumeration(
    "solid",
    "dashed",
);

const parseLockedLabelType: Parser<LockedLabelType> = object({
    type: constant("label"),
    coord: pairOfNumbers,
    text: string,
    color: parseLockedFigureColor,
    size: enumeration("small", "medium", "large"),
});

const parseLockedPointType: Parser<LockedPointType> = object({
    type: constant("point"),
    coord: pairOfNumbers,
    color: parseLockedFigureColor,
    filled: boolean,
    // TODO: default labels to empty array?
    labels: optional(array(parseLockedLabelType)),
    ariaLabel: optional(string),
});

const parseLockedLineType: Parser<LockedLineType> = object({
    type: constant("line"),
    kind: enumeration("line", "ray", "segment"),
    points: pair(parseLockedPointType, parseLockedPointType),
    color: parseLockedFigureColor,
    lineStyle: parseLockedLineStyle,
    showPoint1: boolean,
    showPoint2: boolean,
    // TODO: default labels to empty array?
    labels: optional(array(parseLockedLabelType)),
    ariaLabel: optional(string),
});

const parseLockedVectorType: Parser<LockedVectorType> = object({
    type: constant("vector"),
    points: pair(pairOfNumbers, pairOfNumbers),
    color: parseLockedFigureColor,
    // TODO: default labels to empty array?
    labels: optional(array(parseLockedLabelType)),
    ariaLabel: optional(string),
});

const parseLockedEllipseType: Parser<LockedEllipseType> = object({
    type: constant("ellipse"),
    center: pairOfNumbers,
    radius: pairOfNumbers,
    angle: number,
    color: parseLockedFigureColor,
    fillStyle: parseLockedFigureFillType,
    strokeStyle: parseLockedLineStyle,
    // TODO: default labels to empty array?
    labels: optional(array(parseLockedLabelType)),
    ariaLabel: optional(string),
});

const parseLockedPolygonType: Parser<LockedPolygonType> = object({
    type: constant("polygon"),
    points: array(pairOfNumbers),
    color: parseLockedFigureColor,
    showVertices: boolean,
    fillStyle: parseLockedFigureFillType,
    strokeStyle: parseLockedLineStyle,
    // TODO: default labels to empty array?
    labels: optional(array(parseLockedLabelType)),
    ariaLabel: optional(string),
});

const parseLockedFunctionType: Parser<LockedFunctionType> = object({
    type: constant("function"),
    color: parseLockedFigureColor,
    strokeStyle: parseLockedLineStyle,
    equation: string,
    directionalAxis: enumeration("x", "y"),
    domain: optional(pairOfNumbers),
    // TODO: default labels to empty array?
    labels: optional(array(parseLockedLabelType)),
    ariaLabel: optional(string),
});

const parseLockedFigure: Parser<LockedFigure> = union(parseLockedPointType)
    .or(parseLockedLineType)
    .or(parseLockedVectorType)
    .or(parseLockedEllipseType)
    .or(parseLockedPolygonType)
    .or(parseLockedFunctionType)
    .or(parseLockedLabelType).parser;

export const parseInteractiveGraphWidget: Parser<InteractiveGraphWidget> =
    parseWidget(
        constant("interactive-graph"),
        object({
            step: pairOfNumbers,
            gridStep: pairOfNumbers,
            snapStep: pairOfNumbers,
            backgroundImage: optional(parsePerseusImageBackground),
            markings: enumeration("graph", "grid", "none"),
            labels: array(string),
            showProtractor: boolean,
            showRuler: optional(boolean),
            showTooltips: optional(boolean),
            rulerLabel: optional(string),
            rulerTicks: optional(number),
            range: pair(pairOfNumbers, pairOfNumbers),
            graph: parsePerseusGraphType,
            correct: parsePerseusGraphType,
            // TODO: default lockedFigures to empty array
            lockedFigures: optional(array(parseLockedFigure)),
            fullGraphLabel: optional(string),
            fullGraphAriaDescription: optional(string),
        }),
    );
