// @flow
const assert = require("assert");
declare function describe(s: string, f: () => any): any;
declare function it(s: string, f: () => any): any;

const shapes = require("../shapes.js");

describe("shapes.content", () => {
    it('has type "content"', () => {
        const shape = shapes.content;
        assert.equal("content", shape.type);
    });
});

describe("shapes.hint", () => {
    it('has type "hint"', () => {
        const shape = shapes.hint;
        assert.equal("hint", shape.type);
    });
});

describe("shapes.arrayOf", () => {
    it('has type "array"', () => {
        const shape = shapes.arrayOf(shapes.content);
        assert.equal("array", shape.type);
    });

    it('has the given shape as its `elementShape` property', () => {
        const shape = shapes.arrayOf(shapes.content);
        assert.equal(shapes.content, shape.elementShape);
    });
});

describe("shapes.shape", () => {
    it('has type "object"', () => {
        const shape = shapes.shape({});
        assert.equal("object", shape.type);
    });

    it('has the given shapes as its `shape` property', () => {
        const shape = shapes.shape({
            foo: shapes.content,
            bar: shapes.hint,
        });
        assert.equal(shapes.content, shape.shape.foo);
        assert.equal(shapes.hint, shape.shape.bar);
    });
});
