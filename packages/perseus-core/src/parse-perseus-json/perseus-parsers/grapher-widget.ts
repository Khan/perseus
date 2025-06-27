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
    union,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";
import {discriminatedUnionOn} from "../general-purpose-parsers/discriminated-union";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";

const pairOfNumbers = pair(number, number);

const pairOfPoints = pair(pairOfNumbers, pairOfNumbers);

const emptyArray: Parser<[]> = (rawVal, ctx) => {
    if (Array.isArray(rawVal) && rawVal.length === 0) {
        return ctx.success([]);
    }
    return ctx.failure("empty array", rawVal);
};

const parseCoords = union(nullable(pairOfPoints)).or(
    // We convert [] to null to support some legacy content items.
    // The widget component treats [] and null the same as of 2025-05.
    pipeParsers(emptyArray).then(convert(() => null)).parser,
).parser;

const parseCorrect = defaulted(
    discriminatedUnionOn("type")
        .withBranch(
            "absolute_value",
            object({
                type: constant("absolute_value"),
                coords: parseCoords,
            }),
        )
        .withBranch(
            "exponential",
            object({
                type: constant("exponential"),
                asymptote: pairOfPoints,
                coords: parseCoords,
            }),
        )
        .withBranch(
            "linear",
            object({
                type: constant("linear"),
                coords: parseCoords,
            }),
        )
        .withBranch(
            "logarithm",
            object({
                type: constant("logarithm"),
                asymptote: pairOfPoints,
                coords: parseCoords,
            }),
        )
        .withBranch(
            "quadratic",
            object({
                type: constant("quadratic"),
                coords: parseCoords,
            }),
        )
        .withBranch(
            "sinusoid",
            object({
                type: constant("sinusoid"),
                coords: parseCoords,
            }),
        )
        .withBranch(
            "tangent",
            object({
                type: constant("tangent"),
                coords: parseCoords,
            }),
        ).parser,
    // Default value. This is the same as the default in DEFAULT_GRAPHER_PROPS,
    // in grapher/util.tsx. See parse-perseus-json/README.md for an explanation
    // of why we want to duplicate defaults in the parser.
    () => ({
        type: "linear" as const,
        coords: null,
    }),
);

export const parseGrapherWidget = parseWidget(
    constant("grapher"),
    object({
        availableTypes: array(
            enumeration(
                "absolute_value",
                "exponential",
                "linear",
                "logarithm",
                "quadratic",
                "sinusoid",
                "tangent",
            ),
        ),
        correct: parseCorrect,
        graph: object({
            backgroundImage: object({
                bottom: optional(number),
                height: optional(number),
                left: optional(number),
                scale: optional(number),
                url: optional(nullable(string)),
                width: optional(number),
            }),
            box: optional(pairOfNumbers),
            editableSettings: optional(
                array(enumeration("graph", "snap", "image", "measure")),
            ),
            gridStep: optional(pairOfNumbers),
            labels: pair(string, string),
            markings: enumeration("graph", "none", "grid", "axes"),
            range: pair(pairOfNumbers, pairOfNumbers),
            rulerLabel: constant(""),
            rulerTicks: number,
            showProtractor: optional(boolean),
            showRuler: optional(boolean),
            showTooltips: optional(boolean),
            snapStep: optional(pairOfNumbers),
            step: pairOfNumbers,
            valid: optional(union(boolean).or(string).parser),
        }),
    }),
);
