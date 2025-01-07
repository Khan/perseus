import {
    array,
    boolean,
    constant,
    enumeration,
    number,
    object,
    optional,
    pair,
    pipeParsers,
    string,
    union,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";
import {discriminatedUnionOn} from "../general-purpose-parsers/discriminated-union";

import {parsePerseusImageBackground} from "./perseus-image-background";
import {parseWidget} from "./widget";

import type {
    InteractionWidget,
    PerseusInteractionElement,
} from "@khanacademy/perseus-core";
import type {Parser} from "../parser-types";

const pairOfNumbers = pair(number, number);
const stringOrEmpty = defaulted(string, () => "");

const parseKey = pipeParsers(optional(string)).then(convert(String)).parser;

type FunctionElement = Extract<PerseusInteractionElement, {type: "function"}>;
const parseFunctionElement: Parser<FunctionElement> = object({
    type: constant("function"),
    key: parseKey,
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
    key: parseKey,
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
    key: parseKey,
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
    key: parseKey,
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
    key: parseKey,
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
const parseParametricElement: Parser<ParametricElement> = object({
    type: constant("parametric"),
    key: parseKey,
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
    key: parseKey,
    options: object({
        color: string,
        coordX: string,
        coordY: string,
    }),
});

type RectangleElement = Extract<PerseusInteractionElement, {type: "rectangle"}>;
const parseRectangleElement: Parser<RectangleElement> = object({
    type: constant("rectangle"),
    key: parseKey,
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
            discriminatedUnionOn("type")
                .withBranch("function", parseFunctionElement)
                .withBranch("label", parseLabelElement)
                .withBranch("line", parseLineElement)
                .withBranch("movable-line", parseMovableLineElement)
                .withBranch("movable-point", parseMovablePointElement)
                .withBranch("parametric", parseParametricElement)
                .withBranch("point", parsePointElement)
                .withBranch("rectangle", parseRectangleElement).parser,
        ),
    }),
);
