const assert = require("assert");

const {emptyValueForShape, shapes, shapeToPropType, findLeafNodes} = require("../multirenderer.jsx");

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

describe("findLeafNodes", () => {
    it("calls the callback for item leaf nodes", () => {
        const data = {
            _multi: {
                __type: "item",
                content: "boo",
            },
        };

        findLeafNodes(data, (obj, type) => {
            assert.deepEqual(obj, {
                __type: "item",
                content: "boo",
            });
            assert.equal(type, "item");
        });
    });

    it("calls the callback for hint leaf nodes", () => {
        const data = {
            _multi: {
                __type: "hint",
                content: "boo",
                replace: false,
            },
        };

        findLeafNodes(data, (obj, type) => {
            assert.deepEqual(obj, {
                __type: "hint",
                content: "boo",
                replace: false,
            });
            assert.equal(type, "hint");
        });
    });

    it("calls the callback for leaf nodes inside of arrays", () => {
        const items = [{
            __type: "item",
            content: "boo",
        }, {
            __type: "item",
            content: "boo2",
        }];
        items.sort();

        const data = {
            _multi: items,
        };

        const calls = [];
        findLeafNodes(data, (obj, type) => {
            assert.equal(type, "item");
            calls.push(obj);
        });

        calls.sort();
        assert.deepEqual(items, calls);
    });

    it("calls the callback for leaf nodes inside of objects", () => {
        const items = [{
            __type: "item",
            content: "boo",
        }, {
            __type: "item",
            content: "boo2",
        }];
        items.sort();

        const data = {
            _multi: {
                a: items[0],
                b: items[1],
            },
        };

        const calls = [];
        findLeafNodes(data, (obj, type) => {
            assert.equal(type, "item");
            calls.push(obj);
        });

        calls.sort();
        assert.deepEqual(items, calls);
    });
});
