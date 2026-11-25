import {
    array,
    boolean,
    constant,
    defaulted,
    enumeration,
    number,
    object,
    optional,
    pair,
    string,
} from "../general-purpose-parsers";
import {discriminatedUnionOn} from "../general-purpose-parsers/discriminated-union";

import {
    parseLockedFigureColor,
    parseLockedFigureFillType,
    parseLockedFigureStrokeStyle,
    parseLockedLabelType,
    parseStrokeWeight,
} from "./interactive-graph-widget";
import {parseWidget} from "./widget";

const pairOfNumbers = pair(number, number);

const parsePolarGraphTypePoint = object({
    type: constant("point"),
    numPoints: optional(number),
    coords: optional(array(pairOfNumbers)),
    startCoords: optional(array(pairOfNumbers)),
    pointLabels: optional(array(string)),
    showPointLabels: optional(boolean),
});

const parsePolarGraphTypeRay = object({
    type: constant("ray"),
    coords: optional(array(pairOfNumbers)),
    startCoords: optional(array(pairOfNumbers)),
});

const parsePolarGraphTypeAngle = object({
    type: constant("angle"),
    coords: optional(pair(pairOfNumbers, pairOfNumbers)),
    startCoords: optional(pair(pairOfNumbers, pairOfNumbers)),
    showAngles: optional(boolean),
    match: optional(constant("congruent")),
});

const parsePolarGraphTypeLemniscate = object({
    type: constant("lemniscate"),
    coords: optional(array(pairOfNumbers)),
    startCoords: optional(array(pairOfNumbers)),
});

const parsePolarGraphTypeCircle = object({
    type: constant("circle"),
    coords: optional(array(pairOfNumbers)),
    startCoords: optional(array(pairOfNumbers)),
});

const parsePolarGraphTypeLimacon = object({
    type: constant("limacon"),
    coords: optional(pair(pairOfNumbers, pairOfNumbers)),
    startCoords: optional(pair(pairOfNumbers, pairOfNumbers)),
});

const parsePolarGraphTypeRose = object({
    type: constant("rose"),
    coords: optional(array(pairOfNumbers)),
    startCoords: optional(array(pairOfNumbers)),
    k: optional(number),
    fixedK: optional(boolean),
});

export const parsePerseusPolarGraphType = discriminatedUnionOn("type")
    .withBranch("point", parsePolarGraphTypePoint)
    .withBranch("ray", parsePolarGraphTypeRay)
    .withBranch("angle", parsePolarGraphTypeAngle)
    .withBranch("lemniscate", parsePolarGraphTypeLemniscate)
    .withBranch("circle", parsePolarGraphTypeCircle)
    .withBranch("limacon", parsePolarGraphTypeLimacon)
    .withBranch("rose", parsePolarGraphTypeRose).parser;

// The style fields default the way interactive graph's locked figures do.
const parsePolarLockedFigure = object({
    figure: parsePerseusPolarGraphType,
    color: parseLockedFigureColor,
    strokeStyle: defaulted(
        parseLockedFigureStrokeStyle,
        () => "solid" as const,
    ),
    weight: parseStrokeWeight,
    filled: defaulted(boolean, () => true),
    fillStyle: defaulted(parseLockedFigureFillType, () => "none" as const),
    labels: defaulted(array(parseLockedLabelType), () => []),
    ariaLabel: optional(string),
});

export const parsePolarGraphWidget = parseWidget(
    constant("polar-graph"),
    object({
        maxRadius: number,
        radiusStep: number,
        angleStepDegrees: number,
        angleUnit: enumeration("degrees", "radians"),
        graph: parsePerseusPolarGraphType,
        // Missing in answerless data, which strips the answer.
        correct: optional(parsePerseusPolarGraphType),
        lockedFigures: defaulted(array(parsePolarLockedFigure), () => []),
        lockedLabels: defaulted(array(parseLockedLabelType), () => []),
        fullGraphAriaLabel: optional(string),
        fullGraphAriaDescription: optional(string),
    }),
);
