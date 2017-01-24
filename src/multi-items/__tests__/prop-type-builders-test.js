// @flow
const assert = require("assert");
declare function describe(s: string, f: () => any): any;
declare function it(s: string, f: () => any): any;

const {treeToItem} = require("../items.js");
const {buildPropTypeForShape} = require("../prop-type-builders.js");
const shapes = require("../shapes.js");

describe("buildPropTypeForShape", () => {
    // The value we're wrapping might not be a valid ItemTree - that's the
    // point of testing this PropType - so we disable Flow checking by casting
    // `value` to type `any`. The current implementation of `treeToItem` can
    // handle that possibility.
    const tryPropType = (propType, value: any) => propType(
        {value: treeToItem(value)}, "value", "<function tryPropType>");

    const assertPropTypePasses = (propType, value) =>
          assert.equal(null, tryPropType(propType, value),
            `expected ${JSON.stringify(value)} to pass propType, ` +
            `but it failed`);

    const assertPropTypeFails = (propType, value) =>
        assert.ok(tryPropType(propType, value) instanceof Error,
            `expected ${JSON.stringify(value)} to fail propType, ` +
            `but it passed`);

    it("validates a content", () => {
        const propType = buildPropTypeForShape(shapes.content);

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
        const propType = buildPropTypeForShape(shapes.hint);

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
        const propType = buildPropTypeForShape(shapes.arrayOf(shapes.content));
        const emptyItem = {__type: "item"};

        assertPropTypePasses(propType, []);
        assertPropTypePasses(propType, [emptyItem, emptyItem, emptyItem]);

        // While the array itself is optional, its elements are required.
        assertPropTypePasses(propType, null);
        assertPropTypeFails(propType, [emptyItem, null, emptyItem]);
    });

    it("validates tags", () => {
        const propType = buildPropTypeForShape(shapes.tags);

        assertPropTypePasses(propType, []);
        assertPropTypePasses(propType, ["a", "b", "c"]);

        assertPropTypePasses(propType, null);
        assertPropTypeFails(propType, ["a", null, "b"]);
        assertPropTypeFails(propType, [1, 2, 3]);
    });

    it("validates an object", () => {
        const propType = buildPropTypeForShape(shapes.shape({
            a: shapes.content,
            b: shapes.content,
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
