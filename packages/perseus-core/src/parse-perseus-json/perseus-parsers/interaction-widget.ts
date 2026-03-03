import {
    array,
    boolean,
    constant,
    enumeration,
    number,
    looseObject,
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

const parseFunctionElement = looseObject({
    type: constant("function"),
    key: parseKey,
    options: looseObject({
        value: string,
        funcName: string,
        rangeMin: string,
        rangeMax: string,
        color: string,
        strokeDasharray: string,
        strokeWidth: number,
    }),
});

const parseLabelElement = looseObject({
    type: constant("label"),
    key: parseKey,
    options: looseObject({
        label: string,
        color: string,
        coordX: string,
        coordY: string,
    }),
});

const parseLineElement = looseObject({
    type: constant("line"),
    key: parseKey,
    options: looseObject({
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

const parseMovableLineElement = looseObject({
    type: constant("movable-line"),
    key: parseKey,
    options: looseObject({
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

const parseMovablePointElement = looseObject({
    type: constant("movable-point"),
    key: parseKey,
    options: looseObject({
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

const parseParametricElement = looseObject({
    type: constant("parametric"),
    key: parseKey,
    options: looseObject({
        x: string,
        y: string,
        rangeMin: string,
        rangeMax: string,
        color: string,
        strokeDasharray: string,
        strokeWidth: number,
    }),
});

const parsePointElement = looseObject({
    type: constant("point"),
    key: parseKey,
    options: looseObject({
        color: string,
        coordX: string,
        coordY: string,
    }),
});

const parseRectangleElement = looseObject({
    type: constant("rectangle"),
    key: parseKey,
    options: looseObject({
        color: string,
        coordX: string,
        coordY: string,
        width: string,
        height: string,
    }),
});

export const parseInteractionWidget = parseWidget(
    constant("interaction"),
    looseObject({
        static: defaulted(boolean, () => false),
        graph: looseObject({
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
