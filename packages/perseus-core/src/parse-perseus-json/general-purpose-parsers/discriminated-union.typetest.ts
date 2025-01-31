import {constant} from "./constant";
import {discriminatedUnionOn} from "./discriminated-union";
import {number} from "./number";
import {object} from "./object";

import type {Parser} from "../parser-types";

type Figure =
    | {shape: "circle"; radius: number}
    | {shape: "rectangle"; width: number; height: number}
    | {shape: "square"; sideLength: number};

const parseCircle = object({
    shape: constant("circle"),
    radius: number,
});

const parseRectangle = object({
    shape: constant("rectangle"),
    width: number,
    height: number,
});

const parseSquare = object({
    shape: constant("square"),
    sideLength: number,
});

// Test: parsed result is assignable to the union type
{
    const parser = discriminatedUnionOn("shape")
        .withBranch("circle", parseCircle)
        .withBranch("rectangle", parseRectangle)
        .withBranch("square", parseSquare).parser;

    parser satisfies Parser<Figure>;

    // Guard against implicit 'any' type
    // @ts-expect-error - Type '{ shape: "circle"; radius: number; }' is not assignable to type 'string'.
    parser satisfies Parser<string>;
}

// Test: parse result with extra branches is not assignable to the union type
{
    const parser = discriminatedUnionOn("shape")
        .withBranch("circle", parseCircle)
        .withBranch("rectangle", parseRectangle)
        .withBranch("square", parseSquare)
        .withBranch("extra", object({shape: constant("extra")})).parser;

    // @ts-expect-error - Type '{shape: "extra"}' is not assignable to type 'Figure'
    parser satisfies Parser<Figure>;
}

// Test: each variant must contain the discriminant key
{
    // @ts-expect-error - property 'shape' is missing in type '{}'
    discriminatedUnionOn("shape").withBranch("circle", object({}));
}

// Test: each variant must be an object
{
    // @ts-expect-error - Type 'number' is not assignable to type '{ shape: Primitive; }'.
    discriminatedUnionOn("shape").withBranch("circle", number);
}
