const assert = require("assert");

const {traverseShape, shapes} = require("../multirenderer.jsx");

describe("traverseShape", () => {
    const shape = shapes.shape({
        a: shapes.item,
        b: shapes.arrayOf(shapes.item),
        c: shapes.shape({
            d: shapes.item,
            e: shapes.item,
        }),
    });

    const data = {
        a: 1,
        b: [2, 3, 4],
        c: {
            d: 5,
            e: 6,
        },
    };

    it("correctly calls callback for each of the leaf nodes", () => {
        const calledWith = [];
        traverseShape(shape, data, e => calledWith.push(e));
        calledWith.sort();

        assert.deepEqual([1, 2, 3, 4, 5, 6], calledWith);
    });

    it("returns a data result with the correct shape", () => {
        const result = traverseShape(shape, data, e => e + 1);

        assert.deepEqual({
            a: 2,
            b: [3, 4, 5],
            c: {
                d: 6,
                e: 7,
            },
        }, result);
    });

    it("handles recursive objects", () => {
        const shape = shapes.shape({
            a: shapes.shape({
                b: shapes.shape({
                    c: shapes.item,
                }),
            }),
        });

        const data = {a: {b: {c: 1}}};

        const result = traverseShape(shape, data, e => e + 1);

        assert.deepEqual({a: {b: {c: 2}}}, result);
    });

    it("handles recursive arrays", () => {
        const shape = shapes.arrayOf(
            shapes.arrayOf(shapes.arrayOf(shapes.item)));

        const data = [[[0], [1]], [[2], [3, 4]]];

        const result = traverseShape(shape, data, e => e + 1);

        assert.deepEqual([[[1], [2]], [[3], [4, 5]]], result);
    });

    it("handles empty arrays", () => {
        const shape = shapes.arrayOf(shapes.arrayOf(shapes.item));

        assert.deepEqual([], traverseShape(shape, [], () => {}));

        const result = traverseShape(shape, [[], [1], []], e => e + 1);
        assert.deepEqual([[], [2], []], result);
    });
});
