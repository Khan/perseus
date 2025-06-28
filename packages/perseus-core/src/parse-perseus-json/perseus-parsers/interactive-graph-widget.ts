import {lockedFigureColorNames} from "../../data-schema";
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
    pipeParsers,
    string,
    trio,
    union,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";
import {discriminatedUnionOn} from "../general-purpose-parsers/discriminated-union";

import {parsePerseusImageBackground} from "./perseus-image-background";
import {parseWidget} from "./widget";

import type {PerseusGraphTypeLinear} from "../../data-schema";

// Used to represent 2-D points and ranges
const pairOfNumbers = pair(number, number);

const parsePerseusGraphTypeAngle = object({
    type: constant("angle"),
    showAngles: optional(boolean),
    allowReflexAngles: optional(boolean),
    angleOffsetDeg: optional(number),
    snapDegrees: optional(number),
    match: optional(constant("congruent")),
    coords: optional(trio(pairOfNumbers, pairOfNumbers, pairOfNumbers)),
    startCoords: optional(trio(pairOfNumbers, pairOfNumbers, pairOfNumbers)),
});

const parsePerseusGraphTypeCircle = object({
    type: constant("circle"),
    center: optional(pairOfNumbers),
    radius: optional(number),
    startCoords: optional(
        object({
            center: pairOfNumbers,
            radius: number,
        }),
    ),
});

const parsePerseusGraphTypeLinear = object({
    type: constant("linear"),
    coords: optional(nullable(pair(pairOfNumbers, pairOfNumbers))),
    startCoords: optional(pair(pairOfNumbers, pairOfNumbers)),
});

const parsePerseusGraphTypeLinearSystem = object({
    type: constant("linear-system"),
    // TODO(benchristel): default coords to empty array?
    coords: optional(nullable(array(pair(pairOfNumbers, pairOfNumbers)))),
    startCoords: optional(array(pair(pairOfNumbers, pairOfNumbers))),
});

const parsePerseusGraphTypeNone = object({
    type: constant("none"),
});

const parsePerseusGraphTypePoint = object({
    type: constant("point"),
    numPoints: optional(union(number).or(constant("unlimited")).parser),
    coords: optional(nullable(array(pairOfNumbers))),
    startCoords: optional(array(pairOfNumbers)),
    coord: optional(pairOfNumbers),
});

const parsePerseusGraphTypePolygon = object({
    type: constant("polygon"),
    numSides: optional(union(number).or(constant("unlimited")).parser),
    showAngles: optional(boolean),
    showSides: optional(boolean),
    snapTo: optional(enumeration("grid", "angles", "sides")),
    match: optional(enumeration("similar", "congruent", "approx", "exact")),
    startCoords: optional(array(pairOfNumbers)),
    coords: optional(nullable(array(pairOfNumbers))),
});

const parsePerseusGraphTypeQuadratic = object({
    type: constant("quadratic"),
    coords: optional(
        nullable(trio(pairOfNumbers, pairOfNumbers, pairOfNumbers)),
    ),
    startCoords: optional(trio(pairOfNumbers, pairOfNumbers, pairOfNumbers)),
});

const parsePerseusGraphTypeRay = object({
    type: constant("ray"),
    coords: optional(nullable(pair(pairOfNumbers, pairOfNumbers))),
    startCoords: optional(pair(pairOfNumbers, pairOfNumbers)),
});

const parsePerseusGraphTypeSegment = object({
    type: constant("segment"),
    // TODO(benchristel): default numSegments?
    numSegments: optional(number),
    coords: optional(nullable(array(pair(pairOfNumbers, pairOfNumbers)))),
    startCoords: optional(array(pair(pairOfNumbers, pairOfNumbers))),
});

const parsePerseusGraphTypeSinusoid = object({
    type: constant("sinusoid"),
    coords: optional(nullable(array(pairOfNumbers))),
    startCoords: optional(array(pairOfNumbers)),
});

export const parsePerseusGraphType = discriminatedUnionOn("type")
    .withBranch("angle", parsePerseusGraphTypeAngle)
    .withBranch("circle", parsePerseusGraphTypeCircle)
    .withBranch("linear", parsePerseusGraphTypeLinear)
    .withBranch("linear-system", parsePerseusGraphTypeLinearSystem)
    .withBranch("none", parsePerseusGraphTypeNone)
    .withBranch("point", parsePerseusGraphTypePoint)
    .withBranch("polygon", parsePerseusGraphTypePolygon)
    .withBranch("quadratic", parsePerseusGraphTypeQuadratic)
    .withBranch("ray", parsePerseusGraphTypeRay)
    .withBranch("segment", parsePerseusGraphTypeSegment)
    .withBranch("sinusoid", parsePerseusGraphTypeSinusoid).parser;

const parseLockedFigureColor = enumeration(...lockedFigureColorNames);

const parseLockedFigureFillType = enumeration(
    "none",
    "white",
    "translucent",
    "solid",
);

const parseLockedLineStyle = enumeration("solid", "dashed");

const parseStrokeWeight = defaulted(
    enumeration("medium", "thin", "thick"),
    () => "medium" as const,
);

const parseLockedLabelType = object({
    type: constant("label"),
    coord: pairOfNumbers,
    text: string,
    color: parseLockedFigureColor,
    size: enumeration("small", "medium", "large"),
});

const parseLockedPointType = object({
    type: constant("point"),
    coord: pairOfNumbers,
    color: parseLockedFigureColor,
    filled: boolean,
    labels: defaulted(array(parseLockedLabelType), () => []),
    ariaLabel: optional(string),
});

const parseLockedLineType = object({
    type: constant("line"),
    kind: enumeration("line", "ray", "segment"),
    points: pair(parseLockedPointType, parseLockedPointType),
    color: parseLockedFigureColor,
    lineStyle: parseLockedLineStyle,
    showPoint1: defaulted(boolean, () => false),
    showPoint2: defaulted(boolean, () => false),
    weight: parseStrokeWeight,
    labels: defaulted(array(parseLockedLabelType), () => []),
    ariaLabel: optional(string),
});

const parseLockedVectorType = object({
    type: constant("vector"),
    points: pair(pairOfNumbers, pairOfNumbers),
    color: parseLockedFigureColor,
    labels: defaulted(array(parseLockedLabelType), () => []),
    ariaLabel: optional(string),
});

const parseLockedEllipseType = object({
    type: constant("ellipse"),
    center: pairOfNumbers,
    radius: pairOfNumbers,
    angle: number,
    color: parseLockedFigureColor,
    fillStyle: parseLockedFigureFillType,
    strokeStyle: parseLockedLineStyle,
    labels: defaulted(array(parseLockedLabelType), () => []),
    ariaLabel: optional(string),
});

const parseLockedPolygonType = object({
    type: constant("polygon"),
    points: array(pairOfNumbers),
    color: parseLockedFigureColor,
    showVertices: boolean,
    fillStyle: parseLockedFigureFillType,
    strokeStyle: parseLockedLineStyle,
    weight: parseStrokeWeight,
    labels: defaulted(array(parseLockedLabelType), () => []),
    ariaLabel: optional(string),
});

// Exported for testing.
export const parseLockedFunctionDomain = defaulted(
    pair(
        defaulted(number, () => -Infinity),
        defaulted(number, () => Infinity),
    ),
    (): [number, number] => [-Infinity, Infinity],
);

const parseLockedFunctionType = object({
    type: constant("function"),
    color: parseLockedFigureColor,
    strokeStyle: parseLockedLineStyle,
    equation: string,
    directionalAxis: enumeration("x", "y"),
    domain: parseLockedFunctionDomain,
    labels: defaulted(array(parseLockedLabelType), () => []),
    ariaLabel: optional(string),
});

const parseLockedFigure = discriminatedUnionOn("type")
    .withBranch("point", parseLockedPointType)
    .withBranch("line", parseLockedLineType)
    .withBranch("vector", parseLockedVectorType)
    .withBranch("ellipse", parseLockedEllipseType)
    .withBranch("polygon", parseLockedPolygonType)
    .withBranch("function", parseLockedFunctionType)
    .withBranch("label", parseLockedLabelType).parser;

const parseLabelLocation = union(enumeration("onAxis", "alongEdge")).or(
    // If the labelLocation is an empty string, we default to "onAxis".
    pipeParsers(constant("")).then(convert(() => "onAxis" as const)).parser,
).parser;

export const parseInteractiveGraphWidget = parseWidget(
    constant("interactive-graph"),
    object({
        step: pairOfNumbers,
        // TODO(benchristel): rather than making gridStep and snapStep
        // optional, we should duplicate the defaulting logic from the
        // InteractiveGraph component. See parse-perseus-json/README.md for
        // why.
        gridStep: optional(pairOfNumbers),
        snapStep: optional(pairOfNumbers),
        backgroundImage: optional(parsePerseusImageBackground),
        markings: enumeration("graph", "grid", "none", "axes"),
        labels: optional(array(string)),
        labelLocation: optional(parseLabelLocation),
        showProtractor: boolean,
        showRuler: optional(boolean),
        showTooltips: optional(boolean),
        rulerLabel: optional(string),
        rulerTicks: optional(number),
        range: pair(pairOfNumbers, pairOfNumbers),
        // NOTE(benchristel): I copied the default graph from
        // interactive-graph.tsx. See the parse-perseus-json/README.md for
        // an explanation of why we want to duplicate the default here.
        graph: defaulted(
            parsePerseusGraphType,
            (): PerseusGraphTypeLinear => ({
                type: "linear" as const,
            }),
        ),
        correct: parsePerseusGraphType,
        lockedFigures: defaulted(array(parseLockedFigure), () => []),
        fullGraphAriaLabel: optional(string),
        fullGraphAriaDescription: optional(string),
    }),
);
