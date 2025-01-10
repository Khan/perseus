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
    string,
    union,
} from "../general-purpose-parsers";
import {defaulted} from "../general-purpose-parsers/defaulted";
import {discriminatedUnionOn} from "../general-purpose-parsers/discriminated-union";

import {parseWidget} from "./widget";

import type {Parser} from "../parser-types";
import type {GrapherWidget} from "@khanacademy/perseus-core";

const pairOfNumbers = pair(number, number);

const pairOfPoints = pair(pairOfNumbers, pairOfNumbers);

export const parseGrapherWidget: Parser<GrapherWidget> = parseWidget(
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
        correct: discriminatedUnionOn("type")
            .withBranch(
                "absolute_value",
                object({
                    type: constant("absolute_value"),
                    coords: pairOfPoints,
                }),
            )
            .withBranch(
                "exponential",
                object({
                    type: constant("exponential"),
                    asymptote: pairOfPoints,
                    coords: pairOfPoints,
                }),
            )
            .withBranch(
                "linear",
                object({
                    type: constant("linear"),
                    coords: defaulted(
                        pairOfPoints,
                        () =>
                            [
                                [-5, 5],
                                [5, 5],
                            ] as [[number, number], [number, number]],
                    ),
                }),
            )
            .withBranch(
                "logarithm",
                object({
                    type: constant("logarithm"),
                    asymptote: pairOfPoints,
                    coords: pairOfPoints,
                }),
            )
            .withBranch(
                "quadratic",
                object({
                    type: constant("quadratic"),
                    coords: pairOfPoints,
                }),
            )
            .withBranch(
                "sinusoid",
                object({
                    type: constant("sinusoid"),
                    coords: pairOfPoints,
                }),
            )
            .withBranch(
                "tangent",
                object({
                    type: constant("tangent"),
                    coords: pairOfPoints,
                }),
            ).parser,
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
            markings: enumeration("graph", "none", "grid"),
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
