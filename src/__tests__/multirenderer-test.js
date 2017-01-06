const assert = require("assert");

const {emptyValueForShape, traverseShape, shapes, shapeToPropType} =
    require("../multirenderer.jsx");

function item(n) {
    return {
        content: `item ${n}`,
        images: {},
        widgets: {},
    };
}

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
        a: item(1),
        b: [item(2), item(3), item(4)],
        c: {
            d: item(5),
            e: item(6),
        },
    };

    it("correctly calls callback for each of the leaf nodes", () => {
        const calledWith = [];
        traverseShape(shape, data, e => calledWith.push(e));
        calledWith.sort();

        assert.deepEqual(
            [item(1), item(2), item(3), item(4), item(5), item(6)],
            calledWith);
    });

    it("returns a data result with the correct shape", () => {
        const result = traverseShape(shape, data, e => e.content);

        assert.deepEqual({
            a: "item 1",
            b: ["item 2", "item 3", "item 4"],
            c: {
                d: "item 5",
                e: "item 6",
            },
        }, result);
    });

    it("calls the callback with the correct shape", () => {
        // Return the type of the shape of the item in place of each item.
        const result = traverseShape(shape, data, (_, shape) => shape.type);

        assert.deepEqual({
            a: "item",
            b: ["item", "item", "item"],
            c: {
                d: "item",
                e: "item",
            },
        }, result);
    });

    it("calls the callback with the correct paths to the items", () => {
        // Return the path of the item in place of each item.
        const result = traverseShape(shape, data, (_, __, path) => path);

        assert.deepEqual({
            a: ["a"],
            b: [["b", 0], ["b", 1], ["b", 2]],
            c: {
                d: ["c", "d"],
                e: ["c", "e"],
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

        const data = {a: {b: {c: item(1)}}};

        const result = traverseShape(shape, data, e => e.content);

        assert.deepEqual({a: {b: {c: "item 1"}}}, result);
    });

    it("handles recursive arrays", () => {
        const shape = shapes.arrayOf(
            shapes.arrayOf(shapes.arrayOf(shapes.item)));

        const data = [[[item(0)], [item(1)]], [[item(2)], [item(3), item(4)]]];

        const result = traverseShape(shape, data, e => e.content);

        assert.deepEqual(
            [[["item 0"], ["item 1"]], [["item 2"], ["item 3", "item 4"]]],
            result);
    });

    it("handles empty arrays", () => {
        const shape = shapes.arrayOf(shapes.arrayOf(shapes.item));

        assert.deepEqual([], traverseShape(shape, [], () => {}));

        const result =
            traverseShape(shape, [[], [item(1)], []], e => e.content);
        assert.deepEqual([[], ["item 1"], []], result);
    });

    it("calls the collection callback for arrays", () => {
        const shape = shapes.arrayOf(shapes.item);
        const data = [item(1), item(2), item(3)];

        traverseShape(shape, data, e => e.content,
            (result, data2, shape2, path) => {
                assert.deepEqual(["item 1", "item 2", "item 3"], result);
                assert.equal(data, data2);
                assert.deepEqual(shape, shape2);
                assert.deepEqual([], path);
            });
    });

    it("calls the collection callback for objects", () => {
        const shape = shapes.shape({
            a: shapes.item,
            b: shapes.item,
        });
        const data = {
            a: item(1),
            b: item(2),
        };

        traverseShape(shape, data, e => e.content,
            (result, data2, shape2, path) => {
                assert.deepEqual({
                    a: "item 1",
                    b: "item 2",
                }, result);
                assert.equal(data, data2);
                assert.deepEqual(shape, shape2);
                assert.deepEqual([], path);
            });
    });

    it("builds the structure from the collection callback return value", () => {
        const shape = shapes.shape({
            a: shapes.item,
            b: shapes.arrayOf(shapes.item),
            c: shapes.shape({
                d: shapes.item,
                e: shapes.item,
            }),
        });

        const data = {
            a: item(1),
            b: [item(2), item(3), item(4)],
            c: {
                d: item(5),
                e: item(6),
            },
        };

        function collectionCallback(result, dat, shp, path) {
            if (path.length === 0) {
                result.top = true;
                return result;
            }

            if (shp.type === "object") {
                return Object.keys(result).concat(
                    Object.keys(result).map(k => result[k]));
            } else if (shp.type === "array") {
                return result.map(c => c + " in array");
            }
        }

        const result = traverseShape(shape, data, e => e.content,
                                     collectionCallback);

        assert.deepEqual({
            top: true,
            a: "item 1",
            b: ["item 2 in array", "item 3 in array", "item 4 in array"],
            c: ["d", "e", "item 5", "item 6"],
        }, result);
    });
});

describe("emptyValueForShape", () => {
    const expectedEmptyItemValue = {
        "content": "",
        "images": {},
        "widgets": {},
        "__type": "item",
    };

    const expectedEmptyHintValue = {
        "replace": false,
        "content": "",
        "images": {},
        "widgets": {},
        "__type": "hint",
    };

    it("creates an empty item", () => {
        assert.deepEqual(expectedEmptyItemValue, emptyValueForShape(
            shapes.item
        ));
    });

    it("creates an empty hint", () => {
        assert.deepEqual(expectedEmptyHintValue, emptyValueForShape(
            shapes.hint
        ));
    });

    it("creates an empty array of items", () => {
        assert.deepEqual([], emptyValueForShape(
            shapes.arrayOf(shapes.item)
        ));
    });

    it("creates an empty array of objects", () => {
        assert.deepEqual([], emptyValueForShape(
            shapes.arrayOf(
                shapes.shape({
                    left: shapes.item,
                    right: shapes.item,
                })
            )
        ));
    });

    it("creates an empty array of arrays", () => {
        assert.deepEqual([], emptyValueForShape(
            shapes.arrayOf(
                shapes.arrayOf(
                    shapes.item
                )
            )
        ));
    });

    it("creates an empty object of all other cases", () => {
        const expectedEmptyObjectValue = {
            context: {
                intro: expectedEmptyItemValue,
                prompt: expectedEmptyItemValue,
            },
            hint: expectedEmptyHintValue,
            footnotes: [],
            questions: [],
            weirdItemMatrix: [],
        };
        assert.deepEqual(expectedEmptyObjectValue, emptyValueForShape(
            shapes.shape({
                context: shapes.shape({
                    intro: shapes.item,
                    prompt: shapes.item,
                }),
                hint: shapes.hint,
                footnotes: shapes.arrayOf(shapes.item),
                questions: shapes.arrayOf(shapes.shape({
                    question: shapes.item,
                    answerArea: shapes.item,
                })),
                weirdItemMatrix: shapes.arrayOf(shapes.arrayOf(shapes.item)),
            })
        ));
    });
});

describe("shapeToPropType", () => {
    const tryPropType = (propType, value) =>
          propType({value: {_multi: value}}, "value", "<function tryPropType>");

    const assertPropTypePasses = (propType, value) =>
          assert.equal(null, tryPropType(propType, value),
            `expected ${JSON.stringify(value)} to pass propType, ` +
            `but it failed`);

    const assertPropTypeFails = (propType, value) =>
        assert.ok(tryPropType(propType, value) instanceof Error,
            `expected ${JSON.stringify(value)} to fail propType, ` +
            `but it passed`);

    it("validates an item", () => {
        const propType = shapeToPropType(shapes.item);

        // Perseus has default values for all item fields, so all except the
        // type are optional.
        assertPropTypePasses(propType, {__type: "item"});
        assertPropTypePasses(propType,
            {content: "", widgets: {}, images: {}, __type: "item"});

        // We also leave the full object optional by default, like the propType
        // primitives.
        assertPropTypePasses(propType, null);

        // But specifying a bad type for any field will fail the propType.
        assertPropTypeFails(propType, {content: 1, __type: "item"});
        assertPropTypeFails(propType, {widgets: 1, __type: "item"});
        assertPropTypeFails(propType, {images: 1, __type: "item"});
    });

    it("validates a hint", () => {
        const propType = shapeToPropType(shapes.hint);

        // Perseus has default values for all hint fields, so all except the
        // type are optional.
        assertPropTypePasses(propType, {__type: "hint"});
        assertPropTypePasses(propType, {
            content: "",
            widgets: {},
            images: {},
            replace: false,
            __type: "hint",
        });

        // We also leave the full object optional by default, like the propType
        // primitives.
        assertPropTypePasses(propType, null);

        // But specifying a bad type for any field will fail the propType.
        assertPropTypeFails(propType, {content: 1, __type: "hint"});
        assertPropTypeFails(propType, {widgets: 1, __type: "hint"});
        assertPropTypeFails(propType, {images: 1, __type: "hint"});
        assertPropTypeFails(propType, {replace: 1, __type: "hint"});
    });

    it("validates an array", () => {
        const propType = shapeToPropType(shapes.arrayOf(shapes.item));
        const emptyItem = {__type: "item"};

        assertPropTypePasses(propType, []);
        assertPropTypePasses(propType, [emptyItem, emptyItem, emptyItem]);

        // While the array itself is optional, its elements are required.
        assertPropTypePasses(propType, null);
        assertPropTypeFails(propType, [emptyItem, null, emptyItem]);
    });

    it("validates an object", () => {
        const propType = shapeToPropType(shapes.shape({
            a: shapes.item,
            b: shapes.item,
        }));
        const emptyItem = {__type: "item"};

        assertPropTypePasses(propType, {a: emptyItem, b: emptyItem});

        // While the object itself is optional, its fields are required.
        assertPropTypePasses(propType, null);
        assertPropTypeFails(propType, {});
        assertPropTypeFails(propType, {a: emptyItem});
        assertPropTypeFails(propType, {b: emptyItem});
    });
});
