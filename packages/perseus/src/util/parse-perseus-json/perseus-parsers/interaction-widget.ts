import {
    array,
    boolean,
    constant,
    enumeration,
    number,
    object,
    optional,
    pair,
    string,
    union,
} from "../general-purpose-parsers";

import {parsePerseusImageBackground} from "./perseus-image-background";
import {parseWidget} from "./widget";

import type {
    InteractionWidget,
    PerseusInteractionElement,
} from "../../../perseus-types";
import type {Parser} from "../parser-types";
import {
    discriminatedUnion
} from "../general-purpose-parsers/discriminated-union";
import {defaulted} from "../general-purpose-parsers/defaulted";

const pairOfNumbers = pair(number, number);
const stringOrEmpty = defaulted(string, () => "");

type FunctionElement = Extract<PerseusInteractionElement, {type: "function"}>;
const parseFunctionType = constant("function");
const parseFunctionElement: Parser<FunctionElement> = object({
    type: parseFunctionType,
    key: string,
    options: object({
        value: string,
        funcName: string,
        rangeMin: string,
        rangeMax: string,
        color: string,
        strokeDasharray: string,
        strokeWidth: number,
    }),
});

type LabelElement = Extract<PerseusInteractionElement, {type: "label"}>;
const parseLabelType = constant("label");
const parseLabelElement: Parser<LabelElement> = object({
    type: parseLabelType,
    key: string,
    options: object({
        label: string,
        color: string,
        coordX: string,
        coordY: string,
    }),
});

type LineElement = Extract<PerseusInteractionElement, {type: "line"}>;
const parseLineType = constant("line");
const parseLineElement: Parser<LineElement> = object({
    type: parseLineType,
    key: string,
    options: object({
        color: string,
        startX: string,
        startY: string,
        endX: string,
        endY: string,
        strokeDasharray: string,
        strokeWidth: number,
        arrows: string,
    }),
});

type MovableLineElement = Extract<
    PerseusInteractionElement,
    {type: "movable-line"}
>;
const parseMovableLineType = constant("movable-line");
const parseMovableLineElement: Parser<MovableLineElement> = object({
    type: parseMovableLineType,
    key: string,
    options: object({
        startX: string,
        startY: string,
        startSubscript: number,
        endX: string,
        endY: string,
        endSubscript: number,
        constraint: string,
        snap: number,
        constraintFn: string,
        constraintXMin: string,
        constraintXMax: string,
        constraintYMin: string,
        constraintYMax: string,
    }),
});

type MovablePointElement = Extract<
    PerseusInteractionElement,
    {type: "movable-point"}
>;
const parseMovablePointType = constant("movable-point");
const parseMovablePointElement: Parser<MovablePointElement> = object({
    type: parseMovablePointType,
    key: string,
    options: object({
        startX: string,
        startY: string,
        varSubscript: number,
        constraint: string,
        snap: number,
        constraintFn: string,
        constraintXMin: stringOrEmpty,
        constraintXMax: stringOrEmpty,
        constraintYMin: stringOrEmpty,
        constraintYMax: stringOrEmpty,
    }),
});

type ParametricElement = Extract<
    PerseusInteractionElement,
    {type: "parametric"}
>;
const parseParametricType = constant("parametric");
const parseParametricElement: Parser<ParametricElement> = object({
    type: parseParametricType,
    key: string,
    options: object({
        x: string,
        y: string,
        rangeMin: string,
        rangeMax: string,
        color: string,
        strokeDasharray: string,
        strokeWidth: number,
    }),
});

type PointElement = Extract<PerseusInteractionElement, {type: "point"}>;
const parsePointType = constant("point");
const parsePointElement: Parser<PointElement> = object({
    type: parsePointType,
    key: string,
    options: object({
        color: string,
        coordX: string,
        coordY: string,
    }),
});

type RectangleElement = Extract<PerseusInteractionElement, {type: "rectangle"}>;
const parseRectangleType = constant("rectangle");
const parseRectangleElement: Parser<RectangleElement> = object({
    type: parseRectangleType,
    key: string,
    options: object({
        color: string,
        coordX: string,
        coordY: string,
        width: string,
        height: string,
    }),
});

export const parseInteractionWidget: Parser<InteractionWidget> = parseWidget(
    constant("interaction"),
    object({
        static: defaulted(boolean, () => false),
        graph: object({
            editableSettings: optional(array(enumeration("canvas", "graph"))),
            box: pairOfNumbers,
            labels: array(string),
            range: pair(pairOfNumbers, pairOfNumbers),
            gridStep: pairOfNumbers,
            markings: enumeration("graph", "grid", "none"),
            snapStep: optional(pairOfNumbers),
            valid: optional(union(boolean).or(string).parser),
            backgroundImage: optional(parsePerseusImageBackground),
            showProtractor: optional(boolean),
            showRuler: optional(boolean),
            rulerLabel: optional(string),
            rulerTicks: optional(number),
            tickStep: pairOfNumbers,
        }),
        elements: array(
            discriminatedUnion(object({type: parseFunctionType}), parseFunctionElement)
                .or(object({type: parseLabelType}), parseLabelElement)
                .or(object({type: parseLineType}), parseLineElement)
                .or(object({type: parseMovableLineType}), parseMovableLineElement)
                .or(object({type: parseMovablePointType}), parseMovablePointElement)
                .or(object({type: parseParametricType}), parseParametricElement)
                .or(object({type: parsePointType}), parsePointElement)
                .or(object({type: parseRectangleType}), parseRectangleElement).parser,
        ),
    }),
);
