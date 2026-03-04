import {
    constant,
    nullable,
    number,
    strictObject,
    pair,
} from "../general-purpose-parsers";
import {discriminatedUnionOn} from "../general-purpose-parsers/discriminated-union";

const coord = pair(number, number);
const coordPair = pair(coord, coord);

const parseAbsoluteValueBranch = strictObject({
    type: constant("absolute_value"),
    coords: nullable(coordPair),
});

const parseExponentialBranch = strictObject({
    type: constant("exponential"),
    asymptote: coordPair,
    coords: nullable(coordPair),
});

const parseLinearBranch = strictObject({
    type: constant("linear"),
    coords: nullable(coordPair),
});

const parseLogarithmBranch = strictObject({
    type: constant("logarithm"),
    asymptote: coordPair,
    coords: nullable(coordPair),
});

const parseQuadraticBranch = strictObject({
    type: constant("quadratic"),
    coords: nullable(coordPair),
});

const parseSinusoidBranch = strictObject({
    type: constant("sinusoid"),
    coords: nullable(coordPair),
});

const parseTangentBranch = strictObject({
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
