import {constant} from "../general-purpose-parsers/constant";
import {Parser} from "../parser-types";
import {
    InteractiveGraphWidget,
    PerseusGraphType, PerseusGraphTypeAngle,
    PerseusGraphTypeCircle,
    PerseusGraphTypeLinear,
    PerseusGraphTypeLinearSystem,
    PerseusGraphTypeNone,
    PerseusGraphTypePoint,
    PerseusGraphTypePolygon,
    PerseusGraphTypeQuadratic,
    PerseusGraphTypeRay,
    PerseusGraphTypeSegment,
    PerseusGraphTypeSinusoid
} from "../../../perseus-types";
import {parseWidget} from "./widget";
import {object} from "../general-purpose-parsers/object";
import {pair} from "../general-purpose-parsers/pair";
import {number} from "../general-purpose-parsers/number";
import {optional} from "../general-purpose-parsers/optional";
import {parsePerseusImageBackground} from "./perseus-image-background";
import {enumeration} from "../general-purpose-parsers/enumeration";
import {array} from "../general-purpose-parsers/array";
import {string} from "../general-purpose-parsers/string";
import {boolean} from "../general-purpose-parsers/boolean";
import {any} from "../general-purpose-parsers/any";
import {unionBuilder} from "../general-purpose-parsers/union";
import {trio} from "../general-purpose-parsers/trio";
import {nullable} from "../general-purpose-parsers/nullable";

// Used to represent 2-D points and ranges
const pairOfNumbers = pair(number, number)

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
    startCoords: optional(object({
        center: pairOfNumbers,
        radius: number,
    })),
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

const parsePerseusGraphTypeLinearSystem: Parser<PerseusGraphTypeLinearSystem> = object({
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
    numPoints: optional(unionBuilder().add(number).add(constant("unlimited")).parser),
    coords: optional(nullable(array(pairOfNumbers))),
    startCoords: optional(array(pairOfNumbers)),
    // TODO: remove coord? it's legacy.
    coord: optional(pairOfNumbers),
});

const parsePerseusGraphTypePolygon: Parser<PerseusGraphTypePolygon> = any; // TODO
const parsePerseusGraphTypeQuadratic: Parser<PerseusGraphTypeQuadratic> = any; // TODO
const parsePerseusGraphTypeRay: Parser<PerseusGraphTypeRay> = any; // TODO
const parsePerseusGraphTypeSegment: Parser<PerseusGraphTypeSegment> = any; // TODO
const parsePerseusGraphTypeSinusoid: Parser<PerseusGraphTypeSinusoid> = any; // TODO

const parsePerseusGraphType: Parser<PerseusGraphType> = unionBuilder()
    .add(parsePerseusGraphTypeAngle)
    .add(parsePerseusGraphTypeCircle)
    .add(parsePerseusGraphTypeLinear)
    .add(parsePerseusGraphTypeLinearSystem)
    .add(parsePerseusGraphTypeNone)
    .add(parsePerseusGraphTypePoint)
    .add(parsePerseusGraphTypePolygon)
    .add(parsePerseusGraphTypeQuadratic)
    .add(parsePerseusGraphTypeRay)
    .add(parsePerseusGraphTypeSegment)
    .add(parsePerseusGraphTypeSinusoid)
    .parser

export const parseInteractiveGraphWidget: Parser<InteractiveGraphWidget> = parseWidget(
    constant("interactive-graph"),
    object({
        step: pairOfNumbers,
        gridStep: pairOfNumbers,
        snapStep: pairOfNumbers,
        backgroundImage: optional(parsePerseusImageBackground),
        markings: enumeration(["graph", "grid", "none"] as const),
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
        lockedFigures: optional(array(any)), // TODO LockedFigure
        fullGraphLabel: optional(string),
        fullGraphAriaDescription: optional(string),
    })
)
