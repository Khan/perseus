import {
    array,
    boolean,
    constant,
    enumeration,
    number,
    strictObject,
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

const parseFunctionElement = strictObject({
    type: constant("function"),
    key: parseKey,
    options: strictObject({
        value: string,
        funcName: string,
        rangeMin: string,
        rangeMax: string,
        color: string,
        strokeDasharray: string,
        strokeWidth: number,
    }),
});

const parseLabelElement = strictObject({
    type: constant("label"),
    key: parseKey,
    options: strictObject({
        label: string,
        color: string,
        coordX: string,
        coordY: string,
    }),
});

const parseLineElement = strictObject({
    type: constant("line"),
    key: parseKey,
    options: strictObject({
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

const parseMovableLineElement = strictObject({
    type: constant("movable-line"),
    key: parseKey,
    options: strictObject({
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

const parseMovablePointElement = strictObject({
    type: constant("movable-point"),
    key: parseKey,
    options: strictObject({
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

const parseParametricElement = strictObject({
    type: constant("parametric"),
    key: parseKey,
    options: strictObject({
        x: string,
        y: string,
        rangeMin: string,
        rangeMax: string,
        color: string,
        strokeDasharray: string,
        strokeWidth: number,
    }),
});

const parsePointElement = strictObject({
    type: constant("point"),
    key: parseKey,
    options: strictObject({
        color: string,
        coordX: string,
        coordY: string,
    }),
});

const parseRectangleElement = strictObject({
    type: constant("rectangle"),
    key: parseKey,
    options: strictObject({
        color: string,
        coordX: string,
        coordY: string,
        width: string,
        height: string,
    }),
});

export const parseInteractionWidget = parseWidget(
    constant("interaction"),
    strictObject({
        static: defaulted(boolean, () => false),
        graph: strictObject({
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
