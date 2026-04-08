import {describe, it, expect} from "tstyche";

import {constant} from "./constant";
import {discriminatedUnionOn} from "./discriminated-union";
import {number} from "./number";
import {object} from "./object";
import {ctx} from "./test-helpers";

import type {Parser, ParseResult} from "../parser-types";

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

describe("the discriminatedUnionOn parser combinator", () => {
    it("parses a union with the given discriminant and branches", () => {
        const figureParser = discriminatedUnionOn("shape")
            .withBranch("circle", parseCircle)
            .withBranch("rectangle", parseRectangle)
            .withBranch("square", parseSquare).parser;

        const parsed = figureParser({}, ctx());

        expect(parsed).type.toBe<ParseResult<Figure>>();
    });

    it("raises a type error if a variant does not contain the discriminant key", () => {
        // @ts-expect-error Argument of type 'Parser<OptionalizeProperties<{}>>' is not assignable to parameter of type 'Parser<{ shape: Primitive; }>'
        discriminatedUnionOn("shape").withBranch("circle", object({}));
    });
});
