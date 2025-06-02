import {
    constant,
    nullable,
    number,
    object,
    pair,
} from "../general-purpose-parsers";
import {discriminatedUnionOn} from "../general-purpose-parsers/discriminated-union";

const coord = pair(number, number);
const coordPair = pair(coord, coord);

const parseAbsoluteValueBranch = object({
    type: constant("absolute_value"),
    coords: nullable(coordPair),
});

const parseExponentialBranch = object({
    type: constant("exponential"),
    asymptote: coordPair,
    coords: nullable(coordPair),
});

const parseLinearBranch = object({
    type: constant("linear"),
    coords: nullable(coordPair),
});

const parseLogarithmBranch = object({
    type: constant("logarithm"),
    asymptote: coordPair,
    coords: nullable(coordPair),
});

const parseQuadraticBranch = object({
    type: constant("quadratic"),
    coords: nullable(coordPair),
});

const parseSinusoidBranch = object({
    type: constant("sinusoid"),
    coords: nullable(coordPair),
});

const parseTangentBranch = object({
    type: constant("tangent"),
    coords: nullable(coordPair),
});

export const parseGrapherUserInput = discriminatedUnionOn("type")
    .withBranch("absolute_value", parseAbsoluteValueBranch)
    .withBranch("exponential", parseExponentialBranch)
    .withBranch("linear", parseLinearBranch)
    .withBranch("logarithm", parseLogarithmBranch)
    .withBranch("quadratic", parseQuadraticBranch)
    .withBranch("sinusoid", parseSinusoidBranch)
    .withBranch("tangent", parseTangentBranch).parser;
