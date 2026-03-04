import {parse} from "../parse";
import {failure, success} from "../result";

import {constant} from "./constant";
import {discriminatedUnionOn} from "./discriminated-union";
import {number} from "./number";
import {object} from "./object";

describe("a discriminatedUnion with no variants", () => {
    const parseUnion = discriminatedUnionOn("shape").parser;

    it("fails appropriately given a non-object", () => {
        expect(parse(true, parseUnion)).toEqual(
            failure("At (root) -- expected object, but got true"),
        );
    });

    it("fails appropriately given an object without the discriminant key", () => {
        expect(parse({}, parseUnion)).toEqual(
            failure(
                "At (root).shape -- expected a valid value, but got undefined",
            ),
        );
    });

    it("fails appropriately given an object with the discriminant key", () => {
        expect(parse({shape: "squarle"}, parseUnion)).toEqual(
            failure(
                `At (root).shape -- expected a valid value, but got "squarle"`,
            ),
        );
    });
});

describe("a discriminatedUnion with one variant", () => {
    const parseCircle = object({shape: constant("circle"), radius: number});
    const parseUnion = discriminatedUnionOn("shape").withBranch(
        "circle",
        parseCircle,
    ).parser;

    it("fails appropriately given a non-object", () => {
        expect(parse(true, parseUnion)).toEqual(
            failure("At (root) -- expected object, but got true"),
        );
    });

    it("fails appropriately given an object without the discriminant key", () => {
        expect(parse({}, parseUnion)).toEqual(
            failure(
                "At (root).shape -- expected a valid value, but got undefined",
            ),
        );
    });

    it("fails appropriately given an object with an invalid discriminant", () => {
        expect(parse({shape: "squarle"}, parseUnion)).toEqual(
            failure(
                `At (root).shape -- expected a valid value, but got "squarle"`,
            ),
        );
    });

    it("succeeds given a valid object", () => {
        const input = {shape: "circle", radius: 3};
        expect(parse(input, parseUnion)).toEqual(success(input));
    });
});

describe("a discriminatedUnion with two variants", () => {
    const parseCircle = object({shape: constant("circle"), radius: number});
    const parseRectangle = object({
        shape: constant("rectangle"),
        width: number,
        height: number,
    });
    const parseUnion = discriminatedUnionOn("shape")
        .withBranch("circle", parseCircle)
        .withBranch("rectangle", parseRectangle).parser;

    it("fails appropriately given a non-object", () => {
        expect(parse(true, parseUnion)).toEqual(
            failure("At (root) -- expected object, but got true"),
        );
    });

    it("fails appropriately given an object without the discriminant key", () => {
        expect(parse({}, parseUnion)).toEqual(
            failure(
                "At (root).shape -- expected a valid value, but got undefined",
            ),
        );
    });

    it("fails appropriately given an object with an invalid discriminant", () => {
        expect(parse({shape: "squarle"}, parseUnion)).toEqual(
            failure(
                `At (root).shape -- expected a valid value, but got "squarle"`,
            ),
        );
    });

    it("successfully parses the first branch", () => {
        const input = {shape: "circle", radius: 3};
        expect(parse(input, parseUnion)).toEqual(success(input));
    });

    it("successfully parses the second branch", () => {
        const input = {shape: "rectangle", width: 2, height: 4};
        expect(parse(input, parseUnion)).toEqual(success(input));
    });

    it("doesn't try other branches after finding one that matches the discriminant key", () => {
        const input = {shape: "circle", width: 2, height: 4};
        expect(parse(input, parseUnion)).toEqual(
            failure(`At (root).radius -- expected number, but got undefined`),
        );
    });
});
