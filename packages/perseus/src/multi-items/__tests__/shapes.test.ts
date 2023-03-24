import shapes from "../shapes";

describe("shapes.content", () => {
    it('has type "content"', () => {
        const shape = shapes.content;
        expect("content").toEqual(shape.type);
    });
});

describe("shapes.hint", () => {
    it('has type "hint"', () => {
        const shape = shapes.hint;
        expect("hint").toEqual(shape.type);
    });
});

describe("shapes.arrayOf", () => {
    it('has type "array"', () => {
        const shape = shapes.arrayOf(shapes.content);
        expect("array").toEqual(shape.type);
    });

    it("has the given shape as its `elementShape` property", () => {
        const shape = shapes.arrayOf(shapes.content);
        expect(shapes.content).toEqual(shape.elementShape);
    });
});

describe("shapes.shape", () => {
    it('has type "object"', () => {
        const shape = shapes.shape({});
        expect("object").toEqual(shape.type);
    });

    it("has the given shapes as its `shape` property", () => {
        const shape = shapes.shape({
            foo: shapes.content,
            bar: shapes.hint,
        });
        expect(shapes.content).toEqual(shape.shape.foo);
        expect(shapes.hint).toEqual(shape.shape.bar);
    });
});
