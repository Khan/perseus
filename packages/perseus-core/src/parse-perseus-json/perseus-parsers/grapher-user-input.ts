import {
    enumeration,
    nullable,
    number,
    object,
    pair,
    union,
} from "../general-purpose-parsers";

const coord = pair(number, number);
const coordPair = pair(coord, coord);

export const parseGrapherUserInput = union(
    object({
        type: enumeration("absolute_value"),
        coords: nullable(coordPair),
    }),
)
    .or(
        object({
            type: enumeration("exponential"),
            asymptote: coordPair,
            coords: nullable(coordPair),
        }),
    )
    .or(
        object({
            type: enumeration("linear"),
            coords: nullable(coordPair),
        }),
    )
    .or(
        object({
            type: enumeration("logarithm"),
            asymptote: coordPair,
            coords: nullable(coordPair),
        }),
    )
    .or(
        object({
            type: enumeration("quadratic"),
            coords: nullable(coordPair),
        }),
    )
    .or(
        object({
            type: enumeration("sinusoid"),
            coords: nullable(coordPair),
        }),
    )
    .or(
        object({
            type: enumeration("tangent"),
            coords: nullable(coordPair),
        }),
    ).parser;
