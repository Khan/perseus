import {
    constant,
    nullable,
    number,
    looseObject,
    pair,
} from "../general-purpose-parsers";
import {discriminatedUnionOn} from "../general-purpose-parsers/discriminated-union";

const coord = pair(number, number);
const coordPair = pair(coord, coord);

const parseAbsoluteValueBranch = looseObject({
    type: constant("absolute_value"),
    coords: nullable(coordPair),
});

const parseExponentialBranch = looseObject({
    type: constant("exponential"),
    asymptote: coordPair,
    coords: nullable(coordPair),
});

const parseLinearBranch = looseObject({
    type: constant("linear"),
    coords: nullable(coordPair),
});

const parseLogarithmBranch = looseObject({
    type: constant("logarithm"),
    asymptote: coordPair,
    coords: nullable(coordPair),
});

const parseQuadraticBranch = looseObject({
    type: constant("quadratic"),
    coords: nullable(coordPair),
});

const parseSinusoidBranch = looseObject({
    type: constant("sinusoid"),
    coords: nullable(coordPair),
});

const parseTangentBranch = looseObject({
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
