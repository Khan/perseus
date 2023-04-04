import {treeToItem} from "../items";
import {buildPropTypeForShape} from "../prop-type-builders";
import shapes from "../shapes";

// TODO(emily): [PERSEUS_MERGE] Calling prop types as a function fails these
// tests. Rewrite them once we're using the prop-types library.
describe.skip("buildPropTypeForShape", () => {
    // The value we're wrapping might not be a valid ItemTree - that's the
    // point of testing this PropType - so we disable type checking by casting
    // `value` to type `any`. The current implementation of `treeToItem` can
    // handle that possibility.
    const tryPropType = (propType: any, value: any) =>
        propType({value: treeToItem(value)}, "value", "<function tryPropType>");

    const assertPropTypePasses = (propType, value) =>
        expect(null).toEqual(tryPropType(propType, value));

    const assertPropTypeFails = (propType, value) =>
        expect(tryPropType(propType, value) instanceof Error).toBeTruthy();

    it("validates a content node", () => {
        const propType = buildPropTypeForShape(shapes.content);

        // Perseus has default values for all item fields, so all except the
        // type are optional.
        assertPropTypePasses(propType, {__type: "content"});
        assertPropTypePasses(propType, {
            content: "",
            widgets: {},
            images: {},
            __type: "content",
        });

        // We also leave the full object optional by default, like the propType
        // primitives.
        assertPropTypePasses(propType, null);

        // But specifying a bad type for any field will fail the propType.
        assertPropTypeFails(propType, {content: 1, __type: "content"});
        assertPropTypeFails(propType, {widgets: 1, __type: "content"});
        assertPropTypeFails(propType, {images: 1, __type: "content"});
    });

    // TODO(mdr): Remove #LegacyContentNode support.
    it("validates a legacy content node", () => {
        const propType = buildPropTypeForShape(shapes.content);

        // Perseus has default values for all item fields, so all except the
        // type are optional.
        assertPropTypePasses(propType, {__type: "item"});
        assertPropTypePasses(propType, {
            content: "",
            widgets: {},
            images: {},
            __type: "item",
        });

        // We also leave the full object optional by default, like the propType
        // primitives.
        assertPropTypePasses(propType, null);

        // But specifying a bad type for any field will fail the propType.
        assertPropTypeFails(propType, {content: 1, __type: "item"});
        assertPropTypeFails(propType, {widgets: 1, __type: "item"});
        assertPropTypeFails(propType, {images: 1, __type: "item"});
    });

    it("validates a hint node", () => {
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
        const emptyItem = {__type: "content"} as const;

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
        const propType = buildPropTypeForShape(
            shapes.shape({
                a: shapes.content,
                b: shapes.content,
            }),
        );
        const emptyItem = {__type: "content"} as const;

        assertPropTypePasses(propType, {a: emptyItem, b: emptyItem});

        // While the object itself is optional, its fields are required.
        assertPropTypePasses(propType, null);
        assertPropTypeFails(propType, {});
        assertPropTypeFails(propType, {a: emptyItem});
        assertPropTypeFails(propType, {b: emptyItem});
    });
});
