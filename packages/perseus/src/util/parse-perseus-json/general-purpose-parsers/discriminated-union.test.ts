import {parse} from "../parse";
import {failure, success} from "../result";

import {constant} from "./constant";
import {discriminatedUnion} from "./discriminated-union";
import {number} from "./number";
import {object} from "./object";

describe("a discriminatedUnion with one variant", () => {
    const unionParser = discriminatedUnion(
        object({type: constant("ok")}),
        object({type: constant("ok"), value: number}),
    ).parser;

    it("parses a valid value", () => {
        const input = {type: "ok", value: 3};

        expect(parse(input, unionParser)).toEqual(success(input));
    });

    it("rejects a value with the wrong `type`", () => {
        const input = {type: "bad", value: 3};

        expect(parse(input, unionParser)).toEqual(
            failure(`At (root).type -- expected "ok", but got "bad"`),
        );
    });

    it("rejects a value with a valid type but wrong fields", () => {
        const input = {type: "ok", value: "foobar"};

        expect(parse(input, unionParser)).toEqual(
            failure(`At (root).value -- expected number, but got "foobar"`),
        );
    });
});

describe("a discriminatedUnion with two variants", () => {
    const unionParser = discriminatedUnion(
        object({type: constant("rectangle")}),
        object({type: constant("rectangle"), width: number}),
    ).or(
        object({type: constant("circle")}),
        object({type: constant("circle"), radius: number}),
    ).parser;

    it("parses a valid rectangle", () => {
        const input = {type: "rectangle", width: 42};

        expect(parse(input, unionParser)).toEqual(success(input));
    });

    it("rejects a rectangle with no width", () => {
        const input = {type: "rectangle", radius: 99};

        expect(parse(input, unionParser)).toEqual(
            failure(`At (root).width -- expected number, but got undefined`),
        );
    });

    it("parses a valid circle", () => {
        const input = {type: "circle", radius: 7};

        expect(parse(input, unionParser)).toEqual(success(input));
    });

    it("rejects a circle with no radius", () => {
        const input = {type: "circle", width: 99};

        expect(parse(input, unionParser)).toEqual(
            failure(`At (root).radius -- expected number, but got undefined`),
        );
    });

    it("rejects a value with an unrecognized `type`", () => {
        const input = {type: "triangle", width: -1, radius: 99};

        expect(parse(input, unionParser)).toEqual(
            failure(
                `At (root).type -- expected "rectangle", but got "triangle"`,
            ),
        );
    });
});
