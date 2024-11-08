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

const pairOfNumbers = pair(number, number);

type FunctionElement = Extract<PerseusInteractionElement, {type: "function"}>;
const parseFunctionElement: Parser<FunctionElement> = object({
    type: constant("function"),
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
const parseLabelElement: Parser<LabelElement> = object({
    type: constant("label"),
    key: string,
    options: object({
        label: string,
        color: string,
        coordX: string,
        coordY: string,
    }),
});

type LineElement = Extract<PerseusInteractionElement, {type: "line"}>;
const parseLineElement: Parser<LineElement> = object({
    type: constant("line"),
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
const parseMovableLineElement: Parser<MovableLineElement> = object({
    type: constant("movable-line"),
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
const parseMovablePointElement: Parser<MovablePointElement> = object({
    type: constant("movable-point"),
    key: string,
    options: object({
        startX: string,
        startY: string,
        varSubscript: number,
        constraint: string,
        snap: number,
        constraintFn: string,
        constraintXMin: string,
        constraintXMax: string,
        constraintYMin: string,
        constraintYMax: string,
    }),
});

type ParametricElement = Extract<
    PerseusInteractionElement,
    {type: "parametric"}
>;
const parseParametricElement: Parser<ParametricElement> = object({
    type: constant("parametric"),
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
const parsePointElement: Parser<PointElement> = object({
    type: constant("point"),
    key: string,
    options: object({
        color: string,
        coordX: string,
        coordY: string,
    }),
});

type RectangleElement = Extract<PerseusInteractionElement, {type: "rectangle"}>;
const parseRectangleElement: Parser<RectangleElement> = object({
    type: constant("rectangle"),
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
        static: boolean,
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
            union(parseFunctionElement)
                .or(parseLabelElement)
                .or(parseLineElement)
                .or(parseMovableLineElement)
                .or(parseMovablePointElement)
                .or(parseParametricElement)
                .or(parsePointElement)
                .or(parseRectangleElement).parser,
        ),
    }),
);
