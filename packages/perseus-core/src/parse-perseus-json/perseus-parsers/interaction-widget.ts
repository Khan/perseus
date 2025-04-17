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

const pairOfNumbers = pair(number, number);
const stringOrEmpty = defaulted(string, () => "");

const parseKey = pipeParsers(optional(string)).then(convert(String)).parser;

const parseFunctionElement = object({
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

const parseLabelElement = object({
    type: constant("label"),
    key: parseKey,
    options: object({
        label: string,
        color: string,
        coordX: string,
        coordY: string,
    }),
});

const parseLineElement = object({
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

const parseMovableLineElement = object({
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

const parseMovablePointElement = object({
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

const parseParametricElement = object({
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

const parsePointElement = object({
    type: constant("point"),
    key: parseKey,
    options: object({
        color: string,
        coordX: string,
        coordY: string,
    }),
});

const parseRectangleElement = object({
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

export const parseInteractionWidget = parseWidget(
    constant("interaction"),
    object({
        static: defaulted(boolean, () => false),
        graph: object({
            editableSettings: optional(array(enumeration("canvas", "graph"))),
            box: pairOfNumbers,
            labels: array(string),
            range: pair(pairOfNumbers, pairOfNumbers),
            gridStep: pairOfNumbers,
            markings: enumeration("graph", "grid", "none", "axes"),
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
